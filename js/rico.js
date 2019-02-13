Rico2Dim = function (
    dxdomain,
    dydomain
) {
    this._dxdomainObservable = dxdomain; //ko.observable(xdomain);
    this._dydomainObservable = dydomain; //ko.observable(ydomain);
}

Rico2Dim.prototype.getDX = function () {
    return this._dxdomainObservable();
}

Rico2Dim.prototype.getDY = function () {
    return this._dydomainObservable();
}

Rico2Dim.prototype.setDX = function (x) {
    return this._dxdomainObservable(x);
}

Rico2Dim.prototype.setDY = function (y) {
    return this._dydomainObservable(y);
}