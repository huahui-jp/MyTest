var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../../pageRouter/actions');
var PageRouterStore = require('../../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var page = React.createClass({
    mixins: [
        Reflux.connect(Store, "listData"),
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],
    rowGetter: function (rowIndex) {
        return this.state.listData.data[rowIndex];
    },

    rowCount: function () {
        return this.state.listData.data.length;
    },

    render: function () {
        return (
            <div className="row ">
                <div className="col-xs-12 dataTables_wrapper  form-inline">
                    <div className="row" >
                        <div className="col-xs-6">
                            <button className="btn btn-sm btn-white btn-info btn-bold">
                                <i className="ace-icon fa fa-plus-circle blue bigger-120 "></i>
                                新增
                            </button>
                        &nbsp;
                            <button className="btn btn-sm btn-white btn-warning btn-bold">
                                <i className="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                删除
                            </button>
                        </div>
                        <div className="col-xs-6">
                            <div id="sample-table-2_filter" className="dataTables_filter">
                                <input type="search" className="form-control input-sm" placeholder="查询..." aria-controls="sample-table-2"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <table id="sample-table-1" className="table table-striped table-bordered table-hover dataTable">
                            <thead>
                                <tr>
                                    <th className="center">
                                        <label className="position-relative">
                                            <input type="checkbox" className="ace" />
                                            <span className="lbl"></span>
                                        </label>
                                    </th>
                                    <th>序号</th>
                                    <th>姓名</th>
                                    <th className="hidden-480">城市</th>

                                    <th>
                                        <i className="ace-icon fa fa-clock-o bigger-110 hidden-480"></i>
                                        Update
                                    </th>
                                    <th className="hidden-480">Status</th>

                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="center">
                                        <label className="position-relative">
                                            <input type="checkbox" className="ace" />
                                            <span className="lbl"></span>
                                        </label>
                                    </td>

                                    <td>
                                        <a href="#">ace.com ace.com ace.com</a>
                                    </td>
                                    <td>$45</td>
                                    <td className="hidden-480">3,330</td>
                                    <td>Feb 12</td>

                                    <td className="hidden-480">
                                        <span className="label label-sm label-warning">Expiring</span>
                                    </td>

                                    <td>
                                        <div className="hidden-sm hidden-xs btn-group">

                                            <button className="btn btn-xs btn-info">
                                                <i className="ace-icon fa fa-pencil bigger-120"></i>
                                            </button>

                                            <button className="btn btn-xs btn-danger">
                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                            </button>

                                        </div>

                                        <div className="hidden-md hidden-lg">
                                            <div className="inline position-relative">
                                                <button className="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown" data-position="auto">
                                                    <i className="ace-icon fa fa-cog icon-only bigger-110"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
                                                    <li>
                                                        <a href="#" className="tooltip-info" data-rel="tooltip" title="View">
                                                            <span className="blue">
                                                                <i className="ace-icon fa fa-search-plus bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-success" data-rel="tooltip" title="Edit">
                                                            <span className="green">
                                                                <i className="ace-icon fa fa-pencil-square-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-error" data-rel="tooltip" title="Delete">
                                                            <span className="red">
                                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="center">
                                        <label className="position-relative">
                                            <input type="checkbox" className="ace" />
                                            <span className="lbl"></span>
                                        </label>
                                    </td>

                                    <td>
                                        <a href="#">ace.com ace.com ace.com</a>
                                    </td>
                                    <td>$45</td>
                                    <td className="hidden-480">3,330</td>
                                    <td>Feb 12</td>

                                    <td className="hidden-480">
                                        <span className="label label-sm label-warning">Expiring</span>
                                    </td>

                                    <td>
                                        <div className="hidden-sm hidden-xs btn-group">

                                            <button className="btn btn-xs btn-info">
                                                <i className="ace-icon fa fa-pencil bigger-120"></i>
                                            </button>

                                            <button className="btn btn-xs btn-danger">
                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                            </button>

                                        </div>

                                        <div className="hidden-md hidden-lg">
                                            <div className="inline position-relative">
                                                <button className="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown" data-position="auto">
                                                    <i className="ace-icon fa fa-cog icon-only bigger-110"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
                                                    <li>
                                                        <a href="#" className="tooltip-info" data-rel="tooltip" title="View">
                                                            <span className="blue">
                                                                <i className="ace-icon fa fa-search-plus bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-success" data-rel="tooltip" title="Edit">
                                                            <span className="green">
                                                                <i className="ace-icon fa fa-pencil-square-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-error" data-rel="tooltip" title="Delete">
                                                            <span className="red">
                                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="center">
                                        <label className="position-relative">
                                            <input type="checkbox" className="ace" />
                                            <span className="lbl"></span>
                                        </label>
                                    </td>

                                    <td>
                                        <a href="#">ace.com ace.com ace.com</a>
                                    </td>
                                    <td>$45</td>
                                    <td className="hidden-480">3,330</td>
                                    <td>Feb 12</td>

                                    <td className="hidden-480">
                                        <span className="label label-sm label-warning">Expiring</span>
                                    </td>

                                    <td>
                                        <div className="hidden-sm hidden-xs btn-group">

                                            <button className="btn btn-xs btn-info">
                                                <i className="ace-icon fa fa-pencil bigger-120"></i>
                                            </button>

                                            <button className="btn btn-xs btn-danger">
                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                            </button>

                                        </div>

                                        <div className="hidden-md hidden-lg">
                                            <div className="inline position-relative">
                                                <button className="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown" data-position="auto">
                                                    <i className="ace-icon fa fa-cog icon-only bigger-110"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
                                                    <li>
                                                        <a href="#" className="tooltip-info" data-rel="tooltip" title="View">
                                                            <span className="blue">
                                                                <i className="ace-icon fa fa-search-plus bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-success" data-rel="tooltip" title="Edit">
                                                            <span className="green">
                                                                <i className="ace-icon fa fa-pencil-square-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#" className="tooltip-error" data-rel="tooltip" title="Delete">
                                                            <span className="red">
                                                                <i className="ace-icon fa fa-trash-o bigger-120"></i>
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">
                            <div className="dataTables_info" id="sample-table-2_info" role="status" aria-live="polite">显示 1 到 10 ，共 23 条记录</div>
                        </div>
                        <div className="col-xs-3">
                            <div className="dataTables_length" id="sample-table-2_length">
                                <label>每页显示
                                    <select name="sample-table-2_length" aria-controls="sample-table-2" className="form-control input-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    记录</label>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="dataTables_paginate paging_simple_numbers" id="sample-table-2_paginate">
                                <ul className="pagination">
                                    <li className="paginate_button previous disabled" aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_previous">
                                        <a href="#">上一页</a>
                                    </li>
                                    <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="0">
                                        <a href="#">1</a>
                                    </li>
                                    <li className="paginate_button " aria-controls="sample-table-2" tabIndex="0">
                                        <a href="#">2</a>
                                    </li>
                                    <li className="paginate_button " aria-controls="sample-table-2" tabIndex="0">
                                        <a href="#">3</a>
                                    </li>
                                    <li className="paginate_button next" aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_next">
                                        <a href="#">下一页</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = page;