var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([
    "rowCheckboxClick",
    "headerCheckboxClick",
    "cleanCheckArray",
    "init",
    "sendNavigationInfo",
    "updMyTableData",
    "initMyTableData"
]);

module.exports = actions;