var Reflux = require('reflux');
var Actions = require('./actions');

'use strict';

var store = Reflux.createStore({
    listenables: [Actions],

    getInitialState: function () {
        return {

        };
    }
});

module.exports = store;