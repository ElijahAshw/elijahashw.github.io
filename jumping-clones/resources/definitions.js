/* A lot of the code ported from https://eloquentjavascript.net/16_game.html then modified */

const playerXSpeed = 7;
const gravity = 40;
const jumpSpeed = 17;
const bounceSpeed = 18;
const keyFlashInterval = 0.5;
const endTime = 0.15;
const fadeTime = 0.5;
const scale = 20;
const menuWidth = 6;
const menuScale = scale * 3.4;
const menuItemSize = scale * 2.65;
const menuBorderWidth = menuItemSize * 4 / 53;
const keyDelay = 0.2;
const rotateSpeed = 1.75;
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "r", "b", "Escape", " ", "Enter"]);

   function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
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
    let overlay = elt("div", {class: "fade-overlay"});
    overlay.style.opacity = out? 0 : 1;
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
            } else if (ending < endTime) {
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
    let wrapper = elt("div", {class: "wrapper"});
    parent.appendChild(wrapper);
    let level = 0;
    for (;;) {
        level = await runMenu(plans, wrapper, level, levelStatus, Display);
        while(level < plans.length) {
            let status = await runLevel(new Level(plans[level]), level, wrapper, Display);
            levelStatus = levelStatus.slice();
            console.log(staa);
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
            {class: "end", 
                style: `line-height: ${scale}px;
                font-size: ${scale * 2}px;
                width: ${endLevel.width * scale}px;`}, 
            "Thanks for Playing");
        wrapper.appendChild(text);
        let status;
        do {
            status = await runLevel(endLevel, null, wrapper, Display);
        } while (status !== "won" && status !== "break");
        text.remove();
    }
}

function elt(name, props, ...children) {
    let el = document.createElement(name);
    for (let prop of Object.keys(props)) {
        el.setAttribute(prop, props[prop]);
    }
    for (let child of children) {
        if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
        } else {
            el.appendChild(child);
        }
    }
    return el;
}

function notWall(level, x, y) {
    return ["empty", "lava", "spike"].includes(level.rows[y]?.[x]) || "";
}

function createGrid(level) {
    return elt("table", {
        class: "background", 
        style: `width: ${level.width * scale}px;`
    }, ...level.rows.map((row, y) => 
        elt("tr", {style: `height: ${scale}px;`}, 
            ...row.map((type, x) => elt("td", {
                class: `${type}${
                    (notWall(level, x, y - 1) && " top") + 
                    (notWall(level, x, y + 1) && " bottom") + 
                    (notWall(level, x - 1, y) && " left") + 
                    (notWall(level, x + 1, y) && " right")}`, 
                "data-number": (x ^ y) & 1})))
    ));
} 

function createActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {
            class: `actor ${actor.type}`});
        let size = actor.dispSize || actor.size;
        let pos = actor.dispPosAdd? actor.pos.add(actor.dispPosAdd) : actor.pos;
        rect.style.width = `${size.x * scale}px`;
        rect.style.height = `${size.y * scale}px`;
        rect.style.left = `${pos.x * scale}px`;
        rect.style.top = `${pos.y * scale}px`;
        if (actor.angle) rect.style.transform = `rotate(${actor.angle}rad)`;
        return rect;
    }));
}

function createMenuBlocks(numLevels, selected, width, height, levelStatus) {
    let leftOff = (width * scale - Math.min(menuWidth, numLevels) * menuScale) / 4;
    let topOff = scale;
    return new Array(numLevels).fill(undefined).map((_, n) => elt("div", {
            class: `menu-item ${n === selected? "selected" : ""}`,
            style: `left: ${(n % menuWidth) * menuScale + leftOff}px;
            top: ${Math.floor(n / menuWidth) * menuScale + topOff}px;
            border-width: ${menuBorderWidth}px;
            width: ${menuItemSize}px;
            height: ${menuItemSize}px;
            line-height: ${menuItemSize}px;
            font-size: ${menuItemSize * 0.55}px;`,
            "data-status": levelStatus[n]}, String(n+1)));
}

function overlapX(pos1, size1, pos2, size2) {
    return pos1.x + size1.x > pos2.x && pos1.x < pos2.x + size2.x;
}

function overlapY(pos1, size1, pos2, size2) { 
    return pos1.y + size1.y > pos2.y && pos1.y < pos2.y + size2.y;
}

function actorOverlap(actor1, actor2) {
    return overlapX(actor1.pos, actor1.size, actor2.pos, actor2.size) && 
                    overlapY(actor1.pos, actor1.size, actor2.pos, actor2.size);
}

function overlap(pos1, size1, pos2, size2) {
    return overlapX(pos1, size1, pos2, size2) && overlapY(pos1, size1, pos2, size2);
}

function collidePos1D(y1, prevY1, y2, prevY2, size) {
    let jump1 = y1 - prevY1, jump2 = y2 - prevY2;
    let distToCover = Math.abs(prevY2 - prevY1 - size);
    let distCovered = Math.abs(jump1) + Math.abs(jump2);
    let jumpFraction = distToCover / distCovered;
    let newY1 = prevY1 + jump1 * jumpFraction;
    let newY2 = prevY2 + jump2 * jumpFraction;
    return [newY1, newY2];
}

function collidePos(pos1, prevPos1, pos2, prevPos2, size) {
    let [x1, x2] = collidePos1D(pos1.x, prevPos1.x, pos2.x, prevPos2.x,    size.x);
    let [y1, y2] = collidePos1D(pos1.y, prevPos1.y, pos2.y, prevPos2.y,    size.y);
    console.log(pos1, prevPos1, pos2, prevPos2, size);
    return [new Vec(x1, y1), new Vec(x1, y1)];
}

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(that) {
        return new Vec(this.x + that.x, this.y + that.y);
    }

    sub(that) {
        return new Vec(this.x - that.x, this.y - that.y);
    }

    mult(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

    div(factor) {
        return new Vec(this.x / factor, this.y / factor);
    }

    toString() { return `Vec [${this.x}, ${this.y}]`; }
}

class DOMDisplay {
    constructor(parent, level, curLevel, levelStatus, numLevels, menu) {
        if (menu) {
            let width = (level.width - 2) * scale;
            let height = (level.height - 2) * scale;
            this.menuBlocks = createMenuBlocks(numLevels,
                curLevel, level.width, level.height, levelStatus);
            this.menu = elt("div", {class: "menu", 
                style: `width: ${(level.width - 2) * scale}px;
                height: ${(level.height - 2) * scale}px;
                padding: ${scale}px;`}, 
                elt("div", {class: "levels-wrapper", style:`
                height: ${Math.ceil(numLevels / menuWidth) * menuScale}px;`},
                ...this.menuBlocks));
            this.bgLevel = level;
            this.dom = elt("div", {class: "game"}, 
                createGrid(level), 
                elt("p", {class: "menu-text", 
                        style: `font-size: ${scale * 0.8}px;
                        left: ${scale}px;
                        top: ${(level.height - 1.5) * scale}px;`}, 
                        "Based on ", 
                        elt("a", {href:"https://www.puzzleplayground.com/jumping_clones"},
                            "https://www.puzzleplayground.com/jumping_clones")),
                this.menu);
            this.first = true;
        } else {
            this.dom = elt("div", {
                    class: "game", style: `width: ${level.width * scale}px;
                    height: ${level.height * scale}px;`}, createGrid(level), 
                    elt("p", {class: "level-text", 
                    style: `font-size: ${scale * 0.8}px;
                    right: ${scale * 0.1}px;
                    top: ${scale * -0.8}px;`}, 
                    curLevel === null? "" : `Level ${curLevel + 1}`));
            this.actorLayer = null;
        }
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }

    syncState(state, ending, explode) {
        if (this.actorLayer) this.actorLayer.remove();
        if (this.dots) this.dots.remove();
        this.actorLayer = createActors(state.actors.filter(a => a !== explode));
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        if (state.status.includes("lost") && ending !== 0) {
            this.dom.style.transform = `translate(${Math.cos(ending * Math.PI * 40) * 4}px, ${Math.sin(ending * Math.PI * 40) * 4}px)`;
            if (explode.pos) {
                let dotNum = 12;
                this.dots = elt("div", {class: "explode-wrapper"}, 
                    ...new Array(dotNum).fill(null).map(
                        (_, i) => elt("div", {class: "explode-dot", style: `
                            left: ${(explode.pos.x + explode.size.x / 2) * scale}px;
                            top: ${(explode.pos.y + explode.size.y / 2) * scale}px;
                            width: ${scale / 4}px;
                            height: ${scale / 4}px;
                            opacity: ${1.03 - ending / endTime};
                            transform: translate(-50%, -50%)
                            rotate(${i * Math.PI * 2 / dotNum}rad)
                            translateX(${ending * 300}px);`})));
                this.dom.appendChild(this.dots);
            }
        }
    }

    syncMenuState(menuState, keys) {
        let prevIndex = this.menuBlocks.findIndex(b => b.className.includes("selected"));
        let prevBlock = this.menuBlocks[prevIndex];
        prevBlock.className = prevBlock.className.replace("selected", "");
        this.menuBlocks[menuState.level].className += " selected";
        if (prevIndex != menuState.level || keys.ArrowUp || 
            keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight || this.first) {
            this.first = false;
            if (Math.floor(menuState.level / menuWidth) * 
                    menuScale - this.menu.scrollTop < 0) {
                this.menu.scrollTop = 
                    Math.floor(menuState.level / menuWidth + 1) * menuScale - menuItemSize;
            } else if (Math.floor(menuState.level / menuWidth) * menuScale + 
                    menuBorderWidth*2 + menuItemSize - this.menu.scrollTop > 
                    (this.bgLevel.height - 3) * scale) {
                this.menu.scrollTop = Math.floor(menuState.level / menuWidth) * menuScale - 
                    (this.bgLevel.height - 3) * scale + menuBorderWidth * 2 + menuItemSize;
            }
        }
    }
}

class MenuState {
    constructor(numLevels, startLevel, status, last) {
        this.numLevels = numLevels;
        this.level = startLevel;
        this.status = status;
        this.last = last;
    }

    update(time, keys, levelStatus) {
        let level = this.level;
        let status = this.status;
        let last = this.last;
        if (last <= 0) {
            let keyPressed = false;
            if (keys.ArrowLeft) {
                level--;
                keyPressed = true;
            }
            if (keys.ArrowRight) {
                level++;
                keyPressed = true;
            }
            if (keys.ArrowUp) {
                level -= menuWidth;
                keyPressed = true;
            }
            if (keys.ArrowDown) {
                level += menuWidth;
                keyPressed = true;
            }
            
            if (keyPressed && level >= 0 && 
                level < this.numLevels && levelStatus[level] != 0) {
                last = keyDelay;
            } else {
                level = this.level;
            }
        } else {
            last -= time;
            if (!keys.ArrowLeft && !keys.ArrowRight && !keys.ArrowUp && !keys.ArrowDown) {
                last = 0;
            }
        }
        if (keys[" "] || keys.Enter) status = "chosen";
        return new MenuState(this.numLevels, level, status, last);
    }

    static start(numLevels, curLevel) {
        return new MenuState(numLevels, curLevel, "choosing", 0);
    }
}

class Trampoline {
    constructor(pos, bounced) {
        this.pos = pos;
        this.bounced = bounced;
    }

    static create(pos) {
        return new Trampoline(pos, false);
    }

    get type() { return `trampoline${this.bounced? " bounce" : ""}`; }

    collide(state, player) {
        let actors = state.actors.slice();
        let newSpeed, bounced = false;
        if (player.prevPos.y + player.size.y >= this.pos.y) {
            if (player.prevPos.y >= this.pos.y + this.size.y) {
                newSpeed = new Vec(player.speed.x, 0);
            } else {
                newSpeed = player.speed;
            }
        } else {
            newSpeed = new Vec(player.speed.x, -bounceSpeed);
            bounced = true;
        }
        state = state.replaceActor(player, player.backout(this).set("speed", newSpeed));
        if (bounced) state = state.replaceActor(this, new Trampoline(this.pos, true));
        return state;
    }

    update() {
        return new Trampoline(this.pos, false);
    }
}
Trampoline.prototype.size = new Vec(1, 1);

class Key {
    constructor(pos, angle, flash) {
        this.pos = pos;
        this.angle = angle;
        this.flash = flash % (keyFlashInterval * 2);
    }

    get type() { return `key${this.flash < keyFlashInterval? "" : " flash"}`; }

    static create(pos) {
        return new Key(pos, 0, 0);
    }

    collide(state) {
        let thisKey = this;
        let filtered = state.actors.filter(a => a !== thisKey);
        let status = state.status;
        if (!filtered.some(a => a.type.includes("key"))) {
            status = status.replace(/ ?locked/, "");
        }
        return new State(state.level, filtered, status, state.dead);
    }

    update(time) {
        return new Key(this.pos, this.angle + rotateSpeed * time, this.flash + time);
    }
}
Key.prototype.size = new Vec(1, 1);
Key.prototype.dispPosAdd = new Vec((1 - 1 / Math.SQRT2) / 2, (1 - 1 / Math.SQRT2) / 2);
Key.prototype.dispSize = new Vec(1 / Math.SQRT2, 1 / Math.SQRT2);

class Spike {
    constructor(pos, size, dir) {
        this.pos = pos;
        this.size = size;
        this.dir = dir;
    }

    get type() { return `spike ${this.dir}`; }

    static create(pos, char) {
        if (char === "^") {
            return new Spike(pos.add(new Vec(0, 0.5)), new Vec(1, 0.5), "up");
        } else if (char === "v") {
            return new Spike(pos, new Vec(1, 0.5), "down");
        } else if (char === "<") {
            return new Spike(pos.add(new Vec(0.5, 0)), new Vec(0.5, 1), "left");
        } else if (char === ">") {
            return new Spike(pos, new Vec(0.5, 1), "right");
        }
    }

    collide(state, player) {
        return new State(state.level, state.actors,
            state.status.replace("playing", "lost"), player);
    }

    update() {
        return new Spike(this.pos, this.size, this.dir);
    }
}

class Teleporter {
  constructor(pos, num, ported = null, newPorted = null) {
    this.pos = pos;
    this.num = num;
    this.ported = ported;
    this.newPorted = newPorted;
  }

  get type() { return `teleporter ${this.num}`; }

  static create(pos, char) {
    return new Teleporter(pos, Number(char));
  }

  collide(state, player) {
    let current = this;
    let that = state.actors.find(a => a.type === current.type && a !== current);
    if (this.ported === player.sig || this.newPorted === player.sig) {
      state = state.replaceActor(this, this.setNewPorted(player.sig));
    } else if (!that.ported && !that.newPorted) {
      state = state.replaceActor(player, player.set("pos", that.pos));
      state = state.replaceActor(that, that.setNewPorted(player.sig));
    }
    
    return state;
  }
  
  setNewPorted(playerSig) {
    return new Teleporter(this.pos, this.num, this.ported, playerSig);
  }

  update(time) {
    return new Teleporter(this.pos, this.num, this.newPorted);
  }
}
Teleporter.prototype.size = new Vec(1, 1);

class Portal {
    constructor(pos, passNum, counter) {
        this.pos = pos;
        this.passNum = passNum;
        this.counter = counter;
        this.angle = counter % (Math.PI * 2);
        let size = Portal.prototype.size;
        let angle = Math.abs(counter % (Math.PI / 2) - Math.PI / 4);
        let waveSize = Math.abs(Math.sin(angle + Math.PI/4));
        this.dispSize = new Vec(size.x * waveSize, size.y * waveSize);
        this.dispPosAdd = new Vec((2-this.dispSize.x)/4, (2-this.dispSize.y)/4);
    }

    get type() { return `portal ${this.passNum}`; }

    static create(pos, char) {
        if (char === "@") {
            return new Portal(pos, Infinity, 0);
        } else if (char === "!") {
            return new Portal(pos, 1, 0);
        }
    }

    collide(state, player) {
        debugger;
        if (state.status.includes("locked") && this.passNum === Infinity) return state;
        let filtered = state.actors;
        if (this.passNum > 1) {
            state = state.replaceActor(this, new Portal(this.pos, this.passNum - 1, this.angle));
            filtered = state.actors.filter(a => a != player);
        } else if (this.passNum > 0) {
            filtered = state.actors.filter(a => a != this && a != player);
        }
        let status = state.status;
        if (!filtered.some(a => a.type.includes("player"))) {
            status = status.replace("playing", "won");
        }
        return new State(state.level, filtered, status, state.dead);
    }
  
    update(time) {
        return new Portal(this.pos, this.passNum, this.counter + rotateSpeed * time);
    }
}
Portal.prototype.size = new Vec(2, 2);

class Player {
    constructor(pos, speed, jumpSpeed, xSpeed, gravity, toggle, sig, dir = "", prevPos) {
        this.pos = pos;
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        this.xSpeed = xSpeed;
        this.gravity = gravity;
        this.toggle = toggle;
        this.sig = sig;
        this.dir = dir;
        this.prevPos = prevPos || pos;
    }

    get type() { return `player ${this.sig.char} ${this.dir}`; }

    static create(pos, char) {
        let size = Player.prototype.size;
        pos = pos.add(new Vec((1 - size.x) / 2, 1 - size.y));
        if (char !== char.toLowerCase()) {
            pos = pos.add(new Vec(0.5, 0));
            char = char.toLowerCase();
        }
        if (char === "n") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, playerXSpeed, gravity, 1, {char});
        } else if (char === "r") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, -playerXSpeed, gravity, 1, {char});
        } else if (char === "y") {
            return new Player(pos, new Vec(0, 0), jumpSpeed, playerXSpeed, gravity, 1, {char});
        } else if (char === "g") {
            return new Player(pos, new Vec(null, 0), 0, playerXSpeed, gravity, 1, {char});
        } else if (char === "u") {
            return new Player(pos, new Vec(null, 0), -jumpSpeed, playerXSpeed, -gravity, 1, {char});
        } else if (char === "s") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, 0, gravity, 1, {char});
        } else if (char === "w") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, playerXSpeed, gravity, -1, {char});
        }
    }

    update(time, state, keys) {
        let xSpeed = 0;
        if (keys.ArrowLeft) xSpeed -= this.xSpeed;
        if (keys.ArrowRight) xSpeed += this.xSpeed;
        if (this.speed.x && !xSpeed) xSpeed = this.speed.x;
        let pos = this.pos;
        let movedX = pos.add(new Vec(xSpeed * time, 0));
        let touch = state.level.touches(movedX, this.size, "wall");
        if (!touch) {
            pos = movedX;
        } else if (xSpeed < 0) {
            pos = new Vec(touch.pos.x + touch.size.x, pos.y);
        } else {
            pos = new Vec(touch.pos.x - this.size.x, pos.y);
        }

        let newJumpSpeed = this.jumpSpeed, newGravity = this.gravity;
        let ySpeed = this.speed.y + time * this.gravity;
        let movedY = pos.add(new Vec(0, ySpeed * time));
        touch = state.level.touches(movedY, this.size, "wall");
        if (!touch) {
            pos = movedY;
        } else if (keys.ArrowUp && (ySpeed > 0 ^ this.gravity < 0)) {
            if (ySpeed > 0) pos = new Vec(pos.x, touch.pos.y - this.size.y);
            else pos = new Vec(pos.x, touch.pos.y + touch.size.y);
            ySpeed = -this.jumpSpeed * this.toggle;
            newJumpSpeed *= this.toggle;
            newGravity *= this.toggle;
        } else {
            if (ySpeed > 0) pos = new Vec(pos.x, touch.pos.y - this.size.y);
            else pos = new Vec(pos.x, touch.pos.y + touch.size.y);
            ySpeed = 0;
        }
        
        let dirX = xSpeed > 0 ? "right" : xSpeed < 0 ? "left" : "";
        let dirY = ySpeed > 0 ? "down" : ySpeed < 0 ? "up" : "";
        return this.fromNewPos(pos, xSpeed, ySpeed, dirX, dirY, newJumpSpeed, newGravity);
    }

    fromNewPos(pos, xSpeed, ySpeed, dirX, dirY, jumpSpeed = this.jumpSpeed, gravity = this.gravity) {
        let dir = typeof dirY === "string"? `${dirX} ${dirY}` : this.dir;
        let speed = new Vec(typeof this.speed.x === "number"? xSpeed : null, ySpeed);
        return new Player(pos, speed, jumpSpeed, this.xSpeed, gravity, this.toggle, this.sig, dir, this.pos);
    }

  /*collide(state, that) {
    let thisNewPos, thatNewPos;
    let thisNewSpeed = this.speed, thatNewSpeed = that.speed;

    let prevPosDiff = this.prevPos.y - that.prevPos.y;
    if (Math.abs(prevPosDiff) >= this.size.y) {
      let [thisNewY, thatNewY] = collidePos1D(
        this.pos.y, this.prevPos.y, that.pos.y, that.prevPos.y,  this.size.y);
      thisNewPos = new Vec(this.pos.x, thisNewY)
      thatNewPos = new Vec(that.pos.x, thatNewY);
      if (prevPosDiff > 0) {
        thisNewSpeed = new Vec(thisNewSpeed.x, 0);
      } else {
        thatNewSpeed = new Vec(thatNewSpeed.x, 0);
      }
    } else {
      let [thisNewX, thatNewX] = collidePos1D(
        this.pos.x, this.prevPos.x, that.pos.x, that.prevPos.x,  this.size.x);
      thisNewPos = new Vec(thisNewX, this.pos.y)
      thatNewPos = new Vec(thatNewX, that.pos.y);
    }
    console.log(""+thisNewPos, ""+thatNewPos);
    state = state.replaceActor(this, 
      this.set("pos", thisNewPos).set("speed", thisNewSpeed));
    state = state.replaceActor(that, 
      that.set("pos", thatNewPos).set("speed", thatNewSpeed));
    return state;
  }*/

    collide(state, that) {
        debugger;
        let prevSide = that.prevPos.sub(this.prevPos);
        let diff = that.pos.sub(this.pos);
        let widthAdj = prevSide.x < 0? that.size.x : prevSide.x > 0? -this.size.x : 0;
        let heightAdj = prevSide.y < 0? that.size.y : prevSide.y > 0? -this.size.y : 0;
        let adjust = new Vec(widthAdj, heightAdj);
        let move = diff.add(adjust).mult(0.5);

        state = state.replaceActor(this, this.set("pos", this.pos.add(move)));
        state = state.replaceActor(that, that.set("pos", that.pos.add(move.mult(-1))));
        return state;
    }
  
    backout(actor, keys = Object.create(null)) {
        let actorPos = actor.prevPos || actor.pos;
        let pos = this.prevPos;
        let xSpeed = this.pos.x - pos.x;
        if (this.speed.x && !xSpeed) xSpeed = this.speed.x;
        let movedX = new Vec(this.pos.x, pos.y);
        if (!overlap(movedX, this.size, actorPos, actor.size)) {
            pos = movedX;
        } else if (xSpeed < 0) {
            pos = new Vec(actor.pos.x + actor.size.x, pos.y);
        } else {
            pos = new Vec(actor.pos.x - this.size.x, pos.y);
        }

        let ySpeed = this.pos.y - pos.y;
        let movedY = new Vec(pos.x, this.pos.y);
        if (!overlap(movedY, this.size, actorPos, actor.size)) {
            pos = movedY;
        } else if (keys.ArrowUp && (ySpeed > 0 ^ this.gravity < 0) && 
            actor.type.includes("player")) {
            ySpeed = -this.jumpSpeed;
        } else {
            if (ySpeed > 0) {
                pos = new Vec(pos.x, actor.pos.y - this.size.y);
            } else {
                pos = new Vec(pos.x, actor.pos.y + actor.size.y);
            }
            ySpeed = 0;
        }

        return this.fromNewPos(pos, xSpeed, ySpeed);
    }

    set(name, value) {
        let newPlayer = new Player(this.pos, this.speed, this.jumpSpeed, 
            this.xSpeed, this.gravity, this.toggle, this.sig, this.dir, this.prevPos);
        newPlayer[name] = value;
        return newPlayer;
    }
}
Player.prototype.size = new Vec(0.95, 0.95);

const levelChars = {
    "^": Spike, "v": Spike, "<": Spike, ">": Spike, 
    ".": "empty", "#": "wall", "~": "lava", "=": Trampoline, "+": Key, 
    "@": Portal, "!": Portal, 
    "n": Player, "N": Player, "g": Player, "G": Player, "y": Player, "Y": Player, 
    "r": Player, "R": Player, "u": Player, "U": Player, "s": Player, "S": Player, 
    "w": Player, "W": Player, 
    "0": Teleporter, "1": Teleporter, "2": Teleporter, "3": Teleporter, 
    "4": Teleporter, "5": Teleporter, "6": Teleporter, "7": Teleporter, 
    "8": Teleporter, "9": Teleporter
};

class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(row => [...row]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        this.rows = rows.map((row, y) => row.map((char, x) => {
            let type = levelChars[char];
            if (typeof type === "string") return type;
            this.startActors.push(type.create(new Vec(x, y), char));
            return "empty";
        }));
    }

    touches(pos, size, type) {
        let xStart = Math.floor(pos.x);
        let xEnd = Math.ceil(pos.x + size.x);
        let yStart = Math.floor(pos.y);
        let yEnd = Math.ceil(pos.y + size.y);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
                let here = isOutside? "lava" : this.rows[y][x];
                if (here === type) return {pos: new Vec(x, y), size: new Vec(1, 1)};
            }
        }
        return false;
    }
}

class State {
    constructor(level, actors, status, dead) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.dead = dead;
    }
  
    static start(level) {
        let locked = level.startActors.some(a => a.type.includes("key"));
        return new State(level, level.startActors, `playing ${locked? " locked" : ""}`, null);
    }

    get players() {
        return this.actors.filter(a => a.type.includes("player"));
    }

    get numPlayers() {
        return this.actors.reduce((num, a) => a.type.includes("player")? num + 1 : num, 0);
    }

    hits(pos, size, type) {
        for (let actor of this.actors) {
            if (actor.type.includes(type) && overlap(pos, size, actor.pos, actor.size)) {
                return actor;
            }
        }
        return false;
    }

    replaceActor(actor, newActor) {
        let actors = this.actors.slice();
        actors[actors.indexOf(actor)] = newActor;
        return new State(this.level, actors, this.status, this.dead);
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        /* ^ move blocks keeping track of prevPos ^ */
        let newState = new State(this.level, actors, this.status, this.dead);

        if (!newState.status.includes("playing")) return newState;

        let playerMoved = false;
        let loopCount = 0;
        do {
            let players = newState.players;
            playerMoved = false;
            loopCount++;

            for (let i = 0, l = players.length; i < l; i++) {
                let player = players[i];
                if (this.level.touches(player.pos, player.size, "lava")) {
                    return new State(this.level, actors, 
                        newState.status.replace("playing", "lost"), player);
                }
            }

            for (let i = players.length; i-- > 0;) {
                let numPlayers = newState.numPlayers;
                for (let j = newState.actors.length; j-- > 0;) {
                    let actor = newState.actors[j];
                    if (numPlayers !== newState.numPlayers) break;
                    let player = newState.players[i];
                    if (actor !== player && actorOverlap(actor, player)) {
                        playerMoved = true;
                        newState = actor.collide(newState, player);
                    }
                }
            }
        } while (playerMoved && loopCount < 400);

        return newState;
    }
}
