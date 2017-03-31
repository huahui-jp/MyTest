var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
    "search",
    "add",
    "edit",
    "delete",
    "init"
]);

module.exports = actions;