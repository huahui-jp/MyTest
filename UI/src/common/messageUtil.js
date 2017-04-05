var Gritter = require('../component/gritter');

var messageUtil = {

	addGritter: function(params){
		Gritter.add({
            title: '提示',
            text: params.text,
            image: 'assets/avatars/avatar.png',
            sticky: false,
            time: '2000',
            class_name: 'gritter-light '
        });
	},
	sendMessage: function(params,callback){
		//在store中不能同时将message与state内容同时提交
		if (params.message && params.message !== ""){
            this.addInfoGritter({text:params.message});
        }else{
        	callback();
        }
    }
	
};

module.exports = messageUtil;   