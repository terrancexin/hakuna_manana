# Hakuna Mañana
### [LIVE](https://www.terrancexin.com/hakuna_manana/)

##### "Hakuna" in Swahili means "there is not". "Mañana" in Spanish means "tomorrow".
#### There is no tomorrow, play today!

![intro](./docs/simba_intro.gif)

## Background
Hakuna Mañana is a Lion King themed platform jumper game. You play as Simba, jumping without any worries.
Simba must continuously land on platforms. A high score is given based on how far he goes before falling off the screen.

## Features & Implementation
#### Game Logic
* Creating new objects: Simba, Platform, Timon (inherits from MovingObject Class)
* Updating Simba's positions based on its velocities
* Handling collisions
* Calculating Timon collections

#### Technologies Used
* JavaScript
* Native browser DOM API
* HTML5 Canvas

#### Jumping Physics
Jump is calculated by comparing the currentVelocity to its default velocity.
```js
jumpPhysics(object) {
  const currentVelocity = object.vel[1];
  if ((currentVelocity < 10 && currentVelocity !== 0) || !this.state.grounded){
    if (currentVelocity < 10)
      { object.vel[1] += 1.1; }
  }
}
```

#### Collision Detection
The positions of Simba is checked against the positions of Platform for landing, in which both x and y coordinates are calculated.

```js
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
```
#### Audio / Music Toggling
Sound effects and music toggling were controlled with JavaScript's HTML5AudioElement Web API. Audio files were imported as mp3 files. Music toggling was enabled through API functions including pause, play, and load.
```js
this.theme = new Audio('./assets/sounds/lower_volume_hakuna.mp3');

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
```

### Future Directions
* Horizontal dash boost
* Collect power ups
* Dodge obstacles
