/**
 * Created by bewharichanwong on 5/25/14 AD.
 */



function Board(){
    var self = this;
    var boardID;
    var otherBoard;
    var mode;

    var curX = 0;
    var curY = 0;
    var curPiece = new Shape();
    var nextPiece = new Shape();
    var heldPiece = new Shape();
    var piecesPlayed = 0;

    self.isPaused = false;
    self.isStarted = false;
    self.heldSwapped = false;
    var isSwapped = false;
    var isSpedUp = false;

    var board = new Array(Board.BOARD_WIDTH * (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT));
    var curSpeed = Board.BASE_SPEED;
    var timer;
    var timeOut;

    var score = 0;
    var level = 1;

    // for display purposes
    var scoreHandle = "Score";
    var nextHandle = "Next";
    var heldHandle = "Held";
    var levelHandle = "Level";

    // private member getters
    self.getID = function(){ return boardID;};
    self.getMode = function(){ return mode;};
    self.getHeldPieceShape = function(){ return heldPiece.getShape();};
    self.getCurX = function(){ return curX;};
    self.getCurY = function(){ return curY;};
    self.getScore = function(){ return score;};
    self.getBoard = function(){ return board;};
    self.getPiecesPlayed = function(){ return piecesPlayed;};

    // modifiers
    self.setHeldPieceShape = function(shape){ heldPiece.setShape(shape); drawHeld();};
    self.modifyScore = function(change){ score += change;};
    self.updateScore = function(){ document.getElementById(boardID+scoreHandle).innerHTML = score.toString();};
    self.setPiecesPlayed = function(numPlayed){ piecesPlayed = numPlayed;};

    // returns the shape at coordinates (x,y)
    self.shapeAt = function(x, y){ return board[y * Board.BOARD_WIDTH + x];};


    // sets up boardID and canvas DOM elements
    self.setup = function(id, gameMode, style){
        boardID = id;
        mode = gameMode;

        var canvas = document.getElementById("tetrisCanvas");

        var container = document.createElement('div');
        container.className = "tetrisContainer";

        if (style == Board.STYLE.STD){
            container.appendChild(setGameBoard());
            container.appendChild(setPanel(style));
        }
        else if (style == Board.STYLE.ALT){
            container.appendChild(setPanel(style));
            container.appendChild(setGameBoard());
        }

        canvas.appendChild(container);
    };

    self.setOtherBoard = function(other){
        otherBoard = other;
    };

    // sets up panel DOM elements
    var setPanel = function(style){
        var panel = new Panel(boardID, style);
        panel.addScoreHandle(scoreHandle);
        panel.addNextHandle(nextHandle);
        panel.addHeldHandle(heldHandle);

        if (mode != Board.MODE.COMP)
            panel.addLevelHandle(levelHandle);

        return panel.getPanel();
    };

    // sets up game board DOM elements
    var setGameBoard = function(){
        var dispBoard = document.createElement('table');
        dispBoard.className = "board";
        dispBoard.id = boardID;

        var row, cell;
        for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
            row = document.createElement('tr');
            if (i < 4)
                row.className = "spawnArea";
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                cell = document.createElement('td');
                cell.classList.add("boardCell");
                cell.classList.add(Shape.shapeTypeString[0]);
                row.appendChild(cell);
            }
            dispBoard.appendChild(row);
        }

        return dispBoard;
    };

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

            if (mode == Board.MODE.COOP){
                // check if line has gap
                for (j = 0; j < Board.BOARD_WIDTH; j++) {
                    if ((self.shapeAt(j, i) == Shape.shapeType.NoShape)
                        || (otherBoard.shapeAt(j, i) == Shape.shapeType.NoShape)) {
                        isFull = false;
                        break;
                    }
                }

                // copy everything above full line down one line
                if (isFull){
                    numLines++;
                    for (k = i; k < Board.BOARD_HEIGHT - 1; k++){
                        for (j = 0; j < Board.BOARD_WIDTH; j++){
                            board[(k * Board.BOARD_WIDTH) + j] = self.shapeAt(j, k + 1);
                            otherBoard.getBoard()[(k * Board.BOARD_WIDTH) + j] = otherBoard.shapeAt(j, k + 1);
                        }
                    }
                }
            }
            else {      // if (mode == Board.MODE.COMP)
                var j,k;
                // check if line has gap
                for (j = 0; j < Board.BOARD_WIDTH; j++) {
                    if (self.shapeAt(j, i) == Shape.shapeType.NoShape) {
                        isFull = false;
                        break;
                    }
                }

                // copy everything above full line down one line
                if (isFull){
                    numLines++;
                    for (k = i; k < Board.BOARD_HEIGHT - 1; k++) {
                        for (j = 0; j < Board.BOARD_WIDTH; j++)
                            board[(k * Board.BOARD_WIDTH) + j] = self.shapeAt(j, k + 1);
                    }
                }
            }
        }

        if (numLines > 0){
            score += numLines;
            self.updateScore();

            if (mode == Board.MODE.COOP){
                otherBoard.modifyScore(numLines);
                otherBoard.updateScore();
            }

            curPiece.setShape(Shape.shapeType.NoShape);
            repaint();
        }

        self.updateScore();
    };

    // paints board by altering table cell classes
    var repaint = function(){

        var cell;
        for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                cell = document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - i].cells[j];
                cell.className = "boardCell";
                cell.classList.add(Shape.shapeTypeString[self.shapeAt(j,i)]);
            }
        }

        if (curPiece.getShape() != Shape.shapeType.NoShape){
            var x, y;

            for (i = 0; i < 4; i++){
                x = curX + curPiece.x(i);
                y = curY + curPiece.y(i);

                cell = document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - y].cells[x];
                cell.className = "boardCell";
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

        drawNext();

        if (overflow()){
            self.stop();
            self.drawLose();

            if (mode != Board.MODE.QKST)
                otherBoard.stop();

            if (mode == Board.MODE.COMP){
                otherBoard.drawWin();
            }
            else if (mode == Board.MODE.COOP){
                otherBoard.drawLose();
            }
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

        // enable holding/swapping
        isSwapped = false;
        self.heldSwapped = false;

        if (++piecesPlayed == 20) {
            self.levelUp();
            if (mode == Board.MODE.COOP)
                otherBoard.levelUp();
        }

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

    // updates game board
    var tick = function(){
        oneLineDown();
    };

    // starts board and sets timer
    self.start = function(){
        self.isStarted = true;
        isSwapped = false;

        clearBoard();
        document.getElementById(boardID+scoreHandle).innerHTML = score.toString();

        if (mode != Board.MODE.COMP)
            document.getElementById(boardID+levelHandle).innerHTML = level.toString();

        nextPiece.setRandomShape();
        newPiece();

        timer = setInterval(function(){ tick();}, curSpeed);
    };

    // pauses board
    self.pause = function(){
        if (!self.isStarted)
            return;

        self.isPaused = !self.isPaused;

        if (self.isPaused){
            clearInterval(timer);
            if (isSpedUp)
                timeOut.pause();

            var cell;
            for (var i = 0; i < Board.BOARD_HEIGHT+Board.SPWN_HEIGHT; i++){
                for (var j = 0; j < Board.BOARD_WIDTH; j++){
                    cell = document.getElementById(boardID).rows[Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1 - i].cells[j];
                    cell.className = "boardCell";
                    cell.classList.add(Shape.shapeTypeString[8]);
                }
            }
        }
        else {
            timer = setInterval(function(){ tick();}, curSpeed);
            if (isSpedUp)
                timeOut.resume();

            repaint();
        }
    };

    self.stop = function(){
        clearInterval(timer);
        if (isSpedUp)
            timeOut.pause();
        self.isStarted = false;
    };

    self.drawWin = function(){

        // do win graphics here
    };

    self.drawLose = function(){
        curPiece.setShape(Shape.shapeType.NoShape);
        for (var i = 0; i < Board.BOARD_HEIGHT; i++){
            for (var j = 0; j < Board.BOARD_WIDTH; j++){
                board[i * Board.BOARD_WIDTH + j] = Shape.shapeType.GrayShape;
            }
        }
        repaint();
    };

    // draws the next piece
    var drawNext = function(){
        var nextPreviewTable = document.getElementById(boardID + nextHandle + "Preview");

        var x,y;
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

        var shape = Shape.shapeTypeString[nextPiece.getShape()];

        for (i = 0; i < 4; i++){
            x = nextPiece.x(i) - minX;
            y = nextPiece.y(i) - minY;

            nextPreviewTable.rows[3-x].cells[1-y].classList.add(shape);
        }
    };

    // draws held piece
    var drawHeld = function(){
        var heldPreviewTable = document.getElementById(boardID + heldHandle + "Preview");

        var x,y;
        var minX = nextPiece.minX();
        var minY = nextPiece.minY();

        for (var m = 0; m < 4; m++){
            for (var n = 0; n < 2; n++){
                heldPreviewTable.rows[m].cells[n].className = "previewCell";
            }
        }

        var shape = Shape.shapeTypeString[heldPiece.getShape()];

        for (var p = 0; p < 4; p++){
            x = heldPiece.x(p) + 1;
            y = heldPiece.y(p) - minY;
            heldPreviewTable.rows[3-x].cells[1-y].classList.add(shape);
        }
    };

    self.moveLeft = function(){ movePiece(curPiece, curX - 1, curY);};
    self.moveRight = function(){ movePiece(curPiece, curX + 1, curY);};
    self.moveDown = function(){ movePiece(curPiece, curX, curY - 1);};
    self.moveRotate = function(){ movePiece(curPiece.rotateRight(), curX, curY)};
    self.dropDown = function(){

        var legalDown = 0;
        var legal = true;
        var x,y;

        while(legal){
            for (var i = 0; i < 4; i++){
                x = curX + curPiece.x(i);
                y = curY + curPiece.y(i);
                if (self.shapeAt(x,y - legalDown) != Shape.shapeType.NoShape)
                    legal = false;
            }
            legalDown++;
        }

        movePiece(curPiece, curX, curY-legalDown+2);
    };
    self.hold = function(){
        if (isSwapped)
            return;

        // disable further holding
        isSwapped = true;

        curX = Board.BOARD_WIDTH / 2 - 1;
        curY = Board.BOARD_HEIGHT - 1;

        if (heldPiece.getShape() == Shape.shapeType.NoShape){
            heldPiece.setShape(curPiece.getShape());
            newPiece();
        }
        else {
            var tempShape = heldPiece.getShape();
            heldPiece.setShape(curPiece.getShape());
            curPiece.setShape(tempShape);
        }

        repaint();
        drawHeld();
    };

    self.swapHeld = function(other){
        if ((mode != Board.MODE.COOP) || (otherBoard.getMode() != Board.MODE.COOP))
            return;

        if (self.heldSwapped || other.heldSwapped)
            return;

        var shape = other.getHeldPieceShape();
        other.setHeldPieceShape(heldPiece.getShape());
        heldPiece.setShape(shape);
        drawHeld();

        self.heldSwapped = true;
    };

    self.upOneLine = function(){

        // copy every cell up one line
        for (var i = Board.BOARD_HEIGHT - 1; i > 0; i--) {
            for (var j = 0; j < Board.BOARD_WIDTH; j++)
                board[(i * Board.BOARD_WIDTH) + j] = self.shapeAt(j, i - 1);
        }

        // randomize gap
        var rand = Math.floor(Math.random() * Board.BOARD_WIDTH);
        for (i = 0; i < Board.BOARD_WIDTH; i++){
            if (i != rand)
                board[i] = Shape.shapeType.GrayShape;
            else
                board[i] = Shape.shapeType.NoShape;
        }

        /*var x, y;
        for (i = 0; i < 4; i++) {
            x = curY + curPiece.x(i);
            y = curY + curPiece.y(i);
            if (self.shapeAt(x, y) != Shape.shapeType.NoShape)
                pieceDropped();
        }*/

        if (!movePiece(curPiece, curX, curY))
            movePiece(curPiece, curX, curY + 1);

        repaint();
    };

    // speeds up the board by increment for a duration of duration
    self.tempSpeedUp = function(increment, duration){
        // disable stacking
        if (isSpedUp)
            return false;

        isSpedUp = true;

        speedUp(increment);
        timeOut = new TimeOut(function(){ resetSpeed();}, 5000);

        return true;
    };

    var speedUp = function(increment){

        curSpeed -= increment;

        if (curSpeed < Board.MAX_SPEED)
            curSpeed = Board.MAX_SPEED;

        // set new interval
        clearInterval(timer);
        timer = setInterval(function(){ tick();}, curSpeed);

        return true;
    };

    var resetSpeed = function(){
        curSpeed = Board.BASE_SPEED;

        clearInterval(timer);
        timer = setInterval(function(){ tick();}, curSpeed);
        isSpedUp = false;
    };

    self.levelUp = function(){
        // reset number of played pieces
        piecesPlayed = 0;

        // update level
        level++;
        document.getElementById(boardID+levelHandle).innerHTML = level.toString();

        // speed up board
        speedUp(50);
    };
}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.SPWN_HEIGHT = 4;
Board.BASE_SPEED = 600;      // base interval between ticks (in milliseconds)
Board.MAX_SPEED = 100;

Board.MODE = {
    QKST: 0,
    COMP: 1,
    COOP: 2
};

Board.STYLE = {
    STD: 0,
    ALT: 1
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

function TimeOut(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) <= milliseconds){

    }
}