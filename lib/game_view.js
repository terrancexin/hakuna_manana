const Display = require('./display');
const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.simba = this.game.addSimba();
    this.gameDisplay = new Display(game, ctx);
    this.state = {started: false, muted: false};
    this.theme = new Audio('./assets/sounds/lower_volume_hakuna.mp3');

    this.posX = -250;
    this.posY = -10;
    this.width = 380;
    this.height = 320;
  }

  newGame(){
    this.game.reset();
    this.game = new Game();
    this.gameDisplay = new Display(this.game, this.ctx);
    this.restartGame();
  }

  restartGame() {
    this.simba = this.game.addSimba();
    this.background = this.game.addBackground();
    this.lastTime = window.performance.now();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.game.gameOver()){
      const score = this.gameDisplay.score();
      if (localStorage.getItem("simbaHighScore") < score) {
        localStorage.setItem("simbaHighScore", score);
      }
      return;
    }

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    this.gameDisplay.drawScore(this.ctx);
    this.gameDisplay.drawTimons(this.ctx);
    this.gameDisplay.drawHighScore(this.ctx);
    this.gameDisplay.drawEndScore(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    this.mouseClick();
    this.enterKey();
    this.spaceKey();
    this.muteKey();
  }

  mouseClick() {
    let that = this;
    const canvas = document.getElementById('simba-canvas');
    canvas.addEventListener('click', event => {
      event.preventDefault();
      that.game.simbas[0].jump();

      if (!that.game.simbas[0].state.alive || !that.state.started) {
        that.state.started = true;
        that.newGame();
      }
    });
  }

  enterKey() {
    let that = this;
    document.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!that.game.simbas[0].state.alive || !that.state.started) {
          that.state.started = true;
          that.theme.play();
          that.newGame();
        }
      }
    });
  }

  spaceKey() {
    let that = this;
    document.addEventListener("keydown", event => {
      if (event.key === " ") {
        event.preventDefault();
        that.game.simbas[0].jump();
      }
    });
  }

  muteKey() {
    let that = this;
    document.addEventListener("keydown", event => {
      if (event.key === "m") {
        event.preventDefault();
        if (that.state.muted) {
          that.state.muted = false;
          that.theme.play();
        } else {
          that.state.muted = true;
          that.theme.pause();
        }
      }
    });
  }
}

module.exports = GameView;
