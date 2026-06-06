/** 
 *  WIP, currently titled "Chroma"
 * 
 *     Arrow keys or *ESDF* to move (sorry, but w does something else)
 *     Returning to the home screen while playing will *not* lose your progress.
 * Letter keys that match a light color change the light to that color. 1-7 also work.
 *     Reach the portal to advance to the next level. Avoid touching the triangular spikes.
 * If you accidentally click "home" (or press h) while playing, just click play and 
 * a light mode again to resume playing.
 *     The light colors are the core of the game. Only blocks (and spikes) that reflect 
 * the current light color will be displayed, and in this game you cannot collide
 * with objects that are not illuminated.
 * I based the colors off of RGB color format. Here is a "cheat sheet":
 * - White: Red + Green + Blue
 * - Red: Only Red
 * - Green: Only Green
 * - Blue: Only Blue
 * - Cyan: Green + Blue (= not red)
 * - Magenta: Red + Blue (= not green)
 * - Yellow: Red + Green (= not blue)
 *     If a block appears on top of you (when light changes) you will be stuck until
 * you change the light color again. You die if a spike appears on top of you.
 *     The "cheat" button allows you to skip ahead levels.
 *     There is a mobile mode option, you can find it on the play screen.
 * 
 *     Internal mode: Up and down are forward and backward, 
 *        e and d are look up and look down, spacebar is jump.
 *        Your view gets auto-mirrored whenever you cross the +-90 degree line.
 * 
 *     I appreciate suggestions for improvements!
 * 
 *     Apologies to those who are colorblind. Toggle colorblind mode on in the options
 * menu for a bit of help. If you have advice about how to make this game more 
 * friendly to colorblind people, I would be happy to hear it!
 * 
 * @Credit:
 * Thanks a ton to Bob Lyon. His programs have helped me very much. 
 * For this particular program of mine, I would like to credit:
 * https://en.khanacademy.org/computer-programming/2d-ray-tracing/4857083575468032
 * https://www.khanacademy.org/computer-programming/bzier-circle/1258627859
 * https://www.khanacademy.org/computer-programming/leak-free-p-/4684587452399616
 * https://en.khanacademy.org/computer-programming/handbook-of-collisions-and-interiors/5567955982876672
 * for the ray tracing, help with the myRect functions, 
 * deleaking, and perfect player-spike collisions.
 * I modified the ray tracing library slightly to permit coloring the segments.
 * 
 * I also used code from my programs
 * https://www.khanacademy.org/computer-programming/myrect-better-rectangle/4561505013776384
 * for the myRect and isInMyRect functions, 
 * and the Button constructor from my game Weatherman at
 * https://www.khanacademy.org/computer-programming/weatherman-platformer/5254883940876288
 * and the scale node math from
 * https://www.khanacademy.org/computer-programming/3d-object-renderer/5664297758081024
 * 
 *    Also thanks to ChatGPT (and a bit Gemini) for help pointing out lots of errors, 
 * and for a few suggestions.
 *    However, I did *not* copy paste *any* AI code into this project.
 *    The core game idea is NOVEL as far as I know, though I saw a slightly related
 * concept (but not light based or related) in a game called RRGGBB on puzzle playground.
 * 
 * This is easily my biggest project, crushing my previous record of 2708 LoC (Weatherman).
 * I think I have maintained total bugs ever in this program < lines of code!
 * 
 * Thanks for playing! I hope you enjoy this project.
 * 
 * @Began around 5/9/2026
 * @Finished... ??
 * 
 * @Bug {
 *     None other than those listed in the todos...
 * }
 * 
 * @TODO (not prioritized): {
 *    Consider adding player trail and camera gliding?
 *    Consider pushable crates (like in jumphase)
 *    Animate everything I can (player box, ??, ...)
 *    Render jewels in first person mode
 *    Add white box around portal and gems? (first person mode)
 *    Fix blocks squishing strangely when too close? (first person mode)
 *    Add background story?
 *    Add in-game "cheat sheet"?
 *    Add more levels!
 *    Add flashlight to player graphic?
 *    Tutorial comments in level (with on/off toggle)
 *    Revise beginning comments text?
 *    there is still a memory leak, does it need fixing?
 *    Make sure all added and existing levels are possible *and fun*!
 * Low priortity:
 *    Reuse vertices??
 * 
 * New:
 *    Checkerboard background to aid depth perception 
 *    Get startfraction working for speed?
 *    Add shift + arrow for slower motion?
 *    Figure out how to make oh noes point to a line (when width !== height; use error for better erroring)
 *    Sounds? Should have toggle (and perhaps controlled by delag mode in part)
 *    First person mode: change f and s to +-90 degrees?
 *    Ensure (a feel of) level progression
 *    Does memory leak only occur with frequent editing or does it happen when playing too?
 *    Consider if I ought to add more if error statements 
 *    Tutorial level for cmy that uses spikes instead of walls, so more visibility and nicer
 *    Similar to above but with devious floor
 *    Hint appears after a time?
 *    Consider timer/death counter for added challenge?
 *    Better tutorial levels (though mine is nice) (move the jewel?) (nah)
 *    Subtle Viginette in all modes?
 *    Colorblind mode for first person mode
 * }
 * 
 * @Completed Todos: {
 *    Clearly note that returning home will not lose your progress. 
 *    (cancelled) Hint appears after a time?
 *    (cancelled) DecreaseLag mode should simplify transitions: no old image? (but ensure the call that draws said image is guarded!)
 *    (cancelled) Delag mode could drop frameRate if recorded frame rate is significantly lower (base off of logT??)?
 *    (cancelled) Tutorial signposts??
 *    (cancelled) Add debug mode to print sizes of all pools?
 *    Show jewels in first person mode
 *    Make portals display behind walls that are in front of them in first person mode
 *    Add a bright horizontal beam of light through all portals in first person mode
 *    Clamp rotPortalX? Or is that already handled in get screen x?
 *    (cancelled) Consider whether to remove got credit around colorblind mode?
 *    Are any vars snake case ish? (NO)
 *    (cancelled) Sort by deepest node instead of avg?
 *    Sorting tiebreaker just in case (for consistency)
 *    Fade distant segs 
 *    Parallax background ( several moving components)? Extremely cool! … and not very cheap (remove in delag mode)
 *    !!! 2.5D effect in normal modes for parallax effect?!? Wow!!!
 *    Intro wham effect
 *    Add intro wham effect to completed todos list
 * (hah) Wow ai wants to fix stuck mechanic and add pattern to colorblind mode, but I won’t!
 *    Make sure logT logs whole frame time as well
 *    Don't clear (portal & jewel) arrays in loadLevel, 
 *        just don't insert for later light colors
 *    Gpt: Cache vertex locally Cache accessed rows
 *    Stop player wiggle when stuck
 *    Player should scale from bottom middle, not middle middle
 *    Resting animation for player? Bobbing height
 *    More obvious "stuckness"? (all modes)
 *      ^ (giant colored exclamation mark in colo of sticking block)
 *    Add delag mode button to options scene
 *    Enhance first person mode death shake
 *    (cancelled) Remove performance logging code?
 *    Make level not reset until end screen "play again"
 *    (cancelled) Create world system?
 *    (cancelled) Make 4 worlds: basic, collecting, jewels, and "light mode"!?
 *    Move colorblind mode button
 *    (cancelled) Mapping angles to pixels should work
 *    (cancelled) Merge long walls (and move seg generation into separate step)
 *    Add small glow to color buttons
 *    Make portal inaccessable without all jewels (and fade portal until then)
 *    "Internal" type of viewing on options scene
 *    "Flashlight mode" for the 60 degree light that you can rotate
 *    (cancelled) Only compute left half of screen and 
 *          mirror to right half in raycast renderer
 *    cache trig values for row/don't recompute them, store in local variable
 *    (cancelled) Map angles onto columns as well as mapping angles onto rows?
 *    (cancelled) Row major iteration
 *    (cancelled) Disable anti-aliasing in delag mode
 *    Add portal to first person mode
 *    Make blocks look actually red/green/blue when light changes?
 *    (done) Extend width of blocks to 3
 *    Immediate camera flip when crossing +-90 degrees border
 *    Rename internal to first-person
 *    Fix colorblind mode for jewels
 *    Only grab jewels with matching light color, but display always?
 *    Particles behind jewels
 *    Make player look cooler
 *    Make mobile buttons more transparent and less tall
 *    Add (mobile) buttons for perma-jump and perma-run
 *    Consider if jewel image would benefit from more work (yes and done)
 *    Note that mobile mode exists at top of program
 *    Make jewels collectable
 *    Make jewels explode with particles when collected
 *    Note chatgpt's involvement in colorblind mode map
 *    Make jewels bob
 *    Add particles to jewels
 *    Fix home screen button spacing
 *    Fix bug of player jumping at start of new level sometimes
 *    Make color buttons have transparent stroke when not selected
 *    (cancelled) Use "light intesity" instead of "light type"?
 *    (done) Test halving circularOverlay size (huge improvement)
 *    (done) nullify transition.oldSceneImage after transition
 *    (done) Make particles when player grinds down vertical wall
 *    Add particles when player grinds down a wall (hit x and falling)
 *    Fix colorblind mode letters
 *    Inline drawGradient math
 *    measure frame ms
 *    initCircular should only draw one quadrant then copy it (NOT HELPFUL)
 *    (cancelled) Implement time smoothing?
 *    Add colorblind mode toggle
 *    Add splash effect (player particles)
 *    Mobile support
 *    (cancelled) Use gradients in graphics?
 *    Buttons growing
 *    Highlight selected button for light color
 *    Move options out of right before play scene
 *    Think of a cooler scene transition (DONE!)
 *    Finish colorblind mode
 *    Add shake effect on death
 *    (cancelled) Arrange buttons in a color wheel shape?
 *    Fix memory leak
 *    Fix error handling
 *    Fix transition bug
 *    Create a scene transition
 *    (done) Create a die animation of some sort!
 *    (done) Add a die explosion too
 *    (done) Fix getting stuck in blocks
 *    (done) Add note on how page about key controls for light
 *    (done) Add more comments (like how to play) at top
 *    (done) Better portal graphics
 *    (done) Scale with screen size
 *    (done) change key for white light (changed second jump key instead)
 *    (done) add comments explaining the light colors
 *    (done) animate end screen star (rotate maybe?) (easy to mod draw star)
 *    (done) consider adding stepped loading for gradient image?
 *    (done) add stepped loading for light colors
 *    (done) Finish restart scene
 * }
**/
// Program-wrapping brackets so I can shift-click and collapse everything! {

/** Main settings **/
var colorblindMode = false;
var decreaseLag = false;
var mobileMode = false;
var useTransitions = true;
var strictMode = true;

/** Variable init **/
var currentScene = "home";
var sceneNames = ["home", "info", "options", "play", "end", "sub", "restart"];
var currentLightType = "raycast"; // Todo: change to "raycast" when finished
var lightTypes = ["raycast", "internal", "circular", "full", "flashlight"];
var currentLightColor = "w";
var blockSize = Math.max(width / 20, height / 20);
var keys = {};
var sceneStorage = {};
var sceneStorageDefaults = {
    "play": {
        jewelTimer: 0,
        playerBob: 0
    },
    "end": {
        angle: 0,
        cheated: false
    },
    "sub": {
        angle: 0,
        printed: false
    }
};
// Persist across restarts to lighten cpu load
var cachedImages = {
    circularOverlay: cachedImages && cachedImages.circularOverlay,
    portal: cachedImages && cachedImages.portal,
};
var currentLevelNumber = 0;
var currentLevelArrays = {};
var currentLevelSegments = {};
var internalModeVars = {
    lightTheta: -40,
    lightDelta: 80,
    camThetaSpeed: 3, // Degrees
    isMirrored: false,
};
var wallThickness = width * 0.005; // Displayed thickness in px
var cheated = false;
var transition = {
    /* Transition states go "done" > "out" > "in" > "done" */
    state: "done",
    timer: 0, totalTime: 60, halfTime: 30,
    states: ["done", "out", "in"],
    oldSceneImage: null
};
var player = {
    x: 0, y: 0, w: 0.9, h: 0.9, yVelocity: 0, 
    runSpeed: 0.1, gravity: 0.01, jumpHeight: 4.5,
    jumpSpeed: 0, // Placeholder (filled in later in the code)
    firstX: 0, firstY: 0, currentDir: RIGHT,
    isStuck: false, // Often set to a string indicating the first block causing stuckness
    maxFall: 1000, // Placeholder
    maxFallBelowLevel: 17,
    stuckColor: color(84, 84, 84), r: 0.1,
    color: color(201, 201, 201), light: null, lightDelta: 360,
    walls: null, /* For deleaking */
};
var portals = {
    x: [], y: [], // Particles
    color1: color(207, 148, 255),
    color2: color(167, 59, 255),
    color1Dark: color(148, 148, 148),
    color2Dark: color(59, 59, 59),
};
var jewels = {
    x: [], y: [], colors: [], // Positions of jewels
    allX: [], allY: [], allColors: [], // For reset
    maskBright: 0x444444,
    normalDarken: 68,
    darkDarken: 136,
    strokeColor: color(255, 255, 255),
    strokeWeight: 3
};
var deathTimer = 0, deathLength = 50;
var parallaxIntensity = 0.07;
// Bindings to reuse some objects
var spikePoints, playerPoints, around, emptyArrays;
var maxEmptyArrays = 400;
var gameSceneDraw, buttonsByScene, mobileButtons; // Keeps Oh noes happy
// For performance logger
var startT = 0, lastT = 0, logcacheavg = { "avg": "avg" };
var logcachemin = { "min": "min" }, logcachemax = { "max": "max" };
// Clear emptyArrays, if it has length
if (emptyArrays && emptyArrays.length) {
    emptyArrays.length = 0;
} 
else {
    emptyArrays = [];
}

// Light
var lightColorsArray = [
    {name: "white"  , hex: 0xFFFFFF, KAColor: color(255, 255, 255), letter: "w"},
    {name: "red"    , hex: 0xFF0000, KAColor: color(255, 0  , 0  ), letter: "r"},
    {name: "green"  , hex: 0x00FF00, KAColor: color(0  , 255, 0  ), letter: "g"},
    {name: "blue"   , hex: 0x0000FF, KAColor: color(0  , 0  , 255), letter: "b"},
    {name: "cyan"   , hex: 0x00FFFF, KAColor: color(0  , 255, 255), letter: "c"},
    {name: "magenta", hex: 0xFF00FF, KAColor: color(255, 0  , 255), letter: "m"},
    {name: "yellow" , hex: 0xFFFF00, KAColor: color(255, 255, 0  ), letter: "y"},
];
var lightColorsByLetter = {};
var lightColorsByHex = {};
var lightColorsOnly = [];
for (var colorInd = 0; colorInd < lightColorsArray.length; colorInd++) {
    var colorObj = lightColorsArray[colorInd];
    lightColorsByLetter[colorObj.letter] = colorObj;
    lightColorsByHex[colorObj.hex] = colorObj;
    lightColorsOnly.push(colorObj.hex);
}

// Particles
var deathParticles = {
    x: [], y: [], vx: [], vy: [], ages: [],
    minVX: -0.1, maxVX: 0.1,
    minVY: -0.3, maxVY: -0.1,
    gravity: 0.01, count: 30,
    color: player.color,
    size: width*0.01 || blockSize*0.1 || 4,
    age: 100, // Frames
};
var playerParticles = {
    x: [], y: [], vx: [], vy: [], ages: [],
    minVX: -0.1, maxVX: 0.1,
    minVY: -0.09, maxVY: 0,
    gravity: 0.001, count: 300,
    minOpacity: 0, maxOpacity: 70,
    color: color(255, 255, 255),
    size: width*0.01 || blockSize*0.1 || 4,
    minAge: 10, maxAge: 30,
};
var portalParticles = {
    x: [], y: [], vx: [], vy: [], ages: [],
    minVX: -0.05, maxVX: 0.05,
    minVY: -0.05, maxVY: 0.05,
    gravity: 0, count: 30,
    minOpacity: 0, maxOpacity: 70,
    color: color(255, 255, 255),
    size: width*0.01 || 4,
    minAge: 10, maxAge: 30,
    countPer: 30,
};
var jewelParticles = {
    x: [], y: [], vx: [], vy: [], ages: [],
    minVX: -0.05, maxVX: 0.05,
    minVY: -0.05, maxVY: 0.05,
    gravity: 0, count: 30,
    minOpacity: 0, maxOpacity: 100,
    color: color(255, 255, 255),
    size: width*0.01 || 4,
    minAge: 10, maxAge: 30,
    countPer: 100,
};

/** Levels **/
/* Charmap:
 w,r,g,b,y,c,m: A block of that color
 W,R,G,B,Y,C,M: A spike of that color
 1,2,3,4,5,6,7: A jewel of the matching color
 $: Player
 @: Portal
 -: Empty space
*/
var levels = [
    [
    "wwwwwwwwww-----------------------w",
    "wwwwwwwwwr-----------------------w",
    "wwwwwwwwwg-----------------------w",
    "wwwwwwwwwb-----------------------w",
    "wwwwwwwwwc-----------------------w",
    "wwwwwwwwwm-------------------@---w",
    "wwwwwwwwwy-----------------------w",
    "wrgbcmywww-------------------r---w",
    "w------RRR-------------------r---w",
    "w----------------------------r---w",
    "w-3421-----------------------r---w",
    "w------------------------rrrrr---w",
    "w------------------ggg-----------w",
    "w-$----------bbb-----------------w",
    "wwww---RRR-----------------------w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "w--------------------------------w",
    "w----------@---------------------w",
    "w-------------------r------------w",
    "w--------------------------------w",
    "w-----------------------r--------w",
    "w----r-----R------G--------------w",
    "w----------g------b---------B----w",
    "w---------------------------r----w",
    "w--------------r-----------------w",
    "w------------------M-----b-------w",
    "w-----b------------g-------------w",
    "w--------------------------------w",
    "w------B-----r----------b--------w",
    "w------g------------R------------w",
    "w-------------------g-------w----w",
    "w-$-----------b------------------w",
    "wwww-----------------------------w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "w---r---g---b---y---c---m---w",
    "w---r---g---b---y---c---m-@-w",
    "w---r---g---b---y---c---m---w",
    "w---r---g---b---y---c---m---w",
    "w-$-r---g---b---y---c---m---w",
    "w---r---g---b---y---c---m---w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "--------------------------------------------------mmm",
    "--------------------------------------------------m@m",
    "---W----------------------------------------------mmm",
    "C-CwC-C----------------------------------------------",
    "cC-C-Cc----------------------------------------------",
    "C-----C----------------------------------------------",
    "C--$--C----------------------------------------------",
    "wwwwwww----r----b-----g---g------r--b----g-----m-----"],
    [
    "--@-",
    "----",
    "----",
    "----",
    "mmmm",
    "----",
    "----",
    "----",
    "rrrr",
    "----",
    "----",
    "----",
    "cccc",
    "----",
    "----",
    "----",
    "gggg",
    "----",
    "----",
    "----",
    "yyyy",
    "----",
    "----",
    "----",
    "bbbb",
    "----",
    "-$--",
    "----",
    "wwww"],
    [
    "g----w----w----w----w----w----wwwww",
    "g----w----w----w----w----w----w---w",
    "g----w----w----w----w----w----w---w",
    "g----w----w----w----w----w----w-@-w",
    "g----g----r----b----y----c----m---w",
    "g-$--g----r----b----y----c----m---w",
    "g----w----w----w----w----w----w---w",
    "wwwwwwwwwwwwwwwwwyyywwcccwwmmmwwwww"],
    [
    "w-------------------------------w",
    "w--W----------------------------w",
    "w-WwW---------Y-----------------w",
    "w------------YyY-------------MMMw",
    "w------------YyY------------Mmmmw",
    "w-$----------YyY------bb----Mm@-w",
    "w---W--RRR---YyY-BBBBBbbbb--Mm--w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "---------------------------------------------------",
    "--------------------------------------------------@",
    "---------------------------------------------------",
    "mM---Mm--------------------------------------------",
    "mM---Mm--------------------------------------------",
    "mM-$-Mm--------------------------------------------",
    "mM---Mm----B----R-----M---B--R---G--C---M-----Y----",
    "w--w--w----r----b-----y---g--r---r--b---g-----w----"],
    [
    "w--------w",
    "w--------w",
    "w---$----w",
    "wCC----CCw",
    "wccccccccw",
    "w--------w",
    "w--------w",
    "w--------w",
    "w--------w",
    "-RRRRRRRR-",
    "-rrrrrrrr-",
    "w--------w",
    "w--------w",
    "w--------w",
    "wGGGGGGGGw",
    "wggggggggw",
    "w--------w",
    "w--------w",
    "w--------w",
    "wyyyyyyyyw",
    "w--------w",
    "w--------w",
    "w--------w",
    "wBBBBBBBBw",
    "wbbbbbbbbw",
    "w--------w",
    "w----@---w",
    "w--------w",
    "wwwwwwwwww"],
    [
    "wW--------Ww",
    "wW--------Ww",
    "wW---@----Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--RRRR--Ww",
    "wW--mmmm--Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--GGGG--Ww",
    "wW--rrrr--Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--cccc--Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--gggg--Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--yyyy--Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--------Ww",
    "wW--bbbb--Ww",
    "wW--------Ww",
    "wW----$---Ww",
    "wW--------Ww",
    "---WwwwwW---",
    "----WWWW----"],
    [
    "wwBBBBBBCBBww---------------------------------------",
    "wWBBBBBBrBBWw-------Y-------------------------------",
    "wWgBBBBBBBBWw-------b-------------------------------",
    "wWBBBBBBrBBWw--------------Y----------------@-------",
    "wWBBBBBBBWBWw--------------b------------------------",
    "wWBBBBBBBcBWw---------------------------------------",
    "wWBbBBmBBBBWw---------------------YY----------------",
    "wWBGBBBBBbBWw---------------------bb--------wwww----",
    "wWByBBBBrBBWw---------------------------------------",
    "wWBBCBBbBBBWwMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",
    "wWbBrBBBBBBWwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    "wWBBBBBBByBWw---------------------------------------",
    "wWBBBBBBBBBWw---------------------------------------",
    "wWBBBwBBBBBWw---------------------------------------",
    "wWBBBBBBBBBWw---------------------------------------",
    "ww----$----ww---------------------------------------",
    "wwwwwwwwwwwww---------------------------------------",
    "----------------------------@-----------------------"],
];

/** Anti-leak **/
// From Bob Lyon's program https://www.khanacademy.org/computer-programming/leak-free-particle-system/4684587452399616
/*
 * Give every object a "new" method that works around
 * the Khan Academy leak.
 */
var object = Object; // Keeps Oh noes happy
function whatNewDoes() {
    var obj = object.create(this.prototype);
    return this.apply(obj, arguments) || obj;
}
/*
These statements are placed right after each constructor
Button.safeNew = whatNewDoes;
Vertex.safeNew = whatNewDoes;
Segment.safeNew = whatNewDoes;
Light.safeNew = whatNewDoes;
*/ //

/** Utility functions**/
// This is mostly mine, made with some help from Bob Lyon's program
// MyRect is a set of functions for drawing rounded rectangles with near-perfect rounding
function myRectMode(mode) {
    // Idea to store mode on the 'myRectMode' function from Bob Lyon's program https://www.khanacademy.org/computer-programming/handbook-of-collisions-and-interiors/5567955982876672
    myRectMode.mode = mode;
}
function myRect(x, y, w, h, r1, r2, r3, r4) {
    // kappa and bezier points adapted from Bob Lyon's program
    // https://www.khanacademy.org/computer-programming/bzier-circle-simple-as-1-2-3-4/1258627859
    var kappa = 4 / 3 * (Math.SQRT2 - 1);
    
    // My own
    function ifNull(a, b) { return a === undefined? b : a; }
    
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
    function ifNull(a, b) { return a === undefined? b : a; }
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

// Erroring helpers
function error(msg) {
    println(msg);
    // Helper so I can actually use the Error constructor
    function globals() {
        return this;
    }
    if (strictMode) {
        // Throw an error
        var newError = globals().Error;
        var err = newError(msg);
        throw err;
    }
}

function reportError(err, clean) {
    println("\n----------------- BEGINNING OF ERROR -----------------");
    debug(err); // KA alias for console.log
    if (err && err.infiniteLoopNodeType) {
        println('KA crashed the program because it "detected an infinite loop". Sorry.');
        println('The line of the error is line #' + err.row);
        println('If this happens too much, please let the creator (ElijaKen) know.');
        if (strictMode) {
            noLoop();
            println('Press "o" to attempt to resume play.');
        }
    } else {
        println(err);
        if (!clean) {
            if (err) {
                println(String(err.message));
                var stackCleanRegExp = /(\(eval at)[^)]*\)|(Drawing2D)[^)]*/ig;
                // Print the stack trace, but clean it up to be more readable
                // (It contained a lot of excess information for my purposes)
                var stackTxt = String(err.stack);
                stackTxt = stackTxt.replace(stackCleanRegExp, "($1$2...)");
                println(stackTxt);
            }
            println("Please let the creator (ElijaKen) know about this bug.");
            println("If you are willing, please try to describe what you did\nleading up to this bug.");
            if (strictMode) {
                noLoop();
                println('(Press "o" to resume play if the error is gone)');
            }
        }
    }
}

// Debugger helper
function dbgr() {
    debugger; /* jshint ignore:line */
}

// Something(s) I just wrote
function toKAColor(c) {
    if (arguments.length > 1) {
        error("toKAColor called with more than 1 argument (perhaps you meant to use toKAColor2?): " + Array.from(arguments));
    }
    return color((c & 0xFF0000) >>> 16, (c & 0xFF00) >>> 8, c & 0xFF);
}

function toKAColor2(c, darken) {
    darken = darken || 0;
    return color(((c & 0xFF0000) >>> 16) - darken, 
        ((c & 0xFF00) >>> 8) - darken, (c & 0xFF) - darken);
}

// Two graphics helpers (both mine)
function drawGradient(canvas, cx, cy, maxR, minR, color1, color2, dx, dy, dw, dh) {
    // Return boolean indicating state of success
    if (!canvas.loadPixels) { return false; }
    canvas.loadPixels();
    var pixels = canvas.imageData.data;
    var c1R = red(color1), c1G = green(color1), c1B = blue(color1), c1A = alpha(color1);
    var c2R = red(color2), c2G = green(color2), c2B = blue(color2), c2A = alpha(color2);
    var cw = dw || canvas.width, ch = dh || canvas.height, trueWidth = canvas.width;
    var radMult = 1 / (minR - maxR), firstY = dy || 0, firstX = dx || 0;
    for (var y = firstY; y < ch; y++) {
        for (var x = firstX; x < cw; x++) {
            var index = (y * trueWidth + x) * 4;
            var lerpAmount = (Math.hypot(x - cx, y - cy) - maxR) * radMult;
            lerpAmount = lerpAmount < 0? 0 : lerpAmount > 1? 1 : lerpAmount;
            pixels[index  ] = c1R + (c2R - c1R) * lerpAmount;
            pixels[index+1] = c1G + (c2G - c1G) * lerpAmount;
            pixels[index+2] = c1B + (c2B - c1B) * lerpAmount;
            pixels[index+3] = c1A + (c2A - c1A) * lerpAmount;
        }
    }
    canvas.updatePixels();
    return true;
}

function drawStar(cx, cy, numPoints, radius1, radius2, clr, angle) {
    angle = angle || 0;
    fill(clr);
    noStroke();
    beginShape();
    for (var i = 0; i < numPoints * 2; i++) {
        var radius = i % 2 === 0? radius1 : radius2;
        var theta = i * Math.PI / numPoints - Math.PI / 2 + angle;
        var x = cx + radius * Math.cos(theta);
        var y = cy + radius * Math.sin(theta);
        vertex(x, y);
    }
    endShape(CLOSE);
}


// Credit to Bob Lyon for this collision function!
function isBetween(c, a, b) {
    return (a - c) * (b - c) <= 0;
}
 
function overlap(a, b, c, d) {
    return isBetween(c < d ? c : d, a, b) || isBetween(a < b ? a : b, c, d);
}
 
function polygonPolygonCollide(poly1, poly2) {
    var polys = [
            poly1,
            poly2
        ];
    var project = function (poly, axis) {
        var mn = Infinity;
        var mx = -Infinity;
        for (var i = 0; i < poly.length; i++) {
            var dot = poly[i].x * axis.x + poly[i].y * axis.y;
            mx = max(mx, dot);
            mn = min(mn, dot);
        }
        return {
            min: mn,
            max: mx
        };
    };
    var getAxes = function (poly) {
        var axes = [];
        for (var i = 0; i < poly.length; i++) {
            var n = (i + 1) % poly.length;
            axes[i] = {
                y: poly[i].x - poly[n].x,
                x: -(poly[i].y - poly[n].y)
            };
        }
        return axes;
    };
    for (var p = 0; p < polys.length; p++) {
        var axes = getAxes(polys[p]);
        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i];
            var p1 = project(poly1, axis);
            var p2 = project(poly2, axis);
            if (!overlap(p1.min, p1.max, p2.min, p2.max)) {
                return false;
            }
        }
    }
    return true;
}

// My own map function, based on formula from googling
// Funny that Oh noes doesn't complain about this, as long as I put in 5 args
function map(value, minOrig, maxOrig, minNew, maxNew) {
    return (value - minOrig) * (maxNew - minNew) / (maxOrig - minOrig) + minNew;
}

/** Scene switcher and switch guards **/
function setTransitionState(newState) {
    if (transition.states.includes(newState)) {
        transition.state = newState;
    } else {
        error("Invalid transition state: " + newState);
    }
}

function isTransitionState(state) {
    if (!transition.states.includes(state)) {
        error("Invalid transition state: " + state);
    }
    return transition.state === state;
}

function startTransition() {
    if (transition.timer > 0) {
        // Get a fresh image
        gameSceneDraw[currentScene]();
    }
    transition.oldSceneImage = get();
    setTransitionState("out");
    // Reset timer just in case
    transition.timer = 0;
    if (!useTransitions) {
        setTransitionState("done");
    }
}

// Scene changing
function changeScene(newScene, dontTransition) {
    if (sceneNames.includes(newScene)) {
        var oldScene = currentScene;
        // Activate transition
        if (useTransitions && !dontTransition) {
            startTransition(oldScene);
        }
        // Change scene
        currentScene = newScene;
        // Set new storage
        if (!sceneStorage[newScene]) {
            sceneStorage[newScene] = {};
        }
        if (sceneStorageDefaults[newScene]) {
            for (var key in sceneStorageDefaults[newScene]) {
                sceneStorage[newScene][key] = sceneStorageDefaults[newScene][key];
            }
        }
    } else {
        error("Requested invalid scene: " + newScene);
        return;
    }
}

// For convenience
function changeSceneWrapped(newScene, dontTransition) {
    function change() {
        changeScene(newScene, dontTransition);
    }
    return change;
}

// Also for convenience
function storage() {
    return sceneStorage[currentScene];
}

// Guard wrapper(s)
function setLightType(newLightType) {
    if (lightTypes.includes(newLightType)) {
        currentLightType = newLightType;
    } else {
        error("Invalid light type: " + newLightType);
    }
}

function isLightType(lightType) {
    if (!lightTypes.includes(lightType)) {
        error("Invalid light type: " + lightType);
    }
    return currentLightType === lightType;
}

function changeLightWrapped(newLightColor) {
    function changeLightColor() {
        if (lightColorsByLetter[newLightColor]) {
            currentLightColor = newLightColor;
        } else {
            error("Invalid light color: " + newLightColor);
        }
    }
    return changeLightColor;
}

function isLightColor(lightColor) {
    if (!lightColorsByLetter[lightColor]) {
        error("Invalid light color: " + lightColor);
    }
    return currentLightColor === lightColor;
}

/** Button class **/
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
        // Default height is approximately the width / golden ratio
        this.h = config.h || this.w / 1.618;
        this.r = config.r !== undefined? config.r : Math.min(this.w / 9, this.h / 5.5624);
        
        // ID, combine several factors for a unique ID
        this.id = "" + buttonID + " " + this.x + this.y + this.w + this.h;
        buttonID++;
        
        // Main properties
        this.onClick = config.onclick || config.onClick;
        this.onPress = config.onpress || config.onPress;
        this.onRelease = config.onrelease || config.onRelease;
        this.message = config.message || "";
        this.keys = config.keys || "";
        this.isSelected = config.isSelected || config.selected;
        
        // Appearance
            // Text
        this.textColor = config.textColor || color(0, 0, 0);
        this.textSize = config.textSize || Math.min(this.w * 0.37, this.h * 0.65);
        this.stroke = config.stroke || color(0, 0, 0);
            // Stroke weight
        this.strokeWeight = config.strokeWeight !== undefined? 
            config.strokeWeight : width * 0.005;
            // Background colors
        this.color = config.color || color(255, 225, 94);
        this.selectedColor = config.selectedColor || darkenColor(this.color, 60);
        this.selectedStroke = config.selectedStroke || this.stroke;
        this.hoverColor = config.hoverColor || darkenColor(this.color, 40);
        this.hoverGrow = config.hoverGrow || config.grow || 1.05;
    }
    
    Button.prototype.mouseClicked = function(mx, my) {
        var t = this;
        if (isInMyRect(mx, my, t.x, t.y, t.w, t.h, t.r) && t.onClick) {
            t.onClick();
        }
    };
    
    Button.prototype.mousePressed = function(mx, my) {
        var t = this;
        if (isInMyRect(mx, my, t.x, t.y, t.w, t.h, t.r) && t.onPress) {
            t.onPress();
        }
    };
    
    Button.prototype.mouseReleased = function(mx, my) {
        var t = this;
        if (isInMyRect(mx, my, t.x, t.y, t.w, t.h, t.r) && t.onRelease) {
            t.onRelease();
        }
    };
    
    Button.prototype.keyPressed = function(keys) {
        if (this.keys && this.onClick) {
            for (var k = 0; k < this.keys.length; k++) {
                var key = String(this.keys[k]).toLowerCase();
                if (keys[key] || keys[key.toUpperCase()]) {
                    this.onClick();
                }
            }
        }
    };
    
    Button.prototype.draw = function(mx, my, selected) {
        // Load image
        if (!cachedImages[this.id + "image"]) {
            cachedImages[this.id + "image"] = this.getImage();
        }
        
        // Get the message as an image
        this.messageImage = cachedImages[this.id + "image"];
        
        // Selected?
        selected = selected || this.isSelected && this.isSelected();
        
        // Alignment
        textAlign(CENTER, CENTER);
        myRectMode(CORNER);
        
        // Background color
        fill(this.color);
        var hover = isInMyRect(mx, my, this.x, this.y, this.w, this.h, this.r);
        var mult = hover? this.hoverGrow : 1;
        if (hover || selected) {
            fill(selected ? this.selectedColor : this.hoverColor);
        }
        
        // Draw the button
        stroke(selected? this.selectedStroke : this.stroke);
        if (this.strokeWeight === 0) {
            noStroke();
        } else {
            strokeWeight(this.strokeWeight);
        }
        var x = this.x, y = this.y, w = this.w, h = this.h, r = this.r;
        if (mult !== 1) {
            x -= w * (mult - 1) * 0.5;
            y -= h * (mult - 1) * 0.5;
            w *= mult;
            h *= mult;
            r *= mult;
        }
        myRect(x, y, w, h, r);
        
        imageMode(CORNER);
        image(this.messageImage, x, y, w, h);
    };
    
    Button.prototype.getImage = function() {
        var graphics = createGraphics(this.w, this.h, JAVA2D);
        graphics.background(0, 0, 0, 0);
        
        // Draw the message, which might be a function
        if (typeof this.message === "function") {
            this.message(graphics, 0, 0, this.w, this.h);
        } else {
            graphics.fill(this.textColor);
            graphics.textSize(this.textSize);
            graphics.textAlign(CENTER, CENTER);
            graphics.text(this.message, this.w / 2, this.h / 2);
        }
        
        return graphics.get(0, 0, this.w, this.h);
    };
    
    Button.drawForScene = function(scene, mx, my) {
        if (typeof scene === "string") {
            if (!buttonsByScene[scene]) {
                return;
            } else {
                scene = buttonsByScene[scene];
            }
        }
        for (var name in scene) {
            scene[name].draw(mx, my);
        }
    };
    
    Button.clickForScene = function(scene, mx, my) {
        if (typeof scene === "string") {
            if (!buttonsByScene[scene]) {
                return;
            } else {
                scene = buttonsByScene[scene];
            }
        }
        for (var name in scene) {
            scene[name].mouseClicked(mx, my);
        }
    };
    
    Button.pressForScene = function(scene, mx, my) {
        if (typeof scene === "string") {
            if (!buttonsByScene[scene]) {
                return;
            } else {
                scene = buttonsByScene[scene];
            }
        }
        for (var name in scene) {
            scene[name].mousePressed(mx, my);
        }
    };
    
    Button.releaseForScene = function(scene, mx, my) {
        if (typeof scene === "string") {
            if (!buttonsByScene[scene]) {
                return;
            } else {
                scene = buttonsByScene[scene];
            }
        }
        for (var name in scene) {
            scene[name].mouseReleased(mx, my);
        }
    };
    
    Button.keyPressedForScene = function(scene, keys) {
        if (!buttonsByScene[scene]) { return; }
        for (var name in buttonsByScene[scene]) {
            buttonsByScene[scene][name].keyPressed(keys);
        }
    };
    
    return Button;
})();
Button.safeNew = whatNewDoes; // Deleak

/** Raycasting code (Tons of credit to Bob Lyon for this) **/
// I did tweak it so that segments will store their color, and the light will obey that.
// I also worked on stopping oh noes by converting methods to function declarations

/* A "vertex" is just a point, or a rebranded PVector with more properties. */
var Vertex = (function() {
    /* The program may use any angleMode. This library uses radians. */
    var atan2 = Math.atan2;  /* All angles are in interval [ -PI .. PI ) */
    var F = (function(w) { return this[w]; })("Function");
    var freeVerts = [];

    /* Constructor: */
    function Vertex(x, y) {
        PVector.call(this, x, y, 0);
    }
    Vertex.prototype = Object.create(PVector.prototype);
    
    /* Free this vertex. */
    function freeVert() {
        this.stamp = this.z = 0;
        freeVerts.push(this);
    }
    Vertex.prototype.free = freeVert;
    
    /* Recycle a freed vertex or make a new one. */
    Vertex.new = function(x, y) {
        if (freeVerts.length) {
            var v = freeVerts.pop();
            v.x = x;
            v.y = y;
            return v;
        } else {
            return Vertex.safeNew(x, y);
        }
    };
    
    /* Return a copy of this. */
    function cloneVert() {
        var clone;
        if (freeVerts.length) {
            clone = freeVerts.pop();
            clone.x = this.x;
            clone.y = this.y;
        } else {
            clone = Vertex.safeNew(this.x, this.y);
        }
        clone.dist2 = this.dist2;
        clone.tailing = this.tailing;
        return clone;
    }
    Vertex.prototype.clone = cloneVert;
    
    /*
     * Set this vertex's angle from that to this.
     * Compute the distance squared between this and that.
     * Avoid all of this if the stamps match.
     */
    Vertex.prototype.polar = function(that, stamp) {
        if ((this.stamp !== stamp) || (! stamp)) {
            var dx = this.x - that.x;
            var dy = this.y - that.y;
            this.dist2 = dx*dx + dy*dy;
            var angle = atan2(dy, dx);
            this.tailing = (angle === PI) ? -angle : angle;
            this.hash = stamp;
        }
    };
    
    /* Compare vertices a and b for traditional sort. */
    Vertex.compare = function(a, b) {
        return a.tailing - b.tailing;
    };
    Vertex.compare = F("a", "b", "return a.tailing - b.tailing;");
    
    /* "draw" this vertex. */
    Vertex.prototype.draw = function() {
        ellipse(this.x, this.y, 4, 4);
    };
    
    /* "draw" all vertices. */
    Vertex.draw = function(v) {
        for (var l = v.length, i = 0; i < l; i++) {
            v[i].draw();
        }
    };
    
    /* Draw a ray from this to that. */
    Vertex.prototype.ray = function(that) {
        line(this.x, this.y, that.x, that.y);
    };
    
    /* Draw all the rays associates with the vertices. */
    Vertex.ray = function(that, v) {
        pushStyle();
        stroke(255, 0, 0);
        for (var l = v.length, i = 0; i < l; i++) {
            v[i].ray(that);
        }
        popStyle();
    };
    
    /* Dump all vertices via println. */
    Vertex.dump = function(v) {
        for (var l = v.length, i = 0; i < l; i++) {
            println(i + ". " + v[i] + " " + v[i].tailing);
        }
    };
    
    return Vertex;
})();
Vertex.safeNew = whatNewDoes; // Deleak

/*
 * A "segment" is a fancy name for a  PJS "line".
 * The constructor supports either four coordinate
 * arguments or two vertices arguments.
 *
 * For ray tracing to work, the lantern must always be
 * inside a closed polygon, so initially construct a large
 * boundary around the canvas, e.g.
 *      Polygon.rect(-1, -1, width + 2, height + 2);
 */
var Segment = (function() {
    var segmentStroke = color(179, 255, 0);
    var segmentStrokeWeight = 1.7;
    
    /* The program may use any angleMode. This library uses radians. */
    var tau = 2 * Math.PI;
    var cos = Math.cos;
    var sin = Math.sin;
    var epsilon = 1 / 1024 / 1024 / 64;  /* millionth of a degree */
    var F = (function(w) { return this[w]; })("Function");
    var persistentR = Vertex.new(0, 0);
    var persistentDelta = Vertex.new(0, 0);
    var freeSegs = [];

    /*
     * Constructor function for a "segment" uses four coordinates
     * or USES two vertices (vertexes).
     */
    function Segment(x1, y1, x2, y2, colour) {
        // I (ElijaKen) altered this constructor a bit to handle the colour arg
        if (typeof y2 !== "number") {
            this.vertices = [ x1, y1 ];
            colour = arguments[2];
        } else {
            this.vertices = [ Vertex.new(x1, y1), Vertex.new(x2, y2) ];
        }
        this.intersection = Vertex.new(0, 0);
        this.color = colour === undefined? segmentStroke : colour;
    }
    
    /* Recycle a freed segment, or make a new one. */
    Segment.new = function(x1, y1, x2, y2, colour) {
        var s;
        if (freeSegs.length) {
            var s = freeSegs.pop();
            var vertices = s.vertices;
            if (arguments.length < 4) {
                vertices[0] = x1;  /* XXX may leak a vertex */
                vertices[1] = y1;  /* XXX same */
                colour = x2;
            } else if (vertices.length > 1) {
                vertices[0].set(x1, y1, 0);
                vertices[1].set(x2, y2, 0);
            } else {
                vertices[0] = Vertex.new(x1, y1);
                vertices[1] = Vertex.new(x2, y2);
            }
            s.color = colour; // ElijaKen's addition
        } else {
            s = Segment.safeNew(x1, y1, x2, y2, colour);
        }
        return s;
    };

    /* Free this segment. */
    Segment.prototype.free = function() {
        if (this.vertices.length) {
            freeSegs.push(this);
        } else {
            freeSegs.unshift(this);
        }
    };
    
    /* Free all of the segments in the array. */
    Segment.free = function(segs) {
        for (var l = segs.length, i = 0; i < l; i++) {
            segs[i].free();
        }
        segs.length = 0;
    };
    
    /*
     * Return true iff the imputed center point is colinear
     * with this segment, as determined by its angles.
     */
    function segColinear() {
        var d, a = this.vertices[0], b = this.vertices[1];
        return ((a.dist2 * b.dist2) === 0) ||
            ((d = abs((a.tailing - b.tailing) % tau)) < epsilon) ||
            (abs(d - tau/2) < epsilon);
    }
    Segment.prototype.colinear = segColinear;
    
    /* Compare two segments (for the sort method). */
    Segment.compare = function(a, b) {
        return a.vertices[0].tailing - b.vertices[0].tailing;
    };
    Segment.compare = F("a", "b", "return a.vertices[0].tailing - b.vertices[0].tailing;");
    
    /*
     * Return the point of intersection of a ray 
     * originating at p with angle theta intersecting
     * this segment.  See
     * http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/565282#565282
     *
     * NB: Returns transient, read-only data!
     */
    Segment.prototype.rayIntersect = function(p, theta) {
        var q = this.vertices[0];
        var r = this.vertices[1];
        var s = this.intersection;
        if (this.theta === theta) {
            return s.clone();
        } else if (theta === q.tailing) {
            return q.clone();
        } else if (theta === r.tailing) {
            return r.clone();
        } else {
            s.set(r.x - q.x, r.y - q.y, 0);
            r = persistentR;
            r.set(cos(theta), sin(theta), 0);
            /* u = (q − p) × r / (r × s) where v×w is vx*wy - vy*wx */
            var denom = r.x * s.y - r.y * s.x;
            var delta = persistentDelta;
            delta.set(q.x - p.x, q.y - p.y, 0);
            var u = (delta.x * r.y - delta.y * r.x) / denom;
            if (-epsilon < u && u < 1+epsilon) {
                /* t = (q − p) × s / (r × s) where v×w is vx*wy - vy*wx */
                var t = (delta.x * s.y - delta.y * s.x) / denom;
                if (t > -epsilon) {
                    s.mult(u);
                    s.add(q);
                    s.dist2 = t * t;
                    this.theta = theta;  /* cache it! */
                    return s.clone();
                }
            }
        }
        this.theta = undefined;  /* cache is invalid */
    };
    
    /* Render this segment. */
    Segment.prototype.draw = function() {
        var a = this.vertices[0];
        var b = this.vertices[1];
        stroke(this.color);
        line(a.x, a.y, b.x, b.y);
    };
    
    /* Render all segments. */
    Segment.draw = function(segs) {
        strokeWeight(segmentStrokeWeight);
        stroke(segmentStroke);
        for (var l = segs.length, i = 0; i < l; i++) {
            segs[i].draw();
        }
    };
    
    /* Dump the segs array via println. */
    Segment.dump = function(segs) {
        for (var l = segs.length, i = 0; i < l; i++) {
            var v = segs[i].vertices;
            println(i + ". " + v + " " +
                (v[0].tailing ? v[0].tailing.toFixed(3) : "") + " " +
                (v[1].tailing ? v[1].tailing.toFixed(3) : ""));
        }
    };
    
    return Segment;
})();
Segment.safeNew = whatNewDoes; // Deleak

/*
 * Constructor for a light source includes its
 * location, its angle measure, and its beam size.
 * All properties can be modified after creation.
 */
var Light = (function() {
    /* The program may use any angleMode. This library uses radians. */
    var tau = 2 * Math.PI;
    var radiansFrom = (atan(1) < 1) ?
        function(r) { return r; } : radians;
    var epsilon = 1 / 1024 / 1024 / 64;  /* millionth of a degree */
    var stamp = 0;
    var F = (function(w) { return this[w]; })("Function");
    var headings = [];  /* All unique trace angles. */
    var workingSegs = [];  /* Segments under immediate consideration. */
    var tmpWs = [];  /* tmp copy of workingSegs. */
    var more = [];  /* even more results from tracing. */
    
    /* Constructor.  All arguments can be defaulted. */
    var Light = function(delta, theta, position) {
        this.position = (position) ?
            Vertex.new(position.x, position.y) :
            Vertex.new(width/2, height/2);
        this.theta = theta || 0;
        this.delta = delta || 0;
    };
    
    /* Draw this light source at its position. */
    Light.prototype.draw = function() {
        this.position.draw();
    };
    
    /*
     * Trace this light source across the segments. Returns an
     * array of segments of all walls that are illuminated.
     * Optional results array is recycled and returned.
     */
    Light.prototype.trace = function(segments, results, limit) {
        limit = (typeof limit === "number") ? limit : Infinity;
        return this.traceRadians(segments,
            radiansFrom(this.theta), radiansFrom(this.delta), results, limit);
    };
    
    /* Render the results from the trace method. */
    Light.prototype.drawWalls = function(walls, wallColor, rayColor) {
        pushStyle();
        rayColor = (typeof rayColor === "number") ? rayColor : this.rayColor;
        var v = walls[0] && walls[0].vertices;
        if (typeof rayColor === "number") {
            if (walls.length === 1 && dist(v[0].x, v[0].y, v[1].x, v[1].y) < 0.5) {
                stroke(rayColor);
                strokeWeight(1);
                line(this.position.x, this.position.y, v[0].x, v[0].y);
            } else {
                fill(rayColor);
                noStroke();
                beginShape();
                vertex(this.position.x, this.position.y);
                for (var l = walls.length, i = 0; i < l; i++) {
                    var v = walls[i].vertices;
                    vertex(v[0].x, v[0].y);
                    vertex(v[1].x, v[1].y);
                    
                }
                endShape(CLOSE);
            }
        }
        wallColor = (typeof wallColor === "number") ? wallColor : this.wallColor;
        if (typeof wallColor === "number") {
            strokeWeight(wallThickness);
            for (var l = walls.length, i = 0; i < l; i++) {
                var v = walls[i].vertices;
                stroke(toKAColor(walls[i].color & wallColor)); // ElijaKen's insertion
                line(v[0].x, v[0].y, v[1].x, v[1].y);
            }
            strokeWeight(1);
        }
        popStyle();
    };
    
    /**
     * All functions and methods below are NOT for public
     * consumption, but for support of the trace method.
     */
    
    /*
     * Compare angle a to angle b, assuming that all
     * angles sweep in the positive direction and that
     * both angles lie in the same half-circle. E.g.,
     * if a=150°and b=-135° then this function will
     * return a negative number indicating that a<b.
     * Angles are assumed to be in the range returned
     * by atan2.
     */
    var compareAngle = function(a, b) {
        a += (a < 0) ? tau : 0;
        b += (b < 0) ? tau : 0;
        var delta = a - b;
        return (abs(delta) < tau/2) ? delta : -delta;
    };
    var compareAngle = F("a", "b",
        "var tau = 2 * Math.PI;" +
        "a += (a < 0) ? tau : 0;" +
        "b += (b < 0) ? tau : 0;" +
        "var delta = a - b;" +
        "return ((delta > -tau/2) && (delta < tau/2)) ? delta : -delta;"
    );
    
    /* Compare numbers a and b for traditional sort. */
    var compareNum = F("a", "b", "return a - b;");
    
    /*
     * Apply this light source to all the vertices of the segments.
     * Arrange vertices in start to stop order wrt this position, and
     * initialize the working segmentsfor tracing. Generate an array
     * sorted UNIQUE trace angles.
     */
    Light.prototype.applyTo = function(segments, begin, end) {
        var pos = this.position;
        var ws = workingSegs;
        ws.sIdx = ws.length = headings.length = 0;
        stamp = 1 + stamp % 2000000000;
        for (var s = segments, l = s.length, i = 0; i < l; i++) {
            var seg = s[i];
            var vertices = seg.vertices;
            vertices[0].polar(pos, stamp);
            vertices[1].polar(pos, stamp);
            /* Arrangement of angles is increasing... */
            if (compareAngle(vertices[0].tailing, vertices[1].tailing) > 0) {
                var tmp = vertices[0];
                vertices[0] = vertices[1];
                vertices[1] = tmp;
            }
            /* Segments that cross ±180° initialize our working set... */
            if ((vertices[0].tailing > vertices[1].tailing) &&
              (! seg.colinear())) {
                ws.push(seg);
            }
            headings.push(vertices[0].tailing, vertices[1].tailing);
        }
        segments.sort(Segment.compare);
        
        /*
         * Build a sorted array of unique headings to trace
         * that always includes begin and end.
         */
        for (var i = 1; i < arguments.length; i++) {
            headings.push(arguments[i]);
        }
        headings.sort(compareNum);
        for (var last, i = headings.length - 1; i >= 0; i--) {
            if (headings[i] === last) {
                headings.splice(i, 1);  /* snip */
            } else {
                last = headings[i];
            }
        }
    };
    
    /*
     * Pick the segment that is nearest to this light source.  This
     * is usually as simple as choosing the one with the shortest
     * distance.  Ties are broken by looking ahead to the next
     * ray's intersections with the two segments.  Ultimate ties
     * always go to segA.
     */
    Light.prototype.chooseWinner = function(nextH, distA, segA, distB, segB) {
        if ((typeof nextH === "number") && abs(distA - distB) < epsilon) {
            if (! segA) {
                return segB;
            } else if (! segB) {
                return segA;
            }
            var nextV = segA.rayIntersect(this.position, nextH);
            if (! nextV) {
                return segB;
            }
            distA = nextV.dist2;
            nextV.free();
            nextV = segB.rayIntersect(this.position, nextH);
            if (! nextV) {
                return segA;
            }
            distB = nextV.dist2;
            nextV.free();
        }
        return (distA <= distB) ? segA : segB;
    };
    
    /* Add seg to the working array and recompute "best" values. */
    Light.prototype.workingAdd = function(seg, theta, nextH) {
        var ws = workingSegs;
        ws.push(seg);
        seg.theta = undefined;  /* invalidate cached angle */
        var v = seg.rayIntersect(this.position, theta);
        if (v) {
            if (this.chooseWinner(nextH, ws.minDist, ws.bestSeg, v.dist2, seg) === seg) {
                ws.bestSeg = seg;
                ws.minDist = v.dist2;
                ws.bestX = v.x;
                ws.bestY = v.y;
            }
            v.free();
        }
    };
    
    /*
     * Maintain working segments based on a new theta angle.
     * New working segments start at index sIdx.
     */
    Light.prototype.workingAngle = function(theta, nextT, segments) {
        var ws = workingSegs;
        var sIdx = ws.sIdx;
        
        /* Maintain current best segment? */
        if (ws.bestSeg && compareAngle(ws.bestSeg.vertices[1].tailing, theta) > 0) {
            var v = ws.bestSeg.rayIntersect(this.position, theta);
            ws.minDist = v.dist2;
            ws.bestX = v.x;
            ws.bestY = v.y;
            v.free();
        } else {
            ws.bestSeg = null;
            ws.minDist = Infinity;
        }
        
        /* Prune or choose a better working segment. */
        for (var i = ws.length - 1; i >= 0; i--) {
            var seg = ws[i];
            if (seg === ws.bestSeg) {
                continue;
            } else if (compareAngle(ws[i].vertices[1].tailing, theta) <= 0) {
                ws.splice(i, 1);  /* snip */
                continue;
            }
            var v = seg.rayIntersect(this.position, theta);
            if (v) {
                if ((v.x !== seg.vertices[1].x || v.y !== seg.vertices[1].y) &&
                  this.chooseWinner(nextT, ws.minDist, ws.bestSeg, v.dist2, seg) === seg) {
                    ws.bestSeg = seg;
                    ws.minDist = v.dist2;
                    ws.bestX = v.x;
                    ws.bestY = v.y;
                }
                v.free();
            }
        }
        
        /* Append new segments to the working set. */
        for (var segs = segments, l = segs.length;
          sIdx < l && compareAngle(segs[sIdx].vertices[0].tailing, theta) === 0;
          sIdx++) {
            var s = segs[sIdx];
            if (ws.bestSeg && s.vertices[0].dist2 > ws.bestSeg.dist2 &&
              compareAngle(s.vertices[1].tailing, ws.bestSeg.vertices[1].tailing) <= 0) {
                /* The candidate segment is completely obscured by bestSeg. */
            } else if (! s.colinear()) {
                this.workingAdd(s, theta, nextT);
            }
        }
        ws.sIdx = sIdx;
    };
    
    /*
     * This light source illuminates a portion of seg.
     * Record that in the results array.
     */
    function wallSlice(seg, beginX, beginY, endX, endY, results) {
        if (wallSlice.current && seg === wallSlice.current) {
            /* Combine adjacent portions. */
            wallSlice.portion.vertices[1].x = endX;
            wallSlice.portion.vertices[1].y = endY;
            
        } else if (results) {
            /* Record the current arguments. */
            wallSlice.portion = Segment.new(beginX, beginY, endX, endY, seg.color);
            results.push(wallSlice.portion);
            // ----- An addition by ElijaKen -----
            // startFraction and endFraction represent which part of the
            // segment is illuminated
            var newSeg = wallSlice.portion;
            var v1 = seg.vertices[0], v2 = seg.vertices[1];
            var useX = Math.abs(v2.y - v1.y) < Math.abs(v2.x - v1.x);
            var startFraction = useX?
                (beginX - v1.x) / (v2.x - v1.x) : 
                (beginY - v1.y) / (v2.y - v1.y);
            var endFraction = useX?
                (endX - v1.x) / (v2.x - v1.x) : 
                (endY - v1.y) / (v2.y - v1.y);
            if (v2.x === v1.x && v2.y === v1.y) {
                newSeg.startFraction = 0;
                newSeg.endFraction = 1;
            } else {
                // Make sure startFraction is less than or equal to endFraction
                if (startFraction < endFraction) {
                    newSeg.startFraction = startFraction;
                    newSeg.endFraction = endFraction;
                } else {
                    newSeg.startFraction = endFraction;
                    newSeg.endFraction = startFraction;
                }
            }
            newSeg.parentSeg = seg;
            // if (v2.x !== beginX && v2.x !== endX || v1.x !== beginX && v1.x !== endX) {
                
            // } else {
            //     dbgr();
            // }
        }
        wallSlice.current = seg;
    }
    
    /*
     * Traces segments from angle theta to begin to angle end, both are
     * well behaved.  Optional array results is recycled and returned.
     */
    Light.prototype.doTrace = function(segments, begin, end, results, limit) {
        results = results || [];
        Segment.free(results);
        var ws = workingSegs;
        ws.bestSeg = null;
        ws.minDist = Infinity;
        if (begin > 0) {
            ws.length = 0;
        }
        for (var l = headings.length, nextH, head = headings[0], i = 0;
          head < end && i < l; i++, head = nextH) {
            nextH = headings[i];
            this.workingAngle(head, nextH, segments);
            if (head < begin) {
                continue;
            }
            var ax = ws.bestX;
            var ay = ws.bestY;
            
            if (! ws.bestSeg) {
                /* Light source is out of bounds! */
                wallSlice();
                continue;
            }
            var b = ws.bestSeg.rayIntersect(this.position, (nextH < head)  ? tau/2 : nextH);
            if (! b) {
                /* Light source is out of bounds! */
                //println("WAT! No b. " + nextH);
                break;
            }
            wallSlice(ws.bestSeg, ax, ay, b.x, b.y, results);
            b.free();
            if (i >= limit) {
                break;
            }
        }
        wallSlice();  /* flush */
        return results;
    };
    
    /*
     * Traces segments from angle theta to angle theta+delta, specified in radians.
     * Optional results array is recycled and returned with traced segments.
     */
    Light.prototype.traceRadians = function(segments, theta, delta, results, limit) {
        if (delta < 0) {
            return this.traceRadians(segments, theta + delta, -delta, results, limit);
        } else if (delta === 0) {
            delta = 1/1024/16;
            theta = (theta > 0) ? (theta - delta) : theta;
        }
        if (typeof theta !== "number" || delta >= tau) {
            theta = -tau/2;
            delta = tau;
        }
        delta = (typeof delta === "number") ? min(delta, tau) : tau;
        theta = ((theta %= tau) > tau/2) ? (theta - tau) : (theta < -tau/2) ? (theta + tau) : theta;
        
        if (theta + delta > tau/2) {
            /*
             * Invoke doTrace() twice, dividing the work between ±180°.
             * Avoids invoking applyTo() twice...
             */
            this.applyTo(segments, theta, tau/2, -tau/2, theta + delta - tau);
            tmpWs.push.apply(tmpWs, workingSegs);  /* workingSegs copied. */
            results = this.doTrace(segments, theta, tau/2, results, limit);
            
            workingSegs.sIdx = workingSegs.length = 0;
            workingSegs.push.apply(workingSegs, tmpWs);  /* workingSegs restored. */
            more = this.doTrace(segments, -tau/2, theta + delta - tau, more, limit);
            
            results.push.apply(results, more);  /* Two results merged into one. */
            more.length = tmpWs.length = 0;
        } else {
            this.applyTo(segments, theta, theta + delta);
            results = this.doTrace(segments, theta, theta + delta, results, limit);
        }
        return results;
    };
    
    return Light;
})();
Light.safeNew = whatNewDoes; // Deleak

/** Game functions (play scene helpers) **/
// A levelMap is what is stored in the levels array
// A levelArray is a 2d array of objects with things like the direction of spikes
// A levelObj is either one

// A ton of helpers
function getEmptyArray() {
    return emptyArrays.length > 0? emptyArrays.pop() : [];
}

function saveEmptyArray(arr) {
    arr.length = 0;
    if (emptyArrays.length < maxEmptyArrays) {
        emptyArrays.push(arr);
    }
}

function getSpikeDirection(around) {
    if (!around) {
        return "up";
    } else if (around.down) {
        return "up";
    } else if (around.left && !around.right) {
        return "right";
    } else if (around.right && !around.left) {
        return "left";
    } else if (around.up) {
        return "down";
    } else {
        return "up";
    }
}

function getBlockAt(levelObj, c, r, defaultType) {
    defaultType = defaultType === undefined? "empty" : defaultType;
    return levelObj && levelObj[r] && levelObj[r][c] || defaultType;
}

function getFullName(char, around) {
    var isLowerCase = char === char.toLowerCase();
    if (isLowerCase) {
        if (char === "-") {
            return "empty";
        } else if (char === "$") {
            return "player";
        } else if (char === "@") {
            return "portal";
        } else if (lightColorsByLetter[char.toLowerCase()]) {
            return char.toLowerCase() + " block";
        } else if (Number(char) <= 7) { // NaN <= 7 is false
            var colorChar = lightColorsArray[Number(char) - 1].letter;
            return colorChar + " jewel";
        } else {
            error("Unknown letter in level map: '" + char + "' (at getFullName)"); 
        }
    } else if (lightColorsByLetter[char.toLowerCase()]) {
        // Is a spike
        return char.toLowerCase() + " spike " + getSpikeDirection(around);
    } else {
        error("Unknown letter in level map: '" + char + "' (at getFullName)"); 
    }
}

function getLvlArray() {
    return currentLevelArrays[currentLightColor] || getEmptyArray();
}

function getScreenX(blockX, player) {
    return (blockX - player.x - player.w/2) * blockSize + width/2;
}

function getScreenY(blockY, player) {
    return (blockY - player.y - player.h/2) * blockSize + height/2;
}

function canEnterPortal() {
    return jewels.x.length === 0;
}

function boxHitBox(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
}

// Three very similar functions.
function addPoly(segments, type, x, y, w, h, around, clr) {
    if (!around) {
        error("addPoly was passed a falsy value for around: " + around);
    }
    if (type.includes("block")) {
        if (!around.up) {
            segments.push(Segment.new(x, y, x + w, y, clr));
        }
        if (!around.down) {
            segments.push(Segment.new(x, y + h, x + w, y + h, clr));
        }
        if (!around.left) {
            segments.push(Segment.new(x, y, x, y + h, clr));
        }
        if (!around.right) {
            segments.push(Segment.new(x + w, y, x + w, y + h, clr));
        }
    } else if (type.includes("spike")) {
        var firstLength = segments.length;
        var dir = type.slice(type.lastIndexOf(" ") + 1);
        
        if (dir === "up") {
            segments.push(
                Segment.new(x + w/2, y, x, y + h, clr),
                Segment.new(x + w, y + h, x + w/2, y, clr)
            );
            if (!around.down) {
                segments.push(Segment.new(x, y + h, x + w, y + h, clr));
            }
        } else if (dir === "down") {
            segments.push(
                Segment.new(x + w/2, y + h, x, y, clr),
                Segment.new(x + w, y, x + w/2, y + h, clr)
            );
            if (!around.up) {
                segments.push(Segment.new(x, y, x + w, y, clr));
            }
        } else if (dir === "left") {
            segments.push(
                Segment.new(x, y + h/2, x + w, y + h, clr),
                Segment.new(x + w, y, x, y + h/2, clr)
            );
            if (!around.right) {
                segments.push(Segment.new(x + w, y, x + w, y + h, clr));
            }
        } else if (dir === "right") {
            segments.push(
                Segment.new(x + w, y + h/2, x, y, clr),
                Segment.new(x, y + h, x + w, y + h/2, clr)
            );
            if (!around.left) {
                segments.push(Segment.new(x, y, x, y + h, clr));
            }
        } else {
            error("Unknown spike direction: " + dir);
        }
        var lenDiff = segments.length - firstLength;
        for (var i = firstLength; i < segments.length; i++) {
            segments[i].color = segments[i].color | 0x1000000;
        }
    } else if (type !== "empty" && type !== "portal" && type !== "player") {
        error("Unknown block type: " + type);
    }
}

function drawPoly(type, x, y, w, h, lightColor) {
    // Draw the shape
    if (type.includes("block")) {
        // Color the block
        var colors = lightColorsByLetter;
        var clr = colors[type[0]].hex & colors[lightColor].hex;
        noStroke();
        fill(toKAColor(clr));
        
        // Draw the block
        beginShape();
        vertex(x, y);
        vertex(x + w, y);
        vertex(x + w, y + h);
        vertex(x, y + h);
        endShape(CLOSE);
    } else if (type.includes("spike")) {
        // Color the spike
        var clr = lightColorsByLetter[type[0]].hex & 
            lightColorsByLetter[lightColor].hex;
        noStroke();
        fill(toKAColor(clr));
        
        // Read its direction
        var dir = type.slice(type.lastIndexOf(" ") + 1);
        
        // Draw it
        if (dir === "up") {
            beginShape();
            vertex(x + w/2, y);
            vertex(x + w, y + h);
            vertex(x, y + h);
            endShape(CLOSE);
        } else if (dir === "down") {
            beginShape();
            vertex(x + w/2, y + h);
            vertex(x + w, y);
            vertex(x, y);
            endShape(CLOSE);
        } else if (dir === "left") {
            beginShape();
            vertex(x, y + h/2);
            vertex(x + w, y);
            vertex(x + w, y + h);
            endShape(CLOSE);
        } else if (dir === "right") {
            beginShape();
            vertex(x + w, y + h/2);
            vertex(x, y + h);
            vertex(x, y);
            endShape(CLOSE);
        } else {
            error("Unknown spike direction: " + dir);
        }
    } else if (type === "empty" || type === "player" || 
            type.includes("portal") || type.includes("jewel")) {
        return;
    } else {
        error("Unknown block type: " + type);
    }
}

function getSpikePoints(dir, x, y, w, h, oldSpikePoints) {
    if (!oldSpikePoints) {
        oldSpikePoints = [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0}
        ];
    }
    if (dir === "up") {
        oldSpikePoints[0].x = x + w/2;
        oldSpikePoints[0].y = y;
        oldSpikePoints[1].x = x + w;
        oldSpikePoints[1].y = y + h;
        oldSpikePoints[2].x = x;
        oldSpikePoints[2].y = y + h;
    } else if (dir === "down") {
        oldSpikePoints[0].x = x + w/2;
        oldSpikePoints[0].y = y + h;
        oldSpikePoints[1].x = x + w;
        oldSpikePoints[1].y = y;
        oldSpikePoints[2].x = x;
        oldSpikePoints[2].y = y;
    } else if (dir === "left") {
        oldSpikePoints[0].x = x;
        oldSpikePoints[0].y = y + h/2;
        oldSpikePoints[1].x = x + w;
        oldSpikePoints[1].y = y;
        oldSpikePoints[2].x = x + w;
        oldSpikePoints[2].y = y + h;
    } else if (dir === "right") {
        oldSpikePoints[0].x = x + w;
        oldSpikePoints[0].y = y + h/2;
        oldSpikePoints[1].x = x;
        oldSpikePoints[1].y = y + h;
        oldSpikePoints[2].x = x;
        oldSpikePoints[2].y = y;
    } else {
        error("Unknown spike direction: " + dir);
    }
    return oldSpikePoints;
}

// "Lit" as in "lit up by a light ray"
// Returns an object with x and y OR false
function touchesLitBlock(x, y, w, h, levelArray, type) {
    // Test if the given character touches that type of block.
    var minX = Math.floor(x);
    var maxX = Math.ceil(x + w) - 1;
    var minY = Math.floor(y);
    var maxY = Math.ceil(y + h) - 1;
    
    // Set playerPoints
    if (!playerPoints) {
        playerPoints = [{},{},{},{}];
    }
    playerPoints[0].x = x;
    playerPoints[0].y = y;
    playerPoints[1].x = x + w;
    playerPoints[1].y = y;
    playerPoints[2].x = x + w;
    playerPoints[2].y = y + h;
    playerPoints[3].x = x;
    playerPoints[3].y = y + h;
    
    // Loop over level
    for (var r = minY; r <= maxY; r++) {
        for (var c = minX; c <= maxX; c++) {
            var blockType = getBlockAt(levelArray, c, r, "empty");
            if (!blockType) {
                error("getBlockAt returned a falsy value: " + blockType);
            }
            if (type === "block" && blockType.includes("block")) {
                var blockColor = blockType[0];
                var currentLight = lightColorsByLetter[currentLightColor].hex;
                var illuminated = currentLight & lightColorsByLetter[blockColor].hex;
                if (illuminated !== 0) {
                    // Potential memory leak!
                    return {x: c, y: r};
                }
            } else if (type === "portal" && blockType.includes("portal")) {
                return {x: c, y: r};
            } else if (type === "spike" && blockType.includes("spike")) {
                var blockColor = blockType[0];
                var currentLight = lightColorsByLetter[currentLightColor].hex;
                var illuminated = currentLight & lightColorsByLetter[blockColor].hex;
                var dir = blockType.slice(blockType.lastIndexOf(" ") + 1);
                if (illuminated !== 0) {
                    spikePoints = getSpikePoints(dir, c, r, 1, 1, spikePoints);
                    if (polygonPolygonCollide(spikePoints, playerPoints)) {
                        // Potential memory leak!
                        return {x: c, y: r};
                    }
                }
            }
        }
    }
    return false;
}

// Load level
// Takes in a levelMap, returns a levelArray
function loadLevel(levelMap, levelSegments, lightColor) {
    // In case blockSize was incorrectly initialized
    blockSize = Math.max(width / 20, height / 20);
    var levelArray = getEmptyArray();
    var levelWidth = levelMap[0] && levelMap[0].length || 0;
    var levelHeight = levelMap.length;
    var firstLightColor = lightColorsArray[0].letter;
    // Helpers
    var lightHex = lightColorsByLetter[lightColor].hex;
    function isIlluminated(c) {
        return !lightColorsByLetter[c] || 
            ((lightColorsByLetter[c].hex & lightHex) !== 0);
    }
    function isBlockAt(c, r) {
        var char = getBlockAt(levelMap, c, r, "-");
        return !!lightColorsByLetter[char[0]];
    }
    function isLitBlockAt(c, r) {
        var char = getBlockAt(levelMap, c, r, "-");
        return !!lightColorsByLetter[char[0]] && isIlluminated(char[0]);
    }
    // For spikes
    if (!around) {
        around = { up: null, down: null, left: null, right: null };
    }
    // Loop
    for (var r = 0; r < levelMap.length; r++) {
        var row = levelMap[r] || "";
        levelArray[r] = getEmptyArray();
        levelWidth = Math.max(levelWidth, levelMap[r].length);
        for (var c = 0; c < row.length; c++) {
            // Reading the surrounding cells (ignores light color)
            around.up = isBlockAt(c, r - 1);
            around.down = isBlockAt(c, r + 1);
            around.left = isBlockAt(c - 1, r);
            around.right = isBlockAt(c + 1, r);
            // Get the name of the cell
            var char = getBlockAt(levelMap, c, r, "-");
            var type = levelArray[r][c] = getFullName(char, around);
            if(!type){
                error("getFullName returned a falsy value (at loadLevel). " + 
                    "Input: '" + char + "'. Output: '" + type + "'.");
            }
            // Skip dark cells
            if (type.includes("block") || type.includes("spike")) {
                if (!isIlluminated(type[0])) {
                    levelArray[r][c] = "empty";
                    continue;
                }
            }
            // Check for the player
            if (type === "player") {
                player.firstX = player.x = c + (1 - player.w) / 2;
                player.firstY = player.y = r + (1 - player.h) / 2;
                player.maxFall = player.maxFallBelowLevel + levelHeight;
                // Remove the player from levelArray
                levelArray[r][c] = "empty";
                continue;
            }
            // Check for portal(s)
            if (type === "portal") {
                if (lightColor === firstLightColor) {
                    portals.x.push(c);
                    portals.y.push(r);
                }
                continue;
            }
            // Check for jewels
            if (type.includes("jewel")) {
                if (lightColor === firstLightColor) {
                    jewels.x.push(c);
                    jewels.y.push(r);
                    jewels.colors.push(type[0]);
                    jewels.allX.push(c);
                    jewels.allY.push(r);
                    jewels.allColors.push(type[0]);
                }
                continue;
            }
            // Reading the surrounding cells again using light color
            around.up = isLitBlockAt(c, r - 1);
            around.down = isLitBlockAt(c, r + 1);
            around.left = isLitBlockAt(c - 1, r);
            around.right = isLitBlockAt(c + 1, r);
            // Add Segments
            if (type.includes("block") || type.includes("spike")) {
                var squareColor = lightColorsByLetter[levelArray[r][c][0]];
                squareColor = squareColor && squareColor.hex;
                addPoly(levelSegments, levelArray[r][c], 
                    c * blockSize, r * blockSize, blockSize, blockSize, 
                    around, squareColor);
            }
        }
    }
    
    // Add level-encasing segments
    var margin = Math.max(player.maxFall, player.jumpHeight) * blockSize + 
        Math.max(width, height);
    var lvlPxW = levelWidth * blockSize;
    var lvlPxH = levelHeight * blockSize;
    levelSegments.push(
        Segment.new(-margin, -margin, lvlPxW + margin*2, -margin, 0),
        Segment.new(lvlPxW + margin*2, -margin, lvlPxW + margin*2, lvlPxH + margin*2, 0),
        Segment.new(lvlPxW + margin*2, lvlPxH + margin*2, -margin, lvlPxH + margin*2, 0),
        Segment.new(-margin, lvlPxH + margin*2, -margin, -margin, 0)
    );
    
    // Set the max portal particles (and jewel particles)
    portalParticles.count = portalParticles.countPer * portals.x.length;
    jewelParticles.count = jewelParticles.countPer * jewels.x.length;
    
    // Return (finally!)
    return levelArray;
}

// Particle helpers
function addParticle(p, x, y, i) {
    i = i || p.x.length;
    if (p.x.length < p.count && !decreaseLag) {
        p.x[i] = x;
        p.y[i] = y;
        p.vx[i] = random(p.minVX, p.maxVX);
        p.vy[i] = random(p.minVY, p.maxVY);
        p.ages[i] = p.age || random(p.minAge, p.maxAge);
    }
}

function removeParticle(particlesObj, index) {
    // Remove the particle without leaking memory
    var p = particlesObj, i = index;
    if (i === p.x.length - 1) {
        p.x.length = i;
        p.y.length = i;
        p.vx.length = i;
        p.vy.length = i;
        p.ages.length = i;
    } else {
        p.x[i] = p.x.pop();
        p.y[i] = p.y.pop();
        p.vx[i] = p.vx.pop();
        p.vy[i] = p.vy.pop();
        p.ages[i] = p.ages.pop();
    }
}

function initParticles(particlesObj, x, y) {
    if (particlesObj && !decreaseLag) {
        var p = particlesObj;
        for (var i = 0; i < p.count; i++) {
            addParticle(p, x, y, i);
        }
    }
}

function clearParticles(particlesObj) {
    if (particlesObj) {
        particlesObj.x.length = 0;
        particlesObj.y.length = 0;
        particlesObj.vx.length = 0;
        particlesObj.vy.length = 0;
    }
}

function updateParticles(particlesObj) {
    if (particlesObj && !decreaseLag) {
        var p = particlesObj;
        // Iterate backward to handle removal correctly
        for (var i = p.x.length; i-- > 0;) {
            p.vy[i] += p.gravity;
            p.x[i] += p.vx[i];
            p.y[i] += p.vy[i];
            p.ages[i]--;
            if (p.ages[i] < 0) {
                removeParticle(p, i);
            }
        }
    }
}

function drawParticles(particlesObj) {
    if (particlesObj && !decreaseLag) {
        var p = particlesObj;
        var pColor = p.color || p.getColor && p.getColor() || 100;
        noStroke();
        for (var i = 0; i < p.x.length; i++) {
            var alpha = map(p.ages[i], 0, p.maxAge || p.age, 
                p.minOpacity || 0, p.maxOpacity || 255);
            fill(pColor, alpha);
            ellipse(
                getScreenX(p.x[i], player),
                getScreenY(p.y[i], player),
                p.size, p.size
            );
        }
    }
}

// Related jewel helper
function removeJewel(index) {
    // Remove the particle without leaking memory
    var j = jewels, i = index;
    if (i === j.x.length - 1) {
        j.x.length = i;
        j.y.length = i;
        j.colors.length = i;
    } else {
        j.x[i] = j.x.pop();
        j.y[i] = j.y.pop();
        j.colors[i] = j.colors.pop();
    }
}

// Player splash particles only
function spawnSplash(count, relativeX, relativeY) {
    if (playerParticles && !decreaseLag) {
        var x = player.x + player.w * 0.5 + (relativeX || 0);
        var y = player.y + player.h * 0.5 + (relativeY || 0);
        relativeY = relativeY || 0;
        var p = playerParticles, index = p.x.length;
        for (var i = 0; i < count && p.x.length < p.count; i++, index++) {
            addParticle(p, x, y, index);
        }
    }
}

// Game play
function updatePlayer(levelArray, player) {
    // For easier access
    var p = player;
    p.isStuck = false; // Clears this every frame
    
    // Compute jumpSpeed
    p.jumpSpeed = Math.sqrt(2 * p.gravity * p.jumpHeight);
    
    // Compute updated variables
    var yMotion = constrain(p.yVelocity + 0.5 * p.gravity, -1, 1);
    var newYVelocity = p.yVelocity + p.gravity;
    
    // Test if stuck
    var isStuck = touchesLitBlock(p.x, p.y, p.w, p.h, levelArray, "block");
    if (isStuck) {
        // Player freezes until light color changes again
        p.yVelocity = 0;
        p.isStuck = getBlockAt(levelArray, isStuck.x, isStuck.y, "empty") || true;
        // Don't update any more
        return;
    }
    
    // Test if on ground (compute before x motion for smoother experience)
    var newY = p.y + yMotion;
    var onGround = touchesLitBlock(p.x, newY, p.w, p.h, levelArray, "block");
    
    // X motion
    var newX = p.x;
    var gap = (1 - p.w) / 2;
    if (keys[LEFT] || keys.s) { newX -= p.runSpeed; }
    if (keys[RIGHT] || keys.f) { newX += p.runSpeed; }
    if (keys[DOWN] || keys.d) { newX = Math.round(p.x - gap) + gap; }
    // Limit x motion to the allowed speed
    newX = constrain(newX, p.x - p.runSpeed, p.x + p.runSpeed);
    // Particle half size (to help keep them entirely under the player)
    var particleSize = playerParticles.size / (2 * blockSize);
    // Visual direction
    if (p.x !== newX) {
        p.currentDir = newX < p.x? LEFT : RIGHT;
    }
    // X collisions
    var touchX = touchesLitBlock(newX, p.y, p.w, p.h, levelArray, "block");
    if (touchX) {
        if (p.x < touchX.x) {
            // Hit left side of block
            newX = touchX.x - p.w;
            if (p.x !== newX || !onGround) {
                spawnSplash(p.x !== newX? 10 : 1, p.w/2-particleSize, 0);
            }
        } else {
            // Hit right side of block
            newX = touchX.x + 1; // 1 = block width
            if (p.x !== newX || !onGround) {
                spawnSplash(p.x !== newX? 10 : 1, -p.w/2+particleSize, 0);
            }
        }
    }
    // Particle effect
    var xMotion = Math.abs(p.x - newX);
    if (xMotion > 0 && onGround) {
        spawnSplash(1, 0, p.h/2-particleSize);
    }
    p.x = newX; // Update position
    
    // Y motion / collision
    var touchY = touchesLitBlock(p.x, newY, p.w, p.h, levelArray, "block");
    if (touchY) {
        if (p.y > touchY.y) {
            // Hit underside of block
            var numParticles = Math.floor(Math.abs(newYVelocity*70));
            if (numParticles > 0) {
                spawnSplash(numParticles, 0, -p.h/2+particleSize);
            }
            // Stop the player
            newY = touchY.y + 1;
            newYVelocity = 0;
        } else if (p.y <= touchY.y) {
            // Hit top of block
            var numParticles = Math.floor(Math.abs(newYVelocity*70));
            // Stop the player
            newY = touchY.y - p.h;
            newYVelocity = 0;
            if (keys[UP] || keys.e || keys[" "]) {
                // Jump
                newYVelocity = -p.jumpSpeed;
                numParticles += Math.floor(Math.abs(newYVelocity*70));
            }
            // Particles
            if (numParticles > 0) {
                spawnSplash(numParticles, 0, p.h/2-particleSize);
            }
        }
    }
    p.y = newY; // Update position
    p.yVelocity = newYVelocity;
}

// Drawing functions for the player, portal, and jewels
function drawPortal(x, y, drawDarkPortal, portalSize) {
    var portalX = x, portalY = y;
    var portalImg = drawDarkPortal? cachedImages.portalDark : cachedImages.portal;
    portalSize = portalSize || blockSize * 2;
    if (portalImg) {
        imageMode(CENTER);
        image(portalImg, portalX, portalY, portalSize, portalSize);
    } else {
        var color1 = drawDarkPortal? portals.color1Dark : portals.color1;
        var color2 = drawDarkPortal? portals.color2Dark : portals.color2;
        var numRings = 5;
        for (var i = 0; i < numRings; i++) {
            var ringColor = i % 2 === 0? color1 : color2;
            var ringSize = blockSize - i * blockSize / numRings;
            fill(ringColor);
            ellipse(portalX, portalY, ringSize, ringSize);
        }
    }
}

// function drawJewels() {
//     var lightHex = lightColorsByLetter[currentLightColor].hex;
//     var jewelTimer = storage().jewelTimer;
//     // Only draw jewel *ring* if light color matches jewel color
//     for (var i = 0; i < jewels.x.length; i++) {
//         var jewelBounce = Math.sin((jewelTimer + i*2) * 0.1) * 0.1;
//         var jewelPulse = Math.cos((jewelTimer + i*2) * 0.05) * 0.09;
//         var jewelX = getScreenX(jewels.x[i] + 0.5, player);
//         var jewelY = getScreenY(jewels.y[i] + 0.5 + jewelBounce, player);
//         var jewelColor = jewels.colors[i];
//         var jewelLabel = "jewel_" + jewelColor;
//         var jewelHex = lightColorsByLetter[jewelColor].hex;
//         var drawRing = (jewelHex & lightHex) !== 0;
        
//         // Ring
//         if (drawRing) {
//             var ringSize = blockSize*1.5 + blockSize*jewelPulse;
//             stroke(jewels.strokeColor, 20);
//             strokeWeight(blockSize*0.2);
//             noFill();
//             ellipse(jewelX, jewelY, ringSize, ringSize);
//         }
        
//         // Jewel
//         if (cachedImages[jewelLabel]) {
//             imageMode(CENTER);
//             image(cachedImages[jewelLabel], jewelX, jewelY, blockSize*2, blockSize*2);
//         } else {
//             var js = blockSize, x = jewelX, y = jewelY;
//             var hexColor = lightColorsByLetter[jewels.colors[i]].hex;
//             var jewelColor = toKAColor2(hexColor, jewels.normalDarken);
//             stroke(jewels.strokeColor);
//             strokeWeight(js*0.05);
//             fill(jewelColor);
//             strokeCap(ROUND);
//             strokeJoin(ROUND);
//             // Jewel shape (starts and begins at top middle)
//             beginShape();
//             vertex(js, js*0.7);
//             vertex(js*1.2, js*0.7);
//             vertex(js*1.4, js*0.9);
//             vertex(js, js*1.4);
//             vertex(js*0.6, js*0.9);
//             vertex(js*0.8, js*0.7);
//             endShape(CLOSE);
//             // Extra lines
//             line(js*0.6, js*0.9, js*1.37, js*0.9);
//             line(js*1.10, js*0.7, js*1.18, js*0.9);
//             line(js*0.9, js*0.7, js*0.82, js*0.9);
//             line(js*1.18, js*0.9, js, js*1.4);
//             line(js*0.82, js*0.9, js, js*1.4);
//         }
        
//         // Colorblind mode
//         if (colorblindMode) {
//             var squareObj = lightColorsByLetter[jewelColor];
//             if (squareObj) {
//                 fill(255, 255, 255);
//                 text(squareObj.letter, jewelX, jewelY + blockSize*0.7);
//             }
//         }
//     }
// }

function drawJewel(x, y, i, s) {
    s = s === undefined? blockSize : s;
    var lightHex = lightColorsByLetter[currentLightColor].hex;
    var jewelTimer = storage().jewelTimer;
    var jewelBounce = Math.sin((jewelTimer + i*2) * 0.1) * 0.1;
    var jewelPulse = Math.cos((jewelTimer + i*2) * 0.05) * 0.09;
    var jewelX = x;
    var jewelY = y + jewelBounce * s;
    var jewelColor = jewels.colors[i];
    var jewelLabel = "jewel_" + jewelColor;
    var jewelHex = lightColorsByLetter[jewelColor].hex;
    var drawRing = (jewelHex & lightHex) !== 0;
    
    // Ring
    if (drawRing) {
        var ringSize = s*1.5 + s*jewelPulse;
        stroke(jewels.strokeColor, 20);
        strokeWeight(s*0.2);
        noFill();
        ellipse(jewelX, jewelY, ringSize, ringSize);
    }
    
    // Jewel
    if (cachedImages[jewelLabel]) {
        imageMode(CENTER);
        image(cachedImages[jewelLabel], jewelX, jewelY, s*2, s*2);
    } else {
        var js = s, x = jewelX, y = jewelY;
        var hexColor = lightColorsByLetter[jewels.colors[i]].hex;
        var jewelColor = toKAColor2(hexColor, jewels.normalDarken);
        stroke(jewels.strokeColor);
        strokeWeight(js*0.05);
        fill(jewelColor);
        strokeCap(ROUND);
        strokeJoin(ROUND);
        // Jewel shape (starts and begins at top middle)
        beginShape();
        vertex(js, js*0.7);
        vertex(js*1.2, js*0.7);
        vertex(js*1.4, js*0.9);
        vertex(js, js*1.4);
        vertex(js*0.6, js*0.9);
        vertex(js*0.8, js*0.7);
        endShape(CLOSE);
        // Extra lines
        line(js*0.6, js*0.9, js*1.37, js*0.9);
        line(js*1.10, js*0.7, js*1.18, js*0.9);
        line(js*0.9, js*0.7, js*0.82, js*0.9);
        line(js*1.18, js*0.9, js, js*1.4);
        line(js*0.82, js*0.9, js, js*1.4);
    }
    
    // Colorblind mode
    if (colorblindMode) {
        var squareObj = lightColorsByLetter[jewelColor];
        if (squareObj) {
            fill(255, 255, 255);
            text(squareObj.letter, jewelX, jewelY + s*0.7);
        }
    }
}

function drawJewels() {
    // Only draw jewel *ring* if light color matches jewel color
    for (var i = 0; i < jewels.x.length; i++) {
        drawJewel(
            getScreenX(jewels.x[i] + 0.5, player), 
            getScreenY(jewels.y[i] + 0.5, player),
            i
        );
    }
}

function drawPlayer(x, y, w, h) {
    var s = blockSize;
    var bob = (storage().playerBob || 0);
    var bobY = Math.sin(bob * 0.2)*0.6 - player.yVelocity*0.015*height;
    var bobX = -bobY;
    // Draw the body (scaled for bob effect)
    // Scale
    pushMatrix();
    translate(x + w*s*0.5, y + h*s);
    scale(1 - 0.05*bobX, 1 - 0.05*bobY);
    translate(-w*s*0.5, -h*s);
    bobX = 0; bobY = 0; x = 0; y = 0;
    // Body
    noStroke();
    fill(player.isStuck ? player.stuckColor : player.color);
    myRectMode(CORNER);
    myRect(0, 0, w * s, h * s, player.r * s);
    // Eyes
    var offset = 0.1*s;
    if (player.currentDir === LEFT) {
        offset = -offset;
    }
    fill(0, 0, 0);
    ellipse(w*0.3*s + offset, h*0.3*s + bobY, w*0.15*s, h*0.15*s);
    ellipse(w*0.7*s + offset, h*0.3*s + bobY, w*0.15*s, h*0.15*s);
    popMatrix();
}

function drawStuck(a) {
    // Draw "You're stuck!" text
    fill(255, 255, 255, a || 100);
    textSize(width*0.15);
    textAlign(CENTER, CENTER);
    text("You're stuck!", width*0.5, height*0.3);
    textSize(width*0.13);
    text("Change colors\nto free yourself.", width*0.5, height*0.68);
}

function drawColorlessObjects(player) {
    if (!player) {
        error("player is undefined. (at drawPlayer)");
    }
    
    // Determine if the player is stuck
    var p = player;
    
    // Draw the player if alive
    if (deathTimer <= 0) {
        var x = width*0.5 - p.w*blockSize/2;
        var y = height*0.5 - p.h*blockSize/2;
        drawPlayer(x, y, p.w, p.h);
    }
    
    // Draw "You're stuck!" text
    if (p.isStuck) {
        drawStuck();
    }
    
    // Draw the portal(s) and their particles
    var portalCurrentlyDark = !canEnterPortal();
    if (!portalCurrentlyDark) {
        drawParticles(portalParticles);
    }
    for (var i = 0; i < portals.x.length; i++) {
        var x = getScreenX(portals.x[i] + 0.5, player);
        var y = getScreenY(portals.y[i] + 0.5, player);
        drawPortal(x, y, portalCurrentlyDark);
    }
    
    // Draw the jewels and their particles
    drawParticles(jewelParticles);
    drawJewels();
}

function getPortalImg() {
    if (cachedImages.portal && cachedImages.portalDark) {
        return;
    }
    try {
        // Determine portal type to draw
        var drawDarkPortal = !cachedImages.portalDark && (
            cachedImages.portal || !canEnterPortal());
        var color1 = portals.color1, color2 = portals.color2;
        if (drawDarkPortal) {
            color1 = portals.color1Dark;
            color2 = portals.color2Dark;
        }
        
        // Draw image
        var portalSize = 40; // Portal gets scaled later, what matters is a nice image
        var canvas = createGraphics(portalSize*2, portalSize*2, JAVA2D);
        
        // Halo effect
        drawGradient(canvas, portalSize, portalSize, 
            portalSize * 1.5 / 2, 0, color(30, 0), color(255));
        
        // Colorful part
        var numRings = 5;
        canvas.noStroke();
        for (var i = 0; i < numRings; i++) {
            var ringColor = i % 2 === 0? color1 : color2;
            var ringSize = portalSize*0.8 - i * portalSize / numRings;
            canvas.fill(ringColor);
            // The +0.5 is to counter some strange misalignment error
            canvas.ellipse(portalSize+0.5, portalSize+0.5, ringSize, ringSize);
        }
        
        // Save
        if (drawDarkPortal) {
            cachedImages.portalDark = canvas.get();
        } else {
            cachedImages.portal = canvas.get();
        }
    } catch (err) {
        reportError(err, true);
        println("Nice portal graphics failed to load.");
    }
}

function getJewelImg(jewelColorLetter) {
    if (cachedImages["jewel_" + jewelColorLetter]) {
        return;
    }
    try {
        // Draw image
        var jewelSize = 80; // Portal gets scaled later, what matters is a nice image
        var hexColor = lightColorsByLetter[jewelColorLetter].hex;
        var canvas = createGraphics(jewelSize*2, jewelSize*2, JAVA2D);
        
        // Transparent background
        canvas.background(0, 0, 0, 0);
        
        // Ring around the jewel
        var js = jewelSize;
        canvas.strokeCap(ROUND);
        canvas.strokeJoin(ROUND);
        
        // Actual jewel shape
        canvas.fill(toKAColor2(hexColor, jewels.normalDarken));
        canvas.stroke(jewels.strokeColor);
        canvas.strokeWeight(js*0.05);
        // Jewel shape (starts and begins at top middle)
        canvas.beginShape();
        canvas.vertex(js, js*0.7);
        canvas.vertex(js*1.2, js*0.7);
        canvas.vertex(js*1.4, js*0.9);
        canvas.vertex(js, js*1.4);
        canvas.vertex(js*0.6, js*0.9);
        canvas.vertex(js*0.8, js*0.7);
        canvas.endShape(CLOSE);
        // Darker jewel parts
        canvas.fill(toKAColor2(hexColor, jewels.darkDarken));
        // Left side
        canvas.beginShape();
        canvas.vertex(js, js*1.4);
        canvas.vertex(js*0.6, js*0.9);
        canvas.vertex(js*0.82, js*0.9);
        canvas.endShape(CLOSE);
        // Right side
        canvas.beginShape();
        canvas.vertex(js*1.18, js*0.9);
        canvas.vertex(js*1.4, js*0.9);
        canvas.vertex(js, js*1.4);
        canvas.endShape(CLOSE);
        // Whiter top side
        canvas.fill(toKAColor(hexColor | jewels.maskBright));
        canvas.beginShape();
        canvas.vertex(js*0.82, js*0.9);
        canvas.vertex(js*1.18, js*0.9);
        canvas.vertex(js*1.10, js*0.7);
        canvas.vertex(js*0.9, js*0.7);
        canvas.endShape(CLOSE);
        // Extra lines
        canvas.line(js*0.6, js*0.9, js*1.37, js*0.9);
        canvas.line(js*1.10, js*0.7, js*1.18, js*0.9);
        canvas.line(js*0.9, js*0.7, js*0.82, js*0.9);
        canvas.line(js*1.18, js*0.9, js, js*1.4);
        canvas.line(js*0.82, js*0.9, js, js*1.4);
        
        // Save
        cachedImages["jewel_" + jewelColorLetter] = canvas.get();
    } catch (err) {
        reportError(err, true);
        println("Nice jewel graphics failed to load.");
    }
}

// Adds portal particles
function runPortals() {
    var p = portalParticles;
    for (var i = 0; i < portals.x.length; i++) {
        var x = portals.x[i] + 0.5;
        var y = portals.y[i] + 0.5;
        addParticle(p, x, y);
    }
    // Update the particles
    updateParticles(portalParticles);
}

// Adds particles and updates bounce timer, and collision checks jewels
function runJewels() {
    for (var i = 0; i < jewels.x.length; i++) {
        var x = jewels.x[i] + 0.5;
        var y = jewels.y[i] + 0.5;
        addParticle(jewelParticles, x, y);
    }
    // Update the particles
    updateParticles(jewelParticles);
    // Update timer
    storage().jewelTimer++;
    // Collision checks
    // (only permit collection if light color matches gem color)
    var lightHex = lightColorsByLetter[currentLightColor].hex;
    var px = player.x, py = player.y, pw = player.w, ph = player.h;
    // Iterate backward to handle removal correctly
    for (var i = jewels.x.length; i-- > 0;) {
        var x = jewels.x[i];
        var y = jewels.y[i];
        var jewelHex = lightColorsByLetter[jewels.colors[i]].hex;
        var illuminated = (jewelHex & lightHex) !== 0;
        var hit = boxHitBox(px, py, pw, ph, x, y, 1, 1);
        if (hit && illuminated) {
            // Collect jewel
            removeJewel(i);
            // Spawn particle burst
            x += 0.5; y += 0.5;
            for (var cnt = 0; cnt < 50; cnt++) {
                addParticle(jewelParticles, x, y);
            }
        }
    }
}

// Helpers to advance the level
function clearAllParticles() {
    clearParticles(deathParticles);
    clearParticles(playerParticles);
    clearParticles(portalParticles);
    clearParticles(jewelParticles);
}

function clearLevelData() {
    // Clean up raycasting and level arrays
    var arrays = currentLevelArrays;
    for (var i = 0; i < lightColorsArray.length; i++) {
        var letter = lightColorsArray[i].letter;
        // Raycasting cleanup
        if (currentLevelSegments[letter]) {
            Segment.free(currentLevelSegments[letter]);
            saveEmptyArray(currentLevelSegments[letter]);
            currentLevelSegments[letter] = null;
        }
        // Level array cleanup
        if (arrays[letter]) {
            for (var r = 0; r < arrays[letter].length; r++) {
                saveEmptyArray(arrays[letter][r]);
            }
            saveEmptyArray(arrays[letter]);
            arrays[letter] = null;
        }
    }
    // Clean up player walls segments
    if (player.walls) {
        Segment.free(player.walls);
        player.walls.length = 0;
    }
    // Clean up particle systems
    clearAllParticles();
    // Clear portals and jewels
    portals.x.length = portals.y.length = 0;
    jewels.x.length = jewels.y.length = jewels.colors.length = 0;
    jewels.allX.length = jewels.allY.length = jewels.allColors.length = 0;
}

function resetGame() {
    clearLevelData();
    player.yVelocity = 0;
    internalModeVars.lightTheta = internalModeVars.lightDelta * -0.5;
    internalModeVars.isMirrored = false;
    deathTimer = 0;
    cheated = false;
    currentLevelNumber = 0;
    currentLightColor = "w";
}

function nextLevel() {
    // Advance level and clear old data
    currentLevelNumber++;
    clearLevelData();
    // Reset player
    player.yVelocity = 0;
    deathTimer = 0; // Just in case
    // Test full win
    if (currentLevelNumber >= levels.length) {
        // Reset
        changeScene("end");
        storage().cheated = cheated;
    }
    // Activate transition
    startTransition();
}

function onLose() {
    if (deathTimer <= 0) {
        deathTimer = deathLength;
        initParticles(deathParticles, player.x + player.w/2, player.y + player.h/2);
    } else if (deathTimer > 1) {
        deathTimer--;
    } else {
        deathTimer = 0;
        clearAllParticles();
        // Reset player
        player.x = player.firstX;
        player.y = player.firstY;
        player.yVelocity = 0;
        // Reset jewels
        for (var i = 0; i < jewels.allX.length; i++) {
            jewels.x[i] = jewels.allX[i];
            jewels.y[i] = jewels.allY[i];
            jewels.colors[i] = jewels.allColors[i];
        }
    }
}

function checkWinLose() {
    var p = player;
    var touchingPortal = touchesLitBlock(p.x, p.y, p.w, p.h, getLvlArray(), "portal");
    var won = canEnterPortal() && touchingPortal;
    var lost = touchesLitBlock(p.x, p.y, p.w, p.h, getLvlArray(), "spike");
    lost = lost || p.y > p.maxFall;
    if (won) {
        nextLevel();
    } else if (lost || deathTimer > 0) {
        onLose();
    }
}

// Raycast
function drawRaycastColorblindLetters(walls, levelArray) {
    textSize(blockSize * 0.7);
    fill(163, 163, 163);
    textAlign(CENTER, CENTER);
    
    // ChatGPT suggested using a map (object), I thought it was a good idea
    var blockPos = {}, keyMult = 10000;
    var s = blockSize;
    function savePt(x, y) {
        var bx = Math.ceil(x / s);
        var by = Math.ceil(y / s);
        var key = String(bx * keyMult + by);
        if (!blockPos[key]) {
            blockPos[key] = true;
        }
    }
    for (var i = 0; i < walls.length; i++) {
        var wall = walls[i];
        // Save all the blocks it touches
        savePt(wall.vertices[0].x, wall.vertices[0].y);
        savePt(wall.vertices[0].x - s, wall.vertices[0].y);
        savePt(wall.vertices[0].x - s, wall.vertices[0].y - s);
        savePt(wall.vertices[0].x, wall.vertices[0].y - s);
        
        savePt(wall.vertices[1].x, wall.vertices[1].y);
        savePt(wall.vertices[1].x - s, wall.vertices[1].y);
        savePt(wall.vertices[1].x - s, wall.vertices[1].y - s);
        savePt(wall.vertices[1].x, wall.vertices[1].y - s);
    }
    for (var key in blockPos) {
        var numKey = Number(key);
        var x = Math.floor(numKey / keyMult);
        var y = numKey - x * keyMult;
        var c = getBlockAt(levelArray, x, y, "empty");
        if (c !== "empty") {
            text(c[0], (x + 0.5) * s, (y + 0.5) * s);
        }
        delete blockPos[key]; // Free up memory
    }
}

function drawRaycast(levelSegments, levelArray) {
    if (player.light) {
        // Set the light position and delta
        var lightScreenX = (player.x + player.w/2) * blockSize;
        var lightScreenY = (player.y + player.h/2) * blockSize;
        player.light.position.x = lightScreenX;
        player.light.position.y = lightScreenY;
        player.light.delta = player.lightDelta;
        
        // Translate the visual
        pushMatrix();
        translate(
            -lightScreenX + width/2,
            -lightScreenY + height/2
        );
        
        // Run the raycast
        var walls = player.light.trace(levelSegments, player.walls);
        player.walls = walls;
        var lightColor = lightColorsByLetter[currentLightColor].hex;
        var rayColor = color(toKAColor2(lightColor, 204), 100);
        if (walls) {
            if (!decreaseLag) {
                // Visual "echo" effect, technically called parallax
                pushMatrix();
                translate(lightScreenX, lightScreenY);
                var scale1 = 1 - parallaxIntensity * 2;
                scale(scale1);
                translate(-lightScreenX, -lightScreenY);
                player.light.drawWalls(walls, lightColor, rayColor);
                
                translate(lightScreenX, lightScreenY);
                var scale2 = 1 - parallaxIntensity;
                scale(scale2 / scale1);
                translate(-lightScreenX, -lightScreenY);
                player.light.drawWalls(walls, lightColor, rayColor);
                popMatrix();
            }
            player.light.drawWalls(walls, lightColor, rayColor);
            if (colorblindMode) {
                drawRaycastColorblindLetters(walls, levelArray);
            }
        }
        
        // Pop
        popMatrix();
    } else {
        error("Failed to use light (player.light is falsy in drawRaycast)");
    }
}

// Full
function drawPlainLevel(levelArray, transparency) {
    // Colored background
    var lightColor = lightColorsByLetter[currentLightColor].hex;
    var rayColor = color(toKAColor2(lightColor, 204), transparency || 255);
    fill(rayColor);
    var margin = Math.max(player.maxFall, player.jumpHeight) * blockSize + 
        Math.max(width, height);
    rect(-margin, -margin, 
        levelArray[0].length*blockSize + margin * 2, 
        levelArray.length*blockSize + margin * 2);
    
    // Blocks
    for (var r = 0; r < levelArray.length; r++) {
        for (var c = 0; c < levelArray[r].length; c++) {
            // type, x, y, w, h, lightColor
            // Center the level on the player
            drawPoly(
                levelArray[r][c],  
                c*blockSize,
                r*blockSize,
                blockSize, blockSize, 
                currentLightColor
            );
        }
    }
}

function drawParallaxLevel(levelArray) {
    var playerScreenX = (player.x + player.w/2) * blockSize;
    var playerScreenY = (player.y + player.h/2) * blockSize;
    // Parallax effect!
    pushMatrix();
    translate(-playerScreenX+width/2, -playerScreenY+height/2);
    if (!decreaseLag) {
        pushMatrix();
        translate(playerScreenX, playerScreenY);
        var scale1 = 1 - parallaxIntensity * 2;
        scale(scale1);
        translate(-playerScreenX, -playerScreenY);
        drawPlainLevel(levelArray, 100);
        
        translate(playerScreenX, playerScreenY);
        var scale2 = 1 - parallaxIntensity;
        scale(scale2 / scale1);
        translate(-playerScreenX, -playerScreenY);
        drawPlainLevel(levelArray, 100);
        popMatrix();
    }
    drawPlainLevel(levelArray, 100);
    popMatrix();
}

function drawFullColorblindLetters(levelArray) {
    textSize(blockSize * 0.7);
    textAlign(CENTER, CENTER);
    
    var s = blockSize;
    var lightHex = lightColorsByLetter[currentLightColor].hex;
    for (var r = 0; r < levelArray.length; r++) {
        for (var c = 0; c < levelArray[r].length; c++) {
            var square = levelArray[r][c];
            var x = getScreenX(c + 0.5, player);
            var y = getScreenY(r + 0.5, player);
            var onScreen = x > -s && y > -s && x <= width && y <= height;
            if (square !== "empty" && onScreen) {
                var squareObj = lightColorsByLetter[square[0]];
                if (!squareObj) {
                    continue;
                }
                var trueSquareHex = squareObj.hex & lightHex;
                var trueSquareObj = lightColorsByHex[trueSquareHex];
                if (trueSquareHex && trueSquareObj) {
                    var char = trueSquareObj.letter;
                    if (char === "b") {
                        fill(255, 255, 255);
                    } else {
                        fill(0, 0, 0);
                    }
                    text(char, x, y);
                }
            }
        }
    }
}

function drawFull(levelArray) {
    // Level
    drawParallaxLevel(levelArray);
    // Colorblind mode
    if (colorblindMode) {
        drawFullColorblindLetters(levelArray);
    }
    // Overlay
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
}

// Circular
function getCircularImg() {
    if (cachedImages.circularOverlay) {
        return;
    }
    try {
        // Generate overlay
        var w = width/2, h = height/2;
        var canvas = createGraphics(w, h, JAVA2D);
        canvas.background(0, 0, 0, 0);
        var worked = drawGradient(canvas, w/2, h/2, w/3, 0, color(0), color(0, 0));
        if (worked) {
            cachedImages.circularOverlay = canvas.get(0, 0, w, h);
        } else {
            error("Canvas failed to load pixels (at initCircular)");
        }
    } catch (err) {
        reportError(err, true);
        println("Circular mode is currently nonfunctional.");
    }
}

function drawCircular(levelArray) {
    // Objects
    drawParallaxLevel(levelArray);
    // Colorblind mode
    if (colorblindMode) {
        drawFullColorblindLetters(levelArray);
    }
    // Overlay
    if (cachedImages.circularOverlay) {
        imageMode(CORNER);
        image(cachedImages.circularOverlay, 0, 0, width, height);
    }
}

// "Flashlight" mode (not that cool)
function drawFlashlight(levelSegments, levelArray) {
    var vars = internalModeVars;
    if (player.light) {
        // Set the light position
        player.light.position.x = (player.x + player.w/2) * blockSize;
        player.light.position.y = (player.y + player.h/2) * blockSize;
        player.light.delta = vars.lightDelta;
        player.light.theta = vars.lightTheta;
        
        // Translate the visual
        pushMatrix();
        translate(
            -(player.x + player.w/2) * blockSize + width/2,
            -(player.y + player.h/2) * blockSize + height/2
        );
        
        // Run the raycast
        var walls = player.light.trace(levelSegments, player.walls);
        player.walls = walls;
        var lightColor = lightColorsByLetter[currentLightColor].hex;
        var rayColor = toKAColor2(lightColor, 204);
        if (walls) {
            player.light.drawWalls(walls, lightColor, rayColor);
            if (colorblindMode) {
                drawRaycastColorblindLetters(walls, levelArray);
            }
        }
        
        // Pop
        popMatrix();
    } else {
        error("Failed to use light (player.light is falsy in drawFlashlight)");
    }
}

function runFlashlight() {
    var vars = internalModeVars;
    if (keys.e || keys.s || keys[LEFT]) {
        vars.lightTheta -= vars.camThetaSpeed;
    }
    if (keys.d || keys.f || keys[RIGHT]) {
        vars.lightTheta += vars.camThetaSpeed;
    }
    updatePlayer(getLvlArray(), player, false);
}

// Internal (uses raycasting) (unfinished)
function getPortalRayImg() {
    if (cachedImages.portalRay) {
        return;
    }
    try {
        // Generate ray
        var w = blockSize, h = blockSize*2;
        var canvas = createGraphics(w, h, JAVA2D);
        canvas.background(0, 0, 0, 0);
        canvas.noStroke();
        for (var i = h*0.25; i < h*0.75; i++) {
            var clr = i > h*0.5? 
                map(i, h*0.5, h*0.75, 200, 0) : 
                map(i, h*0.25, h*0.5, 0, 200);
            if (clr > 100) {
                canvas.fill(clr, clr, clr, clr*0.3);
                canvas.rect(0, i, w, 2);
            }
        }
        cachedImages.portalRay = canvas.get(0, 0, w, h);
    } catch (err) {
        reportError(err);
        println("Portal ray failed to init. Sorry.");
    }
}

// Formula for rotating found by googling
function rotateSegmentsAround(segs, cx, cy, theta, mirrorVert) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var len = segs.length;
    for (var i = 0; i < len; i++) {
        var verts = segs[i].vertices;
        var v1 = verts[0], v2 = verts[1];
        var v1x = v1.x - cx, v1y = v1.y - cy;
        var v2x = v2.x - cx, v2y = v2.y - cy;
        if (mirrorVert) {
            v1.x = v1x * cosTheta - v1y * sinTheta + cx;
            v1.y = -v1x * sinTheta - v1y * cosTheta + cy;
            v2.x = v2x * cosTheta - v2y * sinTheta + cx;
            v2.y = -v2x * sinTheta - v2y * cosTheta + cy;
        } else {
            v1.x = v1x * cosTheta - v1y * sinTheta + cx;
            v1.y = v1x * sinTheta + v1y * cosTheta + cy;
            v2.x = v2x * cosTheta - v2y * sinTheta + cx;
            v2.y = v2x * sinTheta + v2y * cosTheta + cy;
        }
    }
}

// Based on my program https://www.khanacademy.org/computer-programming/p/5664297758081024
function scaleNodeX(nodeX, nodeZ, camX, camZ, w) {
    var newX = (nodeX - camX) * w  / Math.max(nodeZ - camZ + w * 0.005, 0.5) + w * 0.5;
    return newX;
}
function scaleNodeY(nodeY, nodeZ, camY, camZ, h) {
    return (nodeY - camY) * h / Math.max(nodeZ - camZ + h * 0.005, 0.5) + h * 0.5;
}
function quadCheckerboard(c1,c2,w,h,x1,y1,x2,y2,x3,y3,x4,y4,startY,stopY,strokClr) {
    // Background
    // Vars
    var leftXDiff = x4 - x1, leftYDiff = y4 - y1;
    var rightXDiff = x3 - x2, rightYDiff = y3 - y2;
    var yStart = startY >= 0? startY <= 1? startY : 1 : 0;
    var yStop = stopY <= 1? stopY >= 0? stopY : 0 : 1;
    // Top
    var fullLeftX1 = x1 + leftXDiff * yStart;
    var fullLeftY1 = y1 + leftYDiff * yStart;
    var fullRightX1 = x2 + rightXDiff * yStart;
    var fullRightY1 = y2 + rightYDiff * yStart;
    // Bottom
    var fullLeftX2 = x1 + leftXDiff * yStop;
    var fullLeftY2 = y1 + leftYDiff * yStop;
    var fullRightX2 = x2 + rightXDiff * yStop;
    var fullRightY2 = y2 + rightYDiff * yStop;
    // Background quad
    noStroke();
    fill(c1);
    // quad(x1, y1, x2, y2, x3, y3, x4, y4);
    quad(fullLeftX1, fullLeftY1, fullRightX1, fullRightY1, 
        fullRightX2, fullRightY2, fullLeftX2, fullLeftY2);
    
    // Boxes overlay
    fill(c2);
    noStroke();
    var xPercent = 0, yPercent = 0, xCount = 0, yCount = 0;
    var xInc = 1 / w, nextX = 0, yInc = 1 / h, nextY = yPercent;
    // Thanks to Gemini for reminding me about the QUADS option
    beginShape(QUADS);
    var vert = vertex;
    // Y loop
    for (; yCount < h && yPercent < 1; yCount++, yPercent = nextY) {
        nextY = yPercent + yInc;
        var beginFraction = yPercent, endFraction = nextY;
        if (yStart > beginFraction) {
            beginFraction = yStart;
            if (yStart > endFraction) {
                continue;
            }
        }
        if (yStop < endFraction) {
            endFraction = yStop;
            if (yStop < beginFraction) {
                break;
            }
        }
        // Top
        var leftX1 = x1 + leftXDiff * beginFraction;
        var leftY1 = y1 + leftYDiff * beginFraction;
        var rightX1 = x2 + rightXDiff * beginFraction;
        var rightY1 = y2 + rightYDiff * beginFraction;
        var topXDiff = rightX1 - leftX1, topYDiff = rightY1 - leftY1;
        // Bottom
        var leftX2 = x1 + leftXDiff * endFraction;
        var leftY2 = y1 + leftYDiff * endFraction;
        var rightX2 = x2 + rightXDiff * endFraction;
        var rightY2 = y2 + rightYDiff * endFraction;
        var bottomXDiff = rightX2 - leftX2, bottomYDiff = rightY2 - leftY2;
        // X loop
        for (; xCount < w && xPercent < 1; xCount++, xPercent = nextX) {
            nextX = xPercent + xInc;
            if (((xCount ^ yCount) & 1) === 0) {
                continue;
            }
            var topLeftX = leftX1 + topXDiff * xPercent;
            var topLeftY = leftY1 + topYDiff * xPercent;
            var bottomLeftX = leftX2 + bottomXDiff * xPercent;
            var bottomLeftY = leftY2 + bottomYDiff * xPercent;
            var topRightX = leftX1 + topXDiff * nextX;
            var topRightY = leftY1 + topYDiff * nextX;
            var bottomRightX = leftX2 + bottomXDiff * nextX;
            var bottomRightY = leftY2 + bottomYDiff * nextX;
            vert(topLeftX, topLeftY);
            vert(topRightX, topRightY);
            vert(bottomRightX, bottomRightY);
            vert(bottomLeftX, bottomLeftY);
        }
        xPercent = 0;
        xCount = 0;
    }
    endShape();
    // Optional stroke
    if (strokClr !== undefined) {
        stroke(strokClr);
        noFill();
        quad(fullLeftX1, fullLeftY1, fullRightX1, fullRightY1, 
            fullRightX2, fullRightY2, fullLeftX2, fullLeftY2);
    }
}

// THIS FUNCTION MUTATES THE INPUT ARRAY! BE WARNED! (only sorting)
function drawInternalWalls(walls, player) {
    // Sort blocks back to front
    var playerX = player.light.position.x;
    var playerY = player.light.position.y;
    function compareWalls(w1, w2) {
        var v11 = w1.vertices[0], v12 = w1.vertices[1];
        var x11 = v11.x - playerX, y11 = v11.y - playerY;
        var x12 = v12.x - playerX, y12 = v12.y - playerY;
        var dist1 = (x12*x12 + y12*y12) + (x11*x11 + y11*y11);
        var v21 = w2.vertices[0], v22 = w2.vertices[1];
        var x21 = v21.x - playerX, y21 = v21.y - playerY;
        var x22 = v22.x - playerX, y22 = v22.y - playerY;
        var dist2 = (x22*x22 + y22*y22) + (x21*x21 + y21*y21);
        return dist2 - dist1;
    }
    walls.sort(compareWalls);
    
    // Sort the portals back to front
    function compareDistances(x1, y1, x2, y2) {
        var xDist1 = x1*blockSize - playerX, yDist1 = y1*blockSize - playerY;
        var xDist2 = x2*blockSize - playerX, yDist2 = y2*blockSize - playerY;
        return (xDist1*xDist1 + yDist1*yDist1) - (xDist2*xDist2 + yDist2*yDist2);
    }
    if (portals.x.length > 1) {
        var swapped = false;
        do {
            swapped = false;
            var xs = portals.x, ys = portals.y, len = xs.length;
            for (var i = 0; i < len - 1; i++) {
                var nextI = i + 1;
                var doSwap = compareDistances(xs[i], ys[i], xs[nextI], ys[nextI]) < 0;
                if (doSwap) {
                    swapped = true;
                    var temp = xs[i];
                    xs[i] = xs[nextI];
                    xs[nextI] = temp;
                    temp = ys[i];
                    ys[i] = ys[nextI];
                    ys[nextI] = temp;
                }
            }
        } while (swapped);
    }
    
    // Sort the jewels back to front (just like for portals, a simple bubble sort)
    if (jewels.x.length > 1) {
        var swapped = false;
        do {
            swapped = false;
            var xs = jewels.x, ys = jewels.y, clrs = jewels.colors, len = xs.length;
            for (var i = 0; i < len - 1; i++) {
                var nextI = i + 1;
                var doSwap = compareDistances(xs[i], ys[i], xs[nextI], ys[nextI]) < 0;
                if (doSwap) {
                    // Swap!
                    swapped = true;
                    var temp = xs[i];
                    xs[i] = xs[nextI];
                    xs[nextI] = temp;
                    temp = ys[i];
                    ys[i] = ys[nextI];
                    ys[nextI] = temp;
                    temp = clrs[i];
                    clrs[i] = clrs[nextI];
                    clrs[nextI] = temp;
                }
            }
        } while (swapped);
    }
    
    // Start by rotating all the points to be directly in front of the player
    // Also mirror if past directly overhead to keep scene right side up
    // Rotation is now computed later, to avoid mutating as much
    var vars = internalModeVars, lightT = vars.lightTheta;
    var lightD = vars.lightDelta, hlightD = lightD * 0.5;
    var toRadiansFraction = Math.PI / 180;
    var theta = -(hlightD + lightT) * toRadiansFraction;
    var mirror = vars.isMirrored;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    // Draw the segments (this runs shockingly fast)
    var w = width, h = height;
    // Wall vars
    var spikeColor = color(240, 240, 240);
    var blockColor = color(120, 120, 120);
    var cameraZ = playerX, cameraY = playerY, cameraX = 0;
    var blockWidth = blockSize*1.5;
    var currentLightHex = lightColorsByLetter[currentLightColor].hex;
    // Portal setup
    var portalSize = blockSize*2;
    var portalX = w*0.5;
    var isDark = !canEnterPortal();
    var portalRay = cachedImages.portalRay;
    // And jewel setup
    var jewelSize = blockSize*2;
    var jewelX = w*0.5;
    // The loop!
    var wallLen = walls.length, portalLen = portals.x.length, jewelLen = jewels.x.length;
    var iWall = 0, iPortal = 0, iJewel = 0, iters = 0;
    if (wallLen + portalLen + jewelLen >= 10000) {
        // Let the user know something is off
        println("How do you have over 10,000 objects in the scene?? " +
            "(On level " + currentLevelNumber + ") I refuse to render it all.");
    }
    while (iWall < wallLen || iPortal < portalLen || iJewel < jewelLen) {
        // Just in case, stop the loop if it has gone too far
        if (iters++ > 10000) {
            println("First person rendering halted for the frame.");
            break;
        }
        // Draw the parent segment, not the current one to avoid squishing bitmaps
        var seg = walls[iWall] && walls[iWall].parentSeg;
        // Compare the current wall to the current portal to see which one gets to be drawn
        var verts = seg && seg.vertices;
        var hasDrawnObject = false;
        var wallDistSq = NaN, portalDistSq = NaN, jewelDistSq = NaN;
        // Compute portal distance
        if (iPortal < portalLen) {
            // Portal dist
            var rawPortalX = portals.x[iPortal] * blockSize;
            var rawPortalY = portals.y[iPortal] * blockSize;
            var portalDistX = rawPortalX - playerX, portalDistY = rawPortalY - playerY;
            portalDistSq = portalDistX*portalDistX + portalDistY*portalDistY;
        }
        // Compute jewel distance
        if (iJewel < jewelLen) {
            // Jewel dist
            var rawJewelX = jewels.x[iJewel] * blockSize;
            var rawJewelY = jewels.y[iJewel] * blockSize;
            var jewelDistX = rawJewelX - playerX, jewelDistY = rawJewelY - playerY;
            jewelDistSq = jewelDistX*jewelDistX + jewelDistY*jewelDistY;
        }
        // Compute wall average distance
        if (seg) {
            // Wall dist
            var v1 = verts[0], v2 = verts[1];
            var x11 = v1.x - playerX, y11 = v1.y - playerY;
            var x21 = v2.x - playerX, y21 = v2.y - playerY;
            wallDistSq = ((x21*x21 + y21*y21) + (x11*x11 + y11*y11)) * 0.5;
        }
        // Consider drawing the portal
        var drawThePortal = portalDistSq && (!wallDistSq && !jewelDistSq || 
            portalDistSq > wallDistSq && portalDistSq > jewelDistSq);
        if (drawThePortal) {
            // Draw the portal {
            // Rotate
            var rawPortalX = portals.x[iPortal] * blockSize;
            var rawPortalY = portals.y[iPortal] * blockSize;
            var rotationCenterX = playerX, rotationCenterY = playerY;
            var originalX = rawPortalX - rotationCenterX;
            var originalY = rawPortalY - rotationCenterY;
            var rotPortalX, rotPortalY;
            if (mirror) {
                rotPortalX =  originalX * cosTheta - 
                    originalY * sinTheta + rotationCenterX;
                rotPortalY = -originalX * sinTheta - 
                    originalY * cosTheta + rotationCenterY;
            } else {
                rotPortalX = originalX * cosTheta - 
                    originalY * sinTheta + rotationCenterX;
                rotPortalY = originalX * sinTheta + 
                    originalY * cosTheta + rotationCenterY;
            }
            // Scale
            var portalY = scaleNodeY(rotPortalY, rotPortalX, cameraY, cameraZ, h);
            var portalWidth = scaleNodeX(
                portalSize, rotPortalX, cameraX, cameraZ, w) - w*0.5;
            // Draw, but only if this portal is in front of the player
            if (rotPortalX - cameraZ > 0) {
                imageMode(CENTER);
                if (portalRay && !isDark) {
                    // Make the ray brighter if the portal is open
                    image(portalRay, width*0.5, portalY, 
                        width, portalWidth*1);
                }
                if (portalRay) {
                    // Draw the ray
                    image(portalRay, width*0.5, portalY, 
                        width, portalWidth);
                }
                // Draw the portal!
                drawPortal(portalX, portalY, isDark, portalWidth);
            }
            // }
            iPortal++;
            hasDrawnObject = true;
        }
        // Draw the jewel?
        if (jewelDistSq && (!wallDistSq || jewelDistSq > wallDistSq)) {
            // Draw the jewel {
            // Rotate
            var rawJewelX = jewels.x[iJewel] * blockSize;
            var rawJewelY = jewels.y[iJewel] * blockSize;
            var rotationCenterX = playerX, rotationCenterY = playerY;
            var originalX = rawJewelX - rotationCenterX;
            var originalY = rawJewelY - rotationCenterY;
            var rotJewelX, rotJewelY;
            if (mirror) {
                rotJewelX =  originalX * cosTheta - 
                    originalY * sinTheta + rotationCenterX;
                rotJewelY = -originalX * sinTheta - 
                    originalY * cosTheta + rotationCenterY;
            } else {
                rotJewelX = originalX * cosTheta - 
                    originalY * sinTheta + rotationCenterX;
                rotJewelY = originalX * sinTheta + 
                    originalY * cosTheta + rotationCenterY;
            }
            // Scale
            var jewelY = scaleNodeY(rotJewelY, rotJewelX, cameraY, cameraZ, h);
            var jewelWidth = scaleNodeX(
                jewelSize, rotJewelX, cameraX, cameraZ, w) - w*0.5;
            // Draw, but only if this jewel is in front of the player
            if (rotJewelX - cameraZ > 0) {
                // Draw the jewel
                var colorLetter = jewels.colors[iJewel];
                // var jewelKey = "jewel_" + colorLetter;
                // var jewelImg = cachedImages[jewelKey];
                // var drawOutline = 
                // if (drawOutline) {
                //     noFill();
                //     strokeWeight(jewelWidth*0.07);
                //     stroke(219, 219, 219, 100);
                //     ellipse(jewelX, jewelY, jewelWidth*0.7, jewelWidth*0.7);
                // }
                // if (jewelImg) {
                //     imageMode(CENTER);
                //     image(jewelImg, jewelX, jewelY, jewelWidth, jewelWidth);
                // }
                drawJewel(jewelX, jewelY, iJewel, jewelWidth*0.5);
            }
            // }
            iJewel++;
            hasDrawnObject = true;
        }
        // Draw the wall if nothing else drawn
        if (!hasDrawnObject) {
            iWall++; // Next wall
        }
        if (seg && !hasDrawnObject) {
            // Draw the wall {
            var v1 = verts[0], v2 = verts[1];
            var baseWallColor = seg.color;
            var wallColor = baseWallColor & 0xFFFFFF & currentLightHex;
            var isSpike = baseWallColor & 0x1000000;
            
            // Rotation {
            var rotationCenterX = playerX, rotationCenterY = playerY;
            var originalv1x = v1.x - rotationCenterX;
            var originalv1y = v1.y - rotationCenterY;
            var originalv2x = v2.x - rotationCenterX;
            var originalv2y = v2.y - rotationCenterY;
            var v1x, v1y, v2x, v2y;
            if (mirror) {
                v1x =  originalv1x * cosTheta - originalv1y * sinTheta + rotationCenterX;
                v1y = -originalv1x * sinTheta - originalv1y * cosTheta + rotationCenterY;
                v2x =  originalv2x * cosTheta - originalv2y * sinTheta + rotationCenterX;
                v2y = -originalv2x * sinTheta - originalv2y * cosTheta + rotationCenterY;
            } else {
                v1x = originalv1x * cosTheta - originalv1y * sinTheta + rotationCenterX;
                v1y = originalv1x * sinTheta + originalv1y * cosTheta + rotationCenterY;
                v2x = originalv2x * cosTheta - originalv2y * sinTheta + rotationCenterX;
                v2y = originalv2x * sinTheta + originalv2y * cosTheta + rotationCenterY;
            }
            // }
            
            // Guards {
            if (!wallColor) {
                continue; // This is safe because I already incremented iWall
            }
            if (!lightColorsByHex[wallColor]) {
                error("Undefined wall color: '" + wallColor + "' (at drawInternalWalls)");
            }
            // }
            
            // Draw the quad(s) {
            // The game's x is the viewer's z
            var distance = originalv1x*originalv1x + originalv1y*originalv1y;
            var fade = Math.min(distance*0.0003, 180);
            var color1 = toKAColor2(wallColor, (isSpike? 17: 0) + fade);
            var color2 = toKAColor2(wallColor, (isSpike? 188 : 92) + fade);
            var x1 = scaleNodeX(-blockWidth, v1x, cameraX, cameraZ, w);
            var y1 = scaleNodeY(v1y, v1x, cameraY, cameraZ, h);
            var x2 = scaleNodeX( blockWidth, v1x, cameraX, cameraZ, w);
            var y2 = scaleNodeY(v1y, v1x, cameraY, cameraZ, h);
            var x3 = scaleNodeX( blockWidth, v2x, cameraX, cameraZ, w);
            var y3 = scaleNodeY(v2y, v2x, cameraY, cameraZ, h);
            var x4 = scaleNodeX(-blockWidth, v2x, cameraX, cameraZ, w);
            var y4 = scaleNodeY(v2y, v2x, cameraY, cameraZ, h);
            
            // Draw the quad, with a border
            strokeWeight(Math.min(width / (v2x - cameraZ), width * 0.01));
            quadCheckerboard(color1, color2, 6, 3, x1, y1, x2, y2, x3, y3, x4, y4,
                0, 1,
                // seg.startFraction, seg.endFraction,
                isSpike? spikeColor : blockColor);
            // }
            // }
        }
    }
}

function drawInternal(levelSegments) {
    // Draw it
    var vars = internalModeVars;
    if (player.light) {
        // Set the light position
        player.light.position.x = (player.x + player.w/2) * blockSize;
        player.light.position.y = (player.y + player.h/2) * blockSize;
        player.light.delta = vars.lightDelta;
        player.light.theta = vars.lightTheta;
        
        // Draw the background
        var lightColor = lightColorsByLetter[currentLightColor].hex;
        var rayColor = toKAColor2(lightColor, 170);
        background(rayColor);
        
        // Run the raycast
        var walls = player.light.trace(levelSegments, player.walls);
        player.walls = walls;
        if (walls) {
            drawInternalWalls(walls, player);
        }
        
        // Draw "You're stuck" text
        if (player.isStuck) {
            noStroke();
            fill(255, 255, 255, 50);
            rect(0, 0, width, height);
            drawStuck(200);
        }
    } else {
        error("Failed to use light (player.light is falsy in drawInternal)");
    }
}

function updatePlayerInternal(levelArray, player) {
    // For easier access
    var p = player, vars = internalModeVars;
    p.isStuck = false; // Clears this every frame
    
    // Compute jumpSpeed
    p.jumpSpeed = Math.sqrt(2 * p.gravity * p.jumpHeight);
    
    // Compute updated variables
    var yMotion = constrain(p.yVelocity + 0.5 * p.gravity, -1, 1);
    var newYVelocity = p.yVelocity + p.gravity;
    
    // Test if stuck
    var isStuck = touchesLitBlock(p.x, p.y, p.w, p.h, levelArray, "block");
    if (isStuck) {
        // Player freezes until light color changes again
        p.yVelocity = 0;
        p.isStuck = true;
        // Don't update any more
        return;
    }
    
    // Test if on ground (compute before x motion for smoother experience)
    var newY = p.y + yMotion;
    var onGround = touchesLitBlock(p.x, newY, p.w, p.h, levelArray, "block");
    
    // X motion
    var newX = p.x;
    var gap = (1 - p.w) / 2;
    if (vars.isMirrored) {
        if (keys[UP]) { newX -= p.runSpeed; }
        if (keys[DOWN]) { newX += p.runSpeed; }
    } else {
        if (keys[DOWN]) { newX -= p.runSpeed; }
        if (keys[UP]) { newX += p.runSpeed; }
    }
    // Limit x motion to the allowed speed
    newX = constrain(newX, p.x - p.runSpeed, p.x + p.runSpeed);
    // X collisions
    var touchX = touchesLitBlock(newX, p.y, p.w, p.h, levelArray, "block");
    if (touchX) {
        if (p.x < touchX.x) {
            // Hit left side of block
            newX = touchX.x - p.w;
        } else {
            // Hit right side of block
            newX = touchX.x + 1; // 1 = block width
        }
    }
    p.x = newX; // Update position
    
    // Y motion / collision
    var touchY = touchesLitBlock(p.x, newY, p.w, p.h, levelArray, "block");
    if (touchY) {
        if (p.y > touchY.y) {
            // Hit underside of block
            // Stop the player
            newY = touchY.y + 1;
            newYVelocity = 0;
        } else if (p.y <= touchY.y) {
            // Hit top of block
            // Stop the player
            newY = touchY.y - p.h;
            newYVelocity = 0;
            if (keys[" "]) {
                // Jump
                newYVelocity = -p.jumpSpeed;
            }
        }
    }
    p.y = newY; // Update position
    p.yVelocity = newYVelocity;
}

function runInternal() {
    var vars = internalModeVars;
    if (keys.e || keys.s || keys[LEFT]) {
        vars.lightTheta -= vars.camThetaSpeed;
    }
    if (keys.d || keys.f || keys[RIGHT]) {
        vars.lightTheta += vars.camThetaSpeed;
    }
    // Handle mirroring and modulo
    var lightT = vars.lightTheta = (vars.lightTheta + 360) % 360;
    var hlightD = vars.lightDelta * 0.5;
    var mirror = lightT > 90 - hlightD && lightT < 270 - hlightD;
    vars.isMirrored = mirror;
    // Update player
    updatePlayerInternal(getLvlArray(), player);
}

// Main game run functions (called from play scene)
function loadGame() {
    // Short-circuit
    if (currentLevelNumber >= levels.length) {
        changeScene("end", true);
        storage().cheated = cheated;
        return;
    }
    // Load all the jewels
    for (var i = 0; i < lightColorsArray.length; i++) {
        getJewelImg(lightColorsArray[i].letter);
    }
    // Init light based map for level
    // Choose a color to load
    var toLoad = null;
    var segs = currentLevelSegments;
    // Check the current light color first
    var current = currentLightColor;
    if (!segs[current] || !currentLevelArrays[current]) {
        toLoad = current;
    } else {
        // Choose another color
        for (var i = 0; i < lightColorsArray.length; i++) {
            var letter = lightColorsArray[i].letter;
            // Load the light color
            if (!segs[letter] || !currentLevelArrays[letter]) {
                toLoad = letter;
                break; // Stop because we found it
            }
        }
    }
    
    // Load it
    if (toLoad && (!segs[toLoad] || !currentLevelArrays[toLoad])) {
        segs[toLoad] = getEmptyArray();
        currentLevelArrays[toLoad] = loadLevel(
            levels[currentLevelNumber], 
            segs[toLoad],
            toLoad
        );
    }
}

function runGame() {
    // Call at beginning to avoid error in rendering function
    // Also guard to avoid errors in this function
    if (currentLevelArrays) {
        checkWinLose();
    }
    loadGame();
    // Player bob effect
    if (!player.isStuck) {
        storage().playerBob++;
    }
    // Particles
    runPortals();
    runJewels();
    updateParticles(playerParticles);
    updateParticles(deathParticles);
    // Run the game
    if (deathTimer <= 0) {
        if (isLightType("internal")) {
            runInternal();
        } else if (isLightType("flashlight")) {
            runFlashlight();
        } else {
            updatePlayer(getLvlArray(), player);
        }
    }
}

function drawGame() {
    // Init portal graphics
    getPortalImg();

    // Shake effect
    pushMatrix();
    if (deathTimer > 0) {
        var intensity = 4 * deathTimer / deathLength;
        var offsetX = Math.cos(deathTimer) * intensity;
        var offsetY = Math.cos(deathTimer * 2 + 1) * intensity;
        translate(offsetX, offsetY);
    }
    
    // Draw the level
    if (isLightType("raycast")) {
        var segs = currentLevelSegments[currentLightColor];
        if (segs) {
            drawRaycast(segs, getLvlArray());
        }
    } else if (isLightType("internal")) {
        getPortalRayImg();
        var segs = currentLevelSegments[currentLightColor];
        if (segs) {
            drawInternal(segs);
        }
    } else if (isLightType("flashlight")) {
        var segs = currentLevelSegments[currentLightColor];
        if (segs) {
            drawFlashlight(segs, getLvlArray());
        }
    } else if (isLightType("circular")) {
        getCircularImg();
        drawCircular(getLvlArray());
    } else if (isLightType("full")) {
        drawFull(getLvlArray());
    }
    
    if (!isLightType("internal")) {
        // Particles
        drawParticles(playerParticles);
        drawParticles(deathParticles);
        
        // Player and portal(s)
        drawColorlessObjects(player, getLvlArray());
    }
    
    // Death fade
    if (deathTimer > 0) {
        // Fade + whiteness
        noStroke();
        fill(255, 255, 255, 100);
        rect(0, 0, width, height);
        fill(0, 0, 0, map(deathTimer, 1, deathLength, 255, 0));
        rect(0, 0, width, height);
    }
    
    // Untransform
    popMatrix();
    
    // Level number and jewel count
    // The background for the text
    noStroke();
    fill(0, 0, 0, 100);
    myRect(0, height*0.848, width*0.18, height*0.09, 0, width*0.01, width*0.01, 0);
    // The messages
    var lvlMsg = "Level " + (currentLevelNumber + 1) + " / " + levels.length;
    var jewelsCollected = jewels.allX.length - jewels.x.length;
    var jewelMsg = "" + jewelsCollected + " / " + jewels.allX.length + " jewels";
    // The text
    fill(230, 230, 230);
    textSize(width*0.031);
    textAlign(LEFT, BOTTOM);
    text(lvlMsg, width*0.008, height*0.931);
    text(jewelMsg, width*0.008, height*0.893);
}

// Transition functions
function runTransition() {
    // Update transitionState and transitionTimer
    var t = transition;
    if (isTransitionState("done")) {
        t.timer = 0;
        return;
    } else if (t.timer <= 0) {
        if (isTransitionState("in")) {
            t.timer = t.halfTime;
        } else {
            t.timer = t.totalTime;
        }
    } else {
        t.timer--;
        if (t.timer < t.halfTime) {
            if (isTransitionState("out")) {
                setTransitionState("in");
            }
        }
        if (t.timer <= 0) {
            setTransitionState("done");
            transition.oldSceneImage = null;
        }
    }
}

function drawBoxedFadeTransition() {
    var t = transition;
    // Compute alpha diff
    var chunkSize = Math.ceil(width / 7), chunkADiff = 40;
    var chunkCount = Math.ceil(width / chunkSize);
    var chunkAlpha = (chunkCount * 2 - 1) * chunkADiff;
    var fadeAlpha = 0, inc = 1;
    if (isTransitionState("out")) {
        inc = -1;
        fadeAlpha = map(t.timer, t.halfTime, t.totalTime, 255 + chunkAlpha, 0);
    } else {
        inc = 1;
        fadeAlpha = map(t.timer, t.halfTime, 0, 255, -chunkAlpha);
    }
    // Draw it
    noStroke();
    var colors = lightColorsArray;
    for (var r = 0; r < chunkCount; r++) {
        for (var c = 0; c < chunkCount; c++) {
            var a = fadeAlpha + (r * 3 + c * 4) * inc * chunkADiff / 5;
            a = Math.max(0, Math.min(255, a));
            fill(0, 0, 0, a);
            rect(c * chunkSize, r * chunkSize, chunkSize, chunkSize);
        }
    }
}

/** Scene functions **/
// Home scene
function runHomeScene() {
    // Animation variable (animation only runs once)
    if (!storage().intro) {
        storage().intro = 0;
    }
    storage().intro += width / 400;
}
function drawHomeScene() {
    // Animation variable
    var intro = storage().intro;
    
    // Background
    background(0, 0, 0);
    noStroke();
    
    // Shake
    pushMatrix();
    var whamStartTime = width*0.43;
    var whamTime = (intro - whamStartTime) * 400 / width;
    var whamLength = 50;
    var shakeStartTime = whamStartTime + width*0.12;
    var shakeEndTime = shakeStartTime + width*0.25;
    if (intro > shakeStartTime && intro < shakeEndTime) {
        var intensity = Math.max(0, map(intro, shakeStartTime, shakeEndTime, 7, 0));
        var shakeX = Math.cos(whamTime * 0.9) * intensity;
        var shakeY = Math.sin(whamTime * 0.8 + 5) * intensity;
        translate(shakeX, shakeY);
    }
    
    // Dark gray rect
    fill(48, 48, 48);
    myRectMode(CORNER);
    myRect(width*0.115, height*0.130, width*0.75, height*0.2, width*0.04);
    
    // Upward light effect
    fill(201, 201, 0);
    beginShape();
    vertex(width*0.4, height*0.9);
    vertex(width*0.125, height*0.28);
    vertex(width*0.875, height*0.28);
    endShape(CLOSE);
    
    // Buttons and button fade in
    var startTime = width*0.41;
    if (intro > startTime) {
        Button.drawForScene("home", mouseX, mouseY);
        // Fade in overlay for buttons
        if (255 > (intro - startTime) * 3) {
            noStroke();
            fill(201, 201, 0, 255 - (intro - startTime) * 3);
            beginShape();
            vertex(width*0.4, height*0.9);
            vertex(width*0.125, height*0.28);
            vertex(width*0.875, height*0.28);
            endShape(CLOSE);
        }
    }
    
    // Light gray rect behind text
    fill(99, 99, 99);
    noStroke();
    myRect(width*0.125, height*0.125, width*0.75, height*0.2, width*0.04);
    
    // Title gray background shade
    var titleText = "Chroma";
    textSize(width*0.16);
    textAlign(CENTER, CENTER);
    fill(71, 71, 71);
    text(titleText, width*0.491, height*0.228);
    
    // Colored title (animated)
    if (intro > whamStartTime) {
        var textX = width*0.5, textY = height*0.235, textOffsetY = -height*0.01;
        var theta = Math.max(0, map(whamTime, 0, whamLength, 70, 0));
        var enlargen = Math.max(1, map(whamTime, 0, whamLength, 40, 0));
        var textAlpha = Math.min(255, map(whamTime, 0, whamLength, 0, 255));
        pushMatrix();
        translate(textX, textY);
        rotate(theta);
        scale(enlargen);
        // The actual colorful text {
        textAlign(LEFT, CENTER);
        var msg = titleText, len = msg.length, msgWidth = textWidth(msg);
        for (var i = 0; i < len; i++) {
            var xOffset = textWidth(msg.slice(0, i));
            var textColor = lightColorsOnly[i % lightColorsOnly.length];
            fill(toKAColor(textColor), textAlpha);
            text(msg[i], -msgWidth/2 + xOffset, textOffsetY);
        }
        // }
        popMatrix();
    }
    
    // Animation of light coming on screen (black rect cover)
    if (intro < height) {
        fill(0, 0, 0);
        var boxY = Math.min(0, -Math.pow(1.035, intro) * 400 / height + height*0.05);
        rect(0, boxY, width, height*0.9);
    }
    
    // Animated player
    var playerX = Math.min(-width*0.08 + intro*2, width*0.4 - blockSize/2);
    player.currentDir = RIGHT;
    drawPlayer(playerX, height*0.9 - blockSize/2, player.w, player.h);
    
    // Untransform
    popMatrix();
}

// Play scene
function runPlayScene() {
    runGame();
}
function drawPlayScene() {
    background(0, 0, 0);
    
    drawGame();
    
    Button.drawForScene("play", mouseX, mouseY);
    if (mobileMode) {
        Button.drawForScene(mobileButtons.play, undefined, undefined); 
    }
}

// Info scene
function runInfoScene() {}
function drawInfoScene() {
    background(0, 0, 0);
    
    // The info
    var howToPlayText = "Arrow keys or ESDF to move.\nDown aligns you to the column.\n\nReach the portal to move on to the next level.\nDon't hit the spikes. Press 'i' to restart a level.\n\nYou can only hit blocks/spikes that you\ncan see, so change the light color\nto get past challenging barriers.\n\nPress 1-7 or the wrgbcmy keys to change the\nlight color, or click the buttons at the top.\n\nClick \"cheat\" in the bottom left to skip a level.\nI hope you enjoy my game! Have fun!";
    
    // Draw it
    var txtSize = width*0.045, lineHeight = 1.3, paragraphDecrease = 0.7;
    fill(219, 219, 219);
    textSize(txtSize);
    textAlign(CENTER, CENTER);
    var txt = howToPlayText.split("\n");
    var y = height * 0.43 - txt.length * 0.5 * txtSize * lineHeight;
    for (var i = 0; i < txt.length; i++) {
        y += txtSize * lineHeight;
        text(txt[i], width/2, y);
        // Partly shrink paragraph breaks
        if (txt[i].length === 0) {
            y -= txtSize * lineHeight * paragraphDecrease;
        }
    }
    
    // Buttons
    Button.drawForScene("info", mouseX, mouseY);
}

// Options scene
function runOptionsScene() {}
function drawOptionsScene() {
    background(0, 0, 0);
    
    // The info
    var txt = "Choose a visibility level.\nRaycast is the best!";
    
    // Draw it
    fill(155, 255, 255);
    textSize(width*0.063);
    textAlign(CENTER, CENTER);
    text(txt, width/2, height*0.15);
    
    // Buttons
    Button.drawForScene("options", mouseX, mouseY);
}

// End scene
function runEndScene() {}
function drawEndScene() {
    background(0, 0, 0);
    
    // The stars
    var angle = storage().angle;
    storage().angle += Math.PI * 0.001;
    drawStar(width/2, height/2, 13, width/2, width*0.282, 
        color(184, 120, 0), -angle);
    drawStar(width/2, height/2, 17, width/2, width*0.282, 
        color(186, 186, 0), angle);
    
    // The message
    var youWinText = storage().cheated? 
        "You won,\nbut cheated." : 
        "You won!\nAnd you\ndidn't cheat!";
    
    // Draw it
    fill(255, 255, 255);
    textSize(width*0.075);
    textAlign(CENTER, CENTER);
    text(youWinText, width/2, height*4/9);
    
    // Buttons
    Button.drawForScene("end", mouseX, mouseY);
}

// Sub scene
function runSubScene() {
    // Print url
    if (!storage().printed) {
        _clearLogs();
        println("https://www.khanacademy.org/computer-programming/elijakens-subpage/6220424138768384");
        storage().printed = true;
    }
}
function drawSubScene() {
    background(0, 0, 0);
    
    // The message
    var txt = "Sub if you wish to\nbe notified of\nmy latest projects.";
    
    // Add a cool star
    var angle = storage().angle;
    storage().angle += Math.PI * 0.001;
    drawStar(width/2, height/2, 9, width/2, width*0.282, 
        color(0, 217, 255), angle);
    
    // Draw the text
    fill(0, 0, 0);
    textSize(width*0.06);
    textAlign(CENTER, CENTER);
    text(txt, width/2, height/2);
    
    // Buttons
    Button.drawForScene("sub", mouseX, mouseY);
}

// Restart ('are you sure?') scene
function runRestartScene() {}
function drawRestartScene() {
    background(0, 0, 0);
    
    // The message
    var txt1 = "Are you sure you want to restart?";
    var txt2 = "Your current progress will be lost.";
    
    // Draw it
    fill(255, 255, 255);
    textSize(width*0.063);
    textAlign(CENTER, CENTER);
    text(txt1, width/2, height*0.4);
    text(txt2, width/2, height*0.5);
    
    // Buttons
    Button.drawForScene("restart", mouseX, mouseY);
}

// Frame rate function
function displayFrameRate() {
    fill(168, 168, 168);
    textSize(width*0.033);
    textAlign(LEFT, TOP);
    text(Math.round(this.__frameRate), width*0.01, height*0.01);
}

// Draw my name in the lower right function
function displayMyName() {
    fill(168, 168, 168);
    textSize(width*0.033);
    textAlign(RIGHT, BOTTOM);
    text("By ElijaKen", width*0.99, height*0.99);
}

/** Defining the buttons for each scene **/
buttonsByScene = {
    "home": {
        "play": {
            x: width*0.258,
            y: height*0.348,
            w: width*0.442,
            h: height*0.105,
            keys: "p",
            message: "Play",
            onClick: changeSceneWrapped("play")
        },
        "options": {
            x: width*0.292,
            y: height*0.475,
            w: width*0.343,
            h: height*0.095,
            keys: "o",
            message: "Options",
            onClick: changeSceneWrapped("options")
        },
        "how": {
            x: width*0.324,
            y: height*0.59,
            w: width*0.225,
            h: height*0.085,
            keys: "h",
            message: "How",
            onClick: changeSceneWrapped("info")
        },
        "sub_button": {
            x: width*0.355,
            y: height*0.695,
            w: width*0.133,
            h: height*0.07,
            keys: "s",
            message: "Sub",
            onClick: changeSceneWrapped("sub")
        }
    },
    "play": Object.assign({
        /* Partly populated by loop */
        
        // More buttons
        "home": {
            x: width*0.715,
            y: height*0.026,
            w: width*0.28,
            h: height*0.04,
            r: width*0.02,
            keys: "h",
            message: "Home (h)",
            color: color(153, 153, 153, 0),
            hoverColor: color(135, 135, 135, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: changeSceneWrapped("home")
        },
        "restart_lvl": {
            x: width*0.715,
            y: height*0.066,
            w: width*0.28,
            h: height*0.04,
            r: width*0.02,
            keys: "i",
            message: "Restart level (i)",
            color: color(140, 140, 140, 0),
            hoverColor: color(135, 135, 135, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: onLose
        },
        "restart_game": {
            x: width*0.715,
            y: height*0.106,
            w: width*0.28,
            h: height*0.04,
            r: width*0.02,
            keys: "p",
            message: "Restart game (p)",
            color: color(140, 140, 140, 0),
            hoverColor: color(255, 0, 0, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: changeSceneWrapped("restart", true)
        },
        "mobile_mode": {
            x: width*0.715,
            y: height*0.146,
            w: width*0.28,
            h: height*0.04,
            r: width*0.02,
            keys: "",
            message: "Mobile mode",
            color: color(140, 140, 140, 0),
            hoverColor: color(135, 135, 135, 100),
            selectedColor: color(135, 135, 135, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: function() {
                mobileMode = !mobileMode;
            },
            isSelected: function() {
                return mobileMode;
            }, 
        },
        "cheat": {
            x: 0,
            y: height*0.938,
            w: width*0.115,
            h: height*0.063,
            r: 0,
            keys: "",
            message: "cheat",
            color: color(161, 161, 161),
            strokeWeight: 0,
            textSize: width*0.033,
            onClick: function () {
                cheated = true;
                nextLevel();
            }
        }
    }, 
        (function() {
        var highlightAlphaForLetter = {
            "w": 145,
            "r": 75,
            "g": 167,
            "b": 50,
            "c": 137,
            "m": 86,
            "y": 157,
        };
        function drawBg(letter, clr, canvas, x, y, w, h) {
            // Ellipse (highlight)
            canvas.noStroke();
            var alphaValue = highlightAlphaForLetter[letter.toLowerCase()];
            
            canvas.pushMatrix();
            canvas.translate(w*0.46, h*0.35);
            canvas.rotate(-Math.PI*0.15);
            canvas.fill(clr, alphaValue);
            canvas.ellipse(0, 0, w*0.70, h*0.6);
            canvas.popMatrix();
            
            canvas.pushMatrix();
            canvas.translate(w*0.38, h*0.27);
            canvas.rotate(-Math.PI*0.15);
            canvas.fill(clr, alphaValue);
            canvas.ellipse(0, 0, w*0.52, h*0.28);
            canvas.popMatrix();
            
            canvas.pushMatrix();
            canvas.translate(w*0.36, h*0.25);
            canvas.rotate(-Math.PI*0.15);
            canvas.fill(clr, alphaValue);
            canvas.ellipse(0, 0, w*0.30, h*0.1);
            canvas.popMatrix();
            // Letter
            canvas.fill(0, 0, 0);
            canvas.textAlign(CENTER, CENTER);
            canvas.textSize(w*0.63);
            canvas.text(letter, w*0.5, h*0.5);
        }
        var btns = {}, colors = lightColorsArray;
        var btnW = width*0.085, gap = btnW / 7;
        for (var i = 0; i < colors.length; i++) {
            var c = colors[i].letter;
            var hexColor = colors[i].hex;
            var btnColor = toKAColor2(hexColor, 32);
            var hlghtClr = toKAColor2(hexColor, -100);
            btns[c] = {
                x: width*0.025 + i * (btnW + gap),
                y: height*0.025, w: btnW, h: btnW,
                r: btnW / 2,
                keys: String(i + 1) + String(c),
                message: drawBg.bind(null, c.toUpperCase(), hlghtClr),
                color: btnColor,
                textColor: "rb".includes(c)? color(255, 255, 255) : color(0, 0, 0),
                textSize: width*0.053,
                strokeWeight: width * 0.009,
                stroke: color(1, 0, 0, 0),
                onClick: changeLightWrapped(c),
                isSelected: isLightColor.bind(null, c),
                selectedColor: btnColor,
                selectedStroke: color(143, 143, 143),
            };
        }
        return btns;
    })()),
    "info": {
        "home": {
            x: width*0.1,
            y: height*0.8,
            w: width*0.35,
            h: height*0.125,
            keys: "bh",
            message: "Home",
            onClick: changeSceneWrapped("home"),
            stroke: color(201, 201, 0)
        },
        "play": {
            x: width*0.55,
            y: height*0.8,
            w: width*0.35,
            h: height*0.125,
            keys: "p",
            message: "Play",
            onClick: changeSceneWrapped("play"),
            stroke: color(201, 201, 0)
        },
    },
    "options": {
        "raycast": {
            x: width*0.225,
            y: height*0.257,
            w: width*0.55,
            h: height*0.12,
            keys: "r",
            message: "Raycast",
            color: color(255, 255, 0),
            textSize: width*0.072,
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            onClick: function () {
                setLightType("raycast");
            },
            selectedColor: color(255, 255, 0),
            selectedStroke: color(217, 217, 217),
            isSelected: isLightType.bind(null, "raycast"),
        },
        "circular": {
            x: width*0.263,
            y: height*0.4,
            w: width*0.475,
            h: height*0.12,
            keys: "c",
            message: "Circular",
            color: color(220, 220, 90),
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            textSize: width*0.078,
            onClick: function () {
                setLightType("circular");
            },
            selectedColor: color(220, 220, 90),
            selectedStroke: color(217, 217, 217),
            isSelected: isLightType.bind(null, "circular"),
        },
        "full": {
            x: width*0.3,
            y: height*0.535,
            w: width*0.4,
            h: height*0.12,
            keys: "",
            message: "Flashlight",
            color: color(200, 200, 150),
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            textSize: width*0.078,
            onClick: function () {
                setLightType("Flashlight");
            },
            selectedColor: color(200, 200, 150),
            selectedStroke: color(217, 217, 217),
            isSelected: isLightType.bind(null, "full"),
        },
        "first person": {
            x: width*0.25,
            y: height*0.67,
            w: width*0.5,
            h: height*0.12,
            keys: "fi",
            message: "First-person",
            color: color(220, 220, 90),
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            textSize: width*0.072,
            onClick: function () {
                setLightType("internal");
            },
            selectedColor: color(220, 220, 90),
            selectedStroke: color(217, 217, 217),
            isSelected: isLightType.bind(null, "internal"),
        },
        "colorblind_mode": {
            x: width*0.01,
            y: height*0.47,
            w: width*0.25,
            h: height*0.2,
            keys: "m",
            message: "Colorblind\nmode",
            color: color(97, 97, 97),
            textColor: color(255, 255, 255),
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            textSize: width*0.045,
            onClick: function () {
                colorblindMode = !colorblindMode;
            },
            selectedColor: color(161, 161, 161),
            selectedStroke: color(255, 255, 79),
            isSelected: function() {
                return colorblindMode;
            },
        },
        "delag_mode": {
            x: width*0.75,
            y: height*0.47,
            w: width*0.24,
            h: height*0.2,
            keys: "d",
            message: "Delag\nmode",
            color: color(97, 97, 97),
            textColor: color(255, 255, 255),
            stroke: color(0, 0, 0),
            strokeWeight: width * 0.01,
            textSize: width*0.045,
            onClick: function () {
                decreaseLag = !decreaseLag;
            },
            selectedColor: color(161, 161, 161),
            selectedStroke: color(255, 255, 79),
            isSelected: function() {
                return decreaseLag;
            },
        },
        "back": {
            x: width*0.19,
            y: height*0.81,
            w: width*0.3,
            h: height*0.125,
            keys: "hb",
            message: "Back",
            color: color(171, 171, 171),
            stroke: color(0, 0, 0),
            onClick: changeSceneWrapped("home"),
        },
        "play": {
            x: width*0.51,
            y: height*0.81,
            w: width*0.3,
            h: height*0.125,
            keys: ["p", ENTER],
            message: "Play",
            color: color(171, 171, 171),
            stroke: color(0, 0, 0),
            onClick: changeSceneWrapped("play"),
        },
    },
    "end": {
        "replay": {
            x: width*0.25,
            y: height*0.625,
            w: width*0.5,
            h: height*0.15,
            keys: "rpa",
            message: "Play again",
            onClick: function() {
                resetGame();
                changeScene("play");
            },
            stroke: color(201, 201, 0),
            textSize: width*0.075
        },
        "home": {
            x: width*0.25,
            y: height*0.813,
            w: width*0.5,
            h: height*0.125,
            keys: "hb",
            message: "Home",
            onClick: changeSceneWrapped("home"),
            stroke: color(201, 201, 0),
            textSize: width*0.075
        },
    },
    "sub": {
        "back": {
            x: width*0.35,
            y: height*0.65,
            w: width*0.3,
            h: height*0.125,
            keys: "b",
            message: "Back",
            onClick: changeSceneWrapped("home"),
            stroke: color(201, 201, 0)
        },
    },
    "restart": {
        "cancel": {
            x: width*0.25,
            y: height*0.625,
            w: width*0.5,
            h: height*0.125,
            keys: "cbn",
            message: "No, go back",
            onClick: changeSceneWrapped("play", true),
            stroke: color(201, 201, 0),
            textSize: width*0.075
        },
        "continue": {
            x: width*0.25,
            y: height*0.813,
            w: width*0.5,
            h: height*0.125,
            keys: "yr",
            message: "Yes, restart",
            onClick: function () {
                resetGame();
                changeScene("play");
            },
            stroke: color(201, 201, 0),
            textSize: width*0.075
        },
    },
};
mobileButtons = {
    "play": {
        "left": {
            x: 0,
            y: height*0.7,
            w: width*0.25,
            h: height*0.3,
            message: "Left",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.07,
            onPress: function() {
                keys[LEFT] = true;
                keys[RIGHT] = false;
            },
            onRelease: function() {
                keys[LEFT] = false;
            },
            isSelected: function() {
                return keys[LEFT];
            },
            selectedColor: color(180, 180, 180, 150),
        },
        "jump1": {
            x: width*0.25,
            y: height*0.7,
            w: width*0.25,
            h: height*0.3,
            message: "Jump",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.07,
            onPress: function() {
                keys[UP] = true;
            },
            onRelease: function() {
                keys[UP] = false;
            },
            isSelected: function() {
                return keys[UP];
            },
            selectedColor: color(180, 180, 180, 150),
        },
        "jump2": {
            x: width*0.5,
            y: height*0.7,
            w: width*0.25,
            h: height*0.3,
            message: "Jump",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.07,
            onPress: function() {
                keys[UP] = true;
            },
            onRelease: function() {
                keys[UP] = false;
            },
            isSelected: function() {
                return keys[UP];
            },
            selectedColor: color(180, 180, 180, 150),
        },
        "right": {
            x: width*0.75,
            y: height*0.7,
            w: width*0.25,
            h: height*0.3,
            message: "Right",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.07,
            onPress: function() {
                keys[RIGHT] = true;
                keys[LEFT] = false;
            },
            onRelease: function() {
                keys[RIGHT] = false;
            },
            isSelected: function() {
                return keys[RIGHT];
            },
            selectedColor: color(180, 180, 180, 150),
        },
        // Freeze control buttons
        "freeze_left": {
            x: 0,
            y: height*0.5,
            w: width*0.25,
            h: height*0.2,
            message: "Freeze\nleft",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.05,
            onPress: function() {
                keys[LEFT] = !keys[LEFT];
                keys[RIGHT] = false;
            },
            isSelected: function() {
                return keys[LEFT];
            },
            selectedColor: color(180, 180, 180, 150),
        },
        "freeze_right": {
            x: width*0.75,
            y: height*0.5,
            w: width*0.25,
            h: height*0.2,
            message: "Freeze\nright",
            color: color(130, 130, 130, 100),
            textColor: color(255, 255, 255, 200),
            strokeWeight: 0,
            textSize: width*0.05,
            onPress: function() {
                keys[RIGHT] = !keys[RIGHT];
                keys[LEFT] = false;
            },
            isSelected: function() {
                return keys[RIGHT];
            },
            selectedColor: color(180, 180, 180, 150),
        },
    }
};

/** Main onload and scene logic **/
// Scene handling
var gameSceneRun = {
    "home": runHomeScene,
    "play": runPlayScene,
    "options": runOptionsScene,
    "info": runInfoScene,
    "end": runEndScene,
    "sub": runSubScene,
    "restart": runRestartScene
};
gameSceneDraw = {
    "home": drawHomeScene,
    "play": drawPlayScene,
    "options": drawOptionsScene,
    "info": drawInfoScene,
    "end": drawEndScene,
    "sub": drawSubScene,
    "restart": drawRestartScene
};
var gameSceneLoad = {
    "play": loadGame,
};

// Button init
for (var scene in buttonsByScene) {
    var buttonsInScene = buttonsByScene[scene];
    for (var name in buttonsInScene) {
        if (!(buttonsInScene[name] instanceof Button)) {
            buttonsInScene[name] = Button.safeNew(buttonsInScene[name]);
        }
    }
}
for (var scene in mobileButtons) {
    var buttonsInScene = mobileButtons[scene];
    for (var name in buttonsInScene) {
        if (!(buttonsInScene[name] instanceof Button)) {
            buttonsInScene[name] = Button.safeNew(buttonsInScene[name]);
        }
    }
}

// Storage init
changeScene(currentScene, true);
setTransitionState("done");

// Set frame rate and activate draw if needed (precaution)
frameRate(60);
loop();
myRectMode(CORNER);
strokeCap(ROUND);
strokeJoin(ROUND);

// Init player raycasting light
player.light = Light.safeNew();

// Alert the user if the width and height are different
if (width !== height) {
    var msg = 'The "width" and "height" of this program are different, ' + 
        'so some effects will look strange. Please set the program\'s' + 
        '"width" and "height" to the same value.';
    if (strictMode) {
        throw { message: msg };
    } else {
        println(msg);
        var s = Math.min(width, height);
        size(s, s, JAVA2D);
    }
}

// Env functions (and time logging)
function logT(msg) {
    var now = millis(), time = now - lastT;
    // println(msg + " took " + time + "ms");
    if (!logcachemax[msg] || logcachemax[msg] < time) { logcachemax[msg] = time; }
    if (!logcachemin[msg] || logcachemin[msg] > time) { logcachemin[msg] = time; }
    if (!logcacheavg[msg + "_time"] && !logcacheavg[msg + "_count"]) {
        logcacheavg[msg + "_time"] = 0;
        logcacheavg[msg + "_count"] = 0;
    }
    logcacheavg[msg + "_time"] += time;
    logcacheavg[msg + "_count"]++;
    lastT = now;
}

draw = function() {
    startT = lastT = millis();
    try {
        logT("start");
        if (!sceneNames.includes(currentScene)) {
            error("Error: Invalid scene name: " + currentScene);
        }
        // Debug helper
        if (keys["?"]) {
            dbgr();
        }
        logT("first checks");
        
        // Run
        if (isTransitionState("done")) {
            gameSceneRun[currentScene]();
            logT("game run: no transition");
        }
        
        // Draw and handle transitions (separate to avoid glitchyness)
        if (isTransitionState("done")) {
            gameSceneDraw[currentScene]();
            logT("game draw: no transition");
        } else if (isTransitionState("out")){
            // Show old scene image
            if (transition.oldSceneImage) {
                image(transition.oldSceneImage, 0, 0);
            }
            runTransition();
            drawBoxedFadeTransition();
            logT("game draw: transition");
        } else if (isTransitionState("in")){
            if (gameSceneLoad[currentScene]) {
                gameSceneLoad[currentScene]();
            }
            gameSceneDraw[currentScene]();
            runTransition();
            drawBoxedFadeTransition();
            logT("game draw and load: transition");
        }
        
        // Add some small additions
        displayFrameRate();
        displayMyName();
        
        // Debug (again)
        if (keys["?"]) {
            dbgr();
        }
        
        // Limit emptyArrays length
        if (emptyArrays.length > maxEmptyArrays) {
            emptyArrays.length = maxEmptyArrays;
        }
        logT("last checks and text");
        lastT = startT;
        logT("Whole frame");
    } catch (err) {
        reportError(err);
    }
};

mouseClicked = function() {
    try {
        Button.clickForScene(currentScene, mouseX, mouseY);
    } catch (err) {
        reportError(err);
    }
};

// For mobile
mousePressed = function() {
    var btns = mobileButtons[currentScene];
    if (mobileMode && btns) {
        Button.pressForScene(btns, mouseX, mouseY);
    }
};

mouseReleased = function() {
    var btns = mobileButtons[currentScene];
    if (mobileMode && btns) {
        Button.releaseForScene(btns, mouseX, mouseY);
    }
};

// For desktop
keyPressed = function() {
    keys[keyCode] = true;
    keys[key.toString()] = true;
    if (key.toString() === "o") {
        loop();
    }
    if (key.toString() === "t" ) {
        var avgs = {};
        for (var k in logcachemin) {
            avgs[k + "_avg"] = (
                logcacheavg[k + "_time"] / 
                logcacheavg[k + "_count"]).toFixed(4);
        }
        debug(logcachemin, logcachemax, avgs);
    }
    if (key.toString() === "a" ) { logcachemin = {}; logcachemax = {}; logcacheavg = {}; }
    Button.keyPressedForScene(currentScene, keys);
};

keyReleased = function() {
    keys[keyCode] = false;
    keys[key.toString()] = false;
};

// } End of program!
