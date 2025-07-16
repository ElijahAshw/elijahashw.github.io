const levelEndDelay = 0.15;
const scale = 20;
const gameBasedOn = "https://www.puzzleplayground.com/jumping_clones";

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
                                left: ${scale}px;
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
                this.createGrid(level),
                elt("p", 
                    {
                        class: "level-text",
                        style: `font-size: ${scale * 0.8}px;
                                right: ${scale * 0.1}px;
                                top: ${scale * -0.8}px;`.replace(/\s+/g, " ")
                    },
                    curLevel === null ? "" : `Level ${curLevel + 1}`
                )
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
            return `${type}${
                (DOMDisplay.notWall(level, x, y - 1) && " top") +
                (DOMDisplay.notWall(level, x, y + 1) && " bottom") +
                (DOMDisplay.notWall(level, x - 1, y) && " left") +
                (DOMDisplay.notWall(level, x + 1, y) && " right")}${

                (DOMDisplay.notWall(level, x - 1, y - 1) && " tl") +
                (DOMDisplay.notWall(level, x + 1, y - 1) && " tr") +
                (DOMDisplay.notWall(level, x - 1, y + 1) && " bl") +
                (DOMDisplay.notWall(level, x + 1, y + 1) && " br")}`;
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
                                "data-number": (x ^ y) & 1
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
                if (actor.angle) {
                    rect.style.transform = `rotate(${actor.angle}rad)`;
                }
                return rect;
            })
        );
    }

    static notWall(level, x, y) {
        return level.rows[y]?.[x] && level.rows[y]?.[x] !== "wall" || "";
    }
}