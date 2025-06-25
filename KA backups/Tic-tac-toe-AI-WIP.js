/** Off-menu user adjustable setting **/
var computerMoveMillisecondDelay = 100;
// Rules for each game are found below, starting on line 43.
// If you play a game where one player can always win, then you may
// be able to beat the computer. This is intentional, not a bug.

// == Key controls ==
// Press "p" to print the number of boards the AI has looked at.
// Pressing "D" will (attempt) to print the AI's data.
// Pressing "i" (while learning) will print the current place in the AI's data.
// Press "g" to print the game state.

/* =============== For the judges =============== */
/**
                                        
                          Contest: AI
                                
             I have completed 100% of Khan Academy's
            'Intro to JS' and have been programming
                         for ~70 months.
                                
               I would prefer to be placed in the
                           Advanced
                            bracket
                                
        In creating this entry, I focused on using clear, well defined 
        functions and clean, well commented code. This helped me handle 
            the challenging concepts of this program.
                                
  One aspect I found challenging was iterating through a pseudo-array of 
            unknown dimensions with a single loop.
                                
                   I would like to highlight
        That my machine learning method can handle new games
          that it has never seen before, without needing 
            anything other than the game definition.
                        for the judges.
                                
                                
        TODO:
        - Fill out statements above ✓
        - Save your entry as a spin-off of this program ✓
        - Have fun! ✓

**///

/* =============== GAME RULES =============== */
/**
 * ==== Tic-tac-toe is a classic game that is played on a 3x3 board.
 * Players take turns placing their symbol (X or O) in any open square.
 * First to get three in a row wins. X goes first.
 * If the board fills up without a victor, it is a tie.
 * 
 * ==== Hexapawn is also played on a 3x3 board. Each player starts
 * the game with three chess pawns on each side of the board.
 * Players take turns moving their pawns like ordinary chess pawns.
 *  a. One step straight forward onto an empty square, OR
 *  b. One step diagonally forward onto an enemy pawn, which gets eliminated.
 * You win if one of these is true:
 *  1. You get a pawn to the other side of the board
 *  2. The other player has no moves left (this includes having no pieces).
 * 
 * I learned about hexapawn (and the basic concept for 
 * the method of machine learning that I use in this program) 
 * from a youtube video (I forgot which).
 * Here is another source for the same thing:
 * https://www.instructables.com/Matchbox-Mini-Chess-Learning-Machine/
 * 
 * ==== 4x3 Connect three is a varient on the classic game connect four.
 * Players take turns "dropping" their piece into a column with at least
 * one empty square. The piece falls down to the lowest empty square.
 * The first player to achieve three in a row wins. The board is 4x3.
 * 
 * ==== Three Men's morris I learned about from Google Gemini.
 * It is played on a 3x3 board, and you win by getting three in a row.
 * Once all 6 pieces have been placed like in tic-tac-toe (three each),
 * players take turns moving one piece to an adjacent square.
 * 
**///

/* =============== How the machine learning works =============== */
/**
 * This program currently relies on the game being simple enough that
 * all possible outcomes can be analyzed. 
 * Even so, it has been tricky to implement.
 * 
 * The program's data is an object containing all of the 
 * possible configurations. The program analyzes every possible move,
 * and labels each move as "first player can win", 
 * "second player can win", "uncertain", or "absolute tie".
 * 
 * Once the data has been created, it is time to train/analyze the data.
 * One loop is used, and it runs a set number of iterations per frame.
 * If it finds that the player whose turn it is can win, it sets the canWin 
 * property on the previous move to that player, to show that they can force
 * a win.
 * If all possible moves for the current player have a canWin property 
 * that is equal to the other player, then it sets canWin on the previous move
 * to that other player. (This is likely the case if the other player just 
 * created a fork in tic-tac-toe.)
 * Or, similar to the first case, if at least one move choice leads to the 
 * current player winning (canWin property again), then the result is the same
 * as in the first situation (canWin for the previous move is set 
 * to that player).
 * 
 * This program learns how to play the game via brute force analysis. 
 * And it works well! In tic-tac-toe it played forks I didn't even know about.
 * It does not keep any game specific code outside of the game definitions.
 * 
 * Tic-tac-toe can be easily brute forced if caching is implemented, 
 * since there are only 5478 reachable boards.
 * 
 * When the computer moves, it randomly chooses a move where 
 * the computer can force a win.
 * If that is not possible, it randomly chooses a move with an unsure 
 * outcome (which means the game will end in 
 * a tie if both players play perfectly).
 *     This means that the computer chooses a random move if it 
 * cannot guarantee a victory. It does not seek to fork you if 
 * it cannot force it. This move variation makes the game more fun.
 *     If there are no unsure moves, the computer chooses one that will 
 * end in a tie.
 *     If the computer cannot avoid it, then it chooses a move that lets 
 * the opponent win, to avoid not moving at all. For example, hexapawn 
 * is a second player victory, if both players play perfectly.
 * 
**///

/* =============== Program pseudocode =============== */
/**
 * I wrote most of the pseudocode before writing the actual code,
 * to help me stay organized and handle the difficult concepts.
 * 
 * =============== Definition of types ===============
 * 
 * I will indicate types in my examples in the style of Java types.
 * 
 * A "Turn" is a string, either "player1" or "player2"
 *  Turn supports the Turn.next(Turn turn) operation
 * An "Owner" is a string, one of "none", "player1", "player2", or "tie"
 * A "PlayerType" is a string, either "human" or "computer"
 * Here are the pseudo-enums:
    var Turn = {player1: "player1", player2: "player2"};
    var Owner = {none: "none", player1: "player1", player2: "player2"};
    var PlayerTypes = {human: "human", computer: "computer"};
 * 
 * A Board is a 1d array of all the squares on the board:
    Board board = [ Owner topLeft,    Owner topCenter,    Owner topRight,
                   Owner centerLeft, Owner centerCenter, Owner centerRight,
                   Owner bottomLeft, Owner bottomCenter, Owner bottomRight ];
 * 
 * A Move is a one or two element array:
    Move onePartMove = [4]; // Tic-tac-toe uses one part moves.
    Move twoPartMove = [3, 6]; // Chess and hexapawn use two part moves.
 * 
 * GameStates are used to store the current state of the game.
 * A GameState is an object with the following properties:
    GameState gameState = {
        Turn turn: <The current turn>,
        Owner won: <Which player has won the game>,
        Board board: <The current board>,
        Move[] moves: <A list of all moves made so far in the game.
            In games with two-part moves, the last Move in the array 
            may be incomplete>,
        GameDefinition game: <The GameDefinition for the game being played>
    };
 * 
 * A MenuState is an object with the following properties:
 * MenuStates are used to store the state of the home screen menu, along 
 * with whether the home screen is being displayed.
    MenuState menuState = {
        boolean player1IsComputer: <Whether the first player is played by AI>,
        boolean player2IsComputer: <Whether the second player is played by AI>,
        boolean menuDisplayed: <Whether the menu screen is being shown>,
        String gameSelected: <A string naming the chosen game>,
        Object<String,GameDefinition> games: <An object mapping names to games>,
        void initGame(): <A function to initialize things dependent on
            gameBeingPlayed> // It's helpful to store this in the menuState
    };
 * 
 * A Color is just a color value from the color() function.
 * 
 * A Square is named by an int.
 * 
 * A GameDefinition is an object with the following properties:
    GameDefinition gameDefinition = {
        gamePlay: {
            boardColumns: 3, // The columns in the game's board
            boardRows: 3, // The rows in the game's board
                // For example, 3 for Tic-tac-toe
            int maxDepth: 9, // How many moves ahead to look;
                // This feature is not fully working; it may cause unexpected
                // results. Fixing it would require adding a board grading
                // function, and I do not want to do that at this point.
            
            Owner hasWon(Board board, Turn turn, Move[] moves) { 
                Return an Owner indicating who has won the input board.
            },
            
            Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
                Return an array of Moves representing all legal moves 
                for the specified player starting with partialMove.
                Returns an empty array if the specified player should never 
                play on this board.
                Ideally also returns an empty array if the board has been won,
                but this function should never be called on a won board.
            },
            
            Board playMove(Board board, Move move, Turn turn) {
                Return a Board with the result of playing the input Move 
                on the input Board for the specified player. Return the 
                unchanged input Board if the Move is illegal.
            },
            
            boolean isLegalMove(Board board, Move move, Turn turn) {
                Return a boolean indicating whether the input move is legal.
                Should return true if given a currently valid partial move.
                E.g. [3] when the game is a two-move game.
            },
            
            boolean isCompleteMove(Board board, Move move, Turn turn) {
                Return whether the input Move is a complete Move.
            },
            
            Board createBoard() {
                Return a new game board for the game. MUST NOT BE RANDOM!
            },
        },
        GUIConfig: {
            void drawPiece(Owner pieceType, 
                    double x, double y, double w, double h) {
                Draw the piece indicated by pieceType at the specified x and y.
                The input x and y are the center of the square.
            },
            
            void drawWin(Board board, Turn won, double[][] squarePositions) {
                Draws an (optional) indication of which player won. 
                For example, a line in Tic-tac-toe.
                squarePositions is an array of two-element arrays, each the 
                center of the square on the board corrisponding the board array.
            },
            
            // The filled out number indicates the default value
            double nameSize: width / 15, 
                // The font size of the game's name on the menu
            
            Color squareColor: color(128, 128, 128), // The square color
            Color hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
            double squareSize: width / 3, // The rendered size of board squares
            
            // Dots are only drawn for two-part moves
            Color dotColor: color(100, 100, 100, 100),
            double dotDiameter: squareSize / 4,
        }
    };
 * 
**///
/**
 * =========== AIData description and class functions ===========
 * 
 * After training is finished, the final data is in this format:
    AIData data = {
        <Board.toString()>: {
            board: <Board>,
            won: <Owner>,
            player1: [
                {move: <Move>, canWin: <Owner>, result: <Board>},
                ...
            ],
            player2: [
                {move: <Move>, canWin: <Owner>, result: <Board>},
                ...
            ],
            visitId: <int>
        },
        // Filled out example for hexapawn:
        "player1,player1,player1,none,none,none,player2,player2,player2": {
            board: ["player1","player1","player1","none","none",
                "none","player2","player2","player2"],
            player1: [
                {move:[0,3], canWin: "player2",
                    "result: ["none","player1","player1","player1",
                        "none","none","player2","player2","player2"]},
                {move:[1,4], canWin: "player2",
                    result: ["player1","none","player1","none",
                        "player1","none","player2","player2","player2"]},
                {move:[2,5], canWin: "player2",
                    result: ["player1","player1","none","none",
                        "none","player1","player2","player2","player2"]}
            ],
            "player2: [],
            visitId: 1
        },
        ...
    };
 * If canWin is a Turn, that means that player can force a win if that move 
 * is played. If canWin = Owner.tie, then there is no way to avoid a draw
 * if that move is played.
 * 
 * The class GameAI is the heart of my program. It has the following properties:
    class GameAI {
        Internally stores:
            GameDefinition.gamePlay gamePlay,
            AIData aiData,
            Iterator trainingIterator,
            Iterator createDataIterator,
            Board initialBoard, // Helps access to the top of the AI game tree
            int maxDepth,
            int iterationsPerFrame, // Iterations per frame
            int visitId, // An id for each training iteration
            boolean trained, // Whether the AIData has been fully trained
            boolean dataComplete, // Whether the AIData is filled out
            boolean learnWhilePlaying
            
        GameAI constructor(
            GameDefinition.gamePlay gamePlay, boolean learnWhilePlaying) {
            Returns a new AI object.
        }
        
        Object continueTraining() {
            Simple interface for creating and training the AI.
            Returns an object with these properties: 
                {boolean training, Object<Turn,int>[]indexes}.
        }
        
        Move getAIBestMove(GameState gameState) {
            Returns the best move for the current player 
            according to this.AIData
        }
        
        void playAIBestMove(GameState gameState) {
            Plays the best move for the current player 
            according to this.AIData
        }
        
        Iterator expandAIDataFrom(GameState gameState) {
            Adds to this.AIData to meet the maxDepth config property
            based on the input state.
            Sets this.trained to false if this.AIData was added to.
        }
        
        Iterator trainAIFrom(GameState gameState (optional) ) {
            Train the new parts of this.AIData that were added by 
            this.getAIBestMove()
            This is where the learning happens.
            Returns an iterator to avoid freezing the page.
            If gameState is omitted, this method will start training at the top.
            Training consists of 
                1. Flagging moves that permit the opponent to win
                    (this is calculated for both players).
                2. Calculating how many sub-moves lead to draws.
        }
        
        boolean isReady() {
            Return whether this.AIData is ready to use.
        }
    }
 * 
 * The class GUI has the following properties:
    class GUI {
        Internally stores:
            GameDefinition.GUIConfig config,
            GameDefinition.gamePlay gamePlay
        
        GUI constructor(GameDefinition.GUIConfig config, 
                GameDefinition.gamePlay gamePlay) {
            Returns a new GUI instance. If not given parameters, call the init
            method with the missing parameters before 
            using game-specific functions.
        }
        
        void init(GameDefinition.GUIConfig config, 
                GameDefinition.gamePlay gamePlay) {
            Initializes the instance with the given config and gamePlay.
        }
        
        void renderGame(GameState gameState, 
                int mouseX, int mouseY) {
            Renders a game using the gameState and original GUIConfig.
            Does not draw hover if mouseX or mouseY are undefined.
        }
        
        void drawWinOverlay(GameState gameState) {
            Draws a semi-transparent overlay indicating who won and
            how to play again.
        }
        
        void drawLearningScreen(double phase) {
            Draws a loading screen based on the phase argument.
        }
        
        void drawMenu(MenuState menuState, int mouseX, int mouseY) {
            Draws the menu screen with buttons based on the input MenuState,
            mouseX, and mouseY.
            Does not draw hover if mouseX or mouseY are undefined.
        }
        
        boolean drawToggle(boolean on, double x, double y, double w, double h,
                Color c) {
            Draws a toggle based on the input boolean "on" and x, y, w, h,
            mouseX, and mouseY (last two for hover effect).
            Returns whether the mouse is over the toggle.
        }
        
        boolean toggleHover(double x, double y, double w, double h,
                Color c, int mouseX, int mouseY) {
            Returns whether the mouse is over the toggle.
        }
        
        void humanPlayClick(GameState gameState, int mouseX, int mouseY) {
            Handles a mouse click for an in-progress game on a human's turn
        }
        
        void menuClick(GameState gameState, int mouseX, int mouseY) {
            Handles a mouse click for the menu.
        }
        
        int squareClicked(GameState gameState, int mouseX, int mouseY) {
            Returns the index of the square that was clicked.
        }
    }
 * 
 * Yay, we're done! Onto the code!
**///

/** "Enums" **/
var Turn = {player1: "player1", player2: "player2", 
    next: function(turn) {
        return turn === "player2"? "player1" : "player2";
    }
}; // I have firmly assumed that there are only two players
var Owner = {none: "none", player1: "player1", player2: "player2", tie: "tie"};
var PlayerTypes = {human: "human", computer: "computer"};

/** LongRunning library. Helps break up long running operations. **/
/* Usage example: */
/*
var slowFunc = LongRunning(function() {
    for (var i = 0; i < 1000 * 1000; i++) {
        println(floor(random(1, 100)));
        if (i % 1000 === 0) {
            LongRunning.pause();
        }
    }
}); 

var slowFuncIterator = slowFunc();

draw = function() {
    var value = slowFuncIterator.next();
    if (value.done) { noLoop(); }
}; */
var LongRunning = (function() {
    // Copied from Bob lyon's DeKhan library
    // https://www.khanacademy.org/computer-programming/dekhan-the-code/5149916573286400
    var wasFrameCount = frameCount;
    frameCount = function() {
        frameCount = wasFrameCount;
        return this;
    };
    var globalThis = frameCount();
    
    // RegExps
    var functionStart = /^function\s*\(/;
    var KAInfiniteLoop = (
        /\n +__env__\.KAInfiniteLoopCount[^]+?KAInfiniteLoopProtect.+\n.+\n.+/g
    );
    var pauseNoArgsExpr = /__env__\.LongRunning\s*\.\s*pause\s*\(\s*\)\s*;/g;
    var pauseArgsExpr = /__env__\.LongRunning\s*\.\s*pause/g;
    
    function LongRunning(func) {
        if (typeof func !== "function") { return func; }
        func = String(func);
        func = func.replace(functionStart, "return function* (");
        func = func.replace(KAInfiniteLoop, "");
        func = func.replace(pauseNoArgsExpr, "yield;");
        func = func.replace(pauseArgsExpr, "yield ");
        return Object.constructor("__env__", func)(globalThis);
    }
    
    // "Call" this to pause your functions
    // If you called LongRunning() on the wrapper function,
    // LongRunning.pause will never actually be called.
    LongRunning.pause = function() {
        var message = "LongRunning.pause shouldn't actually be called. " +
            "Did you forget to call LongRunning() on the wrapping function?";
        throw {message:  message};
    };
    
    return LongRunning;
})();

/** GUI class **/
var GUI = (function() {
    /* Internally stores:
        GameDefinition.GUIConfig config,
        GameDefinition.gamePlay gamePlay */
    
    /* GUI constructor(GameDefinition.GUIConfig config, 
            GameDefinition.gamePlay gamePlay) {
        Returns a new GUI instance. If not given parameters, call the init
        method with the missing parameters before 
        using game-specific functions.
    } */
    function GUI(config, gamePlay) {
        // Hold on to game play functions
        this.gamePlay = gamePlay;
        
        // Remember the config
        this.config = config;
        
        // Helper function
        function ifBlank(propertyName, value) {
            if (!(propertyName in config)) {
                config[propertyName] = value;
            }
        }
        
        if (config) {
            // Clone the config
            config = Object.create(config);
            
            // Set the default properties as specified
            ifBlank("squareColor", color(128, 128, 128));
            ifBlank("hoverOverlayColor", color(0, 0, 0, 60));
            ifBlank("squareSize", width / 3);
            ifBlank("dotColor", color(100, 100, 100, 100));
            ifBlank("dotDiameter", config.squareSize / 4);
        }
    }
    
    /* void init(GameDefinition.GUIConfig config, 
            GameDefinition.gamePlay gamePlay) {
        Initializes the instance with the given config and gamePlay.
    } */
    GUI.prototype.init = function(config, gamePlay) {
        GUI.call(this, config, gamePlay);
    };
    
    /* void renderGame(GameState gameState, 
            int mouseX, int mouseY) {
        Renders a game using the gameState and original GUIConfig.
        Does not draw hover if mouseX or mouseY are undefined.
    } */
    GUI.prototype.renderGame = function(gameState, mouseX, mouseY) {
        // Background
        background(56, 56, 56);
        
        // Board offset and local config and gamePlay binding
        var config = this.config, gamePlay = this.gamePlay;
            // The actual width and height in pixels of the board.
        var boardPixelWidth = gamePlay.boardColumns * config.squareSize;
        var boardPixelHeight = gamePlay.boardRows * config.squareSize;
        var xOffset = (width - boardPixelWidth) / 2;
        var yOffset = (height - boardPixelHeight) / 2;
        
        // Draw each square background
        fill(config.squareColor);
        rectMode(CORNER);
        strokeWeight(width / 100);
        stroke(0, 0, 0);
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % gamePlay.boardColumns) * config.squareSize + xOffset;
            var y = Math.floor(s / gamePlay.boardColumns) * 
                config.squareSize + yOffset;
            rect(x, y, config.squareSize, config.squareSize);
        }
        
        // Draw the game pieces
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % gamePlay.boardColumns) * config.squareSize + xOffset;
            var y = Math.floor(s / gamePlay.boardColumns) * 
                config.squareSize + yOffset;
            var type = gameState.board[s];
            config.drawPiece(type, x, y, config.squareSize, config.squareSize);
        }
        
        // Calculate the suggested move
        var mouseSquare = this.mouseSquare(gameState, mouseX, mouseY);
        var suggestedMoves = [ [mouseSquare.index] ];
        var incompleteMove = gameState.moves.length > 0 && 
            !this.gamePlay.isCompleteMove(gameState.board, 
                gameState.moves.at(-1), gameState.turn);
        if (incompleteMove) {
            var newMove = gameState.moves.at(-1).slice();
            newMove.push(mouseSquare.index);
            suggestedMoves[1] = newMove;
        }
        
        // Draw move options if applicable (dots)
        if (incompleteMove) {
            var moves = this.gamePlay.getLegalMoves(
                gameState.board, gameState.moves.at(-1), gameState.turn);
            var movePartIndex = gameState.moves.at(-1).length;
            
            noStroke();
            fill(config.dotColor);
            for (var m = 0; m < moves.length; m++) {
                // Draw a dot
                var dotIndex = moves[m][movePartIndex];
                var x = (dotIndex % gamePlay.boardColumns) * 
                    config.squareSize + xOffset + config.squareSize / 2;
                var y = Math.floor(dotIndex / gamePlay.boardColumns) *
                    config.squareSize + yOffset + config.squareSize / 2;
                ellipse(x, y, config.dotDiameter, config.dotDiameter);
            }
        }
        
        // Draw win effect
        if (gameState.won !== Owner.none) {
            this.drawWinOverlay(gameState);
        }
        
        // Cursor and hover effect
        if (mouseX !== undefined && mouseY !== undefined && 
                gameState.won === Owner.none && 
                (this.gamePlay.isLegalMove(gameState.board, 
                    suggestedMoves[0], gameState.turn) ||
                suggestedMoves[1] && this.gamePlay.isLegalMove(
                    gameState.board, suggestedMoves[1], gameState.turn))) {
            // Indicate with the cursor whether the square is clickable
            cursor("pointer");
            
            // Draw the hover effect only if the square is a valid move
            noStroke();
            fill(config.hoverOverlayColor);
            rect(mouseSquare.x, mouseSquare.y, 
                config.squareSize, config.squareSize);
        } else {
            cursor("default");
        }
    };
    
    /* void drawWinOverlay(GameState gameState) {
        Draws a semi-transparent overlay indicating who won and
        how to play again.
    } */
    GUI.prototype.drawWinOverlay = function(gameState) {
        // Calculate xOffset and yOffset (copied from renderGame)
        var config = this.config, gamePlay = this.gamePlay;
        var boardPixelWidth = gamePlay.boardColumns * config.squareSize;
        var boardPixelHeight = gamePlay.boardRows * config.squareSize;
        var xOffset = (width - boardPixelWidth) / 2;
        var yOffset = (height - boardPixelHeight) / 2;
        
        // Create squarePositions array
        var squarePositions = [];
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % gamePlay.boardColumns) * 
                config.squareSize + xOffset + config.squareSize / 2;
            var y = Math.floor(s / gamePlay.boardColumns) * 
                config.squareSize + yOffset + config.squareSize / 2;
            squarePositions.push([x, y]);
        }
        
        // Call this.config.drawWin
        if (gameState.won !== Owner.tie) {
            config.drawWin(gameState.board, gameState.won, squarePositions);
        }
        
        // Create message
        var message = "";
        if (gameState.won === Owner.tie) {
            message = "It's a tie!";
        } else if (gameState.won !== Owner.none) {
            var player = gameState.won === Owner.player1? "1" : "2";
            message = "Player " + player + " won!";
        }
        message += "\nClick to play\nagain!";
        
        // Fade overlay and words
        fill(0, 0, 0, 130);
        rectMode(CORNER);
        noStroke();
        rect(0, 0, width, height);
        
        // Text
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(width / 6);
        text(message, width / 2, height / 2);
    };
    
    /* void drawLearningScreen(double phase) {
        Draws a loading screen based on the phase argument.
    } */
    GUI.prototype.drawLearningScreen = function(phase) {
        // Background
        background(56, 56, 56);
        
        // Cursor
        cursor("progress");
        
        // Text styling
        fill(255, 255, 255);
        textSize(width / 6);
        textAlign(CENTER, CENTER);
        
        // Center position
        var x = width / 2, y = height / 2;
        // "Learning" message
        var word = "Learning";
        var dotsWidth = textWidth("...");
        text(word, x - dotsWidth / 2, y);
        // Moving dots
        var loadingWidth = textWidth(word);
        var dotWidth = textWidth(".");
        for (var d = 0; d < 3; d++) {
            text(".", 
                // Place the dot in the x-position it would be in normally
                x + (loadingWidth - dotsWidth + dotWidth) / 2 + dotWidth * d, 
                // Calculate the y-position based on the phase variable
                // to give the dots a waving effect
                y - (Math.sin(phase / 150 - d * 1.3) + 0.5) * 10);
        }
    };
    
    /* void drawMenu(MenuState menuState, int mouseX, int mouseY) {
        Draws the menu screen with buttons based on the input MenuState,
        mouseX, and mouseY.
        Does not draw hover if mouseX or mouseY are undefined.
    } */
    GUI.prototype.drawMenu = function(menuState, mouseX, mouseY) {
        // Background
        background(56, 56, 56);
        
        // Cursor variable
        var clickable = false;
        
        // Center text
        textAlign(CENTER, CENTER);
        
        // Title {
        textSize(width / 8);
        fill(255, 255, 255);
        text("Machine learning\nfor simple games", width * 0.5, height * 0.2);
        // }
        
        // Toggles {
        var toggle1Hover = this.drawToggle(menuState.player1IsComputer, 
            width * 0.41, height * 0.5, width / 10, height / 12.5,
            mouseX, mouseY);
        var toggle2Hover = this.drawToggle(menuState.player2IsComputer, 
            width * 0.41, height * 0.7, width / 10, height / 12.5,
            mouseX, mouseY);
        clickable = clickable || toggle1Hover || toggle2Hover;
        
        // Toggle labels
        textSize(width / 15);
        text("Player 1 is\ncomputer?", width * 0.2, height * 0.5);
        text("Player 2 is\ncomputer?", width * 0.2, height * 0.7);
        // }
        
        // Play button {
        // Hover effect
        var buttonHover = false;
        if (mouseX >= width * 0.16 && mouseX <= width * 0.46 &&
            mouseY >= height * 0.82 && mouseY <= height * 0.92) {
            buttonHover = true;
        }
        clickable = clickable || buttonHover;
        
        // Draw the button
        fill(buttonHover? color(166, 33, 40) : color(212, 49, 57));
        stroke(0, 0, 0);
        strokeWeight(width / 200);
        rect(width * 0.16, height * 0.82,
            width * 0.3, height * 0.1, width * 0.03);
        
        // Text for the play button
        fill(255, 255, 255);
        text("Play", width * 0.31, height * 0.87);
        // }
        
        // Game selector {
        
        // Game options {
        var games = menuState.games, i = 0;
        // A few styles
        stroke(0, 0, 0);
        strokeWeight(width / 200);
        for (var game in games) {
            // Hover test and yOffset variable
            var yOffset = height * 0.1 * i;
            var rectHover = (
                mouseX >= width * 0.57 && 
                mouseX <= width * 0.98 &&
                mouseY >= height * 0.44 + yOffset && 
                mouseY <= height * 0.54 + yOffset);
            
            // For the cursor
            clickable = clickable || 
                menuState.gameSelected !== game && rectHover;
            
            // Rectangle's fill color
            var rectColor = menuState.gameSelected === game?
                color(16, 55, 199) : 
                rectHover? color(38, 81, 255) : color(71, 111, 255);
            
            // Rectangle
            fill(rectColor);
            rect(width * 0.57, height * 0.44 + yOffset, 
                width * 0.41, height * 0.1);
            
            // Text
            fill(255, 255, 255);
            textSize(games[game].GUIConfig.nameSize || width / 15);
            text(game, width * 0.775, height * 0.49 + yOffset);
            
            // Increment counter
            i++;
        }
        // }
        
        // Set the cursor {
        if (clickable) {
            cursor("pointer");
        } else {
            cursor("default");
        }
        // }
    };
    
    /* boolean drawToggle(boolean on, double x, double y, double w, double h,
            Color c) {
        Draws a toggle based on the input boolean "on" and x, y, w, h,
        mouseX, and mouseY (last two for hover effect).
        Returns whether the mouse is over the toggle.
    } */
    GUI.prototype.drawToggle = function(on, x, y, w, h, mouseX, mouseY) {
        // The toggle border
        // The toggle is drawn as two very thick lines, 
        // with the back one being slightly thicker
        // First line
        stroke(0, 0, 0);
        strokeWeight(h);
        line(x, y, x + w, y);
        
        // Second, slightly smaller line
        stroke(168, 168, 168);
        strokeWeight(h * 0.8);
        line(x, y, x + w, y);
        
        // Draw the dot
        stroke(0, 29, 255);
        strokeWeight(h * 0.7); // Add a little space
        point(on? x + w : x, y);
        
        var hover = this.toggleHover(x, y, w, h, mouseX, mouseY);
        
        // Hover effect; similar to the border line
        if (hover) {
            stroke(0, 0, 0, 100);
            strokeWeight(h);
            line(x, y, x + w, y);
        }
        
        // Return
        return hover;
    };
    
    /* boolean toggleHover(double x, double y, double w, double h,
            Color c, int mouseX, int mouseY) {
        Returns whether the mouse is over the toggle.
    } */
    GUI.prototype.toggleHover = function(x, y, w, h, mouseX, mouseY) {
        // Left side circle hover
        // If mouseX or mouseY are undefined, this will result in
        // (NaN < h) which is correctly false.
        var leftHover = Math.hypot(x + w - mouseX, y - mouseY) < h / 2;
        
        // Right side circle hover
        var rightHover = Math.hypot(x + w - mouseX, y - mouseY) < h / 2;
        
        // Middle rectangle hover
        var middleHover = mouseX >= x && mouseX <= x + w &&
            mouseY >= y - h / 2 && mouseY <= y + h / 2;
        
        // Circle + rectangle + circle = toggle shape
        // ◯ + ▯ + ◯ = ◖▮◗
        var hover = leftHover || middleHover || rightHover;
        
        // Return
        return hover;
    };
    
    /* void humanPlayClick(GameState gameState, int mouseX, int mouseY) {
        Handles a mouse click for an in-progress game on a human's turn
    } */
    GUI.prototype.humanPlayClick = function(gameState, mouseX, mouseY) {
        // The human plays!
        var mouseSquare = this.mouseSquare(gameState, mouseX, mouseY);
        
        // Calculate the selected move
        var suggestedMoves = [ [mouseSquare.index] ];
        var incompleteMove = gameState.moves.length > 0 && 
                !gameState.game.gamePlay.isCompleteMove(gameState.board, 
                    gameState.moves.at(-1), gameState.turn);
        if (incompleteMove) {
            var newMove = gameState.moves.at(-1).slice();
            newMove.push(mouseSquare.index);
            suggestedMoves[1] = newMove;
        }
        
        // Test and possibly play suggestedMoves[0]
        if (gameState.game.gamePlay.isLegalMove(gameState.board, 
                suggestedMoves[0], gameState.turn)) {
            // Play the move if it is complete
            if (gameState.game.gamePlay.isCompleteMove(gameState.board, 
                    suggestedMoves[0], gameState.turn)) {
                
                gameState.board = gameState.game.gamePlay.playMove(
                    gameState.board, suggestedMoves[0], gameState.turn);
                gameState.turn = Turn.next(gameState.turn);
                gameState.won = gameState.game.gamePlay.hasWon(
                    gameState.board, gameState.turn, gameState.moves);
            }
            
            // Push the move to the move list
            if (incompleteMove) {
                var totalMoves = gameState.moves.length;
                gameState.moves[totalMoves - 1] = suggestedMoves[0];
            } else {
                gameState.moves.push(suggestedMoves[0]);
            }
        }
        
        // Test and possibly play suggestedMoves[1]
        if (suggestedMoves[1] &&
            gameState.game.gamePlay.isLegalMove(gameState.board, 
                suggestedMoves[1], gameState.turn)) {
            // Play the move if it is complete
            if (gameState.game.gamePlay.isCompleteMove(gameState.board, 
                    suggestedMoves[1], gameState.turn)) {
                
                gameState.board = gameState.game.gamePlay.playMove(
                    gameState.board, suggestedMoves[1], gameState.turn);
                gameState.turn = Turn.next(gameState.turn);
                gameState.won = gameState.game.gamePlay.hasWon(
                    gameState.board, gameState.turn, gameState.moves);
            }
            
            // Push the move to the move list
            if (incompleteMove) {
                var totalMoves = gameState.moves.length;
                gameState.moves[totalMoves - 1] = suggestedMoves[1];
            } else {
                gameState.moves.push(suggestedMoves[1]);
            }
        }
    };
    
    /* void menuClick(GameState gameState, int mouseX, int mouseY) {
        Handles a mouse click for the menu.
    } */
    GUI.prototype.menuClick = function(menuState, mouseX, mouseY) {
        // Toggles
        // Player 1 is computer toggle
        if (this.toggleHover(width * 0.41, height * 0.5, 
            width / 10, height / 12.5, mouseX, mouseY)) {
            menuState.player1IsComputer = !menuState.player1IsComputer;
        }
        // Player 2 is computer toggle
        if (this.toggleHover(width * 0.41, height * 0.7, 
            width / 10, height / 12.5, mouseX, mouseY)) {
            menuState.player2IsComputer = !menuState.player2IsComputer;
        }
        
        // Play button
        if (mouseX >= width * 0.16 && mouseX <= width * 0.46 &&
            mouseY >= height * 0.82 && mouseY <= height * 0.92) {
            // Initialize the game-dependent variables
            menuState.initGame();
            // Hide the menu
            menuState.menuDisplayed = false;
        }
        
        // Game options
        var games = menuState.games, i = 0;
        for (var game in games) {
            // Hover test and yOffset variable
            var yOffset = height * 0.1 * i;
            var rectHover = (
                mouseX >= width * 0.57 && 
                mouseX <= width * 0.98 &&
                mouseY >= height * 0.44 + yOffset && 
                mouseY <= height * 0.54 + yOffset);
            
            // Test click
            if (rectHover) {
                menuState.gameSelected = game;
            }
            
            // Increment counter
            i++;
        }
    };
    
    /* int squareClicked(GameState gameState, int mouseX, int mouseY) {
        Returns the index of the square that was clicked.
    } */
    GUI.prototype.mouseSquare = function(gameState, mouseX, mouseY) {
        var config = this.config, gamePlay = this.gamePlay;
        var boardPixelWidth = gamePlay.boardColumns * config.squareSize;
        var boardPixelHeight = gamePlay.boardRows * config.squareSize;
        var xOffset = (width - boardPixelWidth) / 2;
        var yOffset = (height - boardPixelHeight) / 2;
        
        var mouseSquare = { x: undefined, y: undefined, index: -1, type: "" };
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % gamePlay.boardColumns) * 
                config.squareSize + xOffset;
            var y = Math.floor(s / gamePlay.boardColumns) * 
                config.squareSize + yOffset;
            
            if (mouseX >= x && mouseX <= x + this.config.squareSize &&
                mouseY >= y && mouseY <= y + this.config.squareSize) {
                mouseSquare.x = x;
                mouseSquare.y = y;
                mouseSquare.index = s;
                mouseSquare.type = gameState.board[s];
            }
        }
        return mouseSquare;
    };
    
    return GUI;
})();

/** GameAI class. This is the heart of the program, where learning happens. **/
var GameAI = (function() {
    /* Internally stores:
        GameDefinition.gamePlay gamePlay,
        AIData aiData,
        Iterator trainingIterator,
        Iterator createDataIterator,
        Board initialBoard, // Helps access to the top of the AI game tree
        int maxDepth,
        int iterationsPerFrame, // Iterations per frame
        int visitId, // An id for each training iteration
        boolean trained, // Whether the AIData has been fully trained
        boolean dataComplete, // Whether the AIData is filled out
        boolean learnWhilePlaying */
    
    /* GameAI constructor(
            GameDefinition.gamePlay gamePlay, boolean learnWhilePlaying) {
        Returns a new AI object.
    } */
    function GameAI(gamePlay, learnWhilePlaying) {
        this.gamePlay = gamePlay;
        this.AIData = {};
        this.trainingIterator = null;
        this.createDataIterator = null;
        this.initialBoard = this.gamePlay.createBoard();
        this.maxDepth = this.gamePlay.maxDepth || 100;
        this.iterationsPerFrame = this.gamePlay.iterationsPerFrame || 8000;
        this.visitId = 0;
        this.trained = false;
        this.dataComplete = false;
        this.learnWhilePlaying = learnWhilePlaying;
        
        // Verify this.initialBoard is valid
        if (typeof this.initialBoard !== "object") {
            throw {message: "TypeError: gamePlay.createBoard() failed " +
                "to return a board!"};
        } else if (this.initialBoard.length !== (
                this.gamePlay.boardColumns * this.gamePlay.boardRows)) {
            throw {message: "TypeError: gamePlay.createBoard() returned " +
                "a board that does not match gamePlay.boardColumns " +
                "and gamePlay.boardRows!"};
        }
    }
    
    /* Object continueTraining() {
        Simple interface for creating and training the AI.
        Returns an object with these properties: 
            {boolean training, Object<Turn,int>[]indexes}.
    } */
    GameAI.prototype.continueTraining = function() {
        if (!this.dataComplete) {
            // Utilize the Iterator interface
            if (!this.createDataIterator) {
                this.createDataIterator = this.expandAIDataFrom();
            }
            var iteratorValue = this.createDataIterator.next();
            this.dataComplete = iteratorValue.done;
            if (iteratorValue.done) {
                this.createDataIterator = null;
            }
            return {training: false, indexes: iteratorValue.value};
        } else if (!this.trained) {
            // Utilize the Iterator interface
            if (!this.trainingIterator) {
                this.trainingIterator = this.trainAIFrom();
            }
            var iteratorValue = this.trainingIterator.next();
            this.trained = iteratorValue.done;
            if (iteratorValue.done) {
                this.trainingIterator = null;
            }
            return {training: true, indexes: iteratorValue.value};
        }
    };
    
    /* Move getAIBestMove(GameState gameState) {
        Returns the best move for the current player 
        according to this.AIData
    } */
    GameAI.prototype.getAIBestMove = function(gameState) {
        var boardObject = this.AIData[gameState.board.toString()];
        var possibleMoves = boardObject[gameState.turn];
        
        // The moveOptions object catagorizes each move
        var moveOptions = {
            computerVictory: [],
            unsureOutcome: [],
            certainTie: [],
            opponentVictory: []
        };
        
        // Catagorize the moves
        for (var i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].canWin === Turn.next(gameState.turn)) {
                // This means that this move will lose.
                moveOptions.opponentVictory.push(possibleMoves[i]);
            } else if (possibleMoves[i].canWin === gameState.turn) {
                // This means that the computer can win from here.
                moveOptions.computerVictory.push(possibleMoves[i]);
            } else if (possibleMoves[i].canWin === Owner.tie) {
                // This move will always result in a tie.
                moveOptions.certainTie.push(possibleMoves[i]);
            } else {
                // This move won't lose, but it isn't a forced win either.
                moveOptions.unsureOutcome.push(possibleMoves[i]);
            }
        }
        
        // Choose the best type of moves that is availible
        var bestMoves;
        if (moveOptions.computerVictory.length > 0) {
            // The computer can win! Yay!
            bestMoves = moveOptions.computerVictory;
        } else if (moveOptions.unsureOutcome.length > 0) {
            // Not as good as winning, but the next best thing.
            bestMoves = moveOptions.unsureOutcome;
        } else if (moveOptions.certainTie.length > 0) {
            // Not as good as a chance at winning, 
            // but still better than losing.
            bestMoves = moveOptions.certainTie;
        } else {
            // Default to the worst moves if there are no others.
            bestMoves = moveOptions.opponentVictory;
        }
        
        // Randomly choose one of the best moves to make things more fun
        // Otherwise, the computer always chooses the same moves
        var randomIndex = Math.floor(Math.random() * bestMoves.length);
        return bestMoves[randomIndex].move;
    };
    
    /* void playAIBestMove(GameState gameState) {
        Plays the best move for the current player 
        according to this.AIData
    } */
    GameAI.prototype.playAIBestMove = function(gameState) {
        var computerMove = this.getAIBestMove(gameState);
        gameState.board = this.gamePlay.playMove(
            gameState.board, computerMove, gameState.turn);
        gameState.turn = Turn.next(gameState.turn);
        gameState.won = this.gamePlay.hasWon(
            gameState.board, gameState.turn, gameState.moves);
        gameState.moves.push(computerMove);
    };
    
    /* Iterator expandAIDataFrom(GameState gameState) {
        Adds to this.AIData to meet the maxDepth config property
        based on the input state.
        Sets this.trained to false if this.AIData was added to.
    } */
    GameAI.prototype.expandAIDataFrom = LongRunning(function(gameState) {
        // Helper function
        var instance = this; // For the helper function's reference
        // This helper function expects a gameState object for its this value
        // And converts the input Move to a move object for this.AIData
        function moveToObject(move) {
            var result = instance.gamePlay.playMove(
                this.board, move, this.turn);
            return {move: move, canWin: Owner.none, result: result};
        }
        
        // Initialize
        var startAt;
        if (gameState) {
            startAt = this.AIData[gameState.board.toString()];
        } else {
            var board = this.initialBoard.slice();
            startAt = { board: board };
            // Calculate player1's moves
            startAt[Turn.player1] = this.gamePlay
                .getLegalMoves(board, [], Turn.player1)
                .map(moveToObject, { board: board, turn: Turn.player1 });
            // Player2 won't play on the first board
            startAt[Turn.player2] = [];
            this.AIData[board.toString()] = startAt;
        }
        
        // Create the data!
        // Use one loop to walk through many layers
            // Stack variables
        var depth = 0; // The current depth
        var indexes = [{}]; // Current index in boards' moves
        indexes[0][Turn.player1] = 0; // Seperate indexes for player1's moves
        indexes[0][Turn.player2] = 0; // and for player2's moves
        var players = [Turn.player1]; // First or second player's moves above
        var boards = [startAt]; // Keep a board stack
        var moves = []; // A list of the moves to get to current(boards)
        var pauseCounter = 0; // To prevent the loop from running too long.
        
        // Another helper function
        function current(what) {
            return what[depth][players[depth]];
        }
        
        // The One Loop
        while (indexes[0][players[0]] < boards[0][players[0]].length) {
            // Test for a pause
            pauseCounter++;
            if (pauseCounter > this.iterationsPerFrame) {
                pauseCounter = 0;
                LongRunning.pause(indexes); // Pause
            }
            
            // Handle switching to a new array
            if (current(indexes) >= current(boards).length) {
                // Reached the end of a list of moves
                // Either go up, or switch to the next move list
                if (players[depth] === Turn.player1) {
                    // Next move list in the board
                    players[depth] = Turn.player2;
                    // Reset the index
                    indexes[depth][players[depth]] = 0;
                } else {
                    // Go up a level
                    depth--;
                    // Advance the index
                    indexes[depth][players[depth]]++;
                    // Trim moves
                    // When depth = 1, that means we are on the second board,
                    // and that means that one move will have been played
                    // to get there. So this is correct.
                    moves.length = depth;
                }
            } else 
            // Handle going down
            if (depth < this.maxDepth) {
                // Bind the initial board and the new board
                var initialBoard = boards[depth].board;
                var newBoard = current(boards)[current(indexes)].result;
                var move = current(boards)[current(indexes)].move;
                
                // Check for the possiblility of redoing work.
                // But make sure that it has all needed moves.
                // If not, simply do it again.
                // newBoard's turn is the next one after the current turn.
                // We know these moves have been done if there are any.
                // If not, it won't cost much to recheck them all.
                var possibleNewBoardObj = this.AIData[newBoard.toString()];
                if (possibleNewBoardObj && possibleNewBoardObj
                    [Turn.next(players[depth])].length > 0) {
                    // This board has already been done. Advance index.
                    indexes[depth][players[depth]]++;
                    continue;
                }
                
                // Add the new move to the moves array
                moves.push(move);
                
                // Test for a victory
                var won = this.gamePlay.hasWon(
                    newBoard, Turn.next(players[depth]), moves);
                
                // Calculate possible moves
                // Only do this for the player who will be playing on this board
                var player1Moves = won !== Owner.none &&
                    Turn.next(players[depth]) === Turn.player1? [] :
                    this.gamePlay.getLegalMoves(newBoard, [], Turn.player1);
                var player2Moves = won !== Owner.none &&
                    Turn.next(players[depth]) === Turn.player2? [] :
                    this.gamePlay.getLegalMoves(newBoard, [], Turn.player2);
                
                // Convert possible moves to move objects
                var player1MoveObjects = player1Moves.map(moveToObject, 
                    { board: newBoard, turn: Turn.player1 });
                var player2MoveObjects = player2Moves.map(moveToObject, 
                    { board: newBoard, turn: Turn.player2 });
                
                // Create the new board object
                var newBoardObject = { board: newBoard, won: won,
                    visitId: this.visitId };
                newBoardObject[Turn.player1] = player1MoveObjects;
                newBoardObject[Turn.player2] = player2MoveObjects;
                
                // Move the pointer to the beginning of the new move array
                depth++;
                players[depth] = Turn.player1;
                indexes[depth] = indexes[depth] || {};
                indexes[depth][players[depth]] = 0;
                
                // Add the new board object to this.AIData and to boards
                this.AIData[newBoard.toString()] = newBoardObject;
                boards[depth] = newBoardObject;
            } else 
            // Handle the case that maxDepth has been reached
            {
                /* If maxDepth has been reached, there is no point to continue
                    exploring this level, so go up a level. */
                // Copied from above
                depth--;
                indexes[depth][players[depth]]++;
            }
        }
        return indexes;
    });
    
    /* Iterator trainAIFrom(GameState gameState (optional) ) {
        Train the new parts of this.AIData that were added by 
        this.getAIBestMove()
        Returns an iterator to avoid freezing the page.
        If gameState is omitted, this method will start training at the top.
        Training consists of 
            1. Flagging moves that permit the opponent to win
                (this is calculated for both players).
            2. Calculating how many sub-moves lead to draws.
    } */
    GameAI.prototype.trainAIFrom = LongRunning(function(gameState) {
        // Initialize
        this.visitId = (this.visitId + 1) % 500;
        var startAt;
        if (gameState) {
            startAt = this.AIData[gameState.board.toString()];
        } else {
            startAt = this.AIData[this.initialBoard.toString()];
        }
        startAt.visitId = this.visitId;
        
        // Create the data!
        // Use one loop to walk through many layers
            // Stack variables
        var depth = 0; // The current depth
        var indexes = [{}]; // Current index in boards' moves
        indexes[0][Turn.player1] = 0; // Seperate indexes for player1's moves
        indexes[0][Turn.player2] = 0; // and for player2's moves
        var players = [Turn.player1]; // First or second player's moves above
        var boards = [startAt];
        var pauseCounter = 0; // To prevent the loop from running too long.
        
        // Two helper functions
        function current(what) { // Just a shortcut
            return what[depth][players[depth]];
        }
        // This function handles potential forced victories, reporting them 
        // to the parent board. This should be called when leaving a board.
        function recordCurrentBoard() {
            // Skip recording for the top-level board
            if (depth === 0) {
                return;
            }
            
            // Bind previousMove
            var parentMoves = boards[depth - 1][players[depth - 1]];
            var previousMoveIndex = indexes[depth - 1][players[depth - 1]];
            var previousMove = parentMoves[previousMoveIndex];
            
            // Handle a finished game or forced victories
            if (boards[depth].won !== Owner.none) {
                // If player1 won, the canWin property on the previous move
                // should be set to Owner.player1
                // The same logic goes for player2
                // I also record ties in this way.
                previousMove.canWin = boards[depth].won;
            } else {
                // Check child boards to see if they include forced wins
                // If the previous move was by player1, then player2 will 
                // be playing the next move, and so can possibly force a victory
                // And vice-versa
                var mightBeAbleToWin = Turn.next(players[depth - 1]);
                var playerMoves = boards[depth][mightBeAbleToWin];
                for (var i = 0; i < playerMoves.length; i++) {
                    if (playerMoves[i].canWin === mightBeAbleToWin) {
                        previousMove.canWin = mightBeAbleToWin;
                        break;
                    }
                }
                
                // If the previous check failed, check for an absolute outcome
                // for the player that played the last move
                if (previousMove.canWin === Owner.none) {
                    var outcome = null;
                    for (var i = 0; i < playerMoves.length; i++) {
                        if (outcome === null) {
                            outcome = playerMoves[i].canWin;
                        } else if (playerMoves[i].canWin !== outcome) {
                            outcome = null;
                            break;
                        }
                    }
                    if (outcome !== null) {
                        previousMove.canWin = outcome;
                    }
                }
            }
        }
        
        // The One Loop
        while (indexes[0][players[0]] < boards[0][players[0]].length) {
            // Test for a pause
            pauseCounter++;
            if (pauseCounter > this.iterationsPerFrame) {
                pauseCounter = 0;
                LongRunning.pause(indexes); // Pause
            }
            
            // Handle switching to a new array
            if (current(indexes) >= current(boards).length) {
                // Reached the end of a list of moves
                // Either go up, or switch to the next move list
                if (players[depth] === Turn.player1) {
                    players[depth] = Turn.player2; // Next move list
                    indexes[depth][players[depth]] = 0; // Reset the index
                } else {
                    // Record the current board and go up a level
                    recordCurrentBoard();
                    depth--;
                    indexes[depth][players[depth]]++; // Advance the index too
                }
            } else 
            // Handle going down
            if (depth < this.maxDepth) {
                // Add the new board object to the 'boards' stack
                var newBoard = current(boards)[current(indexes)].result;
                boards[depth + 1] = this.AIData[newBoard.toString()];
                
                // Move the pointer to the beginning of the new move array
                depth++;
                players[depth] = Turn.player1;
                indexes[depth] = indexes[depth] || {};
                indexes[depth][players[depth]] = 0;
                
                // Avoid duplicate work
                if (boards[depth].visitId === this.visitId) {
                    // Skip this board; it has already been done
                    // But record it first
                    recordCurrentBoard();
                    indexes[depth][players[depth]]++;
                } else {
                    // Record that this board has been visited
                    boards[depth].visitId = this.visitId;
                }
            } else 
            // Handle the case that maxDepth has been reached
            {
                /* If maxDepth has been reached, there is no point to continue
                    exploring this level, so go up a level. */
                // Record the board first
                recordCurrentBoard();
                depth--;
                indexes[depth][players[depth]]++;
            }
        }
        return indexes;
    });
    
    /* boolean isReady() {
        Return whether this.AIData is ready to use.
    } */
    GameAI.prototype.isReady = function() {
        return this.dataComplete && this.trained;
    };
    
    return GameAI;
})();

/** Game definitions **/
// Tic-tac-toe GameDefinition
var ticTacToe = {
    gamePlay: {
        boardColumns: 3, // The columns in the game's board; 3 for Tic-tac-toe
        boardRows: 3, // The rows in the game's board; 3 for Tic-tac-toe
        /* Owner hasWon(Board board, Turn turn, Move[] moves) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn, moves) {
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Columns
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonals
                [0, 4, 8],
                [2, 4, 6]];
            
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] !== Owner.none) {
                    return board[sequences[s][0]];
                }
            }
            
            for (var s = 0; s < board.length; s++) {
                if (board[s] === Owner.none) {
                    return Owner.none;
                }
            }
            
            return Owner.tie;
        },
        
        /* Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
            Return an array of Moves representing all legal moves 
            for the specified player starting with partialMove.
            Returns an empty array if the specified player should never 
            play on this board.
            Ideally also returns an empty array if the board has been won,
            but this function should never be called on a won board.
        } */
        getLegalMoves: function(board, partialMove, turn) {
            if (partialMove.length >= 1) {
                return [partialMove];
            }
            
            var legalMoves = [], countPlayer1 = 0, countPlayer2 = 0;
            for (var i = 0; i < board.length; i++) {
                if (board[i] === Owner.none) {
                    legalMoves.push([i]);
                } else if (board[i] === Owner.player1) {
                    countPlayer1++;
                } else if (board[i] === Owner.player2) {
                    countPlayer2++;
                }
            }
            var isLegalTurn = turn === Turn.player1? 
                countPlayer1 === countPlayer2 : // As many Xs as Os
                countPlayer1 === countPlayer2 + 1; // One more X than O
            
            return isLegalTurn? legalMoves : [];
        },
        
        /* Board playMove(Board board, Move move, Turn turn) {
            Return a Board with the result of playing the input Move 
            on the input Board for the specified player. Return the 
            unchanged input Board if the Move is illegal.
        } */
        playMove: function(board, move, turn) {
            if (board[move[0]] === Owner.none) {
                // Play the move
                var newBoard = board.slice();
                newBoard[move[0]] = turn;
                return newBoard;
            } else { // Illegal move, return board
                return board;
            }
        },
        
        /* boolean isLegalMove(Board board, Move move, Turn turn) {
            Return a boolean indicating whether the input move is legal.
            Should return true if given a currently valid partial move.
            E.g. [3] when the game is a two-move game.
        } */
        isLegalMove: function(board, move, turn) {
            return board[move[0]] === Owner.none;
        },
        
        /* boolean isCompleteMove(Board board, Move move, Turn turn) {
            Return whether the input Move is a complete Move.
        } */
        isCompleteMove: function(board, move, turn) {
            return move.length === 1;
        },
        
        /* Board createBoard() {
            Return a new game board for the game. MUST NOT BE RANDOM!
        } */
        createBoard: function() {
            return Array(9).fill(Owner.none);
        },
    },
    GUIConfig: {
        /* void drawPiece(Owner pieceType, 
                double x, double y, double w, double h) {
            Draw the piece indicated by pieceType at the specified x and y.
            The input x and y are the center of the square.
        } */
        drawPiece: function(pieceType, x, y, w, h) {
            // Some margin
            var marginX = w * 0.15;
            var marginY = h * 0.15;
            
            // Thick stroke
            strokeWeight(width / 26);
            
            // Draw the symbol
            if (pieceType === Turn.player1) {
                // Draw a red X
                strokeCap(SQUARE);
                stroke(255, 0, 0);
                line(x + marginX, y + marginY, 
                    x + w - marginX, y + h - marginY);
                line(x + w - marginX, y + marginY, 
                    x + marginX, y + h - marginY);
            } else if (pieceType === Turn.player2) {
                // Draw a blue O
                stroke(10, 10, 255);
                ellipse(x + w / 2, y + w / 2, w - marginX * 2, h - marginY * 2);
            }
        },
        
        /* void drawWin(Board board, Turn won, double[][] squarePositions) {
            Draws an indication of which player won. 
            For example, a line in Tic-tac-toe.
            squarePositions is an array of two-element arrays, each the 
            center of the square on the board corrisponding the board array.
        } */
        drawWin: function(board, won, squarePositions) {
            // I copied winner detection logic from the hasWon function above
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Columns
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonals
                [0, 4, 8],
                [2, 4, 6]];
            
            strokeCap(PROJECT);
            strokeWeight(width / 20);
            stroke(0, 220, 0);
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] === won) {
                    // Draw a line across the sequence
                    var from = squarePositions[sequences[s][0]];
                    var to = squarePositions[sequences[s][2]];
                    line(from[0], from[1], to[0], to[1]);
                }
            }
        },
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 3, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11,
    }
};

// Hexapawn GameDefinition
var hexapawn = {
    gamePlay: {
        boardColumns: 3, // The columns in the game's board; 3 for Tic-tac-toe
        boardRows: 3, // The rows in the game's board; 3 for Tic-tac-toe
        
        /* Owner hasWon(Board board, Turn turn, Move[] moves) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn, moves) {
            if (board[0] === Owner.player2 ||
                board[1] === Owner.player2 ||
                board[2] === Owner.player2) {
                return Owner.player2;
            }
            
            if (board[6] === Owner.player1 ||
                board[7] === Owner.player1 ||
                board[8] === Owner.player1) {
                return Owner.player1;
            }
            
            var moves = hexapawn.gamePlay.getLegalMoves(board, [], turn);
            if (moves.length === 0) {
                return Turn.next(turn);
            }
            
            return Owner.none;
        },
        
        /* Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
            Return an array of Moves representing all legal moves 
            for the specified player starting with partialMove.
            Returns an empty array if the specified player should never 
            play on this board.
            Ideally also returns an empty array if the board has been won,
            but this function should never be called on a won board.
        } */
        getLegalMoves: function(board, partialMove, turn) {
            if (partialMove.length >= 2) {
                return [partialMove];
            }
            
            var legalMoves = [];
            for (var i = 0; i < board.length; i++) {
                // Use partialMove
                if (partialMove.length === 1 && partialMove[0] !== i) {
                    continue;
                }
                // Create moves
                if (board[i] === Owner.player1 && board[i] === turn) {
                    // Squares down the board, from left to right
                    if (board[i + 2] === Owner.player2 && i % 3 > 0) {
                        legalMoves.push([i, i + 2]);
                    }
                    if (board[i + 3] === Owner.none) {
                        legalMoves.push([i, i + 3]);
                    }
                    if (board[i + 4] === Owner.player2 && i % 3 < 2) {
                        legalMoves.push([i, i + 4]);
                    }
                } else 
                if (board[i] === Owner.player2 && board[i] === turn) {
                    // Squares up the board, from left to right
                    if (board[i - 4] === Owner.player1 && i % 3 > 0) {
                        legalMoves.push([i, i - 4]);
                    }
                    if (board[i - 3] === Owner.none) {
                        legalMoves.push([i, i - 3]);
                    }
                    if (board[i - 2] === Owner.player1 && i % 3 < 2) {
                        legalMoves.push([i, i - 2]);
                    }
                }
            }
            
            return legalMoves;
        },
        
        /* Board playMove(Board board, Move move, Turn turn) {
            Return a Board with the result of playing the input Move 
            on the input Board for the specified player. Return the 
            unchanged input Board if the Move is illegal.
        } */
        playMove: function(board, move, turn) {
            if (hexapawn.gamePlay.isLegalMove(board, move, turn)) {
                // Play the move
                var newBoard = board.slice();
                newBoard[move[0]] = Owner.none;
                newBoard[move[1]] = turn;
                return newBoard;
            } else { // Illegal move, return board
                return board;
            }
        },
        
        /* boolean isLegalMove(Board board, Move move, Turn turn) {
            Return a boolean indicating whether the input move is legal.
            Should return true if given a currently valid partial move.
            E.g. [3] when the game is a two-move game.
        } */
        isLegalMove: function(board, move, turn) {
            var legalMove = board[move[0]] === turn && 
                move[0] >= 0 && move[0] <= 9;
            
            if (move.length === 2) {
                var legalMoves = hexapawn
                    .gamePlay.getLegalMoves(board, [], turn).map(String);
                legalMove = legalMove && legalMoves.includes(String(move));
            } else {
                legalMove = legalMove && board[move[0]] === turn;
            }
            
            return legalMove;
        },
        
        /* boolean isCompleteMove(Board board, Move move, Turn turn) {
            Return whether the input Move is a complete Move.
        } */
        isCompleteMove: function(board, move, turn) {
            return move.length === 2;
        },
        
        /* Board createBoard() {
            Return a new game board for the game. MUST NOT BE RANDOM!
        } */
        createBoard: function() {
            return [Owner.player1, Owner.player1, Owner.player1,
                    Owner.none,    Owner.none,    Owner.none,
                    Owner.player2, Owner.player2, Owner.player2];
        },
    },
    GUIConfig: {
        /* void drawPiece(Owner pieceType, 
                double x, double y, double w, double h) {
            Draw the piece indicated by pieceType at the specified x and y.
            The input x and y are the center of the square.
        } */
        drawPiece: function(pieceType, x, y, w, h) {
            // Some margin and no stroke
            var marginX = w * 0.2;
            var marginY = h * 0.2;
            noStroke();
            
            // Fill color
            if (pieceType === Turn.player1) {
                // Red fill
                fill(255, 0, 0);
            } else if (pieceType === Turn.player2) {
                // Blue fill
                fill(10, 10, 255);
            } else {
                // Not a piece
                return;
            }
            
            // Draw the pawn
            ellipse(x + w / 2, y + w / 3, w / 4, h / 4);
            triangle(
                x + w / 2, y + w / 4, // Top point
                x + w / 3, y + h * 3 / 4, // Left point
                x + w * 2 / 3, y + h * 3 / 4 // Right point
            );
        },
        
        /* void drawWin(Board board, Turn won, double[][] squarePositions) {
            Draws an indication of which player won. 
            For example, a line in Tic-tac-toe.
            squarePositions is an array of two-element arrays, each the 
            center of the square on the board corrisponding the board array.
        } */
        drawWin: function(board, won, squarePositions) {
            for (var i = 0; i < board.length; i++) {
                if (i <= 2 && board[i] === Owner.player2 ||
                    i >= 6 && board[i] === Owner.player1) {
                    var pos = squarePositions[i];
                    var size = hexapawn.GUIConfig.squareSize;
                    fill(255, 225, 0, 100);
                    rectMode(CENTER);
                    noStroke();
                    rect(pos[0], pos[1], size, size);
                    return;
                }
            }
            
            for (var i = 0; i < board.length; i++) {
                if (board[i] === Turn.next(won)) {
                    var pos = squarePositions[i];
                    var size = hexapawn.GUIConfig.squareSize;
                    fill(255, 0, 0, 100);
                    rectMode(CENTER);
                    noStroke();
                    rect(pos[0], pos[1], size, size);
                }
            }
        },
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 3, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11, 
    }
};

// Connect three 4x3 GameDefinition
var connectThree4x3 = {
    gamePlay: {
        boardColumns: 4, // The columns in the game's board; 3 for Tic-tac-toe
        boardRows: 3, // The rows in the game's board; 3 for Tic-tac-toe
        /* Owner hasWon(Board board, Turn turn, Move[] moves) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn, moves) {
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1,  2], [1,  2,  3],
                [4, 5,  6], [5,  6,  7],
                [8, 9, 10], [9, 10, 11],
                // Columns
                [0, 4,  8],
                [1, 5,  9],
                [2, 6, 10],
                [3, 7, 11],
                // Diagonals
                [0, 5, 10], // Top-right-ish to bottom-left-ish
                [1, 6, 11],
                [2, 5, 8], // Top-left-ish to bottom-right-ish
                [3, 6, 9]];
            
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] !== Owner.none) {
                    return board[sequences[s][0]];
                }
            }
            
            for (var s = 0; s < board.length; s++) {
                if (board[s] === Owner.none) {
                    return Owner.none;
                }
            }
            
            return Owner.tie;
        },
        
        /* Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
            Return an array of Moves representing all legal moves 
            for the specified player starting with partialMove.
            Returns an empty array if the specified player should never 
            play on this board.
            Ideally also returns an empty array if the board has been won,
            but this function should never be called on a won board.
        } */
        getLegalMoves: function(board, partialMove, turn) {
            if (partialMove.length >= 1) {
                return [partialMove];
            }
            
            var legalMoves = [], countPlayer1 = 0, countPlayer2 = 0;
            for (var i = 0; i < board.length; i++) {
                if (i < 4 && board[i] === Owner.none) {
                    legalMoves.push([i]);
                } else if (board[i] === Owner.player1) {
                    countPlayer1++;
                } else if (board[i] === Owner.player2) {
                    countPlayer2++;
                }
            }
            var isLegalTurn = turn === Turn.player1? 
                countPlayer1 === countPlayer2 : // As many Xs as Os
                countPlayer1 === countPlayer2 + 1; // One more X than O
            
            return isLegalTurn? legalMoves : [];
        },
        
        /* Board playMove(Board board, Move move, Turn turn) {
            Return a Board with the result of playing the input Move 
            on the input Board for the specified player. Return the 
            unchanged input Board if the Move is illegal.
        } */
        playMove: function(board, move, turn) {
            if (board[move[0]] === Owner.none) {
                // Play the move
                var newBoard = board.slice();
                for (var row = 3; row-- > 0;) {
                    var square = move[0] % 4 + row * 4;
                    if (board[square] === Owner.none) {
                        newBoard[square] = turn;
                        break;
                    }
                }
                return newBoard;
            } else { // Illegal move, return board
                return board;
            }
        },
        
        /* boolean isLegalMove(Board board, Move move, Turn turn) {
            Return a boolean indicating whether the input move is legal.
            Should return true if given a currently valid partial move.
            E.g. [3] when the game is a two-move game.
        } */
        isLegalMove: function(board, move, turn) {
            return board[move[0]] === Owner.none;
        },
        
        /* boolean isCompleteMove(Board board, Move move, Turn turn) {
            Return whether the input Move is a complete Move.
        } */
        isCompleteMove: function(board, move, turn) {
            return move.length === 1;
        },
        
        /* Board createBoard() {
            Return a new game board for the game. MUST NOT BE RANDOM!
        } */
        createBoard: function() {
            return Array(12).fill(Owner.none);
        },
    },
    GUIConfig: {
        /* void drawPiece(Owner pieceType, 
                double x, double y, double w, double h) {
            Draw the piece indicated by pieceType at the specified x and y.
            The input x and y are the center of the square.
        } */
        drawPiece: function(pieceType, x, y, w, h) {
            // Some margin
            var marginX = w * 0.15;
            var marginY = h * 0.15;
            
            // Thick stroke
            strokeWeight(w * 3 / 26);
            
            // Draw the symbol
            if (pieceType === Turn.player1) {
                // Draw a red X
                strokeCap(SQUARE);
                stroke(255, 0, 0);
                line(x + marginX, y + marginY, 
                    x + w - marginX, y + h - marginY);
                line(x + w - marginX, y + marginY, 
                    x + marginX, y + h - marginY);
            } else if (pieceType === Turn.player2) {
                // Draw a blue O
                stroke(10, 10, 255);
                ellipse(x + w / 2, y + w / 2, w - marginX * 2, h - marginY * 2);
            }
        },
        
        /* void drawWin(Board board, Turn won, double[][] squarePositions) {
            Draws an indication of which player won. 
            For example, a line in Tic-tac-toe.
            squarePositions is an array of two-element arrays, each the 
            center of the square on the board corrisponding the board array.
        } */
        drawWin: function(board, won, squarePositions) {
            // I copied winner detection logic from the hasWon function above
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1,  2], [1,  2,  3],
                [4, 5,  6], [5,  6,  7],
                [8, 9, 10], [9, 10, 11],
                // Columns
                [0, 4,  8],
                [1, 5,  9],
                [2, 6, 10],
                [3, 7, 11],
                // Diagonals
                [0, 5, 10], // Top-right-ish to bottom-left-ish
                [1, 6, 11],
                [2, 5, 8], // Top-left-ish to bottom-right-ish
                [3, 6, 9]];
            
            strokeCap(PROJECT);
            strokeWeight(width * 3 / 4 / 20);
            stroke(0, 220, 0);
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] === won) {
                    // Draw a line across the sequence
                    var from = squarePositions[sequences[s][0]];
                    var to = squarePositions[sequences[s][2]];
                    line(from[0], from[1], to[0], to[1]);
                }
            }
        },
        
        nameSize: width / 19, // The font size of the game's name on the menu
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 4, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11,
    }
};

// Three men's morris GameDefinition
var threeMensMorris = {
    gamePlay: {
        boardColumns: 3, // The columns in the game's board; 3 for Tic-tac-toe
        boardRows: 3, // The rows in the game's board; 3 for Tic-tac-toe
        /* Owner hasWon(Board board, Turn turn, Move[] moves) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn, moves) {
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Columns
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonals
                [0, 4, 8],
                [2, 4, 6]];
            
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] !== Owner.none) {
                    return board[sequences[s][0]];
                }
            }
            
            for (var s = 0; s < board.length; s++) {
                if (board[s] === Owner.none) {
                    return Owner.none;
                }
            }
            
            return Owner.tie;
        },
        
        /* Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
            Return an array of Moves representing all legal moves 
            for the specified player starting with partialMove.
            Returns an empty array if the specified player should never 
            play on this board.
            Ideally also returns an empty array if the board has been won,
            but this function should never be called on a won board.
        } */
        getLegalMoves: function(board, partialMove, turn) {
            var emptyCount = board.reduce(function (count, square) {
                return square === Owner.none? count + 1 : count; }, 0);
                
            if (partialMove.length >= (emptyCount === 3? 2 : 1)) {
                return [partialMove];
            }
            
            var legalMoves = [], playerSquare = -1;
            var countPlayer1 = 0, countPlayer2 = 0;
            for (var i = 0; i < board.length; i++) {
                if (emptyCount === 3) {
                    // If emptyCount === 3, then all pieces have been placed
                    // So we are in the move-pieces phase
                    var validEnding = partialMove.length === 0 || 
                        partialMove[0] === i;
                    if (board[i] === turn && validEnding) {
                        if (board[i - 1] === Owner.none && i % 3 > 0) {
                            legalMoves.push([i, i - 1]);
                        }
                        if (board[i - 3] === Owner.none) {
                            // Off-board moves are undefined,
                            // which does not equal Owner.none
                            legalMoves.push([i, i - 3]);
                        }
                        if (board[i + 1] === Owner.none && i % 3 < 2) {
                            legalMoves.push([i, i + 1]);
                        }
                        if (board[i + 3] === Owner.none) {
                            legalMoves.push([i, i + 3]);
                        }
                    }
                } else {
                    if (board[i] === Owner.none) {
                        legalMoves.push([i]);
                    } else if (board[i] === Owner.player1) {
                        countPlayer1++;
                    } else if (board[i] === Owner.player2) {
                        countPlayer2++;
                    }
                }
                if (board[i] === turn) {
                    playerSquare = i;
                }
            }
            var isLegalTurn = turn === Turn.player1? 
                countPlayer1 === countPlayer2 : // As many Xs as Os
                countPlayer1 === countPlayer2 + 1; // One more X than O
            
            // Make sure there is at least one move in the array
            // (if it is a legal turn)
            legalMoves = legalMoves || [[playerSquare, playerSquare]];
            
            return emptyCount === 3 || isLegalTurn? legalMoves : [];
        },
        
        /* Board playMove(Board board, Move move, Turn turn) {
            Return a Board with the result of playing the input Move 
            on the input Board for the specified player. Return the 
            unchanged input Board if the Move is illegal.
        } */
        playMove: function(board, move, turn) {
            var emptyCount = board.reduce(function (count, square) {
                return square === Owner.none? count + 1 : count; }, 0);
            var isLegalMove = threeMensMorris.gamePlay
                .isLegalMove(board, move, turn);
            
            if (isLegalMove) {
                // Play the move
                var newBoard = board.slice();
                if (emptyCount === 3) {
                    newBoard[move[0]] = Owner.none;
                    newBoard[move[1]] = turn;
                } else {
                    newBoard[move[0]] = turn;
                }
                return newBoard;
            } else { // Illegal move, return board
                return board;
            }
        },
        
        /* boolean isLegalMove(Board board, Move move, Turn turn) {
            Return a boolean indicating whether the input move is legal.
            Should return true if given a currently valid partial move.
            E.g. [3] when the game is a two-move game.
        } */
        isLegalMove: function(board, move, turn) {
            var emptyCount = board.reduce(function (count, square) {
                return square === Owner.none? count + 1 : count; }, 0);
            
            // If the game is currently in the placing phase
            if (emptyCount > 3) {
                return board[move[0]] === Owner.none && move.length <= 1;
            }
            
            // Otherwise, we are moving pieces around.
            // Is this a partial move?
            if (move.length < 2) {
                return board[move[0]] === turn;
            } else {
                var legalMoves = threeMensMorris.gamePlay
                    .getLegalMoves(board, [], turn).map(String);
                return legalMoves.includes(String(move));
            }
        },
        
        /* boolean isCompleteMove(Board board, Move move, Turn turn) {
            Return whether the input Move is a complete Move.
        } */
        isCompleteMove: function(board, move, turn) {
            var emptyCount = board.reduce(function (count, square) {
                return square === Owner.none? count + 1 : count; }, 0);
            return emptyCount === 3? move.length === 2 : move.length === 1;
        },
        
        /* Board createBoard() {
            Return a new game board for the game. MUST NOT BE RANDOM!
        } */
        createBoard: function() {
            return Array(9).fill(Owner.none);
        },
    },
    GUIConfig: {
        /* void drawPiece(Owner pieceType, 
                double x, double y, double w, double h) {
            Draw the piece indicated by pieceType at the specified x and y.
            The input x and y are the center of the square.
        } */
        drawPiece: function(pieceType, x, y, w, h) {
            // Some margin
            var marginX = w * 0.15;
            var marginY = h * 0.15;
            
            // Thick stroke
            strokeWeight(width / 26);
            
            // Draw the symbol
            if (pieceType === Turn.player1) {
                // Draw a red X
                strokeCap(SQUARE);
                stroke(255, 0, 0);
                line(x + marginX, y + marginY, 
                    x + w - marginX, y + h - marginY);
                line(x + w - marginX, y + marginY, 
                    x + marginX, y + h - marginY);
            } else if (pieceType === Turn.player2) {
                // Draw a blue O
                stroke(10, 10, 255);
                ellipse(x + w / 2, y + w / 2, w - marginX * 2, h - marginY * 2);
            }
        },
        
        /* void drawWin(Board board, Turn won, double[][] squarePositions) {
            Draws an indication of which player won. 
            For example, a line in Tic-tac-toe.
            squarePositions is an array of two-element arrays, each the 
            center of the square on the board corrisponding the board array.
        } */
        drawWin: function(board, won, squarePositions) {
            // I copied winner detection logic from the hasWon function above
            // Winning sequences
            var sequences = [
                // Rows
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Columns
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonals
                [0, 4, 8],
                [2, 4, 6]];
            
            strokeCap(PROJECT);
            strokeWeight(width / 20);
            stroke(0, 220, 0);
            for (var s = 0; s < sequences.length; s++) {
                // If all board squares in a sequence are captured, 
                // then that player won.
                if (board[sequences[s][0]] === board[sequences[s][1]] && 
                    board[sequences[s][1]] === board[sequences[s][2]] && 
                    board[sequences[s][0]] === won) {
                    // Draw a line across the sequence
                    var from = squarePositions[sequences[s][0]];
                    var to = squarePositions[sequences[s][2]];
                    line(from[0], from[1], to[0], to[1]);
                }
            }
        },
        
        nameSize: width / 16, // The font size of the game's name on the menu
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 3, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11,
    }
};

/** General variable initalization **/
// Initialize variables and GUI instance
var gameGUI = new GUI();
var gameAI = null, gameBeingPlayed = null, players = null;
var bothHumans = false;

// Delay variable for the computer moves
var delayStart = null;

// Game state init function
var gameState = null;
function initGameState() {
    gameState = {
        turn: Turn.player1,
        won: Owner.none,
        board: gameBeingPlayed.gamePlay.createBoard(),
        moves: [],
        game: gameBeingPlayed
    };
}

// Menu state
var menuState = {
    player1IsComputer: true,
    player2IsComputer: false,
    menuDisplayed: true,
    gameSelected: "Tic-tac-toe",
    games: {
        "Tic-tac-toe": ticTacToe,
        "Hexapawn": hexapawn,
        "4x3 Connect three": connectThree4x3
    },
    initGame: function() {
        // Get the correct GameDefinition
        gameBeingPlayed = menuState.games[menuState.gameSelected];
        // Give the GUI what it needs to handle the game
        gameGUI.init(gameBeingPlayed.GUIConfig, gameBeingPlayed.gamePlay);
        // Create the AI
        gameAI = new GameAI(gameBeingPlayed.gamePlay);
        // "players" indicates whether each player is a computer or human
        players = {
            player1: menuState.player1IsComputer? 
                PlayerTypes.computer : PlayerTypes.human, 
            player2: menuState.player2IsComputer? 
                PlayerTypes.computer : PlayerTypes.human
        };
        // "bothHumans" is a shorter way to write its value
        bothHumans = !menuState.player1IsComputer && 
            !menuState.player2IsComputer;
        // Create the gameState object.
        initGameState();
    }
};

// A nicer font
textFont(createFont("serif"));

/** Event handling and game loop **/
// This helps with the hover effects, 
// so they don't stay there when the mouse goes out.
var mouseIsIn = false;
mouseOver = function() { mouseIsIn = true; };
mouseOut = function() { mouseIsIn = false; };

keyReleased = function() {
    if (key.toString() === "p" && gameAI) {
        // Print the number of boards in gameAI.AIData
        println(Object.keys(gameAI.AIData).length + " boards");
    } else if (key.toString() === "D" && gameAI) {
        var data = gameAI.AIData;
        var JSON = Object.constructor("return JSON;")();
        var dataString = JSON.stringify(data);
        // Strip unnecissary data
        dataString = dataString.replace(/,?"(board|result)":\[[^\]]+\],?/g, "");
        dataString = dataString.replace(/"visitId":\d+,/g, "");
        // Print the data string
        println(dataString);
    } else if (key.toString() === "g" && gameState) {
        // Print the game state without game data
        var JSON = Object.constructor("return JSON;")();
        var stateString = JSON.stringify(gameState);
        stateString = stateString.replace(/,"game":.+/, "}");
        println(stateString);
    }
};

mouseClicked = function() {
    try {
        if (menuState.menuDisplayed) {
            // Pipe the click
            gameGUI.menuClick(menuState, mouseX, mouseY);
        } else if (gameState.won !== Owner.none) {
            // Restart the game
            initGameState();
            loop();
        } else if (bothHumans || gameAI.isReady() && 
                players[gameState.turn] === PlayerTypes.human) {
            // Pipe the click
            gameGUI.humanPlayClick(gameState, mouseX, mouseY);
        }
    } catch (err) {
        // Since Oh noes (mostly) doesn't report errors in mouseClicked
        // and in the draw function, I am doing it myself.
        // Also include a timestamp.
        debug(err, "" + hour() + ":" + minute() + ":" + second());
        
        // However, Oh noes does report {message: "KA_INFINITE_LOOP"} errors,
        // so I'll let him.
        if (err.message === "KA_INFINITE_LOOP") { throw err; }
    }
};

draw = function() {
    try {
        if (menuState.menuDisplayed) {
            gameGUI.drawMenu(menuState,
                mouseIsIn? mouseX : undefined,
                mouseIsIn? mouseY : undefined);
        } else if (gameAI.isReady() || bothHumans) {
            // Play the game
            if (gameState.won === Owner.none &&
                    players[gameState.turn] === PlayerTypes.computer) {
                // Add a move delay for the computer
                if (delayStart === null) {
                    delayStart = millis();
                } else if (millis() - delayStart > 
                    computerMoveMillisecondDelay) {
                    // Computer takes a turn
                    gameAI.playAIBestMove(gameState);
                    // Reset delayStart
                    delayStart = null;
                }
            }
            
            // Render the board
            var humansTurn = players[gameState.turn] === PlayerTypes.human;
            gameGUI.renderGame(gameState, 
                mouseIsIn && humansTurn? mouseX : undefined,
                mouseIsIn && humansTurn? mouseY : undefined);
            
            // Handle victory; stop looping
            if (gameState.won !== Owner.none) {
                noLoop();
            }
        } else {
            // Continue training the AI
            var value = gameAI.continueTraining();
            
            // Optionally print the indexes (for debugging).
            if (keyIsPressed && key.toString() === "i") {
                var indexArray = [];
                var indexes = value.indexes;
                var prefix = value.training? "Training: " : "";
                for (var i = 0; i < indexes.length; i++) {
                    // Add the player1 and player2 indexes
                    indexArray.push(indexes[i].player1 + indexes[i].player2);
                }
                println(prefix + indexArray.toString());
            }
            
            // Draw a loading message
            gameGUI.drawLearningScreen(millis());
        }
    } catch (err) {
        // Since Oh noes (mostly) doesn't report errors in mouseClicked
        // and in the draw function, I am doing it myself.
        // Also include a timestamp.
        debug(err, "" + hour() + ":" + minute() + ":" + second());
        
        // However, Oh noes does report {message: "KA_INFINITE_LOOP"} errors,
        // so I'll let him.
        if (err.message === "KA_INFINITE_LOOP") { throw err; }
    }
};
