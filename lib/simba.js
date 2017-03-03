class Simba {
  constructor() {
    console.log('in Simba');
    this.width = 70;
    this.height = 70;

    this.jumped = false;
    this.landed = false;

    this.posX = 50;
    this.posY = 430;

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


    // this.checkPlatform(platform);
    this.checkLanding(platform);

    // this.checkPlatform(platform);
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
    if ((this.posY + this.height) > (platform.posY) && (this.posY + this.height) < (platform.posY + 20)) {
      // console.log((this.posX) + ` ` + (platform.posX));
      if(this.posX > (platform.posX - 20) && this.posX < (platform.posX + 60)) {
        this.velY = 0;
        this.velX = platform.velX;
        this.landed = true;
      }
    }
  }


  checkBounds() {
    if (this.posX < -100) {
      this.posX = 50;
      this.posY = 430;
      this.velX = 0;
    }
  }

  checkPlatform(platform) {
    if(this.posX !== (platform.posX - 20) && this.posX !== (platform.posX + 60)) {
      this.velY = 1;
    }

    // if (this.posY >= 450 && this.velY === 5) {
    //   this.velY = 0;
    // }
  }

}

module.exports = Simba;
