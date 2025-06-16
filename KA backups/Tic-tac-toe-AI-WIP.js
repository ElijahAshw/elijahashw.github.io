/** User settings **/
// Game options: "tic-tac-toe"
var gameBeingPlayed = "tic-tac-toe";
var player1IsComputer = false;
var player2IsComputer = false;

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
            int boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
            int maxDepth: 4, // How many moves ahead to look
            
            Owner hasWon(Board board) { 
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
            int boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
            
            void drawPiece(Owner pieceType, 
                    double x, double y, double w, double h) {
                Draw the piece indicated by pieceType at the specified x and y.
                The input x and y are the center of the square.
            },
            
            void drawWin(Board board, Turn won, int[][] squarePositions) {
                Draws an indication of which player won. 
                For example, a line in Tic-tac-toe.
                squarePositions is an array of two-element arrays, each the 
                center of the square on the board corrisponding the board array.
            }
            
            // These constants are optional. The shown value is the default.
            Color backgroundColor: color(255, 255, 255), // Behind the squares
            
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
        
        void drawLoadingScreen(double phase) {
            Draws a loading screen based on the phase argument.
        }
        
        int squareClicked(GameState gameState, double mouseX, double mouseY) {
            Returns the index of the square that was clicked.
        }
    }
    
 * The class GameAI has the following properties:
    class GameAI {
        Internally stores:
            GameDefinition.gamePlay gamePlay,
            AIData aiData,
            Iterator trainingIterator,
            Iterator createDataIterator,
            boolean trained, // Whether the AIData has been fully trained
            boolean learnWhilePlaying,
        
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
 * This program relies on the game being small enough that all move can be
 * analyzed. Even so, it is tricky to implement. I may later add a user-provided
 * board scoring function.
 * 
 * After training is finished, the final data is roughly in this format:
    AIData data = {
        <Board.toString()>: {
            board: <Board>, 
            player1: [
                {move: <Move>, score: <int>, canWin: <Owner>},
                ...
            ],
            player2: [
                {move: <Move>, score: <int>, canWin: <Owner>},
                ...
            ]
        },
        // Filled out example for tic-tac-toe:
        "none,none,none,none,player1,none,none,none,none" :
            {
                board: ["none","none","none","none",
                    "player1","none","none","none","none"],
                player1: [], // Player1 cannot have two symbols more than player2
                player2: [
                    {move: [0], score: <IDK>, canWin: "none"},
                    {move: [1], score: <IDK>, canWin: "player1"},
                    {move: [2], score: <IDK>, canWin: "none"},
                    {move: [3], score: <IDK>, canWin: "player1"},
                    // [4] is an illegal move on this board.
                    {move: [5], score: <IDK>, canWin: "player1"},
                    {move: [6], score: <IDK>, canWin: "none"},
                    {move: [7], score: <IDK>, canWin: "player1"},
                    {move: [8], score: <IDK>, canWin: "none"},
                ]
            },
    };
 * If canWin is not "none", that means one player can always win if that move 
 * is played.
 * The score int indicates how many possible games down this route lead to the
 * current player winning.
 * 
 * 
**/

/** "Enums" **/
var Turn = {player1: "player1", player2: "player2", 
    next: function (turn) {
        return turn === "player2"? "player1" : "player2";
    }
};
var Owner = {none: "none", player1: "player1", player2: "player2", tie: "tie"};
var PlayerTypes = {human: "human", computer: "computer"};

/** LongRunning library. Helps with long running operations. **/
/* Usage example: 
var slowFunc = LongRunning(function() {
    for (var i = 0; i < 1000 * 1000 * 1000; i++) {
        println(floor(random(1, 100)));
        if (i % 100000 === 0) {
            LongRunning.pause();
        }
    }
}); */
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
    var KAInfiniteLoop = /\n +__env__\.KAInfiniteLoopCount[^]+?KAInfiniteLoopProtect.+\n.+\n.+/g;
    var pauseExpr = /__env__\.LongRunning\s*\.\s*pause\s*\(\s*\)\s*;/g;
    
    function LongRunning(func) {
        if (typeof func !== "function") { return func; }
        func = String(func);
        func = func.replace(functionStart, "return function* (");
        func = func.replace(KAInfiniteLoop, "");
        func = func.replace(pauseExpr, "yield;");
        return Object.constructor("__env__", func)(globalThis);
    }
    
    LongRunning.pause = function() {
        throw {message: "LongRunning.pause shouldn't actually be called. " +
            "Did you forget to call LongRunning() on the wrapping function?"};
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
        background(this.config.backgroundColor);
        
        // Board offset and local config binding
        var config = this.config;
        var boardPixelSize = config.boardSize * config.squareSize;
        var xOffset = (width - boardPixelSize) / 2;
        var yOffset = (height - boardPixelSize) / 2;
        
        // Draw each square background
        fill(config.squareColor);
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
        
        // Draw won effect
        if (gameState.won !== Owner.none) {
            var squarePositions = [];
            for (var s = 0; s < gameState.board.length; s++) {
                var x = (s % config.boardSize) * 
                    config.squareSize + xOffset + config.squareSize / 2;
                var y = Math.floor(s / config.boardSize) * 
                    config.squareSize + yOffset + config.squareSize / 2;
                squarePositions.push([x, y]);
            }
            if (gameState.won !== Owner.tie) {
                config.drawWin(gameState.board, gameState.won, squarePositions);
            }
            
            // Fade overlay and words
            fill(0, 0, 0, 100);
            noStroke();
            rect(0, 0, width, height);
            fill(255, 255, 255);
            textAlign(CENTER, CENTER);
            textSize(width / 6);
            text("Click to play\nagain!", width / 2, height / 2);
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
    
    /* void drawLoadingScreen(double phase) {
        Draws a loading screen based on the phase argument.
    } */
    GUI.prototype.drawLoadingScreen = function(phase) {
        // Background
        background(this.config.backgroundColor);
        
        // Cursor
        cursor("progress");
        
        // Text styling
        fill(this.config.textColor);
        textSize(width / 6);
        textAlign(CENTER, CENTER);
        
        // Center position
        var x = width / 2, y = height / 2;
        // "Loading" message
        var dotsWidth = textWidth("...");
        text("Loading", x - dotsWidth / 2, y);
        // Moving dots
        var loadingWidth = textWidth("Loading");
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

/** GameAI class UNFINISHED **/
var GameAI = (function() {
    /* Internally stores:
        GameDefinition.gamePlay gamePlay,
        AIData aiData,
        Iterator trainingIterator,
        Iterator createDataIterator,
        Board initialBoard, // Helps access to the top of the AI pseudo-tree
        int maxDepth, // Feature not fully working; causes problems
        boolean trained, // Whether the AIData has been fully trained
        boolean dataComplete, // Whether the AIData is filled out
        boolean learnWhilePlaying */
    
    /* GameAI constructor(
            GameDefinition.gamePlay gamePlay, boolean learnWhilePlaying) {
        Returns a new AI object.
    } */
    function GameAI(gamePlay, learnWhilePlaying, maxDepth) {
        this.gamePlay = gamePlay;
        this.AIData = {};
        this.trainingIterator = null;
        this.createDataIterator = null;
        this.initialBoard = this.gamePlay.createBoard();
        this.maxDepth = maxDepth || Infinity;
        this.trained = false;
        this.dataComplete = false;
        this.learnWhilePlaying = learnWhilePlaying;
    }
    
    /* boolean generate() {
        Simple interface for creating and training the AI.
        Returns a boolean indicating whether training is complete.
    } */
    GameAI.prototype.generate = function() {
        if (!this.dataComplete) {
            // Utilize the Iterator interface
            if (!this.createDataIterator) {
                this.createDataIterator = this.expandAIDataFrom();
            }
            this.dataComplete = this.createDataIterator.next().done;
            return false;
        } else if (!this.trained) {
            // Utilize the Iterator interface
            if (!this.trainingIterator) {
                this.trainingIterator = this.trainAIFrom();
            }
            this.trained = this.trainingIterator.next().done;
            return false;
        } else {
            return true;
        }
    };
    
    /* boolean teach(GameState game) {
        Teaches the AI about the outcome of a specific game.
        Returns a boolean indicating whether this data changed 
        how the AI plays.
        This will do nothing (and return false) if this.learnWhilePlaying
        is false.
    } */
    GameAI.prototype.teach = function(game) {
        
    }; // UNFINISHED
    
    /* Move getAIBestMove(GameState gameState) {
        Returns the best move for the current player 
        according to this.AIData
    } */
    GameAI.prototype.getAIBestMove = function(gameState) {
        var boardObject = this.AIData[gameState.board.toString()];
        var moveOptions = boardObject[gameState.turn];
        var bestMove = moveOptions[0].move; // Make sure we do return a move
        var bestScore = moveOptions[0].score;
        // The variable i starts at 1 so we don't re-check first move.
        for (var i = 1; i < moveOptions.length; i++) {
            if (moveOptions[i].canWin === gameState.turn) {
                bestMove = moveOptions[i].move;
                // If this player can win for sure, there are no better moves!
                break;
            } else if (moveOptions[i].canWin === Owner.none) {
                if (bestScore < moveOptions[i].score) { // Is this a better move?
                    bestMove = moveOptions[i].move;
                    bestScore = moveOptions[i].score;
                }
            }
        }
        return bestMove;
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
        gameState.won = this.gamePlay.hasWon(gameState.board);
        gameState.moves.push(computerMove);
    };
    
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
    GameAI.prototype.trainAIFrom = function(gameState) {
        var startAt, instance = this;
        if (gameState) {
            startAt = this.AIData[gameState.board.toString()];
        } else {
            startAt = this.AIData[this.initialBoard.toString()];
        }
        
        
        return{next:function(){return{done:!0};}};
    }; // UNFINISHED
    
    /* Iterator expandAIDataFrom(GameState gameState) {
        Adds to this.AIData to meet the maxDepth config property
        based on the input state.
        Sets this.trained to false if this.AIData was added to.
    } */
    /*
    AIData data = {
        <Board.toString()>: {
            board: <Board>, 
            player1: [
                {move: <Move>, score: <int>, canWin: <Owner>},
                ...
            ],
            player2: [
                {move: <Move>, score: <int>, canWin: <Owner>},
                ...
            ]
        }
    };
    */
    GameAI.prototype.expandAIDataFrom = (function(gameState) {
        // Initialize
        var startAt;
        if (gameState) {
            startAt = this.AIData[gameState.board.toString()];
        } else {
            var board = this.initialBoard.slice();
            startAt = { board: board };
            startAt[Turn.player1] = this.gamePlay
                .getLegalMoves(board, [], Turn.player1);
            startAt[Turn.player2] = this.gamePlay
                .getLegalMoves(board, [], Turn.player2);
            this.AIData[board.toString()] = startAt;
        }
        
        // Create the data!
        // Use one loop to walk through many layers
        // Stack variables
        var depth = 0; // The current depth
        var indexes = [ {} ]; // Current index in boards' moves
        indexes[Turn.player1] = 0;
            // First item in the inner array is for the first player's moves,
        indexes[Turn.player2] = 0;
            // Second item is for the second player's moves.
        var players = [0]; // First or second player's moves above
        var boards = [startAt];
        var scores = [0];
        
        // Helper functions
        function moveToObject(move) {
            return {move: move, score: 0, canWin: Owner.none};
        }
        function current(what) {
            return what[depth][players[depth]];
        }
        
        // The One Loop
        while (current(indexes) < boards[0][players[depth]].length) {
            // Handle switching to a new array
            if (current(indexes) > current(boards).length) {
                // Reached the end of a list of moves
                // Either go up, or switch to the next move list
                if (players[depth] === Turn.player1) {
                    // Next move list in the board
                    players[depth] = Turn.player2;
                    // Reset the index
                    indexes[depth][players[depth]] = 0;
                } else {
                    // Go up a board
                    depth--;
                    // Advance the index
                    indexes[depth][players[depth]]++;
                }
            } else 
            // Handle going down
            if (depth < this.maxDepth) {
                // Bind the move object and initial board
                var moveObj = current(boards)[current(indexes)];
                var initialBoard = boards[depth].board;
                
                // Create the new board
                var newBoard = this.gamePlay.playMove(
                        initialBoard, moveObj.move, players[depth]);
                
                // Calculate possible moves
                var player1Moves = this.gamePlay.getLegalMoves(
                        newBoard, [], Turn.player1);
                var player2Moves = this.gamePlay.getLegalMoves(
                        newBoard, [], Turn.player2);
                
                // Convert possible moves to move objects
                var player1MoveObjects = player1Moves.map(moveToObject);
                var player2MoveObjects = player2Moves.map(moveToObject);
                
                // Create the new board object
                var newBoardObject = { board: newBoard };
                newBoardObject[Turn.player1] = player1MoveObjects;
                newBoardObject[Turn.player2] = player2MoveObjects;
                
                // Add the new board object
                this.AIData[newBoard.toString()] = newBoardObject;
                
                // Move the pointer to the beginning of the new move array
                depth++;
                players[depth] = Turn.player1;
                indexes[depth][players[depth]] = 0;
            } else 
            // Handle the case that maxDepth has been reached
            {
                //?
            }
            LongRunning.pause();
        }
    }); // UNFINISHED
    
    /* boolean isReady() {
        Return whether this.AIData is ready to use.
    } */
    GameAI.prototype.isReady = function() {
        return this.dataComplete && this.trained;
    };
    
    return GameAI;
})();

/** Game definitions **/
// Tic-tac-toe!
var ticTacToe = {
    gamePlay: {
        boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
        maxDepth: 4, // How many moves ahead to look
        /* Owner hasWon(Board board) { 
            Return an Owner indicating who has won the input board.
        } */
        hasWon: function(board) {
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
            if (partialMove.length > 0) {
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
                countPlayer1 === countPlayer2 : 
                countPlayer1 + 1 === countPlayer2;
            
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
        
        /* void drawWin(Board board, Turn won, int[][] squarePositions) {
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
        
        // These constants are optional. The shown value is the default.
        backgroundColor: color(255, 255, 255), // Behind the squares
        textColor: color(0, 0, 0),
        
        squareColor: color(170, 170, 170), // The square color
        hoverOverlayColor: color(0, 0, 0, 60), // A hover overlay
        squareSize: width / 3, // The rendered size of board squares
        
        // Dots are only drawn for two-part moves
        dotColor: color(100, 100, 100, 100),
        dotDiameter: width / 11,
    }
};

/** Initalization and game state **/
gameBeingPlayed = gameBeingPlayed === "tic-tac-toe"? ticTacToe : null;
var gameGUI = new GUI(gameBeingPlayed.GUIConfig, gameBeingPlayed.gamePlay);
var gameAI = new GameAI(gameBeingPlayed.gamePlay);
var players = {
    player1: player1IsComputer? PlayerTypes.computer : PlayerTypes.human, 
    player2: player2IsComputer? PlayerTypes.computer : PlayerTypes.human
}; // Object indicating who each player is: human or computer
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
                        .gamePlay.hasWon(gameState.board);
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
        debug(err);
    }
};

draw = function() {
    try {
        if (gameAI.isReady()) {
            // Play the game
            if (gameState.won === Owner.none &&
                    players[gameState.turn] === PlayerTypes.computer) {
                // Computer takes a turn
                gameAI.playAIBestMove(gameState);
            }
            
            // Render the board
            gameGUI.renderGame(gameState, 
                mouseIsIn? mouseX : undefined,
                mouseIsIn? mouseY : undefined);
            
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
            gameAI.generate();
            
            // Draw a loading message
            gameGUI.drawLoadingScreen(millis());
        }
    } catch (err) {
        debug(err);
    }
};
