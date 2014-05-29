/**
 * Created by bewharichanwong on 5/25/14 AD.
 */

/*$(document).ready(function(){
    var shape = new Shape();

    shape.printShape();
    shape.setShape(Shape.shapeType.TShape);
    shape.printShape();
    shape.setRandomShape();
    shape.printShape();
});*/



// Shape constructor
function Shape(){
    var self = this;
    var type = Shape.shapeType.NoShape;
    var coords = [[0,0],[0,0],[0,0],[0,0]];

    self.printShape = function(){ document.write("Shape: " + self.getShape());};

    // sets type of this Shape object and sets coordinates accordingly
    self.setShape = function(shapeType){
        type = shapeType;
        for (var i = 0; i < 4 ; i++) {
            for (var j = 0; j < 2; j++) {
                coords[i][j] = Shape.coordsTable[shapeType][i][j];
            }
        }
    };
    self.setRandomShape = function(){
        self.setShape(Math.floor(Math.random() * 7 + 1));
    };

    // sets the coordinates at location index
    self.setX = function(index, x){ coords[index][0] = x};
    self.setY = function(index, y){ coords[index][1] = y};

    // returns type of this Shape object
    self.getShape = function(){ return type;};

    /*// returns string of the type of this Shape object
    this.getShapeString = function(){ return Shape.shapeTypeString[type]};*/

    // returns the coordinates at location index
    self.x = function(index){ return coords[index][0];};
    self.y = function(index){ return coords[index][1];};

    // returns the minimum coordinate of this Shape
    self.minX = function(){
        var m = self.x(0);
        for (var i = 1; i < 4; i++)
            m = Math.min(m, self.x(i));
        return m;
    };
    self.minY = function(){
        var m = self.y(0);
        for (var i = 1; i < 4; i++)
            m = Math.min(m, self.y(i));
        return m;
    };

    // returns Shape with left rotation
    self.rotateLeft = function(){
        if (type == Shape.shapeType.SquareShape)
            return self;

        var newShape = new Shape();
        newShape.setShape(type);

        for (var i = 0; i < 4; i++){
            newShape.setX(i, -coords[i][1]);
            newShape.setY(i, coords[i][0]);
        }

        return newShape;
    };

    // returns Shape with right rotation
    self.rotateRight = function(){
        if (type == Shape.shapeType.SquareShape)
            return self;

        var newShape = new Shape();
        newShape.setShape(type);

        for (var i = 0; i < 4; i++){
            newShape.setX(i, coords[i][1]);
            newShape.setY(i, -coords[i][0]);
        }

        return newShape;
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

// shape type string
Shape.shapeTypeString = [
    "NoShape",
    "ZShape",
    "SShape",
    "LineShape",
    "TShape",
    "SquareShape",
    "LShape",
    "MirroredLShape"
];



// shape coordinates reference table
Shape.coordsTable = [
    [[ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0]],
    [[ 1, 0], [ 0, 0], [ 0, 1], [-1, 1]],   // Z
    [[ 1, 1], [ 0, 1], [ 0, 0], [-1, 0]],   // S
    [[-1, 0], [ 0, 0], [ 1, 0], [ 2, 0]],   // Line
    [[-1, 0], [ 0, 0], [ 1, 0], [ 0, 1]],   // T
    [[ 0, 0], [ 1, 0], [ 0, 1], [ 1, 1]],   // Sqr
    [[-1, 0], [ 0, 0], [ 1, 0], [ 1, 1]],   // L
    [[-1, 1], [-1, 0], [ 0, 0], [ 1, 0]]    // M-L
];

/*Shape.coordsTable = [
    [[ 0, 0], [ 0, 0], [ 0, 0], [ 0, 0]],
    [[ 0,-1], [ 0, 0], [-1, 0], [-1, 1]],   // Z
    [[ 0,-1], [ 0, 0], [ 1, 0], [ 1, 1]],   // S
    [[ 0,-1], [ 0, 0], [ 0, 1], [ 0, 2]],   // Line
    [[-1, 0], [ 0, 0], [ 1, 0], [ 0, 1]],   // T
    [[ 0, 0], [ 1, 0], [ 0, 1], [ 1, 1]],   // Sqr
    [[-1,-1], [ 0,-1], [ 0, 0], [ 0, 1]],   // L
    [[ 1,-1], [ 0,-1], [ 0, 0], [ 0, 1]]    // M-L
];*/

