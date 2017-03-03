class Background {
  constructor() {
    this.width = 400;
    this.height = 550;

    this.posX = 0;
    this.posY = 0;
  }

  draw(ctx) {
    const bgImage = new Image();
    bgImage.src = "assets/image/canvas-bg.png";
    ctx.drawImage(bgImage, this.posX, this.posY, this.width, this.height);
  }

  move() {
    // this.posX += -0.5;
  }
}

module.exports = Background;
