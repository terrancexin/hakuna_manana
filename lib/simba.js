const MovingObject = require("./moving_object");

class Simba extends MovingObject {
  constructor(options = {}) {
    options.height = 80;
    options.width = 20;

    options.pos = [100, 0];
    options.vel = [0, 10];

    super(options);
    this.state = { alive: true, grounded: true, jumped: 0, doubleJumped: false };
    this.renderHeight = 70;
    this.renderWidth = 50;
    this.currentFrame = 0;
    this.animationCount = 0;
    this.timons = 0;

    this.jumpStrength = -19;
    this.loadCharacterImages();
  }

  draw(ctx) {
    this.updateFrame();

    if (this.timons < 10) {
      ctx.drawImage(this.drawSimba(), this.pos[0] - 30, this.pos[1] + 21, 50, 70);

    } else if (this.timons < 30) {
      ctx.drawImage(this.drawPumbaa(), this.pos[0] - 30, this.pos[1] + 14, 50, 70);

    } else if (this.timons < 50) {
      ctx.drawImage(this.drawAdultSimba(), this.pos[0] - 30, this.pos[1] + 3, 60, 85);

    } else if (this.timons < 100) {
      ctx.drawImage(this.drawBrian(), this.pos[0] - 30, this.pos[1] + 9, 50, 70);

    } else {
      ctx.drawImage(this.drawDoraemon(), this.pos[0] - 30, this.pos[1] + 9, 50, 70);
    }
  }

  updateFrame() {
    this.animationCount += 1;
    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 8) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }
  }

  jump() {
    if (!this.state.doubleJumped) {
      if (this.pos[1] < 20) {
        this.vel = [0, -9];
      } else {
        this.vel = [0, this.jumpStrength];
      }

      this.state.jumped += 1;
      if (!this.state.grounded) {
        this.state.doubleJumped = true;
      }
    } else {
      this.vel[1] = 1;
    }
  }

  jumpPhysics(object) {
    const currentVelocity = object.vel[1];
    if ((currentVelocity < 10 && currentVelocity !== 0) || !this.state.grounded){
      if (currentVelocity < 10)
        { object.vel[1] += 1.1; }
    }
  }

  handleSimba() {
    if (this.state.grounded) {
      this.vel[1] = 0;
    }
  }

  checkPlatformCollision() {
    this.state.grounded = false;

    this.game.platforms.forEach( platform => {
      if (this.pos[0] + this.width > platform.pos[0] && this.pos[0] < (platform.pos[0] + platform.width + 15)) {
        if ((this.pos[1] + this.height - platform.pos[1] > 0) &&
          (this.pos[1] + this.height - platform.pos[1] < 15) &&
            (this.vel[1] >= 0)) {
              this.state.grounded = true;
              this.state.doubleJumped = false;
              this.state.jumped = 0;
        }
      }
    });
  }

  loadCharacterImages() {
    this.getAdultSimba();
    this.getPumbaa();
    this.getSimba();
    this.getBrian();
    this.getDoraemon();
  }

  getAdultSimba() {
    this.adultSimbaImages = [];
    for (let i = 1; i <= 10; i++) {
      let img = new Image();
      img.src = `assets/sprites/adult_simba/adult_simba${i}.png`;
      this.adultSimbaImages.push(img);
    }
  }

  drawAdultSimba() {
    if (this.state.grounded === false) {
      return this.adultSimbaImages[6];
    } else {
      return this.adultSimbaImages[this.currentFrame];
    }
  }

  getPumbaa() {
    this.pumbaaImages = [];
    for (let i = 1; i <= 10; i++) {
      let img = new Image();
      img.src = `assets/sprites/pumbaa/pumbaa${i}.png`;
      this.pumbaaImages.push(img);
    }
  }

  drawPumbaa() {
    if (this.state.grounded === false) {
      return this.pumbaaImages[9];
    } else {
      return this.pumbaaImages[this.currentFrame];
    }
  }

  getSimba() {
    this.simbaImages = [];
    for (let i = 1; i <= 10; i++) {
      let img = new Image();
      img.src = `assets/sprites/simba/simba${i}.png`;
      this.simbaImages.push(img);
    }
  }

  drawSimba() {
    if (this.state.grounded === false) {
      return this.simbaImages[3];
    } else {
      return this.simbaImages[this.currentFrame];
    }
  }

  getBrian() {
    this.brianImages = [];
    for (let i = 1; i <= 8; i++) {
      let img = new Image();
      img.src = `assets/sprites/brian/brian${i}.png`;
      this.brianImages.push(img);
    }
  }

  drawBrian() {
    if (this.state.grounded === false) {
      return this.brianImages[1];
    } else {
      return this.brianImages[this.currentFrame];
    }
  }

  getDoraemon() {
    this.DoraemonImages = [];
    for (let i = 1; i <= 8; i++) {
      let img = new Image();
      img.src = `assets/sprites/doraemon/doraemon${i}.png`;
      this.DoraemonImages.push(img);
    }
  }

  drawDoraemon() {
    if (this.state.grounded === false) {
      return this.DoraemonImages[5];
    } else {
      return this.DoraemonImages[this.currentFrame];
    }
  }
}

module.exports = Simba;
