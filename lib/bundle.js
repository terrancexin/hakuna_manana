/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById('simba-canvas');
	  const ctx = canvas.getContext('2d');
	
	  const game = new Game(ctx);
	  const gameView = new GameView(game, ctx);
	
	  gameView.start();
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Simba = __webpack_require__(2);
	const Platform = __webpack_require__(5);
	const Background = __webpack_require__(6);
	
	class Game {
	  constructor(ctx, canvas) {
	    console.log('in Game');
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	
	    this.simba = new Simba();
	    this.platform = new Platform();
	    this.background = new Background();
	  }
	
	  draw(ctx) {
	    this.drawBackground();
	    this.background.draw(this.ctx);
	    this.simba.draw(this.ctx);
	    this.platform.draw(this.ctx);
	  }
	
	  drawBackground() {
	    // this.ctx.clearRect(0, 0, 350, 500);
	    // this.ctx.fillStyle = 'lightgreen';
	    // this.ctx.fillRect(0, 0, 350, 500);
	  }
	
	  moveObjects(platform) {
	    this.simba.move(this.platform);
	    this.platform.move();
	  }
	
	  step() {
	    this.moveObjects();
	    // more logic - check if simba on platform ,etc.
	  }
	
	
	  jump() {
	    console.log("jump in Game");
	    this.simba.jump();
	  }
	
	
	
	
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Simba {
	  constructor() {
	    console.log('in Simba');
	    this.width = 70;
	    this.height = 70;
	
	    this.jumped = false;
	    this.landed = false;
	
	    this.posX = 50;
	    this.posY = 430;
	
	    this.velX = 0;
	    this.velY = 0;
	  }
	
	  draw(ctx) {
	    const simbaImage = new Image();
	    simbaImage.src = "assets/image/simba.png";
	    ctx.drawImage(simbaImage, this.posX, this.posY, this.width, this.height);
	  }
	
	  move(platform) {
	    if (this.posY < 300) {
	      this.fall();
	    } else if (this.posY === 450 && this.velY === 5) {
	      this.velY = 0;
	    }
	
	
	    // this.checkPlatform(platform);
	    this.checkLanding(platform);
	
	    // this.checkPlatform(platform);
	    this.checkBounds();
	
	    this.posX += this.velX;
	    this.posY += this.velY;
	  }
	
	  jump() {
	    this.velX = 0;
	    this.velY = -5;
	  }
	
	  fall() {
	    this.velX = 0;
	    this.velY = 5;
	  }
	
	  checkLanding(platform) {
	    console.log((this.posY + this.height) + ` ` + (platform.posY -5));
	    if ((this.posY + this.height) > (platform.posY) && (this.posY + this.height) < (platform.posY + 20)) {
	      // console.log((this.posX) + ` ` + (platform.posX));
	      if(this.posX > (platform.posX - 20) && this.posX < (platform.posX + 60)) {
	        this.velY = 0;
	        this.velX = platform.velX;
	        this.landed = true;
	      }
	    }
	  }
	
	
	  checkBounds() {
	    if (this.posX < -100) {
	      this.posX = 50;
	      this.posY = 430;
	      this.velX = 0;
	    }
	  }
	
	  checkPlatform(platform) {
	    if(this.posX !== (platform.posX - 20) && this.posX !== (platform.posX + 60)) {
	      this.velY = 1;
	    }
	
	    // if (this.posY >= 450 && this.velY === 5) {
	    //   this.velY = 0;
	    // }
	  }
	
	}
	
	module.exports = Simba;


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	  }
	
	  animate() {
	    this.game.step();
	    this.game.draw(this.ctx);
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  // window.addEventListener("keydown", function(e) {
	  bindKeyHandlers() {
	    document.addEventListener('keydown', e => {
	      if (e.key === " ") {
	        this.game.jump();
	      }
	    });
	  }
	
	  start() {
	    this.bindKeyHandlers();
	  //start the animation
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  
	}
	
	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Platform {
	  constructor() {
	    console.log('in Platform');
	
	    this.posX = 150;
	    this.posY = 380;
	
	    this.velX = -3;
	    this.velY = 0;
	
	    this.width = 90;
	    this.height = 40;
	
	  }
	
	  draw(ctx) {
	    const platformImage = new Image();
	    platformImage.src = "assets/image/platform1.png";
	    ctx.drawImage(platformImage, this.posX, this.posY, this.width, this.height);
	  }
	
	  move() {
	    if (this.posX < -100) {
	      this.posX = 350;
	      this.posY = this.randomPos();
	    }
	
	    this.posX += this.velX;
	    this.posY += this.velY;
	  }
	
	  randomPos() {
	    return Math.floor(Math.random() * (430-350) + 350);
	  }
	
	}
	
	module.exports = Platform;


/***/ },
/* 6 */
/***/ function(module, exports) {

	class Background {
	  constructor() {
	    this.width = 400;
	    this.height = 550;
	
	    this.posX = 0;
	    this.posY = 0;
	  }
	
	  draw(ctx) {
	    const bgImage = new Image();
	    bgImage.src = "assets/image/canvas-bg.png";
	    ctx.drawImage(bgImage, this.posX, this.posY, this.width, this.height);
	  }
	
	  move() {
	    // this.posX += -0.5;
	  }
	}
	
	module.exports = Background;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map