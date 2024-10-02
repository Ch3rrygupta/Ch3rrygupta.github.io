// SNAKE
// Cherry Gupta
// October 1, 2024
//
// Extra for Experts:
// In this project, I learned how to do a lot of things along the way (which are all scattered in comments throughout my code). 
// However, I would say that the two most difficult things that i learned about were:
// 1. Vectors and their lengths and directions. 
// 2. The "class" classification and the different functions that come with it

let snake;
let food;
let gridSize = 20;
let cols, rows;
let gameState = 'start'; // 'start', 'playing', 'gameOver'
let direction = { x: 0, y: 0 }; // Snake's direction
let startButton;
let score = 0;

function setup() {
  createCanvas(400, 400);
  // here I found out what frame rate was, so rather than 60 frames a second, I switched it to 10 to make the speed of the snake slower
  frameRate(8);
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  
  snake = new Snake();
  foodLocation();
  
  // Create a start button for the start screen
  // I learned how to make a button on my own here! I am using the button to change the state variable so we can start the game
  startButton = createButton('Start Game');
  startButton.position(width / 2 - 40, height / 2 + 20);
  startButton.mousePressed(startGame);
}


// this is just calling all the functions below
function draw() {
  background("pink");
  
  // state variables to help the program determines where in the game we are!!
  if (gameState === 'start') {
    startScreen();
  } else if (gameState === 'playing') {
    playingScreen();
  } else if (gameState === 'gameOver') {
    gameOverScreen();
  }
}

// creating a start screen 
// here I learned all about how to insert text, it's size, alignment, and and color
function startScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Snake Game", width / 2, height / 2 - 40);
  textSize(16);
  text("Click to Start", width / 2, height / 2);
}


// this function will set up our game screen!
function playingScreen() {
  // Nested loop for background grid effect
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(100);
      // here I learned about the line function, so I used that to draw my grid
      line(i * gridSize, 0, i * gridSize, height);
      line(0, j * gridSize, width, j * gridSize);
    }
  }
  
  // draw food
  fill(255, 0, 100);
  rect(food.x, food.y, gridSize, gridSize);
  
  // updating the snake and drawing the snake
  snake.update();
  snake.show();

}


// when the snake dies, this screen should show up!
function gameOverScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(16);
  text("Score: " + score, width / 2, height / 2);
  text("Thanks for playing! Reload this page to play again :)", width / 2, height / 2 + 40);
}

// a function to set up everything for the game and change the state variable to 'playing'
function startGame() {
  gameState = 'playing';
  startButton.hide();
  snake = new Snake();
  score = 0;
  direction = { x: 0, y: 0 };
}


// here I learned about the random function, so I used that to set a random height and width location for the snake food
function foodLocation() {
  let x = floor(random(cols)) * gridSize;
  let y = floor(random(rows)) * gridSize;
  food = createVector(x, y);
}

// For this function, I just took the example from the p5js reference and edited it to how I needed it to work. Then I changed the direction from x=0 and y=0 to whatever direction the snake needed to be going 
function keyPressed() {
  if (keyCode === UP_ARROW) {
    direction = { x: 0, y: -1 };
  } else if (keyCode === DOWN_ARROW) {
    direction = { x: 0, y: 1 };
  } else if (keyCode === RIGHT_ARROW) {
    direction = { x: 1, y: 0 };
  } else if (keyCode === LEFT_ARROW) {
    direction = { x: -1, y: 0 };
  }
}


// here I learned all about vectors, which after a lot of research, I decided was the best option for the snake game because they are described to have both direction and length
// I also decided to use the "class" classifier so that I could use the constructor, update, this.x, this.y and the update functions. I learned about these in a computer science online lesson I did this summer!
class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(cols / 2), floor(rows / 2));
    this.length = 1;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    head.x += direction.x;
    head.y += direction.y;
    
    // I always get really sad when my snake dies when it hits the edges of the screen, so I decided to make the snake wrap around the edges here:
    head.x = (head.x + cols) % cols;
    head.y = (head.y + rows) % rows;

    this.body.push(head);

    // here we are checking if the snake eats the food
    if (head.x === food.x / gridSize && head.y === food.y / gridSize) {
      foodLocation();
      score++;
    } else {
      this.body.shift(); // Remove tail if not eating
    }

    // here we are checking of there is any self-collision
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        gameState = 'gameOver';
      }
    }
  }
  
  // this is just the code to show the snake and how long it is
  show() {
    fill("yellow");
    // this will let our little snake grow!
    for (let i = 0; i < this.body.length; i++) {
      let part = this.body[i];
      rect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }
  }
}
