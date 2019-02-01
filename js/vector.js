// https://stackoverflow.com/questions/4179283/how-to-overload-constructor-of-an-object-in-js-javascript
// https://stackoverflow.com/questions/135448/how-do-i-check-if-an-object-has-a-property-in-javascript

function Vector2Dim() {
    var args = {};

    if (!arguments[0] || !arguments[0].hasOwnProperty("p1"))
        throw "you must at least specify a starting point";

    args = arguments[0];

    this._p1 = args["p1"];

    this._deftype = "undefined";
    if (args.hasOwnProperty("delta")) {
        this._deftype = "defp1delta";
        this._delta = args["delta"];
    }

    if (args.hasOwnProperty("p2")) {
        this._deftype = "defp1p2";
        this._p2 = args["p2"];
    }

    if (this._deftype == "undefined")
        throw "you must either specify an endpoint or a delta between the starting point and the endpoint";
}


Vector2Dim.draw = function (space2Dim, vectors) {

    var svg = space2Dim.getCanvas();
    var allSvgVectors = svg.selectAll(".vector")
        .data(vectors).enter();

    var vector = allSvgVectors
        .append("g")
        .attr("class", "vector");

    vector.append("line")          // attach a line
        .attr("class", function (d) { return (d.tp == "defp1p2") ? "vectorline" : "vectorline defp1delta"; })
        //.attr("class", "vectorline defp1delta")
        //.style("stroke", "black")  // colour the line
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        //.attr("marker-end", "url(#linearrow)")
        ;
}
