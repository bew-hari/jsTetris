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

        boxRow.appendChild(content);
        box.appendChild(boxRow);
        panel.appendChild(box);
    };
};


/*
// capitalize first letter of string
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
};*/
