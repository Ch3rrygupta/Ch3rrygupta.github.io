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


// extra for experts:
// for my extra for experts I made class and played around with that. we also got shown bthis in class recentkly but I 
// coded most of the class stuff before ot was shown in class and I've been playinf aroufdn wiht it in my other projects as well.


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

// load the pacman image
function preload(){
  pacImg = loadImage("pac.img");
  font = loadFont("Pacmania.otf");
}

// will see if the keys are pressed and will help pac move
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

// the class for the the cells, each "square" counts as one cell 
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wall = false; //is this cell a wall?
    this.score = false; // does this cell increase the tootal score?
    this.power = false; // is this cell a power token?
    this.time = 0;
  }
  
  show() {
    if(this.wall === true) {
      fill(150, 100);
      rect(this.x, this.y, w, w);
      this.score = false;
    }
    else if(this.score) {
      fill(225, 120, 0);
      ellipse(this.x, this.y, w/5);
    }
    if(this.power) {
      fill(225, 120, 0);
      if(this.time % 45 < 15) {
        fill(0);
      }
      ellipse(this.x, this.y, w/2);
      this.time++;
      if(this.time === 4500) {
        this.time  = 0;
      }
    }
  }
  
  total() {
    if(this.score) {
      let d = dist(pacman.x, pacman.y, this.x, this.y);
      if(d < w/2) {
        totalScore++;
        this.score  = false;
      }
    }
    if(this.power) {
      let d = dist(pacman.x, pacman.y, this.x, this.y);
      if(d < w/2) {
        totalScore++;
        let time = 6000;
        this.power = false;
        for(let i = 0; i < ghostNum; i++) {
          ghosts[i].killable = true;
          setTimeout(ghostInv, time);
        }
      }
    }
  }
}

// the class for the ghosts
class Ghost {
  constructor(x, y, diameter) {
    this.i = 0;
    this.x = x;
    this.y = y;
    this.d = diameter;
    this.r1 = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.killable = false;
    this.alive = true;
    this.neighbors = [];
    this.i++;
  }
  
  show(r, g, b) {
    if(this.alive === false) {
    }
    else if(this.killable) {
      fill(0, 0, 255);
      rect(this.x, this.y, this.d, this.d, 5);
    }
    else {
      fill(r, g, b);
      rect(this.x, this.y, this.d, this.d, 5);
    }
  }
  
  
  kill() {
    let d = dist(pacman.x, pacman.y, this.x, this.y);
    if(d < w/2) {
      if(this.alive) {
        if(this.killable) {
          this.alive = false;
          totalScore += 50;
          // YUP SO PLS FIX  THIS PART BECAUSE IM CRASHING OUT RNNNN
          setTimeout(() => { 
            this.x = floor(random(11, 15))*w; 
            this.y = floor(random(9, 11))*w;
            this.alive = true;
          }, 7000); //IM BEGGING PLSSSSSS FIX GIRL.
        } 
        else {
          deathPac(); // awwwww bye pac :( #byeho
        }
      }
    }
  }

  move() {  
    if(this.x % w === 0 && this.y % w === 0){
      checkNeighbors(this.x, this.y, this.neighbors);
      //it's probably a dumb way of making the ghosts move, but I divided the move function into all the possible neighbors cells of the ghost
      //if all neighbors are walls (technically this is not needed)
      if(this.neighbors[0] && this.neighbors[1] && this.neighbors[2] && this.neighbors[3]) {
        this.speedX = 0;
        this.speedY = 0;
      //if 3 neighbors are walls (technically this is not needed)
      } else if(this.neighbors[0] && this.neighbors[1] && this.neighbors[2]) {
        this.speedX = -w/10;
        this.speedY = 0;
      } 
      else if(this.neighbors[0] && this.neighbors[1] && this.neighbors[3]) {
        this.speedX = 0;
        this.speedY = w/10;
      } 
      else if(this.neighbors[0] && this.neighbors[2] && this.neighbors[3]) {
        this.speedX = w/10;
        this.speedY = 0;
      } 
      else if(this.neighbors[3] && this.neighbors[1] && this.neighbors[2]) {
        this.speedX = 0;
        this.speedY = -w/10;
        //if 2 neighbors are walls
      } 
      else if(this.neighbors[0] && this.neighbors[1]) {
        this.r = random(1);
        if(this.r < 0.5) {
          this.speedX = -w/10;
          this.speedY = 0;
        } 
        else {
          this.speedX = 0;
          this.speedY = w/10;
        }
      } 
      else if(this.neighbors[0] && this.neighbors[2]) {
        this.r = random(1);
        //if the ghost is between 2 parallel walls, theres a little chance of 5% that it will change its direction
        if(this.r < 0.05) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else if(this.r < 0.1) {
          this.speedX = -w/10;
          this.speedY = 0;
        }
      } 
      else if(this.neighbors[0] && this.neighbors[3]) {
        this.r = random(1);
        if(this.r < 0.5) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else {
          this.speedX = 0;
          this.speedY = w/10;
        }
      } 
      else if(this.neighbors[1] && this.neighbors[2]) {
        this.r = random(1);
        if(this.r < 0.5) {
          this.speedX = 0;
          this.speedY = -w/10;
        } 
        else {
          this.speedX = -w/10;
          this.speedY = 0;
        }
      } 
      else if(this.neighbors[1] && this.neighbors[3]) {
        this.r = random(1);
        //if the ghost is between 2 parallel walls, theres a little chance of 5% that it will change its direction
        if(this.r < 0.05) {
          this.speedX = 0;
          this.speedY = w/10;
        } 
        else if(this.r < 0.1) {
          this.speedX = 0;
          this.speedY = -w/10;
        }
      } 
      else if(this.neighbors[2] && this.neighbors[3]) {
        this.r = random(1);
        if(this.r < 0.5) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else {
          this.speedX = 0;
          this.speedY = -w/10;
        }
        //if 1 neighbor is a wall
      }
      else if(this.neighbors[0]) {
        this.r = random(1);
        if(this.r < 0.333) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else if(this.r < 0.667) {
          this.speedX = -w/10;
          this.speedY = 0;
        }
        else {
          this.speedX = 0;
          this.speedY = w/10;
        }
      } 
      else if(this.neighbors[1]) {
        this.r = random(1);
        if(this.r < 0.333) {
          this.speedX = 0;
          this.speedY = w/10;
        } 
        else if(this.r < 0.667) {
          this.speedX = 0;
          this.speedY = -w/10;
        } 
        else {
          this.speedX = -w/10;
          this.speedY = 0;
        }
      } 
      else if(this.neighbors[2]) {
        this.r = random(1);
        if(this.r < 0.333) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else if(this.r < 0.667) {
          this.speedX = -w/10;
          this.speedY = 0;
        }
        else {
          this.speedX = 0;
          this.speedY = -w/10;
        }
      } 
      else if(this.neighbors[3]) {
        this.r = random(1);
        if(this.r < 0.333) {
          this.speedX = 0;
          this.speedY = w/10;
        } 
        else if(this.r < 0.667) {
          this.speedX = 0;
          this.speedY = -w/10;
        } 
        else {
          this.speedX = w/10;
          this.speedY = 0;
        }
        //if there are no neighbor walls
      } 
      else {
        this.r = random(1);
        if(this.r < 0.25) {
          this.speedX = w/10;
          this.speedY = 0;
        } 
        else if(this.r < 0.5) {
          this.speedX = -w/10;
          this.speedY = 0;
        } 
        else if(this.r < 0.75) {
          this.speedX = 0;
          this.speedY = w/10;  
        } 
        else {
          this.speedX = 0;
          this.speedY = -w/10;
        }
      }
      
    }
    if(this.x < -w/2) {
      this.x = width + w/2;
    }
    if(this.x > width + w/2) {
      this.x = -w/2;
    }
    if(this.y < -w/2) {
      this.y = height + w/2;
    }
    if(this.y >height + w/2) {
      this.y = -w/2;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
