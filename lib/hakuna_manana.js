const Game = require('./game');
const GameView = require('./game_view');
const Background = require('./background');

document.addEventListener('DOMContentLoaded', () => {
  let config = {
    apiKey: 'AIzaSyCkc7AqvZbJavZJuZMiA6D7XlKjg-ixuz0',
    authDomain: 'simba-4ddb5.firebaseapp.com',
    databaseURL: 'https://simba-4ddb5.firebaseio.com',
    projectId: 'simba-4ddb5',
    storageBucket: 'simba-4ddb5.appspot.com',
    messagingSenderId: '885067473338',
  };
  firebase.initializeApp(config);

  const ctx = document.getElementById('simba-canvas').getContext('2d');
  const image = new Image();
  image.src = 'assets/images/start_screen.jpg';

  new Background();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 650, 370);
  };

  const game = new Game();
  new GameView(game, ctx).bindKeyHandlers();
});
