// Project Title
// Your Name
// Date
//
// Extra for Experts:
// In this project I learned how to download sounds from youtube and put them into 


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(228, 202, 152);
  drawGuitarBackground()
  drawChordButtons()
  drawGuitarStrings()
  
}

// this will draw the guitar body color and the hole
function drawGuitarBackground() {
  fill(16,16,16)
  ellipse (300, 210, 220, 190)
}

// this will draw the guitar strings, from tickest to thinnest
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

function drawChordButtons(){
  // I learned how to change the opacity of a filled shape here!
  fill(190, 190, 190, 110);
  rect(74, 50, 50, 300, 10)
  rect(141, 50, 50, 300, 10)
  rect(208, 50, 50, 300, 10)
  rect(275, 50, 50, 300, 10)
  rect(342, 50, 50, 300, 10)
  rect(409, 50, 50, 300, 10)
  rect(476, 50, 50, 300, 10)
  // I learned how to add text to a scene here.
  textSize(30)
  fill(88, 16, 16)
  text('Em', 76, 100);
  text('Am', 143, 100);
  text('Dm', 210, 100);
  text('G', 277, 100);
  text('C', 344, 100);
  text('F', 412, 100);
  text('Bb', 478, 100);



}

