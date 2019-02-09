function Space2Dim(
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

    this._handlers = [];

    this._valuedspacingx = 8;
    this._valuedspacingy = 12;

    var margin = { top: 65, right: 65, bottom: 65, left: 65 };

    this._xscale = d3.scaleLinear()
        .domain([this._domainXMin, this._domainXMax])
        .range([0, this._htmlWidth]);
    this._yscale = d3.scaleLinear()
        .domain([this._domainYMin, this._domainYMax])
        .range([this._htmlHeight, 0]);

    var xAxis = d3.axisBottom()
        .scale(this._xscale)
        .ticks(10)
        .tickSize(-1 * this._htmlHeight);
    var yAxis = d3.axisLeft()
        .scale(this._yscale)
        .ticks(10)
        .tickSize(-1 * this._htmlWidth);

    var svg = d3.select("#" + elemId)
        .append("svg")
        .attr("width", this._htmlWidth + margin.left + margin.right)
        .attr("height", this._htmlHeight + margin.top + margin.bottom)
        .append("g")
        .attr("id", this._canvasId)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
        .attr("width", this._htmlWith)
        .attr("height", this._htmlHeight);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this._htmlHeight + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

Space2Dim.prototype.getId = function() {
    return this._canvasId;
}

Space2Dim.prototype.getCanvas = function() {
    return d3.select("#" + this.getId());
}

Space2Dim.prototype.getValueSpacingX = function (lvl) {
    return this._yscale(this._domainYMin) + (10 + lvl * this._valuedspacingx);
}

Space2Dim.prototype.getValueSpacingY = function (lvl) {
    return this._xscale(this._domainXMin) - (20 + lvl * this._valuedspacingy);
}

Space2Dim.prototype.convertXToCanvas = function (x) {
    return this._xscale(x);
}

Space2Dim.prototype.convertYToCanvas = function (y) {
    return this._yscale(y);
}

Space2Dim.prototype.convertXFromCanvas = function (x) {
    return this._xscale.invert(x);
}

Space2Dim.prototype.convertYFromCanvas = function (y) {
    return this._yscale.invert(y);
}

Space2Dim.prototype.appenGlobalAttributes = function (globalHandlerMethod) {
    globalHandlerMethod(this);
}

Space2Dim.prototype.registerHandler = function (drawMethod, updateMethod, itemFactory) {
    this._handlers.push({ drawMethod: drawMethod, updateMethod: updateMethod, itemFactory: itemFactory });
}

Space2Dim.prototype.show = function () {
    var space2dim = this;
    this._handlers.forEach(function (item, index, arr) {
        item.drawMethod(space2dim, item.itemFactory());
    });
} 

Space2Dim.prototype.update = function () {
    var space2dim = this;
    this._handlers.forEach(function (item, index, arr) {
        item.updateMethod(space2dim, item.itemFactory());
    });
} 