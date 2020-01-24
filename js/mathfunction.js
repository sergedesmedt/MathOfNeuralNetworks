function Function2Dim(props, config) {
    this._func = props["func"];

    this._minDomain = Number.MIN_SAFE_INTEGER;
    this._maxDomain = Number.MAX_SAFE_INTEGER;
    if (config.hasOwnProperty("domain")) {
        this._minDomain = config["domain"][0];
        this._maxDomain = config["domain"][1];
    }

    this._sampleFreq = config["sampleFreq"];

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

    var lineFunction = function (space2Dim, points) {
        var lineFactory = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) {
                let funcx = space2Dim.convertXToCanvas(d[0]);
                //console.log("domainx=" + d[0] + ", canvasx=" + funcx);
                return funcx;
            })
            .y(function (d) {
                let funcy = space2Dim.convertYToCanvas(d[1]);
                //console.log("domainy=" + d[1] + ", canvasy=" + funcy);
                return funcy;
            })
            //.interpolate('basis')
            ;
        return lineFactory(points);
    };

    let me = this;
    this._pathFactory = function (space2Dim, domainX){
        //console.log("range x: min=" + domainX[0] + ", max=" + domainX[1]);
        let stepValue = 1;
        let //numPoints = 50, //Math.floor(chartWidth / 200),
            X = d3.range(domainX[0], domainX[1] + stepValue, stepValue), //.map(function (d) { return d / numPoints; }),
            Y = X.map(function (d) {
                //console.log("map x: " + d);
                return me._func(d);
            }),
            points = d3.zip(X, Y);

        return lineFunction(space2Dim, points);
    }
}

Function2Dim.draw = function (space2Dim, funcs) {

    var svg = space2Dim.getCanvas();
    var newFuncs = svg.selectAll(".func")
        .data(funcs)
        .enter();

    createFuncs(space2Dim, newFuncs);
}

Function2Dim.update = function (space2Dim, funcData) {
    //console.log("Function2Dim.update");

    var svg = space2Dim.getCanvas();

    var funcs = svg.selectAll(".func")
        .data(funcData);

    var newFuncs = funcs.enter();
    var removedFuncs = funcs.exit();

    createFuncs(space2Dim, newFuncs);
    deleteFuncs(space2Dim, removedFuncs);
    updateFuncs(space2Dim, funcs);
}

function createFuncs(space2Dim, newFuncs) {

    var gfunc = newFuncs
        .append("g")
        .attr("class", "func");

    var domainX = space2Dim.getDomain()[0];
    gfunc.append('path')
        .attr('class', function (d) { return 'funcplot' + ((d._cssclass == "") ? "" : (" " + d._cssclass));})
        .attr('d', function (d) {
            var domainMinValue = d._minDomain;
            if (domainMinValue < domainX[0])
                domainMinValue = domainX[0]
            var domainMaxValue = d._maxDomain;
            if (domainMaxValue > domainX[1])
                domainMaxValue = domainX[1]
            return d._pathFactory(space2Dim, [domainMinValue, domainMaxValue]);
        })
        ;

}

function deleteFuncs(space2Dim, removedFuncs) {
    removedFuncs.remove();
}

function updateFuncs(space2Dim, funcs) {
    var domainX = space2Dim.getDomain()[0];
    funcs.select(".funcplot")
        .attr('d', function (d) {
            var domainMinValue = d._minDomain;
            if (domainMinValue < domainX[0])
                domainMinValue = domainX[0]
            var domainMaxValue = d._maxDomain;
            if (domainMaxValue > domainX[1])
                domainMaxValue = domainX[1]

            return d._pathFactory(space2Dim, [domainMinValue, domainMaxValue]);
        })
        ;
}

function calculateAndAppendPaths(space2Dim) {


}
