function Line2Dim(props, config) {

    this._deftype = "unknown";
    if (props.hasOwnProperty("p1")) {
        if (props.hasOwnProperty("p2")) {
            this._deftype = "p1p2";

            this._p1 = props["p1"];
            this._p2 = props["p2"];

            let drico = getDRicoFromP1P2(this._p1, this._p2);

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

    if (config.hasOwnProperty("id")) {
        this._id = config["id"];
        //console.log("this._id: " + this._id);
    }

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

    if (this._deftype == "unknown") {
        throw "unknown definition";
    }

}

Line2Dim.prototype.getY = function (x) {
    var y = (this._d() - (this._prico.getDX() * x)) / this._prico.getDY();
    return y;
}

Line2Dim.prototype.AnimateProperty = function (d3animation, props, actions, space2dim) {
    let propAnimation = d3animation;
    propAnimation = propAnimation.select("#" + this._id)
        .selectAll(".rayline")
    if (props.hasOwnProperty("x1"))
    {
        let x1t = props["x1"];
        if (space2dim != undefined)
            x1t = space2dim.convertXToCanvas(x1t);

        propAnimation
            .attr("x1", x1t)
    }
    if (props.hasOwnProperty("x2")) {
        let x2t = props["x2"];
        if (space2dim != undefined)
            x2t = space2dim.convertXToCanvas(x2t);

        propAnimation
            .attr("x2", x2t);
    }

    return propAnimation;
}

Line2Dim.prototype.AnimateValue = function (d3animation, props, actions, space2dim) {
    let valueAnimation = d3animation;

    let x1curr = this._p1.getX();
    let x1t = x1curr;
    if (props.hasOwnProperty("x1")) {
        x1t = props["x1"];
    }
    let x2curr = this._p2.getX();
    let x2t = x2curr;
    if (props.hasOwnProperty("x2")) {
        x2t = props["x2"];
    }

    let me = this;

    let valueTween = function () {
        return function (t) {
            me._p1.setX(x1curr + (x1t - x1curr) * t);
            //me._p2.setX(x2curr + (x2t - x2curr) * t);

            //console.log("Line2Dim.AnimateValue["+me._id+"]: "+
            //    "_p1=x[" + me._p1.getX() + "]y[" + me._p1.getY() + "]" +
            //    "_p2=x[" + me._p2.getX() + "]y[" + me._p2.getY() + "]" +
            //    ""
            //    );

            //let drico = getDRicoFromP1P2(me._p1, me._p2);

            //me._d = drico[0];
            //me._prico = drico[1];

        }
    };

    valueAnimation.tween("line2dimtween", valueTween);

    return valueAnimation;
}

Line2Dim.draw = function (space2Dim, lines) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();
    var allSvgRays = svg.selectAll(".ray")
        .data(lines)
        .enter();

    var gray = allSvgRays
        .append("g")
        .attr("id", function (d) {
            if (d._id == undefined)
                return (Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36));
            else
                return d._id;
        })
        .attr("class", "ray");

    gray.append("line")
        //.attr("class", "rayline")
        .attr("class", function (d) {
            return "rayline"
                + ((d._cssclass == "") ? "" : (" " + d._cssclass));
        })
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

var getDRicoFromP1P2 = function (p1, p2) {
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
