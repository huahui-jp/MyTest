var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');

'use strict';

var pageRouterStore = Reflux.createStore({
    listenables: [PageRouterActions],

    onNavigateTo: function (name) {
        var url = urls[name] || name;
        window.location = url;
    }
});

var urls ={
    "login":"login.html",
    "index":"index.html",
    "demo":"platform.html",
    "ioffice":"platform.html"
}

module.exports = pageRouterStore;