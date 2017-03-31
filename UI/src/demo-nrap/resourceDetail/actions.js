var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
	"init",
    "add",
    "edit",
    "reset",
    "connect",
    "newTableMapping"
]);

module.exports = actions;