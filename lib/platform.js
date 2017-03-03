class Platform {
  constructor() {
    console.log('in Platform');

    this.posX = 150;
    this.posY = 380;

    this.velX = -3;
    this.velY = 0;

    this.width = 90;
    this.height = 40;

  }

  draw(ctx) {
    const platformImage = new Image();
    platformImage.src = "assets/image/platform1.png";
    ctx.drawImage(platformImage, this.posX, this.posY, this.width, this.height);
  }

  move() {
    if (this.posX < -100) {
      this.posX = 350;
      this.posY = this.randomPos();
    }

    this.posX += this.velX;
    this.posY += this.velY;
  }

  randomPos() {
    return Math.floor(Math.random() * (430-350) + 350);
  }

}

module.exports = Platform;
