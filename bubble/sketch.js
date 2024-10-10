// Bubble Objcet Demo
// Cherry 
// Oct 10, 2024

let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++){
    spawnBubble();
  }

  //create a new bubble every half second
  window.setInterval(spawnBubble, 500);

}

function draw() {
  background(220);
  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
  displayGraves();
}

function displayGraves() {
  for (let grave of deathLocations) {
    textAlign(CENTER, CENTER);
    fill("black");
    text("X", grave.x, grave.y);
  }
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedOnBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      undertaker(mouseX, mouseY);
    }
  }
}

function undertaker(theX, theY) {
  let grave = {
    x: theX, 
    y: theY,
  };
  deathLocations.push(grave);
}

function clickedOnBubble(x, y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      //move down
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      //move right
      bubble.x += bubble.speed;
    }
    else {
      //move left
      bubble.x -= bubble.speed;
    }
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    radius: random(20, 50),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(100000000),
    timeY: random(100000000),
    deltaTime: 0.001,
  };
  theBubbles.push(someBubble);
}