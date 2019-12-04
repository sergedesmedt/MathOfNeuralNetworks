function Circle(props, config) {
    this._center = props["center"];
    //console.log("Circle._center.x: " + this._center.getX());
    //console.log("Circle._center.y: " + this._center.getY());

	this._radius = props["radius"];

    if (config.hasOwnProperty("id"))
        this._id = config["id"];
        
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
}

Circle.prototype.setConfig = function(config){
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
}

Circle.draw = function (space2Dim, circles) {

    var space = space2Dim;

    var svg = space.getCanvas();
    var newSvgCircles = svg.selectAll(".circle2dim")
        .data(circles)
        .enter();

    createCircle(space2Dim, newSvgCircles);

}

Circle.update = function (space2Dim, circles) {

    var space = space2Dim;
    var svg = space.getCanvas();

    var allSvgCircles = svg.selectAll(".circle2dim")
        .data(circles)

    var newCirles = allSvgCircles.enter();
    var removedCircles = allSvgCircles.exit();

    //console.log("Circle.update > newCirles[" + newCirles.size() + "]");
    //console.log("Circle.update > removedCircles[" + removedCircles.size() + "]");
    //console.log("Circle.update > updateCirles[" + allSvgCircles.size() + "]");

    createCircle(space2Dim, newCirles);
    deleteCircle(space2Dim, removedCircles);
    updateCircle(space2Dim, allSvgCircles);
}

function createCircle(space2Dim, newCircles) {
    var space = space2Dim;

    var svg = space.getCanvas();

    newCircles.append("circle")
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
        .attr("cx", function (d) {
            let domainx = d._center.getX();
            //console.log("Circle.cx.domain: " + domainx);
            return space2Dim.convertXToCanvas(domainx);
        })
        .attr("cy", function (d) {
            let domainy = d._center.getY();
            //console.log("Circle.cy.domain: " + domainy);
            return space2Dim.convertYToCanvas(domainy);
        })
        .attr("r", function (d) {
            var r2canvas = space2Dim.convertXToCanvas(d._radius()) - space2Dim.convertXToCanvas(0);
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

function deleteCircle(space2Dim, removedCircles) {
    removedCircles.remove();
}

function updateCircle(space2Dim, circles) {

    //var space = space2Dim;

    //var svg = space.getCanvas();
    //var allSvgCircles = svg.selectAll(".circle2dim")
    //    .data(circles);
		
    circles
        .attr("cx", function (d) {
            let domainx = d._center.getX();
            //console.log("Circle.cx.domain: " + domainx);
            return space2Dim.convertXToCanvas(domainx);
        })
        .attr("cy", function (d) {
            let domainy = d._center.getY();
            //console.log("Circle.cy.domain: " + domainy);
            return space2Dim.convertYToCanvas(domainy);
        })
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

    if (d.onDrag) {
        [xd, yd] = d.onDrag(xd, yd);
    }

    if (!ko.isComputed(d._center._xdomainObservable))
        d._center.setX(xd);
        //d._center._xdomainObservable(xd);
    if (!ko.isComputed(d._center._ydomainObservable))
        d._center.setY(yd);
        //d._center._ydomainObservable(yd);


    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d._center.getX()))
        .attr('cy', space2dim.convertYToCanvas(d._center.getY()))

}

function onCircle2DimDragEnd(d) {
    //console.log("onCircle2DimDragEnd");
}
