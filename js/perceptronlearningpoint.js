function PerceptronLearningPoint(props, config) {
    this._perceptron = props["perceptron"];

    this._x = props["x"];
    this._y = props["y"];
    this._desiredclass = props["desiredclass"];
}

//PerceptronLearningPoint.global = function (space2Dim) {
//    PerceptronResult.tooltip = space2Dim.getParent()
//        .append("div");

//    PerceptronResult.tooltip.attr("class", "tooltip")
//        //.style("position", "absolute")
//        //.style("visibility", "hidden")
//        .style("opacity", 0)
//        .text("I'm a result!")
//}

PerceptronLearningPoint.draw = function (space2Dim, results) {
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
            let resultcssclass = (resultClass == 1) ? "perceptronclass1" : "perceptronclass2";
            let desiredresultcssclass = (d._desiredclass == 1) ? "perceptrondesiredclass1" : "perceptrondesiredclass2";
            return "perceptronResultPoint " + resultcssclass + " " + desiredresultcssclass;
        })
        .attr("cx", function (d) { return space.convertXToCanvas(d._x); })
        .attr("cy", function (d) { return space.convertYToCanvas(d._y); })
        .attr("r", "4px")



    var updateData = allResults;

    updateData.select(".perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            let resultcssclass = (resultClass == 1) ? "perceptronclass1" : "perceptronclass2";
            let desiredresultcssclass = (d._desiredclass == 1) ? "perceptrondesiredclass1" : "perceptrondesiredclass2";
            return "perceptronResultPoint " + resultcssclass + " " + desiredresultcssclass;
        })
}

PerceptronLearningPoint.update = function (space2Dim, results) {
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
            let resultcssclass = (resultClass == 1) ? "perceptronclass1" : "perceptronclass2";
            let desiredresultcssclass = (d._desiredclass == 1) ? "perceptrondesiredclass1" : "perceptrondesiredclass2";
            return "perceptronResultPoint " + resultcssclass + " " + desiredresultcssclass;
        })
        .attr("cx", function (d) { return space.convertXToCanvas(d._x); })
        .attr("cy", function (d) { return space.convertYToCanvas(d._y); })
        .attr("r", "4px")
        //.on("mouseover", function (d, i) {
        //    console.log("PerceptronResult> mouseover[" + d._x + "][" + d._y + "]");
        //    //return PerceptronResult.tooltip.style("visibility", "visible");

        //    PerceptronResult.tooltip.transition()
        //        .duration(200)
        //        .style("opacity", .9);

        //    var elem = d3.select(this);

        //    //console.log("PerceptronResult> elem[" + elem.cx + "][" + elem.cy + "]");
        //    var elemPos = space.getElemPosition(elem);

        //    var cx = elemPos.x; //d3.event.pageX; //space.convertXToCanvas(d._x);
        //    var cy = elemPos.y - 5; // d3.event.pageY - 50; //space.convertYToCanvas(d._y);

        //    var f = d3.format(".1f");
        //    var tooltipText = ""
        //        + f(d._perceptron._a()) + "*"
        //        + f(d._x) + " + "
        //        + f(d._perceptron._b()) + "*"
        //        + f(d._y) + " + "
        //        + f(d._perceptron._c()) + " = "
        //        + f(d._perceptron.CalcPerceptronFunction(d._x, d._y));
        //    //tooltipText = "txt";
        //    console.log("tooltipText: " + tooltipText);

        //    PerceptronResult.tooltip
        //        .html(tooltipText);

        //    //var bbox = PerceptronResult.tooltip.node().getBBox();
        //    //let xOffset = bbox.width / 2;
        //    let xOffset = 30;

        //    PerceptronResult.tooltip
        //        .style("left", (cx - xOffset) + "px")
        //        .style("top", (cy + 10) + "px");

        //})
        //.on("mousemove", function (d, i) {
        //    console.log("PerceptronResult> mousemove");
        //    //PerceptronResult.tooltip.style("top", (event.pageY) + "px").style("left", (event.pageX) + "px");
        //})
        //.on("mouseout", function (d, i) {
        //    console.log("PerceptronResult> mouseout");
        //    //return PerceptronResult.tooltip.style("visibility", "hidden");

        //    PerceptronResult.tooltip.transition()
        //        .duration(500)
        //        .style("opacity", 0);
        //});

    var updateData = allResults;

    updateData.select(".perceptronResultPoint")
        .attr("class", function (d) {
            let resultClass = d._perceptron.CalcPerceptronOutcome(d._x, d._y);
            let resultcssclass = (resultClass == 1) ? "perceptronclass1" : "perceptronclass2";
            let desiredresultcssclass = (d._desiredclass == 1) ? "perceptrondesiredclass1" : "perceptrondesiredclass2";
            return "perceptronResultPoint " + resultcssclass + " " + desiredresultcssclass;
        })
}
