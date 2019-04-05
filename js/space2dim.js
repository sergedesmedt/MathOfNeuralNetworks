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
    this._svgId = "svg" + elemId;

    this._handlers = [];

    this._valuedspacingx = 8;
    this._valuedspacingy = 12;

    this._margin = 65;
    var margin = { top: this._margin, right: this._margin, bottom: this._margin, left: this._margin };

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

    var svg = d3.select("#" + this._parentId)
        .append("svg")
        .attr("id", this._svgId)
        .attr("width", this._htmlWidth + margin.left + margin.right)
        .attr("height", this._htmlHeight + margin.top + margin.bottom)
        .append("g")
        .attr("id", this._canvasId)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
        .attr("width", this._htmlWidth)
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

Space2Dim.prototype.getParentId = function () {
    return this._parentId;
}

Space2Dim.prototype.getSvg = function()
{
    let svg = d3.select("#" + this._svgId);
    return svg;
}

Space2Dim.prototype.getCanvas = function() {
    return d3.select("#" + this.getId());
}

Space2Dim.prototype.getParent = function () {
    return d3.select("#" + this.getParentId());
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

Space2Dim.prototype.getElemPosition = function (elem) {
    // https://stackoverflow.com/questions/26049488/how-to-get-absolute-coordinates-of-object-inside-a-g-group/26053262
    // https://stackoverflow.com/questions/36588261/d3-js-after-translate-wrong-mouse-coordinates-being-reported-why

    //var coordinates = d3.mouse(this);


    var bbox = elem.node().getBBox(),
        middleX = bbox.x + (bbox.width / 2),
        middleY = bbox.y + (bbox.height / 2);

    //console.log("Space2Dim> bbox[" + middleX + "][" + middleY + "]");


    var p = this.getSvg().node().createSVGPoint();
    var ctm = elem.node().getCTM();
    p.x = middleX;
    p.y = middleY;
    return p.matrixTransform(ctm);
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

Space2Dim.prototype.OnClick = function (func) {
    var callback = func;
    var svg = this.getSvg(); //d3.select("svg")
    var me = this;
    svg.on("click", function () {
        var coords = d3.mouse(this);

        //console.log("svg clicked at coord[" + coords[0] + "," + coords[1] + "]");

        var xd = me.convertXFromCanvas(coords[0] - me._margin);
        var yd = me.convertYFromCanvas(coords[1] - me._margin);

        //console.log("svg clicked at coord[" + coords[0] + "," + coords[1] + "], domain[" + xd + "," + yd + "]");


        callback(xd, yd, d3.event.shiftKey);
        //var perceptron = vm.allPerceptrons[0];
        //vm.allPerceptronResults.push(createPerceptron(perceptron, xd, yd));


    });

}

Space2Dim.prototype.CreatePoint = function (x, y) {

    var px = ko.observable(x);
    var py = ko.observable(y);

    var space2dim = this;

    px.subscribe(function (newValue) { space2dim.update(); });
    py.subscribe(function (newValue) { space2dim.update(); });

    var p = new Point2Dim(px, py);
    return p;
}

Space2Dim.prototype.CreatePointAndUpdate = function (x, y, updateFunc) {

    var px = ko.observable(x);
    var py = ko.observable(y);

    var space2dim = this;
    var callFunc = updateFunc;

    px.subscribe(function (newValue) { space2dim.update(); callFunc(); });
    py.subscribe(function (newValue) { space2dim.update(); callFunc(); });

    var p = new Point2Dim(px, py);
    return p;
}