//Walker OOP DEMO

class Walker{
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.speed = 12;
    this.radius = 5;
    this.color = theColor;
  }

  display() {
    noStroke();
    circle(this.x, this.y, this.radius*2);
    fill(this.color);
  }

  move() {
    let choice  = random(100);
    if (choice <25){
      this.y-=this.speed;
    }

    else if (choice<50){
      this.y += this.speed;
    }

    else if(choice<75){
      this.x -= this.speed;
    }

    else{
      this.x += this.speed;
    }
  }
}

let luc;
let micheal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  luc  = new Walker(width/2, height/2, "pink");
  micheal = new Walker (width/2, height/2, "yellow");
}

function draw() {
  luc.move();
  luc.display();

  micheal.move();
  micheal.display();
}
