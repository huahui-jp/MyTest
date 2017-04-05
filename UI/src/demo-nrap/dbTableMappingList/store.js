var Reflux = require('reflux');
var Actions = require('./actions');
var tools = require('../../common/tools');
var httpUtil = require('../../common/httpUtil'); 
var constants = require('../../common/constants.js');
var navigationUtil = require('../../common/navigationUtil'); 
var http = require('http');

'use strict';

var pageSize = 20;//TODO 暂时还不能修改
var message = "";

var store = Reflux.createStore({
    listenables: [Actions],
    searchParams : { //默认查询条件
        currentPage: 0,
        querystring: "",
        refresh: true, //是否后台刷新数据
        columns: ["resourceName", "tableNameView", "tableName"],
        pageSize: constants.PAGE_SIZE
    },
    _cache: [], //数据缓存
    onSearchResource: function() {
        httpUtil.doGet({path:"/resourceList?WithNoValid=0&ResourceFlg=1"},function(result){
            store.trigger({
                resourceList: JSON.parse(result.resultStr)
            }); 
        });    
    },
    onSearch: function(params) {
        this.searchParams.currentPage = params.currentPage;
        this.searchParams.querystring = params.querystring;

        if(this.searchParams.refresh){//从后台刷新数据
        httpUtil.doGet({path:"/tableMappingList?WithNoValid=0"},
            function(result){
                var json = JSON.parse(result.resultStr);
                store._cache = json;
                store.doRefreshTable(store.searchParams);
                
            });

        }else{//不刷新数据，仅用当前数据过滤
            store.doRefreshTable(store.searchParams);
        }
            
             
    },
    onDelete: function (ids) {
        // console.log("delete Obj",ids);
        // TODO 
    },
    /**
     * 刷新table数据
     */
    doRefreshTable : function(params){
        params.rows = store._cache;
        var filterData = navigationUtil.filterData(params);
        this.trigger({
            rows: filterData.rows,
            rowsTotoal: filterData.rowsTotoal,
            currentPage: filterData.currentPage
        });
    },
});

module.exports = store;