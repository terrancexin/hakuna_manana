const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('simba-canvas');
  const ctx = canvas.getContext('2d');


  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 75, 55, 150, 110);
  };
  img.src = "assets/image/simba.png";

});
