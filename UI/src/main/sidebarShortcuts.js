var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = require('react-router').Link;

var BlankAction = require("../blank/actions");

'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({

    render: function () {
        return (
            <div className="sidebar-shortcuts" id="sidebar-shortcuts">
                <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">

                    <Link to="/demoListPage" className="btn btn-info">
                        <i className="ace-icon fa fa-pencil"></i>
                    </Link>&nbsp;

                    <Link to="/demoDetailPage/0" className="btn btn-warning">
                        <i className="ace-icon fa fa-users"></i>
                    </Link>&nbsp;

                    <Link to="/tab" className="btn btn-success">
                        <i className="ace-icon fa fa-signal"></i>
                    </Link>&nbsp;

                    <a href="http://localhost:8080/ACE-1.3.2/html/" target="_blank" className="btn btn-danger">
                        <i className="ace-icon fa fa-cogs"></i>
                    </a>

                </div>

                <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                    <span className="btn btn-success"></span>

                    <span className="btn btn-info"></span>

                    <span className="btn btn-warning"></span>

                    <span className="btn btn-danger"></span>
                </div>
            </div>
        );
    }
});

module.exports = page;