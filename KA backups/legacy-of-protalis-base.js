


//the textBar function is used for talking and sign text



//the globals
{

var battle = '';
var closeLevelUpBar = true;
var camX = 0;
var camY = 0;
//the fills for the talking buttons
var textFill1 = 255;
var textFill2 = 255;
var textFill3 = 255;
var textFill4 = 255;
var room = 'entrance';
var scene = '';


var hasteExtend = 0;
var fireShieldExtend = 0;

var antiMagicExtend = 0;
var slowExtend = 0;
var talkButtonReload = 0;

var door1Color = color(140,70,20);
var door2Color = color(140,70,20);
var door3Color = color(140,70,20);
var door4Color = color(140,70,20);

var magicInfoBarSize = 0;
var magicInfoBarStatus = '';

var attributeInfoBarSize = 0;
var attributeInfoBarStatus = '';
var openInventoryReload = 0;
//what you are moving in you inventory
var selected = '';
var gold = 50;

var inventorySelectReload = 0;
var sceneTo;


}

var inventoryBackground = function(){
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 6; j++){
            image(getImage("cute/RoofSouth"),i*100,j*100-50);
        }
    }
    noStroke();
    fill(0,50);
    rect(0,0,600,600);
    filter(BLUR,2);
};

inventoryBackground();
var inventoryBackground = get(0,0,600,600);

var travelBackground = function(){
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 6; j++){
            image(getImage("cute/RampSouth"),i*100,j*100-50);
        }
    }
    noStroke();
    fill(0,50);
    rect(0,0,600,600);
    filter(BLUR,2);
};

travelBackground();
var travelBackground = get(0,0,600,600);

//the image construction
{

var ironAxe = function(){
    
    noStroke();
    fill(70);
    pushMatrix();
        translate(-100,30);
        beginShape();
        vertex(362,316);
        bezierVertex(310,311,260,271,305,196);
        bezierVertex(195,165,64,332,362,316);
        endShape();
        beginShape();
        vertex(129,102);
        bezierVertex(130,168,216,195,247,145);
        bezierVertex(370,218,64,332,129,102);
        endShape();
        beginShape();
        vertex(129,102);
        bezierVertex(129,160,246,309,360,314);
        bezierVertex(246,405,49,288,129,102);
        endShape();
        fill(200);
        beginShape();
        vertex(129,102);
        bezierVertex(77,262,243,378,365,314);
        bezierVertex(246,405,49,295,129,102);
        endShape();
    popMatrix();
    fill(70);
    beginShape();
        vertex(204, 225);
        vertex(147, 174);
        vertex(147, 215);
        vertex(180, 239);
    endShape();
    
    fill(8,3,0);
    beginShape();
        vertex(201, 232);
        vertex(203, 235);
        vertex(207, 235);
        vertex(209, 240);
        vertex(212, 246);
        vertex(221, 246);
        vertex(398, 408);
        vertex(400, 412);
        vertex(404, 416);
        vertex(406, 415);
        vertex(408, 420);
        vertex(412, 420);
        vertex(526, 524);
        vertex(526, 525);
        vertex(528, 530);
        vertex(533, 532);
        vertex(538, 537);
        vertex(542, 548);
        vertex(552, 550);
        vertex(558, 549);
        vertex(585, 520);
        vertex(585, 512);
        vertex(583, 507);
        vertex(579, 504);
        vertex(572, 505);
        vertex(568, 501);
        vertex(564, 501);
        vertex(562, 497);
        vertex(555, 491);
        vertex(551, 490);
        vertex(551, 488);
        vertex(443, 389);
        vertex(440, 387);
        vertex(437, 384);
        vertex(429, 377);
        vertex(254, 218);
        vertex(249, 212);
        vertex(247, 209);
        vertex(240, 205);
        vertex(235, 200);
        vertex(210, 214);
    endShape();
    
    fill(30,20,10);
    beginShape();
        vertex(566, 513);
        vertex(569, 518);
        vertex(574, 525);
        vertex(558, 544);
        vertex(551, 549);
        vertex(544, 549);
        vertex(541, 542);
        vertex(542, 536);
        vertex(566, 513);
    endShape();
    fill(200,200,180);
    beginShape();
        vertex(567, 514);
        vertex(574, 505);
        vertex(580, 504);
        vertex(584, 508);
        vertex(584, 513);
        vertex(574, 525);
    endShape();
    
    fill(133, 133, 133);
    beginShape();
        vertex(565, 542);
        vertex(587, 550);
        vertex(575, 530);
    endShape();
    
    strokeWeight(5);
    stroke(158, 148, 38);
    beginShape();
        vertex(404, 411);
        vertex(431, 380);
    endShape();
    beginShape();
        vertex(409, 418);
        vertex(437, 386);
    endShape();
    strokeWeight(6);
    beginShape();
        vertex(559, 496);
        vertex(532, 525);
    endShape();
    beginShape();
        vertex(540, 533);
        vertex(567, 504);
    endShape();
    
    strokeWeight(2);
    stroke(200);
    beginShape();
        vertex(430, 402);
        vertex(542, 503);
    endShape();
    beginShape();
        vertex(546, 499);
        vertex(434, 397);
    endShape();
    beginShape();
        vertex(425, 406);
        vertex(538, 509);
    endShape();
    beginShape();
        vertex(534, 514);
        vertex(420, 411);
    endShape();
    beginShape();
        vertex(416, 416);
        vertex(527, 518);
    endShape();
    beginShape();
        vertex(550, 495);
        vertex(440, 393);
    endShape();
    
    noStroke();
    fill(171, 145, 85);
    beginShape();
        vertex(145, 117);
        vertex(148, 119);
        vertex(153, 119);
        vertex(155, 124);
        vertex(153, 129);
        vertex(157, 134);
        vertex(159, 146);
        vertex(161, 149);
        vertex(159, 155);
        vertex(136, 143);
        vertex(125, 131);
    endShape();
    
    
    fill(23, 10, 5);
    beginShape();
        vertex(130, 133);
        vertex(138, 134);
        vertex(141, 133);
        vertex(139, 137);
        vertex(139, 141);
        vertex(152, 128);
        vertex(154, 131);
        vertex(144, 145);
        vertex(146, 147);
        vertex(150, 147);
        vertex(156, 139);
        vertex(157, 134);
        vertex(158, 136);
        vertex(158, 145);
        vertex(156, 143);
        vertex(152, 149);
        vertex(156, 153);
        vertex(159, 152);
        vertex(163, 148);
        vertex(170, 145);
        vertex(143, 174);
        vertex(146, 165);
        vertex(142, 161);
        vertex(136, 161);
        vertex(134, 163);
        vertex(130, 160);
        vertex(130, 157);
        vertex(123, 158);
        vertex(119, 155);
        vertex(115, 151);
    endShape();
    beginShape();
    vertex(233, 194);
    vertex(234, 201);
    vertex(228, 210);
    vertex(210, 206);
endShape();
    
    stroke(5,4,0);
    strokeWeight(8);
    beginShape();
        vertex(171, 149);
        vertex(148, 174);
    endShape();
    strokeWeight(5);
    beginShape();
        vertex(143, 115);
        vertex(114, 150);
    endShape();
    strokeWeight(2);
    stroke(168, 157, 32);
    beginShape();
        vertex(171, 147);
        vertex(144, 176);
    endShape();
    beginShape();
        vertex(155, 132);
        vertex(130, 158);
    endShape();
    beginShape();
        vertex(145, 119);
        vertex(116, 151);
    endShape();
    noStroke();
    
    fill(40,20,5);
    beginShape();
        vertex(210, 220);
        vertex(204, 226);
        vertex(151, 177);
        vertex(172, 149);
        vertex(174, 154);
    endShape();
    
    fill(25,15,0);
    beginShape();
        vertex(164, 160);
        vertex(222, 208);
        vertex(209, 222);
        vertex(151, 173);
    endShape();
    fill(71, 59, 16);
    beginShape();
        vertex(231, 194);
        vertex(221, 208);
        vertex(165, 162);
        vertex(176, 149);
    endShape();
    fill(200);
    beginShape();
        vertex(227, 199);
        vertex(226, 203);
        vertex(173, 154);
        vertex(175, 152);
    endShape();
    
    
    
    fill(120, 99, 65);
    beginShape();
        vertex(107, 149);
        vertex(116, 148);
        vertex(144, 114);
        vertex(140, 110);
        vertex(51, 61);
        vertex(34, 50);
        vertex(86, 114);
    endShape();
    
    fill(38, 19, 4);
        beginShape();
        vertex(105, 149);
        vertex(34, 50);
        vertex(117, 129);
        vertex(115, 141);
        vertex(112, 146);
        vertex(106, 150);
    endShape();
    beginShape();
        vertex(124, 123);
        vertex(34, 50);
        vertex(141, 110);
        vertex(140, 116);
        vertex(124, 123);
    endShape();
    
    fill(30,10,2);
    beginShape();
        vertex(280, 170);
        vertex(265, 170);
        vertex(258, 176);
        vertex(245, 175);
        vertex(237, 189);
        vertex(234, 195);
        vertex(229, 199);
        vertex(174, 149);
        vertex(182, 145);
        vertex(195, 130);
        vertex(196, 107);
        vertex(200, 86);
        vertex(198, 77);
        vertex(250, 140);
        vertex(271, 160);
    endShape();
    
    stroke(115, 108, 16);
    beginShape();
        vertex(259, 174);
        vertex(197, 119);
    endShape();
    
    beginShape();
        vertex(198, 111);
        vertex(264, 170);
    endShape();
    noStroke();
    fill(40,30,5);
    beginShape();
        vertex(239, 180);
        vertex(230, 170);
        vertex(216, 158);
        vertex(209, 161);
        vertex(216, 181);
        vertex(229, 189);
        vertex(236, 186);
    endShape();
    
    fill(210);
    beginShape();
        vertex(192, 52);
        vertex(245, 113);
        vertex(283, 170);
        vertex(270, 167);
        vertex(263, 160);
        vertex(216, 100);
        vertex(199, 77);
        vertex(198, 68);
    endShape();
    
    
    fill(145, 117, 71);
    beginShape();
        vertex(233, 216);
        vertex(236, 221);
        vertex(235, 228);
        vertex(249, 212);
        vertex(248, 208);
        vertex(243, 206);
        vertex(240, 206);
        vertex(232, 216);
    endShape();
    fill(219, 209, 204);
    beginShape();
        vertex(237, 210);
        vertex(241, 212);
        vertex(244, 214);
        vertex(244, 215);
        vertex(244, 216);
        vertex(249, 212);
        vertex(249, 209);
        vertex(246, 207);
        vertex(239, 205);
    endShape();
    
    fill(205);
    beginShape();
        vertex(220, 244);
        vertex(297, 317);
        vertex(386, 391);
        vertex(407, 397);
        vertex(402, 380);
        vertex(420, 382);
        vertex(414, 368);
        vertex(422, 373);
        vertex(249, 214);
    endShape();
    fill(26, 13, 1,200);
    beginShape();
    vertex(221, 245);
    vertex(286, 308);
    vertex(310, 322);
    vertex(302, 303);
    vertex(237, 244);
    vertex(224, 242);
endShape();
    
    strokeWeight(3);
    stroke(163, 137, 50);
    noFill();
    beginShape();
        vertex(234, 200);
        vertex(206, 232);
    endShape();
    beginShape();
        vertex(239, 207);
        vertex(213, 235);
        vertex(214, 241);
    endShape();
    
    
    
    strokeWeight(2);
    stroke(26,13,0);
    beginShape();
        vertex(302, 303);
        vertex(312, 323);
    endShape();
    beginShape();
        vertex(220, 245);
        vertex(230, 235);
        vertex(250, 212);
    endShape();
    beginShape();
        vertex(246, 220);
        vertex(249, 227);
        vertex(313, 286);
        vertex(316, 289);
        vertex(321, 309);
        vertex(300, 302);
        vertex(237, 244);
        vertex(226, 242);
        vertex(221, 245);
    endShape();
    beginShape();
        vertex(326, 284);
        vertex(333, 294);
        vertex(314, 288);
    endShape();
    beginShape();
        vertex(332, 295);
        vertex(413, 368);
        vertex(422, 373);
    endShape();
    beginShape();
        vertex(413, 368);
        vertex(420, 382);
        vertex(401, 380);
        vertex(322, 310);
    endShape();
    
    strokeWeight(5);
    beginShape();
        vertex(248, 239);
        vertex(248, 239);
    endShape();
    beginShape();
        vertex(262, 252);
        vertex(262, 252);
    endShape();
    beginShape();
    endShape();
    beginShape();
        vertex(276, 266);
        vertex(276, 266);
    endShape();
    beginShape();
        vertex(293, 281);
        vertex(293, 281);
    endShape();
    beginShape();
        vertex(308, 295);
        vertex(308, 295);
    endShape();
    beginShape();
        vertex(333, 306);
        vertex(333, 306);
    endShape();
    beginShape();
        vertex(349, 323);
        vertex(349, 323);
    endShape();
    beginShape();
        vertex(369, 339);
        vertex(369, 339);
    endShape();
    beginShape();
        vertex(387, 356);
        vertex(387, 356);
    endShape();
    beginShape();
        vertex(404, 370);
        vertex(404, 370);
    endShape();
    beginShape();
        vertex(391, 384);
        vertex(391, 384);
    endShape();
    beginShape();
        vertex(374, 368);
        vertex(374, 368);
    endShape();
    beginShape();
        vertex(355, 353);
        vertex(355, 353);
    endShape();
    beginShape();
        vertex(338, 336);
        vertex(338, 336);
    endShape();
    beginShape();
        vertex(321, 322);
        vertex(321, 322);
    endShape();
    beginShape();
        vertex(318, 282);
        vertex(318, 282);
    endShape();
    beginShape();
        vertex(301, 268);
        vertex(301, 268);
    endShape();
    beginShape();
        vertex(286, 253);
        vertex(286, 253);
    endShape();
    beginShape();
        vertex(272, 241);
        vertex(272, 241);
    endShape();
    beginShape();
        vertex(256, 226);
        vertex(256, 226);
    endShape();
    
    strokeWeight(2);
    fill(26, 13, 0);
    beginShape();
        vertex(400, 380);
        vertex(408, 397);
    endShape();
    beginShape();
        vertex(407, 398);
        vertex(388, 390);
        vertex(314, 325);
        vertex(295, 314);
        vertex(400, 408);
        vertex(388, 389);
    endShape();
    
    noStroke();
    
    
};
var axeMask = function(){
    background(0);
    noStroke();
    fill(255, 255, 255);
    beginShape();
        vertex(201, 232);
        vertex(203, 235);
        vertex(207, 235);
        vertex(209, 240);
        vertex(212, 246);
        vertex(221, 246);
        vertex(398, 408);
        vertex(400, 412);
        vertex(404, 416);
        vertex(406, 415);
        vertex(408, 420);
        vertex(412, 420);
        vertex(526, 524);
        vertex(526, 525);
        vertex(528, 530);
        vertex(533, 532);
        vertex(538, 537);
        vertex(542, 548);
        vertex(552, 550);
        vertex(558, 549);
        vertex(585, 520);
        vertex(585, 512);
        vertex(583, 507);
        vertex(579, 504);
        vertex(572, 505);
        vertex(568, 501);
        vertex(564, 501);
        vertex(562, 497);
        vertex(555, 491);
        vertex(551, 490);
        vertex(551, 488);
        vertex(443, 389);
        vertex(440, 387);
        vertex(437, 384);
        vertex(429, 377);
        vertex(254, 218);
        vertex(249, 212);
        vertex(247, 209);
        vertex(240, 205);
        vertex(235, 200);
        vertex(210, 214);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(566, 513);
        vertex(569, 518);
        vertex(574, 525);
        vertex(558, 544);
        vertex(551, 549);
        vertex(544, 549);
        vertex(541, 542);
        vertex(542, 536);
        vertex(566, 513);
    endShape();
    fill(255, 255, 255);
    beginShape();
        vertex(567, 514);
        vertex(574, 505);
        vertex(580, 504);
        vertex(584, 508);
        vertex(584, 513);
        vertex(574, 525);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(565, 542);
        vertex(587, 550);
        vertex(575, 530);
    endShape();
    
    strokeWeight(5);
    stroke(255, 255, 255);
    beginShape();
        vertex(404, 411);
        vertex(431, 380);
    endShape();
    beginShape();
        vertex(409, 418);
        vertex(437, 386);
    endShape();
    strokeWeight(6);
    beginShape();
        vertex(559, 496);
        vertex(532, 525);
    endShape();
    beginShape();
        vertex(540, 533);
        vertex(567, 504);
    endShape();
    
    strokeWeight(2);
    stroke(255, 255, 255);
    beginShape();
        vertex(430, 402);
        vertex(542, 503);
    endShape();
    beginShape();
        vertex(546, 499);
        vertex(434, 397);
    endShape();
    beginShape();
        vertex(425, 406);
        vertex(538, 509);
    endShape();
    beginShape();
        vertex(534, 514);
        vertex(420, 411);
    endShape();
    beginShape();
        vertex(416, 416);
        vertex(527, 518);
    endShape();
    beginShape();
        vertex(550, 495);
        vertex(440, 393);
    endShape();
    
    noStroke();
    fill(255, 255, 255);
    beginShape();
        vertex(145, 117);
        vertex(148, 119);
        vertex(153, 119);
        vertex(155, 124);
        vertex(153, 129);
        vertex(157, 134);
        vertex(159, 146);
        vertex(161, 149);
        vertex(159, 155);
        vertex(136, 143);
        vertex(125, 131);
    endShape();
    
    
    fill(255, 255, 255);
    beginShape();
        vertex(130, 133);
        vertex(138, 134);
        vertex(141, 133);
        vertex(139, 137);
        vertex(139, 141);
        vertex(152, 128);
        vertex(154, 131);
        vertex(144, 145);
        vertex(146, 147);
        vertex(150, 147);
        vertex(156, 139);
        vertex(157, 134);
        vertex(158, 136);
        vertex(158, 145);
        vertex(156, 143);
        vertex(152, 149);
        vertex(156, 153);
        vertex(159, 152);
        vertex(163, 148);
        vertex(170, 145);
        vertex(143, 174);
        vertex(146, 165);
        vertex(142, 161);
        vertex(136, 161);
        vertex(134, 163);
        vertex(130, 160);
        vertex(130, 157);
        vertex(123, 158);
        vertex(119, 155);
        vertex(115, 151);
    endShape();
    beginShape();
    vertex(233, 194);
    vertex(234, 201);
    vertex(228, 210);
    vertex(210, 206);
endShape();
    
    stroke(255, 255, 255);
    strokeWeight(8);
    beginShape();
        vertex(171, 149);
        vertex(148, 174);
    endShape();
    strokeWeight(5);
    beginShape();
        vertex(143, 115);
        vertex(114, 150);
    endShape();
    strokeWeight(2);
    stroke(255, 255, 255);
    beginShape();
        vertex(171, 147);
        vertex(144, 176);
    endShape();
    beginShape();
        vertex(155, 132);
        vertex(130, 158);
    endShape();
    beginShape();
        vertex(145, 119);
        vertex(116, 151);
    endShape();
    noStroke();
    
    fill(255, 255, 255);
    beginShape();
        vertex(210, 220);
        vertex(204, 226);
        vertex(151, 177);
        vertex(172, 149);
        vertex(174, 154);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(164, 160);
        vertex(222, 208);
        vertex(209, 222);
        vertex(151, 173);
    endShape();
    fill(255, 255, 255);
    beginShape();
        vertex(231, 194);
        vertex(221, 208);
        vertex(165, 162);
        vertex(176, 149);
    endShape();
    fill(255, 255, 255);
    beginShape();
        vertex(227, 199);
        vertex(226, 203);
        vertex(173, 154);
        vertex(175, 152);
    endShape();
    
    fill(255, 255, 255);
    pushMatrix();
        translate(-100,30);
        beginShape();
        vertex(362,316);
        bezierVertex(310,311,260,271,305,196);
        bezierVertex(195,165,64,332,362,316);
        endShape();
        beginShape();
        vertex(129,102);
        bezierVertex(130,168,216,195,247,145);
        bezierVertex(370,218,64,332,129,102);
        endShape();
        beginShape();
        vertex(129,102);
        bezierVertex(129,160,246,309,360,314);
        bezierVertex(246,405,49,288,129,102);
        endShape();
        fill(200);
        beginShape();
        vertex(129,102);
        bezierVertex(77,262,243,378,365,314);
        bezierVertex(246,405,49,295,129,102);
        endShape();
    popMatrix();
    fill(255, 255, 255);
    beginShape();
        vertex(204, 225);
        vertex(147, 174);
        vertex(147, 215);
        vertex(180, 239);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(107, 149);
        vertex(116, 148);
        vertex(144, 114);
        vertex(140, 110);
        vertex(51, 61);
        vertex(34, 50);
        vertex(86, 114);
    endShape();
    
    fill(255, 255, 255);
        beginShape();
        vertex(105, 149);
        vertex(34, 50);
        vertex(117, 129);
        vertex(115, 141);
        vertex(112, 146);
        vertex(106, 150);
    endShape();
    beginShape();
        vertex(124, 123);
        vertex(34, 50);
        vertex(141, 110);
        vertex(140, 116);
        vertex(124, 123);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(280, 170);
        vertex(265, 170);
        vertex(258, 176);
        vertex(245, 175);
        vertex(237, 189);
        vertex(234, 195);
        vertex(229, 199);
        vertex(174, 149);
        vertex(182, 145);
        vertex(195, 130);
        vertex(196, 107);
        vertex(200, 86);
        vertex(198, 77);
        vertex(250, 140);
        vertex(271, 160);
    endShape();
    
    stroke(255, 255, 255);
    beginShape();
        vertex(259, 174);
        vertex(197, 119);
    endShape();
    
    beginShape();
        vertex(198, 111);
        vertex(264, 170);
    endShape();
    noStroke();
    fill(255, 255, 255);
    beginShape();
        vertex(239, 180);
        vertex(230, 170);
        vertex(216, 158);
        vertex(209, 161);
        vertex(216, 181);
        vertex(229, 189);
        vertex(236, 186);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(192, 52);
        vertex(245, 113);
        vertex(283, 170);
        vertex(270, 167);
        vertex(263, 160);
        vertex(216, 100);
        vertex(198, 77);
        vertex(198, 68);
    endShape();
    
    
    fill(255, 255, 255);
    beginShape();
        vertex(233, 216);
        vertex(236, 221);
        vertex(235, 228);
        vertex(249, 212);
        vertex(248, 208);
        vertex(243, 206);
        vertex(240, 206);
        vertex(232, 216);
    endShape();
    fill(255, 255, 255);
    beginShape();
        vertex(237, 210);
        vertex(241, 212);
        vertex(244, 214);
        vertex(244, 215);
        vertex(244, 216);
        vertex(249, 212);
        vertex(249, 209);
        vertex(246, 207);
        vertex(239, 205);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(220, 244);
        vertex(297, 317);
        vertex(386, 391);
        vertex(407, 397);
        vertex(402, 380);
        vertex(420, 382);
        vertex(414, 368);
        vertex(422, 373);
        vertex(249, 214);
    endShape();
    fill(255, 255, 255,200);
    beginShape();
    vertex(221, 245);
    vertex(286, 308);
    vertex(310, 322);
    vertex(302, 303);
    vertex(237, 244);
    vertex(224, 242);
endShape();
    
    strokeWeight(3);
    stroke(255, 255, 255);
    noFill();
    beginShape();
        vertex(234, 200);
        vertex(206, 232);
    endShape();
    beginShape();
        vertex(239, 207);
        vertex(213, 235);
        vertex(214, 241);
    endShape();
    
    
    
    strokeWeight(2);
    stroke(255, 255, 255);
    beginShape();
        vertex(302, 303);
        vertex(312, 323);
    endShape();
    beginShape();
        vertex(220, 245);
        vertex(230, 235);
        vertex(250, 212);
    endShape();
    beginShape();
        vertex(246, 220);
        vertex(249, 227);
        vertex(313, 286);
        vertex(316, 289);
        vertex(321, 309);
        vertex(300, 302);
        vertex(237, 244);
        vertex(226, 242);
        vertex(221, 245);
    endShape();
    beginShape();
        vertex(326, 284);
        vertex(333, 294);
        vertex(314, 288);
    endShape();
    beginShape();
        vertex(332, 295);
        vertex(413, 368);
        vertex(422, 373);
    endShape();
    beginShape();
        vertex(413, 368);
        vertex(420, 382);
        vertex(401, 380);
        vertex(322, 310);
    endShape();
    
    strokeWeight(5);
    beginShape();
        vertex(248, 239);
        vertex(248, 239);
    endShape();
    beginShape();
        vertex(262, 252);
        vertex(262, 252);
    endShape();
    beginShape();
    endShape();
    beginShape();
        vertex(276, 266);
        vertex(276, 266);
    endShape();
    beginShape();
        vertex(293, 281);
        vertex(293, 281);
    endShape();
    beginShape();
        vertex(308, 295);
        vertex(308, 295);
    endShape();
    beginShape();
        vertex(333, 306);
        vertex(333, 306);
    endShape();
    beginShape();
        vertex(349, 323);
        vertex(349, 323);
    endShape();
    beginShape();
        vertex(369, 339);
        vertex(369, 339);
    endShape();
    beginShape();
        vertex(387, 356);
        vertex(387, 356);
    endShape();
    beginShape();
        vertex(404, 370);
        vertex(404, 370);
    endShape();
    beginShape();
        vertex(391, 384);
        vertex(391, 384);
    endShape();
    beginShape();
        vertex(374, 368);
        vertex(374, 368);
    endShape();
    beginShape();
        vertex(355, 353);
        vertex(355, 353);
    endShape();
    beginShape();
        vertex(338, 336);
        vertex(338, 336);
    endShape();
    beginShape();
        vertex(321, 322);
        vertex(321, 322);
    endShape();
    beginShape();
        vertex(318, 282);
        vertex(318, 282);
    endShape();
    beginShape();
        vertex(301, 268);
        vertex(301, 268);
    endShape();
    beginShape();
        vertex(286, 253);
        vertex(286, 253);
    endShape();
    beginShape();
        vertex(272, 241);
        vertex(272, 241);
    endShape();
    beginShape();
        vertex(256, 226);
        vertex(256, 226);
    endShape();
    
    strokeWeight(2);
    fill(255, 255, 255);
    beginShape();
        vertex(400, 380);
        vertex(408, 397);
    endShape();
    beginShape();
        vertex(407, 398);
        vertex(388, 390);
        vertex(314, 325);
        vertex(295, 314);
        vertex(400, 408);
        vertex(388, 389);
    endShape();
    
    noStroke();
};
ironAxe();
var ironAxe = get(0,0,600,600);
axeMask();
var axeMask = get(0,0,600,600);
if(ironAxe){
    ironAxe.mask(axeMask);
}

var saphireStaff = function(){
    strokeWeight(3);
    stroke(130, 121, 100);
    beginShape();
        vertex(427, 292);
        vertex(440, 292);
        vertex(444, 284);
        vertex(453, 282);
        vertex(461, 271);
        vertex(470, 268);
    endShape();
    beginShape();
        vertex(446, 307);
        vertex(449, 309);
        vertex(454, 314);
        vertex(465, 311);
        vertex(472, 315);
        vertex(481, 318);
    endShape();
    beginShape();
        vertex(406, 299);
        vertex(456, 297);
        vertex(463, 293);
        vertex(474, 295);
        vertex(481, 292);
    endShape();
    
    
    noStroke();
    fill(138, 123, 100);
    rect(100,290,350,7);
    fill(125, 111, 91);
    rect(100,297,350,7);
    
    stroke(90,130,255);
    fill(100,150,255);
    strokeWeight(2);
    pushMatrix();
        translate(200,0);
        scale(-1,1);
        beginShape();
            vertex(104, 285);
            vertex(100, 290);
            vertex(95, 289);
            vertex(92, 296);
            vertex(96, 300);
            vertex(92, 307);
            vertex(97, 306);
            vertex(100, 310);
            vertex(107, 306);
            vertex(110, 308);
            vertex(107, 301);
            vertex(111, 297);
            vertex(105, 296);
            vertex(109, 289);
            vertex(104, 292);
        endShape();
    popMatrix();
    
    fill(120,190,255);
    beginShape();
        vertex(102, 299);
        vertex(99, 297);
        vertex(95, 296);
        vertex(89, 288);
        vertex(94, 290);
        vertex(96, 284);
        vertex(100, 288);
        vertex(104, 289);
        vertex(106, 293);
        vertex(109, 296);
        vertex(105, 300);
    endShape(CLOSE);
    
    fill(76, 180, 255);
    beginShape();
        vertex(98, 299);
        vertex(100, 303);
        vertex(95, 307);
        vertex(100, 311);
        vertex(102, 307);
        vertex(109, 307);
        vertex(104, 301);
        vertex(106, 298);
    endShape(CLOSE);
    
    fill(102, 196, 255);
    beginShape();
        vertex(445, 286);
        vertex(437, 288);
        vertex(425, 284);
        vertex(415, 289);
        vertex(402, 286);
        vertex(396, 293);
        vertex(390, 296);
        vertex(392, 299);
        vertex(397, 304);
        vertex(396, 309);
        vertex(408, 305);
        vertex(417, 312);
        vertex(422, 306);
        vertex(430, 308);
        vertex(439, 306);
        vertex(448, 310);
        vertex(454, 304);
        vertex(454, 295);
        vertex(450, 290);
        vertex(451, 287);
    endShape();
    fill(97, 194, 255);
    beginShape();
        vertex(398, 291);
        vertex(415, 290);
        vertex(402, 287);
    endShape();
    
    fill(156, 214, 255);
    beginShape();
        vertex(448, 291);
        vertex(440, 295);
        vertex(431, 292);
        vertex(424, 301);
        vertex(419, 300);
        vertex(417, 296);
        vertex(410, 293);
        vertex(404, 294);
        vertex(399, 296);
        vertex(390, 296);
        vertex(398, 291);
        vertex(415, 289);
        vertex(425, 283);
        vertex(436, 287);
        vertex(445, 285);
        vertex(452, 287);
    endShape();
    
    fill(66, 183, 255);
    beginShape();
        vertex(400, 297);
        vertex(408, 298);
        vertex(412, 300);
        vertex(412, 306);
        vertex(412, 306);
        vertex(420, 299);
        vertex(422, 307);
        vertex(416, 312);
        vertex(408, 308);
        vertex(396, 308);
        vertex(398, 304);
        vertex(391, 297);
    endShape();
    
    fill(89, 211, 255);
    beginShape();
        vertex(453, 296);
        vertex(445, 303);
        vertex(444, 304);
        vertex(439, 302);
        vertex(435, 299);
        vertex(428, 304);
        vertex(427, 307);
        vertex(439, 306);
        vertex(447, 311);
        vertex(453, 304);
    endShape();
    
    noFill();
    strokeWeight(4);
    stroke(140,120,100);
    beginShape();
        vertex(398, 307);
        vertex(404, 305);
        vertex(404, 300);
        vertex(407, 296);
        vertex(412, 292);
        vertex(412, 290);
    endShape();
    beginShape();
        vertex(411, 308);
        vertex(417, 304);
        vertex(420, 298);
        vertex(424, 295);
        vertex(425, 288);
        vertex(428, 287);
        vertex(431, 286);
    endShape();
    beginShape();
        vertex(436, 306);
        vertex(438, 301);
        vertex(442, 296);
        vertex(447, 295);
        vertex(446, 289);
        vertex(448, 287.5);
    endShape();
    
    strokeWeight(3);
    beginShape();
        vertex(448, 296);
        vertex(455, 298);
        vertex(462, 300);
        vertex(468, 298);
        vertex(478, 301);
        vertex(482, 302);
    endShape();
};
var staffMask = function(){
    background(0);
    stroke(255, 255, 255);
    beginShape();
        vertex(427, 292);
        vertex(440, 292);
        vertex(444, 284);
        vertex(453, 282);
        vertex(461, 271);
        vertex(470, 268);
    endShape();
    beginShape();
        vertex(446, 307);
        vertex(449, 309);
        vertex(454, 314);
        vertex(465, 311);
        vertex(472, 315);
        vertex(481, 318);
    endShape();
    beginShape();
        vertex(406, 299);
        vertex(456, 297);
        vertex(463, 293);
        vertex(474, 295);
        vertex(481, 292);
    endShape();
    
    
    noStroke();
    fill(255, 255, 255);
    rect(100,290,350,7);
    fill(255, 255, 255);
    rect(100,297,350,7);
    
    strokeWeight(1);
    stroke(255, 255, 255);
    fill(255, 255, 255);
    pushMatrix();
        translate(200,0);
        scale(-1,1);
        beginShape();
            vertex(104, 285);
            vertex(100, 290);
            vertex(95, 289);
            vertex(92, 296);
            vertex(96, 300);
            vertex(92, 307);
            vertex(97, 306);
            vertex(100, 310);
            vertex(107, 306);
            vertex(110, 308);
            vertex(107, 301);
            vertex(111, 297);
            vertex(105, 296);
            vertex(109, 289);
            vertex(104, 292);
        endShape();
    popMatrix();
    
    fill(255, 255, 255);
    beginShape();
        vertex(102, 299);
        vertex(99, 297);
        vertex(95, 296);
        vertex(89, 288);
        vertex(94, 290);
        vertex(96, 284);
        vertex(100, 288);
        vertex(104, 289);
        vertex(106, 293);
        vertex(109, 296);
        vertex(105, 300);
    endShape(CLOSE);
    
    fill(255, 255, 255);
    beginShape();
        vertex(98, 299);
        vertex(100, 303);
        vertex(95, 307);
        vertex(100, 311);
        vertex(102, 307);
        vertex(109, 307);
        vertex(104, 301);
        vertex(106, 298);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(445, 286);
        vertex(437, 288);
        vertex(425, 284);
        vertex(415, 289);
        vertex(402, 286);
        vertex(396, 293);
        vertex(390, 296);
        vertex(392, 299);
        vertex(397, 304);
        vertex(396, 309);
        vertex(408, 305);
        vertex(417, 312);
        vertex(422, 306);
        vertex(430, 308);
        vertex(439, 306);
        vertex(448, 310);
        vertex(454, 304);
        vertex(454, 295);
        vertex(450, 290);
        vertex(451, 287);
    endShape();
    fill(255, 255, 255);
    beginShape();
        vertex(398, 291);
        vertex(415, 290);
        vertex(402, 287);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(448, 291);
        vertex(440, 295);
        vertex(431, 292);
        vertex(424, 301);
        vertex(419, 300);
        vertex(417, 296);
        vertex(410, 293);
        vertex(404, 294);
        vertex(399, 296);
        vertex(390, 296);
        vertex(398, 291);
        vertex(415, 289);
        vertex(425, 283);
        vertex(436, 287);
        vertex(445, 285);
        vertex(452, 287);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(400, 297);
        vertex(408, 298);
        vertex(412, 300);
        vertex(412, 306);
        vertex(412, 306);
        vertex(420, 299);
        vertex(422, 307);
        vertex(416, 312);
        vertex(408, 308);
        vertex(396, 308);
        vertex(398, 304);
        vertex(391, 297);
    endShape();
    
    fill(255, 255, 255);
    beginShape();
        vertex(453, 296);
        vertex(445, 303);
        vertex(444, 304);
        vertex(439, 302);
        vertex(435, 299);
        vertex(428, 304);
        vertex(427, 307);
        vertex(439, 306);
        vertex(447, 311);
        vertex(453, 304);
    endShape();
    
    noFill();
    strokeWeight(3);
    stroke(255, 255, 255);
    beginShape();
        vertex(398, 307);
        vertex(404, 305);
        vertex(404, 300);
        vertex(407, 296);
        vertex(412, 292);
        vertex(412, 290);
    endShape();
    beginShape();
        vertex(411, 308);
        vertex(417, 304);
        vertex(420, 298);
        vertex(424, 295);
        vertex(425, 288);
        vertex(428, 287);
        vertex(431, 286);
    endShape();
    beginShape();
        vertex(436, 306);
        vertex(438, 301);
        vertex(442, 296);
        vertex(447, 295);
        vertex(446, 289);
        vertex(448, 287.5);
    endShape();
    
    strokeWeight(3);
    beginShape();
        vertex(448, 296);
        vertex(455, 298);
        vertex(462, 300);
        vertex(468, 298);
        vertex(478, 301);
        vertex(482, 302);
    endShape();
};

saphireStaff();
var saphireStaff = get();
staffMask();
var staffMask = get();
if(saphireStaff){
    saphireStaff.mask(staffMask);
}

var cherryBowBase = function(){
    stroke(79, 43, 12);
    strokeWeight(9);
    fill(79, 43, 12);
    beginShape();
        vertex(153, 389);
        vertex(158, 383);
        vertex(159, 378);
        vertex(157, 365);
        vertex(157, 352);
        vertex(160, 344);
        vertex(165, 335);
        vertex(156, 320);
        vertex(150, 311);
        vertex(145, 304);
        vertex(146, 295);
        vertex(151, 291);
        vertex(156, 290);
        vertex(155, 274);
        vertex(155, 258);
        vertex(157, 245);
        vertex(159, 229);
        vertex(161, 221);
        vertex(154, 209);
        vertex(145, 233);
        vertex(139, 252);
        vertex(133, 263);
        vertex(129, 277);
        vertex(127, 296);
        vertex(128, 312);
        vertex(132, 326);
        vertex(137, 339);
        vertex(139, 346);
        vertex(144, 364);
        vertex(151, 386);
    endShape();
};
var bowBaseMask = function(){
    stroke(255);
    strokeWeight(9);
    background(0);
    fill(255, 255, 255);
    beginShape();
        vertex(153, 389);
        vertex(158, 383);
        vertex(159, 378);
        vertex(157, 365);
        vertex(157, 352);
        vertex(160, 344);
        vertex(165, 335);
        vertex(156, 320);
        vertex(150, 311);
        vertex(145, 304);
        vertex(146, 295);
        vertex(151, 291);
        vertex(156, 290);
        vertex(155, 274);
        vertex(155, 258);
        vertex(157, 245);
        vertex(159, 229);
        vertex(161, 221);
        vertex(154, 209);
        vertex(145, 233);
        vertex(139, 252);
        vertex(133, 263);
        vertex(129, 277);
        vertex(127, 296);
        vertex(128, 312);
        vertex(132, 326);
        vertex(137, 339);
        vertex(139, 346);
        vertex(144, 364);
        vertex(151, 386);
    endShape();
};

var cherryBow = function(){
    noStroke();
    fill(50);
    beginShape();
        vertex(138, 236);
        vertex(134, 244);
        vertex(132, 243);
        vertex(135, 235);
    endShape();
    
    
    noFill();
    strokeWeight(10);
    stroke(112, 66, 22);
    bezier(133, 250, 181, 114, 276, 54, 192, 1);
    bezier(139, 252, 181, 114, 276, 54, 192, 1);
    noStroke();
    fill(112, 66, 22);
    beginShape();
        vertex(133, 252);
        vertex(138, 235);
        vertex(138, 235);
        vertex(151, 205);
        vertex(168, 170);
        vertex(196, 125);
        vertex(172, 170);
        vertex(163, 190);
        vertex(155, 208);
        vertex(138, 253);
    endShape();
    
    pushMatrix();
        translate(0,0);
        scale(1,-1);
        translate(0,-600);
        fill(50);
        beginShape();
            vertex(138, 236);
            vertex(134, 244);
            vertex(132, 243);
            vertex(135, 235);
        endShape();
        noFill();
        strokeWeight(50);
        stroke(112, 66, 22);
        bezier(133, 250, 181, 114, 276, 54, 192, 1);
        bezier(139, 252, 181, 114, 276, 54, 192, 1);
        noStroke();
        fill(112, 66, 22);
        beginShape();
            vertex(133, 252);
            vertex(138, 235);
            vertex(138, 235);
            vertex(151, 205);
            vertex(168, 170);
            vertex(196, 125);
            vertex(172, 170);
            vertex(163, 190);
            vertex(155, 208);
            vertex(138, 253);
        endShape();
    popMatrix();
    
};
var bowMask = function(){
    background(0);
    noStroke();
    fill(255, 255, 255);
    beginShape();
        vertex(138, 236);
        vertex(134, 244);
        vertex(132, 243);
        vertex(135, 235);
    endShape();
    
    
    noFill();
    strokeWeight(10);
    stroke(255, 255, 255);
    bezier(133, 250, 181, 114, 276, 54, 192, 1);
    bezier(139, 252, 181, 114, 276, 54, 192, 1);
    noStroke();
    fill(255, 255, 255);
    beginShape();
        vertex(133, 252);
        vertex(138, 235);
        vertex(138, 235);
        vertex(151, 205);
        vertex(168, 170);
        vertex(196, 125);
        vertex(172, 170);
        vertex(163, 190);
        vertex(155, 208);
        vertex(138, 253);
    endShape();
    
    pushMatrix();
        translate(0,0);
        scale(1,-1);
        translate(0,-600);
        fill(255, 255, 255);
        beginShape();
            vertex(138, 236);
            vertex(134, 244);
            vertex(132, 243);
            vertex(135, 235);
        endShape();
        noFill();
        strokeWeight(10);
        stroke(255, 255, 255);
        bezier(133, 250, 181, 114, 276, 54, 192, 1);
        bezier(139, 252, 181, 114, 276, 54, 192, 1);
        noStroke();
        fill(255, 255, 255);
        beginShape();
            vertex(133, 252);
            vertex(138, 235);
            vertex(138, 235);
            vertex(151, 205);
            vertex(168, 170);
            vertex(196, 125);
            vertex(172, 170);
            vertex(163, 190);
            vertex(155, 208);
            vertex(138, 253);
        endShape();
    popMatrix();
};

cherryBowBase();
var cherryBowBase = get();
bowBaseMask();
var bowBaseMask = get();
cherryBow();
var cherryBow = get(0,0,600,600);
bowMask();
var bowMask = get(0,0,600,600);

if(cherryBow){
    cherryBow.mask(bowMask);
}
if(cherryBowBase){
    cherryBowBase.mask(bowBaseMask);
}

//arrow image
{
noStroke();
fill(161, 103, 23);
rect(290,100,10,400);
fill(138, 87, 21);
rect(300,100,10,400);
fill(120);
beginShape();
    vertex(312, 95);
    vertex(300, 126);
    vertex(300, 55);
endShape();
fill(180);
beginShape();
    vertex(288, 95);
    vertex(300, 126);
    vertex(300, 55);
endShape();

fill(220);
beginShape();
    vertex(290, 434);
    vertex(275, 452);
    vertex(275, 550);
    vertex(292, 499);
endShape();

stroke(230);
strokeWeight(4);
beginShape();
    vertex(300, 434);
    vertex(299, 548);
endShape();

noStroke();
fill(180);
beginShape();
    vertex(310, 434);
    vertex(325, 452);
    vertex(325, 550);
    vertex(308, 499);
endShape();
var arrow = get();

background(0);
noStroke();
fill(255, 255, 255);
rect(290,100,10,400);
fill(255, 255, 255);
rect(300,100,10,400);
fill(255, 255, 255);
beginShape();
    vertex(312, 95);
    vertex(300, 126);
    vertex(300, 55);
endShape();
fill(255, 255, 255);
beginShape();
    vertex(288, 95);
    vertex(300, 126);
    vertex(300, 55);
endShape();

fill(255, 255, 255);
beginShape();
    vertex(290, 434);
    vertex(275, 452);
    vertex(275, 550);
    vertex(292, 499);
endShape();

stroke(255, 255, 255);
strokeWeight(4);
beginShape();
    vertex(300, 434);
    vertex(299, 548);
endShape();

noStroke();
fill(255, 255, 255);
beginShape();
    vertex(310, 434);
    vertex(325, 452);
    vertex(325, 550);
    vertex(308, 499);
endShape();
var arrowMask = get();
if(arrow){
    arrow.mask(arrowMask);
}
}

var symbol = function(){
    noFill();
    stroke(0);
    strokeWeight(8);
    
    arc(275,275,150,150,180,270);
    arc(275,125,150,150,90,180);
    
    arc(125,125,150,150,0,90);
    arc(125,275,150,150,-90,0);
    
    fill(0);
    quad(155,200,200,155,245,200,200,245);
    
    fill(255);
    ellipse(200,200,50,50);
    
    for(var i = 0; i < 5; i++){
        noStroke();
        fill(0);
        pushMatrix();
            translate(200,200);
            rotate(45+90*i);
            translate(0,40);
            triangle(-15,0,15,0,0,60);
        popMatrix();
}
};
symbol();
var symbol = get(0,0,600,600);

var symbolMask = function(){
    background(0);
    noFill();
    stroke(255);
    strokeWeight(8);
    
    arc(275,275,150,150,180,270);
    arc(275,125,150,150,90,180);
    
    arc(125,125,150,150,0,90);
    arc(125,275,150,150,-90,0);
    
    fill(255);
    quad(155,200,200,155,245,200,200,245);
    
    fill(0);
    ellipse(200,200,50,50);
    
    for(var i = 0; i < 5; i++){
        noStroke();
        fill(255);
        pushMatrix();
            translate(200,200);
            rotate(45+90*i);
            translate(0,40);
            triangle(-15,0,15,0,0,60);
        popMatrix();
}
};
symbolMask();
var symbolMask = get(0,0,600,600);

if(symbol){
    symbol.mask(symbolMask);
}



var backgroundCoin = function(){
    for(var i = 0; i < 285; i++){
        pushMatrix();
            rotate(-45);
            
            stroke(255-i/3);
            strokeWeight(3);
            line(-i*2,i*2+100,i*2,i*2+100);
        popMatrix();
    }
};
backgroundCoin();
var backgroundCoin = get(0,0,600,600);

var backgroundCoinMask = function(){
    noStroke();

    background(0);
    fill(255);
    
    pushMatrix();
        translate(200,200);
        rotate(-45);
        ellipse(0,0,300,150);
    popMatrix();
};
backgroundCoinMask();
var backgroundCoinMask = get(0,0,600,600);

if(backgroundCoin){
    backgroundCoin.mask(backgroundCoinMask);
}
var coin = function(){
    noStroke();
    pushMatrix();
        translate(200,200);
        rotate(-45);
        
        
        fill(200);
        ellipse(0,30,300,150);
        
        pushMatrix();
            rotate(2);
            rect(120,-7,30,40);
        popMatrix();
        
        pushMatrix();
            rotate(2);
            rect(-149,-4,30,40);
        popMatrix();
        
        stroke(180);
        noFill();
        ellipse(0,5,300,150);
        
        ellipse(0,25,300,150);
        
    popMatrix();
    image(backgroundCoin,0,0);
    
    pushMatrix();
        translate(200,200);
        rotate(-45);
        image(symbol,-194,-100,600,300);
    popMatrix();
};

coin();
var coin = get(0,0,600,600);

var coinMask = function(){
    background(0);
    noStroke();
    pushMatrix();
        translate(200,200);
        rotate(-45);
        
        
        fill(255);
        ellipse(0,30,300,150);
        
        pushMatrix();
            rotate(2);
            rect(120,-7,30,40);
        popMatrix();
        
        pushMatrix();
            rotate(2);
            rect(-149,-4,30,40);
        popMatrix();
        
        stroke(255);
        noFill();
        ellipse(0,5,300,150);
        
        ellipse(0,25,300,150);
        
        fill(255);
        ellipse(0,5,300,150);
    popMatrix();
    
};

coinMask();
var coinMask = get(0,0,600,600);

if(coin){
    coin.mask(coinMask);
}

var iceBall = function(){
    background(255);
    noStroke();
    for(var i = 0; i < 120; i++){
        var randomRotate = random(0,360);
        pushMatrix();
            translate(300,300);
            rotate(randomRotate);
            var radius = random(25,35);
            fill(random(100,180), random(180,255), 255);
            rect(0,random(0,10),radius,radius);
        popMatrix();
    }
};
var iceBallMask = function(){
    background(0);
    fill(255);
    ellipse(300,300,50,50);
    for(var i = 0; i < 120; i++){
        var randomRotate = random(0,360);
        pushMatrix();
            translate(300,300);
            rotate(randomRotate);
            var radius = random(15,30);
            fill(255, 255, 255);
            rect(0,random(0,10),radius,radius);
        popMatrix();
    }
};

iceBall();
var iceBall = get(0,0,600,600);
iceBallMask();
var iceBallMask = get(0,0,600,600);
if(iceBall){
    iceBall.mask(iceBallMask);
}

var ironDagger = function(){
        noStroke();
        fill(128, 43, 0);
        ellipse(325,520,40,40);
        fill(189, 189, 189);
        rect(301,200,25,220);
        
        triangle(327,201,326,170,306,200);
        noFill();
        strokeWeight(5);
        stroke(189);
        arc(300,150,50,100,-15,90);
        noStroke();
        
        fill(145, 145, 145);
        rect(325,200,25,220);   
        
        
        triangle(325,201,350,201,325,130);
        fill(128, 43, 0);
        quad(350,420,342,520,310,520,300,420);
        
        stroke(173, 87, 0);
        strokeWeight(5);
        line(352,429,300,420);
        noStroke();
        
        fill(168, 56, 0);
        triangle(300,400,325,420,290,420);
        triangle(350,400,325,420,360,420);    
        stroke(173, 87, 0);
        strokeWeight(5);
        
        line(352,509,300,500);
        line(352,449,300,440);
        line(352,469,300,460);
        line(352,489,300,480);
        
};
var ironDaggerMask = function(){
    
    fill(0);
    rect(0,0,600,600);
    noStroke();
    fill(255, 255, 255);
    ellipse(325,520,40,40);
    fill(255, 255, 255);
    rect(301,200,25,220);
    
    triangle(327,201,326,170,306,200);
    noFill();
    strokeWeight(5);
    stroke(255);
    arc(300,150,50,100,-15,85);
    noStroke();
    
    fill(255, 255, 255);
    rect(325,200,25,220);   
    
    triangle(325,201,350,201,325,130);
    fill(255, 255, 255);
    quad(350,420,342,520,310,520,300,420);
    triangle(300,400,325,420,290,420);
    triangle(350,400,325,420,360,420);
};

var bronzeDagger = function(){
        noStroke();
        fill(128, 43, 0);
        ellipse(325,520,40,40);
        fill(179, 152, 111);
        rect(301,200,25,220);
        
        triangle(327,201,326,170,306,200);
        noFill();
        strokeWeight(5);
        stroke(179, 152, 111);
        arc(300,150,50,100,-15,90);
        noStroke();
        
        fill(140,120,83);
        rect(325,200,25,220);   
        
        
        triangle(325,201,350,201,325,130);
        fill(128, 43, 0);
        quad(350,420,342,520,310,520,300,420);
        
        stroke(173, 87, 0);
        strokeWeight(5);
        line(352,429,300,420);
        noStroke();
        
        fill(168, 56, 0);
        triangle(300,400,325,420,290,420);
        triangle(350,400,325,420,360,420);    
        stroke(173, 87, 0);
        strokeWeight(5);
        
        line(352,509,300,500);
        line(352,449,300,440);
        line(352,469,300,460);
        line(352,489,300,480);
        
};
var bronzeDaggerMask = function(){
    
    fill(0);
    rect(0,0,600,600);
    noStroke();
    fill(255, 255, 255);
    ellipse(325,520,40,40);
    fill(255, 255, 255);
    rect(301,200,25,220);
    
    triangle(327,201,326,170,306,200);
    noFill();
    strokeWeight(5);
    stroke(255);
    arc(300,150,50,100,-15,85);
    noStroke();
    
    fill(255, 255, 255);
    rect(325,200,25,220);   
    
    triangle(325,201,350,201,325,130);
    fill(255, 255, 255);
    quad(350,420,342,520,310,520,300,420);
    triangle(300,400,325,420,290,420);
    triangle(350,400,325,420,360,420);
};

var goldDagger = function(){
        noStroke();
        fill(128, 43, 0);
        ellipse(325,520,40,40);
        fill(255, 255, 0);
        rect(301,200,25,220);
        
        triangle(327,201,326,170,306,200);
        noFill();
        strokeWeight(5);
        stroke(255,255,0);
        arc(300,150,50,100,-15,90);
        noStroke();
        
        fill(220,220,0);
        rect(325,200,25,220);   
        
        
        triangle(325,201,350,201,325,130);
        fill(128, 43, 0);
        quad(350,420,342,520,310,520,300,420);
        
        stroke(173, 87, 0);
        strokeWeight(5);
        line(352,429,300,420);
        noStroke();
        
        fill(168, 56, 0);
        triangle(300,400,325,420,290,420);
        triangle(350,400,325,420,360,420);    
        stroke(173, 87, 0);
        strokeWeight(5);
        
        line(352,509,300,500);
        line(352,449,300,440);
        line(352,469,300,460);
        line(352,489,300,480);
        
};
var goldDaggerMask = function(){
    
    fill(0);
    rect(0,0,600,600);
    noStroke();
    fill(255, 255, 255);
    ellipse(325,520,40,40);
    fill(255, 255, 255);
    rect(301,200,25,220);
    
    triangle(327,201,326,170,306,200);
    noFill();
    strokeWeight(5);
    stroke(255);
    arc(300,150,50,100,-15,85);
    noStroke();
    
    fill(255, 255, 255);
    rect(325,200,25,220);   
    
    triangle(325,201,350,201,325,130);
    fill(255, 255, 255);
    quad(350,420,342,520,310,520,300,420);
    triangle(300,400,325,420,290,420);
    triangle(350,400,325,420,360,420);
};

var ironSword = function(){
    pushMatrix();
        noStroke();
        fill(143, 57, 0);
        rect(290,480,20,100,100);
        
        fill(120, 48, 0);
        rect(300,480,20,100);
        
        fill(145);
        quad(310,107,300,66,300,485,315,485);
        fill(190);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(12);
        noFill();
        stroke(153, 153, 153);
        arc(300,480,90,20,90,180);
        stroke(130, 130, 130);
        arc(300,480,90,20,0,90);
        
        fill(153);
        noStroke();
        rect(295,485,5,10);
        
        fill(100);
        ellipse(300,580,25,25);
        fill(130);
        arc(300,580,25,25,90,270);
    popMatrix();
};
var ironSwordMask = function(){
    background(0);
    pushMatrix();
        noStroke();
        fill(255, 255, 255);
        rect(290,480,20,100,100);
        fill(255, 255, 255);
        quad(310,107,300,66,300,485,315,485);
        fill(255, 255, 255);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(11);
        noFill();
        stroke(255, 255, 255);
        arc(300,480,90,20,90,180);
        arc(300,480,90,20,0,90);
        
        noStroke();
        fill(255);
        ellipse(300,580,25,25);
    popMatrix();
};

var bronzeSword = function(){
    pushMatrix();
        noStroke();
        fill(143, 57, 0);
        rect(290,480,20,100,100);
        
        fill(120, 48, 0);
        rect(300,480,20,100);
        
        fill(140,120,83);
        quad(310,107,300,66,300,485,315,485);
        fill(166, 141, 102);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(12);
        noFill();
        stroke(156, 133, 94);
        arc(300,480,90,20,90,180);
        stroke(125, 107, 75);
        arc(300,480,90,20,0,90);
        
        fill(140,120,83);
        noStroke();
        rect(295,485,5,10);
        
        fill(140,120,83);
        ellipse(300,580,25,25);
        fill(163, 139, 98);
        arc(300,580,25,25,90,270);
    popMatrix();
};
var bronzeSwordMask = function(){
    background(0);
    pushMatrix();
        //translate(100,0);
        noStroke();
        fill(255, 255, 255);
        rect(290,480,20,100,100);
        fill(255, 255, 255);
        quad(310,107,300,66,300,485,315,485);
        fill(255, 255, 255);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(11);
        noFill();
        stroke(255, 255, 255);
        arc(300,480,90,20,90,180);
        arc(300,480,90,20,0,90);
        
        noStroke();
        fill(255);
        ellipse(300,580,25,25);
    popMatrix();
};

var goldSword = function(){
    pushMatrix();
        noStroke();
        fill(143, 57, 0);
        rect(290,480,20,100,100);
        
        fill(120, 48, 0);
        rect(300,480,20,100);
        
        fill(207, 207, 0);
        quad(310,107,300,66,300,485,315,485);
        fill(255, 255, 0);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(12);
        noFill();
        stroke(200, 200, 0);
        arc(300,480,90,20,90,180);
        stroke(160, 160, 0);
        arc(300,480,90,20,0,90);
        
        fill(200,200,0);
        noStroke();
        rect(295,485,5,10);
        
        fill(170,170,0);
        ellipse(300,580,25,25);
        fill(200, 200, 0);
        arc(300,580,25,25,90,270);
    popMatrix();
};
var goldSwordMask = function(){
    background(0);
    pushMatrix();
        //translate(100,0);
        noStroke();
        fill(255, 255, 255);
        rect(290,480,20,100,100);
        fill(255, 255, 255);
        quad(310,107,300,66,300,485,315,485);
        fill(255, 255, 255);
        quad(290,107,300,66,300,485,285,485);
        
        strokeWeight(11);
        noFill();
        stroke(255, 255, 255);
        arc(300,480,90,20,90,180);
        arc(300,480,90,20,0,90);
        
        noStroke();
        fill(255);
        ellipse(300,580,25,25);
    popMatrix();
};

var ironBroadSword = function(){
    noStroke();
    fill(143, 143, 143);
    quad(310,50,300,20,300,350,320,350);
    fill(193, 193, 193);
    quad(300,20,290,50,280,350,300,350);
    
    fill(100,50,0);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,535,30,30);
    
    strokeWeight(1);
    stroke(220);
    line(297,50,296,350);
    stroke(80);
    line(303,50,304,350);
    
    stroke(130, 130, 130);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    
    
    fill(50,50,0);
    ellipse(300,490,30,30);
    
    stroke(46, 18, 0);
    strokeWeight(3);
    line(286,361,321,402);
    line(314,361,280,402);
    
    line(286,412,321,462);
    line(314,412,280,462);
};
var ironBroadSwordMask = function(){
    background(0);
    noStroke();
    fill(255, 255, 255);
    quad(310,50,300,20,300,350,320,350);
    fill(255, 255, 255);
    quad(300,20,290,50,280,350,300,350);
    
    fill(255, 255, 255);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,435,30,30);
    stroke(255, 255, 255);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    fill(255);
    ellipse(300,490,30,30);
    
};

var bronzeBroadSword = function(){
    noStroke();
    fill(140, 120, 83);
    quad(310,50,300,20,300,350,320,350);
    fill(166, 141, 102);
    quad(300,20,290,50,280,350,300,350);
    
    fill(100,50,0);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,535,30,30);
    
    strokeWeight(1);
    stroke(220);
    line(297,50,296,350);
    stroke(80);
    line(303,50,304,350);
    
    stroke(140, 120, 83);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    
    
    fill(50,50,0);
    ellipse(300,490,30,30);
    
    stroke(46, 18, 0);
    strokeWeight(3);
    line(286,361,321,402);
    line(314,361,280,402);
    
    line(286,412,321,462);
    line(314,412,280,462);
};
var bronzeBroadSwordMask = function(){
    background(0);
    noStroke();
    fill(255, 255, 255);
    quad(310,50,300,20,300,350,320,350);
    fill(255, 255, 255);
    quad(300,20,290,50,280,350,300,350);
    
    fill(255, 255, 255);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,435,30,30);
    stroke(255, 255, 255);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    fill(255);
    ellipse(300,490,30,30);
    
};

var goldBroadSword = function(){
    noStroke();
    fill(220,220,0);
    quad(310,50,300,20,300,350,320,350);
    fill(255, 255, 0);
    quad(300,20,290,50,280,350,300,350);
    
    fill(100,50,0);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,535,30,30);
    
    strokeWeight(1);
    stroke(220);
    line(297,50,296,350);
    stroke(80);
    line(303,50,304,350);
    
    stroke(220,220,0);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    
    
    fill(50,50,0);
    ellipse(300,490,30,30);
    
    stroke(46, 18, 0);
    strokeWeight(3);
    line(286,361,321,402);
    line(314,361,280,402);
    
    line(286,412,321,462);
    line(314,412,280,462);
};
var goldBroadSwordMask = function(){
    background(0);
    noStroke();
    fill(255, 255, 255);
    quad(310,50,300,20,300,350,320,350);
    fill(255, 255, 255);
    quad(300,20,290,50,280,350,300,350);
    
    fill(255, 255, 255);
    quad(284,350,315,350,310,485,290,485);
    ellipse(300,435,30,30);
    stroke(255, 255, 255);
    noFill();
    strokeWeight(7);
    arc(295,340,120,25,0,180);
    noStroke();
    fill(255);
    ellipse(300,490,30,30);
    
};


bronzeDagger();
var bronzeDagger = get(0,0,600,600);
bronzeDaggerMask();
var bronzeDaggerMask = get(0,0,600,600);

goldDagger();
var goldDagger = get(0,0,600,600);
goldDaggerMask();
var goldDaggerMask = get(0,0,600,600);

ironDagger();
var ironDagger = get(0,0,600,600);
ironDaggerMask();
var ironDaggerMask = get(0,0,600,600);

bronzeSword();
var bronzeSword = get(0,0,600,600);
bronzeSwordMask();
var bronzeSwordMask = get(0,0,600,600);

goldSword();
var goldSword = get(0,0,600,600);
goldSwordMask();
var goldSwordMask = get(0,0,600,600);

ironSword();
var ironSword = get(0,0,600,600);
ironSwordMask();
var ironSwordMask = get(0,0,600,600);

ironBroadSword();
var ironBroadSword = get(0,0,600,600);
ironBroadSwordMask();
var ironBroadSwordMask = get(0,0,600,600);

bronzeBroadSword();
var bronzeBroadSword = get(0,0,600,600);
bronzeBroadSwordMask();
var bronzeBroadSwordMask = get(0,0,600,600);

goldBroadSword();
var goldBroadSword = get(0,0,600,600);
goldBroadSwordMask();
var goldBroadSwordMask = get(0,0,600,600);

if(ironDagger){
    ironDagger.mask(ironDaggerMask);
}
if(bronzeDagger){
    bronzeDagger.mask(goldDaggerMask);
}
if(goldDagger){
    goldDagger.mask(goldDaggerMask);
}

if(ironSword){
    ironSword.mask(ironSwordMask);
}
if(bronzeSword){
    bronzeSword.mask(ironSwordMask);
}
if(goldSword){
    goldSword.mask(ironSwordMask);
}

if(ironBroadSword){
    ironBroadSword.mask(ironBroadSwordMask);
}
if(bronzeSword){
    bronzeBroadSword.mask(ironBroadSwordMask);
}
if(goldSword){
    goldBroadSword.mask(ironBroadSwordMask);
}
}

var wid = random(2,10);
var col = color(random(140,160), random(200,255), 255);
background(0);
var drawLightningShield1 = function(){
    for(var i = 0; i < 5; i++){
    pushMatrix();
        
        rotate(i*72);
        
        rectMode(CENTER);
        noStroke();
        fill(col);
        rect(100,0,wid,150);
        
        rectMode(CORNER);
    popMatrix();
}

};
var drawLightningShield2 = function(){
    for(var i = 0; i < 5; i++){
        pushMatrix();
            
            rotate(i*72-20);
            
            rectMode(CENTER);
            noStroke();
            fill(col);
            rect(100,0,wid,150);
            
            rectMode(CORNER);
        popMatrix();
}
};
var drawLightningShield3 = function(){
    for(var i = 0; i < 5; i++){
        pushMatrix();
            
            rotate(i*72-60);
            
            rectMode(CENTER);
            noStroke();
            fill(col);
            rect(100,0,wid,150);
            
            rectMode(CORNER);
        popMatrix();
}
};
var drawLightningShield4 = function(){
    for(var i = 0; i < 5; i++){
        pushMatrix();
            
            rotate(i*72-40);
            
            rectMode(CENTER);
            noStroke();
            fill(col);
            rect(100,0,wid,150);
            
            rectMode(CORNER);
        popMatrix();
}
};

//the star
var star = function(){
    noStroke();
    for(var i = 0; i < 200; i++){
        for(var j = 0; j < 200; j++){
            fill(330-i+random(-20,10),330-i+random(-20,10),200-i*2);
            rect(j*3,0+i*2,3,2);
        }
        
    }
};

var starMask = function(){
    background(0);
    fill(255,255,255);
    beginShape();
        vertex(200,50);
        vertex(240,150);
        vertex(350,150);
        vertex(260,230);
        vertex(290,350);
        vertex(200,270);
        vertex(110,350);
        vertex(140,230);
        vertex(50,150);
        vertex(160,150);
    endShape();
};

star();
var star = get(0,0,600,600);
starMask();
var starMask = get(0,0,600,600);
if(star){
    star.mask(starMask);
}

var transitionXY = 0;
var transitionState = 'close';

var places = [];

background(0);


//the weapons object
var weapons = {
    'ironSword': {
        reach: 90,
        reload: 60,
        damage: 20,
        weight: 45,
        swing: 91,
        pushBack: 20,
        clas: 'warrior',
        type: 'blade',
        image: ironSword,
    },
    'bronzeSword': {
        reach: 90,
        reload: 70,
        damage: 15,
        weight: 40,
        swing: 91,
        pushBack: 10,
        clas: 'warrior',
        type: 'blade',
        image: bronzeSword,
    },
    'goldSword': {
        reach: 90,
        reload: 45,
        damage: 30,
        weight: 33,
        swing: 91,
        pushBack: 23,
        clas: 'warrior',
        type: 'blade',
        image: goldSword,
    },
    
    //the broad swords
    'ironBroadSword': {
        reach: 71,
        reload: 90,
        damage: 40,
        weight: 50,
        swing: 19,
        pushBack: 25,
        clas: 'warrior',
        type: 'blade',
        image: ironBroadSword,
    },
    'bronzeBroadSword': {
        reach: 71,
        reload: 90,
        damage: 40,
        weight: 50,
        swing: 19,
        pushBack: 25,
        clas: 'warrior',
        type: 'blade',
        image: bronzeBroadSword,
    },
    'goldBroadSword': {
        reach: 71,
        reload: 90,
        damage: 40,
        weight: 50,
        swing: 19,
        pushBack: 25,
        clas: 'warrior',
        type: 'blade',
        image: goldBroadSword,
    },
    
    //the daggers
    'ironDagger': {
        reach: 70,
        reload: 45,
        damage: 6,
        weight: 20,
        swing: 90,
        pushBack: 1,
        clas: 'ranger',
        type: 'blade',
        image: ironDagger,
    },
    'bronzeDagger': {
        reach: 70,
        reload: 45,
        damage: 6,
        weight: 20,
        swing: 20,
        pushBack: 1,
        clas: 'ranger',
        type: 'blade',
        image: bronzeDagger,
    },
    'goldDagger': {
        reach: 70,
        reload: 15,
        damage: 6,
        weight: 20,
        swing: 20,
        pushBack: 1,
        clas: 'ranger',
        type: 'blade',
        image: goldDagger,
    },
    
    //the axes
    'ironAxe': {
        reach: 90,
        reload: 110,
        damage: 40,
        weight: 25,
        swing: 90,
        pushBack: 20,
        clas: 'warrior',
        type: 'axe',
        image: ironAxe,
    },
    //unfinnished
    'bronzeAxe': {
        reach: 70,
        reload: 45,
        damage: 6,
        weight: 20,
        swing: 20,
        pushBack: 1,
        clas: 'ranger',
        type: 'blade',
        image: bronzeDagger,
    },
    'goldAxe': {
        reach: 70,
        reload: 15,
        damage: 6,
        weight: 20,
        swing: 20,
        pushBack: 1,
        clas: 'ranger',
        type: 'blade',
        image: goldDagger,
    },
    
    'cherryBow': {
        reach: 500,
        reload: 100,
        damage: 30,
        weight: 40,
        swing: 0,
        pushBack: 8,
        clas: 'ranger',
        type: 'ranged',
        image: cherryBow,
    },
    
    'saphireStaff': {
        reach: 100,
        reload: 85,
        damage: 16,
        weight: 30,
        swing: 90,
        pushBack: 14,
        clas: 'mage',
        type: 'staff',
        image: saphireStaff,
    },
    
    'fists': {
        clas: 'ranger',
        image: '🍍',
    },
    '': {
        image: '',
    },
};

//location stuff
{
var places = [];

var place = function(x,y,title){
    this.x = x;
    this.y = y;
    this.color = color(255,0,0);
    this.title = title;
    this.draw = function() {
        noFill();
        stroke(this.color);
        strokeWeight(3);
        ellipse(this.x,this.y,10,10);
        
    };
    this.mouseOn = function(){
        //if(dist(mouseX,mouseY,this.x,this.y) < 13){
            textAlign(CENTER,CENTER);
            textSize(15);
            fill(this.color);
            text(this.title,this.x,this.y-20);
            textAlign(CORNER,CORNER);
        //}
    };
};

var pathes = [];

var path = function(x,y,one,two,three){
    this.x = x;
    this.y = y;
    this.one = one;
    this.two = two;
    this.three = three;
    this.color = color(255,0,0);
    this.draw = function() {
        noFill();
        stroke(this.color);
        strokeWeight(3);
        ellipse(this.x,this.y,10,10);
        
    };
    
};

var runLocationStuff = function(){
    for(var i in places){
        places[i].draw();
        places[i].mouseOn();
    }
};
}


var inventory = ['','','','','','','','','',''];

//the spells object
var spells = {
    'fireball': {
        emoji: '🔥',
        cost: 20,
    },
    'heal': {
        emoji: '💖',
        cost: 15,
    },
    'hasten': {
        emoji: '🌀',
        cost: 12,
    },
    'ice bolt': {
        emoji: '🧊',
        cost: 20,
    },
    'fire shield': {
        emoji: '💥',
        cost: 25,
    },
    'berserk': {
        emoji: '👹',
        cost: 15,
    },
    'anti-magic': {
        emoji: '🔮',
        cost: 20,
    },
    'lightning shield': {
        emoji: '⚡',
        cost: 22,
    },
    'slow': {
        emoji: '💩',
        cost: 10,
    },
};

var enemies = {
    'rat': {
        'chapter1': {
            reload: 30,
            speed: 2,
            damage: 1,
            agility: 10,
            health: 10,
            drop: '',
            dropAmount: 0,
            reach: 15,
            ranged: false,
            pushBack: 1,
        },
        'chapter2': {
            reload: 25,
            speed: 3.5,
            damage: 1,
            agility: 20,
            health: 30,
            drop: '',
            dropAmount: 1,
            reach: 15,
            ranged: false,
            pushBack: 1,
        },
        'chapter3': {
            reload: 20,
            speed: 3,
            damage: 2,
            agility: 30,
            health: 50,
            drop: '',
            dropAmount: 10,
            reach: 15,
            ranged: false,
            pushBack: 1,
        },
    },
    'horned ram': {
        'chapter1': {
            reload: 120,
            speed: 1.5,
            damage: 6,
            agility: 5,
            health: 120,
            drop: 'hides',
            dropAmount: 2,
            reach: 45,
            ranged: false,
            pushBack: 100,
        },
        'chapter2': {
            reload: 100,
            speed: 2,
            damage: 9,
            agility: 15,
            health: 160,
            drop: 'hides',
            dropAmount: 2,
            reach: 45,
            ranged: false,
            pushBack: 100,
        },
        'chapter3': {
            reload: 70,
            speed: 2.5,
            damage: 13,
            agility: 25,
            health: 200,
            drop: 'hides',
            dropAmount: 2,
            reach: 45,
            ranged: false,
            pushBack: 100,
        },
    },
    'bear': {
        'chapter1': {
            reload: 100,
            speed: 1.5,
            damage: 6,
            agility: 10,
            health: 30,
            drop: 'bear meat',
            dropAmount: 10,
            reach: 45,
            ranged: false,
            pushBack: 45,
        },
        'chapter2': {
            reload: 80,
            speed: 2.7,
            damage: 18,
            agility: 20,
            health: 80,
            drop: 'bear meat',
            dropAmount: 10,
            reach: 45,
            ranged: false,
            pushBack: 45,
        },
        'chapter3': {
            reload: 60,
            speed: 4,
            damage: 30,
            agility: 30,
            health: 150,
            drop: 'bear meat',
            dropAmount: 10,
            reach: 45,
            ranged: false,
            pushBack: 50,
        },
    },
    'bandit': {
        'chapter1': {
            reload: 80,
            speed: 2.2,
            damage: 3,
            agility: 12,
            health: 25,
            drop: 'gold',
            dropAmount: 5,
            reach: 95,
            ranged: false,
            pushBack: 15,
        },
        'chapter2': {
            reload: 60,
            speed: 3.5,
            damage: 6,
            agility: 32,
            health: 55,
            drop: 'gold',
            dropAmount: 15,
            reach: 95,
            ranged: false,
            pushBack: 15,
        },
        'chapter3': {
            reload: 45,
            speed: 5,
            damage: 13,
            agility: 55,
            health: 110,
            drop: 'gold',
            dropAmount: 25,
            reach: 95,
            ranged: false,
            pushBack: 15,
        },
    },
    'orc': {
        'chapter1': {
            reload: 80,
            speed: 2.2,
            damage: 3,
            agility: 10,
            health: 35,
            drop: '',
            dropAmount: 5,
            reach: 95,
            ranged: false,
            pushBack: 18,
        },
        'chapter2': {
            reload: 60,
            speed: 3.5,
            damage: 6,
            agility: 18,
            health: 70,
            drop: '',
            dropAmount: 15,
            reach: 95,
            ranged: false,
            pushBack: 18,
        },
        'chapter3': {
            reload: 45,
            speed: 5,
            damage: 13,
            agility: 33,
            health: 150,
            drop: '',
            dropAmount: 25,
            reach: 95,
            ranged: false,
            pushBack: 18,
        },
    },
    'troll': {
        'chapter1': {
            reload: 150,
            speed: 2,
            damage: 10,
            agility: 5,
            health: 100,
            drop: 'gold',
            dropAmount: 5,
            reach: 135,
            ranged: false,
            pushBack: 50,
        },
        'chapter2': {
            reload: 130,
            speed: 2.4,
            damage: 20,
            agility: 7,
            health: 200,
            drop: 'gold',
            dropAmount: 15,
            reach: 135,
            ranged: false,
            pushBack: 50,
        },
        'chapter3': {
            reload: 110,
            speed: 2.7,
            damage: 30,
            agility: 10,
            health: 300,
            drop: 'gold',
            dropAmount: 25,
            reach: 135,
            ranged: false,
            pushBack: 50,
        },
    },
    'Ederil': {
        'chapter2': {
            reload: 60,
            speed: 5,
            damage: 15,
            agility: 80,
            health: 200,
            drop: 'gold',
            dropAmount: 150,
            reach: 95,
            ranged: false,
            pushBack: 10,
        },
    },
};

var knownSpells = [];


textAlign(CORNER,CORNER);
imageMode(CENTER);

//the tree images
{
//the transparent tree canopy image
{
background(0,100,0);

var treeImg = get(0,0,600,600);



//the masking of the tree canopy image transparant

background(0, 0, 0);
noStroke();

fill(255, 255, 255);
//drawing the fringe of the tree
pushMatrix();
    for(var i = 0; i < 21; i++){
        translate(300,300);
        rotate(17);
        translate(-300,-300);
        ellipse(500,300,70,70);
    }
popMatrix();

ellipse(300,300,400,400);

var treeImgMask = get(0,0,600,600);
}

//masking the transparant tree image
if(treeImg){
    treeImg.mask(treeImgMask);
}

//the tree canopy image transparant
{

background(0,100,0);
fill(105, 84, 0);
stroke(80, 68, 0);
strokeWeight(13);
ellipse(300,300,87,87);

var transparantTree = get(0,0,600,600);

background(0, 0, 0);




noStroke();

fill(150);
//drawing the fringe of the tree
pushMatrix();
    for(var i = 0; i < 21; i++){
        translate(300,300);
        rotate(17);
        translate(-300,-300);
        ellipse(500,300,70,70);
    }
popMatrix();

ellipse(300,300,400,400);

//drawing the base of the tree
fill(255, 255, 255);
stroke(255, 255, 255);
strokeWeight(13);
ellipse(300,300,87,87);

var transparantTreeMask = get(0,0,600,600);
}

//masking the transparant tree image transparant
if(transparantTree){
    transparantTree.mask(transparantTreeMask);
}

}

var talking = false;

var chapter = 2;
var activeLocationNum = 55;
var activeLocationTitle;

//the locations
var showIcons = true;

//town image
{
background(255);

strokeWeight(5);
stroke(255, 255, 255);
fill(0, 0, 0);
rect(0,214,353,100);

fill(0);
rect(90,131,50,100);
rect(143,239,44,91);
rect(234,185,60,91);

triangle(114, 79, 156, 150, 74, 150);
pushMatrix();
    translate(150,50);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();



pushMatrix();
    translate(49,115);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();

rect(28,267,60,70);

pushMatrix();
    translate(-57,125);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();

stroke(255);
rect(180,268,160,122);
noStroke();
fill(255);
arc(260,331,100,100,180,360);
rect(210,323,100,100,10);
fill(0);
rect(0,330,180,57);

fill(255);
rect(0,330,180,4);
rect(180,330,4,150);

stroke(255);
fill(0);
beginShape();
vertex(397,244);
vertex(339,293);
vertex(339,388);
vertex(397,326);
endShape(CLOSE);
var townImage = get(0,0,400,400);




background(0, 0, 0);

strokeWeight(5);
stroke(255, 255, 255);
fill(255, 255, 255);
rect(0,214,353,100);

noStroke();
fill(0);
triangle(0,200,0,407,60,216);

stroke(255);
fill(255, 255, 255);
rect(90,131,50,100);
rect(143,239,44,91);
rect(234,185,60,91);

triangle(114, 79, 156, 150, 74, 150);
pushMatrix();
    translate(150,50);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();



pushMatrix();
    translate(49,115);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();

rect(28,267,60,70);

pushMatrix();
    translate(-57,125);
    triangle(114, 79, 156, 150, 74, 150);
popMatrix();

stroke(255, 255, 255);
rect(180,268,160,122);

stroke(255);
fill(0, 0, 0);
rect(210,321,100,67,10);
arc(260,331,100,100,180,360);
noStroke();
fill(0);
rect(213,376,95,30);

fill(255, 255, 255);
rect(0,330,180,57);

fill(255, 255, 255);
rect(0,330,161,4);
rect(180,330,4,54);

stroke(255);
fill(255, 255, 255);
beginShape();
vertex(397,244);
vertex(339,293);
vertex(339,388);
vertex(397,326);
endShape(CLOSE);
var townMask = get(0,0,400,400);
}

if(townImage){
    townImage.mask(townMask);
}


var travelBarTitle = '';
var selectedLocation = '';
var travelBarText = '';

var mountain = function(){
    strokeWeight(8);
    stroke(0);
    noFill();
    
    beginShape();
        vertex(385, 224);
        vertex(360, 213);
        vertex(341, 201);
        vertex(318, 196);
        vertex(305, 183);
        vertex(287, 168);
        vertex(270, 170);
        vertex(259, 158);
        vertex(243, 143);
        vertex(230, 123);
        vertex(215, 111);
        vertex(200, 110);
        vertex(187, 117);
        vertex(180, 132);
        vertex(168, 144);
        vertex(158, 145);
        vertex(143, 146);
        vertex(130, 160);
        vertex(115, 167);
        vertex(94, 175);
        vertex(83, 183);
        vertex(65, 189);
        vertex(53, 190);
        vertex(35, 192);
    endShape();
    beginShape();
        vertex(277, 172);
        vertex(270, 184);
        vertex(259, 190);
    endShape();
    beginShape();
        vertex(272, 184);
        vertex(271, 205);
        vertex(266, 225);
        vertex(253, 239);
    endShape();
    beginShape();
        vertex(263, 206);
        vertex(232, 237);
    endShape();
    beginShape();
        vertex(261, 215);
        vertex(242, 237);
    endShape();
    beginShape();
        vertex(267, 193);
        vertex(258, 200);
    endShape();
    beginShape();
        vertex(250, 200);
        vertex(223, 229);
    endShape();
    beginShape();
        vertex(265, 174);
        vertex(252, 185);
    endShape();
    beginShape();
        vertex(260, 168);
        vertex(254, 174);
    endShape();
    beginShape();
        vertex(219, 138);
        vertex(220, 197);
    endShape();
    beginShape();
        vertex(228, 189);
        vertex(209, 207);
    endShape();
    beginShape();
        vertex(211, 147);
        vertex(211, 195);
    endShape();
    beginShape();
        vertex(202, 152);
        vertex(205, 187);
    endShape();
    beginShape();
        vertex(217, 119);
        vertex(210, 132);
        vertex(202, 145);
        vertex(194, 153);
        vertex(197, 176);
    endShape();
    beginShape();
        vertex(188, 174);
        vertex(188, 148);
        vertex(198, 134);
        vertex(211, 117);
    endShape();
    beginShape();
        vertex(199, 117);
        vertex(188, 132);
        vertex(180, 146);
        vertex(180, 174);
    endShape();
    beginShape();
        vertex(172, 146);
        vertex(163, 151);
        vertex(149, 152);
        vertex(142, 160);
        vertex(131, 167);
        vertex(99, 180);
        vertex(83, 192);
        vertex(65, 197);
        vertex(43, 198);
        vertex(53, 204);
        vertex(69, 204);
        vertex(85, 197);
        vertex(95, 192);
        vertex(108, 184);
        vertex(127, 177);
        vertex(140, 171);
        vertex(148, 162);
        vertex(161, 158);
        vertex(173, 153);
    endShape();
    beginShape();
        vertex(70, 213);
        vertex(81, 208);
        vertex(94, 202);
        vertex(106, 195);
        vertex(119, 189);
        vertex(128, 186);
        vertex(141, 179);
        vertex(150, 169);
        vertex(161, 165);
    endShape();
    beginShape();
        vertex(160, 173);
        vertex(149, 178);
        vertex(141, 187);
        vertex(128, 193);
        vertex(117, 197);
        vertex(106, 203);
        vertex(77, 217);
    endShape();
    beginShape();
        vertex(84, 223);
        vertex(108, 206);
    endShape();
    beginShape();
        vertex(95, 224);
        vertex(110, 211);
    endShape();
    beginShape();
        vertex(106, 218);
        vertex(140, 195);
    endShape();
    beginShape();
        vertex(126, 214);
        vertex(107, 223);
    endShape();
    beginShape();
        vertex(108, 233);
        vertex(137, 215);
    endShape();
    beginShape();
        vertex(121, 240);
        vertex(141, 227);
    endShape();
    beginShape();
        vertex(137, 244);
        vertex(140, 239);
    endShape();
    beginShape();
        vertex(154, 211);
        vertex(191, 180);
    endShape();
    beginShape();
        vertex(175, 183);
        vertex(152, 204);
    endShape();
    beginShape();
        vertex(168, 177);
        vertex(147, 200);
    endShape();
    beginShape();
        vertex(186, 194);
        vertex(167, 208);
    endShape();
    beginShape();
        vertex(180, 206);
        vertex(171, 216);
    endShape();
    beginShape();
        vertex(183, 210);
        vertex(177, 224);
    endShape();
    beginShape();
        vertex(194, 207);
        vertex(185, 218);
    endShape();
    beginShape();
        vertex(200, 207);
        vertex(191, 227);
    endShape();
    beginShape();
        vertex(205, 212);
        vertex(196, 233);
    endShape();
    beginShape();
        vertex(212, 213);
        vertex(202, 241);
    endShape();
    beginShape();
        vertex(231, 201);
        vertex(218, 212);
    endShape();
    beginShape();
        vertex(241, 179);
        vertex(235, 194);
        vertex(235, 202);
    endShape();
    filter(BLUR, 0.6);
};
mountain();
var mountain = get();

var mountainMask = function(){
    background(0);
    stroke(255);
    strokeWeight(8);
    noFill();
    
    beginShape();
        vertex(385, 224);
        vertex(360, 213);
        vertex(341, 201);
        vertex(318, 196);
        vertex(305, 183);
        vertex(287, 168);
        vertex(270, 170);
        vertex(259, 158);
        vertex(243, 143);
        vertex(230, 123);
        vertex(215, 111);
        vertex(200, 110);
        vertex(187, 117);
        vertex(180, 132);
        vertex(168, 144);
        vertex(158, 145);
        vertex(143, 146);
        vertex(130, 160);
        vertex(115, 167);
        vertex(94, 175);
        vertex(83, 183);
        vertex(65, 189);
        vertex(53, 190);
        vertex(35, 192);
    endShape();
    beginShape();
        vertex(277, 172);
        vertex(270, 184);
        vertex(259, 190);
    endShape();
    beginShape();
        vertex(272, 184);
        vertex(271, 205);
        vertex(266, 225);
        vertex(253, 239);
    endShape();
    beginShape();
        vertex(263, 206);
        vertex(232, 237);
    endShape();
    beginShape();
        vertex(261, 215);
        vertex(242, 237);
    endShape();
    beginShape();
        vertex(267, 193);
        vertex(258, 200);
    endShape();
    beginShape();
        vertex(250, 200);
        vertex(223, 229);
    endShape();
    beginShape();
        vertex(265, 174);
        vertex(252, 185);
    endShape();
    beginShape();
        vertex(260, 168);
        vertex(254, 174);
    endShape();
    beginShape();
        vertex(219, 138);
        vertex(220, 197);
    endShape();
    beginShape();
        vertex(228, 189);
        vertex(209, 207);
    endShape();
    beginShape();
        vertex(211, 147);
        vertex(211, 195);
    endShape();
    beginShape();
        vertex(202, 152);
        vertex(205, 187);
    endShape();
    beginShape();
        vertex(217, 119);
        vertex(210, 132);
        vertex(202, 145);
        vertex(194, 153);
        vertex(197, 176);
    endShape();
    beginShape();
        vertex(188, 174);
        vertex(188, 148);
        vertex(198, 134);
        vertex(211, 117);
    endShape();
    beginShape();
        vertex(199, 117);
        vertex(188, 132);
        vertex(180, 146);
        vertex(180, 174);
    endShape();
    beginShape();
        vertex(172, 146);
        vertex(163, 151);
        vertex(149, 152);
        vertex(142, 160);
        vertex(131, 167);
        vertex(99, 180);
        vertex(83, 192);
        vertex(65, 197);
        vertex(43, 198);
        vertex(53, 204);
        vertex(69, 204);
        vertex(85, 197);
        vertex(95, 192);
        vertex(108, 184);
        vertex(127, 177);
        vertex(140, 171);
        vertex(148, 162);
        vertex(161, 158);
        vertex(173, 153);
    endShape();
    beginShape();
        vertex(70, 213);
        vertex(81, 208);
        vertex(94, 202);
        vertex(106, 195);
        vertex(119, 189);
        vertex(128, 186);
        vertex(141, 179);
        vertex(150, 169);
        vertex(161, 165);
    endShape();
    beginShape();
        vertex(160, 173);
        vertex(149, 178);
        vertex(141, 187);
        vertex(128, 193);
        vertex(117, 197);
        vertex(106, 203);
        vertex(77, 217);
    endShape();
    beginShape();
        vertex(84, 223);
        vertex(108, 206);
    endShape();
    beginShape();
        vertex(95, 224);
        vertex(110, 211);
    endShape();
    beginShape();
        vertex(106, 218);
        vertex(140, 195);
    endShape();
    beginShape();
        vertex(126, 214);
        vertex(107, 223);
    endShape();
    beginShape();
        vertex(108, 233);
        vertex(137, 215);
    endShape();
    beginShape();
        vertex(121, 240);
        vertex(141, 227);
    endShape();
    beginShape();
        vertex(137, 244);
        vertex(140, 239);
    endShape();
    beginShape();
        vertex(154, 211);
        vertex(191, 180);
    endShape();
    beginShape();
        vertex(175, 183);
        vertex(152, 204);
    endShape();
    beginShape();
        vertex(168, 177);
        vertex(147, 200);
    endShape();
    beginShape();
        vertex(186, 194);
        vertex(167, 208);
    endShape();
    beginShape();
        vertex(180, 206);
        vertex(171, 216);
    endShape();
    beginShape();
        vertex(183, 210);
        vertex(177, 224);
    endShape();
    beginShape();
        vertex(194, 207);
        vertex(185, 218);
    endShape();
    beginShape();
        vertex(200, 207);
        vertex(191, 227);
    endShape();
    beginShape();
        vertex(205, 212);
        vertex(196, 233);
    endShape();
    beginShape();
        vertex(212, 213);
        vertex(202, 241);
    endShape();
    beginShape();
        vertex(231, 201);
        vertex(218, 212);
    endShape();
    beginShape();
        vertex(241, 179);
        vertex(235, 194);
        vertex(235, 202);
    endShape();
    filter(BLUR, 0.6);
};
mountainMask();
var mountainMask = get();

if(mountain){
    mountain.mask(mountainMask);
}

var rivers = [];
var mapTrees = [];

imageMode(CORNER);
image(getImage("cute/WoodBlock"),0,-50);
var woodBlock = get();

image(getImage('cute/WaterBlock'),0,-50);
var waterBlock= get();

noStroke();
background(0);
fill(255);
rect(10,10,60,60);
var blockMask = get();

if(waterBlock){
    waterBlock.mask(blockMask);
}
if(woodBlock){
    woodBlock.mask(blockMask);
}

var Mbutton = function(x,y,baseW,h,t,c){
    this.x = x;
    this.y = y;
    this.baseW = baseW;
    this.h = h;
    this.t = t;
    this.c = c;
    this.w = this.baseW;
    this.draw = function() {
        strokeWeight(2);
        stroke(0);
        fill(0);
        rect(this.x-3,this.y-3,this.w,this.h,3);
        
        fill(this.c);
        rect(this.x,this.y,this.w,this.h,3);
        
        fill(255);
        if(scene === 1 || scene === 2 || scene === 3 || scene === 4){
            textSize(29);
        }
        else if(scene === 14){
            textSize(40);
        }
        else{
            textSize(25);
        }
        
        textMode(CENTER);
        text(this.t,this.x-285,this.y-254,570,500);
        fill(0);
        text(this.t,this.x-285,this.y-253,570,500);
        
        if(this.mouseOn()){
            this.w = lerp(this.w,this.baseW+20,0.1);
        }
        else{
            this.w = lerp(this.w,this.baseW,0.1);
        }
    };
    this.mouseOn = function(){
        if(mouseX > this.x-this.w/2&&
        mouseX < this.x+this.w/2 &&
        mouseY > this.y-this.h/2 &&
        mouseY < this.y+this.h/2
        ){
            return(true); 
        }
        else{return(false);}
    };
    this.update = function(){
        if(scene === 1){
            this.x = lerp(this.x,300,0.05);
        }
        else if(scene === 2 || scene === 3 || scene === 4){
            this.y = lerp(this.y,540,0.05);
            
        }
        else if(scene === 14){
             this.y = lerp(this.y,560,0.05);
        }
    };
};
var travelBackground = function(){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            
            image(waterBlock,-10+i*60,-10+j*60);
            
        }
    }
    noStroke();
    fill(0,50);
    //rect(0,0,600,600);
    filter(BLUR,2.5);
};

travelBackground();
var travelBackground = get(0,0,600,600);

var travelBarImg= function(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 3; j++){
            image(woodBlock,-10+i*60,-10+j*60+400);
        }
    }
    noStroke();
    fill(0,50);
    filter(BLUR,2.5);
    
    
};

travelBarImg();
var travelBarImg = get(0,400,600,600);
imageMode(CENTER);

var protalis = {
    'Forest of Fluence1': {
        'map': [
'             t     #',  
'       t  t      t #',
'rrrr            t   ',
' %  r  t  t  t      ',
'    r  t         t  ',
't   r     t#        ',
'             t   #t ',
' t     t  t#    t###',
'       t     t   t  ',
'   t      t      t  ',
'  ## r ##    t   t  ',
        ],
        'specks': {
            treeSize: 110,
            threat: 40,
            enemyTypes: ['bear','orc','rat'],
        },
    },
    'Hradic Hills2': {
        'map': [
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
'                                          ',
        ],
        'specks': {
            treeSize: 60
        },
    },
    'Endless Plains': {
        'map': [
'               %                                           ',
'                                                           ',
'                                                    r      ',
'         t                                                 ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                     t                     ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                           t                               ',
'                                                           ',
'                                                           ',
'                                                           ',
'r                                                          ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                           r               ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
'                     r                                     ',
'                                                           ',
'                                                           ',
'                                                           ',
'                                                           ',
        ],
        'specks': {
            treeSize: 100,
            threat: 10,
            enemyTypes: ['horned ram','rat'],
        },
    },
    'The Fertile Fields': {
        'map': [
'                                      ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd  r   dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd   r  dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
            
        },
        
    },
    'The Fertile Fields2': {
        'map': [
'                   1                  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd t    dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd   r  dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
        },
    },
    'The Fertile Fields3': {
        'map': [
'                                      ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd  t   dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
        },
    },
    'The Fertile Fields4': {
        'map': [
'                                      ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
        },
    },
    'The Fertile Fields5': {
        'map': [
'                                      ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd   t  dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
        },
    },
    'The Fertile Fields6': {
        'map': [
't                                    t',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd r    dffffffffffffd  ', 
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dffffffffffffd      dffffffffffffd  ',
'  dddddddddddddd      dddddddddddddd  ',
        ],
        'specks': {
            treeSize: 80,
            threat: 15,
            enemyTypes: ['horned ram','bandit','rat'],
        },
    },
    "The Farmer's Road": {
        'map': [
'               dddddd                 ',
'           r   dddddd                 ',
'               dddddd                 ',
'        t      dddddd        r        ',
'               dddddd                 ',
'               dddddd              t  ',
'           r    dddddd                ',
'                 dddddd               ',
'                  dddddd              ',
'                  dddddd              ',
'                  dddddd              ',
'      t     r     dddddd              ',
'                   dddddd             ',
'                    dddddd    t       ',
'                     dddddd           ',
'     t           r   dddddd           ',
'                     dddddd           ',
'                     dddddd           ',
'                     dddddd           ',
'           t     r   dddddd        t  ',
'                     dddddd           ',
'                     dddddd           ',
'                      dddddd          ',
'                 r     dddddd         ',
'       t                dddddd        ',
'                        dddddd        ',
'                   r    dddddd        ',
'                        dddddd        ',
'                       dddddd         ',
'               r      dddddd          ',
'                     dddddd           ',
'       t            dddddd            ',
'                   dddddd             ',
'                  dddddd         t    ',
'                dddddd                ',
        ],
        'specks': {
            treeSize: 80,
            threat: 20,
            enemyTypes: ['orc','bandit','rat'],
        },
    },
    'Southern Road': {
        'map': [
'                      ddddd           ',
'                      ddddd           ',
'       r              ddddd        t  ',
'                     ddddd            ',
'                     ddddd            ',
'          t          ddddd            ',
'                    ddddd             ',
'                    ddddd             ',
'                    ddddd             ',
'                   ddddd              ',
'                   ddddd              ',
'                   ddddd              ',
'                   ddddd              ',
'                  ddddd               ',
'      ##          ddddd               ',
'       #          ddddd       t       ',
'                 ddddd                ',
'      r          ddddd                ',
'                 ddddd                ',
'                ddddd                 ',
'                ddddd                 ',
'                ddddd                 ',
'               ddddd                  ',
'               ddddd                  ',
'         r     ddddd                  ',
'              ddddd                   ',
'              ddddd                   ',
'              ddddd                   ',
'             ddddd               t    ',
'             ddddd                    ',
'             ddddd                    ',
'            ddddd                     ',
'            ddddd            t        ',
'   r        ddddd                     ',
'           ddddd                      ',
'           ddddd                      ',
'           ddddd                      ',
        ],
        'specks': {
            treeSize: 80,
            threat: 20,
            enemyTypes: ['orc','bandit','rat'],
        },
    },
    'Southern Road2': {
        'map': [
'                      ddddd           ',
'                      ddddd           ',
'       t              ddddd           ',
'                     ddddd            ',
'             r       ddddd            ',
'                     ddddd        t   ',
'                    ddddd             ',
'                    ddddd             ',
'                    ddddd             ',
'                r  ddddd              ',
'                r  ddddd              ',
'              r    ddddd              ',
'                   ddddd              ',
'                  ddddd               ',
'                  ddddd               ',
'                  ddddd               ',
'                 ddddd                ',
'                 ddddd                ',
'                 ddddd                ',
'                ddddd                 ',
'                ddddd                 ',
'     t          ddddd                 ',
'               ddddd             r    ',
'               ddddd                  ',
'               ddddd                  ',
'              ddddd                   ',
'              ddddd                   ',
'              ddddd                   ',
'             ddddd                    ',
'             ddddd                    ',
'             ddddd           t        ',
'            ddddd         t           ',
'            ddddd                     ',
'            ddddd                     ',
't          ddddd                  t   ',
'           ddddd                      ',
'           ddddd                      ',
        ],
        'specks': {
            treeSize: 80,
            threat: 20,
            enemyTypes: ['orc','bandit','rat'],
        },
    },
    'The Aquatic Entrance': {
        'map': [
'                                            ',
'                 ddddddd             t      ',
'                d   d   d                   ',
'                d   d   d                t  ',
'                d   d   d                   ',
'                dddd*dddd            t      ',
'                d   d   d                   ',
'                d   d   d                   ',
'      r         d   d   d                t  ',
'                 ddddddd           t        ',
'                                            ',
'                                      t     ',
'                                            ',
'                        r       <<<<<<<<<<<<',
'                        <<<<<<<<<<<<<<<<<<<<',
'         r         <<<<<<<<<<<<<<<<<<<<<<<<<',
'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
'<<<<<<<<<<<<<<<<<<<<<<<<                 <<<',
'<<<<<<<<<<<<<<<<<<<<            t           ',
'    r              r                        ',
'                                            ',
'                                      t     ',
'                                            ',
'                                 t          ',
'                                            ',
'               r                            ',
'                                    t       ',
'                                            ',
'                                 t          ',
'                                            ',
'                                        t   ',
'                                            ',
'                                      t     ',
'           r                                ',
'                               r            ',
'                                          t ',
'                                            ',
'                                    t       ',
        ],
        'specks': {
            riverSpeed: 2,
            treeSize: 85,
            threat: 25,
            enemyTypes: ['orc','bandit','bear','rat'],
        },
    },
};

var rr = 0;
var time = 'day';

var scene = 1;
var mage = 0;
var warrior = 0;
var ranger = 0;
var r = random(0.5,4.5);
textAlign(CENTER,CENTER);

var chosen = '';
rectMode(CENTER);

var transitionXY = 0;
var transitionState = 'close';
var enemyCount = 0;
var resting = false;
var levelUpBarOpen = false;

var keys = [];

var ellip = function(x,y,w,h,rot){
    noStroke();
    pushMatrix();
        translate(x,y);
        rotate(rot);
        ellipse(0,0,w,h);
    popMatrix();
};
var ederilTalk = 0;
noiseSeed(0);

//map image
{

imageMode(CORNER);
image(travelBackground,0,0);



imageMode(CENTER);

noFill();
stroke(0);
strokeWeight(2);
fill(150,100,0);


//the shape of the island
{
fill(100);
beginShape();
    vertex(570, 122);
    vertex(577, 124);
    vertex(580, 124);
    vertex(581, 122);
    vertex(585, 120);
    vertex(587, 117);
    vertex(584, 112);
    vertex(585, 109);
    vertex(587, 104);
    vertex(589, 97);
    vertex(591, 94);
    vertex(589, 90);
    vertex(585, 88);
    vertex(584, 83);
    vertex(583, 79);
    vertex(575, 80);
    vertex(572, 74);
    vertex(567, 76);
    vertex(560, 77);
    vertex(555, 81);
    vertex(549, 82);
    vertex(549, 83);
    vertex(546, 91);
    vertex(544, 96);
    vertex(546, 103);
    vertex(543, 108);
    vertex(553, 111);
    vertex(556, 114);
    vertex(560, 118);
    vertex(564, 122);
    vertex(570, 122);
endShape();

fill(150,100,0);
beginShape();
    vertex(523, 182);
    vertex(522, 188);
    vertex(515, 188);
    vertex(516, 184);
    vertex(510, 180);
    vertex(496, 180);
    vertex(486, 174);
    vertex(480, 174);
    vertex(483, 172);
    vertex(477, 168);
    vertex(472, 166);
    vertex(467, 170);
    vertex(464, 170);
    vertex(460, 166);
    vertex(454, 164);
    vertex(459, 159);
    vertex(458, 153);
    vertex(454, 153);
    vertex(459, 145);
    vertex(464, 144);
    vertex(474, 142);
    vertex(476, 136);
    vertex(474, 131);
    vertex(465, 132);
    vertex(470, 126);
    vertex(470, 117);
    vertex(474, 115);
    vertex(475, 109);
    vertex(483, 111);
    vertex(485, 107);
    vertex(499, 109);
    vertex(499, 113);
    vertex(503, 113);
    vertex(506, 114);
    vertex(511, 114);
    vertex(511, 112);
    vertex(515, 109);
    vertex(520, 108);
    vertex(524, 111);
    vertex(525, 116);
    vertex(521, 118);
    vertex(522, 120);
    vertex(529, 123);
    vertex(536, 128);
    vertex(535, 131);
    vertex(545, 138);
    vertex(541, 139);
    vertex(541, 144);
    vertex(532, 150);
    vertex(536, 157);
    vertex(536, 164);
    vertex(538, 171);
    vertex(531, 175);
    vertex(529, 179);
    vertex(523, 182);
endShape();

beginShape();
    vertex(386, 99);
    vertex(384, 105);
    vertex(381, 100);
    vertex(385, 94);
    vertex(391, 94);
    vertex(386, 99);
endShape();

beginShape();
    vertex(478, 198);
    vertex(476, 204);
    vertex(470, 202);
    vertex(470, 196);
    vertex(474, 194);
    vertex(474, 196);
    vertex(478, 198);
endShape();

beginShape();
    vertex(352, 110);
    vertex(351, 113);
    vertex(348, 113);
    vertex(346, 110);
    vertex(352, 110);
endShape();

beginShape();
    vertex(234, 289);
    vertex(230, 292);
    vertex(230, 298);
    vertex(225, 299);
    vertex(223, 304);
    vertex(218, 307);
    vertex(209, 305);
    vertex(209, 298);
    vertex(213, 293);
    vertex(212, 287);
    vertex(215, 284);
    vertex(217, 286);
    vertex(218, 280);
    vertex(210, 278);
    vertex(206, 282);
    vertex(202, 282);
    vertex(201, 286);
    vertex(195, 286);
    vertex(190, 292);
    vertex(190, 299);
    vertex(184, 303);
    vertex(184, 310);
    vertex(175, 317);
    vertex(171, 322);
    vertex(171, 327);
    vertex(178, 333);
    vertex(184, 331);
    vertex(187, 337);
    vertex(187, 344);
    vertex(184, 351);
    vertex(185, 357);
    vertex(190, 361);
    vertex(191, 370);
    vertex(186, 374);
    vertex(182, 381);
    vertex(179, 387);
    vertex(186, 389);
    vertex(190, 397);
    vertex(194, 404);
    vertex(203, 404);
    vertex(208, 399);
    vertex(213, 395);
    vertex(218, 398);
    vertex(222, 398);
    vertex(229, 392);
    vertex(235, 394);
    vertex(247, 401);
    vertex(270, 390);
    vertex(273, 387);
    vertex(277, 389);
    
    vertex(274, 402);
    vertex(274, 405);
    vertex(281, 413);
    vertex(283, 420);
    vertex(290, 422);
    vertex(293, 429);
    vertex(303, 431);
    vertex(312, 434);
    vertex(324, 437);
    vertex(325, 441);
    vertex(331, 444);
    vertex(340, 439);
    vertex(345, 432);
    vertex(351, 434);
    vertex(360, 433);
    vertex(360, 428);
    vertex(365, 428);
    vertex(368, 429);
    vertex(372, 435);
    vertex(379, 437);
    vertex(384, 441);
    vertex(381, 449);
    vertex(376, 457);
    vertex(381, 464);
    vertex(387, 467);
    vertex(395, 465);
    vertex(400, 460);
    vertex(401, 449);
    vertex(405, 438);
    vertex(405, 431);
    vertex(406, 426);
    vertex(412, 430);
    vertex(420, 429);
    vertex(422, 422);
    vertex(425, 414);
    vertex(421, 412);
    vertex(421, 403);
    vertex(426, 399);
    vertex(431, 401);
    vertex(435, 404);
    vertex(439, 402);
    vertex(443, 399);
    vertex(448, 402);
    vertex(449, 405);
    vertex(455, 403);
    vertex(457, 394);
    vertex(457, 385);
    vertex(456, 378);
    vertex(459, 372);
    vertex(454, 368);
    vertex(456, 361);
    vertex(453, 355);
    vertex(455, 354);
    vertex(457, 349);
    vertex(459, 337);
    vertex(461, 324);
    vertex(456, 320);
    vertex(455, 312);
    vertex(453, 304);
    vertex(459, 299);
    vertex(459, 291);
    vertex(465, 291);
    vertex(467, 284);
    vertex(471, 280);
    vertex(473, 275);
    vertex(476, 282);
    vertex(479, 285);
    vertex(483, 283);
    vertex(480, 275);
    vertex(484, 269);
    vertex(482, 249);
    vertex(478, 243);
    vertex(484, 239);
    vertex(493, 239);
    vertex(500, 239);
    vertex(501, 234);
    vertex(497, 224);
    vertex(487, 222);
    vertex(482, 224);
    vertex(478, 224);
    vertex(478, 218);
    vertex(470, 217);
    vertex(465, 212);
    vertex(462, 208);
    vertex(456, 205);
    vertex(451, 204);
    vertex(450, 198);
    vertex(458, 196);
    vertex(464, 194);
    vertex(459, 183);
    vertex(454, 186);
    vertex(448, 185);
    vertex(451, 179);
    vertex(456, 178);
    vertex(454, 174);
    vertex(448, 172);
    vertex(442, 172);
    vertex(440, 169);
    vertex(434, 169);
    vertex(427, 167);
    vertex(425, 157);
    vertex(422, 151);
    vertex(416, 150);
    vertex(413, 147);
    vertex(419, 145);
    vertex(419, 139);
    vertex(423, 135);
    vertex(426, 142);
    vertex(430, 139);
    vertex(428, 146);
    vertex(433, 150);
    vertex(438, 147);
    vertex(442, 139);
    vertex(438, 134);
    vertex(432, 132);
    vertex(434, 125);
    vertex(433, 119);
    vertex(426, 118);
    vertex(417, 116);
    vertex(409, 113);
    vertex(405, 109);
    vertex(402, 118);
    vertex(395, 119);
    vertex(385, 119);
    vertex(388, 128);
    vertex(389, 140);
    vertex(381, 141);
    vertex(377, 134);
    vertex(371, 140);
    vertex(370, 143);
    vertex(365, 144);
    vertex(364, 140);
    vertex(360, 132);
    vertex(355, 138);
    vertex(352, 144);
    vertex(350, 131);
    vertex(353, 123);
    vertex(344, 115);
    vertex(332, 114);
    vertex(325, 118);
    vertex(316, 112);
    vertex(306, 111);
    vertex(301, 116);
    vertex(302, 124);
    vertex(300, 133);
    vertex(295, 136);
    vertex(291, 141);
    vertex(295, 147);
    vertex(292, 155);
    vertex(285, 152);
    vertex(279, 148);
    vertex(275, 157);
    vertex(263, 155);
    vertex(257, 151);
    vertex(256, 156);
    vertex(251, 157);
    vertex(249, 161);
    vertex(243, 161);
    vertex(239, 165);
    vertex(242, 170);
    vertex(238, 173);
    vertex(244, 179);
    vertex(242, 185);
    vertex(247, 189);
    vertex(244, 195);
    vertex(239, 196);
    vertex(242, 200);
    vertex(242, 205);
    vertex(238, 211);
    vertex(235, 218);
    vertex(230, 224);
    vertex(223, 230);
    vertex(223, 234);
    vertex(233, 239);
    vertex(241, 239);
    vertex(243, 234);
    vertex(251, 234);
    vertex(252, 242);
    vertex(255, 250);
    vertex(261, 253);
    vertex(259, 262);
    vertex(250, 264);
    vertex(243, 268);
    vertex(239, 273);
    vertex(234, 265);
    vertex(227, 269);
    vertex(228, 275);
    vertex(230, 281);
    vertex(234, 289);
endShape();

beginShape();
    vertex(202, 244);
    vertex(199, 234);
    vertex(195, 229);
    vertex(199, 219);
    vertex(200, 210);
    vertex(194, 204);
    vertex(195, 196);
    vertex(200, 193);
    vertex(205, 188);
    vertex(209, 188);
    vertex(208, 179);
    vertex(208, 174);
    vertex(208, 170);
    vertex(212, 171);
    vertex(219, 171);
    vertex(214, 164);
    vertex(205, 161);
    vertex(198, 161);
    vertex(191, 153);
    vertex(185, 153);
    vertex(183, 148);
    vertex(179, 148);
    vertex(178, 144);
    vertex(189, 146);
    vertex(194, 146);
    vertex(187, 140);
    vertex(181, 136);
    vertex(168, 134);
    vertex(166, 129);
    vertex(161, 124);
    vertex(161, 121);
    vertex(162, 117);
    vertex(166, 122);
    vertex(169, 124);
    vertex(173, 122);
    vertex(171, 117);
    vertex(169, 112);
    vertex(162, 107);
    vertex(155, 107);
    vertex(150, 104);
    vertex(146, 109);
    vertex(136, 107);
    vertex(139, 114);
    vertex(139, 116);
    vertex(130, 114);
    vertex(127, 109);
    vertex(119, 113);
    vertex(113, 108);
    vertex(110, 104);
    vertex(102, 102);
    vertex(95, 102);
    vertex(82, 98);
    vertex(81, 104);
    vertex(80, 108);
    vertex(76, 110);
    vertex(68, 106);
    vertex(59, 103);
    vertex(57, 106);
    vertex(50, 107);
    vertex(44, 110);
    vertex(35, 113);
    vertex(36, 118);
    vertex(44, 118);
    vertex(40, 123);
    vertex(45, 128);
    vertex(44, 136);
    vertex(47, 138);
    vertex(40, 142);
    vertex(36, 149);
    vertex(28, 148);
    vertex(22, 145);
    vertex(26, 156);
    vertex(31, 157);
    vertex(30, 150);
    vertex(37, 154);
    vertex(43, 157);
    vertex(49, 154);
    vertex(54, 155);
    vertex(54, 162);
    vertex(58, 162);
    vertex(59, 168);
    vertex(51, 170);
    vertex(44, 172);
    vertex(38, 169);
    vertex(38, 176);
    vertex(43, 177);
    vertex(38, 185);
    vertex(28, 184);
    vertex(30, 178);
    vertex(23, 176);
    vertex(15, 180);
    vertex(12, 187);
    vertex(5, 193);
    vertex(10, 196);
    vertex(16, 197);
    vertex(14, 204);
    vertex(13, 210);
    vertex(20, 210);
    vertex(21, 214);
    vertex(12, 218);
    vertex(8, 222);
    vertex(16, 226);
    vertex(23, 228);
    vertex(27, 234);
    vertex(34, 232);
    vertex(40, 229);
    vertex(45, 230);
    vertex(50, 227);
    vertex(55, 230);
    vertex(69, 234);
    vertex(64, 239);
    vertex(70, 240);
    vertex(80, 242);
    vertex(92, 248);
    vertex(98, 253);
    vertex(105, 254);
    vertex(115, 259);
    vertex(126, 259);
    vertex(128, 255);
    vertex(133, 257);
    vertex(137, 259);
    vertex(137, 251);
    vertex(143, 254);
    vertex(143, 259);
    vertex(148, 251);
    vertex(144, 245);
    vertex(151, 249);
    vertex(153, 255);
    vertex(147, 259);
    vertex(152, 264);
    vertex(149, 270);
    vertex(157, 274);
    vertex(167, 272);
    vertex(168, 264);
    vertex(166, 258);
    vertex(178, 258);
    vertex(178, 253);
    vertex(170, 250);
    vertex(175, 246);
    vertex(180, 245);
    vertex(184, 241);
    vertex(185, 247);
    vertex(190, 244);
    vertex(195, 249);
    vertex(199, 249);
    vertex(202, 244);
endShape();

beginShape();
    vertex(214, 227);
    vertex(219, 227);
    vertex(216, 233);
    vertex(218, 241);
    vertex(211, 243);
    vertex(209, 236);
    vertex(206, 228);
    vertex(209, 220);
    vertex(211, 223);
    vertex(214, 227);
endShape();

beginShape();
    vertex(371, 134);
    vertex(365, 135);
    vertex(363, 129);
    vertex(370, 126);
    vertex(372, 130);
    vertex(371, 134);
endShape();

beginShape();
    vertex(280, 139);
    vertex(277, 144);
    vertex(272, 139);
    vertex(267, 139);
    vertex(266, 133);
    vertex(269, 129);
    vertex(285, 134);
    vertex(286, 139);
    vertex(280, 139);
endShape();

beginShape();
    vertex(253,135);
    vertex(251,140);
    vertex(253,144);
    vertex(254,148);
    vertex(257,146);
    vertex(257,142);
    vertex(259,139);
    vertex(261,133);
    vertex(253,135);
endShape();

beginShape();
    vertex(233,145);
    vertex(231,154);
    vertex(237,159);
    vertex(247,153);
    vertex(244,146);
    vertex(239,150);
    vertex(233,145);
endShape();

beginShape();
    vertex(241,132);
    vertex(232,137);
    vertex(238,142);
    vertex(246,143);
    vertex(247,134);
    vertex(242,130);
    vertex(239,134);
endShape();


}

//the lakes
{
fill(100,150,255);
beginShape();
    vertex(508,137);
    vertex(510,140);
    vertex(512,145);
    vertex(509,149);
    vertex(503,147);
    vertex(500,145);
    vertex(494,142);
    vertex(493,138);
    vertex(491,136);
    vertex(494,134);
    vertex(498,132);
    vertex(501,133);
    vertex(505,132);
    vertex(509,134);
    vertex(508,137);
endShape();

beginShape();
    vertex(268,207);
    vertex(273,210);
    vertex(275,215);
    vertex(275,215);
    vertex(268,220);
    vertex(270,224);
    vertex(268,229);
    vertex(264,229);
    vertex(260,225);
    vertex(260,215);
    vertex(254,218);
    vertex(251,214);
    vertex(253,208);
    vertex(254,204);
    vertex(258,202);
    vertex(261,203);
    vertex(265,202);
    vertex(269,204);
    vertex(268,207);
    
endShape(CLOSE);

beginShape();
    vertex(259,208);
    vertex(261,210);
    vertex(262,209);
    vertex(262,208);
endShape(CLOSE);

beginShape();
    vertex(385, 235);
    vertex(375, 242);
    vertex(369, 248);
    vertex(360, 250);
    vertex(357, 261);
    vertex(355, 265);
    vertex(355, 274);
    vertex(360, 273);
    vertex(367, 273);
    vertex(368, 264);
    vertex(374, 260);
    vertex(378, 254);
    vertex(380, 247);
    vertex(385, 243);
    vertex(391, 240);
    vertex(395, 236);
    vertex(391, 231);
    vertex(385, 229);
    vertex(384, 235);
endShape();
beginShape();
    vertex(85, 173);
    vertex(78, 174);
    vertex(74, 171);
    vertex(69, 171);
    vertex(65, 177);
    vertex(74, 181);
    vertex(78, 187);
    vertex(84, 184);
    vertex(89, 180);
    vertex(85, 173);
endShape();

}

imageMode(CENTER);

//roads
{
    
noFill();
stroke(115, 69, 0);
beginShape();
    vertex(451, 183);
    vertex(393, 214);
    vertex(335, 237);
    vertex(286, 234);
    vertex(264, 232);
    vertex(236, 233);
endShape();
beginShape();
    vertex(335, 238);
    vertex(322, 271);
    vertex(318, 307);
    vertex(305, 333);
    vertex(293, 353);
    vertex(288, 382);
    vertex(291, 416);
endShape();
beginShape();
    vertex(196, 239);
    vertex(185, 220);
    vertex(185, 206);
    vertex(178, 192);
    vertex(194, 176);
    vertex(205, 166);
endShape();

}

//the towns
{

image(townImage,155,125,20,20);
image(townImage,193,230,25,25);
image(townImage,238,225,30,30);
image(townImage,450,180,22,22);
image(townImage,333,230,21,21);
image(townImage,292,410,20,20);
image(townImage,270,228,15,15);
}

//the mountains
{
    imageMode(CORNER);
    image(mountain,415,292,80,90);
image(mountain,425,320,50,50);
image(mountain,410,325,60,65);
image(mountain,406,339,85,90);
image(mountain,395,360,90,90);
image(mountain,343,397,60,60);
image(mountain,355,370,100,100);
image(mountain,370,400,70,80);
image(mountain,380,420,35,80);
image(mountain,375,445,35,40);

image(mountain,510,120,50,50);
image(mountain,500,108,50,50);
image(mountain,480,110,50,50);
image(mountain,470,100,50,50);
image(mountain,460,112,50,50);
image(mountain,475,125,30,30);

image(mountain,550,68,50,100);

image(mountain,20,167,90,90);
image(mountain,10,190,90,90);
image(mountain,55,183,90,90);
image(mountain,70,205,90,90);

image(mountain,340,185,90,30);
image(mountain,300,178,90,30);
image(mountain,290,165,90,30);
image(mountain,280,155,90,30);
image(mountain,288,145,90,30);
image(mountain,292,134,90,30);
}

//the rivers
{
noFill();
stroke(0);
strokeWeight(1);

beginShape();
    vertex(247, 400);
    vertex(251, 396);
    vertex(251, 390);
    vertex(257, 389);
    vertex(261, 384);
    vertex(261, 381);
    vertex(262, 377);
    vertex(263, 372);
    vertex(262, 366);
    vertex(263, 362);
    vertex(266, 358);
    vertex(270, 356);
    vertex(274, 350);
    vertex(275, 342);
    vertex(272, 336);
    vertex(266, 335);
    vertex(259, 335);
    vertex(251, 330);
endShape();
strokeWeight(2);
beginShape();
    vertex(261, 259);
    vertex(265, 267);
    vertex(265, 274);
    vertex(260, 281);
    vertex(257, 291);
    vertex(252, 297);
    vertex(252, 307);
    vertex(246, 311);
    vertex(237, 315);
    vertex(235, 320);
    vertex(234, 326);
    vertex(229, 328);
    vertex(226, 337);
    vertex(226, 339);
endShape();

strokeWeight(1);

beginShape();
    vertex(265, 271);
    vertex(267, 276);
    vertex(272, 282);
    vertex(276, 287);
    vertex(279, 290);
    vertex(285, 294);
    vertex(292, 296);
    vertex(299, 295);
    vertex(303, 291);
    vertex(304, 284);
endShape();
beginShape();
    vertex(284, 293);
    vertex(287, 300);
    vertex(288, 307);
    vertex(287, 311);
    vertex(281, 314);
    vertex(275, 318);
    vertex(277, 324);
    vertex(276, 326);
endShape();
beginShape();
    vertex(250, 309);
    vertex(254, 314);
    vertex(259, 316);
    vertex(263, 313);
endShape();
beginShape();
    vertex(225, 330);
endShape();
beginShape();
    vertex(228, 330);
    vertex(224, 330);
    vertex(219, 333);
    vertex(214, 334);
    vertex(207, 337);
    vertex(203, 341);
    vertex(202, 347);
    vertex(198, 353);
    vertex(195, 356);
endShape();
beginShape();
    vertex(224, 338);
    vertex(223, 346);
    vertex(228, 350);
    vertex(229, 359);
    vertex(226, 364);
    vertex(229, 370);
    vertex(230, 375);
endShape();
beginShape();
    vertex(260, 333);
    vertex(254, 337);
    vertex(248, 343);
    vertex(249, 351);
    vertex(244, 354);
    vertex(239, 359);
    vertex(241, 364);
endShape();
beginShape();
    vertex(251, 329);
    vertex(247, 330);
    vertex(240, 336);
    vertex(237, 340);
endShape();
beginShape();
    vertex(251, 390);
    vertex(247, 384);
    vertex(239, 383);
    vertex(232, 385);
    vertex(226, 383);
    vertex(218, 384);
    vertex(216, 378);
    vertex(211, 379);
    vertex(204, 378);
    vertex(199, 380);
endShape();
beginShape();
    vertex(275, 342);
    vertex(276, 338);
    vertex(281, 331);
    vertex(286, 327);
    vertex(294, 325);
    vertex(295, 316);
endShape();
beginShape();
    vertex(238, 314);
    vertex(229, 314);
    vertex(222, 316);
    vertex(217, 320);
    vertex(205, 314);
    vertex(200, 314);
endShape();

stroke(0,100);
beginShape();
    vertex(224, 337);
    vertex(224, 339);
    vertex(225, 336);
endShape();
beginShape();
    vertex(223, 345);
    vertex(220, 349);
    vertex(216, 354);
    vertex(212, 361);
    vertex(206, 363);
endShape();
beginShape();
    vertex(215, 378);
    vertex(215, 374);
    vertex(218, 369);
    vertex(221, 364);
endShape();
beginShape();
    vertex(230, 358);
    vertex(229, 363);
    vertex(236, 365);
    vertex(236, 368);
    vertex(237, 374);
endShape();
beginShape();
    vertex(250, 351);
    vertex(248, 355);
    vertex(249, 358);
    vertex(250, 364);
    vertex(249, 366);
    vertex(247, 370);
endShape();
beginShape();
    vertex(204, 340);
    vertex(198, 342);
    vertex(196, 337);
    vertex(192, 334);
endShape();
beginShape();
    vertex(216, 319);
    vertex(211, 322);
    vertex(207, 324);
    vertex(203, 327);
    vertex(195, 325);
endShape();
beginShape();
    vertex(202, 313);
    vertex(199, 310);
    vertex(199, 304);
    vertex(198, 301);
    vertex(201, 296);
endShape();
beginShape();
    vertex(257, 316);
    vertex(259, 320);
    vertex(263, 324);
    vertex(267, 328);
endShape();
beginShape();
    vertex(275, 317);
    vertex(273, 314);
    vertex(272, 308);
    vertex(266, 308);
    vertex(260, 304);
endShape();
beginShape();
    vertex(274, 351);
    vertex(277, 347);
    vertex(282, 344);
    vertex(286, 343);
    vertex(288, 339);
endShape();
beginShape();
    vertex(219, 384);
    vertex(212, 386);
    vertex(208, 390);
    vertex(200, 391);
    vertex(195, 392);
endShape();
beginShape();
    vertex(253, 294);
    vertex(248, 298);
    vertex(244, 302);
    vertex(237, 305);
    vertex(229, 305);
endShape();
beginShape();
    vertex(291, 294);
    vertex(293, 291);
    vertex(295, 284);
    vertex(292, 281);
    vertex(287, 274);
endShape();
beginShape();
    vertex(265, 265);
    vertex(271, 270);
    vertex(275, 274);
    vertex(278, 280);
    vertex(282, 280);
endShape();
beginShape();
    vertex(276, 287);
    vertex(278, 294);
    vertex(273, 297);
    vertex(269, 300);
endShape();
beginShape();
    vertex(250, 328);
    vertex(247, 324);
    vertex(248, 318);
endShape();
beginShape();
    vertex(237, 337);
    vertex(237, 344);
    vertex(235, 350);
endShape();
beginShape();
    vertex(263, 359);
    vertex(263, 352);
    vertex(265, 344);
    vertex(258, 345);
endShape();
beginShape();
    vertex(248, 383);
    vertex(250, 378);
    vertex(253, 371);
    vertex(255, 365);
endShape();
beginShape();
    vertex(203, 377);
    vertex(199, 372);
    vertex(200, 365);
    vertex(204, 359);
endShape();
beginShape();
    vertex(265, 274);
    vertex(257, 274);
    vertex(265, 278);
    vertex(244, 281);
    vertex(241, 284);
    vertex(239, 289);
endShape();

stroke(0,50);

beginShape();
    vertex(225, 338);
    vertex(224, 339);
    vertex(225, 338);
    vertex(224, 339);
    vertex(225, 338);
    vertex(224, 339);
endShape();
beginShape();
    vertex(205, 338);
    vertex(204, 344);
    vertex(209, 347);
    vertex(211, 352);
endShape();
beginShape();
    vertex(202, 327);
    vertex(200, 332);
    vertex(200, 334);
endShape();
beginShape();
    vertex(218, 320);
    vertex(214, 324);
    vertex(211, 328);
endShape();
beginShape();
    vertex(258, 344);
    vertex(256, 350);
    vertex(256, 354);
endShape();
beginShape();
    vertex(235, 364);
    vertex(238, 369);
    vertex(242, 375);
    vertex(244, 377);
endShape();
beginShape();
    vertex(203, 379);
    vertex(200, 380);
    vertex(198, 386);
    vertex(192, 387);
    vertex(191, 384);
endShape();
beginShape();
    vertex(215, 374);
    vertex(212, 370);
    vertex(207, 368);
endShape();
beginShape();
    vertex(228, 369);
    vertex(225, 374);
    vertex(220, 377);
endShape();
beginShape();
    vertex(241, 332);
    vertex(238, 331);
    vertex(237, 324);
    vertex(240, 321);
endShape();
beginShape();
    vertex(269, 278);
    vertex(267, 287);
    vertex(263, 291);
    vertex(261, 293);
endShape();
beginShape();
    vertex(297, 295);
    vertex(301, 298);
    vertex(302, 308);
    vertex(298, 309);
endShape();
beginShape();
    vertex(295, 315);
    vertex(292, 308);
    vertex(293, 301);
endShape();
beginShape();
    vertex(281, 342);
    vertex(280, 337);
    vertex(284, 334);
endShape();
beginShape();
    vertex(252, 375);
    vertex(255, 374);
    vertex(258, 374);
endShape();
beginShape();
    vertex(248, 386);
    vertex(240, 388);
    vertex(241, 389);
    vertex(236, 389);
endShape();
beginShape();
    vertex(248, 296);
    vertex(242, 296);
    vertex(243, 291);
    vertex(249, 286);
endShape();
beginShape();
    vertex(243, 280);
    vertex(237, 278);
endShape();
beginShape();
    vertex(294, 283);
    vertex(295, 278);
    vertex(300, 274);
endShape();
beginShape();
    vertex(203, 314);
    vertex(195, 317);
    vertex(190, 321);
    vertex(181, 325);
endShape();
beginShape();
    vertex(189, 320);
    vertex(185, 318);
    vertex(184, 317);
endShape();
beginShape();
    vertex(199, 307);
    vertex(194, 307);
    vertex(190, 313);
endShape();

stroke(0);
strokeWeight(2);
beginShape();
    vertex(195, 198);
    vertex(188, 195);
    vertex(175, 187);
    vertex(165, 185);
    vertex(155, 187);
    vertex(148, 185);
    vertex(133, 184);
endShape();

strokeWeight(1);
beginShape();
    vertex(156, 188);
    vertex(149, 192);
    vertex(140, 195);
    vertex(140, 198);
    vertex(136, 203);
    vertex(132, 205);
endShape();
beginShape();
    vertex(133, 184);
    vertex(128, 184);
    vertex(123, 189);
    vertex(119, 190);
    vertex(114, 190);
    vertex(107, 193);
    vertex(97, 193);
    vertex(95, 194);
endShape();
beginShape();
    vertex(132, 183);
    vertex(127, 181);
    vertex(126, 180);
    vertex(122, 181);
    vertex(117, 178);
    vertex(114, 179);
    vertex(109, 180);
    vertex(105, 180);
    vertex(100, 178);
    vertex(96, 178);
    vertex(90, 180);
endShape();
beginShape();
    vertex(165, 183);
    vertex(155, 182);
    vertex(148, 178);
    vertex(146, 175);
    vertex(140, 175);
    vertex(133, 174);
endShape();
beginShape();
    vertex(177, 188);
    vertex(169, 188);
    vertex(162, 191);
    vertex(158, 194);
    vertex(157, 197);
    vertex(155, 201);
endShape();

stroke(0,100);
beginShape();
    vertex(115, 177);
    vertex(110, 173);
    vertex(104, 171);
    vertex(99, 169);
    vertex(97, 167);
endShape();
beginShape();
    vertex(145, 173);
    vertex(145, 172);
    vertex(145, 169);
    vertex(141, 165);
    vertex(139, 163);
endShape();
beginShape();
    vertex(135, 174);
    vertex(129, 174);
    vertex(124, 173);
endShape();
beginShape();
    vertex(140, 195);
    vertex(135, 194);
    vertex(127, 197);
endShape();
beginShape();
    vertex(108, 193);
    vertex(105, 196);
    vertex(101, 201);
endShape();
beginShape();
    vertex(158, 195);
    vertex(161, 199);
    vertex(161, 203);
endShape();
beginShape();
    vertex(164, 182);
    vertex(167, 184);
    vertex(164, 183);
    vertex(167, 184);
endShape();

strokeWeight(2);
stroke(0);
beginShape();
    vertex(274, 348);
    vertex(285, 344);
    vertex(294, 345);
    vertex(297, 345);
    vertex(301, 342);
    vertex(305, 343);
    vertex(308, 343);
    vertex(312, 345);
endShape();
strokeWeight(1);
beginShape();
    vertex(403, 232);
    vertex(400, 234);
    vertex(398, 234);
    vertex(395, 236);
endShape();
beginShape();
    vertex(355, 272);
    vertex(348, 275);
    vertex(348, 280);
    vertex(344, 281);
endShape();

stroke(0,100);
beginShape();
    vertex(345, 281);
    vertex(339, 284);
    vertex(334, 284);
    vertex(330, 288);
endShape();
beginShape();
    vertex(347, 280);
    vertex(344, 285);
    vertex(343, 292);
    vertex(339, 295);
    vertex(339, 298);
endShape();

beginShape();
    vertex(247, 399);
    vertex(251, 394);
    vertex(251, 389);
endShape();
beginShape();
    vertex(251, 393);
    vertex(251, 390);
    vertex(253, 391);
    vertex(252, 393);
    vertex(253, 390);
    vertex(255, 389);
    vertex(252, 391);
    vertex(256, 389);
endShape();
}

var mapImg = get(0,0,600,600);
}


//the enemy images
{

//rat
{
strokeWeight(10);
stroke(70);
line(100,300,300,300);

noStroke();
fill(100);
ellipse(350,300,250,200);
fill(90);
ellipse(450,300,150,130);

fill(255, 255, 0);
ellipse(480,270,30,10);
ellipse(480,330,30,10);
fill(255);
ellipse(486,270,15,8);
ellipse(486,330,15,8);
fill(10);
ellipse(500,300,30,20);

strokeWeight(2);
stroke(200);
noFill();
arc(490,250,30,69,-80,70);
arc(500,250,30,69,-80,70);
arc(510,250,30,69,-80,70);
arc(490,350,30,69,-80,70);
arc(500,350,30,69,-80,70);
arc(510,350,30,69,-80,70);
var ratImg = get();

background(0);
strokeWeight(10);
stroke(255, 255, 255);
line(100,300,300,300);

noStroke();
fill(255, 255, 255);
ellipse(350,300,250,200);
fill(255, 255, 255);
ellipse(450,300,150,130);

fill(255, 255, 255);
ellipse(480,270,30,10);
ellipse(480,330,30,10);
fill(255);
ellipse(486,270,15,8);
ellipse(486,330,15,8);
fill(255, 255, 255);
ellipse(500,300,30,20);

strokeWeight(2);
stroke(255, 255, 255);
noFill();
arc(490,250,30,69,-80,70);
arc(500,250,30,69,-80,70);
arc(510,250,30,69,-80,70);
arc(490,350,30,69,-80,70);
arc(500,350,30,69,-80,70);
arc(510,350,30,69,-80,70);
var ratMask = get();
if(ratImg){
    ratImg.mask(ratMask);
}
}

//bear
{
fill(105, 51, 10);
rect(300,193,90,14,100);

fill(117, 57, 11);
ellipse(200,200,355,205);

fill(133, 65, 13);
ellip(153,160,70,40,-30);
ellip(153,240,70,40,30);

fill(125, 63, 15);
ellipse(100,200,150,170);

fill(107, 52, 10);
ellipse(52,200,58,100);


fill(0);
ellipse(64,200,16,26);

beginShape();
vertex(117,160);
vertex(90,170);
vertex(81,167);
vertex(86,180);
endShape(CLOSE);


pushMatrix();
    translate(0,400);
    scale(1,-1);
    beginShape();
        vertex(117,160);
        vertex(90,170);
        vertex(81,167);
        vertex(86,180);
        endShape(CLOSE);
    popMatrix();    
    
    pushMatrix();
        translate(0,-5);
        fill(0);
        beginShape();
        vertex(51,172);
        vertex(32,172);
        vertex(28,192);
        vertex(28,206);
        vertex(30,223);
        vertex(35,232);
        vertex(39,243);
        vertex(47,244);
        vertex(51,231);
        vertex(51,205);
        vertex(51,179);
    endShape(CLOSE);
    
    
    fill(255);
    beginShape();
    vertex(51,172);
    vertex(33,180);
    vertex(51,186);
    vertex(32,191);
    vertex(51,197);
    vertex(30,202);
    vertex(51,208);
    vertex(32,212);
    vertex(51,219);
    vertex(32,221);
    vertex(51,227);
    vertex(36,232);
    vertex(51,235);
    vertex(38,242);
    vertex(49,244);
    vertex(51,225);
    endShape();
    
    beginShape();
    vertex(31,181);
    vertex(45,185);
    vertex(28,189);
    vertex(28,192);
    vertex(45,197);
    vertex(28,200);
    vertex(28,205);
    vertex(44,207);
    vertex(29,210);
    vertex(28,212);
    vertex(42,218);
    vertex(30,219);
    vertex(30,223);
    vertex(43,226);
    vertex(34,230);
    vertex(37,236);
    vertex(42,235);
    vertex(37,238);
    vertex(32,228);
    vertex(28,218);
    vertex(26,208);
    vertex(26,208);
    vertex(29,180);
    endShape(CLOSE);
popMatrix();
var bear = get();

background(0);
fill(105, 51, 10);
rect(300,193,90,14,100);



noStroke();

fill(255, 255, 255);
ellipse(200,200,350,200);

fill(255, 255, 255);
ellip(153,160,70,40,-30);
ellip(153,240,70,40,30);

fill(255, 255, 255);
ellipse(100,200,150,170);

fill(255, 255, 255);
ellipse(52,200,58,100);


fill(255, 255, 255);
ellipse(64,200,16,26);

beginShape();
vertex(117,160);
vertex(90,170);
vertex(81,167);
vertex(86,180);
endShape(CLOSE);


pushMatrix();
    translate(0,400);
    scale(1,-1);
    beginShape();
        vertex(117,160);
        vertex(90,170);
        vertex(81,167);
        vertex(86,180);
        endShape(CLOSE);
    popMatrix();    
    
    pushMatrix();
        translate(0,-5);
        fill(255, 255, 255);
        beginShape();
        vertex(51,172);
        vertex(32,172);
        vertex(28,192);
        vertex(28,206);
        vertex(30,223);
        vertex(35,232);
        vertex(39,243);
        vertex(47,244);
        vertex(51,231);
        vertex(51,205);
        vertex(51,179);
    endShape(CLOSE);
    
    
    fill(255);
    beginShape();
    vertex(51,172);
    vertex(33,180);
    vertex(51,186);
    vertex(32,191);
    vertex(51,197);
    vertex(30,202);
    vertex(51,208);
    vertex(32,212);
    vertex(51,219);
    vertex(32,221);
    vertex(51,227);
    vertex(36,232);
    vertex(51,235);
    vertex(38,242);
    vertex(49,244);
    vertex(51,225);
    endShape();
    
    beginShape();
    vertex(31,181);
    vertex(45,185);
    vertex(28,189);
    vertex(28,192);
    vertex(45,197);
    vertex(28,200);
    vertex(28,205);
    vertex(44,207);
    vertex(29,210);
    vertex(28,212);
    vertex(42,218);
    vertex(30,219);
    vertex(30,223);
    vertex(43,226);
    vertex(34,230);
    vertex(37,236);
    vertex(42,235);
    vertex(37,238);
    vertex(32,228);
    vertex(28,218);
    vertex(26,208);
    vertex(26,208);
    vertex(29,180);
    endShape(CLOSE);
popMatrix();
var bearMask = get();
if(bear){
    bear.mask(bearMask);
}
}

//horned ram
{
strokeWeight(4);
stroke(80,60,30);
noFill();
arc(338,202,30,30,185,355);
arc(368,198,30,30,5,175);

strokeWeight(2);
stroke(40,30,20);
beginShape();
    vertex(383, 197);
    vertex(374, 191);
endShape();
beginShape();
    vertex(382, 199);
    vertex(371, 196);
endShape();
beginShape();
    vertex(382, 198);
    vertex(376, 200);
endShape();
beginShape();
    vertex(384, 198);
    vertex(389, 203);
endShape();
beginShape();
    vertex(385, 199);
    vertex(392, 193);
endShape();
beginShape();
    vertex(384, 196);
    vertex(385, 190);
endShape();
beginShape();
    vertex(384, 196);
    vertex(381, 188);
endShape();
beginShape();
    vertex(382, 197);
    vertex(392, 199);
endShape();
stroke(60,40,30);
beginShape();
    vertex(383, 196);
    vertex(385, 206);
endShape();
beginShape();
    vertex(384, 198);
    vertex(381, 202);
endShape();
beginShape();
    vertex(382, 198);
    vertex(388, 189);
endShape();
beginShape();
    vertex(382, 195);
    vertex(379, 189);
endShape();
beginShape();
    vertex(383, 196);
    vertex(375, 194);
endShape();

noStroke();
fill(140,120,100);
ellipse(180,200,200,150);
ellipse(230,200,200,150);

fill(20);
stroke(220);
beginShape();
vertex(204,176);
bezierVertex(216,119,192,102,136,199);
bezierVertex(128,50,288,54,204,176);
endShape();

pushMatrix();
    scale(1,-1);
    translate(0,-400);
    beginShape();
    vertex(204,176);
    bezierVertex(216,119,192,102,136,199);
    bezierVertex(128,50,288,54,204,176);
    endShape();
popMatrix();
noFill();
arc(150,200,100,110,70,100);
arc(150,200,100,110,262,295);

noStroke();
fill(140,120,100);
ellipse(150,200,100,110);
fill(150, 130, 110);
ellipse(95,200,30,60);
fill(180,160,140);
ellipse(98,190,8,8);
ellipse(98,210,8,8);
stroke(60,50,40);
line(87,185,87,215);

noStroke();
fill(255);
ellipse(130,170,30,20);
ellipse(130,230,30,20);

fill(0);
ellipse(125,170,20,14);
ellipse(125,230,20,14);
fill(255);
ellipse(120,170,8,8);
ellipse(120,230,8,8);
var hornedRam = get(0,0,600,600);

background(0);
strokeWeight(4);
stroke(255, 255, 255);
noFill();
arc(338,202,30,30,185,355);
arc(368,198,30,30,5,175);

strokeWeight(2);
stroke(255, 255, 255);
beginShape();
    vertex(383, 197);
    vertex(374, 191);
endShape();
beginShape();
    vertex(382, 199);
    vertex(371, 196);
endShape();
beginShape();
    vertex(382, 198);
    vertex(376, 200);
endShape();
beginShape();
    vertex(384, 198);
    vertex(389, 203);
endShape();
beginShape();
    vertex(385, 199);
    vertex(392, 193);
endShape();
beginShape();
    vertex(384, 196);
    vertex(385, 190);
endShape();
beginShape();
    vertex(384, 196);
    vertex(381, 188);
endShape();
beginShape();
    vertex(382, 197);
    vertex(392, 199);
endShape();
stroke(60,40,30);
beginShape();
    vertex(383, 196);
    vertex(385, 206);
endShape();
beginShape();
    vertex(384, 198);
    vertex(381, 202);
endShape();
beginShape();
    vertex(382, 198);
    vertex(388, 189);
endShape();
beginShape();
    vertex(382, 195);
    vertex(379, 189);
endShape();
beginShape();
    vertex(383, 196);
    vertex(375, 194);
endShape();

noStroke();
fill(255, 255, 255);
ellipse(180,200,200,150);
ellipse(230,200,200,150);

fill(255, 255, 255);
stroke(255, 255, 255);
beginShape();
vertex(204,176);
bezierVertex(216,119,192,102,136,199);
bezierVertex(128,50,288,54,204,176);
endShape();

pushMatrix();
    scale(1,-1);
    translate(0,-400);
    beginShape();
    vertex(204,176);
    bezierVertex(216,119,192,102,136,199);
    bezierVertex(128,50,288,54,204,176);
    endShape();
popMatrix();
noFill();
arc(150,200,100,110,70,100);
arc(150,200,100,110,262,295);

noStroke();
fill(255, 255, 255);
ellipse(150,200,100,110);
fill(255, 255, 255);
ellipse(95,200,30,60);
fill(255, 255, 255);
ellipse(98,190,8,8);
ellipse(98,210,8,8);
stroke(255, 255, 255);
line(87,185,87,215);

noStroke();
fill(255);
ellipse(130,170,30,20);
ellipse(130,230,30,20);

fill(255, 255, 255);
ellipse(125,170,20,14);
ellipse(125,230,20,14);
fill(255);
ellipse(120,170,8,8);
ellipse(120,230,8,8);
var hornedRamMask = get();
if(hornedRam){
    hornedRam.mask(hornedRamMask);
}
}

}

//the transition functions
{
var closeTransition = function(){
    transitionState = 'close';
    transitionXY = lerp(transitionXY,-15,0.15);
    strokeWeight(24);
    stroke(60);
    fill(120);
    
    triangle(-15,900-transitionXY,615,900-transitionXY,300,605-transitionXY);
    triangle(-300+transitionXY,615,-300+transitionXY,-15,transitionXY-5,300);
    triangle(900-transitionXY,615,900-transitionXY,-15,605-transitionXY,300);
    triangle(-15,-300+transitionXY,615,-300+transitionXY,300,transitionXY-5);
    
    noStroke();
    fill(140);
    for(var i = 0; i < 4; i++){
        pushMatrix();
            translate(300,300);
            rotate(i*90);
            translate(-300,-300);
            translate(-315+transitionXY,0);
            beginShape();
                vertex(16, 300);
                vertex(43, 305);
                vertex(71, 290);
                vertex(123, 307);
                vertex(134, 330);
                vertex(167, 314);
                vertex(178, 295);
                vertex(211, 302);
                vertex(239, 303);
                vertex(249, 312);
                vertex(275, 292);
                vertex(285, 298);
                vertex(296, 300);
                vertex(16, 600);
                vertex(16, 310);
            endShape();
        popMatrix();
    }
};

var openTransition = function(setupLocation,player){
    transitionState = 'open';
    transitionXY = lerp(transitionXY,300,0.15);
    strokeWeight(24);
    stroke(60);
    fill(120);
    
    triangle(-15,900-transitionXY,615,900-transitionXY,300,605-transitionXY);
    triangle(-300+transitionXY,615,-300+transitionXY,-15,transitionXY,300);
    triangle(900-transitionXY,615,900-transitionXY,-15,605-transitionXY,300);
    triangle(-15,-300+transitionXY,615,-300+transitionXY,300,transitionXY-5);
    
    fill(140);
    noStroke();
    
    for(var i = 0; i < 4; i++){
        pushMatrix();
            translate(300,300);
            rotate(i*90);
            translate(-300,-300);
            translate(-315+transitionXY,0);
            beginShape();
                vertex(16, 300);
                vertex(43, 305);
                vertex(71, 290);
                vertex(123, 307);
                vertex(134, 330);
                vertex(167, 314);
                vertex(178, 295);
                vertex(211, 302);
                vertex(239, 303);
                vertex(249, 312);
                vertex(275, 292);
                vertex(285, 298);
                vertex(296, 300);
                vertex(16, 600);
                vertex(16, 310);
            endShape();
        popMatrix();
    }
    
    if(transitionXY > 290){
        closeTransition();
        scene = sceneTo;
        if(resting === true){
            if(player.health < player.maxHealth){
                player.health = player.maxHealth;
            }
            if(player.magica < (player.knowledge*5)){
                player.magica = player.knowledge*5;
            }
            player.stamina = player.endurance*10;
            sceneTo = 'mainGame';
            transitionState = 'open';
            if(time === 'day'){
                time = 'night';
            }
            else{
                time = 'day';
            }
            setupLocation();
        }
    }
};
}

//the button object
{
var button = function(x,y,w,h,tex,color,texSize){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tex = tex;
    this.color = color;
    this.texSize = texSize;
    this.draw = function() {
        stroke(0);
        strokeWeight(2);
        if(this.color !== 0){
            fill(0);
        }
        else{noFill();}
        rect(this.x-2,this.y-2,this.w,this.h,3);
        
        if(this.color !== 0){
            fill(this.color);
        }
        
        
        rect(this.x,this.y,this.w,this.h,3);
        
        fill(0, 0, 0);
        textSize(this.texSize);
        textAlign(CENTER,CENTER);
        text(this.tex,this.x+this.w/2,this.y+this.h/2.2);
        textAlign(CORNER,CORNER);
    };
    this.mouseOn = function(){
        if(mouseX > this.x &&
        mouseX < this.x+this.w &&
        mouseY > this.y &&
        mouseY < this.y+this.h
        ){
        
            return(true); 
        }
        else{return(false);}
    };
    this.update = function(){
        if(scene === 1){
            this.x = lerp(this.x,300,0.05);
        }
        else if(scene === 2 || scene === 3 || scene === 4){
            this.y = lerp(this.y,480,0.05);
            
        }
        
    };
};
}

//the inventory slot object
{
var inventorySlots = [];
var inventorySlot = function(x,y,type,occupent){
    this.x = x;
    this.y = y;
    this.type = type;
    this.occupent = occupent;
    this.draw = function(player) {
        if(player.class === 'warrior'){
            stroke(255, 0, 0);
        }
        if(player.class === 'ranger'){
            stroke(0, 220, 0);
        }
        if(player.class === 'mage'){
            stroke(0, 0, 255);
        }
        
        strokeWeight(5);
        fill(0);
        if(this.type !== 'backpack' && this.type !== 'artifact'){
            noFill();
        }
        rect(this.x,this.y,70,70,5);
    };
    this.mouseOn = function(){
        if(mouseX > this.x && mouseX < this.x+70 && mouseY > this.y && mouseY < this.y+70){
            return true;
        }
        else{return false;}
    };
};

var runInventorySlots = function(player){
    for(var i in inventorySlots){
        inventorySlots[i].draw(player);
    }
};
}

//the blood object (its actualy for all particals)
{
    
var bloods = [];
var blood = function(x, y, c, num) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.xx = 0;
    this.r = random(360);
    if(this.c !== color(100,200,255)){
        this.z = random(10, 15);
        this.velx = random(0.1,0.3);
    }
    else{
        this.z = random(30,50);
        this.velx = random(0.5,1);
    }
    
    this.color = random(50);
    this.num = num;
};
blood.prototype.create = function() {
    noStroke();
    fill(this.c);
    if(this.num === 0.5){
        fill(this.c,80);
    }
    pushMatrix();
        translate(this.x, this.y);
        rotate(this.r);
        
        //making it so if the blood is not acually ice it will look like blood
        if(this.c !== color(100,200,255)){
            ellipse(this.xx*10, 0, this.z, this.z);
            
            this.xx+=this.velx;
            
            
            this.z-=0.5;
        }
        else{
            rect(this.xx*10, 0, this.z, this.z);
            this.xx+=this.velx;
            
            this.z-=1;
        }
    popMatrix();
    //drawing the damage that was dealt
    if(this.num !== 0 && this.num !== 0.5){
        
        fill(0,0,0,this.z*13);
        textSize(40);
        textAlign(CENTER,CENTER);
        text(round(this.num),this.x,this.y);
        textAlign(CORNER,CORNER);
    }
    
};

var runBloods = function(){
    for(var i in bloods){
        bloods[i].create();
        if(bloods[i].z < 0){
            bloods.splice(i,1);
        }
        
    }
};
}

//the field object
{
background(222,188,122);
for(var i = 0; i < 16; i++){
    for(var j = 0; j < 16; j++){
        var r = random(-2,2);
        var col = color(222+r,188+r,122+r);
        fill(col);
        noStroke();
        ellipse(5+i*7,5+j*7,10,10);
    }
}
var fieldImg = get(0,0,117,117);

background(0);
for(var i = 0; i < 16; i++){
    for(var j = 0; j < 16; j++){
        fill(255);
        noStroke();
        ellipse(5+i*7,5+j*7,10,10);
    }
}
var fieldImgMask = get(0,0,117,117);
if(fieldImg){
    fieldImg.mask(fieldImgMask);
}

/**
var stalks = [];
var stalk = function(x,y){
    this.x = x;
    this.y = y;
    this.r = random(-2,2);
    this.color = color(222+this.r,188+this.r,122+this.r);
    this.w = 10;
    this.h = 10;
    this.pushX = this.x;
    this.pushY = this.y;
    this.draw = function() {
        
        fill(this.color);
        noStroke();
        ellipse(this.pushX,this.pushY,10,10);
        
        
    };
    this.move = function(player){
        if(dist(this.x,this.y,player.x,player.y) < 50){
            //this.pushX+=player.xvel;
            //this.pushY+=player.yvel;
        }
        else{
            this.pushX = lerp(this.pushX,this.x,0.4);
            this.pushY = lerp(this.pushY,this.y,0.4);
        }
        
        if(dist(this.pushX, this.pushY, player.x, player.y) <= this.w/2 + player.w/1.2){
            var a = atan2(this.pushY - player.y, this.pushX-player.x);
            this.pushX = player.x+cos(a)*(player.w/1.2+this.w/2);
            this.pushY = player.y+sin(a)*(player.w/1.2+this.h/2);
            
        }
        
    };
};
**/

var fields = [];
var field = function(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    var r = random(-20,0);
    this.color = color(130+r, 72+r, 22+r);
    
    for(var i = 0; i < 16; i++){
        for(var j = 0; j < 16; j++){
            //stalks.push(new stalk(this.x+i*7,this.y+j*7));
        }
    }
    
    this.draw = function(player) {
        fill(this.color);
        stroke(this.color);
        strokeWeight(1);
        
        rect(this.x,this.y,this.w,this.h);
        if(dist(this.x+50,this.y+50,player.x,player.y) > 160){
            imageMode(CORNER);
            image(fieldImg,this.x-6,this.y-6,118,118);
            imageMode(CENTER);
        }
    };
    
};



var runFields = function(player){
    for(var i in fields){
        if(dist(fields[i].x+50,fields[i].y+50,player.x,player.y) < 160){
            fields[i].draw(player);
        }
    }
    
    
    
    /**for(var i in stalks){
        if(dist(player.x,player.y,stalks[i].x,stalks[i].y) < 190){
            //stalks[i].draw();
            
        }
        if(dist(player.x,player.y,stalks[i].x,stalks[i].y) < 90){
            //stalks[i].move(player);
        }
        
    }**/
};
}

//wall image
{
var brickWall = function(){
    noStroke();
    fill(87, 87, 87);
    rect(0,0,100,100);
    for(var i = -20; i < 103; i+=34){
        for(var j = 0; j < 100; j+=16.4){
            
            if((j)/16.4 % 2 === 0) {
                fill(168, 0, 0);
                rect(i + 15,j+3,30,12,2);
            }
            else {
                fill(168, 0, 0);
                rect(i,j+3,30,12,2);
            }
        }
    }
};
brickWall();
var brickImage = get(0, 0, 100, 100);
}

//the wall object
{
var walls = [];
var wall = function (x,y,w,h,t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = t;
    this.draw = function() {
        if(this.t === 'brickwall'){
            for (var x = this.x; x < this.x + this.w; x += 100) {
                for (var y = this.y; y < this.y + this.h; y += 100) {
                    image(brickImage, x+50, y+50, 100, 100);
                }
                    
            }
        }
    };
};
var wallUpdate = function(){
    for(var i in walls){
        walls[i].draw();
    }
};
}

//grass image
{
var grass = [];

noStroke();
for(var i = 0; i < 600; i+=random(2,3)){
    for(var j = 0; j < 600; j+=random(2,40)){
        
        background(0, 145, 44);
        fill(37, 222, 0);
        grass.push([i,j+random(10),i+random(-1,2),j+random(20)]);
    }
}

for(var i in grass){
    var g = grass[i];
    stroke(0, 186, 25);
    strokeWeight(2);
    line(g[0],g[1],g[2],g[3]);
}

var grass = get(0, 0, width, height);



}

//tree object
{
var trees = [];
var tree = function(x,y,size,transparancy){
    this.x = x;
    this.y = y;
    this.size = size;
    this.draw = function(player) {
        if(dist(player.x,player.y,this.x,this.y) < (this.size*2.5)+player.w/2){
            image(transparantTree,this.x,this.y,this.size*6,this.size*6);
        }
        else{
            image(treeImg,this.x,this.y,this.size*6,this.size*6);
        }
    };
};

var treeUpdate = function(player){
    for(var i in trees){
        if(dist(trees[i].x,trees[i].y,player.x,player.y) < 600){
            trees[i].draw(player);
        }
    }
    
};
}

//rock object
{
var rocks = [];
var rock = function(x,y,size,w){
    this.x = x;
    this.y = y;
    this.size = size;
    this.w = w;
    this.rot = random(0,360);
    this.draw = function() {
        
        pushMatrix();
            translate(this.x,this.y);
            scale(this.size/1.84);
            translate(-300,-300);
            noStroke();
            fill(0, 0, 0);
            beginShape();
                vertex(309, 195);
                vertex(240, 218);
                vertex(199, 278);
                vertex(202, 348);
                vertex(263, 390);
                vertex(333, 402);
                vertex(397, 344);
                vertex(390, 256);
                vertex(359, 212);
            endShape(CLOSE);
        popMatrix();
        
        pushMatrix();
            translate(this.x,this.y);
            scale(this.size/1.95);
            translate(-300,-300);
            noStroke();
            fill(120);
            beginShape();
                vertex(309, 195);
                vertex(240, 218);
                vertex(199, 278);
                vertex(202, 348);
                vertex(263, 390);
                vertex(333, 402);
                vertex(397, 344);
                vertex(390, 256);
                vertex(359, 212);
            endShape(CLOSE);
        popMatrix();
        
        pushMatrix();
            translate(this.x,this.y);
            scale(this.size/3.5);
            translate(-300,-300);
            noStroke();
            fill(170);
            beginShape();
                vertex(309, 195);
                vertex(240, 218);
                vertex(199, 278);
                vertex(202, 348);
                vertex(263, 390);
                vertex(333, 402);
                vertex(397, 344);
                vertex(390, 256);
                vertex(359, 212);
            endShape(CLOSE);
        popMatrix();
        
    };
};

var rockUpdate = function(player){
    for(var i in rocks){
        if(dist(rocks[i].x,rocks[i].y,player.x,player.y) < 600){
            rocks[i].draw();
        }
    }
    
};
}

//the bullet object (also runs bullets colliding with player)
{

var bullets = [];

var bullet = function(x,y,damage,vel,angle,owner,reach,pushBack,graphic,w){
    this.x = x;
    this.y = y;
    
    this.w = w;
    this.h = this.w;
    
    this.damage = damage;
    this.vel = vel;
    this.angle = angle;
    this.owner = owner;
    
    this.reach = reach;
    this.pushBack = pushBack;
    this.graphic = graphic;
    this.timeFromPlayer = 0;
    this.draw = function() {
        if(this.graphic === 'ice bolt'){
            this.w = 30;
            this.h = 30;
            noStroke();
            for(var i = 0; i < 120; i++){
                var randomRotate = random(0,360);
                pushMatrix();
                    translate(this.x,this.y);
                    rotate(randomRotate);
                    this.radius = random(5,15);
                    fill(random(100,180), random(180,255), 255);
                    rect(0,random(0,10),this.radius,this.radius);
                popMatrix();
            }
        }
        if(this.graphic === 'fireball'){
            this.w = 30;
            this.h = 30;
            noStroke();
            for(var i = 0; i < 400; i++){
                var r = random(10, 100);
                var theta = random(360);
                var x = cos(theta) * r;
                var y = sin(theta) * r;
                colorMode(HSB);
                fill(map(r, 0, 100, 40, 20), 255, 255, 90);
                colorMode(RGB);
                pushMatrix();
                    translate(this.x,this.y);
                    scale(0.3,0.3);
                    ellipse(x, y, 30, 30);
                popMatrix();
            }
        }
        if(this.graphic === 'iron arrow'){
            pushMatrix();
                translate(this.x,this.y);
                rotate(this.angle+90);
                image(arrow,0,0,70,70);
            popMatrix();
        }
        //ellipse(this.x,this.y,this.w,this.h);
    };
    this.move = function(){
        this.x += cos(this.angle)*this.vel;
        this.y += sin(this.angle)*this.vel;
        
        this.timeFromPlayer+=this.vel;
        
       
    };
};

var runBullets = function(player,NPCs,houses){
    for(var i in bullets){
        
        bullets[i].move();
        if(dist(player.x,player.y,bullets[i].x,bullets[i].y) < 400){
            bullets[i].draw();
        }
        
        var b = bullets[i];
        
        //enemy bullets hiting the player
        if(bullets[i].owner === 'AI' && dist(bullets[i].x,bullets[i].y,player.x,player.y) < player.w/2+(bullets[i].w/2)){
            //damaging the enemy if you have a fire shield
            if(player.fireShieldActive === true){
                for(var j in NPCs){
                    if(dist(NPCs[j].x,NPCs[j].y,player.x,player.y) < weapons[NPCs[j].armedWeapon].reach+30){
                        //giving you XP
                        player.mageXP += player.lore/5;
                        //hurting the enemy
                        NPCs[j].health -= player.lore/5;
                        //adding blood
                        for(var k = 0; k < player.lore; k++){
                            bloods.push(new blood(NPCs[j].x,NPCs[j].y,color(random(200,255), 0, 0),player.lore/8));
                        }
                        
                        bullets[i].x = 1000000000000000;
                        bullets[i].y = 1000000000000000;
                    }
                }
            }
            //damaging player
            if(player.berserkActive === true){
                bullets[i].damage*=2;
            }
            
            if(player.lightningShieldActive === true){
                bullets[i].damage = bullets[i].damage/((player.lore/50)+1);
            }
            
            
            player.health -= bullets[i].damage*((100-player.agility)*0.01);
            
            //pushing player back
            
            player.pushed = 10;
            //seting the direction that you will be pushed
            player.pushX = (cos(bullets[i].angle)*bullets[i].pushBack)/2;
            player.pushY = (sin(bullets[i].angle)*bullets[i].pushBack)/2;
            
            
            
                //making blood
                for(var k = 0; k < bullets[i].damage*2; k++){
                bloods.push(new blood(player.x,player.y,color(random(200,255), 0, 0),bullets[i].damage*((100-player.agility)*0.01)));
            }
            
                bullets[i].x = 1000000000000000;
                bullets[i].y = 1000000000000000;
            }
        
        //removing the bullets if they are to far away
        if(bullets[i].timeFromPlayer > bullets[i].reach){
            
            bullets[i].x = 10000000000000000000;
            bullets[i].y = 10000000000000000000;
        }
        
        
        
        for(var j = 0; j < houses.length; j++){
            var h = houses[j];
            if(b.x > h.x && b.x < h.x+h.w && b.y > h.y && b.y < h.y+h.h){
                if(bullets[i].graphic === 'fireball'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(255, random(100,255), 0),0.5));
                    }
                }
                if(bullets[i].graphic === 'ice bolt'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(0, random(100,255), 255),0.5));
                    }
                }
                
                bullets[i].x = 1000000000000000;
                bullets[i].y = 1000000000000000;
                
            }
        }
        
        for(var j = 0; j < walls.length; j++){
            var w = walls[j];
            if(b.x > w.x && b.x < w.x+w.w && b.y > w.y && b.y < w.y+w.h){
                if(bullets[i].graphic === 'fireball'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(255, random(100,255), 0),0.5));
                    }
                }
                if(bullets[i].graphic === 'ice bolt'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(0, random(100,255), 255),0.5));
                    }
                }
                bullets[i].x = 1000000000000000;
                bullets[i].y = 1000000000000000;
            }
        }
        
        for(var j = 0; j < trees.length; j++){
            
            if(dist(b.x, b.y, trees[j].x, trees[j].y) <= trees[j].size/2){
                if(bullets[i].graphic === 'fireball'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(255, random(100,255), 0),0.5));
                    }
                }
                if(bullets[i].graphic === 'ice bolt'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(0, random(100,255), 255),0.5));
                    }
                }
                bullets[i].x = 1000000000000000;
                bullets[i].y = 1000000000000000;
                
            } 
            
        }
        
        for(var j = 0; j < rocks.length; j++){
            
            if(dist(b.x, b.y, rocks[j].x, rocks[j].y) <= rocks[j].w/2){
                if(bullets[i].graphic === 'fireball'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(255, random(100,255), 0),0.5));
                    }
                }
                if(bullets[i].graphic === 'ice bolt'){
                    for(var k = 0; k < 170; k++){
                        bloods.push(new blood(bullets[i].x,bullets[i].y,color(0, random(100,255), 255),0.5));
                    }
                }
                bullets[i].x = 1000000000000000;
                bullets[i].y = 1000000000000000;
                
            } 
            
        }
        
        
    
    }
     
};
}

//the talk bar variables
{
var textBarText = '';
var talkBarY = 610;
var answer1 = '';
var answer2 = '';
var answer3 = '';
var answer4 = '';
}

//the non player characters object 
{

var NPCs = [];
var NPC = function(x,y,type,mood,player){
    this.x = x;
    this.y = y;
    this.type = type;
    this.w = 50;
    this.h = 50;
    
    this.mood = mood;
    this.xvel = 0;
    this.yvel = 0;
    
    this.swingRotate = 0;
    this.swinging = false;
    this.backswing = false;
    
    this.reload = 0;
    this.armedWeapon = '';
    this.frozenTime = -1;
    
    this.pushed = 0;
    this.pushX = 0;
    this.pushY = 0;
    this.slow = false;
    this.rot = -atan2(this.y-player.y,this.x-player.x);
    
    
    this.dist = 0;
    //determining its atributes
    this.maxReload = enemies[this.type]['chapter'+chapter].reload;
    this.speed = enemies[this.type]['chapter'+chapter].speed;
    this.maxHealth = enemies[this.type]['chapter'+chapter].health;
    this.damage = enemies[this.type]['chapter'+chapter].damage;
    this.agility = enemies[this.type]['chapter'+chapter].agility;
    this.drop = enemies[this.type]['chapter'+chapter].drop;
    this.dropAmount =  enemies[this.type]['chapter'+chapter].dropAmount;
    this.reach = enemies[this.type]['chapter'+chapter].reach;
    this.ranged = enemies[this.type]['chapter'+chapter].ranged;
    this.pushBack = enemies[this.type]['chapter'+chapter].pushBack;
    this.swingLength = 90;
    
    this.health = this.maxHealth;
    //the talking variables
    this.words = ['Hello.','Howdy.',"How's it going?",'Hello there.','How you doing?','Good morning.'];
    
    if(this.type === 'Ederil'){
        this.words = ['I see you have finaly arrived, I suppose you know who I am?'];
    }
    
    this.randomTalk = round(random(0,1));
    this.drawHair = function(Stroke) {
        var incAmount = 0.01;
        for (var t = 0; t < incAmount*this.w/1.1; t += incAmount) {
            var n = noise(t*14);
            var y = map(n, 0, 1, 0, height/26);
            noFill();
            stroke(Stroke);
            strokeWeight(2);
            rect(t*100+this.x-this.w/2.3, this.y-y, 1, y);
        }
    };
    this.draw = function(player) {
        
        if(this.type === 'troll'){
            this.w = 100;
            this.h = 100;
            strokeWeight(8);
            stroke(0);
            fill(100,150,100);
            ellipse(this.x,this.y,100,100);
            line(this.x-8,this.y-20,this.x-10,this.y-10);
            line(this.x+8,this.y-20,this.x+10,this.y-10);
            
            stroke(255, 0, 0);
            strokeWeight(2);
            line(this.x-7,this.y-23,this.x-10,this.y-15);
            line(this.x+7,this.y-23,this.x+10,this.y-15);
            
            pushMatrix();
                translate(this.x,this.y);
                rotate(-this.swingRotate);
                //the fists
                stroke(0);
                strokeWeight(5);
                fill(89, 186, 89);
                ellipse(this.w/3,-this.h/2.5,35,35);
                ellipse(-this.w/3,-this.h/2.5,35,35);
                
                stroke(120,70,20);
                strokeWeight(8);
                line(-this.w/2,-46,-this.w/2+180,-46);
                stroke(150,110,30);
                line(-this.w/2,-39,-this.w/2+180,-39);
                
                stroke(150);
                fill(100);
                rect(90,-80,50,70,5);
                
            popMatrix();
            
            pushMatrix();
                translate(this.x-200,this.y-200);
                stroke(0);
                strokeWeight(5);
                line(183,223,200,230);
                line(183,223,176,230);
                line(183,223,176,230);
                line(183,223,192,218);
                line(190,209,192,218);
                line(178,207,172,219);
                line(178,227,169,216);
                
                line(200,250,200,230);
                line(209,225,200,230);
                line(209,225,204,220);
                line(209,225,218,226);
                line(227,218,218,226);
                line(215,226,216,235);
            popMatrix();
        }
        if(this.type === 'orc'){
            
            pushMatrix();
                translate(this.x+this.w/2-8,this.y-this.h/2+2);
                rotate(this.swingRotate-45);
                
                if(chapter === 1){
                    image(bronzeSword,this.w/2-20,-this.h/2-15,150,100);
                }
                if(chapter === 2){
                    image(ironSword,this.w/2-20,-this.h/2-15,150,100);
                }
                if(chapter === 3){
                    image(goldSword,this.w/2-20,-this.h/2-15,150,100);
                }
                
            popMatrix();
            pushMatrix();
                translate(this.x,this.y);
                
                //the fists
                stroke(0);
                strokeWeight(2);
                fill(89, 186, 89);
                ellipse(this.w/3,-this.h/2.5,15,15);
                ellipse(-this.w/3,-this.h/2.5,15,15);
            popMatrix();
            
            //the head
            noStroke();
            fill(84, 171, 84);
            ellipse(this.x,this.y,this.w,this.h);
            
            //the hair
            this.drawHair(0);
            fill(0, 0, 0);
            arc(this.x,this.y,this.w,this.h,-20,200);
            
            //the eyes
            noStroke();
            fill(255, 0, 0);
            ellipse(this.x-this.w/6,this.y-this.h/2.7,6,3);
            ellipse(this.x+this.w/6,this.y-this.h/2.7,6,3);
            
            //the pupils
            fill(0);
            ellipse(this.x+this.w/6,this.y-this.h/2.7,1,2);
            ellipse(this.x-this.w/6,this.y-this.h/2.7,1,2);
            
        }
        if(this.type === 'bandit'){
            
            pushMatrix();
                translate(this.x+this.w/2-8,this.y-this.h/2+2);
                rotate(this.swingRotate-45);
                
                if(chapter === 1){
                    image(bronzeSword,this.w/2-20,-this.h/2-15,150,100);
                }
                if(chapter === 2){
                    image(ironSword,this.w/2-20,-this.h/2-15,150,100);
                }
                if(chapter === 3){
                    image(goldSword,this.w/2-20,-this.h/2-15,150,100);
                }
                
            popMatrix();
            pushMatrix();
                translate(this.x,this.y);
                
                //the fists
                stroke(0);
                strokeWeight(2);
                fill(237, 203, 135);
                ellipse(this.w/3,-this.h/2.5,15,15);
                ellipse(-this.w/3,-this.h/2.5,15,15);
            popMatrix();
            
            //the head
            noStroke();
            fill(237, 203, 135);
            ellipse(this.x,this.y,this.w,this.h);
            
            //the hair
            this.drawHair(color(105, 65, 25));
            fill(105, 65, 25);
            arc(this.x,this.y,this.w,this.h,-20,200);
            
            //the eyes
            noStroke();
            fill(36, 110, 222);
            ellipse(this.x-this.w/6,this.y-this.h/2.7,6,3);
            ellipse(this.x+this.w/6,this.y-this.h/2.7,6,3);
            
            //the pupils
            fill(0);
            ellipse(this.x+this.w/6,this.y-this.h/2.7,1,2);
            ellipse(this.x-this.w/6,this.y-this.h/2.7,1,2);
            
        }
        if(this.type === 'Ederil'){
            
            pushMatrix();
                translate(this.x+this.w/2-8,this.y-this.h/2+2);
                rotate(this.swingRotate-45);
                
                image(goldSword,this.w/2-20,-this.h/2-15,150,100);
               
            popMatrix();
            pushMatrix();
                translate(this.x,this.y);
                
                //the fists
                stroke(0);
                strokeWeight(2);
                fill(237, 210, 156);
                ellipse(this.w/3,-this.h/2.5,15,15);
                ellipse(-this.w/3,-this.h/2.5,15,15);
            popMatrix();
            
            //the head
            noStroke();
            fill(240, 213, 158);
            ellipse(this.x,this.y,this.w,this.h);
            
            //the hair
            this.drawHair(color(156, 156, 156));
            fill(156);
            arc(this.x,this.y,this.w,this.h,-20,200);
            
            //the eyes
            noStroke();
            fill(0, 0, 255);
            ellipse(this.x-this.w/6,this.y-this.h/2.9,6,3);
            ellipse(this.x+this.w/6,this.y-this.h/2.9,6,3);
            
            //the pupils
            fill(0);
            ellipse(this.x+this.w/6,this.y-this.h/2.9,1,2);
            ellipse(this.x-this.w/6,this.y-this.h/2.9,1,2);
            
            stroke(176);
            strokeWeight(1.5);
            line(this.x-3,this.y-20,this.x-10,this.y-22);
            line(this.x+3,this.y-20,this.x+10,this.y-22);
        }
        if(this.type === 'bear'){
            this.w = 70;
            this.h = 120;
            pushMatrix();
                translate(this.x-32,this.y+40);
                rotate(90);
                translate(-this.x,-this.y);
                noStroke();
                fill(128, 63, 13);
                ellipse(this.x+sin(frameCount*this.speed*2)*15,this.y-54,50,30);
                ellipse(this.x+cos(frameCount*this.speed*2)*15,this.y-11,50,30);
                
                fill(128, 63, 13);
                ellipse(this.x-70+sin(frameCount*this.speed*2)*15,this.y-54,30,30);
                ellipse(this.x-70+cos(frameCount*this.speed*2)*15,this.y-11,30,30);
                image(bear,this.x,this.y,200,200);
            
            popMatrix();
        }
        if(this.type === 'rat'){
            this.w = 30;
            pushMatrix();
                translate(this.x,this.y+10);
                rotate(-90);
                image(ratImg,0,0,100,100);
            popMatrix();
        }
        if(this.type === 'horned ram'){
            this.w = 70;
            this.h = 120;
            pushMatrix();
                translate(this.x-32,this.y+40);
                rotate(90);
                translate(-this.x,-this.y);
                noStroke();
                fill(122, 97, 78);
                ellipse(this.x-10+sin(frameCount*this.speed*2)*15,this.y-54,40,30);
                ellipse(this.x-10+cos(frameCount*this.speed*2)*15,this.y-1,40,30);
                
                fill(125, 98, 76);
                ellipse(this.x-70+sin(frameCount*this.speed*2)*15,this.y-54,40,30);
                ellipse(this.x-70+cos(frameCount*this.speed*2)*15,this.y-1,40,30);
                image(hornedRam,this.x,this.y+20,300,300);
            
            popMatrix();
        }
        
        //all the freezing code
        {
        if(this.frozenTime > 0){
            noStroke();
            image(iceBall,this.x,this.y);
        }
        if(this.frozenTime === 0){
            for(var i = 0; i < 40; i++){
                bloods.push(new blood(this.x,this.y,color(100,200,255),0));
            }
        }
        if(this.frozenTime < player.lore*2.3 && this.frozenTime > 0){
            stroke(0);
            strokeWeight(5);
            line(this.x,this.y,this.x-this.w/2,this.y-this.h/2);
            line(this.x-this.w/4,this.y-this.h/4,this.x+this.w/4,this.y-this.h/2);
        }
        if(this.frozenTime < player.lore*1.7 && this.frozenTime > 0){
            pushMatrix();
            translate(this.x-this.w/5,this.y-this.h/8);
            scale(1,-1);
            stroke(0);
            strokeWeight(5);
            line(0,0,-this.w/2,-this.h/2);
            line(-this.w/4,-this.h/4,+this.w/4,-this.h/2);
            popMatrix();
        }
        if(this.frozenTime < player.lore && this.frozenTime > 0){
            pushMatrix();
            translate(this.x+this.w/5,this.y-this.h/5);
            scale(-1,-1);
            stroke(0);
            strokeWeight(5);
            line(0,0,-this.w/2,-this.h/2);
            line(-this.w/4,-this.h/4,+this.w/4,-this.h/2);
            popMatrix();
        }
        }
        
    };
    
    this.drawBars = function(){
        strokeWeight(1);
        stroke(0);
        
        fill(0);
        rectMode(CENTER);
        rect(this.x,this.y-this.h/1.8+this.h,60,10);
        fill(255, 0, 0);
        rect(this.x,this.y-this.h/1.8+this.h,this.health/this.maxHealth*56,6);
        rectMode(CORNER);
    };
    
    this.move = function(player){
        
        
        if(this.slowed === true){
            this.speed = this.speed/((player.lore/100)+1)/10;
            this.speed+=player.lore/150;
        }
        else{
                this.speed = enemies[this.type]['chapter'+chapter].speed;
        }
        
        if(dist(this.x,this.y,player.x,player.y) >= this.w/2+player.w/2+this.reach){
            //determining what direction he should move in 
            var xdist = player.x - this.x;
            var ydist = player.y - this.y;
            this.dist = sqrt(sq(xdist) + sq(ydist));
            //determining which way that the NPC should move
            var xplus = xdist/this.dist;
            var yplus = ydist/this.dist;
            
            if (this.dist === 0){this.dist = 1;}
            
            if(xplus >  0){
                this.xvel = lerp(this.xvel,this.speed,0.1);
            }
            if(xplus <  0){
                this.xvel = lerp(this.xvel,-this.speed,0.1);
            }
            
            if(yplus >  0){
                this.yvel = lerp(this.yvel,this.speed,0.1);
            }
            if(yplus <  0){
                this.yvel = lerp(this.yvel,-this.speed,0.1);
            }
            
        }
        else{
            this.xvel = lerp(this.xvel,0,0.1);
            this.yvel = lerp(this.yvel,0,0.1);
        }
    };
    
    this.swing = function(){
        this.swinging = true;
    };
    this.backSwing = function(){
        this.backSwinging = true;
    };
    
    this.collide = function(xv,yv,houses,waters){
        for(var i in walls){
            var w = walls[i];
            if(this.x+this.w/2 > w.x && this.x-this.w/2 < w.x+w.w && this.y+this.h/2 > w.y && this.y-this.h/2 < w.y+w.h){
                if(xv > 0){
                    xv = 0;
                    this.x = w.x-this.w/2;
                }
                if(xv < 0){
                    xv = 0;
                    this.x = w.x+w.w+this.w/2;
                }
                if(yv > 0){
                    yv = 0;
                    this.y = w.y-this.h/2;
                }
                if(yv < 0){
                    yv = 0;
                    this.y = w.y+w.h+this.h/2;
                }
            }
        }
        
        for(var i in houses){
            var h = houses[i];
            if(this.x+this.w/2 > h.x && this.x-this.w/2 < h.x+h.w && this.y+this.h/2 > h.y && this.y-this.h/2 < h.y+h.h){
                if(xv > 0){
                    xv = 0;
                    this.x = h.x-this.w/2;
                }
                if(xv < 0){
                    xv = 0;
                    this.x = h.x+h.w+this.w/2;
                }
                if(yv > 0){
                    yv = 0;
                    this.y = h.y-this.h/2;
                }
                if(yv < 0){
                    yv = 0;
                    this.y = h.y+h.h+this.h/2;
                }
            }
        }
        
        for(var i = 0; i < trees.length; i++){
            var t = trees[i];
            
            if(dist(this.x, this.y, trees[i].x, trees[i].y) <= this.w/1.5 + trees[i].size/2){
                var a = atan2(this.y - trees[i].y, this.x-trees[i].x);
                
                this.x = trees[i].x+cos(a)*trees[i].size;
                this.y = trees[i].y+sin(a)*trees[i].size;
  } 
            
        }
        
        for(var i = 0; i < rocks.length; i++){
            
            
            if(dist(this.x, this.y, rocks[i].x, rocks[i].y) <= this.w/2 + rocks[i].w/2){
                var a = atan2(this.y - rocks[i].y, this.x-rocks[i].x);
                
                this.x = rocks[i].x+cos(a)*(rocks[i].w/2+this.w/2);
                this.y = rocks[i].y+sin(a)*(rocks[i].w/2+this.h/2);
  } 
            
        }
        
        for(var i in waters){
            var w = waters[i];
            if(this.x+this.w/2 > w.x && this.x-this.w/2 < w.x+w.w && this.y+this.h/2 > w.y && this.y-this.h/2 < w.y+w.h){
                if(w.direction === 'right'){
                    this.x+=protalis[activeLocationNum].specks.riverSpeed+random(-2,2);
                }
                if(w.direction === 'left'){
                    this.x-=protalis[activeLocationNum].specks.riverSpeed+random(-2,2);
                }
            }
        }
    };
    
    this.attack = function(player){
        
        if(this.mood === 'enemy'){
            if(this.ranged === true){
                if(dist(this.x,this.y,player.x,player.y) < this.reach*10 && this.reload > this.maxReload){
                    
                    bullets.push(new bullet(this.x+cos(this.rot)*10,this.y,this.damage,10,this.rot,'AI',this.reach,this.pushBack,'none',5));
                    this.reload = 0;
                    
                    this.swinging = true;
                    
                }
            }
            else{
                if(dist(this.x,this.y,player.x,player.y) < this.reach+this.w/2+player.w/2 && this.reload > this.maxReload){
                    
                    bullets.push(new bullet(this.x,this.y,this.damage,15,-this.rot-90,'AI',this.reach,this.pushBack,'none',60));
                    this.reload = 0;
                    
                    this.swinging = true;
                    
                }
            }
        }
    };
    
    this.update = function(player,houses,waters){
        
        this.rot = atan2(player.y - this.y, player.x - this.x)+90;
        
        
        this.reload++;
        //making the enemy break out of the ice
        this.frozenTime--;
        this.pushed--;
        
        
        pushMatrix();
            translate(this.x,this.y);
            rotate(this.rot);
            translate(-this.x,-this.y);
            this.draw(player);
            this.drawBars();
        popMatrix();
        
        //not leting him do anything if he is frozen
        if(this.frozenTime <= 0){
            
            if(this.mood !== 'friend'){
                this.move(player);
                this.attack(player);
            }
            
            
        }
        else{
            this.xvel = 0;
            this.yvel = 0;
        }
        
        
        
        if(this.swingRotate > this.swingLength-3){
            this.backSwinging = true;
            this.swinging = false;
        }
        if(this.swinging === true){
            this.swingRotate = lerp(this.swingRotate,this.swingLength,0.2);
            this.backSwinging = false;
        }
        if(this.backSwinging === true){
            this.swingRotate = lerp(this.swingRotate,0,0.2);
        }
        
        //making the enemy move
        
        this.y+=this.yvel;
        this.collide(0,this.yvel,houses,waters);
        this.x+=this.xvel;
        this.collide(this.xvel,0,houses,waters);
        
        
    };
    
};

var damage = 0;
var runNPCs = function(player,houses,waters){
    for(var i in NPCs){
        var n = NPCs[i];
        NPCs[i].update(player,houses,waters);
        
        for(var j = bullets.length - 1; j >= 0; j--){
            damage = bullets[j].damage*((100-n.agility)*0.01);
            //checking to see if the bullet hits
            if(dist(bullets[j].x,bullets[j].y,NPCs[i].x,NPCs[i].y) < (NPCs[i].w/2)+bullets[j].w/2 && bullets[j].owner !== 'AI'){
                if(bullets[j].graphic !== 'ice bolt'){
                    //editing the enemy when a bullet hits it
                    
                    //pushing him
                    NPCs[i].pushed = 5;
                    //seting the derection that he will be pushed
                    NPCs[i].pushX = (cos(bullets[j].angle)*bullets[j].pushBack)/2;
                    NPCs[i].pushY = (sin(bullets[j].angle)*bullets[j].pushBack)/2;
                    NPCs[i].health-=damage;
                    NPCs[i].mood = 'enemy';
                    //adding in the blood
                    for(var k = 0; k < bullets[j].damage*2; k++){
                        bloods.push(new blood(NPCs[i].x,NPCs[i].y,color(random(200,255), 0, 0),damage));
                    }
                    //giving the player XPs dependant on what class he is
                    if(weapons[player.armedWeapon].clas === 'warrior' && bullets[j].graphic !== 'fireball'){
                        player.warriorXp += damage;
                    }
                    if(weapons[player.armedWeapon].clas === 'ranger' && bullets[j].graphic !== 'fireball'){
                        player.rangerXp += damage;
                    }
                    //checking to see if it is a spell that hurt him
                    if(bullets[j].graphic === 'fireball' || weapons[player.armedWeapon].clas === 'mage'){
                        player.mageXp += damage;
                    }
                    
                }
                //if the bullet is an ice bolt
                else{
                    //editing the enemy when a bullet hits it
                    NPCs[i].health-=damage;
                    if(NPCs[i].mood === 'friend'){
                        NPCs[i].mood = 'enemy';
                        enemyCount++;
                    }
                    NPCs[i].frozenTime = player.lore*3;
                    
                    player.mageXp += damage;
                }
                
                bullets[j].x = 1000000000000000;
                bullets[j].y = 1000000000000000;
                
            }
        }
        //pushing him back
        if(NPCs[i].pushed > 0){
            NPCs[i].xvel = lerp(NPCs[i].xvel,NPCs[i].pushX/2,1.05);
            NPCs[i].yvel = lerp(NPCs[i].yvel,NPCs[i].pushY/2,1.05);
        }
        for(var j in NPCs){
            var x = NPCs[j];
            if(i !== j && dist(n.x,n.y,x.x,x.y) < n.w/1.8+x.w/1.8){
                var a = atan2(n.y - x.y, n.x-x.x);
                var dis = dist(n.x, n.y, x.x, x.y);
                var s = x.w-dis;
                n.xvel += cos(a)*x.w/(x.w/2);
                n.yvel += sin(a)*x.w/(x.w/2);
            }
        }
        
        //killing the enemies
        if(NPCs[i].health <= 0){
            for(var l = 0; l < NPCs[i].maxHealth; l++){
                bloods.push(new blood(NPCs[i].x,NPCs[i].y,color(random(200,255), 0, 0),0));
            }
            NPCs.splice(i,1);
            enemyCount--;
        }
        
        
        
    }
};

}

//dirt object
{
for(var i = 0; i < 11; i++){
    for(var j = 0; j < 11; j++){
        strokeWeight(2);
        var r = random(-10,5);
        fill(120+r,60+r,10+r);
        stroke(120+r,60+r,10+r);
        rect(i*10,j*10,10,10);
    }
}
var dirtImg = get(0,0,100,100);

var dirts = [];
var dirt = function(x,y){
    this.x = x;
    this.y = y;
    this.draw = function() {
        imageMode(CORNER);
        image(dirtImg,this.x+1,this.y+1);
        imageMode(CENTER);
    };
};
var runDirt = function(player){
    for(var i in dirts){
        if(dist(dirts[i].x+50,dirts[i].y+50,player.x,player.y) < 700){
            dirts[i].draw();
        }
    }
};
}

//water object
{
var waters = [];

var water =  function(x,y,direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.w = 100;
    this.h = 100;
    this.pushX = 0;
    this.pushX2 = 0;
    this.draw = function() {
        fill(50,120,255);
        noStroke();
        rect(this.x,this.y,this.w,this.h);
        stroke(30,100,230);
        strokeWeight(10);
        if(this.direction === 'left'){
            line(this.x+25,this.y+50,this.x+75,this.y+35);
            line(this.x+25,this.y+50,this.x+75,this.y+65);
        }
        if(this.direction === 'right'){
            line(this.x+25,this.y+35,this.x+75,this.y+50);
            line(this.x+25,this.y+65,this.x+75,this.y+50);
        }
    };
};

}

//the house object
var insideHouseVar = '';
{
var houses = [];

var house = function(x,y,type){
    this.x = x;
    this.y = y;
    this.w = 400;
    this.h = 300;
    this.type = type;
    this.rooms = ['entrance','weaponShop','',''];
    this.name = 'bully';
    this.thingsInStock = ['ironSword','bronzeSword','goldSword','bronzeDagger','ironDagger','goldDagger','ironBroadSword','bronzeBroadSword','goldBroadSword'];
    this.draw = function() {
        for(var i = 0; i < 20; i++){
            noStroke();
            fill(100-i*5);
            rect(this.x,this.y,this.w,this.h-i*5);
        }
        fill(150,0,0);
        rect((this.x+this.w/2)-40,this.y+this.h-10,80,10);
    };
    this.enter = function(player){
        if(player.x > (this.x+this.w/2)-40 && player.x < (this.x+this.w/2)+40 && player.y > this.y+this.h && player.y < this.y+this.h+80 && keys[32]){
            insideHouseVar = this.name;
        }
    };
};

var runHouses = function(player){
    for(var i in houses){
        houses[i].draw();
        houses[i].enter(player);
    }
};
}

//the sign object
var signText = '';
{
var signs = [];

var sign = function(x,y,text){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 40;
    this.text = text;
    this.draw = function() {
        
        noStroke();
        fill(100,50,0);
        pushMatrix();
            rotate(20);
            rect(this.x-78,this.y-658,12,15);
            fill(150,80,0);
            rect(this.x-95,this.y-663,50,10);
            fill(0);
            textSize(10);
            fill(100,50,0);
            rect(this.x-95,this.y-665,52,2);
            rect(this.x-45,this.y-665,2,12);
        popMatrix();
    };
    this.update = function(player){
        this.draw();
        
        if(player.x+player.w/2 > this.x && player.x-player.w/2 < this.x+this.w && player.y+player.h/2 > this.y && player.y-player.w/2 < this.y+this.h && keys[32] && talkBarY > 580){
            talking = true;
            
        }
        //returning the sign text to blank
        else if(keys[32] && talkBarY < 530){
            signText = '';
        }
        
        if(talking === true){
            signText = this.text;
        }
        if(talkBarY > 599){
            signText = '';
            
        }
    };
};

var runSigns = function(player){
    for(var i in signs){
        signs[i].update(player);
    }
};
}

var talk = function(player){
    
    //the talking
    var moneyGained = round(random(player.charisma));
    var moneyGiven = round(random(20-player.charisma/2));
    
    //what happens when you finish talking
    if(talking === false){
        talkBarY = lerp(talkBarY,610,0.1);
    }
    //keeping the bar up while you are talking
    if(talking === true){
        talkBarY = lerp(talkBarY,500,0.1);
    }
    
    
    
    for(var i in NPCs){
            var n = NPCs[i];
            
            //checking to see if you are talking (it sets talking to true below)
            if(dist(player.x,player.y,n.x,n.y) <= n.w/1.5+player.w/1.5+15 && n.mood === 'friend' && keys[32] && talking === false){
                signText = '';
                talking = true;
                if(n.type === 'bandit'){
                    n.words = ['Hello.','Howdy.',"How's it going?",'Hello there.','How you doing?','Good morning.'];
                }
                if(n.type === 'Ederil' && battle === 'farmersRoadComplete'){
                    n.words = ['Now her you are, I am Ederil and if you continue working for me I can explain everything about this place.'];
                    answer1 = 'Sure!';
                    answer2 = "Uh, I don't know if I'm good enough.";
                    answer3 = '';
                    answer4 = '';
                }
                n.randomTalk = round(random(-0.5,n.words.length-1));
            }
            
            
            
            //making it so if you click it will input your words on button 1
            if(mouseY > 540 && mouseY < 565 && mouseX < 320){
                textFill1 = 150;
                if(mouseIsPressed && talkButtonReload > 50 && mouseX < 320 && answer1 === 'Any Info?'){
                    n.words = ['If you want info, talk to somebody dumb enough to tell you.','I gotta go.','Want to know anything? Ask the man over there.',"You don't just ask somebody for info. you gota pay. Understand?"];
                    answer1 = 'Okay.';
                    answer2 = "Hey, there's something else I wanted to say.";
                    answer3 = 'I got some money.';
                    answer4 = '';
                    talkButtonReload = 0;
                    n.randomTalk = round(random(-0.5,n.words.length-1));
                }
                else if(mouseIsPressed && talkButtonReload > 50 && mouseX < 320 && answer1 === 'Okay.'){
                    n.words = [''];
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                else if(mouseIsPressed && talkButtonReload > 50 && mouseX < 320 && (answer1 === 'Sure!' || answer1 === 'Like that helps.')){
                    n.words = ['Very good, this island we are on is called Protalis, it is one of two island in this world the other being Ladaria. Right now on an Island to the north the dragon, Gauthmar, lords over the land.'];
                    answer1 = '';
                    answer2 = 'Continue.';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                
                
                else if(mouseIsPressed && talkButtonReload > 50  && (answer1 === "Actually I don't." || answer1 === "What do you want to say?")){
                    n.words = ["Well I have important things to tell you, but first go to the Farmer's Road and deal with what you find there."];
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    battle = 'farmerRoad';
                    talkButtonReload = 0;
                }
            }
            else{textFill1 = 255;}
            //doing the same for button 2
            if(mouseY > 570 && mouseY < 595 && mouseX < 320){
                textFill2 = 150;
                
                if(mouseIsPressed && talkButtonReload > 50  && answer2 === "I know nothing but that you are my master."){
                    n.words = ['Well if you think flattery will help you, you are wrong.'];
                    answer1 = 'What do you want to say?';
                    answer2 = 'Uh, Okay.';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                else if(mouseIsPressed && talkButtonReload > 50  && answer2 === "Uh, Okay."){
                    n.words = ["You are a stupid one, but go to the Farmer's Road and deal with what you find there and I will fix that."];
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    battle = 'farmerRoad';
                    talkButtonReload = 0;
                }
                else if(mouseIsPressed && talkButtonReload > 50 && mouseX < 320 && answer1 === 'Continue.'){
                    n.words = ['I have another task for you, go to the Fertile Fields3 and free a friend of mine who is captured by a troll.'];
                    battle = 'fertileFields3';
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                else if(mouseIsPressed && talkButtonReload > 50 && mouseX < 320 && answer1 === "Uh, I don't know if I'm good enough."){
                    n.words = ["Well if you get killed know you're gonna get killed a whole lot more."];
                    answer1 = 'Like that helps, but I need the info.';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                
                //non-ederil talk
                //begging
                if(mouseIsPressed && talkButtonReload > 50  && answer2 === 'Money? Please?'){
                    //he agrees
                    if(round(random(0,20-player.charisma)) === 1){
                        player.money+=moneyGained;
                        n.words = ['Sure! (plus ' + moneyGained + ' gold and minus 1 reputation)'];
                    }
                    //he does not agree
                    else{
                        n.words = ['Nothing doing. (minus 1 reputation)'];
                    }
                    //nobody like a begger
                    player.rep--;
                    //ending the convsation
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
                else if(mouseIsPressed && talkButtonReload > 50  && answer2 === "Hey, there's something else I wanted to say."){
                    n.words = ['Hello.','Howdy.',"How's it going?",'Hello there.','How you doing?','Good morning.'];
                    talkButtonReload = 0;
                }
                
            }
            else{textFill2 = 255;}
            //doing the same for button 3
            if(mouseY > 540 && mouseY < 565 && mouseX > 320){
                textFill3 = 150;
                
                if(mouseIsPressed && talkButtonReload > 50 && answer3 === 'Want some spare cash?'){
                        
                    player.money-=moneyGiven;
                    n.words = ['Sure! (minus ' + moneyGained + ' gold and minus 1 reputation)'];
                    
                    //ending the convsation
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    player.reputation++;
                    talkButtonReload = 0;
                }
                if(mouseIsPressed && talkButtonReload > 50 && answer3 === 'I got some money.'){
                    n.words = ['Well not enough, now scram.','I get more money than you have each day, Leave.','Then leave before it take it.'];
                    //ending the convsation
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                    talkButtonReload = 0;
                }
            }
            else{textFill3 = 255;}
            //doing the same for button 4
            if(mouseY > 570 && mouseY < 595 && mouseX > 320){
                textFill4 = 150;
                if(mouseIsPressed && talkButtonReload > 50 && answer4 === 'You asking for a fight?'){
                    n.mood = 'enemy';
                    talkButtonReload = 0;
                    //talking = false;
                    n.words = ["Now you're gonna get it!",'You are now going to get to know death.',"Now I'm angry, and you don't like me when I'm angry.",'You just signed your own death warrent.','Prepare to have a piece of metal stuck into you.'];
                    //ending the convsation
                    answer1 = '';
                    answer2 = '';
                    answer3 = '';
                    answer4 = '';
                }
                
            }
            else{textFill4 = 255;}
            
            
            
            
            if(n.words[n.randomTalk] === 'I see you have finaly arrived, I suppose you know who I am?'){
                answer1 = "Actually I don't.";
                answer2 = 'I know nothing but that you are my master.';
                answer3 = "";
                answer4 = '';
            }
            
            
            
            
            //non-ederil talk
            if(n.words[n.randomTalk] === 'Hello.' || n.words[n.randomTalk] === 'Howdy.' || n.words[n.randomTalk] === "How's it going?" || n.words[n.randomTalk] === 'Hello there.' || n.words[n.randomTalk] === 'How you doing?' || n.words[n.randomTalk] === 'Good morning.'){
                answer1 = 'Any Info?';
                answer2 = 'Money? Please?';
                answer3 = 'Want some spare cash?';
                answer4 = 'You asking for a fight?';
            }
            
            //drawing it
            if(signText === ''){
            
            strokeWeight(5);
            fill(0);
            stroke(200,200,200);
            rect(0,talkBarY,600,500);
            fill(235);
            textSize(20);
            text(n.words[n.randomTalk],10,talkBarY,590,590);
            fill(textFill1);
            text(answer1,40,talkBarY+60);
            fill(textFill2);
            text(answer2,40,talkBarY+90);
            fill(textFill3);
            text(answer3,320,talkBarY+60);
            fill(textFill4);
            text(answer4,320,talkBarY+90);
            
            }
            //deciding if you are to stop talking
            if(talkBarY >= 600){
                //talking = false;
            }
            
        }
    
    //the signTextBar
    if(signText !== ''){
        strokeWeight(5);
        fill(0);
        stroke(200,200,200);
        rect(0,talkBarY,600,500);
        fill(255);
        textSize(25);
        text(signText,10,talkBarY+10,550,500);
    }
    
};

//adding the inventory slots
{


inventorySlots.push(new inventorySlot(183,55,'helmet','locked'));
inventorySlots.push(new inventorySlot(183,133,'pendant','locked'));
inventorySlots.push(new inventorySlot(183,212,'breastplate','locked'));
inventorySlots.push(new inventorySlot(190,460,'boots','locked'));
inventorySlots.push(new inventorySlot(275,380,'cloak','locked'));
inventorySlots.push(new inventorySlot(265,290,'shield','locked'));
inventorySlots.push(new inventorySlot(2,110,'sword',''));


    
}





//player object
var player = function(){
    this.x = 100;
    this.y = 100;
    this.w = 50;
    this.h = 50;
    this.xvel = 0;
    this.yvel = 0;
    this.rot = 0;
    
    this.class = '';
    
    this.rangerXp = 0;
    this.warriorXp = 0;
    this.mageXp = 0;
    this.nextLevelXp = 100;
    //when you level up this is what class's stats you increase
    this.statsIncrease = '';
    
    this.rot = 0;
    
    
    //attributes
    {
    //ranger stats
    this.baseSpeed = 0;
    this.agility = 0;
    //mage stats
    this.knowledge = 0;
    this.lore = 0;
    //warrior stats
    this.strength = 0;
    this.endurance = 0;
    //your populus status
    this.charisma = 0;
    this.rep = 40;
    }
    
    this.maxHealth = (this.endurance*this.strength)/4;
    this.health = (this.endurance*this.strength)/4;
    this.stamina = this.endurance*10;
    this.magica = this.knowledge*5;
    
    this.speed = this.baseSpeed/9;
    
    this.overAllDefense = 0.15;
    this.runSpeed = this.baseSpeed/6;
    this.money = 0;
    this.supplies = 0;
    
    //the set to variables
    this.setToMagica = this.magica;
    this.setToHealth = this.health;
    
    //the spell variables
    this.spellReload = 100;
    this.armedSpellIndex = 0;
    this.armedSpell = knownSpells[this.armedSpellIndex];
    this.changeArmedSpellReload = 0;
    this.spellDuration = 0;
    
    //wheither you have active spell
    this.hasteActivate = false;
    this.fireShieldActive = false;
    this.berserkActive = false;
    this.slowActive = false;
    this.lightningShieldActive = false;
    this.antiMagicActive = false;
    
    //the weapon variables
    this.armedWeapon = 'fists';
    this.swingRotate = 0;
    this.reload = 0;
    
    //the push back vars
    this.pushed = 0;
    this.pushX = 0;
    this.pushY = 0;
    
    
    this.fistX1 = this.w/3;
    this.fistX2 = -this.w/3;
    this.fistY1 = -this.h/2.5;
    this.fistY2 = -this.h/2.5;
    
    this.drawHair = function() {
        var incAmount = 0.01;
        for (var t = 0; t < incAmount*this.w/1.1; t += incAmount) {
            var n = noise(t*14);
            var y = map(n, 0, 1, 0, height/26);
            noFill();
            strokeWeight(1.8);
            stroke(100,50,0);
            rect(t*100+this.x-this.w/2.3, this.y-y, 1, y);
        }
    };
    this.draw = function(){
        //drawing your weapon
        {
        pushMatrix();
            translate(this.x+this.w/2-10,this.y-this.h/3);
            rotate(this.swingRotate-45);
            if(this.armedWeapon === 'ironDagger'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(ironDagger,this.w/2-18,-this.h/2-13,100,100);
            }
            if(this.armedWeapon === 'ironSword'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(ironSword,this.w/2-15,-this.h/2-17,150,100);
            }
            
            if(this.armedWeapon === 'bronzeDagger'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(bronzeDagger,this.w/3.2,-20-this.h+30,100,100);
            }
            if(this.armedWeapon === 'bronzeSword'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(bronzeSword,this.w/2,-this.h/2+10,150,100);
            }
            
            if(this.armedWeapon === 'goldDagger'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(goldDagger,this.w/3.2,-20-this.h+30,100,100);
            }
            if(this.armedWeapon === 'goldSword'){
                this.fistX1 = this.w/3;
                this.fistX2 = -this.w/3;
                this.fistY1 = -this.h/2.5;
                this.fistY2 = -this.h/2.5;
                image(goldSword,this.w/2-22,-this.h/2-25,150,100);
            }
            
        popMatrix();
        if(this.armedWeapon === 'cherryBow'){
            stroke(255);
            strokeWeight(1);
            line(this.x+46,this.y-27,this.x,this.y+(this.reload/3)-27);
            line(this.x-46,this.y-27,this.x,this.y+(this.reload/3)-27);
            this.fistX1 = 0;
            this.fistX2 = 0;
            this.fistY2 = this.reload/3-27;
            this.fistY1 = -40;
            
            pushMatrix();
                translate(this.x,this.y-15);
                rotate(90);
                image(cherryBowBase,0,0,100,100);
                image(cherryBow,0,0,100,100);
            popMatrix();
            image(arrow,this.x,this.y-60+this.reload/3,70,70);
            
        }
        if(this.armedWeapon === 'saphireStaff'){
            pushMatrix();
                translate(this.x,this.y);
                rotate(-this.swingRotate);
                image(saphireStaff,40,-25,200,200);
            popMatrix();
        }
        if(this.armedWeapon === 'ironAxe'){
            pushMatrix();
                translate(this.x,this.y);
                rotate(-this.swingRotate+140);
                image(ironAxe,-45,-5,100,100);
            popMatrix();
        }
        
        }
        
        //drawing your head
        {
        pushMatrix();
            translate(this.x,this.y);
            if(weapons[this.armedWeapon].type !== 'blade'){
                rotate(-this.swingRotate);
            }
            //the fists
            stroke(0);
            strokeWeight(2);
            fill(255, 220, 145);
            
            pushMatrix();
                ellipse(this.fistX1,this.fistY1,15,15);
            popMatrix();
            
            
            ellipse(this.fistX2,this.fistY2,15,15);
            
        popMatrix();
        //the head
        noStroke();
        fill(255, 220, 145);
        ellipse(this.x,this.y,this.w,this.h);
        
        //the hair
        this.drawHair();
        fill(100,50,0);
        arc(this.x,this.y,this.w,this.h,-20,200);
        
        //the eyes
        noStroke();
        fill(0,100,255);
        ellipse(this.x-this.w/6,this.y-this.h/2.7,6,3);
        ellipse(this.x+this.w/6,this.y-this.h/2.7,6,3);
        
        //the pupils
        fill(0);
        ellipse(this.x+this.w/6,this.y-this.h/2.7,1,2);
        ellipse(this.x-this.w/6,this.y-this.h/2.7,1,2);
        }
        
        //drawing spell animations
        {
        if(this.hasteActivate === true && this.spellDuration > (this.lore*150)-150){
            hasteExtend+=1;
            for(var i = 0; i < 50; i++){
                pushMatrix();
                    translate(this.x,this.y);
                    rotate(frameCount*i);
                    noStroke();
                    fill(random(100,200),random(100,200),255);
                    ellipse(0,random(0,hasteExtend),20,hasteExtend);
                popMatrix();
            }
            
        }
        if(this.fireShieldActive === true){
            
            noStroke();
            pushMatrix();
                translate(this.x,this.y);
                noStroke();
                for(var i = 0; i < 200; i++){
                    rotate(i*random(10,14));
                    fill(255,random(100,255),0,70);
                    var rand = random(10,20);
                    pushMatrix();
                        translate(0,fireShieldExtend);
                        rotate(random(0,360));
                        ellipse(0,0,rand,rand);
                    popMatrix();
                }
                
            popMatrix();
            
        }
        
        if(this.lightningShieldActive === true){
            wid = random(2,30);
            col = color(random(140,160), random(200,255), 255);
            pushMatrix();
                translate(this.x,this.y);
                scale(0.33,0.33);
                pushMatrix();
                    
                    rotate(frameCount*3);
                    drawLightningShield1();
                popMatrix();
                pushMatrix();
                    
                    rotate(-frameCount*3);
                    drawLightningShield2();
                popMatrix();
                pushMatrix();
                    
                    rotate(-frameCount*3-50);
                    drawLightningShield3();
                popMatrix();
                pushMatrix();
                    
                    rotate(frameCount*3-50);
                    drawLightningShield4();
                popMatrix();
            popMatrix();
        }
        
        if(this.berserkActive === true){
            fill(255, 100, 0);
            ellipse(this.x-this.w/6,this.y-this.h/2.7,6,3);
            ellipse(this.x+this.w/6,this.y-this.h/2.7,6,3);
            
            for(var i = 0; i < 10; i++){
                fill(255, 100, 0,100-i*5);
                ellipse(this.x,this.y,i*10,i*10);
            }
            
        }
        
        if(this.slowActive === true && slowExtend < 100){
            slowExtend+=3;
            for(var i = 0; i < 2200; i++){
                pushMatrix();
                    translate(this.x,this.y);
                    rotate(random(360));
                    translate(0,slowExtend);
                    noStroke();
                    var rand = random(10,40);
                    fill(random(60,140),random(30,90),0,10);
                    ellipse(0,0,rand,rand);
                popMatrix();
            }
        }
        
        if(this.antiMagicActive === true){
            noStroke();
            pushMatrix();
                translate(this.x,this.y);
                noStroke();
                for(var i = 0; i < 100; i++){
                    rotate(i*random(10,14));
                    fill(random(100,255),0,random(100,255),70);
                    var rand = random(10,20);
                    pushMatrix();
                        translate(0,antiMagicExtend);
                        rotate(random(0,360));
                        ellipse(0,0,rand,rand);
                    popMatrix();
                }
                
            popMatrix();
        
        }
        
        }
        
        pushMatrix();
            translate(this.x+this.w/2-8,this.y-this.h/2+2);
            rotate(this.swingRotate-90);
            fill(255, 0, 0);
            //ellipse(0,0,5,10);
        popMatrix();
    };
    
    this.drawStatusBars = function(){
        noStroke();
        //drawing the health bar
        {
        fill(0);
        rect(10,5,154,20,5);
        var green = map(this.health,10,this.maxHealth,0,100);
        var red = map(this.health,10,this.maxHealth,0,100);
        
        fill(305-(red*3),green*1.5,0);
        rect(12,7,(this.health/this.maxHealth)*150,16,5);
        
        fill((305-(red*3))+20,(green*1.5)+50,0);
        rect(12,7,(this.health/this.maxHealth)*150,8,5);
        
        fill(0);
        textSize(30);
        if(this.health >= this.maxHealth/2){
            text('💖',0,28);
        }
        if(this.health < this.maxHealth/2){text('💔',0,28);}
        }
        
        //drawing the stamina bar
        {
        fill(0);
        rect(10,40,154,20,5);
        
        fill(230,150,0);
        rect(12,42,this.stamina/(this.endurance*10)*150,16,5);
        
        fill(250,180,0);
        rect(12,42,this.stamina/(this.endurance*10)*150,8,5);
        
        textSize(30);
        text('💪🏻',0,58);
        }
        
        //drawing the magica bar
        {
        fill(0);
        rect(10,70,154,20,5);
        
        fill(0, 0, 220);
        rect(12,72,(this.magica/(this.knowledge*5))*150,16,5);
        
        fill(20, 20, 255);
        rect(12,72,(this.magica/(this.knowledge*5))*150,8,5);
        
        textSize(30);
        text('✨',0,90);
        }
        
        //active spell indicator
        {
        stroke(0,0,255);
        strokeWeight(5);
        fill(0);
        rect(5,102,50,50,5);
        textAlign(CENTER,CENTER);
        textSize(30);
        text(spells[this.armedSpell].emoji,30,123);
        textAlign(CORNER,CORNER);
        }
        //the spell duration bar
        if(this.spellDuration > 0){
            fill(150,0,150);
            stroke(0);
            strokeWeight(5);
            rectMode(CENTER);
            rect(300,560,this.spellDuration/(this.lore/3),40,5);
            noStroke();
            fill(170,0,170);
            rect(300,552,this.spellDuration/(this.lore/3)-5,18,5);
            rectMode(CORNER);
        }
        
    };
    
    this.collide = function(xv,yv){
        //what is being looped determaines what you are colliding with
        for(var i in houses){
            var w = houses[i];
            if(this.x+this.w/2 > w.x && this.x-this.w/2 < w.x+w.w && this.y+this.h/2 > w.y && this.y-this.h/2 < w.y+w.h){
                if(xv > 0){
                    
                    this.x-=this.xvel;
                }
                if(xv < 0){
                    
                    this.x-=this.xvel;
                }
                if(yv > 0){
                    
                    this.y-=this.yvel;
                }
                if(yv < 0){
                    
                    this.y-=this.yvel;
                }
            }
        }
        
        for(var i in walls){
            var w = walls[i];
            if(this.x+this.w/2 > w.x && this.x-this.w/2 < w.x+w.w && this.y+this.h/2 > w.y && this.y-this.h/2 < w.y+w.h){
                if(xv > 0){
                    
                    this.x-=this.xvel;
                }
                if(xv < 0){
                    
                    this.x-=this.xvel;
                }
                if(yv > 0){
                    
                    this.y-=this.yvel;
                }
                if(yv < 0){
                    
                    this.y-=this.yvel;
                }
            }
        }
        
        for(var i = 0; i < trees.length; i++){
            if(dist(this.x, this.y, trees[i].x, trees[i].y) <= this.w/2 + trees[i].size/2){
                var a = atan2(this.y - trees[i].y, this.x-trees[i].x);
                
                this.x = trees[i].x+cos(a)*(trees[i].size/2+this.w/2);
                this.y = trees[i].y+sin(a)*(trees[i].size/2+this.h/2);
            }
            
        }
        
        for(var i = 0; i < rocks.length; i++){
            
            
            if(dist(this.x, this.y, rocks[i].x, rocks[i].y) <= this.w/2 + rocks[i].w/2){
                var a = atan2(this.y - rocks[i].y, this.x-rocks[i].x);
                
                this.x = rocks[i].x+cos(a)*(rocks[i].w/2+this.w/2);
                this.y = rocks[i].y+sin(a)*(rocks[i].w/2+this.h/2);
            }
            
        }
        
        for(var i in waters){
            var w = waters[i];
            if(this.x+this.w/2 > w.x && this.x-this.w/2 < w.x+w.w && this.y+this.h/2 > w.y && this.y-this.h/2 < w.y+w.h){
                if(w.direction === 'right'){
                    this.x+=protalis[activeLocationNum].specks.riverSpeed+random(-2,2);
                }
                if(w.direction === 'left'){
                    this.x-=protalis[activeLocationNum].specks.riverSpeed+random(-2,2);
                }
            }
        }
    };
    
    this.move = function(){
        //moving up
        if(keys[UP] || keys[87]){
            this.yvel = lerp(this.yvel,-this.speed,0.1);
        }
        //moving down
        if(keys[DOWN] || keys[83]){
            this.yvel = lerp(this.yvel,this.speed,0.1);
        }
        //moving right
        if(keys[RIGHT] || keys[68]){
            this.xvel = lerp(this.xvel,this.speed,0.1);
        }
        //moving left
        if(keys[LEFT] || keys[65]){
            this.xvel = lerp(this.xvel,-this.speed,0.1);
        }
        //something to make you stop moving if you are not pressing the keys
        if((!keys[UP] && !keys[DOWN]) && (!keys[87] && !keys[83])){
            this.yvel = lerp(this.yvel,0,0.1);
        }
        if((!keys[LEFT] && !keys[RIGHT]) && (!keys[65] && !keys[68])){
            this.xvel = lerp(this.xvel,0,0.1);
        }
        if((!keys[UP] && !keys[DOWN]) && (!keys[87] && !keys[83]) && (!keys[LEFT] && !keys[RIGHT]) && (!keys[65] && !keys[68])){
            this.stamina+=2;
        }
        
        
        if(keys[SHIFT] && this.stamina > 0){
            if(this.stamina > 5){
                this.speed = this.runSpeed;
            }
            this.stamina -= 2;
        }
        else{
            this.stamina+=0.5;
            this.speed = this.baseSpeed/9;
        }
        
        
        if(this.hasteActivate === true){
            this.spellDuration-=2;
        }
        else{
            this.runSpeed = this.baseSpeed/5;
        }
        //pushing you
        if(this.pushed > 0){
            
            this.xvel = lerp(this.xvel,this.pushX/2,0.5);
            this.collide(this.xvel,0);
            this.yvel = lerp(this.yvel,this.pushY/2,0.5);
            this.collide(0,this.yvel);
        }
        //adding you velocity to your current position and adding collisions
        this.x+=this.xvel;
        this.collide(this.xvel,0);
        this.y+=this.yvel;
        this.collide(0,this.yvel);
    };
    
    this.swing = function(){
        this.swinging = true;
    };
    this.backSwing = function(){
        this.backSwinging = true;
    };
    
    this.attack = function(){
        
        if(weapons[this.armedWeapon].type !== 'ranged'){
            if(this.aremdWeapon !== 'saphireStaff'){
                if(this.berserkActive === false){
                    bullets.push(new bullet(this.x+cos(this.rot)*20,this.y+sin(this.rot)*20,weapons[this.armedWeapon].damage*this.strength/45,10,this.rot-90,'',weapons[this.armedWeapon].reach-18,weapons[this.armedWeapon].pushBack,'none',60));
                }
                if(this.berserkActive === true){
                    bullets.push(new bullet(this.x+cos(this.rot)*20,this.y+sin(this.rot)*20,weapons[this.armedWeapon].damage*(this.lore/15)*this.strength/45,10,this.rot-90,'',weapons[this.armedWeapon].reach,weapons[this.armedWeapon].pushBack,'none',60));
                }
            }
            else{
                if(this.berserkActive === false){
                bullets.push(new bullet(this.x+cos(this.rot)*20,this.y+sin(this.rot)*20,weapons[this.armedWeapon].damage*(this.lore/100+this.strength/100),10,this.rot-90,'',weapons[this.armedWeapon].reach-18,weapons[this.armedWeapon].pushBack,'none',60));
            }
            if(this.berserkActive === true){
                bullets.push(new bullet(this.x+cos(this.rot)*20,this.y+sin(this.rot)*20,weapons[this.armedWeapon].damage*(this.lore/15)*this.lore/40,10,this.rot-90,'',weapons[this.armedWeapon].reach,weapons[this.armedWeapon].pushBack,'none',60));
            }
            }
        }
    };
    
    this.constrainVariables = function(){
        //constraining your health
        if(this.health <= 0){this.health = 0;}
        if(this.health > this.maxHealth){this.health = this.maxHealth;}
        
        if(this.stamina <= 0){this.stamina = 0;}
        if(this.stamina > this.endurance*10){
            this.stamina = this.endurance*10;
        }
        if(this.magica <= 0){this.magica = 0;}
        if(this.magica > this.knowledge*5){
            this.magica = this.knowledge*5;
        }
        if(this.reload > weapons[this.armedWeapon].reload+2){
            this.reload = weapons[this.armedWeapon].reload;
        }
    };
    
    this.changeArmedSpell = function(){
        this.changeArmedSpellReload++;
        //changes which spell is armed
        if(keys[90] && this.changeArmedSpellReload > 10){
            this.armedSpellIndex = this.armedSpellIndex+1;
            this.changeArmedSpellReload = 0;
        }
        
        if(keys[88] && this.changeArmedSpellReload > 10){
            this.armedSpellIndex = this.armedSpellIndex-1;
            this.changeArmedSpellReload = 0;
        }
        //looping the spell index
        if(this.armedSpellIndex > knownSpells.length-1){
            this.armedSpellIndex = 0;
        }
        if(this.armedSpellIndex < 0){
            this.armedSpellIndex = knownSpells.length-1;
        }
    };
    
    this.useSpells = function(){    
        this.spellReload++;
        
        if(this.spellReload > 100){
            this.setToHealth = this.health;
            this.setToMagica = this.magica;
        }
        
        
        //for if you use a spell
         if(mouseIsPressed && mouseButton === RIGHT && this.spellReload > 60 && this.magica >= spells[this.armedSpell].cost && (this.armedSpell === 'heal' || this.armedSpell === 'fireball' || this.armedSpell === 'ice bolt')){
            this.spellReload = 0;
            //activating the draining of magica
            this.setToMagica = this.magica - spells[this.armedSpell].cost;
            //making you heal
            if(this.armedSpell === 'heal'){
                //what your health will be after you heal
                this.setToHealth = this.health+this.lore;
            }
            
            //shooting the ice bolt
            if(this.armedSpell === 'ice bolt'){
                bullets.push(new bullet(this.x,this.y,this.lore/8,10,this.rot-90,'',600,5,'ice bolt'));
            }
            //shooting the fireball
            if(this.armedSpell === 'fireball'){
                bullets.push(new bullet(this.x,this.y,this.lore,10,this.rot-90,'',600,5,'fireball'));
            }
            
        }
        
        else if(mouseIsPressed && mouseButton === RIGHT && this.spellReload > 60 && this.magica >= spells[this.armedSpell].cost && this.spellDuration <= 0){
            this.spellReload = 0;
            //activating the draining of magica
            this.setToMagica = this.magica - spells[this.armedSpell].cost;
            
            //make you hastened
            if(this.armedSpell === 'hasten'){
                hasteExtend = 0;
                this.hasteActivate = true;
                this.speed += this.lore/20;
                this.runSpeed += this.lore/15;
                this.spellDuration = this.lore*150;
                
            }
            //activating you fire shield
            if(this.armedSpell === 'fire shield'){
                fireShieldExtend = 0;
                this.fireShieldActive = true;
                this.spellDuration = this.lore*100;
            }
            //berserk!
            if(this.armedSpell === 'berserk'){
                this.berserkActive = true;
                this.spellDuration = this.lore*120;
            }
            //slows your enemies
            if(this.armedSpell === 'slow'){
                slowExtend = 0;
                this.slowActive = true;
                this.spellDuration = this.lore*100;
                //slowing all the enemies who are close to you
                for(var i in NPCs){
                    var n = NPCs[i];
                    if(dist(this.x,this.y,n.x,n.y) < this.lore*10){
                        n.slowed = true;
                    }
                }
            }
            
            //activating you fire shield
            if(this.armedSpell === 'lightning shield'){
                this.lightningShieldActive = true;
                this.spellDuration = this.lore*100;
            }
            //using anti-magic
            if(this.armedSpell === 'anti-magic'){
                antiMagicExtend = 0;
                this.antiMagicActive = true;
                this.spellDuration = this.lore*100;
                
            }
        }
        //making it so when the slow time runs out they return to their normal speed
        if(this.spellDuration < 0){
            for(var i in NPCs){
                NPCs[i].slowed = false;
            }
        }
        if(this.spellDuration <= 0){
            this.fireShieldActive = false;
            this.hasteActivate = false;
            this.berserkActive = false;
            this.lightningShieldActive = false;
            this.antiMagicActive = false;
        }
        
        
        //implementing the changes to your stats
        this.health = lerp(this.health,this.setToHealth,0.1);
        this.magica = lerp(this.magica,this.setToMagica,0.1);
    };
    
    this.levelUp = function(openLevelUpBar){
        if(this.mageXp+this.warriorXp+this.rangerXp >= this.nextLevelXp && levelUpBarOpen === false){
            
            rr = round(random(0,4));
            
            closeLevelUpBar = false;
            
            //deciding how you level up
            {
            var r = random(0,this.nextLevelXp);
            
            if(r < this.mageXp){
                this.statsIncrease = 'mage';
            }
            if(r > this.mageXp && r < this.mageXp+this.rangerXp){
                this.statsIncrease = 'ranger';
            }
            if(r > this.mageXp && r > this.mageXp+this.rangerXp){
                this.statsIncrease = 'warrior';
            }
            
            //increasing your stats
            if(this.statsIncrease === 'ranger'){
                this.agility += round(rr);
                this.baseSpeed += round(4-rr);
            }
            if(this.statsIncrease === 'mage'){
               
                this.lore += round(rr);
                this.knowledge += round(4-rr);
            }
            if(this.statsIncrease === 'warrior'){
                this.strength += round(rr);
                this.endurance += round(4-rr);
            }
            
            
            }
        }
    };
    
    this.openTravel = function(){
        for(var i in NPCs){
            if(NPCs[i].mood !== 'enemy' && keyCode === 84){
                sceneTo = 'travelScene';
                transitionState = 'open';
            }
        }
        if(NPCs.length === 0 && keyCode === 84){
            sceneTo = 'travelScene';
            transitionState = 'open';
        }
    };
    
    this.rest = function(setupLocation){
        if(enemyCount === 0 && keyCode === 82){
            resting = true;
            
        }
    };
    
    this.update = function(inventory,openLevelUpBar){
        if(weapons[this.armedWeapon].type !== 'ranged' || mouseIsPressed && mouseButton === LEFT){
            this.reload++;
        }
        else if(weapons[this.armedWeapon].type === 'ranged'){
            this.reload = lerp(this.reload,0,0.3);
        }
        
        this.maxHealth = (this.endurance*(this.strength/4))/2;
        this.pushed--;
        
        //extending the magic shields
        fireShieldExtend+=2;
        var rand = random(30,40);
        if(fireShieldExtend > rand){
            fireShieldExtend = rand;
        }
        
        antiMagicExtend+=2;
        
        if(antiMagicExtend > rand){
            antiMagicExtend = rand;
        }
        
        //updating which spell is active
        this.armedSpell = knownSpells[this.armedSpellIndex];
        //making you face the mouse
        this.rot = atan2(mouseY-(this.y+camY),mouseX-(this.x+camX))+90;
        //drawing you
        pushMatrix();
            translate(this.x,this.y);
            rotate(this.rot);
            translate(-this.x,-this.y);
            this.draw();
        popMatrix();
        
        //you can't move while talking
        if(talking === false){
            this.move();
        }
        
        this.levelUp(openLevelUpBar);
        
        this.useSpells();
        this.changeArmedSpell();
        this.constrainVariables();
        
        //you attack
        if(mouseIsPressed && mouseButton === LEFT && this.reload >= weapons[this.armedWeapon].reload && talking === false && weapons[this.armedWeapon].type !== 'ranged'){
            this.swing();
            this.attack();
            this.reload = 0;
        }
        //swinging your weapon
        if(this.swingRotate > weapons[this.armedWeapon].swing-3){
            this.backSwinging = true;
            this.swinging = false;
        }
        if(this.swinging === true){
            this.swingRotate = lerp(this.swingRotate,weapons[this.armedWeapon].swing,0.3);
            this.backSwinging = false;
        }
        if(this.backSwinging === true){
            this.swingRotate = lerp(this.swingRotate,0,0.2);
        }
        this.spellDuration--;
    };
    
};

var player = new player();


var levelUpBarSize = 0;

var levelUpImage = function(){
    strokeWeight(6);
    stroke(210,170,69);
    line(145,155,253,155);
    
    strokeWeight(10);
    if(player.class === 'warrior'){
        stroke(230, 32, 32);
        fill(195,0,0);
    }
    if(player.class === 'ranger'){
        stroke(32, 230, 32);
        fill(0,195,0);
    }
    if(player.class === 'mage'){
        stroke(32, 32, 230);
        fill(0,0,195);
    }
    beginShape();
        vertex(245,155);
        vertex(155,155);
        vertex(140,275);
        vertex(200,250);
        vertex(260,275);
    endShape(CLOSE);
    
    if(player.class === 'warrior'){
        stroke(255,0,0);
        fill(219,0,0);
    }
    if(player.class === 'ranger'){
        stroke(0, 255, 0);
        fill(0,219,0);
    }
    if(player.class === 'mage'){
        stroke(0, 0, 255);
        fill(0,0,219);
    }
    
    beginShape();
        vertex(214,165);
        vertex(186,165);
        vertex(170,297);
        
        vertex(200,275);
        
        vertex(230,297);
        
    endShape(CLOSE);
    
    noStroke();
    imageMode(CENTER);
    
    noFill();
    for(var i = 0; i < 20; i++){
        strokeWeight(4);
        stroke(i*1,0,-130+sq(i));
        ellipse(200,200,i*4,i*4);
    }
    
    image(star,240,240,250,250);
    
    noFill();
    for(var i = 0; i < 56; i++){
        strokeWeight(1);
        stroke(i*3);
        ellipse(200,200,i,i);
    }

    image(star,217,215,100,100);
    imageMode(CORNER);
};

//opening the bar that appears when you level up (et trahit id)
var openLevelUpBar = function(){
    levelUpBarOpen = true;
    
    //drawing what's inside the bar
    {
        if(player.class === 'warrior'){
            stroke(255, 0, 0);
            fill(255, 0, 0);
        }
        if(player.class === 'ranger'){
            stroke(0, 220, 0);
            fill(0,220,0);
        }
        if(player.class === 'mage'){
            stroke(0, 0, 255);
            fill(0,0,255);
        }
        fill(0);
        strokeWeight(10);
        rectMode(CENTER);
        rect(300,300,levelUpBarSize,levelUpBarSize/1.6,5);
        rectMode(CORNER);
        if(levelUpBarSize > 450){    
            if(player.class === 'warrior'){
                stroke(255, 0, 0);
                fill(255, 0, 0);
            }
            if(player.class === 'ranger'){
                stroke(0, 220, 0);
                fill(0,220,0);
            }
            if(player.class === 'mage'){
                stroke(0, 0, 255);
                fill(0,0,255);
            }
            
            textAlign(CENTER,CENTER);
            textSize(40);
            text('You Leveled Up!',300,180);
            
            pushMatrix();
                translate(-40,90);
                scale(0.8,0.8);
                levelUpImage();
            popMatrix();
            pushMatrix();
                translate(320,90);
                scale(0.8,0.8);
                levelUpImage();
            popMatrix();
            
           
            textSize(20);
            
            text('Your new level increases your skill as a ' + player.statsIncrease+'.',180,100,250,300);
            
            if(player.statsIncrease === 'ranger'){
                fill(0,230,0);
                text('plus ' + round(rr) + ' agility || plus ' + round(4-rr) + ' speed',300,330);
            }
            if(player.statsIncrease === 'mage'){
                fill(0,0,255);
                text('plus ' + round(rr) + ' lore || plus ' + round(4-rr) + ' knowledge',300,330);
            }
            if(player.statsIncrease === 'warrior'){
                fill(255,0,0);
                text('plus ' + round(rr) + ' strength || plus ' + round(4-rr) + ' Endurance',300,330);
            }
            
            if(player.class === 'warrior'){
                stroke(255, 0, 0);
                fill(255, 0, 0);
            }
            if(player.class === 'ranger'){
                stroke(0, 220, 0);
                fill(0,220,0);
            }
            if(player.class === 'mage'){
                stroke(0, 0, 255);
                fill(0,0,255);
            }
            
            textAlign(CORNER,CORNER);
            text('Your experiance percentages were like this:',68,370,300,300);
            
            
            //the leveling up bar
            {
            noStroke();
            fill(150);
            rect(260,400,260,30,0);
            
            fill(0, 0, 230);
            rect(265,405,(player.mageXp/player.nextLevelXp)*250,20);
            fill(0, 0, 255);
            rect(265,405,(player.mageXp/player.nextLevelXp)*250,10);
            
            
            fill(230, 0, 0);
            rect(265+(player.mageXp/player.nextLevelXp)*250+(player.rangerXp/player.nextLevelXp)*250,405,(player.warriorXp/player.nextLevelXp)*250,20);
            fill(255, 0, 0);
            rect(265+(player.mageXp/player.nextLevelXp)*250+(player.rangerXp/player.nextLevelXp)*250,405,((player.warriorXp)/player.nextLevelXp)*250,10);
              
            
            
            fill(0, 230, 0);
            rect(265+(player.mageXp/player.nextLevelXp)*250,405,(player.rangerXp/player.nextLevelXp)*250,20);
            fill(0, 255, 0);
            rect(265+(player.mageXp/player.nextLevelXp)*250,405,((player.rangerXp)/player.nextLevelXp)*250,10);
            }
            
            textAlign(LEFT,CORNER);
            
            fill(0);
            if(player.mageXp > 0){
                text(round(player.mageXp/player.nextLevelXp*100)+'%',265,422);
            }
            if(player.rangerXp > 0){
                text(round(player.rangerXp/player.nextLevelXp*100)+'%',265+(player.mageXp/player.nextLevelXp)*250,422);
            }
            if(player.warriorXp > 0){
                text(round(player.warriorXp/player.nextLevelXp*100)+'%',265+(player.mageXp/player.nextLevelXp)*250+(player.rangerXp/player.nextLevelXp)*250,422);
            }
            
            
            imageMode(CORNER);
        }
        
        
    }
    imageMode(CENTER);
};

//inside a house
{

var entrance = function(){
    room = 'entrance';
    strokeWeight(1);
    //textFont(f);
    
    //drawing entrance
    {
    //the walls
    fill(170,100,50);
    quad(0,600,600,600,500,500,100,500);
    fill(150, 85, 39);
    quad(0,50,0,600,100,500,100,100);
    //this floor
    quad(600,50,600,600,500,500,500,100);
    fill(170,100,50);
    //the roof
    quad(0,50,600,50,500,150,100,150);
    noStroke();
    rect(0,0,600,51);
    //the back wall
    strokeWeight(1);
    stroke(0);
    fill(143, 80, 41);
    rect(100,150,400,350);
    //the boards
    {
    //the back wall boards
    for(var i = 0; i < 15; i++){
        line(100,150+i*25,500,150+i*25);
    }
    //the roof boards
    for(var i = 0; i < 10; i++){
        line(300+i*39,0,300+i*22,150);
    }
    for(var i = 0; i < 10; i++){
        line(300-i*39,0,300-i*22,150);
    }
    //the floor boards
    for(var i = 0; i < 10; i++){
        line(300+i*33.3,600,300+i*22.1,500);
    }
    for(var i = 0; i < 10; i++){
        line(300-i*33.3,600,300-i*22.1,500);
    }
    //the walls boards
    for(var i = 0; i < 10; i++){
        line(0,300+i*33.3,100,300+i*22.1);
    }
    for(var i = 0; i < 8; i++){
        line(0,300-i*35.4,100,300-i*21.6);
    }
    
    for(var i = 0; i < 10; i++){
        line(600,300+i*33.3,500,300+i*22.1);
    }
    for(var i = 0; i < 8; i++){
        line(600,300-i*35.4,500,300-i*21.6);
    }
    
    
    }
    
    //the doors
    fill(door1Color);
    
    rect(150,300,100,200);
    
    fill(door2Color);
    
    quad(20,300,20,580,79,520,79,300);
    
    fill(door3Color);
    quad(520,300,520,519,579,578,579,300);
    
    fill(door4Color);
    rect(350,300,100,200);
    
    
    }
    //drawing the director
    {
    strokeWeight(1);
    stroke(0);
    fill(255, 0, 0);
    rect(260,360,80,150);
    ellipse(300,360,80,10);
    arc(300,510,80,30,0,180);
    
    //the text box
    fill(255);
    rect(153,136,360,150,10);
    triangle(300,286,350,286,316,370);
    noStroke();
    rect(301,285,47,3);
    
    
    //the text
    fill(0);
    textSize(15);
    text('the door farthest to the right leads the the armory. The door a bit to the right exits this building. The door a bit the the left leads to our sword collection. And the door farthest to the left leads to our spear collection.',160,150,350,190);
    }
    
    //checking to see if your mouse is on the doors
    {
    //for door 1
    if(mouseX > 150 && mouseX < 250 && mouseY > 300 && mouseY < 500){
        door1Color = color(122, 61, 18);
        if(mouseIsPressed){
            room = 'swordShop';
        }
    }
    else{
        door1Color = color(140,70,20);
    }
    
    //for door 2
    if(mouseX > 20 && mouseX < 79 && mouseY > 272 && mouseY < 520){
        door2Color = color(122, 61, 18);
        if(mouseIsPressed){
            room = 'spearShop';
        }
    }
    else{
        door2Color = color(140,70,20);
    }
    
    //for door 3
    if(mouseX > 520 && mouseX < 579 && mouseY > 272 && mouseY < 520){
        door3Color = color(122, 61, 18);
        if(mouseIsPressed){
            room = 'armorShop';
        }
    }
    else{
        door3Color = color(140,70,20);
    }
    
    //for door 4
    if(mouseX > 350 && mouseX < 450 && mouseY > 300 && mouseY < 500){
        door4Color = color(122, 61, 18);
        if(mouseIsPressed){
            insideHouseVar = '';
        }
    }
    else{
        door4Color = color(140,70,20);
    }
    
    }
    
};

var swordShop = function(){
    room = 'swordShop';
    background(170,100,50);
    stroke(0);
    strokeWeight(1);
    for(var i = 0; i < 20; i++){
        line(i*30,0,i*30,600);
    }
    
    //the counter
    fill(107, 54, 0);
    rect(0,530,600,100);
    fill(143, 72, 0);
    rect(0,510,600,20);
    
    //the stands for the weapons
    fill(33, 28, 28);
    stroke(0);
    strokeWeight(0.5);
    
    ellipse(110,302,9,9);
    ellipse(90,302,9,9);
    
    ellipse(150,302,9,9);
    ellipse(170,302,9,9);
    
    ellipse(230,302,9,9);
    ellipse(210,302,9,9);
    
    ellipse(327,283,9,9);
    ellipse(352,283,9,9);
    
    ellipse(432,283,9,9);
    ellipse(407,283,9,9);
    
    ellipse(487,283,9,9);
    ellipse(512,283,9,9);
    
    //the weapons
    for(var i in houses){
        for(var j in houses[i].thingsInStock){
            var h = houses[i].thingsInStock[j];
            if(houses[i].name === insideHouseVar){
                if(h === 'ironSword'){
                    image(ironSword,160,200,300,300);
                }
                if(h === 'bronzeSword'){
                    image(bronzeSword,100,200,300,300);
                }
                if(h === 'goldSword'){
                    image(goldSword,220,200,300,300);
                }
                if(h === 'bronzeDagger'){
                    pushMatrix();
                        translate(100,450);
                        rotate(90);
                        image(bronzeDagger,0,0,180,180);
                    popMatrix();
                }
                if(h === 'ironDagger'){
                    pushMatrix();
                        translate(300,450);
                        rotate(90);
                        image(ironDagger,0,0,180,180);
                    popMatrix();
                }
                if(h === 'goldDagger'){
                    pushMatrix();
                        translate(500,450);
                        rotate(90);
                        image(goldDagger,0,0,180,180);
                    popMatrix();
                }
                if(h === 'ironBroadSword'){
                    image(ironBroadSword,340,250,300,300);
                }
                if(h === 'bronzeBroadSword'){
                    image(bronzeBroadSword,420,250,300,300);
                }
                if(h === 'goldBroadSword'){
                    image(goldBroadSword,500,250,300,300);
                }
            }
        }
        
    }
    
    
    
    
    //exiting
    if(mouseY > 550 && mouseIsPressed){
        room = 'entrance';
    }
};

var spearShop = function(){
    room = 'spearShop';
    background(170,100,50);
    for(var i = 0; i < 20; i++){
        stroke(0);
        line(i*30,0,i*30,600);
    }
    if(mouseY > 550 && mouseIsPressed){
        room = 'entrance';
    }
};

var armorShop = function(){
    room = 'spearShop';
    background(170,100,50);
    for(var i = 0; i < 20; i++){
        stroke(0);
        line(i*30,0,i*30,600);
    }
    if(mouseY > 550 && mouseIsPressed){
        room = 'entrance';
    }
};

var insideHouse = function(){
    player.stamina-=0.0013;
    scene = 'insideHouse';
    
    if(room === 'entrance'){
        entrance();
    }
    if(room === 'swordShop'){
        swordShop();
    }
    if(room === 'spearShop'){
        spearShop();
    }
    if(room === 'armorShop'){
        armorShop();
    }
};
}

var setupLocation = function(){
    var rows;
    var columns;
    
    
    columns = protalis[activeLocationTitle].map.length;
    rows = protalis[activeLocationTitle].map[0].length;
    
    walls.splice(0,walls.length);
    trees.splice(0,trees.length);
    rocks.splice(0,rocks.length);
    NPCs.splice(0,NPCs.length);
    fields.splice(0,fields.length);
    dirts.splice(0,dirts.length);
    
    if(battle === 'farmerRoad' && activeLocationTitle === "The Farmer's Road"){
        for(var i = 0; i < 10; i++){
            NPCs.push(new NPC(random(50,(rows*100)-50),random(50,(columns*100)-50),'rat','enemy',player));
        }
    }
    if(battle === 'fertileFields' && activeLocationTitle === "The Fertile Fields3"){
        
        NPCs.push(new NPC(1000,1000,'troll','enemy',player));
        NPCs.push(new NPC(1000,1150,'meal','friend',player));
    }
    
    for(var i = 0; i < columns; i++){
        for(var j  = 0; j < rows; j++){
            var unit = protalis[activeLocationTitle].map[i][j];
            
            if(unit === '#'){
                walls.push(new wall(j*100,i*100,100,100,'brickwall'));
            }
            if(unit === 't'){
                trees.push(new tree(j*100+50,i*100+50,random(protalis[activeLocationTitle].specks.treeSize-50,protalis[activeLocationTitle].specks.treeSize+50)));
            }
            if(unit === 'r'){
                var r = random(1,2);
                rocks.push(new rock(j*100+50,i*100+50,r,r*105));
            }
            
            if(unit === '@'){
                NPCs.push(new NPC(j*100+50,i*100+50,'bandit','enemy',player));
            }
            if(unit === '!'){
                NPCs.push(new NPC(j*100+50,i*100+50,'bandit','friend',player));
            }
            //player position
            if(unit === '%'){
                player.x = j*100+50;
                player.y = i*100+50;
            }
            
            if(unit === 'h'){
                houses.push(new house(j*100,i*100,'residental'));
            }
            if(unit === 'd'){
                dirts.push(new dirt(j*100,i*100));
            }
            if(unit === '<'){
                waters.push(new water(j*100,i*100,'right'));
            }
            if(unit === '>'){
                waters.push(new water(j*100,i*100,'left'));
            }
            if(unit === 'f'){
                fields.push(new field(j*100,i*100,100,100));
            }
            if(unit === '*'){
                NPCs.push(new NPC(j*100+50,i*100+50,'Ederil','friend',player));
            }
            //adding the signs
            if(unit === '1'){
                signs.push(new sign(j*100+25,i*100+30,'Go to the Aquatic Entrance and find a man named Ederil. He will tell you what to do.'));
            }
            
        }
    }
    
    if(protalis[activeLocationTitle].specks.threat > 10){
        for(var k = 0; k < protalis[activeLocationTitle].specks.threat; k++){
            var p  = protalis[activeLocationTitle].specks;
            var r = random(0,10);
            var type = p.enemyTypes[round(random(0,round(p.enemyTypes.length-1)))];
            if(round(r) > 9){
                NPCs.push(new NPC(random(0,rows*100),random(0,columns*100),type,'enemy',player));
                enemyCount++;
            }
        }
    }
    var rand = random(0,20);
    if(rand >= 18){
        NPCs.push(new NPC(random(50,(rows*100)-50),random(50,(columns*100)-50),'bandit','friend',player));
    }
    
    if(resting === false){
        player.x = random(50,rows*100-50);
        player.y = random(50,columns*100-50);
    }
};


//the menu buttons
{
var enterGame = new Mbutton(300,660,300,60,"Enter Game",color(0, 25, 186));

//text1
{
var bt1 = new Mbutton(300,300,550,60,"Uh-oh I hope they don't know what I did.",color(255, 100, 0));
var bt2 = new Mbutton(300,400,550,60,"If they argue with me they'l wish they hadn't.",color(255, 100, 0));
var bt3 = new Mbutton(300,500,550,60,"I don't have a thing to worry about, I'm a law abding citizen.",color(255, 100, 0));
}
{
var bt11 = new Mbutton(300,300,550,60,"The old axe is the best way",color(255, 100, 0));
var bt12 = new Mbutton(300,400,550,60,"Zombies are so stupid, I could kill them with you eyes closed.",color(255, 100, 0));
var bt13 = new Mbutton(300,500,550,60,"Why kill them? I'm to smart for them to hurt me, and they might get rid of some anoying people",color(255, 100, 0));
}
{
var bt21 = new Mbutton(300,300,550,60,"Them disturbing my thinking.",color(255, 100, 0));
var bt22 = new Mbutton(300,400,550,60,"I am completely indifferent concerning them.",color(255, 100, 0));
var bt23 = new Mbutton(300,500,550,60,"them being too chicken too fight me.",color(255, 100, 0));
}
{
var bt31 = new Mbutton(300,300,550,60,"The glass one which apears to be empty.",color(255, 100, 0));
var bt32 = new Mbutton(300,400,550,60,"The obsidian one with steam seeping out",color(255, 100, 0));
var bt33 = new Mbutton(300,500,550,60,"The silver one which shines so bright you can't look straight at it.",color(255, 100, 0));
}
{
var bt41 = new Mbutton(300,300,550,60,"I hire people to take take me where I want to go.",color(255, 100, 0));
var bt42 = new Mbutton(300,400,550,60,"Silently.",color(255, 100, 0));
var bt43 = new Mbutton(300,500,550,60,"I tend not to travel.",color(255, 100, 0));
}
{
var bt51 = new Mbutton(300,300,550,60,"A mage.",color(255, 100, 0));
var bt52 = new Mbutton(300,400,550,60,"A warrior.",color(255, 100, 0));
var bt53 = new Mbutton(300,500,550,60,"A ranger.",color(255, 100, 0));
}
{
var bt61 = new Mbutton(300,300,550,60,"Everybody who isn't a friend is an enemy.",color(255, 100, 0));
var bt62 = new Mbutton(300,400,550,60,"What they don't know can't hurt them.",color(255, 100, 0));
var bt63 = new Mbutton(300,500,550,60,"If your axe isn't bloody, wash it till it is.",color(255, 100, 0));

}
{
var bt71 = new Mbutton(300,300,550,60,"Why did I come here in the first place?",color(255, 100, 0));
var bt72 = new Mbutton(300,400,550,60,"Nonsense, I know all the valleys.",color(255, 100, 0));
var bt73 = new Mbutton(300,500,550,60,"Stay here so you can finaly have some solidtude.",color(255, 100, 0));
}
{
var bt81 = new Mbutton(300,300,550,60,"I wonder if anybody would notice if it was missing",color(255, 100, 0));
var bt82 = new Mbutton(300,400,550,60,"Stay away, it smells like magic.",color(255, 100, 0));
var bt83 = new Mbutton(300,500,550,60,"Well I don't have to worry about it hurting me.",color(255, 100, 0));
}
{
var bt91 = new Mbutton(300,300,550,60,"You used AI to Translate this.",color(255, 100, 0));
var bt92 = new Mbutton(300,400,550,60,"I don't need to know.",color(255, 100, 0));
var bt93 = new Mbutton(300,500,550,60,"Give me a week to find out.",color(255, 100, 0));
}
var b1 = new Mbutton(-200,150,270,60,'START NEW GAME',color(0, 0, 150));

var b2 = new Mbutton(800,250,270,60,'LOAD PREV. GAME',color(0, 0, 190));
var b3 = new Mbutton(-200,350,270,60,'GAME OPTIONS',color(0, 0, 220));
    
var b4 = new Mbutton(800,450,270,60,'INSTRUCTIONS',color(0, 0, 240));    

var b5 = new Mbutton(300,750,270,60,'BACK TO MENU',color(0, 0, 240));  

   
}

//the menu scenes
{

var menu1 = function(){
    scene = 1;
    imageMode(CORNER);
    
    image(grass, 0,0);
    
    textSize(55);
    fill(0);
    text('LEGACY OF PROTALIS',300,28);
    
    fill(255, 0, 0);
    text('LEGACY OF PROTALIS',300,30);
    
    b1.draw();
    b1.update();

    
    b2.draw();
    b2.update();
    
    b3.draw();
    b3.update();
    
    b4.draw();
    b4.update();
    
    
};    

var menu2 = function(){
    scene = 2;
    imageMode(CORNER);
    image(grass,0,0);
    
    fill(0, 0, 0);
    textSize(60);
    
    text('YOUR \nINSTRUCTIONS',300,88);
    fill(255, 0, 0);
    text('YOUR \nINSTRUCTIONS',300,90);
    
    fill(255, 255, 255);
    textSize(30);
    text('WASD or Arrows: move.\nShift: run.\nT: open map.\nI: open inventory.\nE: pick up something.\nZ or X: changes spell right or left respectively. \nGo around and do stuff I can answer your questions in the T&T',25,119,570,400);
    fill(0,5,74);
    text('WASD or Arrows: move.\nShift: run.\nT: open map.\nI: open inventory.\nE: pick up something.\nZ or X: changes spell right or left respectively. \nGo around and do stuff I can answer your questions in the T&T',25,120,570,400);
    b5.draw();
    b5.update();
};

var menu3 = function(){
    scene = 3;
    image(grass,0,0);
    imageMode(CORNER);
    
    textSize(60);
    fill(0, 0, 0);
    text('OPTIONS',300,48);
    fill(255, 0, 0);
    text('OPTIONS',300,50);
    
    fill(255);
    text('UNFINNISHED',300,300);
    fill(0, 0, 0);
    text('UNFINNISHED',300,302);
    
    b5.update();
    b5.draw();
};

var menu4 = function(){
    scene = 4;
    image(grass,0,0);
    imageMode(CORNER);
    
    textSize(60);
    fill(0, 0, 0);
    text('LOAD YOUR GAME',300,48);
    fill(255, 0, 0);
    text('LOAD YOUR GAME',300,50);
    
    fill(255);
    text('UNFINNISHED',300,300);
    fill(0, 0, 0);
    text('UNFINNISHED',300,302);
    
    b5.update();
    b5.draw();
};

var test1 = function(){
    scene = 5;
    imageMode(CORNER);
    image(grass,0,0);
    textSize(50);
    fill(0, 0, 0);
    text("Two guards aproach you, they don't look friendly",50,-70,500,298);
    fill(255, 0, 0);
    text("Two guards aproach you, they don't look friendly",50,-68,500,300);
    
    bt1.update();
    bt1.draw();
    bt2.update();
    bt2.draw();
    bt3.update();
    bt3.draw();
};
var test2 = function(){
    scene = 6;
    imageMode(CORNER);
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("What is your favorite way of killing zombies.",50,-70,500,298);
    fill(255, 0, 0);
    text("What is your favorite way of killing zombies.",50,-68,500,300);
    bt11.update();
    bt11.draw();
    bt12.update();
    bt12.draw();
    bt13.update();
    bt13.draw();
};
var test3 = function(){
    scene = 7;
    imageMode(CORNER);
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("What makes you dislike people.",50,-70,500,298);
    fill(255, 0, 0);
    text("What makes you dislike people.",50,-68,500,300);
    bt21.update();
    bt21.draw();
    bt22.update();
    bt22.draw();
    bt23.update();
    bt23.draw();
};
var test4 = function(){
    scene = 8;
    imageMode(CORNER);
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("How do you travel.",50,-70,500,298);
    fill(255, 0, 0);
    text("How do you travel.",50,-68,500,300);
    bt41.update();
    bt41.draw();
    bt42.update();
    bt42.draw();
    bt43.update();
    bt43.draw();
};
var test5 = function(){
    scene = 9;
    imageMode(CORNER);
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("Which of these boxes would you open.",50,-70,500,298);
    fill(255, 0, 0);
    text("Which of these boxes would you open.",50,-68,500,300);
    bt31.update();
    bt31.draw();
    bt32.update();
    bt32.draw();
    bt33.update();
    bt33.draw();
};
var test6 = function(){
    scene = 10;
    imageMode(CORNER);
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("Which of these is your motto.",50,-70,500,298);
    fill(255, 0, 0);
    text("Which of these is your motto.",50,-68,500,300);
    bt61.update();
    bt61.draw();
    bt62.update();
    bt62.draw();
    bt63.update();
    bt63.draw();
};

var test7 = function(){
    scene = 11;
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("You find yourself in an unknown valley.",50,-70,500,298);
    fill(255, 0, 0);
    text("You find yourself in an unknown valley.",50,-68,500,300);
    bt61.update();
    bt71.draw();
    bt72.update();
    bt72.draw();
    bt73.update();
    bt73.draw();
};
var test8 = function(){
    scene = 12;
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("What do you if you find a glowing ring.",50,-70,500,298);
    fill(255, 0, 0);
    text("What do you if you find a glowing ring.",50,-68,500,300);
    bt81.update();
    bt81.draw();
    bt82.update();
    bt82.draw();
    bt83.update();
    bt83.draw();
};
var test9 = function(){
    scene = 13;
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(50);
    text("What does Þú notaðir gervigreind til að þýða þetta mean",50,-102,500,400);
    fill(255, 0, 0);
    text("What does Þú notaðir gervigreind til að þýða þetta mean",50,-100,500,400);
    bt91.update();
    bt91.draw();
    bt92.update();
    bt92.draw();
    bt93.update();
    bt93.draw();
};
var test10 = function(){
    scene = 14;
    image(grass,0,0);
    fill(0, 0, 0);
    textSize(90);
    text("You are:",200,48);
    fill(255,100,0);
    text("You are:",200,50);
    
    if(mage > warrior && mage > ranger){
        chosen = 'mage';
    }
    else if(ranger > warrior && ranger > mage){
        chosen = 'ranger';
    }
    else if(warrior > mage && warrior > ranger){
        chosen = 'warrior';
    }
    
    else {
        if(round(r) < 2){
            chosen = 'mage';
        }
        
        else if(round(r) < 3){
            chosen = 'ranger';
        }
        
        else{
            chosen = 'warrior';
        }
    }
    
    if(chosen === 'mage'){
        
        textSize(50);
        fill(0, 0, 0);
        text('A Mage',200,128);
        fill(0, 0, 255);
        text('A Mage',200,130);
        textSize(25);
        fill(255, 255, 255);
        text('Mages are the users of magic in Protalis. They are lawful and like to be left alone. they have great knoledge of magica and use it to make them rich. The older a mage the stronger he is in magic. Many mages are warriors who are to old to fight. The Mages came to Protalis for the Rumored magical artifacts there. The rumors seem to be not true, but it is posible that they are just hidden well. Mages have increased knowledge and lore.\nStarting Equipment: Saphire Staff, Gold Dagger, 100 Gold, All Spells',0,19,600,600);
        fill(0, 0, 0);
        text('Mages are the users of magic in Protalis. They are lawful and like to be left alone. they have great knoledge of magica and use it to make them rich. The older a mage the stronger he is in magic. Many mages are warriors who are to old to fight. The Mages came to Protalis for the Rumored magical artifacts there. The rumors seem to be not true, but it is posible that they are just hidden well. Mages have increased knowledge and lore.\nStarting Equipment: Saphire Staff, Gold Dagger, 100 Gold, All Spells',0,20,600,600);
    }
    if(chosen === 'ranger'){
        textSize(50);
        fill(0, 0, 0);
        text('A Ranger',200,128);
        fill(0, 230, 0);
        text('A Ranger',200,130);
        textSize(25);
        fill(255, 255, 255);
        text('The Rangers are the loacal inhibtants of Protalis. They can be steathy, and are masters at disgusie so you never know if you are talking to one. Rangers sometimes do shady buisness, and use the bow and crossbow for killing. they use knifes both for stabing and throwing. There is nobody who knows more about wilderness lore than the Rangers. They do not use many spells, but have knowledge of them as will not be seen in an warrior. Rangers have increased dexterity and speed.\nStarting Equipment: Iron Dagger, Iron Sword, Cherry Bow, 40 Gold, Haste, Slow.',0,39,600,600);
        fill(0, 0, 0);
        text('The Rangers are the loacal inhibtants of Protalis. They can be steathy, and are masters at disgusie so you never know if you are talking to one. Rangers sometimes do shady buisness, and use the bow and crossbow for killing. they use knifes both for stabing and throwing. There is nobody who knows more about wilderness lore than the Rangers. They do not use many spells, but have knowledge of them as will not be seen in an warrior. Rangers have increased dexterity and speed.\nStarting Equipment: Iron Dagger, Iron Sword, Cherry Bow, 40 Gold, Haste, Slow.',0,40,600,600);
    }
    if(chosen === 'warrior'){
        textSize(50);
        fill(0, 0, 0);
        text('A Warrior',200,128);
        fill(255, 0, 0);
        text('A Warrior',200,130);
        textSize(25);
        fill(255, 255, 255);
        text('Warriors are the masters of battle. They think will always win a fight (with no magic) against Mages and Rangers. they like to use axes, but are also skillful in sword and spear. Warriors came to Protalis in search of Gold, Jems, and other riches. They absolutely detest Rangers for there Sneakiness and say they should fight In the open. Warriors vary much in there use of armor. Warriors have increased strength and constitution.\nStarting Equipment: Bronze Dagger, Iron Sword, Iron Axe, 60 Gold, Berserk.',0,19,600,600);
        fill(0, 0, 0);
        text('Warriors are the masters of battle. They think will always win a fight (with no magic) against Mages and Rangers. they like to use axes, but are also skillful in sword and spear. Warriors came to Protalis in search of Gold, Jems, and other riches. They absolutely detest Rangers for there Sneakiness and say they should fight In the open. Warriors vary much in there use of armor. Warriors have increased strength and constitution.\nStarting Equipment: Bronze Dagger, Iron Sword, Iron Axe, 60 Gold, Berserk.',0,20,600,600);
    }
    
    enterGame.draw();
    enterGame.update();
};
}

var storyEffects = function(){
    if(battle === 'farmersRoad' && activeLocationTitle === "The Farmer's Road" && enemyCount === 0){
        battle = 'farmersRoadComplete';
    }
    if(battle === 'fertileFields3' && activeLocationTitle === "The Fertile Fields3" && enemyCount === 0){
        battle = 'fertileFields3Complete';
    }
};

var mainGame = function(inventory){
    insideHouseVar = '';
    scene = 'mainGame';
    //for when you are outside
    {
    background(0,200,0);
    
    imageMode(CENTER);
    rectMode(CORNER);
    talkButtonReload++;
    
    camX = -player.x+300;
    camY = -player.y+300;
    
    if(camX > 0){
        camX = 0;
    }
    if(camY > 0){
        camY = 0;
    }
    if(camX < -protalis[activeLocationTitle].map[0].length*100+575){
        camX = -protalis[activeLocationTitle].map[0].length*100+575;
    }
    if(camY < -protalis[activeLocationTitle].map.length*100+575){
        camY = -protalis[activeLocationTitle].map.length*100+575;
    }
    if(player.x < 0){
        player.x = 0;
    }
    if(player.y < 0){
        player.y = 0;
    }
    if(player.x > protalis[activeLocationTitle].map[0].length*100-25){
        player.x = protalis[activeLocationTitle].map[0].length*100-25;
    }
    if(player.y > protalis[activeLocationTitle].map.length*100-25){
        player.y = protalis[activeLocationTitle].map.length*100-25;
    }
    
    
    //opening you inventory
    if(keys[73] && openInventoryReload > 10 && scene === 'mainGame'){
        openInventoryReload = 0;
        transitionState = 'open';
        sceneTo = 'inventory';
        
    }
    
    
    
    //drawing everything
    {
    pushMatrix();
        translate(camX,camY);
        //drawing the grass
        for(var i = 0; i < 10; i++){
            for(var j = 0; j < 10; j++){
                image(grass,i*600,j*600);
            }
        }
        
        //compiling everything
        runDirt(player);
        runFields(player);
        
        wallUpdate();
        rockUpdate(player);
        
        runSigns(player);
        runHouses(player);
        
        runNPCs(player,houses,waters);
        
        runBullets(player,NPCs,houses);
        for(var i in fields){
            if(dist(fields[i].x+50,fields[i].y+50,player.x,player.y) < 830 && dist(fields[i].x+50,fields[i].y+50,player.x,player.y) > 160){
                fields[i].draw(player);
            }
        }
        for(var i in waters){
            waters[i].draw();
        }
        
        player.update(inventory,openLevelUpBar);
        
        runBloods();
        
        
        treeUpdate(player);
        
        
    popMatrix();
    
    }
    
    player.drawStatusBars();
    talk(player);
    storyEffects();
    
    }
    //removing bullets
    for(var i = bullets.length-1; i>=0; i--){
        if(bullets[i].x < -100 || bullets[i].y < -100 || bullets[i].x > 10000000 || bullets[i].y > 100000000){
            bullets.splice(i,1);
        }
    }
    
};



//the map tree image
{
background(255);
stroke(0);
strokeWeight(40);
fill(153, 89, 20);
rect(270, 400, 60, 180);
fill(0, 125, 4);
ellipse(300, 250, 250, 462);
var treeImage = get();
background(0);
stroke(255);
strokeWeight(20);
fill(255);
rect(270, 400, 60, 180);
fill(255);
ellipse(300, 250, 250, 462);
var treeMasker = get();
background(255);
if(treeImage){
    image(treeImage, 0, 0);
    image(treeMasker, 0, 0);
    treeImage.mask(treeMasker);
}
}

//location stuff
{
var travelToNode = new button(470,510,120,50,'Travel',0,30);

var place = function(x,y,title,oneX,oneY,twoX,twoY,threeX,threeY,info,supplies){
    this.x = x;
    this.y = y;
    
    this.title = title;
    this.oneX = oneX;
    this.oneY = oneY;
    this.twoX = twoX;
    this.twoY = twoY;
    this.threeX = threeX;
    this.threeY = threeY;
    this.info = info;
    this.supplies = supplies;
    
    
    this.color = color(255, 255, 0);
    this.selectedLocation = false;
    this.goToLocation = false;
    this.draw = function() {
        noFill();
        stroke(this.color);
        strokeWeight(3);
        ellipse(this.x,this.y,10,10);
    };
    this.mouseOn = function(){
        
        if(dist(mouseX,mouseY,this.x,this.y) < 12){
            textAlign(CENTER,CENTER);
            textSize(18);
            fill(0,0,0);
            text(this.title,this.x,this.y-18);
            fill(255, 0, 0);
            text(this.title,this.x,this.y-17);
            textAlign(CORNER,CORNER);
            
            
            if(((this.oneX === places[activeLocationNum].x && this.oneY === places[activeLocationNum].y) || 
            (places[i].twoX === places[activeLocationNum].x && this.twoY === places[activeLocationNum].y) || 
            (places[i].threeX === places[activeLocationNum].x && this.threeY === places[activeLocationNum].y)) ||
            
            ((this.x === places[activeLocationNum].oneX && this.y === places[activeLocationNum].oneY) || 
        (this.x === places[activeLocationNum].twoX && this.y === places[activeLocationNum].twoY) || 
        (this.x === places[activeLocationNum].threeX && this.y === places[activeLocationNum].threeY)) && mouseIsPressed && mouseButton === LEFT){
                
                selectedLocation = this.title;
                
            }
            
            
        }
        if(mouseIsPressed && mouseButton === RIGHT && dist(mouseX,mouseY,this.x,this.y) < 12){
            
            travelBarText = this.info;
            travelBarTitle = this.title;
        }
        
        
        if(mouseIsPressed && mouseButton === LEFT && dist(mouseX,mouseY,this.x,this.y) < 12){
            //selecting the node and clearing all others
            for(var j in places){
                places[j].selectedLocation = false;
            }
            this.selectedLocation = true;
            
            if(((this.oneX === places[activeLocationNum].x && this.oneY === places[activeLocationNum].y) || 
            (this.twoX === places[activeLocationNum].x && this.twoY === places[activeLocationNum].y) || 
            (this.threeX === places[activeLocationNum].x && this.threeY === places[activeLocationNum].y)) ||
            
            ((this.x === places[activeLocationNum].oneX && this.y === places[activeLocationNum].oneY) || 
        (this.x === places[activeLocationNum].twoX && this.y === places[activeLocationNum].twoY) || 
        (this.x === places[activeLocationNum].threeX && this.y === places[activeLocationNum].threeY))){
                if(player.supplies >= this.supplies){
                    travelBarText = 'To travel to '+this.title+' you must have '+this.supplies+' supplies.';
                    
            }
                if(player.supplies < this.supplies){
                    travelBarText = 'To travel to '+this.title+' you must have '+this.supplies+' supplies. You have to few do this.';
            }
            }
            else{
                travelBarText = 'You are not adjacent to this node and so cannot travel here.';
            }
        }
        if(travelBarText === 'To travel to '+this.title+' you must have '+this.supplies+' supplies.'){
            travelToNode.draw();
        }
        
        if(mouseIsPressed && mouseY > 500 && (travelBarText === 'You are not adjacent to this node and so cannot travel here.' || (mouseX < 470 || mouseY < 510 || mouseX > 590 || mouseY > 560))){
            travelBarText = '';
            selectedLocation = '';
            travelBarTitle = '';
        }
        
        
    };
};


var runLocationStuff = function(){
    for(var i = places.length-1; i >= 0; i--){
        
        
        strokeWeight(2);
        stroke(160);
        if(places[i].oneY !== 0){
            line(places[i].x,places[i].y,places[i].oneX,places[i].oneY);
        }
        if(places[i].twoY !== 0){
            line(places[i].x,places[i].y,places[i].twoX,places[i].twoY);
        }
        if(places[i].threeY !== 0){
            line(places[i].x,places[i].y,places[i].threeX,places[i].threeY);
        }
        
        if(((places[i].oneX === places[activeLocationNum].x && places[i].oneY === places[activeLocationNum].y) || 
            (places[i].twoX === places[activeLocationNum].x && places[i].twoY === places[activeLocationNum].y) || 
            (places[i].threeX === places[activeLocationNum].x && places[i].threeY === places[activeLocationNum].y)) ||
            
        ((places[i].x === places[activeLocationNum].oneX && places[i].y === places[activeLocationNum].oneY) || 
    (places[i].x === places[activeLocationNum].twoX && places[i].y === places[activeLocationNum].twoY) || 
    (places[i].x === places[activeLocationNum].threeX && places[i].y === places[activeLocationNum].threeY))){
            if(player.class === 'warrior'){
                stroke(255, 0, 0);
            }
            if(player.class === 'ranger'){
                stroke(0, 220, 0);
            }
            if(player.class === 'mage'){
                stroke(0, 0, 255);
            }
            
            if(places[activeLocationNum].oneY !== 0){
                line(places[activeLocationNum].x,places[activeLocationNum].y,places[activeLocationNum].oneX,places[activeLocationNum].oneY);
            }
            if(places[activeLocationNum].twoY !== 0){
                line(places[activeLocationNum].x,places[activeLocationNum].y,places[activeLocationNum].twoX,places[activeLocationNum].twoY);
            }
            if(places[activeLocationNum].threeY !== 0){
                line(places[activeLocationNum].x,places[activeLocationNum].y,places[activeLocationNum].threeX,places[activeLocationNum].threeY);
            }
            if(places[i].oneY !== 0){
                line(places[i].x,places[i].y,places[activeLocationNum].x,places[activeLocationNum].y);
            }
            if(places[i].twoY !== 0){
                line(places[i].x,places[i].y,places[activeLocationNum].x,places[activeLocationNum].y);
            }
            if(places[i].threeY !== 0){
                line(places[i].x,places[i].y,places[activeLocationNum].x,places[activeLocationNum].y);
            }
        }
    }
    
    
    for(var i in places){
        places[i].draw();
        textSize(15);
        fill(255);
        text(i,places[i].x-3,places[i].y-10);
    }
         
    for(var i in places){
        places[i].mouseOn();
        if(travelToNode.mouseOn() && mouseIsPressed && transitionState === 'close' && places[i].selectedLocation === true && player.supplies >= places[i].supplies){
            transitionState = 'open';
            sceneTo = 'mainGame';
            activeLocationTitle = places[i].title;
            activeLocationNum = i;
            setupLocation();
            player.supplies -= places[i].supplies;
        }
    }
    
    
    
    //showing you location
    stroke(0, 0, 0);
    noFill();
    strokeWeight(2);
    ellipse(places[activeLocationNum].x,places[activeLocationNum].y,(sin(frameCount*5)*10)+10,(sin(frameCount*5)*10)+10);
    
};


}

//adding the nodes
{
places.push(new place(235,230,'Brentonville',0,0,0,0,0,0,'The Capitol of Protalis. A good place to do some buisness. This is also the residance of the king.',2));
places.push(new place(263,210,'Yurigosini',270,230,0,0,0,0,'There is something strange in this lake, and it is not wise to sail here. Some of the local fishermen sail here all the time though.',5));
places.push(new place(270,230,'Piscis',235,230,300,232,0,0,'It is not openly known how this town exports so much fish to Mendalford, but you can buy it very cheap here.',5));
places.push(new place(300,232,'Eastern Road',335,235,0,0,0,0,'The road leading toward Piscis from Brentonville. It gets a moderate amount of travelers.',4));

places.push(new place(320,272,"The Farmer's Road",335,235,0,0,0,0,'This road is where all the farmers from the Fertile Fields take their crops to market.',6));

places.push(new place(565,85,'The Mountain of Dread                         ',570,115,0,0,0,0,'The den of Gauthmar the Glorious. It is filled with passeges, and more than one traveler has never returned from entering them.',30));
places.push(new place(570,115,'Calachnor      ',550,125,0,0,0,0,'The smallest of the Protallian islands. It has been a rocky and desolate place since Gauthmar made his dwelling there.',50));
places.push(new place(550,125,'The Twisted Chanel              ',560,185,0,0,0,0,'The chanel between Broken Island and Calachnor. Known for is turbulant waters.',25));
places.push(new place(560,185,'The Northern Blight                ',490,205,0,0,0,0,'A calm area of water where no fish or other creatures of the sea inhabit. Generaly not sailed to.',35));
places.push(new place(490,205,'The Western Shore',453,183,0,0,0,0,'Though not actually the shore itself, this area has carried the title because this is the farthest out you can see the shore of Protalis from.',25));

places.push(new place(510,275,'The Eternal Sea',560,185,0,0,0,0,'An endless expanse of water where you can go weeks without seeing land.',35));
places.push(new place(510,355,'The Eternal Sea2',510,275,0,0,0,0,'An endless expanse of water where you can go weeks without seeing land.',35));
places.push(new place(479,435,'The Eternal Sea3',510,355,0,0,0,0,'An endless expanse of water where you can go weeks without seeing land.',35));
places.push(new place(580,455,'The Unknown Waters                           ',479,435,0,0,0,0,'A vast sea from which no one has ever returned.',35));

places.push(new place(453,183,'Westernton',450,123,0,0,0,0,'Though Brentonville is the capital, Westernton is the largest city in the Protalian Islands. It used to be two different cities, but they joined together.',2));
places.push(new place(400,210,'The Western Road',453,183,400,170,0,0,"This is a highly traveled road leading from Westernton to Mendalford. This is where most of Westernton's exports are shipped",4));
places.push(new place(335,235,'Mendalford',400,210,358,250,0,0,"Here is the hub of all economics in Protalis. The hole town is built around a giant market, and if you want to buy something, it will be their.",6));

places.push(new place(450,123,'The Rocky Passage',475,130,0,0,0,0,'A narrow passage that leads to Broken Island. Very rocky and less than ten percent of ships survive going through it.',25));
places.push(new place(475,130,'Broken Landing',505,122,500,162,0,0,'. . .',10));
places.push(new place(505,122,'The Broken Crags',522,145,0,0,0,0,'. . .',15));
places.push(new place(500,162,'The Broken Forest',522,145,0,0,0,0,'. . .',15));
places.push(new place(522,145,'The Broken Barrow',0,0,0,0,0,0,'. . .',10));

places.push(new place(395,345,'The Glade of Golden Mist',0,0,0,0,0,0,'The solitary glade in the Forest of Foralidion. A strange place, the sun seems to always be shinging through a gold-green vale in it.',6));
places.push(new place(440,280,'The Deepest Reaches',455,255,0,0,0,0,'The inermost part of the forest. A dark place were dark things sleep.',15));
places.push(new place(455,255,'The Dark Hold',0,0,0,0,0,0,'Even in the middle of the day this part of the forest is as dark as night.',20));
places.push(new place(405,320,'The Western Forest',395,345,0,0,0,0,'This part of the Forest of Foraldion is ancient, most of the trees being at least two feet in diameter.',15));
places.push(new place(435,240,'The Northern Forest',455,255,0,0,0,0,'This part of the Forest of Foraldion is ancient, most of the trees being at least two feet in diameter.',15));
places.push(new place(407,280,'The Central Forest',435,240,0,0,0,0,'This part of the forest is ancient, most of the trees being at least three feet in diameter. Everything seams sleaping and waiting.',10));
places.push(new place(367,295,'The Forest Gate',407,280,405,320,0,0,'The main entrance to the forest. Two masive trees with their branches form an arborial gate. It is very old but not foreboding',10));
places.push(new place(430,305,'The Forest Foothills',0,0,405,320,0,0,'This is the edge of the forest were it gradually desperses as it leads upwards to the Mountains of Despair.',15));

places.push(new place(440,335,'The Northern Mountains of Despair.',430,305,0,0,0,0,'These rugged mountains are very hard to travel across, being filled with cracks which let out smoke.',27));
places.push(new place(430,375,'The High Peaks.',440,335,0,0,0,0,'From hear one is a few miles above the forest and can see high above the trees, it is not cold though, if anything the heat increases.',28));
places.push(new place(412,405,'The Base of the Mountain',430,375,393,445,0,0,'A furious storm rages at the peak night and day never seacing. The air is thick with rain and smoke.',15));

places.push(new place(339,320,'The Edge of the Forest',367,295,405,320,0,0,'The edge of the Forest. The many overhanging branches gives this place a strange look.',10));
places.push(new place(310,350,'The Aquatic Entrance',355,360,339,320,0,0,'The Beknowing River enters the forest hear a sudden change in the water happens when it enters the forest, the color changing from blue to golden-green.',12));
places.push(new place(355,360,'The Forest River',395,345,0,0,0,0,'The Beknowing River runs through the forest here lush moss lines its banks the water in it is a shimering golden-green.',14));
places.push(new place(330,390,'The Southern Forest',355,360,
310,350,0,0,'This part of the Forest of Foraldion is ancient, most of the trees being at least two feet in diameter.',16));
places.push(new place(320,429,"The Forest's Bank",330,390,360,395,0,0,'Here the forest goes right up to the shore of the ocean, and you can see the town of Lignum.',16));

places.push(new place(360,395,'The Mountainous Slopes',330,390,
355,360,0,0,'The forest ends abrubtly and the rocky sides of the mountains lead up toward the Zenith of Narcalor.',24));
places.push(new place(370,420,'The Southern Mountains of Despair',360,395,0,0,0,0,'These rugged mountains are very hard to travel across, being filled with cracks which let out smoke.',27));
places.push(new place(393,445,'The Protalian Penisula',370,420,0,0,0,0,'From high in these mountains one can see across miles of water The air is cleaner here but storms increase.',23));
places.push(new place(390,395,'The Zenith of Narcalor',412,405,0,0,0,0,'It is hear that Narcalor went to his doom. A furious storm rages all around, and one cannot see ten feet in front of himself.',12));

places.push(new place(358,250,'The Shores of the Lake of Lacus',0,0,0,0,0,0,'This lake the healthest place in Protalis and many of the richest men live next to it.',6));
places.push(new place(351,272,"The River's Exit",367,295,358,250,320,272,'The river leaves Lacus Lake here.',8));
places.push(new place(290,415,"Lignum",0,0,320,429,0,0,'This town is little bothered about though a lot of lumber is shipped from here.',5));
places.push(new place(130,370,"The Open Waters",0,0,250,450,0,0,'A common shipping rout going from southern Protalis to up north.',21));
places.push(new place(180,280,"Protalian Channel",130,370,235,230,0,0,'From here you can see both Protalis and Archanor, many people travel along here to get to Archanor.',17));
places.push(new place(218,200,"Protalian Channel",205,168,235,230,0,0,'From here you can see both Protalis and Archanor, many people travel along here to get to Archanor.',17));

places.push(new place(225,100,"Northern Sea",218,200,0,0,0,0,'These northen waters are primarily traveled to, to get the exelant fish found only here. But many ice bergs float in these waters.',28));
places.push(new place(375,80,"Northern Sea",450,123,225,100,0,0,'These northen waters are primarily traveled to, to get the exelant fish found only here. But many ice bergs float in these waters.',28));
places.push(new place(355,30,"Frozen Expanse",375,80,0,0,0,0,'This far north the whole sea freezes into one massive plain of ice.',55));

places.push(new place(250,450,"The Southern Sea",0,0,290,415,0,0,'This sea is the warmest part of Protalis, and many strange creatures live deep under the waves which could not survive farther north.',14));
places.push(new place(285,360,"Southern Road",310,350,290,415,0,0,'This long road leads to Mendalford and is the best way to travel if going south.',6));
places.push(new place(320,300,"Southern Road2",285,360,339,320,320,272,'This long road leads to Mendalford and is the best way to travel if going south.',6));
places.push(new place(260,300,"The Fertile Fields",320,300,230,340,320,272,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(230,340,"The Fertile Fields2",205,380,0,0,255,370,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(255,370,"The Fertile Fields3",0,0,275,330,285,360,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(205,380,"The Fertile Fields4",255,370,230,340,0,0,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(275,330,"The Fertile Fields5",260,300,285,360,0,0,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(195,325,"The Fertile Fields6",205,380,230,340,0,0,'From these fields come all the food for Protalis, every sort of plant grows very well here.',9));
places.push(new place(285,255,"Endless Plains",260,300,270,230,320,272,'There is nothing but grass in all these plains and one could go miles without anything changing.',14));
places.push(new place(210,285,"Cape of Sight",195,325,0,0,0,0,'This peninsula is a mile higher than the endless fields below giving a fantastic view.',10));


places.push(new place(195,240,"Lamerack",180,280,218,200,0,0,'The largest town in Archanor, a lot of ship to and from Brentonville comes through here.',5));
places.push(new place(175,187,"Sunwater River",195,240,0,0,0,0,'This shining river leading to Gurlock Lake is truely a mirthful place to be.',8));
places.push(new place(160,130,"Eastern Shore",175,187,0,0,0,0,'From this shore you can barely see Protalis cobblestone beaches line this side of Archanor',12));
places.push(new place(205,168,"Archenal",175,187,160,130,0,0,'This smaller town has sturdy inhabitants who like to stay away from other people.',10));
places.push(new place(115,120,"Western Forest",122,178,160,130,0,0,'Fyron Forest is just what it apears to be, a plain ordinary forest, (with the exception of the fact that no animals ever go here).',14));
places.push(new place(60,120,"Eastern Forest",115,120,0,0,0,0,'Fyron Forest is just what it apears to be, a plain ordinary forest, (with the exception of the fact that no animals ever go here).',14));
places.push(new place(80,171,"Glurlock Lake",60,120,0,0,0,0,'This lake is a peaceful place, when few people are there, it seems people are more easily agitated here.',10));
places.push(new place(122,178,"Sunwater River",80,171,175,187,0,0,'This shining river leading to Gurlock Lake is truely a mirthful place to be.',8));
places.push(new place(90,218,"Empty Mountains",122,178,0,0,0,0,'These baren mountains contain nothing but massive birds called the Ocharion.',40));
places.push(new place(43,193,"      Highest Peaks",90,218,0,0,0,0,'These are the tallest place in the whole world reaching miles above the sea.',50));
places.push(new place(30,225,"                      Cliffs of Clairvoyance",90,218,0,0,0,0,'These wind cliffs are said to give people visions of parts of the future they do not want to know.',28));
places.push(new place(145,223,"Peaceful Plains",90,218,195,240,122,178,'The grass here blows and the sun shines. one could lie here in peace for years, drinking from little springs and eating the edible grass here.',7));
places.push(new place(160,263,"Unkown End",145,223,0,0,0,0,'No one knows how this place got its name but this rock peninsula has called that for hundreds of years.',13));
places.push(new place(340,190,"Hradic Hills",400,210,335,235,0,0,'Named after the Chieften Hradic Halkor, many of the wilder people live up here.',22));
places.push(new place(320,155,"Hradic Hills2",340,190,0,0,0,0,'Named after the Chieften Hradic Halkor, many of the wilder people live up here.',22));

places.push(new place(400,170,"Forest of Fluence",0,0,0,0,0,0,'In this shinning forest lives the dreaded Spidromaven, other than that it is a very peacful place.',19));
places.push(new place(355,150,"Forest of Fluence2",400,170,320,155,0,0,'In this shinning forest lives the dreaded Spidromaven, other than that it is a very peacful place.',19));
places.push(new place(410,125,"Frozen Wastes",400,170,0,0,0,0,'Few people live this far north were it is below freezing most of the year.',40));

places.push(new place(320,125,"Frozen Wastes",320,155,0,0,0,0,'Few people live this far north were it is below freezing most of the year.',40));
places.push(new place(285,190,"Northern Lands",320,155,300,232,0,0,'Full of scattered trees and cotteges this is the home of many simple folk.',13));
places.push(new place(255,170,"Outlands",285,190,0,0,0,0,'Many people stay here to avoid civiliszation. And some of the best wild animals live here, good for hunting.',14));
places.push(new place(259,140,"Outland Isles",255,170,0,0,0,0,'These northern islands are full of beautiful forests and cliffs which span all around the islands.',17));

}
activeLocationTitle = places[activeLocationNum].title;

var travelBar = function(){
    stroke(0);
    strokeWeight(10);
    line(-10,480,610,480);
    image(travelBarImg,0,480);
    
    fill(0);
    textSize(30);
    text(travelBarTitle,20,510);
    textSize(20);
    text(travelBarText,20,525,445,300);
};

var toggleNode = new button(5,440,160,30,'Show Nodes: On',color(140,80,0),20);
var travelScene = function(){
    scene = 'travelScene';
    image(mapImg,0,0);
    imageMode(CORNER);
    
    
    
    fill(0);
    textSize(50);
    text('Your Map',50,50);
    
    
    travelBar();
    imageMode(CENTER);
    
    
    
    toggleNode.draw();
    if(showIcons === true){
        toggleNode.text = 'Show Nodes: On';
    }
    else{
        toggleNode.text = 'Show Nodes: Off';
    }
    
    
    //the forests
    {
        imageMode(CENTER);
    image(treeImage,296,392,20,20);
image(treeImage,299,390,20,20);
image(treeImage,299,390,20,20);
image(treeImage,302,374,20,20);
image(treeImage,302,374,20,20);
image(treeImage,304,383,20,20);
image(treeImage,307,395,20,20);
image(treeImage,308,371,20,20);
image(treeImage,308,371,20,20);
image(treeImage,310,381,20,20);
image(treeImage,310,381,20,20);
image(treeImage,310,407,20,20);
image(treeImage,311,354,20,20);
image(treeImage,311,354,20,20);
image(treeImage,311,401,20,20);
image(treeImage,311,401,20,20);
image(treeImage,313,375,20,20);
image(treeImage,313,375,20,20);
image(treeImage,313,387,20,20);
image(treeImage,313,389,20,20);
image(treeImage,313,389,20,20);
image(treeImage,314,413,20,20);
image(treeImage,314,413,20,20);
image(treeImage,314,425,20,20);
image(treeImage,315,347,20,20);
image(treeImage,316,359,20,20);
image(treeImage,317,371,20,20);
image(treeImage,317,371,20,20);
image(treeImage,317,401,20,20);
image(treeImage,318,380,20,20);
image(treeImage,318,380,20,20);
image(treeImage,318,404,20,20);
image(treeImage,318,404,20,20);
image(treeImage,320,394,20,20);
image(treeImage,320,394,20,20);
image(treeImage,320,413,20,20);
image(treeImage,321,345,20,20);
image(treeImage,322,356,20,20);
image(treeImage,322,356,20,20);
image(treeImage,322,424,20,20);
image(treeImage,323,368,20,20);
image(treeImage,324,388,20,20);
image(treeImage,324,388,20,20);
image(treeImage,325,380,20,20);
image(treeImage,325,380,20,20);
image(treeImage,325,403,20,20);
image(treeImage,325,404,20,20);
image(treeImage,327,341,20,20);
image(treeImage,327,415,20,20);
image(treeImage,327,415,20,20);
image(treeImage,327,436,20,20);
image(treeImage,327,436,20,20);
image(treeImage,328,352,20,20);
image(treeImage,329,361,20,20);
image(treeImage,329,425,20,20);
image(treeImage,330,369,20,20);
image(treeImage,330,369,20,20);
image(treeImage,330,380,20,20);
image(treeImage,330,380,20,20);
image(treeImage,330,397,20,20);
image(treeImage,330,397,20,20);
image(treeImage,332,334,20,20);
image(treeImage,333,386,20,20);
image(treeImage,333,386,20,20);
image(treeImage,334,344,20,20);
image(treeImage,334,344,20,20);
image(treeImage,334,366,20,20);
image(treeImage,334,366,20,20);
image(treeImage,335,413,20,20);
image(treeImage,335,413,20,20);
image(treeImage,335,424,20,20);
image(treeImage,336,356,20,20);
image(treeImage,336,435,20,20);
image(treeImage,337,329,20,20);
image(treeImage,337,405,20,20);
image(treeImage,337,405,20,20);
image(treeImage,338,329,20,20);
image(treeImage,338,371,20,20);
image(treeImage,338,371,20,20);
image(treeImage,339,379,20,20);
image(treeImage,339,416,20,20);
image(treeImage,339,416,20,20);
image(treeImage,340,339,20,20);
image(treeImage,340,339,20,20);
image(treeImage,340,391,20,20);
image(treeImage,340,391,20,20);
image(treeImage,341,352,20,20);
image(treeImage,343,336,20,20);
image(treeImage,343,363,20,20);
image(treeImage,343,363,20,20);
image(treeImage,344,327,20,20);
image(treeImage,344,327,20,20);
image(treeImage,344,397,20,20);
image(treeImage,344,397,20,20);
image(treeImage,345,356,20,20);
image(treeImage,345,412,20,20);
image(treeImage,346,333,20,20);
image(treeImage,346,333,20,20);
image(treeImage,347,380,20,20);
image(treeImage,347,380,20,20);
image(treeImage,347,391,20,20);
image(treeImage,348,369,20,20);
image(treeImage,349,369,20,20);
image(treeImage,349,402,20,20);
image(treeImage,349,402,20,20);
image(treeImage,350,342,20,20);
image(treeImage,350,348,20,20);
image(treeImage,351,324,20,20);
image(treeImage,351,324,20,20);
image(treeImage,351,360,20,20);
image(treeImage,351,360,20,20);
image(treeImage,354,337,20,20);
image(treeImage,355,382,20,20);
image(treeImage,355,382,20,20);
image(treeImage,356,328,20,20);
image(treeImage,356,394,20,20);
image(treeImage,356,394,20,20);
image(treeImage,357,354,20,20);
image(treeImage,357,371,20,20);
image(treeImage,357,371,20,20);
image(treeImage,358,345,20,20);
image(treeImage,359,316,20,20);
image(treeImage,360,338,20,20);
image(treeImage,360,364,20,20);
image(treeImage,360,384,20,20);
image(treeImage,362,331,20,20);
image(treeImage,362,331,20,20);
image(treeImage,362,350,20,20);
image(treeImage,364,373,20,20);
image(treeImage,365,342,20,20);
image(treeImage,365,342,20,20);
image(treeImage,366,298,20,20);
image(treeImage,366,298,20,20);
image(treeImage,366,324,20,20);
image(treeImage,366,380,20,20);
image(treeImage,367,309,20,20);
image(treeImage,367,309,20,20);
image(treeImage,367,356,20,20);
image(treeImage,368,335,20,20);
image(treeImage,368,335,20,20);
image(treeImage,369,286,20,20);
image(treeImage,369,286,20,20);
image(treeImage,369,326,20,20);
image(treeImage,369,326,20,20);
image(treeImage,369,363,20,20);
image(treeImage,370,370,20,20);
image(treeImage,370,370,20,20);
image(treeImage,371,299,20,20);
image(treeImage,371,299,20,20);
image(treeImage,371,315,20,20);
image(treeImage,371,348,20,20);
image(treeImage,371,348,20,20);
image(treeImage,373,289,20,20);
image(treeImage,373,289,20,20);
image(treeImage,373,337,20,20);
image(treeImage,375,315,20,20);
image(treeImage,376,274,20,20);
image(treeImage,376,274,20,20);
image(treeImage,376,303,20,20);
image(treeImage,376,303,20,20);
image(treeImage,376,328,20,20);
image(treeImage,376,328,20,20);
image(treeImage,376,356,20,20);
image(treeImage,376,377,20,20);
image(treeImage,376,378,20,20);
image(treeImage,377,349,20,20);
image(treeImage,377,370,20,20);
image(treeImage,378,282,20,20);
image(treeImage,378,294,20,20);
image(treeImage,378,295,20,20);
image(treeImage,379,339,20,20);
image(treeImage,379,339,20,20);
image(treeImage,380,316,20,20);
image(treeImage,380,316,20,20);
image(treeImage,380,361,20,20);
image(treeImage,381,288,20,20);
image(treeImage,381,288,20,20);
image(treeImage,382,299,20,20);
image(treeImage,382,331,20,20);
image(treeImage,382,331,20,20);
image(treeImage,383,321,20,20);
image(treeImage,383,321,20,20);
image(treeImage,383,341,20,20);
image(treeImage,383,374,20,20);
image(treeImage,384,271,20,20);
image(treeImage,385,281,20,20);
image(treeImage,385,281,20,20);
image(treeImage,385,308,20,20);
image(treeImage,385,310,20,20);
image(treeImage,385,357,20,20);
image(treeImage,385,357,20,20);
image(treeImage,385,367,20,20);
image(treeImage,386,292,20,20);
image(treeImage,386,299,20,20);
image(treeImage,386,367,20,20);
image(treeImage,388,275,20,20);
image(treeImage,388,275,20,20);
image(treeImage,389,263,20,20);
image(treeImage,389,263,20,20);
image(treeImage,389,327,20,20);
image(treeImage,389,327,20,20);
image(treeImage,389,334,20,20);
image(treeImage,389,335,20,20);
image(treeImage,390,313,20,20);
image(treeImage,390,367,20,20);
image(treeImage,391,279,20,20);
image(treeImage,391,279,20,20);
image(treeImage,391,373,20,20);
image(treeImage,392,296,20,20);
image(treeImage,393,256,20,20);
image(treeImage,393,266,20,20);
image(treeImage,393,266,20,20);
image(treeImage,393,305,20,20);
image(treeImage,393,305,20,20);
image(treeImage,393,318,20,20);
image(treeImage,394,327,20,20);
image(treeImage,394,327,20,20);
image(treeImage,396,283,20,20);
image(treeImage,396,283,20,20);
image(treeImage,396,290,20,20);
image(treeImage,397,366,20,20);
image(treeImage,397,366,20,20);
image(treeImage,398,254,20,20);
image(treeImage,398,272,20,20);
image(treeImage,398,298,20,20);
image(treeImage,398,332,20,20);
image(treeImage,398,332,20,20);
image(treeImage,399,263,20,20);
image(treeImage,399,263,20,20);
image(treeImage,399,313,20,20);
image(treeImage,400,368,20,20);
image(treeImage,401,320,20,20);
image(treeImage,401,327,20,20);
image(treeImage,401,327,20,20);
image(treeImage,401,359,20,20);
image(treeImage,401,359,20,20);
image(treeImage,403,282,20,20);
image(treeImage,403,282,20,20);
image(treeImage,403,301,20,20);
image(treeImage,403,301,20,20);
image(treeImage,404,249,20,20);
image(treeImage,404,272,20,20);
image(treeImage,404,353,20,20);
image(treeImage,404,353,20,20);
image(treeImage,405,230,20,20);
image(treeImage,405,293,20,20);
image(treeImage,405,363,20,20);
image(treeImage,406,240,20,20);
image(treeImage,406,257,20,20);
image(treeImage,406,257,20,20);
image(treeImage,406,357,20,20);
image(treeImage,407,343,20,20);
image(treeImage,408,244,20,20);
image(treeImage,408,313,20,20);
image(treeImage,408,313,20,20);
image(treeImage,408,321,20,20);

    image(treeImage,409,228,20,20);
image(treeImage,409,286,20,20);
image(treeImage,409,286,20,20);
image(treeImage,409,349,20,20);
image(treeImage,409,349,20,20);
image(treeImage,410,234,20,20);
image(treeImage,410,276,20,20);
image(treeImage,410,276,20,20);
image(treeImage,410,301,20,20);
image(treeImage,410,301,20,20);
image(treeImage,410,335,20,20);
image(treeImage,412,269,20,20);
image(treeImage,412,269,20,20);
image(treeImage,412,295,20,20);
image(treeImage,412,295,20,20);
image(treeImage,413,229,20,20);
image(treeImage,413,260,20,20);
image(treeImage,413,303,20,20);
image(treeImage,413,303,20,20);
image(treeImage,413,323,20,20);
image(treeImage,414,254,20,20);
image(treeImage,414,254,20,20);
image(treeImage,414,326,20,20);
image(treeImage,415,242,20,20);
image(treeImage,415,242,20,20);
image(treeImage,415,275,20,20);
image(treeImage,415,326,20,20);
image(treeImage,415,343,20,20);
image(treeImage,416,237,20,20);
image(treeImage,416,237,20,20);
image(treeImage,416,275,20,20);
image(treeImage,416,286,20,20);
image(treeImage,416,315,20,20);
image(treeImage,417,245,20,20);
image(treeImage,417,292,20,20);
image(treeImage,417,292,20,20);
image(treeImage,417,322,20,20);
image(treeImage,417,322,20,20);
image(treeImage,417,333,20,20);
image(treeImage,419,232,20,20);
image(treeImage,419,268,20,20);
image(treeImage,419,300,20,20);
image(treeImage,421,253,20,20);
image(treeImage,421,253,20,20);
image(treeImage,421,259,20,20);
image(treeImage,421,259,20,20);
image(treeImage,421,275,20,20);
image(treeImage,421,284,20,20);
image(treeImage,421,313,20,20);
image(treeImage,423,235,20,20);
image(treeImage,423,235,20,20);
image(treeImage,423,242,20,20);
image(treeImage,423,293,20,20);

image(treeImage,423,307,20,20);
image(treeImage,423,307,20,20);
image(treeImage,425,226,20,20);
image(treeImage,426,246,20,20);
image(treeImage,426,268,20,20);
image(treeImage,426,268,20,20);
image(treeImage,427,295,20,20);
image(treeImage,428,275,20,20);
image(treeImage,428,275,20,20);
image(treeImage,428,284,20,20);
image(treeImage,428,284,20,20);
image(treeImage,429,253,20,20);
image(treeImage,430,224,20,20);
image(treeImage,430,238,20,20);
image(treeImage,430,300,20,20);
image(treeImage,431,260,20,20);
image(treeImage,431,260,20,20);
image(treeImage,431,265,20,20);
image(treeImage,431,265,20,20);
image(treeImage,432,242,20,20);
image(treeImage,432,242,20,20);
image(treeImage,432,274,20,20);
image(treeImage,432,274,20,20);
image(treeImage,433,231,20,20);
image(treeImage,433,231,20,20);
image(treeImage,433,285,20,20);
image(treeImage,433,285,20,20);
image(treeImage,433,292,20,20);
image(treeImage,433,292,20,20);
image(treeImage,435,224,20,20);
image(treeImage,435,244,20,20);
image(treeImage,435,244,20,20);
image(treeImage,437,233,20,20);
image(treeImage,437,258,20,20);
image(treeImage,437,258,20,20);
image(treeImage,437,296,20,20);
image(treeImage,437,296,20,20);
image(treeImage,438,278,20,20);
image(treeImage,438,278,20,20);
image(treeImage,439,267,20,20);
image(treeImage,439,267,20,20);
image(treeImage,439,285,20,20);
image(treeImage,439,285,20,20);
image(treeImage,440,254,20,20);
image(treeImage,441,226,20,20);
image(treeImage,442,241,20,20);
image(treeImage,442,292,20,20);
image(treeImage,443,234,20,20);
image(treeImage,443,234,20,20);
image(treeImage,443,274,20,20);
image(treeImage,445,221,20,20);
image(treeImage,445,221,20,20);
image(treeImage,445,247,20,20);
image(treeImage,445,247,20,20);
image(treeImage,446,267,20,20);
image(treeImage,446,285,20,20);
image(treeImage,446,285,20,20);
image(treeImage,447,259,20,20);
image(treeImage,447,259,20,20);
image(treeImage,447,277,20,20);
image(treeImage,447,296,20,20);
image(treeImage,447,296,20,20);
image(treeImage,450,223,20,20);
image(treeImage,450,233,20,20);
image(treeImage,450,255,20,20);
image(treeImage,450,255,20,20);
image(treeImage,451,277,20,20);
image(treeImage,451,277,20,20);
image(treeImage,451,286,20,20);
image(treeImage,452,243,20,20);
image(treeImage,454,234,20,20);
image(treeImage,454,234,20,20);
image(treeImage,454,245,20,20);
image(treeImage,454,268,20,20);
image(treeImage,454,277,20,20);
image(treeImage,454,277,20,20);
image(treeImage,455,225,20,20);
image(treeImage,455,259,20,20);
image(treeImage,455,259,20,20);
image(treeImage,460,229,20,20);
image(treeImage,460,229,20,20);
image(treeImage,460,254,20,20);
image(treeImage,460,254,20,20);
image(treeImage,460,268,20,20);
image(treeImage,460,278,20,20);
image(treeImage,460,278,20,20);
image(treeImage,461,237,20,20);
image(treeImage,461,237,20,20);
image(treeImage,461,249,20,20);
image(treeImage,461,249,20,20);
image(treeImage,462,222,20,20);
image(treeImage,462,222,20,20);
image(treeImage,462,259,20,20);
image(treeImage,462,259,20,20);
image(treeImage,465,221,20,20);
image(treeImage,465,246,20,20);
image(treeImage,465,246,20,20);
image(treeImage,466,232,20,20);
image(treeImage,466,232,20,20);
image(treeImage,468,236,20,20);
image(treeImage,468,236,20,20);
image(treeImage,468,272,20,20);
image(treeImage,468,272,20,20);
image(treeImage,469,257,20,20);
image(treeImage,470,226,20,20);
image(treeImage,470,250,20,20);
image(treeImage,471,260,20,20);
image(treeImage,473,250,20,20);
image(treeImage,473,250,20,20);
image(treeImage,475,240,20,20);
image(treeImage,475,240,20,20);
image(treeImage,476,227,20,20);
image(treeImage,476,227,20,20);
image(treeImage,478,261,20,20);
image(treeImage,478,261,20,20);
image(treeImage,481,229,20,20);
image(treeImage,481,229,20,20);
image(treeImage,486,229,20,20);
image(treeImage,486,229,20,20);
image(treeImage,490,230,20,20);
image(treeImage,490,230,20,20);
image(treeImage,496,227,20,20);
image(treeImage,496,227,20,20);
    
    image(treeImage,158,108,20,20);
image(treeImage,151,110,20,20);
image(treeImage,145,114,20,20);
image(treeImage,145,114,20,20);
image(treeImage,140,117,20,20);
image(treeImage,132,117,20,20);
image(treeImage,132,117,20,20);
image(treeImage,124,117,20,20);
image(treeImage,124,117,20,20);
image(treeImage,118,113,20,20);
image(treeImage,118,113,20,20);
image(treeImage,109,109,20,20);
image(treeImage,109,109,20,20);
image(treeImage,112,114,20,20);
image(treeImage,112,114,20,20);
image(treeImage,101,105,20,20);
image(treeImage,96,105,20,20);
image(treeImage,96,105,20,20);
image(treeImage,91,108,20,20);
image(treeImage,91,108,20,20);
image(treeImage,81,106,20,20);
image(treeImage,81,106,20,20);
image(treeImage,85,106,20,20);
image(treeImage,85,106,20,20);
image(treeImage,76,112,20,20);
image(treeImage,71,111,20,20);
image(treeImage,63,109,20,20);
image(treeImage,56,111,20,20);
image(treeImage,56,111,20,20);
image(treeImage,50,115,20,20);
image(treeImage,157,116,20,20);
image(treeImage,157,116,20,20);
image(treeImage,150,117,20,20);

image(treeImage,101,114,20,20);
image(treeImage,101,114,20,20);
image(treeImage,84,114,20,20);
image(treeImage,84,114,20,20);

image(treeImage,92,115,20,20);

image(treeImage,150,117,20,20);

image(treeImage,76,118,20,20);

image(treeImage,103,119,20,20);
image(treeImage,103,119,20,20);
image(treeImage,67,119,20,20);
image(treeImage,67,119,20,20);
image(treeImage,60,119,20,20);

image(treeImage,143,121,20,20);
image(treeImage,119,121,20,20);
image(treeImage,119,121,20,20);
image(treeImage,110,121,20,20);

image(treeImage,53,122,20,20);
image(treeImage,97,122,20,20);
image(treeImage,97,122,20,20);

image(treeImage,130,124,20,20);
image(treeImage,130,124,20,20);
image(treeImage,88,124,20,20);

image(treeImage,72,125,20,20);

image(treeImage,139,127,20,20);
image(treeImage,105,127,20,20);
image(treeImage,105,127,20,20);
image(treeImage,80,127,20,20);
image(treeImage,80,127,20,20);

image(treeImage,48,129,20,20);
image(treeImage,124,129,20,20);
image(treeImage,124,129,20,20);
image(treeImage,64,129,20,20);
image(treeImage,64,129,20,20);
image(treeImage,92,129,20,20);

image(treeImage,131,130,20,20);
image(treeImage,131,130,20,20);
image(treeImage,114,130,20,20);

image(treeImage,55,131,20,20);
image(treeImage,55,131,20,20);

image(treeImage,101,133,20,20);
image(treeImage,101,133,20,20);

image(treeImage,85,134,20,20);
image(treeImage,85,134,20,20);
image(treeImage,73,134,20,20);
image(treeImage,119,134,20,20);
image(treeImage,119,134,20,20);
image(treeImage,108,134,20,20);
image(treeImage,108,134,20,20);

image(treeImage,64,136,20,20);

image(treeImage,56,137,20,20);
image(treeImage,56,137,20,20);
image(treeImage,92,137,20,20);
image(treeImage,79,137,20,20);
image(treeImage,79,137,20,20);

image(treeImage,97,139,20,20);

image(treeImage,115,141,20,20);
image(treeImage,115,141,20,20);

image(treeImage,49,142,20,20);
image(treeImage,48,142,20,20);
image(treeImage,106,142,20,20);

image(treeImage,87,143,20,20);
image(treeImage,82,143,20,20);
image(treeImage,82,143,20,20);
image(treeImage,72,143,20,20);

image(treeImage,64,145,20,20);

image(treeImage,57,146,20,20);
image(treeImage,57,146,20,20);

image(treeImage,43,148,20,20);
image(treeImage,43,148,20,20);
image(treeImage,77,148,20,20);
image(treeImage,108,148,20,20);
image(treeImage,108,148,20,20);

image(treeImage,85,149,20,20);
image(treeImage,101,149,20,20);
image(treeImage,101,149,20,20);

image(treeImage,93,151,20,20);
image(treeImage,93,151,20,20);

image(treeImage,74,154,20,20);
image(treeImage,74,154,20,20);

image(treeImage,66,156,20,20);
image(treeImage,67,156,20,20);

image(treeImage,60,158,20,20);
image(treeImage,60,158,20,20);
    
image(treeImage,342,134,20,20);
image(treeImage,342,134,20,20);

image(treeImage,346,138,20,20);
image(treeImage,346,138,20,20);

image(treeImage,357,139,20,20);

image(treeImage,373,143,20,20);
image(treeImage,373,143,20,20);

image(treeImage,377,146,20,20);
image(treeImage,382,146,20,20);
image(treeImage,382,146,20,20);
image(treeImage,387,146,20,20);
image(treeImage,349,146,20,20);

image(treeImage,342,147,20,20);
image(treeImage,342,147,20,20);

image(treeImage,363,148,20,20);

image(treeImage,355,149,20,20);

image(treeImage,398,150,20,20);
image(treeImage,398,150,20,20);

image(treeImage,391,152,20,20);
image(treeImage,391,152,20,20);

image(treeImage,417,153,20,20);
image(treeImage,404,153,20,20);
image(treeImage,408,153,20,20);
image(treeImage,369,153,20,20);
image(treeImage,369,153,20,20);

image(treeImage,408,154,20,20);

image(treeImage,377,155,20,20);
image(treeImage,377,155,20,20);

image(treeImage,345,156,20,20);
image(treeImage,345,156,20,20);

image(treeImage,386,159,20,20);
image(treeImage,361,159,20,20);
image(treeImage,361,159,20,20);

image(treeImage,403,161,20,20);
image(treeImage,403,161,20,20);
image(treeImage,395,161,20,20);
image(treeImage,395,161,20,20);

image(treeImage,352,163,20,20);
image(treeImage,367,163,20,20);

image(treeImage,412,164,20,20);
image(treeImage,412,164,20,20);

image(treeImage,421,165,20,20);
image(treeImage,421,165,20,20);
image(treeImage,377,165,20,20);
image(treeImage,383,165,20,20);

image(treeImage,345,166,20,20);
image(treeImage,372,166,20,20);
image(treeImage,372,166,20,20);

image(treeImage,387,167,20,20);
image(treeImage,387,167,20,20);

image(treeImage,356,168,20,20);
image(treeImage,357,168,20,20);

image(treeImage,430,171,20,20);

image(treeImage,401,172,20,20);
image(treeImage,393,172,20,20);

image(treeImage,418,173,20,20);
image(treeImage,411,173,20,20);
image(treeImage,411,173,20,20);
image(treeImage,364,173,20,20);
image(treeImage,364,173,20,20);
image(treeImage,349,173,20,20);

image(treeImage,369,174,20,20);
image(treeImage,369,174,20,20);

image(treeImage,381,176,20,20);
image(treeImage,381,176,20,20);

image(treeImage,375,177,20,20);

image(treeImage,404,178,20,20);
image(treeImage,404,178,20,20);
image(treeImage,404,178,20,20);

image(treeImage,423,179,20,20);
image(treeImage,387,179,20,20);
image(treeImage,387,179,20,20);

image(treeImage,396,182,20,20);
image(treeImage,396,182,20,20);

image(treeImage,473,143,20,20);
image(treeImage,477,145,20,20);
image(treeImage,482,148,20,20);
image(treeImage,462,149,20,20);
image(treeImage,462,149,20,20);
image(treeImage,466,149,20,20);
image(treeImage,488,149,20,20);
image(treeImage,488,149,20,20);
image(treeImage,456,150,20,20);
image(treeImage,456,150,20,20);
image(treeImage,529,151,20,20);
image(treeImage,529,151,20,20);
image(treeImage,491,153,20,20);
image(treeImage,491,153,20,20);
image(treeImage,523,153,20,20);
image(treeImage,523,153,20,20);
image(treeImage,497,154,20,20);
image(treeImage,472,155,20,20);
image(treeImage,472,155,20,20);
image(treeImage,477,155,20,20);
image(treeImage,500,157,20,20);
image(treeImage,500,157,20,20);
image(treeImage,466,157,20,20);
image(treeImage,466,157,20,20);
image(treeImage,506,159,20,20);
image(treeImage,513,159,20,20);
image(treeImage,530,159,20,20);
image(treeImage,530,159,20,20);
image(treeImage,517,160,20,20);
image(treeImage,517,160,20,20);
image(treeImage,493,160,20,20);
image(treeImage,482,160,20,20);
image(treeImage,482,160,20,20);
image(treeImage,524,162,20,20);
image(treeImage,524,162,20,20);
image(treeImage,487,162,20,20);
image(treeImage,487,162,20,20);
image(treeImage,510,167,20,20);
image(treeImage,510,167,20,20);
image(treeImage,501,167,20,20);
image(treeImage,501,167,20,20);
image(treeImage,518,168,20,20);
image(treeImage,527,168,20,20);
image(treeImage,527,168,20,20);
image(treeImage,489,169,20,20);
image(treeImage,495,170,20,20);
image(treeImage,496,171,20,20);
image(treeImage,506,171,20,20);
image(treeImage,506,171,20,20);
image(treeImage,520,173,20,20);
image(treeImage,520,173,20,20);
image(treeImage,514,174,20,20);
    imageMode(CORNER);
    }
    
    if(showIcons === true){
        runLocationStuff();
    }
    else{
        
        pushMatrix();
            textSize(25);
            rotate(-50);
            fill(0);
            text('Forest of Foraldion',-90,504);
            fill(255,0,0);
            text('Forest of Foraldion',-90,505);
        popMatrix();
        pushMatrix();
            textSize(20);
            rotate(15);
            fill(0);
            text('Forest of \nFluence',370,54);
            fill(255,0,0);
            text('Forest of \nFluence',370,55);
        popMatrix();
        pushMatrix();
            textSize(20);
            rotate(-10);
            fill(0);
            text('Fyron Forest',25,144);
            fill(255,0,0);
            text('Fyron Forest',25,145);
        popMatrix();
        pushMatrix();
            textSize(20);
            rotate(-55);
            fill(0);
            text('Mountains of Despair',-180,561);
            fill(255,0,0);
            text('Mountains of Despair',-180,562);
        popMatrix();
        pushMatrix();
            textSize(20);
            rotate(20);
            fill(0);
            text('Empty Mountains',70,184);
            fill(255,0,0);
            text('Empty Mountains',70,185);
        popMatrix();
        
        pushMatrix();
            textSize(20);
            rotate(-45);
            fill(0);
            text('Lacus Lake',20,444);
            fill(255,0,0);
            text('Lacus Lake',20,445);
        popMatrix();
        
        pushMatrix();
            textSize(20);
            rotate(45);
            fill(0);
            text('Hradic Hills',300,-105);
            fill(255,0,0);
            text('Hradic Hills',300,-104);
        popMatrix();
        
        pushMatrix();
            textSize(20);
            rotate(0);
            fill(0);
            text('Broken Mountains',435,124);
            fill(255,0,0);
            text('Broken Mountains',435,125);
        popMatrix();
        pushMatrix();
            textSize(20);
            rotate(0);
            fill(0);
            text('Broken Forest',450,163);
            fill(255,0,0);
            text('Broken Forest',450,164);
        popMatrix();
        pushMatrix();
            textSize(28);
            rotate(-50);
            fill(0);
            text('Feritle Fields',-175,410);
            fill(255,0,0);
            text('Fertile Fields',-175,411);
        popMatrix();
        
        pushMatrix();
            textSize(18);
            rotate(10);
            fill(0);
            text('Sunwater River',115,160);
            fill(255,0,0);
            text('Sunwater River',115,161);
        popMatrix();
    }
    
    
};


var inventoryClickEvents = function() {
    for(var i = inventorySlots.length - 1; i >= 0; i--){
        var x = inventorySlots[i].x;
        var y = inventorySlots[i].y;
        //selecting an item
        if (inventorySlots[i].mouseOn() && mouseButton === LEFT) {
            if(selected === ''){
                if (inventorySlots[i].occupent !== ''){
                    
                    //if you are taking the weapon out of your hand changing the armed weapon to nothing
                    if(inventorySlots[i].type === 'sword'){
                        player.armedWeapon = 'fists';
                    }
                    
                    selected = inventorySlots[i].occupent;
                    inventorySlots[i] = new inventorySlot(x,y,inventorySlots[i].type,'');
                }
            }
            
            //placing the selected item where you want it
            else if (inventorySlots[i].occupent === '' && inventorySelectReload > 20 && inventorySlots[i].occupent !== 'locked'){
                //changing your armed weapon
                if(inventorySlots[i].type === 'sword'){
                    player.armedWeapon = selected;
                }
                inventorySlots[i] = new inventorySlot(x,y,inventorySlots[i].type,selected);
                selected = '';
            }
        }
    }
};
var inventoryScene = function(){
    scene = 'inventory';
    inventorySelectReload++;
    
    image(inventoryBackground,300,300);
    
    fill(0);
    
    if(player.class === 'warrior'){
        stroke(255, 0, 0);
    }
    if(player.class === 'ranger'){
        stroke(0, 220, 0);
    }
    if(player.class === 'mage'){
        stroke(0, 0, 255);
    }
    
    strokeWeight(5);
    rect(520,10,65,65,5);
    rect(420,10,65,65,5);
    
    textAlign(CORNER,CORNER);
    
    fill(255);
    textSize(45);
    text('Your Inventory',50,39);
    fill(0);
    text('Your Inventory',50,40);
    
    textSize(44);
    text('✨',525,55);
    text('💪🏻',425,55);
    
    //closing the info bars
    if(mouseIsPressed){
        magicInfoBarStatus = 'closing';
        attributeInfoBarStatus = 'closing';
    }
    
    //opening the info bars
    if(mouseIsPressed && mouseX > 520 && mouseX < 585 && mouseY > 10 && mouseY < 75){
        magicInfoBarStatus = 'opening';
    }
    
    if(mouseIsPressed && mouseX > 420 && mouseX < 485 && mouseY > 10 && mouseY < 75){
        attributeInfoBarStatus = 'opening';
    }
    
    
    //modifing the info bars
    if(magicInfoBarStatus === 'opening'){
        magicInfoBarSize = lerp(magicInfoBarSize,500,0.05);
    }
    if(magicInfoBarStatus === 'closing'){
        magicInfoBarSize = lerp(magicInfoBarSize,0,0.05);
    }
    if(magicInfoBarSize === 0){
        magicInfoBarStatus = '';
    }
    
    if(attributeInfoBarStatus === 'opening'){
        attributeInfoBarSize = lerp(attributeInfoBarSize,500,0.05);
    }
    if(attributeInfoBarStatus === 'closing'){
        attributeInfoBarSize = lerp(attributeInfoBarSize,0,0.05);
    }
    
    if(attributeInfoBarSize === 0){
        attributeInfoBarStatus = '';
    }
    
    
    //your image
    {
    pushMatrix();
        translate(5,50);
        stroke(155,134,61);
        strokeWeight(3);
        //the cape
        {
            fill(82,7,11);
            beginShape();
                //the cape
                vertex(138,158);
                vertex(142,176);
                vertex(145,201);
                vertex(145,231);
                vertex(143,406);
                vertex(154,422);
                vertex(164,429);
                vertex(172,431);
                vertex(176,437);
                vertex(246,442);
                vertex(251,441);
                vertex(271,437);
                vertex(279,433);
                vertex(279,433);
                vertex(283,430);
                vertex(286,425);
                vertex(311,422);
                vertex(318,417);
                vertex(337,414);
                vertex(343,408);
                vertex(357,403);
                vertex(365,398);
                vertex(370,393);
                vertex(374,387);
                vertex(374,380);
                vertex(357,352);
                vertex(329,294);
                vertex(318,262);
                vertex(315,246);
                vertex(230,100);
                
        endShape(CLOSE);
    }
        fill(50);
        {
            beginShape();
                vertex(66,147);
                vertex(77,152);
                vertex(92,158);
                vertex(95,157);
                vertex(94,150);
                vertex(102,153);
                vertex(105,152);
                vertex(114,152);
                vertex(123,155);
                vertex(137,157);
                //^armpit
                vertex(136,156);
                vertex(142,158);
                vertex(155,164);
                vertex(168,184);
                vertex(171,213);
                vertex(159,242);
                vertex(157,251);
                vertex(166,260);
                vertex(168,276);
                vertex(172,295);
                vertex(173,312);
                vertex(165,304);
                vertex(165,313);
                vertex(175,346);
                vertex(177,360);
                vertex(188,380);
                vertex(192,394);
                vertex(196,397);
                vertex(203,440);
                vertex(200,444);
                vertex(192,446);
                
                
                //feet
                vertex(192,446);
                vertex(168,460);
                vertex(161,466);
                vertex(161,471);
                vertex(180,472);
                vertex(208,467);
                vertex(217,467);
                vertex(215,475);
                vertex(213,493);
                vertex(217,500);
                vertex(222,503);
                vertex(237,503);
                vertex(243,500);
                vertex(245,496);
                vertex(247,461);
                vertex(249,448);
                //the cape
                vertex(247,443);
                vertex(245,438);
                vertex(244,423);
                vertex(249,397);
                vertex(250,370);
                vertex(258,356);
                vertex(256,337);
                vertex(260,330);
                vertex(261,314);
                vertex(255,324);
                vertex(253,322);
                vertex(254,304);
                vertex(257,294);
                vertex(258,266);
                vertex(260,262);
                vertex(267,257);
                vertex(266,243);
                vertex(258,223);
                vertex(258,211);
                vertex(264,185);
                vertex(266,181);
                vertex(275,206);
                vertex(275,219);
                vertex(280,233);
                vertex(280,245);
                vertex(284,251);
                vertex(284,262);
                vertex(282,269);
                vertex(278,279);
                vertex(274,291);
                vertex(277,295);
                vertex(284,299);
                vertex(289,299);
                vertex(302,296);
                vertex(307,292);
                vertex(309,289);
                vertex(308,270);
                vertex(309,257);
                vertex(313,242);
                //the cape end
                vertex(313,242);
                vertex(316,204);
                vertex(308,211);
                vertex(302,204);
                vertex(301,196);
                vertex(303,191);
                vertex(296,180);
                vertex(290,155);
                vertex(286,133);
                vertex(296,130);
                vertex(297,128);
                vertex(283,117);
                vertex(272,109);
                vertex(265,107);
                vertex(254,105);
                vertex(245,100);
                vertex(242,95);
                vertex(244,91);
                vertex(244,85);
                vertex(241,76);
                vertex(241,56);
                vertex(242,53);
                vertex(242,36);
                vertex(238,28);
                vertex(231,20);
                vertex(218,11);
                vertex(216,8);
                vertex(215,8);
                vertex(213,11);
                vertex(208,14);
                vertex(203,14);
                vertex(200,16);
                vertex(197,19);
                vertex(192,25);
                vertex(187,36);
                vertex(185,41);
                vertex(185,46);
                vertex(187,48);
                vertex(187,74);
                vertex(182,92);
                vertex(186,96);
                vertex(185,101);
                vertex(182,102);
                vertex(177,103);
                vertex(174,100);
                vertex(150,100);
                vertex(118,121);
                vertex(117,124);
                vertex(109,124); 
                vertex(103,126);    
                vertex(100,120);
                vertex(91,116);
                vertex(54,104);
                vertex(43,92);
                vertex(37,91);
                vertex(28,73);
                vertex(8,73);
                vertex(3,82);
                vertex(4,101);
                vertex(7,104);
                vertex(21,111);
                vertex(66,147);
            endShape();
    }
        
        stroke(155,134,61);
        line(186,101,207,123);
        line(245,99,220,123);
        
        ellipse(213,128,13,13);
    
    
    popMatrix();
    }
    
    runInventorySlots(player);
    
    //selecting de-selecting and everything else where you click on a slot
    imageMode(CENTER);
    for(var i = inventorySlots.length - 1; i >= 0; i--){
        var x = inventorySlots[i].x;
        var y = inventorySlots[i].y;
        //drawing what is in a slot
        if(inventorySlots[i].occupent === 'coin'){
            
            image(coin,x+55,y+55,130,130);
            fill(0);
            textSize(28);
            textAlign(CENTER,CENTER);
            text(player.money,x+35,y+80);
        }
        else if(inventorySlots[i].occupent === 'supplies'){
            textAlign(CORNER,CORNER);
            textSize(40);
            text('🥙',x+5,y+50);
            fill(0);
            textSize(28);
            textAlign(CENTER,CENTER);
            text(player.supplies,x+35,y+80);
        }
        else if(inventorySlots[i].occupent === 'locked'){
            fill(100);
            noStroke();
            rect(x+18,y+25,36,36,5);
            noFill();
            stroke(100);
            strokeWeight(5);
            arc(x+36,y+27,25,30,180,360);
            stroke(0);
            strokeWeight(4);
            line(x+35,y+35,x+35,y+45);
            noStroke();
            fill(0);
            ellipse(x+35,y+45,10,10);
        }
        
        else if(inventorySlots[i].occupent !== '' ){
            pushMatrix();
                translate(x+39,y+32);
                if(inventorySlots[i].occupent === 'saphireStaff'){
                    rotate(-45);
                    image(weapons[inventorySlots[i].occupent].image,0,0,130,130);
                }
                else if(inventorySlots[i].occupent === 'ironAxe'){
                    image(weapons[inventorySlots[i].occupent].image,0,0,75,75);
                }
                else if(inventorySlots[i].occupent === 'cherryBow'){
                    pushMatrix();
                        rotate(45);
                        image(weapons[inventorySlots[i].occupent].image,12,4,84,84);
                        image(cherryBowBase,12,4,84,84);
                        
                    popMatrix();
                    strokeWeight(0.5);
                    stroke(255);
                    line(24,-22,-25,28);
                }
                else{
                    rotate(45);
                    image(weapons[inventorySlots[i].occupent].image,0,0,100,100);
                }
               
            popMatrix();
        }
        
    }
    
    //draw info bar
    {
    fill(0);
    if(player.class === 'warrior'){
        stroke(255, 0, 0);
    }
    if(player.class === 'ranger'){
        stroke(0, 220, 0);
    }
    if(player.class === 'mage'){
        stroke(0, 0, 255);
    }
    strokeWeight(10);
    
    if(magicInfoBarSize <= 3){
        noStroke();
    }
    
    rectMode(CENTER);
    rect(300,300,magicInfoBarSize,magicInfoBarSize*3/5,5);
    
    if(player.class === 'ranger'){
        stroke(0, 200, 0);
    }
    if(player.class === 'mage'){
        stroke(0, 0, 255);
    }
    if(player.class === 'warrior'){
        stroke(255, 0, 0);
    }
    if(attributeInfoBarSize <= 3){
        noStroke();
    }
    rect(300,300,attributeInfoBarSize,attributeInfoBarSize*3/5,5);
    rectMode(CORNER);
    }
    
    //the spell info
    if(magicInfoBarSize > 495){
        textAlign(CENTER,CENTER);
        textSize(50);
        if(player.class === 'warrior'){
            fill(255, 0, 0);
        }
        if(player.class === 'ranger'){
            fill(0, 220, 0);
        }
        if(player.class === 'mage'){
            fill(0, 0, 255);
        }
        text(player.armedSpell + ': ' + spells[player.armedSpell].emoji,300,195);
        
        textSize(20);
        if(player.armedSpell === 'fireball'){
            text('A massive burst of flame dealing your enemy ' + player.lore + ' damage while using '+spells[player.armedSpell].cost + ' magica.',100,100,400,420);
        }
        if(player.armedSpell === 'heal'){
            text('A mystical aura healing you of ' + player.lore + ' points of damage while using ' + spells[player.armedSpell].cost + ' magica.',100,100,400,420);
        }
        if(player.armedSpell === 'hasten'){
            text('A time bubble which puts you into a faster time stream, resulting in you moving at a speed of ' + round(player.lore/3) + ' while costing you ' + spells[player.armedSpell].cost + ' magica.',100,100,400,420);
        }
        if(player.armedSpell === 'ice bolt'){
            text('A bolt of magical frost that, when it collides with your enemy will envelop him, freezing him in place until he breaks out. This costs ' + spells[player.armedSpell].cost + ' magica.',75,100,450,420);
        }
        if(player.armedSpell === 'fire shield'){
            text('A magic flaming shield which burns on the carbon-dioxide in the air. This deals ' + player.lore/5 + ' damage and uses ' + spells[player.armedSpell].cost + ' magica.',75,100,450,420);
        }
        if(player.armedSpell === 'berserk'){
            text('An enchantment which puts you into a complete frensy multiplying the damage you deal by ' + player.lore/15 + '. But doubles the amount of damage you take  This takes ' + spells[player.armedSpell].cost + ' magica to cast.',60,100,480,420);
        }
        if(player.armedSpell === 'anti-magic'){
            text('A shield of pure magica which makes you imune to all spells. This takes ' + spells[player.armedSpell].cost + ' magica to cast.',75,100,450,420);
        }
        if(player.armedSpell === 'lightning shield'){
            text('A shield of lightning which incinerates any projectile geting near you, resulting in the damage you take being reduced by ' + (player.lore/50)*100 + '%. this costs ' + spells[player.armedSpell].cost + ' magica.',58,100,490,420);
        }
        if(player.armedSpell === 'slow'){
            text('A ring of mystical mud which when released, divides the speed of any of your enemies which it hits by ' + ((player.lore/100)+1) + ' this costs ' + spells[player.armedSpell].cost + ' magica.',90,100,420,420);
        }
        textSize(25);
        text('(Use the arrow keys to scroll.)',300,415);
        
        
        {
        player.changeArmedSpellReload++;
        //changes which spell is armed
        if(keys[RIGHT] && player.changeArmedSpellReload > 30){
            player.armedSpellIndex = player.armedSpellIndex+1;
            player.changeArmedSpellReload = 0;
        }
        
        if(keys[LEFT] && player.changeArmedSpellReload > 30){
            player.armedSpellIndex = player.armedSpellIndex-1;
            player.changeArmedSpellReload = 0;
        }
        //looping the spell index
        if(player.armedSpellIndex > knownSpells.length-1){
            player.armedSpellIndex = 0;
        }
        if(player.armedSpellIndex < 0){
            player.armedSpellIndex = knownSpells.length-1;
        }
        }
    }
    
    //the attributes info and XP bar
    if(attributeInfoBarSize > 495){
        textAlign(CORNER,CORNER);
        textSize(60);
        //determining the color
        if(player.class === 'ranger'){
            fill(0, 200, 0);
        }
        if(player.class === 'mage'){
            fill(0, 0, 255);
        }
        if(player.class === 'warrior'){
            fill(255, 0, 0);
        }
        text('Your Attributes',65,220);
        textSize(30);
        text('Strength: ' + player.strength + '\nEndurance: ' + player.endurance + '\nSpeed: ' + player.baseSpeed + '\nLore: ' + player.lore,70,270);
        textAlign(RIGHT,TOP);
        text('Knowledge: ' + player.knowledge + '\nCharisma: ' + player.charisma + '\nAgility: ' + player.agility,520,210);
        
        //the XP bar
        noStroke();
        fill(150);
        rect(260,400,260,30,0);
        
        fill(0, 0, 230);
        rect(265,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.mageXp*2.5,20);
        fill(50, 50, 255);
        rect(265,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.mageXp*2.5,10);
    
    
        fill(0, 230, 0);
        rect(265+player.mageXp*2.5,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.rangerXp*2.5,20);
        fill(0, 255, 0);
        rect(265+player.mageXp*2.5,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.rangerXp*2.5,10);
    
        
        
        fill(230, 0, 0);
        rect(265+player.mageXp*2.5+player.rangerXp*2.5,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.warriorXp*2.5,20);
        fill(255, 0, 0);
        
        rect(265+player.mageXp*2.5+player.rangerXp*2.5,405,((player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp)*player.warriorXp*2.5,10);
        
        
        //text displaying hour XP level
        fill(0);
        textSize(20);
        
        text(player.mageXp+'%',285+(player.rangerXp+player.mageXp+player.warriorXp)/player.nextLevelXp*player.mageXp*2.5,385);
        
    }
    
    //closing it
    else if(keys[73] && scene === 'inventory' && openInventoryReload > 10){
        openInventoryReload = 0;
        transitionState = 'open';
        sceneTo = 'mainGame';
    }
    
    if(selected === 'coin'){
        image(coin,mouseX+25,mouseY+25,130,130);
        fill(0);
        textSize(28);
        textAlign(CENTER,CENTER);
        text(player.money,mouseX+5,mouseY+50);
    }
    else if(selected === 'supplies'){
        textAlign(CENTER,CENTER);
        textSize(40);
        text('🥙',mouseX,mouseY);
        fill(0);
        textSize(28);
        textAlign(CENTER,CENTER);
        text(player.supplies,mouseX+5,mouseY+50);
    }
    
    else if(selected !== ''){
        if(selected === 'saphireStaff'){
            pushMatrix();
                translate(mouseX,mouseY);
                rotate(-45);
                image(weapons[selected].image,0,0,130,130);
                
            popMatrix();
        }
        else if(selected === 'ironAxe'){
            pushMatrix();
                translate(mouseX,mouseY);
                image(weapons[selected].image,0,0,75,75);
                
            popMatrix();
        }
        else if(selected === 'cherryBow'){
            imageMode(CENTER);
            pushMatrix();
                translate(mouseX,mouseY);
                rotate(45);
                image(cherryBow,0,0,84,84);
                image(cherryBowBase,0,0,84,84);
                
            popMatrix();
            strokeWeight(0.5);
            stroke(255);
            line(mouseX+16,mouseY-31,mouseX-33,mouseY+20);
        }
        else{
            pushMatrix();
                translate(mouseX,mouseY);
                rotate(45);
                image(weapons[selected].image,0,0,100,100);
                
            popMatrix();
        }
    }
    
    
    player.armedSpell = knownSpells[player.armedSpellIndex];
    
};




draw = function() {
    if(player.health <= 0){
        Program.restart();
    }
    openInventoryReload++;
    
    if(insideHouseVar === '' && levelUpBarSize < 400 && scene === 'mainGame'){
        mainGame(inventory);
        if(time === 'night'){
            fill(0,100);
            rect(-20,-20,640,640);
        }
    }
    if(scene === 'travelScene'){
        travelScene();
    }
    //for when you are inside
    if(insideHouseVar !== ''){
        insideHouse();
    }
    //for when your inventory is open
    if(scene === 'inventory'){
        inventoryScene();
    }
    //this needs to be in the draw function
    if(levelUpBarSize > 10){
        openLevelUpBar();
    }
    //closing the level up bar
    if(closeLevelUpBar === false){
        levelUpBarSize = lerp(levelUpBarSize,500,0.1);
    }
    if(closeLevelUpBar === true){
        levelUpBarOpen = false;
        levelUpBarSize = lerp(levelUpBarSize,0,0.1);
    }
    
    if(scene === 1){menu1();}
    if(scene === 2){menu2();}
    if(scene === 3){menu3();}
    if(scene === 4){menu4();}
    if(scene === 5){test1();}
    if(scene === 6){test2();}
    if(scene === 7){test3();}
    if(scene === 8){test4();}
    if(scene === 9){test5();}
    if(scene === 10){test6();}
    if(scene === 11){test7();}
    if(scene === 12){test8();}
    if(scene === 13){test9();}
    if(scene === 14){test10();}
    
    if(transitionState === 'open'){
        openTransition(setupLocation,player);
    }
    if(transitionState === 'close'){
        closeTransition();
        resting = false;
    }
    
    
};

var keyPressed = function(){
    keys[keyCode] = true;
    
};
var keyReleased = function(){
    keys[keyCode] = false;
    if(scene === 'mainGame' && keyCode === 84){
        player.openTravel();
    }
    else if(keyCode === 84 && scene === 'travelScene'){
        sceneTo = 'mainGame';
        transitionState = 'open';
    }
    //exit talking or the reading of a sign
    if(keyCode === 32 && talkBarY < 520 && talking === true){
        talking = false;
    }
    
    player.rest(setupLocation);
};

mouseClicked = function() {
    if(b1.mouseOn() && scene === 1){
        sceneTo = 5;
        transitionState = 'open';
    }
    if(b2.mouseOn() && scene === 1){
        transitionState = 'open';
        sceneTo = 4;
        b5.y = 750;
        
    }
    if(b3.mouseOn() && scene === 1){
        transitionState = 'open';
        sceneTo = 3;
        b5.y = 750;
        
    }
    if(b4.mouseOn() && scene === 1){
        transitionState = 'open';
        sceneTo = 2;
        b5.y = 750;
        
    }
    if(b5.mouseOn() && (scene === 2 || scene === 3 || scene === 4)){
        
        transitionState = 'open';
        sceneTo = 1;
        b1.x = -200;
        b2.x = 800;
        b3.x = -200;
        b4.x = 800;
    }
    if((bt1.mouseOn() || bt2.mouseOn() || bt3.mouseOn()) && scene === 5){
        if(bt1.mouseOn()){
            ranger++;
        }
        else if(bt2.mouseOn()){
            warrior++;
        }
        else if(bt3.mouseOn()){
            mage++;
        }
        transitionState = 'open';
        sceneTo = 6;
        
    }
    else if((bt11.mouseOn() || bt12.mouseOn() || bt13.mouseOn())&& scene === 6){
        if(bt12.mouseOn()){
            ranger++;
        }
        else if(bt11.mouseOn()){
            warrior++;
        }
        else if(bt13.mouseOn()){
            mage++;
        }
        transitionState = 'open';
        sceneTo = 7;
        
    }
    else if((bt21.mouseOn() || bt22.mouseOn() || bt23.mouseOn()) && scene === 7){
        if(bt21.mouseOn()){
            mage++;
        }
        else if(bt22.mouseOn()){
            ranger++;
        }
        else if(bt23.mouseOn()){
            warrior++;
        }
        transitionState = 'open';
        sceneTo = 8;
        
    }
    
    else if((bt31.mouseOn() || bt32.mouseOn() || bt33.mouseOn())&& scene === 8){
        transitionState = 'open';
        sceneTo = 9;
        if(bt31.mouseOn()){
            warrior++;
        }
        else if(bt32.mouseOn()){
            ranger++;
        }
        else if(bt33.mouseOn()){
            mage++;
        }
    }
    else if((bt41.mouseOn() || bt42.mouseOn() || bt43.mouseOn())&& scene === 9){
        transitionState = 'open';
        sceneTo = 10;
        if(bt41.mouseOn()){
            mage++;
        }
        else if(bt43.mouseOn()){
            ranger++;
        }
        else if(bt42.mouseOn()){
            warrior++;
        }
    }
    else if((bt51.mouseOn() || bt52.mouseOn() || bt53.mouseOn())&& scene === 10){
        transitionState = 'open';
        sceneTo = 11;
        if(bt52.mouseOn()){
            ranger++;
        }
        else if(bt51.mouseOn()){
            mage++;
        }
        else if(bt53.mouseOn()){
            warrior++;
        }
    }
    else if((bt61.mouseOn() || bt62.mouseOn() || bt63.mouseOn())&& scene === 11){
        transitionState = 'open';
        sceneTo = 12;
        if(bt62.mouseOn()){
            ranger++;
        }
        else if(bt63.mouseOn()){
            mage++;
        }
        else if(bt61.mouseOn()){
            warrior++;
        }
    }
    else if((bt71.mouseOn() || bt72.mouseOn() || bt73.mouseOn())&& scene === 12){
        transitionState = 'open';
        sceneTo = 13;
        if(bt72.mouseOn()){
            warrior++;
        }
        else if(bt71.mouseOn()){
            ranger++;
        }
        else if(bt73.mouseOn()){
            mage++;
        }
    }
    else if((bt81.mouseOn() || bt82.mouseOn() || bt83.mouseOn())&& scene === 13){
        transitionState = 'open';
        sceneTo = 14;
        if(bt83.mouseOn()){
            ranger++;
        }
        else if(bt82.mouseOn()){
            warrior++;
        }
        else if(bt81.mouseOn()){
            mage++;
        }
    }
    
    else if(enterGame.mouseOn() && scene === 14){
        sceneTo = 'mainGame';
        transitionState = 'open';
        if(chosen === 'mage'){
            player.class = 'mage';
            player.money = 100;
            player.supplies = 100;
            player.agility = 15;
            player.baseSpeed = 20;
            player.strength = 10;
            player.endurance = 15;
            player.lore = 25;
            player.knowledge = 30;
            inventory[0] = 'goldDagger';
            inventory[1] = 'saphireStaff';
            inventory[2] = 'coin';
            inventory[3] = 'supplies';
            
            
            knownSpells = ['fireball','heal','hasten','ice bolt','fire shield','berserk','anti-magic','lightning shield','slow'];
            player.health = (player.endurance*player.strength)/4;
            player.stamina = player.endurance*10;
            player.magica = player.knowledge*5;
            
            
        }
        if(chosen === 'ranger'){
            player.class = 'ranger';
            player.money = 40;
            player.supplies = 120;
            player.agility = 25;
            player.baseSpeed = 30;
            player.strength = 15;
            player.endurance = 15;
            player.lore = 15;
            player.knowledge = 15;
            inventory[0] = 'cherryBow';
            inventory[1] = 'ironDagger';
            inventory[2] = 'coin';
            inventory[3] = 'supplies';
            inventory[4] = 'ironSword';
            
            knownSpells = ['hasten','slow'];
            player.health = (player.endurance*player.strength)/4;
            player.stamina = player.endurance*10;
            player.magica = player.knowledge*5;
            
            
        }
        if(chosen === 'warrior'){
            player.class = 'warrior';
            player.money = 50;
            player.supplies = 100;
            player.agility = 15;
            player.baseSpeed = 25;
            player.strength = 30;
            player.endurance = 25;
            player.lore = 17;
            player.knowledge = 3;
            inventory[0] = 'ironAxe';
            inventory[1] = 'ironSword';
            inventory[2] = 'coin';
            inventory[3] = 'supplies';
            inventory[4] = 'bronzeDagger';
            
            knownSpells = ['berserk'];
            
            player.health = (player.endurance*player.strength)/4;
            player.stamina = player.endurance*10;
            player.magica = player.knowledge*5;
            
            
        }
        for(var i = 0; i < inventory.length; i++){
            var y = floor(i/2);
            var x = (i*90) - y*180;
            
            inventorySlots.push(new inventorySlot(385+x,(y*105)+100,'backpack',inventory[i]));
        }
        setupLocation();
    }
    
    if(levelUpBarOpen === true && levelUpBarSize > 499){
        closeLevelUpBar = true;
        //reducing your experiance levels to zero
        player.mageXp = 0;
        player.warriorXp = 0;
        player.rangerXp = 0;
        player.nextLevelXp*=1.2;
    }
    if (scene === 'inventory') {
        inventoryClickEvents();
    }
    else if(scene === 'travelScene' && toggleNode.mouseOn()){
        if(showIcons === true){
            showIcons = false;
        }
        else{
            showIcons = true;
        }
    }
};

//ranged attacks go here
mouseReleased = function() {
    //adding new bullets which may or may not be invisible
    if(weapons[player.armedWeapon].type === 'ranged' && player.reload >= weapons[player.armedWeapon].reload && mouseButton === LEFT && talking === false){
        //player.reload = 0;
        bullets.push(new bullet(player.x,player.y,weapons[player.armedWeapon].damage*player.agility/45,10,player.rot-90,'',weapons[player.armedWeapon].reach,weapons[player.armedWeapon].pushBack,'iron arrow',5,5));
        
    }
};
