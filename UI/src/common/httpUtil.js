/**
 * httpUtil.js
 *
 * http工具类
 */

var http = require('http');
var url = require('url');
var testData = require('./testData');  
var constants = require('./constants.js');

var httpUtil = {
    //test运行模式:
    //0 正常 1 使用测试数据 2 利用测试数据验证webService
    testMode : 0, 
    /**
     * http.get操作 
     * 
     * url 地址
     * callback(成功标志，返回内容)
     */
    doGet : function(params,callback){
          var path = params.path;
          console.log("httpUtil.doGet:"+path);
          var urlStr = "http://"+constants.SERVICE_HOST+":"+constants.SERVICE_PORT+path;
          if(this.testMode === 0){
              http.get(urlStr, function (res) {
              var resultStr = "";
              var successFlg = true;
              var statusCode = res.statusCode;
              if(statusCode != "200"){
                successFlg = false;
                callback({
                  path:path,
                  success:false,
                  resultStr:path,
                  message:"Error!statusCode is "+statusCode
                }); 
              }
              res.on('data', function (d) {
                if(d){resultStr += d;}
              });
              res.on('end',function(){
                if(successFlg){
                  callback({
                    path:path,
                    success:true,
                    resultStr:resultStr,
                    message:""
                  }); 
                }

              });
            }).on('error', function (e) {
              callback({
                path:path,
                success:false,
                resultStr:path+"--->"+e.toString,
                message:e.toString
              }); 

          });
        }else{
          callback(this.getTestData({path:path}));
        }
          
    },
    /**
     * http.post操作 
     */
    doPost : function(params,callback){
        var path = params.path;
        console.log("httpUtil.doPost:"+path);
        var postStr = params.postStr;

        if(this.testMode === 0){
            var options = {
              host: constants.SERVICE_HOST, 
              port: constants.SERVICE_PORT,
              path: path,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': postStr.length
              }
            };

            var req=http.request(options,function(res){
                res.setEncoding('utf-8');
                var resultStr = "";
                var successFlg = true;
                var statusCode = res.statusCode;
                if(statusCode != "200"){
                  successFlg = false;
                  callback({
                    path:path,
                    success:false,
                    resultStr:path,
                    message:"Error!statusCode is "+statusCode
                  }); 
                }

                res.on('data', function(d) {
                    if(d){resultStr += d;}
               });

                res.on('end', function() {
                    //这里接收的参数是字符串形式,需要格式化成json格式使用
                    // console.log('-----resBody-----'+resultStr);
                    if(successFlg){
                      callback({
                        path:path,
                        success:true,
                        resultStr:resultStr,
                        message:""
                      }); 
                    }
                })
            }).on('error', function(e) {
                console.log('-----error-------'+e.toString());
                callback({
                    path:path,
                    success:false,
                    resultStr:e.toString(),
                    message:path+"--->"+e.toString()
                  }); 
            });
            req.write(postStr);
            console.log('-----bodyString-------'+req);
            req.end();
        }else{
          callback(this.getTestData({path:path,postStr:postStr}));
        }
        
    },
    /**
     * 获取本地测试数据
     */
    getTestData : function(params){
      var path = params.path;
      var postStr = params.postStr;
      var result;
      var findFlg = false;
      for(var p in testData.defVal){//遍历测试数据
        if(path === testData.defVal[p].path){//比较path
          if(testData.defVal[p].postStr){//如果post不为空，比较postStr
            if(postStr === testData.defVal[p].postStr){
              findFlg = true;
              return {
                path:path,
                success:testData.defVal[p].success,
                resultStr:testData.defVal[p].resultStr,
                message:testData.defVal[p].message
              }
            }

          }else{
            findFlg = true;
            return {
              path:path,
              success:testData.defVal[p].success,
              resultStr:testData.defVal[p].resultStr,
              message:testData.defVal[p].message
            }

          }

        }
      }

      if(!findFlg){//如果没有测试数据
        console.log("----------------------------- no test data -------------------------------");
        return {
            path:path,
            success:false,
            resultStr:"noTestData",
            message:"noTestData"
          }
      }
      

    }
};

module.exports = httpUtil;