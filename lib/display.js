class Display {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  score() {
    return Math.round(this.game.score);
  }

  draw(ctx) {
    this.drawScore(ctx);
    this.drawTimons(ctx);
    this.drawHighScore(ctx);
  }

  drawHighScore(ctx) {
    let score = 0;
    score = localStorage.getItem("simbaHighScore");
    if (this.score() > score) {
      score = this.score();
    }
    ctx.font = "13px Michroma";
    ctx.fillStyle = "blue";
    ctx.fillText("High Score: "+score, 285, 15);
  }

  drawScore(ctx) {
    let score = this.score();
    ctx.font = "16px Michroma";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 160, 15);
  }

  drawTimons(ctx){
    let timons = this.game.simbas[0].timons;
    ctx.font = "14px Michroma";
    ctx.fillStyle = "orange";
    ctx.fillText("Timons: "+timons, 7, 312);
  }

  drawEnd(ctx) {
    if (this.game.gameOver()) {
      let score = this.score();
      ctx.font = "30px Michroma";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 5;
      ctx.strokeText("Score: "+score, 140, 100);
      ctx.fillText("Score: "+score, 140, 100);
    }
  }
}

module.exports = Display;
