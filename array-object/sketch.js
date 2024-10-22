// Cherry Gupta
// Arrays and Object Notation Project
// October 21, 2024
//
// Extra for Experts:
// - Worked with class again, something we havent worked with in class (I mean at school, not the javascript function lol) yet, I used a my own class to manage the water in the glasses
// - I also put a for loop inside of a for loop in the checkWinCondition() function, something we are meant to learn in class tomorrow! (October 22nd)
// - I also learned all about the null variable assignment, and used it along with the currentGlass variable. 
//   This means that I initialized the variable but didnt assign anything to it, this is how we will select and deselect the glasses during the game!
// 

// How to play:
// the goal is to sort and separate the water, so that there isn't more than one color of water in the same glass
// Click on a glass to select the top water and click on another glass where the 
// top water is the same color or an empty glass to pour the selected water in!
// you will win once there isn't more than one color in the same glass! 


// set some global variables
let glasses = [];
let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let currentGlass = null;
let gameWon = false;

function setup() {
  createCanvas(900, 600);
  let glassWidth = 100;
  let glassHeight = 200;
  let glassMargin = 20;
  let totalGlasses = 7; // Total glasses

  // Calculate starting x position to center the glasses
  let totalWidth = totalGlasses * glassWidth + (totalGlasses - 1) * glassMargin;
  let startX = (width - totalWidth) / 2;

  // Initialize glasses, with the last two being empty
  for (let i = 0; i < totalGlasses; i++) {
    let glass = new Glass(startX + i * (glassWidth + glassMargin), height - glassHeight - 50, glassWidth, glassHeight); // Raise glasses by 50 pixels
        
    // Fill with colored water only for the first five glasses, having the two empty ones makes it a bit eaier to sort!
    if (i < 5) {
      for (let j = 0; j < 3; j++) { // Fill glasses with 3 waters each
        glass.fillWater(random(colors));
      } 
    }

    glasses.push(glass);
  }
}

function draw() {
  background(230, 250, 255);

  title();
    
  // Draw each glass
  for (let glass of glasses){
    glass.draw();
  }
    
  // Check if the game is won
  if (gameWon) {
    displayWinningMessage();
  }

}

function mousePressed() {
  if (!gameWon) { // Only allow interaction if the game is not won already
    // Check which of the glasses is clicked
    for (let glass of glasses) {
      if (glass.isMouseOver()) {
        if (currentGlass === null) {
          currentGlass = glass; // Selecting the glass
        } 
        else {
          // Try to pour water from current glass to the clicked glass
          if (glass !== currentGlass && glass.canPour(currentGlass)) {
            glass.pour(currentGlass);
            checkWinCondition(); // Check if the game is won after pouring
          }
          currentGlass = null; // Deselect after pouring
        }
        break;
      }
    }
  }
}

// function that will check if all the glasses are sorted
function checkWinCondition() {
  // Check if all glasses are sorted
  let allSorted = true;

  for (let glass of glasses) {
    if (glass.water.length > 0) {
      let color = glass.water[0];
      for (let waterColor of glass.water) {
        if (waterColor !== color) {
          allSorted = false;
          break;
        }
      }
    }
  }

  if (allSorted) {
    gameWon = true;
  }
}

// fuction that will tell the player they won
function displayWinningMessage() {
  fill(255, 160, 210);
  textSize(40);
  textAlign(CENTER, CENTER);
  text ("You Won! Refresh to play again :)", width / 2, height / 3 );
}

// will show the game's name at the top of the screen
function title(){
  fill(0,154,255);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("🌊WATER SORT🌊", width/2, 100);

}


// Glass class to manage water in glasses
class Glass {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.water = [];
  }

  fillWater(color) {
    if (this.water.length < 5) { // Limit water levels
      this.water.push(color);
    }
  }
  
  draw() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    this.drawWater();
  }
  // draw the waters in the glasses
  drawWater() {
    for (let i = 0; i < this.water.length; i++) {
      fill(this.water[i]);
      rect(this.x, this.y + this.h - (i + 1) * (this.h / 5), this.w, this.h / 5);
    }
  }
  
  // check if the mouse is over any glass
  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
  }

  // check if we are able to pour into this glass
  canPour(fromGlass) {
    return this.water.length < 5 && (this.water.length === 0 || this.water[this.water.length - 1] === fromGlass.water[fromGlass.water.length - 1]);
  }

  // pour the water
  pour(fromGlass) {
    if (fromGlass.water.length > 0) {
      this.fillWater(fromGlass.water.pop());
    }
  }
}
