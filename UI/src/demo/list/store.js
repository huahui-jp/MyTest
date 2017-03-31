var Reflux = require('reflux');
var Actions = require('./actions');
var tools = require('../../common/tools');

'use strict';

var SIZE = 25;
var _cache = [];


var store = Reflux.createStore({
    getObjectAt: function (/*number*/ index) /*?object*/ {
        if (index < 0 || index > SIZE) {
            return undefined;
        }
        if (_cache[index] === undefined) {
            _cache[index] = tools.createFakeRowObjectData(index);
        }
        return _cache[index];
    },
    listenables: [Actions],

    seachParams: {
        rows: null,
        rowsTotoal: 0,
        currentPage: 0,
        deleteOk: false,
        pageSize: 20,
        querystring: null
    },

    getInitialState: function () {
        console.log("in table component store getInitialState.");
        _cache.length = 0;
        for (var i = 0; i < SIZE; i++) {
            this.getObjectAt(i);
        }
        this.seachParams.rows = _cache;
        this.seachParams.rowsTotoal = _cache.length;
        return this.seachParams;
    },

    onSearch: function (params) {
        //console.log(params);
        this.seachParams.querystring = params.querystring || "";
        this.seachParams.currentPage = params.page || 0;
        var filterRows = tools.filterRowsByColumns({
            rows: _cache,
            querystring: this.seachParams.querystring,
            columns: ["firstName", "lastName", "city", "street", "zipCode"]
        });
        //console.log(filterRows.length);
        var newRows = tools.getNextPageRows(
            filterRows,
            this.seachParams.currentPage,
            this.seachParams.pageSize);
        //console.log(newRows.length,filterRows.length);
        //console.log(newRows);
        this.trigger({
            rows: newRows,
            rowsTotoal: filterRows.length,
            deleteOk: this.deleteOk,
            currentPage: this.seachParams.currentPage
        });
        this.deleteOk = false;
    },

    onDelete: function (ids) {
        //console.log("ids",ids);
        _cache = _.filter(_cache, function (n) {
            //console.log("in onDelete", n.id, ids);
            return ids.indexOf("" + n.id) < 0;

        });
        this.deleteOk = true;
        //console.log(_cache, _cache.length);
        this.onSearch(this.seachParams);
    }
});

module.exports = store;