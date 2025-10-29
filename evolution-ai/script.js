// Parameters: [<intial value>, <boolean changeable>, <optional min value>, <optional max value>]
const globalParameters = {
    groundY: {value: 290, changeable: true, min: 1, max: 299},
    // These two are special
    startingCreatures: [],
    evalFunc: creature => creature.getAverageX(),
};
const changeLaterParameters = {
    numCreatures: {value: 90, changeable: true, min: 2, max: 200},
    runSpeed: {value: 20, changeable: true, min: 1, max: 300},
};
const gravity = 0.2;
const raceFrames = 800;

const evolveCheck = document.getElementById("evolve-check");
const genCounter = document.getElementById("gen-counter");
const speedCounter = document.getElementById("speed-counter");
const controlsWrapper = document.getElementById("controls");
const canvas = document.getElementById("display-canvas");
const cx = canvas.getContext("2d");
let width = canvas.width = 800;
let height = canvas.height = 300;

let template = {nodes: 3, springs: [[0, 1], [1, 2], [2, 0]]};
let config = {template, x: 400, y: 200, width: 800, numCreatures: 10, discard: 5};
let creatureSys = new CreatureSystem(config);
let evolving = false;

function background() {
    cx.fillStyle = 'rgba(199, 199, 199, 1)';
    cx.fillRect(0, 0, width, height);
}

function updateInfo() {
    genCounter.textContent = `Generations: ${creatureSys.stats.generations}`;
    speedCounter.textContent = `Fastest speed: ${creatureSys.bestSpeed.toFixed(2)}`;
}

function display() {
    creatureSys.display(background, cx);
}

async function evolve() {
    evolving = true;
    await creatureSys.evolveVisual(raceFrames, globalParameters.evalFunc, cx, background);
    updateInfo();
    evolving = false;
}

async function evolveFast() {
    await creatureSys.evolveFast(raceFrames, globalParameters.evalFunc, changeLaterParameters.runSpeed);
    display();
    updateInfo();
}

async function startEvolving() {
    evolving = true;
    while (evolveCheck.checked) {
        await evolveFast();
    }
    evolving = false;
}

document.getElementById("evolve-button").addEventListener("click", () => { !evolving && evolve(); });
document.getElementById("evolve-fast-button").addEventListener("click", () => { !evolving && evolveFast(); });
document.getElementById("display-creatures").addEventListener("click", () => { display(); });
evolveCheck.addEventListener("change", () => { !evolving && evolveCheck.checked? startEvolving() : (evolveCheck.checked = false); });
evolve();
