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
    if (this.timons > 9) {
      const image = this.findPathPumbaa();
      let dx = this.pos[0] - 30;
      let dy = this.pos[1] + 14;
      ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
    } else {
      const image = this.findPathSimba();
      let dx = this.pos[0] - 30;
      let dy = this.pos[1] + 21;
      ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
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
      if (object.vel[1] < 10)
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

  findPathPumbaa() {
    const pumbaas = [];

    for (let i = 1; i <= 10; i++) {
      let pumbaa = new Image();
      pumbaa.src = `assets/sprites/pumbaa/pumbaa${i}.png`;
      pumbaas.push(pumbaa);
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
      return pumbaas[9];
    } else {
      return pumbaas[this.currentFrame];
    }
  }


  findPathSimba() {
    const simbas = [];

    for (let i = 1; i <= 10; i++) {
      let simba = new Image();
      simba.src = `assets/sprites/simba${i}.png`;
      simbas.push(simba);
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
      return simbas[3];
    } else {
      return simbas[this.currentFrame];
    }
  }
}

module.exports = Simba;
