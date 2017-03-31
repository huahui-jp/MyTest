var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');


'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({
    render: function () {
        return (
            <div id="navbar" className="navbar navbar-default navbar-fixed-top">
                <div className="navbar-container" id="navbar-container">
                    <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
                        <span className="sr-only">Toggle sidebar</span>

                        <span className="icon-bar"></span>

                        <span className="icon-bar"></span>

                        <span className="icon-bar"></span>
                    </button>

                    <div className="navbar-header pull-left">
                        <a href="/" className="navbar-brand">
                            <i className="fa fa-laptop"></i>&nbsp;
                            <small>
                                 iDeveloper V2
                            </small>
                        </a>

                    </div>

                    <div className="navbar-buttons navbar-header pull-right" role="navigation">
                        <ul className="nav ace-nav">
                            <li className="grey">
                                <a data-toggle="dropdown" className="dropdown-toggle" >
                                    <i className="ace-icon fa fa-tasks"></i>
                                    <span className="badge badge-grey">3</span>
                                </a>

                                <ul className="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
                                    <li className="dropdown-header">
                                        <i className="ace-icon fa fa-check"></i>
                                        4 条待办任务
                                    </li>

                                    <li className="dropdown-content">
                                        <ul className="dropdown-menu dropdown-navbar">
                                            <li>
                                                <a href="#" className="clearfix">
                                                    出差申请：张山 2015-01-20 出差上海
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="clearfix">
                                                    报销申请：李思 2015-01-18 34.00元 项目加班交通费
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="clearfix">
                                                    报销申请：李思 2015-01-24 14.00元 项目加班交通费
                                                </a>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="dropdown-footer">
                                        <a href="#">
                                            查看任务详细信息
                                            <i className="ace-icon fa fa-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="green">
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="ace-icon fa fa-comments icon-animated-vertical"></i>
                                    <span className="badge badge-success">5</span>
                                </a>

                                <ul className="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
                                    <li className="dropdown-header">
                                        <i className="ace-icon fa fa-comments-o"></i>
                                        5 条信息
                                    </li>

                                    <li className="dropdown-content">
                                        <ul className="dropdown-menu dropdown-navbar">
                                            <li>
                                                <a href="#" className="clearfix">
                                                    <img src="./assets/avatars/avatar.png" className="msg-photo" alt="Alex's Avatar" />
                                                    <span className="msg-body">
                                                        <span className="msg-title">
                                                            <span className="blue">开发部-张山:</span>&nbsp;
                                                            需求文档何时完成？
                                                        </span>

                                                        <span className="msg-time">
                                                            <i className="ace-icon fa fa-clock-o"></i>
                                                            <span>5 分钟内</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#" className="clearfix">
                                                    <img src="./assets/avatars/avatar3.png" className="msg-photo" alt="Susan's Avatar" />
                                                    <span className="msg-body">
                                                        <span className="msg-title">
                                                            <span className="blue">测试组:李思</span>&nbsp;
                                                            今天中午吃什么？一起去啊？
                                                        </span>

                                                        <span className="msg-time">
                                                            <i className="ace-icon fa fa-clock-o"></i>
                                                            <span>20 分钟之前</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#" className="clearfix">
                                                    <img src="./assets/avatars/avatar4.png" className="msg-photo" alt="Bob's Avatar" />
                                                    <span className="msg-body">
                                                        <span className="msg-title">
                                                            <span className="blue">总务部:王飞</span>&nbsp;
                                                            本周日公司保洁通知，详见公司公告。
                                                        </span>

                                                        <span className="msg-time">
                                                            <i className="ace-icon fa fa-clock-o"></i>
                                                            <span>3:15 pm</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#" className="clearfix">
                                                    <img src="./assets/avatars/avatar2.png" className="msg-photo" alt="Kate's Avatar" />
                                                    <span className="msg-body">
                                                        <span className="msg-title">
                                                            <span className="blue">开发部:秦网</span>&nbsp;
                                                            请教一个问题：如何使用React进行开发？
                                                        </span>

                                                        <span className="msg-time">
                                                            <i className="ace-icon fa fa-clock-o"></i>
                                                            <span>1:33 pm</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#" className="clearfix">
                                                    <img src="./assets/avatars/avatar5.png" className="msg-photo" alt="Fred's Avatar" />
                                                    <span className="msg-body">
                                                        <span className="msg-title">
                                                            <span className="blue">开发部:周武</span>&nbsp;
                                                            什么是Bootstrap？
                                                        </span>

                                                        <span className="msg-time">
                                                            <i className="ace-icon fa fa-clock-o"></i>
                                                            <span>10:09 am</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="dropdown-footer">
                                        <a href="#">
                                            查看所有信息
                                            <i className="ace-icon fa fa-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="light-blue">
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                    <img className="nav-user-photo" src="./assets/avatars/avatar2.png" alt="系统管理员" />
                                    <span className="user-info">
                                        管理员
                                    </span>

                                    <i className="ace-icon fa fa-caret-down"></i>
                                </a>

                                <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                    <li>
                                        <a href="#">
                                            <i className="ace-icon fa fa-cog"></i>
                                            Settings
                                        </a>
                                    </li>

                                    <li>
                                        <a href="profile.html">
                                            <i className="ace-icon fa fa-user"></i>
                                            Profile
                                        </a>
                                    </li>

                                    <li className="divider"></li>

                                    <li>
                                        <a href="/login.html">
                                            <i className="ace-icon fa fa-power-off"></i>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>

        );
    }
});

module.exports = page;