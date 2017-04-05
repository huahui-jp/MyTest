/**
 * validationMixin.js
 *
 * 表单验证的公共函数
 */
var React = require('react/addons');

'use strict';

var validationMixin = {
    validateForm: function(){
        var flag = true;
        for(var p in this.validations){  
            if(!this.validate(this.validations[p])){
                return false;
            }
        }
        if(flag){
            this.setState({"validateMessage": ""});
        }
        return flag;
    },
    validateInput: function(input){
        var flag = true;
        for(var p in this.validations){
            if(input == this.validations[p].input){
                if(!this.validate(this.validations[p])){
                    flag = false;
                }
            }
        }
        // if(flag){
        //     this.setState({"validateMessage": ""});
        // }
        return flag;
    },
    validate: function(validateObj){
        var value = this.state[validateObj.input];//从state获取数值
        var name = validateObj.name;//从state获取数值
        var flag = true;
        if(validateObj.isRequire){//必填
            if(validateObj.inputType === "text"){ 
                if(!value){
                    this.setState({"validateMessage": "请输入"+name+"!"});
                    flag = false;
                }else if(_.isEmpty(value.toString())) {
                    this.setState({"validateMessage": "请输入"+name+"!"});
                    flag = false;
                }
            }
            if(validateObj.inputType === "select"){
                if(!value){
                    this.setState({"validateMessage": "请选择"+name+"!"});
                    flag = false;
                }else if(value === ""){
                    this.setState({"validateMessage": "请选择"+name+"!"});
                    flag = false;
                }

            }
            
        }
        else if(validateObj.maxLength){//最大长度
            if(value.length > validateObj.maxLength) {
                this.setState({"validateMessage": name+"的长度不能超过"+validateObj.maxLength+"!"});
                flag = false;
            }
        }
        // console.log("validate--->    name:"+name+"   value:"+value+"   flag:"+flag);
        return flag;
    }
};

module.exports = validationMixin;