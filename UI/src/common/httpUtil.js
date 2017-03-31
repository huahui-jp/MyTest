/*
  http事件处理
 */
var http = require('http');
var url = require('url');
var httpUtil = {

    /*
      http.get操作 

      url 地址
      callback(成功标志，返回内容)
     */
    doGet : function(urlStr,callback){ 
                //TODO 拼接分页条件
                http.get(urlStr, function (res) {
                var resultStr = "";
                res.on('data', function (d) {
                    resultStr += d;
                });
                res.on('end',function(){
                    callback(true,resultStr); 
                    });
                }).on('error', function (e) {
                    console.error(e.toString());
                    callback(false,e.toString());  
                });
    },
    /*
      http.post操作 


     */
    doPost : function(urlStr,postStr,callback){
        var bodyString = JSON.stringify(postStr);
        var urlObj = url.parse(urlStr)



        var options = {
          host: urlObj.hostname,
          port: urlObj.port,
          path: urlObj.path,
          method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        }
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');
            var resultStr;
            res.on('data', function(data) {
                resultStr += data;
           });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                console.log('-----resBody-----'+resultStr);
                callback(true,resultStr);
            })
        }).on('error', function(e) {
            // TODO: handle error.
            console.log('-----error-------'+e.toString());
            callback(false,e.toString());
            // message = e.toString();
            // this.deleteOk = false;
        });
        req.write(bodyString);
        console.log('-----bodyString-------'+req);
        req.end();
    }
	
};

module.exports = httpUtil;