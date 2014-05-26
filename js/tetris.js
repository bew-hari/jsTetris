/**
 * Created by bewharichanwong on 5/25/14 AD.
 */


window.onload = function(){
    var tetrisBoard = new Board();
    //tetrisBoard.start();

    var canvas = document.getElementById('tetris');

    /*var leftPanel = document.createElement('table');
     leftPanel.className = "leftPanel";*/

    var board = document.createElement('table');
    board.className = 'board';

    var row, cell;
    for (var i = 0; i < tetrisBoard.constructor.BOARD_HEIGHT; i++){
        row = document.createElement('tr');
        for (var j = 0; j < tetrisBoard.constructor.BOARD_WIDTH; j++){
            cell = document.createElement('td');

            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    canvas.appendChild(board);


};