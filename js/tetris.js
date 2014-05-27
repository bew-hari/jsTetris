/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

var numPlayers = 0;

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

// div container
var panelStyle = "" +
    "float: left;" +
    "display: block;" +
    "position: relative;";

// table containing score
var scoreBoxStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "top: 100px;" +
    "text-align: center;" +
    "color: white;" +
    "background-color: #333;";

// score td
var scoreStyle = "" +
    "min-width: 50px;" +
    "height: 50px;"+
    "vertical-align: middle;";


function setup(tetrisBoard){
    numPlayers++;

    var canvas = document.getElementById('tetrisCanvas');

    var board = document.createElement('table');
    board.className = 'board';
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

    var scoreBox = document.createElement('table');
    scoreBox.className = 'scoreBox';

    var scoreBoxRow = document.createElement('tr');
    var score = document.createElement('td');
    score.className = 'score';
    score.id = tetrisBoard.getID() + 'Score';

    scoreBoxRow.appendChild(score);
    scoreBox.appendChild(scoreBoxRow);
    panel.appendChild(scoreBox);
    canvas.appendChild(panel);


    var spawnArea = document.getElementsByClassName('spawnArea');
    for (i = 0; i < spawnArea.length; i++)
        spawnArea[i].style.display = 'none';

    //document.getElementById(tetrisBoard.getID()).style.cssText = boardStyle;
    var boards = document.getElementsByClassName('board');
    var panels = document.getElementsByClassName('panel');
    var scoreBoxes = document.getElementsByClassName('scoreBox');
    var scores = document.getElementsByClassName('score');

    for (i = 0; i < numPlayers; i++){
        boards[i].style.cssText = boardStyle;
        panels[i].style.cssText = panelStyle;
        scoreBoxes[i].style.cssText = scoreBoxStyle;
        scores[i].style.cssText = scoreStyle;
    }

    //document.getElementById(tetrisBoard.getID()+'Score').style.cssText = scoreStyle;

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
