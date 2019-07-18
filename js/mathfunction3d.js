function Function3Dim(props, config) {
    this._func = props["func"];

    if (config.hasOwnProperty("sampleFreq")) {
        this._sampleFreqX = config["sampleFreq"];
        this._sampleFreqY = config["sampleFreq"];
    }
    if (config.hasOwnProperty("sampleFreqX")) {
        this._sampleFreqX = config["sampleFreqX"];
    }
    if (config.hasOwnProperty("sampleFreqY")) {
        this._sampleFreqY = config["sampleFreqY"];
    }
    this._xrange = config["xrange"];
    this._yrange = config["yrange"];

    var pnt = [];
    this._samples = [];

    this._cssclass = "";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
        //console.log("this._cssclass: " + this._cssclass);
    }

    var xstep = (this._xrange[1] - this._xrange[0]) / this._sampleFreqX;
    var ystep = (this._yrange[1] - this._yrange[0]) / this._sampleFreqY;
    for (var x = 0; x <= this._sampleFreqX; x++) {
        var xcoord = this._xrange[0] + x * xstep;

        console.log("sample x:" + xcoord);

        this._samples.push(pnt = []);

        for (var y = 0; y <= this._sampleFreqY; y++) {
            var ycoord = this._yrange[0] + y * ystep;

            var zcoord = this._func(xcoord, ycoord);
            pnt.push([xcoord, ycoord, zcoord]);
        }
    }
}

Function3Dim.getMeshData = function (space3Dim, funcs) {
    var result = [];
    var meshFactory = function (func) {
        var data = func._samples;
        return space3Dim.convertToPath(data, func._cssclass);
    };

    funcs.forEach(function (item, index, arr) {
        result = result.concat(meshFactory(item));
    });

    return result;
}

//Function3Dim.draw = function (space3Dim, funcs) {
//    var svg = space3Dim.getCanvas();

//    var newFuncs = svg.selectAll(".func3d")
//        .data(funcs)
//        .enter();

//    var gfunc = newFuncs
//        .append("g")
//        .attr("class", "func3d");

//    var newMeshes = gfunc.selectAll(".func3dmesh")
//        .data(function (d) {
//            var data = d._samples;
//            return space3Dim.convertToPath(data);
//        })
//        .enter();
//        //.append("path")
//        //.attr("class", "func3dmesh")
//        //.attr("d", function (d) { return d.path; })
//        //.attr("stroke", "#000000")
//        //.attr("fill", "#FFFFFF")
//        //.on("click", function (d, i) {
//        //    console.log("function3d - mesh mouseover");
//        //});

//    createMeshPath(newMeshes);
//}

//Function3Dim.update = function (space3Dim, funcs) {
//    var svg = space3Dim.getCanvas();

//    var existingFuncs = svg.selectAll(".func3d")
//        .data(funcs);

//    existingFuncs.selectAll(".func3dmesh")
//        .remove();

//    var newMeshes = existingFuncs.selectAll(".func3dmesh")
//        .data(function (d) {
//            var data = d._samples;
//            return space3Dim.convertToPath(data);
//        })
//        .enter();
//        //.append("path")
//        //.attr("class", "func3dmesh")
//        //.attr("d", function (d) { return d.path; })
//        //.attr("stroke", "#000000")
//        //.attr("fill", "#FFFFFF");
//    createMeshPath(newMeshes);
//}

//var createMeshPath = function(selection) {
//    selection
//        .append("path")
//        .attr("class", "func3dmesh")
//        .attr("d", function (d) { return d.path; })
//        .attr("stroke", "#000000")
//        .attr("fill", "#FFFFFF")
//        //.on("click", function (d, i) {
//        //    var mouse = d3.mouse(this);
//        //    console.log(
//        //        "function3d - mesh mouseover"
//        //        + "mouse[" + mouse[0] + "]"
//        //        + "o0[" + d.origPoint[0][0] + "]" + ", o1[" + d.origPoint[1][0] + "]"
//        //        + "p0[" + d.projPoint[0][0] + "]" + ", p1[" + d.projPoint[1][0] + "]"
//        //    );
//        //})
//        ;
//}

