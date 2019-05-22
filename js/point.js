Point2Dim = function (
    xdomain,
    ydomain
) {
    this._xdomainObservable = xdomain;
    this._ydomainObservable = ydomain;
}

Point2Dim.prototype.getX = function() {
    return this._xdomainObservable();
}

Point2Dim.prototype.getY = function() {
    return this._ydomainObservable();
}

Point2Dim.prototype.setX = function (x) {
    return this._xdomainObservable(x);
}

Point2Dim.prototype.setY = function (y) {
    return this._ydomainObservable(y);
}

Point2Dim.draw = function (space2dim, points) {
    var space = space2Dim;

    var svg = space.getCanvas();
    var newPoints = svg.selectAll(".point2dim")
        .data(points).enter();

    createPoints(space2dim, newPoints);
}

Point2Dim.update = function (space2dim, points) {
    var space = space2Dim;

    var svg = space.getCanvas();
    var allPoints = svg.selectAll(".point2dim")
        .data(points)

    var newPoints = allPoints.enter();
    var removedPoints = allPonits.exit();

    createPoints(space2dim, newPoints);
    deleteVectors(space2Dim, removedPoints);
    updateVectors(space2Dim, allPoints);
}

function createPoints(space2dim, newPoints) {
    var svg = space2Dim.getCanvas();

    var points = newPoints
        .append("g")
        .attr("class", "point");


}

function updatePoints(space2dim, newPoints) {

}

function deletepoints(space2dim, newPoints) {
}
