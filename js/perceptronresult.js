function PerceptronResult(props, config) {
    this._perceptron = props["perceptron"];

    this._x = props["x"];
    this._y = props["y"];
}

PerceptronResult.global = function (space2Dim) {
    PerceptronResult.tooltip = space2Dim.getParent()
        .append("div");

    PerceptronResult.tooltip.attr("class", "tooltip")	
        //.style("position", "absolute")
        //.style("visibility", "hidden")
        .style("opacity", 0)
        .text("I'm a result!")
}

PerceptronResult.draw = function (space2Dim, results) {
    var space = space2Dim;

    var svg = space.getCanvas();

    var allResults = svg.selectAll(".perceptronResult")
        .data(results);

    var newData = allResults
        .enter();

    gnew = newData
        .append("g")
        .attr("class", "perceptronResult")

    gnew.append("circle")
        //.attr("class", "perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            return (resultClass == 1) ? "perceptronResultPoint perceptronclass1" : "perceptronResultPoint perceptronclass2";
        })
        .attr("cx", function (d) { return space.convertXToCanvas(d._x); })
        .attr("cy", function (d) { return space.convertYToCanvas(d._y); })
        .attr("r", "10px")
        .on("mouseover", function () {
            console.log("PerceptronResult> mouseover");
            //return PerceptronResult.tooltip.style("visibility", "visible");

            var elem = d3.select(this);

            //console.log("PerceptronResult> elem[" + elem.cx + "][" + elem.cy + "]");
            var elemPos = space.getElemPosition(elem);

            var cx = elemPos.x; //d3.event.pageX; //space.convertXToCanvas(d._x);
            var cy = elemPos.y; // d3.event.pageY - 50; //space.convertYToCanvas(d._y);

            var f = d3.format(".1f");
            var tooltipText = ""
                + f(d._perceptron._w0()) + " = "
                + f(d._perceptron.CalcPerceptronFunction(d._x, d._y))
                + f(d._perceptron._w1()) + "*"
                + f(d._x) + " + "
                + f(d._perceptron._w2()) + "*"
                + f(d._y) + " + "
                ;
            //tooltipText = "txt";
            console.log("tooltipText: " + tooltipText);

            PerceptronResult.tooltip
                .html(tooltipText);

            PerceptronResult.tooltip
                .html(d._perceptron._w1() + "*" + d._x + " + " + d._perceptron._w2() + "*" + d._y + " + " + d._perceptron._w0() + " = " + d._perceptron.CalcPerceptronFunction(d._x, d._y));

            var canvasBbox = space.getParent().node().getBoundingClientRect();
            var bbox = PerceptronResult.tooltip.node().getBoundingClientRect(); //node().getBBox();
            let xOffset = cx + canvasBbox.x - bbox.width / 2;
            let yOffset = cy + canvasBbox.y - 35;

            PerceptronResult.tooltip
                .style("left", (xOffset) + "px")
                .style("top", (yOffset) + "px");

        })
        .on("mousemove", function () {
            console.log("PerceptronResult> mousemove");
            //PerceptronResult.tooltip.style("top", (event.pageY) + "px").style("left", (event.pageX) + "px");
        })
        .on("mouseout", function () {
            console.log("PerceptronResult> mouseout");
            //return PerceptronResult.tooltip.style("visibility", "hidden");

            PerceptronResult.tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    var updateData = allResults;

    updateData.select(".perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            return (resultClass == 1) ? "perceptronResultPoint perceptronclass1" : "perceptronResultPoint perceptronclass2";
        })
}

PerceptronResult.update = function (space2Dim, results) {
    var space = space2Dim;

    var svg = space.getCanvas();

    var allResults = svg.selectAll(".perceptronResult")
        .data(results);

    var newData = allResults.enter();

    gnew = newData
        .append("g")
        .attr("class", "perceptronResult")

    gnew.append("circle")
        //.attr("class", "perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            return (resultClass == 1) ? "perceptronResultPoint perceptronclass1" : "perceptronResultPoint perceptronclass2";
        })
        .attr("cx", function (d) { return space.convertXToCanvas(d._x); })
        .attr("cy", function (d) { return space.convertYToCanvas(d._y); })
        .attr("r", "10px")
        .on("mouseover", function (d, i) {
            console.log("PerceptronResult> mouseover[" + d._x + "][" + d._y + "]");
            //return PerceptronResult.tooltip.style("visibility", "visible");

            PerceptronResult.tooltip.transition()
                .duration(200)
                .style("opacity", .9);

            var elem = d3.select(this);

            //console.log("PerceptronResult> elem[" + elem.cx + "][" + elem.cy + "]");
            var elemPos = space.getElemPosition(elem);

            var cx = elemPos.x; //d3.event.pageX; //space.convertXToCanvas(d._x);
            var cy = elemPos.y; // d3.event.pageY - 50; //space.convertYToCanvas(d._y);

            var f = d3.format(".1f");
            var tooltipText = ""
                + f(d._perceptron._w0()) + "*"
                + "1.0 + "
                + f(d._perceptron._w1()) + "*"
                + f(d._x) + " + "
                + f(d._perceptron._w2()) + "*"
                + f(d._y) + " = "
                + f(d._perceptron.CalcPerceptronFunction(d._x, d._y))
                ;
            //tooltipText = "txt";
            console.log("tooltipText: " + tooltipText);

            PerceptronResult.tooltip
                .html(tooltipText);

            var canvasBbox = space.getParent().node().getBoundingClientRect();
            var bbox = PerceptronResult.tooltip.node().getBoundingClientRect(); //.node().getBBox();
            let xOffset = cx + canvasBbox.x - bbox.width / 2;
            let yOffset = cy + canvasBbox.y - 35;

            PerceptronResult.tooltip
                .style("left", (xOffset) + "px")
                .style("top", (yOffset) + "px");

        })
        .on("mousemove", function (d, i) {
            console.log("PerceptronResult> mousemove");
            //PerceptronResult.tooltip.style("top", (event.pageY) + "px").style("left", (event.pageX) + "px");
        })
        .on("mouseout", function (d, i) {
            console.log("PerceptronResult> mouseout");
            //return PerceptronResult.tooltip.style("visibility", "hidden");

            PerceptronResult.tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    var updateData = allResults;

    updateData.select(".perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            return (resultClass == 1) ? "perceptronResultPoint perceptronclass1" : "perceptronResultPoint perceptronclass2";
        })
}
