function MathExpressions() {
    this._mathJaxQueue = MathJax.Hub.queue;

    this._isRunning = false;
    this._hasChanges = false;
}

MathExpressions.prototype.RegisterExpression = function(containerId, expressionProvider) {
    this._containerId = containerId;
    this._expressionProvider = expressionProvider;

    var me = this;
    me._mathJaxQueue.Push(function () {
        //console.log("set me._jaxExpression");
        me._jaxExpression = MathJax.Hub.getAllJax(containerId)[0];
        //console.log("me._jaxExpression is " + me._jaxExpression);

        // apply it immediately
        var mathExpression2 = me._expressionProvider();
        me._mathJaxQueue.Push(["Text", me._jaxExpression, "\\displaystyle{" + mathExpression2 + "}"]);

    });
}

MathExpressions.prototype.QueueUpdate = function() {
    //console.log("wil je dit nog doen aub?");
    var me = this;

    if (me._expressionProvider == undefined)
        return;

    var checkForChanges = function() {
        if (me._hasChanges) {
            me._hasChanges = false;
            var mathExpression2 = me._expressionProvider();
            //console.log("d'er is nog iets te doen[" + mathExpression2 + "]");
            me._isRunning = true;
            me._mathJaxQueue.Push(["Text", me._jaxExpression, "\\displaystyle{" + mathExpression2 + "}"]);
            me._mathJaxQueue.Push(function () {
                //console.log("wat er nog te doen was is nu gedaan denk ik");
                me._isRunning = false;
                checkForChanges();
            });                
        }
    }

    if (!this._isRunning) {
        this._isRunning = true;
        var mathExpression1 = this._expressionProvider();
        //console.log("ma ja gij: push changes[" + mathExpression1 + "]");
        me._mathJaxQueue.Push(["Text", this._jaxExpression, "\\displaystyle{" + mathExpression1 + "}"]);
        me._mathJaxQueue.Push(function () {
            //console.log("'k heb gedaan denk ik");
            me._isRunning = false;
            checkForChanges();
            // if (me._hasChanges) {
            //     me._hasChanges = false;
            //     var mathExpression2 = me._expressionProvider();
            //     console.log("d'er is nog iets te doen[" + mathExpression2 + "]");
            //     me._isRunning = true;
            //     me._mathJaxQueue.Push(["Text", me._jaxExpression, "\\displaystyle{" + mathExpression2 + "}"]);
            //     me._mathJaxQueue.Push(function () {
            //         console.log("wat er nog te doen was is nu gedaan denk ik");
            //         me._isRunning = false;
            //     });                
            // }
            //else {
                //console.log("d'er is niets meer te doen");
            //}
        });

    }
    else {
        //console.log("'k ben nog bezig...'");
        this._hasChanges = true;
    }
}
