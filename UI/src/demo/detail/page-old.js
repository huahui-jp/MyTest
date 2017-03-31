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
        Reflux.connect(Store, "detailData"),
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">

                    <form className="form-horizontal" role="form">

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-1"> Text Field </label>

                            <div className="col-sm-9">
                                <input type="text" id="form-field-1" placeholder="Username" className="col-xs-10 col-sm-5" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-1-1"> Full Length </label>

                            <div className="col-sm-9">
                                <input type="text" id="form-field-1-1" placeholder="Text Field" className="col-xs-10 col-sm-5"/>
                            </div>
                        </div>


                        <div className="space-4"></div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-2"> Password Field </label>

                            <div className="col-sm-9">
                                <input type="password" id="form-field-2" placeholder="Password" className="col-xs-10 col-sm-5" />
                                <span className="help-inline col-xs-12 col-sm-7">
                                    <span className="middle">Inline help text</span>
                                </span>
                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-input-readonly"> Readonly field </label>

                            <div className="col-sm-9">
                                <input readonly="" type="text" className="col-xs-10 col-sm-5" id="form-input-readonly" value="This text field is readonly!" />
                                <span className="help-inline col-xs-12 col-sm-7">
                                    <label className="middle">
                                        <input className="ace" type="checkbox" id="id-disable-check" />
                                        <span className="lbl"> Disable it!</span>
                                    </label>
                                </span>
                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-4">Relative Sizing</label>

                            <div className="col-sm-9">
                                <input className="input-sm" type="text" id="form-field-4" placeholder=".input-sm" />
                                <div className="space-2"></div>

                                <div className="help-block" id="input-size-slider"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-5">Grid Sizing</label>

                            <div className="col-sm-9">
                                <div className="clearfix">
                                    <input className="col-xs-1" type="text" id="form-field-5" placeholder=".col-xs-1" />
                                </div>

                                <div className="space-2"></div>

                                <div className="help-block" id="input-span-slider"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right">Input with Icon</label>

                            <div className="col-sm-9">

                                <span className="input-icon">
                                    <input type="text" id="form-field-icon-1" />
                                    <i className="ace-icon fa fa-leaf blue"></i>
                                </span>

                                <span className="input-icon input-icon-right">
                                    <input type="text" id="form-field-icon-2" />
                                    <i className="ace-icon fa fa-leaf green"></i>
                                </span>


                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label no-padding-right" for="form-field-6">Tooltip and help button</label>

                            <div className="col-sm-9">
                                <input data-rel="tooltip" type="text" id="form-field-6" placeholder="Tooltip on hover" title="Hello Tooltip!" data-placement="bottom" />
                                <span className="help-button" data-rel="popover" data-trigger="hover" data-placement="left" data-content="More details." title="Popover on hover">{"?"}</span>
                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="clearfix form-actions">
                            <div className="col-md-offset-3 col-md-9">
                                <button className="btn btn-info" type="button">
                                    <i className="ace-icon fa fa-check bigger-110"></i>
                                    保存
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                <button className="btn" type="reset">
                                    <i className="ace-icon fa fa-undo bigger-110"></i>
                                    重置
                                </button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
});
module.exports = page;