webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Reflux = __webpack_require__(173);
	var PageRouterActions = __webpack_require__(195);
	var PageRouterStore = __webpack_require__(196);
	var LoginActions = __webpack_require__(197);
	var LoginStore = __webpack_require__(198);
	var Router = __webpack_require__(199);
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var RouteHandler = Router.RouteHandler;
	var Link = Router.Link;

	'use strict';

	var LoginForm = React.createClass({
	    displayName: 'LoginForm',

	    mixins: [Reflux.listenTo(LoginStore, "onStatusChange"), Reflux.listenTo(PageRouterStore, ""), React.addons.LinkedStateMixin],

	    getInitialState: function getInitialState() {
	        return { loginName: '' };
	    },

	    onStatusChange: function onStatusChange(loginState) {
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

	    handleKeyUp: function handleKeyUp(evt) {
	        if (evt.which === 13 && this.state.loginName) {
	            this.handleClick();
	        }
	    },

	    handleClick: function handleClick() {
	        LoginActions.login(this.state.loginName, this.state.password);
	    },

	    handleReset: function handleReset() {
	        LoginActions.reset();
	    },

	    componentDidMount: function componentDidMount() {
	        this.refs.loginName.getDOMNode().focus();
	    },

	    render: function render() {
	        return React.createElement(
	            'form',
	            null,
	            React.createElement(
	                'fieldset',
	                null,
	                React.createElement(
	                    'label',
	                    { className: 'block clearfix' },
	                    React.createElement(
	                        'span',
	                        { className: 'block input-icon input-icon-right' },
	                        React.createElement('input', { type: 'text', ref: 'loginName', className: 'form-control', placeholder: '用户名，试试admin吧', valueLink: this.linkState('loginName'), onKeyUp: this.handleKeyUp, autofocus: true }),
	                        React.createElement('i', { className: 'ace-icon fa fa-user' })
	                    )
	                ),
	                React.createElement(
	                    'label',
	                    { className: 'block clearfix' },
	                    React.createElement(
	                        'span',
	                        { className: 'block input-icon input-icon-right' },
	                        React.createElement('input', { type: 'password', className: 'form-control', placeholder: '密码', ref: 'password', valueLink: this.linkState('password'), onKeyUp: this.handleKeyUp }),
	                        React.createElement('i', { className: 'ace-icon fa fa-lock' })
	                    )
	                ),
	                React.createElement('div', { className: 'space' }),
	                React.createElement(
	                    'div',
	                    { className: 'clearfix' },
	                    React.createElement(
	                        'label',
	                        { className: 'inline' },
	                        React.createElement('input', { type: 'checkbox', className: 'ace' }),
	                        React.createElement(
	                            'span',
	                            { className: 'lbl' },
	                            ' 记住我'
	                        )
	                    ),
	                    React.createElement(
	                        'button',
	                        { type: 'button', onClick: this.handleClick, className: 'width-35 pull-right btn btn-sm btn-primary' },
	                        React.createElement('i', { className: 'ace-icon fa fa-key' }),
	                        React.createElement(
	                            'span',
	                            { className: 'bigger-110' },
	                            '登录'
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'space-4' })
	            )
	        );
	    }
	});

	var LoginPage = React.createClass({
	    displayName: 'LoginPage',

	    mixins: [Reflux.connect(LoginStore, "loginState")],

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'main-container' },
	            React.createElement(
	                'div',
	                { className: 'main-content' },
	                React.createElement(
	                    'div',
	                    { className: 'row' },
	                    React.createElement(
	                        'div',
	                        { className: 'col-sm-10 col-sm-offset-1' },
	                        React.createElement(
	                            'div',
	                            { className: 'login-container' },
	                            React.createElement(
	                                'div',
	                                { className: 'center' },
	                                React.createElement(
	                                    'h1',
	                                    null,
	                                    React.createElement('i', { className: 'ace-icon fa fa-laptop green' }),
	                                    ' ',
	                                    React.createElement(
	                                        'span',
	                                        { className: 'white', id: 'id-text2' },
	                                        'iDeveloper'
	                                    )
	                                ),
	                                React.createElement(
	                                    'h4',
	                                    { className: 'blue', id: 'id-version-text' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'red' },
	                                        'Version 2.0'
	                                    )
	                                ),
	                                React.createElement(
	                                    'h4',
	                                    { className: 'blue', id: 'id-company-text' },
	                                    React.createElement(
	                                        'span',
	                                        { className: '' },
	                                        '联迪恒星（南京）信息系统有限公司'
	                                    )
	                                )
	                            ),
	                            React.createElement('div', { className: 'space-6' }),
	                            React.createElement(
	                                'div',
	                                { className: 'position-relative' },
	                                React.createElement(
	                                    'div',
	                                    { id: 'login-box', className: 'login-box visible widget-box no-border' },
	                                    React.createElement(
	                                        'div',
	                                        { className: 'widget-body' },
	                                        React.createElement(
	                                            'div',
	                                            { className: 'widget-main' },
	                                            React.createElement(
	                                                'h4',
	                                                { className: 'header blue lighter bigger' },
	                                                React.createElement('i', { className: 'ace-icon fa fa-coffee green' }),
	                                                '  请输入登录信息'
	                                            ),
	                                            React.createElement(
	                                                'span',
	                                                { className: 'red' },
	                                                this.state.loginState.errMsg
	                                            ),
	                                            React.createElement('div', { className: 'space-6' }),
	                                            React.createElement(RouteHandler, null)
	                                        )
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'navbar-fixed-top align-right' },
	                                React.createElement('br', null),
	                                ' ',
	                                React.createElement(
	                                    'a',
	                                    { id: 'btn-login-dark', href: '#' },
	                                    'Dark'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'span',
	                                    { className: 'blue' },
	                                    '/'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'a',
	                                    { id: 'btn-login-blur', href: '#' },
	                                    'Blur'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'span',
	                                    { className: 'blue' },
	                                    '/'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'a',
	                                    { id: 'btn-login-light', href: '#' },
	                                    'Light'
	                                ),
	                                '     '
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	var routes = React.createElement(
	    Route,
	    { handler: LoginPage },
	    React.createElement(DefaultRoute, { handler: LoginForm })
	);

	Router.run(routes, function (Handler) {
	    React.render(React.createElement(Handler, null), document.getElementById('container'));
	});

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Reflux = __webpack_require__(173);
	'use strict';

	var actions = Reflux.createActions(["login", "reset"]);

	module.exports = actions;

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Reflux = __webpack_require__(173);
	var LoginActions = __webpack_require__(197);

	'use strict';

	var loginStore = Reflux.createStore({
	    listenables: [LoginActions],

	    onLogin: function onLogin(loginName, password) {

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

	    onReset: function onReset() {
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

	    getInitialState: function getInitialState() {
	        return {};
	    }
	});

	module.exports = loginStore;

/***/ }

});