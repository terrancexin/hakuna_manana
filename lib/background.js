class Background {
  constructor() {
    this.pos = [0, 0];
    this.width = 2200;
    this.height = 600;
    this.speed = -1.5;
    this.path = 'assets/images/bg4.jpg';

    this.createImage();
  }

  createImage(){
    this.image = new Image();
    this.image.src = this.path;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1], this.width, this.height);
    this.move();
  }

  move() {
    this.pos[0] += this.speed;
  }
}

module.exports = Background;
