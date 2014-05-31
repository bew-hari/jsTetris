/**
 * Created by bewharichanwong on 5/30/14 AD.
 */

function Cooperative(){
    var self = this;

    var tetrisBoard1 = new Board();
    tetrisBoard1.setup("board", Board.STYLE.ALT);
    tetrisBoard1.start();

    var divider = document.createElement('div');
    divider.className = "coopDivider";
    document.getElementById("tetrisCanvas").appendChild(divider);

    var tetrisBoard2 = new Board();
    tetrisBoard2.setup("board2", Board.STYLE.STD);
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

            case 32:   // space pressed
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
        }
    }
}