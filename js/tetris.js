/**
 * Created by bewharichanwong on 5/25/14 AD.
 */


window.onload = function(){
    var tetrisBoard = new Board();
    tetrisBoard.setID('board');

    tetrisBoard.start();


    var canvas = document.getElementById('tetrisCanvas');

    /*var leftPanel = document.createElement('table');
     leftPanel.className = "leftPanel";*/

    var board = document.createElement('table');
    board.id = tetrisBoard.getID();

    var row, cell;
    for (var i = 0; i < tetrisBoard.constructor.BOARD_HEIGHT+tetrisBoard.constructor.SPWN_HEIGHT; i++){
        row = document.createElement('tr');
        if (i < 4)
            row.className = 'spawnArea';
        for (var j = 0; j < tetrisBoard.constructor.BOARD_WIDTH; j++){
            cell = document.createElement('td');
            cell.className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
            row.appendChild(cell);
        }

        board.appendChild(row);

    }
    canvas.appendChild(board);


    window.addEventListener('keydown', tetrisBoard.respond, false);



    //alert(Shape.shapeTypeString[tetrisBoard.shapeAt(5,19)]);


};

/*
function repaint(board){
    for (var i = 0; i < board.constructor.BOARD_HEIGHT; i++){
        for (var j = 0; j < board.constructor.BOARD_WIDTH; j++){
            document.getElementById('board').rows[i].cells[j].className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
        }
    }
};*/
