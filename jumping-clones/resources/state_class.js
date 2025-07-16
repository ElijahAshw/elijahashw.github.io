class State {
    constructor(level, actors, status, dead) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.dead = dead;
    }

    static start(level) {
        let locked = level.startActors.some(a => a.type.includes("key"));
        return new State(level, level.startActors, `playing ${locked ? " locked" : ""}`, null);
    }

    get players() {
        return this.actors.filter(a => a.type.includes("player"));
    }

    get numPlayers() {
        return this.actors.reduce((num, a) => a.type.includes("player") ? num + 1 : num, 0);
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
                    return new State(this.level, actors, newState.status.replace("playing", "lost"), player);
                }
            }

            for (let i = players.length; i-- > 0;) {
                let numPlayers = newState.numPlayers;
                for (let j = newState.actors.length; j-- > 0;) {
                    let actor = newState.actors[j];
                    if (numPlayers !== newState.numPlayers) break;
                    let player = newState.players[i];
                    if (actor !== player && actorOverlap(actor, player)) {
                        // playerMoved = true;
                        newState = actor.collide(newState, player);
                    }
                }
            }
        } while (playerMoved && loopCount < 400);

        return newState;
    }
}