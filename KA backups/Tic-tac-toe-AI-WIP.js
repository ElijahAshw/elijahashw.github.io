/** User adjustable settings **/
// Game options: "tic-tac-toe", "hexapawn", "tic-tac-toe-mini"
var gameBeingPlayed = "tic-tac-toe-mini";
var player1IsComputer = true;
var player2IsComputer = false;
var computerMoveMillisecondDelay = 100;

/** @Rules
 * Tic-tac-toe is a well known game that is played on a 3x3 board.
 * Players take turns placing their symbol (X or O) in any open square.
 * First to get three in a row wins. X goes first.
 * If the board fills up without a victor, it is a tie.
 * 
 * Hexapawn is less well known. I learned 
 * about it (and this method of machine learning) from a youtube video.
 *  (I forgot which youtube video.) Here is another source of the same thing:
 * https://www.instructables.com/Matchbox-Mini-Chess-Learning-Machine/
 * ---- 
 * Hexapawn is also played on a 3x3 board. Each player starts
 * the game with three chess pawns on each side of the board.
 * Players take turns moving their pawns like ordinary chess pawns.
 *  a. One step straight forward onto an empty square, OR
 *  b. One step diagonally forward onto an enemy pawn, which gets eliminated.
 * You win if one of these is true:
 *  1. You get a pawn to the other side of the board
 *  2. The other player has no moves left (this includes having no pieces).
 * 
 * Tic-tac-toe-mini is my invention. It is played on a 2x2 board.
 * As in classic tic-tac-toe, players take turns placing their symbol 
 * (X or O) in any open square.
 * If X claims a whole column, X wins.
 * If O claims a whole row, O wins.
 * If the board is full without a victor, it is a tie.
 * 
 * 
**/

/** Program structure overview **/
/**
 * =============== Definition of terms and types ===============
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
    Move twoPartMove = [3, 6]; // Chess uses two part moves.
 * 
 * A Color is just a color value from the color() function.
 * 
 * A Square is named by an int.
 * 
 * A GameDefinition is an object with the following properties:
    GameDefinition gameDefinition = {
        gamePlay: {
            int boardSize: 3,  // The size of the game's board
                // For example, 3 for Tic-tac-toe
            int maxDepth: 4, // How many moves ahead to look
            
            Owner hasWon(Board board, Turn turn) { 
                Return an Owner indicating who has won the input board.
            },
            
            Move[] getLegalMoves(Board board, Move partialMove, Turn turn) {
                Return an array of Moves representing all legal moves 
                for the specified player starting with partialMove.
                Ideally returns an empty array if the board has been won,
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
            int boardSize: 3, // The size of the game's board
                // For example, 3 for Tic-tac-toe
            
            void drawPiece(Owner pieceType, 
                    double x, double y, double w, double h) {
                Draw the piece indicated by pieceType at the specified x and y.
                The input x and y are the center of the square.
            },
            
            void drawWin(Board board, Turn won, double[][] squarePositions) {
                Draws an indication of which player won. 
                For example, a line in Tic-tac-toe.
                squarePositions is an array of two-element arrays, each the 
                center of the square on the board corrisponding to 
                the board array.
            }
            
            Color squareColor: color(128, 128, 128), // The square color
            Color hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
            double squareSize: width / 3, // The rendered size of board squares
            
            // Dots are only drawn for two-part moves
            Color dotColor: color(100, 100, 100, 100),
            double dotDiameter: squareSize / 4,
        }
    };
 * 
 * 
 * =============== Specifications for my program ===============
 * 
 * How AIData is stored as specified below this comment block.
 * 
 * The environment (along with libraries) stores a GameState.
 * A GameState has the the following properties:
    GameState gameState = {
        Turn turn: <The current turn>,
        Owner won: <Which player has won the game>,
        Board board: <The current board>,
        Move[] moves: <A list of all moves made so far in the game.
            In games with two-part moves, the last Move in the array 
            may be incomplete>,
    };
 * 
 * My classes are JavaScript classes with Java style types.
 * The class GUI has the following properties:
    class GUI {
        Internally stores:
            GameDefinition.GUIConfig config,
            GameDefinition.gamePlay gamePlay
        
        GUI constructor(GameDefinition.GUIConfig config, 
                GameDefinition.gamePlay gamePlay) {
            Returns a new GUI object.
        }
        
        GameState renderGame(GameState gameState, 
                double mouseX, double mouseY) {
            Renders a game using the gameState and original GUIConfig.
            Does not draw hover if mouseX or mouseY are undefined.
            Returns the GameState for convienience.
        }
        
        void drawLearningScreen(double phase) {
            Draws a loading screen based on the phase argument.
        }
        
        int squareClicked(GameState gameState, double mouseX, double mouseY) {
            Returns the index of the square that was clicked.
        }
    }
 * 
 * The class GameAI has the following properties:
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
        
        boolean train() {
            Simpler interface for the trainAIFrom method.
            Returns a boolean indicating whether training is complete.
        }
        
        boolean teach(GameState game) {
            Teaches the AI about the outcome of a specific game.
            Returns a boolean indicating whether this data changed 
            how the AI plays.
            This will do nothing (and return false) if this.learnWhilePlaying
            is false.
        }
        
        Move getAIBestMove(GameState gameState) {
            Returns the best move for the current player 
            according to this.AIData
        }
        
        Iterator trainAIFrom(GameState gameState (optional) ) {
            Train the new parts of this.AIData that were added by 
            this.getAIBestMove()
            Returns an iterator to avoid freezing the page.
            If gameState is omitted, this method will start training at the top.
            Training consists of 
                1. Flagging moves that permit the opponent to win
                    (this is calculated for both players).
                2. Calculating how many sub-moves lead to draws.
        }
        
        Iterator expandAIDataFrom(GameState gameState) {
            Adds to this.AIData to meet the maxDepth config property
            based on the input state.
            Sets this.trained to false if this.AIData was added to.
        }
        
        boolean isTrained() {
            Return whether this.AIData is fully trained.
        }
    }
 * 
 * 
 * Next up: More details on the machine learning.
**///

/** ==== How the machine learning works ==== **/
/**
 * This program currently relies on the game being simple enough that all 
 * possible games can be analyzed. Even so, it has been tricky to implement. 
 * I may later add an option for a board scoring function, to handle more 
 * complex games.
 * --------------
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
        // Filled out examples for tic-tac-toe-mini:
        "none,none,none,none": {
            "board": ["none","none","none","none"],
            "player1": [
                {"move": [0],"canWin": "none",
                    "result": ["player1","none","none","none"]},
                {"move": [1],"canWin": "none",
                    "result": ["none","player1","none","none"]},
                {"move": [2],"canWin": "none",
                    "result": ["none","none","player1","none"]},
                {"move": [3],"canWin": "none",
                    "result": ["none","none","none","player1"]}
            ],
            "player2": [],
            "visitId": 1
        },
        "player1,none,none,none": {
            "board": ["player1","none","none","none"],
            "won": "none",
            "visitId": 1,
            "player1": [],
            "player2": [
                {"move": [1],"canWin": "player1",
                    "result": ["player1","player2","none","none"]},
                {"move": [2],"canWin": "none",
                    "result": ["player1","none","player2","none"]},
                {"move": [3],"canWin": "player1",
                    "result": ["player1","none","none","player2"]}
            ]
        },
        ...
    };
 * If canWin is a Turn, that means that player can force a win if that move 
 * is played. If canWin = Owner.tie, then there is no way to avoid a draw
 * if that move is played.
 * 
 * Even though this program work by brute force, it does teach itself
 * and (in tic-tac-toe) it played forks I didn't even know about.
 * It can also switch to a new game easily.
 * 
 * Tic-tac-toe can be easily brute forced if caching is implemented, 
 * given that there are only 6046 potentially reachable boards.
    function factorial(n) { return n <= 1? 1 : n * factorial(n - 1); }
    function combination(a, b) {
        return factorial(a) / (factorial(b) * factorial(a - b));
    }
    function calcTicTacToeBoards(squares) {
        var boards = 0;
        for (var i = 0; i <= squares / 2; i++) {
            boards += combination(squares, i) * 
                combination(squares - i, i); // X's turn
            boards += combination(squares, i + 1) * 
                combination(squares - (i + 1), i); // O's turn
        }
        return boards;
    }
    println(calcTicTacToeBoards(9)); // → 6046
 * 
**/

/** "Enums" **/
var Turn = {player1: "player1", player2: "player2", 
    next: function (turn) {
        return turn === "player2"? "player1" : "player2";
    }
}; // I have firmly assumed that there are only two players
var Owner = {none: "none", player1: "player1", player2: "player2", tie: "tie"};
var PlayerTypes = {human: "human", computer: "computer"};

/** LongRunning library. Helps with long running operations. **/
/* Usage example: 
var slowFunc = LongRunning(function() {
    for (var i = 0; i < 1000 * 1000 * 1000; i++) {
        println(floor(random(1, 100)));
        if (i % 10000 === 0) {
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
        Returns a new GUI object.
    } */
    function GUI(config, gamePlay) {
        // Hold on to game play functions
        this.gamePlay = gamePlay;
        
        // Clone the config
        config = Object.create(config);
        
        // Helper function
        function ifBlank(propertyName, value) {
            if (!(propertyName in config)) {
                config[propertyName] = value;
            }
        }
        
        // Set the default properties as specified
        ifBlank("backgroundColor", color(255, 255, 255));
        ifBlank("textColor", color(0, 0, 0));
        ifBlank("squareColor", color(128, 128, 128));
        ifBlank("hoverOverlayColor", color(0, 0, 0, 60));
        ifBlank("squareSize", width / 3);
        ifBlank("dotColor", color(100, 100, 100, 100));
        ifBlank("dotDiameter", config.squareSize / 4);
        
        // Remember the config
        this.config = config;
    }
    
    /* GameState renderGame(GameState gameState, 
            double mouseX, double mouseY) {
        Renders a game using the gameState and original GUIConfig.
        Does not draw hover if mouseX or mouseY are undefined.
        Returns the GameState for convienience.
    } */
    GUI.prototype.renderGame = function(gameState, mouseX, mouseY) {
        // Background
        background(56, 56, 56);
        
        // Board offset and local config binding
        var config = this.config;
        var boardPixelSize = config.boardSize * config.squareSize;
        var xOffset = (width - boardPixelSize) / 2;
        var yOffset = (height - boardPixelSize) / 2;
        
        // Draw each square background
        fill(config.squareColor);
        rectMode(CORNER);
        strokeWeight(width / 100);
        stroke(0, 0, 0);
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % config.boardSize) * config.squareSize + xOffset;
            var y = Math.floor(s / config.boardSize) * 
                config.squareSize + yOffset;
            rect(x, y, config.squareSize, config.squareSize);
        }
        
        // Draw the game pieces
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % config.boardSize) * config.squareSize + xOffset;
            var y = Math.floor(s / config.boardSize) * 
                config.squareSize + yOffset;
            var type = gameState.board[s];
            config.drawPiece(type, x, y, config.squareSize, config.squareSize);
        }
        
        // Calculate the suggested move
        var mouseSquare = this.mouseSquare(gameState, mouseX, mouseY);
        var suggestedMove = [mouseSquare.index];
        var incompleteMove = gameState.moves.length > 0 && 
            !this.gamePlay.isCompleteMove(gameState.board, 
                gameState.moves.at(-1), gameState.turn);
        if (incompleteMove) {
            var newMove = gameState.moves.at(-1).slice();
            newMove.push(mouseSquare.type);
            suggestedMove = newMove;
        }
        
        // Draw move options if applicable (dots)
        if (incompleteMove) {
            var moves = this.gamePlay.getLegalMoves(
                gameState.board, gameState.moves.at(-1), gameState.turn);
            var newMoveIndex = gameState.moves.length;
            
            noStroke();
            fill(config.dotColor);
            for (var m = 0; m < moves.length; m++) {
                // Draw a dot
                var x = (moves[m][newMoveIndex] % config.boardSize) * 
                    config.squareSize + xOffset + config.squareSize / 2;
                var y = Math.floor(moves[m][newMoveIndex] / config.boardSize) * 
                    config.squareSize + yOffset + config.squareSize / 2;
                ellipse(x, y, config.dotDiameter, config.dotDiameter);
            }
        }
        
        // Draw win effect
        if (gameState.won !== Owner.none) {
            this.drawWinScreen(gameState);
        }
        
        // Cursor and hover effect
        if (mouseX !== undefined && mouseY !== undefined && 
                this.gamePlay.isLegalMove(gameState.board, 
                    suggestedMove, gameState.turn)) {
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
    
    /* void drawWinScreen(GameState gameState) {
        Draws a semi-transparent overlay indicating who won and
        how to play again.
    } */
    GUI.prototype.drawWinScreen = function(gameState) {
        // Calculate xOffset and yOffset (copied from above)
        var config = this.config;
        var boardPixelSize = config.boardSize * config.squareSize;
        var xOffset = (width - boardPixelSize) / 2;
        var yOffset = (height - boardPixelSize) / 2;
        
        // Create squarePositions array
        var squarePositions = [];
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % config.boardSize) * 
                config.squareSize + xOffset + config.squareSize / 2;
            var y = Math.floor(s / config.boardSize) * 
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
        noStroke();
        rect(0, 0, width, height);
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
    
    /* int squareClicked(GameState gameState, double mouseX, double mouseY) {
        Returns the index of the square that was clicked.
    } */
    GUI.prototype.mouseSquare = function(gameState, mouseX, mouseY) {
        var boardPixelSize = this.config.boardSize * this.config.squareSize;
        var xOffset = (width - boardPixelSize) / 2;
        var yOffset = (height - boardPixelSize) / 2;
        var mouseSquare = { x: undefined, y: undefined, index: -1, type: "" };
        for (var s = 0; s < gameState.board.length; s++) {
            var x = (s % this.config.boardSize) * 
                this.config.squareSize + xOffset;
            var y = Math.floor(s / this.config.boardSize) * 
                this.config.squareSize + yOffset;
            
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

/** GameAI class **/
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
        this.maxDepth = this.gamePlay.maxDepth || Infinity;
        this.iterationsPerFrame = this.gamePlay.iterationsPerFrame || 8000;
        this.visitId = 0;
        this.trained = false;
        this.dataComplete = false;
        this.learnWhilePlaying = learnWhilePlaying;
        
        // Verify this.initialBoard
        if (typeof this.initialBoard !== "object") {
            throw {message: "TypeError: gamePlay.createBoard() failed " +
                "to return a board!"};
        } else if (this.initialBoard.length !== Math.pow(
                this.gamePlay.boardSize, 2)) {
            throw {message: "TypeError: gamePlay.createBoard() returned " +
                "a board of the wrong size!"};
        }
    }
    
    /* void continueTraining() {
        Simple interface for creating and training the AI.
        Returns a boolean indicating whether training is complete.
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
            unsureVictory: [],
            opponentVictory: []
        };
        
        // Catagorize the moves
        for (var i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].canWin === Turn.next(gameState.turn)) {
                // This means that this move will lose
                moveOptions.opponentVictory.push(possibleMoves[i]);
            } else if (possibleMoves[i].canWin === gameState.turn) {
                // This means that the computer can win from here
                moveOptions.computerVictory.push(possibleMoves[i]);
            } else {
                // This move won't lose, but it isn't a forced win either.
                moveOptions.unsureVictory.push(possibleMoves[i]);
            }
        }
        
        // Choose the best type of moves that is availible
        var bestMoves;
        if (moveOptions.computerVictory.length > 0) {
            // The computer can win! Yay!
            bestMoves = moveOptions.computerVictory;
        } else if (moveOptions.unsureVictory.length > 0) {
            // Not as good as winning, but better than losing
            bestMoves = moveOptions.unsureVictory;
        } else {
            // Default to the worst moves if there are no others
            bestMoves = moveOptions.opponentVictory;
        }
        
        // Randomly choose one of the best moves to make things more fun
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
        gameState.won = this.gamePlay.hasWon(gameState.board, gameState.turn);
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
            return {move: move, canWin: Owner.none, 
                result: result};
        }
        
        // Initialize
        var startAt;
        if (gameState) {
            startAt = this.AIData[gameState.board.toString()];
        } else {
            var board = this.initialBoard.slice();
            startAt = { board: board };
            startAt[Turn.player1] = this.gamePlay
                .getLegalMoves(board, [], Turn.player1)
                .map(moveToObject, { board: board, turn: Turn.player1 });
            startAt[Turn.player2] = this.gamePlay
                .getLegalMoves(board, [], Turn.player2)
                .map(moveToObject, { board: board, turn: Turn.player2 });
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
                }
            } else 
            // Handle going down
            if (depth < this.maxDepth) {
                // Bind the initial board and the new board
                var initialBoard = boards[depth].board;
                var newBoard = current(boards)[current(indexes)].result;
                
                // Check for the possiblility of redoing work
                if (this.AIData[newBoard.toString()]) {
                    // This board has already been done, advance index
                    indexes[depth][players[depth]]++;
                    continue;
                }
                
                // Test for a victory
                var won = this.gamePlay.hasWon(newBoard, players[depth]);
                
                // Calculate possible moves
                var player1Moves = won !== Owner.none? [] :
                    this.gamePlay.getLegalMoves(newBoard, [], Turn.player1);
                var player2Moves = won !== Owner.none? [] :
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
                if (previousMove.canWin === Owner.none) {
                    var otherMoves = boards[depth][players[depth - 1]];
                    var moves = otherMoves.concat(playerMoves);
                    var outcome = null;
                    for (var i = 0; i < moves.length; i++) {
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
        
        // debugger; // jshint ignore:line
        
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
        boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
        maxDepth: Infinity, // How many moves ahead to look
        /* Owner hasWon(Board board, Turn turn) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn) {
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
            Return a boolean indicating whether the input move is legal
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
        boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
        
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
        boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
        maxDepth: Infinity, // How many moves ahead to look
        
        /* Owner hasWon(Board board, Turn turn) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn) {
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
                return turn;
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
                if (board[i] === Owner.player1) {
                    // Squares ahead, from left to right
                    if (board[i + 2] === Owner.player2 && i % 3 !== 0) {
                        legalMoves.push([i, i + 2]);
                    } else if (board[i + 3] === Owner.none) {
                        legalMoves.push([i, i + 3]);
                    } else if (board[i + 4] === Owner.player2 && i % 3 !== 2) {
                        legalMoves.push([i, i + 4]);
                    }
                } else if (board[i] === Owner.player2) {
                    // Squares ahead, from left to right
                    if (board[i - 4] === Owner.player1 && i % 3 !== 0) {
                        legalMoves.push([i, i - 4]);
                    } else if (board[i - 3] === Owner.none) {
                        legalMoves.push([i, i - 3]);
                    } else if (board[i - 2] === Owner.player1 && i % 3 !== 2) {
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
            Return a boolean indicating whether the input move is legal
        } */
        isLegalMove: function(board, move, turn) {
            var legalMove = board[move[0]] === turn && 
                move[0] >= 0 && move[0] <= 9;
            
            if (move.length === 2) {
                legalMove = legalMove && move[1] >= 0 && move[1] <= 9;
                if (turn === Turn.player1) {
                    if (move[0] === move[1] + 2 && move[0] % 3 || 
                            move[0] === move[1] + 4) {
                        legalMove = legalMove && 
                            board[move[1]] === Owner.player2;
                    } else if (move[0] === move[1] + 3) {
                        legalMove = legalMove && 
                            board[move[1]] === Owner.none;
                    }
                } else if (turn === Turn.player2) {
                    if (move[0] === move[1] - 4 || move[0] === move[1] - 2) {
                        legalMove = legalMove && 
                            board[move[1]] === Owner.player1;
                    } else if (move[0] === move[1] - 3) {
                        legalMove = legalMove && 
                            board[move[1]] === Owner.none;
                    }
                }
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
        boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
        
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
                    fill(255, 255, 255, 100);
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

// Tic-tac-toe-mini GameDefinition
var ticTacToeMini = {
    gamePlay: {
        boardSize: 2, // The size of the game's board; 3 for Tic-tac-toe
        maxDepth: Infinity, // How many moves ahead to look
        /* Owner hasWon(Board board, Turn turn) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board, turn) {
            if (board[0] === Owner.player1 && board[2] === Owner.player1 ||
                board[1] === Owner.player1 && board[3] === Owner.player1) {
                return Owner.player1;
            }
            
            if (board[0] === Owner.player2 && board[1] === Owner.player2 ||
                board[2] === Owner.player2 && board[3] === Owner.player2) {
                return Owner.player2;
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
        
        /* boolean drawLearningScreen(Board board, Move move, Turn turn) {
            Return a boolean indicating whether the input move is legal
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
            return Array(4).fill(Owner.none);
        },
    },
    GUIConfig: {
        boardSize: 2, // The size of the game's board; 3 for Tic-tac-toe
        
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
            // Draw a line across the victory
            
            var squares;
            if (board[0] === Owner.player1 && board[2] === Owner.player1) {
                squares = [0, 2];
            }
            if (board[1] === Owner.player1 && board[3] === Owner.player1) {
                squares = [1, 3];
            }
            if (board[0] === Owner.player2 && board[1] === Owner.player2) {
                squares = [0, 1];
            }
            if (board[2] === Owner.player2 && board[3] === Owner.player2) {
                squares = [2, 3];
            }
            
            strokeCap(PROJECT);
            strokeWeight(width / 20);
            stroke(0, 220, 0);
            var from = squarePositions[squares[0]];
            var to = squarePositions[squares[1]];
            line(from[0], from[1], to[0], to[1]);
        },
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 3, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11,
    }
};

/** Initalization and game state **/
var games = {
    "tic-tac-toe": ticTacToe,
    "hexapawn": hexapawn,
    "tic-tac-toe-mini": ticTacToeMini,
};
if (!(gameBeingPlayed in games)) {
    throw {message: "Unknown game: \"'" + gameBeingPlayed + "'\""};
} // Test
gameBeingPlayed = games[gameBeingPlayed];
var gameGUI = new GUI(gameBeingPlayed.GUIConfig, gameBeingPlayed.gamePlay);
var gameAI = new GameAI(gameBeingPlayed.gamePlay);
var players = {
    player1: player1IsComputer? PlayerTypes.computer : PlayerTypes.human, 
    player2: player2IsComputer? PlayerTypes.computer : PlayerTypes.human
}; // Object indicating who each player is: human or computer
// Game state
var gameState = null;
function initGameState() {
    gameState = {
        turn: Turn.player1,
        won: Owner.none,
        board: gameBeingPlayed.gamePlay.createBoard(),
        moves: [],
    };
}
initGameState();
// Delay variable for the computer moves
var delayStart = null;

textFont(createFont("serif"));

/** Event handling **/
var mouseIsIn = false;
mouseOver = function() { mouseIsIn = true; };
mouseOut = function() { mouseIsIn = false; };

mouseClicked = function() {
    try {
        if (gameState.won === Owner.none && gameAI.isReady() && 
                players[gameState.turn] === PlayerTypes.human) {
            // The human plays!
            var mouseSquare = gameGUI.mouseSquare(gameState, mouseX, mouseY);
            
            // Calculate the selected move
            var suggestedMove = [mouseSquare.index];
            var incompleteMove = gameState.moves.length > 0 && 
                    !gameBeingPlayed.gamePlay.isCompleteMove(gameState.board, 
                        gameState.moves.at(-1), gameState.turn);
            if (incompleteMove) {
                var newMove = gameState.moves.at(-1).slice();
                newMove.push(mouseSquare.index);
                suggestedMove = newMove;
            }
            
            // Play the move
            if (gameBeingPlayed.gamePlay.isLegalMove(gameState.board, 
                    suggestedMove, gameState.turn)) {
                if (gameBeingPlayed.gamePlay.isCompleteMove(gameState.board, 
                        suggestedMove, gameState.turn)) {
                    
                    gameState.board = gameBeingPlayed.gamePlay.playMove(
                        gameState.board, suggestedMove, gameState.turn);
                    gameState.turn = Turn.next(gameState.turn);
                    gameState.won = gameBeingPlayed
                        .gamePlay.hasWon(gameState.board, gameState.turn);
                }
                if (incompleteMove) {
                    var totalMoves = gameState.moves.length;
                    gameState.moves[totalMoves - 1] = suggestedMove;
                } else {
                    gameState.moves.push(suggestedMove);
                }
            }
        }
    } catch (err) {
        debug(err, "" + hour() + ":" + minute() + ":" + second());
    }
};

draw = function() {
    try {
        if (gameAI.isReady()) {
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
            
            // Handle victory; set mouseClicked to a reset function.
            if (gameState.won !== Owner.none) {
                var wasMouseClicked = mouseClicked;
                mouseClicked = function () {
                    initGameState();
                    mouseClicked = wasMouseClicked;
                    loop();
                };
                noLoop();
            }
        } else {
            // Continue training the AI
            gameAI.continueTraining();
            
            // Draw a loading message
            gameGUI.drawLearningScreen(millis());
        }
    } catch (err) {
        debug(err, "" + hour() + ":" + minute() + ":" + second());
    }
};
