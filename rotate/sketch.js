// translae rotate
// Cherry

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push();

  translate(200, 200);
  rotate (mouseX);
  fill("red");
  rect(0, 0, 100, 100);
  
  pop();
  fill("green");
  rect(width/2, height-200, width*2, 400);
}

