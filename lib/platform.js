const MovingObject = require("./moving_object.js");

class Platform extends MovingObject {
  constructor(options = {}) {
    options.width = options.width || 170;

    options.pos = options.pos || [1000, Math.floor(Math.random() * (350 - 120)) + 120];
    options.vel = options.vel || [Math.floor(Math.random() * (-5 + 8)) + -8, 0];
    super(options);

    this.renderHeight = 60;
    this.renderWidth = 170;
    this.xAdjust = 0;
    this.yAdjust = 0;
  }

  draw(ctx) {
    const image = new Image();
    image.src = 'assets/images/platform.png';
    let dx = this.pos[0] + this.xAdjust;
    let dy = this.pos[1] + this.yAdjust;
    ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
  }
}

module.exports = Platform;
