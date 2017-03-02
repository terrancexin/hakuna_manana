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
	
	class Game {
	  constructor(ctx, canvas) {
	    console.log('in Game');
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	
	    this.simba = new Simba();
	    this.platform = new Platform();
	  }
	
	  draw(ctx) {
	    this.drawBackground();
	    this.simba.draw(this.ctx);
	    this.platform.draw(this.ctx);
	  }
	
	  drawBackground() {
	    this.ctx.clearRect(0, 0, 350, 500);
	    this.ctx.fillStyle = 'lightgreen';
	    this.ctx.fillRect(0, 0, 350, 500);
	  }
	
	  moveObjects() {
	    this.simba.move();
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
	
	    this.pos = [150, 400];
	    this.vel = [-5, 0];
	  }
	
	  draw(ctx) {
	    const platformImage = new Image();
	    platformImage.src = "assets/image/platform.png";
	    ctx.drawImage(platformImage, this.pos[0], this.pos[1], 90, 20);
	  }
	
	  move() {
	    if (this.pos[0] < 0) {
	      this.pos = [350, this.randomPos()];
	    }
	
	    this.pos = [
	      this.pos[0] + this.vel[0],
	      this.pos[1] + this.vel[1]
	    ];
	  }
	
	  randomPos() {
	    return Math.floor(Math.random() * (480-350) + 350);
	  }
	
	}
	
	module.exports = Platform;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map