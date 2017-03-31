var Reflux = require('reflux');
var Actions = require('./actions');

'use strict';


var store = Reflux.createStore({
    listenables: [Actions],

    checkedMap: {},//{ID:true/false}

    headerChecked: false,

    navigationInfo: null,

    tableKey:null,

    myTableData:[],

    _trigger: function () {
        var selectedRowIds = [];
        for(var prop in this.checkedMap){
            if(this.checkedMap[prop]){
                selectedRowIds.push(prop);
            }
        }
        // console.log("selectedRowIds",selectedRowIds);
        this.trigger({
            headerChecked: this.headerChecked,
            checkedMap: this.checkedMap,
            selectedRowIds:selectedRowIds,
            myTableData: this.myTableDataString
        });
    },

    getInitialState: function () {

        return {
            headerChecked: this.headerChecked,
            checkedMap: this.checkedMap
        }

    },

    onCleanCheckArray: function () {
        this.headerChecked = false;
        this.checkedMap = {};
        this._trigger();
    },

    onRowCheckboxClick: function (checked, rowId) {
        this.checkedMap[rowId] = checked;
        // console.log("onRowCheckboxClick-> "+rowId);
        this._trigger();
    },

    onHeaderCheckboxClick: function (checked, rowIds) {
        for (var i = 0; i < rowIds.length; i++) {
            this.checkedMap[rowIds[i]] = checked;
        }
        this.headerChecked = checked;
        this._trigger();
    },

    onInit: function (tableKey,navigationInfo) {
        this.navigationInfo = navigationInfo;
        this.tableKey = tableKey;
    },
    onInitMyTableData(e){
        // this.myTableData = e;
        global.golMyTableDate = e; 
        // console.log("onInitMyTableData myTableData===>"+global.golMyTableDate);
        // this._trigger();
    },
    onUpdMyTableData: function(rowId,key,data){ //rowcell的onChange事件更新TableData
        // console.log("onUpdRowData--->"+rowId+"--"+key+"---"+data);
        // console.log("onUpdMyTableData myTableData===>"+global.golMyTableDate);
        // this.myTableData[rowId][key] = data;//更新数据
        if(global.golMyTableDate){
            global.golMyTableDate[rowId][key] = data;
        }
        
        // this._trigger();
    }
});

module.exports = store;