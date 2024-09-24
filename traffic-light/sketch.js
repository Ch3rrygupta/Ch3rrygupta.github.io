// Traffic Light Starter Code
// Cherry Gupta
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let redLight = false
let yellowLight = false
let greenLight = false
let lastSwitchTime = 0
let waitTime = 2000


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  switchToRed();
  switchToYellow();
  switchToGreen();
  changeColors();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  // fill("red");
  // ellipse(width/2, height/2 - 65, 50, 50); //top
  // fill("yellow");
  // ellipse(width/2, height/2, 50, 50); //middle
  // fill("green");
  // ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function switchToRed() {
if (redLight){
  fill("red");
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill("white");
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom

}
}

function switchToYellow() {
  if (yellowLight){
    fill("white");
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
    fill("white");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  
  }

}

function switchToGreen() {
  if (yellowLight){
    fill("white");
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill("white");
    ellipse(width/2, height/2, 50, 50); //middle
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  
  }

}

function changeColors(){
  if (millis()> lastSwitchTime+waitTime){
    let redLight = !redLight
    lastSwitchTime = millis()
  }
}

