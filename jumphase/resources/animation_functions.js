const fadeTime = 0.5;
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d", "r", "b", "Escape", " ", "Enter"]);
let animating = true; // Used to stop the animation loop from the console for debugging

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    trackKeys.unregister = () => {
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    };
    return down;
}

// The Game class is used to run the game
class Game {
    constructor(plans, parent, Display) {
        this.plans = plans;
        this.parent = parent;
        this.wrapper = null;
        this.Display = Display;
    }

    async runGame() {
        let numL = this.plans.length;
        let item = "111";
        let levelStatus = [...item.padEnd(numL, "1").slice(0, numL)];
        this.wrapper = elt("div", { class: "wrapper" });
        this.parent.appendChild(this.wrapper);
        let level = 0;
        for (;;) {
            level = await this.runMenu(level, levelStatus);
            while (level < this.plans.length) {
                let status = await this.runLevel(new Level(this.plans[level]), level);
                levelStatus = levelStatus.slice();
                status = status.trim();
                if (status === "won") {
                    levelStatus[level] = 2;
                    levelStatus[level + 1] = Math.max(1, levelStatus[level + 1]);
                    level++;
                } else if (status === "break") {
                    level = await this.runMenu(level, levelStatus);
                }
            }
            level--;
            let endLevel = new Level(END_LEVEL);
            let text = elt("p",
                {
                    class: "end",
                    style: `line-height: ${scale}px;
                            font-size: ${scale * 2}px;
                            width: ${endLevel.width * scale}px;`.replace(/\s+/g, " ")
                },
                "Thanks for Playing");
            this.wrapper.appendChild(text);
            let status;
            do {
                status = await this.runLevel(endLevel, null);
            } while (status !== "won" && status !== "break");
            text.remove();
        }
    }

    async runMenu(curLevel, levelStatus) {
        let bgLevel = new Level(MENU_LEVEL);
        let display = new this.Display(this.wrapper, bgLevel, curLevel, levelStatus, this.plans.length, true);
        let state = MenuState.start(this.plans.length, curLevel);
        state = state.update(0, arrowKeys, levelStatus);
        display.syncMenuState(state, arrowKeys);
        await this.fade(false);
        let value = await new Promise(resolve => {
            this.runAnimation(time => {
                state = state.update(time, arrowKeys, levelStatus);
                display.syncMenuState(state, arrowKeys);
                if (state.status.includes("choosing")) {
                    return true;
                } else {
                    resolve(state.level);
                    return false;
                }
            })
        });
        await this.fade(true);
        display.clear();
        return value;
    }


    async runLevel(level, levelNumber) {
        let display = new this.Display(this.wrapper, level, levelNumber);
        let state = State.start(level);
        let ending = 0;
        state = state.update(0, arrowKeys);
        display.syncState(state, ending);
        await this.fade(false);
        let value = await new Promise(resolve => {
            this.runAnimation(time => {
                if (state.status.includes("playing")) {
                    let wasUpArrow = arrowKeys.ArrowUp;
                    if (levelNumber === null) {
                        // On the last level, set the up arrow key to true so the player jumps
                        arrowKeys.ArrowUp = true;
                    }
                    state = state.update(time, arrowKeys);
                    display.syncState(state, ending);
                    arrowKeys.ArrowUp = wasUpArrow; // Reset the up arrow key
                }

                if (arrowKeys.r) {
                    resolve("lost");
                    return false;
                } else if (arrowKeys.b || arrowKeys.Escape) {
                    resolve("break");
                    return false;
                } else if (state.status.includes("playing")) {
                    return true;
                } else if (ending < levelEndDelay) {
                    ending += time;
                    display.syncState(state, ending);
                    return true;
                } else {
                    resolve(state.status);
                    return false;
                }
            });
        });
        await this.fade(true);
        display.clear();
        return value;
    }

    fade(out) {
        let timePassed = 0;
        let overlay = elt("div", { class: "fade-overlay" });
        overlay.style.opacity = out ? 0 : 1;
        this.wrapper.appendChild(overlay);
        return new Promise(resolve => {
            this.runAnimation(time => {
                timePassed += time;
                if (timePassed > fadeTime) {
                    overlay.remove();
                    resolve("done");
                    return false;
                } else if (out) {
                    overlay.style.opacity = timePassed / fadeTime;
                } else {
                    overlay.style.opacity = 1 - timePassed / fadeTime;
                }
                return true;
            });
        });
    }

    runAnimation(frameFunc) {
        let lastTime = null;
        function frame(time) {
            if (lastTime != null) {
                let timeStep = Math.min(time - lastTime, 50) / 1000;
                if (frameFunc(timeStep) === false || animating === false) {
                    return;
                }
            }
            lastTime = time;
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }
}
