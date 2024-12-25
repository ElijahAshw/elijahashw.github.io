const GAME_LEVELS = [`
########################
####................####
###..................###
##....................##
#......................#
#......................#
#......................#
#..........@...........#
#......................#
#..........##..........#
#..........##..........#
#..........##..........#
#....##############....#
#....#.....##.....#....#
#.n..#.....##.....#..n.#
########################
########################`,
`
########################
#####................###
###..................@.#
#......................#
#......................#
#......................#
#.n....................#
##############^^^^######
#####........######..###
###...........####...@.#
#......................#
#......................#
#......................#
#.n....................#
######....##############
######....##############
######....##############`,
`
########################
#..........#.#.#.......#
#.....@................#
#......................#
#.....##...............#
#......................#
###................#####
#................n.#####
###########^^^^^########
#@........#######......#
#......................#
###....................#
#......................#
#....###...............#
#....................n.#
###########.....########
###########.....########`,
`
########################
###.###..............!.#
##...##................#
#.....#..............###
##...##......##..##....#
###.###................#
##########.............#
#.......!..............#
#.n.n.n................#
############...#######.#
#####..#####...#.....#.#
###......###...#.....#.#
#..........#...#..#..###
###......###......#..!.#
#####..#####......#....#
########################
########################`,
`
########################
#####...............##.#
####.........n....@.#..#
###..........n......##.#
##.........#############
#...................####
#......##............###
#.....................##
#......................#
#......#####...........#
#......#.#.#...........#
#......#.#.#...........#
#......#####...........#
#......#!.........###..#
#......#......n.n......#
#......#################
#......#################`,
`
########################
#>.........@..........<#
#>....................<#
#>.....##########.....<#
#>....................<#
#>.##..............##.<#
#>....................<#
#>.....##......##.....<#
#>....................<#
#>.........##.........<#
#>....................<#
#>....................<#
###########..###########
#......................#
#..n................r..#
########################
########################`,
`
########################
##..##@...........##..##
#....#............#....#
#....###..........#....#
#.##.#............#.##.#
#.#..#............#..#.#
#.#..#...##.......#..#.#
#.#..#............#..#.#
#.#..#............#..#.#
#.#..#......###...#..#.#
#.#..#.......#....#..#.#
#.##.#.......#^^^^#.##.#
#....#.......######....#
#....#.......#..!.#....#
##..###.n.r.......##..##
########################
########################`,
`
########################
#..#####........#####..#
#..####....@.....####..#
#..###............###..#
######............###..#
#!.###............###..#
#..###............######
#..#.#............#.#!.#
#..###............###..#
#......................#
#......................#
#...#..............#####
#...#..n........n..#...#
#...#..#........#..#.#.#
#####......N.......#...#
########################
########################`,
`
########################
#..@..............#....#
#.................##...#
#..................##..#
#.g.................##.#
#######..............###
#.#.#.###..............#
#.#.#.#......###.......#
#.#.#.########.........#
#.#.#............#.....#
#.#....................#
#......................#
#..................##..#
#....................!.#
#.....n.#...#...#......#
########################
########################`,
`
########################
#.###.##...##...##...@.#
#..#..#....#....#......#
#.....#....#....#......#
#.....#g...#....#......#
#.....#g...#g...#......#
#.....##...##...##.....#
#..n...................#
#######..###..###..##..#
#...#.#..#.#..#.#..#...#
#.#.#!...#!...#!...#...#
#...#....#....#....#^^^#
########################
#...#....#....#....#...#
#......................#
########################
########################`,
`
########################
####.................@.#
###....................#
##........#............#
#.........#............#
#.......=.#..........=.#
#.........#............#
#.........#............#
#......=..#........=...#
#.........#............#
#.........#............#
#.g...=...#......=.....#
####......#............#
#.........#............#
#^^^^=^^^^#^^^^=^^^^^^^#
########################
########################`,
`
########################
#@....#................#
#.....#................#
####..#...#............#
####......#............#
#!........#............#
#...n.....#.=....##....#
###########....=.......#
#.......#..............#
#.......#.............=#
#.......#.g............#
#.......####.....##....#
#...................=..#
#............=.........#
#^^^^^^^^^^^^^^^^^^^^^^#
########################
########################`,
`
########################
#.#.#.....#...#...#....#
#####................@.#
#......................#
#....................###
#......................#
#.r....................#
#######^^^#^^^#^^^#^^^^#
########################
#......................#
#@.....................#
#....................g.#
####...............#####
###..................###
##....................##
#....=...=...=...=.....#
#......................#`,
`
########################
#....................@.#
#......................#
#....................###
#.....................##
#......................#
#.y.............##.....#
######^^^^##^^^^##^^^^^#
#...####################
#.#.##########@........#
#...##########.........#
#####vvvvvvvv###.......#
#......................#
#......................#
#.n...............##^^^#
########################
########################`,
`
########################
###.#######@.#######.###
###.###vvvv..vvvv###.###
###.###..........###.###
##...##.n........##...##
##.#.##############.#.##
##.#.######@.######.#.##
#..#..#vvvv..vvvv#..#..#
#..#..#..........#..#..#
##.#.##.r........##.#.##
##.#.##############.#.##
##...##########@.##...##
###.###vvvvvvvv..###.###
###.###..........###.###
###.###........y.###.###
########################
########################`,
`
########################
#......................#
#......................#
#....#....@.....#......#
#....#..........#......#
#....############......#
#.....#.............y..#
#.....#............##..#
#.#####........#.......#
#.#!...........#########
#.#............#.......#
#.#####........#.......#
#.....#..n.y...######..#
#.....#..###......!.#.##
###...#.............####
########################
########################`,
`
########################
#......................#
#.y..................y.#
#####..............#####
#......................#
#......................#
#......................#
#.........####.........#
#.........#@.#.........#
#.......!.#..#!........#
#.........#..#.........#
#.....#####..#####.....#
#.....#..........#.....#
#.....#....N.....#.....#
###.+.#^^^####^^^#.+.###
########################
########################`,
`
########################
#>....................<#
#>....................<#
#>.........@..........<#
#>....................<#
#>....................<#
#>....................<#
#>.........y..........<#
########################
#......................#
#@.....................#
#...+................g.#
#####...............####
#.#..................#.#
#.#..................#.#
#.#...=...=...=...=..#.#
#.#..................#.#`,
`
########################
#..................#####
#.y.................####
#####.....#..........###
#####.....####........##
##@..........#.........#
##.....r.....#.........#
##^^#######^^#.........#
#####.....####.........#
#......................#
#......................#
#.....###.......###....#
#.....###.......###....#
#.....##>.....@.<##....#
#.+..###>...r...<##....#
###################....#
###################....#`,
`
########################
#vvvvvv#...@....#vvvvvv#
#......#.#....#.#......#
#......#.u....u.#......#
#......#........#......#
#......#........#......#
#......#........#......#
#.....##........##.....#
#......................#
#......................#
###..................###
#+....................+#
#......................#
#^^^^^^^^^^^^^^^^^^^^^^#
########################
########################
########################`,
`
########################
#....@.#...............#
#......#...............#
#..#####............#..#
#..#...#............#..#
#..#.+.#.......######..#
#..#...#..........u.#..#
#..#...#............#..#
#..#............#...#..#
#..#.r..........#...#..#
#..######.......#.+.#..#
#..#............#...#..#
#..#............#####..#
#...............#@.....#
#...............#......#
########################
########################`,
`
########################
#......................#
#......................#
#...............#......#
#............g..#......#
#@.#...##########......#
#..#...................#
#N.#...................#
############...........#
#..vvvvvvvv#...........#
#@.........#.........!.#
#......n..+#....#......#
########################
#.#.#.#.#.#.#.#.#.#.#.##
#.#.#.#.#.#.#.#.#.#.#.##
########################
########################`,
`
########################
#......................#
#......................#
#.....####..####.......#
#.....vv+....+vv.......#
#......................#
#.........##...........#
#......................#
#......................#
#.....####..####.......#
#.....vv+....+vv....####
#...................#vv#
#.........##........#@.#
#...!.....uu....!...#..#
#...................#N.#
########################
########################`,
`
########################
#...vvvvvvvvvvvvvvvv.@.#
#.n....................#
####...................#
#.u..................+.#
#...^^^^^^^^^^^^^^^^...#
########################
#>.........@..........<#
#>.........Y..........<#
########################
#...vvvvvvvvvvvvvvvv...#
#.+..................n.#
#...................####
#@...................u.#
#...^^^^^^^^^^^^^^^^...#
########################
########################`,
`
########################
#####......++......#####
####................####
###..................###
##....................##
#......................#
#......................#
#......................#
#......................#
#..........##..........#
#....................@.#
#......................#
#...............########
#.....................+#
#..n....s..............#
########################
########################`,
`
########################
##@......####......#####
##........!.........####
##...................###
##....................##
#......................#
#......................#
#......................#
#############..........#
#..#........######.....#
#..#...................#
####...................#
#...................##.#
#......................#
#..nS.s................#
########################
########################`,
`
########################
#...........#..........#
#...........#..........#
#...........#..........#
#...........#..........#
#...........#..........#
#.....#.....#.....#....#
#.....#.....#.....#....#
#.....#.....#.....#....#
#.....#.....#.....#....#
#.....#...........#....#
#.....#...........#....#
#.....#...........#....#
#.....#...........#.@..#
#..w..#...........#....#
########################
########################`,
`
########################
#.u..#~~#~~~#~~~~~~~~~~#
#....#~~#~~~#~~~~~~~~~~#
#.......#~~~#~~~~~~~~~~#
#...........#~~~~~~~~~~#
#......................#
#..n...................#
####.................@.#
####...................#
#..u...................#
#......................#
#...........#~~~~~~~~~~#
#.......#~~~#~~~~~~~~~~#
#....#~~#~~~#~~~~~~~~~~#
#.n..#~~#~~~#~~~~~~~~~~#
########################
########################`,
`
########################
#...0...#+.1...#+++++++#
#.......#####..#+++++++#
#.......#......#+++++++#
#.......#@.....#.......#
#...#...#..S...#.......#
#1#4#3#2###><#.#.......#
###########><#.#......n#
#.....#3########2.....##
#.+.s.#.####4..#########
#.###.#.######.#vvvvvvv#
#.......######.#.......#
#.....@.######.#.......#
#.......#@.###.#.......#
#..n..###...+..#N.....0#
##################...###
##################...###`,
`
########################
####################...#
##..###############....#
#....##...####........+#
#....#.....##........@.#
#....#.....#....^......#
#.......^..#...^########
#...Y..<#>....<#v....@.#
#....##########v....+..#
#.....vvvvvvvvv...^#####
#...N............<##...#
#....#...........<##y#.#
#....#################.#
#....#vvvvvvvvvvv!.#>@.#
##.g...............#>..#
########################
########################`,
`
########################
#########y.#..#..#..####
###yyyy##y.#..#y.#y.#G<#
###yyyy##y.#..#y.#y.#.##
###yyyy###.##.##.##.#..#
##0yyyy###.##.##.##.##.#
##.###..#..#..#..#..#..#
##.0###.#.##.##.##.##.##
##..##..4..5..6..7....^#
##..##.#4##5##6##7######
##..##3#g##g##.##.##>3<#
##..####g##g##g##g##>.<#
##..#12#1##2##1##2##^.^#
##@.#@.##############+##
##..#..#..#..#..#..#^1^#
########################
########################`,
`
########################
#......................#
#...@..................#
#......................#
#......................#
#..9...............9...#
#..8..............8....#
#..7.............7.....#
#..6............6......#
#..5...........5.......#
#..4..........4........#
#..3.........3.........#
#..2........2..........#
#..1.......1...........#
#n.0......0............#
########################`,
`
####
#n.#
#..#
#..#
#@.#
#..#
####`,
`
####
#r.#
#..#
#..#
#@.#
#..#
####`,
`
####
#y.#
#..#
#..#
#@.#
#..#
####`,
`
####
#g.#
#..#
#..#
#@.#
#..#
####`,
`
####
#s.#
#..#
#..#
#@.#
#..#
####`,
`
####
#@.#
#..#
#..#
#..#
#u.#
####`,
`
####
#nn#
#..#
#..#
#@.#
#..#
#..#
#..#
#uu#
####`];

const END_LEVEL = `
########################
#......................#
#......................#
#......................#
########################
###.u..u..u..u..u..u.###
#+....................+#
#......................#
#+...##...#..#...##...+#
#....@....#@.#...@.....#
#.........#..#.........#
#+...##...#..#...##...+#
#......................#
#+....................+#
###.n..n..n..n..n..n.###
########################
########################`;

const MENU_LEVEL = `
########################
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
#......................#
########################`;