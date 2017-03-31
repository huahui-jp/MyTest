var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../../pageRouter/actions');
var PageRouterStore = require('../../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var _ = require("lodash");
var Gritter = require('../../component/gritter');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var page = React.createClass({
    mixins: [
        Reflux.listenTo(Store, "onStatusChange"),
        React.addons.LinkedStateMixin,
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],
    onStatusChange: function (detailData) {
        var saveOk = detailData.saveOk;
        this.setState({obj: detailData.obj}, function () {
            if (saveOk) {
                Gritter.add({
                    title: '提示',
                    text: '保存成功！' + _.values(detailData.obj),
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '2000',
                    class_name: 'gritter-light '
                });
            } else {
                Gritter.add({
                    title: '警告',
                    text: '保存失败！',
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '2000',
                    class_name: 'gritter-warning '
                });
            }
        });
    },

    _handleClick: function () {
        console.log("_handleClick", this.state);
        if (!_.isEmpty(this.state.nameValidateMessage)) {
            return;
        }
        var _date = this.refs._date.getDOMNode().value;
        var name = this.state.name;
        var street = this.state.street;
        var city = this.state.city;
        var zipCode = this.state.zipCode;
        var email = this.state.email;
        Actions.save({
            name: name,
            street: street,
            city: city,
            zipCode: zipCode,
            _date: _date,
            email: email
        });
    },

    validateForm: function (columnName) {
        //console.log("validateForm",columnName,this.state[columnName]);
        var flag = true;
        var value = this.state[columnName];
        switch (columnName) {
            case "name":
                if (_.isEmpty(value)) {
                    this.setState({"nameValidateMessage": "请输入姓名"});
                    flag = false;
                } else if (value.length > 4) {
                    this.setState({"nameValidateMessage": "姓名的字数不能大于4"});
                    flag = false
                } else {
                    this.setState({"nameValidateMessage": ""});
                }
                break;
            default:
                break;
        }
        return flag;

    },

    _handleDateChange: function () {
        var _date = this.refs._date.getDOMNode().value;
        this.setState({_date: _date});

    },
    getStateFromStore: function () {
        //var id = this.context.router.getCurrentParams().id;
        var id = this.props.params.id;
        var demoCrudObj = Store.getDataObject(id);
        return demoCrudObj;
    },

    getInitialState: function () {
        return this.getStateFromStore();


    },
    componentDidMount: function () {
        //console.log("componentDidMount");

        $('#id-date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        })
    },
    render: function () {
        var nameValidateMessage = this.state.nameValidateMessage;
        var classnameForName = null;
        var validateIcon = null;
        var errMsgForName = null;
        if (_.isUndefined(nameValidateMessage)) {
            classnameForName = "form-group";
        } else if (_.isEmpty(nameValidateMessage)) {
            classnameForName = "form-group has-success";
            errMsgForName = null;
            validateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            classnameForName = "form-group has-error";
            errMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {nameValidateMessage} </div>;
            validateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }

        return (
            <div className="row">
                <div className="col-xs-12">

                    <form className="form-horizontal" role="form">

                        <div className={classnameForName}>
                            <label htmlFor="name" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 姓名 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text"
                                        id="name"
                                        className="width-100"
                                        valueLink={this.linkState('name')}
                                        onBlur={this.validateForm.bind(this, "name")}
                                        placeholder="姓名" />
                                    {validateIcon}
                                </span>

                            </div>
                            {errMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="street" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 街道 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="street" className="width-100" valueLink={this.linkState('street')} placeholder="街道" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 城市 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="city" className="width-100" valueLink={this.linkState('city')} placeholder="城市" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 日期 </label>

                            <div className="col-xs-12 col-sm-4">
                                <div className="input-group">
                                    <input className="form-control date-picker"
                                        ref="_date"
                                        id="id-date-picker"
                                        type="text"
                                        data-date-format="yyyy-mm-dd"
                                        placeholder="日期">
                                        <span className="input-group-addon">
                                            <i className="fa fa-calendar bigger-110"></i>
                                        </span>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 邮政编码 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="zipCode" className="width-100" valueLink={this.linkState('zipCode')} placeholder="邮政编码" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 邮件 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="email" className="width-100" valueLink={this.linkState('email')} placeholder="邮件" />
                                </span>
                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="clearfix form-actions">
                            <div className="col-md-offset-3 col-md-9">
                                <button className="btn btn-info" type="button" onClick={this._handleClick}>
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
        //console.log("state", this.state);
    }
});
module.exports = page;