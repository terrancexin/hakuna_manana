const Platform = require("./platform.js");
const Simba = require("./simba");
const Background = require("./background");
const Timon = require("./timon");

class Game {
  constructor() {
    this.platforms = [];
    this.simbas = [];
    this.backgrounds = [];
    this.timons = [];

    this.platformTimer = 0;
    this.timonTimer = 0;
    this.score = 0;
    this.addStartPlatform();
    this.addPlatforms();
    this.addTimons();

  }

  reset() {
    this.simbas[0].state.alive = true;
    this.platforms = [];
    this.simbas = [];
    this.backgrounds = [];
    this.timons = [];

    this.platformTimer = 0;
    this.timonTimer = 0;
    this.score = 0;
    this.addStartPlatform();
    this.addPlatforms();
  }

  add(object) {
    if (object instanceof Platform) {
      this.platforms.push(object);
    } else if (object instanceof Simba) {
      this.simbas.push(object);
    } else if (object instanceof Background) {
      this.backgrounds.push(object);
    } else if (object instanceof Timon) {
      this.timons.push(object);
    } else {
      throw "error";
    }
  }

  addSimba() {
    const simba = new Simba({ game: this });
    this.add(simba);
    return simba;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);


    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  allObjects() {
    return [].concat(this.backgrounds, this.simbas, this.platforms, this.timons);
  }

  allColliders() {
    return [].concat(this.platforms, this.timons);
  }

  handleSimba() {
    this.simbas[0].handleSimba();

  }

  gameOver() {
    let simba = this.simbas[0];

    if (simba.pos[1] > Game.DIM_Y + 12) { simba.state.alive = false; }
    if (simba.state.alive === false) { return true; }
  }

  checkCollisions() {
    const simba = this.simbas[0];
    this.allColliders().forEach( object => object.checkCollision(simba));
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      if (object instanceof Simba) {
        object.jumpPhysics(object);
      }
      object.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.incrementScore(delta);
    this.removeOldPlatforms();
    this.removeOldTimons();
    this.checkBackground();
    this.checkPlatformTimer(delta);
    this.checkTimonTimer(delta);
    this.checkPlatformCollisions();
    this.checkTimonCollisions();
    this.handleSimba();
    this.checkCollisions();
    this.gameOver();
  }

  addBackground() {
    let background = new Background();
    this.add(background);
  }

  checkBackground() {
    if (this.backgrounds[0].pos[0] < -499 && this.backgrounds.length < 2) {
      let background = new Background();
      background.pos[0] = 700;
      this.add(background);
    }

    if (this.backgrounds[0].pos[0] < -1200) {
      this.backgrounds.shift();
    }
  }

  addPlatforms() {
    for (let i = 0; i < Game.NUM_PLATFORMS; i++) {
      this.add(new Platform({ game: this }));
    }
  }

  addStartPlatform() {
    this.add(new Platform({ game: this, width: 200, pos: [50, 320], vel: [-6, 0] }));
    this.add(new Platform({ game: this, width: 200, pos: [200, 320], vel: [-6, 0] }));
    this.add(new Platform({ game: this, width: 200, pos: [350, 320], vel: [-6, 0] }));
  }

  removeOldPlatforms(){
    if (this.platforms[0].pos[0] < -1000){
      this.platforms.shift();
    }
  }

  checkPlatformTimer(delta) {
    this.platformTimer += delta;

    if (this.platformTimer > 700) {
      this.add(new Platform({ game: this }));
      this.platformTimer = 0;
    }
  }

  checkPlatformCollisions() {
    const simba = this.simbas[0];
    simba.checkPlatformCollision();
  }

  addTimons() {
    for (let i = 0; i < Game.NUM_TIMONS; i++) {
      this.add(new Timon({ game: this }));
    }
  }

  checkTimonTimer(delta) {
    this.timonTimer += delta;

    if (this.timonTimer > 700) {
      this.add(new Timon({ game: this }));
      this.timonTimer = 0;
    }
  }

  checkTimonCollisions() {
    const simba = this.simbas[0];
    this.timons.forEach( timon => {
      if (simba.checkCollision(timon)) {
        this.timons.shift();
        simba.timons += 1;
      }
    });
  }

  removeOldTimons(){
    if (this.timons.length !== 0 && this.timons[0].pos[0] < -1000) {
      this.timons.shift();
     }
  }

  incrementScore(delta) {
    this.score += Math.ceil(delta) / 100;
  }
}

Game.BG_COLOR = "blue";
Game.DIM_X = 450;
Game.DIM_Y = 370;
Game.NUM_PLATFORMS = 1;
Game.NUM_TIMONS = 3;

module.exports = Game;
