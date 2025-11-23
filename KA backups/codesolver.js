// Samples
var num1 = "SEND";
var num2 = "MORE";
var sum = "MONEY";

// var num1 =  "EAT";
// var num2 = "THAT";
// var sum = "APPLE";

// var num1 = "FUJI";
// var num2 = "YAMA";
// var sum = "MOUNT";

// var num1 = "AS";
// var num2 =  "A";
// var sum =  "IF";

var allDigits = "0123456789";
var uniqueDigits = true;
var allowLeadingZeros = false;

var monospaceFont = createFont("monospace");

// Pause library
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
    var pauseCall = /\b(__env__\.)?Pause\s*\(\s*\)|\b__env__\.Pause\b/g;
    var KALoopProtect = /__env__\.KA\w+Protect\(.+\);?(\s*?)(__env__\.\w+Count = 0;)/g;
    var functionStart = /^function\s*\(/;
    
    function Pause(value) {}
    
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

// Solver functions

var testVariableValues = Pause.deloop(function(vars, values, argProgress, testFunc) {
    // Argument validation
    if (!(typeof vars === "object" && vars && vars instanceof Array) || 
        typeof values !== "string" ||
        !(typeof argProgress === "object" && argProgress && argProgress instanceof Array) || 
        typeof testFunc !== "function") {
        // End condition
        // Start body
        throw { message: "Incorrect arguments for testVariableValues: \"" + String(vars).slice(0, 10) + ", " + String(values).slice(0, 10) + ", " + String(argProgress).slice(0, 10) + ", " + String(testFunc).slice(0, 10) + ", " + '"'};
    }
    
    if (vars.length === 0) {
        if (testFunc(argProgress)) {
            return [argProgress];
        } else {
            return [];
        }
    }
    
    var retValues = [];
    for (var i = 0; i < values.length; i++) {
        var newVars = vars.slice(1);
        var newArgProgress = argProgress.slice();
        newArgProgress.push({var: vars[0], value: values[i]});
        var newValues = values;
        if (uniqueDigits) {
            newValues = values.slice(0, i) + values.slice(i + 1);
        }
        var newValues = testVariableValues(newVars, newValues, newArgProgress, testFunc);
        for (var j = 0; j < newValues.length; j++) {
            retValues.push(newValues[j]);
        }
    }
    
    return retValues;
});

// params = { allowCarryIn: bool, allowMoreOnLeft: bool, allowLeadingZeros: bool }
var findAllSolutions112 = Pause.deloop(function(a, b, c, params) {
    params = params || {};
    var allowCarryIn = params.allowCarryIn;
    var allowMoreOnLeft = params.allowMoreOnLeft;
    var allowLeadingZeros = params.allowLeadingZeros;
    
    a = a[0];
    b = b[0];
    c = c.slice(0, 2);
    
    var variables = [a, b].concat(c.split(""));
    var variablesNoDups = [];
    for (var i = 0; i < variables.length; i++) {
        if (variables[i] && !variablesNoDups.includes(variables[i])) {
            variablesNoDups.push(variables[i]);
        }
    }
    
    function testFunc(vars) {
        var Araw = vars.find(function (o) { return o.var === a; });
        var Braw = vars.find(function (o) { return o.var === b; });
        var C0raw = vars.find(function (o) { return o.var === c[0]; });
        var C1raw = vars.find(function (o) { return o.var === c[1]; });
        var A = Araw? Number(Araw.value) : 0;
        var B = Braw? Number(Braw.value) : 0;
        var C0 = C0raw? Number(C0raw.value) : 0;
        var C1 = C1raw? Number(C1raw.value) : 0;
        var C = C1raw? C0 * 10 + C1 : C0;
        
        var leadingZerosCheck = allowLeadingZeros || 
            (!Araw || Number(A) !== 0) && 
            (!Braw || Number(B) !== 0) && 
            (!C0raw || Number(C) !== 0);
        
        var sumCheck = false;
        if (allowMoreOnLeft) {
            var isMod10 = (A + B - C) % 10 === 0;
            if (allowCarryIn) {
                isMod10 = isMod10 || (A + B + 1 - C) % 10 === 0;
            }
            // A + B + (0 | 1) can be anywhere from 0 to 19.
            // C can be anywhere from 00 to 99.
            // The "true" C can be anywhere from 000 to 199.
            // If(isMod10), then A + B + (0 | 1) - C can be from -90 to 10
            // That whole range is valid solutions, so there is no need to check that.
            sumCheck = sumCheck || isMod10;
        }
        if (allowCarryIn) {
            sumCheck = sumCheck || A + B + 1 === C;
        }
        sumCheck = sumCheck || A + B === C;
        
        return leadingZerosCheck && sumCheck;
    }
    
    var allValues = testVariableValues(variablesNoDups, allDigits, [], testFunc);
    return allValues;
});

var mergeSolutionSets = Pause.deloop(function(set1, set2) {
    var solutions = [];
    
    function compareVars(item1, item2) {
        return item1.var < item2.var? -1 : 1; // Ascending alphabetical order
    }
    
    function compareVals(item1, item2) {
        return item1.value < item2.value? -1 : 1; // Ascending order
    }

    function sortedSetsAreCompatible(s1, s2, prop1, prop2) {
        var s3 = [];
        var areCompatible = true;
        var i1 = 0, i2 = 0, len1 = s1.length, len2 = s2.length;
        while (i1 < len1 && i2 < len2) {
                // End loop when one array is exhausted; the other items will be added later
            if (s1[i1][prop1] < s2[i2][prop1] || !s1[i1]) {
                s3.push(s1[i1]);
                i1++;
            } else if (s1[i1][prop1] > s2[i2][prop1] || !s2[i2]) {
                s3.push(s2[i2]);
                i2++;
            } else if (s1[i1][prop1] === s2[i2][prop1]) {
                // Compatibility check
                if (s1[i1][prop2] !== s2[i2][prop2]) {
                    areCompatible = false;
                    break;
                } else {
                    s3.push(s1[i1]);
                    i1++;
                    i2++;
                }
            } else {
                break;
            }
        }
        
        if (areCompatible) {
            while (i1 < len1) {
                s3.push(s1[i1++]);
            }
            while (i2 < len2) {
                s3.push(s2[i2++]);
            }
        }
        
        return areCompatible? s3 : false;
    }
    
    set1 = set1.slice();
    set2 = set2.slice();
    for (var i = 0; i < set1.length; i++) {
        set1[i] = set1[i].slice().sort(compareVars);
    }
    for (var i = 0; i < set2.length; i++) {
        set2[i] = set2[i].slice().sort(compareVars);
    }
    
    var set1ValSort, set2ValSort;
    if (uniqueDigits) {
        var set1ValSort = set1.slice();
        var set2ValSort = set2.slice();
        for (var i = 0; i < set1ValSort.length; i++) {
            set1ValSort[i] = set1ValSort[i].slice().sort(compareVals);
        }
        for (var i = 0; i < set2ValSort.length; i++) {
            set2ValSort[i] = set2ValSort[i].slice().sort(compareVals);
        }
    }
    
    for (var i = 0; i < set1.length; i++) {
        for (var j = 0; j < set2.length; j++) {
            var compatible = sortedSetsAreCompatible(set1[i], set2[j], "var", "value");
            
            if (uniqueDigits) {
                var compatible2 = sortedSetsAreCompatible(
                    set1ValSort[i], set2ValSort[j], "value", "var");
                if (compatible && compatible2) {
                    solutions.push(compatible);
                }
            } else {
                if (compatible) {
                    solutions.push(compatible);
                }
            }
        }
    }
    
    return solutions;
});

function reverseString(s) {
    return s.split("").reverse().join("");
}

var computeFinalResult = Pause.deloop(function(a, b, c, key) {
    var a1 = "", b1 = "", c1 = "";
    function checkVarVal(obj) {
        return obj.var.toUpperCase() === this.toUpperCase();
    }
    for (var i = 0; i < a.length; i++) {
        var varRaw = key.find(checkVarVal, a[i]);
        var varVal = varRaw? varRaw.value : NaN;
        a1 += varVal;
    }
    for (var i = 0; i < b.length; i++) {
        var varRaw = key.find(checkVarVal, b[i]);
        var varVal = varRaw? varRaw.value : NaN;
        b1 += varVal;
    }
    for (var i = 0; i < c.length; i++) {
        var varRaw = key.find(checkVarVal, c[i]);
        var varVal = varRaw? varRaw.value : NaN;
        c1 += varVal;
    }
    a1 = a1 && a1.startsWith("0")? NaN : a1;
    b1 = b1 && b1.startsWith("0")? NaN : b1;
    c1 = c1 && c1.startsWith("0")? NaN : c1;
    return {a: Number(a1), b: Number(b1), c: Number(c1)};
});

var solveCriptarithm = Pause.addPauses(function(a, b, c) {
    var longerAB = Math.max(a.length, b.length);
    if (longerAB > c.length && !allowLeadingZeros || 
        longerAB < c.length - 1 && !allowLeadingZeros ||
        typeof a !== "string" || typeof b !== "string" || typeof c !== "string") {
        Pause((1).toFixed(4));
        return [];
    }
    
    var ra = reverseString(a.toUpperCase());
    var rb = reverseString(b.toUpperCase());
    var rc = reverseString(c.toUpperCase());
    
    var longestNum = Math.max(a.length, b.length, c.length - 1);
    var partialData = [], mergeCounter = 0, lastProgPercent = 0;
    
    function getProgress() {
        var part1 = partialData.length / Math.max(longestNum - 1, 1);
        var part2 = mergeCounter / Math.max(longestNum, 1);
        var part3 = lastProgPercent;
        return ((part1 + part2 + part3) / 3).toFixed(4);
    }
    
    // Compute column solutions
    for (var i = 0; i < longestNum; i++) {
        var newA = ra[i] || "";
        var newB = rb[i] || "";
        var newC = reverseString(rc.slice(i, i + 2) || "");
        var params = { 
            allowCarryIn: i > 0, 
            allowMoreOnLeft: i < longestNum - 1, 
            allowLeadingZeros: i < longestNum - 1 || allowLeadingZeros
        };
        var newData = findAllSolutions112(newA, newB, newC, params);
        if (newData.length <= 0) {
            Pause((1).toFixed(4));
            return [];
        }
        partialData.push(newData);
    }
    
    // Merge sets of column solutions
    var partialSolutions = partialData.pop();
    mergeCounter++;
    for (var i = partialData.length; i-- > 0; mergeCounter++) {
        partialSolutions = mergeSolutionSets(partialSolutions, partialData[i]);
    }
    
    // Verify remaining solutions
    var solutions = [];
    for (var i = 0; i < partialSolutions.length; i++) {
        var finalVals = computeFinalResult(a, b, c, partialSolutions[i]);
        if (finalVals.a + finalVals.b === finalVals.c) {
            solutions.push(partialSolutions[i]);
        }
        lastProgPercent = i / partialSolutions.length;
    }
    lastProgPercent = i / partialSolutions.length;
    
    Pause(getProgress());
    
    return solutions;
}, "getProgress()");


// Display functions

function solutionsToString(solutions) {
    if (typeof solutions === "object" && solutions && solutions instanceof Array) {
        return '"[' + solutions.map(function(ar){return "["+ar.map(function(v){return "{ "+v.var+": "+v.value+" }";})+"]";}).join(",\n") + ']"';
    } else {
        return "Wrong input to 'solutionsToString'";
    }
}

function solutionsToStringLiterally(solutions) {
    if (typeof solutions === "object" && solutions && solutions instanceof Array) {
        return '"[' + solutions.map(function(ar){return "["+ar.map(function(v){return "{ var: \""+v.var+"\", value: "+v.value+" }";})+"]";}).join(",\n") + ']"';
    } else {
        return "Wrong input to 'solutionsToString'";
    }
}

function displayCriptarithm(a, b, c, x, y, s) {
    s = s || 20;
    textAlign(RIGHT, BASELINE);
    textFont(monospaceFont, s);
    fill(0, 0, 0);
    text(a, x, y);
    text("+" + b, x, y + s);
    text(c, x, y + s * 2);
    stroke(0, 0, 0);
    var maxWidth = Math.max(textWidth(a), textWidth("+" + b), textWidth(c));
    line(x - maxWidth, y + s * 1.15, x, y + s * 1.15);
}

 // To help visualize algorithm
function displayCriptarithmDrawkcab(a, b, c, x, y, s) {
    s = s || 20;
    textAlign(LEFT, BASELINE);
    textFont(monospaceFont, s);
    fill(0, 0, 0);
    text(reverseString(a), x, y);
    text(reverseString("+" + b), x, y + s);
    text(reverseString(c), x, y + s * 2);
    stroke(0, 0, 0);
    var maxWidth = Math.max(textWidth(a), textWidth("+" + b), textWidth(c));
    line(x + maxWidth, y + s * 1.15, x, y + s * 1.15);
}

// Initial display

background(255, 255, 255);
displayCriptarithm(num1, num2, sum, 100, 50, 20);
// displayCriptarithmDrawkcab(num1, num2, sum, 50, 200, 20);

var solvingGenerator = solveCriptarithm(num1, num2, sum);
var startTime = millis();

draw = function() {
    var result = solvingGenerator.next();
    if (!result.done) {
        println("Progress: " + result.value + " out of 1");
    } else {
        var solutions = result.value;
        var timeElapsed = millis() - startTime;
        println("Done!");
        println("All solutions: " + solutionsToString(solutions));
        println("Number of solutions: " + solutions.length);
        println("Time spent: " + timeElapsed + "ms");
        if (solutions.length > 0) {
            var firstSolution = solutions[0];
            var solutionTextObj = computeFinalResult(num1, num2, sum, firstSolution);
            displayCriptarithm(solutionTextObj.a, solutionTextObj.b, solutionTextObj.c,
                200, 50, 20);
        }
        noLoop();
    }
};

