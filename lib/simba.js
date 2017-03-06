const MovingObject = require("./moving_object");

class Simba extends MovingObject {
  constructor(options = {}) {
    options.height = 80;
    options.width = 40;

    options.pos = [200, 275];
    options.vel = [0, Simba.defaultVelocity];


    super(options);
    this.state = { alive: true,
      grounded: true,
      jumped: 0,
      doubleJumped: false,
      muted: false };
    this.path = 'assets/sprites/s1.png';
    this.renderHeight = 80;
    this.renderWidth = 70;
    this.xAdjust = -13;
    this.yAdjust = 3;
    this.currentFrame = 0;
    this.animationCount = 0;
    this.timons = 0;

    this.createImages();
    this.hakunamatata = new Audio('./assets/sounds/hakuna_matata.mp3');
  }

  draw(ctx) {
    const image = this.findPath();
    let dx = this.pos[0] + this.xAdjust;
    let dy = this.pos[1] + this.yAdjust;
    ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
  }

  jump() {
    if (!this.state.doubleJumped) {
      this.vel = [0, Simba.jumpStrength];

      this.state.jumped += 1;
      if (!this.state.grounded) {
        this.state.doubleJumped = true;

        if (this.state.jumped === 2) {
          if (!this.state.muted) {
            this.hakunamatata.play();
          }
        }

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

  createImages(){
    this.imageOne = new Image();
    this.imageOne.src = 'assets/sprites/simba1.png';

    this.imageTwo = new Image();
    this.imageTwo.src = 'assets/sprites/simba2.png';

    this.imageThree = new Image();
    this.imageThree.src = 'assets/sprites/simba3.png';

    this.imageFour = new Image();
    this.imageFour.src = 'assets/sprites/simba4.png';

    this.imageFive = new Image();
    this.imageFive.src = 'assets/sprites/simba5.png';

    this.imageSix = new Image();
    this.imageSix.src = 'assets/sprites/simba6.png';

    this.imageSeven = new Image();
    this.imageSeven.src = 'assets/sprites/simba7.png';

    this.imageEight = new Image();
    this.imageEight.src = 'assets/sprites/simba8.png';

    this.imageNine = new Image();
    this.imageNine.src = 'assets/sprites/simba9.png';

    this.imageTen = new Image();
    this.imageTen.src = 'assets/sprites/simba10.png';
  }

  findPath() {
    let pathArray = [
      this.imageOne,
      this.imageTwo,
      this.imageThree,
      this.imageFour,
      this.imageFive,
      this.imageSix,
      this.imageSeven,
      this.imageEight,
      this.imageNine,
      this.imageTen
    ];

    this.animationCount += 1;

    if (this.animationCount === 6) {
      this.currentFrame += 1;
      if (this.currentFrame === 8) {
        this.currentFrame = 0;
      }
      this.animationCount = 0;
    }

    if (this.state.grounded === false) {
      return this.imageFour;
    } else {
      return pathArray[this.currentFrame];
    }
  }
}

Simba.defaultVelocity = 10;
Simba.jumpStrength = -23;
Simba.gravityConstant = 0.8;

module.exports = Simba;
