const Simba = require('./simba.js');
const Platform = require('./platform.js');
const Background = require('./background.js');

class Game {
  constructor(ctx, canvas) {
    console.log('in Game');

    this.ctx = ctx;
    this.canvas = canvas;

    this.simba = new Simba();
    this.platform = new Platform();
    this.background = new Background();
  }

  draw(ctx) {
    this.drawBackground();
    this.background.draw(this.ctx);
    this.simba.draw(this.ctx);
    this.platform.draw(this.ctx);
  }

  drawBackground() {
    // this.ctx.clearRect(0, 0, 350, 500);
    // this.ctx.fillStyle = 'lightgreen';
    // this.ctx.fillRect(0, 0, 350, 500);
  }

  moveObjects(platform) {
    this.simba.move(this.platform);
    this.platform.move();
  }

  step() {
    this.moveObjects();
    // more logic - check if simba on platform ,etc.
  }


  jump() {
    console.log("jump in Game");
    this.simba.jump();
  }




}

module.exports = Game;
