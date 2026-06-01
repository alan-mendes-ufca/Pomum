export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      height: 10,
      width: 10,
    },
  };

  function movePlayer(command) {
    console.log(
      `game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`,
    );

    const acceptedMovies = {
      ArrowUp(player) {
        console.log("game.movePlayer().ArrowUp() -> Moving Player Up");
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },

      ArrowDown(player) {
        console.log("game.movePlayer().ArrowDown() -> Moving Player Down");
        if (player.y + 1 < state.screen.height) {
          player.y += 1;
        }
      },

      ArrowLeft(player) {
        console.log("game.movePlayer().ArrowLeft() -> Moving Player Left");
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },

      ArrowRight(player) {
        console.log("game.movePlayer().ArrowDown() -> Moving Player Down");
        if (player.x + 1 < state.screen.width) {
          player.x += 1;
        }
      },
    };

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const playerToMove = state.players[playerId];
    const moveFunction = acceptedMovies[keyPressed];

    if (moveFunction) {
      moveFunction(playerToMove);
      checkForFruitCollision(playerId);
    }

    return;
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const xPosition =
      command?.xPosition ?? Math.floor(Math.random() * state.screen.width);
    const yPosition =
      command?.yPosition ?? Math.floor(Math.random() * state.screen.height);
    state.players[playerId] = {
      x: xPosition,
      y: yPosition,
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const xPosition = command.xPosition;
    const yPosition = command.yPosition;

    state.fruits[fruitId] = {
      x: xPosition,
      y: yPosition,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function checkForFruitCollision(playerId) {
    // Study quadtree implementation...
    for (const fruitId in state.fruits) {
      const player = state.players[playerId];
      const fruit = state.fruits[fruitId];

      if (player.x === fruit.x && player.y === fruit.y) {
        console.log(`COLLISION between ${playerId} and ${fruitId}`);
        removeFruit({
          fruitId,
        });
      }
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    setState,
  };
}
