// Grid Based Game
// Cherry Gupta
// October 30, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Project ideas and brainstorming:
// pacman 
// I will do this by making the player control pac with WASD and the ghosts will move around randomly
//  the goal is for the player to collect all the food and coins before going back home 
// the player also has to avoid thhe ghosts by moving around


// extra for experts:
// for my extra for experts I made class and played around with that. we also got shown bthis in class recentkly but I 
// coded most of the class stuff before ot was shown in class and I've been playinf aroufdn wiht it in my other projects as well.


let rows = 15;
let cols = 15;
let gridSize = 40;

// Game objects
let pacman;
let game;
let ghosts = [];
let pacmanFrameRateDivider = 10; // Slows down Pac-Man's movement
let ghostFrameRateDivider = 30; // Slows down Ghosts' movement

// Pac-Man class
class Pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dirX = 0;
    this.dirY = 0;
  }

  move(grid) {
    let newX = this.x + this.dirX;
    let newY = this.y + this.dirY;

    // Check if the new position is not a wall
    if (grid[newY][newX] !== 1) {
      this.x = newX;
      this.y = newY;

      // Eat the dot
      if (grid[this.y][this.x] === 0) {
        grid[this.y][this.x] = -1; // Mark as eaten
      }
    }
  }

  draw() {
    fill(255, 255, 0);
    ellipse(
      this.x * gridSize + gridSize / 2,
      this.y * gridSize + gridSize / 2,
      gridSize * 0.8
    );
  }
}

// Ghost class
class Ghost {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  move(grid, pacmanX, pacmanY) {
    let possibleMoves = [];

    // Check all possible moves
    if (grid[this.y - 1][this.x] !== 1) possibleMoves.push({ x: this.x, y: this.y - 1 });
    if (grid[this.y + 1][this.x] !== 1) possibleMoves.push({ x: this.x, y: this.y + 1 });
    if (grid[this.y][this.x - 1] !== 1) possibleMoves.push({ x: this.x - 1, y: this.y });
    if (grid[this.y][this.x + 1] !== 1) possibleMoves.push({ x: this.x + 1, y: this.y });

    // Pick the move that brings the ghost closer to Pac-Man
    let bestMove = possibleMoves[0];
    let bestDistance = dist(bestMove.x, bestMove.y, pacmanX, pacmanY);

    for (let move of possibleMoves) {
      let d = dist(move.x, move.y, pacmanX, pacmanY);
      if (d < bestDistance) {
        bestMove = move;
        bestDistance = d;
      }
    }

    // Update position
    this.x = bestMove.x;
    this.y = bestMove.y;
  }

  draw() {
    fill(this.color);
    ellipse(
      this.x * gridSize + gridSize / 2,
      this.y * gridSize + gridSize / 2,
      gridSize * 0.8
    );
  }
}

// Game class
class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.won = false;
    this.lost = false;
    this.initGrid();
  }

  initGrid() {
    for (let y = 0; y < this.rows; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.cols; x++) {
        if (x === 0 || y === 0 || x === this.cols - 1 || y === this.rows - 1 || random() < 0.2) {
          this.grid[y][x] = 1; // Wall
        } else {
          this.grid[y][x] = 0; // Dot
        }
      }
    }
    this.grid[pacman.y][pacman.x] = 0; // Clear Pac-Man's starting position
  }

  drawGrid() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] === 1) {
          fill(50, 50, 200); // Wall
          rect(x * gridSize, y * gridSize, gridSize, gridSize);
        } else if (this.grid[y][x] === 0) {
          fill(200, 200, 0); // Dot
          ellipse(
            x * gridSize + gridSize / 2,
            y * gridSize + gridSize / 2,
            gridSize / 4
          );
        }
      }
    }
  }

  checkWin() {
    // Check if there are any dots left
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] === 0) {
          return false;
        }
      }
    }
    this.won = true;
    return true;
  }

  checkLose() {
    // Check if any ghost caught Pac-Man
    for (let ghost of ghosts) {
      if (ghost.x === pacman.x && ghost.y === pacman.y) {
        this.lost = true;
        return true;
      }
    }
    return false;
  }
}

function setup() {
  createCanvas(cols * gridSize, rows * gridSize);
  pacman = new Pacman(1, 1);
  game = new Game(rows, cols);

  // Create ghosts
  ghosts.push(new Ghost(cols - 2, rows - 2, color(255, 0, 0)));
  ghosts.push(new Ghost(cols - 2, 1, color(0, 255, 0)));
}

function draw() {
  if (game.won) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Won!", width / 2, height / 2);
    noLoop(); // Stop the game loop
    return;
  }

  if (game.lost) {
    background(0);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Lose!", width / 2, height / 2);
    noLoop(); // Stop the game loop
    return;
  }

  background(0);

  game.drawGrid();

  if (frameCount % pacmanFrameRateDivider === 0) {
    pacman.move(game.grid);
  }

  if (frameCount % ghostFrameRateDivider === 0) {
    for (let ghost of ghosts) {
      ghost.move(game.grid, pacman.x, pacman.y);
    }
  }

  pacman.draw();
  for (let ghost of ghosts) {
    ghost.draw();
  }

  if (game.checkWin()) {
    game.won = true;
  }

  if (game.checkLose()) {
    game.lost = true;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    pacman.dirX = 0;
    pacman.dirY = -1;
  } else if (keyCode === DOWN_ARROW) {
    pacman.dirX = 0;
    pacman.dirY = 1;
  } else if (keyCode === LEFT_ARROW) {
    pacman.dirX = -1;
    pacman.dirY = 0;
  } else if (keyCode === RIGHT_ARROW) {
    pacman.dirX = 1;
    pacman.dirY = 0;
  }
}
