function actorPush(state, actor1, actor2) {
    // Use a loop to resolve collisions between actor1 and actor2 and any other relevant actors
    let collideSide = true;
}

class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        let locked = level.startActors.some(a => a.name === "key") ? " locked" : "";
        return new State(level, level.startActors, `playing${locked}`, null);
    }

    hits(pos, size, type, currentActor, verify) {
        let types = type.trim().split(/\s+/);
        for (let actor of this.actors) {
            if (currentActor === actor) continue;
            let rightType = types.some(t => actor.type.includes(t));
            if (rightType && overlap(pos, size, actor.pos, actor.size)) {
                if (!verify || verify(actor)) return actor;
            }
        }
        return false;
    }

    replaceActor(actor, newActor) {
        let actors = this.actors.slice();
        actors[actors.indexOf(actor)] = newActor;
        return new State(this.level, actors, this.status);
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status);

        if (!newState.status.includes("playing")) return newState;
        
        for (let i = newState.actors.length; i-- > 0;) {
            let actor1 = newState.actors[i];
            if (actor1.remove) continue;
            for (let j = newState.actors.length; j-- > i;) {
                let actor2 = newState.actors[j];
                if (actor2.remove) continue;
                if (!actor1 || !actor2 || !actor1.pos || !actor2.pos) debugger;
                if (actorOverlap(actor1, actor2)) {
                    let actor1Result = actor1.collide(newState, actor2);
                    newState = typeof actor1Result === "object" ? actor1Result : newState;
                    let actor2Result = actor2.collide(newState, actor1);
                    newState = typeof actor2Result === "object" ? actor2Result : newState;
                    if (actor1Result === "push" || actor2Result === "push") {
                        if (!actor1.remove && !actor2.remove) {
                            actorPush(newState, actor1, actor2);
                            actorPush(newState, actor2, actor1);
                        }
                    }
                }
            }
        }

        // Remove actors marked for removal
        newState.actors = newState.actors.filter(actor => !actor.remove);

        return newState;
    }
}