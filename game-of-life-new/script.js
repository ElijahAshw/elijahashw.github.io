let boxSize = 6;
/* Variables */
const buttons = document.querySelectorAll("body > button, #part-button-wrapper > button");
const nextB = document.querySelector("#next");
const randB = document.querySelector("#randomize");
const clearB = document.querySelector("#clear");
const startB = document.querySelector("#start");
const backB = document.querySelector("#back");
const addB = document.querySelector("#add");
const saveB = document.querySelector("#save");
const importB = document.querySelector("#import");
const clearPartB = document.querySelector("#clearpart");
const duplicateB = document.querySelector("#duplicate");
const moveB = document.querySelector("#move");
const tileB = document.querySelector("#tile");
const copyB = document.querySelector("#copy"); // Copy doesn't erase previous pattern
const periodB = document.querySelector("#period");
const advanceB = document.querySelector("#advance");
const speedCount = document.querySelector("#speed-counter");
const genCounter = document.querySelector("#counter");
const runSpeed = document.querySelector("#speed");
const pattern = document.querySelector("#pattern");
const resetGens = document.querySelector("#reset");
const trackPrev = document.querySelector("#track");
const periodDialog = document.querySelector("#fastModeDialog");
const fastModeB = document.querySelector("#chooseFast");
const slowModeB = document.querySelector("#chooseSlow");
const calcPeriodDialog = document.querySelector("#periodDialog");
const cancelB = document.querySelector("#cancel");
const periodResultDialog = document.querySelector("#periodResult");
const closeB = document.querySelector("#close");
const periodResults = document.querySelectorAll("#periodResult > div.result");
const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");

let boxes = new Map(), newBoxes = new Map(), possibleNew = new Map(), prevCells = new Map();
let savedBoards = {main: [], redo: [], periodBoard: new Map()}, placingBoard = null, generations = 0;
let [minX, minY, maxX, maxY, xOff, yOff] = [Infinity, Infinity, -Infinity, -Infinity, 0, 0];
let chooseStage = null, maxToSave = 20, numW = 227*1, numH = 145*1, w, h;


canvas.setAttribute("width", (w = numW*boxSize+1) + "px");
canvas.setAttribute("height", (h = numH*boxSize+1) + "px");

const MapCompressor = (function() {
    const chars = "!#$%&'()*+¶-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª¯°±µ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽˀˁ˂˃˄˅˪˫˭ˮ˵˶˸˹˺˻˼˽˾ͱͲͳʹ͵ͶͷͻͼͽͿ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓ";
    const RLErow = /[\dabcdeo.$]{0,69}[abcdeo.$!]/gi;
    const startRLE = /x ?= ?\d+, ?y ?= ?\d+(, ?rule ?= ?[^ \n]+)? *\r?\n?\r?/i;
    const extras = /([^]*x ?= ?\d+, ?y ?= ?\d+(, ?rule ?= ?[^ \n]+))?\r?\n?\r?| |![^]*/gi;
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

const BinaryCompressor = (function() {
    const chars = "!#$%&'()*+¶-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª¯°±µ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽˀˁ˂˃˄˅˪˫˭ˮ˵˶˸˹˺˻˼˽˾ͱͲͳʹ͵ͶͷͻͼͽͿ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓ";
    
    function compress(from) {
        let result = "";
        let curCount = 0;
        let curCountingChar = "";
        let jump = Math.floor(Math.log(chars.length) / Math.log(2));
        for (let i = 0, l = from.length; i < l; i += jump) {
            let indexOfNextChar = 0;
            for (let j = 0; j < jump; j++) {
                if (i + j < l) {
                    let curValue = Number(from[i + j]);
                    indexOfNextChar += curValue << j;
                }
            }
            let nextChar = chars[indexOfNextChar];
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
        
        if (curCount === 1) {
            result += curCountingChar;
        } else if (curCount) {
            result += "" + curCount + curCountingChar;
        }
        
        return `${result}`;
    }
    
    return {compress};
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

function placeBoard(board, setMinMax = true, clearSquare = true) {
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
                    if (clearSquare) {
                        boxes.delete(`${x - xOff} ${y - yOff}`);
                    }
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
    cx.fillStyle = "#111111";
    cx.fillRect(0, 0, numW * boxSize, numH * boxSize);

    if (trackPrev.checked) {
        cx.fillStyle = "#000069";
        prevCells.forEach(({x, y}) => {
            cx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        });
    }

    cx.fillStyle = "#308aff";
    for (let x = 0; x < numW; x++) {
        for (let y = 0; y < numH; y++) {
            let [newX, newY] = [x + xOff, y + yOff];
            let drawPlacingBoard = placingBoard && newX >= minX && newY >= minY && newX <= maxX && newY <= maxY;
            if (drawPlacingBoard? placingBoard.has(`${newX} ${newY}`) : boxes.has(`${x} ${y}`)) {
                cx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }
    }
    
    cx.fillStyle = "#333";
    for (let y = 0; y <= numH; y++) {
        cx.fillRect(0, y * boxSize, w, boxSize/6);
    }
    for (let x = 0; x <= numW; x++) {
        cx.fillRect(x * boxSize, 0, boxSize/6, h);
    }

    cx.fillStyle = "#f02";
    let lineSize = boxSize/3;
    if (chooseStage === 1) {
        cx.fillRect(minX * boxSize - lineSize/2, 0, lineSize, h);
        cx.fillRect(0, minY * boxSize - lineSize/2, w, lineSize);
    } else if (chooseStage === 2) {
        let x1 = minX * boxSize, x2 = maxX * boxSize;
        let y1 = minY * boxSize, y2 = maxY * boxSize;
        cx.fillRect(x1, y1, x2-x1, lineSize);
        cx.fillRect(x1, y1, lineSize, y2-y1);
        cx.fillRect(x1, y2, x2-x1+lineSize, lineSize);
        cx.fillRect(x2, y1, lineSize, y2-y1+lineSize);
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

function getRegion(startX, startY, endX, endY) {
    let result = new Map();
    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (boxes.has(`${x} ${y}`)) {
                result.set(`${x} ${y}`, {x, y});
            }
        }
    }
    return result;
}

function mapToBinaryString(inputMap, startX, startY, endX, endY) {
    let result = "";
    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            result += inputMap.has(`${x} ${y}`)? "1" : "0";
        }
    }
    return result;
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
            if (x >= 0 && y >= 0 && x <= numW && y <= numH) {
                prevCells.set(key, {x, y});
            }
        }
    });
    
    [boxes, newBoxes] = [newBoxes, boxes];
    generations++;
    updateGenCounter();
    drawBoard();
}

function randomize() {
    chooseBoard().then(() => {
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                if (Math.random() < 0.5) boxes.set(`${x} ${y}`, {x, y});
                else boxes.delete(`${x} ${y}`);
            }
        }
        updateAfterChange();
    }, () => {});
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
            curTimer = requestAnimationFrame(run, 0);
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

function copy() {
    chooseBoard().then(board => {
        placeBoard(board, false, false).catch(() => {});
    }, () => {});
}


function determinePeriod() {
    chooseBoard().then(async () => {
        let boardStrings = [];
        let runFast = false;
        let canceled = false;
        let showPrevCells = trackPrev.checked;
        let period = 0;

        periodDialog.showModal();
        runFast = await new Promise((resolve) => {
            fastModeB.onclick = () => {
                periodDialog.close();
                resolve(true);
            };
            slowModeB.onclick = () => {
                periodDialog.close();
                resolve(false);
            };
        });

        calcPeriodDialog.showModal();
        period = await new Promise((resolve) => {
            let timeOut = null;

            cancelB.onclick = () => {
                canceled = true;
                clearTimeout(timeOut);
                resolve("Canceled");
            };

            trackPrev.checked = false;
            let checkRound = () => {
                for (let i = 0; i < 30; i++) {
                    let regionMap = getRegion(minX, minY, maxX, maxY);
                    let regionString = mapToBinaryString(regionMap, minX, minY, maxX, maxY);
                    let newBoardString = BinaryCompressor.compress(regionString);
                    next();

                    if (boardStrings.includes(newBoardString)) {
                        resolve(period - boardStrings.indexOf(newBoardString));
                        return;
                    } else {
                        period++;
                    }

                    if (!runFast || boardStrings.length === 0) {
                        boardStrings.push(newBoardString);
                    }
                }
                drawBoard();
                if (!canceled) {
                    timeOut = requestAnimationFrame(checkRound, 0);
                }
            };

            checkRound();
        });
        calcPeriodDialog.close();
        trackPrev.checked = showPrevCells;
        resetBoard();
        drawBoard();

        closeB.onclick = () => { periodResultDialog.close(); };
        periodResultDialog.showModal();
        if (canceled) {
            periodResults[0].style.display = "block";
            periodResults[1].style.display = "none";
        } else {
            periodResults[1].textContent = `The period of this region is ${period}`;
            periodResults[0].style.display = "none";
            periodResults[1].style.display = "block";
        }
    }, () => {});
}

function advanceSection() {
    chooseBoard().then(async () => {
        let previousBoard = new Map();
        boxes.forEach((value, key) => {
            previousBoard.set(key, value);
        });

        next();
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                previousBoard.delete(`${x} ${y}`);
                if (boxes.has(`${x} ${y}`)) previousBoard.set(`${x} ${y}`, {x, y});
                else previousBoard.delete(`${x} ${y}`);
            }
        }

        boxes.clear();
        previousBoard.forEach((value, key) => {
            boxes.set(key, value);
        });
        updateAfterChange();
    });
}

document.addEventListener("keyup", async function(event) {
    let key = event.key.toLowerCase();
    if (event.ctrlKey || event.metaKey) {
        if (key === "z" && !event.shiftKey && savedBoards.main.length > 0) {
            resetBoard();
            savedBoards.redo.unshift(savedBoards.main.shift());
        } else if (key === "y" || key === "z" && event.shiftKey) {
            if (savedBoards.redo.length > 0) {
                savedBoards.main.unshift(savedBoards.redo.shift());
                resetBoard();
            }
        } else if (key === "v") {
            try {
                let clipboardContents = await navigator.clipboard.read(), text = "";
                for (let item of clipboardContents) {
                    if (item.types.includes("text/plain")) {
                        text = await (await item.getType("text/plain")).text();
                        break;
                    }
                }
                if (text) {
                    console.log(text);
                    placeBoard(MapCompressor.decompress(text), true).catch(() => {});
                }
            } catch (err) {
                if (err instanceof DOMException) alert("Cannot read clipboard.");
                else throw err;
            }
        }
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    event.target.blur();
    
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i].id.toLowerCase();
        if(button !== "clear" && button[0] === key) {
            buttons[i].click();
            break;
        } else if (button === "advance" && key === "e") {
            buttons[i].click();
        }
    }
});

window.addEventListener("beforeunload", event => {
    event.preventDefault();
    event.returnValue = "Any unsaved changes will be lost!";
});

pattern.addEventListener("change", () => { pattern.blur(); });

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
copyB.addEventListener("click", copy);
periodB.addEventListener("click", determinePeriod);
advanceB.addEventListener("click", advanceSection);
trackPrev.addEventListener("change", () => { drawBoard(); });
runSpeed.addEventListener("input", () => { updateSpeedCounter(); });

updateSpeedCounter();
clear();