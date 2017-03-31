var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
    "save",
    "reset",
    "delete"
]);

module.exports = actions;