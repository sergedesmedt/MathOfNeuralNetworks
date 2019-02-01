Point2Dim = function (
    xdomain,
    ydomain
) {
    this._xdomainObservable = xdomain; //ko.observable(xdomain);
    this._ydomainObservable = ydomain; //ko.observable(ydomain);
}

Point2Dim.prototype.getX = function() {
    return this._xdomainObservable();
}

Point2Dim.prototype.getY = function() {
    return this._ydomainObservable();
}