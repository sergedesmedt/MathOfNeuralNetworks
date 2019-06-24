function Function2Dim(props, config) {
    this._func = props["func"];

    this._sampleFreq = config["sampleFreq"];
}

Function2Dim.draw = function (space2Dim, funcs) {

    var space = space2Dim;

    var svg = space2Dim.getCanvas();
    var newFuncs = svg.selectAll(".func")
        .data(funcs)
        .enter();

    var gfunc = newFuncs
        .append("g")
        .attr("class", "func");

    var lineFunction = d3.line()
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

    var domainX = space.getDomain()[0];
    gfunc.append('path')
        .attr('class', 'funcplot')
        .attr('d', function (d) {
            let me = d;
            var //numPoints = 50, //Math.floor(chartWidth / 200),
                X = d3.range(domainX[0], domainX[1]), //.map(function (d) { return d / numPoints; }),
                Y = X.map(function (d) {
                    return me._func(d);
                }),
                points = d3.zip(X, Y);

            return lineFunction(points);
        })
        //.attr('stroke', 'rgb(50,50,250)')
        //.attr('opacity', 0)
        //.attr('fill', 'none')
        ;
}

Function2Dim.update = function (space2Dim, funcs) {
}
