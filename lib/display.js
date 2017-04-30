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
    this.drawTopPlayer(ctx);
    this.drawEndScore(ctx);
  }

  drawHighScore(ctx) {
    let score = 0;
    firebase.database().ref('/highScore').on('value', snapshot => {
      score = snapshot.val();
    });

    if (this.score() > score) {
      score = this.score();
    }
    ctx.font = "14px Lato";
    ctx.fillStyle = "yellow";
    ctx.fillText("High Score:  "+score, 7, 17);
  }

  drawTopPlayer(ctx) {
    let topPlayer = "";
    firebase.database().ref('/playerName').on('value', snapshot => {
      topPlayer = snapshot.val();
    });

    ctx.font = "14px Lato";
    ctx.fillStyle = "yellow";
    ctx.fillText("Top Player:  "+topPlayer, 7, 35);
  }

  drawScore(ctx) {
    let score = this.score();
    ctx.font = "16px Lato";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 190, 17);
  }

  drawEndScore(ctx) {
    let highScore = 0;
    firebase.database().ref('/highScore').on('value', snapshot => {
      highScore = snapshot.val();
    });

    const player = document.getElementById('player-name').value

    if (this.game.gameOver()) {
      let score = this.score();
      ctx.font = "30px Michroma";
      ctx.fillStyle = "yellow";
      ctx.fillText("Score: "+score, 160, 100);

      if (score > highScore) {
        firebase.database().ref('/').update({
          playerName: player.slice(0, 10),
          highScore: score
        });
      }
    }
  }

  drawTimons(ctx){
    let timons = this.game.simbas[0].timons;
    ctx.font = "14px Lato";
    ctx.fillStyle = "orange";
    ctx.fillText("Timons: "+timons, 375, 17);
  }
}

module.exports = Display;
