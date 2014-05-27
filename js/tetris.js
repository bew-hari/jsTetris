/**
 * Created by bewharichanwong on 5/25/14 AD.
 */


window.onload = function(){
    var tetrisBoard = new Board();
    tetrisBoard.setID('board');
    tetrisBoard.start();

    setup(tetrisBoard);
};


var boardStyle = "" +
    "float: left;" +
    "display: block;" +
    "border-spacing: 1px;" +
    "border: 10px solid #888;" +
    "background-color: black;";

var panelStyle = "" +
    "float: left;" +
    "display: block;" +
    "position: relative";

var scoreStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "top: 100px;" +
    "width: 50px;" +
    "height: 50px;" +
    "text-align: center;" +
    //"vertical-align: middle;" +
    "color: white;" +
    "background-color: #333; ";



function setup(tetrisBoard){
    var canvas = document.getElementById('tetrisCanvas');

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

    var panel = document.createElement('div');
    panel.className = 'panel';

    var score = document.createElement('div');
    score.id = tetrisBoard.getID() + 'Score';

    panel.appendChild(score);
    canvas.appendChild(panel);


    document.getElementById(tetrisBoard.getID()).style.cssText = boardStyle;
    var spawnArea = document.getElementsByClassName('spawnArea');
    for (var i = 0; i < spawnArea.length; i++)
        spawnArea[i].style.display = 'none';

    var boardPanels = document.getElementsByClassName('panel');
    for (i = 0; i < boardPanels.length; i++)
        boardPanels[i].style.cssText = panelStyle;
    document.getElementById(tetrisBoard.getID()+'Score').style.cssText = scoreStyle;

    window.addEventListener('keydown', tetrisBoard.respond, false);
}


/*
function repaint(board){
    for (var i = 0; i < board.constructor.BOARD_HEIGHT; i++){
        for (var j = 0; j < board.constructor.BOARD_WIDTH; j++){
            document.getElementById('board').rows[i].cells[j].className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
        }
    }
};*/
