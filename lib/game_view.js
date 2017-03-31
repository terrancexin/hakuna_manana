const Display = require('./display');
const Game = require('./game');
const Modal = require('./modal.js');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.simba = this.game.addSimba();
    this.gameDisplay = new Display(game, ctx);
    this.state = { started: false, muted: false };
    this.theme = new Audio('./assets/sounds/lower_volume_hakuna.mp3');

    this.posX = -250;
    this.posY = -10;
    this.width = 380;
    this.height = 320;
    this.modal = new Modal();
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
    this.muteButton();
    this.modal.displayModal();
    this.modal.closeModal();
  }

  mouseClick() {
    const canvas = document.getElementById('simba-canvas');
    canvas.addEventListener('click', event => {
      event.preventDefault();
      this.game.simbas[0].jump();

      if (!this.game.simbas[0].state.alive || !this.state.started) {
        this.state.started = true;
        this.newGame();
      }
    });
  }

  enterKey() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (!this.game.simbas[0].state.alive || !this.state.started) {
          this.state.started = true;
          this.theme.play();
          setTimeout(() => this.newGame(), 300);
        }
      }
    });
  }

  spaceKey() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32) {
        event.preventDefault();
        this.game.simbas[0].jump();
      }
    });
  }

  muteKey() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 77) {
        event.preventDefault();
        if (this.state.muted) {
          this.state.muted = false;
          this.theme.play();
        } else {
          this.state.muted = true;
          this.theme.pause();
        }
      }
    });
  }

  muteButton() {
    const mute = document.getElementsByClassName("mute")[0];
    mute.onclick = function() {
      if (this.state.muted) {
        this.state.muted = false;
        this.theme.play();
      } else {
        this.state.muted = true;
        this.theme.pause();
      }
    };
  }

}

module.exports = GameView;
