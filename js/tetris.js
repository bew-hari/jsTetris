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
var nextBoxOffsetFromTop = 150*scale +"px";
var heldBoxOffsetFromTop = 500*scale +"px";

// label th
var labelStyle = "" +
    "padding: "+ 5*scale +"px "+ 3*scale +"px "+ 5*scale +"px "+ 3*scale +"px;" +
    "border-bottom: "+ 3*scale +"px solid #888;" +
    "font-family: sans-serif;" +
    "font-size: "+ scale +"em;" +
    "color: white;";

// content td
var contentStyle = "" +
    "min-width: "+ 80*scale +"px;" +
    "height: "+ 80*scale +"px;"+
    "vertical-align: middle;" +
    "font-family: sans-serif;" +
    "font-size: "+ scale +"em;" +
    "color: white;";

var previewTableStyle = "" +
    "border-spacing: 1px;" +
    "margin-left: auto;" +
    "margin-right: auto;" +
    "";

var previewCellStyle = "" +
    "width: "+ 10*scale +"px;" +
    "height: "+ 10*scale +"px;";



function setup(tetrisBoard, boardID){
    numPlayers++;

    tetrisBoard.setID(boardID);

    var canvas = document.getElementById("tetrisCanvas");

    tetrisBoard.setDispBoard();
    canvas.appendChild(tetrisBoard.getDispBoard());

    tetrisBoard.setPanel();
    canvas.appendChild(tetrisBoard.getPanel());




    window.addEventListener('keydown', tetrisBoard.respond, false);
}


function stylize(){

    var spawnAreas = document.getElementsByClassName("spawnArea");
    for (var i = 0; i < spawnAreas.length; i++)
        spawnAreas[i].style.display = "none";

    var boards = document.getElementsByClassName("board");
    var panels = document.getElementsByClassName("panel");

    var scoreBoxes = document.getElementsByClassName("scoreBox");
    var scoreLabels = document.getElementsByClassName("scoreLabel");
    var scores = document.getElementsByClassName("score");

    var nextBoxes = document.getElementsByClassName("nextBox");
    var nextLabels = document.getElementsByClassName("nextLabel");
    var nexts = document.getElementsByClassName("next");

    var heldBoxes = document.getElementsByClassName("heldBox");
    var heldLabels = document.getElementsByClassName("heldLabel");
    var helds = document.getElementsByClassName("held");

    for (i = 0; i < numPlayers; i++){
        boards[i].style.cssText = boardStyle;
        panels[i].style.cssText = panelStyle;

        scoreBoxes[i].style.cssText = panelTableStyle;
        scoreBoxes[i].style.top = scoreBoxOffsetFromTop;
        scoreLabels[i].style.cssText = labelStyle;
        scores[i].style.cssText = contentStyle;

        nextBoxes[i].style.cssText = panelTableStyle;
        nextBoxes[i].style.top = nextBoxOffsetFromTop;
        nextLabels[i].style.cssText = labelStyle;
        nexts[i].style.cssText = contentStyle;

        heldBoxes[i].style.cssText = panelTableStyle;
        heldBoxes[i].style.top = heldBoxOffsetFromTop;
        heldLabels[i].style.cssText = labelStyle;
        helds[i].style.cssText = contentStyle;

    }

    var tetrisCells = document.getElementsByClassName("tetrisCell");
    for (i = 0; i < tetrisCells.length; i++)
        tetrisCells[i].style.cssText = tetrisCellStyle;

    var previewTables = document.getElementsByClassName("previewTable");
    for (i = 0; i < previewTables.length; i++)
        previewTables[i].style.cssText = previewTableStyle;

    var previewCells = document.getElementsByClassName("previewCell");
    for (i = 0; i < previewCells.length; i++)
        previewCells[i].style.cssText = previewCellStyle;

}


/*
function repaint(board){
    for (var i = 0; i < board.constructor.BOARD_HEIGHT; i++){
        for (var j = 0; j < board.constructor.BOARD_WIDTH; j++){
            document.getElementById('board').rows[i].cells[j].className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
        }
    }
};*/
