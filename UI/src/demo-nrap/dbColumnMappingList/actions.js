var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
	"init",
	"searchResource",
    "searchTable",
    "searchColumn",
    "searchTableMapping",
    "searchColumnMapping",
    "add",
    "upd",
    "addRow",
    "delRow"
]);

module.exports = actions;