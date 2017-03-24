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

	  const game = new Game();
	  new GameView(game, ctx).entry();
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

	    this.state = { muted: false };
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
	    ctx.fillStyle = Game.BG_COLOR;
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
	    if (this.backgrounds[0].pos[0] < -1190 && this.backgrounds.length < 2) {
	      let background = new Background();
	      background.pos[0] = 1005;
	      this.add(background);
	    }

	    if (this.backgrounds[0].pos[0] < -3000) {
	      this.backgrounds.shift();
	    }
	  }

	  addPlatforms() {
	    for (let i = 0; i < Game.NUM_PLATFORMS; i++) {
	      this.add(new Platform({ game: this }));
	    }
	  }

	  addStartPlatform() {
	    this.add(new Platform({ game: this, width: 200, pos: [20, 100], vel: [-6, 0] }));
	    this.add(new Platform({ game: this, width: 200, pos: [200, 100], vel: [-6, 0] }));
	    this.add(new Platform({ game: this, width: 200, pos: [400, 100], vel: [-6, 0] }));
	  }

	  removeOldPlatforms(){
	    if (this.platforms[0].pos[0] < -1000){
	      this.platforms.shift();
	    }
	  }

	  checkPlatformTimer(delta) {
	    this.platformTimer += delta;

	    if (this.platformTimer > 1350) {
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

	    if (this.timonTimer > 1000) {
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

	Game.BG_COLOR = "#ffffff";
	Game.DIM_X = 380;
	Game.DIM_Y = 320;
	Game.NUM_PLATFORMS = 1;
	Game.NUM_TIMONS = 3;

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);

	class Platform extends MovingObject {
	  constructor(options = {}) {
	    options.height = 15;
	    options.width = options.width || 200;

	    options.pos = options.pos || [1000, Math.floor(Math.random() * (310 - 150)) + 150];
	    options.vel = options.vel || [Math.floor(Math.random() * (-5 + 7)) + -7, 0];
	    super(options);

	    this.path = 'assets/images/platform.png';

	    this.renderHeight = 80;
	    this.renderWidth = 200;
	    this.xAdjust = 0;
	    this.yAdjust = 0;
	  }

	  draw(ctx) {
	    const image = new Image();
	    image.src = this.path;
	    let dx = this.pos[0] + this.xAdjust;
	    let dy = this.pos[1] + this.yAdjust;
	    ctx.drawImage(image, dx, dy, this.renderWidth, this.renderHeight);
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
	    options.width = 40;

	    options.pos = [100, 0];
	    options.vel = [0, Simba.defaultVelocity];
	    // debugger


	    super(options);
	    this.state = { alive: true,
	      grounded: true,
	      jumped: 0,
	      doubleJumped: false,
	      muted: false };
	    this.path = 'assets/sprites/s1.png';
	    this.renderHeight = 70;
	    this.renderWidth = 60;
	    this.xAdjust = -30;
	    this.yAdjust = 20;
	    this.currentFrame = 0;
	    this.animationCount = 0;
	    this.timons = 0;

	    this.createImages();
	    this.hakunamatata = new Audio('./assets/sounds/hakuna_matata.mp3');
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
	    this.pumbaaOne = new Image();
	    this.pumbaaOne.src = 'assets/sprites/pumbaa/pumbaa1.png';

	    this.pumbaaTwo = new Image();
	    this.pumbaaTwo.src = 'assets/sprites/pumbaa/pumbaa2.png';

	    this.pumbaaThree = new Image();
	    this.pumbaaThree.src = 'assets/sprites/pumbaa/pumbaa3.png';

	    this.pumbaaFour = new Image();
	    this.pumbaaFour.src = 'assets/sprites/pumbaa/pumbaa4.png';

	    this.pumbaaFive = new Image();
	    this.pumbaaFive.src = 'assets/sprites/pumbaa/pumbaa5.png';

	    this.pumbaaSix = new Image();
	    this.pumbaaSix.src = 'assets/sprites/pumbaa/pumbaa6.png';

	    this.pumbaaSeven = new Image();
	    this.pumbaaSeven.src = 'assets/sprites/pumbaa/pumbaa7.png';

	    this.pumbaaEight = new Image();
	    this.pumbaaEight.src = 'assets/sprites/pumbaa/pumbaa8.png';

	    this.pumbaaNine = new Image();
	    this.pumbaaNine.src = 'assets/sprites/pumbaa/pumbaa9.png';

	    this.pumbaaTen = new Image();
	    this.pumbaaTen.src = 'assets/sprites/pumbaa/pumbaa10.png';

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

	  findPathPumbaa() {
	      let pathArray = [
	        this.pumbaaOne,
	        this.pumbaaTwo,
	        this.pumbaaThree,
	        this.pumbaaFour,
	        this.pumbaaFive,
	        this.pumbaaSix,
	        this.pumbaaSeven,
	        this.pumbaaEight,
	        this.pumbaaNine,
	        this.pumbaaTen
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
	      return this.pumbaaTen;
	    } else {
	      return pathArray[this.currentFrame];
	    }
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
	Simba.gravityConstant = 1.1;

	module.exports = Simba;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Background {
	  constructor() {
	    this.pos = [0, 0];
	    this.width = 2200;
	    this.height = 600;
	    this.speed = -1.5;
	    this.path = 'assets/images/desert_new.jpg';

	    this.createImage();
	  }

	  createImage(){
	    this.image = new Image();
	    this.image.src = this.path;
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
	      [1000, Math.floor(Math.random() * (280 - 50)) + 50];
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
	    this.path = 'assets/images/start_screen.jpg';
	  }

	  newGame(){
	    this.game.reset();
	    this.game = new Game();
	    this.gameDisplay = new Display(this.game, this.ctx);
	    this.restartGame();
	    this.setAudio();
	  }

	  setAudio() {
	    if (this.state.muted) {
	      this.game.state.muted = true;
	      this.simba.state.muted = true;
	    }
	  }

	  restartGame() {
	    this.simba = this.game.addSimba();
	    this.background = this.game.addBackground();
	    this.lastTime = window.performance.now();
	    requestAnimationFrame(this.animate.bind(this));
	  }

	  bindKeyHandlers() {
	    let that = this;
	    const s = document.getElementById('simba-canvas');
	    s.addEventListener('click', function(e) {
	      e.preventDefault();
	      that.game.simbas[0].jump();
	      if (!that.game.simbas[0].state.alive || !that.state.started) {
	        that.state.started = true;
	        that.newGame();
	      }
	    });

	    window.addEventListener("keydown", function(e) {
	      if (e.keyCode === 13) { //enter
	        if (!that.game.simbas[0].state.alive || !that.state.started) {
	          that.state.started = true;
	          that.theme.play();
	          that.newGame();
	        }
	      }
	    });

	    window.addEventListener("keydown", function(e) {
	      if (e.keyCode === 32) { //space
	        e.preventDefault();
	        that.game.simbas[0].jump();
	      }
	    });

	    window.addEventListener("keydown", function(e) {
	      if (e.keyCode === 68) { //d
	        e.preventDefault();
	        that.game.simbas[0].dash();
	      }
	    });

	    window.addEventListener("keydown", function(e) {
	      if (e.keyCode === 77) { //m
	        e.preventDefault();
	        if (that.state.muted) {
	          that.state.muted = false;
	          that.game.state.muted = false;
	          that.simba.state.muted = false;
	          that.theme.play();
	        } else {
	          that.state.muted = true;
	          that.game.state.muted = true;
	          that.simba.state.muted = true;
	          that.theme.pause();
	          that.simba.hakunamatata.pause();
	          that.simba.hakunamatata = new Audio('./assets/sounds/hakuna_matata.mp3');
	        }
	      }
	    });
	  }

	  entry() {
	    this.bindKeyHandlers();
	    this.drawStartScreen();
	  }

	  drawStartScreen() {
	    const image = new Image();
	    image.src = './assets/images/start_screen2.jpg';
	    this.ctx.drawImage(image, 0, 0);

	    let that = this.ctx;
	    image.onload = function() {
	      that.drawImage(image, 0, 0);
	    };
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
	    this.gameDisplay.drawEnd(this.ctx);

	    requestAnimationFrame(this.animate.bind(this));
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
	    ctx.fillText("High Score: "+score, 285, 15);
	  }

	  drawScore(ctx) {
	    let score = this.score();
	    ctx.font = "16px Michroma";
	    ctx.fillStyle = "yellow";
	    ctx.fillText("Score: "+score, 160, 15);
	  }

	  drawTimons(ctx){
	    let timons = this.game.simbas[0].timons;
	    ctx.font = "14px Michroma";
	    ctx.fillStyle = "orange";
	    ctx.fillText("Timons: "+timons, 7, 312);
	  }

	  drawEnd(ctx) {
	    if (this.game.gameOver()) {
	      let score = this.score();
	      ctx.font = "30px Michroma";
	      ctx.fillStyle = "yellow";
	      ctx.strokeStyle = "white";
	      ctx.lineWidth = 1;
	      ctx.strokeText("Score: "+score, 135, 100);
	      ctx.fillText("Score: "+score, 135, 100);
	    }
	  }
	}

	module.exports = Display;


/***/ }
/******/ ]);