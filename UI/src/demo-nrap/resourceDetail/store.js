/**
 * resourceDetail.store.js
 * 
 * 资源管理Detail画面
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
    onInit: function (resourceId) {
        httpUtil.doGet({path:"/resource?ResourceId="+resourceId},
            function(result){
                store.trigger({
                    obj: JSON.parse(result.resultStr)
                }); 
            });    
    },
    /**
     * 新增
     */
    onAdd: function (obj) {
        var bodyString = JSON.stringify(obj);
        httpUtil.doPost({
                path: '/newResource',
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
                path: '/saveResource',
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
     * 测试连接
     */
    onConnect: function (obj) {
        var bodyString = JSON.stringify(obj);
        httpUtil.doPost({
                path: '/testConnect',
                postStr:bodyString
            },
            function(result){
                if(result.success){
                    store.trigger({
                        message: "连接成功！"    
                    });
                }else{
                    store.trigger({
                        message: "连接失败！"+result.message
                    });
                }
        });
    },
    /**
     * 批量生成TableMapping和ColumnMapping数据
     */
    onNewTableMapping: function(resourceId,withColumn){
        httpUtil.doGet({path:"/autoGenTableMapping?ResourceId="+resourceId+"&WithColumn="+withColumn},
            function(result){
                if(result.success){
                    store.trigger({
                        message: "生成数据成功！"    
                    });
                }else{
                    store.trigger({
                        message: "生成数据失败！"+result.message
                    });
                } 
            });    
    }
});

module.exports = store;