class Background {
  constructor() {
    this.pos = [0, 0];
    this.width = 1200;
    this.height = 380;
    this.speed = -1.5;

    this.image = new Image();
    this.image.src = 'assets/images/game_bg_cloud.png';
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height,
    );
    this.move();
  }

  move() {
    this.pos[0] += this.speed;
  }
}

module.exports = Background;
