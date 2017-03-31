var Reflux = require('reflux');
var LoginActions = require('./actions');

'use strict';

var loginStore = Reflux.createStore({
    listenables: [LoginActions],

    onLogin: function (loginName, password) {

        if (loginName == 'admin') {
            //登录成功
            this.loginState = {
                ok: true,
                loginName: loginName,
                password: null,
                errMsg: null
            };
            this.trigger(this.loginState);
            console.log('登录成功');
        } else {
            //登录失败
            this.loginState = {
                ok: false,
                loginName: loginName,
                password: null,
                errMsg: '登录失败，请确认用户名和密码是否正确。'
            };
            this.trigger(this.loginState);

            console.log('登录失败!');
        }
    },

    onReset: function () {
        //登录失败
        console.log('enter in onReset ');
        this.loginState = {
            ok: false,
            loginName: null,
            password: null,
            errMsg: null
        };
        this.trigger(this.loginState);
        console.log('清除成功');
    },

    getInitialState: function () {
        return {};
    }
});

module.exports = loginStore;