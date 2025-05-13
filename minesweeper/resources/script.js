let gameStarted = false;
let gameIsOver = false;
let won = false;
let blockSize = 38;
let flagMode = false;
let inputsValid = true;
let board = document.createElement("div");
let menu = document.querySelector("#start");
let endBox = document.querySelector("#end");
let endText = document.querySelector("#end > p");
let inputs = document.querySelectorAll(".size");
let difficulty = document.querySelector("#difficulty");
let difficultyLabel = document.querySelector("#difficulty-label");
let numBlocksX = 0;
let numBlocksY = 16;

let blocks = [];
let dirs = [
    [-1, +0],
    [+1, +0],
    [+0, -1],
    [+0, +1],
    [-1, -1],
    [+1, -1],
    [-1, +1],
    [+1, +1],
];

function checkWin() {
    won = true;

    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[0].length; j++) {
            let b = blocks[i][j];

            if (b.bomb ? !b.flagged : !b.clicked) {
                won = false;
            }
        }
    }

    return won;
}

function checkBlocks() {
    if (checkWin()) {
        endText.textContent = "You won!";
        endBox.setAttribute("data-show", "true");
        endText.style.color = "#f5cc00";
    } else if (gameIsOver) {
        endText.textContent = "You lost.";
        endBox.setAttribute("data-show", "true");
        endText.style.color = "#ff0022";
    }
}

function resetBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[0].length; j++) {
            blocks[i][j].allClicked = false;
            blocks[i][j].element.setAttribute("data-game-over", gameIsOver);
        }
    }

    checkBlocks();
}

function validateInputs() {
    let allValid = true;

    for (let i = 0; i < inputs.length; i++) {
        allValid &&= inputs[i].checkValidity();
    }

    menu.setAttribute("data-valid", allValid);

    return allValid;
}


class Block {
    constructor(i, j) {
        Object.assign(this, {
            i: i,
            j: j,
            element: document.createElement("div"),
            flags: 0,
            bombs: 0,
            showBomb: false,
            _bomb: false,
            _clicked: false,
            _flagged: false,
            allClicked: false,
            timeout: undefined,
        });

        Object.defineProperties(this, {
            bomb: {
                get: () => {
                    return this._bomb;
                },
                set: bomb => {
                    this._bomb = Boolean(bomb);
                    this.element.setAttribute("data-bomb", bomb);
                }
            },
            flagged: {
                get: () => {
                    return this._flagged;
                },
                set: flagged => {
                    this._flagged = Boolean(flagged);
                    this.element.setAttribute("data-flagged", flagged);
                }
            },
            clicked: {
                get: () => {
                    return this._clicked;
                },
                set: clicked => {
                    this._clicked = Boolean(clicked);
                    this.element.setAttribute("data-clicked", clicked);
                }
            },
        })

        let curThis = this;
        Object.assign(this.element, {
            className: "block",
            textContent: " ",
            onmousedown: event => curThis.onmousedown(event),
            onmouseup: event => curThis.onmouseup(event),
            ontouchstart: event => curThis.ontouchstart(event),
            ontouchend: event => curThis.ontouchend(event),
        });

        Object.assign(this.element.style, {
            width: blockSize + "px",
            height: blockSize + "px",
            fontSize: blockSize * 0.8 + "px",
            top: j * blockSize + "px",
            left: i * blockSize + "px",
            lineHeight: blockSize + "px",
        });

        this.bomb = this.bomb;
        this.flagged = this.flagged;
        this.clicked = this.clicked;
    }

    onmousedown() {
        if (!this.timeout && !gameIsOver) {
            let curThis = this;
            this.timeout = setTimeout(() => {
                curThis.timeout = undefined;
                curThis.clickOn("first", true);
            }, 400);
        }
    }

    onmouseup(event) {
        if (this.timeout && !gameIsOver) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
            this.clickOn("first", event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || flagMode);
        }
    }

    ontouchstart(event) {
        event.preventDefault();
        if (!this.timeout && !gameIsOver) {
            let curThis = this;
            this.timeout = setTimeout(() => {
                curThis.timeout = undefined;
                curThis.clickOn("first", true);
            }, 400);
        }
    }

    ontouchend(event) {
        event.preventDefault();
        if (this.timeout && !gameIsOver) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
            this.clickOn("first", event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || flagMode);
        }
    }

    setBomb(value) {
        this.bomb = value;
    }

    clickOn(first, flag) {
        if (flag) {
            this.flag();
        } else {
            if (!this.flagged) {
                this.clicked = true;

                if (this.bomb) {
                    gameIsOver = true;

                    if (first) {
                        resetBlocks();
                    }
                } else {
                    this.element.textContent = this.bombs || " ";
                    this.clickAround();

                    if (first) {
                        resetBlocks();
                    }
                }
            }
        }
    }

    flag() {
        if (!this.clicked) {
            this.flagged = !this.flagged;
            checkBlocks();
        }
    }

    clickAround() {
        let i = this.i, j = this.j;

        this.setFlags();

        let click = (x, y) => {
            if (x >= 0 && x < numBlocksX && y >= 0 && y < numBlocksY && !blocks[y][x].flagged) {
                if (!blocks[y][x].allClicked) {
                    blocks[y][x].allClicked = true;
                    blocks[y][x].clickOn();
                }
            }
        };

        if (this.flags === this.bombs) {
            for (let d = 0; d < dirs.length; d++) {
                click(j + dirs[d][0], i + dirs[d][1]);
            }
        }
    }

    setBombs() {
        let i = this.i, j = this.j;

        this.bombs = 0;
        for (let d = 0; d < dirs.length; d++) {
            let x = j + dirs[d][0];
            let y = i + dirs[d][1];

            if (x >= 0 && x < numBlocksX && y >= 0 && y < numBlocksY) {
                if (blocks[y][x].bomb) {
                    this.bombs++;
                }
            }
        }

        this.element.setAttribute("data-bombs", this.bombs);
    }

    setFlags() {
        let i = this.i, j = this.j;

        this.flags = 0;

        for (let d = 0; d < dirs.length; d++) {
            let x = j + dirs[d][0];
            let y = i + dirs[d][1];

            if (x >= 0 && x < numBlocksX && y >= 0 && y < numBlocksY) {
                if (blocks[y][x].flagged && !blocks[y][x].clicked) {
                    this.flags++;
                }
            }
        }
    }
}


function start(level) {
    if (level === "easy") {
        numBlocksX = 10;
        numBlocksY = 10;
    } else if (level === "medium") {
        numBlocksX = 20;
        numBlocksY = 20;
    } else if (level === "hard") {
        numBlocksX = 30;
        numBlocksY = 30;
    } else if (level === "custom") {
        if (!validateInputs()) {
            return;
        }

        numBlocksX = Number(inputs[0].value);
        numBlocksY = Number(inputs[1].value);

        if (Number.isNaN(numBlocksX) || Number.isNaN(numBlocksY)) {
            throw new Error("Invalid input.");
        }
    }

    let totalBlocks = numBlocksX * numBlocksY;

    this.disabled = true;

    menu.style.display = "none";

    board.id = "board";
    board.style.width = numBlocksX * blockSize + "px";
    board.style.height = numBlocksY * blockSize + "px";

    document.body.appendChild(board);

    for (let i = 0; i < numBlocksY; i++) {
        let row = [];

        for (let j = 0; j < numBlocksX; j++) {
            let newBlock = new Block(i, j);

            row.push(newBlock);
            board.appendChild(newBlock.element);
        }

        blocks.push(row);
    }

    let bombArray = Array(totalBlocks);
    for (let i = 0; i < bombArray.length; i++) {
        bombArray[i] = i < totalBlocks * difficulty.value / 100;
    }

    for (let i = 0; i < bombArray.length; i++) {
        let randIndex = Math.floor(Math.random() * bombArray.length);
        let temp = bombArray[i];
        bombArray[i] = bombArray[randIndex];
        bombArray[randIndex] = temp;
    }

    for (let i = 0; i < bombArray.length; i++) {
        let y = Math.floor(i / numBlocksX), x = i % numBlocksX;
        if (bombArray[i]) blocks[y][x].setBomb(true);
    }

    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            blocks[i][j].setBombs();
        }
    }

    let emptyBlocks = [];
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (blocks[i][j].bombs === 0 && !blocks[i][j].bomb) {
                emptyBlocks.push(blocks[i][j]);
            }
        }
    }

    if (emptyBlocks.length) {
        let randomBlock = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
        randomBlock.clickOn("start", false);
        randomBlock.element.scrollIntoView(false);
    } else {
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks[i].length; j++) {
                if (blocks[i][j].bomb) {
                    blocks[i][j].flag();
                }
            }
        }
    }
}

function onDifficultyInput() {
    difficultyLabel.textContent = this.value;
    localStorage.setItem("difficulty", String(this.value));
}

difficulty.addEventListener("input", onDifficultyInput);

inputs[0].addEventListener("input", validateInputs);

inputs[1].addEventListener("input", validateInputs);

window.addEventListener("keyup", function (event) {
    board.setAttribute("data-flag-mode", Boolean(flagMode ^= !(event.key === "Control" || event.key === "Meta")));
    event.preventDefault();
});

validateInputs();

let curDifficulty = Number(localStorage.getItem("difficulty"));
if (curDifficulty || curDifficulty === 0) {
    difficulty.value = curDifficulty;
    onDifficultyInput.call(difficulty);
}