function VectorAngle2Dim(props, config) {
    console.log("props: " + props);
    console.log("config: " + config);

    if (!props || !props.hasOwnProperty("vs") || !props.hasOwnProperty("ve"))
        throw "you must at least specify a starting and ending vector";

    this._vs = props["vs"];
    this._ve = props["ve"];

    this._r = 50;
    if (config.hasOwnProperty("r")) {
        this._r = config["r"];
    }

    this._ccw = 1;
    if (config.hasOwnProperty("ccw")) {
        this._ccw = config["ccw"];
    }

    this._showAngle = 0;
    if (config.hasOwnProperty("showAngle")) {
        this._showAngle = config["showAngle"];
    }

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

}

VectorAngle2Dim.prototype.getAngle = function()
{
    return getAngleBetweenVectors(this._vs, this._ve);
}

VectorAngle2Dim.draw = function (space2Dim, angles) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    vec2vecangledata = svg.selectAll(".vec2vecangle")
        .data(angles).enter()

    vec2vecangleg = vec2vecangledata
        .append("g")
        .attr("class", "vec2vecangle");

    vec2vecangleg.append("path")
        .attr("class", "vec2vecarc")
        .attr("d", function (d) { return vector2vectorArc(space, d); })
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("fill", "none")

    vec2vecangleg.filter(function (d) { return d._showAngle != 0 }).append("text")
        .attr("class", function (d) { return "vectorangle" + ((d._cssclass == "") ? "" : (" " + d._cssclass)); })
        .text(function (d) {
            var angleBetween = getAngleBetweenVectors(d._vs, d._ve);
            console.log("VectorAngle2Dim.update: angleBetween = " + angleBetween);
            return d3.format(".2f")(angleBetween);
        })
        .attr("x", function (d) {
            var angleVs = getAngle(d._vs._p2.getX() - d._vs._p1.getX(), d._vs._p2.getY() - d._vs._p1.getY());
            var angleVe = getAngle(d._ve._p2.getX() - d._ve._p1.getX(), d._ve._p2.getY() - d._ve._p1.getY());

            while (angleVs > angleVe)
                angleVs = angleVs - 2 * Math.PI;

            var angleVsDegr = angleVs * 180 / Math.PI;
            var angleVeDegr = angleVe * 180 / Math.PI;

            console.log("VectorAngle2Dim.update: angleVsDegr = " + angleVsDegr + ", angleVeDegr: " + angleVeDegr);

            var angleMid = angleVs + (angleVe - angleVs) / 2;

            var angleMidDegr = angleMid * 180 / Math.PI;
            while (angleMidDegr < 0) {
                angleMidDegr = angleMidDegr + 360;
            }
            angleMidDegr = angleMidDegr % 360;

            console.log("VectorAngle2Dim.update: angleMidDegr = " + angleMidDegr + ", cos: " + Math.cos(angleMid));

            var origx = d._vs._p1.getX();
            var domainZero = space.convertXFromCanvas(0);
            var domainEnd = space.convertXFromCanvas((d._r + 5.0));
            var domainR = domainEnd - domainZero;
            //console.log("VectorAngle2Dim.update: origx = " + origx + ", domainR: " + domainR);

            var result = space.convertXToCanvas(origx + (domainR * Math.cos(angleMid)));
            //console.log("VectorAngle2Dim.update: result = " + result + ", domainR: " + domainR);
            return result;
        })
        .attr("y", function (d) {
            var angleVs = getAngle(d._vs._p2.getX() - d._vs._p1.getX(), d._vs._p2.getY() - d._vs._p1.getY());
            var angleVe = getAngle(d._ve._p2.getX() - d._ve._p1.getX(), d._ve._p2.getY() - d._ve._p1.getY());

            while (angleVs > angleVe)
                angleVs = angleVs - 2 * Math.PI;

            var angleMid = angleVs + (angleVe - angleVs) / 2;

            var angleMidDegr = angleMid * 180 / Math.PI;
            while (angleMidDegr < 0) {
                angleMidDegr = angleMidDegr + 360;
            }
            angleMidDegr = angleMidDegr % 360;

            var origY = d._vs._p1.getY();
            var domainZero = space.convertXFromCanvas(0);
            var domainEnd = space.convertXFromCanvas((d._r + 5.0));
            var domainR = domainEnd - domainZero;

            var result = space.convertYToCanvas(origY + (domainR * Math.sin(angleMid)));
            return result;
        })
}

VectorAngle2Dim.update = function (space2Dim, angles) {
    //console.log("VectorAngle2Dim.update");

    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    var v2varcs = svg.selectAll(".vec2vecangle")
        .data(angles);

    v2varcs.select(".vec2vecarc")
        .attr("d", function (d) {
            return vector2vectorArc(space, d);
        })
        ;

    v2varcs.select(".vectorangle")
        .text(function (d) {
            var angleBetween = getAngleBetweenVectors(d._vs, d._ve);
            //console.log("VectorAngle2Dim.update: angleBetween = " + angleBetween);
            return d3.format(".2f")(angleBetween);
        })
        .attr("x", function (d) {
            var angleVs = getAngle(d._vs._p2.getX() - d._vs._p1.getX(), d._vs._p2.getY() - d._vs._p1.getY());
            var angleVe = getAngle(d._ve._p2.getX() - d._ve._p1.getX(), d._ve._p2.getY() - d._ve._p1.getY());

            while (angleVs > angleVe)
                angleVs = angleVs - 2 * Math.PI;

            var angleVsDegr = angleVs * 180 / Math.PI;
            var angleVeDegr = angleVe * 180 / Math.PI;

            console.log("VectorAngle2Dim.update: angleVsDegr = " + angleVsDegr + ", angleVeDegr: " + angleVeDegr);

            var angleMid = angleVs + (angleVe - angleVs) / 2;

            var angleMidDegr = angleMid * 180 / Math.PI;
            while (angleMidDegr < 0) {
                angleMidDegr = angleMidDegr + 360;
            }
            angleMidDegr = angleMidDegr % 360;

            console.log("VectorAngle2Dim.update: angleMidDegr = " + angleMidDegr + ", cos: " + Math.cos(angleMid));

            var origx = d._vs._p1.getX();
            var domainZero = space.convertXFromCanvas(0);
            var domainEnd = space.convertXFromCanvas((d._r + 5.0));
            var domainR = domainEnd - domainZero;
            //console.log("VectorAngle2Dim.update: origx = " + origx + ", domainR: " + domainR);

            var result = space.convertXToCanvas(origx + (domainR * Math.cos(angleMid)));
            //console.log("VectorAngle2Dim.update: result = " + result + ", domainR: " + domainR);
            return result;
        })
        .attr("y", function (d) {
            var angleVs = getAngle(d._vs._p2.getX() - d._vs._p1.getX(), d._vs._p2.getY() - d._vs._p1.getY());
            var angleVe = getAngle(d._ve._p2.getX() - d._ve._p1.getX(), d._ve._p2.getY() - d._ve._p1.getY());

            while (angleVs > angleVe)
                angleVs = angleVs - 2 * Math.PI;

            var angleMid = angleVs + (angleVe - angleVs) / 2;

            var angleMidDegr = angleMid * 180 / Math.PI;
            while (angleMidDegr < 0) {
                angleMidDegr = angleMidDegr + 360;
            }
            angleMidDegr = angleMidDegr % 360;

            var origY = d._vs._p1.getY();
            var domainZero = space.convertXFromCanvas(0);
            var domainEnd = space.convertXFromCanvas((d._r + 5.0));
            var domainR = domainEnd - domainZero;

            var result = space.convertYToCanvas(origY + (domainR * Math.sin(angleMid)));
            return result;
        })

}

function getAngleBetweenVectors(vs, ve) {
    var angleVs = getAngle(vs._p2.getX() - vs._p1.getX(), vs._p2.getY() - vs._p1.getY());
    var angleVe = getAngle(ve._p2.getX() - ve._p1.getX(), ve._p2.getY() - ve._p1.getY());

    var angleBetween = angleVe - angleVs;

    var angleBetweenDegr = angleBetween * 180 / Math.PI;

    while (angleBetweenDegr < 0) {
        angleBetweenDegr = angleBetweenDegr + 360;
    }

    angleBetweenDegr = angleBetweenDegr % 360;

    return angleBetweenDegr;
}

function getAngle(dx, dy) {
    //console.log("getAngle: dx = " + dx + ", dy = " + dy);

    var cosx = dx / Math.sqrt(dx * dx + dy * dy);
    var cosy = dy / Math.sqrt(dx * dx + dy * dy);

    var multiplyer = 1;
    if (cosy < 0)
        multiplyer = -1;

    //console.log("getAngle: cosx = " + cosx + ", cosy = " + cosy);

    var angle = multiplyer * Math.acos(cosx);
    //console.log("getAngle: angle = " + angle);

    while (angle < 0) {
        angle = angle + 2 * Math.PI;
    }

    return angle;
}

function vector2vectorArc(space2dim, d) {
    var varc = d3.path();

    // *** arc: function (x, y, r, a0, a1, ccw)
    varc.arc(space2dim.convertXToCanvas(d._vs._p1.getX()), space2dim.convertYToCanvas(d._vs._p1.getY()), d._r,
        getAngle(space2dim.convertXToCanvas(d._vs._p2.getX()) - space2dim.convertXToCanvas(d._vs._p1.getX()), space2dim.convertYToCanvas(d._vs._p2.getY()) - space2dim.convertYToCanvas(d._vs._p1.getY())),
        getAngle(space2dim.convertXToCanvas(d._ve._p2.getX()) - space2dim.convertXToCanvas(d._ve._p1.getX()), space2dim.convertYToCanvas(d._ve._p2.getY()) - space2dim.convertYToCanvas(d._ve._p1.getY())),
        d._ccw);

    return varc
}
