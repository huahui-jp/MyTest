var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');
var PageRouterStore = require('../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;


var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var page = React.createClass({
    mixins: [
        Reflux.connect(Store, "users"),
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],

    render: function () {
        return (
            <div >
                用户管理页面
            </div>
        );
    }
});
module.exports = page;