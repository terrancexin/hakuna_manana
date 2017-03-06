const Display = require('./display');
const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.simba = this.game.addSimba();
    this.gameDisplay = new Display(game, ctx);
    this.state = {started: false, muted: false};
    this.theme = new Audio('./assets/sounds/game_music.mp3');

    this.posX = -250;
    this.posY = -10;
    this.width = 2000;
    this.height = 600;
    this.path = 'assets/images/start_screen.jpg';
  }

  newGame(){
    this.game.reset();
    this.game = new Game();
    this.gameDisplay = new Display(this.game, this.ctx);
    this.restartGame();
    this.setAudio();
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

  bindKeyHandlers() {
    let that = this;
    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) {
        if (!that.game.simbas[0].state.alive || !that.state.started) {
          that.state.started = true;
          that.newGame();
        }
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        that.game.simbas[0].jump();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 73) {
        e.preventDefault();
        const image = new Image();
        image.src = this.path;
        that.ctx.drawImage(image, this.posX, this.posY);
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
          that.simba.hakunamatata = new Audio('./assets/sounds/hakuna_matata.mp3');
          that.game.metro.pause();
        }
      }
    });
  }

  entry() {
    this.theme.addEventListener('ended', () => {
      this.theme.currentTime = 0;
      this.theme.play();
    }, false);
    this.theme.play();

    this.bindKeyHandlers();
    // if (this.state.started) {
      this.start();
    // } else {
      // this.drawStartScreen();
    // }
  }

  // drawStartScreen() {
  //   const image = new Image();
  //   image.src = this.path;
  //   // image.onload = function() {
  //     // const ctx = document.getElementById("simba-canvas").getContext("2d");
  //     this.ctx.drawImage(image, this.posX, this.posY);
  //   // };
  // }

  start() {
    this.background = this.game.addBackground();
    this.lastTime = 0;

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
    this.gameDisplay.drawEnd(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
