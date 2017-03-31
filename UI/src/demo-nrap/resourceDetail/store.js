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
    onInit: function (resourceId) {
        console.log("onInit---->"+resourceId);
                http.get("http://192.168.120.156:8081/resource?ResourceId="+resourceId, function (res) {
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
    onAdd: function (obj) {
        console.log("Add Obj", obj);
        var bodyString = JSON.stringify(obj);
        console.log("start body" + bodyString);

        var options = {
          host: '192.168.120.156',port: 8081,path: '/newResource',method: 'POST',
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
                    obj: obj,
                    saveOk: true
                });
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    obj: e.toString(),
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
    onEdit: function (obj) {
        console.log("Edit Obj", obj);
        var bodyString = JSON.stringify(obj);
        console.log("start body" + bodyString);

        var options = {
          host: '192.168.120.156',
          port: 8081,
          path: '/saveResource',
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
                    obj: obj,
                    saveOk: true
                });
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                store.trigger({
                    obj: e.toString(),
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
    onConnect: function (obj) {
        var bodyString = JSON.stringify(obj);
            console.log("testConnect---->" + bodyString);

            var options = {
                host: '192.168.120.156',
                port: 8081,
                path: '/testConnect',
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
                // var resultObject = JSON.parse(result);
                console.log('-----resBody-----',result);
                if(result == "Success..."){
                    store.trigger({
                        obj: "",   
                        connectOk: true});
                }else{
                    store.trigger({
                        obj: "",
                        connectOk: false});
                }
            });
            res.on('error', function(e) {
                // TODO: handle error.
                console.log('-----error-------',e.toString());
                    store.trigger({
                        obj: e.toString(),
                        connectOk: false});
            });
        });
        req.write(bodyString);
        console.log('-----bodyString-------',req);
        req.end();
    },
    onNewTableMapping: function(resourceId,withColumn){
        http.get("http://192.168.120.156:8081/autoGenTableMapping?ResourceId="+resourceId+"&WithColumn="+withColumn, function (res) {
                var json = "";
                res.on('data', function (d) {
                    json += d;
                });
                res.on('end',function(){
                    json = JSON.parse(json);
                    this.saveOk = true;
                    store.onSearch({ //todo for localtdev
                        page: 0,
                        querystring: "",
                        refresh: true //是否后台刷新数据
                    });
                    });
                }).on('error', function (e) {
                    console.error(e.toString());
                    //message = e.toString();
                });

    }
});

module.exports = store;