/**
 * resourceList.store.js
 * 
 * 资源管理List画面
 * 
 * @author zhoujiang
 */
var Reflux = require('reflux');
var Actions = require('./actions');
var httpUtil = require('../../common/httpUtil'); 
var navigationUtil = require('../../common/navigationUtil'); 
var url = require('url');
var constants = require('../../common/constants.js');

'use strict';


var store = Reflux.createStore({
    listenables: [Actions],
    _cache: [], //数据缓存
    searchParams : { //默认查询条件
        currentPage: 0,
        querystring: "",
        refresh: true, //是否后台刷新数据
        columns: ["resourceName", "dbLink", "dbUser"],
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
        httpUtil.doGet({path:"/resourceList?WithNoValid=0&ResourceFlg=1"},
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
        var idList = [];
        var idSplit = ids.split(',');
        for(var p in idSplit){ 
             idList[p] = idSplit[p];  
        } 

        httpUtil.doPost({
                path: '/deleteResource',
                postStr:"["+ids+"]"
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

        store.doConnectTest(filterData);
    },
    /**
     * 测试资源连接
     */
    doConnectTest: function(params){
        for(var p in params.rows){
            httpUtil.doGet({path:"/testConnectById?ResourceId="+params.rows[p].resourceId},
                function(result){
                    if(result.success){
                        var query = url.parse(result.path,true).query;//参数true是将query返回成对象
                        // console.log("doConnectTest-->"+result.path+" query:"+query+" result:"+result.resultStr);
                        for(var i in params.rows){
                            if(query.ResourceId == params.rows[i].resourceId){
                                params.rows[i].connectStatus = result.resultStr;
                                
                                store.trigger({
                                    rows: params.rows,
                                    rowsTotoal: params.rowsTotoal,
                                    currentPage: params.currentPage
                                });
                            }
                        }
                    }
                }
            );
        }

    }
});

module.exports = store;