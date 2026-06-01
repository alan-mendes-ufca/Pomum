import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.port || 3000;

app.use(express.static("public"));
server.listen(PORT, () => {
  console.log(`> Server listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
