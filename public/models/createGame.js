export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      height: 0,
      width: 0,
    },
  };

  const observers = [];

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function unsubscribe(observerFunction) {
    observers = observers.filter((obs) => obs !== observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function movePlayer(command) {
    notifyAll(command);
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

    notifyAll({
      type: "add-player",
      playerId,
      xPosition,
      yPosition,
    });
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];

    notifyAll({
      type: "remove-player",
      playerId,
    });
  }

  function addFruit(command) {
    const fruitId = command?.fruitId ?? crypto.randomUUID();
    const xPosition =
      command?.xPosition ?? Math.floor(Math.random() * state.screen.width);
    const yPosition =
      command?.yPosition ?? Math.floor(Math.random() * state.screen.height);

    state.fruits[fruitId] = {
      x: xPosition,
      y: yPosition,
    };

    notifyAll({
      type: "add-fruit",
      fruitId,
      xPosition,
      yPosition,
    });
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];

    notifyAll({
      type: "remove-fruit",
      fruitId,
    });
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

  function start() {
    const frequency = 5000;
    setInterval(addFruit, frequency);
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function setScreenValues(widthValue, heightValue) {
    state.screen.width = widthValue;
    state.screen.height = heightValue;
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    start,
    addFruit,
    removeFruit,
    setState,
    setScreenValues,
    subscribe,
    unsubscribe,
  };
}
