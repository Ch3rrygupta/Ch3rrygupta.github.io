// Cherry Gupta
// Arrays and Object Notation Project
// October 21, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let glasses = [];
let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let currentGlass = null;
let gameWon = false;

function setup() {
    createCanvas(900, 600);
    let glassWidth = 100;
    let glassHeight = 200;
    let glassMargin = 20;
    let totalGlasses = 7; // Total glasses

    // Calculate starting x position to center the glasses
    let totalWidth = totalGlasses * glassWidth + (totalGlasses - 1) * glassMargin;
    let startX = (width - totalWidth) / 2;

    // Initialize glasses, with the last two being empty
    for (let i = 0; i < totalGlasses; i++) {
        let glass = new Glass(startX + i * (glassWidth + glassMargin), height - glassHeight - 50, glassWidth, glassHeight); // Raise glasses by 50 pixels
        
        // Fill with colored water only for the first five glasses
        if (i < 5) {
            for (let j = 0; j < 3; j++) { // Fill with 3 waters each
                glass.fillWater(random(colors));
            }
        }
        
        glasses.push(glass);
    }
}

function draw() {
    background(220);
    
    // Draw each glass
    for (let glass of glasses) {
        glass.draw();
    }
    
    // Check if the game is won
    if (gameWon) {
        displayWinningMessage();
    }
}

function mousePressed() {
    if (!gameWon) { // Only allow interaction if the game is not won
        // Check which glass is clicked
        for (let glass of glasses) {
            if (glass.isMouseOver()) {
                if (currentGlass === null) {
                    currentGlass = glass; // Select the glass
                } else {
                    // Try to pour water from current glass to the clicked glass
                    if (glass !== currentGlass && glass.canPour(currentGlass)) {
                        glass.pour(currentGlass);
                        checkWinCondition(); // Check if the game is won after pouring
                    }
                    currentGlass = null; // Deselect after pouring
                }
                break;
            }
        }
    }
}

function checkWinCondition() {
    // Check if all glasses are sorted
    let allSorted = true;

    for (let glass of glasses) {
        if (glass.water.length > 0) {
            let color = glass.water[0];
            for (let waterColor of glass.water) {
                if (waterColor !== color) {
                    allSorted = false;
                    break;
                }
            }
        }
    }

    if (allSorted) {
        gameWon = true;
    }
}

function displayWinningMessage() {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Won!", width / 2, height / 2);
}

// Glass class to manage water
class Glass {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.water = [];
    }

    fillWater(color) {
        if (this.water.length < 5) { // Limit water levels
            this.water.push(color);
        }
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        this.drawWater();
    }

    drawWater() {
        for (let i = 0; i < this.water.length; i++) {
            fill(this.water[i]);
            rect(this.x, this.y + this.h - (i + 1) * (this.h / 5), this.w, this.h / 5);
        }
    }

    isMouseOver() {
        return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }

    canPour(fromGlass) {
        return this.water.length < 5 && (this.water.length === 0 || this.water[this.water.length - 1] === fromGlass.water[fromGlass.water.length - 1]);
    }

    pour(fromGlass) {
        if (fromGlass.water.length > 0) {
            this.fillWater(fromGlass.water.pop());
        }
    }
}
