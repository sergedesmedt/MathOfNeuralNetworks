function Space3Dim(
    elemId
    , htmlWidth, htmlHeight
    , domainXMin, domainXMax, domainYMin, domainYMax
) {
    this._htmlWidth = htmlWidth;
    this._htmlHeight = htmlHeight;
    this._domainXMin = domainXMin;
    this._domainXMax = domainXMax;
    this._domainYMin = domainYMin;
    this._domainYMax = domainYMax;
    this._parentId = elemId;
    this._canvasId = "svgcanvas" + this._parentId;
    this._svgId = "svg" + elemId;

    this._handlers = [];

    this._margin = 65;
    var margin = { top: this._margin, right: this._margin, bottom: this._margin, left: this._margin };

    this._yaw = 0.5;
    this._pitch = 0.5;
    this._viewpointTransformation = calcViewPointTransformation(this._yaw, this._pitch);

    var svg = d3.select("#" + this._parentId)
        .append("svg")
        .attr("id", this._svgId)
        .attr("width", this._htmlWidth + margin.left + margin.right)
        .attr("height", this._htmlHeight + margin.top + margin.bottom)
    var transform = svg.append("g")
        .attr("id", this._canvasId)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var origtransf = this.convertPointToCanvas([0, 0, 0]);
    var xaxtranf = this.convertPointToCanvas([100, 0, 0]);
    var yaxtranf = this.convertPointToCanvas([0, 100, 0]);
    var zaxtranf = this.convertPointToCanvas([0, 0, 100]);

    var xaxis = transform.append("g")
        .attr("class", "x axis");

    xaxis.append("line")
        .attr("x1", origtransf[0])
        .attr("y1", origtransf[1])
        .attr("x2", xaxtranf[0])
        .attr("y2", xaxtranf[1])

    var yaxis = transform.append("g")
        .attr("class", "x axis");

    yaxis.append("line")
        .attr("x1", origtransf[0])
        .attr("y1", origtransf[1])
        .attr("x2", yaxtranf[0])
        .attr("y2", yaxtranf[1])

    var zaxis = transform.append("g")
        .attr("class", "x axis");

    zaxis.append("line")
        .attr("x1", origtransf[0])
        .attr("y1", origtransf[1])
        .attr("x2", zaxtranf[0])
        .attr("y2", zaxtranf[1])

    let me = this;
    svg.on("mousedown", function () {
        me._drag = [d3.mouse(this), me._yaw, me._pitch];
        console.log("space3dim - mousedown");
    }).on("mouseup", function () {
        console.log("space3dim - mouseup");
        me._drag = false;
    }).on("mousemove", function () {
        if (me._drag) {
            var mouse = d3.mouse(this);
            me._yaw = me._drag[1] - (mouse[0] - me._drag[0][0]) / 50;
            me._pitch = me._drag[2] + (mouse[1] - me._drag[0][1]) / 50;
            me._pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, me._pitch));
            //md.turntable(yaw, pitch);

            me.update();

            console.log("space3dim - mousemove: updated pitch[" + me._pitch + "] and yaw[" + me._yaw + "]");
        }
    });
}

Space3Dim.prototype.convertPointToCanvas = function (point) {
    return transformPoint(point, this._viewpointTransformation);
}

Space3Dim.prototype.show = function () {
    var space3dim = this;
    this._handlers.forEach(function (item, index, arr) {
        item.drawMethod(space3dim, item.itemFactory());
    });
} 

Space3Dim.prototype.update = function () {
    var space3dim = this;
    this._handlers.forEach(function (item, index, arr) {
        item.updateMethod(space3dim, item.itemFactory());
    });
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

    //if (timer) clearTimeout(timer);
    //timer = setTimeout(renderSurface);

    return transformPrecalc;
}

var transformPoint = function (point, viewpointTransformation) {
    // calculate the transformed coordinates according to the yaw and pitch

    var x = viewpointTransformation[0] * point[0] + viewpointTransformation[1] * point[1] + viewpointTransformation[2] * point[2];
    var y = viewpointTransformation[3] * point[0] + viewpointTransformation[4] * point[1] + viewpointTransformation[5] * point[2];
    var z = viewpointTransformation[6] * point[0] + viewpointTransformation[7] * point[1] + viewpointTransformation[8] * point[2];
    return [x, y, z];
};
