var Reflux = require('reflux');
var Actions = require('./actions');
var State = require('react-router').State;

'use strict';

var store = Reflux.createStore({
    listenables: [
        Actions
    ],

    onLogout: function () {

    },

    getInitialState: function () {
        return {

        };
    }
});

module.exports = store;