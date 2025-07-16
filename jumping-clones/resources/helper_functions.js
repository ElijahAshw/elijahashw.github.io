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
    let [x1, x2] = collidePos1D(pos1.x, prevPos1.x, pos2.x, prevPos2.x, size.x);
    let [y1, y2] = collidePos1D(pos1.y, prevPos1.y, pos2.y, prevPos2.y, size.y);
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