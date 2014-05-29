/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

window.onload = function(){

    var mode = 1;

    var game;

    if (mode == 0)
        game = new QuickStart();
    else if (mode == 1)
        game = new Competitive();

    // stylize CSS sheet
    var sheet = stylesheet();
    stylize(sheet);
};


function stylesheet(){
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
};


function stylize(sheet){

    // style document
    sheet.addRule("*", documentStyle);

    // style body
    sheet.addRule("body", bodyStyle);

    // style boards
    sheet.addRule(".board", boardStyle);
    sheet.addRule(".spawnArea", "display: none;");
    sheet.addRule(".tetrisCell", tetrisCellStyle);

    // style panels
    sheet.addRule(".panel", panelStyle);
    sheet.addRule(".panelTable", panelTableStyle);

    sheet.addRule(".scoreBox", scoreBoxOffsetFromTop);
    sheet.addRule(".scoreLabel", labelStyle);
    sheet.addRule(".score", contentStyle);

    sheet.addRule(".nextBox", nextBoxOffsetFromTop);
    sheet.addRule(".nextLabel", labelStyle);
    sheet.addRule(".next", contentStyle);

    sheet.addRule(".heldBox", heldBoxOffsetFromTop);
    sheet.addRule(".heldLabel", labelStyle);
    sheet.addRule(".held", contentStyle);

    sheet.addRule(".previewTable", previewTableStyle);
    sheet.addRule(".previewCell", previewCellStyle);

    // add piece colors
    sheet.addRule("td."+Shape.shapeTypeString[0], "background-color: #333;");
    sheet.addRule("td."+Shape.shapeTypeString[1], "background-color: red;");
    sheet.addRule("td."+Shape.shapeTypeString[2], "background-color: lawngreen;");
    sheet.addRule("td."+Shape.shapeTypeString[3], "background-color: royalblue;");
    sheet.addRule("td."+Shape.shapeTypeString[4], "background-color: yellow;");
    sheet.addRule("td."+Shape.shapeTypeString[5], "background-color: hotpink;");
    sheet.addRule("td."+Shape.shapeTypeString[6], "background-color: darkorange;");
    sheet.addRule("td."+Shape.shapeTypeString[7], "background-color: deepskyblue;");
}


var SCALE = 1;

/* Dynamic CSS Rules */
var documentStyle = "" +
    "margin: 0;" +
    "padding: 0;" +
    "";

var bodyStyle = "" +
    "background-color: cornsilk;";

var boardStyle = "" +
    "float: left;" +
    "display: block;" +
    "border-spacing: 1px;" +
    "border: "+ 10*SCALE +"px solid #888;" +
    "border-radius: "+ 10*SCALE +"px;" +
    "background-color: black;";

var tetrisCellStyle = "" +
    "width: "+ 30*SCALE +"px;" +
    "height: "+ 30*SCALE +"px;";

// div container
var panelStyle = "" +
    "display: block;" +
    "float: left;" +
    "min-width: " + 250*SCALE + "px;" +
    "min-height: " + 100*SCALE + "px;" +
    "position: relative;";

// table in panel
var panelTableStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "left: -"+ 10*SCALE +"px;" +
    "border: "+ 5*SCALE +"px solid #888;" +
    "border-collapse: collapse;" +
    "border-radius: "+ 10*SCALE +"px;" +
    "padding-left: "+ 5*SCALE +"px;" +
    "text-align: center;" +
    "background-color: #333;" +
    "z-index: -1;";

// offsets from top of canvas
var scoreBoxOffsetFromTop = "top: " + 20*SCALE +"px;";
var nextBoxOffsetFromTop = "top: " + 150*SCALE +"px;";
var heldBoxOffsetFromTop = "top: " + 500*SCALE +"px;";

// label th
var labelStyle = "" +
    "padding: "+ 5*SCALE +"px "+ 3*SCALE +"px "+ 5*SCALE +"px "+ 3*SCALE +"px;" +
    "border-bottom: "+ 3*SCALE +"px solid #888;" +
    "font-family: sans-serif;" +
    "font-size: "+ SCALE +"em;" +
    "color: white;";

// content td
var contentStyle = "" +
    "min-width: "+ 80*SCALE +"px;" +
    "height: "+ 80*SCALE +"px;"+
    "vertical-align: middle;" +
    "font-family: sans-serif;" +
    "font-size: "+ SCALE +"em;" +
    "color: white;";

var previewTableStyle = "" +
    "border-spacing: 1px;" +
    "margin-left: auto;" +
    "margin-right: auto;" +
    "";

var previewCellStyle = "" +
    "width: "+ 10*SCALE +"px;" +
    "height: "+ 10*SCALE +"px;";




/*
function repaint(board){
    for (var i = 0; i < board.constructor.BOARD_HEIGHT; i++){
        for (var j = 0; j < board.constructor.BOARD_WIDTH; j++){
            document.getElementById('board').rows[i].cells[j].className = Shape.shapeTypeString[tetrisBoard.shapeAt(j,i)];
        }
    }
};*/
