function Function3Dim(props, config) {
    this._func = props["func"];

    this._sampleFreq = config["sampleFreq"];
    this._xrange = config["xrange"];
    this._yrange = config["yrange"];

    var pnt = [];
    this._samples = [];

    var xstep = (this._xrange[1] - this._xrange[0]) / this._sampleFreq;
    var ystep = (this._yrange[1] - this._yrange[0]) / this._sampleFreq;
    for (var x = 0; x < this._sampleFreq; x++) {
        var xcoord = this._xrange[0] + x * xstep;
        this._samples.push(pnt = []);

        for (var y = 0; y < this._sampleFreq; y++) {
            var ycoord = this._yrange[0] + y * ystep;

            var zcoord = this._func(xcoord, ycoord);
            pnt.push([xcoord, ycoord, zcoord]);
        }
    }
}

Function3Dim.draw = function (space3Dim, funcs) {
    var svg = space3Dim.getCanvas();

    var newFuncs = svg.selectAll(".func3d")
        .data(funcs)
        .enter();

    var gfunc = newFuncs
        .append("g")
        .attr("class", "func3d");

    var newMeshes = gfunc.selectAll(".func3dmesh")
        .data(function (d) {
            var data = d._samples;
            return space3Dim.convertToPath(data);
        })
        .enter();
        //.append("path")
        //.attr("class", "func3dmesh")
        //.attr("d", function (d) { return d.path; })
        //.attr("stroke", "#000000")
        //.attr("fill", "#FFFFFF")
        //.on("click", function (d, i) {
        //    console.log("function3d - mesh mouseover");
        //});
    createMeshPath(newMeshes);
}

Function3Dim.update = function (space3Dim, funcs) {
    var svg = space3Dim.getCanvas();

    var existingFuncs = svg.selectAll(".func3d")
        .data(funcs);

    existingFuncs.selectAll(".func3dmesh")
        .remove();

    var newMeshes = existingFuncs.selectAll(".func3dmesh")
        .data(function (d) {
            var data = d._samples;
            return space3Dim.convertToPath(data);
        })
        .enter();
        //.append("path")
        //.attr("class", "func3dmesh")
        //.attr("d", function (d) { return d.path; })
        //.attr("stroke", "#000000")
        //.attr("fill", "#FFFFFF");
    createMeshPath(newMeshes);
}

var createMeshPath = function(selection) {
    selection
        .append("path")
        .attr("class", "func3dmesh")
        .attr("d", function (d) { return d.path; })
        .attr("stroke", "#000000")
        .attr("fill", "#FFFFFF")
        .on("click", function (d, i) {
            console.log("function3d - mesh mouseover");
        });

}

