const MovingObject = require("./moving_object");

class Simba extends MovingObject {
  constructor(options = {}) {
    options.height = 80;
    options.width = 20;

    options.pos = [100, 0];
    options.vel = [0, 10];

    super(options);
    this.state = { alive: true,
      grounded: true,
      jumped: 0,
      doubleJumped: false };
    this.renderHeight = 70;
    this.renderWidth = 50;
    this.currentFrame = 0;
    this.animationCount = 0;
    this.timons = 0;

    this.jumpStrength = -19;
  }

  draw(ctx) {
    let that = this;
    if (that.timons < 10) {
      const image = that.findPathSimba();
      let dx = that.pos[0] - 30;
      let dy = that.pos[1] + 21;
      ctx.drawImage(image, dx, dy, that.renderWidth, that.renderHeight);
    } else if (that.timons < 30) {
      const image = that.findPathPumbaa();
      let dx = that.pos[0] - 30;
      let dy = that.pos[1] + 14;
      ctx.drawImage(image, dx, dy, that.renderWidth, that.renderHeight);
    } else if (that.timons < 50) {
      const image = that.findPathAdultSimba();
      let dx = that.pos[0] - 30;
      let dy = that.pos[1] + 14;
      ctx.drawImage(image, dx, dy, that.renderWidth, that.renderHeight);
    } else if (that.timons < 100) {
      const image = that.findPathBrian();
      let dx = that.pos[0] - 30;
      let dy = that.pos[1] + 9;
      ctx.drawImage(image, dx, dy, that.renderWidth, that.renderHeight);
    } else {
      const image = that.findPathDora();
      let dx = that.pos[0] - 30;
      let dy = that.pos[1] + 9;
      ctx.drawImage(image, dx, dy, that.renderWidth, that.renderHeight);
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

  findPathAdultSimba() {
    const images = [];

    for (let i = 1; i <= 12; i++) {
      let img = new Image();
      img.src = `assets/sprites/adult_simba/adult_simba${i}.png`;
      images.push(img);
    }

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 12) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return images[6];
    } else {
      return images[this.currentFrame];
    }
  }

  findPathPumbaa() {
    const images = [];

    for (let i = 1; i <= 10; i++) {
      let img = new Image();
      img.src = `assets/sprites/pumbaa/pumbaa${i}.png`;
      images.push(img);
    }

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 10) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return images[9];
    } else {
      return images[this.currentFrame];
    }
  }


  findPathSimba() {
    const images = [];

    for (let i = 1; i <= 10; i++) {
      let img = new Image();
      img.src = `assets/sprites/simba/simba${i}.png`;
      images.push(img);
    }

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 8) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return images[3];
    } else {
      return images[this.currentFrame];
    }
  }

  findPathBrian() {
    const images = [];

    for (let i = 1; i <= 8; i++) {
      let img = new Image();
      img.src = `assets/sprites/brian/brian${i}.png`;
      images.push(img);
    }

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 8) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return images[1];
    } else {
      return images[this.currentFrame];
    }
  }

  findPathDora() {
    const images = [];

    for (let i = 1; i <= 8; i++) {
      let img = new Image();
      img.src = `assets/sprites/dora/dora${i}.png`;
      images.push(img);
    }

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 6) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return images[3];
    } else {
      return images[this.currentFrame];
    }
  }
}

module.exports = Simba;
