// Image Demo
// Septemeber 23 ,2024

let toad;

function preload(){
  toad = loadImage{"toad.png"}
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(toad, mouseX, mouseY, toad.width *.5, toad.height * .5)
}
