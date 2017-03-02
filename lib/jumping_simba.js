const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('simba-canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  const gameView = new GameView(game, ctx);

  gameView.start();

});
