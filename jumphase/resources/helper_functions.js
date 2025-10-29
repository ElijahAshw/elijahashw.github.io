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