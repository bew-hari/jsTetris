/**
 * Created by bewharichanwong on 5/28/14 AD.
 */


function QuickStart(){
    var self = this;

    var tetrisBoard = new Board();
    tetrisBoard.setup("board", Board.MODE.QKST, Board.STYLE.STD);
    tetrisBoard.start();

    window.addEventListener('keydown', respond, false);

    function respond(e){

        if (!tetrisBoard.isStarted)
            return;

        if (e.keyCode == 80)    // 'P' pressed
            tetrisBoard.pause();

        if (tetrisBoard.isPaused)
            return;

        switch (e.keyCode){
            case 16:    // shift pressed
                tetrisBoard.hold();
                break;
            case 32:    // space pressed
                tetrisBoard.dropDown();
                break;
            case 37:    // left key pressed
                tetrisBoard.moveLeft();
                break;
            case 38:    // up key pressed
                tetrisBoard.moveRotate();
                break;
            case 39:    // right key pressed
                tetrisBoard.moveRight();
                break;
            case 40:    // down key pressed
                tetrisBoard.moveDown();
                break;
        }
    }
}
