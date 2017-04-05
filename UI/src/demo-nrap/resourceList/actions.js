/**
 * resourceList.action.js 
 * 
 * 头注释要写为了在调试方便定位代码
 * 资源管理List画面
 * 
 * @author zhoujiang
 */
var Reflux = require('reflux');
'use strict';

var actions = Reflux.createActions([//首字母必须小写
    "search",
    "delete"
]);

module.exports = actions;