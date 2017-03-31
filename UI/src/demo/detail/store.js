var Reflux = require('reflux');
var Actions = require('./actions');
var ListStore = require("../list/store");

'use strict';

var store = Reflux.createStore({
    listenables: [Actions],


    getInitialState: function () {
        return {};
    },

    getDataObject: function (id) {
        console.log("getDataObject",id);
        if (id > -1) {
            var obj = ListStore.getObjectAt(id);
            obj["name"] = obj.firstName + " " + obj.lastName;
            obj["_date"] = "2015-09-11";
            return obj;
        } else {
            return {};
        }
    },
    onSave: function (obj) {
        console.log("save Obj", obj);
        this.trigger({
            obj: obj,
            saveOk: true
        });
    }
});

module.exports = store;