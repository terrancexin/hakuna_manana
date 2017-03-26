const Game = require("./game.js");
const GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("simba-canvas").getContext("2d");
  const image = new Image();
  image.src = 'assets/images/start_screen2.jpg';
  image.onload = () => { ctx.drawImage(image, 0, 0, 650, 370); };

  const game = new Game();
  new GameView(game, ctx).bindKeyHandlers();
});
