var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');


'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({
    render: function () {
        return (
            <div className="ace-settings-container" id="ace-settings-container">
                <div className="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                    <i className="ace-icon fa fa-comments bigger-130"></i>
                </div>

                <div className="ace-settings-box clearfix" id="ace-settings-box">

                    <div className="pull-left width-50">
                        在线沟通
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div className="pull-right width-50">
                        随时交流
                    </div>
                </div>
            </div>

        );
    }
});

module.exports = page;