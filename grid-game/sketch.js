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


let pac;
let grid = [];
let rows, cols;
const w = 20; //cell length (standard w = 10)
let speedX = 0;
let speedY = 0;
let totalScore = 0;
let p;
let ghosts = [];
let ghostNum = 4;
let r;
let thetaoff = 0;
let dir; //equals 0 if up arrow is pressed, 1 if right arrow is pressed, 2 if down arrow is pressed, 3 if left arrow is pressed
let neighbors = [];
let pacImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function preload(){
  pacImg = loadImage("pac.img");
}


function keyPressed() {
  if (key === "w") {
    //move up
    movePac(pac.x, pac.y - 1);
  }
  if (key === "s") {
    //move down
    movePac(pac.x, pac.y + 1);
  }
  if (key === "d") {
    //move right
    movePac(pac.x + 1, pac.y);
  }
  if (key === "a") {
    //move left
    movePac(pac.x - 1, pac.y);
  }
}