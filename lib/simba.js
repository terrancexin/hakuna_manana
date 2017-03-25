const MovingObject = require("./moving_object");

class Simba extends MovingObject {
  constructor(options = {}) {
    options.height = 80;
    options.width = 60;

    options.pos = [100, 0];
    options.vel = [0, Simba.defaultVelocity];


    super(options);
    this.state = { alive: true,
      grounded: true,
      jumped: 0,
      doubleJumped: false };
    this.path = 'assets/sprites/s1.png';
    this.renderHeight = 70;
    this.renderWidth = 60;
    this.xAdjust = -30;
    this.yAdjust = 20;
    this.currentFrame = 0;
    this.animationCount = 0;
    this.timons = 0;
  }

  draw(ctx) {
    if (this.timons > 5) {
      const image = this.findPathPumbaa();
      let dx = this.pos[0] + this.xAdjust;
      let dy = this.pos[1] + this.yAdjust;
      ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
    } else {
      const image = this.findPath();
      let dx = this.pos[0] + this.xAdjust;
      let dy = this.pos[1] + this.yAdjust;
      ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
    }
  }

  dash() {
    this.pos[0] += 100;
  }

  jump() {
    if (!this.state.doubleJumped) {
      this.vel = [0, Simba.jumpStrength];

      this.state.jumped += 1;
      if (!this.state.grounded) {
        this.state.doubleJumped = true;
      }
    } else {
      this.vel[1] = 1.5;
    }
  }

  jumpPhysics(object) {
    const currentVelocity = object.vel[1];
    if ((currentVelocity < Simba.defaultVelocity && currentVelocity !== 0) || !this.state.grounded){
      if (object.vel[1] < Simba.defaultVelocity)
        { object.vel[1] += Simba.gravityConstant; }
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


  findPath() {
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

Simba.defaultVelocity = 10;
Simba.jumpStrength = -23;
Simba.gravityConstant = 1.1;

module.exports = Simba;
