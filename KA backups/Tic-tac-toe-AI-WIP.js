/**
 * ==== Definition of terms and types ====
 * 
 * I will indicate types in my examples in the style of Java types.
 * 
 * A "Turn" is a string, either "player1" or "player2"
 * An "Owner" is who owns a given square. These are strings, one of
 *  "none", "player1", or "player2"
 * Turn currentTurn = "player2";
 * Owner squareTwoOwner = "none";
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
            int maxDepth: 9, // How many moves ahead to look
            Owner hasWon(Board board, Turn turn) { 
                Return an Owner indicating who has won the input board.
            },
            Move[] getLegalMoves(Board board, Turn turn) {
                Return an array of Moves representing all legal moves 
                for the specified player
                Ideally returns an empty array if the board has been won,
                but this function should never be called on a won board.
            },
            Board playMove(Board board, Move move, Turn turn) {
                Return a Board with the result of playing the input Move on 
                the input Board for the specified player. Return the unchanged 
                input Board if the Move is illegal.
            },
            boolean isLegalMove(Board board, Move move, Turn turn) {
                Return a boolean indicating whether the input move is legal
            },
            Board createNewBoard() {
                Return a new game board for the game.
            },
        },
        GUIConfig: {
            int boardSize: 3, // The size of the game's board; 3 for Tic-tac-toe
            void drawPiece(Owner pieceType, double x, double y) {
                Draw the piece indicated by pieceType at the specified x and y.
                The input x and y are the center of the square.
            },
            void drawWin(Board board, Turn won) {
                Draws an indication of which player won. 
                For example, a line in Tic-tac-toe.
            }
            
            // These constants are optional. The shown value is the default.
            Color backgroundColor: color(255, 255, 255), // Behind the squares
            
            Color squareColor: color(128, 128, 128), // The square color
            Color hoverOverlayColor: color(0, 0, 0, 20), // A hover overlay
            double squareSize: width / 3, // The rendered size of board squares
            
            // Dots are only drawn for two-part moves
            Color dotColor: color(100, 100, 100, 100),
            double dotDiameter: squareSize / 10,
        }
    };
 * 
 * 
 * ==== Specifications for my program's components ====
 * 
 * The AI data is stored as an array of objects, like this:
    AIData data = [
        {Move move: <Move index 0 from getLegalMoves(board, turn)>,
            Owner won: <An Owner indicating if the board has been won>,
            Turn player: <A Turn indicating who made the above Move>,
            Owner canWin: <Indicates which player can force 
                a victory from this move>,
            int potentialDraws: 3 <A number indicating how many ways there are 
                to draw after this move>,
            AIData[] results: <Another AIData array. 
                This is empty if the board is won, or if the maxDepth has 
                been hit>
        },
        {Move move: <Move index 1 from getLegalMoves(board, turn)>,
            Owner won: <An Owner indicating if the board has been won>,
            Turn player: <A Turn indicating who made the above Move>,
            Owner canWin: <Which player can force a victory from this move>,
            int potentialDraws: 1,
            AIData[] results: <Another AIData array>
        },
        {Move move: <Move index 2 from getLegalMoves(board, turn)>,
            Owner won: <An Owner indicating if the board has been won>,
            Turn player: <A Turn indicating who made the above Move>,
            Owner canWin: <Which player can force a victory from this move>,
            int potentialDraws: 9,
            AIData[] results: <Another AIData array>
        },
        <etc>
    ];
    
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
        
        GUI constructor(GameDefinition.GUIConfig config) {
            Returns a new GUI object.
        }
        
        GameState render(GameState gameState) {
            Renders a game using the gameState and original GUIConfig.
            Returns the GameState for convienience.
        }
        
        int mouseClicked(mouseX, mouseY) {
            Returns the index of the square that was clicked.
        }
    }
    
 * The class GameAI has the following properties:
    class GameAI {
        Internally stores:
            GameDefinition.gamePlay gamePlay,
            AIData aiData,
            Iterator trainingIterator,
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
        
        void expandAIDataFrom(GameState gameState) {
            Adds to this.AIData to meet the maxDepth config property
            based on the input state.
            Sets this.trained to false if this.AIData was added to.
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
    }
**/
// jshint esnext: true















