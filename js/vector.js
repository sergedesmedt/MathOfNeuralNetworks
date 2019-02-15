function Vector2Dim(props, config) {
    //console.log("props: " + props);
    //console.log("config: " + config);

    if (!props || !props.hasOwnProperty("p1"))
        throw "you must at least specify a starting point";

    this._deftype = "defp1p2";
    this._p1 = props["p1"];
    this._p2 = props["p2"];

    if (props.hasOwnProperty("delta")) {
        this._deftype = "defp1delta";
        this._delta = props["delta"];
    }

    if (this._deftype == "undefined")
        throw "you must either specify an endpoint or a delta between the starting point and the endpoint";

    this._name =  "";
    if (config.hasOwnProperty("name")) {
        this._name = config["name"];
        //console.log("this._name: " + this._name);
    }

    this._showSize = 0;
    if (config.hasOwnProperty("showSize")) {
        this._showSize = config["showSize"];
    //    //console.log("this._showSize: " + this._showSize);
    }

    this._showEndArrow = 1;
    if (config.hasOwnProperty("showEndArrow")) {
        this._showEndArrow = config["showEndArrow"];
        //    //console.log("this._showEndArrow: " + this._showEndArrow);
    }

    this._dvaluelvl = 0
    if (config.hasOwnProperty("dvaluelvl")) {
        this._dvaluelvl = config["dvaluelvl"];
        //console.log("this._dvaluelvl: " + this._dvaluelvl);
    }

    this._p1draggable = 0;
    if (config.hasOwnProperty("p1draggable")) {
        this._p1draggable = config["p1draggable"];
        //console.log("this._p1draggable: " + this._p1draggable);
    }

    this._p2draggable = 0;
    if (config.hasOwnProperty("p2draggable")) {
        this._p2draggable = config["p2draggable"];
        //console.log("this._p2draggable: " + this._p2draggable);
    }

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

}

Vector2Dim.prototype.getSize = function () {
    var vulen = Math.sqrt(
        ((this._p2.getX() - this._p1.getX()) * (this._p2.getX() - this._p1.getX())) +
        ((this._p2.getY() - this._p1.getY()) * (this._p2.getY() - this._p1.getY()))
    )
    return vulen;
}

Vector2Dim.prototype.getAngleToX = function () {
    var cosx = (this._p2.getX() - this._p1.getX()) / this.getSize();
    var cosy = (this._p2.getY() - this._p1.getY()) / this.getSize();

    var multiplyer = 1;
    if (cosy < 0)
        multiplyer = -1;

    //console.log("getAngle: cosx = " + cosx + ", cosy = " + cosy);

    return multiplyer * Math.acos(cosx)
}


Vector2Dim.global = function (space2Dim) {
    var svg = space2Dim.getCanvas();


    var svgdefs = svg.append("svg:defs");

    svgdefs.append("marker")
        //.attr("class", "vectorline")
        .attr("id", "circlearrow")
        .attr("refX", 10)
        .attr("refY", 3)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 10 3 0 6")
        ;
    svgdefs.append("marker")
        .attr("class", "vectorvaluedlinearrow")
        .attr("id", "vectorvaluedarrow")
        .attr("refX", 10)
        .attr("refY", 3)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 10 3 0 6")
        ;

}


Vector2Dim.draw = function (space2Dim, vectors) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();
    var allSvgVectors = svg.selectAll(".vector")
        .data(vectors).enter();

    var vectors = allSvgVectors
        .append("g")
        .attr("class", "vector");

    var svgdefs = vectors.filter(function (d) { return d._showEndArrow == 1; }).append("svg:defs");
    svgdefs.append("marker")
        .attr("class", function (d) { return ((d._deftype == "defp1p2") ? "vectorarrow" : "vectorarrow defp1delta") + ((d._cssclass == "") ? "" : (" " + d._cssclass)); })
        .attr("id", function (d, i, n) { return space2Dim.getId() + "linearrow" + i; })
        .attr("refX", 10)
        .attr("refY", 3)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 10 3 0 6")
        ;

    var vectorlines = vectors.append("line")
        .attr("class", function (d) { return ((d._deftype == "defp1p2") ? "vectorline" : "vectorline defp1delta") + ((d._cssclass == "") ? "" : (" " + d._cssclass)); })
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    vectorlines.filter(function (d) { return d._showEndArrow == 1; })
        .attr("marker-end", function (d, i, n) { return "url(#" + space2Dim.getId() + "linearrow" + i + ")"; })
        ;

    vectors.filter(function(d){ return d._p1draggable == 1; }).append("circle")
        .attr("class", "vectorstartpoint")
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("r", "8px")
        .on("mouseover", onVectorEndpointMouseOver)
        .on("mouseout", onVectorEndpointMouseOut)
        ;

    vectors.filter(function (d) { return d._p2draggable == 1; }).append("circle")
        .attr("class", function (d) { return (d._deftype == "defp1p2") ? "vectorendpoint defp1p2" : "vectorendpoint defp1delta"; })
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("r", "8px")
        .on("mouseover", onVectorEndpointMouseOver)
        .on("mouseout", onVectorEndpointMouseOut)
        ;

    var distName = 5;
    vectors.filter(function (d) { return d._name != "" }).append("text")
        .attr("class", "vectorname")
        .text(function (d) { return d._name; })
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return (vuy * distName) + ((p1x + p2x) / 2);
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return -(vux * distName) + ((p1y + p2y) / 2);
        })

    var distSize = -5;
    vectors.filter(function (d) { return d._showSize != 0 }).append("text")
        .attr("class", "vectorsize")
        .text(function (d) { return d.getSize().toFixed(0); })
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return (vuy * distSize) + ((p1x + p2x) / 2);
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return -(vux * distSize) + ((p1y + p2y) / 2);
        })

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
		.attr("class", "vectorp1x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
			;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
		.attr("class", "vectorp2x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
		;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("text")
		.attr("class", "vectorvalued x")
        .text(function (d) { return (d._p2.getX() - d._p1.getX()).toFixed(0); })
        .attr("x", function (d) { return space2Dim.convertXToCanvas(d._p1.getX() + (d._p2.getX() - d._p1.getX()) / 2); })
        .attr("y", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
		;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
        .attr("class", "vectorvaluedline x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("marker-start", "url(#vectorvaluedarrow)")
        .attr("marker-end", "url(#vectorvaluedarrow)")
        ;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
        .attr("class", "vectorp1y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
        .attr("class", "vectorp2y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("text")
        .attr("class", "vectorvalued y")
        .text(function (d) { return (d._p2.getY() - d._p1.getY()).toFixed(0); })
        .attr("x", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y", function (d) { return space2Dim.convertYToCanvas(d._p1.getY() + (d._p2.getY() - d._p1.getY()) / 2); })
        ;

    vectors.filter(function (d) { return d._dvaluelvl != 0 }).append("line")
        .attr("class", "vectorvaluedline y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("marker-start", "url(#vectorvaluedarrow)")
        .attr("marker-end", "url(#vectorvaluedarrow)")
        ;





    let defp1delta_dragp2 = d3.drag()
        .on('start', onVectorEndpointDragStart)
        .on('drag', function (d) { onVectorDefp1deltaEndpointP2Drag(space, d, this); })
        .on('end', onVectorEndpointDragEnd);

    let defp1p2_dragp2 = d3.drag()
        .on('start', onVectorEndpointDragStart)
        .on('drag', function (d) { onVectorDefp1p2EndpointP2Drag(space, d, this); })
        .on('end', onVectorEndpointDragEnd);

    svg.selectAll('.vectorendpoint.defp1delta')
        .call(defp1delta_dragp2);

    svg.selectAll('.vectorendpoint.defp1p2')
        .call(defp1p2_dragp2);

}

Vector2Dim.update = function (space2Dim, vectors) {
    //console.log("Vector2Dim.update");

    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    var vectors = svg.selectAll(".vector")
        .data(vectors);

    vectors.select(".vectorstartpoint")
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    vectors.select(".vectorendpoint")
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    vectors.select(".vectorline")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    var distName = 5;
    vectors.select(".vectorname")
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return (vuy * distName) + ((p1x + p2x) / 2);
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return -(vux * distName) + ((p1y + p2y) / 2);
        })

    var distSize = -5;
    vectors.select(".vectorsize")
        .text(function (d) { return d.getSize().toFixed(0); })
       .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return (vuy * distSize) + ((p1x + p2x) / 2);
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            return -(vux * distSize) + ((p1y + p2y) / 2);
        })

    vectors.select(".vectorp1x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    vectors.select(".vectorp2x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    vectors.select(".vectorvalued.x")
        .text(function (d) { return (d._p2.getX() - d._p1.getX()).toFixed(0); })
        .attr("x", function (d) { return space2Dim.convertXToCanvas(d._p1.getX() + (d._p2.getX() - d._p1.getX()) / 2); })
        .attr("y", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        ;

    vectors.select(".vectorvaluedline.x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        ;


    vectors.select(".vectorp1y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    vectors.select(".vectorp2y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    vectors.select(".vectorvalued.y")
        .text(function (d) { return (d._p2.getY() - d._p1.getY()).toFixed(0); })
        .attr("x", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y", function (d) { return space2Dim.convertYToCanvas(d._p1.getY() + (d._p2.getY() - d._p1.getY()) / 2); })
        ;

    vectors.select(".vectorvaluedline.y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

}

//function onVectorLineMouseOver(d, i) {
//    d3.select(this.parentNode)
//        .select('.vectorendpoint')
//        .style("stroke", "#acacac")


//}

//function onVectorLineMouseOut(d, i) {
//    d3.select(this.parentNode)
//        .select('.vectorendpoint')
//        .style("stroke", "transparent")
//}

function onVectorEndpointMouseOver(d, i) {
    //console.log("endpoint mouseover");
    d3.select(this)
        .style("stroke", "#acacac")
}

function onVectorEndpointMouseOut(d, i) {
    d3.select(this)
        .style("stroke", "transparent")
}

function onVectorEndpointDragStart(d) {
    onVectorEndpointDragStart}

function onVectorDefp1deltaEndpointP2Drag(space2dim, d, elem) {
    var xd = space2dim.convertXFromCanvas(d3.event.x);
    var yd = space2dim.convertYFromCanvas(d3.event.y);

    d._delta.setX(xd - Number(d._p1.getX()));
    d._delta.setY(yd - Number(d._p1.getY()));

    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d._p2.getX()))
        .attr('cy', space2dim.convertYToCanvas(d._p2.getY()))

    d3.select(elem.parentNode)
        .select('.vectorline')
        .attr("x2", space2dim.convertXToCanvas(d._p2.getX()))
        .attr("y2", space2dim.convertYToCanvas(d._p2.getY()))

}

function onVectorDefp1p2EndpointP2Drag(space2dim, d, elem) {
    var xd = space2dim.convertXFromCanvas(d3.event.x);
    var yd = space2dim.convertYFromCanvas(d3.event.y);

    d._p2.setX(xd);
    d._p2.setY(yd);

    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d._p2.getX()))
        .attr('cy', space2dim.convertYToCanvas(d._p2.getY()))

    d3.select(elem.parentNode)
        .select('.vectorline')
        .attr("x2", space2dim.convertXToCanvas(d._p2.getX()))
        .attr("y2", space2dim.convertYToCanvas(d._p2.getY()))
}

function onVectorEndpointDragEnd(d) {
    //console.log("onVectorEndpointDragEnd");
}
