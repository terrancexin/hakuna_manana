const Display = require('./display');
const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.simba = this.game.addSimba();
    this.gameDisplay = new Display(game, ctx);
    this.state = {started: false, muted: false};
    // this.theme = new Audio('./assets/sounds/lower_volume_hakuna.mp3');

    this.posX = -250;
    this.posY = -10;
    this.width = 380;
    this.height = 320;
    this.path = 'assets/images/start_screen.jpg';
  }

  newGame(){
    this.game.reset();
    this.game = new Game();
    this.gameDisplay = new Display(this.game, this.ctx);
    this.restartGame();
    // this.setAudio();
  }

  setAudio() {
    if (this.state.muted) {
      this.game.state.muted = true;
      this.simba.state.muted = true;
    }
  }

  restartGame() {
    this.simba = this.game.addSimba();
    this.background = this.game.addBackground();
    this.lastTime = window.performance.now();
    requestAnimationFrame(this.animate.bind(this));
  }

  mouseClick() {

  }

  bindKeyHandlers() {
    let that = this;

    const mouseclick = document.getElementById('simba-canvas');
    mouseclick.addEventListener('click', function(event) {
      event.preventDefault();
      that.game.simbas[0].jump();

      if (!that.game.simbas[0].state.alive || !that.state.started) {
        that.state.started = true;
        that.newGame();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) { //enter
        if (!that.game.simbas[0].state.alive || !that.state.started) {
          that.state.started = true;
          that.theme.play();
          that.newGame();
        }
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 32) { //space
        e.preventDefault();
        that.game.simbas[0].jump();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 68) { //d
        e.preventDefault();
        that.game.simbas[0].dash();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 77) {
        e.preventDefault();
        if (that.state.muted) {
          that.state.muted = false;
          that.game.state.muted = false;
          that.simba.state.muted = false;
          that.theme.play();
        } else {
          that.state.muted = true;
          that.game.state.muted = true;
          that.simba.state.muted = true;
          that.theme.pause();
          that.simba.hakunamatata.pause();
          // that.simba.hakunamatata = new Audio('./assets/sounds/hakuna_matata.mp3');
        }
      }
    });
  }

  entry() {
    this.bindKeyHandlers();
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
    this.gameDisplay.drawEnd(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
