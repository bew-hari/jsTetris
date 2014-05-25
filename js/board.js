/**
 * Created by bewharichanwong on 5/25/14 AD.
 */


/*$(document).ready(function(){
    var board = new Board();
    var board2 = new Board();

    board.printBoardSize();
});*/



function Board(){

}

Board.BOARD_WIDTH = 10;
Board.BOARD_HEIGHT = 20;
Board.prototype.printBoardSize = function (){
    document.write("Width: " + this.constructor.BOARD_WIDTH + "<br>Height: " + this.constructor.BOARD_HEIGHT + "<br>");
};
