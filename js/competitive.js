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

        if (!tetrisBoard1.isStarted || !tetrisBoard2.isStarted)
            return;

        if (e.keyCode == 80){   // 'P' pressed
            tetrisBoard1.pause();
            tetrisBoard2.pause();
        }

        if (tetrisBoard1.isPaused || tetrisBoard2.isPaused)
            return;

        switch (e.keyCode){
            case 16:    // shift pressed
                if (e.location == 1)
                    tetrisBoard1.hold();
                else
                    tetrisBoard2.hold();
                break;





            case 9:    // tab pressed
                e.preventDefault();
                tetrisBoard1.dropDown();
                break;
            case 65:    // 'A' key pressed
                tetrisBoard1.moveLeft();
                break;
            case 87:    // 'W' key pressed
                tetrisBoard1.moveRotate();
                break;
            case 68:    // 'D' key pressed
                tetrisBoard1.moveRight();
                break;
            case 83:    // 'S' key pressed
                tetrisBoard1.moveDown();
                break;
            case 49:    // '1' key pressed
                if (tetrisBoard1.getScore() >= 3){
                    tetrisBoard2.upOneLine();
                    tetrisBoard1.modifyScore(-3);
                    tetrisBoard1.updateScore();
                }
                break;
            case 50:    // '2' key pressed
                if (tetrisBoard1.getScore() >= 3){
                    tetrisBoard2.dropDown();
                    tetrisBoard1.modifyScore(-3);
                    tetrisBoard1.updateScore();
                }
                break;
            case 51:    // '3' key pressed
                if (tetrisBoard1.getScore() >= 5){
                    if (tetrisBoard2.speedUp(100, 5000)){
                        tetrisBoard1.modifyScore(-5);
                        tetrisBoard1.updateScore();
                    }
                }
                break;





            case 13:    // enter pressed
                e.preventDefault();
                tetrisBoard2.dropDown();
                break;
            case 37:    // left key pressed
                tetrisBoard2.moveLeft();
                break;
            case 38:    // up key pressed
                tetrisBoard2.moveRotate();
                break;
            case 39:    // right key pressed
                tetrisBoard2.moveRight();
                break;
            case 40:    // down key pressed
                tetrisBoard2.moveDown();
                break;
            case 188:   // ',' key pressed
                if (tetrisBoard2.getScore() >= 3){
                    tetrisBoard1.upOneLine();
                    tetrisBoard2.modifyScore(-3);
                    tetrisBoard2.updateScore();
                }
                break;
            case 190:   // '.' key pressed
                if (tetrisBoard2.getScore() >= 3){
                    tetrisBoard1.dropDown();
                    tetrisBoard2.modifyScore(-3);
                    tetrisBoard2.updateScore();
                }
                break;
            case 191:    // '/' key pressed
                if (tetrisBoard2.getScore() >= 5){
                    if (tetrisBoard1.speedUp(100, 5000)){
                        tetrisBoard2.modifyScore(-5);
                        tetrisBoard2.updateScore();
                    }
                }
                break;
        }
    }
}