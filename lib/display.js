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
    ctx.fillStyle = "white";
    ctx.fillText("High Score: "+score, 350, 15);
  }

  drawScore(ctx) {
    let score = this.score();
    ctx.font = "16px Michroma";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: "+score, 190, 15);
  }

  drawEndScore(ctx) {
    if (this.game.gameOver()) {
      let score = this.score();
      ctx.font = "30px Michroma";
      ctx.fillStyle = "yellow";
      ctx.fillText("Score: "+score, 160, 100);
    }
  }

  drawTimons(ctx){
    let timons = this.game.simbas[0].timons;
    ctx.font = "15px Michroma";
    ctx.fillStyle = "white";
    ctx.fillText("Timons: "+timons, 7, 350);
  }
}

module.exports = Display;
