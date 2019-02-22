function Circle(props, config) {
    this._center = props["center"];
	this._radius = props["radius"];

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

    this._cdraggable = 0;
    if (config.hasOwnProperty("draggable")) {
        this._cdraggable = config["draggable"];
        //console.log("this._p1draggable: " + this._p1draggable);
    }

    if (config.hasOwnProperty("id"))
        this._id = config["id"];
}

Circle.draw = function (space2Dim, circles) {

    var space = space2Dim;

    var svg = space.getCanvas();
    var allSvgCircles = svg.selectAll(".circle2dim")
        .data(circles).enter();

    allSvgCircles.append("circle")
        .attr("id", function (d) {
            if (d._id == undefined)
                return (Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36));
            else
                return d._id;
        })  
        .attr("class", function (d) {
            return "circle2dim"
                + ((d._cdraggable == 0) ? "" : " circledraggable")
                + ((d._cssclass == "") ? "" : (" " + d._cssclass))
        })
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

    let circen_drag = d3.drag()
        .on('start', onCirlce2DimDragStart)
        .on('drag', function (d) { onCircle2DimDrag(space, d, this); })
        .on('end', onCircle2DimDragEnd);

    svg.selectAll(".circle2dim.circledraggable")
        .call(circen_drag);

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

function onCirlce2DimDragStart(d) {
    //console.log("onCirlce2DimDragStart");
}

function onCircle2DimDrag(space2dim, d, elem) {
    //console.log("onCircle2DimDrag");
    var xd = space2dim.convertXFromCanvas(d3.event.x);
    var yd = space2dim.convertYFromCanvas(d3.event.y);

    d._center.setX(xd);
    d._center.setY(yd);

    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d._center.getX()))
        .attr('cy', space2dim.convertYToCanvas(d._center.getY()))

}

function onCircle2DimDragEnd(d) {
    //console.log("onCircle2DimDragEnd");
}
