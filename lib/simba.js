class Simba {
  constructor() {
    console.log('in Simba');
    this.width = 50;
    this.height = 50;

    this.jumped = false;
    this.landed = true;

    this.posX = 100;
    this.posY = 450;

    this.velX = 0;
    this.velY = 0;
  }

  draw(ctx) {
    const simbaImage = new Image();
    simbaImage.src = "assets/image/simba.png";
    ctx.drawImage(simbaImage, this.posX, this.posY, this.width, this.height);
  }

  move(platform) {
    if (this.posY < 300) {
      this.fall();
    } else if (this.posY === 450 && this.velY === 5) {
      this.velY = 0;
    }

    this.checkLanding(platform);
    this.checkBounds();

    this.posX += this.velX;
    this.posY += this.velY;
  }

  jump() {
    this.velX = 0;
    this.velY = -5;

  }

  fall() {
    this.velX = 0;
    this.velY = 5;
  }

  checkLanding(platform) {
    console.log((this.posY + this.height) + ` ` + (platform.posY -5));
    if ((this.posY + this.height) > (platform.posY) && (this.posY + this.height) < (platform.posY + 7)) {
      // debugger
      // console.log((this.posX) + ` ` + (platform.posX));
      if(this.posX > (platform.posX - 20) && this.posX < (platform.posX + 60)) {
        this.velY = 0;
        this.velX = platform.velX;
        this.landed = true;
      }
    } else {
      this.landed = false;
    }

  }

  checkBounds() {
    if (this.posX < -100) {
      this.posX = 100;
      this.posY = 450;
      this.velX = 0;
    }
  }


}

module.exports = Simba;
