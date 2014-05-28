/**
 * Created by bewharichanwong on 5/28/14 AD.
 */

function Panel(id){
    var self = this;
    var boardID = id;

    var panel = document.createElement('div');
    panel.className = "panel";

    // handle set/get
    self.addScoreHandle = function(handle){
        addBox("score", handle);
    };

    self.addNextHandle = function(handle){
        addBox("next", handle);
    };

    self.addHeldHandle = function(handle){
        addBox("held", handle);
    };

    self.getPanel = function(){ return panel;};

    var addBox = function(typeStr, handle){

        var box = document.createElement('table');
        box.className = typeStr + "Box";

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

        if (typeStr == "next" || typeStr == "held")
            addPiecePreview(content, handle);

        boxRow.appendChild(content);
        box.appendChild(boxRow);
        panel.appendChild(box);
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
                cell.classList.add(Shape.shapeTypeString[1]);
                cell.classList.add("previewCell");
                row.appendChild(cell);
            }
            smallTable.appendChild(row);
        }

        container.appendChild(smallTable);
    };
};


/*
// capitalize first letter of string
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
};*/
