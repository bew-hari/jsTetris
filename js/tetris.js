/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

window.onload = function(){

    var mode = 2;

    var game;

    if (mode == 0)
        game = new QuickStart();
    else if (mode == 1)
        game = new Competitive();
    else if (mode == 2)
        game = new Cooperative();

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
    addCSSRule(sheet,"*", documentStyle);

    // style body
    addCSSRule(sheet,"body", bodyStyle);

    // style canvas
    addCSSRule(sheet,"#tetrisCanvas", tetrisCanvasStyle);
    addCSSRule(sheet,".tetrisContainer", tetrisContainerStyle);

    // style boards
    addCSSRule(sheet,".board", boardStyle);
    addCSSRule(sheet,".spawnArea", "display: none;");
    addCSSRule(sheet,".boardCell", boardCellStyle);
    addCSSRule(sheet,".boardOverlay", boardOverlayStyle);
    addCSSRule(sheet,".hide", hideStyle);

    // style divider
    addCSSRule(sheet,".compDivider", compDividerStyle);
    addCSSRule(sheet,".coopDivider", coopDividerStyle);

    // style panels
    addCSSRule(sheet,".panel", panelStyle);
    addCSSRule(sheet,".altPanel", altPanelStyle);
    addCSSRule(sheet,".panelTable", panelTableStyle);
    addCSSRule(sheet,".altPanelTable", altPanelTableStyle);

    addCSSRule(sheet,".scoreBox", scoreBoxOffsetFromTop);
    addCSSRule(sheet,".scoreLabel", labelStyle);
    addCSSRule(sheet,".score", contentStyle);

    addCSSRule(sheet,".nextBox", nextBoxOffsetFromTop);
    addCSSRule(sheet,".nextLabel", labelStyle);
    addCSSRule(sheet,".next", contentStyle);

    addCSSRule(sheet,".heldBox", heldBoxOffsetFromTop);
    addCSSRule(sheet,".heldLabel", labelStyle);
    addCSSRule(sheet,".held", contentStyle);

    addCSSRule(sheet,".previewTable", previewTableStyle);
    addCSSRule(sheet,".previewCell", previewCellStyle);

    // add piece colors
    addCSSRule(sheet,"td."+Shape.shapeTypeString[0], "background-color: #333;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[1], "background-color: red;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[2], "background-color: lawngreen;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[3], "background-color: royalblue;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[4], "background-color: yellow;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[5], "background-color: hotpink;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[6], "background-color: darkorange;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[7], "background-color: deepskyblue;");
    addCSSRule(sheet,"td."+Shape.shapeTypeString[8], "background-color: gray;");
}

function addCSSRule(sheet, selector, rules, index) {
    if(sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else {
        sheet.addRule(selector, rules, index);
    }
}


var SCALE = 1;

/* Dynamic CSS Rules */
var documentStyle = "" +
    "margin: 0;" +
    "padding: 0;";

var bodyStyle = "" +
    "background-color: cornsilk;";

var boardOverlayStyle = "" +
    "position: absolute;" +
    "min-width: 100%;" +
    "min-height: " + (30*Board.BOARD_HEIGHT*SCALE + (Board.BOARD_HEIGHT+Board.SPWN_HEIGHT - 1)) +"px;" +
    "background-color: #444;";

var hideStyle = "" +
    "display: none;";

var tetrisCanvasStyle = "" +
    "display: table;" +
    "margin-left: auto;" +
    "margin-right: auto;" +
    "margin-top: " + 50*SCALE +"px;";

var tetrisContainerStyle = "" +
    "display: table;" +
    "float: left;" +
    //"margin-left: " + 50*SCALE +"px;" +
    //"margin-right: " + 50*SCALE +"px;" +
    "";

var compDividerStyle = "" +
    "display: table;" +
    "float: left;" +
    "min-width: " + 100*SCALE +"px;" +
    "height: " + 50*SCALE +"px;";

var coopDividerStyle = "" +
    "display: table;" +
    "float: left;" +
    "min-width: " + 10*SCALE +"px;" +
    "height: " + 50*SCALE +"px;";

var boardStyle = "" +
    "float: left;" +
    "position: relative;" +
    "display: block;" +
    "border-spacing: 1px;" +
    "border: "+ 10*SCALE +"px solid #888;" +
    "border-radius: "+ 10*SCALE +"px;" +
    "background-color: black;";

var boardCellStyle = "" +
    "width: "+ 30*SCALE +"px;" +
    "height: "+ 30*SCALE +"px;";

// div container
var panelStyle = "" +
    "display: block;" +
    "float: left;" +
    "min-width: " + 90*SCALE + "px;" +
    "min-height: " + 30*SCALE + "px;" +
    "position: relative;" +
    "left: -"+ 10*SCALE +"px;" +
    "z-index: -1;";

// alt div container
var altPanelStyle = "" +
    "display: block;" +
    "float: left;" +
    "min-width: " + 90*SCALE + "px;" +
    "min-height: " + 30*SCALE + "px;" +
    "position: relative;" +
    "right: -"+ 5*SCALE +"px;" +
    "z-index: -1;";

// table in panel
var panelTableStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "border: "+ 5*SCALE +"px solid #888;" +
    "border-collapse: collapse;" +
    "border-radius: "+ 10*SCALE +"px;" +
    "padding-left: "+ 5*SCALE +"px;" +
    "text-align: center;" +
    "background-color: #333;";

// alt table in panel
var altPanelTableStyle = "" +
    "display: block;" +
    "position: absolute;" +
    "border: "+ 5*SCALE +"px solid #888;" +
    "border-collapse: collapse;" +
    "border-radius: "+ 10*SCALE +"px;" +
    "padding-right: "+ 5*SCALE +"px;" +
    "text-align: center;" +
    "background-color: #333;";

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

