const MovingObject = require("./moving_object.js");

class Platform extends MovingObject {
  constructor(options = {}) {
    options.height = 15;
    options.width = options.width || 200;

    options.pos = options.pos || [1000, Math.floor(Math.random() * (350 - 120)) + 120];
    options.vel = options.vel || [Math.floor(Math.random() * (-5 + 8)) + -8, 0];
    super(options);

    this.path = 'assets/images/platform.png';

    this.renderHeight = 80;
    this.renderWidth = 200;
    this.xAdjust = 0;
    this.yAdjust = 0;
  }

  draw(ctx) {
    const image = new Image();
    image.src = this.path;
    let dx = this.pos[0] + this.xAdjust;
    let dy = this.pos[1] + this.yAdjust;
    ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
  }
}

module.exports = Platform;
