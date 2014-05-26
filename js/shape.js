/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

$(document).ready(function(){
    var shape = new Shape();

    shape.printShape();
    shape.setShape(Shape.shapeType.TShape);
    shape.printShape();
    shape.setRandomShape();
    shape.printShape();
});



// Shape constructor
function Shape(){
    var type = Shape.shapeType.NoShape;
    var coords = Shape.coordsTable[0];

    this.printShape = function(){ document.write("Shape: " + this.getShape());};

    // sets type of this Shape object and sets coordinates accordingly
    this.setShape = function(shapeType){
        type = shapeType;
        coords = Shape.coordsTable[shapeType];
    };
    this.setRandomShape = function(){
        var rand = Math.floor(Math.random() * 7 + 1);
        type = rand;
        coords = Shape.coordsTable[rand];
    };

    // sets the coordinates at location index
    var setX = function(index, x){ coords[index][0] = x};
    var setY = function(index, y){ coords[index][1] = y};

    // returns type of this Shape object
    this.getShape = function(){ return type;};

    // returns the coordinates at location index
    this.x = function(index){ return coords[index][0];};
    this.y = function(index){ return coords[index][1];};

    // returns the minimum coordinate of this Shape
    this.minX = function(){
        var m = this.x(0);
        for (var i = 1; i < 4; i++)
            m = Math.min(m, this.x(i));
        return m;
    };
    this.minY = function(){
        var m = this.y(0);
        for (var i = 1; i < 4; i++)
            m = Math.min(m, this.y(i));
        return m;
    };

    // sets the coordinates of this Shape with left rotation
    this.rotateLeft = function(){
        if (type != Shape.shapeType.SquareShape){
            var thisShape = new Shape();
            thisShape.setShape(type);

            for (var i = 0; i < 4; i++){
                this.setX(i, thisShape.y(i));
                this.setY(i, -thisShape.x(i));
            }
        }
        return this;
    };

    // sets the coordinates of this Shape with right rotation
    this.rotateLeft = function(){
        if (type != Shape.shapeType.SquareShape){
            var thisShape = new Shape();
            thisShape.setShape(type);

            for (var i = 0; i < 4; i++){
                this.setX(i, -thisShape.y(i));
                this.setY(i, thisShape.x(i));
            }
        }
        return this;
    };
}





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

