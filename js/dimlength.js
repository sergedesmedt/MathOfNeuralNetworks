function DimLength2Dim(props, config) {

    if (!props || !props.hasOwnProperty("p1"))
        throw "you must at least specify a starting point";

    this._p1 = props["p1"];
    this._p2 = props["p2"];

    this._sizeDist = -10;
    this._sizePos = 0.5;

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
    }

}

DimLength2Dim.prototype.setConfig = function (config) {
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

DimLength2Dim.prototype.getDX = function () {
    return this._p2.getX() - this._p1.getX();
}

DimLength2Dim.prototype.getDY = function () {
    return this._p2.getY() - this._p1.getY();
}

DimLength2Dim.prototype.getSize = function () {
    var vulen = Math.sqrt(
        (this.getDX() * this.getDX()) +
        (this.getDY() * this.getDY())
    )
    return vulen;
}

DimLength2Dim.mainCssClass = "dimlength";
DimLength2Dim.mainCssClassSelector = "." + DimLength2Dim.mainCssClass;

DimLength2Dim.draw = function (space2Dim, dimlengths) {

    var svg = space2Dim.getCanvas();

    var newDimlengths = svg.selectAll(DimLength2Dim.mainCssClassSelector)
        .data(dimlengths).enter();

    createDimLength(space2Dim, newDimlengths);
}

DimLength2Dim.update = function (space2Dim, dimlengths) {

    var svg = space2Dim.getCanvas();

    var allDimlengths = svg.selectAll(DimLength2Dim.mainCssClassSelector)
        .data(dimlengths);

    var newDimlengths = allDimlengths.enter();
    var removedDimlengths = allDimlengths.exit();

    createDimLength(space2Dim, newDimlengths);
    deleteDimLength(space2Dim, removedDimlengths);
    updateDimLength(space2Dim, allDimlengths);
}

function createDimLength(space2Dim, newDimlengths) {
    var svg = space2Dim.getCanvas();

    var dimlengths = newDimlengths
        .append("g")
        .attr("class", DimLength2Dim.mainCssClass);

    var svgdefs = dimlengths.append("svg:defs");
    svgdefs.append("marker")
        .attr("class", function (d) { return "vectorarrow" + ((d._cssclass == "") ? "" : (" " + d._cssclass)); })
        .attr("id", function (d, i, n) { return space2Dim.getId() + "linearrow" + i; })
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M -10 -10 10 10")
        ;

    var dimlengthlines = dimlengths.append("line")
        .attr("class", function (d) { return "dimlengthline" /*+ ((d._cssclass == "") ? "" : (" " + d._cssclass))*/; })
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    dimlengthlines
        .attr("marker-end", function (d, i, n) { return "url(#" + space2Dim.getId() + "linearrow" + i + ")"; })
        .attr("marker-start", function (d, i, n) { return "url(#" + space2Dim.getId() + "linearrow" + i + ")"; })
    ;

    //var distSize = -5;
    dimlengths
        .append("text")
        .attr("class", function (d) {
            return DimLength2Dim.mainCssClass + "size"
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

}

function deleteDimLength(space2Dim, removedDimlengths) {
    removedDimlengths.remove();
}

function updateDimLength(space2Dim, dimlengths) {

    dimlengths.select(".dimlengthline")
        .attr("x1", function (d) { return space2Dim.convertXToCanvas(d._p1.getX()); })
        .attr("y1", function (d) { return space2Dim.convertYToCanvas(d._p1.getY()); })
        .attr("x2", function (d) { return space2Dim.convertXToCanvas(d._p2.getX()); })
        .attr("y2", function (d) { return space2Dim.convertYToCanvas(d._p2.getY()); })
        ;

    //var distName = 5;
    //dimlengths.select(".vectorname")
    //    .attr("x", function (d) {
    //        var p1x = space2Dim.convertXToCanvas(d._p1.getX());
    //        var p1y = space2Dim.convertYToCanvas(d._p1.getY());
    //        var p2x = space2Dim.convertXToCanvas(d._p2.getX());
    //        var p2y = space2Dim.convertYToCanvas(d._p2.getY());

    //        var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
    //        var vux = (p2x - p1x) / vulen;
    //        var vuy = (p2y - p1y) / vulen;

    //        var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
    //        //console.log("namex: " + namex);
    //        return namex;
    //    })
    //    .attr("y", function (d) {
    //        var p1x = space2Dim.convertXToCanvas(d._p1.getX());
    //        var p1y = space2Dim.convertYToCanvas(d._p1.getY());
    //        var p2x = space2Dim.convertXToCanvas(d._p2.getX());
    //        var p2y = space2Dim.convertYToCanvas(d._p2.getY());

    //        var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
    //        var vux = (p2x - p1x) / vulen;
    //        var vuy = (p2y - p1y) / vulen;

    //        var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
    //        //console.log("namey: " + namey);
    //        return namey;
    //    })

    //var paddingLeftRight = 18;
    //var paddingTopBottom = 5;

    //dimlengths.selectAll(".vectornamerect")
    //    .attr("x", function (d) {
    //        var p1x = space2Dim.convertXToCanvas(d._p1.getX());
    //        var p1y = space2Dim.convertYToCanvas(d._p1.getY());
    //        var p2x = space2Dim.convertXToCanvas(d._p2.getX());
    //        var p2y = space2Dim.convertYToCanvas(d._p2.getY());

    //        var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
    //        var vux = (p2x - p1x) / vulen;
    //        var vuy = (p2y - p1y) / vulen;

    //        var namex = (vuy * d._nameDist) + (p1x + d._namePos * (p2x - p1x));
    //        //console.log("namex: " + namex);
    //        return namex - d.__bb.width / 2 - paddingLeftRight / 2;
    //    })
    //    .attr("y", function (d) {
    //        var p1x = space2Dim.convertXToCanvas(d._p1.getX());
    //        var p1y = space2Dim.convertYToCanvas(d._p1.getY());
    //        var p2x = space2Dim.convertXToCanvas(d._p2.getX());
    //        var p2y = space2Dim.convertYToCanvas(d._p2.getY());

    //        var vulen = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)))
    //        var vux = (p2x - p1x) / vulen;
    //        var vuy = (p2y - p1y) / vulen;

    //        var namey = -(vux * d._nameDist) + (p1y + d._namePos * (p2y - p1y));
    //        //console.log("namey: " + namey);
    //        return namey - d.__bb.height + paddingTopBottom / 2;
    //    })
    //    .attr("width", function (d) { return d.__bb.width + paddingLeftRight; })
    //    .attr("height", function (d) { return d.__bb.height + paddingTopBottom; });

    //var distSize = -5;
    dimlengths.select("." + DimLength2Dim.mainCssClass + "size")
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

}
