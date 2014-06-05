/**
 * Created by bewharichanwong on 5/28/14 AD.
 */

function Panel(id, style){
    var self = this;
    var boardID = id;
    var st = style;

    var panel = document.createElement('div');

    if (st == Board.STYLE.STD)
        panel.className = "panel";
    else if (st == Board.STYLE.ALT)
        panel.className = "altPanel";

    // handle set/get
    self.addScoreHandle = function(handle){
        addBox("score", handle);
    };

    self.addNextHandle = function(handle){
        var content = addBox("next", handle);
        addPiecePreview(content, handle);
    };

    self.addHeldHandle = function(handle){
        var content = addBox("held", handle);
        addPiecePreview(content, handle);
    };

    self.addLevelHandle = function(handle){
        var content = addBox("level", handle);
        addPiecePreview(content, handle);
    };

    self.getPanel = function(){ return panel;};

    var addBox = function(typeStr, handle){

        var box = document.createElement('table');
        if (st == Board.STYLE.STD)
            box.classList.add("panelTable");
        else if (st == Board.STYLE.ALT)
            box.classList.add("altPanelTable");

        box.classList.add(typeStr + "Box");

        var boxRow = document.createElement('tr');
        var boxLabel = document.createElement('th');
        boxLabel.className = typeStr + "Label";
        boxLabel.appendChild(document.createTextNode(handle));

        boxRow.appendChild(boxLabel);
        box.appendChild(boxRow);

        boxRow = document.createElement('tr');
        var content = document.createElement('td');
        content.className = typeStr;
        content.id = boardID + handle;

        boxRow.appendChild(content);
        box.appendChild(boxRow);
        panel.appendChild(box);

        return content;
    };

    var addPiecePreview = function(container, handle){

        var smallTable = document.createElement('table');
        smallTable.className = "previewTable";
        smallTable.id = boardID + handle + "Preview";

        var row, cell;
        for (var i = 0; i < 4; i++){
            row = document.createElement('tr');
            for (var j = 0; j < 2; j++){
                cell = document.createElement('td');
                cell.className = "previewCell";
                row.appendChild(cell);
            }
            smallTable.appendChild(row);
        }

        container.appendChild(smallTable);
    };
}


/*
// capitalize first letter of string
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
};*/
