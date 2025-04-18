/**
        
                   Contest: Weather
                
         I have completed 100% of Khan Academy's 
        'Intro to JS' and have been programming 
                    for 60 months.
    
          I would prefer to be placed in the
                      Advanced
                       bracket
                       
    
    TODO:
     - Fill out statements above
     - Save your entry as a spin-off of this program
     - Have fun!
     
**/

/** Variables, including the game information **/

/** TODO:
   * Make more levels
   * Prevent player from falling through the floor
   * Improve graphics for
    - Ground
    - Lava
    - Portal?
    - Player
    - Enemies
    - Snow
    - Sun??
   * Submit!
**///

/** Variables with global constants, levels, and screens **/
var weatherTypes = ["sun", "small sun", "clouds", "light snow", "snow"];
var screenNames = ["title", "info", "play", "end"];
var blockSize = 20;
// Foreward declarations
var myRect, myRectMode, isInMyRect, Level, Screen;

// Game state
var gameState = {
    screen: screenNames[0],
    weather: weatherTypes[2],
    level: 0,
};

// Time storage for animation smoothing
var lastMillis;

// Stored level plans and an array to hold the loaded ones
/* Mapping:
    "#": "dirt",
    "-": "empty",
    "s": "lava",
    "@": "portal",
    "^": Enemy,
    "<": Enemy,
    ">": Enemy,
    "%": Snow,
    "$": Player,
*/
var allLevels = [];
var allLevelsStored = [
    /* Level 1 */ [
        "#------------------------######",
        "#----------------------------##",
        "#----------------------------##",
        "#------------sssssss---------##",
        "#------------#######--------@##",
        "#------------------------######",
        "#------------------------###s##",
        "#------------------------##sss#",
        "#------------------------#s#s#s",
        "#------#-----------------###s##",
        "#-$----###sss##-<--#########s##",
        "###############################",
        {text: "Hop up!", x: 84, y: 159},
        {text: "Avoid the lava.", x: 207, y: 158},
        {text: "Don't die!\nJump on top\nof him.", x: 332, y: 150},
        {text: "Lava melts snow.", x: 331, y: 48, size: 13},
        {text: "Let it snow!\nThen climb the\nsnow to the top.", x: 442, y: 130},
        {text: "Enter the portal!", x: 550, y: 60},
        ],
    /* Level 2 */ [
        "------#########----#-----------######",
        "------sssssssss----#----------------@",
        "---------sss-------#-----------------",
        "----------s--------#-----------------",
        "-------------------##----------------",
        "-------------------##---------------<",
        "-------------------##------------#--#",
        "-------------------##----------######",
        "-----##-#-#-#-##---#-----------##s###",
        "-----##-------###-##-----------#sss##",
        "-----#######s####-##-----------##s###",
        "-----########s###-##-----------##s###",
        "-----##ssssssss##----#-<->-#sss##s###",
        "$----########s#######################",
        "############s########################",
        {text: "You need\nsnow again.", x: 53, y: 213},
        {text: "You won't fall through.", x: 212, y: 127},
        {text: "Now you\nneed the\nsun.", x: 347, y: 117},
        {text: "Use down to\nalign and get\nthrough the hole.", x: 344, y: 199},
        {text: "'r' to restart.", x: 344, y: 279},
        {text: "Snow can\nhold them still.", x: 451, y: 217},
        {text: "Snow can\nget you\nhigh enough.", x: 506, y: 143},
        {text: "Hold UP as\nyou jump\non him.", x: 666, y: 73},
        ],
    /* Level 3 */ [
        "##--#----------------#-#",
        "-#--#----------------#-#",
        "-#$------------------#-#",
        "-####-----------##---#-#",
        "----#-----------##---#-#",
        "-#--#-----------###-##-#",
        "-#--#-----------#------#",
        "-#-##-----------#-####-#",
        "-#--#-----------#----#-#",
        "-##-##sssssssss##----#-#",
        "-#--#-----------#sss##-#",
        "-#-#-------------#s#---#",
        "-#---------------------#",
        "-##-->-<-><>->-<--#-#--#",
        "-#@##sssssssssss#ssssss#",
        "---##############ssssss#",
        {text: "Climb through a snowstorm.", x: 210, y: 108},
        {text: "Ride some snow\nto fall slower.", x: 410, y: 178},
        {text: "Run!", x: 422, y: 240},
        {text: "They can walk in lava.\nAnd you can jump on them.", x: 226, y: 240},
        {text: "Edges won't\nhurt you.", x: 8, y: 134},
        {text: "Yay!", x: 40, y: 310},
        ],
    /* Level 4 */ [
        "-----------######",
        "-----------#ssss#",
        "-----------######",
        "$-----------<->-@",
        "#-----------#####",
        "#-----------#sss#",
        "#-----------#s#s#",
        "#-----------#sss#",
        "#################",
        {text: "Enemies walk on snow.\n Use this to your advantage.", x: 131, y: 108},
        ],
    /* Level 5 */ [
        "ssssssssss----",
        "----@---s-----",
        "--------s--->-",
        "-------sss--#-",
        "------ssssss#-",
        "$---sssssssss-",
        "##-##########-",
        "--------------",
        {text: "Good luck!", x: 173, y: 108},
        ],
    
];

// And stored scenes and an object to hold loaded ones
var gameScreens = {};
var gameScreensStored = {
    "title": {
        run: function () {
            // Background
            background(117, 117, 117);
            
            // Snow
            fill(255, 255, 255);
            noStroke();
            var snowCount = 121;
            for (var i = 0; i < snowCount; i++) {
                /* Since noise is always the same, using it means I don't have to store the
                   positions of the snow 
                   Using Math.PI here because noise is the same for all integers */
                var x = noise(i * Math.PI) * width * 6 - width / 3 * 7;
                var y = (i * (height + 10) / snowCount + millis() / 10) % (height + 10) - 5;
                ellipse(x, y, 10, 10);
            }
            
            // Title, and block behind it
            textSize(48);
            
            fill(138, 138, 138); // Lighter than the background
            myRectMode(CENTER);
            myRect(width / 2, 130, textWidth("Weatherman") + 30, 48 + 30, 15);
            
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("Weatherman", width / 2, 130);
        },
        buttons: [
            {x: 60, y: 275, w: 100, message: "Info", textSize: 33, 
                onclick: function () { Screen.switchTo(screenNames[1]); }},
            {x: width - 140, y: 275, w: 100, message: "Play", textSize: 33, 
                onclick: function () { Screen.switchTo(screenNames[2]); }},
        ]
    },
    "info": {
        run: function () {
            // Background
            background(117, 117, 117);
            
            
            // Title, and block behind it
            
            textSize(40);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("How to play", width / 2, 69);
            
            textSize(20);
            textAlign(CENTER, TOP);
            text("Use the arrow keys to move the player\naround. Wasd and/or spacebar also work.\nUse the selectors at the top of the screen\nto change the weather.\nUse this power well!\nYou can jump on top of snow. Hitting\nit from any other side will get rid of it.\nYou will learn more as you play.", width / 2, 100);
        },
        buttons: [
            {x: 150, y: 300, w: 100, message: "Back", textSize: 33, 
            onclick: function () { Screen.switchTo(screenNames[0]); }},
        ]
    }, 
    "play": {
        run: function (keys, secondsElapsed, selected) {
            // Background
            background(117, 117, 117);
            
            // Test for and react to winning/losing the level
            // This is done before running the level to give you one more frame to see
            if (allLevels[gameState.level].state === "win") {
                // You won! Next level!
                gameState.level++;
                // Reset the weather selectors
                selected[0] = 2;
                selected[1] = 0;
                if (!Level.loadLevel()) {
                    // You beat all the levels! Display the end screen!
                    Screen.switchTo(screenNames[3]);
                }
            } else if (allLevels[gameState.level].state === "lose" || keys.r) {
                // Restart the level and reset the weather selectors
                selected[0] = 2;
                selected[1] = 0;
                Level.loadLevel();
            }
            
            // Run the level
            allLevels[gameState.level].run(keys, secondsElapsed, 
                weatherTypes[selected[0]], selected[1] === 0);
        },
        onLoad: function () {
            Level.loadLevel();
        },
        buttons: [
            // Sun
            {x: 20, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), 
                message: function(x, y, w, h) {
                    x += w / 2;
                    y += h / 2;
                    
                    fill(255, 255, 0);
                    noStroke();
                    var sunRadius = w / 6;
                    ellipse(x, y, sunRadius * 2, sunRadius * 2);
                    
                    // Sun's rays
                    stroke(255, 255, 0);
                    strokeWeight(2);
                    for (var angle = 0; angle < 360; angle += 30) {
                          var innerX = x + cos(angle) * sunRadius;
                        var innerY = y + sin(angle) * sunRadius;
                        var outerX = x + cos(angle) * sunRadius * 2;
                        var outerY = y + sin(angle) * sunRadius * 2;
                        
                        line(innerX, innerY, outerX, outerY);
                    }
                }, onclick: "select0"},
            
            // Some sun
            {x: 70, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), 
                message: function(x, y, w, h) {
                    x += w / 2;
                    y += h / 2;
                    
                    fill(255, 255, 0);
                    noStroke();
                    var sunRadius = w / 10;
                    ellipse(x, y, sunRadius * 2, sunRadius * 2);
                    
                    // Sun's rays
                    stroke(255, 255, 0);
                    strokeWeight(2);
                    for (var angle = 0; angle < 360; angle += 30) {
                          var innerX = x + cos(angle) * sunRadius;
                        var innerY = y + sin(angle) * sunRadius;
                        var outerX = x + cos(angle) * sunRadius * 2;
                        var outerY = y + sin(angle) * sunRadius * 2;
                        
                        line(innerX, innerY, outerX, outerY);
                    }
                }, onclick: "select0"},
            
            // Cloudy
            {x: 120, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), 
                message: function(x, y, w, h) {
                    x += w / 2;
                    y += h / 3;
                    
                    fill(138, 138, 138);
                    noStroke();
                    
                    var cloudWidth = w / 3;
                    var cloudHeight = h / 4;
                    
                    // Clouds
                    ellipse(x, y, cloudWidth , cloudHeight); // Center
                    ellipse(x - w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Left
                    ellipse(x + w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Right
                }, onclick: "select0", selected: true},
            
            // Light snow
            {x: 170, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), 
                message: function(x, y, w, h) {
                    x += w / 2;
                    y += h / 3;
                    
                    // Snow
                    fill(255, 255, 255);
                    noStroke();
                    var snowCount = 21;
                    for (var i = 0; i < snowCount; i += 2) {
                        var sX = x + noise(i * Math.PI + 0.61) * w * 2 - w * 0.95;
                        var sY = y + (i * h / snowCount) % (h * 0.5 - 0) + h / 10;
                        ellipse(sX, sY, 2, 2);
                    }  
                    
                    // Clouds
                    fill(138, 138, 138);
                    noStroke();
                    var cloudWidth = w / 3;
                    var cloudHeight = h / 4;
                    ellipse(x, y, cloudWidth , cloudHeight); // Center
                    ellipse(x - w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Left
                    ellipse(x + w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Right 
                }, onclick: "select0"},
            
            // Dense snow
            {x: 220, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100),
                message: function(x, y, w, h) {
                    x += w / 2;
                    y += h / 3;
                    
                    // Snow
                    fill(255, 255, 255);
                    noStroke();
                    var snowCount = 25;
                    for (var i = 0; i < snowCount; i++) {
                        var sX = x + noise(i * Math.PI + 0.61) * w * 2 - w * 0.95;
                        var sY = y + (i * h / snowCount) % (h * 0.5 - 0) + h / 10;
                        ellipse(sX, sY, 2, 2);
                    }  
                    
                    // Clouds
                    fill(138, 138, 138);
                    noStroke();
                    var cloudWidth = w / 3;
                    var cloudHeight = h / 4;
                    ellipse(x, y, cloudWidth , cloudHeight); // Center
                    ellipse(x - w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Left
                    ellipse(x + w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Right 
                }, onclick: "select0"},
            
            /* Snow randomness buttons */
            // Straight snow
            {x: 280, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), textSize: 13,
                message: "Straight\nsnow", onclick: "select1", selected: true},
            
            // Random snow
            {x: 330, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200),
                selectedColor: color(201, 201, 201, 100), textSize: 13,
                message: "Random\nsnow", onclick: "select1"}]
    }, 
    "end": {
        run: function () {
            // Background
            background(94, 216, 247);
            // Sun
            fill(255, 255, 0);
            noStroke();
            var sunRadius = 75;
            arc(0, 0, sunRadius * 2, sunRadius * 2, 0, 90);
            
            // Sun's rays
            stroke(255, 255, 0);
            strokeWeight(3);
            for (var angle = 0; angle <= 90; angle += 10) {
                var innerX = cos(angle) * sunRadius;
                var innerY = sin(angle) * sunRadius;
                var outerX = cos(angle) * sunRadius * 2;
                var outerY = sin(angle) * sunRadius * 2;
                
                line(innerX, innerY, outerX, outerY);
            }
            
            // Title
            textSize(40);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("You won!", width / 2, 69);
            
            // Smaller message
            textSize(22);
            textAlign(CENTER, TOP);
            var message = "Congrats! You used the weather to\nhelp you defeat your enemies and\ntraverse a challenging world!";
            
            // Increase the line height
            message = message.split("\n");
            for (var i = 0; i < message.length; i++) {
                text(message[i], width / 2, 100 + i * 27);
            }
            
        },
        buttons: [
            {x: 125, y: 300, w: 150, h: 68, message: "Restart", 
            textSize: 33, color: color(153, 252, 96),
            onclick: function () {
                gameState.level = 0;
                Screen.switchTo(screenNames[0]);
            }},
        ]
    },
};

/** Character constructers **/
// From Bob Lyon, I have learned to like to use IIFEs to wrap constructors

// Static characters are all characters that do not change
var Static = (function() {
    function Static(type, x, y, s) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.s = s; // Size
    }
    
    Static.prototype.draw = function() {
        if (this.type === "dirt") {
            fill(122, 79, 0);
            stroke(122, 79, 0);
            strokeWeight(0.5);
            myRect(this.x, this.y, this.s, this.s);
        } else if (this.type === "lava") {
            fill(255, 85, 0);
            stroke(255, 85, 0);
            strokeWeight(0.5);
            myRect(this.x, this.y, this.s, this.s);
        } else if (this.type === "portal") {
            fill(255, 0, 238);
            noStroke();
            myRect(this.x, this.y, this.s, this.s);
        } else { // Unknown type
            fill(255, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(2);
            myRect(this.x, this.y, this.s, this.s);
        }
    };
    
    return Static;
})();

var Sun = (function() {
    function Sun(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s; // Size
        this.yVelocity = 0;
        this.previousY = y;
        this.type = "sun";
        this.gravity = 30;
        this.remove = false;
    }
    
    Sun.prototype.update = function(secondsElapsed, keys, level) {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity
        this.yVelocity = Math.min(300, this.yVelocity + this.gravity);
        var newY = this.y + this.yVelocity * secondsElapsed;
        
        // Update position; ground collision is handled in check method
        this.y = newY;
    };
    
    Sun.prototype.collide = function(actor, level) {
        if (actor.type !== "sun") {
            this.remove = true;
            if (actor.type === "snow") {
                actor.remove = true;
            }
        }
    };
    
    Sun.prototype.check = function(level) {
        var touchY = level.touches(this.x, this.y, "any");
        if (touchY) {
            this.remove = true;
        }
    };
    
    Sun.prototype.draw = function() {
        fill(255, 255, 0, 100);
        noStroke();
        myRect(this.x, this.y, this.s, this.s);
    };
    
    return Sun;
})();

var Snow = (function() {
    function Snow(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s; // Size
        this.previousY = y;
        this.type = "snow";
        this.gravity = 70;
        this.remove = false;
    }
    
    Snow.prototype.update = function(secondsElapsed, keys, level) {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity, we are assuming that air restance is high enough that the snow is already at terminal velocity
        var newY = this.y + this.gravity * secondsElapsed;
        
        // Test collision with ground
        var touchDirtY = level.touches(this.x, newY, "dirt");
        var touchPortalY = level.touches(this.x, newY, "portal");
        var touchY = touchDirtY || touchPortalY;
        if (touchY) {
            if (this.gravity > 0) {
                this.y = touchY.y - blockSize;
                this.yVelocity = 0;
            } else {
                this.y = touchY.y + blockSize;
                this.yVelocity = 0;
            }
        } else {
            this.y = newY;
        }
    };
    
    Snow.prototype.collide = function(actor, level) {
        var collideDirection = "side";
        if (this.previousY + this.s <= actor.previousY) {
            collideDirection = "top";
        } else if (this.previousY >= actor.previousY + actor.s) {
            collideDirection = "bottom";
        }
        
        if (actor.type === "enemy" && collideDirection === "top" || 
            actor.type === "snow" && collideDirection === "top") {
            this.y = actor.y - this.s;
        }
    };
    
    Snow.prototype.check = function(level) {
        if (level.touches(this.x, this.y, "lava")) {
            this.remove = true;
        }
    };
    
    Snow.prototype.draw = function() {
        fill(255, 255, 255);
        noStroke();
        myRect(this.x, this.y, this.s, this.s);
    };
    
    return Snow;
})();

var Player = (function() {
    function Player(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s; // Size
        this.previousY = y; // For collision detection
        this.yVelocity = 0;
        this.xSpeed = 140; // Pixels per second
        this.jumpSpeed = -360;
        this.gravity = 20;
        this.type = "player";
        this.remove = false;
    }
    
    Player.prototype.update = function(secondsElapsed, keys, level) {
        // Test if we are on ground
        var onGround = level.touches(this.x, this.y + 1, "dirt");
        
        // X-direction movement {
        var xMotion = 0;
        if (keys[LEFT] || keys.a) { xMotion -= this.xSpeed; }
        if (keys[RIGHT] || keys.d) { xMotion += this.xSpeed; }
        // Account for the fact that not all frames are the same length by 
        // moving relative to that amount
        xMotion *= secondsElapsed;
        // Collision testing x direction
        var newX = this.x + xMotion;
        // Down key alignment, but cannot go too fast
        if (keys[DOWN] || keys.s) {
            var roundedX = Math.round(newX / blockSize) * blockSize;
            var moveDistance = this.xSpeed * secondsElapsed; // Decrease verbosity
            newX = constrain(roundedX, this.x - moveDistance, this.x + moveDistance);
        }
        
        var touchX = level.touches(newX, this.y, "dirt");
        if (touchX) {
            if (xMotion < 0) {
                this.x = touchX.x + blockSize;
            } else if (xMotion > 0) {
                this.x = touchX.x - blockSize;
            }
        } else {
            this.x = newX;
        }
        // }
        
        // Y-direction movement {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity
        this.yVelocity += this.gravity;
        
        // Fall
        var yMotion = this.yVelocity * secondsElapsed;
        var newY = this.y + yMotion;
        // Test collision with ground
        var touchY = level.touches(this.x, newY, "dirt");
        if (touchY) {
            if (yMotion > 0) {
                this.y = touchY.y - blockSize;
                this.yVelocity = 0;
            } else {
                this.y = touchY.y + blockSize;
                this.yVelocity = 0;
            }
        } else {
            this.y = newY;
        }
        
        // Jump?
        if ((keys[UP] || keys.w || keys[" "]) && onGround) {
            this.yVelocity = this.jumpSpeed;
        }
        // }
    };
    
    Player.prototype.check = function(level) {
        // Won?
        if (level.touches(this.x, this.y, "portal")) {
            level.setState("win");
            return;
        }
        
        // Died?
        if (level.touches(this.x, this.y, "lava")) {
            level.setState("lose");
            return;
        }
    };
    
    Player.prototype.collide = function(actor, level, keys) {
        var collideDirection = "side";
        if (this.previousY + this.s <= actor.previousY) {
            collideDirection = "top";
        } else if (this.previousY >= actor.previousY + actor.s) {
            collideDirection = "bottom";
        }
        
        if (actor.type === "enemy") {
            if (collideDirection === "top") {
                this.yVelocity = 0;
                if (keys[UP] || keys.w || keys[" "]) {
                    this.yVelocity = this.jumpSpeed;
                }
                this.y = actor.y - this.s;
                
                // Kill the enemy!
                actor.remove = true;
            } else {
                level.setState("lose");
            }
        } else if (actor.type === "snow") {
            if (collideDirection === "top") {
                this.yVelocity = 0;
                if (keys[UP] || keys.w || keys[" "]) {
                    this.yVelocity = this.jumpSpeed;
                }
                this.y = actor.y - this.s;
            } else {
                actor.remove = true;
            }
        }
    };
    
    Player.prototype.draw = function() {
        fill(26, 0, 255);
        noStroke();
        myRect(this.x, this.y, this.s, this.s);
    };
    
    return Player;
})();

var Enemy = (function() {
    function Enemy(x, y, s, type) {
        this.x = x;
        this.y = y;
        this.s = s; // Size
        this.previousY = y;
        this.yVelocity = 0;
        this.gravity = 20; // Same as player
        this.xSpeed = 40;
        this.type = "enemy";
        this.remove = false;
        if (type === "<") {
            this.direction = LEFT;
        } else if (type === ">") {
            this.direction = RIGHT;
        } else {
            this.direction = Math.random() < 0.5? LEFT : RIGHT;
        }
    }
    
    Enemy.prototype.update = function(secondsElapsed, keys, level) {
        var oldX = this.x, oldY = this.y;
        
        // X-direction movement {
        var xMotion = 0;
        if (this.direction === LEFT) { xMotion -= this.xSpeed; }
        if (this.direction === RIGHT) { xMotion += this.xSpeed; }
        
        // Account for the fact that not all frames are the same length by 
        // moving relative to that amount
        xMotion *= secondsElapsed;
        // Collision testing x direction
        var newX = this.x + xMotion;
        var touchDirtX = level.touches(newX, this.y, "dirt");
        var touchPortalX = level.touches(newX, this.y, "portal");
        this.x = newX; // Try this out, we saved the old value
        var touchedActorX = level.touchesActors(this, ["snow", "enemy"]);
        var touchX = touchDirtX || touchPortalX || touchedActorX;
        var turned = false;
        if (touchX) {
            if (xMotion < 0) {
                // Moving left, so go to the right of the object
                this.x = touchX.x + blockSize;
            } else if (xMotion > 0) {
                // Moving right, so go to the left of the object
                this.x = touchX.x - blockSize;
            }
            this.turn();
            turned = true; // To prevent turning twice in one frame
        }
        this.y += 1; // This is very temporary
        var touchedActor = level.touchesActors(this, ["snow", "enemy"]);
        // Reset the Y
        this.y = oldY;
        if (!level.touches(this.x, this.y + 1, "dirt") && !touchedActor) {
            if (!turned) { // Don't turn twice
                this.turn();
            }
            // Go back!
            this.x = oldX;
        } else {
            // Safe to move, so don't go back
        }
        // }
        
        // Y-direction movement {
        this.previousY = this.y;
        
        // Apply gravity
        this.yVelocity += this.gravity;
        
        // Fall
        var yMotion = this.yVelocity * secondsElapsed;
        this.y += yMotion;
        // Test collision with ground or some actors
        var touchDirtY = level.touches(this.x, this.y, "dirt");
        var touchActorY = level.touchesActors(this, ["snow", "enemy"]);
        var touchY = touchDirtY || touchActorY;
        if (touchY) {
            if (yMotion > 0) {
                // Falling, so go to the top of the object
                this.y = touchY.y - blockSize;
                this.yVelocity = 0;
            } else {
                // Jumping, to go to the bottom of the object
                this.y = touchY.y + blockSize;
                this.yVelocity = 0;
            }
        } else {
            // We didn't hit anything when we fell, so there's nothing more to do here.
        }
        // }
    };
    
    Enemy.prototype.turn = function() {
        if (this.direction === LEFT) {
            this.direction = RIGHT;
        } else if (this.direction === RIGHT) {
            this.direction = LEFT;
        }
    };
    
    Enemy.prototype.collide = function(actor) {};
    
    Enemy.prototype.draw = function() {
        fill(255, 196, 0);
        noStroke();
        myRect(this.x, this.y, this.s, this.s);
    };
    
    return Enemy;
})();

/** Letters to blocks mapping **/
var lettersToBlocks = {
    "#": "dirt", // AKA ground
    "-": "empty",
    "s": "lava",
    "@": "portal",
    "^": Enemy,
    "<": Enemy,
    ">": Enemy,
    "%": Snow,
    "$": Player,
};

/** Main constructors **/
// Some code inspiration from https://eloquentjavascript.net/16_game.html
var Level = (function() {
    function Level(plan) {
        this.static = [];
        this.actors = [];
        this.text = [];
        this.state = "play";
        this.scrollMargin = 100;
        
        // Read and proccess the level plan
        var planWidth = 0;
        var snow = []; // To save the snow until the end
        for (var y = 0; y < plan.length; y++) {
            var staticRow = []; // Split static elements into rows for easy lookup
            
            // Handle a text object
            if (typeof plan[y] !== "string") {
                this.text.push(plan[y]);
                continue; // Don't try to read the object as a row string
            }
            
            // Proccess the string
            for (var x = 0; x < plan[y].length; x++) {
                planWidth = Math.max(plan[y].length);
                
                var type = lettersToBlocks[plan[y][x]];
                var xPos = x * blockSize;
                var yPos = y * blockSize;
                // A string means a static block which will be passed to the 
                // Static constuctor
                if (typeof type === "string" || type === undefined) {
                    // Don't make empty blocks
                    if (type !== "empty") {
                        staticRow[x] = new Static(type, xPos, yPos, blockSize);
                    }
                } else if (typeof type === "function") { // Actor, has a constructor
                    var newActor = new type(xPos, yPos, blockSize, plan[y][x]);
                    if (newActor.type === "snow") {
                        // Put the lower snow in before the higher snow
                        snow.unshift(newActor);
                    } else {
                        this.actors.push(newActor);
                    }
                }
            }
            // Add the row
            this.static[y] = staticRow;
        }
        
        this.actors = this.actors.concat(snow);
        
        this.levelWidth = planWidth;
        this.levelHeight = plan.length - this.text.length;
        
        // For scrolling the board
        this.offsetX = width / 2 - this.levelWidth * blockSize / 2;
        this.offsetY = height / 2 - this.levelHeight * blockSize / 2;
    }
    
    Level.prototype.run = function(keys, secondsElapsed, weather, straightSnow) {
        this.makeItSnow(weather, straightSnow);
        this.update(keys, secondsElapsed);
        this.draw();
    };
    
    Level.prototype.makeItSnow = function(weather, straightSnow) {
        if (weather === weatherTypes[3] || weather === weatherTypes[4]) {
            var subDivide = straightSnow? 1 : 5;
            var speed = weather === weatherTypes[4]? 1 : 4;
            if (frameCount % speed === 0) {
                var randSpot = Math.random() * this.levelWidth;
                var newSnowX = Math.floor(randSpot * subDivide) / subDivide * blockSize;
                if (!this.touches(newSnowX, 0, "any")) {
                    var newSnow = new Snow(newSnowX, 0, blockSize, "s");
                    var collides = false;
                    for (var a = 0; a < this.actors.length; a++) {
                        if (Level.actorCollide(this.actors[a], newSnow)) {
                            collides = true;
                            break;
                        }
                    }
                    if (!collides) {
                        this.actors.push(newSnow);
                    }
                }
            }
        } else if (weather === weatherTypes[0] || weather === weatherTypes[1]) {
            var speed = weather === weatherTypes[0]? 1 : 5;
            if (frameCount % speed === 0) {
                var randSpot = Math.floor(Math.random() * this.levelWidth);
                if (this.getType(randSpot, 0) === "empty") {
                    var newSun = new Sun(randSpot * blockSize, 0, blockSize);
                    this.actors.push(newSun);
                }
            }
        }
        
    };
    
    Level.prototype.update = function(keys, secondsElapsed) {
        // Update the active elements
        for (var i = 0; i < this.actors.length; i++) {
            this.actors[i].update(secondsElapsed, keys, this);
        }
        
        for (var i = 0; i < this.actors.length; i++) {
            var actor1 = this.actors[i];
            if (actor1.type === "player") { continue; } // First skip the players
            for (var j = i + 1; j < this.actors.length; j++) {
                var actor2 = this.actors[j];
                if (actor2.type === "player") { continue; } // Definitely skip the players
                if (actor1 !== actor2 && Level.actorCollide(actor1, actor2)) {
                    if (!actor1.remove && !actor2.remove) {
                        actor1.collide(actor2, this, keys);
                        actor2.collide(actor1, this, keys);
                    }
                }
            }
        }
        
        for (var i = 0; i < this.actors.length; i++) {
            var actor1 = this.actors[i];
            if (actor1.type !== "player") { continue; } // Now check the players only
            for (var j = 0; j < this.actors.length; j++) {
                var actor2 = this.actors[j];
                if (actor1 !== actor2 && Level.actorCollide(actor1, actor2)) {
                    if (!actor1.remove && !actor2.remove) {
                        actor1.collide(actor2, this, keys);
                        actor2.collide(actor1, this, keys);
                    }
                }
            }
        }
        
        for (var i = this.actors.length; i-- > 0;) {
            if (this.actors[i].remove) {
                this.actors.splice(i, 1);
            } else if (this.actors[i].check) {
                this.actors[i].check(this);
                
                if (this.actors[i].remove) {
                    this.actors.splice(i, 1);
                }
            }
        }
    };
    
    Level.prototype.draw = function() {
        // Center the player, with a margin around the player to decrease jerkyness
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            if (actor.type === "player") {
                this.offsetX = constrain(
                    this.offsetX, 
                    -actor.x - this.scrollMargin + width / 2, 
                    -actor.x + this.scrollMargin + width / 2);
                this.offsetY = constrain(
                    this.offsetY, 
                    -actor.y - this.scrollMargin + height / 2, 
                    -actor.y + this.scrollMargin + height / 2);
            }
        }
        
        pushMatrix();
        translate(this.offsetX, this.offsetY);
        
        // Draw a background to indicate the edges
        fill(153, 153, 153);
        noStroke();
        myRect(0, 0, this.levelWidth * blockSize, this.levelHeight * blockSize);
        
        // Draw the static elements
        for (var y = 0; y < this.static.length; y++) {
            for (var x = 0; x < this.static[y].length; x++) {
                if (this.static[y][x]) {
                    this.static[y][x].draw();
                }
            }
        }
        
        textAlign(CENTER, CENTER);
        for (var i = 0; i < this.text.length; i++) {
            var txt = this.text[i]; // Cannot redefine the text function
            fill(0, 0, 0);
            textSize(txt.size || 15);
            text(txt.text, txt.x, txt.y);
        }
        
        // Draw the active elements
        for (var i = 0; i < this.actors.length; i++) {
            this.actors[i].draw();
        }
        
        popMatrix();
    };
    
    Level.prototype.setState = function(state) {
        this.state = state;
    };
    
    Level.prototype.getType = function(x, y) {
        if (x >= 0 && x < this.levelWidth && y >= 0 && y < this.levelHeight) {
            return this.static[y][x]? this.static[y][x].type : "empty";
        } else {
            return "dirt";
        }
    };
    
    Level.prototype.touches = function(x, y, type) {
        // Convert to indexes
        x /= blockSize;
        y /= blockSize;
        
        // Find all the blocks it is touching and check them
        var minX = Math.floor(x), maxX = Math.ceil(x + 1);
        var minY = Math.floor(y), maxY = Math.ceil(y + 1);
        
        for (var x = minX; x < maxX; x++) {
            for (var y = minY; y < maxY; y++) {
                var spotType = this.getType(x, y);
                if (spotType === type || type === "any" && spotType !== "empty") {
                    return {x: x * blockSize, y: y * blockSize};
                }
            }
        }
        
        return false;
    };
    
    Level.prototype.touchesActors = function(actor1, types) {
        for (var j = 0; j < this.actors.length; j++) {
            var actor2 = this.actors[j];
            if (actor1 !== actor2 && types.includes(actor2.type) && 
                Level.actorCollide(actor1, actor2) && 
                !actor1.remove && !actor2.remove) {
                return actor2;
            }
        }
        
        return false;
    };
    
    // Test if two actors are colliding
    Level.actorCollide = function(a1, a2) {
        return a1.x + a1.s > a2.x && a1.x < a2.x + a2.s && 
            a1.y + a1.s > a2.y && a1.y < a2.y + a2.s;
    };
    
    // Loads the current level
    Level.loadLevel = function() {
        // Is there another level? Return false if not.
        if (!allLevelsStored[gameState.level]) {
            return false;
        }
        
        // Load the level. This is very easy with the constructor.
        allLevels[gameState.level] = new Level(allLevelsStored[gameState.level]);
        
        // Since there was another level, return true;
        return true;
    };
    
    return Level;
})();

var Button = (function() {
    function Button(config) {
        this.x = config.x;
        this.y = config.y;
        this.w = config.w;
        // Default height is approximatly the width / golden ratio
        this.h = config.h || this.w / 1.618;
        this.onclick = config.onclick || function () {};
        this.message = config.message || "";
        this.color = config.color || color(94, 215, 255);
        this.textColor = config.textColor || color(0, 0, 0);
        this.textSize = config.textSize || Math.min(this.w * 0.37, this.h * 0.65);
        this.r = config.radius || this.w / 9;
        this.selectedColor = config.selectedColor || color(0, 255, 221);
        this.hoverColor = config.hoverColor;
        if (!this.hoverColor) {
            var darken = 40;
            var r = red(this.color) - darken;
            var g = green(this.color) - darken;
            var b = blue(this.color) - darken;
            var a = alpha(this.color);
            this.hoverColor = color(r, g, b, a);
        }
    }
    
    Button.prototype.mouseClicked = function(mx, my) {
        if (isInMyRect(mx, my, this.x, this.y, this.w, this.h, this.r)) {
            this.onclick();
        }
    };
    
    Button.prototype.draw = function(mx, my, selected) {
        // Alignment
        textAlign(CENTER, CENTER);
        myRectMode(CORNER);
        
        // Background color
        fill(this.color);
        if (isInMyRect(mx, my, this.x, this.y, this.w, this.h, this.r)) {
            fill(this.hoverColor);
        }
        if (selected) {
            fill(this.selectedColor);
        }
        
        // Draw the button
        stroke(0, 0, 0);
        strokeWeight(1);
        myRect(this.x, this.y, this.w, this.h, this.r);
        
        // Draw the message, which might be a function
        if (typeof this.message === "function") {
            this.message(this.x, this.y, this.w, this.h);
        } else {
            fill(this.textColor);
            textSize(this.textSize);
            text(this.message, this.x + this.w / 2, this.y + this.h / 2);
        }
    };
    
    return Button;
})();

var Screen = (function() {
    function Screen(config) {
        this.runMain = config.run || function () {};
        this.onLoad = config.onLoad || function () {};
        this.keys = {};
        this.selectedButtons = [];
        
        this.buttons = [];
        this.buttonSets = [];
        
        if (config.buttons) {
            for (var i = 0; i < config.buttons.length; i++) {
                var buttonConfig = config.buttons[i];
                if (typeof buttonConfig.onclick === "string" && 
                        buttonConfig.onclick.slice(0, 6) === "select") {
                    // Get the set number of this button
                    var setNumber = Number(buttonConfig.onclick.slice(6));
                    if (Number.isNaN(setNumber)) { setNumber = 0; }
                    // Clone the button config, just in case
                    buttonConfig = Object.create(buttonConfig);
                    
                    // If needed, create a set for the button
                    if (!this.buttonSets[setNumber]) {
                        this.buttonSets[setNumber] = [];
                    }
                    // The new button's index in the set
                    var buttonIndex = this.buttonSets[setNumber].length;
                    
                    // Create the onclick function if the user inputted the keyword
                    /* I am using this strange route to making functions because 
                        Ohnoes won't let me define functions in a loop and 
                        I don't want to use jshint */
                    buttonConfig.onclick = Object.constructor("parentScreen",
                        "return function() { parentScreen.selectedButtons[" + 
                            setNumber + "] = " + buttonIndex + "; }")(this);
                    
                    // Optionally select this button
                    if (buttonConfig.selected) {
                        buttonConfig.onclick(); // Click!
                    }
                    
                    // Create the button
                    this.buttonSets[setNumber][buttonIndex] = new Button(buttonConfig);
                    
                } else if (typeof buttonConfig.onclick === "function") {
                    this.buttons[i] = new Button(buttonConfig);
                } else {
                    // Alert the user to their bad input
                    var functionString = String(buttonConfig.onclick).replace(/"/g, "'");
                    throw {message: "new Screen: Button creation error:\n\"" + 
                        functionString + "\"is not a function!"};
                }
            }
        }
    }
    
    Screen.prototype.run = function(secondsElapsed, mx, my) {
        this.draw(secondsElapsed, mx, my);
    };
    
    Screen.prototype.draw = function(secondsElapsed, mx, my) {
        // Passing this.selectedButtons here means it might be modified
        // This is intentional
        this.runMain(this.keys, secondsElapsed, this.selectedButtons); 
        
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(mx, my, false);
        }
        
        for (var s = 0; s < this.buttonSets.length; s++) {
            for (var b = 0; b < this.buttonSets[s].length; b++) {
                this.buttonSets[s][b].draw(mx, my, this.selectedButtons[s] === b);
            }
        }
    };
    
    Screen.prototype.mouseClicked = function(mx, my) {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mouseClicked(mx, my);
        }
        
        for (var s = 0; s < this.buttonSets.length; s++) {
            for (var b = 0; b < this.buttonSets[s].length; b++) {
                this.buttonSets[s][b].mouseClicked(mx, my);
            }
        }
    };
    
    Screen.prototype.keyPressed = function(key) {
        this.keys[key] = true;
    };
    
    Screen.prototype.keyReleased = function(key) {
        this.keys[key] = false;
    };
    
    Screen.switchTo = function(name) {
        var keys = gameScreens[gameState.screen].keys;
        gameState.screen = name;
        gameScreens[gameState.screen].keys = keys;
        gameScreens[gameState.screen].onLoad();
    };
    
    return Screen;
})();

/** The myRect functions **/
// {
// MyRect is a set of functions for drawing rounded rectangles with near-perfect rounding
/* This was written by me before the contest started, and can be found here: 
 https://www.khanacademy.org/computer-programming/myrect-a-better-rectangle/4561505013776384
*/// Many thanks to Bob Lyon's program https://www.khanacademy.org/computer-programming/bzier-circle-simple-as-1-2-3-4/1258627859 for the rounded beziers!

function myRectMode(mode) {
    // Idea to store mode on the 'myRectMode' function from bob lyons program https://www.khanacademy.org/computer-programming/handbook-of-collisions-and-interiors/5567955982876672
    myRectMode.mode = mode;
}
function myRect(x, y, w, h, r1, r2, r3, r4) {
    // kappa and bezier points adapted from bob lyons program
    // https://www.khanacademy.org/computer-programming/bzier-circle-simple-as-1-2-3-4/1258627859
    var kappa = 4 / 3 * (Math.SQRT2 - 1);
    
    var ifNull = Object.constructor("a, b", "return a ?? b;");
    var sideMin = Math.min(Math.abs(w), Math.abs(h))/2;
    r1 = Math.min(ifNull(r1, 0 ), sideMin);
    r2 = Math.min(ifNull(r2, r1), sideMin);
    r3 = Math.min(ifNull(r3, r2), sideMin);
    r4 = Math.min(ifNull(r4, r3), sideMin);
    
    if (myRectMode.mode === CORNERS) {
        // taken from println(rect)
        w -= x;
        h -= y;
    } else if (myRectMode.mode === CENTER) {
        // taken from println(rect)
        x -= w / 2;
        y -= h / 2;
    } else if (myRectMode.mode === RADIUS) {
        // taken from println(rect)
        x -= w / 2;
        y -= h / 2;
        w *= 2;
        h *= 2;
    }
    
    if (w < 0) {
        w *= -1;
        x -= w;
    }
    
    if (h < 0) {
        h *= -1;
        y -= h;
    }
    
    beginShape();
    if (r1 === 0 && r2 === 0 && r3 === 0 && r4 === 0) {
        vertex(x, y + h / 2);
        vertex(x, y);
        vertex(x + w, y);
        vertex(x + w, y + h);
        vertex(x, y + h);
        vertex(x, y + h / 2);
    } else {
        vertex(x, y + h / 2);
        vertex(x, y + r1);
        bezierVertex(x, y - r1 * kappa + r1, x - r1 * kappa + r1, y, x + r1, y);
        vertex(x + w - r2, y);
        bezierVertex(x + w - r2 + r2 * kappa, y, x + w, y - r2 * kappa + r2, x + w, y + r2);
        vertex(x + w, y + h - r3);
        bezierVertex(x + w, y - r3 + r3 * kappa + h, 
            x - r3 + r3 * kappa + w, y + h, x - r3 + w, y + h);
        vertex(x + r4, y + h);
        bezierVertex(x + r4 - r4 * kappa, y + h, x, y - r4 + r4 * kappa + h, x, y + h - r4);
        vertex(x, y + h / 2);
    }
    endShape(CLOSE);
}
function isInMyRect(pointX, pointY, x, y, w, h, r1, r2, r3, r4) { // Not working
    var px = pointX, py = pointY;
    var ifNull = Object.constructor("a, b", "return a ?? b;");
    var sideMin = min(abs(w), abs(h))/2;
    r1 = min(ifNull(r1, 0 ), sideMin);
    r2 = min(ifNull(r2, r1), sideMin);
    r3 = min(ifNull(r3, r2), sideMin);
    r4 = min(ifNull(r4, r3), sideMin);
    
    if (myRectMode.mode === CORNERS) {
        // taken from println(rect)
        w -= x;
        h -= y;
    } else if (myRectMode.mode === CENTER) {
        // taken from println(rect)
        x -= w/2;
        y -= h/2;
    } else if (myRectMode.mode === RADIUS) {
        // taken from println(rect)
        x -= w/2;
        y -= h/2;
        w *= 2;
        h *= 2;
    }
    if (w < 0) {
        w *= - 1;
        x -= w;
    }
    if (h < 0) {
        h *= - 1;
        y -= h;
    }
    
    var originalRectMode = myRectMode.mode;
    myRectMode(CORNER);
    
    var result = false;
    if (arguments.length === 6) {
        result = px >= x && py >= y && px <= x + w && py <= y + h;  
    } else if (arguments.length < 6) {
        result = false;
    } else {
        if (isInMyRect(px, py, x, y, r1, r1)) {
            result = dist(px, py, x + r1, y + r1) * Math.sign(r1) <= r1;
        } else if (isInMyRect(px, py, x + w, y, - r2, r2)) {
            result = dist(px, py, x + w - r2, y + r2) * Math.sign(r2) <= r2;
        } else if (isInMyRect(px, py, x + w, y + h, - r3, - r3)) {
            result = dist(px, py, x + w - r3, y + h - r3) * Math.sign(r3) <= r3;
        } else if (isInMyRect(px, py, x, y + h, r4, - r4)) {
            result = dist(px, py, x + r4, y + h - r4) * Math.sign(r4) <= r4;
        } else if (isInMyRect(px, py, x, y, w, h)) {
            result = true;
        } 
    }
    
    myRectMode(originalRectMode);
    
    return result;
}
// } myRect function, I wrote this before the contest began. Link:
// https://www.khanacademy.org/computer-programming/myrect-better-rectangle/4561505013776384
// The rest of the code was written after the contest began.

/** Initalization, event handling, and game loop **/
/* Initalize screens and levels to their constructors, also a bit of the gameState */
function initalize() {
    for (var i = 0; i < screenNames.length; i++) {
        var name = screenNames[i];
        if (name in gameScreensStored) {
            gameScreens[name] = new Screen(gameScreensStored[name]);
        }
    }
}
initalize();

mouseClicked = function() {
    gameScreens[gameState.screen].mouseClicked(mouseX, mouseY);
};

keyPressed = function() {
    gameScreens[gameState.screen].keyPressed(keyCode);
    gameScreens[gameState.screen].keyPressed(key.toString());
};

keyReleased = function() {
    gameScreens[gameState.screen].keyReleased(keyCode);
    gameScreens[gameState.screen].keyReleased(key.toString());
};

draw = function() {
    var currentMillis = millis();
    var secondsElapsed = Math.min(currentMillis - lastMillis, 50) / 1000;
    lastMillis = currentMillis;
    
    // Ohnoes refuses to talk about errors in the draw function, so I'm putting this here
    try {
        gameScreens[gameState.screen].run(secondsElapsed, mouseX, mouseY);
    } catch (error) {
        debug(error);
    }
};

// Screen.switchTo("play");
