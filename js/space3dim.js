function Space3Dim(
    elemId
    , htmlWidth, htmlHeight, htmlZ
    , domainXMin, domainXMax, domainYMin, domainYMax, domainZMin, domainZMax
) {
    this._htmlWidth = htmlWidth;
    this._htmlHeight = htmlHeight;
    this._htmlZ = htmlZ;
    this._domainXMin = domainXMin;
    this._domainXMax = domainXMax;
    this._domainYMin = domainYMin;
    this._domainYMax = domainYMax;
    this._domainZMin = domainZMin;
    this._domainZMax = domainZMax;
    this._parentId = elemId;
    this._canvasId = "svgcanvas" + this._parentId;
    this._svgId = "svg" + elemId;

    this._handlers = [];
    this._meshProviders = [];

    this._margin = 20;
    let margin = { top: this._margin, right: this._margin, bottom: this._margin, left: this._margin };

    this._xscale = d3.scaleLinear()
        .domain([this._domainXMin, this._domainXMax])
        .range([0, this._htmlWidth]);
    this._yscale = d3.scaleLinear()
        .domain([this._domainYMin, this._domainYMax])
        .range([this._htmlHeight, 0]);
    this._zscale = d3.scaleLinear()
        .domain([this._domainZMin, this._domainZMax])
        .range([0, this._htmlZ]);

    this._yaw = 0.0;
    this._pitch = 0.0;
    this._viewpointTransformation = calcViewPointTransformation(this._yaw, this._pitch);

    var svg = d3.select("#" + this._parentId)
        .append("svg")
        .attr("id", this._svgId)
        .attr("width", this._htmlWidth + margin.left + margin.right)
        .attr("height", this._htmlHeight + margin.top + margin.bottom)
    var transform = svg.append("g")
        .attr("id", this._canvasId)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let me = this;
    svg.on("mousedown", function () {
        me._drag = [d3.mouse(this), me._yaw, me._pitch];
        //console.log("space3dim - mousedown");
    }).on("mouseup", function () {
        //console.log("space3dim - mouseup");
        me._drag = false;
    }).on("mousemove", function () {
        if (me._drag) {
            const scale = 200;
            var mouse = d3.mouse(this);
            me._yaw = me._drag[1] - (mouse[0] - me._drag[0][0]) / scale;
            me._pitch = me._drag[2] + (mouse[1] - me._drag[0][1]) / scale;
            me._pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, me._pitch));
            me._viewpointTransformation = calcViewPointTransformation(me._yaw, me._pitch);

            me.update();

            //console.log("space3dim - mousemove: updated pitch[" + me._pitch + "] and yaw[" + me._yaw + "]");
        }
    });
}

Space3Dim.prototype.getId = function () {
    return this._canvasId;
}

Space3Dim.prototype.getParentId = function () {
    return this._parentId;
}

Space3Dim.prototype.getSvg = function () {
    let svg = d3.select("#" + this._svgId);
    return svg;
}

Space3Dim.prototype.getCanvas = function () {
    return d3.select("#" + this.getId());
}

Space3Dim.prototype.getParent = function () {
    return d3.select("#" + this.getParentId());
}

Space3Dim.prototype.convertPointToCanvas = function (point) {

    let htmlCoord = [
        this._xscale(point[0]), 
        this._yscale(point[1]),
        this._zscale(point[2]),
    ];

    return transformPoint(htmlCoord, this._viewpointTransformation);
}

Space3Dim.prototype.registerHandler = function (drawMethod, updateMethod, itemFactory) {
    this._handlers.push({ drawMethod: drawMethod, updateMethod: updateMethod, itemFactory: itemFactory });
}

Space3Dim.prototype.registerMeshProvider = function (getMeshDataMethod, itemFactory) {
    this._meshProviders.push({ getMeshDataMethod: getMeshDataMethod, itemFactory: itemFactory });
}

Space3Dim.prototype.convertToPath = function (points, cssclass) {
    var mesh = [];
    for (var x = 0; x < points.length - 1; x++) {
        for (var y = 0; y < points[0].length - 1; y++) {
            var o0 = points[x][y];
            var o1 = points[x + 1][y];
            var o2 = points[x + 1][y + 1];
            var o3 = points[x][y + 1];

            let color = null;
            if(o0.length == 4)
            {
                let xm = (o0[0] + o1[0] + o2[0] + o3[0]) / 4;
                let ym = (o0[1] + o1[1] + o2[1] + o3[1]) / 4;
                let zm = (o0[2] + o1[2] + o2[2] + o3[2]) / 4;

                color = o0[3](xm, ym, zm);
            }

            var p0 = this.convertPointToCanvas(o0);
            var p1 = this.convertPointToCanvas(o1);
            var p2 = this.convertPointToCanvas(o2);
            var p3 = this.convertPointToCanvas(o3);


            var depth = p0[2] + p1[2] + p2[2] + p3[2];

            //console.log("cssclass" + cssclass + " depth[" + depth + "]" + " o0=" + o0[0] + "," + o0[1] + "," + o0[2] + " - p0=" + p0[0] + "," + p0[1] + "," + p0[2]);
            //console.log("cssclass" + cssclass + " depth[" + depth + "]" + " o1=" + o1[0] + "," + o1[1] + "," + o1[2] + " - p1=" + p1[0] + "," + p1[1] + "," + p1[2]);
            //console.log("cssclass" + cssclass + " depth[" + depth + "]" + " o2=" + o2[0] + "," + o2[1] + "," + o2[2] + " - p2=" + p2[0] + "," + p2[1] + "," + p2[2]);
            //console.log("cssclass" + cssclass + " depth[" + depth + "]" + " o3=" + o3[0] + "," + o3[1] + "," + o3[2] + " - p3=" + p3[0] + "," + p3[1] + "," + p3[2]);

            mesh.push({
                path: 'M' + (p0[0]).toFixed(10) + ',' + (p0[1]).toFixed(10) +
                    'L' + (p1[0]).toFixed(10) + ',' + (p1[1]).toFixed(10) +
                    'L' + (p2[0]).toFixed(10) + ',' + (p2[1]).toFixed(10) +
                    'L' + (p3[0]).toFixed(10) + ',' + (p3[1]).toFixed(10) +
                    'Z',
                depth: depth,
                origPoint: [o0, o1, o2, o3],
                projPoint: [p0, p1, p2, p3],
                cssclass: cssclass,
                fillColor: color
            });
        }
    }

    return mesh;
}

Space3Dim.prototype.GetMeshData = function (space3Dim) {
    var meshData = [];
    //meshData = meshData.concat(space3Dim.convertToPath(this._xaxis));
    //meshData = meshData.concat(space3Dim.convertToPath(this._yaxis));
    //meshData = meshData.concat(space3Dim.convertToPath(this._zaxis));
    return meshData;
}

Space3Dim.prototype.show = function () {

    var space3dim = this;

    var svg = space3dim.getCanvas();

    var meshes = [];
    meshes = meshes.concat(this.GetMeshData(this));
    this._meshProviders.forEach(function (item, index, arr) {
        meshes = meshes.concat(item.getMeshDataMethod(space3dim, item.itemFactory()));
    });

    meshes.sort(function (a, b) { return b.depth - a.depth });

    var newMeshes = svg.selectAll(".mesh3drect")
        .data(meshes)
        .enter();

    newMeshes
        .append("path")
        .attr("class", function (d) { return "mesh3drect " + d.cssclass; })
        .attr("id", function (d) { return "depth[" + d.depth + "]"; })
        .attr("d", function (d) { return d.path; })
        .style("fill", function (d) { return d.fillColor; })
} 

Space3Dim.prototype.update = function () {
    //console.log("space3dim - updating");

    var space3dim = this;

    var svg = space3dim.getCanvas();

    var meshes = [];
    meshes = meshes.concat(this.GetMeshData(this));
    this._meshProviders.forEach(function (item, index, arr) {
        meshes = meshes.concat(item.getMeshDataMethod(space3dim, item.itemFactory()));
    });

    meshes.sort(function (a, b) { return b.depth - a.depth });

    svg.selectAll(".mesh3drect")
        .remove();

    var newMeshes = svg.selectAll(".mesh3drect")
        .data(meshes)
        .enter();

    newMeshes
        .append("path")
        .attr("class", function (d) { return "mesh3drect " + d.cssclass; })
        .attr("id", function (d) { return "depth[" + d.depth + "]"; })
        .attr("d", function (d) { return d.path; })
        .style("fill", function (d) { return d.fillColor; })

}


var calcViewPointTransformation = function (yaw, pitch) {
    var cosA = Math.cos(pitch);
    var sinA = Math.sin(pitch);
    var cosB = Math.cos(yaw);
    var sinB = Math.sin(yaw);
    var transformPrecalc = [];
    transformPrecalc[0] = cosB;
    transformPrecalc[1] = 0;
    transformPrecalc[2] = sinB;
    transformPrecalc[3] = sinA * sinB;
    transformPrecalc[4] = cosA;
    transformPrecalc[5] = -sinA * cosB;
    transformPrecalc[6] = -sinB * cosA;
    transformPrecalc[7] = sinA;
    transformPrecalc[8] = cosA * cosB;

    return transformPrecalc;
}

var transformPoint = function (point, viewpointTransformation) {
    // calculate the transformed coordinates according to the yaw and pitch
    var x = viewpointTransformation[0] * point[0] + viewpointTransformation[1] * point[1] + viewpointTransformation[2] * point[2];
    var y = viewpointTransformation[3] * point[0] + viewpointTransformation[4] * point[1] + viewpointTransformation[5] * point[2];
    var z = viewpointTransformation[6] * point[0] + viewpointTransformation[7] * point[1] + viewpointTransformation[8] * point[2];

    //console.log("orig=" + point[0] + "," + point[1] + "," + point[2] + " - reverse=" + inversepoint[0] + "," + inversepoint[1] + "," + inversepoint[2]);

    return [x, y, z];
};
