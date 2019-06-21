function Space3Dim(
    elemId
    , htmlWidth, htmlHeight
    , domainXMin, domainXMax, domainYMin, domainYMax
) {
    this._viewpointTransformation = calcViewPointTransformation(0.5, 0.5);
}

var calcViewPointTransformation = function (yaw, pitch) {
    var cosA = Math.cos(pitch);
    var sinA = Math.sin(pitch);
    var cosB = Math.cos(yaw);
    var sinB = Math.sin(yaw);
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
    //	the transformPrecald contains the coëffcients for the trnasformation

    var x = viewpointTransformation[0] * point[0] + viewpointTransformation[1] * point[1] + viewpointTransformation[2] * point[2];
    var y = viewpointTransformation[3] * point[0] + viewpointTransformation[4] * point[1] + viewpointTransformation[5] * point[2];
    var z = viewpointTransformation[6] * point[0] + viewpointTransformation[7] * point[1] + viewpointTransformation[8] * point[2];
    return [x, y, z];
};
