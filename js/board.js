/**
 * Created by bewharichanwong on 5/25/14 AD.
 */



function Board(){
    var self = this;
    var boardID;

    var curX = 0;
    var curY = 0;
    var curPiece = new Shape();
    var nextPiece = new Shape();
    var heldPiece = new Shape();

    var isPaused = false;
    var isStarted = false;

    var board = new Array(Board.BOARD_WIDTH * (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT));
    var timer;

    var score = 0;

    var panel;

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

    // removes full lines on the board
    var removeFullLines = function(){
        var numLines = 0;

        for (var i = Board.BOARD_HEIGHT - 1; i >= 0; i--){
            var isFull = true;

            // check if line has gap
            for (var j = 0; j < Board.BOARD_WIDTH; j++) {
                if (self.shapeAt(j, i) == Shape.shapeType.NoShape) {
                    isFull = false;
                    break;
                }
            }

            // copy everything above full line down one line
            if (isFull){
                numLines++;
                for (var k = i; k < Board.BOARD_HEIGHT - 1; k++) {
                    for (j = 0; j < Board.BOARD_WIDTH; j++)
                    board[(k * Board.BOARD_WIDTH) + j] = self.shapeAt(j, k + 1);
                }
            }
        }

        if (numLines > 0){
            score += numLines;
            document.getElementById(boardID+"Score").innerHTML = score.toString();
            curPiece.setShape(Shape.shapeType.NoShape);
            repaint();
        }
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
            isStarted = false;
            window.removeEventListener('keydown', self.respond, false);
            alert("Game Over!");
        }
    };

    // moves piece to specified (newX,newY) coordinates
    // returns true if possible, false otherwise
    var movePiece = function(newPiece, newX, newY){
        var x, y;
        for (var i = 0; i < 4; i++) {
            x = newX + newPiece.x(i);
            y = newY + newPiece.y(i);
            if (x < 0 || x >= Board.BOARD_WIDTH || y < 0 || y >= Board.BOARD_HEIGHT+Board.SPWN_HEIGHT)
                return false;
            else if (self.shapeAt(x, y) != Shape.shapeType.NoShape)
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

        removeFullLines();
        newPiece();
    };

    // advances current piece down one line
    var oneLineDown = function(){
        if (!movePiece(curPiece, curX, curY - 1)){
            pieceDropped();
        }
    };

    var dropDown = function(){
        while(movePiece(curPiece, curX, curY-1)){}
    };

    // updates game board
    var tick = function(){
        oneLineDown();
    };

    // starts board and sets timer
    self.start = function(){
        isStarted = true;

        clearBoard();
        nextPiece.setRandomShape();
        newPiece();

        document.getElementById(boardID+'Score').innerHTML = score.toString();
        timer = setInterval(function(){ tick();}, Board.SPEED);
    };

    self.pause = function(){
        if (!isStarted)
            return;

        isPaused = !isPaused;

        if (isPaused){
            clearInterval(timer);
        }
        else {
            timer = setInterval(function(){ tick();}, Board.SPEED);
        }
    };


    self.setPanel = function(){
        var scoreHandle = "Score";

        panel = new Panel(boardID);
        panel.addBox(scoreHandle).setScoreHandle(scoreHandle);
    };

    self.getPanel = function(){
        return panel.getPanel();
    };

    self.respond = function(e){

        //e.preventDefault();

        if (!isStarted)
            return;

        if (e.keyCode == 80)    // 'P' pressed
            self.pause();

        if (isPaused)
            return;

        switch (e.keyCode){
            case 32:    // space pressed
                dropDown();
                break;
            case 37:    // left key pressed
                movePiece(curPiece, curX - 1, curY);
                break;
            case 38:    // up key pressed
                if(!movePiece(curPiece.rotateRight(), curX, curY))
                    curPiece.rotateLeft();
                break;
            case 39:    // right key pressed
                movePiece(curPiece, curX + 1, curY);
                break;
            case 40:    // down key pressed
                movePiece(curPiece, curX, curY - 1);
                break;
        }
    };
}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.SPWN_HEIGHT = 4;
Board.SPEED = 300;