const MovingObject = require("./moving_object");

class Platform extends MovingObject {
  constructor(options = {}) {
    options.width = options.width || 170;

    options.pos = options.pos || [1000, Math.floor(Math.random() * (350 - 120)) + 120];
    options.vel = options.vel || [Math.floor(Math.random() * (-5 + 8)) + -8, 0];
    super(options);

    this.renderHeight = 60;
    this.renderWidth = 170;

    this.image = new Image();
    this.image.src = 'assets/images/platform.png';
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1], this.renderWidth, this.renderHeight);
  }
}

module.exports = Platform;
