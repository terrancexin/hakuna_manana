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

  drawScore(ctx) {
    let score = this.score();
    ctx.font = "30px Michroma";
    ctx.fillStyle = "blue";
    ctx.fillText("Score: "+score, 200, 60);
  }

  drawHighScore(ctx) {
    let score = 0;
    score = localStorage.getItem("simbaHighScore");
    if (this.score() > score) {
      score = this.score();
    }
    ctx.font = "18px Michroma";
    ctx.fillStyle = "white";
    ctx.fillText("High Score: "+score, 200, 20);
  }

  drawTimons(ctx){
    let timons = this.game.simbas[0].timons;
    ctx.font = "18px Michroma";
    ctx.fillStyle = "white";
    ctx.fillText("Timons: "+timons, 15, 580);
  }

  drawEnd(ctx) {
    if (this.game.gameOver()) {
      let score = this.score();
      ctx.font = "60px Michroma";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "green";
      ctx.lineWidth = 5;
      ctx.strokeText("Score: "+score, 150, 250);
      ctx.fillText("Score: "+score, 150, 250);
    }
  }
}

module.exports = Display;
