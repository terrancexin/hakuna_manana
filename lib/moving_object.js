class MovingObject {
  constructor(options) {
    this.game = options.game;

    this.height = options.height;
    this.width = options.width;

    this.pos = options.pos;
    this.vel = options.vel;

    this.color = options.color;

    this.renderWidth = options.renderWidth;
    this.renderHeight = options.renderHeight;
    this.yAdjust = options.yAdjust;
    this.xAdjust = options.xAdjust;
  }

  draw(ctx) {
    const image = new Image();
    image.src = this.path;
    let dx = this.pos[0] + this.xAdjust;
    let dy = this.pos[1] + this.yAdjust;
    ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
  }

  collideWith(otherObject) {
    // do nothing by default
  }

  corners() {
    let corners = {
      bottomLeft: [this.pos[0], this.pos[1]],
      topRight: [this.pos[0] + this.width, this.pos[1] + this.height]
    };

    return corners;
  }

  checkCollision(otherObject) {
    let thisCorners = this.corners();
    let thisLeft = thisCorners.bottomLeft;
    let thisRight = thisCorners.topRight;

    let otherObjectCorners = otherObject.corners();
    let otherObjectLeft = otherObjectCorners.bottomLeft;
    let otherObjectRight = otherObjectCorners.topRight;

    let collided = true;
    if (thisLeft[0] > otherObjectRight[0] || otherObjectLeft[0] > thisRight[0]){
      collided = false;
    }

    if (thisLeft[1] > otherObjectRight[1] || otherObjectLeft[1] > thisRight[1]) {
      collided = false;
    }

    return collided;
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
