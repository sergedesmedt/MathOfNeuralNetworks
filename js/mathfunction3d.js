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

    this._colorFunc = null;
    if (config.hasOwnProperty("colorFunc")) {
        this._colorFunc = config["colorFunc"];
    }

    //console.log("Function3Dim.xrange: " + this._xrange[0] + "," + this._xrange[1]);
    //console.log("Function3Dim.yrange: " + this._yrange[0] + "," + this._yrange[1]);

    var pnt = [];
    this._samples = [];

    this._cssclass = "defaultFunc";
    if (config.hasOwnProperty("cssclass")) {
        this._cssclass = config["cssclass"];
    }

    var xstep = (this._xrange[1] - this._xrange[0]) / this._sampleFreqX;
    var ystep = (this._yrange[1] - this._yrange[0]) / this._sampleFreqY;
    for (var x = 0; x <= this._sampleFreqX; x++) {
        var xcoord = this._xrange[0] + x * xstep;

        this._samples.push(pnt = []);

        for (var y = 0; y <= this._sampleFreqY; y++) {
            var ycoord = this._yrange[0] + y * ystep;
            var zcoord = this._func(xcoord, ycoord);
            if (this._colorFunc != null)
            {
                pnt.push([xcoord, ycoord, zcoord, this._colorFunc]);
            }
            else
            {
                pnt.push([xcoord, ycoord, zcoord]);
            }
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
