/**
 * actionJobList.store.js
 * 
 * actionJob管理List画面
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
        columns: ["actionJobId", "tableMappingId", "actionJobType","batchUpdateCnt","messageChannelName","keyColumn"],
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
        httpUtil.doGet({path:"/actionJobList?WithNoValid=0"},
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
    /**
     * 删除资源
     * 
     * @param  {[type]} ids [多个资源ID可以用,分割]
     * @return {[type]}     [description]
     */
    onDelete: function (ids) {
        httpUtil.doPost({
                path: '/deleteActionJob',
                postStr:ids
            },
            function(result){
                if(result.success){
                    store.onSearch({
                        currentPage: store.searchParams.currentPage,
                        querystring: store.searchParams.querystring
                    });
                    store.trigger({message:"删除成功！"});
                }else{
                    store.onSearch({
                        currentPage: store.searchParams.currentPage,
                        querystring: store.searchParams.querystring
                    });
                    store.trigger({message:"删除失败！"+result.message});
                }
               
        });
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