// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(228, 202, 152);
  drawGuitarBackground()
  drawGuitarStrings()
  
}

function drawGuitarBackground() {
  fill(16,16,16)
  ellipse (300, 210, 220, 190)
}

function drawGuitarStrings() {
  fill (97, 83, 73)
  rect(0, 150, 600, 3)
  rect(0, 173, 600, 3)
  rect(0, 196, 600, 4)
  fill(75, 59, 46)
  rect(0, 220, 600, 5)
  rect(0, 245, 600, 6)
  rect(0, 271, 600, 7)
}

