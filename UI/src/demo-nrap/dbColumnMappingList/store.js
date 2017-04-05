/**
 * columnMappingList.store
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
     * 查询资源列表
     */
    onSearchResource: function() {
        httpUtil.doGet({path:"/resourceList?WithNoValid=0&ResourceFlg=1"},function(result){
            store.trigger({
                resourceList: JSON.parse(result.resultStr)
            }); 
        });     
    },
    /**
     * 查询数据库物理表
     */
    onSearchTable: function(resourceId) {

        httpUtil.doGet({path:"/tableList?ResourceId="+resourceId},function(result){
            store.trigger({
                tableList: JSON.parse(result.resultStr)
            }); 
        });       

    },
    /**
     * 查询数据库物理列
     */
    onSearchColumn: function(resourceId,tableName) {

        httpUtil.doGet({path:"/columnListByName?ResourceId="+resourceId+"&TableName="+tableName},function(result){
            store.trigger({
                columnList: JSON.parse(result.resultStr)
            }); 
        });       
    },
    /**
     * 查询数据逻辑列
     */
    onSearchColumnMapping: function(tableMappingId) {
        httpUtil.doGet({path:"/columnMappingList?TableMappingId="+tableMappingId},function(result){
            store.trigger({
                columnMappingList: JSON.parse(result.resultStr)
            }); 
        });  

    },
    /**
     * 插入一行空数据
     */
    onAddRow: function(columnMappingList){
        var newList = columnMappingList || [];
        newList.push({"xh":columnMappingList.length,"columnMappingId":0,"tableMappingId":1,"columnName":"","columnNameView":"","columnType":"","jasonName":"","seqName":"","txtValue":"","dateFormat":""});
        store.trigger({
            columnMappingList:newList
        });

    },
    /**
     * 删除表格的一行
     */
    onDelRow: function(columnMappingList,deleteRows){
            

            var newList = [];
            newList = columnMappingList;
            var i = 0;
            for(var p in deleteRows){
                var delno = deleteRows[p]-i;
                // console.log("-------------delno--------------"+delno+"----"+columnMappingList[delno].columnMappingId);
                columnMappingList.splice(0,1);
                i++;
            }
            // store.trigger({ //TODO 其挂了
            //         columnMappingList:[
            //         {"xh":1,"columnMappingId":3,"tableMappingId":1,"columnName":"columnName2","columnNameView":"columnNameView2222","columnType":"columnType22","jasonName":"jasonName2","seqName":"seqName2","txtValue":"txtValue2","dateFormat":"dateFormat22"},
            //         {"xh":2,"columnMappingId":4,"tableMappingId":1,"columnName":"columnName3","columnNameView":"columnNameView3333","columnType":"columnType33","jasonName":"jasonName3","seqName":"seqName3","txtValue":"txtValue3","dateFormat":"dateFormat33"}]
            // });

    },
    /**
     * 新增保存
     */
    onAdd: function (tableObj,addColumns) {
        httpUtil.doPost({
                path: '/newTableMapping',
                postStr:JSON.stringify(tableObj)
            },
            function(result){
                if(result.success){
                    store.trigger({
                        message: "新增Table成功！"
                    });
                    //新增成功，开始新增columnMapping
                    for(var p in addColumns){
                        addColumns[p].tableMappingId = result.resultStr;
                        store.doAddColumn(addColumns[p]);
                    }
                }else{
                    store.trigger({
                        message: "新增Table失败！"+result.message
                    });
                }
        });
    },
    /**
     * 更新保存
     */
    onUpd: function (tableObj,addColumns,updColumns,delColumns) {

        httpUtil.doPost({
                path: '/saveTableMapping',
                postStr:JSON.stringify(tableObj)
            },
            function(result){
                if(result.success){
                    store.trigger({
                        message: "更新Table成功！"
                    });
                    //保存成功，开始新增columnMapping
                    for(var p in addColumns){
                        // addColumns[p].tableMappingId = result.resultStr;
                        store.doAddColumn(addColumns[p]);
                    }
                    //保存成功，开始更新columnMapping
                    for(var p in updColumns){
                        store.doUpdColumn(updColumns[p]);
                    }
                    //保存成功，开始删除columnMapping
                    // doDelColumn(delColumns);
                }else{
                    store.trigger({
                        message: "更新Table失败！"+result.message
                    });
                }
        });
    },
    /**
     * 保存 新增逻辑列
     */
    doAddColumn: function (columnObj){

        var addColumnObj = {
            // columnMappingId: columnObj.columnMappingId,
            tableMappingId:columnObj.tableMappingId,
            columnNameView:columnObj.columnNameView,
            columnName:columnObj.columnName.columnName || columnObj.columnListOptions,
            columnType:columnObj.columnType,
            jasonName:columnObj.jasonName,
            seqName:columnObj.seqName,
            txtValue:columnObj.txtValue,
            dateFormat:columnObj.dateFormat,
            deleteFlg:"0"

        };

        httpUtil.doPost({
            path: '/newColumnMapping',
            postStr:JSON.stringify(addColumnObj)
        },
        function(result){
            if(result.success){
                store.trigger({
                    message: "新增Column成功！"
                });
            }else{
                store.trigger({
                    message: "新增Column失败！"+result.message
                });
            }
        });
    },
    /**
     * 保存 更新逻辑列
     */
    doUpdColumn: function (columnObj){

        var addColumnObj = {
            columnMappingId: columnObj.columnMappingId,
            tableMappingId:columnObj.tableMappingId,
            columnNameView:columnObj.columnNameView,
            columnName:columnObj.columnName.columnName,
            columnType:columnObj.columnType,
            jasonName:columnObj.jasonName,
            seqName:columnObj.seqName,
            txtValue:columnObj.txtValue,
            dateFormat:columnObj.dateFormat,
            deleteFlg:"0"

        };


        httpUtil.doPost({
            path: '/saveColumnMapping',
            postStr:JSON.stringify(columnObj)
        },
        function(result){
            if(result.success){
                store.trigger({
                    message: "更新Column成功！"
                });
            }else{
                store.trigger({
                    message: "更新Column失败！"+result.message
                });
            }
        });

    },
    /**
     * 保存 删除逻辑列
     */
    doDelColumn: function (ids){
        //TODO
        
    }

});

module.exports = store;