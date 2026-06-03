import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import createGame from "./public/models/createGame.js";
import { Socket } from "node:dgram";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const sockets = new Server(server);

const game = createGame();
game.setScreenValues(process.env.SCREEN_WIDTH, process.env.SCREEN_HEIGHT);
game.start();
game.subscribe((command) => {
  console.log(`> Emmiting ${command.type}`);
  sockets.emit(command.type, command);
});

console.log(game.state);

sockets.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`> Player ${playerId} is connected on webServer.`);
  game.addPlayer({ playerId });

  socket.emit("setup", game.state);

  socket.on("disconnect", () => {
    game.removePlayer({ playerId });
    console.log(`> Player ${playerId} is desconnected on webServer.`);
  });

  socket.on("move-player", (command) => {
    command.playerId = playerId;
    command.type = "move-player";

    game.movePlayer(command);
  });
});

app.use(express.static("public"));
server.listen(PORT, () => {
  console.log(`> Server listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
