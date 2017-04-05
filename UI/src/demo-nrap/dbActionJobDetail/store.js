/**
 * actionJobDetail.store.js
 * 
 * actionJob管理Detail画面
 * 
 * @author zhoujiang
 */
var Reflux = require('reflux');
var Actions = require('./actions');
var ListStore = require("../resourceList/store");
var httpUtil = require('../../common/httpUtil'); 
var http = require('http');
var constants = require('../../common/constants.js');
var navigationUtil = require('../../common/navigationUtil'); 

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
     * 初始化 查询数据
     */
    onInit: function (actionJobId) {
        httpUtil.doGet({path:"/actionJob?ActionJobId="+actionJobId},
            function(result){

                var json = JSON.parse(result.resultStr);
                store.trigger({
                    obj: json
                }); 
                var tableMappingId = json.tableMappingId;
                store.onSearchTableMapping(tableMappingId);
            });    
    },
    /**
     * 新增
     */
    onAdd: function (obj) {
        var bodyString = JSON.stringify(obj);
        httpUtil.doPost({
                path: '/newActionJob',
                postStr:bodyString
            },
            function(result){
                if(result.success){
                    store.trigger({
                        message: "保存成功！"
                    });
                }else{
                    store.trigger({
                        message: "保存失败！"+result.message
                    });
                }
        });
    },
    /**
     * 编辑
     */
    onEdit: function (obj) {
        var bodyString = JSON.stringify(obj);
        httpUtil.doPost({
                path: '/saveActionJob',
                postStr:bodyString
            },
            function(result){
                if(result.success){
                    store.trigger({
                        message: "保存成功！"    
                    });
                }else{
                    store.trigger({
                        message: "保存失败！"+result.message
                    });
                }
        });
    },
    /**
     * 启动
     */
    onStart: function (actionJobId) {
        httpUtil.doGet({path:"/DBJobStart?ActionJobId="+actionJobId},
            function(result){
                if(result.success){
                    store.trigger({
                        message: "启动成功！"    
                    }); 

                }else{
                    store.trigger({
                        message: "启动失败！"    
                    }); 
                }
                
        });    
    },
    /**
     * 停止
     */
    onEnd: function (actionJobId) {
        httpUtil.doGet({path:"/DBJobEnd?ActionJobId="+actionJobId},
            function(result){
                if(result.success){
                    store.trigger({
                        message: "停止成功！"    
                    }); 

                }else{
                    store.trigger({
                        message: "停止失败！"    
                    }); 
                }
        });    
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
        /**
     * 获取TableMappingList
     */
    onSearchTableMapping: function(tableMappingId){
        httpUtil.doGet({path:"/tableMappingList?WithNoValid=0"},
            function(result){

                var resultData = JSON.parse(result.resultStr);
                var tableMappingList = []; 
                for(var p in resultData){
                    if(tableMappingId){
                        if(tableMappingId == resultData[p].tableMappingId){
                            tableMappingList.push(resultData[p]);
                        }
                    }else{
                        tableMappingList.push(resultData[p]);
                    }
                }
                // store.trigger({
                //     tableMappingList: tableMappingList
                // }); 
                 store.trigger({
                    // message: "获取table！" + tableMappingList,
                    tableMappingList: tableMappingList
                });
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
    /*-------------------------------------非action事件-------------------------------------*/
});

module.exports = store;