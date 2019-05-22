function Line2Dim(props, config) {

    this._deftype = "unknown";
    if (props.hasOwnProperty("p1")) {
        if (props.hasOwnProperty("p2")) {
            this._deftype = "p1p2";

            this._p1 = props["p1"];
            this._p2 = props["p2"];

            let drico = getDRicoFromP1P1(this._p1, this._p2);

            this._d = drico[0];
            //this._d.subscribe(function (newValue) { console.log("d from p1,p2: " + newValue); })

            this._prico = drico[1];

        }
        //else if (props.hasOwnProperty("rico")) {
        //    this._deftype = "p1rico";

        //    this._p1 = props["p1"];
        //    this._rico = props["rico"];
        //}
        else {
            console.log("contains p1 but not p2 or rico")
        }
    } else if (props.hasOwnProperty("d")) {
        if (props.hasOwnProperty("prico")) {
            this._deftype = "drico";

            this._d = props["d"];
            //this._d.subscribe(function (newValue) { console.log("d from d,rico: " + newValue); })

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

var getDRicoFromP1P1 = function (p1, p2) {
    let p = p1;

    // get unit vector perpendicular to rico
    let ricoDX = ko.computed(function () {
        let dx = p2.getX() - p1.getX();
        let dy = p2.getY() - p1.getY();
        let len = Math.sqrt((dx * dx) + (dy * dy))

        return dy / len;
    }, this);
    let ricoDY = ko.computed(function () {
        let dx = p2.getX() - p1.getX();
        let dy = p2.getY() - p1.getY();
        let len = Math.sqrt((dx * dx) + (dy * dy))

        return -1 * dx / len;
    }, this);
    let rayRico = new Rico2Dim(ricoDX, ricoDY);

    let d = ko.computed(function () {
        return ricoDX() * p.getX() + ricoDY() * p.getY();
    });

    return [d, rayRico];
}

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
