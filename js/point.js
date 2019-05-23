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
    var space = space2dim;

    var svg = space.getCanvas();
    var newPoints = svg.selectAll(".point2dim")
        .data(points).enter();

    createPoints(space2dim, newPoints);
}

Point2Dim.update = function (space2dim, points) {
    var space = space2dim;

    var svg = space.getCanvas();
    var points = svg.selectAll(".point2dim")
        .data(points);

    var newPoints = points.enter();
    var removedPoints = points.exit();

    createPoints(space2dim, newPoints);
    deletePoints(space2dim, removedPoints);
    updatePoints(space2dim, points);
}

function createPoints(space2dim, newPoints) {
    var svg = space2dim.getCanvas();

    var points = newPoints
        .append("g")
        .attr("class", "point2dim");

    points.append("circle")
        .attr("class", "point2dimcircle")
        .attr("cx", function (d) { return space2dim.convertXToCanvas(d._xdomainObservable()); })
        .attr("cy", function (d) { return space2dim.convertYToCanvas(d._ydomainObservable()); })
        .attr("r", "8px")

    let point2dimcircle_dragcenter = d3.drag()
        .on('start', onPoint2DimDragStart)
        .on('drag', function (d) { onPoint2DimDrag(space2dim, d, this); })
        .on('end', onPoint2DimDragEnd);

    svg.selectAll('.point2dimcircle')
        .call(point2dimcircle_dragcenter);
}

function updatePoints(space2dim, points) {
    points.select(".point2dimcircle")
        .attr("cx", function (d) { return space2dim.convertXToCanvas(d._xdomainObservable()); })
        .attr("cy", function (d) { return space2dim.convertYToCanvas(d._ydomainObservable()); })
        ;
}

function deletePoints(space2dim, removedPoints) {
    removedPoints.remove();
}

function onPoint2DimDragStart(d) {
}

function onPoint2DimDrag(space2dim, d, elem) {
    var xd = space2dim.convertXFromCanvas(d3.event.x);
    var yd = space2dim.convertYFromCanvas(d3.event.y);

    d._xdomainObservable(xd);
    d._ydomainObservable(yd);

    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d._xdomainObservable()))
        .attr('cy', space2dim.convertYToCanvas(d._ydomainObservable()))
}

function onPoint2DimDragEnd(d) {
}