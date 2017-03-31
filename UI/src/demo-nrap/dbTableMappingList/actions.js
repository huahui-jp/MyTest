var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
	"searchResource",
    "search",
    "delete",
    "connect"
]);

module.exports = actions;