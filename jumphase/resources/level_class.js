class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(row => [...row]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        this.rows = rows.map((row, y) => row.map((char, x) => {
            let type = levelChars[char];
            if (type === undefined) throw new Error(`Unknown character "${char}" at (${x}, ${y})`);
            if (typeof type === "string") return type;

            // Create the actor
            // around is to help the actor's create method determine its surroundings
            let around = {
                up: rows[y - 1]?.[x] || "squareRed",
                down: rows[y + 1]?.[x] || "squareRed",
                left: rows[y][x - 1] || "squareRed",
                right: rows[y][x + 1] || "squareRed"
            };
            let newActor = type.create(new Vec(x, y), char, around);
            if (!newActor) throw new Error(`Failed to create actor of type "${type.name}" at (${x}, ${y}). Class's create method failed to return an object.`);
            this.startActors.push(newActor);

            let isUpperCase = char !== char.toLowerCase();
            return isUpperCase? "wall" : "empty";
        }));
    }

    touches(pos, size, type) {
        let xStart = Math.floor(pos.x);
        let xEnd = Math.ceil(pos.x + size.x);
        let yStart = Math.floor(pos.y);
        let yEnd = Math.ceil(pos.y + size.y);

        let types = type.trim().split(/\s+/g);
        if (types.length === 0) throw new Error("No types provided to touches method");
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
                let here = isOutside ? "squareRed" : this.rows[y][x];
                if (types.includes(here)) {
                    return { pos: new Vec(x, y), size: new Vec(1, 1) };
                }
            }
        }
        return false;
    }
}