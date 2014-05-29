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

    self.isPaused = false;
    self.isStarted = false;

    var board = new Array(Board.BOARD_WIDTH * (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT));
    var timer;

    var score = 0;

    // for display purposes
    var panel;
    var dispBoard;
    var scoreHandle = "Score";
    var nextHandle = "Next";
    var heldHandle = "Held";

    // ID set/get
    self.setID = function(id){ boardID = id;};
    self.getID = function(){ return boardID;};

    self.getCurPiece = function(){ return curPiece;};

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
            document.getElementById(boardID+scoreHandle).innerHTML = score.toString();
            curPiece.setShape(Shape.shapeType.NoShape);
            repaint();
        }
    };

    // paints board by altering table cell classes
    var repaint = function(){

        var cell;
        for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                cell = document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - i].cells[j];
                cell.className = "tetrisCell";
                cell.classList.add(Shape.shapeTypeString[self.shapeAt(j,i)]);
            }
        }

        if (curPiece.getShape() != Shape.shapeType.NoShape){
            var x, y;

            for (i = 0; i < 4; i++){
                x = curX + curPiece.x(i);
                y = curY + curPiece.y(i);

                cell = document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - y].cells[x];
                cell.className = "tetrisCell";
                cell.classList.add(Shape.shapeTypeString[curPiece.getShape()]);
            }
        }
    };

    // creates new piece and sets current position of new piece
    var newPiece = function () {
        curPiece.setShape(nextPiece.getShape());
        nextPiece.setRandomShape();

        curX = Board.BOARD_WIDTH / 2 - 1;
        curY = Board.BOARD_HEIGHT + 1;

        if (overflow()){
            clearInterval(timer);
            self.isStarted = false;
            window.removeEventListener('keydown', self.respond, false);
            alert("Game Over!");
        }

        drawNext();
    };

    // moves piece to specified (newX,newY) coordinates
    // returns true if possible, false otherwise
    self.movePiece = function(newPiece, newX, newY){
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
        if (!self.movePiece(curPiece, curX, curY - 1)){
            pieceDropped();
        }
    };

    self.dropDown = function(){
        while(self.movePiece(curPiece, curX, curY-1)){}
    };

    // updates game board
    var tick = function(){
        oneLineDown();
    };

    // starts board and sets timer
    self.start = function(){
        self.isStarted = true;

        clearBoard();
        nextPiece.setRandomShape();

        newPiece();

        document.getElementById(boardID+scoreHandle).innerHTML = score.toString();
        timer = setInterval(function(){ tick();}, Board.SPEED);
    };

    self.pause = function(){
        if (!self.isStarted)
            return;

        self.isPaused = !self.isPaused;

        if (self.isPaused){
            clearInterval(timer);
        }
        else {
            timer = setInterval(function(){ tick();}, Board.SPEED);
        }
    };


    self.setPanel = function(){
        panel = new Panel(boardID);
        panel.addScoreHandle(scoreHandle);
        panel.addNextHandle(nextHandle);
        panel.addHeldHandle(heldHandle);
    };

    self.getPanel = function(){ return panel.getPanel();};


    self.setDispBoard = function(){
        dispBoard = document.createElement('table');
        dispBoard.className = "board";
        dispBoard.id = boardID;

        var row, cell;
        for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
            row = document.createElement('tr');
            if (i < 4)
                row.className = "spawnArea";
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                cell = document.createElement('td');
                cell.classList.add("tetrisCell");
                cell.classList.add(Shape.shapeTypeString[0]);
                row.appendChild(cell);
            }
            dispBoard.appendChild(row);
        }
    };

    self.getDispBoard = function(){ return dispBoard;};


    var drawNext = function(){
        var nextPreviewTable = document.getElementById(boardID + nextHandle + "Preview");

        var x, y;
        var cell;
        var minX = nextPiece.minX();
        var minY = nextPiece.minY();

       /* alert(nextPiece.x(0) + " " + nextPiece.y(0) + "\n" +
            nextPiece.x(1) + " " + nextPiece.y(1) + "\n" +
            nextPiece.x(2) + " " + nextPiece.y(2) + "\n" +
            nextPiece.x(3) + " " + nextPiece.y(3) + "\n");*/

        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 2; j++){
                nextPreviewTable.rows[i].cells[j].className = "previewCell";
            }
        }

        for (i = 0; i < 4; i++){
            x = nextPiece.x(i) - minX;
            y = nextPiece.y(i) - minY;

            cell = nextPreviewTable.rows[3-x].cells[1-y];
            //cell.className = "previewCell";
            cell.classList.add(Shape.shapeTypeString[nextPiece.getShape()]);
        }
    };

    var drawHeld = function(){

    };

    self.respond = function(e){

        //e.preventDefault();

        if (!self.isStarted)
            return;

        if (e.keyCode == 80)    // 'P' pressed
            self.pause();

        if (self.isPaused)
            return;

        switch (e.keyCode){
            case 16:    // shift pressed

                break;
            case 32:    // space pressed
                self.dropDown();
                break;
            case 37:    // left key pressed
                self.movePiece(curPiece, curX - 1, curY);
                break;
            case 38:    // up key pressed
                self.movePiece(curPiece.rotateRight(), curX, curY);
                break;
            case 39:    // right key pressed
                self.movePiece(curPiece, curX + 1, curY);
                break;
            case 40:    // down key pressed
                self.movePiece(curPiece, curX, curY - 1);
                break;
        }
    };
}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.SPWN_HEIGHT = 4;
Board.SPEED = 300;



function setup(tetrisBoard, boardID){
    numPlayers++;

    tetrisBoard.setID(boardID);

    var canvas = document.getElementById("tetrisCanvas");

    tetrisBoard.setDispBoard();
    canvas.appendChild(tetrisBoard.getDispBoard());

    tetrisBoard.setPanel();
    canvas.appendChild(tetrisBoard.getPanel());

    window.addEventListener('keydown', tetrisBoard.respond, false);
}