var Reflux = require('reflux');
var Actions = require('./actions');
var tools = require('../../common/tools');
var httpUtil = require('../../common/httpUtil'); 
var constants = require('../../common/constants.js');
var http = require('http');

'use strict';

var pageSize = 20;//TODO 暂时还不能修改
var _cache = [];
var message = "";

var store = Reflux.createStore({
    listenables: [Actions],
    searchParams: {
        rows: null,
        rowsTotoal: 0,
        currentPage: 0,
        deleteOk: false,
        querystring: null
    },
    onSearchResource: function() {
        http.get("http://192.168.120.156:8081/resourceList?WithNoValid=0&ResourceFlg=1", function (res) {
            var json = "";
            res.on('data', function (d) {
                json += d;
            });
            res.on('end',function(){
                json = JSON.parse(json);
                console.log("do triggrt-----------"+json);
                    store.trigger({
                        resourceList:json
                    });

                });
            }).on('error', function (e) {
                console.error(e.toString());
                //message = e.toString();
            });


    },
    onSearch: function(param) {
        if(param.refresh){//从后台刷新数据
            console.log("---------------refresh-----------------");
            var getResult = function(callback){
                //TODO 拼接分页条件
                http.get("http://192.168.120.156:8081/tableMappingList?WithNoValid=0", function (res) {
                var json = "";
                res.on('data', function (d) {
                    json += d;
                });
                res.on('end',function(){
                    json = JSON.parse(json);
                    callback(json);//返回结果 
                    });
                }).on('error', function (e) {
                    console.error(e.toString());
                    //message = e.toString();
                });
        };
        //查询结束回调函数
        getResult(function(resourceJson){
                // console.log("getResult--->"+resourceJson); 

                
                // TODO for localtest 
                // _cache = [{"resourceId":4,"resourceName":"测试DB20170324","resourceType":"01","dbLink":"jdbc:mysql://192.168.120.156:3306/test","dbUser":"huhu","dbPasswd":"test","deleteFlg":"0","hasChild":true},{"resourceId":5,"resourceName":"测试DB111","resourceType":"01","dbLink":"jdbc:mysql://xxx.xxx.xxx.xxx:3306/test","dbUser":"test","dbPasswd":"xxxxxxxx","deleteFlg":"0","hasChild":false},{"resourceId":8,"resourceName":"测试DB","resourceType":"01","dbLink":"jdbc:mysql://xxx.xxx.xxx.xxx:3306/test","dbUser":"test","dbPasswd":"xxxxxxxx","deleteFlg":"0","hasChild":false},{"resourceId":9,"resourceName":"测试DB","resourceType":"01","dbLink":"jdbc:mysql://xxx.xxx.xxx.xxx:3306/test","dbUser":"test","dbPasswd":"xxxxxxxx","deleteFlg":"0","hasChild":false},{"resourceId":10,"resourceName":"测试DB","resourceType":"01","dbLink":"jdbc:mysql://xxx.xxx.xxx.xxx:3306/test","dbUser":"test","dbPasswd":"xxxxxxxx","deleteFlg":"0","hasChild":false},{"resourceId":11,"resourceName":"test","resourceType":"01","dbLink":"jdbc:mysql://192.168.120.156:3306/test","dbUser":"huhu","dbPasswd":"test","deleteFlg":"0","hasChild":false},{"resourceId":12,"resourceName":"测试DB111","resourceType":"01","dbLink":"jdbc:mysql://xxx.xxx.xxx.xxx:3306/test","dbUser":"test","dbPasswd":"xxxxxxxx","deleteFlg":"0","hasChild":false},{"resourceId":13,"resourceName":"901","resourceType":"01","dbLink":"1111","dbUser":"1111","dbPasswd":"1111","deleteFlg":"0","hasChild":false},{"resourceId":14,"resourceName":"902","resourceType":"01","dbLink":"111111","dbUser":"11111","dbPasswd":"111111","deleteFlg":"0","hasChild":false},{"resourceId":15,"resourceName":"903","resourceType":"01","dbLink":"111111","dbUser":"11111","dbPasswd":"111111","deleteFlg":"0","hasChild":false},{"resourceId":16,"resourceName":"904","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":17,"resourceName":"905","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":18,"resourceName":"906","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":19,"resourceName":"907","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":20,"resourceName":"908","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":21,"resourceName":"909","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":22,"resourceName":"910","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":23,"resourceName":"911","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":24,"resourceName":"912","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":25,"resourceName":"913","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":26,"resourceName":"914","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false},{"resourceId":27,"resourceName":"915","resourceType":"01","dbLink":"22222","dbUser":"22222","dbPasswd":"222222","deleteFlg":"0","hasChild":false}];
                _cache = resourceJson;
                param.data = _cache;
                store.filterData(param);
            });
        }else{//不刷新数据，仅用当前数据过滤
            console.log("---------------do not refresh-----------------");
            param.data = _cache;
            store.filterData(param);
        }
            
             
    },
    onDelete: function (ids) {
        // console.log("delete Obj",ids);

        var idList = [];
        var idSplit = ids.split(',');
        for(var p in idSplit){ 
             idList[p] = idSplit[p];  
        } 
        
        var bodyString = JSON.stringify(idSplit);
        console.log("onDelete body" + bodyString);

        var options = {
          host: '192.168.120.156',
          port: 8081,
          path: '/deleteTableMapping',
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
                this.deleteOk = true;
                store.onSearch({ 
                    page: 0,
                    querystring: "",
                    refresh: true //是否后台刷新数据
                });
            })
        }).on('error', function(e) {
            console.log('-----error-------'+e.toString());
            message = e.toString();
            this.deleteOk = false;
            //TODO 刷新数据 ?
            console.log("-------onDelete----------this.currentPage--------"+this.currentPage);
            console.log("-------onDelete----------this.deleteOk-------"+this.deleteOk);
        });
        req.write(bodyString);
        console.log('-----bodyString-------'+req);
        req.end();
        
        // this.deleteOk = true;
        // store.onSearch({//todo for localtdev
        //     page: 0,//TODO
        //     querystring: "",//TODO 
        //     refresh: false //是否后台刷新数据
        // }); 


        
    },
    filterData: function(params){//TODO 抽取为共通
        console.log("------resourceSearch-------");
        this.searchParams.querystring = params.querystring || "";
        this.searchParams.currentPage = params.page || 0;
        var filterRows = tools.filterRowsByColumns({
            rows: params.data,
            querystring: this.searchParams.querystring,
            columns: ["tableName", "tableNameView"]
        });
        //console.log(filterRows.length);
        var newRows = tools.getNextPageRows(
            filterRows,
            this.searchParams.currentPage,
            pageSize);
        //console.log(newRows.length,filterRows.length);
        console.log("---------trigger-----------rowsTotoal:"+filterRows.length);
        console.log("---------trigger-----------deleteOk:"+this.deleteOk);
        console.log("---------trigger-----------currentPage:"+this.searchParams.currentPage);
        console.log("---------trigger-----------msg:"+message);
        //
        this.trigger({
            rows: newRows,
            rowsTotoal: filterRows.length,
            deleteOk: this.deleteOk,
            currentPage: this.searchParams.currentPage,    
            msg: message
        });
        // this.deleteOk = false;
        message = null;

    }
});

module.exports = store;