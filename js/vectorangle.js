function VectorAngle2Dim(props, config) {
    console.log("props: " + props);
    console.log("config: " + config);

    if (!props || !props.hasOwnProperty("vs") || !props.hasOwnProperty("ve"))
        throw "you must at least specify a starting and ending vector";

    this._vs = props["vs"];
    this._ve = props["ve"];

}

VectorAngle2Dim.draw = function (space2Dim, angles) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    vec2vecangledata = svg.selectAll(".vec2vecangle")
        .data(angles).enter()

    vec2vecangleg = vec2vecangledata
        .append("g")
        .attr("class", "vec2vecangle");

    vec2vecangleg.append("path")
        .attr("class", "vec2vecarc")
        .attr("d", function (d) { return vector2vectorArc(space, d); })
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("fill", "none")
}

VectorAngle2Dim.update = function (space2Dim, angles) {
    //console.log("VectorAngle2Dim.update");

    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    var v2varcs = svg.selectAll(".vec2vecangle")
        .data(angles);

    v2varcs.select(".vec2vecarc")
        .attr("d", function (d) { return vector2vectorArc(space, d); })
        ;
}

function getAngle(dx, dy) {
    //console.log("getAngle: dx = " + dx + ", dy = " + dy);

    var cosx = dx / Math.sqrt(dx * dx + dy * dy);
    var cosy = dy / Math.sqrt(dx * dx + dy * dy);

    var multiplyer = 1;
    if (cosy < 0)
        multiplyer = -1;

    //console.log("getAngle: cosx = " + cosx + ", cosy = " + cosy);

    return multiplyer * Math.acos(cosx)
}

function vector2vectorArc(space2dim, d) {
    var varc = d3.path();

    // *** arc: function (x, y, r, a0, a1, ccw)
    varc.arc(space2dim.convertXToCanvas(d._vs._p1.getX()), space2dim.convertYToCanvas(d._vs._p1.getY()), 50,
        getAngle(space2dim.convertXToCanvas(d._vs._p2.getX()) - space2dim.convertXToCanvas(d._vs._p1.getX()), space2dim.convertYToCanvas(d._vs._p2.getY()) - space2dim.convertYToCanvas(d._vs._p1.getY())),
        getAngle(space2dim.convertXToCanvas(d._ve._p2.getX()) - space2dim.convertXToCanvas(d._ve._p1.getX()), space2dim.convertYToCanvas(d._ve._p2.getY()) - space2dim.convertYToCanvas(d._ve._p1.getY())),
        1);

    return varc
}
