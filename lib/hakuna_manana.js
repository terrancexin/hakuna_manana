const Game = require("./game.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("simba-canvas").getContext("2d");

  const game = new Game();
  new GameView(game, ctx).entry();
});
