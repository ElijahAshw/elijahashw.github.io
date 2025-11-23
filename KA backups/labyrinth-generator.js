var detourChance = 0.1;
var genFast = false;

// From my program https://www.khanacademy.org/computer-programming/pause-library-ka-generator-functions/4871095681400832
var Pause = (function() {
    // Taken from Bob lyon's DeKhan library
    // https://www.khanacademy.org/computer-programming/dekhan-the-code/5149916573286400
    var wasFrameCount = frameCount;
    frameCount = function() {
        frameCount = wasFrameCount;
        return this;
    };
    var globalThis = frameCount();
    
    // Regular expressions
    var pauseCall = /\b__env__\.Pause\s*\(\s*\)|\b__env__\.Pause\b/g;
    var KALoopProtect = /__env__\.KA\w+Protect\(.+\);?(\s*?)(__env__\.\w+Count = 0;?)/g;
    var functionStart = /^function\s*\(/;
    
    function Pause() {}
    
    Pause.addPauses = function(func, loopPauseExpr) {
        if (typeof func !== "function") {
            return;
        }
        
        func = func.toString(); // Convert to a string to use regexps
        
        // Replace necessary things
        func = func.replace(pauseCall, "yield ");
        func = func.replace(KALoopProtect, "$2$1yield " + loopPauseExpr + ";");
        func = func.replace(functionStart, "return function* (");
        
        // Convert back to a function with the Function function!
        func = Object.constructor("__env__", func)(globalThis);
        
        return func;
    };
    
    Pause.deloop = function(func) {
        if (typeof func !== "function") {
            return;
        }
        func = "return " + func.toString().replace(KALoopProtect, "");
        func = Object.constructor("__env__", func)(globalThis);
        return func;
    };
    
    return Pause;
})();

function Cell(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
    this.draw = function() {
        var x1 = this.x * this.s;
        var x2 = (this.x + 1) * this.s;
        var y1 = this.y * this.s;
        var y2 = (this.y + 1) * this.s;
        stroke(0, 0, 0);
        strokeWeight(2);
        if (this.top) { line(x1, y1, x2, y1); }
        if (this.bottom) { line(x1, y2, x2, y2); }
        if (this.left) { line(x1, y1, x1, y2); }
        if (this.right) { line(x2, y1, x2, y2); }
    };
}

var c = new Cell(1, 1);

function generateMaze(cells) {
    
}


draw = function() {
    
};
