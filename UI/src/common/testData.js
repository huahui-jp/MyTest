/**
 * 根据条件返回对应的testData
 */
var url = require('url');


var testData = {
	defVal:[
        //Resource 
		{"path":"/resourceList?WithNoValid=0&ResourceFlg=1","success":true,
		"resultStr":JSON.stringify([{'resourceId':4,'resourceName':'测试DB20170324','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':true},
            {'resourceId':5,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':8,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':true},
            {'resourceId':9,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':true},
            {'resourceId':10,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':11,'resourceName':'test','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':true},
            {'resourceId':12,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':13,'resourceName':'901','resourceType':'01','dbLink':'1111','dbUser':'1111','dbPasswd':'1111','deleteFlg':'0','hasChild':false},
            {'resourceId':14,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':15,'resourceName':'test','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':false},
            {'resourceId':16,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':17,'resourceName':'901','resourceType':'01','dbLink':'1111','dbUser':'1111','dbPasswd':'1111','deleteFlg':'0','hasChild':false},
            {'resourceId':18,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':19,'resourceName':'test','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':false},
            {'resourceId':20,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':21,'resourceName':'901','resourceType':'01','dbLink':'1111','dbUser':'1111','dbPasswd':'1111','deleteFlg':'0','hasChild':false},
            {'resourceId':22,'resourceName':'test','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':false},
            {'resourceId':23,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':24,'resourceName':'901','resourceType':'01','dbLink':'1111','dbUser':'1111','dbPasswd':'1111','deleteFlg':'0','hasChild':false},
            {'resourceId':25,'resourceName':'测试DB','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':26,'resourceName':'test','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':false},
            {'resourceId':27,'resourceName':'测试DB111','resourceType':'01','dbLink':'jdbc:mysql://xxx.xxx.xxx.xxx:3306/test','dbUser':'test','dbPasswd':'xxxxxxxx','deleteFlg':'0','hasChild':false},
            {'resourceId':28,'resourceName':'901','resourceType':'01','dbLink':'1111','dbUser':'1111','dbPasswd':'1111','deleteFlg':'0','hasChild':false}
            ])},
        {"path":"/testConnectById?ResourceId=4","success":true,"resultStr":"Success..."},
        {"path":"/deleteResource","success":true,"resultStr":""},
        {"path":"/deleteResource","postStr":"[27]","success":true,"resultStr":""},
        {"path":"/deleteResource","postStr":"[10]","success":false,"resultStr":"","message":"异常信息XXXXXXXXXXXXXXX"},
        {"path":"/resource?ResourceId=4","success":true,"resultStr":JSON.stringify({'resourceId':4,'resourceName':'测试DB20170324','resourceType':'01','dbLink':'jdbc:mysql://192.168.120.156:3306/test','dbUser':'huhu','dbPasswd':'test','deleteFlg':'0','hasChild':true})},
        {"path":"/newResource","success":true,"resultStr":""},
        {"path":"/saveResource","success":true,"resultStr":""},
        {"path":"/testConnect","success":true,"resultStr":""},
        {"path":"/autoGenTableMapping?ResourceId=4&WithColumn=1","success":true,"resultStr":""},

        //tableMapping
        {"path":"/tableMappingList?WithNoValid=0","success":true,"resultStr":JSON.stringify([
            {"tableMappingId":"1","tableNameView":"DBTABLE01"},
            {"tableMappingId":"2","tableNameView":"DBTABLE02"},
            {"tableMappingId":"3","tableNameView":"DBTABLE03"}])},

        // actionType
        {"path":"/actionJobList?WithNoValid=0","success":true,"resultStr":JSON.stringify([
            {"actionJobId":1,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":2,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":3,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":4,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":5,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":6,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":7,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":8,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":9,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":11,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":12,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":13,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":14,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":15,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":16,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":17,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":18,"tableMappingId":2,"actionJobType":'02',"batchUpdateCnt":3562,"messageChannelName":'ChannelName002',"enableSaveHistory":"1","keyColumn":"cng"},
            {"actionJobId":19,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":20,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":21,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"},
            {"actionJobId":22,"tableMappingId":3,"actionJobType":'01',"batchUpdateCnt":393,"messageChannelName":'ChannelName003',"enableSaveHistory":"0","keyColumn":"id"}
            ])},
        {"path":"/actionJob?ActionJobId=1","success":true,"resultStr":JSON.stringify({"actionJobId":1,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":500,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"})},
        {"path":"/actionJobHistory?ActionJobId=1","success":true,"resultStr":JSON.stringify([
            {"actionJobHistoryId":1,"actionJobId":1,"startTime":1293811200000,"startError":null,"endTime":1293811200000,"updateCnt":5,"deleteFlg":"0","errorCnt":3},
            {"actionJobHistoryId":1,"actionJobId":1,"startTime":1293811200000,"startError":null,"endTime":1293811200000,"updateCnt":5,"deleteFlg":"0","errorCnt":3},
            {"actionJobHistoryId":1,"actionJobId":1,"startTime":1293811200000,"startError":null,"endTime":1293811200000,"updateCnt":5,"deleteFlg":"0","errorCnt":3}
            ])  },
        {"path":"/newActionJob","success":true,"postStr":JSON.stringify({"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":999,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"}),"resultStr":5},
        {"path":"/saveActionJob","success":true,"postStr":JSON.stringify({"actionJobId":1,"tableMappingId":1,"actionJobType":'01',"batchUpdateCnt":999,"messageChannelName":'ChannelName001',"enableSaveHistory":"0","keyColumn":"id"}),"resultStr":1},
        {"path":"/deleteActionJob","success":true,"postStr":"11","resultStr":11},
        {"path":"/DBJobStart?ActionJobId=1","success":true,"resultStr":"success"},
        {"path":"/DBJobEnd?ActionJobId=1","success":true,"resultStr":"success"}
	]
};

module.exports = testData;   