function Perceptron(props, config) {
    this._w0 = props["w0"];
    this._w1 = props["w1"];
    this._w2 = props["w2"];

    this._deftype = "drico";
    this._d = ko.computed(function () { 
        let c = -1 * this._w0() / Math.sqrt(this._w1() * this._w1() + this._w2() * this._w2());
        //console.log("Percetron: c=" + c)
        return c;
    }, this);
    this._prico = new Rico2Dim(
        ko.computed(function () {
            var anorm = this._w1() / Math.sqrt(this._w1() * this._w1() + this._w2() * this._w2()); 
            //console.log("Percetron: anorm=" + anorm);
            return anorm;
        }, this),
        ko.computed(function () {
            var bnorm = this._w2() / Math.sqrt(this._w1() * this._w1() + this._w2() * this._w2());
            //console.log("Percetron: bnorm=" + bnorm);
            return bnorm;
        }, this)
    );

}

Perceptron.prototype.SetWeightVector = function (w) {
    this._w0(w.w0);
    this._w1(w.w1);
    this._w2(w.w2);

    //console.log("Perceptron weights: a=" + this._w1() + ", b=" + this._w2() + ", c=" + this._w0());
}

Perceptron.prototype.CalcPerceptronOutcome = function (x1, x2) {
    return (this.CalcPerceptronFunction(x1, x2) >= 0) ? 1 : 0;
}

Perceptron.prototype.CalcPerceptronFunction = function (x1, x2) {
    let w0 = this._w0();
    let w1 = this._w1();
    let w2 = this._w2();
    var r = (w0 * 1) + (w1 * x1) + (w2 * x2);

    //console.log("CalcPerceptronOutcome a(" + a + ") * x(" + x + ") + b(" + b + ") * y(" + y + ") + c(" + c + ") = r(" + r + ")");

    return r;
}

Perceptron.prototype.LearnFromData = function (x1, x2, desiredclass) {
    let currentclass = this.CalcPerceptronOutcome(x1, x2);

    //console.log("LearnFromData currentclass(" + currentclass + ") ? desiredclass(" + desiredclass + ")");
	
    if (currentclass != desiredclass) {
        let error = desiredclass - currentclass;
        return {
            w0: (this._w0() + ((error) * 1)),
            w1: (this._w1() + ((error) * x1)),
            w2: (this._w2() + ((error) * x2))
        };
    }

    return {
        w0: this._w0(),
        w1: this._w1(),
        w2: this._w2()
    };
}

Perceptron.prototype.LearnFromDataUsingLearningRate = function (x1, x2, desiredclass, learningrate) {
    let currentclass = this.CalcPerceptronOutcome(x1, x2);

    //console.log("LearnFromData currentclass(" + currentclass + ") ? desiredclass(" + desiredclass + ")");

    if (currentclass != desiredclass) {
        let error = desiredclass - currentclass;
        return {
            w0: (this._w0() + (learningrate * (error) * 1)),
            w1: (this._w1() + (learningrate * (error) * x1)),
            w2: (this._w2() + (learningrate * (error) * x2))
        };
    }

    return {
        w0: this._w0(),
        w1: this._w1(),
        w2: this._w2()
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
