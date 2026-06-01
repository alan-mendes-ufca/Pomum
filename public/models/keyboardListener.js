export default function createKeyboardLitener(document) {
  let state = {
    observers: [],
    playerId: null,
  };

  function registerPlayerId(id) {
    state.playerId = id;
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function remove(observerFunction) {
    state.observers = state.observers.filter((obs) => obs !== observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  function handleKeyDown(event) {
    event.preventDefault();
    const keyPressed = event.key;

    const command = {
      type: "move-player",
      playerId: state.playerId,
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
    registerPlayerId,
  };
}
