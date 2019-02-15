function Circle(props, config) {
    this._center = props["center"];
	this._radius = props["radius"];

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }
}

Circle.draw = function (space2Dim, circles) {

    var space = space2Dim;

    var svg = space.getCanvas();
    var allSvgCircles = svg.selectAll(".circle2dim")
        .data(circles).enter();

    allSvgCircles.append("circle")
        .attr("class", function (d) { return "circle2dim" + ((d._cssclass == "") ? "" : (" " + d._cssclass)); })
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._center.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._center.getY()); })
        .attr("r", function (d) { 
			var r2canvas = space2Dim.convertXToCanvas(d._radius()) - space2Dim.convertXToCanvas(0);
			//console.log("_radius: " + d._radius());
			//console.log("r2canvas: " + r2canvas);
			return r2canvas;
			})
        .style("stroke", "black")
        ;
}

Circle.update = function (space2Dim, circles) {

    var space = space2Dim;

    var svg = space.getCanvas();
    var allSvgCircles = svg.selectAll(".circle2dim")
        .data(circles);
		
	allSvgCircles
		.attr("cx", function (d) { return space2Dim.convertXToCanvas(d._center.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._center.getY()); })
        .attr("r", function (d) { 
			var r2canvas = space2Dim.convertXToCanvas(d._radius()) - space2Dim.convertXToCanvas(0);

			return r2canvas;
			})		
}
