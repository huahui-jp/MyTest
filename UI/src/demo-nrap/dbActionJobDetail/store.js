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

'use strict';

var store = Reflux.createStore({
    listenables: [Actions],
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
    /*-------------------------------------非action事件-------------------------------------*/
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
    }
});

module.exports = store;