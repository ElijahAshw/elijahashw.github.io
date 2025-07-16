const fadeTime = 0.5;
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "r", "b", "Escape", " ", "Enter"]);

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

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 50) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function fade(wrapper, out) {
    let timePassed = 0;
    let overlay = elt("div", { class: "fade-overlay" });
    overlay.style.opacity = out ? 0 : 1;
    wrapper.appendChild(overlay);
    return new Promise(resolve => {
        runAnimation(time => {
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

async function runLevel(level, levelNumber, wrapper, Display) {
    let display = new Display(wrapper, level, levelNumber);
    let state = State.start(level);
    let ending = 0;
    state = state.update(0, arrowKeys);
    display.syncState(state, ending);
    await fade(wrapper, false);
    let value = await new Promise(resolve => {
        runAnimation(time => {
            if (state.status.includes("playing")) {
                state = state.update(time, arrowKeys);
                display.syncState(state, ending);
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
                display.syncState(state, ending, state.dead || {});
                return true;
            } else {
                resolve(state.status);
                return false;
            }
        });
    });
    await fade(wrapper, true);
    display.clear();
    return value;
}

async function runMenu(plans, wrapper, curLevel, levelStatus, Display) {
    let bgLevel = new Level(MENU_LEVEL);
    let display = new Display(wrapper, bgLevel,
        curLevel, levelStatus, plans.length, true);
    let state = MenuState.start(plans.length, curLevel);
    state = state.update(0, arrowKeys, levelStatus);
    display.syncMenuState(state, arrowKeys);
    await fade(wrapper, false);
    let value = await new Promise(resolve => {
        runAnimation(time => {
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
    await fade(wrapper, true);
    display.clear();
    return value;
}

async function runGame(plans, parent, Display) {
    let numL = plans.length;
    let item = "111";
    let levelStatus = [...item.padEnd(numL, "1").slice(0, numL)];
    let wrapper = elt("div", { class: "wrapper" });
    parent.appendChild(wrapper);
    let level = 0;
    for (; ;) {
        level = await runMenu(plans, wrapper, level, levelStatus, Display);
        while (level < plans.length) {
            let status = await runLevel(new Level(plans[level]), level, wrapper, Display);
            levelStatus = levelStatus.slice();
            status = status.trim();
            if (status === "won") {
                levelStatus[level] = 2;
                levelStatus[level + 1] = Math.max(1, levelStatus[level + 1]);
                level++;
            } else if (status === "break") {
                level = await runMenu(plans, wrapper, level, levelStatus, Display);
            }
        }
        level--;
        let endLevel = new Level(END_LEVEL);
        let text = elt("p",
            {
                class: "end",
                style: `line-height: ${scale}px;
                font-size: ${scale * 2}px;
                width: ${endLevel.width * scale}px;`
            },
            "Thanks for Playing");
        wrapper.appendChild(text);
        let status;
        do {
            status = await runLevel(endLevel, null, wrapper, Display);
        } while (status !== "won" && status !== "break");
        text.remove();
    }
}