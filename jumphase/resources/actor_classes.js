const rotateSpeed = 1.75;

// Prototype Actor class
class Actor {
    constructor(pos, char, prevPos=pos) {
        if (new.target === Actor) throw new Error("Cannot instantiate Actor directly");
        if (arguments.length < 2)  throw new Error("Actor constructor requires at least 2 arguments");
        this.pos = pos;
        this.char = char;
        this.prevPos = prevPos;
        this.remove = false; // Used to mark actors for removal
    }

    get type() {
        return "actor";
    }

    static create(pos, char, around) {
        return new Actor(pos, char);
    }

    collide(state, other) {
        return state;
    }

    update(time, state, keys) {
        return new Actor(this.pos, this.char);
    }
}
Actor.prototype.size = new Vec(1, 1);

// Actual actor classes
class Collectable extends Actor {
    constructor(pos, char, angle, flash) {
        if (arguments.length < 4) {
            throw new Error("Collectable constructor requires at least 4 arguments");
        }
        super(pos, char);
        this.angle = angle;
        this.flashInterval = 0.5;
        this.flashCyclePoint = flash % (this.flashInterval * 2);
        if (this.name === "clearRed") {
            this.displayPositionOffset = new Vec((1 - 1 / Math.SQRT2) / 2, (1 - 1 / Math.SQRT2) / 2);
            this.displaySize = new Vec(1 / Math.SQRT2, 1 / Math.SQRT2);
        }
        if (this.name === "key") {
            this.size = new Vec(0.5, 0.5);
        }
        if (this.name === "jumpBoost" || this.name === "noCross" || this.name === "allowCross") {
            let point = this.flashCyclePoint % this.flashInterval;
            let sub = point < this.flashInterval / 2 ? point * 0.99 : (this.flashInterval - point) * 0.99;
            let size = 1 - sub;
            this.displayPositionOffset = new Vec(sub / 2, sub / 2);
            this.size = new Vec(size, size);
        }
    }

    get type() {
        let flashString = this.flashCyclePoint < this.flashInterval ? "" : " flash";
        return `collectable ${this.name}${flashString}`;
    }

    get name() {
        let mapping = {
            "j": "jumpBoost",
            "d": "noCross",
            "u": "allowCross",
            "r": "clearRed",
            "k": "key",
        };
        return mapping[this.char] || this.char;
    }

    static create(pos, char) {
        char = char.toLowerCase();
        let newPos = char === "k" ? pos.add(new Vec(0.25, 0.25)) : pos;
        return new Collectable(newPos, char, 0, 0);
    }

    collide(state, other) {
        if (other.type.includes("player")) {
            // Remove this actor
            this.remove = true;
            let status = state.status;
            if (!state.actors.some(a => 
                    a.type.includes("collectable") && 
                    a.name === "key" && !a.remove)) {
                status = status.replace(/ ?locked/, "");
            }

            // Handle collectable actions
            let newState = new State(state.level, state.actors, status);
            if (this.name === "jumpBoost") {
                newState = newState.replaceActor(other, other.replaceAttr("jumpHeight", other.jumpHeight + 1));
            } else if (this.name === "clearRed") {
                newState.actors.forEach(a => {
                    if (a.type.includes("redWall")) {
                        a.remove = true; // Mark red walls for removal
                    }
                });
            } else if (this.name === "noCross") {
                newState = newState.replaceActor(other, other.replaceAttr("canCross", false));
            } else if (this.name === "allowCross") {
                newState = newState.replaceActor(other, other.replaceAttr("canCross", true));
            }
            return newState;
        }
        return state;
    }

    update(time) {
        let newAngle = this.name === "clearRed" ? this.angle + rotateSpeed * time : this.angle;
        return new Collectable(this.pos, this.char, newAngle, this.flashCyclePoint + time);
    }
}

class RedWall extends Actor {
    constructor(pos, char, aroundClasses) {
        super(pos, char);
        this.aroundClasses = aroundClasses;
    }

    get type() {
        let direction = this.char === "=" ? "horizontal" : "vertical";
        return `redWall ${direction} ${this.aroundClasses}`;
    }

    static create(pos, char, around) {
        let isVert = char === "|";
        let aroundClasses = `${
            !isVert || around.up !== char? "up" : ""} ${
            !isVert || around.down !== char? "down" : ""} ${
            isVert || around.left !== char? "left" : ""} ${
            isVert || around.right !== char? "right" : ""}`;
        return new RedWall(pos, char, aroundClasses);
    }

    collide(state, other) {
        return state;
    }

    update(time, state, keys) {
        return new RedWall(this.pos, this.char, this.aroundClasses);
    }
}

class Portal extends Actor {
    constructor(pos, char, counter) {
        super(pos, char);
        this.counter = counter;
        this.angle = counter % (Math.PI * 2);
        let angle = Math.abs(counter % (Math.PI / 2) - Math.PI / 4);
        let waveSize = Math.abs(Math.sin(angle + Math.PI / 4));
    }

    get type() {
        return "portal";
    }

    static create(pos, char) {
        let size = Portal.prototype.size;
        let newPos = pos.add(new Vec(2 - size.x, 2 - size.y).div(2));
        return new Portal(newPos, char, 0);
    }

    static rectCircleCollide(rx, ry, rw, rh, cx, cy, cr) {
        let nearestX = Math.max(rx, Math.min(rx + rw, cx));
        let nearestY = Math.max(ry, Math.min(ry + rh, cy));
        let dist = Math.hypot(nearestX - cx, nearestY - cy);
        return dist < cr;
    }

    collide(state, other) {
        if (other.type.includes("player")) {
            let collides = Portal.rectCircleCollide(
                other.pos.x, other.pos.y, other.size.x, other.size.y,
                this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, this.size.x / 2);
            if (!state.status.includes("locked") && collides) {
                let filtered = state.actors.filter(a => a !== other);
                let newStatus = state.status.replace("playing", "won");
                return new State(state.level, filtered, newStatus);
            }
        }
        return state;
    }

    update(time, state) {
        let newCounter = state.status.includes("locked")? this.counter : this.counter + rotateSpeed * time / 2;
        return new Portal(this.pos, this.passNum, newCounter);
    }
}
Portal.prototype.size = new Vec(1.8, 1.8);


class Box extends Actor {
    constructor(pos, char, speed, prevPos = pos) {
        if (arguments.length < 3) {
            throw new Error("Box constructor requires at least 3 arguments");
        }
        super(pos, char, prevPos);
        this.speed = speed;
        this.gravity = gravity;
    }

    get type() {
        return `box`;
    }

    static create(pos, char) {
        return new Box(pos, char, new Vec(0, 0));
    }

    update(time, state) {
        let yMotion = this.speed.y * time + 0.5 * this.gravity * time * time;
        let newYSpeed = this.speed.y + this.gravity * time;

        // Y-direction motion
        let pos = this.pos;
        let movedY = pos.add(new Vec(0, yMotion));
        let {blockingType} = this.getBlocking(state);
        let hitsRed = state.hits(movedY, this.size, "redWall box player", this);
        let touchesWall = state.level.touches(movedY, this.size, blockingType + " squareRed");
        let touch = touchesWall || hitsRed;
        if (!touch) {
            pos = movedY;
        } else {
            if (pos.y < touch.pos.y) {
                pos = new Vec(pos.x, touch.pos.y - this.size.y);
            } else {
                pos = new Vec(pos.x, touch.pos.y + touch.size.y);
            }
            newYSpeed = 0;
        }

        let newSpeed = new Vec(this.speed.x, newYSpeed);
        return new Box(pos, this.char, newSpeed, this.pos);
    }

    getBlocking(state) {
        let touchingWall = state.level.touches(this.pos, this.size, "wall");
        let touchingEmpty = state.level.touches(this.pos, this.size, "empty");
        let blockingType = "empty", axis = null;
        if (!touchingWall && touchingEmpty) {
            blockingType = "wall";
        } else if (touchingWall && touchingEmpty) {
            let wallDiff = touchingWall.pos.sub(this.pos);
            let emptyDiff = touchingEmpty.pos.sub(this.pos);
            axis = touchingWall.pos.x !== touchingEmpty.pos.x? "x" : "y";
            if (Math.abs(wallDiff[axis]) < Math.abs(emptyDiff[axis])) {
                blockingType = "empty";
            } else {
                blockingType = "wall";
            }
        }
        return {blockingType, axis};
    }

    correctXMotion(newPos, state) {
        let {blockingType} = this.getBlocking(state);
        let hitsRedY = state.hits(newPos, this.size, "redWall box player", this);
        let touchesWall = state.level.touches(newPos, this.size, blockingType + " squareRed");
        let touch = touchesWall || hitsRedY;
        let pos = this.pos;
        if (!touch) {
            pos = newPos;
        } else if (this.prevPos.x > touch.pos.x) {
            pos = new Vec(touch.pos.x + touch.size.x, pos.y);
        } else {
            pos = new Vec(touch.pos.x - this.size.x, pos.y);
        }
        return pos;
    }

    replaceAttr(attrName, newValue) {
        let newBox = new Box(this.pos, this.char, this.speed, this.prevPos);
        newBox[attrName] = newValue;
        return newBox;
    }
    
    collide(state, other) {
        if (other.type.includes("box")) {
            return "push";
        }
        return state;
    }
}

const playerXSpeed = 7;
const gravity = 40;
const jumpHeight = 3.15;

class Player extends Actor {
    constructor(pos, char, speed, jumpHeight, dir, canCross, prevPos = pos) {
        if (arguments.length < 6) {
            throw new Error("Player constructor requires at least 6 arguments");
        }
        super(pos, char, prevPos);
        this.speed = speed;
        this.jumpHeight = jumpHeight;
        this.canCross = canCross;
        this.xSpeed = playerXSpeed;
        this.gravity = gravity;
        this.dir = dir;
    }

    get type() {
        return `player ${this.dir} ${this.canCross? "cross" : "noCross"}`;
    }

    get jumpSpeed() {
        return Math.sqrt(2 * this.gravity * this.jumpHeight);
    }

    static create(pos, char) {
        let size = Player.prototype.size;
        pos = pos.add(new Vec((1 - size.x) / 2, 1 - size.y));
        return new Player(pos, char, new Vec(0, 0), jumpHeight, "", true);
    }

    update(time, state, keys) {
        let yMotion = this.speed.y * time + 0.5 * this.gravity * time * time;
        let newYSpeed = this.speed.y + this.gravity * time;

        // Compute the blocking type of wall
        let passThroughWall = newYSpeed < 0 && this.canCross;
        let {blockingType, axis} = this.getBlocking(state);

        // X-direction motion
        let xSpeed = 0;
        if (keys.ArrowLeft || keys.a) xSpeed -= this.xSpeed;
        if (keys.ArrowRight || keys.d) xSpeed += this.xSpeed;
        let pos = this.pos;
        let movedX = pos.add(new Vec(xSpeed * time, 0));
        let blockingTypeX = (passThroughWall || axis === "y"? "" : blockingType + " ") + "squareRed";
        let hitsRedX = state.hits(movedX, this.size, "redWall", this);
        let touchX = state.level.touches(movedX, this.size, blockingTypeX) || hitsRedX;
        if (!touchX) {
            pos = movedX;
        } else if (this.prevPos.x > touchX.pos.x) {
            pos = new Vec(touchX.pos.x + touchX.size.x, pos.y);
        } else {
            pos = new Vec(touchX.pos.x - this.size.x, pos.y);
        }

        // Y-direction motion
        let movedY = pos.add(new Vec(0, yMotion));
        let blockingTypeY = (passThroughWall? "" : blockingType + " ") + "squareRed";
        let hitsRedY = state.hits(movedY, this.size, "redWall", this);
        let hitsBoxY = state.hits(movedY, this.size, "box", this, 
            a => !(this.prevPos.y + this.size.y > a.prevPos.y && this.prevPos.y < a.prevPos.y + a.size.y) );
        let touchY = state.level.touches(movedY, this.size, blockingTypeY) || hitsRedY || hitsBoxY;
        if (!touchY) {
            pos = movedY;
        } else if ((keys.ArrowUp || keys.w) && this.prevPos.y < touchY.pos.y) {
            pos = new Vec(pos.x, touchY.pos.y - this.size.y);
            newYSpeed = -this.jumpSpeed;
        } else {
            if (this.prevPos.y < touchY.pos.y) {
                pos = new Vec(pos.x, touchY.pos.y - this.size.y);
            } else {
                pos = new Vec(pos.x, touchY.pos.y + touchY.size.y);
            }
            newYSpeed = 0;
        }

        let dirX = xSpeed > 0 ? "right" : xSpeed < 0 ? "left" : "";
        let dirY = newYSpeed > 0 ? "down" : newYSpeed < 0 ? "up" : "";
        let newSpeed = new Vec(xSpeed, newYSpeed), dir = `${dirX} ${dirY}`;
        return new Player(pos, this.char, newSpeed, this.jumpHeight, dir, this.canCross, this.pos);
    }

    getBlocking(state) {
        let touchingWall = state.level.touches(this.pos, this.size, "wall");
        let touchingEmpty = state.level.touches(this.pos, this.size, "empty");
        let blockingType = "empty", axis = null;
        if (!touchingWall && touchingEmpty) {
            blockingType = "wall";
        } else if (touchingWall && touchingEmpty) {
            let wallDiff = touchingWall.pos.sub(this.pos);
            let emptyDiff = touchingEmpty.pos.sub(this.pos);
            axis = touchingWall.pos.x !== touchingEmpty.pos.x? "x" : "y";
            if (Math.abs(wallDiff[axis]) < Math.abs(emptyDiff[axis])) {
                blockingType = "empty";
            } else {
                blockingType = "wall";
            }
        }
        return {blockingType, axis};
    }

    replaceAttr(attrName, newValue) {
        let newPlayer = new Player(this.pos, this.char, this.speed, this.jumpHeight, this.dir, this.canCross, this.prevPos);
        newPlayer[attrName] = newValue;
        return newPlayer;
    }
    
    collide(state, other) {
        if (other.type.includes("box")) {
            let isHorizontalCollision = this.prevPos.y + this.size.y > other.prevPos.y && this.prevPos.y < other.prevPos.y + other.size.y;
            if (isHorizontalCollision) {
                let newBoxX = other.pos.x;
                let pushRight = this.prevPos.x < other.prevPos.x;
                if (pushRight) {
                    newBoxX = this.pos.x + this.size.x;
                } else {
                    newBoxX = this.pos.x - other.size.x;
                }
                let newBoxPos = other.correctXMotion(new Vec(newBoxX, other.pos.y), state);
                let newThisPosX = this.pos.x;
                if (pushRight) {
                    newThisPosX = newBoxPos.x - this.size.x;
                } else {
                    newThisPosX = newBoxPos.x + other.size.x;
                }
                let newThisPos = new Vec(newThisPosX, this.pos.y);
                let newState = state
                    .replaceActor(other, other.replaceAttr("pos", newBoxPos))
                    .replaceActor(this, this.replaceAttr("pos", newThisPos));
                return newState;
            }
        }
        return state;
    }
}
Player.prototype.size = new Vec(0.8, 0.8);