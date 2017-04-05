/**
 * actionJobHisList.store.js
 * 
 * actionJob履历管理List画面
 * 
 * @author zhoujiang
 */
var Reflux = require('reflux');
var Actions = require('./actions');
var httpUtil = require('../../common/httpUtil'); 
var navigationUtil = require('../../common/navigationUtil'); 
var http = require('http');
var constants = require('../../common/constants.js');

'use strict';


var store = Reflux.createStore({
    listenables: [Actions],
    _cache: [], //数据缓存
    searchParams : { //默认查询条件
        currentPage: 0,
        querystring: "",
        refresh: true, //是否后台刷新数据
        columns: ["actionJobHistoryId", "actionJobId", "startTime","startError","endTime","updateCnt","errorCnt"],
        pageSize: constants.PAGE_SIZE
    },
    /**
     * 查询资源列表数据
     * 
     * @param currentPage 当前页数 
     * @param querystring  查询条件
     * @param refresh 是否后台更新数据
     */
    onSearch: function(params) {
        this.searchParams.currentPage = params.currentPage;
        this.searchParams.querystring = params.querystring;

        if(this.searchParams.refresh){//从后台刷新数据
        httpUtil.doGet({path:"/actionJobHistory?ActionJobId="+params.actionJobId},
            function(result){
                var json = JSON.parse(result.resultStr);
                store._cache = json;
                store.doRefreshTable(store.searchParams);
                
            });

        }else{//不刷新数据，仅用当前数据过滤
            // console.log("---------------do not refresh-----------------");
            store.doRefreshTable(store.searchParams);
        }
    },
    /*-------------------------------------非action事件-------------------------------------*/
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
    }
});

module.exports = store;