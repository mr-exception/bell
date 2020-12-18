import io from "socket.io-client";

const connection = io.connect("ws://localhost:5003", {transports: ["websocket"], query: {token: "1234"}});
connection.on('sparow/project3', (data:any) => {
    console.log(data);
})