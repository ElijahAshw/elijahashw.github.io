// Parameters: [<intial value>, <boolean changeable>, <optional min value>, <optional max value>]
const nodeParameters = {
    friction: {default: 0.5, changeable: true, min: 0.05, max: 1, tweak: 0.1},
    airResistance: {default: 0.0, changeable: true, min: 0.001, max: 0.1, tweak: 0.01},
    mass: {default: 1, changeable: false, min: 0.1, max: 10, tweak: 1},
    bounce: {default: 0.5, changeable: false, min: 0, max: 1, tweak: 0.3},
    startX: {default: 0, changeable: true, min: -40, max: 40, tweak: 5},
    startY: {default: 0, changeable: true, min: -40, max: 40, tweak: 5},
};

const springParameters = {
    force: {default: 0.3, changeable: true, min: 0.1, max: 0.5, tweak: 0.1},
    min: {default: 40, changeable: true, min: -300, max: 300, tweak: 7, startMin: 30, startMax: 50},
    max: {default: 80, changeable: true, min: -300, max: 300, tweak: 7, startMin: 30, startMax: 50},
    damping: {default: 0.2, changeable: false, min: 0.01, max: 0.6, tweak: 0.1},
    shrink: {default: 15, changeable: false, min: 0, max: 50, tweak: 5},
    grow: {default: 85, changeable: false, min: 50, max: 100, tweak: 5},
};

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function circle(x, y, r, color, cx) {
    cx.fillStyle = color;
    cx.beginPath();
    cx.arc(x, y, r, 0, Math.PI * 2);
    cx.fill();
}

function line(x1, y1, x2, y2, width, color, cx) {
    cx.strokeStyle = color;
    cx.lineWidth = width;
    cx.beginPath();
    cx.moveTo(x1, y1);
    cx.lineTo(x2, y2);
    cx.stroke();
}

class SoftNode {
    constructor(config, color, x=config.startX, y=config.startY) {
        if (Number.isNaN(x) || Number.isNaN(y)) throw new TypeError("SoftNode constructor received NaN for x or y!");
        this.config = config;
        this.state = {px: x, py: y, vx: 0, vy: 0, ax: 0, ay: 0};
        // this.state = new Float64Array([startX, startY, x, y, 0, 0, 0, 0]);
        this.size = 10;
        this.color = color ?? 'rgba(0, 0, 0, 1)';
    }

    display(cx, offsetX = 0, offsetY = 0) {
        circle(
            this.state.px + offsetX, this.state.py + offsetY, 
            this.size, this.color, cx
        );
    }

    run() {
        // Local bindings
        let state = this.state, config = this.config;
        // Apply gravity and acceleration
        state.vx += state.ax / config.mass;
        state.vy += state.ay / config.mass + config.gravity * 0.5;
        // Apply air resistance
        state.vx *= 1 - config.airResistance;
        state.vy *= 1 - config.airResistance;
        // Apply y velocity
        if (Math.abs(state.vy) < 0.01) state.vy = 0;
        else state.py += state.vy;
        // Apply friction and limit nodes
        if (state.py >= config.groundY.value) {
            state.py = config.groundY.value;
            state.vy *= -config.bounce;
            state.vx *= 1 - config.friction;
        }
        // Apply x velocity
        if (Math.abs(state.vx) < 0.01) state.vx = 0;
        else state.px += state.vx;
        // Reset velocity
        state.ax = 0;
        state.ay = 0;
    }

    copy() {
        return new SoftNode(
            this.config, this.color,
            this.state.px, this.state.py
        );
    }

    mutate() {
        let original = this.config;
        let newConfig = Object.assign({}, original);
        for (let name of Object.keys(nodeParameters)) {
            let template = nodeParameters[name];
            if (template.changeable) {
                newConfig[name] = original[name] + random(-template.tweak, template.tweak);
            } else {
                newConfig[name] = original[name];
            }
        }
        this.config = newConfig;
        return this;
    }

    reset() {
        this.state.px = this.config.startX;
        this.state.py = this.config.startY;
        this.state.vx = 0;
        this.state.vy = 0;
        this.state.ax = 0;
        this.state.ay = 0;
    }

    static random(x, y) {
        let config = {};
        for (let name of Object.keys(nodeParameters)) {
            let template = nodeParameters[name];
            if (template.changeable) {
                config[name] = random(template.min, template.max);
            } else {
                config[name] = template.default;
            }
        }
        config.startX += x;
        config.startY += y;
        config.gravity = gravity;
        config.groundY = globalParameters.groundY;
        let color = `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)},1)`;
        return new SoftNode(config, color);
    }
}

class Spring {
    constructor(node1, node2, config) {
        if (!node1 || !node2) throw new TypeError("Spring constructor was not passed two nodes!");
        this.node1 = node1;
        this.node2 = node2;
        this.config = config;
        this.length = config.max;
        this.size = 6;
        this.color = 'rgba(96, 96, 96, 1)';
    }

    display(cx, offsetX = 0, offsetY = 0) {
        line(
            this.node1.state.px + offsetX, this.node1.state.py + offsetY, 
            this.node2.state.px + offsetX, this.node2.state.py + offsetY, 
            this.size, this.color, cx
        );
    }

    run(timer) {
        // More physics stuff
        // Thanks again to https://www.khanacademy.org/computer-programming/evolution-simulator/5754646313418752
        let node1State = this.node1.state, node2State = this.node2.state, config = this.config;
        let springX = node1State.px - node2State.px;
        let springY = node1State.py - node2State.py;
        let length = Math.sqrt(springX * springX + springY * springY);
        if (length === 0) return;
        let normX = springX / length, normY = springY / length;
        let nodeVelX = node1State.vx - node2State.vx, nodeVelY = node1State.vy - node2State.vy;
        let springVelMag = nodeVelX * normX + nodeVelY * normY;
        let dampingMag = -config.damping * springVelMag;
        let dampingX = normX * dampingMag, dampingY = normY * dampingMag;
        let springForce = (length - this.length) * config.force;
        let springPushX = normX * springForce, springPushY = normY * springForce;
        node1State.ax += dampingX - springPushX;
        node1State.ay += dampingY - springPushY;
        node2State.ax += springPushX - dampingX;
        node2State.ay += springPushY - dampingY;
        this.setLength(timer);
    }

    setLength(timer) {
        if (timer % 100 < this.config.shrink || timer % 100 > this.config.grow) {
            // Long spring
            this.length = this.config.max;
        } else {
            // Short spring
            this.length = this.config.min;
        }
    }

    mutate(oldNodes, newNodes) {
        let original = this.config;
        let newConfig = {};
        for (let name of Object.keys(springParameters)) {
            let template = springParameters[name];
            if (template.changeable) {
                newConfig[name] = original[name] + random(-template.tweak, template.tweak);
            } else {
                newConfig[name] = original[name];
            }
        }
        this.config = newConfig;
        return new Spring(this.node1, this.node2, newConfig);
    }

    copy(oldNodes, newNodes) {
        let node1 = newNodes[oldNodes.indexOf(this.node1)];
        let node2 = newNodes[oldNodes.indexOf(this.node2)];
        return new Spring(node1, node2, this.config);
    }

    reset() {
        this.length = this.config.max;
    }

    static random(node1, node2) {
        let config = {};
        for (let name of Object.keys(springParameters)) {
            let template = springParameters[name];
            if (template.changeable) {
                let min = template?.startMin ?? template.min;
                let max = template?.startMax ?? template.max;
                config[name] = random(min, max);
            } else {
                config[name] = template.default;
            }
        }
        return new Spring(node1, node2, config);
    }
}

class Creature {
    constructor(nodes, springs) {
        this.nodes = nodes;
        this.springs = springs;
    }

    display(cx, offsetX = 0, offsetY = 0) {
        let nodes = this.nodes, springs = this.springs;
        for (let i = 0; i < springs.length; i++) {
            springs[i].display(cx, offsetX, offsetY);
        }
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].display(cx, offsetX, offsetY);
        }
    }

    run(timer) {
        let nodes = this.nodes, springs = this.springs;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].run();
        }
        for (let i = 0; i < springs.length; i++) {
            springs[i].run(timer);
        }
    }

    reset() {
        let nodes = this.nodes, springs = this.springs;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].reset();
        }
        for (let i = 0; i < springs.length; i++) {
            springs[i].reset();
        }
    }

    mutate() {
        let nodes = this.nodes, springs = this.springs;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].mutate();
        }
        for (let i = 0; i < springs.length; i++) {
            springs[i].mutate();
        }
        return this;
    }

    copy() {
        let newNodes = this.nodes.map(n => n.copy());
        let newSprings = this.springs.map(s => s.copy(this.nodes, newNodes));
        return new Creature(newNodes, newSprings);
    }

    getAverageX() {
        return this.nodes.reduce((sum, node) => sum + node.state.px, 0) / this.nodes.length;
    }

    static random(template, x, y) {
        // e.g. template = {nodes: 3, springs: [[0, 1], [1, 2], [2, 3]]}
        let nodes = new Array(template.nodes).fill(0).map(() => SoftNode.random(x, y));
        let springs = template.springs.map(indexes => Spring.random(nodes[indexes[0]], nodes[indexes[1]]));
        return new Creature(nodes, springs);
    }
}
