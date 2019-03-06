function Perceptron(props, config) {
    this._a = props["a"];
    this._b = props["b"];
    this._c = props["c"];

    this._deftype = "drico";
    this._d = ko.computed(function () { 
        let c = -1 * this._c() / Math.sqrt(this._a() * this._a() + this._b() * this._b());
        //console.log("Percetron: c=" + c)
        return c;
    }, this);
    this._prico = new Rico2Dim(
        ko.computed(function () {
            var anorm = this._a() / Math.sqrt(this._a() * this._a() + this._b() * this._b()); 
            //console.log("Percetron: anorm=" + anorm);
            return anorm;
        }, this),
        ko.computed(function () {
            var bnorm = this._b() / Math.sqrt(this._a() * this._a() + this._b() * this._b());
            //console.log("Percetron: bnorm=" + bnorm);
            return bnorm;
        }, this)
    );

}

Perceptron.prototype.SetWeightVector = function (w) {
    this._a(w.a);
    this._b(w.b);
    this._c(w.c);

    console.log("Perceptron weights: a=" + this._a() + ", b=" + this._b() + ", c=" + this._c());
}

Perceptron.prototype.CalcPerceptronOutcome = function (x, y) {
    return (this.CalcPerceptronFunction(x, y) >= 0) ? 1 : 0;
}

Perceptron.prototype.CalcPerceptronFunction = function (x, y) {
    let a = this._a();
    let b = this._b();
    let c = this._c();
    var r = (a * x) + (b * y) + (c * 1);

    //console.log("CalcPerceptronOutcome a(" + a + ") * x(" + x + ") + b(" + b + ") * y(" + y + ") + c(" + c + ") = r(" + r + ")");

    return r;
}

Perceptron.prototype.LearnFromData = function (x, y, desiredclass) {
    let currentclass = this.CalcPerceptronOutcome(x, y);

    console.log("LearnFromData currentclass(" + currentclass + ") ? desiredclass(" + desiredclass + ")");
	
    if (currentclass != desiredclass) {
        let error = desiredclass - currentclass;
        return {
            a: (this._a() + ((error) * x)),
            b: (this._b() + ((error) * y)),
            c: (this._c() + ((error) * 1))
        };
    }

    return {
        a: this._a(),
        b: this._b(),
        c: this._c()
    };
}

Perceptron.draw = function (space2Dim, lines) {
    var space = space2Dim;

    var svg = space2Dim.getCanvas();
    var allSvgRays = svg.selectAll(".perceptron")
        .data(lines).enter();

    var gray = allSvgRays
        .append("g")
        .attr("class", "perceptron");

    gray.append("line")
        .attr("class", "perceptronline")
        .attr("x1", function (d) { return calcRayDRicoX1(space, d); })
        .attr("y1", function (d) { return calcRayDRicoY1(space, d); })
        .attr("x2", function (d) { return calcRayDRicoX2(space, d); })
        .attr("y2", function (d) { return calcRayDRicoY2(space, d); })
}

Perceptron.update = function (space2Dim, lines) {
    //console.log("UpdateLine ==================");

    var space = space2Dim;

    var svg = space2Dim.getCanvas();

    var rays = svg.selectAll(".perceptron")
        .data(lines);

    rays.select(".perceptronline")
        .attr("x1", function (d) { return calcRayDRicoX1(space, d); })
        .attr("y1", function (d) { return calcRayDRicoY1(space, d); })
        .attr("x2", function (d) { return calcRayDRicoX2(space, d); })
        .attr("y2", function (d) { return calcRayDRicoY2(space, d); })
        ;

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
