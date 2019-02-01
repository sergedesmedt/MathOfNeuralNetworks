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

    this._handlers = [];

    var margin = { top: 40, right: 40, bottom: 40, left: 40 };

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

    var svg = d3.select(elemId)
        .append("svg")
        .attr("width", this._htmlWidth + margin.left + margin.right)
        .attr("height", this._htmlHeight + margin.top + margin.bottom)
        .append("g")
        .attr("id", "svgcanvas")
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
    return "svgcanvas";
}

Space2Dim.prototype.getCanvas = function() {
    return d3.select("#" + this.getId());
}

Space2Dim.prototype.convertXToCanvas = function (x) {
    return this._xscale(x);
}

Space2Dim.prototype.convertYToCanvas = function (y) {
    return this._yscale(y);
}

Space2Dim.prototype.registerHandler = function (drawMethod, itemFactory) {
    this._handlers.push({ drawMethod: drawMethod, itemFactory: itemFactory });
}

Space2Dim.prototype.show = function () {
    var space2dim = this;
    this._handlers.forEach(function (item, index, arr) {
        item.drawMethod(space2dim, item.itemFactory());
    });
} 