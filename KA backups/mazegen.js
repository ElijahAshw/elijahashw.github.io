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
    
    return Pause;
})();

var grid;

function createGrid(w, h, v) {
    var grid = [];
    var value = v === undefined? 1 : v;
    for (var r = 0; r < h; r++) {
        grid[r] = [];
        for (var c = 0; c < w; c++) {
            grid[r][c] = value;
        }
    }
    return grid;
}

function drawGrid(grid, scale, c1, c2) {
    noStroke();
    scale = scale || 10;
    c1 = c1 === undefined? color(255, 255, 255) : c1;
    c2 = c2 === undefined? color(0, 0, 0) : c2;
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            var colorHere = grid[r][c] === 0? c1 : c2;
            fill(colorHere);
            rect(c * scale, r * scale, scale, scale);
        }
    }
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getWalledInNeighbors(grid, x, y) {
    var directions = [
        {x: -1, y: 0},
        {x: 1, y: 0},
        {x: 0, y: -1},
        {x: 0, y: 1}
    ];
    var walledInNeighbors = [];
    for (var i = 0; i < directions.length; i++) {
        var nx = x + directions[i].x;
        var ny = y + directions[i].y;
        if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
            var isWalledIn = true;
            for (var j = 0; j < directions.length; j++) {
                var nnx = nx + directions[j].x;
                var nny = ny + directions[j].y;
                if (!(nnx === x && nny === y)) {
                    if (!(nnx >= 0 && nnx < grid[0].length && nny >= 0 && 
                        nny < grid.length) || grid[nny][nnx] === 0) {
                        isWalledIn = false;
                        break;
                    }
                }
            }
            if (isWalledIn) {
                walledInNeighbors.push({x: nx, y: ny});
            }
        }
    }
    return walledInNeighbors;
}

function getWalledInNeighbors(grid, x, y) {
    var directions = [
        {x: -1, y: 0},
        {x: 1, y: 0},
        {x: 0, y: -1},
        {x: 0, y: 1}
    ];
    var walledInNeighbors = [];
    
    // Check each adjacent cell
    for (var i = 0; i < directions.length; i++) {
        var nx = x + directions[i].x;
        var ny = y + directions[i].y;
        
        // Check if neighbor is within bounds and is a wall
        if (nx >= 0 && nx < grid[0].length && 
            ny >= 0 && ny < grid.length && 
            grid[ny][nx] === 1) {
            
            // Count how many visited neighbors this cell has
            var visitedNeighbors = 0;
            for (var j = 0; j < directions.length; j++) {
                var nnx = nx + directions[j].x;
                var nny = ny + directions[j].y;
                
                if (nnx >= 0 && nnx < grid[0].length && 
                    nny >= 0 && nny < grid.length && 
                    grid[nny][nnx] === 0) {
                    visitedNeighbors++;
                }
            }
            
            // Only add if this wall has exactly one visited neighbor
            if (visitedNeighbors === 1) {
                walledInNeighbors.push({x: nx, y: ny});
            }
        }
    }
    return walledInNeighbors;
}

var generateMaze = Pause.addPauses(function(grid, startX, startY) {
    var currentPath = [{x: startX || 1, y: startY || 1}];
    grid[currentPath[0].y][currentPath[0].x] = 0;
    while (currentPath.length > 0) {
        Pause(grid);
        var walledInNeighbors;
        do {
            walledInNeighbors = getWalledInNeighbors(grid, currentPath.at(-1).x, currentPath.at(-1).y);
            if (walledInNeighbors.length <= 0) {
                currentPath.pop();
            }          
        } while (walledInNeighbors.length <= 0 && currentPath.length > 0);
        if (walledInNeighbors.length > 0) {
            var nextCell = randomItem(walledInNeighbors);
            grid[nextCell.y][nextCell.x] = 0;
            currentPath.push({x: nextCell.x, y: nextCell.y});
        }
    }
    return grid;
}, "grid");

grid = createGrid(30, 30, 1);
drawGrid(grid, 10);
var mazeGenerator = generateMaze(grid);
var debugging = false;
draw = function() {
    var result = mazeGenerator.next();
    if (!result.done){
        background(255, 255, 255);
        drawGrid(result.value, 10);
    } else {
        println("Done!");
        noLoop();
    }
};
