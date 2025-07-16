const menuWidth = 6;
const menuScale = scale * 3.4;
const menuItemSize = scale * 2.65;
const menuBorderWidth = menuItemSize * 4 / 53;
const secondsBetweenKeyFires = 0.2;



class MenuState {
    constructor(numLevels, startLevel, status, last) {
        this.numLevels = numLevels;
        this.level = startLevel;
        this.status = status;
        this.last = last;
    }

    update(time, keys, levelStatus) {
        let level = this.level;
        let status = this.status;
        let last = this.last;
        if (last <= 0) {
            let keyPressed = false;
            if (keys.ArrowLeft) {
                level--;
                keyPressed = true;
            }
            if (keys.ArrowRight) {
                level++;
                keyPressed = true;
            }
            if (keys.ArrowUp) {
                level -= menuWidth;
                keyPressed = true;
            }
            if (keys.ArrowDown) {
                level += menuWidth;
                keyPressed = true;
            }

            if (keyPressed && level >= 0 &&
                level < this.numLevels && levelStatus[level] != 0) {
                last = secondsBetweenKeyFires;
            } else {
                level = this.level;
            }
        } else {
            last -= time;
            if (!keys.ArrowLeft && !keys.ArrowRight && !keys.ArrowUp && !keys.ArrowDown) {
                last = 0;
            }
        }
        if (keys[" "] || keys.Enter) status = "chosen";
        return new MenuState(this.numLevels, level, status, last);
    }

    static createMenuBlocks(numLevels, selected, width, height, levelStatus) {
        let leftOff = (width * scale - Math.min(menuWidth, numLevels) * menuScale) / 4;
        let topOff = scale;
        return new Array(numLevels).fill(null).map((_, n) => 
            elt("div", 
                {
                    class: `menu-item ${n === selected ? "selected" : ""}`,
                    style: `left: ${(n % menuWidth) * menuScale + leftOff}px;
                            top: ${Math.floor(n / menuWidth) * menuScale + topOff}px;
                            border-width: ${menuBorderWidth}px;
                            width: ${menuItemSize}px;
                            height: ${menuItemSize}px;
                            line-height: ${menuItemSize}px;
                            font-size: ${menuItemSize * 0.55}px;`.replace(/\s+/g, " "),
                    "data-status": levelStatus[n]
                }, 
                String(n + 1)
            )
        );
    }

    static start(numLevels, curLevel) {
        return new MenuState(numLevels, curLevel, "choosing", 0);
    }
}