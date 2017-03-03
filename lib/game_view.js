const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  // window.addEventListener("keydown", function(e) {
  bindKeyHandlers() {
    document.addEventListener('keydown', e => {
      if (e.key === " ") {
        this.game.jump();
      }
    });
  }

  start() {
    this.bindKeyHandlers();
  //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  
}

module.exports = GameView;
