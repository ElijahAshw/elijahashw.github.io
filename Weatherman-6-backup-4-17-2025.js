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
   * Fix bug where some objects cannot stack the wrong way
   * Submit!
**///

/** Variables with global constants, levels, and screens **/
var weatherTypes = ["sun", "small sun", "clouds", "light snow", "snow"];
var screenNames = ["title", "info", "play", "end"];
var tutorialLevels = 6;
var blockSize = 20;
// Foreward declarations
var myRect, myRectMode, isInMyRect, bitmapsStored, Level, Screen, Static;

// Game state
var gameState = {
    screen: screenNames[0],
    level: 12,
};

// Time storage for animation smoothing
var lastMillis = 0;

// Stored level plans and an array to hold the loaded ones
/* Mapping:
    "#": "dirt",
    "-": "empty",
    "s": "lava",
    "@": "portal",
    "|": "grate",
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
        "#-$----###sss##->--#########s##",
        "###############################",
        {text: "Hop up!", x: 4.2, y: 7.95},
        {text: "Avoid the lava.", x: 10.35, y: 7.9},
        {text: "Don't die!\nJump on top\nof him.", x: 16.6, y: 7.5},
        {text: "Lava melts snow.", x: 16.55, y: 2.4, size: 0.65},
        {text: "Let it snow!\nThen climb the\nsnow to the top.", x: 22.1, y: 6.5},
        {text: "Enter the portal!", x: 27.5, y: 3},
        ],
    /* Level 2 */ [
        "------#########----#-----------#######",
        "------sssssssss----#-----------------@",
        "---------sss-------#------------------",
        "----------s--------#------------------",
        "-------------------##-----------------",
        "-------------------##----------------<",
        "-------------------##-------------#--#",
        "-------------------##----------#######",
        "-----##-#-#-#-##---#-----------##sss##",
        "-----##-------###-##-----------###ss##",
        "-----#######s####-##-----------##s#s##",
        "-----########s###-##-----------#s#####",
        "-----##ssssssss##----#-<->-#sss#######",
        "$----########s########################",
        "############s#########################",
        {text: "You need\nsnow again.", x: 2.65, y: 10.65},
        {text: "You won't fall through.", x: 10.6, y: 6.35},
        {text: "Now you\nneed the\nsun.", x: 17.35, y: 5.85, front: true},
        {text: "Use down to\nalign and get\nthrough the hole.", x: 17.2, y: 9.95},
        {text: "'r' to restart.", x: 17.2, y: 13.95},
        {text: "Snow can\nhold them still.", x: 22.55, y: 10.85},
        {text: "Snow can\nget you\nhigh enough.", x: 25.3, y: 7.15},
        {text: "Hold UP as\nyou jump\non him.", x: 33.3, y: 3.65},
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
        "-##-->-<-><><>-<--#-#--#",
        "-#@##sssssssssss#ssssss#",
        "---##############ssssss#",
        {text: "Climb through a snowstorm.", x: 10.5, y: 5.4},
        {text: "Ride some snow\nto fall slower.", x: 20.5, y: 8.9},
        {text: "Run!", x: 21.1, y: 12},
        {text: "They can walk in lava.\nAnd you can jump on them.", x: 11.3, y: 12},
        {text: "Edges won't\nhurt you.", x: 2.1, y: 6.7},
        {text: "Yay!", x: 2, y: 15.5},
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
        {text: "Enemies walk on snow.\nUse this to your advantage.", x: 6.55, y: 5.4},
        ],
    /* Level 5 */ [
        "#--#####---##",
        "#--------->@#",
        "#---$---#-###",
        "#--####-#---#",
        "#---------###",
        "#---------#s#",
        "#############",
        {text: "Enemies fall if what\nthey're standing on falls.", x: 5.55, y: 5},
        ],
    /* Level 6 */ [
        "#####----#######",
        "#--------------#",
        "#--------------#",
        "#$-------------#",
        "##------->-----#",
        "#####||||#####-#",
        "#--@---------#-#",
        "#------------#-#",
        "#---------##-#-#",
        "#---------#--#-#",
        "#---------#-##-#",
        "#---------#----#",
        "################",
        {text: "It's called a grate.", x: 7, y: 4.25},
        {text: "Let it snow!", x: 7, y: 9.25},
        ],
    /* Level 7 */ [
        "-------##",
        "-------##",
        "--####-##",
        "--#-@#-##",
        "--#-##-##",
        "--#----##",
        "--#######",
        "$-#######",
        {text: "Good luck!", x: 5.65, y: 7.1},
        ],
    /* Level 8 */ [
        "ssssssssss----",
        "----@---s-----",
        "--------s--->-",
        "-------sss--#-",
        "------ssssss#-",
        "$---sssssssss-",
        "##-##########-",
        "--------------",
        ],
    /* Level 9 */ [
        "####----------#--------##############",
        "-----------------------------------@#",
        "------------------------------------#",
        "--------$---------------------------#",
        "#--###########%---------------------#",
        "#--#><>-<><><>%----------sssssssss###",
        "#-############%---------#############",
        "#-------------%---------#############",
        "###############---------#############",
        "###############---------#############",
        "###############---------#############",
        "###############---------#############",
        "###############ss#ss#ss##############",
        {text: "Random snow can form bridges.", x: 9.1, y: 11.6},
        ],
    /* Level 10 */ [
        "--------------------------------------------",
        "-s------------------------------------------",
        "--------------------------------------------",
        "--------------------------------------------",
        "#-#-#-#-#-#-#-#############-----------------",
        "#-#-#-#-#-#-#-#############-----------------",
        "#-#-#-#-#-#-#-##ssssssssss#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##ssssssssss#---------ssssssss",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##ssssssssss#-----------------",
        "#-#-#-#-#-#-#-##s########s#----------------@",
        "#-#-#-#-#-#-#-##ssssssssss#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#ss-#s#-#-#-##ssssssssss#-----------------",
        "#-#ss-#s#-#-#-##s########s#-----------------",
        "#-#s--#s#-#-#-##ssssssssss#-----------------",
        "#-#s--#s#-#-#-##s########s#---$->-<->-<->-<-",
        "#s#s@-#s#s#-#-##ssssssssss######ssssssssssss",
        "#####-######################################",
        "#####-######################################",
        "#####s######################################",
        "############################################",
        ],
    /* Level 11 */ [
        "#####--------------------------",
        "#---------------------#########",
        "#------------------####------@#",
        "#------------$-@--------------#",
        "#-----###--#######------------#",
        "#----###--<->-<>-<#-----------#",
        "#---#-->-###########-------####",
        "#--#####-%-----sssssssssssssss#",
        "#------#-%----ssssssssssssssss#",
        "##-----#-%---sssssssssssssssss#",
        "#-#----#-%--ssssssssssssssssss#",
        "#--#---#-%-sssssssssssssssssss#",
        "#---#--##%#####################",
        "#----#<>-<##sss################",
        "#-----###-###ss################",
        "#sssssssss##s#s################",
        "###########s###################",
        ],
    /* Level 12 */ [
        "-------------------------",
        "-------------------------",
        "--------------$----------",
        "----#----#########-------",
        "-----#---#@@@@@@#-#------",
        "<->------#------#--#-----",
        "###--###-#------#---#----",
        "ss#--#s#-#------#ssss####",
        "#s#--#s#--------######-@#",
        "ss#--#s#-##-------------#",
        "#s#--#s#-###------------#",
        "ss#--#s#-<###-----------#",
        "s##--#s#-##s####------###",
        "ss####sssssssssssssssssss",
        ],
    /* Level 13 */ [
        "@------------------@",
        "@------------------@",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "$------------------#",
        "#------------------#",
        "#------------------#",
        "#------------------#",
        "#ssssssssssssssssss#",
        "####################",
        ],
];

// And stored scenes and an object to hold loaded ones
var gameScreens = Object.create(null);
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
            
            // Weatherman image
            var bitmapObject = bitmapsStored.player;
            Static.drawBitmap(bitmapObject.bitmap, bitmapObject.colorMap, 
                150, 163, 100, 100);
            
            // Title, and block behind it
            textSize(48);
            stroke(0, 0, 0);
            fill(138, 138, 138); // Lighter than the background
            myRectMode(CENTER);
            myRect(width / 2, 110, textWidth("Weatherman") + 30, 48 + 30, 15);
            
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("Weatherman", width / 2, 110);
        },
        buttons: [
            {x: 35, y: 285, w: 100, message: "Tutorial", textSize: 24, 
                onclick: function () { Screen.switchTo(screenNames[1]); }},
            {x: width - 235, y: 285, w: 200, h: 100 / 1.618, r: 12, 
                message: "Play", 
                textSize: 33, onclick: function () {
                    gameState.level = tutorialLevels;
                    Screen.switchTo(screenNames[2]); }},
        ]
    },
    "info": {
        run: function () {
            // Background
            background(117, 117, 117);
            
            // Title
            textSize(40);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("How to play", width / 2, 60);
            
            textSize(20);
            textAlign(CENTER, TOP);
            text("Use the arrow keys to move the player\naround. Wasd and/or spacebar also work.\nPress 'r' to restart. Use the selectors at the\ntop of the screen to change the weather.\nUse this power well!\nYou can jump on top of snow. Hitting\nit from any other side will get rid of it.\nYou will learn more as you play.", width / 2, 95);
        },
        buttons: [
            {x: width / 2 - 170 / 2, y: 300, w: 170, h: 70, 
                message: "Continue", textSize: 33, 
                onclick: function () { Screen.switchTo(screenNames[2]); }},
        ]
    }, 
    "play": {
        run: function (keys, secondsElapsed, selected) {
            
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
                    return; // Don't try to run a non-existant level
                    /* Since returning here skips drawing the background, 
                       the screen won't be blank */
                }
            } else if (allLevels[gameState.level].state === "lose" || keys.r) {
                // Restart the level and reset the weather selectors
                selected[0] = 2;
                selected[1] = 0;
                Level.loadLevel();
            }
            
            // Background
            background(117, 117, 117);
            
            // Run the level
            allLevels[gameState.level].run(keys, secondsElapsed, 
                weatherTypes[selected[0]], selected[1] === 0);
        },
        onLoad: function () {
            textAlign(CENTER, CENTER);
            Level.loadLevel();
        },
        buttons: [
            // Sun
            {x: 20, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
                selectedColor: color(201, 201, 201, 100), textSize: 13,
                message: "Straight\nsnow", onclick: "select1", selected: true},
            
            // Random snow
            {x: 330, y: 10, w: 50, h: 50, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: 1,
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
            
            // Cloud
            var x = 349, y = 21, s = 300;
            var cloudWidth = s / 3;
            var cloudHeight = s / 4;
            
            fill(138, 138, 138);
            noStroke();
            ellipse(x, y, cloudWidth , cloudHeight); // Center
            ellipse(x - s / 6, y + cloudHeight / 6, 
                cloudWidth , cloudHeight * 2 / 3); // Left
            ellipse(x + s / 6, y + cloudHeight / 6, 
                cloudWidth , cloudHeight * 2 / 3); // Right
            
            // Title
            textSize(40);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("You won!", width / 2, 69);
            
            // Smaller message
            textSize(22);
            textAlign(CENTER, TOP);
            var message = "Congratulations! You used the weather\nto help you defeat your enemies\nand traverse a challenging world!";
            
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

// Bitmaps
// My sister helped me with the player and portal graphics
var bitmaps = bitmaps || Object.create(null); // Don't regenerate the bitmaps on restart
var bitmapsStored = {
    "dirt": {
        colorMap: {
            "1": color(122, 79, 0),
            "2": color(156, 96, 0),
        },
        bitmap: [
            "12121",
            "11121",
            "21111",
            "21112",
            "11211",
            ]
    },
    "grass": {
        colorMap: {
            "1": color(122, 79, 0),
            "2": color(156, 96, 0),
            "3": color(57, 176, 63),
            "4": color(94, 199, 99),
        },
        bitmap: [
            "43434",
            "11121",
            "21111",
            "21112",
            "11211",
            ]
    },
    "lava": {
        colorMap: {
            "1": color(255, 85, 0),
            "2": color(255, 162, 0),
        },
        bitmap: [
            "21121",
            "22111",
            "11112",
            "11211",
            "12121",
            ]
    },
    // My sister helped me with the portal graphics
    "portal": {
        colorMap: {
            "1": color(255, 0, 238),
            "2": color(200, 0, 255),
        },
        bitmap: [
            "211111",
            "212221",
            "212121",
            "211121",
            "222221",
            "111111",
            ]
    },
    "grate": {
        colorMap: {
            "0": color(1, 0, 0, 0),
            "1": color(0, 0, 0),
        },
        bitmap: [
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            ]
    },
    "enemy": {
        colorMap: {
            "0": color(1, 0, 0, 0),
            "1": color(255, 196, 0),
            "2": color(11, 97, 0),
        },
        bitmap: [
            "101101",
            "122221",
            "022220",
            "022220",
            "010010",
            "110011",
            ]
    },
    // My sister also helped me with the player graphics
    "player": {
        colorMap: {
            "0": color(1, 0, 0, 0),
            "1": color(75, 91, 171),
            "2": color(77, 166, 255),
            "3": color(0, 255, 255),
            "4": color(255, 223, 194),
            "5": color(186, 97, 86),
        },
        bitmap: [
            "554455",
            "004400",
            "433334",
            "003300",
            "022220",
            "110011",
            ]
    },
    "snow": {
        colorMap: {
            "1": color(255, 255, 255),
            "2": color(219, 252, 255),
            "3": color(191, 229, 255),
        },
        bitmap: [
            "23323",
            "31112",
            "11111",
            "11111",
            "11111",
            ]
    },
    "sun": {
        colorMap: {
            "1": color(255, 255, 0, 100),
        },
        bitmap: [
            "1",
            ]
    },
};

/** Character constructers **/
// From Bob Lyon, I have learned to like to use IIFEs to wrap constructors

var Sun = (function() {
    function Sun(x, y) {
        this.x = x;
        this.y = y;
        this.s = 1; // Size
        this.yVelocity = 0;
        this.previousY = y;
        this.type = "sun";
        this.gravity = 1.5; // Blocks
        this.remove = false;
    }
    
    Sun.prototype.update = function(secondsElapsed, keys, level) {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity
        this.yVelocity = Math.min(15, this.yVelocity + this.gravity);
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
        var touchY = level.touches(this.x, this.y, "not empty grate");
        if (touchY) {
            this.remove = true;
        }
    };
    
    Sun.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x, this.y, xOffset, yOffset);
    };
    
    return Sun;
})();

var Snow = (function() {
    function Snow(x, y) {
        this.x = x;
        this.y = y;
        this.s = 1; // Size
        this.previousY = y;
        this.type = "snow";
        this.gravity = 3.5;
        this.remove = false;
    }
    
    Snow.prototype.update = function(secondsElapsed, keys, level) {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity, we are assuming that air restance is high enough that the snow is already at terminal velocity
        var newY = this.y + this.gravity * secondsElapsed;
        
        // Test collision with ground
        var touchY = level.touches(this.x, newY, "dirt portal");
        if (touchY) {
            // Assuming we are falling
            this.y = touchY.y - this.s;
            this.yVelocity = 0;
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
    
    Snow.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x, this.y, xOffset, yOffset);
    };
    
    return Snow;
})();

var Player = (function() {
    function Player(x, y) {
        this.x = x;
        this.y = y;
        this.s = 1; // Size
        this.previousY = y; // For collision detection
        this.yVelocity = 0;
        this.xSpeed = 7.4; // Blocks per second
        this.jumpSpeed = -18;
        this.gravity = 66.667;
        this.type = "player";
        this.remove = false;
    }
    
    Player.prototype.update = function(secondsElapsed, keys, level) {
        var onGround = level.touches(this.x, this.y + 0.001, "dirt grate");
        
        // X-direction movement {
        var xMotion = 0;
        if (keys[LEFT] || keys.a) { xMotion -= this.xSpeed; }
        if (keys[RIGHT] || keys.d) { xMotion += this.xSpeed; }
        // Account for the fact that not all frames are the same length by 
        // moving relative to that amount
        xMotion *= secondsElapsed;
        // Collision testing x direction
        var newX = this.x + xMotion;
        // Down key alignment, prevent going too fast
        if (keys[DOWN] || keys.s) {
            var roundedX = Math.round(newX);
            var moveDistance = this.xSpeed * secondsElapsed; // Decrease verbosity
            newX = constrain(roundedX, this.x - moveDistance, this.x + moveDistance);
        }
        
        var touchX = level.touches(newX, this.y, "dirt grate");
        if (touchX) {
            if (xMotion < 0) {
                // Moving left, so go to the right of the object
                this.x = touchX.x + 1;
            } else if (xMotion > 0) {
                // Moving right, so go to the left of the object
                this.x = touchX.x - this.s;
            }
        } else {
            this.x = newX;
        }
        // }
        
        // Y-direction movement {
        // Save previous y position
        this.previousY = this.y;
        
        // Apply gravity
        this.yVelocity += this.gravity * secondsElapsed;
        
        // Fall
        var yMotion = this.yVelocity * secondsElapsed;
        
        // Apply a terminal velocity of 1 block per frame
        yMotion = Math.min(yMotion, 1);
        var newY = this.y + yMotion;
        // Test collision with ground, also record whether we are touching the ground
        this.onGround = false;
        var touchY = level.touches(this.x, newY, "dirt grate");
        if (touchY) {
            if (yMotion > 0) {
                // Falling, so go to the top of the object
                this.y = touchY.y - this.s;
                this.yVelocity = 0;
            } else {
                // Jumping, to go to the bottom of the object
                this.y = touchY.y + 1;
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
    
    Player.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x, this.y, xOffset, yOffset);
    };
    
    return Player;
})();

var Enemy = (function() {
    function Enemy(x, y, type) {
        this.x = x;
        this.y = y;
        this.s = 1; // Size
        this.previousY = y;
        this.yVelocity = 0;
        this.gravity = 66.666667; // Same as player
        this.xSpeed = 2;
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
        this.x += xMotion; // Try this out, we saved the old value
        var touchWallX = level.touches(this.x, this.y, "dirt grate portal");
        var touchedActorX = level.touchesActors(this, ["snow", "enemy"]);
        var touchX = touchWallX || touchedActorX;
        var turned = false;
        if (touchX) {
            if (xMotion < 0) {
                // Moving left, so go to the right of the object
                this.x = touchX.x + 1;
            } else if (xMotion > 0) {
                // Moving right, so go to the left of the object
                this.x = touchX.x - this.s;
            }
            this.turn();
            turned = true; // To prevent turning twice in one frame
        }
        this.y += 0.001; // This is for a quick test
        var touchedActor = level.touchesActors(this, ["snow", "enemy"]);
        // Reset the Y
        this.y = oldY;
        var touchXY = level.touches(this.x, this.y + 0.001, "dirt grate");
        if (!touchXY && !touchedActor) {
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
        this.yVelocity += this.gravity * secondsElapsed;
        
        // Fall
        var yMotion = this.yVelocity * secondsElapsed;
        // Apply a terminal velocity of 1 block per frame
        yMotion = Math.min(yMotion, 1);
        this.y += yMotion;
        // Test collision with ground or some actors
        var touchFloorY = level.touches(this.x, this.y, "dirt grate");
        var touchActorY = level.touchesActors(this, ["snow", "enemy"]);
        var touchY = touchFloorY || touchActorY;
        if (touchY) {
            if (yMotion > 0) {
                // Falling, so go to the top of the object
                this.y = touchY.y - this.s;
                this.yVelocity = 0;
            } else {
                // Jumping, to go to the bottom of the object
                this.y = touchY.y + 1;
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
    
    Enemy.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x, this.y, xOffset, yOffset);
    };
    
    return Enemy;
})();

/** Letters to blocks mapping **/
var lettersToBlocks = {
    "#": "dirt", // AKA ground
    "-": "empty",
    "s": "lava",
    "@": "portal",
    "|": "grate",
    "^": Enemy,
    "<": Enemy,
    ">": Enemy,
    "%": Snow,
    "$": Player,
};

/** Main constructors **/
// Some code inspiration from https://eloquentjavascript.net/16_game.html

// Static tools, not a constructor
var Static = (function() {
    var blockSize = 20;
    var Static = {};
    
    Static.createBackground = function(staticElements, text, w, h) {
        var backgroundCanvas = createGraphics(w * blockSize, h * blockSize, JAVA2D);
        
        backgroundCanvas.background(153, 153, 153);
        
        for (var y = 0; y < staticElements.length; y++) {
            for (var x = 0; x < staticElements[y].length; x++) {
                var above = y < 1? "dirt" : staticElements[y - 1][x];
                Static.drawStaticElement(
                    staticElements[y][x], x, y, above, backgroundCanvas);
            }
        }
        
        backgroundCanvas.textAlign(CENTER, CENTER);
        backgroundCanvas.fill(0, 0, 0);
        for (var i = 0; i < text.length; i++) {
            var txt = text[i]; // Cannot redefine the text function
            // There is a simpler way, but I wanted this to be more readable
            if (!txt.front) {
                backgroundCanvas.textSize(txt.size || 15);
                backgroundCanvas.text(txt.text, txt.x * blockSize, txt.y * blockSize);
            }
        }
        
        return backgroundCanvas.get();
    };
    
    Static.drawStaticElement = function(type, x, y, above, canvas) {
        if (type === "dirt") {
            if (above === "empty" || above === "portal") {
                Static.drawCharacter("grass", x, y, 0, 0, canvas);
            } else {
                Static.drawCharacter(type, x, y, 0, 0, canvas);
            }
        } else if (type in bitmaps) {
            Static.drawCharacter(type, x, y, 0, 0, canvas);
        } else if (type !== "empty") { // Unknown type
            fill(255, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(2);
            canvas.rect(x, y, blockSize, blockSize);
        }
    };
    
    Static.drawCharacter = function(bitmapName, x, y, xOffset, yOffset, canvas) {
        // Convert block coordinates to pixels
        x = x * blockSize + xOffset;
        y = y * blockSize + yOffset;
        if (canvas) {
            canvas.image(bitmaps[bitmapName], x, y);
        } else {
            image(bitmaps[bitmapName], x, y);
        }
    };
    
    Static.drawBitmap = function(bitmap, colorMap, xPos, yPos, w, h) {
        var blockHeight = h / bitmap.length;
        
        // I think iterating backwards is faster because
        // the array length is only read once.
        // Speed is no longer an issue here, but the looks are slightly different for
        // forewards iterating vs backwards, so I will leave it like this
        strokeWeight(0.7); // Prevent gaps between pixels
        for (var y = bitmap.length; y-- > 0;) { 
            var blockWidth = w / bitmap[y].length;
            for (var x = bitmap[y].length; x-- > 0;) {
                var blockX = xPos + x * blockWidth;
                var blockY = yPos + y * blockHeight;
                var blockColor = colorMap[bitmap[y][x]]; // Reduce lookups
                fill(blockColor);
                stroke(blockColor);
                quad(blockX, blockY, 
                    blockX + blockWidth, blockY, 
                    blockX + blockWidth, blockY + blockHeight,
                    blockX, blockY + blockHeight);
            }
        }
    };
    
    Static.loadBitmaps = function() {
        for (var name in bitmapsStored) {
            if (!(name in bitmaps)) {
                var bitmap = bitmapsStored[name].bitmap;
                var colorMap = bitmapsStored[name].colorMap;
                
                background(255, 0, 0, 0);
                
                Static.drawBitmap(bitmap, colorMap, 0, 0, blockSize, blockSize);
                
                bitmaps[name] = get(0, 0, blockSize, blockSize);
            }
        }
    };
    
    return Static;
})();

var Level = (function() {
    function Level(plan) {
        // Read and proccess the level plan
        var levelParts = Level.readPlan(plan);
        
        // Set this properties to what was returned
        this.staticElements = levelParts.staticElements;
        this.actors = levelParts.actors;
        this.text = levelParts.text;
        this.levelWidth = levelParts.planWidth;
        this.levelHeight = levelParts.planHeight;
        
        // Get the static elements as an image
        this.staticElementsImage = Static.createBackground(
            this.staticElements, this.text, this.levelWidth, this.levelHeight);
        
        // The current state property and a constant
        this.state = "play";
        this.scrollMargin = 100;
        
        // For scrolling the board
        this.offsetX = width / 2 - this.staticElementsImage.width / 2;
        this.offsetY = height / 2 - this.staticElementsImage.height / 2;
    }
    
    // Main methods
    Level.prototype.run = function(keys, secondsElapsed, weather, straightSnow) {
        this.createWeather(weather, straightSnow);
        this.update(keys, secondsElapsed);
        this.draw();
    };
    
    Level.prototype.createWeather = function(weather, straightSnow) {
        if (weather === weatherTypes[3] || weather === weatherTypes[4]) {
            var subDivide = straightSnow? 1 : 5;
            var speed = weather === weatherTypes[4]? 1 : 4;
            if (frameCount % speed === 0) {
                var randSpot = Math.random() * this.levelWidth;
                // Round to the nearest subDivide
                var newSnowX = Math.floor(randSpot * subDivide) / subDivide;
                if (!this.touches(newSnowX, 0, "not empty")) {
                    var collides = false;
                    for (var a = 0; a < this.actors.length; a++) {
                        if (Level.actorCollide(newSnowX, 0, 1, this.actors[a])) {
                            collides = true;
                            break;
                        }
                    }
                    
                    if (!collides) {
                        var newSnow = Snow.new(newSnowX, 0, "s");
                        this.actors.push(newSnow);
                    }
                }
            }
        } else if (weather === weatherTypes[0] || weather === weatherTypes[1]) {
            var speed = weather === weatherTypes[0]? 1 : 5;
            if (frameCount % speed === 0) {
                var randSpot = Math.floor(Math.random() * this.levelWidth);
                if (this.getType(randSpot, 0) === "empty") {
                    var newSun = Sun.new(randSpot, 0);
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
        
        // Check for collisions among non-player actors
        for (var i = 0; i < this.actors.length; i++) {
            var actor1 = this.actors[i];
            if (actor1.type === "player") { continue; } // Skip the players
            for (var j = i + 1; j < this.actors.length; j++) {
                var actor2 = this.actors[j];
                if (actor2.type === "player") { continue; } // Skip the players
                if (actor1 !== actor2 && Level.actorCollide(
                        actor1.x, actor1.y, actor1.s, actor2)) {
                    if (!actor1.remove && !actor2.remove) {
                        actor1.collide(actor2, this, keys);
                        actor2.collide(actor1, this, keys);
                    }
                }
            }
        }
        
        // Check for collisions between player and other actors
        for (var i = 0; i < this.actors.length; i++) {
            var actor1 = this.actors[i];
            if (actor1.type !== "player") { continue; } // Now check the players only
            for (var j = 0; j < this.actors.length; j++) {
                var actor2 = this.actors[j];
                if (actor1 !== actor2 && Level.actorCollide(
                        actor1.x, actor1.y, actor1.s, actor2)) {
                    if (!actor1.remove && !actor2.remove) {
                        actor1.collide(actor2, this, keys);
                        actor2.collide(actor1, this, keys);
                    }
                }
            }
        }
        
        // Remove all flagged actors, and call .check on the rest
        for (var i = this.actors.length; i-- > 0;) {
            if (!this.actors[i].remove && this.actors[i].check) {
                this.actors[i].check(this);
            }
            
            // The .check method might set the remove flag to true
            if (this.actors[i].remove) {
                this.actors.splice(i, 1);
            }
        }
    };
    
    Level.prototype.draw = function() {
        // Center the player, with a margin around the player to eliminate jerkyness
        this.scrollPlayerIntoView();
        
        // Draw the static elements with offset
        image(this.staticElementsImage, this.offsetX, this.offsetY);
        
        // Draw the active elements with offset
        for (var i = 0; i < this.actors.length; i++) {
            this.actors[i].draw(this.offsetX, this.offsetY);
        }
        
        // Draw the front text with offset
        this.drawText(true, this.offsetX, this.offsetY);
        
        popMatrix();
    };
    
    Level.prototype.drawText = function(drawFrontText, offsetX, offsetY) {
        // Putting this in its own function because we use it twice while drawing
        for (var i = 0; i < this.text.length; i++) {
            var txt = this.text[i]; // Cannot redefine the text function
            // There is a simpler way, but I wanted this to be more readable
            if (txt.front && drawFrontText || !txt.front && !drawFrontText) {
                fill(0, 0, 0);
                textSize(txt.size || 15);
                text(txt.text, txt.x * blockSize + offsetX, txt.y * blockSize + offsetY);
            }
        }
    };
    
    Level.prototype.scrollPlayerIntoView = function() {
        // Center the player, with a margin around the player to eliminate jerkyness
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            if (actor.type === "player") {
                this.offsetX = constrain(
                    this.offsetX, 
                    -actor.x * blockSize - this.scrollMargin + width / 2, 
                    -actor.x * blockSize + this.scrollMargin + width / 2);
                this.offsetY = constrain(
                    this.offsetY, 
                    -actor.y * blockSize - this.scrollMargin + height / 2, 
                    -actor.y * blockSize + this.scrollMargin + height / 2);
            }
        }
    };
    
    // Methods for actors to call
    Level.prototype.setState = function(state) {
        this.state = state;
    };
    
    Level.prototype.getType = function(x, y) {
        if (x >= 0 && x < this.levelWidth && y >= 0 && y < this.levelHeight) {
            return this.staticElements[y][x];
        } else {
            return "dirt";
        }
    };
    
    Level.prototype.touches = function(x, y, types) {
        // Convert type into an array to prevent accidental overlaps
        types = types.split(" ");
        
        // Find all the blocks it is touching and check them
        var minX = Math.floor(x), maxX = Math.ceil(x + 1);
        var minY = Math.floor(y), maxY = Math.ceil(y + 1);
        
        for (var x = minX; x < maxX; x++) {
            for (var y = minY; y < maxY; y++) {
                var spotType = this.getType(x, y);
                if (types[0] === "not") { // Asking for a square not in the list
                    if (!types.includes(spotType)) {
                        return {x: x, y: y};
                    }
                } else {
                    if (types.includes(spotType)) {
                        return {x: x, y: y};
                    }
                }
            }
        }
        
        return false;
    };
    
    Level.prototype.touchesActors = function(actor1, types) {
        for (var j = 0; j < this.actors.length; j++) {
            var actor2 = this.actors[j];
            if (actor1 !== actor2 && types.includes(actor2.type) && 
                Level.actorCollide(actor1.x, actor1.y, actor1.s, actor2) && 
                !actor1.remove && !actor2.remove) {
                return actor2;
            }
        }
        
        return false;
    };
    
    // Tests if two actors are colliding
    Level.actorCollide = function(a1x, a1y, a1s, a2) {
        return a1x + a1s > a2.x && a1x < a2.x + a2.s && 
            a1y + a1s > a2.y && a1y < a2.y + a2.s;
    };
    
    // Reads a plan and return its interpreted contents
    Level.readPlan = function(plan) {
        // Things to return
        var planWidth = 0;
        var planHeight;
        var text = [];
        var staticElements = [];
        var actors = [];
        
        var snow = []; // To save the snow for the end of the actors array
        for (var y = 0; y < plan.length; y++) {
            var staticRow = []; // Split static elements into rows for easy lookup
            
            // Handle text objects
            if (typeof plan[y] !== "string") {
                text.push(plan[y]);
                continue; // Don't try to read the object as a row string
            }
            
            // Proccess the string
            for (var x = 0; x < plan[y].length; x++) {
                planWidth = Math.max(plan[y].length);
                
                var type = lettersToBlocks[plan[y][x]];
                // A string means a static block
                if (typeof type === "string" || type === undefined) {
                    staticRow[x] = type;
                } else if (typeof type === "function") { // Actor block, has a constructor
                    var newActor = type.new(x, y, plan[y][x]);
                    if (newActor.type === "snow") {
                        // Put the lower snow in before the higher snow
                        snow.unshift(newActor);
                    } else {
                        actors.push(newActor);
                    }
                    
                    // Add an empty to static
                    staticRow[x] = "empty";
                }
            }
            // Add the row
            staticElements[y] = staticRow;
        }
        
        actors = actors.concat(snow);
        planHeight = plan.length - text.length;
        
        // Return what we need to
        return {
            planWidth: planWidth,
            planHeight: planHeight,
            text: text,
            staticElements: staticElements,
            actors: actors,
        };
    };
    
    // Loads the current level
    Level.loadLevel = function() {
        // Is there another level? Return false if not.
        if (!allLevelsStored[gameState.level]) {
            return false;
        }
        
        // Load the level. This is very easy with the constructor.
        allLevels[gameState.level] = Level.new(allLevelsStored[gameState.level]);
        
        // Since there was another level, return true;
        return true;
    };
    
    return Level;
})();

var Button = (function() {
    function Button(config) {
        // Sizing
        this.x = config.x;
        this.y = config.y;
        this.w = config.w;
        // Default height is approximatly the width / golden ratio
        this.h = config.h || this.w / 1.618;
        this.r = config.r || this.w / 9;
        
        // Functions
        this.onclick = config.onclick || function () {};
        this.message = config.message || "";
        
        // Appearance
            // Text
        this.textColor = config.textColor || color(0, 0, 0);
        this.textSize = config.textSize || Math.min(this.w * 0.37, this.h * 0.65);
            // Stroke weight
        this.strokeWeight = config.strokeWeight || 2;
            // Background colors
        this.color = config.color || color(94, 215, 255);
        this.selectedColor = config.selectedColor || color(0, 255, 221);
        this.hoverColor = config.hoverColor;
        
        // Create a default hover color
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
        strokeWeight(this.strokeWeight);
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
                    this.buttonSets[setNumber][buttonIndex] = Button.new(buttonConfig);
                    
                } else if (typeof buttonConfig.onclick === "function") {
                    this.buttons[i] = Button.new(buttonConfig);
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
        // Load the screen if it has not already been loaded
        if (!(name in gameScreens) && name in gameScreensStored) {
            gameScreens[name] = Screen.new(gameScreensStored[name]);
        } else if (!(name in gameScreensStored)) {
            return;
        }
        
        var keys = gameScreens[gameState.screen].keys;
        gameScreens[name].keys = keys;
        gameState.screen = name;
        gameScreens[name].onLoad();
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
    if (arguments.length <= 4) {
        vertex(x, y + h / 2);
        vertex(x, y);
        vertex(x + w, y);
        vertex(x + w, y + h);
        vertex(x, y + h);
        vertex(x, y + h / 2);
    } else {
        var ifNull = Object.constructor("a, b", "return a ?? b;");
        var sideMin = Math.min(Math.abs(w), Math.abs(h))/2;
        r1 = Math.min(ifNull(r1, 0 ), sideMin);
        r2 = Math.min(ifNull(r2, r1), sideMin);
        r3 = Math.min(ifNull(r3, r2), sideMin);
        r4 = Math.min(ifNull(r4, r3), sideMin);
        
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
function isInMyRect(pointX, pointY, x, y, w, h, r1, r2, r3, r4) {
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
// } myRect function, I (mostly) wrote this before the contest began. Link:
// https://www.khanacademy.org/computer-programming/myrect-better-rectangle/4561505013776384
// The rest of my code was written after the contest began.

/** Work around for the KA memory leak **/
/* Copyed from Bob Lyons program
 https://www.khanacademy.org/computer-programming/leak-free-particle-system/4684587452399616 */
/*
 * Give every object a "new" method that works around
 * the Khan Academy leak.
 */
var object = Object; // Prevent Oh noes from saying "Object.create is not a function" 
// That only happens when editing, but still...
function whatNewDoes() {
    var obj = object.create(this.prototype);
    return this.apply(obj, arguments) || obj;
}
Object.constructor.prototype.new = whatNewDoes;

/** Initalization, event handling, and game loop **/
Static.loadBitmaps();

Screen.switchTo(gameState.screen);

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

frameRate(60);
draw = function() {
    var currentMillis = millis();
    var secondsElapsed = Math.min(currentMillis - lastMillis, 50) / 1000;
    lastMillis = currentMillis;
    
    // Ohnoes refuses to talk about errors in the draw function, so I'm putting this here
    // try {
        // var t = millis();
    gameScreens[gameState.screen].run(secondsElapsed, mouseX, mouseY);
        // println(millis() - t);
    // } catch (error) {
    //     debug(error);
    // }
};
