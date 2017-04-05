var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = require('react-router').Link;

var SidebarShortcuts = require('./sidebarShortcuts');


'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({
    render: function () {
        return (
            <div id="sidebar" className="sidebar responsive sidebar-fixed">

                <SidebarShortcuts></SidebarShortcuts>

                <ul className="nav nav-list">
                    <li className="active">
                        <Link to="/">
                            <i className="menu-icon fa fa-tachometer"></i>
                            <span className="menu-text"> 首 页 </span>
                        </Link>

                        <b className="arrow"></b>
                    </li>
                    <li className="">
                        <Link to="myTodo">
                            <i className="menu-icon fa fa-tasks"></i>
                            <span className="menu-text"> 我的待办 </span>
                        </Link>

                        <b className="arrow"></b>
                    </li>
                    <li className="">
                        <Link to="myDone">
                            <i className="menu-icon fa fa-check"></i>
                            <span className="menu-text"> 我的已办 </span>
                        </Link>

                        <b className="arrow"></b>
                    </li>
                    <li className="">
                        <Link to="myHistory">
                            <i className="menu-icon glyphicon glyphicon-list"></i>
                            <span className="menu-text"> 历史任务 </span>
                        </Link>

                        <b className="arrow"></b>
                    </li>
                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon fa fa-fire"></i>
                            <span className="menu-text"> 数据交换平台 </span>

                            <b className="arrow fa fa-angle-down"></b>
                        </a>

                        <ul className="submenu">
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    导入数据管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <Link to="/resourceListPage" >
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            导入数据源管理
                                        </Link>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <Link to="/dbTableMappingListPage">
                                        <i className="menu-icon fa fa-caret-right"></i>
                                            数据库表结构管理
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbActionJobListPage">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            数据导入任务管理
                                        </Link>

                                        <b className="arrow"></b>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="submenu">
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    数据来源管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <Link to="/resourceListPage" >
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            数据来源管理
                                        </Link>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <Link to="/dbTableMappingListPage">
                                        <i className="menu-icon fa fa-caret-right"></i>
                                            数据抽出方法
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/dbActionJobListPage">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            定时任务管理
                                        </Link>

                                        <b className="arrow"></b>
                                    </li>
                                </ul>
                            </li>
                        </ul>                        
                    </li>
                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon glyphicon glyphicon-th-large"></i>
                            <span className="menu-text"> 基础平台系统</span>

                            <b className="arrow fa fa-angle-down"></b>
                        </a>

                        <ul className="submenu">
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    组织管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <Link to="/blank" query={{pageName:"组织性质管理"}}>
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            组织性质管理
                                        </Link>

                                        <b className="arrow"></b>
                                    </li>

                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            组织管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                </ul>
                            </li>
                            <li className="">
                                <Link to="/user">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    人员管理
                                    <b className="arrow"></b>
                                </Link>

                                <b className="arrow"></b>

                            </li>
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    功能管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            业务系统注册
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            业务功能管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                </ul>
                            </li>
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    权限管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            角色管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            角色授权
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            用户授权
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            角色授权查询
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            用户授权查询
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="#" className="">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    系统参数管理
                                    <b className="arrow"></b>
                                </a>

                                <b className="arrow"></b>

                            </li>
                            <li className="">
                                <a href="#" className="">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    公用代码管理
                                    <b className="arrow"></b>
                                </a>

                                <b className="arrow"></b>

                            </li>
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    表单管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            自定义表
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            自定义表单
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                </ul>
                            </li>
                            <li className="">
                                <a href="#" className="dropdown-toggle">
                                    <i className="menu-icon fa fa-caret-right"></i>

                                    工作流管理
                                    <b className="arrow fa fa-angle-down"></b>
                                </a>

                                <b className="arrow"></b>

                                <ul className="submenu">
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            业务流程设计
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            流程部署管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            活动任务管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <i className="menu-icon fa fa-caret-right"></i>
                                            历史流程管理
                                        </a>

                                        <b className="arrow"></b>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon fa fa-desktop"></i>
                            <span className="menu-text"> 演示系统</span>

                            <b className="arrow fa fa-angle-down"></b>
                        </a>

                        <ul className="submenu">
                            <li className="">
                                <Link to="/demoListPage">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    列表页面(iDev-Table)
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/demoListPage2">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    列表页面(iDev-Table2)
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/demoFixedDataTablePage">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    列表页面(FixedDataTable)
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/demoBootstrapTablePage">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    列表页面(BootstrapTable)
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/reactBootstrapTablePage">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    列表页面(ReactBootstrapTable)
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/demoDetailPage/0">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    编辑页面
                                </Link>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <Link to="/tab">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    标签页面
                                </Link>

                                <b className="arrow"></b>
                            </li>

                        </ul>
                    </li>
                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon glyphicon glyphicon-th"></i>
                            <span className="menu-text"> iOffice办公系统</span>

                            <b className="arrow fa fa-angle-down"></b>
                        </a>

                        <ul className="submenu">
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 公告板
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 请假申请
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 电子邮件
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 最近发言
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 考勤管理
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i> 公告板
                                </a>

                                <b className="arrow"></b>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon fa fa-leaf"></i>
                            <span className="menu-text"> 节能减排-绿色能源</span>

                            <b className="arrow fa fa-angle-down"></b>
                        </a>
                        <ul className="submenu">
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    统计概括
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    告警管理
                                </a>

                                <b className="arrow"></b>
                            </li>
                            <li className="">
                                <a href="#">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    电厂管理
                                </a>

                                <b className="arrow"></b>
                            </li>
                        </ul>

                    </li>


                </ul>


                <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                    <i className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                </div>

            </div>
        );
    }
});

module.exports = page;