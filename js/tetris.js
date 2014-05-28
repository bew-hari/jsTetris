/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

var numPlayers = 0;

window.onload = function(){
    var tetrisBoard = new Board();
    setup(tetrisBoard, "board");

    tetrisBoard.start();

    stylize();
};

var scale = 1;

var boardStyle = "" +
    "float: left;" +
    "display: block;" +
    "border-spacing: 1px;" +
    "border: "+ 10*scale +"px solid #888;" +
    "border-radius: "+ 10*scale +"px;" +
    "background-color: black;";

var tetrisCellStyle = "" +
    "width: "+ 30*scale +"px;" +
    "height: "+ 30*scale +"px;";

// div container
var panelStyle = "" +
    "float: left;" +
    "display: block;" +
    "position: relative;";

// table in panel
var panelTableStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "left: -"+ 10*scale +"px;" +
    "border: "+ 5*scale +"px solid #888;" +
    "border-collapse: collapse;" +
    "border-radius: "+ 10*scale +"px;" +
    "padding-left: "+ 5*scale +"px;" +
    "text-align: center;" +
    "background-color: #333;" +
    "z-index: -1;";

// offsets from top of canvas
var scoreBoxOffsetFromTop = 20*scale +"px";
var nextBoxOffsetFromTop = "200px";

// score label th
var scoreLabelStyle = "" +
    "padding: "+ 5*scale +"px "+ 3*scale +"px "+ 5*scale +"px "+ 3*scale +"px;" +
    "border-bottom: "+ 3*scale +"px solid #888;" +
    "font-family: sans-serif;" +
    "font-size: "+ scale +"em;" +
    "color: white;";

// score td
var scoreStyle = "" +
    "min-width: "+ 80*scale +"px;" +
    "height: "+ 80*scale +"px;"+
    "vertical-align: middle;" +
    "font-family: sans-serif;" +
    "font-size: "+ scale +"em;" +
    "color: white;";


function setup(tetrisBoard, boardID){
    numPlayers++;

    tetrisBoard.setID(boardID);

    var canvas = document.getElementById("tetrisCanvas");

    var board = document.createElement('table');
    board.className = "board";
    board.id = boardID;

    var row, cell;
    for (var i = 0; i < tetrisBoard.constructor.BOARD_HEIGHT+tetrisBoard.constructor.SPWN_HEIGHT; i++){
        row = document.createElement('tr');
        if (i < 4)
            row.className = "spawnArea";
        for (var j = 0; j < tetrisBoard.constructor.BOARD_WIDTH; j++){
            cell = document.createElement('td');
            cell.className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
            cell.className = "tetrisCell";
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    canvas.appendChild(board);


    var panel = document.createElement('div');
    panel.className = "panel";

    // score box
    var box = document.createElement('table');
    box.className = "scoreBox";

    var boxRow = document.createElement('tr');
    var boxLabel = document.createElement('th');
    boxLabel.className = "scoreLabel";
    boxLabel.appendChild(document.createTextNode("Score"));

    boxRow.appendChild(boxLabel);
    box.appendChild(boxRow);

    boxRow = document.createElement('tr');
    var content = document.createElement('td');
    content.className = "score";
    content.id = boardID + "Score";

    boxRow.appendChild(content);
    box.appendChild(boxRow);
    panel.appendChild(box);



    /*// next box
    box = document.createElement('table');
    box.className = "nextBox";

    boxRow = document.createElement('tr');
    boxLabel = document.createElement('th');
    boxLabel.className = "nextLabel";
    boxLabel.appendChild(document.createTextNode("Next"));

    boxRow.appendChild(boxLabel);
    box.appendChild(boxRow);

    boxRow = document.createElement('tr');
    content = document.createElement('td');
    content.className = "next";
    content.id = boardID + "Next";

    boxRow.appendChild(score);
    box.appendChild(boxRow);
    panel.appendChild(box);*/








    canvas.appendChild(panel);

    window.addEventListener('keydown', tetrisBoard.respond, false);
}


function addBox(panel){
    var box = document.createElement('table');
    box.className = "scoreBox";

    var boxRow = document.createElement('tr');
    var boxLabel = document.createElement('th');
    boxLabel.className = "scoreLabel";
    boxLabel.appendChild(document.createTextNode("Score"));

    boxRow.appendChild(boxLabel);
    box.appendChild(boxRow);

    boxRow = document.createElement('tr');
    var content = document.createElement('td');
    content.className = "score";
    content.id = "board" + "Score";

    boxRow.appendChild(content);
    box.appendChild(boxRow);
    panel.appendChild(box);
};


function stylize(){

    var spawnAreas = document.getElementsByClassName("spawnArea");
    for (var i = 0; i < spawnAreas.length; i++)
        spawnAreas[i].style.display = "none";

    var boards = document.getElementsByClassName("board");
    var panels = document.getElementsByClassName("panel");
    var scoreBoxes = document.getElementsByClassName("scoreBox");
    var scoreLabels = document.getElementsByClassName("scoreLabel");
    var scores = document.getElementsByClassName("score");

    for (i = 0; i < numPlayers; i++){
        boards[i].style.cssText = boardStyle;
        panels[i].style.cssText = panelStyle;
        scoreBoxes[i].style.cssText = panelTableStyle;
        scoreBoxes[i].style.top = scoreBoxOffsetFromTop;
        scoreLabels[i].style.cssText = scoreLabelStyle;
        scores[i].style.cssText = scoreStyle;
    }

    var tetrisCells = document.getElementsByClassName("tetrisCell");
    for (i = 0; i < tetrisCells.length; i++)
        tetrisCells[i].style.cssText = tetrisCellStyle;
}


/*
function repaint(board){
    for (var i = 0; i < board.constructor.BOARD_HEIGHT; i++){
        for (var j = 0; j < board.constructor.BOARD_WIDTH; j++){
            document.getElementById('board').rows[i].cells[j].className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
        }
    }
};*/
