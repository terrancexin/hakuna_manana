const Game = require("./game");
const GameView = require("./game_view");
const Background = require("./background");

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("simba-canvas").getContext("2d");
  const image = new Image();
  image.src = 'assets/images/start_screen.jpg';

  new Background();
  image.onload = () => { ctx.drawImage(image, 0, 0, 650, 370); };

  const game = new Game();
  new GameView(game, ctx).bindKeyHandlers();
});
