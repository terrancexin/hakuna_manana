const MovingObject = require("./moving_object.js");

class Timon extends MovingObject {
  constructor(options = {}) {
    options.height = 40;
    options.width = options.width || 40;

    options.pos = options.pos ||
      [1000, Math.floor(Math.random() * (320 - 50)) + 50];
    options.vel = options.vel ||
      [Math.floor(Math.random() * (-5 + 7)) + -7, 0];
    super(options);

    this.renderHeight = 40;
    this.renderWidth = 40;
    this.xAdjust = 0;
    this.yAdjust = 0;
    this.path = 'assets/images/timon.png';
  }
}

module.exports = Timon;
