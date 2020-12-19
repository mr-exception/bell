import express from "express";
import * as socketio from "socket.io";
import { Socket } from "socket.io";
import { checkIp, checkToken } from "./utils/token-check";
import emit from "./routes/emit";
import config from "./config";

const app = express();
app.set("trust proxy", true);
app.get("/emit", (req, res) => {
  const serverIp = req.ip;
  const applicationConfig = checkIp(serverIp);
  if (applicationConfig !== undefined) {
    if (req.query.hasOwnProperty("token")) {
      const token = req.query.token;
      if (token === applicationConfig.auth_token) {
        // auth checked. connection is safe
        if (req.query.hasOwnProperty("channel")) {
          if (req.query.hasOwnProperty("data")) {
            const { channel, data } = req.query;
            io.emit(`${applicationConfig.name}/${channel}`, data);
            console.log(`emited on ${applicationConfig.name}/${channel}`);
            res.send("ok");
          } else {
            res.status(422).send("data is required");
          }
        } else {
          res.status(422).send("channel is required");
        }
      } else {
        res.status(401).send("invalid token");
      }
    } else {
      res.status(401).send("token not found");
    }
  } else {
    res.status(401).send("invalid ip");
  }
});
app.listen(5002, () => {
  console.log(`http server opened on port 5002`);
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
let io = require("socket.io")({ transports: ["websocket"] });
io.listen(5003);
console.debug("opened socket server on port 5003");

io.on("connection", async (socket: Socket) => {
  console.debug(`new connection with id ${socket.id}`);
  const query = JSON.parse(JSON.stringify(socket.handshake.query));
  if (!query.hasOwnProperty("token")) {
    socket.disconnect(true);
    console.error(`connection ${socket.id} with no token`);
    return;
  }
  if (!query.hasOwnProperty("application")) {
    socket.disconnect(true);
    console.error(`connection ${socket.id} with no application`);
    return;
  }
  const { token, application } = query;
  const applicationConfig = config.find((cnf) => cnf.name === application);
  if (!applicationConfig) {
    socket.disconnect(true);
    console.error(`connection ${socket.id} with not found application`);
    return;
  }
  try {
    await checkToken(token, applicationConfig);
    console.debug("token was valid");
  } catch (error: any) {
    socket.disconnect(true);
    console.error(`connection ${socket.id} with invalid token`);
    return;
  }
});
