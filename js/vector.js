function Vector2Dim(props, config) {

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

    this._nameDist = 10;
    this._namePos = 0.33;
    this._name =  "";
    if (config.hasOwnProperty("name")) {
        this._name = config["name"];
        //console.log("this._name: " + this._name);
    }


    this._sizeDist = -10;
    this._sizePos = 0.66;
    this._showSize = 0;
    if (config.hasOwnProperty("showSize")) {
        this._showSize = config["showSize"];
        //console.log("this._showSize: " + this._showSize);
    }

    this._showEndArrow = 1;
    if (config.hasOwnProperty("showEndArrow")) {
        this._showEndArrow = config["showEndArrow"];
        //console.log("this._showEndArrow: " + this._showEndArrow);
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

Vector2Dim.prototype.setConfig = function (config) {
    if (config.hasOwnProperty("name")) {
        this._name = config["name"];
        //console.log("this._name: " + this._name);
    }

    if (config.hasOwnProperty("showSize")) {
        this._showSize = config["showSize"];
        //console.log("this._showSize: " + this._showSize);
    }

    if (config.hasOwnProperty("showEndArrow")) {
        this._showEndArrow = config["showEndArrow"];
        //console.log("this._showEndArrow: " + this._showEndArrow);
    }

    if (config.hasOwnProperty("dvaluelvl")) {
        this._dvaluelvl = config["dvaluelvl"];
        //console.log("this._dvaluelvl: " + this._dvaluelvl);
    }

    if (config.hasOwnProperty("p1draggable")) {
        this._p1draggable = config["p1draggable"];
        //console.log("this._p1draggable: " + this._p1draggable);
    }

    if (config.hasOwnProperty("p2draggable")) {
        this._p2draggable = config["p2draggable"];
        //console.log("this._p2draggable: " + this._p2draggable);
    }

    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }
}

Vector2Dim.prototype.getDX = function () {
    return this._p2.getX() - this._p1.getX();
}

Vector2Dim.prototype.getDY = function () {
    return this._p2.getY() - this._p1.getY();
}

Vector2Dim.prototype.getSize = function () {
    var vulen = Math.sqrt(
        (this.getDX() * this.getDX()) +
        (this.getDY() * this.getDY())
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

Vector2Dim.dotProduct = function (v1, v2) {
    return (v1.getDX() * v2.getDX()) + (v1.getDY() * v2.getDY());
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

    var svg = space2Dim.getCanvas();
    var newVectors = svg.selectAll(".vector")
        .data(vectors).enter();

    createVectors(space2Dim, newVectors);
}

Vector2Dim.update = function (space2Dim, vectors) {
    var svg = space2Dim.getCanvas();

    var allVectors = svg.selectAll(".vector")
        .data(vectors);

    var newVectors = allVectors.enter();
    var removedVectors = allVectors.exit();

    createVectors(space2Dim, newVectors);
    deleteVectors(space2Dim, removedVectors);
    updateVectors(space2Dim, allVectors);
}

function createVectors(space2Dim, newVectors) {
    var svg = space2Dim.getCanvas();

    var vectors = newVectors
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


    var allNameRect = vectors.filter(function (d) { return d._name != "" }).append("rect")
        .attr("class", "vectornamerect")

    //var distName = 5;
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

            var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
            //console.log("namex: " + namex);
            return namex;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
            //console.log("namey: " + namey);
            return namey;
        })

    vectors.selectAll(".vectorname")
        .each(function (d, i, elem) {
            //console.log("vectorname each > d:" + d + "i: " + i + ", elem: " + elem);
            //console.log("vectorname each > bb:" + this.getBBox());
            d.__bb = this.getBBox();
        })

    var paddingLeftRight = 18; 
    var paddingTopBottom = 5;

    vectors.selectAll(".vectornamerect")
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
            //console.log("namex: " + namex);
            return namex - d.__bb.width / 2 - paddingLeftRight / 2;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
            //console.log("namey: " + namey);
            return namey - d.__bb.height + paddingTopBottom / 2;
        })
        .attr("width", function (d) { return d.__bb.width + paddingLeftRight; })
        .attr("height", function (d) { return d.__bb.height + paddingTopBottom; });

    //var distSize = -5;
    vectors
        //.filter(function (d) { return d._showSize != 0 })
        .append("text")
        .attr("class", function (d) {
            return "vectorsize"
                + ((d._showSize == 1) ? "" : " hidden")
                + ((d._cssclass == "") ? "" : (" " + d._cssclass));
        })
        .text(function (d) { return d3.format(".1f")(d.getSize()); })
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var lengthx = (vuy * d._sizeDist) + (p1x + d._sizePos * (p2x - p1x));
            //console.log("lengthx: " + lengthx);
            return lengthx;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var lengthy = -(vux * d._sizeDist) + (p1y + d._sizePos * (p2y - p1y));
            //console.log("lengthy: " + lengthy);
            return lengthy;
        })

    var dvalueGroups = vectors
        //.filter(function (d) { return d._dvaluelvl != 0 })
        .append("g");

    dvalueGroups.attr("class", function (d) {
        return "vectordvalue"
            + ((d._dvaluelvl != 0) ? "" : " hidden");
        });


    dvalueGroups.append("line")
		.attr("class", "vectorp1x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
			;

    dvalueGroups.append("line")
		.attr("class", "vectorp2x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
		;

    dvalueGroups.append("text")
		.attr("class", "vectorvalued x")
        .text(function (d) { return d3.format(".1f")(d._p2.getX() - d._p1.getX()); })
        .attr("x", function (d) { return space2Dim.convertXToCanvas(d._p1.getX() + (d._p2.getX() - d._p1.getX()) / 2); })
        .attr("y", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
		;

    dvalueGroups.append("line")
        .attr("class", "vectorvaluedline x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("marker-start", "url(#vectorvaluedarrow)")
        .attr("marker-end", "url(#vectorvaluedarrow)")
        ;

    dvalueGroups.append("line")
        .attr("class", "vectorp1y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    dvalueGroups.append("line")
        .attr("class", "vectorp2y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    dvalueGroups.append("text")
        .attr("class", "vectorvalued y")
        .text(function (d) { return d3.format(".1f")(d._p2.getY() - d._p1.getY()); })
        .attr("x", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y", function (d) { return space2Dim.convertYToCanvas(d._p1.getY() + (d._p2.getY() - d._p1.getY()) / 2); })
        ;

    dvalueGroups.append("line")
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
        .on('drag', function (d) { onVectorDefp1deltaEndpointP2Drag(space2Dim, d, this); })
        .on('end', onVectorEndpointDragEnd);

    let defp1p2_dragp2 = d3.drag()
        .on('start', onVectorEndpointDragStart)
        .on('drag', function (d) { onVectorDefp1p2EndpointP2Drag(space2Dim, d, this); })
        .on('end', onVectorEndpointDragEnd);

    svg.selectAll('.vectorendpoint.defp1delta')
        .call(defp1delta_dragp2);

    svg.selectAll('.vectorendpoint.defp1p2')
        .call(defp1p2_dragp2);

}

function deleteVectors(space2Dim, removedVectors) {
    removedVectors.remove();
}

function updateVectors(space2Dim, vectors) {
 
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

            var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
            //console.log("namex: " + namex);
            return namex;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
            //console.log("namey: " + namey);
            return namey;
        })

    var paddingLeftRight = 18;
    var paddingTopBottom = 5;

    vectors.selectAll(".vectornamerect")
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
            //console.log("namex: " + namex);
            return namex - d.__bb.width / 2 - paddingLeftRight / 2;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
            //console.log("namey: " + namey);
            return namey - d.__bb.height + paddingTopBottom / 2;
        })
        .attr("width", function (d) { return d.__bb.width + paddingLeftRight; })
        .attr("height", function (d) { return d.__bb.height + paddingTopBottom; });

    var distSize = -5;
    vectors.select(".vectorsize")
        .classed('hidden', function (d) { return d._showSize == 0; })
        .text(function (d) { return d3.format(".1f")(d.getSize()); })
        .attr("x", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var lengthx = (vuy * d._sizeDist) + (p1x + d._sizePos * (p2x - p1x));
            //console.log("lengthx: " + lengthx);
            return lengthx;
        })
        .attr("y", function (d) {
            var p1x = space2Dim.convertXToCanvas(d._p1.getX());
            var p1y = space2Dim.convertYToCanvas(d._p1.getY());
            var p2x = space2Dim.convertXToCanvas(d._p2.getX());
            var p2y = space2Dim.convertYToCanvas(d._p2.getY());

            var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
            var vux = (p2x - p1x) / vulen;
            var vuy = (p2y - p1y) / vulen;

            var lengthy = -(vux * d._sizeDist) + (p1y + d._sizePos * (p2y - p1y));
            //console.log("lengthy: " + lengthy);
            return lengthy;
        })

    var dvalueGroups = vectors.select(".vectordvalue")
        .classed('hidden', function (d) { return d._dvaluelvl == 0; });

    dvalueGroups.select(".vectorp1x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    dvalueGroups.select(".vectorp2x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    dvalueGroups.select(".vectorvalued.x")
        .text(function (d) { return d3.format(".1f")(d._p2.getX() - d._p1.getX()); })
        .attr("x", function (d) { return space2Dim.convertXToCanvas(d._p1.getX() + (d._p2.getX() - d._p1.getX()) / 2); })
        .attr("y", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        ;

    dvalueGroups.select(".vectorvaluedline.x")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y1", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.getValueSpacingX(d._dvaluelvl); })
        ;


    dvalueGroups.select(".vectorp1y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        ;

    dvalueGroups.select(".vectorp2y")
        .attr("x1", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    dvalueGroups.select(".vectorvalued.y")
        .text(function (d) { return d3.format(".1f")(d._p2.getY() - d._p1.getY()); })
        .attr("x", function (d) { return space2Dim.getValueSpacingY(d._dvaluelvl); })
        .attr("y", function (d) { return space2Dim.convertYToCanvas(d._p1.getY() + (d._p2.getY() - d._p1.getY()) / 2); })
        ;

    dvalueGroups.select(".vectorvaluedline.y")
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
    //console.log("onVectorEndpointDragStart");
}

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
