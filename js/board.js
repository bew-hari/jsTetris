/**
 * Created by bewharichanwong on 5/25/14 AD.
 */



function Board(){
    var self = this;
    var boardID;

    var curPiece = new Shape();
    var nextPiece = new Shape();
    var heldPiece = new Shape();

    var isPaused = false;

    var curX = 0;
    var curY = 0;

    var board = new Array(Board.BOARD_WIDTH * (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT));
    var timer;

    // ID set/get
    self.setID = function(id){ boardID = id;};
    self.getID = function(){ return boardID;};

    // returns the shape at coordinates (x,y)
    self.shapeAt = function(x, y){ return board[y * Board.BOARD_WIDTH + x];};

    // clears board
    var clearBoard = function(){
        for (var i = 0; i < Board.BOARD_WIDTH * (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT); i++)
            board[i] = Shape.shapeType.NoShape;
    };


    // paints board by altering table cell classes
    var repaint = function(){

        for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - i].cells[j]
                    .className = Shape.shapeTypeString[self.shapeAt(j,i)];
            }
        }

        if (curPiece.getShape() != Shape.shapeType.NoShape){
            var x, y;
            for (i = 0; i < 4; i++){
                x = curX + curPiece.x(i);
                y = curY + curPiece.y(i);
                document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - y].cells[x]
                    .className = Shape.shapeTypeString[curPiece.getShape()];
            }
        }
    };

    // creates new piece and sets current position of new piece
    var newPiece = function () {
        curPiece.setShape(nextPiece.getShape());
        nextPiece.setRandomShape();

        curX = Board.BOARD_WIDTH / 2 - 1;
        curY = Board.BOARD_HEIGHT + 2;

        if (overflow()){
            clearInterval(timer);
            alert("Game Over!");
        }
    };

    // moves piece to specified (newX,newY) coordinates
    // returns true if possible, false otherwise
    var movePiece = function(newPiece, newX, newY){
        var x, y, i;
        for (i = 0; i < 4; i++) {
            x = newX + newPiece.x(i);
            y = newY + newPiece.y(i);
            if (x < 0 || x >= Board.BOARD_WIDTH || y < 0 || y >= Board.BOARD_HEIGHT+Board.SPWN_HEIGHT)
                return false;
            if (self.shapeAt(x, y) != Shape.shapeType.NoShape)
                return false;
        }

        curPiece = newPiece;
        curX = newX;
        curY = newY;
        repaint();
        return true;
    };

    // checks if any dropped piece goes above legal height
    var overflow = function(){
        for (var i = 0; i < Board.BOARD_WIDTH; i++){
            if (self.shapeAt(i, Board.BOARD_HEIGHT) != Shape.shapeType.NoShape)
                return true;
        }

        return false;
    };

    // updates board contents
    var pieceDropped = function(){
        var x,y;
        for (var i = 0; i < 4; i++) {
            x = curX + curPiece.x(i);
            y = curY + curPiece.y(i);
            board[(y * Board.BOARD_WIDTH) + x] = curPiece.getShape();
        }

        newPiece();
    };

    // advances current piece down one line
    var oneLineDown = function(){
        if (!movePiece(curPiece, curX, curY - 1)){
            pieceDropped();
        }
    };

    // updates game board
    var tick = function(){

        oneLineDown();
    };

    // starts board and sets timer
    self.start = function(){

        clearBoard();
        nextPiece.setRandomShape();
        newPiece();

        timer = setInterval(function(){ tick();}, 300);
    };


    self.respond = function(e){
        switch (e.keyCode){
            case 37:
                // left key pressed
                movePiece(curPiece, curX - 1, curY);
                break;
            case 38:
                // up key pressed
                movePiece(curPiece.rotateRight(), curX, curY);
                break;
            case 39:
                // right key pressed
                movePiece(curPiece, curX + 1, curY);
                break;
            case 40:
                movePiece(curPiece, curX, curY - 1);
                break;

        };
    };
}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.SPWN_HEIGHT = 4;
