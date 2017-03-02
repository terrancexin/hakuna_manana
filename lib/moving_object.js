class MovingObject {
  constructor(options) {
    this.height = options.height;
    this.width = options.width;

    this.pos = options.pos;
    this.vel = options.vel;

    this.color = options.color;
    this.game = options.game;
  }

  draw(context) {
    const img = new Image();
    img.src = 'assets/image/simba.png';
    context.drawImage(img, 10, 10);
  }
}

module.exports = MovingObject;
