class Platform {
  constructor() {
    console.log('in Platform');

    this.pos = [150, 400];
    this.vel = [-5, 0];
  }

  draw(ctx) {
    const platformImage = new Image();
    platformImage.src = "assets/image/platform.png";
    ctx.drawImage(platformImage, this.pos[0], this.pos[1], 90, 20);
  }

  move() {
    if (this.pos[0] < 0) {
      this.pos = [350, this.randomPos()];
    }

    this.pos = [
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ];
  }

  randomPos() {
    return Math.floor(Math.random() * (480-350) + 350);
  }

}

module.exports = Platform;
