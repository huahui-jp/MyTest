var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var State = require('react-router').State;

'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({
    mixins: [
        State
    ],

    render: function () {
        var path = this.context.router.getCurrentPathname();
        var item = this.props.breadcrumbs[this.props.breadcrumbs.length-1];
        var name;
        if (item && item.name) {
            name = item.name;
        } else {
            name = "首页";
        }
        return (
            <div className="page-header">
                <h1 >{name}</h1>
            </div>
        );
    }
});

module.exports = page;