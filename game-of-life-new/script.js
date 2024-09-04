let boxSize = 6;
/* Variables */
let buttons    = document.querySelectorAll("button");
let nextB      = document.querySelector("#next");
let randB      = document.querySelector("#randomize");
let clearB     = document.querySelector("#clear");
let startB     = document.querySelector("#start");
let backB      = document.querySelector("#back");
let addB       = document.querySelector("#add");
let saveB      = document.querySelector("#save");
let importB    = document.querySelector("#import");
let editB      = document.querySelector("#edit");
let clearPartB = document.querySelector("#clearpart");
let duplicateB = document.querySelector("#duplicate");
let moveB      = document.querySelector("#move");
let tileB      = document.querySelector("#tile");
let speedCount = document.querySelector("#speed-counter");
let genCounter = document.querySelector("#counter");
let runSpeed   = document.querySelector("#speed");
let pattern    = document.querySelector("#pattern");
let resetGens  = document.querySelector("#reset");
let trackPrev  = document.querySelector("#track");
let canvas     = document.querySelector("canvas");
let c = canvas.getContext("2d");

let boxes = new Map(), newBoxes = new Map(), possibleNew = new Map(), prevCells = new Map();
let savedBoards = {main: [], redo: [], periodBoard: new Map()}, placingBoard = null, generations = 0;
let [minX, minY, maxX, maxY, xOff, yOff] = [Infinity, Infinity, -Infinity, -Infinity, 0, 0];
let chooseStage = null, maxToSave = 10, numW = 227*1, numH = 125*1, w, h;


canvas.setAttribute("width", (w = numW*boxSize+1) + "px");
canvas.setAttribute("height", (h = numH*boxSize+1) + "px");

const MapCompressor = (function() {
    const chars = "!#$%&'()*+¶-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª¯°±µ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽˀˁ˂˃˄˅˪˫˭ˮ˵˶˸˹˺˻˼˽˾ͱͲͳʹ͵ͶͷͻͼͽͿ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓ";
    const RLErow = /[\dabcdeo.$]{0,69}[abcdeo.$!]/gi;
    const startRLE = /x ?= ?\d+, ?y ?= ?\d+, ?rule ?= ?(b3\/s23|lifehistory) *\r?\n?\r?/i;
    const extras = /([^]*x ?= ?\d+, ?y ?= ?\d+, ?rule ?= ?(b3\/s23|lifehistory))?\r?\n?\r?| |![^]*/gi;
    const RLEpiece = /(\d+)([abcdeo.$])/gi;
    const emptyRows = /\${2,}/gi;

    function compressMap(mapToCompress) {
        let result = "";
        mapToCompress.forEach(({x, y}) => {
            result += chars[x] + chars[y];
        });
        return result; 
    }

    function replaceRLEpiece(piece, count, letter) {
        return letter.repeat(Number(count || 1));
    }
    
    function decompressMap(str) {
        let result = new Map();
        
        if (startRLE.test(str)) {
            let RLE = str.replace(extras, "").toLowerCase()
                .replace(RLEpiece, replaceRLEpiece).split("$");
            for (let y = 0; y < RLE.length; y++) {
                let row = RLE[y];
                for (let x = 0; x < row.length; x++) {
                    if ("aceo".includes(row[x])) {
                        result.set(`${x} ${y}`, {x, y});
                    }
                }
            }
        } else {
            for (let i = 0; i < str.length;) {
                let x = chars.indexOf(str[i++]);
                let y = chars.indexOf(str[i++]);
                result.set(`${x} ${y}`, {x, y}); 
            }
        }

        return result;
    }


    function mapToRLE(mapToConvert) {
        // Get bounds
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        if (mapToConvert.size > 0) {
            mapToConvert.forEach(({x, y}) => {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            });
        } else {
            minX = maxX = minY = maxY = 0;
        }
        
        // Convert
        let result = "";
        let curCount = 0;
        let curCountingChar = "";
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                let nextChar = mapToConvert.has(`${x} ${y}`)? "o" : "b";
                if (nextChar === curCountingChar) {
                    curCount++;
                } else {
                    if (curCount === 1) {
                        result += curCountingChar;
                    } else if (curCount) {
                        result += "" + curCount + curCountingChar;
                    }
                    curCount = 1;
                    curCountingChar = nextChar;
                }
            }
            if (curCountingChar === "o") {
                if (curCount === 1) {
                    result += curCountingChar;
                } else if (curCount) {
                    result += "" + curCount + curCountingChar;
                }
            }
            curCount = 0;
            curCountingChar = "";
            result += y < maxY? "$" : "";
        }
        result += "!";

        result = result.replace(emptyRows, match => `${match.length}$`);

        // Create the header line
        let headerLine = "x = " + (maxX - minX + 1) +  ", y = " + (maxY - minY + 1) + ", rule = B3/S23";
        
        // Split into lines of no longer than 70 chars
        result = result.replace(RLErow, "\n$&");

        return headerLine + result;
    }
    
    return {compress: compressMap, decompress: decompressMap, toRLE: mapToRLE}; 
})();

function chooseBoard() {
    placingBoard = null;
    chooseStage = 1;

    return new Promise((resolve, reject) => {
        function check() {
            if (!chooseStage) {
                canvas.removeEventListener("mousemove", handleMove);
                canvas.removeEventListener("click", handleClick);
                reject("Stopped.");
            }
        }
        function updateCoords(event) {
            let {x, y} = mouseCellLocation(event, canvas, true);
            if (chooseStage === 1) {
                minX = x;
                minY = y;
            } else if (chooseStage === 2) {
                maxX = x;
                maxY = y;
            }
        }
        function handleMove(event) {
            check();
            updateCoords(event);
            drawBoard();
        };
        function handleClick(event) {
            check();
            if (chooseStage === 1) {
                updateCoords(event);
                chooseStage = 2;
            } else if (chooseStage === 2) {
                updateCoords(event);
                [minX, minY, maxX, maxY] = [Math.min(minX, maxX), 
                    Math.min(minY, maxY), Math.max(minX, maxX), Math.max(minY, maxY)];
                maxX--; maxY--;
                let board = new Map();
                for (let x = minX; x <= maxX; x++) {
                    for (let y = minY; y <= maxY; y++) {
                        if (boxes.has(`${x} ${y}`)) {
                            board.set(`${x} ${y}`, {x, y});
                        }
                    }
                }
                chooseStage = null;
                drawBoard();
                canvas.removeEventListener("mousemove", handleMove);
                canvas.removeEventListener("click", handleClick);
                resolve(board);
            }
        };
        canvas.addEventListener("mousemove", handleMove);
        canvas.addEventListener("click", handleClick);
    });
}

function placeBoard(board, setMinMax = true) {
    if (setMinMax) {
        minX = minY = Infinity;
        maxX = maxY = -Infinity;
        if (board.size > 0) {
            board.forEach(({x, y}) => {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            });
        } else {
            minX = maxX = minY = maxY = 0;
        }
    }
    placingBoard = board;
    chooseStage = null;
    xOff = 0; yOff = 0;
    drawBoard();

    return new Promise((resolve, reject) => {
        function check() {
            if (!placingBoard) {
                canvas.removeEventListener("mousemove", handleMove);
                canvas.removeEventListener("click", handleClick);
                window.removeEventListener("keydown", handleKey);
                reject("Stopped.");
                return false;
            } else {
                return true;
            }
        }
        function updateCoords(event) {
            let {x, y} = mouseCellLocation(event, canvas);
            xOff = maxX - x;
            yOff = maxY - y;
        }
        function handleKey(event) {
            if (!check()) return;
            if (event.key === 'ArrowRight') {
                let newBoard = new Map();
                let cx = Math.ceil((maxX - minX) / 2), cy = Math.ceil((maxY - minY) / 2);
                [maxX, maxY] = [maxY - minY + minX, maxX - minX + minY];
                placingBoard.forEach(({x, y}) => {
                    [x, y] = [cx + cy - y, cy - cx + x];
                    newBoard.set(`${x} ${y}`, {x, y});
                });
                let curMinX = Infinity, curMinY = Infinity;
                newBoard.forEach(({x, y}) => {
                    curMinX = Math.min(curMinX, x);
                    curMinY = Math.min(curMinY, y);
                });
                placingBoard = new Map();
                newBoard.forEach(({x, y}) => {
                    let newX = x + minX - curMinX, newY = y + minY - curMinY;
                    placingBoard.set(`${newX} ${newY}`, {x: newX, y: newY});
                });
                event.preventDefault();
            } else if (event.key === 'ArrowLeft') {
                let newBoard = new Map();
                let cx = Math.ceil((maxX - minX) / 2), cy = Math.ceil((maxY - minY) / 2);
                [maxX, maxY] = [maxY - minY + minX, maxX - minX + minY];
                placingBoard.forEach(({x, y}) => {
                    [x, y] = [cx - cy + y, cy + cx - x];
                    newBoard.set(`${x} ${y}`, {x, y});
                });
                let curMinX = Infinity, curMinY = Infinity;
                newBoard.forEach(({x, y}) => {
                    curMinX = Math.min(curMinX, x);
                    curMinY = Math.min(curMinY, y);
                });
                placingBoard = new Map();
                newBoard.forEach(({x, y}) => {
                    let newX = x + minX - curMinX, newY = y + minY - curMinY;
                    placingBoard.set(`${newX} ${newY}`, {x: newX, y: newY});
                });
                event.preventDefault();
            } else if (event.key === 'ArrowUp') {
                let newBoard = new Map();
                placingBoard.forEach(({x, y}) => {
                    y = minY + maxY - y;
                    newBoard.set(`${x} ${y}`, {x, y});
                });
                placingBoard = newBoard;
                event.preventDefault();
            } else if (event.key === 'ArrowDown') {
                let newBoard = new Map();
                placingBoard.forEach(({x, y}) => {
                    x = minX + maxX - x;
                    newBoard.set(`${x} ${y}`, {x, y});
                });
                placingBoard = newBoard;
                event.preventDefault();
            }
            drawBoard();
        }
        function handleMove(event) {
            check();
            updateCoords(event);
            drawBoard();
        };
        function handleClick(event) {
            if (!check()) return;
            updateCoords(event);
            for (let x = minX; x <= maxX; x++) {
                for (let y = minY; y <= maxY; y++) {
                    boxes.delete(`${x - xOff} ${y - yOff}`);
                    if (placingBoard.has(`${x} ${y}`)) {
                        boxes.set(`${x - xOff} ${y - yOff}`, {x: x - xOff, y: y - yOff});
                    }
                }
            }
            placingBoard = null;
            updateAfterChange();
            canvas.removeEventListener("mousemove", handleMove);
            canvas.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKey);
            resolve();
        };
        canvas.addEventListener("mousemove", handleMove);
        canvas.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKey);
        check();
    });
}

function drawBoard() {
    c.fillStyle = "#111111";
    c.fillRect(0, 0, numW * boxSize, numH * boxSize);

    if (trackPrev.checked) {
        c.fillStyle = "#000069";
        prevCells.forEach(({x, y}) => {
            c.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        });
    }

    c.fillStyle = "#308aff";
    for (let x = 0; x < numW; x++) {
        for (let y = 0; y < numH; y++) {
            let [newX, newY] = [x + xOff, y + yOff];
            let drawPlacingBoard = placingBoard && newX >= minX && newY >= minY && newX <= maxX && newY <= maxY;
            if (drawPlacingBoard? placingBoard.has(`${newX} ${newY}`) : boxes.has(`${x} ${y}`)) {
                c.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }
    }
    
    c.fillStyle = "#333";
    for (let y = 0; y <= numH; y++) {
        c.fillRect(0, y * boxSize, w, boxSize/6);
    }
    for (let x = 0; x <= numW; x++) {
        c.fillRect(x * boxSize, 0, boxSize/6, h);
    }

    c.fillStyle = "#f02";
    let lineSize = boxSize/3;
    if (chooseStage === 1) {
        c.fillRect(minX * boxSize - lineSize/2, 0, lineSize, h);
        c.fillRect(0, minY * boxSize - lineSize/2, w, lineSize);
    } else if (chooseStage === 2) {
        let x1 = minX * boxSize, x2 = maxX * boxSize;
        let y1 = minY * boxSize, y2 = maxY * boxSize;
        c.fillRect(x1, y1, x2-x1, lineSize);
        c.fillRect(x1, y1, lineSize, y2-y1);
        c.fillRect(x1, y2, x2-x1+lineSize, lineSize);
        c.fillRect(x2, y1, lineSize, y2-y1+lineSize);
    }
}

function saveBoard() {
    if (savedBoards.main.length < maxToSave) {
        savedBoards.main.unshift(new Map());
    } else {
        for (let i = savedBoards.main.length; i-- > 1;) {
            savedBoards.main[i] = savedBoards.main[i - 1];
        }
        savedBoards.main[0] = new Map();
    }
    boxes.forEach((value, key) => {
        savedBoards.main[0].set(key, value);
    });
    savedBoards.redo.length = 0;
}

function updateSpeedCounter() {
    let speed = Number(runSpeed.value);
    speedCount.textContent = `Speed: ${speed < 0? `${102 + speed}/s` : `x${Math.max(speed, 1)}`}`;
}

function updateGenCounter() {
    genCounter.textContent = `Generation ${generations}`;
}

function updateAfterChange() {
    if (resetGens.checked) {
        generations = 0;
        updateGenCounter();
        saveBoard();
    }
    prevCells = new Map();
    boxes.forEach((value, key) => {
        prevCells.set(key, value);
    });
    drawBoard();
}

function mouseCellLocation(event, canvas, round) {
    let func = round? "round" : "floor";
    let rect = canvas.getBoundingClientRect();
    let x = Math[func]((event.clientX - rect.left) / boxSize);
    let y = Math[func]((event.clientY - rect.top ) / boxSize);
    return {x, y};
}

function toggle(event, canvas) {
    if (placingBoard || chooseStage) { return; }
    let {x, y} = mouseCellLocation(event, canvas);
    
    if (boxes.has(`${x} ${y}`)) {
        boxes.delete(`${x} ${y}`);
    } else {
        boxes.set(`${x} ${y}`, {x, y});
    }
    updateAfterChange();
}

let neighborPositions = [
    {x: -1, y: -1},
    {x: +0, y: -1},
    {x: +1, y: -1},
    {x: -1, y: +0},
    {x: +1, y: +0},
    {x: -1, y: +1},
    {x: +0, y: +1},
    {x: +1, y: +1}
];

function next() {
    newBoxes.clear();
    possibleNew.clear();
    let positions = neighborPositions;

    boxes.forEach(({x, y}, key) => {
        let neighbors = 0;
        for (let i = positions.length; i-- > 0; ) {
            let neighborX = x + positions[i].x;
            let neighborY = y + positions[i].y;
            let neighborKey = `${neighborX} ${neighborY}`;
            
            if (boxes.has(neighborKey)) {
                neighbors++;
            } else if (possibleNew.has(neighborKey)) {
                possibleNew.get(neighborKey).neighbors++;
            } else {
                possibleNew.set(neighborKey, {x: neighborX, y: neighborY, neighbors: 1});
            }
        }
        
        if (neighbors >= 2 && neighbors <= 3) {
            newBoxes.set(key, {x, y});
        }
    });

    possibleNew.forEach(({x, y, neighbors}, key) => {
        if (neighbors === 3) {
            newBoxes.set(key, {x, y});
            prevCells.set(key, {x, y});
        }
    });
    
    [boxes, newBoxes] = [newBoxes, boxes];
    generations++;
    updateGenCounter();
    drawBoard();
}

function randomize() {
    boxes.clear();
    for (let x = 0; x < numW; x++) {
        for (let y = 0; y < numH; y++) {
            if (Math.random() < 0.5) {
                boxes.set(`${x} ${y}`, {x, y});
            }
        }
    }
    updateAfterChange();
}

function clear() {
    boxes.clear();
    updateAfterChange();
}

let running = false;
let curTimer = null;
function run() {
    if(running) {
        let speed = Number(runSpeed.value);
        let times = Math.max(speed, 1);
        for (let i = 0; i < times; i++) {
            next();
        }
        if (speed > 0) {
            curTimer = setTimeout(run, 0);
        } else {
            curTimer = setTimeout(run, 1000 / (102 + speed));
        }
    }
}

function startRunning() {
    running = true;
    
    startB.textContent = "Stop";
    startB.id = "stop";
    startB.onclick = stopRunning;
    
    run();
}

function stopRunning() {
    clearTimeout(curTimer);
    running = false;
    
    startB.textContent = "Start";
    startB.id = "start";
    startB.onclick = startRunning;
}

function resetBoard() {
    boxes.clear();
    savedBoards.main[0].forEach((value, key) => {
        boxes.set(key, value);
    });
    generations = 0;
    updateGenCounter();
    drawBoard();
}

function add() {
    let options = document.querySelectorAll("#pattern > option");
    let str = Array.from(options).find(el => el.selected)?.value;
    if (str) {
        placeBoard(MapCompressor.decompress(str), true).catch(() => {});
    }
}

function save() {
    chooseBoard().then(board => {
        let name = prompt("What should this pattern be called?");
        if (name) {
            minX = minY = Infinity;
            if (board.size > 0) {
                board.forEach(({x, y}) => {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                });
            } else {
                minX = minY = 0;
            }
            let adjustedBoard = new Map();
            board.forEach(({x, y}) => {
                x -= minX; y -= minY;
                adjustedBoard.set(`${x} ${y}`, {x, y});
            });
            board = adjustedBoard;

            let compressed = MapCompressor.compress(board);
            let RLE = MapCompressor.toRLE(board);
            console.log("The compressed string is", compressed);
            console.log("The RLE is", RLE);
            let newElement = document.createElement("option");
            newElement.value = RLE;
            newElement.appendChild(document.createTextNode(name));
            pattern.insertBefore(newElement, pattern.children[0]);
        }
    }, () => {});
}

function importBoard() {
    let str = prompt("Enter compressed string.");
    if (str) {
        placeBoard(MapCompressor.decompress(str), true).catch(() => {});
    }
}

function clearPart() {
    chooseBoard().then(() => {
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                boxes.delete(`${x} ${y}`);
            }
        }
        updateAfterChange();
    }, () => {});
}

function move() {
    chooseBoard().then(board => {
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                boxes.delete(`${x} ${y}`);
            }
        }
        updateAfterChange();
        placeBoard(board, false).catch(() => {});
    }, () => {});
}

function duplicate() {
    chooseBoard().then(board => {
        placeBoard(board, false).catch(() => {});
    }, () => {});
}

function tile() {
    chooseBoard().then(tileWith => {
        let tileSize = {x: maxX - minX + 1, y: maxY - minY + 1, xOff: minX, yOff: minY};
        chooseBoard().then(() => {
            for (let x = minX; x <= maxX; x++) {
                for (let y = minY; y <= maxY; y++) {
                    let tileX = (x - minX) % tileSize.x + tileSize.xOff;
                    let tileY = (y - minY) % tileSize.y + tileSize.yOff;
                    if (tileWith.has(`${tileX} ${tileY}`)) {
                        boxes.set(`${x} ${y}`, {x, y});
                    } else {
                        boxes.delete(`${x} ${y}`);
                    }
                }
            }
            updateAfterChange();
        }, () => {});
    }, () => {});
}

document.addEventListener("keyup", function(event) {
    let key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && key === "z") {
        if (event.shiftKey) {
            if (savedBoards.redo.length > 0) {
                savedBoards.main.unshift(savedBoards.redo.shift());
                resetBoard();
            }
        } else {
            savedBoards.redo.unshift(savedBoards.main.shift());
            resetBoard();
        }
    } else if (event.ctrlKey || event.metaKey || event.altKey) return;
    event.target.blur();
    
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i].id.toLowerCase();
        if(button !== "clear" && button[0] === key) {
            buttons[i].click();
            break;
        }
    }
});

window.addEventListener("beforeunload", event => {
    event.preventDefault();
    //event.returnValue = "Any unsaved changes will be lost!";
});

nextB.addEventListener("click", next);
randB.addEventListener("click", randomize);
clearB.addEventListener("click", clear);
startB.onclick = startRunning;
backB.addEventListener("click", resetBoard);
addB.addEventListener("click", add);
saveB.addEventListener("click", save);
importB.addEventListener("click", importBoard);
clearPartB.addEventListener("click", clearPart);
duplicateB.addEventListener("click", duplicate);
moveB.addEventListener("click", move);
tileB.addEventListener("click", tile);
trackPrev.addEventListener("change", () => { drawBoard(); });
runSpeed.addEventListener("input", () => { updateSpeedCounter(); });

updateSpeedCounter();
randomize();