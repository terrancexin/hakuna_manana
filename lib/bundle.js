/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);

	document.addEventListener("DOMContentLoaded", () => {
	  const ctx = document.getElementById("simba-canvas").getContext("2d");
	  const image = new Image();
	  image.src = 'assets/images/start_screen2.jpg';
	  image.onload = () => { ctx.drawImage(image, 0, 0, 650, 370); };

	  const game = new Game();
	  new GameView(game, ctx).bindKeyHandlers();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Platform = __webpack_require__(2);
	const Simba = __webpack_require__(4);
	const Background = __webpack_require__(5);
	const Timon = __webpack_require__(6);

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
	    this.add(new Platform({ game: this, width: 200, pos: [180, 320], vel: [-6, 0] }));
	    this.add(new Platform({ game: this, width: 200, pos: [320, 320], vel: [-6, 0] }));
	    this.add(new Platform({ game: this, width: 200, pos: [450, 320], vel: [-6, 0] }));
	  }

	  removeOldPlatforms(){
	    if (this.platforms[0].pos[0] < -1000){
	      this.platforms.shift();
	    }
	  }

	  checkPlatformTimer(delta) {
	    this.platformTimer += delta;

	    if (this.platformTimer > 400) {
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

	    if (this.timonTimer > 500) {
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

	class Platform extends MovingObject {
	  constructor(options = {}) {
	    options.width = options.width || 170;

	    options.pos = options.pos || [1000, Math.floor(Math.random() * (350 - 120)) + 120];
	    options.vel = options.vel || [Math.floor(Math.random() * (-5 + 8)) + -8, 0];
	    super(options);

	    this.renderHeight = 60;
	    this.renderWidth = 170;
	  }

	  draw(ctx) {
	    const image = new Image();
	    image.src = 'assets/images/platform.png';
	    ctx.drawImage(image, this.pos[0], this.pos[1], this.renderWidth, this.renderHeight);
	  }
	}

	module.exports = Platform;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

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
	    if (this.timons < 10) {
	      const simba = this.findPathSimba();
	      let dx = this.pos[0] - 30;
	      let dy = this.pos[1] + 21;
	      ctx.drawImage(simba, dx, dy, this.renderWidth, this.renderHeight);
	    } else if (this.timons < 30) {
	      const pumbaa = this.findPathPumbaa();
	      let dx = this.pos[0] - 30;
	      let dy = this.pos[1] + 14;
	      ctx.drawImage(pumbaa, dx, dy, this.renderWidth, this.renderHeight);
	    } else if (this.timons < 50) {
	      const adultSimba = this.findPathAdultSimba();
	      let dx = this.pos[0] - 30;
	      let dy = this.pos[1] + 14;
	      ctx.drawImage(adultSimba, dx, dy, this.renderWidth, this.renderHeight);
	    } else if (this.timons < 100) {
	      const brian = this.findPathBrian();
	      let dx = this.pos[0] - 30;
	      let dy = this.pos[1] + 9;
	      ctx.drawImage(brian, dx, dy, this.renderWidth, this.renderHeight);
	    } else {
	      const doraemon = this.findPathDora();
	      let dx = this.pos[0] - 30;
	      let dy = this.pos[1] + 9;
	      ctx.drawImage(doraemon, dx, dy, this.renderWidth, this.renderHeight);
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

	    for (let i = 1; i <= 6; i++) {
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Background {
	  constructor() {
	    this.pos = [0, 0];
	    this.width = 1200;
	    this.height = 380;
	    this.speed = -1.5;

	    this.createImage();
	  }

	  createImage(){
	    this.image = new Image();
	    this.image.src = 'assets/images/game_bg_cloud.png';
	  }

	  draw(ctx) {
	    ctx.drawImage(this.image, this.pos[0], this.pos[1], this.width, this.height);
	    this.move();
	  }

	  move() {
	    this.pos[0] += this.speed;
	  }
	}

	module.exports = Background;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

	class Timon extends MovingObject {
	  constructor(options = {}) {
	    options.height = 40;
	    options.width = options.width || 40;

	    options.pos = options.pos ||
	      [1000, Math.floor(Math.random() * (320 - 50)) + 50];
	    options.vel = options.vel ||
	      [Math.floor(Math.random() * (-5 + 7)) + -7, 0];
	    super(options);

	    this.renderHeight = 40;
	    this.renderWidth = 40;
	    this.xAdjust = 0;
	    this.yAdjust = 0;
	    this.path = 'assets/images/timon.png';
	  }
	}

	module.exports = Timon;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Display = __webpack_require__(8);
	const Game = __webpack_require__(1);
	const Modal = __webpack_require__(9);

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.simba = this.game.addSimba();
	    this.gameDisplay = new Display(game, ctx);
	    this.state = {started: false, muted: false};
	    this.theme = new Audio('./assets/sounds/lower_volume_hakuna.mp3');

	    this.posX = -250;
	    this.posY = -10;
	    this.width = 380;
	    this.height = 320;
	  }

	  newGame(){
	    this.game.reset();
	    this.game = new Game();
	    this.gameDisplay = new Display(this.game, this.ctx);
	    this.restartGame();
	  }

	  restartGame() {
	    this.simba = this.game.addSimba();
	    this.background = this.game.addBackground();
	    this.lastTime = window.performance.now();
	    requestAnimationFrame(this.animate.bind(this));
	  }

	  animate(time) {
	    const timeDelta = time - this.lastTime;
	    if (this.game.gameOver()){
	      const score = this.gameDisplay.score();
	      if (localStorage.getItem("simbaHighScore") < score) {
	        localStorage.setItem("simbaHighScore", score);
	      }
	      return;
	    }

	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	    this.gameDisplay.drawScore(this.ctx);
	    this.gameDisplay.drawTimons(this.ctx);
	    this.gameDisplay.drawHighScore(this.ctx);
	    this.gameDisplay.drawEndScore(this.ctx);

	    requestAnimationFrame(this.animate.bind(this));
	  }

	  bindKeyHandlers() {
	    this.mouseClick();
	    this.enterKey();
	    this.spaceKey();
	    this.muteKey();
	    this.muteButton();
	    new Modal().displayModal();
	    new Modal().closeModal();

	  }

	  mouseClick() {
	    let that = this;
	    const canvas = document.getElementById('simba-canvas');
	    canvas.addEventListener('click', event => {
	      event.preventDefault();
	      that.game.simbas[0].jump();

	      if (!that.game.simbas[0].state.alive || !that.state.started) {
	        that.state.started = true;
	        that.newGame();
	      }
	    });
	  }

	  enterKey() {
	    let that = this;
	    document.addEventListener("keydown", event => {
	      if (event.key === "Enter") {
	        event.preventDefault();
	        if (!that.game.simbas[0].state.alive || !that.state.started) {
	          that.state.started = true;
	          that.theme.play();
	          that.newGame();
	        }
	      }
	    });
	  }

	  spaceKey() {
	    let that = this;
	    document.addEventListener("keydown", event => {
	      if (event.key === " ") {
	        event.preventDefault();
	        that.game.simbas[0].jump();
	      }
	    });
	  }

	  muteKey() {
	    let that = this;
	    document.addEventListener("keydown", event => {
	      if (event.key === "m") {
	        event.preventDefault();
	        if (that.state.muted) {
	          that.state.muted = false;
	          that.theme.play();
	        } else {
	          that.state.muted = true;
	          that.theme.pause();
	        }
	      }
	    });
	  }

	  muteButton() {
	    let that = this;
	    const mute = document.getElementsByClassName("mute")[0];
	    mute.onclick = function() {
	      if (that.state.muted) {
	        that.state.muted = false;
	        that.theme.play();
	      } else {
	        that.state.muted = true;
	        that.theme.pause();
	      }
	    };
	  }

	}

	module.exports = GameView;


/***/ },
/* 8 */
/***/ function(module, exports) {

	class Display {
	  constructor(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	  }

	  score() {
	    return Math.round(this.game.score);
	  }

	  draw(ctx) {
	    this.drawScore(ctx);
	    this.drawTimons(ctx);
	    this.drawHighScore(ctx);
	  }

	  drawHighScore(ctx) {
	    let score = 0;
	    score = localStorage.getItem("simbaHighScore");
	    if (this.score() > score) {
	      score = this.score();
	    }
	    ctx.font = "13px Michroma";
	    ctx.fillStyle = "white";
	    ctx.fillText("High Score: "+score, 350, 15);
	  }

	  drawScore(ctx) {
	    let score = this.score();
	    ctx.font = "16px Michroma";
	    ctx.fillStyle = "yellow";
	    ctx.fillText("Score: "+score, 190, 15);
	  }

	  drawEndScore(ctx) {
	    if (this.game.gameOver()) {
	      let score = this.score();
	      ctx.font = "30px Michroma";
	      ctx.fillStyle = "yellow";
	      ctx.fillText("Score: "+score, 160, 100);
	    }
	  }

	  drawTimons(ctx){
	    let timons = this.game.simbas[0].timons;
	    ctx.font = "15px Michroma";
	    ctx.fillStyle = "white";
	    ctx.fillText("Timons: "+timons, 7, 350);
	  }
	}

	module.exports = Display;


/***/ },
/* 9 */
/***/ function(module, exports) {

	class Modal {
	  displayModal() {
	    const modal = document.getElementById('myModal');
	    const btn = document.getElementById("myBtn");
	    btn.onclick = function() {
	      modal.style.display = "block";
	    };

	  }

	  closeModal() {
	    const modal = document.getElementById('myModal');
	    const span = document.getElementsByClassName("close")[0];
	    span.onclick = function() {
	      modal.style.display = "none";
	    };

	    window.onclick = function(event) {
	      if (event.target == modal) {
	        modal.style.display = "none";
	      }
	    };
	  }

	}

	module.exports = Modal;


/***/ }
/******/ ]);