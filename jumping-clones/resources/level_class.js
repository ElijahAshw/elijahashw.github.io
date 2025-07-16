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
                let here = isOutside ? "lava" : this.rows[y][x];
                if (here === type) return { pos: new Vec(x, y), size: new Vec(1, 1) };
            }
        }
        return false;
    }
}