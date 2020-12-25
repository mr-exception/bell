import express from "express";
import { Socket } from "socket.io";
import { checkAccess, checkToken } from "./utils/permissions";
import config from "./config";
import { IJoinData } from "./interfaces/join";
import { IEmitData } from "./interfaces/emit";
import axios, { AxiosResponse } from "axios";

const app = express();
app.set("trust proxy", true);
app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.post("/emit", (req, res) => {
  const { token, event, channel, data }: IEmitData = req.body as IEmitData;
  const applicationConfig = checkToken(token);
  if (!applicationConfig) {
    return res.status(401).send(`invalid token`);
  }
  if (!data) {
    return res.status(422).send("data is required");
  }
  if (!channel) {
    return res.status(422).send("channel is required");
  }
  if (!event) {
    return res.status(422).send("event is required");
  }
  io.to(`${applicationConfig.name}:${channel}`).emit(event, data);
  return res.send("ok");
});
app.listen(5002, () => {
  console.info(`http server opened on port 5002`);
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
const io = require("socket.io")({ transports: ["websocket"] });
io.listen(5003);
console.debug("opened socket server on port 5003");

io.on("connection", async (socket: Socket) => {
  console.debug(`new connection with id ${socket.id}`);
  socket.on("join", async (data: IJoinData, callback) => {
    if (!data.application) {
      callback({
        ok: false,
        message: "application is required",
      });
      return;
    }
    if (!data.auth_token) {
      callback({
        ok: false,
        message: "auth_token is required",
      });
      return;
    }
    if (!data.channel) {
      callback({
        ok: false,
        message: "channel is required",
      });
      return;
    }
    const application = config.find((cnf) => cnf.name === data.application);
    if (!application) {
      callback({
        ok: false,
        message: "application not found",
      });
      return;
    }
    try {
      await checkAccess(data.auth_token, data.channel, application);
    } catch (error: any) {
      if (error.hasOwnProperty("response")) {
        if (error.response) {
          const response: AxiosResponse<any> = error.response;
          console.log(response.config);
          switch (response.status) {
            case 401:
              callback({
                ok: false,
                message: "invalid token",
              });
              return;
            case 403:
              callback({
                ok: false,
                message: "permission denied",
              });
              return;
            case 404:
              callback({
                ok: false,
                message: "channel not found",
              });
              return;
            default:
              callback({
                ok: false,
                message: "internal error",
              });
              return;
          }
        } else {
          callback({
            ok: false,
            message: "internal error ",
          });
          return;
        }
      } else {
        callback({
          ok: false,
          message: "internal error ",
        });
        return;
      }
    }
    socket.join(`${application.name}:${data.channel}`);
    callback({
      ok: true,
    });
  });
});
