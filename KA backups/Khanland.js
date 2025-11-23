// Peregrine 2025 | So Long Khan Academy!
/** Hey, so this is a game that me and my little brother who is learning coding worked on. It's quite messy so I wouldn't recommend reading the code. We also wrote it months ago and haven't worked on it since so I am just going to release it. Anyways, the objective is to... I guess get money and upgrade your stuff? Most of the design choices were his call. It is weird that this game that I thought I wasn't going to be very involved with had me become quite involved. I think, though, I could be wrong, that this is the largest/longest program (excluding whitespace) I have ever released. Apologies in advance if your computer just says "Nope". 
 * 
 * FIRST OBJECTIVE: COLLECT COINS AROUND THE MAP. WATCH OUT FOR ENEMIES. YOU'LL SOON HAVE A WEAPON.
 * 
 * SECOND OBJECTIVE: BUY SEEDS FROM CLARA AND A HOE FROM ERNEST. THEN PLANT AND WATER THEM.
 * - NOTE: You need to use the aqualine ability to water the crops
 * 
 * THIRD OBJECTIVE: SAVE UP TO BUY A SWORD AND SLAY MONSTERS.
 * 
**/
// PERFORMANCE SETTINGS
var disableLighting = true;
var disableGrass = true;
var reduceParticles = true;

// Anyways, I hope that made sense. I won't be active for the forseeable future and I just wanted to get this off my chest since we put so much time into it. I guess this is goodbye for now!

/**
 * = = = CONTROLS = = =
 * - WASD
 * - LEFT-CLICK FOR ATTACK
 * - CENTER-CLICK, SPACEBAR, OR 'q' FOR ABILITY
 * - RIGHT-CLICK FOR PLANTING
 * - SPACEBAR FOR INTERACTION
 * - SCROLL-WHEEL FOR INVENTORY SLOT SELECTION
**/























// EXTREMELY UNREADABLE CODE {

frameRate(60);
var delag = function (f) {
    delag.stripDetection = delag.stripDetection || function (s) {
        var outLines = [];
        var lines = s.split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].search("KAInfiniteLoopCount") >= 0 || lines[i].search("KAInfiniteLooopProtect") >= 0) {
                i += 4;
            } else {
                outLines.push(lines[i]);
            }
        }
        return outLines.join("\n");
    };
    var str = delag.stripDetection(f.toString());
    /* Copied from Element118 delag() function: */
    return Object.constructor('return (function(__env__) {return ' + str + ';});')()(this);
};

delag(function () {
    var showCollisionBoxes = false;
    var delag = false;

    // ** KA STUFF ** {

    /** * * NOTE TO KHAN ACADEMY GUARDIANS * * **/
    /* 
    This function does not attempt to access resources outside of the context of the canvas which is already provided to us. Below I have accessed the native JavaScript JSON module purely for my own debugging purposes. Additionally, the onwheel event below prevents the entire page from scrolling WHEN THE CANVAS ELEMENT IS FOCUSED BY THE USER. This contains no security issues and does not pose any threat to user safety and privacy. 
    */
    var ctx = (function () { return this; })();
    var json = ctx.JSON;
    ctx.Processing.instances[0].externals.canvas.onwheel = function (e) {
        e.preventDefault();
    };
    var KAPRELOAD = [
        "avatars/aqualine-seed",
        "avatars/aqualine-seedling",
        "avatars/aqualine-sapling",
        "avatars/aqualine-tree",
        "avatars/aqualine-ultimate",
        "avatars/leafers-seed",
        "avatars/leafers-seedling",
        "avatars/leafers-sapling",
        "avatars/leafers-tree",
        "avatars/leafers-ultimate",
        "avatars/duskpin-seed",
        "avatars/duskpin-seedling",
        "avatars/duskpin-sapling",
        "avatars/duskpin-tree",
        "avatars/duskpin-ultimate",
        "avatars/piceratops-seed",
        "avatars/piceratops-seedling",
        "avatars/piceratops-sapling",
        "avatars/piceratops-tree",
        "avatars/piceratops-ultimate",
        "avatars/primosaur-seed",
        "avatars/primosaur-seedling",
        "avatars/primosaur-sapling",
        "avatars/primosaur-tree",
        "avatars/primosaur-ultimate",
        "avatars/starky-seed",
        "avatars/starky-seedling",
        "avatars/starky-sapling",
        "avatars/starky-tree",
        "avatars/starky-ultimate"
    ];
    // }

    // Copyed from bob lyons program
    //https://www.khanacademy.org/computer-programming/leak-free-particle-system/4684587452399616
    /*
     * Give every object a "new" method that works around
     * the Khan Academy leak.
     */
    function whatNewDoes() {
        var obj = Object.create(this.prototype);
        return this.apply(obj, arguments) || obj;
    }
    Object.constructor.prototype.new = whatNewDoes;


    // ** USEFUL FUNCTIONS ** {
    function Collide(px, py, x, y, w, h) {
        return (px > x && px < (x + w) && py > y && py < (y + h));
    }
    function Hitbox(px, py, x, y, w, h) {
        var colliding = false;
        if (Collide(px, py, x, y + 1, 4, h - 2)) {
            px = x;
            colliding = true;
        }
        if (Collide(px, py, x + 1, y, w - 2, 4)) {
            py = y;
            colliding = true;
        }
        if (Collide(px, py, x + w - 4, y + 1, 4, h - 2)) {
            px = x + w;
            colliding = true;
        }
        if (Collide(px, py, x + 1, y + h - 4, w - 2, 4)) {
            py = y + h;
            colliding = true;
        }
        return [px, py, colliding];
    }
    function Touch(x1, y1, x2, y2, r) {
        return dist(x1, y1, x2, y2) < r;
    }
    function clone(obj) {
        // Credit to A. Levi
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }
    function clone2(obj) {
        return json.parse(json.stringify(obj));
    }
    function inter(x1, y1, x2, y2, x3, y3, x4, y4) {
        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return false;
        }
        var denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        // Lines are parallel
        if (denominator === 0) {
            return false;
        }

        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false;
        }

        // Return a object with the x and y coordinates of the intersection
        var x = x1 + ua * (x2 - x1);
        var y = y1 + ua * (y2 - y1);

        return { x: x, y: y };
    }
    function wallcol(obj, w) {
        var collisions = [
            inter(
                obj.x + obj.w / 2, obj.y + obj.h / 2, obj.x + obj.w / 2 + obj.v.x, obj.y + obj.h / 2 + obj.v.y,
                w[0], w[1], w[0] + w[2], w[1]
            ),
            inter(
                obj.x + obj.w / 2, obj.y + obj.h / 2, obj.x + obj.w / 2 + obj.v.x, obj.y + obj.h / 2 + obj.v.y,
                w[0], w[1], w[0], w[1] + w[3]
            ),
            inter(
                obj.x + obj.w / 2, obj.y + obj.h / 2, obj.x + obj.w / 2 + obj.v.x, obj.y + obj.h / 2 + obj.v.y,
                w[0], w[1] + w[3], w[0] + w[2], w[1]
            ),
            inter(
                obj.x + obj.w / 2, obj.y + obj.h / 2, obj.x + obj.w / 2 + obj.v.x, obj.y + obj.h / 2 + obj.v.y,
                w[0] + w[2], w[1], w[0] + w[2], w[1] + w[3]
            )
        ];
        for (var i = 0; i < collisions.length; i++) {
            if (collisions[i] === false) {
                var last = collisions.pop();
                if (i < collisions.length - 1) {
                    collisions[i] = last;
                }
                i--;
            }
        }
        collisions.sort(function (a, b) {
            return dist(obj.x + obj.w / 2, obj.y + obj.h / 2, a.x, a.y) - dist(obj.x + obj.w / 2, obj.y + obj.h / 2, b.x, b.y);
        });
        if (collisions.length > 0) {
            //println(collisions.length);
            obj.x = collisions[0].x - obj.w / 2 - obj.v.x;
            obj.y = collisions[0].y - obj.h / 2 - obj.v.y;
            obj.v.x = 0;
            obj.v.y = 0;
        }
    }
    function lineofsight(obj1, obj2, w) {

        var x = obj2.x + obj2.w / 2,
            y = obj2.y + obj2.h / 2;
        var a = atan2(obj1.y - y, obj1.x - x);
        var d = dist(obj1.x, obj1.y, x, y);
        var dx = d * cos(a),
            dy = d * sin(a);

        /*strokeWeight(1);
        stroke(255, 0, 0);
        line(x, y, x + dx, y + dy);*/

        var collisions = [
            inter(
                x, y, x + dx, y + dy,
                w[0], w[1], w[0] + w[2], w[1]
            ),
            inter(
                x, y, x + dx, y + dy,
                w[0], w[1], w[0], w[1] + w[3]
            ),
            inter(
                x, y, x + dx, y + dy,
                w[0], w[1] + w[3], w[0] + w[2], w[1]
            ),
            inter(
                x, y, x + dx, y + dy,
                w[0] + w[2], w[1], w[0] + w[2], w[1] + w[3]
            )
        ];
        for (var i = 0; i < collisions.length; i++) {
            if (collisions[i] === false) {
                var last = collisions.pop();
                if (i < collisions.length - 1) {
                    collisions[i] = last;
                }
                i--;
            }
        }
        if (collisions.length > 0) {
            return false;
        }
        return true;
    }
    // }

    // ** GLOBAL VARIABLES ** {
    var particles = [],
        trees = [[], [], [], [], [], [], [], [], [], []],
        trees_spawn_timers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        decor = [[], [], [], [], [], [], [], [], [], []],
        enemies = [[], [], [], [], [], [], [], [], [], []],
        enemies_spawn_timers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        plots = [],
        ores = [[], [], [], [], [], [], [], [], [], []],
        villagers = [[], [], [], [], [], [], [], [], [], []],
        villager_nodes = [],
        walls = [],
        coins = [],
        dropped_items = [[], [], [], [], [], [], [], [], [], []],
        mr_spunky,
        timer = [0, 0, 0, 0, 5000, 0, 0, 0, 0, 0];
    var scene = "menu", menu_streamers = [], random_avatar = 0, loading = 0;
    // }

    // ** GRAPHICS ** {
    var ctx = createGraphics(400, 400, P2D);
    function Monochrome(img, clr) {
        ctx.background(0, 0);
        ctx.image(img, 0, 0, 400, 400);
        ctx.loadPixels();
        var p = ctx.imageData.data || [];
        var r = ctx.red(clr), g = ctx.green(clr), b = ctx.blue(clr), a = alpha(clr);
        for (var i = 0; i < p.length; i += 4) {
            if (p[i + 3] > 250) {
                var gray = (p[i] + p[i + 1] + p[i + 2]) / 3 / 255;
                p[i] = gray * r;
                p[i + 1] = gray * g;
                p[i + 2] = gray * b;
                p[i + 3] = a;
            } else {
                p[i + 3] = 0;
            }
        }
        ctx.updatePixels();
        return ctx.get();
    }
    function NoOpacity(img) {
        ctx.background(0, 0);
        ctx.image(img, 0, 0, 400, 400);
        ctx.loadPixels();
        var p = ctx.imageData.data || [];
        for (var i = 0; i < p.length; i += 4) {
            if (p[i + 3] < 250) {
                p[i + 3] = 0;
            }
        }
        ctx.updatePixels();
        return ctx.get();
    }
    var Outlined_Text = function (txt, x_, y_, sz, incolr, outcolr, thickness) {
        textSize(sz);
        var z = sz / 16 * (thickness || 1);
        for (var y = -z; y < z; y++) {
            for (var x = -z; x < z; x++) {
                fill(outcolr);
                text(txt, x_ + x, y_ + y);
            }
        }
        fill(incolr);
        text(txt, x_, y_);
    };
    var gray_heart = gray_heart || Monochrome(getImage("cute/Heart"), color(255));
    var red_heart_gen = function (level) {
        ctx.background(0, 0);
        ctx.image(getImage("cute/Heart"), 0, 0, 400, 400);
        return ctx.get(0, level, 400, 400);
    }, red_heart;
    var gray_star = gray_star || Monochrome(getImage("space/star"), color(148, 148, 148));
    var clear_yellow_star = clear_yellow_star || NoOpacity(getImage("space/star")),
        yellow_star_gen = function (level) {
            ctx.background(0, 0);
            ctx.image(clear_yellow_star, 0, 0, 400, 400);
            return ctx.get(0, level, 400, 400);
        }, yellow_star;
    function Heart(level, x, y, w) {
        level = (1 - constrain(level, 0, 1)) * 210;
        red_heart = red_heart_gen(level + 108);
        image(gray_heart, x, y, w, w);
        image(red_heart, x, y + (level + 108) * w / 400, w, w);
    }
    function Star(level, x, y, w) {
        level = (1 - constrain(level, 0, 1)) * 215 - 5;
        yellow_star = yellow_star_gen(level + 95);
        image(gray_star, x, y, w, w);
        pushMatrix();
        translate(0, (level + 95) * w / 400);
        image(yellow_star, x, y, w, w);
        popMatrix();
    }
    var GoldenWinston = Monochrome(getImage("creatures/Winston"), color(255, 213, 59)),
        SilverKey = Monochrome(getImage("cute/Key"), color(232, 232, 232)),
        BronzeOhNoes = Monochrome(getImage("creatures/OhNoes"), color(250, 161, 53));

    function Coin(x, y, s) {
        noStroke();
        fill(199, 164, 24);
        ellipse(x, y, s * sin(frameCount), s);
        fill(207, 167, 20);
        ellipse(x, y, s * 20 / 26 * sin(frameCount), s * 20 / 26);
    }
    function Tree_Sprite(lvl, x, y, w, h, colors) {
        var leaves = colors.leaves || color(37, 143, 20);
        var branches_light = colors.branches_light || color(122, 63, 0);
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        pushMatrix();
        translate(-187, -290);
        switch (lvl) {
            case 0:
                // {

                // Leaves
                fill(leaves);
                beginShape();
                vertex(133.38, 193.71);
                vertex(122.09, 186.01);
                vertex(126.71, 173.70);
                vertex(138.00, 168.05);
                vertex(143.64, 176.26);
                vertex(146.72, 181.91);
                vertex(154.42, 184.99);
                vertex(152.37, 177.80);
                vertex(152.37, 171.13);
                vertex(170.33, 171.64);
                vertex(170.84, 177.29);
                vertex(165.71, 184.47);
                vertex(158.01, 182.93);
                vertex(158.01, 184.99);
                vertex(151.85, 188.06);
                vertex(142.10, 190.12);
                vertex(150.83, 193.20);
                vertex(142.62, 196.28);
                vertex(142.10, 202.95);
                vertex(133.38, 201.41);
                vertex(126.71, 199.87);
                vertex(127.74, 194.74);
                vertex(129.28, 194.22);
                vertex(127.22, 191.14);
                vertex(124.66, 186.53);
                endShape();
                beginShape();
                vertex(209.84, 206.54);
                vertex(217.03, 202.95);
                vertex(212.92, 194.74);
                vertex(206.25, 193.20);
                vertex(217.03, 189.09);
                vertex(222.16, 188.06);
                vertex(227.80, 190.12);
                vertex(231.91, 188.06);
                vertex(242.68, 192.68);
                vertex(246.79, 188.06);
                vertex(252.43, 194.74);
                vertex(250.89, 188.06);
                vertex(256.54, 188.58);
                vertex(256.54, 196.79);
                vertex(262.18, 200.38);
                vertex(261.16, 209.10);
                vertex(252.95, 210.64);
                vertex(249.35, 211.67);
                vertex(248.33, 216.80);
                vertex(246.79, 217.83);
                vertex(237.04, 211.67);
                vertex(231.39, 212.70);
                vertex(225.75, 200.38);
                vertex(222.67, 211.16);
                vertex(214.97, 214.75);
                vertex(213.43, 208.59);
                vertex(210.87, 207.05);
                endShape();
                beginShape();
                vertex(201.12, 163.95);
                vertex(194.96, 162.41);
                vertex(200.09, 159.33);
                vertex(199.58, 156.76);
                vertex(193.42, 153.17);
                vertex(196.50, 150.60);
                vertex(197.53, 147.53);
                vertex(192.91, 144.96);
                vertex(207.28, 139.83);
                vertex(206.25, 136.24);
                vertex(210.87, 135.72);
                vertex(235.50, 137.26);
                vertex(230.88, 140.34);
                vertex(221.64, 144.45);
                vertex(215.49, 153.17);
                vertex(214.46, 156.76);
                vertex(221.13, 161.38);
                vertex(220.62, 162.92);
                vertex(211.89, 163.95);
                vertex(205.74, 166.00);
                vertex(198.04, 160.87);
                endShape();
                beginShape();
                vertex(174.95, 152.14);
                vertex(164.17, 156.25);
                vertex(161.09, 152.66);
                vertex(155.45, 143.42);
                vertex(164.68, 138.29);
                vertex(155.96, 131.62);
                vertex(154.93, 128.54);
                vertex(165.20, 124.95);
                vertex(164.68, 116.22);
                vertex(167.76, 115.20);
                vertex(168.28, 113.14);
                vertex(174.95, 105.96);
                vertex(180.08, 109.04);
                vertex(181.10, 103.39);
                vertex(198.04, 101.85);
                vertex(192.39, 106.47);
                vertex(193.93, 111.09);
                vertex(200.09, 117.76);
                vertex(210.35, 123.41);
                vertex(211.38, 121.87);
                vertex(206.76, 123.41);
                vertex(201.63, 127.00);
                vertex(195.99, 132.64);
                vertex(193.93, 137.78);
                vertex(198.04, 140.85);
                vertex(192.39, 145.47);
                vertex(187.26, 148.55);
                vertex(177.51, 155.22);
                vertex(181.10, 158.81);
                vertex(177.00, 161.38);
                vertex(171.87, 160.87);
                vertex(166.74, 158.30);
                vertex(165.20, 156.76);
                endShape();

                // Stem & Branches
                fill(branches_light);
                beginShape();
                vertex(184.34, 290.55);
                vertex(178.29, 284.01);
                vertex(180, 227);
                vertex(179, 212);
                vertex(171, 208);
                vertex(157, 207);
                vertex(152, 194);
                vertex(135, 188);
                vertex(128, 182);
                vertex(141, 184);
                vertex(151, 185);
                vertex(158, 191);
                vertex(164, 198);
                vertex(178, 201);
                vertex(181, 198);
                vertex(181, 190);
                vertex(179, 179);
                vertex(174, 167);
                vertex(171, 150);
                vertex(175, 133);
                vertex(186, 129);
                vertex(188, 123);
                vertex(181, 113);
                vertex(196, 128);
                vertex(182, 136);
                vertex(177, 148);
                vertex(181, 162);
                vertex(191, 171);
                vertex(192, 185);
                vertex(194, 199);
                vertex(195, 220);
                vertex(193.94, 235.76);
                vertex(194.41, 257.22);
                vertex(195.34, 278.68);
                vertex(195.13, 287.77);
                endShape();
                beginShape();
                vertex(189.74, 170.45);
                vertex(206.07, 148.06);
                vertex(209.80, 140.59);
                vertex(208.26, 148.64);
                vertex(204.56, 154.51);
                vertex(199.33, 160.82);
                vertex(195.20, 169.75);
                vertex(191.72, 177.58);
                endShape();
                beginShape();
                vertex(193.08, 192.56);
                vertex(194.03, 186.82);
                vertex(197.15, 186.10);
                vertex(200.26, 182.03);
                vertex(199.78, 185.14);
                vertex(196.91, 188.02);
                vertex(194.99, 191.85);
                vertex(193.80, 199.51);
                endShape();
                beginShape();
                endShape();
                beginShape();
                vertex(194.14, 205.14);
                vertex(196.46, 202.24);
                vertex(201.96, 197.60);
                vertex(210.07, 197.31);
                vertex(221.08, 201.66);
                vertex(229.19, 202.53);
                vertex(237.88, 200.21);
                vertex(244.54, 199.63);
                vertex(250.62, 199.92);
                vertex(251.49, 201.66);
                vertex(251.20, 203.11);
                vertex(250.04, 201.66);
                vertex(246.86, 200.79);
                vertex(240.48, 201.66);
                vertex(233.82, 202.24);
                vertex(228.32, 204.27);
                vertex(219.92, 202.82);
                vertex(211.81, 201.95);
                vertex(204.86, 201.37);
                vertex(197.32, 205.43);
                vertex(194.72, 214.12);
                endShape();
                beginShape();
                vertex(222.03, 203.18);
                vertex(225.47, 205.27);
                vertex(229.53, 205.14);
                vertex(231.86, 205.88);
                vertex(229.28, 205.76);
                vertex(226.33, 206.25);
                vertex(222.53, 205.27);
                vertex(217.24, 202.44);
                endShape();
                beginShape();
                vertex(207.66, 197.40);
                vertex(211.72, 195.56);
                vertex(216.38, 195.93);
                vertex(219.95, 196.42);
                vertex(218.72, 197.16);
                vertex(214.05, 196.91);
                vertex(211.47, 197.77);
                endShape();
                beginShape();
                vertex(161.89, 195.54);
                vertex(160.70, 188.41);
                vertex(161.69, 182.08);
                vertex(165.05, 178.52);
                vertex(161.69, 174.76);
                vertex(156.35, 174.57);
                vertex(152.79, 175.16);
                vertex(157.14, 175.55);
                vertex(161.10, 175.95);
                vertex(163.47, 178.72);
                vertex(161.10, 180.30);
                vertex(159.71, 184.06);
                vertex(159.12, 188.02);
                vertex(158.13, 190.79);
                endShape();
                beginShape();
                vertex(172.15, 156.95);
                vertex(167.58, 153.47);
                vertex(162.14, 148.24);
                vertex(162.14, 140.19);
                vertex(162.14, 134.53);
                vertex(160.40, 131.92);
                vertex(163.01, 135.19);
                vertex(163.01, 141.06);
                vertex(163.66, 147.59);
                vertex(166.71, 150.42);
                vertex(169.54, 151.51);
                vertex(171.28, 151.51);
                endShape();
                beginShape();
                vertex(172.80, 141.81);
                vertex(171.93, 138.98);
                vertex(171.49, 135.49);
                vertex(173.45, 130.05);
                vertex(172.15, 124.83);
                vertex(174.98, 129.40);
                vertex(174.76, 133.54);
                endShape();
                // }
                break;
            case 1:
                // {
                // Leaves
                fill(leaves);
                beginShape();
                vertex(128.17, 176.33);
                vertex(122.70, 179.75);
                vertex(114.51, 178.38);
                vertex(101.53, 183.85);
                vertex(94.70, 177.70);
                vertex(86.50, 180.43);
                vertex(72.84, 176.33);
                vertex(72.84, 165.41);
                vertex(68.74, 159.94);
                vertex(55.77, 156.53);
                vertex(53.03, 150.38);
                vertex(55.77, 149.01);
                vertex(45.52, 140.13);
                vertex(43.47, 123.74);
                vertex(51.67, 121.69);
                vertex(44.15, 113.50);
                vertex(53.03, 107.35);
                vertex(64.65, 103.25);
                vertex(78.31, 98.47);
                vertex(72.84, 90.27);
                vertex(80.35, 87.54);
                vertex(98.80, 78.66);
                vertex(96.06, 74.56);
                vertex(106.31, 73.20);
                vertex(116.55, 74.56);
                vertex(124.07, 69.78);
                vertex(126.12, 69.10);
                vertex(133.63, 73.88);
                vertex(152.75, 82.76);
                vertex(150.71, 86.86);
                vertex(147.97, 88.91);
                vertex(141.83, 104.62);
                vertex(154.12, 108.03);
                vertex(163.00, 109.40);
                vertex(169.15, 119.64);
                vertex(161.63, 123.74);
                vertex(153.44, 131.94);
                vertex(160.27, 141.50);
                vertex(157.54, 149.01);
                vertex(158.22, 157.21);
                vertex(152.07, 168.14);
                vertex(145.92, 177.02);
                vertex(133.63, 175.65);
                endShape();
                beginShape();
                vertex(249.74, 167.45);
                vertex(241.55, 161.31);
                vertex(239.50, 157.89);
                vertex(238.81, 150.38);
                vertex(236.08, 133.30);
                vertex(226.52, 124.42);
                vertex(225.15, 114.86);
                vertex(236.76, 99.84);
                vertex(247.69, 91.64);
                vertex(255.89, 84.13);
                vertex(264.35, 90.34);
                vertex(272.28, 90.96);
                vertex(281.84, 84.81);
                vertex(289.36, 77.30);
                vertex(297.69, 87.32);
                vertex(307.80, 82.08);
                vertex(323.01, 79.02);
                vertex(326.09, 95.45);
                vertex(338.41, 95.96);
                vertex(330.20, 109.81);
                vertex(329.68, 124.70);
                vertex(313.26, 130.85);
                vertex(326.24, 150.38);
                vertex(328.97, 157.89);
                vertex(326.92, 168.14);
                vertex(311.21, 174.97);
                vertex(296.19, 177.70);
                vertex(287.31, 177.70);
                vertex(272.28, 185.21);
                vertex(262.04, 180.43);
                vertex(257.94, 173.60);
                vertex(255.21, 166.09);
                endShape();
                beginShape();
                vertex(198.52, 103.25);
                vertex(188.27, 106.67);
                vertex(184.17, 105.98);
                vertex(177.60, 96.60);
                vertex(169.15, 101.20);
                vertex(154.80, 97.79);
                vertex(152.07, 93.01);
                vertex(150.02, 93.01);
                vertex(137.04, 84.13);
                vertex(135.68, 75.93);
                vertex(142.51, 64.32);
                vertex(139.78, 57.49);
                vertex(132.26, 40.41);
                vertex(138.41, 36.32);
                vertex(151.39, 22.66);
                vertex(143.19, 22.66);
                vertex(147.97, 10.36);
                vertex(152.07, 0.12);
                vertex(150.71, -6.02);
                vertex(161.63, -7.39);
                vertex(190.32, 3.53);
                vertex(197.15, -2.61);
                vertex(212.86, -1.24);
                vertex(229.93, 2.85);
                vertex(244.28, 3.53);
                vertex(248.38, -2.61);
                vertex(271.23, 7.83);
                vertex(274.27, 7.02);
                vertex(275.59, 9.35);
                vertex(280.47, 4.52);
                vertex(285.03, 12.20);
                vertex(297.55, 23.34);
                vertex(307.12, 26.75);
                vertex(294.14, 32.90);
                vertex(285.26, 40.41);
                vertex(274.33, 57.49);
                vertex(272.96, 70.47);
                vertex(268.87, 79.35);
                vertex(248.38, 78.66);
                vertex(235.40, 91.64);
                vertex(236.08, 110.76);
                vertex(219.01, 104.62);
                vertex(206.71, 104.62);
                vertex(197.15, 102.57);
                endShape();

                // Stem & Branches
                fill(branches_light);
                beginShape();
                vertex(181.53, 295.97);
                vertex(169.19, 287.51);
                vertex(168.68, 250.57);
                vertex(169.70, 227.99);
                vertex(173.81, 215.67);
                vertex(171.24, 192.07);
                vertex(170.73, 174.62);
                vertex(162.01, 167.43);
                vertex(145.58, 160.76);
                vertex(121.98, 157.68);
                vertex(107.23, 154.50);
                vertex(83.35, 138.98);
                vertex(75.35, 126.98);
                vertex(91.35, 133.98);
                vertex(111.35, 145.98);
                vertex(131.35, 150.98);
                vertex(154.35, 150.98);
                vertex(171.35, 151.98);
                vertex(181.35, 151.98);
                vertex(183.35, 143.98);
                vertex(183.35, 129.98);
                vertex(190.35, 112.98);
                vertex(191.35, 96.98);
                vertex(184.35, 78.98);
                vertex(174.35, 61.98);
                vertex(170.35, 51.98);
                vertex(179.35, 42.98);
                vertex(173.35, 19.98);
                vertex(167.35, 4.98);
                vertex(180.35, 15.98);
                vertex(186.35, 27.98);
                vertex(187.35, 46.98);
                vertex(190.35, 56.98);
                vertex(197.22, 51.27);
                vertex(194.39, 32.12);
                vertex(204.35, 50.98);
                vertex(217.35, 70.98);
                vertex(217.35, 99.98);
                vertex(212.35, 127.98);
                vertex(212.35, 149.98);
                vertex(213.35, 171.98);
                vertex(214.35, 187.98);
                vertex(213.35, 239.98);
                vertex(214.35, 281.98);
                vertex(194.35, 295.98);
                endShape();
                beginShape();
                endShape();
                beginShape();
                vertex(212.34, 152.64);
                vertex(220.60, 141.37);
                vertex(237.88, 134.61);
                vertex(256.67, 133.10);
                vertex(269.44, 115.07);
                vertex(283.71, 100.05);
                vertex(307.76, 102.30);
                vertex(322.78, 109.81);
                vertex(310.76, 110.57);
                vertex(292.73, 112.07);
                vertex(283.71, 116.58);
                vertex(275.45, 132.35);
                vertex(266.33, 146.09);
                vertex(240.14, 155.64);
                vertex(228.12, 170.67);
                vertex(214.59, 187.20);
                endShape();
                beginShape();
                vertex(237.24, 135.55);
                vertex(243.14, 122.59);
                vertex(252.91, 115.07);
                vertex(253.66, 106.06);
                vertex(258.92, 90.28);
                vertex(258.92, 101.55);
                vertex(258.92, 110.57);
                vertex(255.16, 121.84);
                vertex(250.08, 134.20);
                endShape();
                beginShape();
                vertex(138.71, 151.14);
                vertex(132.70, 141.37);
                vertex(127.44, 127.09);
                vertex(134.95, 109.81);
                vertex(122.18, 103.05);
                vertex(104.15, 97.04);
                vertex(108.66, 85.02);
                vertex(110.91, 93.29);
                vertex(117.67, 96.29);
                vertex(130.45, 99.30);
                vertex(140.97, 108.31);
                vertex(139.46, 119.58);
                vertex(136.46, 133.10);
                vertex(141.72, 142.12);
                vertex(149.98, 148.88);
                vertex(167.26, 151.14);
                endShape();
                beginShape();
                vertex(217.60, 90.28);
                vertex(219.85, 71.50);
                vertex(227.37, 50.46);
                vertex(237.13, 31.68);
                vertex(251.41, 19.66);
                vertex(280.71, 17.40);
                vertex(256.67, 23.41);
                vertex(243.90, 30.17);
                vertex(237.88, 51.96);
                vertex(231.87, 89.53);
                vertex(224.36, 105.31);
                vertex(212.34, 128.60);
                endShape();
                beginShape();
                vertex(204.83, 51.21);
                vertex(205.58, 39.94);
                vertex(209.33, 26.42);
                vertex(216.85, 15.90);
                vertex(213.84, 24.16);
                vertex(211.59, 44.45);
                vertex(211.15, 63.02);
                endShape();
                beginShape();
                vertex(191.75, 95.15);
                vertex(185.29, 96.29);
                vertex(173.94, 88.05);
                vertex(159.79, 81.52);
                vertex(148.26, 77.17);
                vertex(143.22, 64.74);
                vertex(149.98, 73.75);
                vertex(159.00, 77.51);
                vertex(173.27, 82.77);
                vertex(181.54, 85.77);
                vertex(187.55, 85.02);
                endShape();
                beginShape();
                vertex(249.21, 151.74);
                vertex(266.43, 145.88);
                vertex(284.47, 141.37);
                vertex(296.17, 144.35);
                vertex(298.19, 148.41);
                vertex(301.00, 156.40);
                vertex(297.24, 150.39);
                vertex(294.14, 146.38);
                vertex(283.42, 145.51);
                vertex(270.94, 148.88);
                vertex(251.41, 153.39);
                vertex(234.98, 157.30);
                endShape();
                beginShape();
                vertex(236.48, 59.13);
                vertex(242.70, 54.10);
                vertex(248.21, 46.68);
                vertex(260.90, 39.98);
                vertex(274.54, 40.70);
                vertex(260.66, 42.37);
                vertex(250.36, 47.40);
                vertex(246.77, 52.91);
                vertex(243.18, 58.41);
                vertex(238.25, 66.28);
                vertex(234.32, 75.65);
                endShape();
                beginShape();
                vertex(171.44, 55.46);
                vertex(165.88, 54.97);
                vertex(160.49, 50.72);
                vertex(157.54, 42.71);
                vertex(153.46, 38.62);
                vertex(150.35, 44.02);
                vertex(151.82, 37.81);
                vertex(153.95, 36.99);
                vertex(157.38, 39.28);
                vertex(159.83, 42.22);
                vertex(162.28, 47.45);
                vertex(167.52, 50.56);
                vertex(173.08, 49.42);
                endShape();
                beginShape();
                vertex(108.83, 154.17);
                vertex(99.95, 158.19);
                vertex(89.09, 156.86);
                vertex(96.94, 159.64);
                vertex(108.06, 159.64);
                vertex(123.48, 157.26);
                endShape();

                // }
                break;
            case 2:
                // {
                // Leaves
                fill(leaves);
                beginShape();
                vertex(48.67, 27.91);
                vertex(44.38, 30.05);
                vertex(18.66, 40.77);
                vertex(12.23, 38.63);
                vertex(-11.34, 36.49);
                vertex(-19.91, 36.49);
                vertex(-37.06, 42.92);
                vertex(-58.50, 25.77);
                vertex(-71.36, 25.77);
                vertex(-77.79, 30.05);
                vertex(-73.50, 21.48);
                vertex(-109.94, 8.62);
                vertex(-105.66, -12.81);
                vertex(-127.09, -10.66);
                vertex(-124.95, -49.25);
                vertex(-142.10, -32.10);
                vertex(-139.95, -23.53);
                vertex(-157.10, -51.39);
                vertex(-144.24, -68.54);
                vertex(-139.95, -81.40);
                vertex(-176.39, -83.55);
                vertex(-165.68, -89.98);
                vertex(-165.68, -122.13);
                vertex(-163.53, -124.27);
                vertex(-161.39, -132.85);
                vertex(-139.95, -137.14);
                vertex(-131.38, -150.00);
                vertex(-127.09, -152.14);
                vertex(-103.51, -169.29);
                vertex(-105.66, -203.59);
                vertex(-79.93, -203.59);
                vertex(-64.93, -175.72);
                vertex(-54.21, -150.00);
                vertex(-47.78, -162.86);
                vertex(-54.21, -201.44);
                vertex(-49.92, -205.73);
                vertex(-34.92, -225.02);
                vertex(-37.06, -252.89);
                vertex(-49.92, -250.75);
                vertex(-62.78, -265.75);
                vertex(-75.65, -287.19);
                vertex(-47.78, -293.62);
                vertex(-47.78, -332.20);
                vertex(-2.76, -315.05);
                vertex(16.52, -315.05);
                vertex(33.67, -334.35);
                vertex(46.53, -325.77);
                vertex(65.82, -325.77);
                vertex(85.11, -315.05);
                vertex(87.26, -282.90);
                vertex(72.25, -278.61);
                vertex(78.68, -265.75);
                vertex(76.54, -252.89);
                vertex(59.39, -235.74);
                vertex(67.96, -233.60);
                vertex(72.25, -210.02);
                vertex(72.25, -199.30);
                vertex(108.69, -216.45);
                vertex(112.98, -186.44);
                vertex(108.69, -165.00);
                vertex(134.42, -154.28);
                vertex(142.99, -147.85);
                vertex(110.84, -126.42);
                vertex(95.83, -100.69);
                vertex(106.55, -92.12);
                vertex(110.84, -66.40);
                vertex(97.97, -49.25);
                vertex(95.83, -25.67);
                vertex(97.97, -21.38);
                vertex(74.40, 10.76);
                vertex(44.38, 15.05);
                vertex(44.38, 25.77);
                endShape();
                beginShape();
                vertex(160.14, -188.58);
                vertex(147.28, -199.30);
                vertex(125.84, -195.01);
                vertex(130.13, -192.87);
                vertex(97.97, -171.43);
                vertex(112.98, -158.57);
                vertex(91.54, -150.00);
                vertex(74.40, -130.70);
                vertex(85.11, -119.99);
                vertex(93.69, -109.27);
                vertex(117.27, -104.98);
                vertex(106.55, -100.69);
                vertex(140.85, -102.84);
                vertex(170.86, -109.27);
                vertex(177.29, -100.69);
                vertex(198.72, -132.85);
                vertex(198.72, -156.43);
                vertex(190.15, -167.15);
                vertex(173.00, -182.15);
                vertex(162.28, -188.58);
                endShape();
                beginShape();
                vertex(170.86, -192.87);
                vertex(155.85, -214.30);
                vertex(136.56, -199.30);
                vertex(123.70, -186.44);
                vertex(106.55, -173.58);
                vertex(82.97, -171.43);
                vertex(52.96, -169.29);
                vertex(57.25, -186.44);
                vertex(57.25, -210.02);
                vertex(57.25, -233.60);
                vertex(78.68, -272.18);
                vertex(63.68, -300.05);
                vertex(89.40, -319.34);
                vertex(102.26, -336.49);
                vertex(108.69, -366.50);
                vertex(104.41, -381.50);
                vertex(106.55, -396.51);
                vertex(106.55, -428.66);
                vertex(63.68, -426.52);
                vertex(7.94, -484.40);
                vertex(35.81, -501.55);
                vertex(44.38, -475.82);
                vertex(57.25, -507.98);
                vertex(91.54, -518.69);
                vertex(108.69, -548.70);
                vertex(119.41, -574.43);
                vertex(142.99, -561.57);
                vertex(149.42, -559.42);
                vertex(179.43, -544.42);
                vertex(185.86, -518.69);
                vertex(183.72, -514.41);
                vertex(203.01, -486.54);
                vertex(200.87, -469.39);
                vertex(222.30, -439.38);
                vertex(256.60, -465.10);
                vertex(278.04, -503.69);
                vertex(288.75, -473.68);
                vertex(282.32, -520.84);
                vertex(331.63, -505.83);
                vertex(350.92, -533.70);
                vertex(385.22, -531.56);
                vertex(402.36, -535.84);
                vertex(398.08, -503.69);
                vertex(430.23, -501.55);
                vertex(466.67, -501.55);
                vertex(483.76, -500.90);
                vertex(490.68, -499.67);
                vertex(506.73, -481.55);
                vertex(518.12, -443.67);
                vertex(528.84, -428.66);
                vertex(548.13, -430.81);
                vertex(552.42, -415.80);
                vertex(554.56, -383.65);
                vertex(533.12, -366.50);
                vertex(526.69, -330.06);
                vertex(528.84, -319.34);
                vertex(541.70, -295.76);
                vertex(533.12, -282.90);
                vertex(513.83, -265.75);
                vertex(490.25, -248.60);
                vertex(466.67, -270.04);
                vertex(449.52, -257.18);
                vertex(438.81, -259.32);
                vertex(400.22, -270.04);
                vertex(398.08, -248.60);
                vertex(389.50, -242.17);
                vertex(363.78, -229.31);
                vertex(335.91, -220.74);
                vertex(308.05, -205.73);
                vertex(293.04, -186.44);
                vertex(310.19, -167.15);
                vertex(308.05, -150.00);
                vertex(286.61, -137.14);
                vertex(235.16, -139.28);
                vertex(228.73, -156.43);
                vertex(218.02, -182.15);
                vertex(183.72, -177.86);
                vertex(166.57, -186.44);
                endShape();
                beginShape();
                vertex(395.93, -40.67);
                vertex(378.78, -51.39);
                vertex(355.21, -40.67);
                vertex(342.34, -64.25);
                vertex(335.91, -85.69);
                vertex(344.49, -104.98);
                vertex(346.63, -128.56);
                vertex(320.91, -141.42);
                vertex(342.34, -167.15);
                vertex(316.62, -175.72);
                vertex(323.05, -212.16);
                vertex(323.05, -225.02);
                vertex(331.63, -263.61);
                vertex(370.21, -252.89);
                vertex(380.93, -282.90);
                vertex(402.36, -306.48);
                vertex(436.66, -315.05);
                vertex(447.38, -291.47);
                vertex(455.95, -272.18);
                vertex(455.95, -252.89);
                vertex(481.68, -244.31);
                vertex(513.83, -276.47);
                vertex(528.84, -248.60);
                vertex(545.98, -233.60);
                vertex(573.85, -214.30);
                vertex(608.15, -201.44);
                vertex(610.29, -190.73);
                vertex(603.86, -167.15);
                vertex(597.43, -147.85);
                vertex(586.71, -130.70);
                vertex(610.29, -107.13);
                vertex(618.87, -98.55);
                vertex(629.58, -77.11);
                vertex(584.57, -51.39);
                vertex(595.29, -51.39);
                vertex(586.71, -10.66);
                vertex(554.56, -32.10);
                vertex(526.69, -14.95);
                vertex(503.11, -12.81);
                vertex(483.82, -10.66);
                vertex(460.24, -19.24);
                vertex(475.25, -44.96);
                vertex(466.67, -62.11);
                vertex(430.23, -53.54);
                vertex(417.37, -40.67);
                vertex(406.65, -44.96);
                endShape();

                // Stem & Branches
                fill(branches_light);
                beginShape();
                vertex(164.95, 295.44);
                vertex(145.95, 286.44);
                vertex(137.95, 225.44);
                vertex(137.95, 207.44);
                vertex(138.95, 167.44);
                vertex(138.95, 136.44);
                vertex(144.95, 104.44);
                vertex(143.95, 73.44);
                vertex(139.95, 31.44);
                vertex(129.95, 8.44);
                vertex(111.95, -14.55);
                vertex(77.95, -18.55);
                vertex(52.95, -19.55);
                vertex(15.95, -32.55);
                vertex(-2.04, -59.55);
                vertex(-27.04, -76.55);
                vertex(-56.94, -84.56);
                vertex(-93.24, -80.93);
                vertex(-112.60, -97.87);
                vertex(-77.51, -93.03);
                vertex(-44.84, -96.66);
                vertex(-4.91, -96.66);
                vertex(24.12, -77.30);
                vertex(54.37, -60.36);
                vertex(95.51, -53.10);
                vertex(133.02, -48.26);
                vertex(163.27, -54.31);
                vertex(176.58, -97.87);
                vertex(164.48, -145.06);
                vertex(162.92, -179.18);
                vertex(162.92, -228.70);
                vertex(141.70, -242.85);
                vertex(125.19, -238.13);
                vertex(111.04, -207.48);
                vertex(68.60, -195.69);
                vertex(99.25, -219.27);
                vertex(122.83, -252.28);
                vertex(153.49, -259.35);
                vertex(139.34, -287.65);
                vertex(127.55, -341.88);
                vertex(132.26, -389.04);
                vertex(144.05, -341.88);
                vertex(153.49, -304.16);
                vertex(172.35, -290.01);
                vertex(188.86, -261.71);
                vertex(200.65, -226.34);
                vertex(212.44, -247.57);
                vertex(217.15, -290.01);
                vertex(252.52, -299.44);
                vertex(236.01, -273.50);
                vertex(228.94, -240.49);
                vertex(228.94, -202.76);
                vertex(236.01, -153.25);
                vertex(238.37, -113.16);
                vertex(238.37, -56.57);
                vertex(240.73, 35.38);
                vertex(233.66, 70.75);
                vertex(238.37, 153.28);
                vertex(240.73, 200.44);
                vertex(238.37, 266.46);
                vertex(236.01, 282.96);
                vertex(194.35, 295.98);
                endShape();
                beginShape();
                endShape();
                beginShape();
                vertex(237.75, -55.40);
                vertex(302.17, -74.43);
                vertex(329.99, -94.93);
                vertex(368.06, -97.86);
                vertex(384.16, -128.60);
                vertex(454.44, -130.07);
                vertex(526.18, -127.14);
                vertex(555.46, -103.71);
                vertex(567.17, -83.21);
                vertex(540.82, -96.39);
                vertex(507.15, -111.03);
                vertex(469.08, -106.64);
                vertex(426.62, -94.93);
                vertex(398.80, -65.65);
                vertex(360.74, -43.68);
                vertex(312.42, -24.65);
                vertex(284.60, -11.47);
                vertex(253.86, 19.26);
                vertex(239.21, 42.69);
                endShape();
                beginShape();
                vertex(226.42, -218.31);
                vertex(253.86, -273.55);
                vertex(288.99, -307.22);
                vertex(343.17, -326.26);
                vertex(417.84, -351.15);
                vertex(411.98, -414.10);
                vertex(431.01, -447.78);
                vertex(426.62, -412.64);
                vertex(431.01, -387.75);
                vertex(441.26, -355.54);
                vertex(442.72, -329.18);
                vertex(425.16, -318.93);
                vertex(394.41, -305.76);
                vertex(341.70, -286.72);
                vertex(286.07, -257.44);
                vertex(277.28, -226.70);
                vertex(259.71, -181.31);
                vertex(236.29, -143.24);
                endShape();
                beginShape();
                vertex(145.54, -333.68);
                vertex(143.89, -356.82);
                vertex(145.54, -390.71);
                vertex(152.15, -413.02);
                vertex(143.06, -446.91);
                vertex(124.05, -466.74);
                vertex(141.41, -456.82);
                vertex(154.63, -439.47);
                vertex(158.76, -417.15);
                vertex(154.63, -389.05);
                vertex(152.15, -359.30);
                vertex(152.98, -331.20);
                vertex(157.94, -311.37);
                vertex(167.85, -290.71);
                vertex(152.58, -303.72);
                endShape();
                beginShape();
                vertex(153.33, -361.60);
                vertex(169.47, -379.60);
                vertex(172.58, -401.96);
                vertex(181.89, -405.06);
                vertex(175.06, -398.23);
                vertex(174.44, -383.33);
                vertex(166.37, -368.43);
                vertex(155.81, -352.90);
                vertex(152.71, -346.69);
                endShape();
                beginShape();
                vertex(214.80, -262.25);
                vertex(203.00, -301.37);
                vertex(196.17, -315.65);
                vertex(200.52, -328.69);
                vertex(199.90, -316.89);
                vertex(205.49, -308.20);
                vertex(209.83, -295.16);
                vertex(217.28, -288.33);
                endShape();
                beginShape();
                vertex(226.60, -292.67);
                vertex(229.08, -303.23);
                vertex(227.22, -321.24);
                vertex(236.53, -334.28);
                vertex(249.49, -344.77);
                vertex(269.44, -362.22);
                vertex(260.75, -347.31);
                vertex(251.43, -333.65);
                vertex(238.91, -319.79);
                vertex(239.38, -309.06);
                vertex(240.26, -295.16);
                endShape();
                beginShape();
                vertex(11.54, -87.14);
                vertex(-1.18, -110.77);
                vertex(-13.91, -135.32);
                vertex(-23.00, -168.95);
                vertex(-13.91, -193.50);
                vertex(-18.45, -218.95);
                vertex(-7.54, -247.14);
                vertex(36.08, -251.68);
                vertex(1.54, -239.86);
                vertex(-6.63, -218.95);
                vertex(-3.00, -194.41);
                vertex(-3.91, -173.50);
                vertex(2.45, -142.59);
                vertex(23.36, -108.95);
                vertex(48.81, -87.14);
                vertex(73.36, -56.23);
                vertex(53.34, -59.60);
                vertex(12.09, -83.11);
                endShape();
                beginShape();
                vertex(-3.02, -164.83);
                vertex(-1.16, -184.89);
                vertex(10.49, -202.15);
                vertex(33.82, -194.22);
                vertex(46.41, -214.74);
                vertex(46.41, -204.01);
                vertex(41.28, -190.02);
                vertex(34.29, -183.49);
                vertex(17.49, -186.28);
                vertex(9.56, -172.29);
                vertex(8.63, -155.50);
                vertex(8.16, -133.57);
                vertex(0.70, -141.97);
                endShape();
                beginShape();
                vertex(30.34, -28.16);
                vertex(7.37, -38.09);
                vertex(-1.93, -31.88);
                vertex(-17.46, -11.39);
                vertex(-37.95, 4.12);
                vertex(-19.85, -6.65);
                vertex(-5.66, -18.84);
                vertex(4.26, -30.64);
                vertex(22.27, -25.05);
                vertex(44.00, -23.81);
                endShape();
                beginShape();
                vertex(-26.90, -78.04);
                vertex(-37.80, -76.01);
                vertex(-50.23, -73.46);
                vertex(-62.65, -67.08);
                vertex(-67.43, -70.59);
                vertex(-63.46, -66.07);
                vertex(-57.56, -66.76);
                vertex(-44.81, -70.59);
                vertex(-27.60, -70.91);
                vertex(-11.67, -66.13);
                endShape();
                beginShape();
                vertex(-86.00, -94.46);
                vertex(-93.90, -97.62);
                vertex(-98.12, -103.68);
                vertex(-98.64, -109.73);
                vertex(-95.75, -105.52);
                vertex(-88.64, -98.67);
                vertex(-78.10, -97.36);
                vertex(-64.15, -94.20);
                vertex(-77.51, -92.63);
                endShape();
                beginShape();
                vertex(383.63, -128.07);
                vertex(388.60, -149.80);
                vertex(390.47, -183.33);
                vertex(376.80, -222.45);
                vertex(380.53, -248.53);
                vertex(398.54, -258.47);
                vertex(387.36, -244.19);
                vertex(394.19, -222.45);
                vertex(405.37, -198.24);
                vertex(408.47, -170.30);
                vertex(409.71, -143.60);
                vertex(422.75, -132.42);
                vertex(427.72, -129.31);
                endShape();
                beginShape();
                vertex(451.56, -102.47);
                vertex(497.23, -98.77);
                vertex(512.12, -65.45);
                vertex(499.50, -80.87);
                vertex(496.00, -91.38);
                vertex(485.48, -94.19);
                vertex(466.20, -93.14);
                vertex(440.62, -88.58);
                vertex(428.70, -89.28);
                vertex(419.94, -88.23);
                vertex(426.25, -95.59);
                endShape();
                beginShape();
                vertex(496.80, -128.16);
                vertex(507.82, -132.83);
                vertex(520.55, -142.58);
                vertex(537.93, -151.06);
                vertex(538.78, -163.79);
                vertex(547.26, -174.81);
                vertex(542.17, -161.67);
                vertex(542.60, -148.94);
                vertex(536.66, -145.55);
                vertex(524.79, -139.19);
                vertex(518.43, -134.95);
                vertex(513.76, -130.71);
                vertex(510.79, -127.74);
                endShape();
                beginShape();
                vertex(337.29, -323.55);
                vertex(357.34, -344.37);
                vertex(364.86, -367.78);
                vertex(351.31, -386.41);
                vertex(365.43, -398.82);
                vertex(382.93, -418.58);
                vertex(368.25, -396.57);
                vertex(358.65, -385.28);
                vertex(367.12, -375.12);
                vertex(370.51, -367.21);
                vertex(367.75, -350.54);
                vertex(368.52, -342.44);
                vertex(367.62, -333.94);
                endShape();
                beginShape();
                vertex(384.97, -302.25);
                vertex(405.01, -304.57);
                vertex(416.19, -304.57);
                vertex(434.70, -306.11);
                vertex(448.97, -315.36);
                vertex(462.07, -314.20);
                vertex(477.11, -308.81);
                vertex(492.53, -313.43);
                vertex(479.42, -312.28);
                vertex(469.01, -317.67);
                vertex(458.60, -321.91);
                vertex(443.95, -320.37);
                vertex(432.00, -314.59);
                vertex(421.98, -312.28);
                vertex(411.57, -313.43);
                endShape();
                beginShape();
                vertex(433.60, -378.45);
                vertex(434.63, -393.33);
                vertex(443.35, -410.78);
                vertex(439.76, -427.20);
                vertex(448.48, -412.83);
                vertex(446.43, -404.11);
                vertex(442.84, -394.36);
                vertex(440.78, -383.07);
                vertex(440.78, -370.24);
                vertex(441.81, -355.87);
                endShape();
                beginShape();
                vertex(288.20, -304.95);
                vertex(296.38, -319.50);
                vertex(301.84, -347.68);
                vertex(296.38, -370.41);
                vertex(333.65, -373.14);
                vertex(348.20, -379.50);
                vertex(338.20, -369.50);
                vertex(320.93, -365.86);
                vertex(318.20, -355.86);
                vertex(317.29, -343.14);
                vertex(324.56, -333.14);
                vertex(324.56, -317.68);
                endShape();
                beginShape();
                vertex(285.86, -257.61);
                vertex(311.82, -261.02);
                vertex(331.63, -258.97);
                vertex(365.09, -255.56);
                vertex(383.53, -269.22);
                vertex(365.48, -263.57);
                vertex(348.02, -267.17);
                vertex(335.04, -273.32);
                vertex(322.06, -278.10);
                endShape();
                beginShape();
                vertex(169.18, -127.63);
                vertex(164.67, -134.40);
                vertex(147.73, -141.74);
                vertex(135.88, -154.16);
                vertex(135.31, -176.73);
                vertex(140.39, -155.28);
                vertex(148.30, -150.20);
                vertex(158.47, -145.74);
                vertex(164.67, -146.25);
                endShape();
                beginShape();
                vertex(406.47, -185.00);
                vertex(407.17, -192.71);
                vertex(405.07, -209.88);
                vertex(404.72, -223.20);
                vertex(408.57, -236.52);
                vertex(413.13, -237.92);
                vertex(408.57, -231.61);
                vertex(406.82, -219.70);
                vertex(407.17, -213.74);
                vertex(408.57, -205.33);
                vertex(409.97, -198.32);
                vertex(411.03, -192.71);
                vertex(411.38, -186.75);
                vertex(411.03, -176.24);
                vertex(410.32, -167.82);
                vertex(408.92, -160.11);
                endShape();
                beginShape();
                vertex(407.55, -211.66);
                vertex(409.51, -219.27);
                vertex(413.21, -224.50);
                vertex(419.08, -218.84);
                vertex(426.92, -211.44);
                vertex(430.62, -215.36);
                vertex(427.79, -210.13);
                vertex(423.87, -211.87);
                vertex(419.30, -216.23);
                vertex(414.51, -221.23);
                vertex(412.34, -217.53);
                vertex(410.16, -213.83);
                vertex(409.94, -209.91);
                vertex(409.94, -205.13);
                vertex(409.73, -199.03);
                endShape();

                // }
                break;
        }
        popMatrix();
        popMatrix();
    }
    var Smoke = (function () {
        var constructor = function (x, y) {
            this.x = x;
            this.y = y;
            this.blobs = [];
        };
        constructor.prototype = {
            run: function () {
                if (frameCount % 10 === 0) {
                    this.blobs.push({
                        x: this.x,
                        y: this.y,
                        life: 150,
                        v: {
                            x: random(-0.2, 0.2),
                            y: random(-1, -0.5)
                        },
                    });
                }
                this.blobs.forEach(function (blob) {
                    blob.life--;
                    blob.x += blob.v.x;
                    blob.y += blob.v.y;
                    fill(170, blob.life);
                    ellipse(blob.x, blob.y, (150 - blob.life) / 5 + 30, (150 - blob.life) / 5 + 30);
                });
            }
        };
        return constructor;
    })();
    var house_smoke = Smoke.new(377, 153);

    var FONT_SANS_SERIF = createFont("Sans-Serif");
    var FONT_SANS_SERIF_BOLD = createFont("Sans-Serif Bold");
    var FONT_CURSIVE = createFont("cursive");
    var FONT_CURSIVE_BOLD = createFont("cursive Bold");
    var FONT_MONOSPACE = createFont("monospace");
    var FONT_CONSOLAS_BOLD = createFont("Consolas Bold");
    var FONT_CONSOLAS_BOLD_ITALIC = createFont("Consolas Bold Italic");

    var Brick = (function () {
        background(0, 0);

        for (var i = 0; i < 590; i++) {
            var x = i % 14,
                y = floor(i / 14);
            noFill();
            stroke(255, 255, 255, 50);
            strokeWeight(1);
            rect(-15 + x * 15 + (y % 2) * 15 / 2, y * 5, 15, 5);
        }

        var noiseVal;
        var noiseScale = 0.04;

        for (var y = 0; y < 200; y++) {
            for (var x = 0; x < 200; x++) {
                noiseDetail(3, 0.5);
                noiseVal = noise(
                    (x) * noiseScale,
                    (y) * noiseScale
                );
                if (noiseVal > 0.37) {
                    stroke(184, 161, 138, sqrt(noiseVal) * 1.3 * 255);
                    point(x, y);
                }
            }
        }

        return get(0, 0, 200, 200);
    })();
    var House = (function () {
        background(0, 0, 0, 0);

        pushMatrix();
        translate(35, -40);

        noStroke();

        fill(184, 161, 138);
        beginShape();
        vertex(89, 347);
        vertex(247, 347);
        vertex(248, 262);
        vertex(88.09, 261.62);
        endShape();

        // Eaves
        fill(184, 161, 138);
        beginShape();
        vertex(87, 262);
        vertex(166, 197);
        vertex(253, 262);
        endShape();

        image(Brick, 88, 187, 160, 160);

        fill(0, 50);
        beginShape();
        vertex(88.54, 279.92);
        vertex(167.16, 213.44);
        vertex(248.13, 279.44);
        vertex(248.08, 266.39);
        vertex(166.91, 200.14);
        vertex(88.07, 268.25);
        endShape();

        // Roof
        fill(41, 41, 41);
        beginShape();
        vertex(71.33, 280.87);
        vertex(168, 200.15);
        vertex(168, 89.00 - 50);
        vertex(71.33, 167.24 - 50);
        endShape();
        fill(51, 51, 51);
        beginShape();
        vertex(167, 199.86);
        vertex(263.27, 278.35);
        vertex(264.18, 168.35 - 50);
        vertex(167, 89.26 - 50);
        endShape();
        popMatrix();

        // Chimney
        fill(66, 64, 56);
        rect(172, 240 - 20, 60, 90);
        triangle(172, 240 - 20, 232, 240 - 20, 202, 230 - 20);
        rect(187, 235 - 120, 30, 20);
        fill(84, 81, 72);
        rect(172, 240, 60, 90);
        triangle(172, 240, 232, 240, 202, 230);
        rect(187, 235 - 100, 30, 100);

        // Windows
        fill(71, 71, 71);
        rect(133, 235, 30, 60);
        rect(141 + 100, 235, 30, 60);
        fill(232, 192, 127);
        rect(135, 237, 26, 56);
        rect(143 + 100, 237, 26, 56);
        strokeWeight(2);
        stroke(71, 71, 71);
        line(148, 237, 148, 293);
        line(256, 237, 256, 293);
        for (var i = 0; i < 3; i++) {
            line(135, 251 + i * 14, 161, 251 + i * 14);
            line(243, 251 + i * 14, 269, 251 + i * 14);
        }
        noStroke();

        return get();
    })();
    function Pillow(x, y, w, h, colors) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        fill((colors || {}).back || color(128, 95, 95));
        beginShape();
        vertex(237.03, 267.74);
        vertex(242.18, 260.62);
        vertex(251.87, 236.48);
        vertex(251.87, 216.90);
        vertex(257.02, 205.03);
        vertex(264.93, 184.45);
        vertex(270.47, 166.65);
        vertex(266.91, 148.44);
        vertex(258.99, 164.87);
        vertex(250.09, 176.54);
        vertex(240.99, 191.18);
        vertex(235.25, 207.80);
        vertex(235.92, 266.57);
        endShape();
        beginShape();
        vertex(159.46, 118.69);
        vertex(197.63, 142.59);
        vertex(228.86, 147.22);
        vertex(260.86, 150.69);
        vertex(267.42, 148.37);
        vertex(253.54, 145.68);
        vertex(236.57, 142.59);
        vertex(221.15, 139.12);
        vertex(211.90, 133.72);
        vertex(202.26, 131.03);
        vertex(185.68, 126.78);
        vertex(177.97, 122.54);
        vertex(160.62, 118.69);
        endShape();

        fill((colors || {}).front || color(173, 130, 130));
        beginShape();
        vertex(142.75, 186.91);
        vertex(149.11, 173.33);
        vertex(152.08, 156.79);
        vertex(154.20, 149.16);
        vertex(153.35, 138.13);
        vertex(153.71, 122.31);
        vertex(160.01, 118.17);
        vertex(167, 123);
        vertex(179, 131);
        vertex(190, 135);
        vertex(218.24, 144.50);
        vertex(237.75, 146.62);
        vertex(252.59, 146.62);
        vertex(267, 149);
        vertex(268.28, 156.37);
        vertex(257.26, 167.82);
        vertex(250.90, 176.73);
        vertex(242.41, 190.30);
        vertex(239.02, 207.69);
        vertex(238.17, 220.41);
        vertex(240.29, 234.40);
        vertex(240.72, 248.82);
        vertex(239.02, 256.88);
        vertex(236.90, 267.91);
        vertex(227.15, 270.45);
        vertex(215.27, 264.94);
        vertex(206.37, 257.31);
        vertex(198.31, 252.22);
        vertex(189, 248);
        vertex(173.71, 244.16);
        vertex(158.87, 239.92);
        vertex(146, 234);
        vertex(135, 228);
        vertex(121, 223);
        vertex(117.66, 218.55);
        vertex(119.94, 211.69);
        vertex(127.32, 205.47);
        vertex(135.97, 196.66);
        endShape();
        popMatrix();
    }
    function Couch(x, y, w, h) {

        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);

        noStroke();

        // Seat
        fill(117, 17, 17);
        rect(50, 209, 300, 105, 10);
        fill(117, 17, 17);
        rect(250, 256, 100, 100, 10);
        fill(158, 2, 2);
        rect(253, 224, 94, 100, 10);
        fill(158, 2, 2);
        rect(54, 175, 292, 105, 10);

        // Back
        fill(130, 13, 13);
        rect(50, 120, 300, 84, 10);
        fill(94, 5, 5);
        rect(50, 150, 300, 75, 10);

        // Armrest
        fill(94, 10, 10);
        rect(332, 211, 20, 53, 10);
        fill(135, 17, 17);
        rect(332, 182, 20, 53, 10);

        Pillow(235, 142, 150, 150, { front: color(194, 148, 148) });
        Pillow(201, 143, 150, 150, { front: color(171, 106, 106), back: color(143, 103, 103) });

        popMatrix();

    }
    function Lamp(x, y, w, h, height) {

        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        translate(-200, -320);

        var s = pow(height, 1 / 2.2) / 10;

        noStroke();
        fill(209, 194, 157);
        ellipse(200, 360, 150 * 0.6 * s, 70 * 0.6 * s);

        fill(186, 171, 136);
        ellipse(200, 356, 150 * 0.5 * s, 70 * 0.5 * s);

        fill(166, 152, 118);
        rect(195, 350 - height, 10, height);
        arc(200, 350, 10, 6, 0, 180);

        pushMatrix();
        translate(0, 180 - height);

        fill(153, 148, 148);
        var chain_length = 11;
        for (var i = 0; i < chain_length; i++) {
            ellipse(210, 165 + i * 3, 3, 3);
            if (i >= chain_length - 1) {
                ellipse(210, 165 + i * 3, 5, 5);
            }
        }

        fill(199, 186, 157);
        quad(170, 100, 160, 160, 240, 160, 230, 100);
        arc(200, 160, 80, 25, 0, 180);
        fill(150, 138, 112);
        ellipse(200, 100, 60, 15);

        popMatrix();

        /**for (var i = 0; i < 25; i++) {
            fill(240, 220, 139, 160 / i);
            ellipse(200, 160, i * 10, i * 10);
        }**/

        popMatrix();

    }
    function Torch(x, y) {

        pushMatrix();
        translate(x, y);
        scale(0.1, 0.1);

        noStroke();

        fill(77);
        rect(200 - 122 / 2, 240, 122, 90);
        arc(200, 330, 122, 60, 0, 180);

        fill(133, 133, 133);
        ellipse(200, 240, 122, 39);

        stroke(77);
        strokeWeight(4);
        line(200 - 120 / 2, 240, 200 - 188 / 2, 150);
        line(200 + 120 / 2, 240, 200 + 188 / 2, 150);
        line(200 - 68 / 2, 224, 200 - 100 / 2, 150);
        line(200 + 68 / 2, 224, 200 + 100 / 2, 150);

        noStroke();
        fill(240, 201, 84);
        beginShape();
        vertex(168.03, 231.24);
        vertex(165, 228);
        vertex(158, 206);
        vertex(158, 202);
        vertex(158, 186);
        vertex(159, 182);
        vertex(168, 198);
        vertex(170, 175);
        vertex(173, 182);
        vertex(174, 170);
        vertex(174, 160);
        vertex(180, 151);
        vertex(194, 176);
        vertex(194, 158);
        vertex(195, 149);
        vertex(201, 166);
        vertex(209, 157);
        vertex(226, 149);
        vertex(228, 167);
        vertex(238, 166);
        vertex(246, 180);
        vertex(234, 205);
        vertex(238.43, 219.57);
        vertex(237.16, 227.85);
        vertex(233.01, 238.37);
        vertex(213.58, 241.87);
        vertex(200.51, 245.06);
        vertex(185, 241);
        vertex(182.08, 241.92);
        vertex(178.57, 241.51);
        vertex(174, 240);
        vertex(170.73, 233.14);
        endShape();

        stroke(77);
        strokeWeight(4);
        line(200 - 68 / 2, 255, 200 - 100 / 2, 181);
        line(200 + 68 / 2, 255, 200 + 100 / 2, 181);

        fill(77, 77, 77);
        ellipse(200, 150, 188, 69);


        popMatrix();
        noStroke();
        strokeWeight(1);

    }
    function Chest(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 200, h / 200);
        translate(-146, -130);

        stroke(0);
        fill(150, 91, 19);
        rect(200, 200 - 20, 90, 105);
        fill(184, 121, 53);
        rect(200, 200 - 20, 90, 38 + 20);
        arc(245.5, 200 - 18, 89, 20, 180, 360);
        fill(0, 50);
        noStroke();
        arc(245.5, 234, 89, 50, 180, 360);
        arc(200, 202, 27, 43, -90, 90);
        arc(200 + 90, 202, 27, 43, 90, 270);
        strokeWeight(5);
        stroke(82, 56, 4);
        line(287, 236, 203, 236);


        // Keyhole
        noStroke();
        fill(58, 59, 71);
        rect(242, 234, 10, 30);
        fill(31, 32, 36);
        ellipse(247, 242, 7, 7);
        rect(244, 242, 5, 13);
        popMatrix();
    }

    function Crystal(x, y, w, h, palette) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);

        pushMatrix();
        translate(25, 0);

        noStroke();
        stroke(255, 0);

        // LARGE SPIKE
        fill(palette.medium);
        beginShape();
        vertex(149.84, 249.25);
        vertex(117.09, 143.94);
        vertex(143, 131);
        vertex(180, 229);
        vertex(189.40, 164.67);
        vertex(208.90, 168.42);
        vertex(200.97, 232.25);
        vertex(212.69, 259.43);
        vertex(204.87, 275.94);
        vertex(184.88, 271.89);
        vertex(166.64, 282.90);
        vertex(154.18, 267.83);
        vertex(148.10, 268.12);
        vertex(142.63, 260.34);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(117.09, 143.94);
        vertex(117.22, 118.38);
        vertex(143.41, 130.93);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(143.00, 131.00);
        vertex(149.28, 125.25);
        vertex(182.89, 213.96);
        vertex(179.42, 229.00);
        endShape();
        beginShape();
        vertex(149.23, 125.67);
        vertex(117.22, 118.42);
        vertex(143.15, 130.94);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(117.31, 143.61);
        vertex(110.92, 143.61);
        vertex(117.22, 118.38);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(111.02, 143.16);
        vertex(143.60, 257.96);
        vertex(150.96, 248.14);
        vertex(117.66, 143.35);
        endShape();

        // Rocky Part
        fill(105, 105, 105);
        beginShape();
        vertex(142.59, 259.40);
        vertex(146.80, 251.50);
        vertex(152.33, 244.39);
        vertex(153.12, 239.12);
        vertex(158.13, 236.49);
        vertex(158.13, 232.28);
        vertex(159.97, 230.43);
        vertex(164.71, 229.38);
        vertex(170.24, 229.38);
        vertex(172.87, 229.12);
        vertex(179.46, 228.33);
        vertex(188.15, 227.54);
        vertex(191.31, 229.38);
        vertex(195.78, 232.01);
        vertex(195.26, 234.91);
        vertex(201.58, 234.38);
        vertex(201.58, 235.96);
        vertex(207.63, 237.81);
        vertex(204.21, 239.91);
        vertex(208.16, 238.86);
        vertex(207.63, 238.07);
        vertex(210.00, 239.91);
        vertex(209.74, 242.02);
        vertex(208.95, 245.18);
        vertex(210.79, 247.81);
        vertex(213.16, 252.03);
        vertex(215.53, 254.13);
        vertex(216.32, 258.08);
        vertex(216.32, 265.72);
        vertex(214.48, 268.35);
        vertex(212.37, 272.83);
        vertex(209.21, 277.04);
        vertex(206.05, 278.89);
        vertex(204.47, 280.20);
        vertex(200.79, 280.47);
        vertex(197.63, 278.36);
        vertex(193.94, 280.47);
        vertex(190.25, 280.47);
        vertex(186.04, 282.05);
        vertex(181.30, 283.10);
        vertex(177.61, 282.84);
        vertex(173.66, 284.94);
        vertex(169.19, 283.89);
        vertex(167.87, 284.15);
        vertex(161.55, 286.26);
        vertex(159.44, 283.89);
        vertex(158.13, 281.26);
        vertex(156.81, 277.83);
        vertex(156.02, 271.51);
        vertex(153.39, 272.04);
        vertex(151.02, 272.30);
        vertex(145.75, 272.04);
        vertex(143.38, 270.46);
        vertex(142.85, 269.41);
        vertex(141.80, 266.51);
        vertex(141.54, 264.40);
        vertex(142.33, 262.30);
        vertex(142.59, 258.35);
        vertex(144.17, 257.29);
        endShape();

        // Second Spike
        fill(palette.dark);
        beginShape();
        vertex(205.37, 242.22);
        vertex(215.38, 164.74);
        vertex(208.85, 168.22);
        vertex(200.36, 231.77);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(189.21, 164.83);
        vertex(202.27, 154.14);
        vertex(209.05, 168.45);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(202.22, 154.09);
        vertex(215.21, 164.78);
        vertex(208.84, 168.24);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(174.16, 191.23);
        vertex(169.72, 141.13);
        vertex(173.41, 143.43);
        vertex(179.99, 206.49);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(179.89, 206.20);
        vertex(182.59, 213.21);
        vertex(183.67, 205.30);
        vertex(178.81, 142.53);
        vertex(173.41, 143.43);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(183.49, 202.63);
        vertex(185.66, 191.75);
        vertex(180.87, 138.87);
        vertex(178.78, 142.43);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(169.73, 141.14);
        vertex(174.70, 135.48);
        vertex(173.42, 143.43);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(178.81, 142.52);
        vertex(174.70, 135.48);
        vertex(173.41, 143.45);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(178.76, 142.60);
        vertex(174.70, 135.48);
        vertex(180.90, 138.88);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(174.36, 254.19);
        vertex(174.44, 245.09);
        vertex(181.39, 247.58);
        vertex(181.31, 256.71);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(181.37, 247.60);
        vertex(190.24, 246.04);
        vertex(189.48, 254.04);
        vertex(181.31, 256.94);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(190.19, 246.07);
        vertex(190.97, 244.54);
        vertex(189.40, 254.19);
        vertex(189.48, 254.04);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(174.44, 245.09);
        vertex(182.76, 240.08);
        vertex(181.39, 247.60);
        endShape();
        fill(palette.medium);
        beginShape();
        vertex(181.34, 247.66);
        vertex(182.75, 240.09);
        vertex(190.23, 246.05);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(191.00, 244.52);
        vertex(182.76, 240.09);
        vertex(190.23, 246.08);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(174.44, 245.09);
        vertex(177.88, 242.03);
        vertex(182.76, 240.09);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(191.00, 244.53);
        vertex(186.35, 241.33);
        vertex(182.70, 240.14);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(174.34, 253.18);
        vertex(167.91, 243.47);
        vertex(169.87, 243.21);
        vertex(174.41, 250.28);
        endShape();

        fill(palette.dark);
        beginShape();
        vertex(174.39, 247.80);
        vertex(171.03, 241.60);
        vertex(169.84, 243.22);
        vertex(174.39, 250.17);
        endShape();
        fill(palette.light);
        beginShape();
        vertex(167.93, 243.49);
        vertex(168.75, 241.50);
        vertex(169.88, 243.25);
        endShape();
        fill(palette.dark);
        beginShape();
        vertex(171.05, 241.59);
        vertex(168.76, 241.53);
        vertex(169.88, 243.22);
        endShape();

        // Rock Overlay
        fill(115, 115, 115);
        beginShape();
        vertex(162.03, 259.45);
        vertex(161.49, 257.96);
        vertex(162.71, 256.34);
        vertex(164.46, 253.91);
        vertex(165.41, 253.51);
        vertex(167.44, 251.75);
        vertex(169.60, 253.10);
        vertex(170.41, 254.45);
        vertex(173.38, 255.13);
        vertex(177.30, 254.72);
        vertex(179.73, 255.26);
        vertex(182.44, 255.94);
        vertex(181.49, 256.34);
        vertex(183.38, 257.15);
        vertex(185.27, 257.96);
        vertex(185.81, 258.64);
        vertex(184.33, 260.26);
        vertex(184.46, 262.02);
        vertex(185.00, 263.78);
        vertex(187.44, 266.21);
        vertex(192.03, 266.07);
        vertex(191.08, 267.42);
        vertex(187.44, 268.64);
        vertex(182.84, 269.05);
        vertex(182.03, 271.61);
        vertex(179.87, 273.23);
        vertex(174.06, 273.64);
        vertex(168.65, 271.88);
        vertex(167.44, 265.94);
        vertex(163.52, 259.05);
        vertex(162.57, 258.37);
        endShape();
        beginShape();
        vertex(153.65, 257.42);
        vertex(152.03, 256.34);
        vertex(150.14, 254.59);
        vertex(152.57, 252.83);
        vertex(151.76, 248.10);
        vertex(152.03, 246.88);
        vertex(155.14, 245.53);
        vertex(156.36, 242.15);
        vertex(156.49, 238.91);
        vertex(158.65, 236.88);
        vertex(161.90, 233.78);
        vertex(161.22, 235.67);
        vertex(161.90, 243.51);
        vertex(165.00, 249.18);
        vertex(165.00, 250.67);
        vertex(165.68, 251.07);
        vertex(163.38, 252.83);
        vertex(161.09, 254.45);
        vertex(160.41, 257.42);
        vertex(160.14, 260.94);
        vertex(157.03, 264.59);
        vertex(151.90, 263.37);
        vertex(148.38, 264.72);
        vertex(146.76, 259.32);
        vertex(147.30, 255.80);
        vertex(150.01, 256.88);
        endShape();
        beginShape();
        vertex(153.38, 241.19);
        vertex(153.67, 231.34);
        vertex(157.15, 228.73);
        vertex(162.36, 220.91);
        vertex(162.07, 215.70);
        vertex(167.57, 215.12);
        vertex(169.31, 220.04);
        vertex(173.08, 224.10);
        vertex(177.13, 228.44);
        vertex(173.37, 236.27);
        vertex(171.63, 236.84);
        vertex(167.28, 238.29);
        vertex(166.41, 234.53);
        vertex(163.23, 231.34);
        vertex(159.46, 232.21);
        vertex(156.28, 234.53);
        vertex(154.54, 236.84);
        vertex(155.70, 239.16);
        vertex(154.83, 242.64);
        vertex(155.70, 243.22);
        vertex(156.86, 242.35);
        endShape();

        popMatrix();
        popMatrix();
    }

    var Light_Masks = Light_Masks || (function () {
        var ctx = createGraphics(400, 400, P2D);
        ctx.background(0, 0, 0, 0);
        ctx.fill(0, 0);
        ctx.noStroke();
        ctx.rect(0, 0, 400, 400);

        return (Array.new(10)).fill(0).map(function () {
            return ctx.get();
        });
    })();
    var LightLayers = LightLayers || [].concat(Light_Masks);
    var __lights = [
        [], [], [], [], [], [], [], [], [], []
    ];
    var __cutout = [
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            ctx.fill(180);
            ctx.beginShape();
            ctx.vertex(217.62, 142.69);
            ctx.vertex(245.61, 117.97);
            ctx.vertex(283.40, 102.57);
            ctx.vertex(315.12, 90.91);
            ctx.vertex(346.85, 102.57);
            ctx.vertex(374.37, 122.63);
            ctx.vertex(400.49, 135.23);
            ctx.vertex(399.79, 401.64);
            ctx.vertex(-5.16, 405.78);
            ctx.vertex(34.50, 393.38);
            ctx.vertex(86.56, 383.46);
            ctx.vertex(128.71, 367.76);
            ctx.vertex(175.82, 342.97);
            ctx.vertex(224.58, 319.83);
            ctx.vertex(265.08, 281.81);
            ctx.vertex(300.61, 253.71);
            ctx.vertex(313.01, 238.01);
            ctx.vertex(311.36, 209.91);
            ctx.vertex(316.31, 172.72);
            ctx.vertex(300.61, 150.40);
            ctx.vertex(265.90, 145.45);
            ctx.vertex(216.31, 143.79);
            ctx.endShape();

        },
        function (ctx) {
            ctx.background(0);
        },
        function (ctx) {
            //ctx.background(150);
            ctx.fill(180);
            ctx.beginShape();
            ctx.vertex(48.26, 152.19);
            ctx.vertex(14.26, 171.19);
            ctx.vertex(0.26, 214.19);
            ctx.vertex(-3.11, 407.44);
            ctx.vertex(409.26, 410.19);
            ctx.vertex(407.35, 32.04);
            ctx.vertex(381.26, 70.37);
            ctx.vertex(320.86, 165.76);
            ctx.vertex(267.80, 181.00);
            ctx.vertex(202.89, 184.39);
            ctx.vertex(84.91, 167.46);
            ctx.endShape();

        },
        function (ctx) {
            ctx.background(180);
        },
        function (ctx) {
            ctx.background(70);
        }
    ];
    var light_loaded = 0;
    function LoadLights() {
        var Lights = function (lvl) {
            var ctx = createGraphics(400, 400, P2D);
            ctx.background(0);
            __cutout[lvl](ctx);
            for (var i = 0; i < __lights[lvl].length; i++) {
                var l = __lights[lvl][i];
                for (var j = 0; j < l.size; j++) {
                    ctx.strokeWeight(1);
                    ctx.stroke(l.color || color(0), (l.size - j) / l.size * l.intensity);
                    ctx.noFill();
                    ctx.ellipse(l.x, l.y, j, j);
                }
            }
            return ctx.get();
        };
        var imageMask = Lights(light_loaded);
        LightLayers[light_loaded].mask(imageMask);
        /*LightLayers.map(function (layer, lvl) {
            var imageMask = Lights(lvl);
            layer.mask(imageMask);
            return layer;
        });*/
        //println(LightLayers[0]);
    }
    var loaded_mask = false;

    var Gray_Winston = Monochrome(getImage("creatures/Winston"), color(191, 191, 191));
    function Skills_Statue(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        translate(-200, -400);

        fill(153, 153, 153);
        rect(50, 200, 300, 160);
        arc(200, 360, 300, 160, 0, 180);
        fill(184, 184, 184);
        ellipse(200, 200, 300, 170);

        image(Gray_Winston, 50, -50, 300, 300);

        popMatrix();
    }
    function Mines_Boulder() {
        fill(120);
        beginShape();
        vertex(257, 246);
        vertex(218, 248);
        vertex(203, 235);
        vertex(194, 229);
        vertex(187.05, 210.52);
        vertex(184.94, 185.56);
        vertex(197.54, 175.30);
        vertex(206.40, 162.24);
        vertex(223, 158);
        vertex(238, 156);
        vertex(248, 159);
        vertex(252.12, 161.77);
        vertex(260.52, 165.97);
        vertex(262.85, 172.96);
        vertex(269.38, 179.96);
        vertex(274, 188);
        vertex(278, 196);
        vertex(274, 215);
        vertex(275, 228);
        vertex(275, 235);
        vertex(273, 243);
        vertex(265, 245);
        endShape();
        fill(80);
        beginShape();
        vertex(253.05, 246.21);
        vertex(226.00, 239.68);
        vertex(207.34, 231.28);
        vertex(197.07, 217.28);
        vertex(198.94, 201.89);
        vertex(192.87, 186.49);
        vertex(188.68, 182.76);
        vertex(184.94, 186.03);
        vertex(186.81, 199.09);
        vertex(187.74, 210.75);
        vertex(194.27, 230.35);
        vertex(202.20, 235.48);
        vertex(218.07, 248.07);
        vertex(253.52, 247.61);
        endShape();
        fill(110);
        beginShape();
        vertex(232.01, 210.00);
        vertex(227.77, 196.43);
        vertex(239.65, 184.56);
        vertex(238.37, 173.96);
        vertex(241.34, 173.11);
        vertex(242.19, 199.83);
        vertex(251.10, 214.24);
        vertex(264.67, 202.79);
        vertex(254.07, 219.33);
        vertex(243.04, 216.36);
        vertex(238.37, 215.52);
        vertex(232.86, 232.48);
        vertex(233.71, 215.52);
        vertex(224.80, 212.97);
        vertex(231.16, 210.85);
        endShape();

        var col = Hitbox(mr_spunky.x, mr_spunky.y, 175, 150, 90, 115);
        if (col[2]) {
            mr_spunky.x = col[0];
            mr_spunky.y = col[1];
        }
    }
    function MainText(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        noStroke();
        beginShape();
        vertex(18, 174);
        vertex(18, 100);
        vertex(29, 93);
        vertex(32, 128);
        vertex(54, 94);
        vertex(64, 102);
        vertex(40, 139);
        vertex(60, 175);
        vertex(42, 163);
        vertex(32, 155);
        vertex(33, 182);
        endShape();
        beginShape();
        vertex(71, 92);
        vertex(71, 177);
        vertex(84, 178);
        vertex(87, 142);
        vertex(101, 141);
        vertex(103, 175);
        vertex(117, 174);
        vertex(113, 130);
        vertex(95, 123);
        vertex(83, 131);
        vertex(88, 93);
        endShape();
        beginShape();
        vertex(176.66, 139.17);
        vertex(150, 125);
        vertex(131, 130);
        vertex(129, 161);
        vertex(135, 174);
        vertex(158, 170);
        vertex(161, 174);
        vertex(171, 164);
        vertex(160.79, 156.95);
        vertex(155, 160);
        vertex(141, 157);
        vertex(143, 141);
        vertex(157, 144);
        vertex(155.03, 160.08);
        vertex(161.35, 157.52);
        vertex(170.98, 150.05);
        vertex(166.71, 141.00);
        vertex(161.08, 157.27);
        vertex(170.97, 163.94);
        endShape();
        beginShape();
        vertex(190.22, 169.57);
        vertex(202.32, 169.57);
        vertex(204.52, 140.97);
        vertex(222.12, 137.67);
        vertex(229.82, 172.87);
        vertex(245.22, 169.57);
        vertex(231.98, 120.92);
        vertex(200.86, 125.63);
        vertex(195.85, 110.21);
        vertex(184.66, 120.62);
        vertex(189.29, 165.73);
        endShape();
        beginShape();
        vertex(258.34, 84.55);
        vertex(277.43, 84.55);
        vertex(278.34, 167.28);
        vertex(264.71, 170.92);
        vertex(263.80, 121.83);
        endShape();
        beginShape();
        vertex(327.43, 120.92);
        vertex(303.80, 110.92);
        vertex(292.89, 123.64);
        vertex(288.34, 151.83);
        vertex(301.07, 170.01);
        vertex(326.52, 162.74);
        vertex(326.52, 171.83);
        vertex(342.89, 169.10);
        vertex(341.98, 145.46);
        vertex(326.52, 143.64);
        vertex(321.07, 151.83);
        vertex(307.43, 153.64);
        vertex(301.07, 146.37);
        vertex(302.89, 134.55);
        vertex(309.25, 128.19);
        vertex(325.61, 133.64);
        vertex(325.61, 144.55);
        vertex(342.17, 145.61);
        vertex(342.66, 118.96);
        vertex(328.77, 118.30);
        endShape();
        beginShape();
        vertex(362.99, 168.35);
        vertex(377.29, 168.35);
        vertex(379.49, 133.15);
        vertex(394.89, 129.85);
        vertex(405.89, 138.65);
        vertex(405.89, 152.95);
        vertex(404.79, 167.25);
        vertex(416.89, 166.15);
        vertex(410.29, 119.95);
        vertex(391.59, 119.95);
        vertex(376.19, 122.15);
        vertex(369.59, 110.05);
        vertex(359.69, 116.65);
        endShape();
        beginShape();
        vertex(464.19, 118.85);
        vertex(437.79, 115.55);
        vertex(430.09, 123.25);
        vertex(427.89, 152.95);
        vertex(438.89, 166.15);
        vertex(459.79, 167.25);
        vertex(470.79, 158.45);
        vertex(471.89, 169.45);
        vertex(487.29, 167.25);
        vertex(483.87, 143.53);
        vertex(470.79, 146.35);
        vertex(458.69, 157.35);
        vertex(444.39, 159.55);
        vertex(435.59, 141.95);
        vertex(450.99, 127.65);
        vertex(463.09, 135.35);
        vertex(469.69, 146.35);
        vertex(483.87, 144.17);
        vertex(481.64, 82.35);
        vertex(463.39, 75.60);
        endShape();
        beginShape();
        vertex(18, 174);
        vertex(18, 100);
        vertex(29, 93);
        vertex(32, 128);
        vertex(54, 94);
        vertex(64, 102);
        vertex(40, 139);
        vertex(60, 175);
        vertex(42, 163);
        vertex(32, 155);
        vertex(33, 182);
        endShape();
        beginShape();
        vertex(71, 92);
        vertex(71, 177);
        vertex(84, 178);
        vertex(87, 142);
        vertex(101, 141);
        vertex(103, 175);
        vertex(117, 174);
        vertex(113, 130);
        vertex(95, 123);
        vertex(83, 131);
        vertex(88, 93);
        endShape();
        beginShape();
        vertex(158.24, 130.07);
        vertex(150, 125);
        vertex(131, 130);
        vertex(129, 161);
        vertex(135, 174);
        vertex(158.23, 169.34);
        vertex(160.91, 173.50);
        vertex(172.50, 173.21);
        vertex(170.72, 161.91);
        vertex(158.23, 156.86);
        vertex(149.31, 160.42);
        vertex(141.14, 155.81);
        vertex(140.69, 148.23);
        vertex(146.64, 142.73);
        vertex(154.81, 143.77);
        vertex(158.53, 149.27);
        vertex(158.08, 157.15);
        vertex(170.80, 162.09);
        vertex(171.46, 154.77);
        vertex(170.72, 149.87);
        vertex(170.72, 141.72);
        vertex(172.51, 126.19);
        vertex(160.74, 123.90);
        endShape();
        beginShape();
        vertex(190.22, 169.57);
        vertex(202.32, 169.57);
        vertex(204.52, 140.97);
        vertex(222.12, 137.67);
        vertex(229.82, 172.87);
        vertex(245.22, 169.57);
        vertex(231.98, 120.92);
        vertex(200.86, 125.63);
        vertex(195.85, 110.21);
        vertex(184.66, 120.62);
        vertex(189.29, 165.73);
        endShape();
        beginShape();
        vertex(258.34, 84.55);
        vertex(277.43, 84.55);
        vertex(278.34, 167.28);
        vertex(264.71, 170.92);
        vertex(263.80, 121.83);
        endShape();
        beginShape();
        vertex(327.43, 120.92);
        vertex(303.80, 110.92);
        vertex(292.89, 123.64);
        vertex(288.34, 151.83);
        vertex(301.07, 170.01);
        vertex(326.52, 162.74);
        vertex(326.52, 171.83);
        vertex(342.89, 169.10);
        vertex(341.98, 145.46);
        vertex(326.52, 143.64);
        vertex(321.07, 151.83);
        vertex(307.43, 153.64);
        vertex(301.07, 146.37);
        vertex(302.89, 134.55);
        vertex(309.25, 128.19);
        vertex(325.61, 133.64);
        vertex(325.61, 144.55);
        vertex(342.17, 145.61);
        vertex(342.66, 118.96);
        vertex(328.77, 118.30);
        endShape();
        beginShape();
        vertex(362.99, 168.35);
        vertex(377.29, 168.35);
        vertex(379.49, 133.15);
        vertex(394.89, 129.85);
        vertex(405.89, 138.65);
        vertex(405.89, 152.95);
        vertex(404.79, 167.25);
        vertex(416.89, 166.15);
        vertex(410.29, 119.95);
        vertex(391.59, 119.95);
        vertex(376.19, 122.15);
        vertex(369.59, 110.05);
        vertex(359.69, 116.65);
        endShape();
        beginShape();
        vertex(464.19, 118.85);
        vertex(437.79, 115.55);
        vertex(430.09, 123.25);
        vertex(427.89, 152.95);
        vertex(438.89, 166.15);
        vertex(459.79, 167.25);
        vertex(470.79, 158.45);
        vertex(471.89, 169.45);
        vertex(487.29, 167.25);
        vertex(483.87, 143.53);
        vertex(470.79, 146.35);
        vertex(458.69, 157.35);
        vertex(444.39, 159.55);
        vertex(435.59, 141.95);
        vertex(450.99, 127.65);
        vertex(463.09, 135.35);
        vertex(469.69, 146.35);
        vertex(483.87, 144.17);
        vertex(481.64, 82.35);
        vertex(463.39, 75.60);
        endShape();
        popMatrix();
    }
    function PlayText(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        noStroke();
        beginShape();
        vertex(116, 248);
        vertex(112, 194);
        vertex(129, 194);
        vertex(158, 200);
        vertex(158, 213);
        vertex(142, 220);
        vertex(128, 221);
        vertex(127, 211);
        vertex(140, 208);
        vertex(127, 201);
        vertex(131.29, 248.71);
        endShape();
        beginShape();
        vertex(169.90, 193.43);
        vertex(167.42, 247.45);
        vertex(176.73, 248.07);
        vertex(179.84, 213.92);
        vertex(186.67, 195.29);
        endShape();
        beginShape();
        vertex(221.44, 223.86);
        vertex(209.64, 211.44);
        vertex(196.60, 214.54);
        vertex(187.29, 228.82);
        vertex(190.39, 245.59);
        vertex(207.78, 251.18);
        vertex(217.71, 246.83);
        vertex(219.58, 251.18);
        vertex(232.00, 249.31);
        vertex(228.27, 241.86);
        vertex(217.71, 240.00);
        vertex(210.26, 241.86);
        vertex(198.47, 235.03);
        vertex(199.71, 226.34);
        vertex(208.40, 223.23);
        vertex(215.23, 230.07);
        vertex(218.34, 240.62);
        vertex(228.89, 241.86);
        vertex(232.00, 217.03);
        vertex(222.06, 217.65);
        endShape();
        beginShape();
        vertex(245.06, 214.76);
        vertex(256.92, 211.38);
        vertex(269.33, 238.47);
        vertex(280.06, 213.63);
        vertex(289.09, 218.71);
        vertex(264.25, 279.11);
        vertex(250.71, 271.78);
        vertex(263.69, 250.89);
        endShape();
        popMatrix();
    }
    function LoadingText(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 400, h / 400);
        noStroke();
        beginShape();
        vertex(57, 281);
        vertex(75, 278);
        vertex(75, 322);
        vertex(99, 318);
        vertex(96, 338);
        vertex(65, 341);
        endShape();
        beginShape();
        vertex(142, 294);
        vertex(122, 302);
        vertex(119, 322);
        vertex(128, 338);
        vertex(147, 337);
        vertex(158, 318);
        vertex(150.62, 299.91);
        vertex(140.77, 313.21);
        vertex(144.54, 319.61);
        vertex(140.35, 328.48);
        vertex(131.48, 325.68);
        vertex(131.48, 311.68);
        vertex(140.77, 313.31);
        vertex(150.61, 300.02);
        endShape();
        beginShape();
        vertex(197.03, 295.95);
        vertex(182.53, 302.40);
        vertex(177.53, 323.47);
        vertex(188.32, 337.16);
        vertex(211.57, 335.95);
        vertex(216.69, 327.25);
        vertex(219.96, 335.52);
        vertex(227.57, 336.17);
        vertex(226.70, 317.89);
        vertex(210.60, 318.33);
        vertex(205.74, 326.09);
        vertex(196.09, 326.26);
        vertex(189.55, 322.17);
        vertex(195.33, 307.76);
        vertex(206.03, 312.45);
        vertex(210.82, 318.98);
        vertex(226.48, 318.11);
        vertex(227.14, 294.17);
        vertex(215.60, 295.26);
        vertex(212.12, 302.87);
        vertex(198.71, 296.47);
        endShape();
        beginShape();
        vertex(278.01, 294.59);
        vertex(261.01, 292.59);
        vertex(251.01, 309.59);
        vertex(262.27, 334.60);
        vertex(289.01, 333.59);
        vertex(295.01, 326.59);
        vertex(298.60, 334.56);
        vertex(307.46, 333.16);
        vertex(302.33, 308.90);
        vertex(288.01, 311.59);
        vertex(284.01, 323.59);
        vertex(273.01, 325.59);
        vertex(263.01, 309.59);
        vertex(277.01, 305.59);
        vertex(287.01, 312.59);
        vertex(302.33, 309.84);
        vertex(300.93, 264.12);
        vertex(286.47, 262.72);
        vertex(295.01, 301.59);
        endShape();
        beginShape();
        vertex(327.83, 302.77);
        vertex(347.07, 304.01);
        vertex(342.11, 335.68);
        vertex(326.58, 335.68);
        endShape();
        beginShape();
        vertex(334.66, 284.14);
        vertex(328.45, 274.83);
        vertex(343.35, 269.86);
        vertex(345.21, 282.28);
        endShape();
        beginShape();
        vertex(364.46, 297.18);
        vertex(381.23, 295.32);
        vertex(380.51, 303.19);
        vertex(390.25, 299.24);
        vertex(405.52, 298.98);
        vertex(421.06, 307.14);
        vertex(424.69, 338.16);
        vertex(411.05, 334.79);
        vertex(407.63, 318.99);
        vertex(395.25, 312.41);
        vertex(381.03, 318.47);
        vertex(382.09, 335.32);
        vertex(367.08, 334.79);
        endShape();
        beginShape();
        vertex(480.39, 299.64);
        vertex(460.08, 303.39);
        vertex(453.76, 320.74);
        vertex(465.87, 342.07);
        vertex(485.62, 345.49);
        vertex(498.79, 336.80);
        vertex(498.53, 350.76);
        vertex(490.89, 369.98);
        vertex(470.88, 366.03);
        vertex(457.18, 361.29);
        vertex(455.60, 374.98);
        vertex(481.15, 381.57);
        vertex(501.69, 384.20);
        vertex(507.22, 352.86);
        vertex(507.27, 320.77);
        vertex(494.43, 321.41);
        vertex(486.97, 329.81);
        vertex(471.57, 328.41);
        vertex(470.17, 313.95);
        vertex(485.10, 313.02);
        vertex(494.90, 321.41);
        vertex(507.45, 321.21);
        vertex(507.89, 300.91);
        vertex(496.72, 297.80);
        vertex(493.03, 303.59);
        endShape();
        beginShape();
        vertex(555.80, 332.47);
        vertex(543.99, 343.38);
        vertex(563.08, 347.01);
        vertex(567.62, 330.65);
        endShape();
        beginShape();
        vertex(609.21, 330.99);
        vertex(592.71, 347.49);
        vertex(620.21, 346.39);
        vertex(623.51, 330.99);
        endShape();
        beginShape();
        vertex(647.71, 344.19);
        vertex(648.81, 326.59);
        vertex(676.31, 326.59);
        vertex(674.11, 344.19);
        endShape();
        popMatrix();
    }
    // }

    // ** ITEM STUFF ** {
    var item_data = {
        "wheat seeds": {
            "isPlantable": true
        },
        "barley seeds": {
            "isPlantable": true
        },
        "oat seeds": {
            "isPlantable": true
        },
        "corn seeds": {
            "isPlantable": true
        },
        "hoe": {
            "canTill": true,
            "canStack": false
        },
        "scythe": {
            "canHarvest": true,
            "canStack": false
        },
        "axe": {
            "canChop": true,
            "choppingSpeed": 0.5,
            "canStack": false
        },
        "pickaxe": {
            "mining_speed": 0.3,
            "canStack": false
        },
        "basic sword": {
            "canStack": false,
            "isWeapon": true,
            "damage": 0.5
        },
        "obsidian blade": {
            "canStack": false,
            "isWeapon": true,
            "damage": 1.5
        },
        "blood falchion": {
            "canStack": false,
            "isWeapon": true,
            "damage": 2.5
        },
        "ice dagger": {
            "canStack": false,
            "isWeapon": true,
            "damage": 4.0
        }
    };
    var Item = (function () {
        var constructor = function (label, count, data) {
            this.label = label || "";
            this.count = count || 0;
            this.data = data || {};
            this.set_label(this.label);
        };
        constructor.prototype = {
            set_label: function (label) {
                this.label = label;
                this.data = item_data[label] || {};
                if (item_data[label] !== undefined) {
                    //println(label);
                    //println(json.stringify(this.data, null, 4));
                }
            },
            draw: function (x, y, w, h) {
                pushMatrix();
                translate(x, y);
                scale(w / 400, h / 400);
                switch (this.label) {
                    case "wheat":
                        pushMatrix();
                        translate(182, 181);
                        rotate(45);
                        translate(-200, -200);
                        for (var i = -10; i < 50; i += 6) {
                            noFill();
                            strokeWeight(4);
                            stroke(250, 205, 5);
                            arc(180 + i, 203, 50 - i, 200, -80, 80);
                            arc(275 - i, 203, 46 - i, 200, 100, 261);
                        }
                        noStroke();
                        fill(125, 94, 0);
                        rect(197, 195, 63, 10);
                        popMatrix();

                        break;
                    case "rock":
                        image(getImage("cute/Rock"), 44, 3, 300, 300);
                        break;
                    case "wood":
                        image(getImage("cute/WoodBlock"), 70, 30, 260, 260);
                        break;
                    case "wheat seeds":
                        // {
                        image(getImage("cute/WoodBlock"), 50, 5, 300, 300);
                        fill(181, 204, 6);
                        noStroke();
                        rect(59, 101, 282, 122);
                        fill(167, 181, 38);
                        ellipse(128, 176, 20, 20);
                        ellipse(138, 133, 20, 20);
                        ellipse(91, 173, 20, 20);
                        ellipse(78, 222, 20, 20);
                        ellipse(137, 210, 20, 20);
                        ellipse(199, 207, 20, 20);
                        ellipse(220, 195, 20, 20);
                        ellipse(245, 204, 20, 20);
                        ellipse(265, 210, 20, 20);
                        ellipse(300, 213, 20, 20);
                        ellipse(326, 210, 20, 20);
                        ellipse(320, 190, 20, 20);
                        ellipse(294, 161, 20, 20);
                        ellipse(325, 136, 20, 20);
                        ellipse(288, 118, 20, 20);
                        ellipse(239, 131, 20, 20);
                        ellipse(223, 160, 20, 20);
                        ellipse(203, 174, 20, 20);
                        ellipse(141, 191, 20, 20);
                        ellipse(83, 175, 20, 20);
                        ellipse(100, 153, 20, 20);
                        ellipse(117, 132, 20, 20);
                        ellipse(80, 114, 20, 20);
                        ellipse(145, 115, 20, 20);
                        ellipse(210, 123, 20, 20);
                        ellipse(152, 161, 20, 20);
                        ellipse(217, 130, 20, 20);
                        ellipse(138, 160, 20, 20);
                        ellipse(113, 106, 20, 20);
                        ellipse(198, 151, 20, 20);
                        ellipse(209, 137, 20, 20);
                        ellipse(174, 175, 20, 20);
                        ellipse(188, 125, 20, 20);
                        ellipse(149, 104, 20, 20);
                        ellipse(207, 104, 20, 20);
                        ellipse(173, 108, 20, 20);
                        ellipse(232, 123, 20, 20);
                        ellipse(216, 178, 20, 20);
                        ellipse(283, 154, 20, 20);
                        ellipse(306, 182, 20, 20);
                        ellipse(310, 198, 20, 20);
                        ellipse(254, 204, 20, 20);
                        ellipse(191, 193, 20, 20);
                        ellipse(288, 217, 20, 20);
                        ellipse(345, 205, 20, 20);
                        ellipse(279, 176, 20, 20);
                        ellipse(319, 125, 20, 20);
                        ellipse(230, 119, 20, 20);
                        ellipse(239, 119, 20, 20);
                        ellipse(264, 168, 20, 20);
                        ellipse(292, 176, 20, 20);
                        ellipse(322, 116, 20, 20);
                        ellipse(208, 139, 20, 20);
                        ellipse(139, 118, 20, 20);
                        ellipse(90, 146, 20, 20);
                        ellipse(66, 161, 20, 20);
                        ellipse(83, 178, 20, 20);
                        ellipse(76, 216, 20, 20);
                        ellipse(100, 169, 20, 20);
                        ellipse(83, 121, 20, 20);
                        ellipse(68, 107, 20, 20);
                        // }
                        break;
                    case "gems":
                        image(getImage("cute/GemBlue"), 75, 54, 100, 160);
                        image(getImage("cute/GemGreen"), 199, 86, 100, 160);
                        image(getImage("cute/GemOrange"), 107, 127, 100, 160);
                        break;
                    case "axe":
                        pushMatrix();
                        translate(200, 224);
                        rotate(34);
                        strokeWeight(25);
                        stroke(138, 87, 0);
                        line(0, 100, 0, -100);
                        noStroke();
                        noFill();
                        strokeWeight(35);
                        stroke(135, 135, 135);
                        noStroke();
                        fill(212, 180, 165);
                        //arc(-10, -71, 110, 79, 80, 300);
                        quad(-50, -131, -50, -25, 0, -56, 0, -100);
                        popMatrix();
                        break;
                    case "hoe":
                        pushMatrix();
                        translate(200, 200);
                        rotate(34);
                        strokeWeight(25);
                        stroke(138, 87, 0);
                        line(0, 100, 0, -100);
                        noStroke();
                        fill(186, 175, 186);
                        rotate(-20);
                        rect(6, -100, 25, 5, 22);
                        rotate(20);
                        rect(-60, -107, 50, 30, 20);
                        popMatrix();
                        break;
                    case "scythe":
                        pushMatrix();
                        translate(200, 224);
                        rotate(34);
                        strokeWeight(25);
                        stroke(138, 87, 0);
                        line(0, 100, 0, -100);
                        noStroke();
                        noFill();
                        strokeWeight(35);
                        stroke(232, 223, 232);
                        arc(-35, -71, 109, 79, 160, 300);
                        popMatrix();

                        break;
                    case "pickaxe":
                        pushMatrix();
                        translate(174, 227);
                        rotate(34);
                        strokeWeight(25);
                        stroke(138, 87, 0);
                        line(0, 100, 0, -100);
                        noStroke();
                        noFill();
                        strokeWeight(35);
                        stroke(117, 117, 117);
                        arc(-3, -68, 161, 112, 205, 342);
                        //quad(-50, -131, -50, -25, 0, -56, 0, -100);
                        popMatrix();
                        break;
                    case "basic sword":
                        pushMatrix();
                        translate(174, 227);
                        rotate(34);
                        strokeWeight(25);
                        stroke(138, 87, 0);
                        line(0, 100, 0, -100);
                        line(-20, 47, 20, 47);
                        noStroke();
                        noFill();
                        strokeWeight(35);
                        stroke(135, 135, 135);
                        //arc(-3, -68, 161, 112, 205, 342);
                        noStroke();
                        fill(120, 120, 120);
                        quad(-22, -118, -18, 42, 0, 44, 0, -156);
                        quad(22, -118, 18, 42, 0, 44, 0, -156);
                        stroke(51, 51, 51, 50);
                        strokeWeight(6);
                        line(0, 41, 0, -153);
                        line(-20, -119, 0, -115);
                        line(20, -119, 0, -115);
                        popMatrix();
                        break;
                    case "obsidian blade":
                        // {
                        fill(33, 33, 33);
                        beginShape();
                        vertex(132.29, 241.91);
                        vertex(167, 205);
                        vertex(198.19, 195.86);
                        vertex(217, 175);
                        vertex(243.10, 160.45);
                        vertex(261.11, 144.31);
                        vertex(277.87, 138.10);
                        vertex(294.64, 118.23);
                        vertex(313.27, 111.40);
                        vertex(331.89, 104.57);
                        vertex(151.67, 261.37);
                        endShape();

                        fill(153, 153, 168);
                        beginShape();
                        vertex(135, 243);
                        vertex(119, 229);
                        vertex(109, 235);
                        vertex(118, 252);
                        vertex(153, 290);
                        vertex(165, 297);
                        vertex(176, 288);
                        vertex(166, 277);
                        endShape();

                        fill(117, 117, 133);
                        beginShape();
                        vertex(126.86, 260.15);
                        vertex(98.22, 290.61);
                        vertex(110.17, 307.18);
                        vertex(147.08, 282.37);
                        endShape();

                        fill(56, 56, 56);
                        beginShape();
                        vertex(165.95, 277.90);
                        vertex(188.99, 259.26);
                        vertex(204.26, 241.08);
                        vertex(228.31, 235.07);
                        vertex(234.44, 216.53);
                        vertex(252.62, 207.44);
                        vertex(263.53, 193.80);
                        vertex(278.99, 184.71);
                        vertex(291.72, 170.17);
                        vertex(295.35, 161.08);
                        vertex(309.90, 152.90);
                        vertex(320.81, 135.62);
                        vertex(330.81, 126.53);
                        vertex(332.52, 103.95);
                        vertex(151.33, 260.93);
                        endShape();
                        // }
                        break;
                    case "blood falchion":
                        // {
                        fill(161, 11, 11);
                        beginShape();
                        vertex(131.58, 230.05);
                        vertex(167, 206);
                        vertex(185, 197);
                        vertex(211, 185);
                        vertex(230, 167);
                        vertex(247, 143);
                        vertex(267, 124);
                        vertex(291, 112);
                        vertex(322, 100);
                        vertex(348, 84);
                        vertex(365, 65);
                        vertex(351, 105);
                        vertex(334, 122);
                        vertex(308, 137);
                        vertex(277, 154);
                        vertex(259, 176);
                        vertex(246, 200);
                        vertex(219, 225);
                        vertex(188, 237);
                        vertex(153.86, 259.67);
                        endShape();
                        fill(102, 93, 93);
                        beginShape();
                        vertex(132.94, 229.06);
                        vertex(112.46, 200.69);
                        vertex(98.41, 202.34);
                        vertex(78.58, 222.18);
                        vertex(101.72, 218.05);
                        vertex(114.94, 225.48);
                        vertex(121.55, 240.36);
                        vertex(130.64, 256.89);
                        vertex(140.56, 266.81);
                        vertex(142.21, 277.55);
                        vertex(133.12, 297.38);
                        vertex(154.61, 286.64);
                        vertex(162.05, 269.28);
                        vertex(156.26, 259.37);
                        endShape();
                        fill(0, 0, 0);
                        beginShape();
                        vertex(121.58, 240.36);
                        vertex(120.25, 237.61);
                        vertex(96.53, 255.78);
                        vertex(90.45, 261.28);
                        vertex(84.54, 262.52);
                        vertex(78.16, 267.91);
                        vertex(77.51, 275.76);
                        vertex(79.64, 281.81);
                        vertex(83.40, 285.57);
                        vertex(92.55, 286.72);
                        vertex(100.40, 283.45);
                        vertex(105.80, 276.34);
                        vertex(119.13, 269.68);
                        vertex(134.18, 260.47);
                        vertex(130.62, 256.84);
                        endShape();
                        // }
                        break;
                    case "ice dagger":
                        // {
                        pushMatrix();
                        translate(-30, 30);
                        strokeWeight(1);
                        stroke(219, 219, 219);
                        fill(232, 232, 232);
                        beginShape();
                        vertex(162.62, 242.89);
                        vertex(147.19, 243.59);
                        vertex(134, 247);
                        vertex(124, 251);
                        vertex(134.23, 256.56);
                        vertex(150.00, 254.81);
                        vertex(166.25, 256.60);
                        vertex(175.53, 261.61);
                        vertex(184.91, 275.58);
                        vertex(185.30, 291.38);
                        vertex(194.55, 297.17);
                        vertex(196.48, 276.35);
                        vertex(193.01, 263.24);
                        vertex(189.25, 256.21);
                        endShape();

                        stroke(204, 225, 227);
                        fill(228, 241, 245);
                        beginShape();
                        vertex(165.38, 245.10);
                        vertex(189.34, 200.33);
                        vertex(210.97, 166.40);
                        vertex(232.17, 140.11);
                        vertex(254.17, 117.75);
                        vertex(268.21, 99.95);
                        vertex(291.76, 64.14);
                        vertex(272.66, 103.61);
                        vertex(266.24, 112.32);
                        vertex(235.99, 151.14);
                        vertex(212.66, 182.94);
                        vertex(186.57, 226.96);
                        vertex(175.10, 249.86);
                        endShape();
                        fill(237, 245, 247);
                        beginShape();
                        vertex(235.80, 136.54);
                        vertex(252.78, 106.29);
                        vertex(266.92, 84.53);
                        vertex(302.38, 48.73);
                        vertex(289.58, 67.70);
                        vertex(282.26, 80.95);
                        vertex(269.60, 94.41);
                        vertex(253.57, 117.95);
                        endShape();
                        fill(237, 245, 247);
                        beginShape();
                        vertex(175.05, 249.96);
                        vertex(186.50, 226.95);
                        vertex(194.14, 220.54);
                        vertex(204.21, 204.71);
                        vertex(213.38, 189.79);
                        vertex(227.77, 165.87);
                        vertex(234.07, 153.99);
                        vertex(236.22, 151.20);
                        vertex(245.76, 138.93);
                        vertex(228.61, 177.45);
                        vertex(212.03, 205.60);
                        vertex(199.69, 230.27);
                        vertex(184.66, 254.95);
                        endShape();
                        fill(158, 124, 89);
                        beginShape();
                        vertex(165.26, 255.81);
                        vertex(154.22, 273.36);
                        vertex(148.27, 281.19);
                        vertex(138.62, 284.94);
                        vertex(140.29, 294.28);
                        vertex(137.92, 304.34);
                        vertex(147.50, 299.32);
                        vertex(156.80, 297.99);
                        vertex(158.01, 288.06);
                        vertex(164.82, 277.36);
                        vertex(177.15, 261.46);
                        endShape();
                        popMatrix();
                        // }
                        break;
                    // Artifacts {
                    case "golden winston":
                        image(GoldenWinston, 50, 50, 300, 300);
                        break;
                    case "silver key":
                        image(SilverKey, 50, -40, 300, 400);
                        break;
                    case "bronze ohnoes":
                        image(BronzeOhNoes, 50, 50, 300, 300);
                        break;
                    // }
                    // Ores {
                    case "topaz":
                        Crystal(0, 0, 400, 400, {
                            light: color(230, 161, 58),
                            medium: color(209, 140, 44),
                            dark: color(173, 117, 33)
                        });
                        break;

                    case "amethyst":
                        Crystal(0, 0, 400, 400, {
                            light: color(158, 69, 209),
                            medium: color(128, 53, 171),
                            dark: color(103, 33, 143)
                        });
                        break;

                    case "aquamarine":
                        Crystal(0, 0, 400, 400, {
                            light: color(83, 214, 219),
                            medium: color(55, 189, 189),
                            dark: color(41, 163, 163)
                        });
                        break;

                    case "emerald":
                        Crystal(0, 0, 400, 400, {
                            light: color(73, 189, 112),
                            medium: color(53, 153, 97),
                            dark: color(27, 94, 48)
                        });
                        break;

                    case "sapphire":
                        Crystal(0, 0, 400, 400, {
                            light: color(125, 131, 240),
                            medium: color(75, 84, 207),
                            dark: color(27, 34, 161)
                        });
                        break;

                    case "ruby":
                        Crystal(0, 0, 400, 400, {
                            light: color(245, 122, 153),
                            medium: color(207, 64, 100),
                            dark: color(168, 36, 69)
                        });
                        break;

                    case "diamond":
                        Crystal(0, 0, 400, 400, {
                            light: color(223, 230, 240),
                            medium: color(195, 213, 240),
                            dark: color(155, 183, 219)
                        });
                        break;

                    case "calcite":
                        Crystal(0, 0, 400, 400, {
                            light: color(240, 240, 240),
                            medium: color(219, 219, 219),
                            dark: color(181, 181, 181)
                        });
                        break;

                    case "quartz":
                        Crystal(0, 0, 400, 400, {
                            light: color(255, 255, 255, 120),
                            medium: color(214, 214, 214, 120),
                            dark: color(176, 176, 176, 120)
                        });
                        break;

                    case "periodot":
                        Crystal(0, 0, 400, 400, {
                            light: color(132, 204, 38),
                            medium: color(118, 173, 40),
                            dark: color(80, 117, 32)
                        });
                        break;

                    case "garnet":
                        Crystal(0, 0, 400, 400, {
                            light: color(173, 50, 50),
                            medium: color(138, 48, 48),
                            dark: color(79, 22, 22)
                        });
                        break;

                    case "tanzanite":
                        Crystal(0, 0, 400, 400, {
                            light: color(102, 72, 219),
                            medium: color(84, 58, 201),
                            dark: color(49, 21, 163)
                        });
                        break;
                    case "dyla's token":
                        fill(217, 28, 129);
                        beginShape();
                        vertex(178, 299);
                        vertex(147, 298);
                        vertex(121, 281);
                        vertex(110, 252);
                        vertex(120, 202);
                        vertex(142, 169);
                        vertex(152.35, 118.42);
                        vertex(140.35, 87.42);
                        vertex(119, 72);
                        vertex(155, 79);
                        vertex(170, 100);
                        vertex(178, 123);
                        vertex(181.94, 135.59);
                        vertex(184, 106);
                        vertex(177.16, 78.90);
                        vertex(167.60, 68.66);
                        vertex(184.67, 73.44);
                        vertex(194.23, 97.34);
                        vertex(197.65, 115.78);
                        vertex(200.38, 88.46);
                        vertex(207.21, 67.29);
                        vertex(235.22, 61.14);
                        vertex(222.92, 73.44);
                        vertex(216.77, 81.63);
                        vertex(215.41, 95.98);
                        vertex(214.04, 107.59);
                        vertex(214, 130);
                        vertex(226, 111);
                        vertex(240.00, 78.90);
                        vertex(257.07, 69.34);
                        vertex(268.68, 65.24);
                        vertex(247.51, 87.78);
                        vertex(241, 110);
                        vertex(240, 138);
                        vertex(265, 123);
                        vertex(289, 117);
                        vertex(296, 129);
                        vertex(297, 151);
                        vertex(285, 138);
                        vertex(265, 143);
                        vertex(255, 154);
                        vertex(252, 176);
                        vertex(267, 208);
                        vertex(273, 234);
                        vertex(263, 274);
                        vertex(250, 292);
                        vertex(213, 301);
                        endShape();
                        fill(156, 0, 86);
                        beginShape();
                        vertex(142.35, 168.42);
                        vertex(161.35, 130.42);
                        vertex(166.35, 144.42);
                        vertex(168.35, 160.42);
                        vertex(178.35, 163.42);
                        vertex(185.35, 145.42);
                        vertex(192.35, 124.42);
                        vertex(190.35, 103.42);
                        vertex(189.35, 96.42);
                        vertex(201.35, 137.42);
                        vertex(206.35, 162.42);
                        vertex(211.35, 160.42);
                        vertex(227.35, 154.42);
                        vertex(248.35, 151.42);
                        vertex(263.35, 153.42);
                        vertex(285.35, 171.42);
                        vertex(244.35, 166.42);
                        vertex(238.35, 181.42);
                        vertex(253.35, 197.42);
                        vertex(262.35, 201.42);
                        vertex(271.35, 212.42);
                        vertex(297.35, 218.42);
                        vertex(279.35, 226.42);
                        vertex(271.35, 248.42);
                        vertex(264.35, 266.42);
                        vertex(252.35, 286.42);
                        vertex(238.35, 269.42);
                        vertex(242.35, 227.42);
                        vertex(214.35, 208.42);
                        vertex(189.35, 236.42);
                        vertex(224.35, 267.42);
                        vertex(227.35, 297.42);
                        vertex(189.35, 290.42);
                        vertex(181.35, 239.42);
                        vertex(150.35, 240.42);
                        vertex(164.35, 273.42);
                        vertex(168.35, 294.42);
                        vertex(134.35, 291.42);
                        vertex(139.35, 267.42);
                        vertex(126.35, 239.42);
                        vertex(101.35, 258.42);
                        vertex(114.35, 224.42);
                        vertex(141.35, 203.42);
                        vertex(109.35, 189.42);
                        vertex(93.35, 213.42);
                        vertex(106.35, 179.42);
                        vertex(127.35, 172.42);
                        vertex(144.35, 169.42);
                        endShape();
                        break;

                    // } 
                }
                popMatrix();
            }
        };
        return constructor;
    })();
    var DroppedItem = (function () {
        var constructor = function (item, x, y) {
            this.item = item;
            this.x = x + random(-15, 15);
            this.y = y + random(-15, 15);
        };
        constructor.prototype = {
            update: function () {
                if (dist(this.x, this.y, mr_spunky.x, mr_spunky.y) < 20) {
                    if (mr_spunky.inventory.canAdd(this.item)) {
                        mr_spunky.inventory.add(this.item);
                        return true;
                    }
                }
                return false;
            },
            draw: function () {
                this.item.draw(this.x - 20, this.y - 20 - 5 * sin(frameCount * 2), 40, 40);
            }
        };
        return constructor;
    })();
    var advancements = {
        "aqualine": {
            "unlocks": {},
            "seed": {
                "stats": {
                    speed: 1.00,
                    luck: 0.00,
                    strength: 0.50,
                    __swordRecharge_set: 120,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 15
                },
            },
            "seedling": {
                "stats": {
                    speed: 1.10,
                    luck: 0.00,
                    strength: 0.50,
                    __swordRecharge_set: 40,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 15
                },
                "price": 5,
            },
            "sapling": {
                "stats": {
                    speed: 1.30,
                    luck: 0.00,
                    strength: 0.50,
                    __swordRecharge_set: 40,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 15
                },
                "price": 8,
            },
            "tree": {
                "stats": {
                    speed: 1.40,
                    luck: 0.00,
                    strength: 0.50,
                    __swordRecharge_set: 40,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 15
                },
                "price": 12,
            },
            "ultimate": {
                "stats": {
                    speed: 1.50,
                    luck: 0.00,
                    strength: 0.75,
                    __swordRecharge_set: 40,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 17,
            }
        },
        "leafers": {
            "unlocks": {
                farming: 5,
                trading: 3,
            },
            "seed": {
                "stats": {
                    speed: 1.80,
                    luck: 0.05,
                    strength: 0.75,
                    __swordRecharge_set: 60,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
            },
            "seedling": {
                "stats": {
                    speed: 1.80,
                    luck: 0.06,
                    strength: 0.75,
                    __swordRecharge_set: 60,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 15,
            },
            "sapling": {
                "stats": {
                    speed: 1.80,
                    luck: 0.07,
                    strength: 0.75,
                    __swordRecharge_set: 60,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 20,
            },
            "tree": {
                "stats": {
                    speed: 1.80,
                    luck: 0.09,
                    strength: 0.75,
                    __swordRecharge_set: 60,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 25,
            },
            "ultimate": {
                "stats": {
                    speed: 1.80,
                    luck: 0.10,
                    strength: 1.00,
                    __swordRecharge_set: 60,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 40,
            }
        },
        "duskpin": {
            "unlocks": {
                woodcutting: 8
            },
            "seed": {
                "stats": {
                    speed: 1.30,
                    luck: 0.02,
                    strength: 1.50,
                    __swordRecharge_set: 50,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 2
                },
            },
            "seedling": {
                "stats": {
                    speed: 1.30,
                    luck: 0.02,
                    strength: 1.60,
                    __swordRecharge_set: 50,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 2
                },
                "price": 20,
            },
            "sapling": {
                "stats": {
                    speed: 1.30,
                    luck: 0.02,
                    strength: 1.70,
                    __swordRecharge_set: 50,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 2
                },
                "price": 40,
            },
            "tree": {
                "stats": {
                    speed: 1.40,
                    luck: 0.02,
                    strength: 1.80,
                    __swordRecharge_set: 50,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 2
                },
                "price": 65,
            },
            "ultimate": {
                "stats": {
                    speed: 1.50,
                    luck: 0.02,
                    strength: 2.00,
                    __swordRecharge_set: 50,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 3
                },
                "price": 80,
            }
        },
        "piceratops": {
            "unlocks": {
                mining: 5,
                combat: 3
            },
            "seed": {
                "stats": {
                    speed: 1.80,
                    luck: 0.00,
                    strength: 2.00,
                    __swordRecharge_set: 55,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
            },
            "seedling": {
                "stats": {
                    speed: 1.90,
                    luck: 0.00,
                    strength: 2.00,
                    __swordRecharge_set: 55,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 60,
            },
            "sapling": {
                "stats": {
                    speed: 1.90,
                    luck: 0.00,
                    strength: 2.20,
                    __swordRecharge_set: 55,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 100,
            },
            "tree": {
                "stats": {
                    speed: 1.90,
                    luck: 0.00,
                    strength: 2.20,
                    __swordRecharge_set: 55,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 150,
            },
            "ultimate": {
                "stats": {
                    speed: 2.00,
                    luck: 0.00,
                    strength: 2.50,
                    __swordRecharge_set: 55,
                    __abilityRecharge_set: 120,
                    __abilityDuration: 20
                },
                "price": 200,
            }
        },
        "primosaur": {
            "unlocks": {
                combat: 8,
                trading: 6
            },
            "seed": {
                "stats": {
                    speed: 2.50,
                    luck: 0.05,
                    strength: 1.80,
                    __swordRecharge_set: 80,
                    __abilityRecharge_set: 720,
                    __abilityDuration: 2
                },
            },
            "seedling": {
                "stats": {
                    speed: 2.80,
                    luck: 0.09,
                    strength: 2.00,
                    __swordRecharge_set: 85,
                    __abilityRecharge_set: 720,
                    __abilityDuration: 2
                },
                "price": 80,
            },
            "sapling": {
                "stats": {
                    speed: 2.90,
                    luck: 0.13,
                    strength: 2.20,
                    __swordRecharge_set: 90,
                    __abilityRecharge_set: 720,
                    __abilityDuration: 2
                },
                "price": 160,
            },
            "tree": {
                "stats": {
                    speed: 3.10,
                    luck: 0.17,
                    strength: 2.40,
                    __swordRecharge_set: 90,
                    __abilityRecharge_set: 720,
                    __abilityDuration: 2
                },
                "price": 240,
            },
            "ultimate": {
                "stats": {
                    speed: 3.20,
                    luck: 0.21,
                    strength: 2.50,
                    __swordRecharge_set: 90,
                    __abilityRecharge_set: 720,
                    __abilityDuration: 2
                },
                "price": 320,
            }
        },
        "starky": {
            "unlocks": {
                farming: 15,
                trading: 10,
                woodcutting: 12,
                mining: 10,
                combat: 10
            },
            "seed": {
                "stats": {
                    speed: 3.50,
                    luck: 0.20,
                    strength: 3.00,
                    __swordRecharge_set: 80,
                    __abilityRecharge_set: 240,
                    __abilityDuration: 40
                },
            },
            "seedling": {
                "stats": {
                    speed: 3.50,
                    luck: 0.25,
                    strength: 3.50,
                    __swordRecharge_set: 85,
                    __abilityRecharge_set: 240,
                    __abilityDuration: 40
                },
                "price": 200,
            },
            "sapling": {
                "stats": {
                    speed: 3.50,
                    luck: 0.30,
                    strength: 3.50,
                    __swordRecharge_set: 85,
                    __abilityRecharge_set: 240,
                    __abilityDuration: 45
                },
                "price": 400,
            },
            "tree": {
                "stats": {
                    speed: 3.50,
                    luck: 0.35,
                    strength: 4.50,
                    __swordRecharge_set: 90,
                    __abilityRecharge_set: 240,
                    __abilityDuration: 45
                },
                "price": 500,
            },
            "ultimate": {
                "stats": {
                    speed: 4.10,
                    luck: 0.60,
                    strength: 5.50,
                    __swordRecharge_set: 100,
                    __abilityRecharge_set: 240,
                    __abilityDuration: 50
                },
                "price": 1000,
            }
        }
    };
    var shop = {
        "Clara": [
            {
                "item": Item.new("wheat", 2),
                "transaction": "sell",
                "price": 1
            },
            {
                "item": Item.new("wood", 4),
                "transaction": "sell",
                "price": 1
            },
            {
                "item": Item.new("wheat seeds", 3),
                "transaction": "buy",
                "price": 1
            }
        ],
        "Gwen": [
            {
                "item": Item.new("quartz", 1),
                "transaction": "sell",
                "price": 1
            },
            {
                "item": Item.new("calcite", 1),
                "transaction": "sell",
                "price": 2
            },
            {
                "item": Item.new("topaz", 1),
                "transaction": "sell",
                "price": 4
            },
            {
                "item": Item.new("amethyst", 1),
                "transaction": "sell",
                "price": 5,
            },
            {
                "item": Item.new("aquamarine", 1),
                "transaction": "sell",
                "price": 8
            },
            {
                "item": Item.new("garnet", 1),
                "transaction": "sell",
                "price": 25
            },
            {
                "item": Item.new("sapphire", 1),
                "transaction": "sell",
                "price": 40
            },
            {
                "item": Item.new("periodot", 1),
                "transaction": "sell",
                "price": 55
            },
            {
                "item": Item.new("emerald", 1),
                "transaction": "sell",
                "price": 85
            },
            {
                "item": Item.new("diamond", 1),
                "transaction": "sell",
                "price": 165
            },
            {
                "item": Item.new("ruby", 1),
                "transaction": "sell",
                "price": 200
            },
            {
                "item": Item.new("tanzanite", 1),
                "transaction": "sell",
                "price": 585
            },
            {
                "item": Item.new("bronze ohnoes", 1),
                "transaction": "sell",
                "price": 150
            },
            {
                "item": Item.new("silver key", 1),
                "transaction": "sell",
                "price": 300
            },
            {
                "item": Item.new("golden winston", 1),
                "transaction": "sell",
                "price": 600
            },
        ],
        "Ernest": [
            {
                "item": Item.new("hoe", 1),
                "transaction": "buy",
                "price": 2
            },
            {
                "item": Item.new("scythe", 1),
                "transaction": "buy",
                "price": 2
            },
            {
                "item": Item.new("axe", 1),
                "transaction": "buy",
                "price": 30
            },
            {
                "item": Item.new("pickaxe", 1),
                "transaction": "buy",
                "price": 80
            },
            {
                "item": Item.new("basic sword", 1),
                "transaction": "buy",
                "price": 100,
                /*"upgrade_level" : 0,
                "upgrades" : [
                    {
                        "item" : Item.new("basic sword", 1),
                        "transaction" : "buy",
                        "price" : 100
                    },
                    {
                        "item" : Item.new("obsidian blade", 1),
                        "transaction" : "buy",
                        "price" : 350
                    },
                    {
                        "item" : Item.new("blood falchion", 1),
                        "transaction" : "buy",
                        "price" : 700
                    },
                    {
                        "item" : Item.new("ice dagger", 1),
                        "transaction" : "buy",
                        "price" : 1200
                    }
                ],
                "upgrade" : function () {
                    var upgrade = this.upgrades[this.upgrade_level];
                    if (this.upgrade_level > 0 && upgrade !== undefined) {
                        var result = mr_spunky.inventory.remove(
                            this.upgrades[this.upgrade_level - 1].item
                        );
                    }
                    return {
                        canUpgrade : upgrade !== undefined,
                        ctx : this,
                        callback : function () {
                            this.ctx.upgrade_level++;
                            this.ctx.upgrade_level = constrain(
                                this.ctx.upgrade_level, 
                                0, 
                                this.ctx.upgrades.length
                            );
                            try {
                            var upgrade = this.ctx.upgrades[this.ctx.upgrade_level];
                            if (upgrade === undefined) {
                                return;
                            }
                            this.ctx.item.label = upgrade.item.label;
                            this.ctx.item.label = upgrade.item.label;
                            this.ctx.item.count = upgrade.item.count;
                            this.ctx.item.data = upgrade.item.data;
                            this.ctx.transaction = upgrade.transaction;
                            this.ctx.price = upgrade.price;
                            } catch (e) {
                                println(e);
                            }
                        }
                    };
                }*/
            },
            {
                "item": Item.new("obsidian blade", 1),
                "transaction": "buy",
                "price": 350
            },
            {
                "item": Item.new("blood falchion", 1),
                "transaction": "buy",
                "price": 700
            },
            {
                "item": Item.new("ice dagger", 1),
                "transaction": "buy",
                "price": 1200
            }
        ]
    };
    var loot_tables = {
        "combat": {
            "angry-furball": {
                "items": {
                    _: [
                        { _: Item.new("wheat", 1), chance: 1.00 }
                    ], chance: 0.04
                },
                "money": { _: 1, chance: 0.12 },
                "points": { _: { v: 1, type: "combat" }, chance: 0.85 }
            },
            "mad-squid": {
                "items": { _: [], chance: 0.00 },
                "money": { _: 3, chance: 0.40 },
                "points": { _: { v: 3, type: "combat" }, chance: 0.80 }
            },
            "mad-squid-small": {
                "items": { _: [], chance: 0.00 },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 0, type: "combat" }, chance: 1.00 }
            },
            "thunderhead": {
                "items": { _: [], chance: 0.04 },
                "money": { _: 5, chance: 0.12 },
                "points": { _: { v: 5, type: "combat" }, chance: 0.90 }
            },
            "bot": {
                "items": {
                    _: [
                        { _: Item.new("gems", 15), chance: 1.00 }
                    ], chance: 0.15
                },
                "money": { _: 25, chance: 0.08 },
                "points": { _: { v: 50, type: "combat" }, chance: 0.40 }
            },
        },
        "farming": {
            "tilling": {
                "items": { _: [], chance: 0.00 },
                "money": { _: 0, chance: 0.08 },
                "points": { _: { v: 0.5, type: "farming" }, chance: 0.05 }
            },
            "yield": {
                "items": { _: [], chance: 0.00 },
                "money": { _: 0, chance: 0.08 },
                "points": { _: { v: 0.5, type: "farming" }, chance: 0.05 }
            },
        },
        "crops": {
            "wheat": {
                "items": {
                    _: [
                        { _: Item.new("wheat", 1), chance: 0.90 },
                        { _: Item.new("wheat", 2), chance: 0.20 },
                        { _: Item.new("wheat", 3), chance: 0.05 },
                        { _: Item.new("wheat", 4), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "farming" }, chance: 0.35 }
            }
        },
        "woodcutting": {
            "tree": {
                "items": {
                    _: [
                        { _: Item.new("wood", 1), chance: 1.00 },
                        { _: Item.new("wood", 2), chance: 0.60 }
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 2, type: "woodcutting" }, chance: 0.75 }
            }
        },
        "trading": {

        },
        "mining": {
            "topaz": {
                "items": {
                    _: [
                        { _: Item.new("topaz", 1), chance: 1.00 },
                        { _: Item.new("topaz", 2), chance: 0.10 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "mining" }, chance: 0.70 }
            },
            "amethyst": {
                "items": {
                    _: [
                        { _: Item.new("amethyst", 1), chance: 1.00 },
                        { _: Item.new("amethyst", 2), chance: 0.10 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "mining" }, chance: 0.70 }
            },
            "aquamarine": {
                "items": {
                    _: [
                        { _: Item.new("aquamarine", 1), chance: 1.00 },
                        { _: Item.new("aquamarine", 2), chance: 0.05 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "mining" }, chance: 0.70 }
            },
            "emerald": {
                "items": {
                    _: [
                        { _: Item.new("emerald", 1), chance: 1.00 },
                        { _: Item.new("emerald", 2), chance: 0.06 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.05 },
                        { _: Item.new("silver key", 1), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 3, type: "mining" }, chance: 0.80 }
            },
            "sapphire": {
                "items": {
                    _: [
                        { _: Item.new("sapphire", 1), chance: 1.00 },
                        { _: Item.new("sapphire", 2), chance: 0.09 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.06 },
                        { _: Item.new("silver key", 1), chance: 0.01 },
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 2, type: "mining" }, chance: 0.70 }
            },
            "ruby": {
                "items": {
                    _: [
                        { _: Item.new("ruby", 1), chance: 1.00 },
                        { _: Item.new("ruby", 2), chance: 0.01 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.09 },
                        { _: Item.new("silver key", 1), chance: 0.03 },
                        { _: Item.new("golden winston", 1), chance: 0.01 }
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 4, type: "mining" }, chance: 0.90 }
            },
            "diamond": {
                "items": {
                    _: [
                        { _: Item.new("diamond", 1), chance: 1.00 },
                        { _: Item.new("diamond", 2), chance: 0.10 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.09 },
                        { _: Item.new("silver key", 1), chance: 0.04 },
                        { _: Item.new("golden winston", 1), chance: 0.02 }
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 6, type: "mining" }, chance: 0.30 }
            },
            "calcite": {
                "items": {
                    _: [
                        { _: Item.new("calcite", 1), chance: 1.00 },
                        { _: Item.new("calcite", 2), chance: 0.50 },
                        { _: Item.new("calcite", 3), chance: 0.10 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 }
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "mining" }, chance: 1.00 }
            },
            "quartz": {
                "items": {
                    _: [
                        { _: Item.new("quartz", 1), chance: 1.00 },
                        { _: Item.new("quartz", 2), chance: 0.20 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 }
                    ], chance: 1.00
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 1, type: "mining" }, chance: 0.50 }
            },
            "periodot": {
                "items": {
                    _: [
                        { _: Item.new("periodot", 1), chance: 1.00 },
                        { _: Item.new("periodot", 2), chance: 0.00 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.01 },
                        { _: Item.new("silver key", 1), chance: 0.05 }
                    ], chance: 0.80
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 20, type: "mining" }, chance: 0.10 }
            },
            "garnet": {
                "items": {
                    _: [
                        { _: Item.new("garnet", 1), chance: 1.00 },
                        { _: Item.new("garnet", 2), chance: 0.01 },
                        { _: Item.new("golden winston", 1), chance: 0.03 }
                    ], chance: 0.80
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 15, type: "mining" }, chance: 0.10 }
            },
            "tanzanite": {
                "items": {
                    _: [
                        { _: Item.new("tanzanite", 1), chance: 1.00 },
                        { _: Item.new("tanzanite", 2), chance: 0.50 },
                        { _: Item.new("bronze ohnoes", 1), chance: 0.10 }
                    ], chance: 0.50
                },
                "money": { _: 0, chance: 0.00 },
                "points": { _: { v: 50, type: "mining" }, chance: 0.50 }
            }
        },
        // AI (chatgpt) written function replacement
        pick: function () {
            var iter = 0;
            var args = arguments;
            function Dep(cat) {
                if (iter < (args.length)) {
                    iter++;
                    return Dep(cat[args[iter - 1]]);
                } else {
                    return cat;
                }
            }
            var lt = Dep(this);
            var items_c = random(0, 1) - (mr_spunky.luck),
                money_c = random(0, 1) - (mr_spunky.luck),
                points_c = random(0, 1) - (mr_spunky.luck);

            // SAFETY: guard every branch in case the table is malformed
            if (lt && lt.items && (items_c < (lt.items.chance || 0))) {
                var items_c_i = random(0, 1) - (0.1 * mr_spunky.luck);
                if (lt.items._ && lt.items._.length > 0) {
                    var attempts = 0, maxAttempts = 300, picked = false;
                    while (attempts++ < maxAttempts) {
                        var r_item = lt.items._[floor(random(0, lt.items._.length))];
                        if (items_c_i < (r_item.chance || 0)) {
                            mr_spunky.inventory.add(r_item._);
                            picked = true;
                            break;
                        }
                    }
                    if (!picked) {
                        // fallback: pick highest-chance item (or the first item) to avoid spinning forever
                        var fallback = lt.items._.slice().sort(function (a, b) {
                            return (b.chance || 0) - (a.chance || 0);
                        })[0];
                        if (fallback) {
                            mr_spunky.inventory.add(fallback._);
                        }
                    }
                }
            }

            if (lt && lt.money && (money_c < (lt.money.chance || 0))) {
                mr_spunky.money += lt.money._ || 0;
            }
            if (lt && lt.points && (points_c < (lt.points.chance || 0))) {
                if (lt.points._) {
                    mr_spunky.skills.addPoints(lt.points._.v || 0, lt.points._.type || "farming");
                }
            }
        }
    };
    var spawn_tables = {
        "enemies": {
            2: {
                "rate": 1.00,
                "angry-furball": {
                    mult: [1.00, 0.20, 0.05],
                    chance: 1.00
                },
                "mad-squid": {
                    mult: [1.00, 0.03, 0.00],
                    chance: 0.20
                },
                "thunderhead": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.03
                }
            },
            7: {
                "rate": 1.00,
                "angry-furball": {
                    mult: [1.00, 0.01, 0.00],
                    chance: 0.40
                },
                "mad-squid": {
                    mult: [1.00, 0.30, 0.05],
                    chance: 0.60
                },
                "thunderhead": {
                    mult: [1.00, 0.05, 0.00],
                    chance: 0.10
                }
            },
            8: {
                "rate": 1.00,
                "mad-squid": {
                    mult: [1.00, 0.70, 0.30],
                    chance: 1.00
                },
                "thunderhead": {
                    mult: [1.00, 0.20, 0.05],
                    chance: 0.20
                },
                "bot": {
                    mult: [1.00, 0.10, 0.02],
                    chance: 0.05
                }
            },
        },
        "trees": {
            1: {
                "rate": 1.00
            },
            2: {
                "rate": 1.00
            }
        },
        "ores": {
            5: {
                "rate": 1.00,
                "topaz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 1.00
                },
                "amethyst": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.85
                },
                "aquamarine": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.50
                },
                "calcite": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.90
                },
                "quartz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 1.00
                },
                "garnet": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.05
                }
            },
            7: {
                "rate": 1.00,
                "topaz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.40
                },
                "amethyst": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.10
                },
                "aquamarine": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.05
                },
                "emerald": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.05
                },
                "sapphire": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.07
                },
                "ruby": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.02
                },
                "diamond": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.04
                },
                "calcite": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.09
                },
                "quartz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.50
                },
                "periodot": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.06
                },
                "garnet": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.15
                },
                "tanzanite": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.005
                }
            },
            8: {
                "rate": 1.00,
                "topaz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.60
                },
                "amethyst": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.40
                },
                "aquamarine": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.70
                },
                "emerald": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.03
                },
                "sapphire": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.04
                },
                "calcite": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.40
                },
                "quartz": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.90
                },
                "periodot": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.04
                },
                "garnet": {
                    mult: [1.00, 0.00, 0.00],
                    chance: 0.10
                }
            }
        },
        // Another chatgpt-written function
        pick: function () {
            var iter = 0;
            var args = arguments;
            function Dep(cat) {
                if (iter < (args.length)) {
                    iter++;
                    return Dep(cat[args[iter - 1]]);
                } else {
                    return cat;
                }
            }
            var lt = Dep(this);
            var options = Object.keys(lt || []);
            var outerAttempts = 0, maxOuter = 500;
            while (outerAttempts++ < maxOuter) {
                var chance = random(0, 1);
                var choice = options[floor(random(0, options.length))];
                if (!choice || choice === "rate") {
                    continue;
                }
                var choiceObj = lt[choice];
                if (!choiceObj || (choiceObj.chance === undefined)) {
                    continue;
                }
                if (chance < choiceObj.chance) {
                    // inner selection guarded
                    var innerAttempts = 0, maxInner = 500;
                    var multLen = (choiceObj.mult || []).length || 1;
                    while (innerAttempts++ < maxInner) {
                        var mult_c = random(0, 1);
                        var mult_ch = floor(random(0, multLen));
                        if (mult_c < (choiceObj.mult && choiceObj.mult[mult_ch] || 0)) {
                            return { type: choice, mult: mult_ch + 1 };
                        }
                    }
                    // fallback if inner loop didn't hit chance
                    return { type: choice, mult: 1 };
                }
            }
            // ultimate fallback
            return { type: options[0] || "topaz", mult: 1 };
        }
    };
    // }

    // ** CONTROLS ** {
    var keys = {};
    keyPressed = function () {
        if (mr_spunky.cheats_menu_open) {
            if (keyCode > 30 && ![LEFT, RIGHT, UP, DOWN].includes(keyCode)) {
                mr_spunky.cheat_string.splice(
                    mr_spunky.cheat_string_insert,
                    0,
                    (key || "").toString()
                );
                mr_spunky.cheat_string_insert++;
            }
            if (keyCode === LEFT) {
                mr_spunky.cheat_string_insert--;
                mr_spunky.cheat_string_insert = constrain(
                    mr_spunky.cheat_string_insert,
                    0,
                    mr_spunky.cheat_string.length
                );
            }
            if (keyCode === RIGHT) {
                mr_spunky.cheat_string_insert++;
                mr_spunky.cheat_string_insert = constrain(
                    mr_spunky.cheat_string_insert,
                    0,
                    mr_spunky.cheat_string.length
                );
            }
            if (keyCode === BACKSPACE) {
                mr_spunky.cheat_string.splice(mr_spunky.cheat_string_insert - 1, 1);
                mr_spunky.cheat_string_insert--;
                mr_spunky.cheat_string_insert = constrain(
                    mr_spunky.cheat_string_insert,
                    0,
                    mr_spunky.cheat_string.length
                );
            }
            if (keyCode === ENTER) {
                mr_spunky.execute_cheat();
            }
        }
        keys[keyCode] = true;
    };
    keyReleased = function () {
        keys[keyCode] = false;
    };
    mousePressed = function () {
        if (mr_spunky.menu_open) {
            for (var i = 0; i < shop[mr_spunky.menu_person].length; i++) {
                var x = i % 3, y = floor(i / 3) + floor(mr_spunky.menu_scroll);
                if (y < 0 || y > 1) {
                    continue;
                }
                var slot = shop[mr_spunky.menu_person][i];
                var item = slot.item;

                if (Collide(mouseX, mouseY, 50 + x * 110, 100 + y * 110, 80, 80)) {
                    mr_spunky.buySell(slot);
                }
            }
        } else if (mr_spunky.avatar_menu_open) {
            var v = Object.keys(advancements);
            for (var i = 0; i < v.length; i++) {
                var x = i % 3, y = floor(i / 3);
                var levels = ["seed", "seedling", "sapling", "tree", "ultimate"];
                var lvl = constrain(mr_spunky.levels[v[i]], 0, 4);
                var slot = advancements[v[i]][levels[lvl + 1]];

                if (Collide(mouseX, mouseY, 20 + x * 90, 100 + y * 110, 80, 80)) {
                    if (mouseButton === LEFT && mr_spunky.levels[v[i]] !== -1) {
                        if (slot !== undefined) {
                            if (mr_spunky.money >= slot.price) {
                                mr_spunky.upgrade(v[i], slot);
                                mr_spunky.applyStats();
                            }
                        }
                    }
                    if (mouseButton === RIGHT) {
                        if (mr_spunky.levels[v[i]] !== -1) {
                            mr_spunky.changeVariant(v[i]);
                        }
                    }
                }
                if (Collide(mouseX, mouseY, 20 + x * 90, 180 + y * 110, 80, 15)) {
                    if (mr_spunky.levels[v[i]] !== -1) {
                        mr_spunky.changeVariant(v[i]);
                    }
                }
            }
        }

    };
    mouseScrolled = function () {
        if (!mouseIsPressed) {
            if (mr_spunky.avatar_menu_open || mr_spunky.menu_open) {
                mr_spunky.menu_scroll += mouseScroll;
                mr_spunky.menu_scroll = constrain(mr_spunky.menu_scroll, -mr_spunky.menu_scroll_max, 0);
                return;
            }
            mr_spunky.inventory.hover -= mouseScroll;
            mr_spunky.inventory.hover = constrain(
                mr_spunky.inventory.hover,
                0,
                mr_spunky.inventory.items.length - 1
            );
            mr_spunky.inventory.hover_render_type_flag = true;
        }
    };
    // }

    // ** PARTICLE STUFF ** {
    var Particle = (function () {
        var constructor = function (type, level, ex, ey, o) {
            this.level_num = parseInt(mr_spunky.level_number + "", 10);
            this.type = type;
            this.level = level;
            this.x = ex;
            this.y = ey;

            this.ra = random(0, 360);
            this.av = 0;
            this.o = o;
            this.a = 0;
            this.spd = 0;
            this.v = { x: 0, y: 0 };
            this.life = 0;
            this.seed = random(0, 100);

            switch (this.type) {
                case "star":
                    var m = random(0.2, 0.6);
                    var a = random(0, 360);
                    this.av = random(-5, 5);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 60;
                    break;
                case "ore-finished":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "ore-break":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "tree-break":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "angry-furball":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "mad-squid": case "mad-squid-small":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "thunderhead":
                    var m = random(1, 2);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "thunderhead-thunder":
                    var d = constrain(dist(this.o.x + this.o.w / 2, this.o.y + this.o.h / 2, mr_spunky.x, mr_spunky.y), 0, this.o.__detectionRange);
                    var a = atan2(mr_spunky.y - (this.o.y + this.o.h / 2), mr_spunky.x - (this.o.x + this.o.w / 2));
                    var r = 0 + random(0, d);
                    this.x += r * cos(a) + random(-10, 10);
                    this.y += r * sin(a) + random(-10, 10);
                    var ra = random(0, 360), rm = random(0.1, 0.3);
                    this.v = {
                        x: rm * cos(ra),
                        y: rm * sin(ra)
                    };
                    this.life = 20;
                    break;
                case "damage-enemy":
                    this.v = {
                        x: 0,
                        y: -2
                    };
                    this.life = 30;
                    break;
                case "damage-player":
                    this.v = {
                        x: 0,
                        y: -2
                    };
                    this.life = 30;
                    break;
                case "skill-point":
                    this.v = {
                        x: 0,
                        y: -0.5
                    };
                    this.life = 80;
                    break;
                case "aqualine":
                    var m = random(0, (this.level + 3) * 0.5);
                    var a = random(0, 360);
                    this.v = {
                        x: m * cos(a),
                        y: m * sin(a)
                    };
                    this.life = 30;
                    break;
                case "leafers":
                    var r = 10 + random(this.level + 1, (this.level + 1) * 15);
                    var ra = random(0, 360);
                    this.x += r * cos(ra);
                    this.y += r * sin(ra);
                    this.v = {
                        x: 0,
                        y: 0
                    };
                    this.life = 60;
                    break;
                case "duskpin":
                    var a = atan2(mouseY - mr_spunky.y, mouseX - mr_spunky.x);
                    var r = 10 + random(this.level + 1, (this.level + 1) * 40);
                    this.x += r * cos(a) + random(-5, 5);
                    this.y += r * sin(a) + random(-5, 5);
                    this.v = {
                        x: 0,
                        y: 0
                    };
                    this.life = 50;
                    break;
                case "piceratops":
                    var a = atan2(mouseY - mr_spunky.y, mouseX - mr_spunky.x) + random(-20, 20);
                    this.x += 10 * cos(a);
                    this.y += 10 * sin(a);
                    var vx = random(2, 4);
                    this.v = {
                        x: vx * cos(a),
                        y: vx * sin(a)
                    };
                    this.life = 50;
                    break;
                case "primosaur":
                    var a = atan2(mouseY - mr_spunky.y, mouseX - mr_spunky.x) + random(-10, 10) / mr_spunky.skills.combat;
                    var r = 0 + random(this.level + 1, (this.level + 1) * 35);
                    this.x += r * cos(a) + random(-30, 30);
                    this.y += r * sin(a) + random(-30, 30);
                    var ra = random(0, 360), rm = random(0.1, 0.3) * (dist(this.x, this.y, mr_spunky.x, mr_spunky.y) / 30);
                    this.v = {
                        x: rm * cos(ra),
                        y: rm * sin(ra)
                    };
                    this.life = 60;
                    break;
                case "starky":
                    var a = atan2(mouseY - mr_spunky.y, mouseX - mr_spunky.x);
                    this.a = random(0, 360);
                    this.spd = random(0.1, 1.5);
                    /**this.v = {
                        x : (this.spd) * cos(this.a),
                        y : (this.spd) * sin(this.a)
                    };**/
                    this.life = 150;
                    break;
            }
        };
        constructor.prototype = {
            draw: function (that) {
                if (mr_spunky.level_number !== this.level_num) {
                    return;
                }
                //println(that);
                switch (this.type) {
                    case "star":
                        pushMatrix();
                        translate(this.x, this.y);
                        rotate(this.ra);
                        fill(245, 241, 226, this.life / 20 * random(0, 255));
                        stroke(245, 241, 226, this.life / 20 * random(0, 255));
                        strokeWeight(0.5);
                        rect(-0.25, -0.25, 0.5, 0.5, -5);
                        noStroke();
                        popMatrix();
                        break;
                    case "ore-finished":
                        fill(116, 232, 58, this.life / 30 * random(0, 155));
                        stroke(116, 232, 58, this.life / 30 * random(0, 155));
                        strokeWeight(0.5);
                        rect(this.x, this.y, 0.5, 0.5, -5);
                        noStroke();
                        break;
                    case "ore-break":
                        noStroke();
                        fill(50);
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "tree-break":
                        noStroke();
                        fill(84, 47, 8);
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "angry-furball":
                        fill(220, 0, 0, this.life / 30 * 255);
                        noStroke();
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "mad-squid": case "mad-squid-small":
                        fill(219, 144, 33, this.life / 30 * 255);
                        noStroke();
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "thunderhead":
                        fill(61, 145, 235, this.life / 30 * 255);
                        noStroke();
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "thunderhead-thunder":
                        strokeWeight(3);
                        stroke(62, 210, 230, this.life / 20 * 255);
                        line(this.x, this.y, that.x, that.y);
                        fill(255, 246, 76, this.life / 20 * 255);
                        noStroke();
                        //ellipse(this.x, this.y, 4, 4);
                        break;
                    case "damage-enemy":
                        fill(255, 255, 255, this.life / 30 * 255);
                        noStroke();
                        textSize(20);
                        text(this.level, this.x + 10 * sin(frameCount * 4), this.y);
                        break;
                    case "damage-player":
                        fill(255, 0, 0, this.life / 30 * 255);
                        noStroke();
                        textSize(20);
                        text(this.level, this.x + 10 * sin(frameCount * 4), this.y);
                        break;
                    case "skill-point":
                        fill(213, 123, 235, this.life / 30 * 255);
                        noStroke();
                        textSize(12);
                        text(this.level, this.x + 10 * sin((frameCount + this.seed) * 4), this.y);
                        break;
                    case "aqualine":
                        fill(30, 193, 199, this.life / 30 * 255);
                        noStroke();
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "leafers":
                        fill(38, 224, 66, this.life / 60 * 90);
                        noStroke();
                        ellipse(this.x, this.y - (30 - this.life) / 8, 8, 8);
                        break;
                    case "duskpin":
                        fill(206, 51, 230, this.life / 50 * 255);
                        stroke(206, 51, 230, this.life / 50 * random(0, 255));
                        strokeWeight(0.5);
                        rect(this.x + 5 + 3 * sin((frameCount + this.seed) * 20), this.y + 5 - (50 - this.life) / 2, 0.5, 0.5, -5);
                        noStroke();
                        break;
                    case "piceratops":
                        fill(240 + random(-30, 30), 132 + random(-15, 15), 0, this.life / 50 * 255);
                        noStroke();
                        ellipse(this.x, this.y, 10, 10);
                        break;
                    case "primosaur":
                        strokeWeight(3);
                        stroke(255, 246, 76, this.life / 50 * 255);
                        line(this.x, this.y, that.x, that.y);
                        break;
                    case "starky":
                        fill(50, this.life / 50 * 45);
                        noStroke();
                        ellipse(this.x, this.y, 20, 20);
                        break;
                }
            },
            effect: function () {
                if (mr_spunky.level_number !== this.level_num) {
                    return;
                }
                switch (this.type) {
                    case "thunderhead-thunder":
                        var m = mr_spunky;
                        if (dist(this.x, this.y, m.x, m.y) < 25 && !this.used) {
                            m.damage(random((this.level + 1) / 2 * 0.8, 0.25 * 1.2), 3);
                        }
                        break;
                    case "duskpin":
                        for (var i = 0; i < enemies[mr_spunky.level_number].length; i++) {
                            var en = enemies[mr_spunky.level_number][i];
                            if (Collide(this.x, this.y, en.x + en.w / 4, en.y + en.h / 5, en.w / 2, en.h / 2)) {
                                en.damage(random((this.level + 1) / 5 * 0.8, 0.25 * 1.2), 3);
                                this.life = 0;
                            }
                        }
                        break;
                    case "piceratops":
                        for (var i = 0; i < enemies[mr_spunky.level_number].length; i++) {
                            var en = enemies[mr_spunky.level_number][i];
                            if (Collide(this.x, this.y, en.x + en.w / 4, en.y + en.h / 5, en.w / 2, en.h / 2)) {
                                en.damage(random((this.level + 1) / 9 * 0.8, 0.25 * 1.2), 3);
                                this.life = 0;
                            }
                        }
                        break;
                    case "primosaur":
                        for (var i = 0; i < enemies[mr_spunky.level_number].length; i++) {
                            var en = enemies[mr_spunky.level_number][i];
                            if (Collide(this.x, this.y, en.x + en.w / 4, en.y + en.h / 5, en.w / 2, en.h / 2)) {
                                en.damage(random((this.level + 1) / 2 * 0.8, 0.25 * 1.2), 3);
                                this.life = 0;
                            }
                        }
                        break;
                    case "starky":
                        for (var i = 0; i < enemies[mr_spunky.level_number].length; i++) {
                            var en = enemies[mr_spunky.level_number][i];
                            if (Collide(this.x, this.y, en.x + en.w / 4, en.y + en.h / 5, en.w / 2, en.h / 2)) {
                                en.damage(random((this.level + 1) / 15 * 0.8, 0.25 * 1.2), 3);
                                this.life -= 25;
                            }
                        }
                        break;
                }
            },
            update: function () {
                this.life--;
                this.x += this.v.x;
                this.y += this.v.y;
                switch (this.type) {
                    case "star":
                        this.ra += this.av;
                        this.v.x /= 1.01;
                        this.v.y /= 1.01;
                        break;
                    case "ore-finished": case "ore-break":
                        this.v.y += 0.04;
                        this.v.x /= 1.01;
                        this.v.y /= 1.01;
                        break;
                    case "aqualine":
                        this.v.y += 0.04;
                        break;
                    case "piceratops":
                        this.v.x /= 1.00;
                        this.v.y /= 1.00;
                        break;
                    case "starky":
                        this.a += 2.5;
                        this.x = this.x + this.spd * cos(this.a);
                        this.y = this.y + this.spd * sin(this.a);
                        break;

                }
                if (this.life < 0) {
                    return true;
                } else {
                    return false;
                }
            }
        };
        return constructor;
    })();
    function Particle_Emitter(variant, level, x, y, obj) {
        switch (variant) {
            case "star":
                if (!reduceParticles) {
                    for (var i = 0; i < round(random(level, level * 2)); i++) {
                        particles.push(Particle.new(variant, level, x, y));
                    }
                } else {
                    for (var i = 0; i < round(random(level / 2, level)); i++) {
                        particles.push(Particle.new(variant, level, x, y));
                    }
                }
                break;
            case "ore-finished":
                for (var i = 0; i < round(random(20, 40)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "ore-break":
                for (var i = 0; i < round(random(10, 20)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "tree-break":
                for (var i = 0; i < round(random(10, 20)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "angry-furball":
                for (var i = 0; i < round(random(20, 40)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "mad-squid": case "mad-squid-small":
                for (var i = 0; i < round(random(10, 20)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "thunderhead":
                for (var i = 0; i < round(random(40, 70)); i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "thunderhead-thunder":
                for (var i = 0; i < round(random(5, 10)); i++) {
                    particles.push(Particle.new(variant, level, x, y, obj));
                }
                break;
            case "damage-enemy":
                particles.push(Particle.new(variant, level, x, y));
                break;
            case "damage-player":
                particles.push(Particle.new(variant, level, x, y));
                break;
            case "skill-point":
                particles.push(Particle.new(variant, level, x, y));
                break;
            case "aqualine":
                var amount = (level + 1) * 10;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "leafers":
                var amount = (level + 1) * 6;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "duskpin":
                var amount = (level + 1) * 3;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "piceratops":
                var amount = (level + 1) * 1;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "primosaur":
                var amount = (level + 1) * 4;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
            case "starky":
                var amount = (level + 1) * 1;
                for (var i = 0; i < amount; i++) {
                    particles.push(Particle.new(variant, level, x, y));
                }
                break;
        }
    }
    var particle_sorter = function (particle, i, b) {
        if (particles.length < 2) {
            return particle;
        }
        return particles[particles.map(function (part, index) {
            if (index === i) {
                return [100000000, index];
            }
            return [dist(particle.x, particle.y, part.x, part.y) + b, index];
        }).sort(function (a, b) { return a[0] - b[0]; })[0][1]];
    };
    var random_modified = function (particle) {
        var iter = 0;
        while (iter < 20) {
            var p = particles[floor(random(0, particles.length))];
            if (dist(particle.x, particle.y, p.x, p.y) < 60) {
                return p;
            }
            iter++;
        }
        return particle;
    };
    // }

    // ** MR SPUNKY STUFF ** {
    var check_counter = 0;
    mr_spunky = {
        level_number: 4,
        show_player: false,
        intro_frame: 0,
        intro_star_pos: { x: 500, y: -200 },
        menu_open: false,
        menu_person: "Ernest",
        avatar_menu_open: false,
        skill_menu_open: false,
        help_menu_open: false,
        cheats_menu_open: false,
        cheat_string: [],
        cheat_string_insert: 0,
        menu_scroll: 0,
        menu_scroll_max: 1,
        house_unlocked: false,
        mines_unlocked: false,
        facing: -1,
        dialog: {
            active: false,
            enum: [],
            current: 0,
            __animate: 0,
            buttons: [],
            render: function () {
                if (this.active) {
                    if (this.enum[this.current] !== undefined) {
                        if (this.buttons === "next") {
                            this.enum[this.current].buttons = [
                                {
                                    text: "Next",
                                    callback: function (ctx) {
                                        ctx.current++;
                                    }
                                }
                            ];
                        }
                        this.buttons = this.enum[this.current].buttons || [
                            {
                                text: "Exit",
                                callback: function (ctx) {
                                    ctx.current = 5000;
                                }
                            }
                        ];

                        this.__animate += 0.4;
                        fill(122, 67, 0);
                        noStroke();
                        rect(20, 270, 360, 80);
                        fill(255, 255, 255);
                        text(this.enum[this.current].msg.slice(0, floor(this.__animate)), 40, 290, 300, 300);

                        var default_callback = function (ctx) { ctx.current++; };
                        for (var i = 0; i < this.buttons.length; i++) {
                            fill(255, 50);
                            if (Collide(mouseX, mouseY, 315 - i * 70, 320, 60, 25)) {
                                fill(255, 120);
                                cursor("POINTER");
                                if (this.__animate >= (this.enum[this.current].msg.length / 2) && mouseIsPressed) {
                                    (this.buttons[i].callback || default_callback)(this);
                                    this.__animate = 0;
                                }
                            }

                            rect(315 - i * 70, 320, 60, 25);
                            fill(0);
                            textSize(15);
                            textAlign(CENTER);
                            text(this.buttons[i].text, 345 - i * 70, 338);
                        }
                    } else {
                        this.active = false;
                        this.enum = [];
                        this.current = 0;
                        this.__animate = 0;
                        this.button = {
                            text: "",
                            callback: function () { }
                        };
                    }
                }
            }
        },
        variant: "aqualine",
        levels: {
            "aqualine": 0,
            "leafers": -1,
            "duskpin": -1,
            "piceratops": -1,
            "primosaur": -1,
            "starky": -1
        },
        skills: {
            farming: 1,
            trading: 1,
            woodcutting: 1,
            mining: 1,
            combat: 1,
            addPoints: function (points, type) {
                Particle_Emitter("skill-point", ("+" + points + " " + type),
                    mr_spunky.x + 40, mr_spunky.y + 10
                );
                mr_spunky.skills[type] += points / (mr_spunky.skills[type] * 10);
            }
        },
        strength: 0.50,
        health: 10,
        max_health: 10,
        __dead: false,
        __death_consequence: "",
        __iframes: 0,
        __swordRecharge: 0,
        __swordRecharge_set: 120,
        x: 200,
        y: 200,
        speed: 1.00,
        money: 0,
        luck: 0.00,
        home_storage: {
            is_open: false,
            items: [
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0)
            ],
            render: function () {
                var found_slot = false;
                var inv = mr_spunky.inventory;
                for (var i = 0; i < this.items.length; i++) {
                    var x = (i % 11) * 35, y = floor(i / 11) * 35;
                    noStroke();
                    fill(0, 50);
                    rect(10 + x, 100 + y, 30, 30);
                    this.items[i].draw(10 + x, 100 + y, 30, 30);
                    if (mr_spunky.__swordRecharge > 0 && this.items[i].data.isWeapon) {
                        noStroke();
                        fill(255, 50);
                        var ttt = mr_spunky.__swordRecharge / (mr_spunky.__swordRecharge_set / mr_spunky.speed);
                        rect(10 + x, 130 + y - (ttt) * 30, 30, ttt * 30);
                    }
                    fill(255);
                    textAlign(RIGHT);
                    textSize(11);
                    text(this.items[i].count, 39 + x, 130 + y);

                    if (mouseIsPressed) {
                        if (Collide(mouseX, mouseY, 10 + x, 100 + y, 30, 30)) {
                            if (inv.hand.item.label === "blank") {
                                if (!keys[SHIFT]) {
                                    inv.hand.item = this.items[i];
                                    inv.hand.from = "home";
                                    inv.hand.slot_num = i;
                                    this.items[i] = Item.new("blank", 0);
                                } else {
                                    if (inv.canAdd(this.items[i])) {
                                        inv.add(this.items[i]);
                                    }
                                    this.items[i] = Item.new("blank");
                                }
                            }
                        }
                    } else {
                        if (Collide(mouseX, mouseY, 10 + x, 100 + y, 30, 30)) {
                            if (inv.hand.from === "home") {
                                if (this.items[i].label === "blank") {
                                    this.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                    found_slot = true;
                                } else if (this.items[i].label === inv.hand.item.label && [undefined, true].includes(this.items[i].data.canStack)) {
                                    this.items[i].count += inv.hand.item.count;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                } else if (this.items[i].label !== inv.hand.item.label || (!this.items[i].data.canStack || !this.hand.item.data.canStack)) {
                                    var a = this.items[i];
                                    this.items[inv.hand.slot_num].label = a.label;
                                    this.items[inv.hand.slot_num].count = a.count;
                                    this.items[inv.hand.slot_num].data = a.data;
                                    this.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                }
                            }
                            if (inv.hand.from === "inventory") {
                                if (this.items[i].label === "blank") {
                                    this.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                    found_slot = true;
                                } else if (this.items[i].label === inv.hand.item.label) {
                                    this.items[i].count += inv.hand.item.count;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                } else if (this.items[i].label !== inv.hand.item.label || (!this.items[i].data.canStack || !this.hand.item.data.canStack)) {
                                    var a = this.items[i];
                                    inv.items[inv.hand.slot_num].label = a.label;
                                    inv.items[inv.hand.slot_num].count = a.count;
                                    inv.items[inv.hand.slot_num].data = a.data;
                                    this.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                }
                            }
                        }
                    }
                }
                return found_slot;
            },
            remove: function (__item) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (this.test(
                        item,
                        __item.label,
                        { "condition": ">", "value": -1 },
                        __item.data)
                    ) {
                        item.count -= __item.count;
                        if (item.count < 1) {
                            item.label = "blank";
                            item.count = 0;
                            item.data = {};
                        }
                        return true;
                    }
                }
                return false;
            },
            replace: function (item1, item2) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (this.test(
                        item,
                        item1.label,
                        { "condition": "=", "value": item1.count },
                        item1.data)
                    ) {
                        this.items[i] = item2;
                        return true;
                    }
                }
                return false;
            },
            canAdd: function (__item) {
                var v = -1;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.label === __item.label && (__item.data.canStack || __item.data.canStack === undefined)) {
                        return true;
                    }
                    if (item.label === "blank" && v === -1) {
                        v = i;
                    }
                }
                if (v === -1) {
                    return false;
                }
                return true;
            },
            add: function (__item) {
                var v = -1;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.label === __item.label && (__item.data.canStack || __item.data.canStack === undefined)) {
                        item.count += __item.count;
                        return true;
                    }
                    if (item.label === "blank" && v === -1) {
                        v = i;
                    }
                }
                if (v === -1) {
                    dropped_items[mr_spunky.level_number].push(
                        DroppedItem.new(__item, mr_spunky.x, mr_spunky.y)
                    );
                    return false;
                }
                this.items[v].label = __item.label;
                this.items[v].count = __item.count;
                this.items[v].data = __item.data;
                return true;
            }
        },
        inventory: {
            hand: {
                item: Item.new("blank", 0),
                from: "none",
                slot_num: 0
            },
            items: [
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0),
                Item.new("blank", 0)
            ],
            hover: 0,
            hover_render_type_flag: false,
            hover_render_type_var: 0,
            render_type: function () {
                if (this.hover_render_type_flag) {
                    this.hover_render_type_var = 1;
                    this.hover_render_type_flag = false;
                }
                this.hover_render_type_var -= 0.01;
                this.hover_render_type_var = max(0, this.hover_render_type_var);
                if (this.hover_render_type_var > 0) {
                    fill(255, this.hover_render_type_var * 255);
                    textAlign(CENTER);
                    var label = this.items[this.hover].label;
                    text(label.slice(0, 1).toUpperCase() + label.slice(1), 24.5 + this.hover * 35, 350);
                    textAlign(LEFT);
                }
            },
            remove: function (__item) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (this.test(
                        item,
                        __item.label,
                        { "condition": ">", "value": __item.count - 1 },
                        __item.data)
                    ) {
                        item.count -= __item.count;
                        if (item.count < 1) {
                            item.label = "blank";
                            item.count = 0;
                            item.data = {};
                        }
                        println(__item.label);
                        return true;
                    }
                }
                return false;
            },
            replace: function (item1, item2) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (this.test(
                        item,
                        item1.label,
                        { "condition": "=", "value": item1.count },
                        item1.data)
                    ) {
                        this.items[i] = item2;
                        return true;
                    }
                }
                return false;
            },
            canAdd: function (__item) {
                var v = -1;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.label === __item.label && (__item.data.canStack || __item.data.canStack === undefined)) {
                        return true;
                    }
                    if (item.label === "blank" && v === -1) {
                        v = i;
                    }
                }
                if (v === -1) {
                    return false;
                }
                return true;
            },
            add: function (__item) {
                var v = -1;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.label === __item.label && (__item.data.canStack || __item.data.canStack === undefined)) {
                        item.count += __item.count;
                        return true;
                    }
                    if (item.label === "blank" && v === -1) {
                        v = i;
                    }
                }
                if (v === -1) {
                    //println("DEBUG" + __item.draw);
                    dropped_items[mr_spunky.level_number].push(
                        DroppedItem.new(__item, mr_spunky.x, mr_spunky.y)
                    );
                    return false;
                }
                this.items[v].label = __item.label;
                this.items[v].count = __item.count;
                this.items[v].data = __item.data;
                return true;
            },
            testHover: function (type, c, data) {
                return this.test(this.items[this.hover], type, c, data);
            },
            test: function (item, type, c, data) {
                var h = item;
                if (h.label === type) {
                    if (c.condition !== undefined) {
                        var checks = false;
                        switch (c.condition) {
                            case ">":
                                checks = h.count > c.value;
                                break;
                            case "<":
                                checks = h.count > c.value;
                                break;
                            case "=":
                                checks = h.count === c.value;
                                break;
                        }
                        if (!checks) {
                            return false;
                        }
                    }
                    var check = function (value, ref) {
                        if (value instanceof Object) {
                            if (value.condition !== undefined) {
                                switch (value.condition) {
                                    case ">":
                                        return value.value > ref;
                                    case "<":
                                        return value.value < ref;
                                    case "=":
                                        return value.value === ref;
                                    case ".":
                                        if (value.value instanceof Array) {
                                            return value.value.includes(ref);
                                        }
                                        return false;
                                    case ",":
                                        if (ref instanceof Array) {
                                            return ref.includes(value.value);
                                        }
                                        return false;
                                }
                            }
                            var o = Object.keys(value);
                            var checks = true;
                            for (var i = 0; i < o.length; i++) {
                                if (!checks) {
                                    return false;
                                }
                                if (ref[o[i]] !== undefined) {
                                    checks = check(value[o[i]], ref[o[i]]);
                                } else {
                                    return false;
                                }
                            }
                            return checks;
                        } else {
                            if (value === ref) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    };
                    return check(data, h.data);
                }
            }
        },
        animation: "",
        __money_last: 50,
        __money_flash: 0,
        __money_flash_color: color(255, 255, 255),
        __animationTick: 0,
        __jump: 0,
        __vel: 0,
        __gconst: 0.25,
        __abilityRecharge: 0,
        __abilityRecharge_set: 120,
        __abilityDuration: 20,
        run_intro: function () {
            this.intro_frame++;
            if (this.intro_frame < 700) {
                fill(0);
                noStroke();
                rect(0, -constrain(this.intro_frame - 500, 0, Infinity), 400, 112.5);
                rect(0, 400 - 112.5 + constrain(this.intro_frame - 500, 0, Infinity), 400, 112.5);
                var isp = this.intro_star_pos;
                if (this.intro_frame < 300) {
                    isp.x--;
                    isp.y = 200 - 200 * sin((isp.x - 200) / 300 * 90);
                }
                var ra = random(0, 360), mg = random(1, 7);
                if (this.intro_frame > 330) {
                    mg += this.intro_frame - 330;
                    this.show_player = true;
                }
                if (this.intro_frame > 330 && this.intro_frame < 335) {
                    this.x = 200;
                    this.y = 200;
                }
                Particle_Emitter("star", 10, isp.x + mg * cos(ra), isp.y + mg * sin(ra));
            } else {
                this.show_player = true;
            }
        },
        death: function () {
            this.__dead = true;
            this.__iframes = 100000;
            var chance = random(0, 100);
            if (chance < 50) {
                var loss_percent = random(0.5, 1);
                this.__death_consequence = "-" + ceil(this.money - this.money * loss_percent) + " coins";
                this.money *= loss_percent;
                this.money = floor(this.money);
            }
            if ((chance >= 50 && chance < 95) || this.money <= 0) {
                while (true) {
                    var slot = floor(random(0, this.inventory.items.length));
                    if (!["axe", "pickaxe", "hoe", "scythe", "sword", "blank"].includes(this.inventory.items[slot].label)) {
                        this.__death_consequence = "-" + this.inventory.items[slot].count + " " + this.inventory.items[slot].label;
                        this.inventory.remove(this.inventory.items[slot]);
                        break;
                    }
                }
            }
        },
        deathScreen: function () {
            if (this.health <= 0) {
                fill(255, 0, 0, 90);
                noStroke();
                rect(0, 0, 400, 400);

                fill(255, 255, 255, 100);
                if (Collide(mouseX, mouseY, 160, 315, 80, 40)) {
                    fill(255, 255, 255, 150);
                    cursor("POINTER");
                }
                rect(160, 315, 80, 40);

                fill(255, 0, 0);
                textFont(FONT_CURSIVE_BOLD);
                textAlign(CENTER);
                textSize(40);
                text("You Died", 200, 200);
                fill(255, 255, 255);
                textSize(15);
                text(this.__death_consequence, 200, 230);

                fill(0, 150);
                if (Collide(mouseX, mouseY, 160, 315, 80, 40)) {
                    fill(0, 250);
                    if (mouseIsPressed) {
                        this.health = 100;
                        this.__dead = false;
                        this.__iframes = 0;
                        this.level_number = 4;
                        this.x = 200;
                        this.y = 200;
                    }
                }
                textAlign(CENTER);
                textSize(15);
                textFont(FONT_SANS_SERIF_BOLD);
                text("Respawn", 200, 340);
            }
        },
        stats: function () {

            // Health
            var roffset = [0, 0];
            if (this.health <= 5.0) {
                var v = 1.42 - (this.health / 3.5);
                roffset = [random(-v, v), random(-v, v)];
            }
            pushMatrix();
            translate(roffset[0], roffset[1]);
            Heart(this.health / 10, 355, 28, 40, 40);
            textAlign(CENTER);
            Outlined_Text(round(this.health * 10), 375, 53, 12, color(255), color(0), 2);
            popMatrix();
            textAlign(LEFT);

            // Ability
            Star((1 - this.__abilityRecharge / this.__abilityRecharge_set), 315, 27, 45, 45);

            // Money
            pushMatrix();
            translate(5, 52);
            scale(1, -1);
            image(getImage("cute/WoodBlock"), 310, 0, 85, 70);
            popMatrix();
            fill(77, 77, 77);
            rect(323, 5, 56, 20);
            fill(0, 0, 0);
            rect(323, 7, 54, 18);

            fill(this.__money_flash_color);
            textAlign(RIGHT);
            textFont(FONT_CURSIVE);
            if (floor(this.__money_flash) % 30 < 15) {
                text(this.money.toLocaleString(), 375, 20);
            }
            Coin(389, 15, 16);
        },
        damage: function (amount) {
            if (this.__iframes === 0) {
                this.health -= amount;
                this.__iframes = 120;
                playSound(getSound("rpg/giant-hyah"));
            }
        },
        draw: function () {
            if (!this.show_player) {
                return;
            }
            check_counter++;

            fill(0, 50 - this.__jump);
            ellipse(this.x, this.y + 15, 24 - this.__jump / 2, 12 - this.__jump / 4);
            pushMatrix();
            translate(this.x, this.y - this.__jump);
            scale(this.facing, 1);
            noStroke();
            if (this.animation !== "none") {
                this.__animationTick += 7;
                pushMatrix();
                translate(0, 0);
                rotate(5 - this.__animationTick);
                var item = Item.new(this.animation, 0);
                item.draw(-20, -40, 40, 40);
                popMatrix();
                if (this.__animationTick > 120) {
                    this.animation = "none";
                    this.__animationTick = 0;
                }
            }
            getImage("avatars/aqualine-seed");
            var levels = ["seed", "seedling", "sapling", "tree", "ultimate"];
            var name = ("avatars/" + this.variant + "-" + levels[this.levels[this.variant]]);
            if (this.__iframes % 30 < 15) {
                image(getImage(name), -24, -24, 48, 48);
            }
            popMatrix();
        },
        upgrade: function (variant, slot) {
            if (this.levels[variant] <= 3) {
                this.money -= slot.price;
                this.levels[variant]++;
                playSound(getSound("rpg/coin-jingle"));
            }
        },
        applyStats: function () {
            var ctx = this;
            var levels = ["seed", "seedling", "sapling", "tree", "ultimate"];
            var item = advancements[this.variant][levels[this.levels[this.variant]]].stats;
            Object.keys(item).forEach(function (key) {
                ctx[key] = item[key];
            });
        },
        changeVariant: function (variant) {
            this.variant = variant;
            this.applyStats();
        },
        update: function () {
            if (this.inventory.items[this.inventory.hover].label === "dyla's token") {
                this.max_health = 15;
                this.health += 0.002;
                this.health = constrain(this.health, 0, this.max_health);
            }
            var variants = Object.keys(advancements);
            for (var i = 0; i < variants.length; i++) {
                var adv = advancements[variants[i]];
                var check = true;
                if (this.levels[variants[i]] === -1) {
                    var skills = Object.keys(adv.unlocks);
                    for (var j = 0; j < skills.length; j++) {
                        var skill = skills[j];
                        if (this.skills[skill] < adv.unlocks[skill]) {
                            check = false;
                        }
                    }
                    if (check) {
                        this.levels[variants[i]] = 0;
                    }
                }
            }
            this.__iframes -= 1;
            this.__iframes = constrain(this.__iframes, 0, Infinity);
            if (this.health <= 0) {
                if (!this.__dead) {
                    this.death();
                }
                return;
            }
            this.__money_flash--;
            this.__money_flash = constrain(this.__money_flash, 0, Infinity);
            if (this.money > this.__money_last) {
                this.__money_flash = 60;
                this.__money_flash_color = color(0, 255, 0);
            } else if (this.money < this.__money_last) {
                this.__money_flash = 60;
                this.__money_flash_color = color(255, 0, 0);
            } else if (this.__money_flash <= 0) {
                this.__money_flash_color = color(255, 255, 255);
            }
            this.__money_last = parseInt("" + this.money, 10);

            this.__swordRecharge--;
            this.__swordRecharge = constrain(this.__swordRecharge, 0, Infinity);
            if (this.__abilityRecharge > 0) {
                this.__abilityRecharge--;
            } else {
                this.__abilityRecharge = 0;
            }

            if (this.__iframes === 0) {
                this.health += 0.001;
                this.health = constrain(this.health, 0, this.max_health);
            }
            if (this.money > 999999) {
                println("You " + "have reached the maximum amount of money.");
            }
            this.money = constrain(this.money, 0, 999999);
        },
        move: function () {
            if (!this.show_player || this.cheats_menu_open) {
                return;
            }
            this.__vel -= this.__gconst;
            this.__jump += this.__vel;
            this.__jump = constrain(this.__jump, 0, Infinity);
            if (this.health <= 0) {
                return;
            }
            if (!this.dialog.active) {
                if (keys[87]) {
                    this.y += -this.speed;
                    if (this.__jump === 0) {
                        this.__vel = 2.5;
                    }
                }
                if (keys[65]) {
                    this.x += -this.speed;
                    this.facing = 1;
                    if (this.__jump === 0) {
                        this.__vel = 2.5;
                    }
                }
                if (keys[68]) {
                    this.x += this.speed;
                    this.facing = -1;
                    if (this.__jump === 0) {
                        this.__vel = 2.5;
                    }
                }
                if (keys[83]) {
                    this.y += this.speed;
                    if (this.__jump === 0) {
                        this.__vel = 2.5;
                    }
                }
            }

            // DEV KEYS
            if (keys[SHIFT]) {
                var code = function (c) { return c.charCodeAt(0); };
                if (keys[code("M")]) {
                    // Speed Boost
                    this.speed = 3.89;
                }
                if (keys[code("C")]) {
                    // Opens Cheats Menu
                    this.cheats_menu_open = true;
                }
                if (keys[code("P")]) {
                    // Prints Out Mr_Spunky Object
                    println(json.stringify(this, null, 4));
                }
            }

            if ((mouseIsPressed && mouseButton === CENTER) || (keyIsPressed && ((key || "").toString() === " ") || (key || "").toString() === "q")) {
                if (this.__abilityRecharge > (this.__abilityRecharge_set - this.__abilityDuration)) {
                    Particle_Emitter(this.variant, this.levels[this.variant], this.x, this.y);
                }
                if (this.__abilityRecharge === 0) {
                    this.__abilityRecharge = this.__abilityRecharge_set;
                    switch (this.variant) {
                        case "piceratops":
                            playSound(getSound("retro/rumble"));
                            break;
                    }
                }
            }
        },
        buySell: function (slot) {
            if (slot.transaction === "sell") {
                if (this.inventory.remove(slot.item)) {
                    this.money += slot.price;
                    Particle_Emitter("skill-point", ("+1 trading"),
                        this.x + 40, this.y + 10
                    );
                    this.skills.trading += 1 / (this.skills.trading * 10);
                }
            }
            if (slot.transaction === "buy") {
                //var item = json.parse(json.stringify(slot.item));
                if (this.money >= slot.price) {
                    //println("debug");
                    /*var response;
                    if (slot.upgrade !== undefined) {
                        response = slot.upgrade();
                    }*/
                    /*if ((response || {canUpgrade : true}).canUpgrade || (response === undefined)) {*/
                    //println("New Item: " + item.label);
                    this.inventory.add(slot.item);
                    if (true) {
                        this.money -= slot.price;
                        Particle_Emitter("skill-point", ("+0.5 trading"),
                            this.x + 40, this.y + 10
                        );
                        this.skills.trading += 0.5 / (this.skills.trading * 10);
                        /*if (response !== undefined) {
                            response.callback();
                        }*/
                    }
                    //}
                }
            }
        },
        cheats_menu: function () {
            if (this.cheats_menu_open) {
                fill(0, 0, 0);
                rect(0, 0, 400, 25);

                fill(255);
                noStroke();
                text(this.cheat_string.join(""), 10, 15);

                rect(10 + textWidth(this.cheat_string.join("").slice(0, this.cheat_string_insert)), 5, 1, 12);
            }
        },
        execute_cheat: function () {
            var command = this.cheat_string.join("").split(" ");
            if (command[0] === "") {
                this.cheats_menu_open = false;
                this.cheat_string = [];
                this.cheat_string_insert = 0;
            }
            switch (command[0]) {
                case "get":
                    var l = 1;
                    var sub = function (o) {
                        var c = command[l];
                        if (c.slice(0, 1) === "0" || parseFloat(c) > 0) {
                            c = parseFloat(c);
                        }
                        var r = o[c];
                        if (r instanceof Object) {
                            if ((command.length - 1) === l) {
                                return json.stringify(r, null, 4);
                            }
                            l++;
                            return sub(r);
                        } else {
                            return r;
                        }
                    };
                    println(sub(this));
                    break;
                case "set":
                    var l = 1;
                    var sub = function (o) {
                        var c = command[l];
                        if (c.slice(0, 1) === "0" || parseFloat(c) > 0) {
                            c = parseFloat(c);
                        }
                        var r = o[c];
                        if (r === undefined) {
                            println("Cannot set property of undefined field");
                            return;
                        }
                        if (r instanceof Object) {
                            l++;
                            sub(r);
                        } else {
                            var vc = command[l + 1];
                            if (vc === undefined) {
                                println("No set value provided");
                                return;
                            }
                            if (vc.slice(0, 1) === "0" || parseFloat(vc) > 0) {
                                vc = parseFloat(vc);
                            } else {
                                if (vc.slice(0, 1) === "\"") {
                                    vc = vc.slice(1, -1);
                                    vc = vc.replaceAll("_", " ");
                                }
                            }
                            o[c] = vc;
                        }
                    };
                    sub(this);
                    break;
                case "give":
                    if (command[1].slice(0, 1) === "\"") {
                        command[1] = command[1].slice(1, -1);
                        command[1] = command[1].replaceAll("_", " ");
                    }
                    if (command[2].slice(0, 1) === "0" || parseFloat(command[2]) > 0) {
                        command[2] = parseFloat(command[2]);
                    }
                    var item = command[1];
                    var count = command[2];
                    this.inventory.add(Item.new(item, count));
                    /*var l = 1;
                    var sub = function (o) {
                        var c = command[l];
                        if (c.slice(0, 1) === "0" || parseFloat(c) > 0) {
                            c = parseFloat(c);
                        }
                        var r = o[c];
                        if (r === undefined) {
                            println("Cannot set property of undefined field");
                            return;
                        }
                        if (r instanceof Object) {
                            l++;
                            sub(r);
                        } else {
                            var vc = command[l + 1];
                            if (vc === undefined) {
                                println("No set value provided");
                                return;
                            }
                            if (vc.slice(0, 1) === "0" || parseFloat(vc) > 0) {
                                vc = parseFloat(vc);
                            } else {
                                if (vc.slice(0, 1) === "\"") {
                                    vc = vc.slice(1, -1);
                                    vc = vc.replaceAll("_", " ");
                                }
                            }
                            o[c] = vc;
                        }
                    };
                    sub(this);*/
                    break;
                case "close":
                    this.cheats_menu_open = false;
                    break;
            }
            this.cheat_string = [];
            this.cheat_string_insert = 0;
        },
    };
    // }

    // ** MISC STUFF ** {
    for (var L = 0; L < 10; L++) {
        coins.push([]);
        for (var i = 0; i < round(random(0, 4)); i++) {
            coins[L].push([random(0, 400), random(0, 400)]);
        }
    }
    walls = [
        [
            [241, 268, 245, 266], [0, 268, 80, 406], [21, -21, 91, 106], [129, -21, 91, 106], [236, -21, 91, 106], [7, 180, 60, 60],
            [0, 0, 400, 20],
            [0, 0, 20, 400]
        ],
        [
            [0, 0, 500, 20],
            [0, 268, 20, 150],
            [0, 380, 162, 20],
            [162, 0, 300, 20],
            [247, 380, 200, 20]
        ],
        [
            [-400, 0, 800, 20],
            [-400, 380, 800, 20],
            [380, 0, 20, 400],
        ],
        [
            [0, 0, 80, 406],
            [241, -91, 245, 266],
            [241, 250, 245, 266],
        ],
        [
            [240, -91, 245, 266],
            [-84, -93, 245, 266],
            //[139, 281, 122, 55]
            [241, 250, 245, 266],
            [-84, 250, 245, 266]
        ],
        [
            [190, 130, 40, 50],
            [200, 112, 50, 20],
            [210, 94, 60, 20],
            [240, 94 - 18, 60, 40],
            [260, 94 - 36, 60, 40],
            [280, 94 - 54, 150, 60],
            [340, 94 - 66, 70, 20],

            [240, 240, 60, 40],
            [220, 240 + 38, 60, 40],
            [200, 240 + 38 + 25, 60, 30],
            [160, 240 + 38 + 45, 60, 30],
            [130, 240 + 105, 60, 24],
            [100, 240 + 123, 60, 24],
            [70, 240 + 135, 60, 24],
            [0, 240 + 150, 80, 24],

            [-20, -20, 440, 40],
            [380, -20, 40, 440],
            [-24, -93, 245, 266],
            [-104, 250, 245, 266],
        ],
        [
            [290, 123, 230, 60],
            [290, 262, 150, 85],
            [330, 330, 80, 40],
            [380, -10, 25, 440],
            [241, 250 - 445, 245, 266],
            [-20, 380, 440, 40],
            [-128, -14, 150, 967],
            [0, 1, 80, 20]
        ],
        [
            [-20, -20, 40, 440],
            [16, 50, 30, 135],
            [38, 130, 60, 45],
            [70, 150, 63, 50],
            [125, 145, 60, 65],
            [180, 150, 120, 60],
            [285, 140, 60, 50],
            [310, 100, 55, 65],
            [330, 70, 45, 50],
            [350, 30, 60, 70],

            [-20, 380, 440, 40],
            [-20, -20, 180, 40],
            [240, -20, 240, 40],
            [360, -20, 50, 80]
        ],
        [
            [0, 0, 155, 24],
            [0, 18, 45, 20],
            [-10, 20, 25, 80],
            [-20, 380, 440, 40],
            [380, -20, 40, 440]
        ],
        [
            [0, 0, 60, 400],
            [0, 0, 400, 60],
            [0, 380, 400, 40],
            [185, 360, 120, 60],
            [355, 0, 60, 400]
        ]
    ];
    villager_nodes = [
        [[65, 105], [350, 210], [270, 105], [100, 280], [180, 180], [170, 115], [235, 250], [120, 340], [100, 420, [3, 100, 20]]],
        [[190, 360], [200, 320], [180, 250], [100, 200], [100, 100], [50, 70], [30, 120], [20, 150], [-20, 150, [0, 380, 150]]],
        [],
        [[100, 50], [180, 150], [140, 320], [120, 250], [240, 210], [340, 210], [420, 210, [4, 20, 210]]],
        [[50, 210], [205, 330], [185, 280], [180, 180], [200, 90], [190, 30], [190, -20, [1, 190, 380]], [270, 200], [330, 230]],
        [],
        [],
        [],
        [],
        []
    ];
    // Thanks chatgpt
    function CheckCoins() {
        for (var L = 0; L < 10; L++) {
            for (var i = 0; i < coins[L].length; i++) {
                // limit attempts to avoid infinite loop
                var attempts = 0;
                var maxAttempts = 200; // tune if needed
                while (attempts++ < maxAttempts) {
                    var isColliding = false;
                    for (var j = 0; j < walls[L].length; j++) {
                        if (Collide(coins[L][i][0], coins[L][i][1], walls[L][j][0], walls[L][j][1], walls[L][j][2], walls[L][j][3])) {
                            isColliding = true;
                            break;
                        }
                    }
                    if (isColliding) {
                        // reposition and try again
                        coins[L][i][0] = random(0, 400);
                        coins[L][i][1] = random(0, 400);
                    } else {
                        break;
                    }
                }
                // if we exhausted attempts and still colliding, nudge coin to a fallback safe coord
                if (attempts >= maxAttempts) {
                    coins[L][i][0] = 10 + (i % 10) * 10;
                    coins[L][i][1] = 10 + Math.floor(i / 10) * 10;
                }
            }
        }
    }
    CheckCoins();
    function Bush(x, y, w, h) {
        pushMatrix();
        translate(x, y);
        scale(w / 300, h / 300);
        translate(-50, -50);
        noStroke();

        fill(0, 50);
        ellipse(170, 290, 180, 60);

        // Leaves
        fill(30, 115, 1);
        beginShape();
        vertex(126.65, 227.76);
        vertex(132.81, 243.06);
        vertex(131.44, 253.99);
        vertex(126.66, 260.82);
        vertex(106.17, 263.55);
        vertex(96.61, 262.19);
        vertex(78.16, 260.82);
        vertex(77.48, 240.33);
        vertex(89.09, 230.77);
        vertex(95.24, 215.06);
        vertex(112.31, 213.01);
        vertex(116.41, 200.03);
        vertex(121.88, 200.03);
        vertex(116.41, 189.11);
        vertex(108.90, 183.64);
        vertex(97.29, 176.81);
        vertex(92.51, 163.15);
        vertex(104.12, 159.74);
        vertex(110.27, 140.61);
        vertex(134.17, 147.44);
        vertex(148.51, 135.15);
        vertex(155.34, 141.98);
        vertex(158.08, 138.56);
        vertex(160.13, 129.00);
        vertex(168.32, 127.63);
        vertex(188.13, 121.49);
        vertex(192.91, 123.54);
        vertex(212.03, 112.61);
        vertex(217.50, 114.66);
        vertex(221.60, 119.44);
        vertex(225.70, 129.00);
        vertex(240.72, 130.37);
        vertex(255.06, 132.42);
        vertex(241.40, 138.56);
        vertex(255.06, 148.81);
        vertex(253.70, 154.95);
        vertex(261.21, 162.47);
        vertex(258.48, 164.52);
        vertex(259.85, 170.66);
        vertex(276.24, 175.45);
        vertex(263.26, 188.42);
        vertex(272.82, 200.03);
        vertex(272.14, 206.18);
        vertex(264.63, 215.74);
        vertex(274.87, 229.40);
        vertex(283.75, 235.55);
        vertex(274.19, 242.38);
        vertex(275.56, 248.53);
        vertex(263.26, 256.04);
        vertex(258.48, 265.60);
        vertex(255.75, 269.02);
        vertex(237.31, 274.48);
        vertex(229.79, 277.21);
        vertex(213.40, 264.92);
        vertex(201.11, 255.36);
        vertex(177.20, 262.87);
        vertex(141.68, 260.82);
        vertex(141.00, 259.46);
        vertex(128.02, 263.55);
        endShape();

        // Branches
        fill(112, 65, 11);
        beginShape();
        vertex(154.53, 286.40);
        vertex(155.69, 270.98);
        vertex(163, 243);
        vertex(163, 233);
        vertex(152, 224);
        vertex(130, 220);
        vertex(113, 238);
        vertex(92, 247);
        vertex(109, 236);
        vertex(120, 220);
        vertex(129.45, 203.97);
        vertex(140.25, 206.73);
        vertex(150, 211);
        vertex(171, 218);
        vertex(171, 207);
        vertex(164, 199);
        vertex(157, 189);
        vertex(140, 190);
        vertex(111, 158);
        vertex(131, 169);
        vertex(141, 178);
        vertex(151, 180);
        vertex(166, 181);
        vertex(181, 191);
        vertex(185, 200);
        vertex(193.43, 220.60);
        vertex(188, 188);
        vertex(188, 169);
        vertex(202, 162);
        vertex(215, 139);
        vertex(209, 168);
        vertex(196, 178);
        vertex(199, 201);
        vertex(205, 221);
        vertex(221, 235);
        vertex(239, 234);
        vertex(251, 227);
        vertex(230, 241);
        vertex(209, 242);
        vertex(193, 246);
        vertex(183, 257);
        vertex(179, 281);
        vertex(187.30, 290.64);
        vertex(168.03, 295.65);
        endShape();

        // Front Leaves
        fill(32, 102, 6);
        beginShape();
        vertex(150, 172);
        vertex(144, 180.91);
        vertex(139.64, 187.06);
        vertex(132.12, 212.33);
        vertex(115.46, 217.50);
        vertex(125, 243.75);
        vertex(136.90, 250.58);
        vertex(147.15, 257.41);
        vertex(161.49, 259.46);
        vertex(178.57, 263.55);
        vertex(201, 264.92);
        vertex(209.99, 249.89);
        vertex(220.91, 229.40);
        vertex(223.65, 212.33);
        vertex(220.23, 202.08);
        vertex(231.78, 176.98);
        vertex(212.72, 174.76);
        vertex(198.37, 169.98);
        vertex(177.50, 174.11);
        vertex(172.84, 149.86);
        vertex(155.58, 160.58);
        vertex(149.51, 172.25);
        endShape();

        // Front Branches
        fill(94, 63, 1);
        beginShape();
        vertex(175.03, 247.87);
        vertex(165.28, 229.63);
        vertex(165.28, 209.70);
        vertex(164.00, 200.79);
        vertex(168.67, 212.67);
        vertex(169.52, 222.42);
        vertex(173.76, 236.42);
        vertex(180.12, 236.42);
        endShape();
        beginShape();
        vertex(198.63, 204.43);
        vertex(204.41, 199.42);
        vertex(202.87, 187.47);
        vertex(202.87, 179.76);
        vertex(207.50, 197.49);
        vertex(207.11, 205.97);
        vertex(201.71, 211.37);
        endShape();

        popMatrix();
    }
    function Grass(x, y, w, h) {
        fill(48, 138, 12);
        noStroke();
        rect(x, y, w, h);

        if (!disableGrass) {
            var noiseScale = 0.55;
            var wx = (w - 6) / 4, hx = (h - 6) / 4, v__ = 3, v__m = 60;
            // TOP
            for (var i = 0; i < wx; i++) {
                var vx = x + 5 + i * 4;
                var w1 = pow(noise((vx + x) * noiseScale, 1), v__) * v__m * 2;
                var h1 = pow(noise((vx + y) * noiseScale, 1), v__) * v__m;
                triangle(vx - w1 / 4, y, vx + w1 / 4, y, vx, y - h1);
            }
            // BOTTOM
            for (var i = 0; i < wx; i++) {
                var vx = x + 5 + i * 4;
                var w1 = pow(noise((vx + x) * noiseScale, 30), v__) * v__m * 2;
                var h1 = pow(noise((vx + y) * noiseScale, 1), v__) * v__m;
                triangle(vx - w1 / 4, y + h, vx + w1 / 4, y + h, vx, y + h + h1);
            }
            // LEFT
            for (var i = 0; i < hx; i++) {
                var vy = y + 5 + i * 4;
                var w1 = pow(noise((vy + x) * noiseScale, 30), v__) * v__m * 2;
                var h1 = pow(noise((vy + y) * noiseScale, 1), v__) * v__m;
                triangle(x, vy - w1 / 4, x, vy + w1 / 4, x - h1, vy);
            }
            // RIGHT
            for (var i = 0; i < hx; i++) {
                var vy = y + 5 + i * 4;
                var w1 = pow(noise((vy + x) * noiseScale, 30), v__) * v__m * 2;
                var h1 = pow(noise((vy + y) * noiseScale, 1), v__) * v__m;
                triangle(x + w, vy - w1 / 4, x + w, vy + w1 / 4, x + w + h1, vy);
            }
        }
    }
    function ChangeCheck() {
        if (Collide(mr_spunky.x, mr_spunky.y, -20, 0, 20, 400)) {
            if (mr_spunky.level_number % 3 !== 0) {
                mr_spunky.level_number--;
                mr_spunky.x = 380;
                playSound(getSound("rpg/battle-swing"));
            }
        }
        if (Collide(mr_spunky.x, mr_spunky.y, 400, 0, 20, 400)) {
            if ((mr_spunky.level_number + 1) % 3 !== 0) {
                mr_spunky.level_number++;
                mr_spunky.x = 20;
                playSound(getSound("rpg/battle-swing"));
            }
        }
        if (Collide(mr_spunky.x, mr_spunky.y, 0, -20, 400, 20)) {
            if ((mr_spunky.level_number - 3) >= 0) {
                mr_spunky.level_number -= 3;
                mr_spunky.y = 380;
                playSound(getSound("rpg/battle-swing"));
            }
        }
        if (Collide(mr_spunky.x, mr_spunky.y, 0, 400, 400, 20)) {
            if ((mr_spunky.level_number + 3) < 9) {
                mr_spunky.level_number += 3;
                mr_spunky.y = 20;
                playSound(getSound("rpg/battle-swing"));
            }
        }
    }
    // }

    // PLOT STUFF {
    function applyParticleEffectsToPlots() {
        if (!plots || !particles || plots.length === 0) return;
        // determine grid origin and cell size from first plot
        var p0 = plots[0];
        var originX = typeof p0.x === "number" ? p0.x : 30;
        var originY = typeof p0.y === "number" ? p0.y : 30;
        var cellW = (p0.w || 30) + 1;
        var cellH = (p0.h || 30) + 1;
        // compute columns from your layout; you used 5 columns when creating plots
        var cols = 5;

        // clear any transient marks on plots that are handled per-frame
        for (var pi = 0; pi < plots.length; pi++) {
            // optional: if you use transient flags, reset them here
            // e.g., plots[pi].__wateredThisFrame = false;
        }

        for (var i = 0; i < particles.length; i++) {
            var prt = particles[i];
            if (!prt) continue;
            // approximate column/row from particle center
            var col = Math.floor((prt.x - originX) / cellW);
            var row = Math.floor((prt.y - originY) / cellH);
            if (col < 0 || row < 0 || col >= cols) continue;
            var idx = row * cols + col;
            if (idx < 0 || idx >= plots.length) continue;
            var plot = plots[idx];
            if (!plot) continue;

            // leafers give growth boost once per particle (mark used to avoid repeat)
            if (prt.type === "leafers" && !prt.used) {
                var rate = {
                    "empty": 0,
                    "wheat seeds": 0.001
                }[plot.type] || 0;
                if (plot.growth > 0 && rate > 0) {
                    plot.growth += rate * 100;
                    plot.growth = constrain(plot.growth, 0, 3);
                    prt.used = true;
                }
            }

            // aqualine waters the plot (single-frame effect) and retires the particle
            if (prt.type === "aqualine") {
                if (!plot.watered) {
                    plot.watered = true;
                }
                // retire particle immediately (or set life=0 so it gets removed)
                prt.life = 0;
            }

            // add other particle-to-plot interactions here as needed
        }
    }

    // rewritten Plot that no longer scans the whole particles array in tick()
    var Plot = (function () {
        var constructor = function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.growth = 0;
            this.watered = false;
            this.tilled = false;
            this.type = "empty";
            this.__harvest = 0;

            this.return = {
                "wheat seeds": "wheat"
            };
        };
        constructor.prototype = {
            tick: function () {
                var rate = {
                    "empty": 0,
                    "wheat seeds": 0.001
                }[this.type];
                // growth from watering only; particle effects are applied globally by applyParticleEffectsToPlots()
                if (this.watered) {
                    this.growth += random(0, rate);
                    this.growth = constrain(this.growth, 0, 3);
                }
                // optional: natural decay of watered flag after some time/logic (if you had that)
            },
            till: function () {
                if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50) {
                    if (Collide(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
                        if (mouseIsPressed && mouseButton === RIGHT) {
                            if (this.type === "empty" && !this.tilled) {
                                var hand = mr_spunky.inventory.items[Math.round(mr_spunky.inventory.hover)];
                                if (hand && hand.data && hand.data.canTill) {
                                    this.tilled = true;
                                    mr_spunky.animation = hand.label;
                                    loot_tables.pick("farming", "tilling");
                                }
                            }
                        }
                    }
                }
            },
            plant: function () {
                if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50) {
                    if (Collide(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
                        if (mouseIsPressed && mouseButton === RIGHT) {
                            if (this.type === "empty" && this.tilled) {
                                var hand = mr_spunky.inventory.items[Math.round(mr_spunky.inventory.hover)];
                                if (!hand) return;
                                if (hand.count > 0 && hand.data && hand.data.isPlantable) {
                                    this.type = hand.label;
                                    this.growth = 0;
                                    hand.count--;
                                    if (hand.count < 1) {
                                        hand.set_label("blank");
                                    }
                                    if (random(0, 100) <= 5) {
                                        Particle_Emitter("skill-point", ("+1 farming"),
                                            mr_spunky.x + 40, mr_spunky.y + 10
                                        );
                                        mr_spunky.skills.farming += 1 / (mr_spunky.skills.farming * 10);
                                    }
                                }
                            }
                        }
                    }
                }
            },
            yield: function () {
                var ret = this.return[this.type] || [];
                if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50) {
                    if (Collide(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
                        if (mouseIsPressed) {
                            var hand = mr_spunky.inventory.items[Math.round(mr_spunky.inventory.hover)];
                            if (!hand || !hand.data) return;
                            if (this.growth >= 3 && hand.data.canHarvest) {
                                loot_tables.pick("farming", "yield");
                                loot_tables.pick("crops", this.return[this.type]);
                                this.type = "empty";
                                this.growth = 0;
                                this.tilled = false;
                                this.watered = false;
                                mr_spunky.animation = hand.label;
                            }
                        }
                    }
                }
            },
            // watering() no longer scans particles; handled by applyParticleEffectsToPlots()
            watering: function () { /* handled globally */ },
            draw: function () {
                pushMatrix();
                translate(this.x, this.y);
                scale(this.w / 400, this.h / 400);
                noStroke();
                fill(204, 156, 43);
                rect(0, 0, 400, 400);
                if (this.tilled) {
                    fill(179, 134, 30);
                    rect(0, 0, 400, 400);
                }
                if (this.watered) {
                    fill(38, 204, 204, 50);
                    ellipse(200, 200, 300, 300);
                }
                if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50) {
                    fill(0, 255, 0, 0);
                    stroke(0, 255, 0, 50);
                    strokeWeight(40);
                    rect(0, 0, 400, 400);
                }
                switch (this.type) {
                    case "wheat seeds":
                        switch (floor(this.growth)) {
                            case 0:
                                noStroke();
                                fill(154, 186, 24);
                                ellipse(97, 214, 20, 20);
                                ellipse(201, 211, 20, 20);
                                ellipse(171, 282, 20, 20);
                                ellipse(158, 246, 20, 20);
                                ellipse(198, 238, 20, 20);
                                ellipse(211, 232, 20, 20);
                                ellipse(233, 247, 20, 20);
                                ellipse(257, 243, 20, 20);
                                ellipse(227, 214, 20, 20);
                                ellipse(254, 202, 20, 20);
                                ellipse(171, 170, 20, 20);
                                ellipse(127, 160, 20, 20);
                                ellipse(97, 152, 20, 20);
                                ellipse(61, 179, 20, 20);
                                ellipse(76, 230, 20, 20);
                                ellipse(74, 228, 20, 20);
                                ellipse(64, 117, 20, 20);
                                ellipse(148, 100, 20, 20);
                                ellipse(270, 62, 20, 20);
                                ellipse(213, 58, 20, 20);
                                ellipse(108, 68, 20, 20);
                                ellipse(288, 146, 20, 20);
                                ellipse(304, 224, 20, 20);
                                ellipse(323, 306, 20, 20);
                                ellipse(104, 321, 20, 20);
                                ellipse(85, 308, 20, 20);
                                ellipse(100, 333, 20, 20);
                                ellipse(74, 324, 20, 20);
                                ellipse(187, 219, 20, 20);
                                ellipse(108, 176, 20, 20);
                                ellipse(214, 109, 20, 20);
                                break;
                            case 1:
                                strokeWeight(6);
                                stroke(106, 145, 0);
                                line(76, 195, 76, 135);
                                line(219, 161, 219, 101);
                                line(180, 234, 180, 174);
                                line(128, 257, 128, 197);
                                line(148, 199, 148, 139);
                                line(184, 146, 184, 86);
                                line(118, 126, 118, 66);
                                line(295, 132, 295, 72);
                                line(321, 223, 321, 163);
                                line(294, 268, 294, 208);
                                line(160, 336, 160, 276);
                                line(62, 312, 62, 252);
                                line(75, 235, 75, 175);
                                line(296, 201, 296, 141);
                                line(177, 308, 177, 248);
                                line(102, 255, 102, 195);
                                line(120, 179, 120, 119);
                                line(35, 206, 35, 146);
                                line(123, 146, 123, 86);
                                line(337, 131, 337, 71);
                                line(284, 240, 284, 180);
                                line(158, 143, 158, 83);
                                line(157, 108, 157, 48);
                                line(159, 108, 159, 48);
                                break;
                            case 2:
                                strokeWeight(8);
                                stroke(173, 194, 17);
                                line(110, 252, 110, 162);
                                line(87, 195, 87, 105);
                                line(241, 184, 241, 94);
                                line(166, 266, 166, 176);
                                line(154, 183, 154, 93);
                                line(191, 136, 191, 46);
                                line(105, 143, 105, 53);
                                line(212, 110, 212, 20);
                                line(260, 166, 260, 76);
                                line(398, 279, 398, 189);
                                line(213, 316, 213, 226);
                                line(259, 292, 259, 202);
                                line(371, 188, 371, 98);
                                line(293, 198, 293, 108);
                                line(256, 137, 256, 47);
                                line(308, 177, 308, 87);
                                line(243, 120, 243, 30);
                                line(133, 126, 133, 36);
                                line(54, 117, 54, 27);
                                line(82, 93, 82, 3);
                                line(142, 120, 142, 30);
                                line(120, 56, 120, -34);
                                line(159, 126, 159, 36);
                                line(196, 144, 196, 54);
                                line(178, 68, 178, -22);
                                line(237, 114, 237, 24);
                                line(292, 123, 292, 33);
                                line(289, 188, 289, 98);
                                line(119, 247, 119, 157);
                                line(10, 293, 10, 203);
                                line(42, 233, 42, 143);
                                line(66, 301, 66, 211);
                                line(77, 337, 77, 247);
                                line(136, 360, 136, 270);
                                line(276, 341, 276, 251);
                                line(307, 326, 307, 236);
                                line(313, 250, 313, 160);
                                line(125, 240, 125, 150);
                                line(83, 157, 83, 67);
                                line(91, 139, 91, 49);
                                line(198, 106, 198, 16);
                                line(301, 121, 301, 31);
                                line(271, 196, 271, 106);
                                line(204, 236, 204, 146);
                                break;
                            case 3:
                                strokeWeight(8);
                                stroke(235, 204, 50);
                                line(246, 268, 246, 138);
                                line(189, 283, 189, 153);
                                line(182, 177, 182, 47);
                                line(97, 262, 97, 132);
                                line(61, 165, 61, 35);
                                line(71, 230, 71, 100);
                                line(100, 189, 100, 59);
                                line(92, 127, 92, -3);
                                line(186, 111, 186, -19);
                                line(96, 82, 96, -48);
                                line(75, 67, 75, -63);
                                line(186, 49, 186, -81);
                                line(242, 58, 242, -72);
                                line(328, 83, 328, -47);
                                line(340, 149, 340, 19);
                                line(318, 189, 318, 59);
                                line(255, 218, 255, 88);
                                line(260, 262, 260, 132);
                                line(189, 261, 189, 131);
                                line(88, 175, 88, 45);
                                line(230, 128, 230, -2);
                                line(133, 88, 133, -42);
                                line(296, 132, 296, 2);
                                line(254, 162, 254, 32);
                                line(140, 325, 140, 195);
                                line(81, 315, 81, 185);
                                line(95, 307, 95, 177);
                                line(123, 320, 123, 190);
                                line(51, 337, 51, 207);
                                line(114, 297, 114, 167);
                                line(63, 205, 63, 75);
                                line(53, 141, 53, 11);
                                line(70, 68, 70, -62);
                                line(113, 59, 113, -71);
                                line(222, 76, 222, -54);
                                line(135, 130, 135, 0);
                                line(149, 167, 149, 37);
                                line(102, 246, 102, 116);
                                line(109, 268, 109, 138);
                                line(235, 313, 235, 183);
                                line(264, 340, 264, 210);
                                line(199, 337, 199, 207);
                                line(318, 324, 318, 194);
                                line(336, 265, 336, 135);
                                line(269, 206, 269, 76);
                                line(179, 143, 179, 13);
                                line(270, 96, 270, -34);
                                line(297, 81, 297, -49);
                                line(290, 215, 290, 85);
                                line(277, 252, 277, 122);
                                break;
                        }
                        break;
                }
                popMatrix();
            }
        };
        return constructor;
    })();
    for (var i = 0; i < 50; i++) {
        plots.push(Plot.new(30 + (i % 5) * 31, 30 + (floor(i / 5)) * 31, 30, 30));
    }
    // }

    // ** ORE STUFF ** {
    var Ore = (function () {
        var constructor = function (lvl_num, x, y, w, h) {
            this.level_num = lvl_num;
            this.type = "empty";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.__emitted = false;
            this.__item = Item.new("blank", 1);
            var choice = spawn_tables.pick("ores", this.level_num);
            this.__item.label = choice.type;

            this.__mining = 0;
            this.growth = 1;
            this.__rate = {
                "topaz": 0.0005,
                "amethyst": 0.0005,
                "aquamarine": 0.0005,
                "emerald": 0.0001,
                "sapphire": 0.0001,
                "ruby": 0.0001,
                "diamond": 0.0001,
                "calcite": 0.0005,
                "quartz": 0.001,
                "periodot": 0.0001,
                "garnet": 0.0001,
                "tanzanite": 0.00005
            };
        };
        constructor.prototype = {
            tick: function () {
                this.growth += random(0, this.__rate[this.__item.label]);
                //this.growth += 0.01;
                if (this.growth > 1) {
                    this.growth = 1;
                    if (!this.__emitted && this.level_num === mr_spunky.level_number) {
                        Particle_Emitter("ore-finished", 10,
                            this.x + this.w / 2, this.y + this.h / 2
                        );
                        this.__emitted = true;
                    }
                }
            },
            mine: function () {
                if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50) {
                    if (Collide(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
                        if (mouseIsPressed && mouseButton === LEFT) {
                            if (this.growth >= 1) {
                                if (mr_spunky.inventory.testHover("pickaxe", { condition: "=", value: 1 }, {})) {
                                    this.__mining += (mr_spunky.inventory.items[round(mr_spunky.inventory.hover)].data.mining_speed || 1) * mr_spunky.strength;
                                    mr_spunky.animation = "pickaxe";
                                }
                            }
                        } else {
                            this.__mining -= 0.5;
                            this.__mining = max(0, this.__mining);
                        }
                    } else {
                        this.__mining -= 0.5;
                        this.__mining = max(0, this.__mining);
                    }
                } else {
                    this.__mining -= 0.5;
                    this.__mining = max(0, this.__mining);
                }
                if (this.__mining > 100) {
                    loot_tables.pick("mining", this.__item.label);
                    this.__mining = 0;
                    this.growth = 0;
                    var choice = spawn_tables.pick("ores", this.level_num);
                    this.__item.label = choice.type;
                    this.__emitted = false;
                    if (this.level_num === mr_spunky.level_number) {
                        Particle_Emitter("ore-break", 10,
                            this.x + this.w / 2, this.y + this.h / 2
                        );
                        playSound(getSound("rpg/step-heavy"));
                    }
                }
            },
            draw: function () {
                noStroke();
                /*fill(255, 100);
                rect(this.x, this.y, this.w, this.h);*/
                if (this.growth === 1) {
                    for (var i = 0; i < 20; i++) {
                        fill(0, 255, 0, i / 20 * 20);
                        ellipse(this.x + this.w / 2, this.y + this.h / 2, 2 * i, 2 * i);
                    }
                }
                pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.growth / 3);
                this.__item.draw(-200, -250, 400, 400);
                popMatrix();
                if (this.__mining > 0) {
                    fill(255, 150);
                    arc(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, -90, -90 + 360 * this.__mining / 100);
                }
            },
            collide: function () {
                if (this.growth > 0.6) {
                    var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x, this.y, this.w, this.h);
                    if (col[2]) {
                        mr_spunky.x = col[0];
                        mr_spunky.y = col[1];
                    }
                }
            }
        };
        return constructor;
    })();
    // Generate Ore Deposits {
    ores[5] = ores[5].concat([
        Ore.new(5, 350, 350, 40, 40),
        Ore.new(5, 200, 370, 40, 40),
        Ore.new(5, 280, 290, 40, 40),
        Ore.new(5, 320, 130, 40, 40),
    ]);
    ores[7] = ores[7].concat([
        Ore.new(7, 40, 250, 40, 40),
        Ore.new(7, 20, 320, 40, 40),
        Ore.new(7, 120, 220, 40, 40),
        Ore.new(7, 70, 310, 40, 40),
        Ore.new(7, 260, 210, 40, 40),
        Ore.new(7, 190, 240, 40, 40),
        Ore.new(7, 260, 330, 40, 40),
        Ore.new(7, 330, 310, 40, 40),
    ]);
    ores[8] = ores[8].concat([
        Ore.new(8, 330, 380, 40, 40),
        Ore.new(8, 180, 370, 40, 40),
        Ore.new(8, 270, 295, 40, 40),
        Ore.new(8, 320, 100, 40, 40),
        Ore.new(8, 50, 160, 40, 40),
        Ore.new(8, 20, 270, 40, 40),
        Ore.new(8, 180, 190, 40, 40),
        Ore.new(8, 120, 30, 40, 40),
        Ore.new(8, 30, 50, 40, 40),
        Ore.new(8, 210, 210, 40, 40),
    ]);
    // }
    // }

    // ** STATIC DECOR STUFF ** {
    function BushLine(lvl, x1, y1, x2, y2) {
        var w = 40;
        var a = atan2(y2 - y1, x2 - x1);
        var d = dist(x1, y1, x2, y2);
        var sep = d / floor(d / w), num = floor(d / w);
        (Array.new(num)).fill(0).forEach(function (_, i) {
            decor[lvl].push({
                "type": "bush",
                x: x1 + sep * i * cos(a),
                y: y1 + sep * i * sin(a),
                draw: function () {
                    Bush(this.x - (w * 1.5) / 2, this.y - (w * 1.5) / 2, w * 1.5, w * 1.5);
                }
            });
        });
    }
    function TreePush(lvl, stage, x, y, w, h, ss) {
        decor[lvl].push({
            "type": "tree",
            stage: stage,
            x: x,
            y: y,
            ss: ss || 30,
            decor_collision: true,
            __randomTint: [37 + random(-20, 10), 143 + random(-30, 15), 20 + random(-10, 10)],
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - 20, this.y - 20, 40, 40);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                fill(0, 50);
                ellipse(x + 1, y + 18, this.ss, this.ss / 2);
                Tree_Sprite(this.stage, x, y + 20, w, h, {
                    leaves: color.apply(null, this.__randomTint)
                });
            }
        });
    }
    function HousePush(lvl, x, y) {
        decor[lvl].push({
            "type": "house",
            x: x,
            y: y,
            draw: function () {
                image(House, this.x, this.y - 265, 350, 350);
                if (!mr_spunky.house_unlocked) {
                    fill(0, 200);
                    rect(this.x + 118, this.y - 58, 24, 50);
                    pushMatrix();
                    translate(this.x + 150, this.y - 180);
                    scale(0.6);
                    translate(-250, -190);
                    fill(61, 59, 61);
                    noStroke();
                    beginShape();
                    vertex(192, 151);
                    vertex(221, 141);
                    vertex(235, 125);
                    vertex(233, 118);
                    vertex(256, 116);
                    vertex(259, 118);
                    vertex(270, 131);
                    vertex(259, 145);
                    vertex(252, 161);
                    vertex(275, 185);
                    vertex(270, 194);
                    vertex(248, 202);
                    vertex(229, 221);
                    vertex(216, 236);
                    vertex(196, 231);
                    vertex(208, 216);
                    vertex(199, 199);
                    vertex(188, 184);
                    vertex(183, 181);
                    vertex(170, 168);
                    vertex(182, 159);
                    vertex(192, 163);
                    vertex(193, 156);
                    endShape();
                    popMatrix();
                    pushMatrix();
                    translate(this.x + 138, this.y - 30);
                    rotate(30);
                    fill(92, 55, 0);
                    rect(-15, -30, 10, 60);
                    popMatrix();
                } else {
                    house_smoke.run();
                }
            }
        });
    }
    function CouchPush(lvl, x, y) {
        decor[lvl].push({
            "type": "couch",
            x: x,
            y: y,
            w: 130,
            h: 100,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - 20, this.y - this.h + 70, this.w + 20, this.h);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                fill(255);
                //rect(this.x - 10, this.y - this.h + 80, this.w, this.h);
                Couch(this.x - 20, this.y - 70, 150, 150);
            }
        });
    }
    function LampPush(lvl, x, y, w, h, ht) {
        __lights[lvl].push({
            x: x,
            y: y - (ht * h / 400) + 50,
            size: 150,
            intensity: 130
        });
        decor[lvl].push({
            "type": "lamp",
            x: x,
            y: y,
            w: w,
            h: h,
            height: ht,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 5, this.y - this.h / 8 + 50, this.w / 2.5, this.h / 2.5);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 5, this.y - this.h / 8 + 50, this.w / 2.5, this.h / 2.5);
                Lamp(this.x, this.y + 50, this.w, this.h, this.height);
            }
        });
    }
    function PushSkills_Statue(lvl, x, y, w, h) {
        decor[lvl].push({
            "type": "statue",
            x: x,
            y: y,
            w: w,
            h: h,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 1.5, this.y - this.h / 1.5 + 20, this.w * 1.3, this.h / 1.1);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 1.5, this.y - this.h / 1.5 + 20, this.w * 1.3, this.h / 1.1);
                Skills_Statue(this.x, this.y + 20, this.w, this.h);
                if (dist(this.x, this.y, mr_spunky.x, mr_spunky.y) < 50) {
                    textAlign(CENTER);
                    textSize(10);
                    fill(255);
                    text("[SPACE]", this.x, this.y - 40);
                    if (keyIsPressed && (key || {}).toString() === " ") {
                        mr_spunky.skill_menu_open = true;
                    }
                }
            }
        });

    }
    function PushHome_Storage(lvl, x, y, w, h) {
        decor[lvl].push({
            "type": "home-storage",
            x: x,
            y: y,
            w: w,
            h: h,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 1.5, this.y - this.h / 1.5 + 40, this.w * 1.3, this.h / 1.1);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 1.5, this.y - this.h / 1.5 + 20, this.w * 1.3, this.h / 1.1);
                strokeWeight(1);
                Chest(this.x - 11, this.y - 5, this.w, this.h);
                if (dist(this.x - 11 + this.w / 2, this.y + this.h / 2 - 5, mr_spunky.x, mr_spunky.y) < 50) {
                    textAlign(CENTER);
                    textSize(10);
                    fill(255);
                    text("[SPACE]", this.x + this.w / 2.9, this.y);
                    if (keyIsPressed && (key || {}).toString() === " ") {
                        mr_spunky.home_storage.is_open = true;
                    }
                }
            }
        });

    }
    function PushUpgradeVillager(lvl, x, y, w, h) {
        decor[lvl].push({
            "type": "unlock-villager",
            x: x,
            y: y,
            w: w,
            h: h,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 2, this.y - this.h / 2 + 10, this.w, this.h);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
                image(getImage("creatures/Winston"),
                    this.x - this.w / 2, this.y - this.h / 2 + 10,
                    this.w, this.h
                );
                if (dist(this.x, this.y, mr_spunky.x, mr_spunky.y) < 50) {
                    textAlign(CENTER);
                    textSize(10);
                    fill(255);
                    text("[SPACE]", this.x, this.y - this.h / 3);
                    if (keyIsPressed && (key || {}).toString() === " ") {
                        mr_spunky.avatar_menu_open = true;
                    }
                }
            }
        });
    }
    function PushHelpVillager(lvl, x, y, w, h) {
        decor[lvl].push({
            "type": "help-villager",
            x: x,
            y: y,
            w: w,
            h: h,
            decor_collision: true,
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 2, this.y - this.h / 2 + 10, this.w, this.h);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }
            },
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
                image(getImage("creatures/OhNoes-Happy"),
                    this.x - this.w / 2, this.y - this.h / 2 + 10,
                    this.w, this.h
                );
                if (dist(this.x, this.y, mr_spunky.x, mr_spunky.y) < 50) {
                    textAlign(CENTER);
                    textSize(10);
                    fill(255);
                    text("HELP\n[SPACE]", this.x, this.y - this.h / 2);
                    if (keyIsPressed && (key || {}).toString() === " ") {
                        mr_spunky.help_menu_open = true;
                    }
                }
            }
        });
    }
    function PushTorch(lvl, x, y) {
        __lights[lvl].push({
            x: x,
            y: y,
            size: 150,
            intensity: 130
        });
        decor[lvl].push({
            "type": "torch",
            x: x,
            y: y,
            draw: function () {
                noStroke();
                fill(255, 0, 0);
                //rect(this.x - this.w / 5, this.y - this.h / 8 + 50, this.w / 2.5, this.h / 2.5);
                Torch(this.x - 16, this.y - 22);
            }
        });
    }

    // Decor {

    // 9
    CouchPush(9, 200, 250);
    LampPush(9, 335, 215, 120, 120, 152);
    PushSkills_Statue(9, 80, 310, 50, 50);
    PushHome_Storage(9, 50, 40, 80, 80);

    // 0
    BushLine(0, 60, 275, 60, 440);
    BushLine(0, -60, 275, 60, 275);
    BushLine(0, 312, 275, 440, 275);
    BushLine(0, 270, 275, 270, 440);
    TreePush(0, 1, 10, 330, 150, 150);
    TreePush(0, 0, 370, 300, 150, 150);

    // 3
    BushLine(3, 60, -40, 60, 440);
    BushLine(3, 270, -50, 270, 190);
    BushLine(3, 315, 150, 450, 150);
    BushLine(3, 315, 260, 450, 260);
    BushLine(3, 270, -50 + 310, 270, 190 + 310);
    TreePush(3, 2, 10, 100, 50, 50, 70);
    TreePush(3, 1, 25, 150, 100, 100, 40);
    TreePush(3, 2, -2, 230, 50, 50, 70);
    TreePush(3, 0, 19, 280, 150, 150, 40);
    TreePush(3, 2, 30, 340, 50, 50, 40);
    TreePush(3, 2, -15, 370, 50, 50, 40);
    TreePush(3, 2, 310, 100, 50, 50, 40);
    TreePush(3, 2, 355, 120, 50, 50, 70);
    TreePush(3, 2, 300, 50, 50, 50, 70);

    // 4
    BushLine(4, 140, 110, 140, -50);
    BushLine(4, -40, 145, 185, 145);

    BushLine(4, 140 + 130, 110, 140 + 130, -50);
    BushLine(4, 270, 150, 450, 150);

    BushLine(4, -40, 255, 185, 255);
    BushLine(4, 140, 255 + 35, 140, 450);
    BushLine(4, 270, 255, 440, 255);
    BushLine(4, 270, 255 + 35, 270, 450);

    TreePush(4, 2, -5, 30, 50, 50, 70);
    TreePush(4, 2, 60, 70, 50, 50, 70);
    TreePush(4, 2, 90, 100, 50, 50, 70);
    TreePush(4, 2, 20, 120, 50, 50, 70);

    TreePush(4, 2, 300, 70, 50, 50, 70);
    TreePush(4, 2, 320, 100, 50, 50, 70);
    TreePush(4, 2, 360, 120, 50, 50, 70);
    TreePush(4, 1, 300, 125, 100, 100, 40);

    TreePush(4, 2, 50, 320, 50, 50, 70);
    TreePush(4, 1, 80, 290, 100, 100, 70);
    TreePush(4, 2, -5, 370, 50, 50, 70);
    TreePush(4, 2, 90, 390, 50, 50, 70);

    TreePush(4, 2, 320, 320, 50, 50, 70);
    TreePush(4, 0, 370, 330, 150, 150, 70);
    TreePush(4, 2, 360, 290, 50, 50, 70);
    TreePush(4, 1, 330, 370, 100, 100, 70);
    PushHelpVillager(4, 75, 155, 40, 40);

    // 5
    BushLine(5, -40, 145, 220, 145);
    BushLine(5, -40, 255, 160, 255);
    BushLine(5, 120, 255 + 35, 120, 255 + 120);

    TreePush(5, 2, -10, 300, 50, 50, 70);
    TreePush(5, 1, 80, 290, 120, 120, 50);
    TreePush(5, 2, 50, 350, 50, 50, 70);

    TreePush(5, 2, 50, 100, 50, 50, 70);
    TreePush(5, 1, 10, 60, 120, 120, 50);
    TreePush(5, 0, 70, 70, 150, 150, 40);
    TreePush(5, 2, 80, 30, 50, 50, 70);
    TreePush(5, 2, 120, 105, 50, 50, 70);
    TreePush(5, 2, 140, 45, 50, 50, 70);
    TreePush(5, 2, 160, 80, 50, 50, 70);
    TreePush(5, 1, 180, 110, 120, 120, 60);
    TreePush(5, 2, 210, 70, 50, 50, 70);
    TreePush(5, 2, 230, 30, 50, 50, 70);
    TreePush(5, 0, 255, 50, 100, 100, 40);
    TreePush(5, 2, 290, 35, 50, 50, 70);
    TreePush(5, 2, 330, 25, 50, 50, 70);

    PushTorch(5, 300, 120);
    PushTorch(5, 380, 290);
    PushTorch(5, 180, 370);

    // 6
    BushLine(6, 0, -40, 0, 440);
    BushLine(6, 0, -5, 100, -5);
    BushLine(6, 270, -40, 270, 80);
    BushLine(6, 310, 40, 440, 40);
    HousePush(6, 200, 315);
    BushLine(6, 335, 315, 375, 315);
    TreePush(6, 2, 370, 360, 50, 50, 70);

    // 7
    PushTorch(7, 50, 220);
    PushTorch(7, 180, 340);
    PushTorch(7, 350, 180);
    PushUpgradeVillager(7, 200, 100, 40, 40);

    // 8
    PushTorch(8, 300, 120);
    PushTorch(8, 130, 290);
    PushTorch(8, 80, 90);

    // }

    // }

    // ** TREE STUFF ** {
    var Tree = (function () {
        var constructor = function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.chopping = 0;
            this.growth = 0;
            this.wood_drops = 1;
            this.__emitted = false;
            this.__shake = 0;
            this.__growthInterval = 30;
            this.__randomMaxGrowth = random(145, 158);
            this.__randomTint = [37 + random(-20, 10), 143 + random(-30, 15), 20 + random(-10, 10)];
        };
        constructor.prototype = {
            update: function () {
                this.growth += 1 / this.__growthInterval;
            },
            chop: function () {
                this.chopping = constrain(this.chopping, 0, Infinity);
                var inHand = mr_spunky.inventory.items[round(mr_spunky.inventory.hover)];
                if (mouseIsPressed && inHand.data.canChop) {
                    if (Collide(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
                        if (dist(mr_spunky.x, mr_spunky.y, this.x + this.w / 2, this.y + this.h / 2) < 50 && this.growth >= this.__randomMaxGrowth) {
                            this.chopping += inHand.data.choppingSpeed || 1;
                            mr_spunky.animation = inHand.label;
                            this.__shake = 5;
                        }
                    }
                } else {
                    this.chopping--;
                }
                if (this.chopping > 120) {
                    Particle_Emitter("tree-break", 10, this.x + this.w / 2, this.y + this.h / 2);
                    loot_tables.pick("woodcutting", "tree");
                    playSound(getSound("rpg/step-heavy"));
                    return true;
                }
                return false;
            },
            shadow: function () {
                fill(0, 0, 0, 50);
                ellipse(this.x + this.w / 2, this.y + this.h / 2, this.growth / 3, this.growth / 6);
            },
            collide: function (obj) {
                var col = Hitbox(obj.x + (obj.w || 0) / 2, obj.y + (obj.h || 0) / 2, this.x, this.y, this.w, this.h);
                if (col[2]) {
                    obj.colliding = true;
                    obj.x = col[0] - (obj.w || 0) / 2;
                    obj.y = col[1] - (obj.h || 0) / 2;
                }
            },
            draw: function () {
                /**var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x, this.y, this.w, this.h);
                if (col[2]) {
                    mr_spunky.x = col[0];
                    mr_spunky.y = col[1];
                }**/

                var opacity = 255;
                var rt = this.__randomTint;

                if (this.growth >= this.__randomMaxGrowth && !this.__emitted) {
                    Particle_Emitter("ore-finished", 10,
                        this.x + this.w / 2, this.y + this.h / 2
                    );
                    this.__emitted = true;
                }
                this.growth = constrain(this.growth, 0, this.__randomMaxGrowth);
                //var r = ((this.growth % 60) / 100 + this.growth / 240) * 60;
                if (mr_spunky.x > this.x + this.w / 2 - (this.growth * 0.2) && mr_spunky.x < this.x + this.w / 2 + (this.growth * 0.2)) {
                    if (mr_spunky.y <= this.y + this.h / 2 && mr_spunky.y > this.y + this.h / 2 - this.growth * 0.6) {
                        opacity = 50;
                    }
                }
                this.__shake /= 1.04;

                if (this.growth < this.__randomMaxGrowth * 0.7) {
                    pushMatrix();
                    translate(this.x + this.w / 2, this.y + this.h / 1.8);
                    rotate(this.__shake * cos(frameCount * 10));
                    noStroke();
                    Tree_Sprite(
                        0,
                        0, 0,
                        this.growth, this.growth,
                        {
                            leaves: color(rt[0], rt[1], rt[2], opacity),
                            branches_light: color(122, 63, 0, opacity),
                        }
                    );
                    popMatrix();
                } else if (this.growth < this.__randomMaxGrowth * 0.9) {
                    pushMatrix();
                    translate(this.x + this.w / 2, this.y + this.h / 1.8);
                    rotate(this.__shake * cos(frameCount * 10));
                    noStroke();
                    Tree_Sprite(
                        1,
                        0, 0,
                        this.growth - 40 * this.__randomMaxGrowth / 150,
                        this.growth - 40 * this.__randomMaxGrowth / 150,
                        {
                            leaves: color(rt[0], rt[1], rt[2], opacity),
                            branches_light: color(122, 63, 0, opacity),
                        }
                    );
                    popMatrix();
                } else {
                    pushMatrix();
                    translate(this.x + this.w / 2, this.y + this.h / 1.8);
                    rotate(this.__shake * cos(frameCount * 10));
                    noStroke();
                    Tree_Sprite(
                        2,
                        0, 0,
                        this.growth - 100 * this.__randomMaxGrowth / 150,
                        this.growth - 100 * this.__randomMaxGrowth / 150,
                        {
                            leaves: color(rt[0], rt[1], rt[2], opacity),
                            branches_light: color(122, 63, 0, opacity),
                        }
                    );
                    popMatrix();
                }
                /**
                pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                rotate(this.__shake * cos(frameCount * 10));
                noStroke();
                Tree_Sprite(
                    floor(this.growth / 60), 
                    0, 0,
                    r, r,
                    {
                        leaves : color(rt[0], rt[1], rt[2], opacity),
                        branches_light : color(122, 63, 0, opacity),
                    }
                );
                popMatrix();**/

            }
        };
        return constructor;
    })();
    var pre_spawn = 50;
    function SpawnTrees(i, x, y, w, h, cap) {
        if (showCollisionBoxes) {
            fill(0, 0, 255, 50);
            rect(x + 20, y + 20, w - 80, h - 80);
        }
        if (random(0, 100) < 10) {
            if (trees[i].length < (cap || 20)) {
                if (trees_spawn_timers[i] <= 0) {
                    if (random(0, 100) < 10) {
                        pre_spawn--;
                        trees_spawn_timers[i] = 60 * round(random(5, 20));
                        trees[i].push(Tree.new(x + random(20, w - 80), y + random(20, h - 80), 40, 40));
                    }
                }
            }
        }
        trees[i].sort(function (a, b) {
            return a.y - b.y;
        });
    }
    function UpdateTreeSpawnTimers() {
        var clear = function () { return 0; };
        for (var i = 0; i < trees_spawn_timers.length; i++) {
            var timer = trees_spawn_timers[i];
            if (timer !== undefined) {
                if (pre_spawn > 0) {
                    trees_spawn_timers = trees_spawn_timers.map(clear);
                }
                if (spawn_tables.trees[i] !== undefined) {
                    trees_spawn_timers[i] -= spawn_tables.trees[i].rate;
                }
            }
        }

    }
    // }

    // ** VILLAGER STUFF ** {
    var Villager = (function () {
        var constructor = function (name, variant, messages, x, y, level_number, isStatic) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.w = 50;
            this.h = 75;


            this.variant = variant;
            this.messages = messages;
            this.speed = random(0.5, 1.3);
            this.__isStatic = isStatic || false;
            this.__jump = 0;
            this.__vel = 0;
            this.__gconst = 0.10;
            this.__onsetNode = null;
            this.__level_number = level_number || 0;
            this.__detectionRange = 50;
            this.__idleTime = 0;
            this.__behaviorType = "closest";
        };
        constructor.prototype = {
            AI: function () {
                if (this.__isStatic) {
                    return;
                }
                this.__vel -= this.__gconst;
                this.__jump += this.__vel;
                this.__jump = constrain(this.__jump, 0, Infinity);
                if (this.__jump === 0 && this.__idleTime === 0) {
                    this.__vel = 1.0;
                }

                this.__idleTime--;
                this.__idleTime = constrain(this.__idleTime, 0, Infinity);
                var ctx = this;
                if (this.__onsetNode === null) {
                    var filter_dist = function (node) {
                        if (dist(ctx.x, ctx.y, node[0], node[1]) < 5) {
                            return [10000000, [0, 0]];
                        }
                        return [dist(ctx.x, ctx.y, node[0], node[1]), node];
                    },
                        filter_closest = function (a, b) {
                            return a[0] - b[0];
                        };
                    for (var i = 0; i < villager_nodes[this.__level_number].length; i++) {
                        var ns = villager_nodes[this.__level_number];
                        var n = ns[i];
                        switch (this.__behaviorType) {
                            case "closest":
                                var nodes = ns.map(filter_dist);
                                //println(nodes.join(", \n") + "\n---");
                                nodes.sort(filter_closest);
                                this.__onsetNode = nodes[floor(random(0, 3))][1];
                                break;
                            case "random":
                                var idx = floor(random(0, ns.length));
                                this.__onsetNode = ns[idx];
                                break;
                        }
                    }
                }
                if (this.__onsetNode !== null && this.__idleTime === 0) {
                    var on = this.__onsetNode;
                    var a = atan2(on[1] - this.y, on[0] - this.x);
                    this.x += this.speed * cos(a);
                    this.y += this.speed * sin(a);
                    if (dist(this.x, this.y, on[0], on[1]) <= 1) {
                        this.__idleTime = 60 * random(1, 20);
                        this.__onsetNode = null;
                        if (on[2] !== undefined) {
                            this.__level_number = on[2][0];
                            this.x = on[2][1];
                            this.y = on[2][2];
                        }
                    }
                }
            },
            collide: function () {
                var col = Hitbox(mr_spunky.x, mr_spunky.y, this.x - this.w / 2, this.y - this.h / 4, this.w, this.h / 1.5);
                if (col[2]) {
                    mr_spunky.colliding = true;
                    mr_spunky.x = col[0] - (mr_spunky.w || 0) / 2;
                    mr_spunky.y = col[1] - (mr_spunky.h || 0) / 2;
                }
            },
            draw: function () {
                if (this.__level_number !== mr_spunky.level_number) {
                    return;
                }
                pushMatrix();
                translate(this.x, this.y - this.__jump);
                switch (this.variant) {
                    case "girl-1":
                        image(getImage("cute/CharacterCatGirl"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                    case "girl-2":
                        image(getImage("cute/CharacterHornGirl"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                    case "girl-3":
                        image(getImage("cute/CharacterPrincessGirl"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                    case "girl-4":
                        image(getImage("cute/CharacterPinkGirl"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                    case "boy-1":
                        image(getImage("cute/CharacterBoy"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                    case "test":
                        image(getImage("space/girl3"), -this.w / 2, -this.w, this.w, this.h);
                        break;
                }
                if (dist(mr_spunky.x, mr_spunky.y, this.x, this.y) < this.__detectionRange) {
                    textAlign(CENTER);
                    textFont(FONT_SANS_SERIF);
                    Outlined_Text("[SPACE] To Talk", 0, -this.h / 2.5, 12, color(255), color(0), 1);
                    if (keyIsPressed && (key || {}).toString() === " ") {
                        if (!mr_spunky.dialog.active) {
                            mr_spunky.dialog.enum = this.messages;
                            mr_spunky.dialog.active = true;
                        }
                    }
                }
                popMatrix();
            }
        };
        return constructor;
    })();
    var __villagers = [
        /*Villager.new("girl-1", [
            {   
                msg : "Hey do you want to buy some wood?", 
                buttons : [
                    {
                        text : "2 coins", 
                        callback : function (ctx) {
                            if (mr_spunky.money >= 2) {
                                if (!mr_spunky.inventory.add(Item.new("wood", 1))) {
                                    ctx.current += 3;
                                }
                                mr_spunky.money -= 2;
                                ctx.current++;
                            } else {
                                ctx.current += 2;
                            }
                        }
                    },
                    {
                        text : "Exit",
                        callback : function (ctx) {
                            ctx.current = 5000;
                        }
                    }
                ]
            },
            {   
                msg : "Thank you for doing business!"
            },
            {   
                msg : "Looks like you don't have enough! Sorry!"
            },
            {   
                msg : "Looks like you don't have inventory room... sorry!"
            }
        ], 0, 0, -1),*/
        Villager.new("Elsie", "girl-2", [
            {
                msg: "I'm so glad they sent you here to Khanland! We've all grown a little tired of doing all of this work ourselves...",
                buttons: [
                    { text: "Next" },
                    { text: "Exit", callback: function (ctx) { ctx.current += 4; } }
                ]
            },
            {
                msg: "They sent you to help us, right? Anyways, my name's Elsie! It's so nice to meet you!",
                buttons: "next"

            },
            {
                msg: "You don't talk much, do you?",
                buttons: "next"
            },
            {
                msg: "*Sigh* Maybe one day they'll send somebody who can talk...",
                buttons: "next"
            },
            {
                msg: "Goodbye!",
            },
        ], 0, 0, -1),
        Villager.new("Victoria", "girl-3", [
            {
                msg: "Uh... hi?",
                buttons: [
                    { text: "Next", buttons: "next" },
                    { text: "Exit", callback: function (ctx) { ctx.current += 2; } }
                ],
            },
            {
                msg: "I wish they didn't have to send you guys. I'm sure you could be happy doing something... else.",
                buttons: "next"
            },
            {
                msg: "Enjoy your time with us!"
            }
        ], 0, 0, -1),
        Villager.new("Dyla", "girl-4", [
            {
                msg: "Oh cool, it's one of you!",
                buttons: [
                    { text: "Next", buttons: "next" },
                    { text: "Exit", callback: function (ctx) { ctx.current += 6; } }
                ],
            },
            {
                msg: "You wouldn't happen to have a golden winston, would you? I would like to give one to my friend Elsie for her birthday.",
                buttons: [
                    {
                        text: "1 golden winston",
                        callback: function (ctx) {
                            if (mr_spunky.inventory.remove(Item.new("golden winston", 1))) {
                                /*if (!mr_spunky.inventory.remove(Item.new("golden winston", 1))) {
                                    ctx.current += 3;
                                }*/
                                //mr_spunky.money -= 2;
                                ctx.current += 1;
                            } else {
                                ctx.current += 3;
                            }
                        }
                    },
                ]
            },
            {
                msg: "Thank you so much!! Elsie is going to love this!",
                buttons: "next"
            },
            {
                msg: "Here is some compensation for your trouble!",
                buttons: [
                    {
                        text: "dyla's token",
                        callback: function (ctx) {
                            mr_spunky.inventory.add(Item.new("dyla's token", 1));
                            __villagers.forEach(function (villager) {
                                if (villager.name === "Dyla") {
                                    villager.messages = [
                                        {
                                            msg: "Thank you so much for your help!"
                                        }
                                    ];
                                }
                            });
                            ctx.current += 5000;
                        }
                    },
                ],
            },
            {
                msg: "If you don't have one that is ok..."
            }

        ], 0, 0, -1),
        Villager.new("Erik", "boy-1", [
            {
                msg: "What's up?",
                buttons: [
                    { text: "Next", buttons: "next" },
                    { text: "Exit", callback: function (ctx) { ctx.current += 4; } }
                ],
            },
            {
                msg: "You don't seem like the talkative type.",
                buttons: "next",
            },
            {
                msg: "Well... I've been dying to tell someone that I finally built up the courage to enter the forest and guess what I found?!",
                buttons: "next"
            },
            {
                msg: "My shoes that I left there a year ago! Sure they were covered in some questionable goo, but they still fit just fine!",
                buttons: "next"
            },
            {
                msg: "Heh... I won't waste any more of your time. Bye!",
            }

        ], 0, 0, -1),
        Villager.new("Juno", "boy-1", [
            {
                msg: "Need that boulder removed? I've got equipment to remove it!   \nFor a small bit of compensation.",
                buttons: [
                    {
                        text: "200 coins",
                        callback: function (ctx) {
                            if (mr_spunky.money >= 200) {
                                mr_spunky.mines_unlocked = true;
                                mr_spunky.money -= 200;
                                villagers[5] = [];
                                Particle_Emitter("ore-break", 10, 220, 200);
                                ctx.current++;
                            } else {
                                ctx.current += 2;
                            }
                        }
                    },
                    {
                        text: "Exit",
                        callback: function (ctx) {
                            ctx.current = 5000;
                        }
                    }
                ]
            },
            {
                msg: "Thank you for doing business!"
            },
            {
                msg: "Looks like you don't have enough money! Sorry!"
            }
        ], 190, 280, 5, true),
        Villager.new("Murton", "boy-1", [
            {
                msg: "Hi, I can fix your house for you!     \nFor a fine of course...",
                buttons: [
                    {
                        text: "50 coins",
                        callback: function (ctx) {
                            if (mr_spunky.money >= 50) {
                                mr_spunky.house_unlocked = true;
                                mr_spunky.money -= 50;
                                villagers[6] = [];
                                ctx.current++;
                            } else {
                                ctx.current += 2;
                            }
                        }
                    },
                    {
                        text: "Exit",
                        callback: function (ctx) {
                            ctx.current = 5000;
                        }
                    }
                ]
            },
            {
                msg: "Thank you for doing business!"
            },
            {
                msg: "Looks like you don't have enough money! Sorry!"
            }
        ], 280, 300, 6, true),
    ];
    (function __load_villager_locations__() {
        for (var i = 0; i < __villagers.length; i++) {
            var v = __villagers[i];
            if (v.__isStatic) {
                villagers[v.__level_number].push(v);
                continue;
            }
            var loc = [0, 1, 3, 4][floor(random(0, 4))];
            v.__level_number = loc;
            var rnode = villager_nodes[loc][floor(random(0, villager_nodes[loc].length))];
            v.x = rnode[0];
            v.y = rnode[1];
            villagers[loc].push(v);
        }
    })();
    // }

    // ** ENEMY STUFF ** {
    var Enemy = (function () {
        var constructor = function (x, y, type) {
            this.x = x;
            this.y = y;
            this.w = 80;
            this.h = 80;
            this.type = type;
            this.health = 5;

            this.v = {
                x: 0,
                y: 0
            };
            this.speed = 0;
            this.strength = 0;

            this.__detectionRange = 150;
            this.__attackRange = 30;
            this.__iframes = 0;
            this.__jump = 0;
            this.__vel = 0;
            this.__gconst = 0.25;
            this.a = 0;
            this.__madsquidhasspawned = 0;

            switch (this.type) {
                case "angry-furball":
                    this.speed = random(0.5, 0.8);
                    this.health = 5;
                    this.strength = 1;
                    this.__detectionRange = 150;
                    this.__attackRange = 30;
                    break;
                case "mad-squid":
                    this.w = 70;
                    this.h = 70;
                    this.speed = random(0.3, 0.6);
                    this.health = 10;
                    this.strength = 2;
                    this.__detectionRange = 130;
                    this.__attackRange = 35;
                    break;
                case "mad-squid-small":
                    this.w = 30;
                    this.h = 30;
                    this.speed = random(0.9, 1.5);
                    this.health = 0.5;
                    this.strength = 0.8;
                    this.__detectionRange = 250;
                    this.__attackRange = 25;
                    break;
                case "thunderhead":
                    this.w = 100;
                    this.h = 100;
                    this.speed = random(0.0, 0.2);
                    this.health = 4;
                    this.strength = 2;
                    this.__detectionRange = 120;
                    this.__attackRange = 30;
                    break;
                case "bot":
                    this.w = 150;
                    this.h = 150;
                    this.speed = random(0.6, 0.8);
                    this.health = 15;
                    this.strength = 3.5;
                    this.__detectionRange = 500;
                    this.__attackRange = 60;
                    break;
            }
            //yadadada
        };
        constructor.prototype = {
            AI: function () {
                var m = mr_spunky;
                var a = atan2(m.y - (this.y + this.h / 2), m.x - (this.x + this.w / 2));
                this.a = a;
                this.v.x /= 1.1;
                this.v.y /= 1.1;
                if (this.colliding) {
                    var spd = dist(this.v.x, this.v.y, 0, 0);
                    this.v.x += (spd / 10) * cos(a - 90);
                    this.v.y += (spd / 10) * sin(a - 90);
                }
                this.colliding = false;
                var has_line_of_sight = true;
                for (var i = 0; i < walls[mr_spunky.level_number].length; i++) {
                    var w = walls[mr_spunky.level_number][i];
                    if (!lineofsight(mr_spunky, this, w)) {
                        has_line_of_sight = false;
                    }
                }
                if (dist(m.x, m.y, this.x + this.w / 2, this.y + this.h / 2) < this.__detectionRange && has_line_of_sight) {
                    var s = dist(0, 0, this.v.x, this.v.y);
                    if (this.type !== "bot") {
                        if (s < this.speed) {
                            this.v.x += this.speed * cos(a) / 10;
                            this.v.y += this.speed * sin(a) / 10;
                        }
                    } else {
                        var dx = this.x + this.w / 2 - mr_spunky.x;
                        var dy = this.y + this.h / 2 - mr_spunky.y;
                        if (abs(dx) > abs(dy)) {
                            this.v.x = -dx / abs(dx) * this.speed;
                            this.v.y = 0;
                        }
                        if (abs(dx) < abs(dy)) {
                            this.v.x = 0;
                            this.v.y = -dy / abs(dy) * this.speed;
                        }
                    }
                }
                for (var i = 0; i < walls[mr_spunky.level_number].length; i++) {
                    var w = walls[mr_spunky.level_number][i];
                    wallcol(this, w);
                }

                this.x += this.v.x;
                this.y += this.v.y;
                this.__vel -= this.__gconst;
                this.__jump += this.__vel;
                this.__jump = constrain(this.__jump, 0, Infinity);
                if (this.__jump === 0) {
                    this.__vel = 2.5;
                }
                if (this.type === "mad-squid") {
                    if (random(0, 1000) < 2 && this.__madsquidhasspawned < 10) {
                        enemies[mr_spunky.level_number].push(Enemy.new(
                            this.x + this.w / 2 + random(-10, 10),
                            this.y + this.h / 2 + random(-10, 10),
                            "mad-squid-small"));
                        this.__madsquidhasspawned++;
                    }
                }
                if (dist(m.x, m.y, this.x + this.w / 2, this.y + this.h / 2) < this.__detectionRange) {
                    if (this.type === "thunderhead") {
                        if (random(0, 1000) < 30) {
                            Particle_Emitter(this.type + "-thunder", 4, this.x + this.w / 2, this.y + this.h / 2, this);
                        }
                    }
                }

                // ENEMY DEATH
                if (this.health <= 0) {
                    loot_tables.pick("combat", this.type);
                    Particle_Emitter(this.type, 0, this.x + this.w / 2, this.y + this.h / 2);
                    playSound(getSound("rpg/hit-splat"));
                    return true;
                }
                return false;

            },
            damage: function (amount, iframes) {
                if (this.__iframes === 0) {
                    this.health -= amount;
                    this.__iframes = iframes || 60;
                    Particle_Emitter("damage-enemy", round(amount * 100),
                        this.x + this.w / 2 + random(0, this.w / 2),
                        this.y + this.h / 2 + random(0, this.w / 2)
                    );
                }
            },
            attack: function () {
                this.__iframes--;
                this.__iframes = constrain(this.__iframes, 0, Infinity);
                var m = mr_spunky;
                if (dist(m.x, m.y, this.x + this.w / 2, this.y + this.h / 2) < this.__attackRange) {
                    m.damage(
                        random(this.strength * 0.8, this.strength * 1.2)
                    );
                }
                fill(255, 0, 0);
                //rect(this.x + this.w / 4, this.y + this.h / 5, this.w / 2, this.h / 2);

                // Player Holding Item
                var pHolding = mr_spunky.inventory.items[round(mr_spunky.inventory.hover)];
                if (mouseIsPressed && mouseButton === LEFT && pHolding.data.isWeapon && m.__swordRecharge === 0) {
                    if (Collide(mouseX, mouseY, this.x + this.w / 4, this.y + this.h / 5, this.w / 2, this.h / 2)) {
                        if (dist(m.x, m.y, this.x + this.w / 2, this.y + this.h / 2) < 80) {

                            m.animation = mr_spunky.inventory.items[round(mr_spunky.inventory.hover)].label;
                            playSound(getSound("rpg/battle-swing"));
                            var damage_amount = random(m.strength * 0.2, m.strength * 0.4) +
                                (mr_spunky.inventory.items[round(mr_spunky.inventory.hover)].data.damage || 0);
                            if (this.__iframes === 0) {
                                var a = atan2(m.y - (this.y + this.h / 2), m.x - (this.x + this.w / 2));
                                this.v.x -= (damage_amount * 2) * cos(a);
                                this.v.y -= (damage_amount * 2) * sin(a);
                            }
                            m.__swordRecharge = m.__swordRecharge_set / m.speed;
                            this.damage(damage_amount);
                        }
                    }
                }
            },
            draw: function () {
                fill(0, 50 - this.__jump);
                noStroke();
                ellipse(this.x + this.w / 2, this.y + this.h / 6 + this.h / 2, 24 - this.__jump / 2, 12 - this.__jump / 4);
                switch (this.type) {
                    case "angry-furball":
                        //fill(255, 0, 0);
                        //rect(this.x, this.y, this.w, this.h);
                        if (this.__iframes % 30 < 15) {
                            pushMatrix();
                            translate(this.x + this.w / 2, this.y - this.__jump);
                            scale(this.w / 400, this.h / 400);
                            pushMatrix();
                            var vr = ((this.a < 90 && this.a > -90) ? 1 : -1);
                            scale(vr, 1);
                            translate(-200, 0);
                            image(getImage("avatars/mr-pink"), 100, 100, 200, 200);
                            noStroke();
                            fill(255, 181, 181);
                            ellipse(184, 185, 42, 42);
                            ellipse(240, 185, 42, 42);
                            fill(184, 77, 77);
                            ellipse(187, 187, 20, 35);
                            ellipse(246, 186, 20, 35);
                            fill(64, 0, 0);
                            ellipse(187, 188, 10, 30);
                            ellipse(246, 187, 10, 30);

                            fill(255);
                            triangle(207, 233, 211, 233, 208, 245);
                            triangle(199, 231, 204, 233, 200, 245);
                            triangle(217, 232, 212, 234, 214, 245);
                            triangle(221, 232, 227, 231, 226, 245);
                            popMatrix();
                            popMatrix();
                        }
                        break;
                    case "mad-squid": case "mad-squid-small":
                        if (this.__iframes % 30 < 15) {
                            pushMatrix();
                            translate(this.x + this.w / 2, this.y - this.__jump);
                            scale(this.w / 400, this.h / 400);
                            pushMatrix();
                            var vr = ((this.a < 90 && this.a > -90) ? 1 : -1);
                            scale(vr, 1);
                            translate(-200, 0);
                            image(getImage("avatars/orange-juice-squid"), 100, 100, 200, 200);
                            popMatrix();
                            popMatrix();
                        }
                        break;
                    case "thunderhead":
                        if (this.__iframes % 30 < 15) {
                            pushMatrix();
                            translate(this.x + this.w / 2, this.y - this.__jump);
                            scale(this.w / 400, this.h / 400);
                            pushMatrix();
                            var vr = ((this.a < 90 && this.a > -90) ? -1 : 1);
                            scale(vr, 1);
                            translate(-200, 0);
                            image(getImage("avatars/spunky-sam"), 100, 100, 200, 200);
                            popMatrix();
                            popMatrix();
                        }
                        break;
                    case "bot":
                        if (this.__iframes % 30 < 15) {
                            pushMatrix();
                            translate(this.x + this.w / 2, this.y - this.__jump);
                            scale(this.w / 400, this.h / 400);
                            pushMatrix();
                            var vr = ((this.a < 90 && this.a > -90) ? 1 : -1);
                            scale(vr, 1);
                            translate(-200, 0);
                            image(getImage("avatars/robot_male_1"), 100, 100, 200, 200);
                            popMatrix();
                            popMatrix();
                        }
                        break;
                }
            }
        };
        return constructor;
    })();
    function SpawnEnemies(x, y, w, h) {
        var i = mr_spunky.level_number;
        if (showCollisionBoxes) {
            fill(0, 0, 255);
            rect(x + 20, y + 20, w - 80, h - 80);
        }
        if (enemies[i].length < 8) {
            if (random(0, 100) < 20) {
                if (enemies_spawn_timers[mr_spunky.level_number] <= 0) {

                    // Respawn Time Formula
                    enemies_spawn_timers[mr_spunky.level_number] = 60 * round(random(10, max(16, 36 - 3 * mr_spunky.skills.combat)));

                    // Run Spawn
                    var pick = spawn_tables.pick("enemies", mr_spunky.level_number);
                    //println(pick.mult);
                    for (var j = 0; j < pick.mult; j++) {
                        enemies[i].push(Enemy.new(
                            x + random(20, w - 80),
                            y + random(20, h - 80),
                            pick.type
                        ));
                    }
                }
            }
        }
        /*enemies.sort(function (a, b) {
            return a.y - b.y;
        });*/
    }
    function UpdateEnemySpawnTimers() {
        var timer = enemies_spawn_timers[mr_spunky.level_number];
        if (timer !== undefined) {
            if (spawn_tables.enemies[mr_spunky.level_number] !== undefined) {
                enemies_spawn_timers[mr_spunky.level_number] -= spawn_tables.enemies[mr_spunky.level_number].rate;
            }
        }
    }
    // }

    draw = function () {
        cursor("default");

        if (scene === "menu") {
            background(49, 51, 56);

            if (frameCount % 120 === 0) {
                menu_streamers.push([random(-300, 320), random(-100, -50)]);
            }
            for (var i = 0; i < menu_streamers.length; i++) {
                menu_streamers[i][0] += 2;
                menu_streamers[i][1] += 2;
                if (frameCount % 3 === 0) {
                    Particle_Emitter("star", 1, menu_streamers[i][0], menu_streamers[i][1]);
                }
                if (menu_streamers[i][0] > 400 || menu_streamers[i][1] > 400) {
                    var last = menu_streamers.pop();
                    if (i < menu_streamers.length - 1) {
                        menu_streamers[i] = last;
                    }
                    i--;
                }
            }
            for (var i = 0; i < particles.length; i++) {
                var that;
                var p_ = particles[i];
                particles[i].draw(that);
                particles[i].effect();
                if (particles[i].update()) {
                    var last = particles.pop();
                    if (i < particles.length - 1) {
                        particles[i] = last;
                    }
                    i--;
                }
            }

            fill(118, 152, 240);
            MainText(3, 3, 310, 300);
            fill(45, 90, 204);
            MainText(0, 0, 310, 300);

            pushMatrix();
            translate(200, 290);
            scale(0.9);
            if (dist(mouseX, mouseY, 200, 290) < 50) {
                scale(1.1);
                cursor("pointer");
                if (mouseIsPressed) {
                    scene = "loading";
                }
            }
            fill(118, 152, 240);
            PlayText(3 - 100, 3 - 110, 200, 200);
            fill(45, 90, 204);
            PlayText(-100, -110, 200, 200);
            popMatrix();

            if (frameCount % 70 === 0) {
                random_avatar = floor(random(0, KAPRELOAD.length));
            }
            image(getImage(KAPRELOAD[random_avatar]), 170, 180, 60, 60);

        } else if (scene === "loading") {
            particles = [];
            background(0);
            loading++;

            fill(255, 80);
            textAlign(CENTER);
            textSize(20);
            textFont(FONT_MONOSPACE);
            text("WASD to move", 200, 50);

            mr_spunky.show_player = true;
            mr_spunky.facing = -1;
            mr_spunky.move();
            mr_spunky.draw();

            fill(118, 152, 240);
            LoadingText(61, 217, 150, 150);
            fill(45, 90, 204);
            LoadingText(58, 214, 150, 150);

            if (loading > 8 * 60) {
                mr_spunky.show_player = false;
                scene = "game";
            }

        } else if (scene === "game") {
            try {
                UpdateEnemySpawnTimers();
                UpdateTreeSpawnTimers();

                if (!disableLighting) {
                    if (!loaded_mask) {
                        LoadLights();
                        light_loaded++;
                        if (light_loaded > 9) {
                            loaded_mask = true;
                        }
                    }
                }

                background(227, 182, 91);

                textFont(FONT_SANS_SERIF);
                cursor("DEFAULT");
                noStroke();


                switch (mr_spunky.level_number) {
                    case 0:
                        image(getImage("avatars/duskpin-sapling"), 10, 189, 52, 49);
                        if (Touch(mr_spunky.x, mr_spunky.y, 32, 211, 50)) {
                            fill(0, 120);
                            textAlign(CENTER);
                            text("(She doesn't seem\nto want to talk)", 54, 179);
                        }

                        // Grass
                        fill(46, 166, 28);
                        Grass(241, 268, 245, 266);
                        Grass(0, 268, 80, 406);

                        // Pond
                        pushMatrix();
                        translate(30, 30);
                        fill(92, 58, 0);
                        ellipse(303, 313, 69, 58);
                        ellipse(296, 300, 36, 45);
                        ellipse(315, 322, 69, 42);
                        ellipse(290, 327, 57, 45);
                        fill(15, 88, 140);
                        ellipse(303, 313, 60, 50);
                        ellipse(296, 300, 28, 38);
                        ellipse(315, 322, 60, 34);
                        ellipse(290, 327, 49, 39);
                        fill(75, 130, 61);
                        arc(316, 307 - 1 * sin(frameCount), 20, 19, -44, 293);
                        arc(292, 323 - 1 * sin(frameCount - 90), 18, 16, -96, 239);
                        popMatrix();

                        // Shop Keeper - Clara
                        fill(0, 0, 0, 50);
                        rect(25, 30, 84, 60);
                        image(getImage("cute/CharacterPinkGirl"), 40, -4, 50, 81);
                        if (Touch(mr_spunky.x, mr_spunky.y, 60, 40, 50)) {
                            fill(255);
                            textAlign(CENTER);
                            text("[Space]", 65, 47);
                            if (keyIsPressed && (key || {}).toString() === " ") {
                                mr_spunky.menu_open = true;
                                mr_spunky.menu_person = "Clara";
                                mr_spunky.menu_scroll = 0;
                            }
                        }
                        fill(150, 90, 0);
                        rect(27, 57, 80, 30);
                        fill(133, 80, 0);
                        rect(27, 57, 80, 15);
                        fill(112, 84, 0);
                        rect(27, 3, 10, 60);
                        rect(96, 3, 10, 60);
                        fill(255, 255, 255);
                        rect(22, -37, 90, 60);
                        fill(255, 242, 0);
                        rect(85, -27, 20, 50);
                        rect(42, -27, 20, 50);


                        // Shop Keeper - Gwen
                        pushMatrix();
                        translate(108, 0);
                        fill(0, 0, 0, 50);
                        rect(25, 30, 84, 60);
                        image(getImage("cute/CharacterPrincessGirl"), 46, -4, 50, 81);
                        if (Touch(mr_spunky.x, mr_spunky.y, 164, 50, 50)) {
                            fill(255);
                            textAlign(CENTER);
                            text("[Space]", 70, 47);
                            if (keyIsPressed && (key || {}).toString() === " ") {
                                mr_spunky.menu_open = true;
                                mr_spunky.menu_person = "Gwen";
                                mr_spunky.menu_scroll = 0;
                            }
                        }

                        fill(150, 90, 0);
                        rect(27, 57, 80, 30);
                        fill(133, 80, 0);
                        rect(27, 57, 80, 15);
                        fill(112, 84, 0);
                        rect(27, 3, 10, 60);
                        rect(96, 3, 10, 60);
                        fill(255, 255, 255);
                        rect(22, -37, 90, 60);
                        fill(41, 194, 59);
                        rect(85, -27, 20, 50);
                        rect(42, -27, 20, 50);
                        popMatrix();

                        // Shop Keeper - Ernest
                        pushMatrix();
                        translate(214, 0);
                        fill(0, 0, 0, 50);
                        rect(25, 30, 84, 60);
                        image(getImage("avatars/old-spice-man"), 46, 23, 49, 48);
                        if (Touch(mr_spunky.x, mr_spunky.y, 270, 50, 50)) {
                            fill(255);
                            textAlign(CENTER);
                            text("[Space]", 70, 47);
                            if (keyIsPressed && (key || {}).toString() === " ") {
                                mr_spunky.menu_open = true;
                                mr_spunky.menu_person = "Ernest";
                                mr_spunky.menu_scroll = 0;
                            }
                        }

                        fill(150, 90, 0);
                        rect(27, 57, 80, 30);
                        fill(133, 80, 0);
                        rect(27, 57, 80, 15);
                        fill(112, 84, 0);
                        rect(27, 3, 10, 60);
                        rect(96, 3, 10, 60);
                        fill(255, 255, 255);
                        rect(22, -37, 90, 60);
                        fill(0, 21, 255);
                        rect(85, -27, 20, 50);
                        rect(42, -27, 20, 50);

                        popMatrix();

                        break;
                    case 1:

                        // Grass
                        fill(46, 166, 28);
                        Grass(166 - 240, 268, 240, 203);
                        fill(46, 166, 28);
                        Grass(487 - 240, 268, 240, 203);
                        fill(46, 166, 28);
                        Grass(454 - 292, -18, 292, 203);



                        break;
                    case 2:
                        noStroke();
                        fill(46, 166, 28);
                        Grass(0, -18, 400, 203);
                        Grass(0, 268, 400, 203);
                        Grass(130, 0, 400, 400);

                        SpawnEnemies(0, 10, 400, 130);
                        SpawnEnemies(250, 0, 155, 400);
                        SpawnEnemies(0, 280, 400, 130);

                        break;
                    case 3:

                        // Grass
                        fill(46, 166, 28);
                        Grass(0, 0, 80, 406);
                        Grass(241, -91, 245, 266);
                        Grass(241, 250, 245, 266);

                        break;
                    case 4:

                        // Grass
                        fill(46, 166, 28);
                        Grass(241, -91, 245, 266);
                        Grass(-84, -93, 245, 266);
                        //Grass(139, 281, 122, 55);
                        Grass(241, 250, 245, 266);
                        Grass(-84, 250, 245, 266);

                        break;
                    case 5:
                        Grass(-24, -93, 445, 266);
                        Grass(-104, 250, 245, 266);
                        fill(60);
                        beginShape();
                        vertex(201.46, 188.80);
                        vertex(193.06, 184.60);
                        vertex(194.46, 193.93);
                        vertex(207.99, 197.20);
                        vertex(198.20, 204.66);
                        vertex(195.40, 206.06);
                        vertex(207.06, 210.73);
                        vertex(209.39, 212.13);
                        vertex(214.52, 218.19);
                        vertex(216.39, 218.66);
                        vertex(204.73, 223.79);
                        vertex(200.99, 226.59);
                        vertex(197.73, 231.72);
                        vertex(200.53, 234.52);
                        vertex(198.66, 239.65);
                        vertex(200.53, 242.92);
                        vertex(201.93, 247.12);
                        vertex(203.33, 250.85);
                        vertex(208.93, 253.18);
                        vertex(212.19, 256.45);
                        vertex(223.85, 255.51);
                        vertex(232.72, 258.78);
                        vertex(231.78, 261.11);
                        vertex(240.65, 262.98);
                        vertex(250.91, 259.24);
                        vertex(269.57, 239.65);
                        vertex(277.97, 226.12);
                        vertex(260.24, 197.20);
                        vertex(229.92, 179.94);
                        vertex(200.99, 187.87);
                        endShape();

                        fill(90);
                        beginShape();
                        vertex(217.62, 142.69);
                        vertex(245.61, 117.97);
                        vertex(283.40, 102.57);
                        vertex(315.12, 90.91);
                        vertex(346.85, 102.57);
                        vertex(374.37, 122.63);
                        vertex(400.49, 135.23);
                        vertex(399.79, 401.64);
                        vertex(-5.16, 405.78);
                        vertex(34.50, 393.38);
                        vertex(86.56, 383.46);
                        vertex(128.71, 367.76);
                        vertex(175.82, 342.97);
                        vertex(224.58, 319.83);
                        vertex(265.08, 281.81);
                        vertex(300.61, 253.71);
                        vertex(313.01, 238.01);
                        vertex(311.36, 209.91);
                        vertex(316.31, 172.72);
                        vertex(300.61, 150.40);
                        vertex(265.90, 145.45);
                        vertex(216.31, 143.79);
                        endShape();

                        fill(51, 51, 51);
                        beginShape();
                        vertex(218.72, 163.50);
                        vertex(198.66, 172.83);
                        vertex(196.80, 189.16);
                        vertex(213.82, 194.95);
                        vertex(231.32, 195.33);
                        vertex(243.39, 207.60);
                        vertex(240.45, 220.89);
                        vertex(259.03, 227.20);
                        vertex(248.51, 238.06);
                        vertex(242.91, 246.12);
                        vertex(248.58, 250.74);
                        vertex(302.23, 241.87);
                        vertex(307.44, 230.86);
                        vertex(314.87, 202.31);
                        vertex(316.67, 187.26);
                        vertex(315.76, 169.56);
                        vertex(302.44, 155.17);
                        vertex(290.56, 146.24);
                        vertex(269.57, 146.24);
                        vertex(249.98, 148.11);
                        vertex(233.18, 152.77);
                        vertex(217.79, 161.17);
                        endShape();

                        if (!mr_spunky.mines_unlocked) {
                            Mines_Boulder();
                        }
                        break;
                    case 6:

                        // Crop Plots
                        for (var i = 0; i < plots.length; i++) {
                            var p = plots[i];
                            p.draw();
                            p.yield();
                            p.plant();
                            p.watering();
                            p.till();
                        }

                        noStroke();

                        // Grass
                        fill(46, 166, 28);
                        Grass(-128, -14, 150, 967);
                        Grass(0, 1, 80, 20);
                        Grass(241, 250 - 445, 245, 266);
                        Grass(300, 50, 150, 100);

                        Grass(300, 315, 150, 100);


                        break;
                    case 7:
                        Grass(-20, -20, 180, 50);
                        Grass(-20, 30, 120, 180);

                        Grass(420 - 180, -20, 180, 50);
                        Grass(420 - 120, 30, 120, 180);

                        fill(80);
                        beginShape();
                        vertex(48.26, 152.19);
                        vertex(14.26, 171.19);
                        vertex(0.26, 214.19);
                        vertex(-3.11, 407.44);
                        vertex(409.26, 410.19);
                        vertex(407.35, 32.04);
                        vertex(381.26, 70.37);
                        vertex(320.86, 165.76);
                        vertex(267.80, 181.00);
                        vertex(202.89, 184.39);
                        vertex(84.91, 167.46);
                        endShape();
                        break;
                    case 8:
                        background(80, 80, 80);
                        break;
                    case 9:
                        noStroke();
                        fill(209, 178, 178);
                        rect(0, 0, 400, 50);
                        fill(158, 104, 104);
                        rect(0, 30, 400, 20);

                        fill(219, 219, 219);
                        rect(0, 30, 400, 3);
                        break;
                }

                mr_spunky.update();

                if (!mr_spunky.menu_open) {
                    mr_spunky.move();
                }

                ChangeCheck();

                if (mr_spunky.level_number > -1) {
                    for (var i = 0; i < trees[mr_spunky.level_number].length; i++) {
                        var t = trees[mr_spunky.level_number][i];
                        t.shadow();
                        t.collide(mr_spunky);
                        for (var j = 0; j < enemies[mr_spunky.level_number].length; j++) {
                            var en = enemies[mr_spunky.level_number][j];
                            t.collide(en);
                        }
                        if (t.chop()) {
                            trees[mr_spunky.level_number].splice(i, 1);
                            i--;
                        }
                    }


                    for (var j = 0; j < 10; j++) {
                        for (var i = 0; i < villagers[j].length; i++) {
                            var v = villagers[j][i];
                            v.AI();
                            if (v.__level_number !== j) {
                                villagers[v.__level_number].push(villagers[j][i]);
                                villagers[j].splice(i, 1);
                                i--;
                            }
                        }
                    }
                    for (var i = 0; i < ores[mr_spunky.level_number].length; i++) {
                        var o = ores[mr_spunky.level_number][i];
                        o.collide();
                        o.mine();
                    }
                    for (var i = 0; i < villagers[mr_spunky.level_number].length; i++) {
                        var v = villagers[mr_spunky.level_number][i];
                        v.collide();
                    }
                    for (var i = 0; i < enemies[mr_spunky.level_number].length; i++) {
                        var en = enemies[mr_spunky.level_number][i];
                        en.attack();
                        if (en.AI()) {
                            enemies[mr_spunky.level_number].splice(i, 1);
                            i--;
                        }
                    }

                    if (showCollisionBoxes) {
                        for (var i = 0; i < villager_nodes[mr_spunky.level_number].length; i++) {
                            var n = villager_nodes[mr_spunky.level_number][i];
                            stroke(255, 0, 0);
                            strokeWeight(4);
                            point(n[0], n[1]);
                        }
                    }

                    var objects = [];
                    objects = objects.concat(enemies[mr_spunky.level_number]);
                    objects = objects.concat(trees[mr_spunky.level_number]);
                    objects = objects.concat(mr_spunky);
                    objects = objects.concat(villagers[mr_spunky.level_number]);
                    objects = objects.concat(decor[mr_spunky.level_number]);
                    objects = objects.concat(ores[mr_spunky.level_number]);
                    objects.sort(function (a, b) {
                        return a.y + ((a.h || 0) / 2) - (b.y + ((b.h || 0) / 2));
                    });
                    for (var i = 0; i < objects.length; i++) {
                        objects[i].draw();
                        /**if (objects[i].__mined !== undefined) {
                            println(objects[i].x);
                        }**/
                        if (objects[i].decor_collision) {
                            objects[i].collide();
                        }
                    }

                    for (var i = 0; i < coins[mr_spunky.level_number].length; i++) {
                        var c = coins[mr_spunky.level_number][i];
                        Coin(c[0], c[1], 26);
                        if (Touch(mr_spunky.x, mr_spunky.y, c[0], c[1], 37)) {
                            mr_spunky.money++;
                            coins[mr_spunky.level_number].splice(i, 1);
                            i--;
                            playSound(getSound("rpg/metal-clink"));
                        }
                    }

                    fill(255, 0, 0, 90);
                    for (var i = 0; i < walls[mr_spunky.level_number].length; i++) {
                        var w = walls[mr_spunky.level_number][i];
                        if (showCollisionBoxes) {
                            rect(w[0], w[1], w[2], w[3]);
                        }
                        var col = Hitbox(mr_spunky.x, mr_spunky.y, w[0], w[1], w[2], w[3]);
                        mr_spunky.x = col[0];
                        mr_spunky.y = col[1];
                        /*for (var j = 0; j < enemies[mr_spunky.level_number].length; j++) {
                            var en = enemies[mr_spunky.level_number][j];
                            /**var col2 = Hitbox(en.x + en.w / 2, en.y + en.h / 2, w[0], w[1], w[2], w[3]);
                            if (col2[2]) {
                                en.x = col2[0] - en.w / 2;
                                en.y = col2[1] - en.h / 2;
                            }**/
                        //wallcol(en, w);
                        //}*/
                    }

                } else {
                    mr_spunky.draw();
                }

                if (!disableLighting) {
                    image(LightLayers[mr_spunky.level_number], 0, 0, 400, 400);
                }

                switch (mr_spunky.level_number) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        // Boy
                        break;
                    case 5:
                        // {
                        fill(79, 78, 79);
                        beginShape();
                        vertex(228.58, 97.01);
                        vertex(253, 82);
                        vertex(265, 70);
                        vertex(282, 59);
                        vertex(296, 51);
                        vertex(329, 48);
                        vertex(346, 41);
                        vertex(351, 35);
                        vertex(370, 37);
                        vertex(385, 37);
                        vertex(396.32, 39.94);
                        vertex(399.51, 111.77);
                        vertex(383.85, 116.14);
                        vertex(317.69, 85.18);
                        endShape();
                        fill(84, 84, 84);
                        beginShape();
                        vertex(0.57, 388.82);
                        vertex(7.90, 383.03);
                        vertex(17, 383);
                        vertex(40, 378);
                        vertex(60, 376);
                        vertex(74, 363);
                        vertex(78, 355);
                        vertex(86, 348);
                        vertex(97, 339);
                        vertex(119, 347);
                        vertex(129, 336);
                        vertex(143, 330);
                        vertex(157, 334);
                        vertex(171, 326);
                        vertex(182, 323);
                        vertex(190, 318);
                        vertex(205, 316);
                        vertex(212, 298);
                        vertex(228, 292);
                        vertex(221, 280);
                        vertex(252, 264);
                        vertex(238, 259);
                        vertex(245, 252);
                        vertex(241, 247);
                        vertex(265, 240);
                        vertex(272, 236);
                        vertex(284, 222);
                        vertex(279, 208);
                        vertex(278.09, 201.49);
                        vertex(275.08, 190.97);
                        vertex(278.57, 181.86);
                        vertex(272.82, 174.92);
                        vertex(266.57, 170.39);
                        vertex(262.84, 165.72);
                        vertex(254.44, 163.39);
                        vertex(247.45, 161.28);
                        vertex(243.85, 162.00);
                        vertex(242, 161);
                        vertex(237, 164);
                        vertex(236, 166);
                        vertex(230, 167);
                        vertex(226, 169);
                        vertex(221, 171);
                        vertex(216, 172);
                        vertex(213, 174);
                        vertex(210, 175);
                        vertex(206, 175);
                        vertex(204, 182);
                        vertex(197, 185);
                        vertex(197, 191);
                        vertex(195, 179);
                        vertex(191, 167);
                        vertex(195, 149);
                        vertex(200, 139);
                        vertex(200, 122);
                        vertex(210, 113);
                        vertex(212, 105);
                        vertex(228, 97);
                        vertex(245, 92);
                        vertex(258, 87);
                        vertex(275, 79);
                        vertex(285, 78);
                        vertex(293, 78);
                        vertex(313, 75);
                        vertex(342, 73);
                        vertex(355, 77);
                        vertex(371.12, 88.02);
                        vertex(379, 95);
                        vertex(381, 108);
                        vertex(383, 111);
                        vertex(393, 112);
                        vertex(399.01, 110.63);
                        vertex(399.88, 140.68);
                        vertex(374.43, 133.05);
                        vertex(365.95, 118.63);
                        vertex(339.66, 106.33);
                        vertex(329.48, 96.57);
                        vertex(318.88, 96.15);
                        vertex(303.61, 95.72);
                        vertex(290.04, 106.33);
                        vertex(262.05, 111.84);
                        vertex(246.78, 124.14);
                        vertex(231.94, 133.05);
                        vertex(221.76, 141.53);
                        vertex(248.48, 138.98);
                        vertex(267.98, 134.74);
                        vertex(288.34, 138.56);
                        vertex(321.00, 153.83);
                        vertex(326.93, 159.34);
                        vertex(326.93, 169.94);
                        vertex(324.39, 191.15);
                        vertex(318.45, 197.51);
                        vertex(320.15, 213.62);
                        vertex(312.94, 223.80);
                        vertex(323.97, 231.44);
                        vertex(317.60, 239.92);
                        vertex(318.88, 249.25);
                        vertex(307.00, 260.70);
                        vertex(295.55, 262.82);
                        vertex(292.16, 267.06);
                        vertex(273.21, 287.41);
                        vertex(262.47, 310.55);
                        vertex(245.94, 322.95);
                        vertex(243.46, 335.34);
                        vertex(228.58, 332.87);
                        vertex(181.56, 350.42);
                        vertex(181.14, 358.91);
                        vertex(171.38, 366.11);
                        vertex(157.39, 371.20);
                        vertex(148.48, 373.32);
                        vertex(128.55, 378.84);
                        vertex(111.16, 383.50);
                        vertex(89.53, 384.78);
                        vertex(69.18, 390.29);
                        vertex(33.13, 398.77);
                        vertex(0.20, 405.77);
                        endShape();
                        //}
                        break;
                    case 6:
                        if (Collide(mr_spunky.x, mr_spunky.y, 300, 183, 10, 79) && mr_spunky.house_unlocked) {
                            mr_spunky.level_number = 9;
                            mr_spunky.x = 65;
                        }
                        break;
                    case 7:

                        fill(82, 82, 82);
                        beginShape();
                        vertex(402.26, 12.12);
                        vertex(384, 23);
                        vertex(363, 35);
                        vertex(364, 49);
                        vertex(359, 54);
                        vertex(361, 62);
                        vertex(352, 69);
                        vertex(355, 76);
                        vertex(347, 84);
                        vertex(336, 87);
                        vertex(322, 89);
                        vertex(327, 103);
                        vertex(329, 108);
                        vertex(329, 123);
                        vertex(326, 131);
                        vertex(320, 144);
                        vertex(295, 144);
                        vertex(283, 143);
                        vertex(276, 152);
                        vertex(271, 159);
                        vertex(253, 160);
                        vertex(236, 165);
                        vertex(213, 156);
                        vertex(190, 164);
                        vertex(166, 163);
                        vertex(166, 142);
                        vertex(150, 150);
                        vertex(133, 157);
                        vertex(107, 149);
                        vertex(91, 154);
                        vertex(94, 135);
                        vertex(78, 134);
                        vertex(52, 134);
                        vertex(40, 126);
                        vertex(51, 108);
                        vertex(48, 105);
                        vertex(46, 87);
                        vertex(40, 79);
                        vertex(37, 64);
                        vertex(32.80, 60.93);
                        vertex(21.35, 55.91);
                        vertex(18.43, 44.00);
                        vertex(11.76, 50.15);
                        vertex(5, 60);
                        vertex(0.62, 95.28);
                        vertex(0.26, 247.19);
                        vertex(17.26, 193.19);
                        vertex(35.26, 171.19);
                        vertex(53.26, 164.19);
                        vertex(78.26, 194.19);
                        vertex(105.26, 198.19);
                        vertex(122.26, 194.19);
                        vertex(158.26, 207.19);
                        vertex(176.26, 209.19);
                        vertex(217.26, 210.19);
                        vertex(247.26, 195.19);
                        vertex(273.26, 208.19);
                        vertex(281.26, 212.19);
                        vertex(298.26, 189.19);
                        vertex(327.26, 200.19);
                        vertex(337.26, 175.19);
                        vertex(348.26, 168.19);
                        vertex(358.26, 161.19);
                        vertex(369.26, 145.19);
                        vertex(360.26, 133.19);
                        vertex(369.26, 107.19);
                        vertex(382.26, 94.19);
                        vertex(395.26, 81.19);
                        vertex(402.26, 50.19);
                        endShape();

                        SpawnEnemies(20, 200, 420, 215);
                        break;
                    case 8:
                        fill(107, 107, 107);
                        beginShape();
                        vertex(1, 34);
                        vertex(21, 27);
                        vertex(31, 19);
                        vertex(42, 25);
                        vertex(46, 17);
                        vertex(61, 16);
                        vertex(72, 1);
                        vertex(1, 1);
                        endShape();

                        SpawnEnemies(20, 20, 400, 400);

                        break;
                    case 9:
                        var Border = [
                            Hitbox(mr_spunky.x, mr_spunky.y, -10, -10, 15, 420),
                            Hitbox(mr_spunky.x, mr_spunky.y, -10, -10, 420, 15),
                            Hitbox(mr_spunky.x, mr_spunky.y, -10, 395, 420, 15),
                            Hitbox(mr_spunky.x, mr_spunky.y, 395, -10, 15, 420),
                        ];
                        Border.forEach(function (border) {
                            if (border[2]) {
                                mr_spunky.x = border[0];
                                mr_spunky.y = border[1];
                            }
                        });

                        if (Collide(mr_spunky.x, mr_spunky.y, 50, 177, 15, 72)) {
                            mr_spunky.level_number = 6;
                            mr_spunky.x = 280;
                        }

                        noStroke();

                        fill(0, 0, 0);
                        strokeWeight(2);
                        stroke(184, 184, 184);
                        rect(-5, -5, 60, 410);
                        rect(360, -5, 100, 410);
                        noStroke();

                        noStroke();
                        fill(51, 33, 3);
                        rect(50, 177, 5, 72);

                        fill(41, 41, 41);
                        rect(200, 370, 90, 30);
                        break;
                }



                if (mr_spunky.level_number > -1) {
                    fill(255, 0, 0, 90);
                    for (var i = 0; i < walls[mr_spunky.level_number].length; i++) {
                        var w = walls[mr_spunky.level_number][i];
                        if (showCollisionBoxes) {
                            rect(w[0], w[1], w[2], w[3]);
                        }
                        var col = Hitbox(mr_spunky.x, mr_spunky.y, w[0], w[1], w[2], w[3]);
                        mr_spunky.x = col[0];
                        mr_spunky.y = col[1];
                    }
                    for (var i = 0; i < dropped_items[mr_spunky.level_number].length; i++) {
                        var d = dropped_items[mr_spunky.level_number][i];
                        d.draw();
                        if (d.update()) {
                            dropped_items[mr_spunky.level_number].splice(i, 1);
                            i--;
                        }
                    }
                }

                // ** TREE SPAWNING ** {

                // Forest Entrance
                SpawnTrees(1, 0, 260, 212, 190, 10);
                SpawnTrees(1, 238, 261, 212, 190, 10);
                SpawnTrees(1, 156, 0, 286, 231, 10);

                // Deep Forest
                SpawnTrees(2, 0, 0, 440, 230, 15);
                SpawnTrees(2, 0, 264, 440, 200, 15);
                SpawnTrees(2, 130, 150, 310, 194, 15);

                // }


                for (var l = 0; l < trees.length; l++) {
                    for (var i = 0; i < trees[l].length; i++) {
                        var t = trees[l][i];
                        t.update();
                    }
                }

                noStroke();
                fill(0, 200 * sin(frameCount / 10000));
                rect(0, 0, 400, 400);

                if (mr_spunky.menu_open) {
                    background(117, 90, 36);

                    for (var i = 0; i < shop[mr_spunky.menu_person].length; i++) {
                        var x = i % 3, y = floor(i / 3) + mr_spunky.menu_scroll;
                        if (y < 0 || y > 1) {
                            continue;
                        }
                        var slot = shop[mr_spunky.menu_person][i];
                        var item = slot.item;

                        fill(0, 50);
                        if (Collide(mouseX, mouseY, 50 + x * 110, 100 + y * 110, 80, 80)) {
                            fill(255, 0, 0, 110);
                            cursor("POINTER");
                        }
                        rect(50 + x * 110, 100 + y * 110, 80, 80);
                        item.draw(50 + x * 110, 100 + y * 110, 80, 80);

                        if (slot.transaction === "sell") {
                            textAlign(RIGHT);
                            fill(255);
                            textSize(20);
                            text("x" + item.count, 127 + x * 110, 120 + y * 110);

                            noStroke();
                            fill(255);
                            textSize(14);
                            text(slot.price, 115 + x * 110, 175 + y * 110);
                            Coin(122 + x * 110, 170 + y * 110, 13);
                        } else {
                            textAlign(RIGHT);
                            fill(255);
                            textSize(14);
                            text("x" + item.count, 127 + x * 110, 175 + y * 110);

                            noStroke();
                            fill(255);
                            textSize(20);
                            text(slot.price, 113 + x * 110, 118 + y * 110);
                            Coin(120 + x * 110, 111 + y * 110, 15);
                        }
                    }

                    fill(117, 90, 36);
                    rect(0, 0, 400, 100);
                    rect(0, 300, 400, 100);

                    for (var i = -(3 * mr_spunky.menu_scroll); i < shop[mr_spunky.menu_person].length; i++) {
                        var x = i % 3, y = floor(i / 3) + mr_spunky.menu_scroll;
                        if (y < 0 || y > 1) {
                            continue;
                        }
                        var slot = shop[mr_spunky.menu_person][i];
                        var item = slot.item;

                        if (Collide(mouseX, mouseY, 50 + x * 110, 100 + y * 110, 80, 80)) {
                            fill(0, 200);
                            textSize(14);
                            rect(mouseX + 20, mouseY - 30, textWidth(slot.transaction + ": " + item.label) + 8, 20);
                            fill(255);
                            textAlign(LEFT);
                            text(slot.transaction + ": " + item.label, mouseX + 23, mouseY - 15);
                            textAlign(RIGHT);
                        }
                    }

                    fill(255, 255, 255);
                    textSize(12);
                    textAlign(CENTER);
                    switch (mr_spunky.menu_person) {
                        case "Clara":
                            text("Hi, I'm Clara! I can sell you seeds and\n buy your produce as well as some other resources\nyou might come across!", 200, 50);
                            break;
                        case "Gwen":
                            text("Hey, my name's Gwen! I love to collect\nbeautiful artifacts, stones, and crystals. If you've got \nany, I'll be happy to take them off your hands!", 200, 50);
                            break;
                        case "Ernest":
                            text("Hmmph... the name is Ernest. \nI have some tools. That's it.", 200, 50);
                            break;
                    }

                    // Scroll Bar
                    fill(0, 20);
                    rect(360, 100, 15, 200);
                    var h = ceil(shop[mr_spunky.menu_person].length / 3);
                    mr_spunky.menu_scroll_max = h - 1;
                    fill(0, 50);
                    rect(360, 100 - (200 / h * mr_spunky.menu_scroll), 15, 200 / h);
                    if (mouseIsPressed) {
                        if (Collide(mouseX, mouseY, 360, 100, 15, 200)) {
                            mr_spunky.menu_scroll = -ceil((mouseY - 100) / (200 / h) - 1);
                        }
                    }


                    fill(0, 50);
                    if (Collide(mouseX, mouseY, 10, 10, 70, 40)) {
                        fill(255, 0, 0, 110);
                        cursor("POINTER");
                        if (mouseIsPressed) {
                            mr_spunky.menu_open = false;
                        }
                    }
                    rect(10, 10, 70, 40);
                    fill(255);
                    textAlign(CENTER);
                    textSize(25);
                    text("Back", 44, 39);

                    textAlign(RIGHT);
                }
                if (mr_spunky.avatar_menu_open) {
                    background(189, 149, 68);

                    noStroke();
                    fill(0, 50);
                    rect(290, 100, 100, 240);

                    var levels = ["seed", "seedling", "sapling", "tree", "ultimate"];
                    var variants = Object.keys(advancements);
                    for (var i = 0; i < variants.length; i++) {
                        var x = i % 3, y = floor(i / 3);
                        var lvl = constrain(mr_spunky.levels[variants[i]], 0, 4);
                        var s = ("avatars/" + variants[i] + "-" + levels[lvl]);
                        var avatar = getImage(s || "avatars/questionmark");
                        var slot = advancements[variants[i]][levels[lvl + 1]];

                        noStroke();
                        fill(0, 50);
                        strokeWeight(1);
                        if (Collide(mouseX, mouseY, 20 + x * 90, 100 + y * 110, 80, 80)) {
                            if (mr_spunky.levels[variants[i]] !== -1) {
                                fill(255, 0, 0, 110);
                                cursor("POINTER");
                            } else {
                                fill(255);
                                textAlign(LEFT);
                                textSize(13);
                                textFont(FONT_CONSOLAS_BOLD);
                                text("Requirements\n------------", 295, 244);
                                var unlocks = Object.keys(advancements[variants[i]].unlocks);
                                for (var j = 0; j < unlocks.length; j++) {
                                    fill(255);
                                    textAlign(LEFT);
                                    textSize(11);
                                    textFont(FONT_CONSOLAS_BOLD_ITALIC);
                                    text(unlocks[j][0].toUpperCase() + unlocks[j].slice(1) + ": " + advancements[variants[i]].unlocks[unlocks[j]], 295, 272 + j * 15);
                                }
                            }
                        }
                        if (mr_spunky.variant === variants[i]) {
                            stroke(0, 43, 255);
                        }
                        rect(20 + x * 90, 100 + y * 110, 80, 80);
                        image(avatar, 20 + x * 90, 100 + y * 110, 80, 80);
                        fill(255, 50);
                        if (Collide(mouseX, mouseY, 20 + x * 90, 180 + y * 110, 80, 15)) {
                            if (mr_spunky.levels[variants[i]] !== -1) {
                                fill(102, 102, 102, 110);
                                cursor("POINTER");
                            }
                        }
                        rect(20 + x * 90, 180 + y * 110, 80, 15);
                        fill(0, 0, 255, 80);
                        textAlign(CENTER);
                        textFont(FONT_SANS_SERIF);
                        textSize(12);
                        text("Select", 60 + x * 90, 192 + y * 110);
                        textAlign(RIGHT);
                        if (mr_spunky.levels[variants[i]] === -1) {
                            fill(0, 70);
                            rect(20 + x * 90, 100 + y * 110, 80, 80);
                        } else {
                            if (slot !== undefined) {
                                noStroke();
                                fill(255);
                                textSize(14);
                                text(slot.price, 85 + x * 90, 175 + y * 110);
                                Coin(92 + x * 90, 170 + y * 110, 13);
                            }
                        }
                    }

                    fill(255);
                    textAlign(LEFT);
                    textSize(13);
                    textFont(FONT_CONSOLAS_BOLD);
                    text("Current Stats\n-------------", 293, 114);
                    var adv = advancements[mr_spunky.variant][levels[mr_spunky.levels[mr_spunky.variant]]];
                    var stats = Object.keys(adv.stats);
                    for (var j = 0; j < stats.length; j++) {
                        if (stats[j][0] !== "_") {
                            fill(255);
                            textAlign(LEFT);
                            textSize(11);
                            textFont(FONT_CONSOLAS_BOLD_ITALIC);
                            var v = adv.stats[stats[j]].toFixed(2);
                            if (stats[j] === "luck") {
                                v = "+" + floor(adv.stats[stats[j]] * 100) + "%";
                            }
                            text(stats[j][0].toUpperCase() + stats[j].slice(1) + ": " + v, 295, 142 + j * 15);
                        }
                    }

                    noStroke();
                    textFont(FONT_SANS_SERIF);

                    fill(0, 50);
                    if (Collide(mouseX, mouseY, 10, 10, 70, 40)) {
                        fill(255, 0, 0, 110);
                        cursor("POINTER");
                        if (mouseIsPressed) {
                            mr_spunky.avatar_menu_open = false;
                        }
                    }
                    rect(10, 10, 70, 40);
                    fill(255);
                    textAlign(CENTER);
                    textSize(25);
                    text("Back", 44, 39);


                }

                if (!mr_spunky.menu_open && !mr_spunky.avatar_menu_open || 1) {
                    for (var i = 0; i < particles.length; i++) {
                        var that;
                        var p_ = particles[i];
                        if (["primosaur", "thunderhead-thunder"].includes(p_.type)) {
                            that = random_modified(p_);//particles[floor(random(0, particles.length))];//particle_sorter(p_, i, random (-100, 100));
                        }
                        particles[i].draw(that);
                        particles[i].effect();
                        if (particles[i].update()) {
                            particles.splice(i, 1);
                            i--;
                        }
                    }
                }

                var found_slot = false;
                var inv = mr_spunky.inventory;
                var home = mr_spunky.home_storage;

                if (mr_spunky.home_storage.is_open) {
                    var h = mr_spunky.home_storage;
                    background(117, 90, 36);
                    found_slot = h.render();

                    fill(0, 50);
                    if (Collide(mouseX, mouseY, 10, 10, 70, 40)) {
                        fill(255, 0, 0, 110);
                        cursor("POINTER");
                        if (mouseIsPressed) {
                            mr_spunky.home_storage.is_open = false;
                        }
                    }
                    rect(10, 10, 70, 40);
                    fill(255);
                    textAlign(CENTER);
                    textSize(25);
                    text("Back", 44, 39);

                    textAlign(RIGHT);
                }
                for (var i = 0; i < mr_spunky.inventory.items.length; i++) {
                    noStroke();
                    fill(0, 50);
                    if (round(mr_spunky.inventory.hover) === i) {
                        stroke(255, 0, 0, 150);
                        strokeWeight(1);
                    }
                    rect(10 + i * 35, 360, 30, 30);
                    mr_spunky.inventory.items[i].draw(10 + i * 35, 360, 30, 30);
                    if (mr_spunky.__swordRecharge > 0 && mr_spunky.inventory.items[i].data.isWeapon) {
                        noStroke();
                        fill(255, 50);
                        var ttt = mr_spunky.__swordRecharge / (mr_spunky.__swordRecharge_set / mr_spunky.speed);
                        rect(10 + i * 35, 390 - (ttt) * 30, 30, ttt * 30);
                    }
                    fill(255);
                    textAlign(RIGHT);
                    textSize(11);
                    text(mr_spunky.inventory.items[i].count, 39 + i * 35, 390);

                    if (mouseIsPressed && (mr_spunky.menu_open || mr_spunky.home_storage.is_open)) {
                        if (Collide(mouseX, mouseY, 10 + i * 35, 360, 30, 30)) {
                            if (inv.hand.item.label === "blank") {
                                if (!keys[SHIFT]) {
                                    inv.hand.item = inv.items[i];
                                    inv.hand.from = "inventory";
                                    inv.hand.slot_num = i;
                                    inv.items[i] = Item.new("blank", 0);
                                } else if (mr_spunky.home_storage.is_open) {
                                    if (home.canAdd(inv.items[i])) {
                                        home.add(inv.items[i]);
                                    }
                                    inv.items[i] = Item.new("blank");
                                }
                            }
                        }
                    } else {
                        if (Collide(mouseX, mouseY, 10 + i * 35, 360, 30, 30)) {
                            if (inv.hand.from === "inventory") {
                                if (inv.items[i].label === "blank") {
                                    inv.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                    found_slot = true;
                                } else if (inv.items[i].label === inv.hand.item.label && [undefined, true].includes(inv.items[i].data.canStack)) {
                                    inv.items[i].count += inv.hand.item.count;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                } else if (inv.items[i].label !== inv.hand.item.label || (!inv.items[i].data.canStack || !inv.hand.item.data.canStack)) {
                                    var a = inv.items[i];
                                    inv.items[inv.hand.slot_num].label = a.label;
                                    inv.items[inv.hand.slot_num].count = a.count;
                                    inv.items[inv.hand.slot_num].data = a.data;
                                    inv.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                }
                            }
                            if (inv.hand.from === "home") {
                                if (inv.items[i].label === "blank") {
                                    inv.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                    found_slot = true;
                                } else if (inv.items[i].label === inv.hand.item.label) {
                                    inv.items[i].count += inv.hand.item.count;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                } else if (inv.items[i].label !== inv.hand.item.label || (!inv.items[i].data.canStack || !inv.hand.item.data.canStack)) {
                                    var a = inv.items[i];
                                    home.items[inv.hand.slot_num].label = a.label;
                                    home.items[inv.hand.slot_num].count = a.count;
                                    home.items[inv.hand.slot_num].data = a.data;
                                    inv.items[i] = inv.hand.item;
                                    inv.hand.item = Item.new("blank", 0);
                                    inv.hand.from = "none";
                                }
                            }
                        }
                    }
                }
                if (!found_slot) {
                    if (!mouseIsPressed) {
                        if (inv.hand.from === "inventory") {
                            inv.items[inv.hand.slot_num] = inv.hand.item;
                            inv.hand.item = Item.new("blank", 0);
                            inv.hand.from = "none";
                        }
                        if (inv.hand.from === "home") {
                            home.items[inv.hand.slot_num] = inv.hand.item;
                            inv.hand.item = Item.new("blank", 0);
                            inv.hand.from = "none";
                        }
                    }
                }

                mr_spunky.inventory.hand.item.draw(mouseX - 10, mouseY - 10, 40, 40);

                mr_spunky.inventory.render_type();

                if (mr_spunky.skill_menu_open) {

                    background(224, 224, 224);
                    fill(0, 0, 0);
                    textAlign(CENTER);
                    textSize(50);
                    text("SKILLS", 200, 48);
                    fill(128, 128, 128);
                    rect(0, 59, 409, 5);
                    textSize(30);
                    var skills = Object.keys(mr_spunky.skills);
                    noStroke();
                    for (var s = 0; s < 5; s++) {
                        fill(0, 20, 100);
                        textAlign(CENTER);
                        text(skills[s][0].toUpperCase() + skills[s].slice(1), 200, 108 + s * 62);

                        fill(201, 201, 201);
                        rect(100, 120 + s * 62, 200, 10);
                        fill(255, 0, 0);
                        rect(100, 120 + s * 62, 200 * (mr_spunky.skills[skills[s]] - floor(mr_spunky.skills[skills[s]])), 10);

                        fill(0);
                        textAlign(LEFT);
                        text(floor(mr_spunky.skills[skills[s]]), 310, 135 + s * 62);
                    }

                    noStroke();
                    textFont(FONT_SANS_SERIF);

                    fill(0, 50);
                    if (Collide(mouseX, mouseY, 10, 10, 70, 40)) {
                        fill(255, 0, 0, 110);
                        cursor("POINTER");
                        if (mouseIsPressed) {
                            mr_spunky.skill_menu_open = false;
                        }
                    }
                    rect(10, 10, 70, 40);
                    fill(255);
                    textAlign(CENTER);
                    textSize(25);
                    text("Back", 44, 39);

                }

                if (mr_spunky.help_menu_open) {
                    background(0, 0, 0);
                    pushMatrix();
                    translate(28, 161);
                    scale(0.8);

                    noStroke();
                    fill(252, 252, 252);

                    beginShape();
                    vertex(81.42860887486441, 34.35335421822392);
                    vertex(59.61042705668261, 41.62608149095119);
                    vertex(43.89470534604358, 65.00377914743407);
                    vertex(38.63550173973254, 112.33661160423341);
                    vertex(44.15588160213717, 158.89880876367837);
                    vertex(55.06497251122807, 192.53517240004197);
                    vertex(85.97406342031896, 208.89880876367832);
                    vertex(138.70133614759163, 198.89880876367832);
                    vertex(162.33769978395526, 157.98971785458747);
                    vertex(163.24679069304617, 100.71699058186022);
                    vertex(156.88315432940982, 59.80789967276935);
                    vertex(146.88315432940982, 38.89880876367846);
                    vertex(123.24679069304621, 35.26244512731483);
                    vertex(112.33769978395529, 37.08062694549664);
                    vertex(114.15588160213711, 84.35335421822387);
                    vertex(89.61042705668258, 86.17153603640568);
                    vertex(90.51951796577349, 37.08062694549664);
                    endShape();
                    beginShape();
                    vertex(95.47154670863675, 39.89388878557874);
                    vertex(95.06497251122804, 78.89880876367842);
                    vertex(109.61042705668257, 79.80789967276934);
                    vertex(105.73470907325087, 37.561351884530076);
                    endShape();
                    beginShape();
                    vertex(90.6699190935342, 8.235706667375515);
                    vertex(101.18832630615627, 30.023835893521213);
                    vertex(126.73302953680984, 8.987021468277092);
                    vertex(111.70673351877832, 10.489651070080244);
                    vertex(121.4738259304988, -14.303737359671757);
                    vertex(143.26195515664452, -22.56820016958909);
                    vertex(177.822435998117, -24.070829771392244);
                    vertex(201.11319482606586, -17.30899656327806);
                    vertex(209.37765763598318, -27.82740377590012);
                    vertex(181.57901000262487, -37.59449618762061);
                    vertex(153.029047568365, -36.84318138671903);
                    vertex(120.72251112959724, -31.583977780408);
                    vertex(101.93964110705784, -9.795848554262303);
                    vertex(100.43701150525469, 10.489651070080244);
                    vertex(91.42123389443577, 8.987021468277092);
                    endShape();
                    beginShape();
                    vertex(-2.7185106585316747, 44.14855415047084);
                    vertex(29.588025780236084, 44.89986895137241);
                    vertex(22.074877771220326, 14.095962114407804);
                    vertex(18.318303766712447, 31.37620253514405);
                    vertex(-5.723769862137978, 2.8262401008841684);
                    vertex(-7.22639946394113, -23.469777930670983);
                    vertex(6.297266952287234, -52.771055165832436);
                    vertex(28.085396178432934, -58.03025877214347);
                    vertex(24.328822173925055, -69.2999807856671);
                    vertex(4.043322549582507, -64.79209198025764);
                    vertex(-10.982973468449009, -49.76579596222613);
                    vertex(-21.50138068107107, -24.972407532474126);
                    vertex(-18.496121477464765, -4.6869079081315785);
                    vertex(-10.982973468449009, 22.360424924325148);
                    vertex(7.04858175318881, 37.38672094235667);
                    vertex(-2.7185106585316747, 41.89460974776612);
                    endShape();
                    beginShape();
                    vertex(180.5872784088232, 67.42199925666074);
                    vertex(209.5271692813626, 47.61436932702982);
                    vertex(208.5271692813626, 62.61436932702978);
                    vertex(231.52716928136255, 57.61436932702979);
                    vertex(268.52716928136243, 59.61436932702979);
                    vertex(288.52716928136243, 71.61436932702976);
                    vertex(298.5271692813624, 89.61436932702972);
                    vertex(283.52716928136243, 96.61436932702969);
                    vertex(272.52716928136243, 78.61436932702973);
                    vertex(237.52716928136255, 70.61436932702976);
                    vertex(209.5271692813626, 74.61436932702975);
                    vertex(212.5271692813626, 84.61436932702972);
                    vertex(180.5872784088232, 68.37789170979181);
                    endShape();
                    beginShape();
                    vertex(41.112773016429806, -34.52803752663365);
                    vertex(50.86277726281319, -38.633302472479286);
                    vertex(51.8890934992746, -65.83068273870663);
                    vertex(58.56014903627376, -66.85699897516804);
                    vertex(66.25752080973433, -45.30435800947845);
                    vertex(78.57331564727124, -44.79119989124774);
                    vertex(55.994358445120234, -97.13332795077962);
                    vertex(41.112773016429806, -93.54122112316468);
                    vertex(41.62593113466051, -74.04121263039791);
                    vertex(48.81014478989037, -75.06752886685932);
                    vertex(49.32330290812108, -85.84384934970412);
                    vertex(56.50751656335094, -76.60700322155142);
                    vertex(48.71078948731994, -75.10029002396004);
                    vertex(41.51170162950897, -74.08503404401233);
                    vertex(40.5996148981991, -35.04119564486436);
                    endShape();
                    beginShape();
                    endShape();
                    beginShape();
                    vertex(76.24844505432554, -99.6115428900165);
                    vertex(82.20684134550918, -101.01351848794205);
                    vertex(87.46424983773004, -82.78783571490973);
                    vertex(95.87610342528343, -85.59178691076086);
                    vertex(96.5770912242462, -77.53042722268889);
                    vertex(89.21671933513699, -76.12845162476331);
                    vertex(94.82462172683925, -49.841409163659016);
                    vertex(81.85634744602778, -45.98597626936372);
                    vertex(81.5058535465464, -74.02548822787497);
                    vertex(76.94943285328831, -71.92252483098663);
                    vertex(74.14548165743719, -80.33437841854);
                    vertex(79.75338404913944, -83.13832961439113);
                    vertex(76.03352241961994, -99.48213200713906);
                    endShape();
                    beginShape();
                    vertex(109.1114473501497, -54.791216318787725);
                    vertex(116.43676984931076, -57.104476055364906);
                    vertex(114.12351011273358, -81.7792465788548);
                    vertex(121.83437590132418, -86.02022276257962);
                    vertex(119.90665945417652, -94.50217513002927);
                    vertex(113.35242353387453, -92.57445868288163);
                    vertex(109.1114473501497, -111.08053657549904);
                    vertex(100.24395169327052, -108.76727683892186);
                    vertex(105.2560144558544, -93.73108855117022);
                    vertex(99.47286511441146, -87.94793920972727);
                    vertex(101.40058156155911, -77.53827039512997);
                    vertex(108.72590406072017, -81.7792465788548);
                    vertex(109.1114473501497, -55.17675960821726);
                    endShape();
                    beginShape();
                    endShape();
                    beginShape();
                    vertex(154.9028785635209, -88.60185391184916);
                    vertex(144.3880615790792, -91.40580510770029);
                    vertex(136.32670189100722, -88.95234781133055);
                    vertex(131.06929339878636, -77.73654302792607);
                    vertex(132.12077509723053, -67.57221994296577);
                    vertex(141.93460428270944, -61.26332975230075);
                    vertex(156.65534806092782, -65.11876264659604);
                    vertex(160.5107809552231, -70.37617113881689);
                    vertex(160.8612748547045, -66.1702443450402);
                    vertex(170.6751040401834, -66.5207382445216);
                    vertex(169.62362234173926, -76.33456743000052);
                    vertex(158.40781755833478, -77.0355552289633);
                    vertex(152.09892736766977, -71.77814673674244);
                    vertex(144.0375676795978, -68.97419554089133);
                    vertex(138.78015918737694, -77.38604912844468);
                    vertex(145.79003717700473, -85.44740881651666);
                    vertex(155.25337246300228, -81.59197592222137);
                    vertex(159.45929925677896, -77.0355552289633);
                    vertex(169.27312844225787, -75.98407353051913);
                    vertex(162.26325045263007, -92.10679290666306);
                    vertex(155.60386636248367, -88.95234781133055);
                    endShape();
                    beginShape();
                    vertex(197.19098136127965, -86.24398586079253);
                    vertex(202.60770526235567, -90.06755567331679);
                    vertex(194.0046731841761, -96.75880284523424);
                    vertex(182.215332928893, -97.7146952983653);
                    vertex(176.16134739239624, -91.02344812644786);
                    vertex(179.02902475178945, -73.49875315237837);
                    vertex(193.3674115487554, -68.08202925130234);
                    vertex(203.24496689777638, -78.27821541803368);
                    vertex(192.73014991333469, -79.23410787116474);
                    vertex(188.26931846538972, -77.00369214719227);
                    vertex(183.80848701744475, -82.10178523055794);
                    vertex(186.03890274141725, -90.7048173087375);
                    vertex(192.73014991333469, -89.74892485560643);
                    endShape();
                    beginShape();
                    vertex(208.0244291634317, -116.19528272556586);
                    vertex(213.75978388221807, -117.78843681411763);
                    vertex(216.3088304239009, -100.90100347546884);
                    vertex(223.00007759581834, -105.99909655883451);
                    vertex(229.37269395002545, -100.90100347546884);
                    vertex(221.08829268955623, -90.7048173087375);
                    vertex(229.6913247677358, -80.82726195971651);
                    vertex(222.36281596039765, -73.81738397008871);
                    vertex(215.6715687884802, -78.9154770534544);
                    vertex(213.44115306450772, -71.58696824611624);
                    vertex(207.06853671030063, -71.26833742840589);
                    vertex(204.5194901686178, -115.23939027243479);
                    endShape();
                    beginShape();
                    vertex(223.05909570488976, -36.66421281567973);
                    vertex(215.8748820496599, 0.2831716969308634);
                    vertex(227.16436065073538, 1.8226460516229714);
                    vertex(232.80909995127308, -14.085255613528812);
                    vertex(238.45383925181082, -15.111571849990218);
                    vertex(244.61173667057926, 1.3094879333922689);
                    vertex(255.388057153424, -0.22998642129983926);
                    vertex(241.01962984296435, -45.90105894383238);
                    vertex(227.16436065073538, -44.87474270737098);
                    vertex(234.3485743059652, -32.55894786983411);
                    vertex(239.48015548827223, -22.80894362345076);
                    vertex(229.21699312365817, -21.269469268758648);
                    vertex(233.9535124717439, -33.53195114375518);
                    vertex(226.79159221239885, -45.288310814755526);
                    endShape();
                    beginShape();
                    vertex(261.5261494127962, 0.7114887356324328);
                    vertex(259.3716209684738, -47.406313187569005);
                    vertex(267.7503426963944, -48.60327343441481);
                    vertex(269.90487114071686, -23.706500300022025);
                    vertex(283.07143385602075, -31.36704587983519);
                    vertex(288.0986668927731, -18.679267263269637);
                    vertex(289.29562713961894, -7.188448893549892);
                    vertex(281.5753688524526, 1.5542095300615373);
                    vertex(278.2835928686375, -10.30054553534899);
                    vertex(283.55021795475903, -15.327778572101378);
                    vertex(279.7199451648525, -21.07318775696125);
                    vertex(271.34122343693184, -16.764130868316347);
                    vertex(272.7775757331468, -11.497505782194796);
                    vertex(278.1352452840348, -10.444270232956683);
                    vertex(281.63508155980577, 1.669056933109078);
                    vertex(262.2443255609037, 0.47209668626327134);
                    endShape();
                    beginShape();
                    vertex(299.18157140574243, -30.312352747043512);
                    vertex(307.2921740383696, -30.891681506516882);
                    vertex(305.2645233802128, 1.2610646442551527);
                    vertex(298.602242646269, 2.419722163201893);
                    vertex(299.18157140574243, -31.471010265990255);
                    endShape();
                    beginShape();
                    vertex(302.6575439625826, -37.84362662019733);
                    vertex(298.8919070260057, -39.581612898617436);
                    vertex(303.236872722056, -46.533558012297874);
                    vertex(308.45083155731635, -44.50590735414108);
                    vertex(304.10586586126607, -37.55396224046064);
                    endShape();
                    beginShape();
                    vertex(322.24667697103536, -51.51115071369307);
                    vertex(320.7045038133173, -14.498994928458405);
                    vertex(319.5478739450287, 6.320342700736094);
                    vertex(326.10210986533065, 6.705885990165622);
                    vertex(329.5719994701964, -3.3182395350021);
                    vertex(327.64428302304873, -11.414648613022184);
                    vertex(328.80091289133736, -29.920726505639518);
                    vertex(328.80091289133736, -52.282237292552125);
                    endShape();
                    beginShape();
                    vertex(342.2949280213708, -26.450836900773766);
                    vertex(350.3913370993909, -27.22192347963282);
                    vertex(345.37927433680704, 2.850453095870344);
                    vertex(339.2105817059346, 2.850453095870344);
                    vertex(341.90938473194126, -27.60746676906235);
                    endShape();
                    beginShape();
                    vertex(346.5359042050956, -35.31833255765291);
                    vertex(345.37927433680704, -40.715938609666296);
                    vertex(352.31905354653856, -44.185828214532044);
                    vertex(352.70459683596806, -35.31833255765291);
                    vertex(346.9214474945251, -35.703875847082436);
                    endShape();
                    beginShape();
                    vertex(365.04198209771295, -54.20995373969976);
                    vertex(365.42752538714245, -31.0773563739281);
                    vertex(357.33111630912236, -29.53518321620999);
                    vertex(356.94557301969286, -21.824317427619434);
                    vertex(365.04198209771295, -21.438774138189906);
                    vertex(358.8732894668405, 6.705885990165622);
                    vertex(367.74078512371966, 5.9347994113065665);
                    vertex(371.5962180180149, -19.511057691042268);
                    vertex(378.92154051717597, -19.896600980471796);
                    vertex(378.5359972277464, -30.691813084498573);
                    vertex(371.98176130744446, -31.0773563739281);
                    vertex(370.0540448602968, -54.20995373969976);
                    vertex(365.42752538714245, -54.98104031855882);
                    endShape();
                    beginShape();
                    vertex(387.78903617405507, -24.523120453626127);
                    vertex(396.2709885415047, -26.836380190203293);
                    vertex(397.8131616992228, -11.029105323592656);
                    vertex(410.53609025039725, -24.908663743055655);
                    vertex(415.54815301298106, -15.270081507317462);
                    vertex(396.2709885415047, 6.320342700736094);
                    vertex(376.9938240700283, 25.597507172212485);
                    vertex(369.28295828143774, 19.814357830769566);
                    vertex(366.9696985448606, 11.332405463319954);
                    vertex(376.60828078059876, 9.790232305601844);
                    vertex(378.5359972277464, 14.03120848932665);
                    vertex(386.6324063057665, 1.308279938152233);
                    vertex(388.17457946348463, -25.294207032485183);
                    endShape();
                    beginShape();
                    vertex(300.03215049303725, 98.09187138050353);
                    vertex(294.90056931073025, 142.41007250042773);
                    vertex(303.76420953471506, 143.80959464105692);
                    vertex(307.0297611961832, 120.95073301078023);
                    vertex(320.09196784205557, 123.28326991182887);
                    vertex(327.0895785452015, 107.4220189846981);
                    vertex(322.89101212331394, 100.8909156617619);
                    vertex(313.98755701184587, 99.29054040212205);
                    vertex(314.4938792795388, 107.88852636490783);
                    vertex(319.6254604618459, 110.22106326595647);
                    vertex(315.893401420168, 114.41962968784402);
                    vertex(309.82880547744156, 115.35264444826348);
                    vertex(307.49626857639294, 109.75455588574674);
                    vertex(308.4292833368124, 105.55598946385919);
                    vertex(314.49098972917534, 107.59718023805773);
                    vertex(314.0273718993291, 99.49139352113272);
                    vertex(300.54677632757625, 98.00505474485712);
                    endShape();
                    beginShape();
                    vertex(333.3944390107154, 99.62293321520467);
                    vertex(326.9308536777481, 145.8255987434527);
                    vertex(334.59139925756125, 146.78316694092936);
                    vertex(339.13984819557527, 99.86232526457383);
                    vertex(333.6338310600846, 99.86232526457383);
                    endShape();
                    beginShape();
                    vertex(364.99418952744463, 130.98329168256473);
                    vertex(361.40330878690725, 125.95605864581236);
                    vertex(353.9821552564633, 124.75909839896656);
                    vertex(345.36404147917347, 132.18025192941053);
                    vertex(342.25194483737437, 141.27714980543865);
                    vertex(343.9276891829585, 146.78316694092936);
                    vertex(350.39127451592583, 151.81039997768173);
                    vertex(357.85818624069793, 149.26556073624283);
                    vertex(361.5333837639018, 149.0575306877596);
                    vertex(363.5578372312297, 152.76796817515836);
                    vertex(367.38811002113624, 152.76796817515836);
                    vertex(367.8668941198746, 141.75593390417697);
                    vertex(362.47544781240885, 141.07885676164267);
                    vertex(354.70033140457076, 144.38924644723775);
                    vertex(349.91249041718754, 143.67107029913026);
                    vertex(348.2367460716034, 136.01052471931712);
                    vertex(352.78519500961744, 132.18025192941053);
                    vertex(358.5306041944773, 131.70146783067221);
                    vertex(362.8396610831222, 137.44687701553207);
                    vertex(362.3608769843839, 141.03775775606948);
                    vertex(367.62750207050544, 141.75593390417697);
                    vertex(370.50020666293534, 128.34997913950397);
                    vertex(366.4305418236596, 127.63180299139648);
                    endShape();
                    beginShape();
                    vertex(374.0820547243845, 152.6513867918812);
                    vertex(378.6324821090875, 129.89924986836596);
                    vertex(385.55704552059217, 129.70140519946582);
                    vertex(384.17213283829125, 134.25183258416888);
                    vertex(400.197551019202, 130.88847321286661);
                    vertex(403.7587550594044, 141.96777467127404);
                    vertex(402.96737638380387, 151.06862944068016);
                    vertex(399.80186168140176, 157.3996588454844);
                    vertex(394.8557449588984, 156.806124838784);
                    vertex(396.83419164789973, 145.13328937367618);
                    vertex(393.6686769454976, 143.15484268467483);
                    vertex(383.3807541626907, 146.32035738707697);
                    vertex(382.5893754870902, 151.46431877848042);
                    vertex(381.2044628047893, 155.22336748758295);
                    vertex(373.88421005548435, 154.62983348088255);
                    endShape();
                    beginShape();
                    vertex(415.0259781603864, 158.3396877025156);
                    vertex(419.64440122446274, 140.89231168267176);
                    vertex(412.4601875692329, 139.86599544621035);
                    vertex(415.0259781603864, 132.16862367274985);
                    vertex(424.26282428853904, 132.68178179098055);
                    vertex(429.90756358907674, 120.87914507167444);
                    vertex(442.7365165448442, 125.49756813575075);
                    vertex(434.52598665315304, 134.73441426390335);
                    vertex(443.76283278130563, 141.91862791913317);
                    vertex(439.14440971722934, 148.58968345613226);
                    vertex(430.4207217073074, 144.48441851028667);
                    vertex(425.2891405250004, 161.41863641189977);
                    vertex(416.5654525150785, 159.36600393897697);
                    endShape();

                    popMatrix();
                    noStroke();
                    textFont(FONT_SANS_SERIF);

                    fill(255, 50);
                    if (Collide(mouseX, mouseY, 10, 10, 70, 40)) {
                        fill(255, 0, 0, 110);
                        cursor("POINTER");
                        if (mouseIsPressed) {
                            mr_spunky.help_menu_open = false;
                        }
                    }
                    rect(10, 10, 70, 40);
                    fill(255);
                    textAlign(CENTER);
                    textSize(25);
                    text("Back", 44, 39);
                }

                mr_spunky.stats();

                for (var i = 0; i < plots.length; i++) {
                    var p = plots[i];
                    p.tick();
                }
                for (var l = 0; l < ores.length; l++) {
                    var lvl = ores[l];
                    for (var i = 0; i < lvl.length; i++) {
                        lvl[i].tick();
                    }
                }

            } catch (e) {
                println(e.message);
                debug(e);
            }

            fill(21, 255, 0);
            textAlign(LEFT);
            text(this.__frameRate, 10, 15);


            mr_spunky.dialog.render();
            mr_spunky.deathScreen();
            mr_spunky.run_intro();
            mr_spunky.cheats_menu();
        }

    };

})();
// }

