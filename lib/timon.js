const MovingObject = require("./moving_object.js");

class Timon extends MovingObject {
  constructor(options = {}) {
    options.height = 50;
    options.width = options.width || 50;

    options.pos = options.pos ||
      [1000, Math.floor(Math.random() * (500 - 200)) + 200];
    options.vel = options.vel ||
      [Math.floor(Math.random() * (-5 + 7)) + -7, 0];
    super(options);

    this.renderHeight = 50;
    this.renderWidth = 50;
    this.xAdjust = 0;
    this.yAdjust = 0;
    this.path = 'assets/images/timon.png';
  }
}

module.exports = Timon;
