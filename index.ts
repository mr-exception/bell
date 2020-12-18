import express from "express";
import * as socketio from "socket.io";
import { Socket } from "socket.io";
import {checkIp, checkToken} from "./utils/token-check";
import emit from "./routes/emit";

const app = express();
app.set('trust proxy', true)
app.get('/emit', (req, res) => {
  const serverIp = req.ip;
  const applicationConfig = checkIp(serverIp);
  if(applicationConfig !== undefined){
    if(req.query.hasOwnProperty('token')){
      const token = req.query.token;
      if(token === applicationConfig.auth_token){
        // auth checked. connection is safe
        if(req.query.hasOwnProperty('channel')){
          if(req.query.hasOwnProperty("data")){
            const {channel, data} = req.query;
            io.emit(`${applicationConfig.name}/${channel}`, data);
            console.log(`emited on ${applicationConfig.name}/${channel}`)
            res.send("ok")
          }else{
            res.status(422).send("data is required");
          }
        }else{
          res.status(422).send("channel is required");
        }
      }else{
      res.status(401).send("invalid token");
      }      
    }else{
      res.status(401).send("token not found");
    }
  }else{
    res.status(401).send("invalid ip");
  }
})
app.listen(5002, () => {
  console.log(`http server opened on port 5002`);
})

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
let io = require("socket.io")({"transports":["websocket"]});
io.listen(5003);
console.debug('opened socket server on port 5003');

io.on("connection", (socket: Socket) =>{
  console.debug(`new connection with id ${socket.id}`);
  const query = JSON.parse(JSON.stringify(socket.handshake.query));
  if(query.hasOwnProperty('token')){
    const {token} = query
    if(checkToken(token)){
      console.debug('token was valid');
    }else{
      console.error('token was invalid');
      socket.disconnect(true);
    }
  }else{
    console.error(`connection ${socket.id} with no token`);
  }
});

/**
 * app a: a/c_a
 * app b: c_b
 */

 