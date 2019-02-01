function Circle(
    center
) {
    this._center = center;
}

Circle.draw = function (space2Dim, circles) {

    var svg = space2Dim.getCanvas();
    var allSvgCircles = svg.selectAll(".circle2dim")
        .data(circles).enter()

    allSvgCircles.append("circle")
        .attr("class", "circle2dim")
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._center.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._center.getY()); })
        .attr("r", "8px")
        .style("stroke", "black")
        ;
}
