function rect(x, y, w, h, color, cx) {
    cx.fillStyle = color;
    cx.fillRect(x, y, w, h);
}

function text(message, x, y, size, color, align, cx) {
    cx.fillStyle = color;
    cx.font = `${size}px sans-serif`;
    cx.textAlign = align;
    cx.fillText(message, x, y);
}

class CreatureSystem {
    // Interface
    constructor(config) {
        this.creatures = [];
        this.config = config;
        this.stats = { timer: 0, generations: 0, cameraX: 0 };
        this.markerConfig = {gap: 200, thickness: 10, top: 200, height: 100, textGap: 20, fontSize: 30, color: "#ffffffff"};
        this.init(config.template, 0, config.y);
    }

    async evolveVisual(frames, evalFunc, cx, drawBg) {
        this.reset();
        let fastest = await this.runVisual(frames, cx, drawBg);
        this.evolve(evalFunc);
        return fastest;
    }

    async evolveFast(frames, evalFunc, runSpeed) {
        this.reset();
        let fastest = await this.runFast(frames, runSpeed);
        this.evolve(evalFunc);
        return fastest;
    }

    display(drawBg, cx) {
        this.setCameraX();
        this.background(drawBg, cx);
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].display(cx, this.stats.cameraX);
        }
    }

    get bestSpeed() {
        return (this.config.x - this.stats.cameraX) / this.markerConfig.gap;
    }

    // End of interface
    runVisual(frames, cx, drawBg) {
        const thisBinding = this;
        return new Promise(resolve => {
            function frame() {
                for (let i = 0; i < thisBinding.creatures.length; i++) {
                    thisBinding.creatures[i].run(thisBinding.stats.timer);
                }
                thisBinding.display(drawBg, cx); // Sets this.cameraX
                thisBinding.stats.timer++;
                if (thisBinding.stats.timer < frames) {
                    requestAnimationFrame(frame);
                } else {
                    resolve(thisBinding.stats.cameraX);
                }
            }
            frame();
        });
    }

    async runFast(frames, runSpeed) {
        const thisBinding = this;
        return new Promise(resolve => {
            function frame() {
                for (let t = 0; t < runSpeed && thisBinding.stats.timer < frames; t++) {
                    for (let i = 0; i < thisBinding.creatures.length; i++) {
                        thisBinding.creatures[i].run(thisBinding.stats.timer);
                    }
                    thisBinding.stats.timer++;
                }
                if (thisBinding.stats.timer < frames) {
                    requestAnimationFrame(frame);
                } else {
                    resolve(thisBinding.stats.cameraX);
                }
            }
            frame();
        });
    }

    setCameraX() {
        let maxX = this.creatures.reduce((max, creature) => Math.max(max, creature.getAverageX()), -Infinity);
        this.stats.cameraX = maxX === -Infinity? 0 : -maxX + this.config.x;
    }

    background(drawBg, cx) {
        let cameraX = this.stats.cameraX;
        drawBg(cameraX);
        let firstMarker = Math.floor((cameraX - this.config.width) / this.markerConfig.gap);
        let lastMarker = Math.ceil((cameraX + this.config.width) / this.markerConfig.gap);
        for (let d = firstMarker; d < lastMarker; d++) {
            this.drawMarker(d, cx, cameraX);
        }
    }

    drawMarker(num, cx, offsetX = 0) {
        let textBottom = this.markerConfig.top - this.markerConfig.textGap;
        let centerX = num * this.markerConfig.gap + offsetX;
        let leftX = centerX - this.markerConfig.thickness / 2;
        let {color, top, thickness, height, fontSize} = this.markerConfig;
        rect(leftX, top, thickness, height, color, cx);
        text(String(num), centerX, textBottom, fontSize, color, "center", cx);
    }

    init(template, x, y) {
        while (this.creatures.length < this.config.numCreatures) {
            this.creatures.push(Creature.random(template, x, y));
        }
    }

    reset() {
        this.stats.timer = 0;
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].reset();
        }
    }

    evolve(evalFunc) {
        let evalMap = new Map();
        this.creatures.forEach(c => evalMap.set(c, evalFunc(c)));
        this.creatures.sort((a, b) => evalMap.get(b) - evalMap.get(a));
        this.creatures = this.creatures.slice(0, this.creatures.length - this.config.discard);
        for (let i = 0; this.creatures.length < this.config.numCreatures; i++) {
            this.creatures.push(this.creatures[i].copy().mutate());
        }
        this.stats.generations++;
    }
}