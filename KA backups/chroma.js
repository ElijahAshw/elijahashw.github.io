/** 
 *  WIP, currently titled "Chroma"
 * Arrow keys or *ESDF* to move
 * Letter keys that match a light color change the light to that color (which is why I didn't use WASD)
 * 
 * I am open to suggestions for improvements (especially for graphics)!
 * 
 * Sorry for anyone who is colorblind. If you have advice about how to
 *     make this game more colorblind-friendly, I would be happy to hear it!
 * 
 * @Credit:
 * Thanks a ton to Bob Lyon. His programs have helped me very much. 
 * For this particular program of mine, I would like to credit:
 * https://en.khanacademy.org/computer-programming/2d-ray-tracing/4857083575468032
 * https://www.khanacademy.org/computer-programming/bzier-circle/1258627859
 * https://en.khanacademy.org/computer-programming/handbook-of-collisions-and-interiors/5567955982876672
 * for the ray tracing, help with the myRect functions, and perfect player-spike collisions.
 * I modified the ray tracing library slightly to permit coloring the segments.
 * 
 * I also used code from my program
 * https://www.khanacademy.org/computer-programming/myrect-better-rectangle/4561505013776384
 * in the myRect and isInMyRect functions, 
 * and the Button constructor from my game Weatherman at
 * https://www.khanacademy.org/computer-programming/weatherman-platformer/5254883940876288
 * 
 * Also thanks to ChatGPT for some help pointing out errors.
 * 
 * Thanks!
 * 
 * @TODO: {
 *    Create a die animation of some sort!
 *    Create a scene transition
 *    Add a die explosion too
 *    (done) Fix getting stuck in blocks
 *    (done) Add note on how page about key controls for light
 *    Add more comments (like how to play) at top
 *    (done) Better portal graphics
 *    (done) Scale with screen size
 *    Add more levels!!!
 * 
 *    (done) change key for white light
 *    add comments explaining the light colors
 *    Use gradients in graphics?
 *    add stepped loading for gradient image
 *    (done) add stepped loading for light colors
 *    Finish restart scene
 * }
**/

/** Variable init **/
var strictMode = true; // Prints more and crashes (on error) with this set to true
var currentScene = "home";
var lightTypes = ["full", "circular", "raycast"];
var currentLightType = "raycast";
var currentLightColor = "w";
var sceneNames = ["home", "info", "options", "play", "end", "sub", "restart"];
var blockSize = Math.max(width / 20, height / 20);
var keys = {};
var sceneStorage = {};
var sceneStorageDefaults = {
    "play": {
        level: 0
    },
    "sub": {
        printed: false
    }
};
var cachedImages = {
    // Persist across restarts to lighten cpu load
    circularOverlay: cachedImages && cachedImages.circularOverlay,
    portal: cachedImages && cachedImages.portal
};
var imageFunctions = {};
var buttonsByScene = {}; // Gets populated later
var currentLevelNumber = 0;
var currentLevelArrays = null;
var currentLevelSegments = {};
var cheated = false;
var player = {
    x: 0, y: 0, w: 0.9, h: 0.9, yVelocity: 0, 
    runSpeed: 0.1, gravity: 0.01, jumpHeight: 4.5,
    jumpSpeed: 0, // Placeholder (filled in later in the code)
    firstX: 0, firstY: 0, isStuck: false,
    maxFall: 1000, // Placeholder
    maxFallBelowLevel: 17,
    stuckColor: color(84, 84, 84),
    color: color(196, 196, 196), light: null,
    walls: null, /* For deleaking */
};
var portal = {
    x: 0, y: 0,
    color: color(207, 148, 255),
    color2: color(167, 59, 255),
};

// Light
var lightColorsArray = [
    {name: "white"  , hex: 0xFFFFFF, KAColor: color(255, 255, 255), letter: "w"},
    {name: "red"    , hex: 0xFF0000, KAColor: color(255, 0  , 0  ), letter: "r"},
    {name: "green"  , hex: 0x00FF00, KAColor: color(0  , 255, 0  ), letter: "g"},
    {name: "blue"   , hex: 0x0000FF, KAColor: color(0  , 0  , 255), letter: "b"},
    {name: "yellow" , hex: 0xFFFF00, KAColor: color(255, 255, 0  ), letter: "y"},
    {name: "cyan"   , hex: 0x00FFFF, KAColor: color(0  , 255, 255), letter: "c"},
    {name: "magenta", hex: 0xFF00FF, KAColor: color(255, 0  , 255), letter: "m"},
];
var lightColorsByHex = {};
var lightColorsByLetter = {};
var lightColorsOnly = [];
for (var colorInd = 0; colorInd < lightColorsArray.length; colorInd++) {
    var colorObj = lightColorsArray[colorInd];
    lightColorsByHex[colorObj.hex] = colorObj;
    lightColorsByLetter[colorObj.letter] = colorObj;
    lightColorsOnly.push(colorObj.hex);
}

/** Levels **/
/* Charmap:
 w,r,g,b,y,c,m: A block of that color
 W,R,G,B,Y,C,M: A spike of that color
 $: Player
 @: Portal
 -: Empty space
*/
var levels = [
    [
    "wwwwwwwwww-----------------------w",
    "w--------r-----------------------w",
    "w--------g-----------------------w",
    "w--------b-----------------------w",
    "w--------y-----------------------w",
    "wwwwwwwwwc-------------------@---w",
    "wycmbgrwwm-----------------------w",
    "wrgbycmwww-------------------r---w",
    "w------RRR-------------------r---w",
    "w----------------------------r---w",
    "w----------------------------r---w",
    "w------------------------rrrrr---w",
    "w------------------ggg-----------w",
    "w-$----------bbb-----------------w",
    "wwww---RRR-----------------------w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "w----------------------------w",
    "w--------------------------@-w",
    "w----------------------------w",
    "w----------------------------w",
    "w----------------------------w",
    "w-$--------------------------w",
    "w----------------------------w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
    [
    "w----------------------------w",
    "w--W-------------------------w",
    "w-WwW---------Y--------------w",
    "w------------YyY-------------w",
    "w------------YyY-------------w",
    "w-$----------YyY------bb---@-w",
    "w---W--RRR---YyY-BBBBBbbbb---w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwww"],
];

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

// Something(s) I just wrote
function toKAColor(c) {
    return color((c & 0xFF0000) >> 16, (c & 0xFF00) >> 8, c & 0xFF);
}

// Another handy function (mine)
function drawGradient(canvas, cx, cy, maxRadius, minRadius, color1, color2) {
    // Return boolean indicating state of success
    if (!canvas.loadPixels) { return false; }
    canvas.loadPixels();
    var pixels = canvas.imageData.data;
    var c1R = red(color1), c1G = green(color1), c1B = blue(color1), c1A = alpha(color1);
    var c2R = red(color2), c2G = green(color2), c2B = blue(color2), c2A = alpha(color2);
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            var lerpAmount = map(Math.hypot(x - cx, y - cy), minRadius, maxRadius, 0, 1);
            lerpAmount = constrain(lerpAmount, 0, 1);
            pixels[index  ] = lerp(c1R, c2R, lerpAmount);
            pixels[index+1] = lerp(c1G, c2G, lerpAmount);
            pixels[index+2] = lerp(c1B, c2B, lerpAmount);
            pixels[index+3] = lerp(c1A, c2A, lerpAmount);
        }
    }
    canvas.updatePixels();
    return true;
}

// Erroring helpers
function error(msg) {
    println(msg);
    if (strictMode) {
        throw {message: msg};
    }
}

function reportError(err, clean) {
    println("\n----------------- BEGINNING OF ERROR -----------------");
    println(err);
    debug(err);
    if (!clean) {
        if (err) {
            println(err.message);
            var stackCleanRegExp = /(\(eval at)[^)]*\)|(Drawing2D)[^]*/ig;
            // Print the stack trace, but clean it up to be more readable
            // (It contains a lot of excess information for my purposes)
            println(String(err.stack).replace(stackCleanRegExp, "($1...)"));
        }
        println("Please let the creator (ElijaKen) know about this bug.");
        if (strictMode) {
            noLoop();
            println('(Press "o" to resume play if the error is gone)');
        }
    }
}

// Debugger helper
function dbgr() {
    debugger; /* jshint ignore:line */
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


/** Scene switcher **/
function changeScene(newScene) {
    if (sceneNames.includes(newScene)) {
        currentScene = newScene;
        sceneStorage[newScene] = Object.assign(
            {},
            sceneStorage[newScene], 
            sceneStorageDefaults[newScene]
        );
        // Activate transition (TODO)
    } else {
        error("Requested invalid scene: " + newScene);
        return;
    }
}

// For convenience
function changeSceneWrapped(newScene) {
    function change() {
        changeScene(newScene);
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

function verifyLightType(lightType) {
    if (!lightTypes.includes(lightType)) {
        error("Invalid light type: " + lightType);
    }
    return lightType;
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
        this.id = "" + buttonID + " " + this.x + this.y + this.w;
        buttonID++;
        
        // Main properties
        this.onclick = config.onclick || config.onClick || function () {};
        this.message = config.message || "";
        this.keys = config.keys || "";
        
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
        if (this.strokeWeight === 0) {
            noStroke();
        } else {
            strokeWeight(this.strokeWeight);
        }
        myRect(this.x, this.y, this.w, this.h, this.r);
        
        imageMode(CORNER);
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
    
    Button.drawForScene = function(scene, mx, my) {
        if (!buttonsByScene[scene]) { return; }
        for (var name in buttonsByScene[scene]) {
            buttonsByScene[scene][name].draw(mx, my);
        }
    };
    
    Button.clickForScene = function(scene, mx, my) {
        if (!buttonsByScene[scene]) { return; }
        for (var name in buttonsByScene[scene]) {
            buttonsByScene[scene][name].mouseClicked(mx, my);
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

/** Raycasting code (Tons of credit to Bob Lyon for this) **/
// I did tweak it so that segments will store their color, and the light will obey that.

/* A "vertex" is just a point, or a rebranded PVector with more properties. */
var Vertex = (function() {
    /* The program may use any angleMode. This library uses radians. */
    var atan2 = Math.atan2;  /* All angles are in interval [ -PI .. PI ) */
    var F = (function(w) { return this[w]; })("Function");
    var freeVerts = [];

    /* Constructor: */
    var Vertex = function(x, y) {
        PVector.call(this, x, y, 0);
    };
    Vertex.prototype = Object.create(PVector.prototype);
    
    /* Free this vertex. */
    Vertex.prototype.free = function() {
        this.stamp = this.z = 0;
        freeVerts.push(this);
    };
    
    /* Recycle a freed vertex or make a new one. */
    Vertex.new = function(x, y) {
        if (freeVerts.length) {
            var v = freeVerts.pop();
            v.x = x;
            v.y = y;
            return v;
        } else {
            return new Vertex(x, y);
        }
    };
    
    /* Return a copy of this. */
    Vertex.prototype.clone = function() {
        var clone;
        if (freeVerts.length) {
            clone = freeVerts.pop();
            clone.x = this.x;
            clone.y = this.y;
        } else {
            clone = new Vertex(this.x, this.y);
        }
        clone.dist2 = this.dist2;
        clone.tailing = this.tailing;
        return clone;
    };
    
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
    var Segment = function(x1, y1, x2, y2, colour) {
        if (typeof x2 !== "number") {
            this.vertices = [ x1, y1 ];
        } else {
            this.vertices = [ Vertex.new(x1, y1), Vertex.new(x2, y2) ];
        }
        this.intersection = Vertex.new(0, 0);
        // ElijaKen's (my) addition
        this.color = colour === undefined? segmentStroke : colour;
    };
    
    /* Recycle a freed segment, or make a new one. */
    Segment.new = function(x1, y1, x2, y2, colour) {
        var s;
        if (freeSegs.length) {
            var s = freeSegs.pop();
            var vertices = s.vertices;
            if (arguments.length < 4) {
                vertices[0] = x1;  /* XXX may leak a vertex */
                vertices[1] = y1;  /* XXX same */
            } else if (vertices.length > 1) {
                vertices[0].set(x1, y1, 0);
                vertices[1].set(x2, y2, 0);
            } else {
                vertices[0] = Vertex.new(x1, y1);
                vertices[1] = Vertex.new(x2, y2);
            }
            s.color = colour; // ElijaKen's addition
        } else {
            s = new Segment(x1, y1, x2, y2, colour);
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
    Segment.prototype.colinear = function() {
        var d, a = this.vertices[0], b = this.vertices[1];
        return ((a.dist2 * b.dist2) === 0) ||
            ((d = abs((a.tailing - b.tailing) % tau)) < epsilon) ||
            (abs(d - tau/2) < epsilon);
    };
    
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
            stroke(wallColor);
            strokeWeight(1.6);
            for (var l = walls.length, i = 0; i < l; i++) {
                var v = walls[i].vertices;
                stroke(toKAColor(walls[i].color & wallColor)); // ElijaKen's addition
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
    var wallSlice = function(seg, beginX, beginY, endX, endY, results) {
        if (wallSlice.current && seg === wallSlice.current) {
            /* Combine adjacent portions. */
            wallSlice.portion.vertices[1].x = endX;
            wallSlice.portion.vertices[1].y = endY;
            
        } else if (results) {
            /* Record the current arguments. */
            wallSlice.portion = Segment.new(beginX, beginY, endX, endY, seg.color);
            results.push(wallSlice.portion);
        }
        wallSlice.current = seg;
    };
    
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

/** Game functions (play scene helpers) **/
// A levelMap is what is stored in the levels array
// A levelArray is a 2d array of objects with things like the direction of spikes
// A levelObj is either one

// A ton of helpers
function getSpikeDirection(around) {
    if (!around || around.down) {
        return "up";
    } else if (around.up) {
        return "down";
    } else if (around.left && !around.right) {
        return "right";
    } else if (around.right && !around.left) {
        return "left";
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
        }
    } else if (lightColorsByLetter[char.toLowerCase()]) {
        // Is a spike
        return char.toLowerCase() + " spike " + getSpikeDirection(around);
    } else {
        error("Unknown letter in level map: '" + char + "' (at getFullName)"); 
    }
}

function getLvlArray() {
    return currentLevelArrays[currentLightColor] || [];
}

// Three very similar functions.
function addPoly(segments, type, x, y, w, h, around, colour) {
    if (!around) {
        error("addPoly was passed a falsy value for around: " + around);
    }
    if (type.includes("block")) {
        if (!around.up) {
            segments.push(Segment.new(x, y, x + w, y, colour));
        }
        if (!around.down) {
            segments.push(Segment.new(x, y + h, x + w, y + h, colour));
        }
        if (!around.left) {
            segments.push(Segment.new(x, y, x, y + h, colour));
        }
        if (!around.right) {
            segments.push(Segment.new(x + w, y, x + w, y + h, colour));
        }
    } else if (type.includes("spike")) {
        var dir = type.slice(type.lastIndexOf(" ") + 1);
        
        if (dir === "up") {
            segments.push(
                Segment.new(x + w/2, y, x, y + h, colour),
                Segment.new(x + w, y + h, x + w/2, y, colour)
            );
            if (!around.down) {
                segments.push(Segment.new(x, y + h, x + w, y + h, colour));
            }
        } else if (dir === "down") {
            segments.push(
                Segment.new(x + w/2, y + h, x, y, colour),
                Segment.new(x + w, y, x + w/2, y + h, colour)
            );
            if (!around.up) {
                segments.push(Segment.new(x, y, x + w, y, colour));
            }
        } else if (dir === "left") {
            segments.push(
                Segment.new(x, y + h/2, x + w, y + h, colour),
                Segment.new(x + w, y, x, y + h/2, colour)
            );
            if (!around.right) {
                segments.push(Segment.new(x + w, y, x + w, y + h, colour));
            }
        } else if (dir === "right") {
            segments.push(
                Segment.new(x + w, y + h/2, x, y, colour),
                Segment.new(x, y + h, x + w, y + h/2, colour)
            );
            if (!around.left) {
                segments.push(Segment.new(x, y, x, y + h, colour));
            }
        } else {
            error("Unknown spike direction: " + dir);
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
    } else if (type.includes("portal")) {
        fill(213, 0, 255);
        ellipse(x + w/2, y + w/2, w, h);
        fill(255, 115, 250);
        ellipse(x + w/2, y + w/2, w/2, h/2);
    } else if (type !== "empty" && type !== "player") {
        error("Unknown block type: " + type);
    }
}

function getSpikePoints(dir, x, y, w, h) {
    if (dir === "up") {
        return [
            {x: x + w/2, y: y},
            {x: x + w, y: y + h},
            {x: x, y: y + h}
        ];
    } else if (dir === "down") {
        return [
            {x: x + w/2, y: y + h},
            {x: x + w, y: y},
            {x: x, y: y}
        ];
    } else if (dir === "left") {
        return [
            {x: x, y: y + h/2},
            {x: x + w, y: y},
            {x: x + w, y: y + h}
        ];
    } else if (dir === "right") {
        return [
            {x: x + w, y: y + h/2},
            {x: x, y: y + h},
            {x: x, y: y}
        ];
    } else {
        error("Unknown spike direction: " + dir);
    }
}

// "Lit" as in "lit up by a light ray"
// Returns an object with x and y OR false
function touchesLitBlock(x, y, w, h, levelArray, type) {
    // Test if the given character touches that type of block.
    var minX = Math.floor(x);
    var maxX = Math.ceil(x + w) - 1;
    var minY = Math.floor(y);
    var maxY = Math.ceil(y + h) - 1;
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
                    var spikePoints = getSpikePoints(dir, c, r, 1, 1);
                    var playerPoints = [
                        {x: x, y: y},
                        {x: x + w, y: y},
                        {x: x + w, y: y + h},
                        {x: x, y: y + h},
                    ];
                    if (polygonPolygonCollide(spikePoints, playerPoints)) {
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
    var levelArray = [];
    var levelWidth = levelMap[0] && levelMap[0].length || 0;
    var levelHeight = levelMap.length;
    // Helpers
    var lightHex = lightColorsByLetter[lightColor].hex;
    function isIlluminated(c) {
        return !lightColorsByLetter[c] || 
            ((lightColorsByLetter[c].hex & lightHex) !== 0);
    }
    function isBlockAt(c, r) {
        var char = getBlockAt(levelMap, c, r, "notABlock");
        return !!lightColorsByLetter[char[0]];
    }
    function isLitBlockAt(c, r) {
        var char = getBlockAt(levelMap, c, r, "notABlock");
        return !!lightColorsByLetter[char[0]] && isIlluminated(char[0]);
    }
    // For spikes
    var around = { up: null, down: null, left: null, right: null };
    // Loop
    for (var r = 0; r < levelMap.length; r++) {
        levelMap[r] = levelMap[r] || "";
        levelArray[r] = [];
        levelWidth = Math.max(levelWidth, levelMap[r].length);
        for (var c = 0; c < levelMap[r].length; c++) {
            // Reading the surrounding cells (ignores light color)
            around.up = isBlockAt(c, r - 1);
            around.down = isBlockAt(c, r + 1);
            around.left = isBlockAt(c - 1, r);
            around.right = isBlockAt(c + 1, r);
            // Get the name of the cell
            var char = getBlockAt(levelMap, c, r, "-");
            var type = levelArray[r][c] = getFullName(char, around);
            // Skip dark cells
            if (type.includes("block") || type.includes("spike")) {
                if (!isIlluminated(type[0])) {
                    levelArray[r][c] = "empty";
                    continue;
                }
            }
            // Check for the player
            if (type === "player") {
                player.firstX = player.x = c;
                player.firstY = player.y = r;
                player.maxFall = player.maxFallBelowLevel + levelHeight;
                // Remove the player from levelArray
                levelArray[r][c] = "empty";
                continue;
            }
            // Check for the portal
            if (type === "portal") {
                portal.x = c;
                portal.y = r;
                // Leave the portal in the levelArray
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
        Segment.new(-margin, -margin, lvlPxW + margin, -margin),
        Segment.new(lvlPxW + margin, -margin, lvlPxW + margin, lvlPxH + margin),
        Segment.new(lvlPxW + margin, lvlPxH + margin, -margin, lvlPxH + margin),
        Segment.new(-margin, lvlPxH + margin, -margin, -margin)
    );
    
    return levelArray;
}

// Game play
function updatePlayer(levelArray, player) {
    // For easier access
    var p = player;
    p.isStuck = false; // Clear this every frame
    
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
    if (keys[LEFT] || keys.s) { newX -= p.runSpeed; }
    if (keys[RIGHT] || keys.f) { newX += p.runSpeed; }
    if (keys[DOWN] || keys.d) { newX = Math.round(p.x - gap) + gap; }
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
            newX = touchX.x + 1; // + block width
        }
    }
    p.x = newX; // Update position
    
    // Y motion / collision
    var touchY = touchesLitBlock(p.x, newY, p.w, p.h, levelArray, "block");
    if (touchY) {
        if (p.y > touchY.y) {
            // Hit underside of block
            newY = touchY.y + 1;
            newYVelocity = 0;
        } else if (p.y <= touchY.y) {
            // Hit top of block
            newY = touchY.y - p.h;
            newYVelocity = 0;
            if (keys[UP] || keys.e) {
                // Jump
                newYVelocity = -p.jumpSpeed;
            }
        }
    }
    p.y = newY; // Update position
    p.yVelocity = newYVelocity;
}

// Draws the player and portal
function drawColorlessObjects(player) {
    if (!player) {
        error("Either player or levelArray is undefined. (at drawPlayer)");
    }
    
    // Determine if the player is stuck
    var p = player;
    
    // Draw the player
    noStroke();
    fill(p.isStuck ? player.stuckColor : player.color);
    myRectMode(CORNER);
    myRect(
        width/2 - p.w * blockSize / 2, 
        height/2 - p.h * blockSize / 2, 
        p.w * blockSize, p.h * blockSize
    );
    
    // Draw "You're stuck!" text
    if (p.isStuck) {
        fill(255, 255, 255, 100);
        textSize(width*0.15);
        textAlign(CENTER, CENTER);
        text("You're stuck!", width/2, height*0.3);
        textSize(width*0.1);
        text("Choose another color.", width/2, height*0.7);
    }
    
    // Draw the portal
    var portalX = (portal.x - p.x - p.w/2) * blockSize + width/2;
    var portalY = (portal.y - p.y - p.h/2) * blockSize + height/2;
    if (cachedImages.portal) {
        imageMode(CORNER);
        image(cachedImages.portal, portalX, portalY, blockSize, blockSize);
    } else {
        var numRings = 4;
        for (var i = 0; i < numRings; i++) {
            var ringColor = i % 2 === 0? portal.color : portal.color2;
            var ringSize = blockSize - i * blockSize / numRings;
            fill(ringColor);
            ellipse(portalX + blockSize/2, portalY + blockSize/2, ringSize, ringSize);
        }
    }
}

function getPortalImg() {
    // Draw image
    var portalSize = 40; // Portal gets scaled later, what matters is a nice image
    var canvas = createGraphics(portalSize, portalSize, JAVA2D);
    canvas.background(1, 0, 0, 0);
    var numRings = 5;
    for (var i = 0; i < numRings; i++) {
        var ringColor = i % 2 === 0? portal.color : portal.color2;
        var ringSize = portalSize*0.9 - i * portalSize / numRings;
        canvas.fill(ringColor);
        canvas.ellipse(portalSize/2, portalSize/2, ringSize, ringSize);
    }
    canvas.filter(BLUR, 1);
    // Save
    cachedImages.portal = canvas.get();
}

// Helper to advance the level
function nextLevel() {
    // Advance the level
    currentLevelNumber++;
    // Clean up raycasting
    for (var i = 0; i < lightColorsArray.length; i++) {
        var letter = lightColorsArray[i].letter;
        if (currentLevelSegments[letter]) {
            Segment.free(currentLevelSegments[letter]);
        }
    }
    // Destroy data to force rebuild for new level
    currentLevelArrays = null;
    // Reset player
    player.yVelocity = 0;
    // Test full win
    if (currentLevelNumber >= levels.length) {
        currentLevelNumber = 0;
        currentLightColor = "w"; // Reset for play again
        changeScene("end");
    }
    // Activate transition (TODO)
}

function onLose() {
    player.x = player.firstX;
    player.y = player.firstY;
    player.yVelocity = 0;
    // Activate transition (TODO)
}

function checkWinLose() {
    var p = player;
    var won = touchesLitBlock(p.x, p.y, p.w, p.h, getLvlArray(), "portal");
    var lost = touchesLitBlock(p.x, p.y, p.w, p.h, getLvlArray(), "spike");
    lost = lost || p.y > p.maxFall;
    if (won) {
        nextLevel();
    } else if (lost) {
        onLose();
    }
}

// Raycast
function drawRaycast(levelSegments) {
    if (player.light) {
        // Set the light position
        player.light.position.x = (player.x + player.w/2) * blockSize;
        player.light.position.y = (player.y + player.h/2) * blockSize;
        
        // Translate the visual
        pushMatrix();
        translate(
            -(player.x + player.w/2) * blockSize + width/2,
            -(player.y + player.h/2) * blockSize + height/2
        );
        
        // Run the raycast
        var walls = player.light.trace(levelSegments, player.walls);
        var lightColor = lightColorsByLetter[currentLightColor].hex;
        var rayColor = toKAColor(lightColor / 5);
        if (walls) {
            player.light.drawWalls(walls, lightColor, rayColor);
        }
        
        // Pop
        popMatrix();
    } else {
        error("Failed to init light (player.light is falsy in drawRaycast)");
    }
    drawColorlessObjects(player);
}

// Full
function drawFull(levelArray) {
    // Colored background
    var lightColor = lightColorsByLetter[currentLightColor].hex;
    var rayColor = toKAColor(lightColor / 5);
    background(rayColor);
    
    // Blocks
    for (var r = 0; r < levelArray.length; r++) {
        for (var c = 0; c < levelArray[r].length; c++) {
            // type, x, y, w, h, lightColor
            // Center the level on the player
            drawPoly(
                levelArray[r][c], 
                (c - player.x - player.w/2) * blockSize + width/2, 
                (r - player.y - player.h/2) * blockSize + height/2, 
                blockSize, blockSize, 
                currentLightColor
            );
        }
    }
    
    // Player and portal
    drawColorlessObjects(player);
}

// Circular
function initCircular() {
    // Generate overlay
    var canvas = createGraphics(width, height, JAVA2D);
    var worked = drawGradient(canvas, width/2, height/2, 
        width/3, 0, color(0, 0), color(0));
    if (worked) {
        cachedImages.circularOverlay = canvas.get();
    } else {
        error("Canvas failed to load pixels (at initCircular)");
    }
}

function drawCircular(levelArray) {
    drawFull(levelArray);
    if (cachedImages.circularOverlay) {
        imageMode(CORNER);
        image(cachedImages.circularOverlay, 0, 0);
    }
}

// Main game run functions (called from play scene)
function runGame() {
    if (!currentLevelArrays) {
        currentLevelArrays = {};
    }
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
        segs[toLoad] = [];
        currentLevelArrays[toLoad] = loadLevel(
            levels[currentLevelNumber], 
            segs[toLoad],
            toLoad
        );
    }
    
    // Run the game
    updatePlayer(getLvlArray(), player);
    checkWinLose();
}

function drawGame() {
    if (currentLightType === verifyLightType("raycast")) {
        var segs = currentLevelSegments[currentLightColor];
        if (segs) {
            drawRaycast(segs);
        }
    } else if (currentLightType === verifyLightType("circular")) {
        drawCircular(getLvlArray());
    } else if (currentLightType === verifyLightType("full")) {
        drawFull(getLvlArray());
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
    var startTime = width / 2;
    if (intro > startTime) {
        Button.drawForScene("home", mouseX, mouseY);
        
        // Fade overlay
        if (255 > (intro - startTime) * 3 || true) {
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
    
    // Colored title
    textAlign(LEFT, CENTER);
    var msg = titleText, len = msg.length, msgWidth = textWidth(msg);
    for (var i = 0; i < len; i++) {
        var xOffset = textWidth(msg.slice(0, i));
        var textColor = lightColorsOnly[i % lightColorsOnly.length];
        fill(toKAColor(textColor));
        text(msg[i], width*0.5 - msgWidth/2 + xOffset, height*0.225);
    }
    
    // Animation of light coming on screen
    fill(0, 0, 0);
    var boxY = Math.min(0, -intro*2 + width * 0.45);
    rect(0, boxY, width, height*0.9);
    
    // Player-like box (animated)
    fill(player.color);
    var playerX = Math.min(-width*0.08 + intro*2, width*0.4 - blockSize/2);
    myRect(playerX, height*0.9 - blockSize/2, blockSize, blockSize);
}

// Play scene
function runPlayScene() {
    runGame();
}
function drawPlayScene() {
    background(0, 0, 0);
    
    drawGame();
    
    Button.drawForScene("play", mouseX, mouseY);
}

// Info scene
function runInfoScene() {}
function drawInfoScene() {
    background(0, 0, 0);
    
    // The info
    var howToPlayText = 'Arrow keys or ESDF to move.\n\nReach the portal to move on to the next level.\n\nYou can only hit blocks/spikes that you\ncan see, so change the light color\nto get past challenging barriers.\n\nPress 1-7 or the wrgbycm keys to change the\nlight color, or click the buttons at the top.\n\nClick "cheat" in the bottom left to skip a level.\nI hope you have fun! Onward!';
    
    // Draw it
    var txtSize = width*0.045, lineHeight = 1.3, paragraphDecrease = 0.5;
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
    var txt = "Choose a visibility level.\nRaycast is cool!";
    
    // Draw it
    fill(155, 255, 255);
    textSize(width*0.063);
    textAlign(CENTER, CENTER);
    text(txt, width/2, height/4);
    
    // Buttons
    Button.drawForScene("options", mouseX, mouseY);
}

// End scene
function runEndScene() {}
function drawEndScene() {
    background(0, 0, 0);
    
    // The star
    var numPoints = 13, radius1 = width*0.5, radius2 = width*0.282;
    fill(186, 186, 0);
    noStroke();
    beginShape();
    for (var i = 0; i < numPoints * 2; i++) {
        var radius = i % 2 === 0? radius1 : radius2;
        var theta = i * Math.PI / numPoints - Math.PI / 2;
        var x = width/2 + radius * Math.cos(theta);
        var y = height/2 + radius * Math.sin(theta);
        vertex(x, y);
    }
    endShape(CLOSE);
    
    // The message
    var youWinText = cheated? 
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
    var howToPlayText = "Sub if you want to be notified \nof my latest projects.";
    
    // Draw it
    fill(255, 255, 255);
    textSize(width*0.063);
    textAlign(CENTER, CENTER);
    text(howToPlayText, width/2, height/2);
    
    // Buttons
    Button.drawForScene("sub", mouseX, mouseY);
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

/** Defining all the buttons for each scene **/
buttonsByScene = {
    "home": {
        "play": {
            x: width*0.295,
            y: height*0.375,
            w: width*0.347,
            h: height*0.115,
            keys: "p",
            message: "Play",
            onClick: changeSceneWrapped("options")
        },
        "how": {
            x: width*0.325,
            y: height*0.53,
            w: width*0.242,
            h: height*0.09,
            keys: "h",
            message: "How",
            onClick: changeSceneWrapped("info")
        },
        "sub_button": {
            x: width*0.355,
            y: height*0.66,
            w: width*0.133,
            h: height*0.07,
            keys: "s",
            message: "Sub",
            onClick: changeSceneWrapped("sub")
        }
    },
    "play": Object.assign({
        /* Populated by loop */
        
        // More buttons
        "home": {
            x: width*0.735,
            y: height*0.026,
            w: width*0.25,
            h: height*0.04,
            r: 0,
            keys: "h",
            message: "Home",
            color: color(153, 153, 153, 0),
            hoverColor: color(135, 135, 135, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: changeSceneWrapped("home")
        },
        "restart_lvl": {
            x: width*0.735,
            y: height*0.066,
            w: width*0.25,
            h: height*0.04,
            r: 0,
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
            x: width*0.735,
            y: height*0.106,
            w: width*0.25,
            h: height*0.04,
            r: 0,
            keys: "p",
            message: "Restart game (p)",
            color: color(140, 140, 140, 0),
            hoverColor: color(255, 0, 0, 100),
            textColor: color(255, 255, 255),
            strokeWeight: 0,
            textSize: width*0.032,
            onClick: changeSceneWrapped("restart")
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
        var btns = {}, colors = lightColorsArray;
        var btnW = width*0.087, gap = btnW / 7;
        for (var i = 0; i < colors.length; i++) {
            var c = colors[i].letter;
            var hexColor = colors[i].hex;
            var KAColor = colors[i].KAColor;
            btns[c] = {
                x: width*0.025 + i * (btnW + gap),
                y: height*0.025, w: btnW, h: btnW,
                r: btnW / 2,
                keys: String(i + 1) + String(c),
                message: c.toUpperCase(),
                color: KAColor,
                textColor: "rb".includes(c)? color(255, 255, 255) : color(0, 0, 0),
                textSize: width*0.053,
                strokeWeight: 0,
                onClick: changeLightWrapped(c)
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
            y: height*0.357,
            w: width*0.55,
            h: height*0.125,
            keys: "rp",
            message: "Raycast",
            color: color(255, 255, 0),
            textSize: width*0.072,
            stroke: color(107, 107, 107),
            onClick: function () {
                setLightType("raycast");
                changeScene("play");
            },
        },
        "circular": {
            x: width*0.263,
            y: height*0.5,
            w: width*0.475,
            h: height*0.125,
            keys: "c",
            message: "Circular",
            color: color(220, 220, 90),
            stroke: color(107, 107, 107),
            onClick: function () {
                setLightType("circular");
                changeScene("play");
            },
        },
        "full": {
            x: width*0.3,
            y: height*0.645,
            w: width*0.4,
            h: height*0.125,
            keys: "f",
            message: "Full",
            color: color(200, 200, 150),
            stroke: color(107, 107, 107),
            onClick: function () {
                setLightType("full");
                changeScene("play");
            },
        },
        "back": {
            x: width*0.35,
            y: height*0.792,
            w: width*0.3,
            h: height*0.125,
            keys: "hb",
            message: "Back",
            color: color(171, 171, 171),
            stroke: color(0, 0, 0),
            onClick: changeSceneWrapped("home"),
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
            onClick: function () {
                setLightType("raycast");
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
            x: width*0.325,
            y: height*0.65,
            w: width*0.35,
            h: height*0.125,
            keys: "b",
            message: "Back",
            onClick: changeSceneWrapped("home"),
            stroke: color(201, 201, 0)
        },
    },
};

/** Main onload and scene logic **/
// Scene handling
var gameSceneRun = {
    "home": runHomeScene,
    "play": runPlayScene,
    "options": runOptionsScene,
    "info": runInfoScene,
    "end" : runEndScene,
    "sub" : runSubScene
};
var gameSceneDraw = {
    "home": drawHomeScene,
    "play": drawPlayScene,
    "options": drawOptionsScene,
    "info": drawInfoScene,
    "end" : drawEndScene,
    "sub" : drawSubScene
};

// Button init
for (var scene in buttonsByScene) {
    var buttonsInScene = buttonsByScene[scene];
    for (var name in buttonsInScene) {
        if (!(buttonsInScene[name] instanceof Button)) {
            buttonsInScene[name] = new Button(buttonsInScene[name]);
        }
    }
}

// Storage and overlay init
changeScene(currentScene);
if (!cachedImages.circularOverlay) {
    try {
        initCircular();
    } catch (err) {
        reportError(err, true);
        println("Circular mode is nonfunctional due to a bug.");
    }
}
if (!cachedImages.portal) {
    try {
        getPortalImg();
    } 
    catch (err) {
        reportError(err, true);
        println("Nice portal graphics failed to load.");
    }
}

// Set frame rate and activate draw if needed (precaution)
frameRate(60);
loop();
myRectMode(CORNER);

// Init player raycasting light
// The light constructor takes degrees (I tested it)
player.light = new Light(360);

// Env functions
draw = function() {
    try {
        if (!sceneNames.includes(currentScene)) {
            error("Error: Invalid scene name: " + currentScene);
        }
        
        gameSceneRun[currentScene]();
        gameSceneDraw[currentScene]();
        
        displayFrameRate();
        displayMyName();
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

keyPressed = function() {
    keys[keyCode] = true;
    keys[key.toString()] = true;
    if (key.toString() === "o") {
        loop();
    }
    Button.keyPressedForScene(currentScene, keys);
};

keyReleased = function() {
    keys[keyCode] = false;
    keys[key.toString()] = false;
};
