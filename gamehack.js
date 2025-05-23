let canvas = document.getElementById("output-canvas");

function simulateCanvasClick(x, y) {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0,
    });
    canvas.dispatchEvent(event);
}

function simulateKeyPress(keyCode) {
    const event = new KeyboardEvent('keydown', {
        key: String.fromCharCode(keyCode),
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
    });
    canvas.focus();
    canvas.dispatchEvent(event);
}

function simulateKeyRelease(keyCode) {
    const event = new KeyboardEvent('keyup', {
        key: String.fromCharCode(keyCode),
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
    });
    canvas.focus();
    canvas.dispatchEvent(event);
}

/* Examples
["click", 100, 200],
["keydown", "a"],
["keyup", "a"],
*/
const gamePatterns = [
    [
        ["click", 300, 300],
    ],
];

const gamePattern = gamePatterns[0];
let currentCommand = 0;

let interval = setInterval(() => {
    try {
        if (!canvas) {
            throw new Error("Canvas element not found.");
        }
        if (currentCommand < gamePattern.length) {
            const command = gamePattern[currentCommand];
            console.log(command);
            const action = command[0];

            if (action === "click") {
                const x = command[1];
                const y = command[2];
                simulateCanvasClick(x, y);
            } else if (action === "keydown") {
                const keyCode = command[1].charCodeAt(0);
                simulateKeyPress(keyCode);
            } else if (action === "keyup") {
                const keyCode = command[1].charCodeAt(0);
                simulateKeyRelease(keyCode);
            }

            currentCommand++;
        } else {
            clearInterval(interval);
            console.log("Game pattern completed.");
        }
    } catch (error) {
        clearInterval(interval);
        throw error;
    }
}, 200);

// For StayFocusd
let txtarea = document.querySelector('[data-testid="challenge-text"]');
let strng = `The procrastinator is often remarkably optimistic about his ability to complete a task on a tight deadline; this is usually accompanied by expressions of reassurance that everything is under control. (Therefore, there is no need to start.) Lulled by a false sense of security, time passes. At some point, he crosses over an imaginary starting time and suddenly realizes, "Oh no! I am not in control! There isn't enough time!" And also, the procrastinator is often remarkably optimistic about his ability to complete a task on a tight deadline; this is usually accompanied by expressions of reassurance that everything is under control. (Therefore, there is no need to start.) Lulled by a false sense of security, time passes. At some point, he crosses over an imaginary starting time and suddenly realizes, "Oh no! I am not in control! There isn't enough time!"`;
txtarea.onkeypress = (event) => {
    event.preventDefault();
    txtarea.value = (strng.slice(0, String(txtarea.value).length + 1));
    txtarea.dispatchEvent(new Event("input"));
};


let txtarea = document.querySelector('[data-testid="challenge-text"]');
let str = `The procrastinator is often remarkably optimistic about his ability to complete a task on a tight deadline; this is usually accompanied by expressions of reassurance that everything is under control. (Therefore, there is no need to start.) Lulled by a false sense of security, time passes. At some point, he crosses over an imaginary starting time and suddenly realizes, "Oh no! I am not in control! There isn't enough time!" And also, the procrastinator is often remarkably optimistic about his ability to complete a task on a tight deadline; this is usually accompanied by expressions of reassurance that everything is under control. (Therefore, there is no need to start.) Lulled by a false sense of security, time passes. At some point, he crosses over an imaginary starting time and suddenly realizes, "Oh no! I am not in control! There isn't enough time!"`;
txtarea.onkeypress = (event) => {
    event.preventDefault();
    let counter = 0;
    let interval = setInterval(() => {
        if (counter >= str.length || counter !== txtarea.value.length) {
            clearInterval(interval);
            return;
        }
        txtarea.value = str.slice(0, ++counter);
        txtarea.dispatchEvent(new Event("input"));
    }, 1);
};