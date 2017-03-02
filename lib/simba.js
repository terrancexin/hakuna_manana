class Simba {
  constructor() {
    console.log('in Simba');

    this.state = { jumped: 0 };
    this.pos = [0, 450];
    this.vel = [0, 0];
  }

  draw(ctx) {
    const simbaImage = new Image();
    simbaImage.src = "assets/image/simba.png";
    ctx.drawImage(simbaImage, this.pos[0], this.pos[1], 50, 50);
  }

  move() {
    if (this.pos[1] < 250) {
      this.fall();
    } else if (this.pos[1] === 450 && this.vel[1] === 10) {
      this.vel[1] = 0;
    }

    this.pos = [
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ];
  }

  jump() {
    this.vel = [0, -10];
  }

  fall() {
    this.vel = [0, 10];
  }
}

module.exports = Simba;
