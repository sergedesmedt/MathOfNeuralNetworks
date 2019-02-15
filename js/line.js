function Line2Dim(props, config) {

    this._deftype = "unknown";
    //if (props.hasOwnProperty("p1")) {
    //    if (props.hasOwnProperty("p2")) {
    //        this._deftype = "p1p2";

    //        this._p1 = props["p1"];
    //        this._p2 = props["p2"];
    //    }
    //    else if (props.hasOwnProperty("rico")) {
    //        this._deftype = "p1rico";

    //        this._p1 = props["p1"];
    //        this._rico = props["rico"];
    //    }
    //    else {
    //        console.log("contains p1 but not p2 or rico")
    //    }
    //} else
    if (props.hasOwnProperty("d")) {
        if (props.hasOwnProperty("prico")) {
            this._deftype = "drico";

            this._d = props["d"];
            this._prico = props["prico"];
        }
        else {
            //console.log("contains d but not rico")
        }
    }
    else {
        //console.log("contains neiter p1 or d")
    }

    if (this._deftype == "unknown") {
        throw "unknown definition";
    }

}

Line2Dim.draw = function (space2Dim, lines) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();
    var allSvgRays = svg.selectAll(".ray")
        .data(lines).enter();

    var gray = allSvgRays
        .append("g")
        .attr("class", "ray");

    gray.append("line")
        .attr("class", "rayline")
        .attr("x1", function (d) { return calcRayDRicoX1(space, d);} )
        .attr("y1", function (d) { return calcRayDRicoY1(space, d);} )
        .attr("x2", function (d) { return calcRayDRicoX2(space, d);} )
        .attr("y2", function (d) { return calcRayDRicoY2(space, d);} )
}

Line2Dim.update = function (space2Dim, lines) {
    //console.log("UpdateLine ==================");

    var space = space2Dim;

    var svg = space2Dim.getCanvas();

	var rays = svg.selectAll(".ray")
        .data(lines);

    rays.select(".rayline")
        .attr("x1", function (d) { return calcRayDRicoX1(space, d);} )
        .attr("y1", function (d) { return calcRayDRicoY1(space, d);} )
        .attr("x2", function (d) { return calcRayDRicoX2(space, d);} )
        .attr("y2", function (d) { return calcRayDRicoY2(space, d);} )
    ;

}


//var rayGetYFromPtRico = function (space2dim, xc, r) {
//    //console.log("rayGetYFromPtRico ==================");
//    //console.log("rayGetYFromPtRico > xc:" + xc );

//    var xn = x(xc);
//    //console.log("rayGetYFromPtRico > xn:" + xn);

//    var ptxn = x(r.p.x());
//    var ptyn = y(r.p.y());

//    //console.log("rayGetYFromPtRico > ptxn:" + ptxn);
//    //console.log("rayGetYFromPtRico > ptyn:" + ptyn);

//    var dxn = x(r.p.x() + r._rico.dx()) - ptxn;
//    var dyn = y(r.p.y() + r._rico.dy()) - ptyn;

//    //console.log("rayGetYFromPtRico > dxn:" + dxn);
//    //console.log("rayGetYFromPtRico > dyn:" + dyn);

//    var res = ptyn - ((dxn) / (dyn)) * (xn - ptxn);
//    console.log("rayGetYFromPtRico > res:" + res);

//    return res;
//}

//var rayGetXFromPtRico = function (space2dim, yc, r) {
//    //console.log("rayGetXFromPtRico ==================");
//    //console.log("rayGetXFromPtRico > yc:" + yc);

//    var yn = y(yc);
//    //console.log("rayGetXFromPtRico > yn:" + yn);

//    var ptxn = x(r.p.x());
//    var ptyn = y(r.p.y());

//    //console.log("rayGetXFromPtRico > ptxn:" + ptxn);
//    //console.log("rayGetXFromPtRico > ptyn:" + ptyn);

//    var dxn = x(r.p.x() + r._rico.dx()) - ptxn;
//    var dyn = y(r.p.y() + r._rico.dy()) - ptyn;

//    //console.log("rayGetXFromPtRico > dxn:" + dxn);
//    //console.log("rayGetXFromPtRico > dyn:" + dyn);

//    var res = ptxn - ((dyn) / (dxn)) * (yn - ptyn);
//    //console.log("rayGetXFromPtRico > res:" + res);

//    return res;
//}

var rayGetYFromDRico = function (space2dim, xc, r) {

    var y = (r._d() - (r._prico.getDX() * xc)) / r._prico.getDY();

    //console.log("rayGetYFromDRico d:" + r._d() + " - xc:" + xc + ", yres:" + res);
    var res = space2dim.convertYToCanvas(y);
    //console.log("rayGetYFromDRico > res:" + res);

    return y;
}

var rayGetXFromDRico = function (space2dim, yc, r) {

    var x = (r._d() - (r._prico.getDY() * yc)) / r._prico.getDX();

    //console.log("rayGetXFromDRico d:" + r._d() + " - yc:" + yc + ", xres:" + res);
    var res = space2dim.convertXToCanvas(x);
    //console.log("rayGetXFromDRico > res:" + res);

    return x;
}

function calcRaySwap(space2dim, rico) {
    var sr = Math.abs(space2dim._domainXMax - space2dim._domainXMin) / Math.abs(space2dim._domainYMax - space2dim._domainYMin);
    var rr = Math.abs(rico.getDX()) / Math.abs(rico.getDY());

    //console.log("calcRaySwap sr=" + sr + ", rr=" + rr);

    return sr > rr;
}

//function calcRayDRicoX1(space2dim, d) {
//    var xval = 0;
//    if (calcRaySwap(space2dim, d._prico)) {
//        xval = space2dim.convertXToCanvas(space2dim._domainXMin);
//        //console.log("calcRayPRicoX1 [" + xval +"] > used x");
//    }
//    else {
//        xval = rayGetXFromDRico(space2dim, space2dim._domainYMin, d);
//        //console.log("calcRayPRicoX1 [" + xval +"] > used rayGetXFromPtRico");
//    }
//    //console.log("calcRayPRicoX1 > xval:" + xval);
//    return xval;

//};
//function calcRayDRicoY1(space2dim, d) { return calcRaySwap(space2dim, d._prico) ? rayGetYFromDRico(space2dim, space2dim._domainXMin, d) : space2dim.convertYToCanvas(space2dim._domainYMin); };
//function calcRayDRicoX2(space2dim, d) { return calcRaySwap(space2dim, d._prico) ? space2dim.convertXToCanvas(space2dim._domainXMax) : rayGetXFromDRico(space2dim, space2dim._domainXMax, d); };
//function calcRayDRicoY2(space2dim, d) { return calcRaySwap(space2dim, d._prico) ? rayGetYFromDRico(space2dim, space2dim._domainXMax, d) : space2dim.convertYToCanvas(space2dim._domainYMax); };

function calcRayDRicoX1(space2dim, d) {
    var yval = rayGetYFromDRico(space2dim, space2dim._domainXMin, d);
    //console.log("calcRayDRicoX1: yval=" + yval);
    var result = space2dim._domainXMin;
    if (space2dim._domainYMin <= yval && space2dim._domainYMax >= yval)
        result = space2dim._domainXMin;
    else if (space2dim._domainYMin > yval)
        result = rayGetXFromDRico(space2dim, space2dim._domainYMin, d);
    else if (space2dim._domainYMax < yval)
        result = rayGetXFromDRico(space2dim, space2dim._domainYMax, d);

    //console.log("calcRayDRicoX1: result=" + result);
    return space2dim.convertXToCanvas(result);

    throw "calcRayDRicoX1: we shouldn't get here"
};
function calcRayDRicoY1(space2dim, d) {
    var yval = rayGetYFromDRico(space2dim, space2dim._domainXMin, d);
    //console.log("calcRayDRicoY1: yval=" + yval);
    var result = yval;
    if (space2dim._domainYMin <= yval && space2dim._domainYMax >= yval)
        result = yval;
    else if (space2dim._domainYMin > yval)
        result = space2dim._domainYMin;
    else if (space2dim._domainYMax < yval)
        result = space2dim._domainYMax;

    //console.log("calcRayDRicoY1: result=" + result);
    return space2dim.convertYToCanvas(result);

    throw "calcRayDRicoY1: we shouldn't get here"
};
function calcRayDRicoX2(space2dim, d) {
    var yval = rayGetYFromDRico(space2dim, space2dim._domainXMax, d);
    //console.log("calcRayDRicoX2: yval=" + yval);
    var result = space2dim._domainXMax;
    if (space2dim._domainYMin <= yval && space2dim._domainYMax >= yval)
        result = space2dim._domainXMax;
    else if (space2dim._domainYMin > yval)
        result = rayGetXFromDRico(space2dim, space2dim._domainYMin, d);
    else if (space2dim._domainYMax < yval)
        result = rayGetXFromDRico(space2dim, space2dim._domainYMax, d);

    //console.log("calcRayDRicoX2: result=" + result);
    return space2dim.convertXToCanvas(result);

    throw "calcRayDRicoX2: we shouldn't get here"
};
function calcRayDRicoY2(space2dim, d) {
    var yval = rayGetYFromDRico(space2dim, space2dim._domainXMax, d);
    //console.log("calcRayDRicoY2: yval=" + yval);
    var result = yval;
    if (space2dim._domainYMin <= yval && space2dim._domainYMax >= yval)
        result = yval;
    else if (space2dim._domainYMin > yval)
        result = space2dim._domainYMin;
    else if (space2dim._domainYMax < yval)
        result = space2dim._domainYMax;

    //console.log("calcRayDRicoY2: result=" + result);
    return space2dim.convertYToCanvas(result);

    throw "calcRayDRicoY2: we shouldn't get here"
};
