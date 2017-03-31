var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');
var PageRouterStore = require('../pageRouter/store');
var LoginActions = require('./actions');
var LoginStore = require('./store');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var LoginForm = React.createClass({
    mixins: [
        Reflux.listenTo(LoginStore, "onStatusChange"),
        Reflux.listenTo(PageRouterStore, ""),
        React.addons.LinkedStateMixin
    ],

    getInitialState: function () {
        return {loginName: ''};
    },

    onStatusChange: function (loginState) {
        this.setState({
            ok: loginState.ok,
            loginName: loginState.loginName,
            password: loginState.password,
            errMsg: loginState.errMsg
        }, function () {
            this.refs.loginName.getDOMNode().focus();
            if (loginState.ok) {
                PageRouterActions.navigateTo('index');
            }
        });
    },

    handleKeyUp: function (evt) {
        if (evt.which === 13 && this.state.loginName) {
            this.handleClick();
        }
    },

    handleClick: function () {
        LoginActions.login(this.state.loginName, this.state.password);
    },

    handleReset: function () {
        LoginActions.reset();
    },

    componentDidMount:function(){
        this.refs.loginName.getDOMNode().focus();
    },

    render: function () {
        return (
            <form>
                <fieldset>
                    <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                            <input type="text" ref="loginName" className="form-control" placeholder="用户名，试试admin吧" valueLink={this.linkState('loginName')} onKeyUp={this.handleKeyUp}  autofocus/>
                            <i className="ace-icon fa fa-user"></i>
                        </span>
                    </label>

                    <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                            <input type="password" className="form-control" placeholder="密码" ref="password" valueLink={this.linkState('password')} onKeyUp={this.handleKeyUp} />
                            <i className="ace-icon fa fa-lock"></i>
                        </span>
                    </label>

                    <div className="space"></div>

                    <div className="clearfix">
                        <label className="inline">
                            <input type="checkbox" className="ace" />
                            <span className="lbl"> 记住我</span>
                        </label>

                        <button type="button" onClick={this.handleClick} className="width-35 pull-right btn btn-sm btn-primary">
                            <i className="ace-icon fa fa-key"></i>
                            <span className="bigger-110">登录</span>
                        </button>
                    </div>

                    <div className="space-4"></div>
                </fieldset>
            </form>
        )
    }
});

var LoginPage = React.createClass({
    mixins: [Reflux.connect(LoginStore, "loginState")],

    render: function () {
        return (
            <div className="main-container">
                <div className="main-content">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="login-container">
                                <div className="center">
                                    <h1>
                                        <i className="ace-icon fa fa-laptop green"></i>&nbsp;
                                        <span className="white" id="id-text2">iDeveloper</span>
                                    </h1>
                                    <h4 className="blue" id="id-version-text"><span className="red">Version 2.0</span></h4>
                                    <h4 className="blue" id="id-company-text"><span className="">联迪恒星（南京）信息系统有限公司</span></h4>
                                </div>

                                <div className="space-6"></div>

                                <div className="position-relative">
                                    <div id="login-box" className="login-box visible widget-box no-border">
                                        <div className="widget-body">
                                            <div className="widget-main">
                                                <h4 className="header blue lighter bigger">
                                                    <i className="ace-icon fa fa-coffee green"></i>&nbsp;
                                                    请输入登录信息
                                                </h4>
                                                <span className="red">{this.state.loginState.errMsg}</span>

                                                <div className="space-6"></div>
                                                <RouteHandler />

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="navbar-fixed-top align-right">
                                    <br />
                                &nbsp;
                                    <a id="btn-login-dark" href="#">Dark</a>
                                &nbsp;
                                    <span className="blue">/</span>
                                &nbsp;
                                    <a id="btn-login-blur" href="#">Blur</a>
                                &nbsp;
                                    <span className="blue">/</span>
                                &nbsp;
                                    <a id="btn-login-light" href="#">Light</a>
                                &nbsp; &nbsp; &nbsp;
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

var routes = (
    <Route handler={LoginPage}>
        <DefaultRoute handler={LoginForm}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('container'));
});