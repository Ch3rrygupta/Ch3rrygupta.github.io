// Cherry Gupta
// Arrays and Object Notation Project
// October 21, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// project idea: I'm going to try to make the water sort game that I'm obsessed with playign on my phone. 
// how the game works is you try to get all the same colored water together but you cant stack different colored waters together.
// there will be two empty water cups and the empty ones you can put any color into
// the goal is to make all of the test tubes the same color of water and I'll try to make a little confetti everytime the tubes become completely sorted


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);
  drawTubes();
}

function drawTubes(){
  fill(255, 255, 255, 50);
  rect(width/9, height/5, 50, 200, 10);
  rect(width/9 *3, height/5, 50, 200, 10);
  rect(width/9 *5, height/5, 50, 200, 10);
  rect(width/9 *7, height/5, 50, 200, 10);
  rect(width/9, height/5 *3, 50, 200, 10);
  rect(width/9 *3, height/5 *3, 50, 200, 10);
  rect(width/9 *5, height/5 *3, 50, 200, 10);
  rect(width/9 *7, height/5 *3, 50, 200, 10);
}

function createBalls(){
  let theBalls = {
    
  };
}

