const rotateSpeed = 1.75;

class Trampoline {
    constructor(pos, bounced) {
        this.pos = pos;
        this.bounced = bounced;
        this.bounceSpeed = 18;
    }

    static create(pos) {
        return new Trampoline(pos, false);
    }

    get type() { return `trampoline${this.bounced ? " bounce" : ""}`; }

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
            newSpeed = new Vec(player.speed.x, -this.bounceSpeed);
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
        this.flashInterval = 0.5;
        this.flash = flash % (this.flashInterval * 2);
    }

    get type() { return `key${this.flash < this.flashInterval ? "" : " flash"}`; }

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
Key.prototype.displayPositionOffset = new Vec((1 - 1 / Math.SQRT2) / 2, (1 - 1 / Math.SQRT2) / 2);
Key.prototype.displaySize = new Vec(1 / Math.SQRT2, 1 / Math.SQRT2);

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
        return new State(state.level, state.actors, state.status.replace("playing", "lost"), player);
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
        let waveSize = Math.abs(Math.sin(angle + Math.PI / 4));
        this.displaySize = new Vec(size.x * waveSize, size.y * waveSize);
        this.displayPositionOffset = new Vec((2 - this.displaySize.x) / 4, (2 - this.displaySize.y) / 4);
    }

    get type() {
        return `portal ${this.passNum}`;
    }

    isLocked(state) {
        return state.status.includes("locked") && this.passNum === Infinity;
    }

    static create(pos, char) {
        if (char === "@") {
            return new Portal(pos, Infinity, 0);
        } else if (char === "!") {
            return new Portal(pos, 1, 0);
        }
    }

    collide(state, player) {
        debugger;
        if (this.isLocked(state)) return state;
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

    update(time, state) {
        let newCounter = this.isLocked(state)? this.counter : this.counter + rotateSpeed * time;
        return new Portal(this.pos, this.passNum, newCounter);
    }
}
Portal.prototype.size = new Vec(2, 2);

const playerXSpeed = 7;
const gravity = 40;
const jumpSpeed = 17;

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
            return new Player(pos, new Vec(null, 0), jumpSpeed, playerXSpeed, gravity, 1, { char });
        } else if (char === "r") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, -playerXSpeed, gravity, 1, { char });
        } else if (char === "y") {
            return new Player(pos, new Vec(0, 0), jumpSpeed, playerXSpeed, gravity, 1, { char });
        } else if (char === "g") {
            return new Player(pos, new Vec(null, 0), 0, playerXSpeed, gravity, 1, { char });
        } else if (char === "u") {
            return new Player(pos, new Vec(null, 0), -jumpSpeed, playerXSpeed, -gravity, 1, { char });
        } else if (char === "s") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, 0, gravity, 1, { char });
        } else if (char === "w") {
            return new Player(pos, new Vec(null, 0), jumpSpeed, playerXSpeed, gravity, -1, { char });
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
        let dir = typeof dirY === "string" ? `${dirX} ${dirY}` : this.dir;
        let speed = new Vec(typeof this.speed.x === "number" ? xSpeed : null, ySpeed);
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
        let widthAdj = prevSide.x < 0 ? that.size.x : prevSide.x > 0 ? -this.size.x : 0;
        let heightAdj = prevSide.y < 0 ? that.size.y : prevSide.y > 0 ? -this.size.y : 0;
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
        let newPlayer = new Player(this.pos, this.speed, this.jumpSpeed, this.xSpeed, this.gravity, this.toggle, this.sig, this.dir, this.prevPos);
        newPlayer[name] = value;
        return newPlayer;
    }
}
Player.prototype.size = new Vec(0.95, 0.95);