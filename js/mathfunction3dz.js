function Function3DimZ(props, config) {
    this._func = props["func"];

    if (config.hasOwnProperty("sampleFreq")) {
        this._sampleFreqX = config["sampleFreq"];
        this._sampleFreqY = config["sampleFreq"];
    }
    if (config.hasOwnProperty("sampleFreqX")) {
        this._sampleFreqX = config["sampleFreqX"];
    }
    //if (config.hasOwnProperty("sampleFreqY")) {
    //    this._sampleFreqY = config["sampleFreqY"];
    //}
    if (config.hasOwnProperty("sampleFreqZ")) {
        this._sampleFreqZ = config["sampleFreqZ"];
    }
    this._xrange = config["xrange"];
    //this._yrange = config["yrange"];
    this._zrange = config["zrange"];

    console.log("Function3Dim.xrange: " + this._xrange[0] + "," + this._xrange[1]);
    //console.log("Function3Dim.yrange: " + this._yrange[0] + "," + this._yrange[1]);
    console.log("Function3Dim.zrange: " + this._zrange[0] + "," + this._zrange[1]);

    var pnt = [];
    this._samples = [];

    this._cssclass = "defaultFunc";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
    }

    var xstep = (this._xrange[1] - this._xrange[0]) / this._sampleFreqX;
   // var ystep = (this._yrange[1] - this._yrange[0]) / this._sampleFreqY;
    var zstep = (this._zrange[1] - this._zrange[0]) / this._sampleFreqZ;
    for (var x = 0; x <= this._sampleFreqX; x++) {
        var xcoord = this._xrange[0] + x * xstep;

        this._samples.push(pnt = []);

        let yzArray = [];

        for (var z = 0; z <= this._sampleFreqZ; z++) {
            var zcoord = this._zrange[0] + z * zstep;

            var ycoords = this._func(xcoord, zcoord);
            ycoords.forEach(function (y, index) {
                if (y.length == 0)
                    return;

                yzArray.push([y, zcoord]);
            });
            
            
        }

        yzArraySort = yzArray.sort(function (a, b) { return a[0] - b[0]; });
        yzArraySort.forEach(function (yz, index) {
            pnt.push([xcoord, yz[0], yz[1]]);
        });
    }
}

Function3DimZ.getMeshData = function (space3Dim, funcs) {
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

