/**
        
                   Contest: Weather
                
         I have completed 100% of Khan Academy's 
        'Intro to JS' and have been programming 
                  for 60 months.
    
          I would prefer to be placed in the
                      Advanced
                       bracket
                       
    
    TODO:
     - Fill out statements above ✓
     - Save your entry as a spin-off of this program ✓
     - Have fun! ✓
     
**/

/** 
 *     Weatherman is a platformer where controlling the weather is a 
 * key part of how you win.
 *    Optimization has been a big part of the game. When I first added the 
 * bitmap characters, the game slowed down unbearably. Preloading them has 
 * made a big improvement, and further improvement came from putting all
 * the static parts of the level into one large image. Next I timed my program,
 * and was suprised to find that updating the actors (moving characters)
 * took about four times as long as drawing them, so that is where I focused
 * next. Improvements were found by subdividing the actors, so all the enemies 
 * were in one place, the sun actors in another array, the snow seperate, and 
 * the player(s?) in their own array. Also organizing each type of actor 
 * into columns.
 *     This game is, as far as I know, original. I came up with the idea one 
 * day in early April, and began creating it from nothing but my previous 
 * experience working on games.
 *     Since this is a contest entry (and my first!), I tried to keep the 
 * classes well defined and encapsulated. The result was a game that was 
 * quite plesant to work on, and easy to understand (at least from my point 
 * of view).
 *     For this game, I designed a nice structure of screens, and events get 
 * piped straight to those screens. Each screen stores buttons from the Button
 * constructor, and connects the events to them as well. And the screen runs
 * the run function that was passed in the config, allowing the programmer to 
 * simply define a general run function and some configs for buttons, and
 * the Screen takes care of creating the buttons and clicking them. The Screen
 * constructor even has functionality for a set of options, made of buttons, 
 * and for key controls for the buttons.
 *     Beside the Screen class, another major class is the Level. This class 
 * stores all the information about the level. This includes the types of the 
 * static squares, the background image of all the static squares, and the 
 * actors in a large data structure which helps with fast collision detection.
 * You only need to create the Level object for the current level plan, store 
 * so you can get it again, and call its run method. And checking for when it
 * is finished, either by winning or losing.
 *     Many of my good ideas about how to structure a game come from my
 * experience working through the game design tutorial at https://eloquentjavascript.net/16_game.html which is a great resource that has taught me a ton.
 *     Also thanks to Bob Lyon, who's great programs have taught and inspired
 * me, and to whom I have many credits.
 *     
 *     And now, on to the code of my biggest project to date!
 *                       - ElijaKen
 **/

/** Comment detailing the game's overall structure and interfaces **/
/*
 * I have made a large effort to keep this program clean and well separated
 * I have appreciated the fruits of my labors
 * 
 * Game structure (connections between classes)
 * 
 *          KA environment inputs (draw, mouseClicked, keyPressed, ... )
 *                      ↓
 *                      ↓
 *     Currently showing Screen instance ( gameScreens[gameState.screen] )
 *                      ↓                     ↓                    ↓
 *                      ↓                     ↓                    ↓
 *                      ↓   (1 screen only) ButtonArray instance   ↓
 *                      ↓                     ↓                    ↓
 *                      ↓                     ↓                    ↓
 *                      ↓        Button instances, stored on the Screen instance
 *                      ↓
 *                      ↓
 * (1 screen only) Current Level instance ( allLevels[gameState.level] )
 *                      ↓                     ↓
 *                      ↓                     ↓
 *       Actors: Sun, Snow, Player, Enemy     ↓
 *                      ↓                     ↓
 *                      ↓                     ↓
 *                 The Static library of functions
 */ //

/** Variables with global constants, levels, and screens **/
var weatherTypes = ["sun", "weak sun", "clouds", "light snow", "snow"];
var screenNames = ["home", "info", "select", "play", "end"];
var tutorialLevels = 7;
var blockSize = Math.max(width / 20, height / 20);
// Foreward declarations, to keep OhNoes happy
var myRect, myRectMode, isInMyRect, Level, Screen, Static, ButtonArray;

// Game state
var gameState = {
    screen: "home",
    level: 0, // Changing this will only affect the resume game button
};

// Time storage for animation smoothing
var lastMillis = 0;

// Array for storing the positions of snow on the home screen
var snowPositions = snowPositions || [];

// Home screen level
var homeScreenLevel;
var homeScreenLevelStored = [
    "----------------------------------------",
    "---#------------------------------------",
    "---#-#------------##---------------###--",
    "--##-----------#-------------------#----",
    "---##-------$-----------#--<--##-#-----@",
    "#################ss#####################",
    ];

// Stored level plans and an array to hold Level objects
var allLevels = [];
var allLevelsStored = [
    /* Character to block mapping:
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
        "#-$----###sss##>---#########s##",
        "###############################",
        {text: "Hop up!", x: 4.2, y: 7.95},
        {text: "Avoid the lava.", x: 10.35, y: 7.9},
        {text: "Don't die!\nJump on top\nof the enemy.", x: 16.6, y: 7.5},
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
        "#$-----------@#",
        "#-------------#",
        "#-------------#",
        "#-------------#",
        "####-------####",
        "#>%-----------#",
        "#>%-----------#",
        "#>%-----------#",
        "#>%-----------#",
        "#>%-----------#",
        "#>%-----------#",
        "#>%-----------#",
        "##-############",
        "##s############",
        {text: "Enemies can stand on each other.", x: 7.5, y: 2},
        ],
    /* Level 7 */ [
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
    /* Level 8 */ [
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
    /* Level 9 */ [
        "ssssssssss----",
        "----@---s-----",
        "--------s--->-",
        "-------sss--#-",
        "------ssssss#-",
        "$---sssssssss-",
        "##-##########-",
        "--------------",
        ],
    /* Level 10 */ [
        "#####----------#--------##############",
        "#-----------------------------------@#",
        "#------------------------------------#",
        "#-----$------------------------------#",
        "##--###########%---------------------#",
        "##--#><>-<><><>%----------sssssssss###",
        "##-############%---------#############",
        "##-------------%---------------------#",
        "#############-##---------------------#",
        "#############------------#############",
        "###############----------#############",
        "################--------##############",
        "################ss#ss#ss##############",
        {text: "Random snow can form bridges.", x: 7, y: 9.8},
        {text: "Use straight snow to finish the bridge.", x: 7, y: 10.8},
        {text: "Trap them on the other side with snow.", x: 7, y: 11.8},
        ],
    /* Level 11 */ [
        "--------------------------------------------",
        "-s------------------------------------------",
        "--------------------------------------------",
        "--------------------------------------------",
        "#-#-#-#-#-#-#-#############-----------------",
        "#-#-#-#-#-#-#-#############-----------------",
        "#-#-#-#-#-#-#-##ssssssssss#-----------------",
        "#-#-#-#-#-#-#-##s########s#-----------------",
        "#-#-#-#-#-#-#-##s###ss###s#-----------------",
        "#-#-#-#-#-#-#-##s##ssss##s#-----------------",
        "#-#-#-#-#-#-#-##s#s#ss#s#s#-----------------",
        "#-#-#-#-#-#-#-##s###ss###s#---------ssssssss",
        "#-#-#-#-#-#-#-##s#s#ss#s#s#-----------------",
        "#-#-#-#-#-#-#-##sss#ss#sss#-----------------",
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
    /* Level 12 */ [
        "#####--------------------------",
        "#---------------------#########",
        "#------------------####------@#",
        "#------------$----------------#",
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
    /* Level 13 */ [
        "-------------------------",
        "-------------------------",
        "--------------$----------",
        "----#----#########-------",
        "-----#---#@@@@@@#-#------",
        "-->------#------#--#-----",
        "###--###-#------#---#----",
        "ss#--#s#-#------#ssss####",
        "#s#--#s#--------######-@#",
        "ss#--#s#-##-------------#",
        "#s#--#s#-###------------#",
        "ss#--#s#-<###-----------#",
        "s##--#s#-##s####------###",
        "ss####sssssssssssssssssss",
        ],
    /* Level 14 */ [
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
    /* Level 15 */ [
        "#-----#####",
        "#---------#",
        "#---------#",
        "#---------#",
        "#----##-#-#",
        "#----#--s-#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#-s-s#",
        "#----#--#-#",
        "#----##---#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#----#----#",
        "#--$-#----#",
        "#--###----#",
        "#----#ss-s#",
        "###--#----#",
        "#----#----#",
        "#----#s-#s#",
        "#----#----#",
        "#----#----#",
        "#--###----#",
        "#----#--s-#",
        "#----###--#",
        "#----#-@--#",
        "######ss###",
        "###########",
        ],
    /* Level 16 */ [
        "#---------------------------------#",
        "#---------------------------------#",
        "#---------------------------------#",
        "#$--------------------------------#",
        "##-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-##",
        "##-#-#-#-#-#-#---#-#-#-#-#-#-#-#-##",
        "##-s-s-s-###-#---#-###-s-s-s-#-#-##",
        "##---------#-#####-#---------#-#-##",
        "####-#-#-#-#-#-----#-#-#-#-###-#-##",
        "#sss-s-s-#-s-s-#####-#-#-s-#-s-s-s#",
        "#--------#---------#-#-#---#------#",
        "#-##-#-#####-#-###-#-#-###-#-#-####",
        "#-#--#--#----#-#ss-s-#-#ss-s-#-sss#",
        "#-##-#-##-####-#-----#-#-----#----#",
        "#-#--#--#-#----#-#-###-#-#-#####-##",
        "#-##-s--#-######-#-sss-s-s-ssss#-s#",
        "#--#---##-#----#-#-------------#--#",
        "##-#----#-#-##-#-#####-#-#-###-#-##",
        "##-######-#-#--#-#ssss-s-s-sss-s-s#",
        "#-------#-#-#-##-#----------------#",
        "#---##-##-#-#--#-#-###-#-#-###-####",
        "#####s-s#-#-##-#-#-#ss-s-#-sss-sss#",
        "#---------#--#---#-#-----#--------#",
        "#-####-#####-####--#-#-####-##-#-##",
        "#-sss#-s#ss--#s#--#s-s-#sss-ss-s-s#",
        "#----#--#---#----#-----#----------#",
        "####-##-#-###-####-#-###-##-####-##",
        "#sss-#s-#-ss#-ss#s-#-sss-#s-s#s---#",
        "#----#--#--@#---#--#---s-#---#----#",
        "###################################",
        ],
    /* Level 17 */ [
        "###########-----------###################",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#|||||||||||#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#-----------#------------------",
        "----------#----##-##-##------------------",
        "----------#----#--#--##------------------",
        "----------#----#-#--#s#------------------",
        "----------#----#-s-#ss#------------------",
        "----------#----#-s-sss#------------------",
        "----------#----#-s-sss#------------------",
        "----------#----#-s-sss#------------------",
        "----------#----#------#------------------",
        "----------#----###-#--#------------------",
        "----------#----#---#--#------------------",
        "----------#----#--#---#------------------",
        "----------#----##-s--##------------------",
        "----------#----#------#------------------",
        "----------#----#--s---#------------------",
        "----------#----#--s-#-#------------------",
        "----------#----#-#--#-#------------------",
        "----------#----#-#--###------------------",
        "----------#----#-#----#------------------",
        "----------#----#---#-##------------------",
        "----------#----#------#------------------",
        "----------#$-----------------------------",
        "----------######s#sss#s###---------------",
        "----------#->--#@-@-@-@-@#---------------",
        "----------#->--#-@-@-@-@-#---------------",
        "----------#->--#@-@-@-@-@#---------------",
        "----------######---------#---------------",
        "-----------------------------------------",
        "-----------------------------------------",
        "---------------------------------------%<",
        ],
    /* Level 18 */ [
        "#$#@@@@@@@",
        "#-#-----##",
        "#-#----->-",
        "#-#-----##",
        "#-#------<",
        "#-#-----##",
        "#-#-----<-",
        "#-#-----##",
        "#-####--##",
        "#------->-",
        "#-------##",
        "#--------<",
        "#-------##",
        "##------<-",
        "###-----##",
        ],
    /* Level 19 */ [
        "---####----------------#----------------------------#ss#---------------------",
        "------#----------------#-----------------------------##----------------------",
        "------#----------------#----------------------------------------------------@",
        "---####----------------#--------------------------------------###############",
        "------#----#######-----#-----------------------------------------------------",
        "$-----#---##-----##----########---------#####----------------##--#-#-###-#---",
        "#-----#--##-------##----#ss#----------------#----------###---#-#-#-#-#---#---",
        "-#----#------------##----###---------#------#-----------s#---##---#--##--#---",
        ">>#---##----|||---------------##----###----###---------#-#---#-#--#--#-------",
        "---#-------|<->|--------####--#----#-#-#--#<#>#-------#------##---#--###-#---",
        "ssss#-----|<>-<>|-------------#------#---#--#--#-----#-----------------------",
        "###################################--#--#sss#sss#---------###################",
        "####################################-#-######################################",
        "-----------------------------------------------------------------------------",
        {text: "The second-to-last level. Easy so you can rest.", x: 9, y: 13.5},
        {text: "Hold up as you exit the tube.", x: 29, y: 4.5},
        ],
    /* Level 20 */ [
        "#########----------------------------------#",
        "#-------%----------------------------------#",
        "#-------%----------------------------------#",
        "#-------%----------------------------------#",
        "#-------%----------------------------------#",
        "#---$-------sss-------#sssss#--------------#",
        "#-######|#|#####--###-#######|||||||#--#--##",
        "#-#---------------#-----------------#--#--##",
        "#-######|-|s#####|#-#-#######||||||-#--#---#",
        "#-#-----------------#-#-------------#--###-#",
        "#-##-###-#--##-##-#-#-#-------------#--#---#",
        "#-#---##-#-s##-##-#-#|#-#####||||||-#||#---#",
        "#-#----#-#-<##-##-#s#------#--------#--#---#",
        "#-#---##-#-###-##-###-##---#--------#--#---#",
        "#-#----#-#sss#-##-###-##---#--------#--#---#",
        "#-######|#####|##|###-##---#--------#--#---#",
        "#-#--------------------#---#--------#-<#---#",
        "#-#-####|########|###|##---##-------#-##---#",
        "#-#-#sss-s------s-sssssss-sss|||||||#-######",
        "#-#-#-------------------------------------##",
        "#-#-#-##-########-#######-###|||||||#-##--##",
        "#-#-#-##-#------#-#####-----#---|-|-------##",
        "#-#-#------####-#---###ss-ss#-|---|-#-######",
        "#-#-####-##@--#-#---------------|-|--------#",
        "#-#-#ss#-##---#-#--######-###|--|-|-#-####-#",
        "#-#-##s#|##---#-#--##---#---#---|-|-#------#",
        "#-#-#sss-s#---#-#--##-#--#--#--||-|-------##",
        "#-#-#>--------#-#--#--#--#--##--|-|-------##",
        "#-#-####--#-----#-----##--s-s#|-|---#-----##",
        "#-#----s-ss####%#####-#---s--#-|----#-##-###",
        "#-#----s-s##s#s%s##s#-#-###--###----#-#--###",
        "#-#----s%ssssss%ssss#-#--------#|--|#---####",
        "#-#####s%s#s##s%s##s#ss-######-#|ss|########",
        "#-#############%###########----#############",
        "#--------------%-------------###############",
        "############################################",
        ],
];

// Stored screens and an object to hold Screen objects
var gameScreens = Object.create(null);
var gameScreensStored = {
    "home": {
        run: function (keys, secondsElapsed) {
            // "m" to return to level select
            if (keys.m) {
                Screen.switchTo("select");
            }
            
            // Background
            background(117, 117, 117);
            
            // Snow
            fill(255, 255, 255);
            noStroke();
            for (var i = 0; i < snowPositions.length; i++) {
                var x = snowPositions[i].x;
                var y = snowPositions[i].y - height * 0.0125;
                ellipse(x, y, width * 0.025, height * 0.025);
                snowPositions[i].y += height * 0.0025; // Move the snow down
                snowPositions[i].y %= height * 1.025; // Wrap the snow around
            }
            
            // Home screen level
            if (homeScreenLevel.state === "lose") {
                homeScreenLevel = Level.new(homeScreenLevelStored);
            } else if (homeScreenLevel.state === "win" && 
                    gameState.screen === "home") {
                Screen.switchTo("play");
            }
            
            homeScreenLevel.run(keys, secondsElapsed, "clouds", false);
            
            // Title
            var titleText = "Weatherman";
            var margin = width * 0.075;
            
            // The rect behind the title
            textSize(width * 0.12);
            noStroke();
            fill(158, 158, 158); // Slightly lighter than the background
            myRectMode(CENTER);
            myRect(width / 2, height * 0.2, textWidth(titleText) + margin, 
                height * 0.12 + margin, width * 0.0375);
            
            // Draw the title
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text(titleText, width / 2, height * 0.2);
        },
        onLoad: function() {
            var snowCount = 50;
            if (snowPositions.length < snowCount) {
                for (var i = snowPositions.length; i < snowCount; i++) {
                    snowPositions.push(
                        {x: Math.random() * width, y: i * height * 1.025 / snowCount});
                }
            }
            homeScreenLevel = Level.new(homeScreenLevelStored);
        },
        buttons: [
            {x: width * 0.0875, y: height * 0.7125, w: width * 0.25, 
                message: "Tutorial", textSize: width * 0.06, keys: "t",
                onclick: function () {
                    Screen.switchTo("info");
                }
            },
            {x: width * 0.4125, y: height * 0.7125, w: width * 0.5, h: height * 0.155, 
                message: "Play", keys: "p", textSize: width * 0.0825, 
                onclick: function () {
                    Screen.switchTo("select");
                }
            },
        ]
    },
    "info": {
        run: function (keys) {
            // "m" to return to level select
            if (keys.m) {
                Screen.switchTo("select");
            }
            
            // Background
            background(117, 117, 117);
            
            // Title
            textSize(width * 0.1);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("How to play", width / 2, height * 0.1);
            
            // Content
            textSize(width * 0.0475);
            textAlign(CENTER, TOP);
            text('Use the arrow keys to move the player\naround. ' +
                'Wasd and/or spacebar also work.\nPress "r" to restart the level, ' +
                'and press "m"\nto return to menu.\nUse the selectors at the top of ' +
                'the screen or\nnumber keys 1-7 to change the weather.\n\nYou can ' +
                'jump on top of snow. Hitting\nit from any other side will get rid ' +
                'of it.\nYou will learn more as you play.', width / 2, height * 0.175);
        },
        buttons: [
            {x: width * 0.125, y: height * 0.7625, w: width * 0.25, h: height * 0.145, 
                message: "Home", textSize: width * 0.0625, keys: "h",
                onclick: function () { Screen.switchTo("home"); }},
            {x: width * 0.45, y: height * 0.7625, w: width * 0.425, h: height * 0.145, 
                message: "Play level 1", textSize: width * 0.0625, keys: "p",
                onclick: function () {
                    gameState.level = 0;
                    Screen.switchTo("play");
                }
            },
        ]
    },
    "play": {
        run: function (keys, secondsElapsed, selected) {
            // "m" to return to level select
            if (keys.m) {
                Screen.switchTo("select");
            }
            
            /* Test for and react to winning/losing the level
               This is done before running the level to give you one more frame to see
               the result */
            if (allLevels[gameState.level].state === "win") {
                // You won! Next level!
                gameState.level++;
                // Reset the weather selectors
                selected[0] = 2;
                selected[1] = 0;
                if (!Level.loadLevel()) {
                    // You beat all the levels! Display the end screen!
                    Screen.switchTo("end");
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
            
            /* Drawing */
            
            // Background
            background(117, 117, 117);
            
            // Run the level
            allLevels[gameState.level].run(keys, secondsElapsed, 
                weatherTypes[selected[0]], selected[1] === 0);
            
            // Display the level number in the bottom right corner
            fill(0, 0, 0);
            textAlign(RIGHT, BASELINE);
            textSize(width * 0.045);
            var message = (gameState.level + 1) + " / " + allLevelsStored.length;
            text(message, width * 0.975, height * 0.975);
        },
        onLoad: function () {
            Level.loadLevel();
        },
        buttons: [
            /* Weather type buttons */
            // Sun
            {x: width * 0.05, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), keys: "1", 
                message: function(x, y, w, h, canvas) {
                    x += w / 2;
                    y += h / 2;
                    
                    canvas.fill(255, 255, 0);
                    canvas.noStroke();
                    var sunRadius = w / 6;
                    canvas.ellipse(x, y, sunRadius * 2, sunRadius * 2);
                    
                    // Sun's rays
                    canvas.stroke(255, 255, 0);
                    canvas.strokeWeight(width * 0.005);
                    for (var angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
                        var innerX = x + Math.cos(angle) * sunRadius;
                        var innerY = y + Math.sin(angle) * sunRadius;
                        var outerX = x + Math.cos(angle) * sunRadius * 2;
                        var outerY = y + Math.sin(angle) * sunRadius * 2;
                        
                        canvas.line(innerX, innerY, outerX, outerY);
                    }
                }, onclick: "select 0"},
            
            // Weak sun
            {x: width * 0.175, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), keys: "2", 
                message: function(x, y, w, h, canvas) {
                    x += w / 2;
                    y += h / 2;
                    
                    canvas.fill(255, 255, 0);
                    canvas.noStroke();
                    var sunRadius = w / 10;
                    canvas.ellipse(x, y, sunRadius * 2, sunRadius * 2);
                    
                    // Sun's rays
                    canvas.stroke(255, 255, 0);
                    canvas.strokeWeight(width * 0.004);
                    for (var angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
                        var innerX = x + Math.cos(angle) * sunRadius;
                        var innerY = y + Math.sin(angle) * sunRadius;
                        var outerX = x + Math.cos(angle) * sunRadius * 2;
                        var outerY = y + Math.sin(angle) * sunRadius * 2;
                        
                        canvas.line(innerX, innerY, outerX, outerY);
                    }
                }, onclick: "select 0"},
            
            // Cloudy
            {x: width * 0.3, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), keys: "3", selected: true,
                message: function(x, y, w, h, canvas) {
                    x += w / 2;
                    y += h / 3;
                    
                    canvas.fill(138, 138, 138);
                    canvas.noStroke();
                    
                    var cloudWidth = w / 3;
                    var cloudHeight = h / 4;
                    
                    // Clouds
                    canvas.ellipse(x, y, cloudWidth , cloudHeight); // Center
                    canvas.ellipse(x - w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Left
                    canvas.ellipse(x + w / 6, y + cloudHeight / 6, 
                        cloudWidth , cloudHeight * 2 / 3); // Right
                }, onclick: "select 0"},
            
            // Light snow
            {x: width * 0.425, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), keys: "4", 
                message: function(x, y, w, h, canvas) {
                    // Snow
                    canvas.fill(255, 255, 255);
                    canvas.noStroke();
                    for (var i = 0; i < snowPositions.length; i += 4) {
                        var snowX = map(snowPositions[i].x, 0, width, w * 0.25, w * 0.75);
                        var snowY = map(snowPositions[i].y, 0, height, h * 0.4, h * 0.9);
                        canvas.ellipse(x + snowX, y + snowY, width * 0.005, height * 0.005);
                        snowPositions[i].y += height * 0.0025; // Move the snow down
                        snowPositions[i].y %= height * 1.025; // Wrap the snow around
                    }
                    
                    // Clouds
                    canvas.fill(138, 138, 138);
                    canvas.noStroke();
                    canvas.ellipse(x + w / 2, y + h / 3, w / 3, h / 4); // Center
                    canvas.ellipse(x + w * 1 / 3, y + h * 9 / 24, w / 3 , h / 6); // Left
                    canvas.ellipse(x  +w * 2 / 3, y + h * 9 / 24, w / 3 , h / 6); // Right 
                }, onclick: "select 0"},
            
            // Dense snow
            {x: width * 0.55, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), keys: "5",
                message: function(x, y, w, h, canvas) {
                    // Snow
                    canvas.fill(255, 255, 255);
                    canvas.noStroke();
                    for (var i = 0; i < snowPositions.length; i += 1) {
                        var snowX = map(snowPositions[i].x, 0, width, w * 0.25, w * 0.75);
                        var snowY = map(snowPositions[i].y, 0, height, h * 0.4, h * 0.9);
                        canvas.ellipse(x + snowX, y + snowY, width * 0.005, height * 0.005);
                        snowPositions[i].y += height * 0.0025; // Move the snow down
                        snowPositions[i].y %= height * 1.025; // Wrap the snow around
                    }
                    
                    // Clouds
                    canvas.fill(138, 138, 138);
                    canvas.noStroke();
                    canvas.ellipse(x + w / 2, y + h / 3, w / 3, h / 4); // Center
                    canvas.ellipse(x + w * 1 / 3, y + h * 9 / 24, w / 3 , h / 6); // Left
                    canvas.ellipse(x  +w * 2 / 3, y + h * 9 / 24, w / 3 , h / 6); // Right 
                }, onclick: "select 0"},
            
            /* Snow randomness buttons */
            // Straight snow
            {x: width * 0.7, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), 
                textSize: width * 0.0325, keys: "6",
                message: "Straight\nsnow", onclick: "select 1", selected: true},
            
            // Random snow
            {x: width * 0.825, y: height * 0.025, w: width * 0.125, 
                h: height * 0.125, color: color(74, 74, 74, 100),
                hoverColor: color(125, 125, 125, 200), strokeWeight: width * 0.0025,
                selectedColor: color(201, 201, 201, 100), 
                textSize: width * 0.0325, keys: "7",
                message: "Random\nsnow", onclick: "select 1"}]
    },
    "end": {
        run: function (keys) {
            // "m" to return to level select
            if (keys.m) {
                Screen.switchTo("select");
            }
            
            // Background
            background(94, 216, 247);
            // Sun
            fill(255, 255, 0);
            noStroke();
            var sunRadius = width * 0.1875;
            arc(0, 0, sunRadius * 2, sunRadius * 2, 0, 90);
            
            // Sun's rays
            stroke(255, 255, 0);
            strokeWeight(3);
            for (var angle = 0; angle <= Math.PI / 2; angle += Math.PI / 18) {
                var innerX = Math.cos(angle) * sunRadius;
                var innerY = Math.sin(angle) * sunRadius;
                var outerX = Math.cos(angle) * sunRadius * 2;
                var outerY = Math.sin(angle) * sunRadius * 2;
                
                line(innerX, innerY, outerX, outerY);
            }
            
            // Cloud
            var x = width * 0.8725, y = height * 0.0525, size = width * 0.75;
            
            fill(138, 138, 138);
            noStroke();
            ellipse(x - size / 6, y + size / 24, size / 3 , size / 6); // Left
            ellipse(x           , y            , size / 3 , size / 4); // Center
            ellipse(x + size / 6, y + size / 24, size / 3 , size / 6); // Right
            
            // Title
            textSize(width * 0.1);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("You won!", width / 2, height * 0.2225);
            
            // Smaller message
            textSize(width * 0.1);
            textAlign(CENTER, TOP);
            var message = "Congratulations!\nYou used the weather\nto help you defeat your enemies\nand traverse a challenging world!";
            
            // Increase the line height by drawing each line separately
            message = message.split("\n");
            for (var i = 0; i < message.length; i++) {
                text(message[i], width / 2, height * 0.325 + i * height * 0.0725);
            }
        },
        buttons: [
            {x: width * 0.2, y: height * 0.75, w: width * 0.6, h: height * 0.17, 
            message: "Restart game", 
            textSize: width * 0.0825, color: color(153, 252, 96), keys: "r",
            onclick: function () {
                gameState.level = 0;
                Screen.switchTo("home");
            }},
        ]
    },
    "select": {
        run: function (keys, secondsElapsed, selected, mx, my) {
            // Background
            background(117, 117, 117);
            
            // Title
            textSize(width / 15);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            text("Choose a level", width / 2, height / 10);
        },
        buttons: [
            {x: width * 0.125, y: height * 0.8, w: width * 0.25, h: height * 0.155, 
                message: "Home", textSize: width * 0.0625, keys: "h",
                onclick: function () { Screen.switchTo("home"); }},
            {x: width * 0.5, y: height * 0.8, w: width * 0.375, h: height * 0.155, 
                textSize: width * 0.055, message: "Resume\nplay (c)", keys: "c",
                onclick: function () {
                    var prevLevel = allLevels[gameState.level]; // Save the last level
                    Screen.switchTo("play");
                    if (prevLevel && prevLevel.state === "play") {
                        allLevels[gameState.level] = prevLevel; // Go back to the last level
                    }
                }
            },
            {
                type: "ButtonArray",
                x: width * 0.1375, 
                y: height * 0.175,
                w: width * 0.725,
                buttonW: width * 0.125,
                buttonH: height * 0.125,
                buttonGap: width * 0.025,
                items: Array(allLevelsStored.length).fill(0).map(function (_, index) {
                    return {
                        message: String(index + 1), // Start at one
                        onclick: function() {
                            gameState.level = index;
                            Screen.switchTo("play");
                        },
                        color: index < tutorialLevels? 
                            color(194, 194, 194) : color(153, 153, 153),
                        selectedColor: index < tutorialLevels? 
                            color(194, 194, 194) : color(153, 153, 153),
                        selectedStroke: color(255, 0, 0)
                    };
                }),
            },
        ]
    },
};

// Bitmaps and button images
// "cachedImages ||" is to prevent regenerating the cachedImages on restart
var cachedImages = cachedImages || Object.create(null);
// My younger sister helped me design the player and portal graphics
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
            "1": color(28, 28, 28),
        },
        bitmap: [
            "111111111",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "010010010",
            "111111111",
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
        Static.drawCharacter(this.type, this.x + xOffset, this.y + yOffset);
    };
    
    return Sun;
})();

var Snow = (function() {
    function Snow(x, y) {
        this.x = x;
        this.y = y;
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
            this.y = touchY.y - 1;
            this.yVelocity = 0;
        } else {
            this.y = newY;
        }
    };
    
    Snow.prototype.collide = function(actor, level) {
        var collideDirection = "side";
        if (this.previousY + 1 <= actor.previousY) {
            collideDirection = "top";
        } else if (this.previousY >= actor.previousY + 1) {
            collideDirection = "bottom";
        }
        
        if (actor.type === "enemy" && collideDirection === "top" || 
            actor.type === "snow" && collideDirection === "top") {
            this.y = actor.y - 1;
        }
    };
    
    Snow.prototype.check = function(level) {
        if (level.touches(this.x, this.y, "lava")) {
            this.remove = true;
        }
    };
    
    Snow.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x + xOffset, this.y + yOffset);
    };
    
    return Snow;
})();

var Player = (function() {
    function Player(x, y) {
        this.x = x;
        this.y = y;
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
        var oldX = this.x, oldY = this.y;
        
        // X-direction movement {
        var xMotion = 0;
        if (keys[LEFT] || keys.a) { xMotion -= this.xSpeed; }
        if (keys[RIGHT] || keys.d) { xMotion += this.xSpeed; }
        // Account for the fact that not all frames are the same length by 
        // moving relative to that amount
        xMotion *= secondsElapsed;
        
        // Down key alignment, but don't align faster than the player normally moves
        if (keys[DOWN] || keys.s) {
            var roundedX = Math.round(this.x);
            var maxMoveDistance = this.xSpeed * secondsElapsed;
            var constrainedX = constrain(roundedX, 
                this.x - maxMoveDistance, this.x + maxMoveDistance);
            xMotion = constrainedX - this.x;
        }
        
        // Collision testing x direction
        var newX = this.x + xMotion;
        var touchX = level.touches(newX, this.y, "dirt grate");
        if (touchX) {
            if (oldX > touchX.x) {
                // To the right of the object, so go to the right side of the object
                this.x = touchX.x + 1;
            } else {
                // To the left of the object, so go to the left side of the object
                this.x = touchX.x - 1;
            }
        } else {
            this.x = newX; // No collision, so set this.x to the newX
        }
        // End of collapsing section
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
            if (oldY < touchY.y) {
                // Above the object, so go to the top of the object
                this.y = touchY.y - 1;
                this.yVelocity = 0;
            } else {
                // Below the object, to go to the bottom of the object
                this.y = touchY.y + 1;
                this.yVelocity = 0;
            }
        } else {
            this.y = newY; // No collision, so set this.y to the newY
        }
        
        // Handle jumping
        if ((keys[UP] || keys.w || keys[" "]) && onGround) {
            this.yVelocity = this.jumpSpeed; // Start jumping!
        }
        // End of collapsing section
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
        if (this.previousY + 1 <= actor.previousY) {
            collideDirection = "top";
        } else if (this.previousY >= actor.previousY + 1) {
            collideDirection = "bottom";
        }
        
        if (actor.type === "enemy") {
            if (collideDirection === "top") {
                this.yVelocity = 0;
                if (keys[UP] || keys.w || keys[" "]) {
                    this.yVelocity = this.jumpSpeed;
                }
                this.y = actor.y - 1;
                
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
                this.y = actor.y - 1;
            } else {
                actor.remove = true;
            }
        }
    };
    
    Player.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x + xOffset, this.y + yOffset);
    };
    
    return Player;
})();

var Enemy = (function() {
    function Enemy(x, y, type) {
        this.x = x;
        this.y = y;
        this.previousY = y;
        this.yVelocity = 0;
        this.gravity = 66.666667; // Same as player
        this.xSpeed = 2;
        this.type = "enemy";
        this.remove = false;
        this.direction = type === "<"? LEFT : RIGHT;
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
        this.x += xMotion; // Test out the new position.
                        // Revert to oldX if the new position is not possible.
        
        var touchWallX = level.touches(this.x, this.y, "dirt grate portal");
        var touchedActorX = level.touchesActors(this, ["snow", "enemy"]);
        // touchX means a collision in the X direction
        var touchX = touchWallX || touchedActorX;
        var turned = false;
        if (touchX) {
            if (oldX > touchX.x) {
                // To the right of the object, so go to the right side of the object
                this.x = touchX.x + 1;
            } else {
                // To the left of the object, so go to the left side of the object
                this.x = touchX.x - 1;
            }
            this.turn();
            turned = true; // To prevent turning twice in one frame
        }
        
        /* If there is nothing under the enemy after moving, then cancel the motion
         so the enemy will not fall off platforms */
        var touchXY = level.touches(this.x, this.y + 0.001, "dirt grate");
        this.y += 0.001; // This is to test actor collision downwards
        var touchedActor = level.touchesActors(this, ["snow", "enemy"]);
        this.y = oldY; // Reset the Y
        
        if (!touchXY && !touchedActor) { // Did the enemy walk off a cliff?
            if (!turned) { // Turn around, but don't turn twice.
                this.turn();
            }
            // Yup, the enemy walked off a cliff. Revert to the old position.
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
            if (oldY < touchY.y) {
                // Above the object, so go to the top of the object
                this.y = touchY.y - 1;
                this.yVelocity = 0;
            } else {
                // Below the object, to go to the bottom of the object
                this.y = touchY.y + 1;
                this.yVelocity = 0;
            }
        } else {
            // The enemy didn't hit anything when it fell, 
            // so there's nothing more to do here.
        }
        // }
    };
    
    Enemy.prototype.turn = function() {
        this.direction = this.direction === LEFT? RIGHT : LEFT;
    };
    
    // Empty method. Other actors have a working version, and removing this causes errors.
    Enemy.prototype.collide = function(actor) {};
    
    Enemy.prototype.draw = function(xOffset, yOffset) {
        Static.drawCharacter(this.type, this.x + xOffset, this.y + yOffset);
    };
    
    return Enemy;
})();

/** Letters to blocks mapping **/
var lettersToBlocks = {
    "#": "dirt", // Strings indicate static elements
    "-": "empty",
    "s": "lava",
    "@": "portal",
    "|": "grate",
    "^": Enemy, // For actors, I pass the constructor
    "<": Enemy,
    ">": Enemy,
    "%": Snow,
    "$": Player,
};

/** Main constructors **/
// Some code inspiration from https://eloquentjavascript.net/16_game.html
// None copied however

// Static is a collection of functions for bitmaps, not a constructor
var Static = (function() {
    var Static = {}; // Initialize Static as an object so functions can be added
    
    /*      When I switched to rendering bitmaps for the characters, 
        my program became very laggy. To fix this, I tried to optimize my level code,
        particularly the drawing code.
            I noticed that drawing images is faster than drawing bitmaps, 
        so I loaded all the bitmaps into images, and used those instead. 
            This helped a lot, but I wanted my program to be even faster, 
        especially for those with less powerful computers,
        so I created this function to put all the static parts of the level one big image.
            This resulted in more speed boosts. An AI I asked pointed out that drawing text
        is slow, so I also included all the text that renders behind the actors
        in the background image.
        */
    Static.createBackgroundImage = function(staticElements, text, w, h) {
        // Create an offscreen canvas to draw the static background on
        // Using an offscreen canvas removes size constraints
        var backgroundCanvas = createGraphics(w * blockSize, h * blockSize, JAVA2D);
        
        // Draw the level background color
        backgroundCanvas.background(153, 153, 153);
        
        // Draw the static elements onto the canvas
        for (var y = 0; y < staticElements.length; y++) {
            for (var x = 0; x < staticElements[y].length; x++) {
                // If this is the top row, report that the block above this one is dirt
                // Otherwise, report what the block above this one is
                var above = y < 1? "dirt" : staticElements[y - 1][x];
                // .drawStaticElement uses the above value to add grass
                Static.drawStaticElement(
                    staticElements[y][x], x, y, above, backgroundCanvas);
            }
        }
        
        // Draw the text that goes behind the actors
        backgroundCanvas.textAlign(CENTER, CENTER);
        backgroundCanvas.fill(0, 0, 0);
        for (var i = 0; i < text.length; i++) {
            var txt = text[i];
            backgroundCanvas.textSize((txt.size || 0.75) * blockSize);
            backgroundCanvas.text(txt.text, txt.x * blockSize, txt.y * blockSize);
        }
        
        // Use .get() to create an image that is faster to render
        // This is faster because it is just an image instead of a canvas
        return backgroundCanvas.get();
    };
    
    Static.drawStaticElement = function(type, x, y, above, canvas) {
        if (type === "dirt" && (above === "empty" || above === "portal")) {
            Static.drawCharacter("grass", x, y, canvas);
        } else if (type in cachedImages) {
            Static.drawCharacter(type, x, y, canvas);
        } else if (type !== "empty") { // Unknown type
            fill(255, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(2);
            canvas.rect(x, y, blockSize, blockSize);
        }
    };
    
    Static.drawCharacter = function(bitmapName, x, y, canvas) {
        // Convert block coordinates to pixels
        x = x * blockSize;
        y = y * blockSize;
        // Optionally include the canvas to draw the character on
        if (canvas) {
            canvas.image(cachedImages[bitmapName], x, y);
        } else {
            image(cachedImages[bitmapName], x, y);
        }
    };
    
    Static.drawBitmap = function(bitmap, colorMap, xPos, yPos, w, h) {
        var blockHeight = h / bitmap.length;
        
        // The looks of the bitmaps are slightly different for
        // iterating foreward vs iterating backwards, and I like backwards
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
        /* Sometimes, after I edit the program, cachedImages gets set equal to true,
           and these three lines of code help correct that problem */
        if (typeof cachedImages !== "object") {
            cachedImages = Object.create(null);
        }
        
        // Load the bitmaps that need loading
        for (var name in bitmapsStored) {
            if (!(name in cachedImages)) {
                var bitmap = bitmapsStored[name].bitmap;
                var colorMap = bitmapsStored[name].colorMap;
                
                // Transparent background
                background(1, 0, 0, 0);
                
                // Draw the character
                Static.drawBitmap(bitmap, colorMap, 0, 0, blockSize, blockSize);
                
                // Save it
                cachedImages[name] = get(0, 0, blockSize, blockSize);
            }
        }
    };
    
    return Static;
})();

var Level = (function() {
    var iterationOrder = ["enemy", "sun", "snow", "player"];
    
    // Tests if two actors are colliding
    function actorCollide(a1x, a1y, a2) {
        return a1x + 1 > a2.x && a1x < a2.x + 1 && a1y + 1 > a2.y && a1y < a2.y + 1;
    }
    
    // I sort the enemies by y-position to keep them in order from bottom to top, 
    // which helps with collision detection
    // Function for sorting enemies
    function compareEnemies(enemy1, enemy2) {
        return enemy2.y - enemy1.y;
    }
    
    // Constructor
    function Level(plan) {
        // Read and proccess the level plan
        var levelParts = Level.readPlan(plan);
        
        // Set this properties to what was returned
        this.staticElements = levelParts.staticElements;
        this.actors = levelParts.actors;
        this.backText = levelParts.backText; // Back text goes behind the actors
        this.frontText = levelParts.frontText; // Front text displays in front of the actors
        this.levelWidth = levelParts.planWidth;
        this.levelHeight = levelParts.planHeight;
        
        // Get the static elements as an image
        this.staticElementsImage = Static.createBackgroundImage(
            this.staticElements, this.backText, this.levelWidth, this.levelHeight);
        
        // The current state property and a constant
        this.state = "play";
        this.scrollMargin = 4; // Blocks
        
        // For scrolling the board
        // Start by centering the board
        this.offsetX = width / blockSize / 2 - this.levelWidth / 2;
        this.offsetY = height / blockSize / 2 - this.levelHeight / 2;
    }
    
    // Main methods
    Level.prototype.run = function(keys, secondsElapsed, weather, straightSnow) {
        this.createWeather(weather, straightSnow);
        this.update(keys, secondsElapsed);
        this.draw();
    };
    
    Level.prototype.createWeather = function(weather, straightSnow) {
        // Snow
        if (weather === "light snow" || weather === "snow") {
            // How many slots per block snow can fall in
            var subDivide = straightSnow? 1 : 5;
            
            // How many frames between snowfalls
            var speed = weather === "snow"? 1 : 4;
            
            /* Prior to this contest, I figured out how to round to the 
               nearest fraction using a function that only rounds to the
               nearest integer.
               In the case that subDivide is five, I want to round (actually floor) to
               the nearest fifth. So, first I multiply by subDivide to convert the
               desired fifths into integers, then apply Math.floor to get a whole 
               integer, and then divide by subDivide to convert the integers back
               into fifths.
            */
            if (frameCount % speed === 0) {
                var randSpot = Math.random() * this.levelWidth;
                // Round to the nearest subDivide slot
                var newSnowX = Math.floor(randSpot * subDivide) / subDivide;
                
                // Check for collisions to avoid creating snow
                // on top of other objects
                // Snow can be created on top of empty or grate squares
                if (!this.touches(newSnowX, 0, "not empty grate")) {
                    var collides = false;
                    // Check for actor collisions
                    outerLoop: // Label the outer loop to exit it easily
                    for (var it = 0; it < iterationOrder.length; it++) {
                        var iter = iterationOrder[it];
                        for (var a = 0; a < 
                            this.actors[iter].all.length; a++) {
                            if (actorCollide(newSnowX, 0, 
                                this.actors[iter].all[a])) {
                                collides = true;
                                // Break out of the loop labeled outerLoop
                                break outerLoop;
                            }
                        }
                    }
                    
                    // Create the snow if there is no collision
                    if (!collides) {
                        var newSnow = Snow.new(newSnowX, 0, "s");
                        // Add the snow actor
                        this.actors.snow.all.push(newSnow);
                        
                        // Handle snow columns
                        var floorX = Math.floor(newSnowX);
                        var ceilX = Math.ceil(newSnowX);
                        
                        // Add a new snow column if needed
                        if (!this.actors.snow.columns[floorX]) {
                            this.actors.snow.columns[floorX] = [];
                        }
                        // And add the snow actor to the appropirate column
                        this.actors.snow.columns[floorX].push(newSnow);
                        
                        // Same thing, but for the other column
                        // Also avoid doing it twice
                        if (floorX !== ceilX) {
                            // Add a new snow column if needed
                            if (!this.actors.snow.columns[floorX]) {
                                this.actors.snow.columns[floorX] = [];
                            }
                            // And add the snow actor to the appropirate column
                            this.actors.snow.columns[floorX].push(newSnow);
                        }
                    }
                }
            }
        }
        // Sun
        if (weather === "sun" || weather === "weak sun") {
            var speed = weather === weatherTypes[0]? 1 : 5;
            if (frameCount % speed === 0) {
                var randSpot = Math.floor(Math.random() * this.levelWidth);
                var spotType = this.getType(randSpot, 0);
                if (spotType === "empty" || spotType === "grate") {
                    var newSun = Sun.new(randSpot, 0);
                    // Add the sun actor to all sun actors
                    this.actors.sun.all.push(newSun);
                    // Add a new sun column if needed
                    if (!this.actors.sun.columns[randSpot]) {
                        this.actors.sun.columns[randSpot] = [];
                    }
                    // And add the sun actor to the appropirate column
                    this.actors.sun.columns[randSpot].push(newSun);
                }
            }
        }
        
    };
    
    Level.prototype.update = function(keys, secondsElapsed) {
        // Sort the enemies bottom to top
        this.actors.enemy.all.sort(compareEnemies);
        
        // Update the active elements
        for (var it = 0; it < iterationOrder.length; it++) {
            var iter = iterationOrder[it];
            for (var i = 0; i < this.actors[iter].all.length; i++) {
                this.actors[iter].all[i].update(secondsElapsed, keys, this);
            }
        }
        
        // Sort the enemies and player(s?) into their columns
        this.sortActors();
        
        this.checkCollisions(keys);
        
        // Remove all flagged actors, and call .check on the rest
        for (var it = 0; it < iterationOrder.length; it++) {
            var iter = iterationOrder[it];
            for (var i = this.actors[iter].all.length; i-- > 0;) {
                var actor = this.actors[iter].all[i];
                if (!actor.remove && actor.check) {
                    actor.check(this);
                }
                
                // The .check method might set the remove flag to true
                if (actor.remove) {
                    this.actors[iter].all.splice(i, 1);
                }
            }
        }
    };
    
    Level.prototype.draw = function() {
        // Center the player, with a margin around the player to eliminate jerkyness
        this.scrollPlayerIntoView();
        
        // Draw the static elements with offset
        image(this.staticElementsImage, this.offsetX * blockSize, this.offsetY * blockSize);
        
        // Draw the active elements with offset
        for (var it = 0; it < iterationOrder.length; it++) {
            var iter = iterationOrder[it];
            for (var i = 0; i < this.actors[iter].all.length; i++) {
                this.actors[iter].all[i].draw(this.offsetX, this.offsetY);
            }
        }
        
        // Draw text that goes on top of actors
        if (this.frontText) {
            for (var i = 0; i < this.frontText.length; i++) {
                var txt = this.frontText[i];
                fill(0, 0, 0);
                textSize(txt.size || 15);
                var xPos = (txt.x + this.offsetX) * blockSize;
                var yPos = (txt.y + this.offsetY) * blockSize;
                text(txt.text, xPos, yPos);
            }
        }
    };
    
    Level.prototype.checkCollisions = function(keys) {
        // Check for collisions among actors
        // Start by iterating over all the actors
        for (var it = 0; it < iterationOrder.length; it++) {
            var iter = iterationOrder[it];
            for (var i = 0; i < this.actors[iter].all.length; i++) {
                var actor1 = this.actors[iter].all[i];
                // Don't check removed actors
                if (actor1.remove) { continue; }
                
                // Now that we have an actor, use code similar to the code in
                // touchesActors to check only the columns the actor is in
                
                // Compute the columns the actor is in
                var floorX = Math.floor(actor1.x);
                var ceilX = Math.ceil(actor1.x);
                
                // Check the only two columns collisions could possibly be in
                for (var c = floorX; c <= ceilX; c++) {
                    for (var it2 = it; it2 < 
                    iterationOrder.length; it2++) {
                        var iter2 = iterationOrder[it2];
                        var column = this.actors[iter2].columns[c];
                        if (!column) { continue; }
                        // Check all the actors in this column for collisions
                        for (var a = 0; a < column.length; a++) {
                            var actor2 = column[a];
                            if (actor1 !== actor2 && !actor2.remove &&
                                actorCollide(actor1.x, actor1.y, actor2)) {
                                // Collide the actors
                                actor1.collide(actor2, this, keys);
                                actor2.collide(actor1, this, keys);
                            }
                        }
                    }
                }
            }
        }
    };
    
    // The checkCollisions function contains a lot of for loops, each of which
    // gets infinite loop protected by Khan Academy. So I am going to replace      // it with the same function, but converted from a string to a function.
    // As I learned from Bob Lyon, Object.constructor is Function.
    Level.prototype.checkCollisions = Object.constructor(
    "iterationOrder", "actorCollide",
    "return function(keys) {" +
    "    for (var it = 0; it < iterationOrder.length; it++) {" +
    "        var iter = iterationOrder[it];" +
    "        for (var i = 0; i < this.actors[iter].all.length; i++) {" +
    "            var actor1 = this.actors[iter].all[i];" +
    "            if (actor1.remove) { continue; }" +
    "            var floorX = Math.floor(actor1.x);" +
    "            var ceilX = Math.ceil(actor1.x);" +
    "            for (var c = floorX; c <= ceilX; c++) {" +
    "                for (var it2 = it; it2 < " +
    "                iterationOrder.length; it2++) {" +
    "                    var iter2 = iterationOrder[it2];" +
    "                    var column = this.actors[iter2].columns[c];" +
    "                    if (!column) { continue; }" +
    "                    for (var a = 0; a < column.length; a++) {" +
    "                        var actor2 = column[a];" +
    "                        if (actor1 !== actor2 && !actor2.remove &&" +
    "                            actorCollide(actor1.x, actor1.y, actor2)) {" +
    "                            actor1.collide(actor2, this, keys);" +
    "                            actor2.collide(actor1, this, keys);" +
    "                        }" +
    "                    }" +
    "                }" +
    "            }" +
    "        }" +
    "    }" +
    "};")(iterationOrder, actorCollide);
    
    Level.prototype.sortActors = function() {
        // Sort the enemies and player(s?) into their columns
        for (var a = 0; a < 2; a++) {
            // Get the currently handling actors
            var actors = this.actors[a === 0? "enemy" : "player"];
            actors.columns.length = 0; // Clear the columns
            for (var i = 0; i < actors.all.length; i++) {
                // Compute which columns they each are in
                var floorX = Math.floor(actors.all[i].x);
                var ceilX = Math.ceil(actors.all[i].x);
                
                // Add a new column if needed
                if (!actors.columns[floorX]) {
                    actors.columns[floorX] = [];
                }
                // Add the actor to the appropirate column
                actors.columns[floorX].push(actors.all[i]);
                
                // Same thing, but for the other column
                // Also avoid doing it twice
                if (floorX !== ceilX) {
                    // Add a new column if needed
                    if (!actors.columns[ceilX]) {
                        actors.columns[ceilX] = [];
                    }
                    // And add the actor to the appropirate column
                    actors.columns[ceilX].push(actors.all[i]);
                }
            }
        }
    };
    
    Level.prototype.scrollPlayerIntoView = function() {
        // Center the player, with a margin around the player to eliminate jerkyness
        for (var i = 0; i < this.actors.player.all.length; i++) {
            var player = this.actors.player.all[i];
            this.offsetX = constrain(
                this.offsetX, 
                -player.x - this.scrollMargin + width / blockSize / 2, 
                -player.x + this.scrollMargin + width / blockSize / 2);
            this.offsetY = constrain(
                this.offsetY, 
                -player.y - this.scrollMargin + height / blockSize / 2, 
                -player.y + this.scrollMargin + height / blockSize / 2);
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
        // Convert types into an array to prevent accidental overlaps
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
        // Compute the columns the actor is in
        var floorX = Math.floor(actor1.x);
        var ceilX = Math.ceil(actor1.x);
        
        // Checks if actor1 touches of the actor types specified in "types"
        for (var t = 0; t < types.length; t++) {
            // The actors are sorted into their types, 
            // so we only need to check those
            // Check the only two columns collisions could possibly be in
            for (var c = floorX; c <= ceilX; c++) {
                var column = this.actors[types[t]].columns[c];
                if (!column) { continue; }
                // Check all the actors in this column for collisions
                for (var a = 0; a < column.length; a++) {
                    var actor2 = column[a];
                    if (actor1 !== actor2 && !actor2.remove &&
                        actorCollide(actor1.x, actor1.y, actor2)) {
                        return actor2; // We found a valid collision
                    }
                }
            }
        }
        
        return false;
    };
    
    // Reads a plan and return its interpreted contents
    Level.readPlan = function(plan) {
        // Things to return
        var planWidth = 0;
        var planHeight;
        var backText = [];
        var frontText = [];
        var staticElements = [];
        var actors = {enemy: 0, sun: 0, snow: 0, player: 0};
        
        // Fill in the actual actor objects
        for (var actorName in actors) {
            actors[actorName] = {all: [], columns: []};
        }
        
        for (var y = 0; y < plan.length; y++) {
            // Handle text objects
            if (typeof plan[y] !== "string") {
                if (text.front) {
                    frontText.push(plan[y]);
                } else {
                    backText.push(plan[y]);
                }
                continue; // Don't try to read the object as a row string
            }
            
            // Proccess the string
            var staticRow = [];
            for (var x = 0; x < plan[y].length; x++) {
                planWidth = Math.max(planWidth, plan[y].length);
                
                var type = lettersToBlocks[plan[y][x]];
                // A string means a static block
                if (typeof type === "string" || type === undefined) {
                    staticRow[x] = type;
                } else if (typeof type === "function") { // Actor block, has a constructor
                    var newActor = type.new(x, y, plan[y][x]);
                    
                    // Add the actor to the .all array
                    actors[newActor.type].all.unshift(newActor);
                    
                    // Add the actor to the .column array
                    // Add a new column if needed
                    if (!actors[newActor.type].columns[x]) {
                        actors[newActor.type].columns[x] = [];
                    }
                    // Add the actor to the appropirate column
                    actors[newActor.type].columns[x].push(newActor);
                    
                    // Add an empty to static
                    staticRow[x] = "empty";
                }
            }
            // Add the row
            staticElements[y] = staticRow;
        }
        
        planHeight = plan.length - backText.length - frontText.length;
        
        // Return what we need to
        return {
            planWidth: planWidth,
            planHeight: planHeight,
            backText: backText,
            frontText: frontText,
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
        allLevels[gameState.level] = Level.new(
            allLevelsStored[gameState.level]);
        
        // Since there was another level, return true;
        return true;
    };
    
    return Level;
})();

var Button = (function() {
    var buttonID = 0;
    
    function darkenColor(colorToDarken, amount) {
        var r = red(colorToDarken) - amount;
        var g = green(colorToDarken) - amount;
        var b = blue(colorToDarken) - amount;
        var a = alpha(colorToDarken);
        return color(r, g, b, a);
    }
    
    function Button(config) {
        // Sizing
        this.x = config.x;
        this.y = config.y;
        this.w = config.w;
        // Default height is approximatly the width / golden ratio
        this.h = config.h || this.w / 1.618;
        this.r = config.r || Math.min(this.w / 9, this.h / 5.5624);
        
        // ID, combine several factors for a unique ID
        this.id = "" + buttonID + " " + this.x + this.y + this.w;
        buttonID++;
        
        // Main properties
        this.onclick = config.onclick || function () {};
        this.message = config.message || "";
        this.keys = config.keys;
        
        // Appearance
            // Text
        this.textColor = config.textColor || color(0, 0, 0);
        this.textSize = config.textSize || Math.min(this.w * 0.37, this.h * 0.65);
        this.stroke = config.stroke || color(0, 0, 0);
            // Stroke weight
        this.strokeWeight = config.strokeWeight || width * 0.005;
            // Background colors
        this.color = config.color || color(94, 215, 255);
        this.selectedColor = config.selectedColor || darkenColor(this.color, 60);
        this.selectedStroke = config.selectedStroke || this.stroke;
        this.hoverColor = config.hoverColor || darkenColor(this.color, 40);
        
        // Get the message as an image
        this.messageImage = cachedImages[this.id] || this.getImage();
    }
    
    Button.prototype.mouseClicked = function(mx, my) {
        if (isInMyRect(mx, my, this.x, this.y, this.w, this.h, this.r)) {
            this.onclick();
        }
    };
    
    Button.prototype.keyPressed = function(keys) {
        if (this.keys) {
            for (var k = 0; k < this.keys.length; k++) {
                if (keys[this.keys[k]]) {
                    this.onclick();
                }
            }
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
        stroke(selected? this.selectedStroke : this.stroke);
        strokeWeight(this.strokeWeight);
        myRect(this.x, this.y, this.w, this.h, this.r);
        
        image(this.messageImage, this.x, this.y);
    };
    
    Button.prototype.getImage = function() {
        var graphics = createGraphics(this.w, this.h, JAVA2D);
        graphics.background(1, 0, 0, 0);
        
        // Draw the message, which might be a function
        if (typeof this.message === "function") {
            this.message(0, 0, this.w, this.h, graphics);
        } else {
            graphics.fill(this.textColor);
            graphics.textSize(this.textSize);
            graphics.textAlign(CENTER, CENTER);
            graphics.text(this.message, this.w / 2, this.h / 2);
        }
        
        return graphics.get(0, 0, this.w, this.h);
    };
    
    return Button;
})();

var ButtonArray = (function() {
    function ButtonArray(config) {
        // Config reading
        this.x = config.x;
        this.y = config.y;
        this.w = config.w;
        this.buttonW = config.buttonW;
        this.buttonH = config.buttonH;
        this.buttonGap = config.buttonGap; // The gap between the buttons
        this.buttonProperties = config.buttonProperties;
        this.items = config.items;
        
        // Calculate how many buttons will fit across the screen
        this.buttonsAcross = Math.floor(
            (this.w + this.buttonGap) / (this.buttonW + this.buttonGap));
        
        // Create the buttons using the method
        this.createButtons();
        
        // Constants
        this.secondsBetweenKeyFires = 0.3;
        this.keysToTrack = [UP, LEFT, DOWN, RIGHT, ENTER, "w", "a", "s", "d"];
        
        // Variables to track the state
        this.secondsSinceKeyFire = {};
        this.selected = 0;
    }
    
    ButtonArray.prototype.run = function(keys, secondsElapsed) {
        for (var i = 0; i < this.keysToTrack.length; i++) {
            var currentKey = this.keysToTrack[i];
            // Put a zero in place if one is needed
            if (typeof this.secondsSinceKeyFire[currentKey] !== "number") {
                this.secondsSinceKeyFire[currentKey] = 0;
            }
            
            if (keys[currentKey]) {
                this.secondsSinceKeyFire[currentKey] += secondsElapsed;
                // Check if the key is "firing"; 
                // Has it been long enough since the last fire?
                if (this.secondsSinceKeyFire[currentKey] >= this.secondsBetweenKeyFires) {
                    // Save any extra time, only subtract the triggering time
                    this.secondsSinceKeyFire[currentKey] -= this.secondsBetweenKeyFires;
                    this.fireKey(currentKey);
                }
            } else {
                // Reset the timer for this unpressed key to the needed firing time
                // so the key will fire immediately when it is pressed
                this.secondsSinceKeyFire[currentKey] = this.secondsBetweenKeyFires;
            }
        }
    };
    
    ButtonArray.prototype.fireKey = function(key) {
        // Change which button is selected
        if (key === UP || key === "w") {
            // Go up a row
            this.selected -= this.buttonsAcross;
        }
        if (key === DOWN || key === "s") {
            // Go down a row
            this.selected += this.buttonsAcross;
            
        }
        if (key === LEFT || key === "a") {
            // Go to the left one
            this.selected -= 1;
        }
        if (key === RIGHT || key === "d") {
            // Go to the right one
            this.selected += 1;
        }
        // Constrain the value to a valid index
        this.selected = constrain(this.selected, 0, this.items.length - 1);
        // Check the enter or space key
        if (key === ENTER) {
            this.buttons[this.selected].onclick();
        }
    };
    
    ButtonArray.prototype.createButtons = function() {
        this.buttons = [];
        
        for (var i = 0; i < this.items.length; i++) {
            // Compute the position of the button
            var x = (i % this.buttonsAcross);
            var y = Math.floor(i / this.buttonsAcross);
            
            // Convert the position into pixels and add the offset
            x = this.x + x * (this.buttonW + this.buttonGap);
            y = this.y + y * (this.buttonH + this.buttonGap);
            
            var buttonConfig = {x: x, y: y, w: this.buttonW, h: this.buttonH};
            
            Object.assign(buttonConfig, this.items[i]);
            
            this.buttons.push(Button.new(buttonConfig));
        }
    };
    
    return ButtonArray;
})();

var Screen = (function() {
    function Screen(config) {
        this.runMain = config.run || function () {};
        this.onLoad = config.onLoad || function () {};
        this.keys = {};
        
        if (config.buttons) {
            var buttons = Screen.createButtons(config.buttons);
            this.selectedButtons = buttons.selectedButtons;
            this.buttons = buttons.buttons;
            this.buttonArrays = buttons.buttonArrays;
            this.buttonSets = buttons.buttonSets;
            // Identify all the buttons with keys
            this.keyedButtons = this.buttons.concat(this.buttonSets.flat())
                .filter(function(button) { return !!button.keys; });
        } else {
            this.selectedButtons = [];
            this.buttons = [];
            this.buttonArrays = [];
            this.buttonSets = [];
            this.keyedButtons = [];
        }
    }
    
    Screen.prototype.run = function(secondsElapsed, mx, my) {
        // Update the buttonArrays
        for (var a = 0; a < this.buttonArrays.length; a++) {
            this.buttonArrays[a].run(this.keys, secondsElapsed);
        }
        
        // Check the buttons for key presses
        this.checkButtons();
        
        // Passing this.selectedButtons here means it might be modified
        // This is intentional
        this.runMain(this.keys, secondsElapsed, this.selectedButtons, mx, my);
        
        this.drawButtons(secondsElapsed, mx, my);
    };
    
    Screen.prototype.drawButtons = function(secondsElapsed, mx, my) {
        // Compile a list of buttons selected in ButtonArrays
        var selectedArrayButtons = [];
        for (var a = 0; a < this.buttonArrays.length; a++) {
            var selectedIndex = this.buttonArrays[a].selected;
            selectedArrayButtons.push(this.buttonArrays[a].buttons[selectedIndex]);
        }
        
        // Draw normal buttons, if any have been selected by ButtonArrays then check that
        // Otherwise, it will be faster to ignore that list
        if (selectedArrayButtons) {
            for (var i = 0; i < this.buttons.length; i++) {
                var button = this.buttons[i];
                button.draw(mx, my, selectedArrayButtons.includes(button));
            }
        } else {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw(mx, my, false);
            }
        }
        
        // Draw buttons that are part of select groups
        for (var s = 0; s < this.buttonSets.length; s++) {
            for (var b = 0; b < this.buttonSets[s].length; b++) {
                this.buttonSets[s][b].draw(mx, my, this.selectedButtons[s] === b);
            }
        }
    };
    
    Screen.prototype.checkButtons = function() {
        for (var i = 0; i < this.keyedButtons.length; i++) {
            this.keyedButtons[i].keyPressed(this.keys);
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
    
    // Along with setting this.keys, this also checks the button keys
    Screen.prototype.keyPressed = function(keyCode, key) {
        this.keys[keyCode] = true;
        this.keys[key] = true;
    };
    
    Screen.prototype.keyReleased = function(keyCode, key) {
        this.keys[keyCode] = false;
        this.keys[key] = false;
    };
    
    // Read and interpret an array of button configs
    // This does not alter the program state
    Screen.createButtons = function(buttonConfigs) {
        // To return
        var selectedButtons = [];
        var buttons = [];
        var buttonArrays = [];
        var buttonSets = [];
        
        // A function that will be bound to
        // create special button onclick functions
        function selectButton(setNumber, buttonIndex) {
            selectedButtons[setNumber] = buttonIndex;
        }
        
        // Use the configs to create the buttons
        for (var i = 0; i < buttonConfigs.length; i++) {
            var buttonConfig = buttonConfigs[i];
            
            if (buttonConfig.type === "ButtonArray") {
                // A ButtonArray!
                var newButtonArray = ButtonArray.new(buttonConfig);
                buttonArrays.push(newButtonArray);
                buttons = buttons.concat(newButtonArray.buttons);
            } else if (typeof buttonConfig.onclick === "string" &&
                    buttonConfig.onclick.slice(0, 6) === "select") {
                // This button goes in a set
                
                // Get the set number of this button
                var setNumber = Number(buttonConfig.onclick.slice(6));
                if (Number.isNaN(setNumber)) { setNumber = 0; }
                // Clone the button config, just in case
                buttonConfig = Object.create(buttonConfig);
                
                // If needed, create a set for the button
                if (!buttonSets[setNumber]) {
                    buttonSets[setNumber] = [];
                }
                // The new button's index in the set
                var buttonIndex = buttonSets[setNumber].length;
                
                // Create the onclick function if the user inputted the keyword
                // .bind binds a functions this to its first argument and 
                // adds the rest to the beginning of the function's 
                // argument list on future calls
                // This is a fairly clean way to avoid declaring functions
                // in loops
                buttonConfig.onclick = selectButton.bind(
                    null, setNumber, buttonIndex);
                
                // Optionally select this button
                if (buttonConfig.selected) {
                    buttonConfig.onclick(); // Click!
                }
                
                // Create the button
                buttonSets[setNumber][buttonIndex] = Button.new(buttonConfig);
                
            } else if (typeof buttonConfig.onclick === "function") {
                // Ordinary button
                buttons[i] = Button.new(buttonConfig);
            } else {
                // Alert the user to their bad input
                var functionString = String(buttonConfig.onclick).replace(/"/g, "'");
                throw {message: "new Screen: Button creation error:\n\"" + 
                    functionString + "\"is not a function!"};
            }
        }
        
        // Return the new information
        return {
            selectedButtons: selectedButtons,
            buttons: buttons,
            buttonArrays: buttonArrays,
            buttonSets: buttonSets
        };
    };
    
    // Switch the screen, while calling its onLoad method and transferring the keys
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
/* Copied from Bob Lyons program
 https://www.khanacademy.org/computer-programming/leak-free-particle-system/4684587452399616 */
/*
 * Give every object a "new" method that works around
 * the Khan Academy leak.
 */
var object = Object; // Used to keep Oh noes from saying "Object.create is not a function"
// when editing + the live editor (apparently) causes it to become not a function
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
    gameScreens[gameState.screen].keyPressed(keyCode, key.toString());
};

keyReleased = function() {
    gameScreens[gameState.screen].keyReleased(keyCode, key.toString());
};

frameRate(60);
draw = function() {
    var currentMillis = millis();
    var secondsElapsed = (currentMillis - lastMillis) / 1000;
    lastMillis = currentMillis;
    
    // Prevent the timestep from being too large, which can cause weird effects
    if (secondsElapsed > 0.03) {
        secondsElapsed = 0.03;
    }
    
    gameScreens[gameState.screen].run(secondsElapsed, mouseX, mouseY);
};
