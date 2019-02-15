Point2Dim = function (
    xdomain,
    ydomain
) {
    this._xdomainObservable = xdomain;
    this._ydomainObservable = ydomain;
}

Point2Dim.prototype.getX = function() {
    return this._xdomainObservable();
}

Point2Dim.prototype.getY = function() {
    return this._ydomainObservable();
}

Point2Dim.prototype.setX = function (x) {
    return this._xdomainObservable(x);
}

Point2Dim.prototype.setY = function (y) {
    return this._ydomainObservable(y);
}