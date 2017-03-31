var Reflux = require('reflux');
var Actions = require('./actions');
var tools = require('../../common/tools');

'use strict';

var SIZE = 25;
var _cache = [];

var getObjectAt = function (/*number*/ index) /*?object*/ {
    if (index < 0 || index > SIZE) {
        return undefined;
    }
    if (_cache[index] === undefined) {
        _cache[index] = tools.createFakeRowObjectData(index);
    }
    return _cache[index];
};

var store = Reflux.createStore({
    listenables: [Actions],

    seachParams: {
        querystring: "",
        page: 0,
        pageSize: 20
    },

    getInitialState: function () {
        console.log("in table component store getInitialState.");
        _cache.length = 0;
        for (var i = 0; i < SIZE; i++) {
            getObjectAt(i);
        }
        return {
            rows: _cache,
            rowsTotoal: _cache.length,
            currentPage: 0
        }
    },

    onSearch: function (params) {
        //console.log(params);
        this.seachParams = params;
        var querystring = params.querystring;
        var filterRows = tools.filterRowsByColumns({
            rows: _cache,
            querystring: querystring,
            columns: ["firstName", "lastName", "city", "street", "zipCode"]
        });
        //console.log(filterRows.length);
        var newRows = tools.getNextPageRows(
            filterRows,
            params.page,
            params.pageSize);
        //console.log(newRows.length,filterRows.length);
        //console.log(newRows);
        this.trigger({
            rows: newRows,
            rowsTotoal: filterRows.length,
            currentPage: params.page
        });
    },

    onDelete: function (ids) {
        //console.log("ids",ids);
        _cache = _.filter(_cache, function (n) {
            //console.log("in onDelete", n.id, ids);
            return ids.indexOf("" + n.id) < 0;

        });
        //console.log(_cache, _cache.length);
        this.onSearch(this.seachParams);
    }
});

module.exports = store;