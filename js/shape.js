/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

$(document).ready(function(){
    var shape = new Shape();

    shape.printShape();
    shape.setShape(Shape.shapeType.TShape);
});




// Shape constructor
function Shape(){
    this.type = Shape.shapeType.NoShape;
    this.coords = Shape.coordsTable[0];
}

// sets type of this Shape object and sets coordinates accordingly
Shape.prototype.setShape = function(shapeType){
    this.type = shapeType;
    this.coords = Shape.coordsTable[shapeType];
};

// returns type of this Shape object
Shape.prototype.getShape = function(){
    return this.type;
};

// prints Shape type
Shape.prototype.printShape = function(){
    document.write("Shape: " + this.getShape());
};

// shape type reference
Shape.shapeType = {
    NoShape: 0,
    ZShape: 1,
    SShape: 2,
    LineShape: 3,
    TShape: 4,
    SquareShape: 5,
    LShape: 6,
    MirroredLShape: 7
};

// shape coordinates reference table
Shape.coordsTable = [
    [[ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0]],
    [[ 0,-1], [ 0, 0], [-1, 0], [-1, 1]],
    [[ 0,-1], [ 0, 0], [ 1, 0], [ 1, 1]],
    [[ 0,-1], [ 0, 0], [ 0, 1], [ 0, 2]],
    [[-1, 0], [ 0, 0], [ 1, 0], [ 0, 1]],
    [[ 0, 0], [ 1, 0], [ 0, 1], [ 1, 1]],
    [[-1,-1], [ 0,-1], [ 0, 0], [ 0, 1]],
    [[ 1,-1], [ 0,-1], [ 0, 0], [ 0, 1]]
];

