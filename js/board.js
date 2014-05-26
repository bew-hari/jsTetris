/**
 * Created by bewharichanwong on 5/25/14 AD.
 */



function Board(){
    var curPiece = new Shape();
    var nextPiece = new Shape();
    var heldPiece = new Shape();

    var isPaused = false;
    var isDropped = false;

    var curX = 0;
    var curY = 0;

    var board = new Array(Board.BOARD_WIDTH * Board.BOARD_HEIGHT);

    // returns the shape at coordinates (x,y)
    this.shapeAt = function(x, y){ return board[y * Board.BOARD_WIDTH + x];};

    // clears board
    var clearBoard = function(){
        for (var i = 0; i < Board.BOARD_WIDTH * Board.BOARD_HEIGHT; i++)
            board[i] = Shape.shapeType.NoShape;
    };

    // creates new piece and sets current position of new piece
    var newPiece = function(){
        curPiece.setShape(nextPiece.getShape());
        nextPiece.setRandomShape();

        curX = Board.BOARD_WIDTH / 2;
        curY = Board.BOARD_HEIGHT - 1 + curPiece.minY();
    };

    // updates game board
    var update = function(){
        if (isDropped){
            isDropped = false;
            newPiece();
        }
    };

    // starts board and set timer
    this.start = function(){
        isDropped = false;

        clearBoard();
        nextPiece.setRandomShape();
        newPiece();

        setInterval(function(){ update()}, 400);
    };

}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.prototype.printBoardSize = function (){
    document.write("Width: " + this.constructor.BOARD_WIDTH + "<br>Height: " + this.constructor.BOARD_HEIGHT + "<br>");
};
