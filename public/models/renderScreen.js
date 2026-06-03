const screen = document.getElementById("screen");
const context = screen.getContext("2d");

export default function renderScreen(gameObject, currentPlayerId) {
  context.clearRect(0, 0, screen.width, screen.height);

  context.fillStyle = "black";
  for (let playerId in gameObject.state.players) {
    if (playerId != currentPlayerId) {
      const player = gameObject.state.players[playerId];
      context.fillRect(player.x, player.y, 1, 1);
    }
  }

  context.fillStyle = "green";
  for (let fruitId in gameObject.state.fruits) {
    const fruit = gameObject.state.fruits[fruitId];
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  const currentPlayer = gameObject.state.players[currentPlayerId];
  if (currentPlayer) {
    context.fillStyle = "yellow";
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
  }

  requestAnimationFrame(() => renderScreen(gameObject, currentPlayerId));
}
