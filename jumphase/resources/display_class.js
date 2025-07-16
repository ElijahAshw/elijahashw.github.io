const levelEndDelay = 0.15;
const scale = 40;
const gameBasedOn = "https://www.puzzleplayground.com/jumphase";

class DOMDisplay {
    constructor(parent, level, curLevel, levelStatus, numLevels, menu) {
        if (menu) {
            this.menuBlocks = MenuState.createMenuBlocks(numLevels, curLevel, level.width, level.height, levelStatus);
            this.menu = elt("div", 
                {
                    class: "menu",
                    style: `width: ${(level.width - 2) * scale}px;
                            height: ${(level.height - 2) * scale}px;
                            padding: ${scale}px;`.replace(/\s+/g, " ")
                },
                elt("div", 
                    {
                        class: "levels-wrapper", 
                        style: `height: ${Math.ceil(numLevels / menuWidth) * menuScale}px;`
                    },
                    ...this.menuBlocks
                )
            );
            this.bgLevel = level;
            this.dom = elt("div", 
                { class: "game" },
                this.createGrid(level),
                elt("p", 
                    {
                        class: "menu-text",
                        style: `font-size: ${scale * 0.8}px;
                                left: 0px;
                                width: ${level.width * scale}px;
                                text-align: center;
                                top: ${(level.height - 1.5) * scale}px;`.replace(/\s+/g, " ")
                    },
                    "Based on ",
                    elt("a", 
                        { href: gameBasedOn },
                        gameBasedOn
                    )
                ),
                this.menu
            );
            this.first = true;
        } else {
            this.dom = elt("div", 
                {
                    class: "game", 
                    style: `width: ${level.width * scale}px;
                            height: ${level.height * scale}px;`.replace(/\s+/g, " ")
                }, 
                this.createGrid(level)
            );
            this.actorLayer = null;
        }
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }

    syncState(state, ending, explode) {
        if (this.actorLayer) this.actorLayer.remove();
        if (this.dots) this.dots.remove();
        this.actorLayer = this.createActors(state.actors.filter(a => a !== explode));
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        if (state.status.includes("lost") && ending !== 0) {
            this.dom.style.transform = `translate(${Math.cos(ending * Math.PI * 40) * 4}px, ${Math.sin(ending * Math.PI * 40) * 4}px)`;
            if (explode.pos) {
                let dotNum = 12;
                this.dots = elt("div", 
                    { class: "explode-wrapper" },
                    ...new Array(dotNum).fill(null).map((_, i) => 
                        elt("div", 
                            {
                                class: "explode-dot", style: `
                                        left: ${(explode.pos.x + explode.size.x / 2) * scale}px;
                                        top: ${(explode.pos.y + explode.size.y / 2) * scale}px;
                                        width: ${scale / 4}px;
                                        height: ${scale / 4}px;
                                        opacity: ${1.03 - ending / levelEndDelay};
                                        transform: translate(-50%, -50%)
                                            rotate(${i * Math.PI * 2 / dotNum}rad)
                                            translateX(${ending * 300}px);`.replace(/\s+/g, " ")
                            }
                        )
                    )
                );
                this.dom.appendChild(this.dots);
            }
        }
    }

    syncMenuState(menuState, keys) {
        let prevIndex = this.menuBlocks.findIndex(b => b.className.includes("selected"));
        let prevBlock = this.menuBlocks[prevIndex];
        prevBlock.className = prevBlock.className.replace("selected", "");
        this.menuBlocks[menuState.level].className += " selected";
        if (prevIndex != menuState.level || keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight || this.first) {
            this.first = false;
            if (Math.floor(menuState.level / menuWidth) * menuScale - this.menu.scrollTop < 0) {
                this.menu.scrollTop = Math.floor(menuState.level / menuWidth + 1) * menuScale - menuItemSize;
            } else 
            if (Math.floor(menuState.level / menuWidth) * menuScale + menuBorderWidth * 2 + menuItemSize - this.menu.scrollTop > (this.bgLevel.height - 3) * scale) {
                this.menu.scrollTop = Math.floor(menuState.level / menuWidth) * menuScale - (this.bgLevel.height - 3) * scale + menuBorderWidth * 2 + menuItemSize;
            }
        }
    }

    createGrid(level) {
        function getClassFor(type, x, y) {
            let directionPart1 = `${
                (DOMDisplay.isDifferent(level, type, x, y - 1) && " up") +
                (DOMDisplay.isDifferent(level, type, x, y + 1) && " down") +
                (DOMDisplay.isDifferent(level, type, x - 1, y) && " left") +
                (DOMDisplay.isDifferent(level, type, x + 1, y) && " right")}`;
            let directionPart2 = `${
                (!directionPart1.includes("up") && !directionPart1.includes("left") && DOMDisplay.isDifferent(level, type, x - 1, y - 1)? " tl" : "") +
                (!directionPart1.includes("up") && !directionPart1.includes("right") && DOMDisplay.isDifferent(level, type, x + 1, y - 1)? " tr" : "") +
                (!directionPart1.includes("down") && !directionPart1.includes("left") && DOMDisplay.isDifferent(level, type, x - 1, y + 1)? " bl" : "") +
                (!directionPart1.includes("down") && !directionPart1.includes("right") && DOMDisplay.isDifferent(level, type, x + 1, y + 1)? " br" : "")}`;
            return `${type}${directionPart1}${directionPart2}`;
        }

        return elt("table", 
            {
                class: "background",
                style: `width: ${level.width * scale}px;`
            }, 
            ...level.rows.map((row, y) =>
                elt("tr", 
                    { style: `height: ${scale}px;` },
                    ...row.map((type, x) => 
                        elt("td", 
                            {
                                class: getClassFor(type, x, y),
                                "data-number": String((x ^ y) & 1)
                            }
                        )
                    )
                )
            )
        );
    }

    createActors(actors) {
        return elt("div", 
            {}, 
            ...actors.map(actor => {
                let rect = elt("div", 
                    {
                        class: `actor ${actor.type}`
                    }
                );
                let size = actor.displaySize || actor.size;
                let pos = actor.displayPositionOffset?.add(actor.pos) || actor.pos;
                rect.style.width = `${size.x * scale}px`;
                rect.style.height = `${size.y * scale}px`;
                rect.style.left = `${pos.x * scale}px`;
                rect.style.top = `${pos.y * scale}px`;
                rect.style.setProperty("--w", `${size.x * scale}px`)
                rect.style.setProperty("--angle", `${actor.angle || 0}rad`);
                return rect;
            })
        );
    }

    static isDifferent(level, type, x, y) {
        let here = level.rows[y]?.[x] || "wall";
        return here !== type || "";
    }
}
