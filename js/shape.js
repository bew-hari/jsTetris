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
    var coords = Shape.coordsTable[0];

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
        var rand = Math.floor(Math.random() * 7 + 1);
        type = rand;
    };

    // sets the coordinates at location index
    var setX = function(index, x){ coords[index][0] = x};
    var setY = function(index, y){ coords[index][1] = y};

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

    // sets the coordinates of this Shape with left rotation
    self.rotateLeft = function(){
        if (type != Shape.shapeType.SquareShape){

            var prevCoords = [];
            for (var i = 0; i < 4 ; i++) {
                for (var j = 0; j < 2; j++) {
                    prevCoords[i][j] = coords[i][j];
                }
            }

            for (i = 0; i < 4; i++){
                setX(i, -prevCoords[i][1]);
                setY(i, prevCoords[i][0]);
            }
        }
        return self;
    };

    // sets the coordinates of this Shape with right rotation
    self.rotateRight = function(){
        if (type != Shape.shapeType.SquareShape){

            var prevCoords = [[0,0],[0,0],[0,0],[0,0]];
            for (var i = 0; i < 4 ; i++) {
                for (var j = 0; j < 2; j++) {
                    prevCoords[i][j] = coords[i][j];
                }
            }

            for (i = 0; i < 4; i++){
                setX(i, prevCoords[i][1]);
                setY(i, -prevCoords[i][0]);
            }
        }
        return self;
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
    [[ 0,-1], [ 0, 0], [-1, 0], [-1, 1]],   // Z
    [[ 0,-1], [ 0, 0], [ 1, 0], [ 1, 1]],   // S
    [[ 0,-1], [ 0, 0], [ 0, 1], [ 0, 2]],   // Line
    [[-1, 0], [ 0, 0], [ 1, 0], [ 0, 1]],   // T
    [[ 0, 0], [ 1, 0], [ 0, 1], [ 1, 1]],   // Sqr
    [[-1,-1], [ 0,-1], [ 0, 0], [ 0, 1]],   // L
    [[ 1,-1], [ 0,-1], [ 0, 0], [ 0, 1]]    // M-L
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

