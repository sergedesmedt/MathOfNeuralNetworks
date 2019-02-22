function Region2Dim(props, config) {
    this._poly = props["poly"];

    this._draggable = 0;
    if (config.hasOwnProperty("draggable")) {
        this._p1draggable = config["draggable"];
        //console.log("this._draggable: " + this._draggable);
    }
}

Region2Dim.prototype.Contains = function (pt) {
    //var x = space2Dim.convertXToCanvas(pt.getX())
    //var y = space2Dim.convertXToCanvas(pt.getY())
    //return d3.polygonContains(this._poly.map(function (d) {
    //    return [space2Dim.convertXToCanvas(d.getX()), space2Dim.convertYToCanvas(d.getY())];
    //}), [x, y]);
    var x = pt.getX();
    var y = pt.getY();
    return d3.polygonContains(this._poly.map(function (d) {
        return [d.getX(), d.getY()];
    }), [x, y]);
}

Region2Dim.draw = function (space2Dim, regions) {
    var space = space2Dim;

    var svg = space.getCanvas();
    var allRegions = svg.selectAll("polygon")
        .data(regions)
        .enter();

    allRegions.append("polygon")
        .attr("class", "region2dim")
        .attr("points", function (d) {
            return d._poly.map(function (d) {
                return [space2Dim.convertXToCanvas(d.getX()), space2Dim.convertYToCanvas(d.getY())].join(",");
            }).join(" ");
        });

    var allPoints = [].concat.apply([], regions.map(d => d._poly));
    var allHandles = svg.selectAll("handles")
        .data(allPoints)
        .enter();

    allHandles.append("circle")
        .attr("class", function (d) {
            return "region2dimhandles"
        })
        .attr("cx", function (d) { return space2Dim.convertXToCanvas(d.getX()); })
        .attr("cy", function (d) { return space2Dim.convertYToCanvas(d.getY()); })
        .attr("r", function (d) {
            var r2canvas = space2Dim.convertXToCanvas(0.75) - space2Dim.convertXToCanvas(0);
            return r2canvas;
        })
        .on("mouseover", onRegionHandleMouseOver)
        .on("mouseout", onRegionHandleMouseOut)
//        .style("stroke", "black")
        ;

    let handle_drag = d3.drag()
        .on('start', onRegion2DimHandleDragStart)
        .on('drag', function (d) { onRegion2DimHandleDrag(space, d, this); })
        .on('end', onRegion2DimHandleDragEnd);

    svg.selectAll(".region2dimhandles")
        .call(handle_drag);

}

Region2Dim.update = function (space2Dim, regions) {
    var space = space2Dim;

    var svg = space.getCanvas();

    var regions = svg.selectAll(".region2dim")
        .data(regions)

    regions.attr("points", function (d) {
            return d._poly.map(function (d) {
                return [space2Dim.convertXToCanvas(d.getX()), space2Dim.convertYToCanvas(d.getY())].join(",");
            }).join(" ");
        });
}

function onRegionHandleMouseOver(d, i) {
    //console.log("endpoint mouseover");
    d3.select(this)
        .style("stroke", "#acacac")
}

function onRegionHandleMouseOut(d, i) {
    d3.select(this)
        .style("stroke", "transparent")
}

function onRegion2DimHandleDragStart(d) {
    //console.log("onRegion2DimHandleDragStart");
}

function onRegion2DimHandleDrag(space2dim, d, elem) {
    //console.log("onRegion2DimHandleDrag");
    var xd = space2dim.convertXFromCanvas(d3.event.x);
    var yd = space2dim.convertYFromCanvas(d3.event.y);

    d.setX(xd);
    d.setY(yd);

    d3.select(elem)
        .attr('cx', space2dim.convertXToCanvas(d.getX()))
        .attr('cy', space2dim.convertYToCanvas(d.getY()))

}

function onRegion2DimHandleDragEnd(d) {
    //console.log("onRegion2DimHandleDragEnd");
}
