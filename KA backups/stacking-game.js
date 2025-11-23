var gameOver = false;
var won = null;
var gameLength = 60; // seconds
var fps = 60;
var gameTimer = gameLength * fps; // frames

var blockConfig = {
    speed: width / 200, // You may change this value without it being cheating
    limitSides: true, 
    width: width / 10,
    height: height / 30,
    minX: width / 20,
    maxX: width - width / 20,
    color: color(191, 191, 191)
};

function Block(y, config) {
    // Config constants
    config = config || {};
    this.color = config.color !== undefined? config.color : color(191, 191, 191);
    this.speed = config.speed || width / 200;
    this.width = config.width || width / 10;
    this.height = config.height || height / 30;
    this.minX = config.minX || this.width / 2;
    this.maxX = config.maxX || width - this.width / 2;

    // Variables
    this.x = Math.random() * (config.maxX - config.minX) + config.minX;
    this.y = y;
    this.dir = Math.random() < 0.5 ? 1 : -1;


    // Methods
    this.display = function(xOffset, yOffset, alpha) {
        if (alpha !== undefined) {
            fill(this.color);
        } else {
            fill(this.color, alpha);
        }
        stroke(0, 0, 0);
        rectMode(CENTER);
        rect(this.x + (xOffset || 0), this.y + (yOffset || 0), this.width, this.height);
    };

    this.update = function() {
        this.x += this.speed * this.dir;
        if (this.x <= this.minX || this.x >= this.maxX) {
            this.dir *= -1;
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
        }
    };
}

function BlockStack(config) {
    // Config
    this.config = config || {};

    // Variables
    // The first item in blocks is the bottom block
    this.blocks = [];
    this.movingBlock = null;
    this.fallingBlocks = [];

    this.waitingForNextBlock = false;
    this.blockPivotX = null;
    this.blockPivotY = null;
    this.fallingAngle = 0;
    this.fallingSide = null;
    this.fadeTime = 60;
    this.fadeTimer = 0;

    // Methods
    this.growStack = function() {
        var blockConfig = this.config;
        if (this.movingBlock) {
            this.blocks.push(this.movingBlock);
        } else if (this.config.limitSides && this.blocks.length === 0){
            // First block should not be allowed near the edges or the game is too easy
            blockConfig = Object.assign(
                {}, 
                this.config, 
                {
                    minX: this.config.minX + this.config.width,
                    maxX: this.config.maxX - this.config.width,
                }
            );
        }

        if (this.getTopStableIndex() === this.blocks.length - 1 && !this.getBlocksAreFalling()) {
            var elevation = blockConfig.height / 2 + 1 + this.blocks.length * this.config.height;
            this.movingBlock = new Block(height - elevation, blockConfig);
            this.waitingForNextBlock = false;
        } else if (!this.getBlocksAreFalling()) {
            this.waitingForNextBlock = true;
            this.startBlocksFalling();
        }
    };

    this.getStackStableHeight = function() {
        return (this.getTopStableIndex() + 1) * this.config.height;
    };

    this.getBlocksAreFalling = function() {
        return this.fadeTimer > 0;
    };

    this.update = function() {
        if (this.movingBlock) {
            this.movingBlock.update();
        }

        if (this.getBlocksAreFalling()) {
            this.updateFallingBlocks();
        }
    };

    this.display = function() {
        var topStableIndex = this.getTopStableIndex();
        for (var i = 0; i <= topStableIndex; i++) {
            this.blocks[i].display();
        }

        if (this.movingBlock) {
            this.movingBlock.display();
        }

        if (this.getBlocksAreFalling()) {
            this.displayFallingBlocks();
        }
    };

    // End of interface methods
    this.getTopStableIndex = function() {
        var lastStableIndex = this.blocks.length - 1;
        for (var i = this.blocks.length; i-- > 0; ) {
            var cgX = this.getStackCGXOf(lastStableIndex, i); // CGX = center of gravity on the x axis
            var base = this.getSupportOf(i);
            
            if (cgX < base.min || cgX > base.max) {
                lastStableIndex = i - 1;
            }
        }
        return lastStableIndex;
    };

    this.getSupportOf = function(index) {
        var b = this.blocks[index];
        var halfWidth = this.width / 2;
        if (index === 0) {
            return { min: b.x - halfWidth, max: b.x + halfWidth };
        } else {
            var b2 = this.blocks[index - 1]; // The block underneath this one
            return { 
                min: Math.max(b.x - halfWidth, b2.x - halfWidth),
                max: Math.min(b.x + halfWidth, b2.x + halfWidth)
            };
        }
    };

    this.getStackCGXOf = function(topIndex, bottomIndex) {
        var avX = 0;
        for (var i = bottomIndex; i < topIndex; i++) {
            avX += this.blocks[i].x;
        }
        return avX / (topIndex - bottomIndex);
    };

    this.startBlocksFalling = function() {
        this.fadeTimer = this.fadeTime;
        var blockPivotYIndex = this.getTopStableIndex();
        this.blockPivotY = height - (blockPivotYIndex + 1) * this.config.height;
        if (blockPivotYIndex > 0) {
            this.fallingSide = this.blocks[blockPivotYIndex].x < this.blocks[blockPivotYIndex - 1].x? RIGHT : LEFT;
            var blockPivot = this.blocks[blockPivotYIndex].x + (this.fallingSide === LEFT ? -this.config.width / 2 : +this.config.width / 2);
            this.blockPivotX = blockPivot;
        }
    };

    this.updateFallingBlocks = function() {
        if (this.fadeTimer-- > 0) {
            // Update falling and fading blocks
            this.fallingAngle += (1 + Math.abs(this.fallingAngle) / 6) * (this.fallingSide === LEFT ? -1 : +1);
        } else if (this.waitingForNextBlock){
            this.growStack();
        }
    };

    this.displayFallingBlocks = function() {
        var blockAlpha = 255 * this.fadeTimer / this.fadeTime;
        pushMatrix();
        translate(this.blockPivotX, this.blockPivotY);
        rotate(this.fallingAngle);
        for (var i = this.getTopStableIndex() + 1; i < this.blocks.length; i++) {
            this.blocks[i].display(-this.blockPivotX, -this.blockPivotY, blockAlpha);
        }
        popMatrix();
    };
}


var blockStack = new BlockStack(blockConfig);
blockStack.growStack();

keyPressed = function() {
    if (!gameOver && !blockStack.getBlocksAreFalling()) {
        blockStack.growStack();
    }
};

frameRate(fps);
draw = function() {
    background(255, 255, 255);
    
    pushMatrix();
    translate(0, -height / 2 + blockStack.getStackStableHeight());

    rectMode(CORNER);
    fill(100, 100, 100);
    stroke(0, 0, 0);
    rect(0, height, width, blockConfig.height);

    if (!gameOver) {
        blockStack.update();
    }
    blockStack.display();

    popMatrix();

    if (gameTimer-- <= 0 || gameOver) {
        gameOver = true;
        var score = blockStack.getTopStableIndex() + 1;

        fill(255, 255, 255, 200);
        rectMode(CORNER);
        rect(0, 0, width, height);
        
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(32);
        text("Game over!\nIn " + gameLength + " seconds,\nyou scored " + score + "!", width / 2, height / 2);
    } else {
        fill(0, 0, 0);
        textSize(16);
        textAlign(LEFT, TOP);
        text("Time left: " + Math.ceil(gameTimer / 60) + "s", width / 40, height / 40);
        textAlign(RIGHT, TOP);
        text("Score: " + (blockStack.getTopStableIndex() + 1), width * 39 / 40, height / 40);
    }
};

