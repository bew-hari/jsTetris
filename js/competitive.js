/**
 * Created by bewharichanwong on 5/28/14 AD.
 */

function Competitive(){
    var self = this;

    var tetrisBoard1 = new Board();
    tetrisBoard1.setup("board");
    tetrisBoard1.start();

    var tetrisBoard2 = new Board();
    tetrisBoard2.setup("board2");
    tetrisBoard2.start();

    window.addEventListener('keydown', respond, false);

    function respond(e){

        if (!tetrisBoard1.isStarted)
            return;

        if (e.keyCode == 80)    // 'P' pressed
            tetrisBoard1.pause();

        if (tetrisBoard1.isPaused)
            return;

        switch (e.keyCode){
            case 16:    // shift pressed
                tetrisBoard1.hold();
                break;
            case 32:    // space pressed
                tetrisBoard1.dropDown();
                break;
            case 37:    // left key pressed
                tetrisBoard1.moveLeft();
                break;
            case 38:    // up key pressed
                tetrisBoard1.moveRotate();
                break;
            case 39:    // right key pressed
                tetrisBoard1.moveRight();
                break;
            case 40:    // down key pressed
                tetrisBoard1.moveDown();
                break;
        }
    }
}