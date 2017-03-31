var Reflux = require('reflux');
var Actions = require('./actions');
var ListStore = require("../resourceList/store");
var httpUtil = require('../../common/httpUtil'); 
var http = require('http');

'use strict';

var store = Reflux.createStore({
    listenables: [Actions],


    // getInitialState: function () {
    //     return {};
    // },
    onInit: function (tableMappingId) {     
        console.log("onInit---->"+resourceId);
                http.get("http://192.168.120.156:8081/tableMapping?TableMappingId="+tableMappingId, function (res) {
                var json;
                res.on('data', function (d) {
                    json = JSON.parse(d);
                });
                res.on('end',function(){
                    store.trigger({
                        obj: json
                        });
                    });
                }).on('error', function (e) {
                    console.error(e);
                    // store.trigger({
                    // obj: {"resourceId":4,"resourceName":"测试DB20170324","resourceType":"01","dbLink":"jdbc:mysql://192.168.120.156:3306/test","dbUser":"huhu","dbPasswd":"test","deleteFlg":"0","hasChild":true}
                    // });
                });

                // store.trigger({
                // obj: {"resourceId":4,"resourceName":"测试DB20170324","resourceType":"01","dbLink":"jdbc:mysql://192.168.120.156:3306/test","dbUser":"huhu","dbPasswd":"test","deleteFlg":"0","hasChild":true}
                // });

    },
    onSearchResource: function() {
        http.get("http://192.168.120.156:8081/resourceList?WithNoValid=0&ResourceFlg=1", function (res) {
            var json = "";
            res.on('data', function (d) {
                json += d;
            });
            res.on('end',function(){
                json = JSON.parse(json);
                console.log("do onSearchResource-----------"+json);
                    store.trigger({
                        resourceList:json
                    });

                });
            }).on('error', function (e) {
                console.error(e.toString());
                //message = e.toString();
            });

            // store.trigger({
            //             resourceList:[{"resourceId":1,"resourceName":"resource01"},{"resourceId":2,"resourceName":"resource02"},{"resourceId":3,"resourceName":"resource03"},{"resourceId":4,"resourceName":"resource04"}]
            // });
    },
    onSearchTable: function(resourceId) {
        http.get("http://192.168.120.156:8081/tableList?ResourceId="+resourceId, function (res) {
            var json = "";
            res.on('data', function (d) {
                json += d;
            });
            res.on('end',function(){
                json = JSON.parse(json);
                console.log("do onSearchTable-----------"+json);
                    store.trigger({
                        tableList:json
                    });

                });
            }).on('error', function (e) {
                console.error(e.toString());
                //message = e.toString();
            });
            // store.trigger({
            //             tableList:["table01","table02","table03","table04"]
            //         });



    },
    onSearchColumn: function(tableMappingId) {
        http.get("http://192.168.120.156:8081/columnList?TableMappingId="+tableMappingId, function (res) {
            var json = "";
            res.on('data', function (d) {
                json += d;
            });
            res.on('end',function(){
                json = JSON.parse(json);
                console.log("do onSearchColumn-----------"+json);
                    store.trigger({
                        columnList:json
                    });

                });
            }).on('error', function (e) {
                console.error(e.toString());
                //message = e.toString();
            });
            // store.trigger({
            //             columnList:["column01","column02","column03","column04"]
            //             // {"columnName":"column01"},
            //             // {"columnName":"column02"},
            //             // {"columnName":"column03"},
            //             // {"columnName":"column04"}]
            //         });


    },
    onSearchColumnMapping: function(tableMappingId) {
        http.get("http://192.168.120.156:8081/columnMappingList?TableMappingId="+tableMappingId, function (res) {
            var json = "";
            res.on('data', function (d) {
                json += d;
            });
            res.on('end',function(){
                json = JSON.parse(json);
                console.log("do onSearchColumnMapping-----------"+json);
                store.trigger({
                    columnMappingList:json
                });

                });
            }).on('error', function (e) {
                console.error(e.toString()); 
                //message = e.toString();
            });
            // store.trigger({
            //         columnMappingList:[
            //         {"xh":0,"columnMappingId":1,"tableMappingId":1,"columnName":"columnName1","columnNameView":"columnNameView11","columnType":"columnType11","jasonName":"jasonName1","seqName":"seqName1","txtValue":"txtValue1","dateFormat":"dateFormat11"},
            //         {"xh":1,"columnMappingId":3,"tableMappingId":1,"columnName":"columnName2","columnNameView":"columnNameView2222","columnType":"columnType22","jasonName":"jasonName2","seqName":"seqName2","txtValue":"txtValue2","dateFormat":"dateFormat22"},
            //         {"xh":2,"columnMappingId":4,"tableMappingId":1,"columnName":"columnName3","columnNameView":"columnNameView3333","columnType":"columnType33","jasonName":"jasonName3","seqName":"seqName3","txtValue":"txtValue3","dateFormat":"dateFormat33"}]
            // });

    },
    onAddRow: function(columnMappingList){
        var newList = columnMappingList || [];
        newList.push({"xh":columnMappingList.length,"columnMappingId":0,"tableMappingId":1,"columnName":"","columnNameView":"","columnType":"","jasonName":"","seqName":"","txtValue":"","dateFormat":""});
        store.trigger({
            columnMappingList:newList
        });

    },
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
        //   store.trigger({
        //     columnMappingList:newList
        // });
            store.trigger({ //TODO 其挂了
                    columnMappingList:[
                    {"xh":1,"columnMappingId":3,"tableMappingId":1,"columnName":"columnName2","columnNameView":"columnNameView2222","columnType":"columnType22","jasonName":"jasonName2","seqName":"seqName2","txtValue":"txtValue2","dateFormat":"dateFormat22"},
                    {"xh":2,"columnMappingId":4,"tableMappingId":1,"columnName":"columnName3","columnNameView":"columnNameView3333","columnType":"columnType33","jasonName":"jasonName3","seqName":"seqName3","txtValue":"txtValue3","dateFormat":"dateFormat33"}]
            });

    },
    onAdd: function (tableObj,addColumns) {
        // console.log("Add tableObj", tableObj);
        var bodyString = JSON.stringify(tableObj);
        // console.log("start body" + bodyString);

        var options = {
          host: '192.168.120.156',port: 8081,path: '/newTableMapping',method: 'POST',
         headers: {'Content-Type': 'application/json','Content-Length': bodyString.length}
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var result = '';
            res.on('data', function(data) {
                result = data;
           });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                var resultObject = JSON.parse(result);
                console.log('-----resBody-----',result);
                store.trigger({
                    tableObj: tableObj,
                    saveOk: true
                });
                //新增成功，开始新增columnMapping
                for(var p in addColumns){
                    addColumns[p].tableMappingId = result;
                    doAddColumn(addColumns[p]);
                }
                
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    tableObj: e.toString(),
                    saveOk: false
                });
            });
        });
        req.write(bodyString);
        console.log('-----bodyString-------',req);
        req.end();

        // store.trigger({
        //     obj: "",
        //     saveOk: true
        // });
    },
    onUpd: function (tableObj,addColumns,updColumns,delColumns) {
        // console.log("Edit tableObj", tableObj);
        var bodyString = JSON.stringify(tableObj);
        // console.log("start body" + bodyString);

        var options = {
          host: '192.168.120.156',
          port: 8081,
          path: '/saveTableMapping',
          method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        }
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var result = '';
            res.on('data', function(data) {
                result = data;
           });
            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                var resultObject = JSON.parse(result);
                console.log('-----resBody-----',result);
                store.trigger({
                    tableObj: tableObj,
                    saveOk: true
                });
                //保存成功，开始新增columnMapping
                for(var p in addColumns){
                    doAddColumn(addColumns[p]);
                }
                //保存成功，开始新增columnMapping
                for(var p in addColumns){
                    addColumns[p].tableMappingId = result;
                    doUpdColumn(addColumns[p]);
                }
                //保存成功，开始更新columnMapping
                for(var p in updColumns){
                    doAddColumn(updColumns[p]);
                }
                //保存成功，开始删除columnMapping
                doDelColumn(delColumns);
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    tableObj: e.toString(),
                    saveOk: false
                });
            });
        });
        req.write(bodyString);
        console.log('-----bodyString-------',req);
        req.end();
        // store.trigger({
        //     obj: "",
        //     saveOk: true
        // });
    },
    doAddColumn: function (columnObj){
        // console.log("Add doAddColumn", columnObj);
        var bodyString = JSON.stringify(columnObj);
        console.log("start doAddColumn" + bodyString);

        var options = {
          host: '192.168.120.156',port: 8081,path: '/newColumnMapping',method: 'POST',
         headers: {'Content-Type': 'application/json','Content-Length': bodyString.length}
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var result = '';
            res.on('data', function(data) {
                result = data;
           });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                var resultObject = JSON.parse(result);
                console.log('-----resBody-----',result);
                // store.trigger({
                //     tableObj: columnObj, //子数据更新成功不需要报消息
                //     saveOk: true
                // });
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    tableObj: e.toString(),
                    saveOk: false
                });
            });
        });
        req.write(bodyString);
        console.log('-----bodyString-------',req);
        req.end();

        // store.trigger({
        //     tableObj: "",
        //     saveOk: true
        // });
        

    },
    doUpdColumn: function (columnObj){
        // console.log("Add doAddColumn", columnObj);
        var bodyString = JSON.stringify(columnObj);
        console.log("start doUpdColumn" + bodyString);

        var options = {
          host: '192.168.120.156',port: 8081,path: '/saveColumnMapping',method: 'POST',
         headers: {'Content-Type': 'application/json','Content-Length': bodyString.length}
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var result = '';
            res.on('data', function(data) {
                result = data;
           });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                var resultObject = JSON.parse(result);
                console.log('-----resBody-----',result);
                // store.trigger({
                //     tableObj: columnObj, //子数据更新成功不需要报消息
                //     saveOk: true
                // });
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    tableObj: e.toString(),
                    saveOk: false
                }); 
            });
        });
        req.write(bodyString);
        console.log('-----bodyString-------',req);
        req.end();

        // store.trigger({
        //     tableObj: "",
        //     saveOk: true
        // });

    },
    doDelColumn: function (ids){
        var idList = [];
        var idSplit = ids.split(',');
        for(var p in idSplit){ 
             idList[p] = idSplit[p];  
        } 
        
        var bodyString = JSON.stringify(idSplit);
        console.log("doDelColumn body" + bodyString);

        var options = {
          host: '192.168.120.156',
          port: 8081,
          path: '/deleteColumnMapping',
          method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        }
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var result;
            res.on('data', function(data) {
                result = data;
           });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                var resultObject = JSON.parse(result);
                console.log('-----resBody-----'+result);
                // this.deleteOk = true; //成功不报消息
                // store.onSearch({ 
                //     page: 0,
                //     querystring: "",
                //     refresh: true //是否后台刷新数据
                // });
            })
        }).on('error', function(e) {
            console.log('-----error-------'+e.toString());
            store.trigger({
                tableObj: e.toString(),
                saveOk: false
            }); 
        });
        req.write(bodyString);
        console.log('-----bodyString-------'+req);
        req.end();
        
    }

});

module.exports = store;