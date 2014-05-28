/**
 * Created by bewharichanwong on 5/28/14 AD.
 */

function Panel(id){
    var self = this;
    var boardID = id;
    var scoreHandle;
    var nextHandle;
    var heldHandle;

    var panel = document.createElement('div');
    panel.className = "panel";

    // handle set/get
    self.setScoreHandle = function(str){ scoreHandle = str; };
    self.getScoreHandle = function(){ return scoreHandle; };
    self.setNextHandle = function(str){ nextHandle = str; };
    self.getNextHandle = function(){ return nextHandle; };
    self.setHeldHandle = function(str){ heldHandle = str; };
    self.getHeldHandle = function(){ return heldHandle; };

    self.getPanel = function(){ return panel;};

    self.addBox = function(handle){
        var lcHandle = handle.toLowerCase();
        var ucFirstHandle = lcHandle.ucfirst();

        var box = document.createElement('table');
        box.className = lcHandle + "Box";

        var boxRow = document.createElement('tr');
        var boxLabel = document.createElement('th');
        boxLabel.className = lcHandle + "Label";
        boxLabel.appendChild(document.createTextNode(ucFirstHandle));

        boxRow.appendChild(boxLabel);
        box.appendChild(boxRow);

        boxRow = document.createElement('tr');
        var content = document.createElement('td');
        content.className = lcHandle;
        content.id = boardID + ucFirstHandle;

        boxRow.appendChild(content);
        box.appendChild(boxRow);
        panel.appendChild(box);

        return self;
    };
};


// capitalize first letter of string
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
};