/*
  资源管理-detail
  zhoujiang 20160321
 */

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

var mode;//"add","edit","view"

var page = React.createClass({
    mixins: [
        Reflux.listenTo(Store, "onStatusChange"),
        React.addons.LinkedStateMixin,
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],
    onStatusChange: function (detailData) {
        console.log("onStatusChange--->"+detailData);
        var saveOk = detailData.saveOk;
        var connectOk = detailData.connectOk;
        if(detailData.obj !== ""){
            this.state.resourceId =detailData.obj.resourceId;
            this.state.resourceName =detailData.obj.resourceName;
            this.state.resourceType =detailData.obj.resourceType;
            this.state.dbLink =detailData.obj.dbLink;
            this.state.dbUser = detailData.obj.dbUser;
            this.state.dbPasswd =detailData.obj.dbPasswd;

            //通过resourceType的值 设置dbLink、dbUser、dbPasswd 显示和隐藏
            // if(this.state.resourceType === "01"){
            // }else{
            // }
            
        }
        

        this.setState({obj: detailData.obj}, function () {
            if (typeof saveOk === "undefined") {
            }else if (saveOk) {
                Gritter.add({
                    title: '提示',
                    text: '保存成功！' + _.values(detailData.obj),
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '2000',
                    class_name: 'gritter-light '
                });
            }else if (!saveOk) {
                Gritter.add({
                    title: '警告',
                    text: '保存失败！',
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '2000',
                    class_name: 'gritter-warning '
                });
            }
            if (typeof connectOk === "undefined") {
            }else if (connectOk) {
                Gritter.add({
                    title: '提示',
                    text: '连接成功！' ,
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '2000',
                    class_name: 'gritter-light '
                });
            }else if (!connectOk) {
                Gritter.add({
                    title: '警告',
                    text: '连接失败！',
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
        this.validateForm("resourceName");
        this.validateForm("resourceType");
        this.validateForm("dbLink");
        this.validateForm("dbUser");
        this.validateForm("dbPasswd");

        if (!_.isEmpty(this.state.nameValidateMessage) 
            || !_.isEmpty(this.state.typeValidateMessage)
            || !_.isEmpty(this.state.dbLinkValidateMessage)
            || !_.isEmpty(this.state.dbUserValidateMessage)
            || !_.isEmpty(this.state.dbPasswdValidateMessage)) {
            return;
        }
        //resourceId
        var resourceName = this.state.resourceName;
        var resourceType = this.state.resourceType;
        var dbLink = this.state.dbLink;
        var dbUser = this.state.dbUser;
        var dbPasswd = this.state.dbPasswd;
        if(mode == "add"){
            Actions.add({
            resourceName: resourceName,
            resourceType: resourceType,
            dbLink: dbLink,
            dbUser: dbUser,   
            dbPasswd: dbPasswd,
            resourceFlg: "1",
            deleteFlg: "0"
            });
        }else if(mode == "edit"){

            Actions.edit({
            resourceId: this.props.params.resourceId,
            resourceName: resourceName,
            resourceType: resourceType,
            dbLink: dbLink,
            dbUser: dbUser,
            dbPasswd: dbPasswd,
            resourceFlg: "1",
            deleteFlg: "0"
        });
        }
        
    },
    _handleConnectClick: function () {
        Actions.connect(
        {
            resourceId:this.state.resourceId,
            dbLink:this.state.dbLink,
            dbUser:this.state.dbUser,
            dbPasswd:this.state.dbPasswd
        });
    },
    // TODO
    validateForm: function (columnName) {
        console.log("validateForm",columnName,this.state[columnName]);
        var flag = true;
        var value = this.state[columnName];
        switch (columnName) {
            case "resourceName":
                if (_.isEmpty(value)) {
                    this.setState({"nameValidateMessage": "请输入资源名称"});
                    flag = false;
                } else if (value.length > 20) {
                    this.setState({"nameValidateMessage": "资源名称的字数不能大于20"});
                    flag = false
                } else {
                    this.setState({"nameValidateMessage": ""});
                }
                break;
            case "resourceType":
                if (_.isEmpty(value)) {
                    this.setState({"typeValidateMessage": "请选择资源种类"});
                    flag = false;
                } else {
                    this.setState({"typeValidateMessage": ""});
                }
                break;
            case "dbLink":
                if (_.isEmpty(value)) {
                    this.setState({"dbLinkValidateMessage": "请输入数据库连接"});
                    flag = false;
                } else if (value.length > 200) {
                    this.setState({"dbLinkValidateMessage": "数据库连接的字数不能大于200"});
                    flag = false
                } else {
                    this.setState({"dbLinkValidateMessage": ""});
                }
                break;
            case "dbUser":
                if (_.isEmpty(value)) {
                    this.setState({"dbUserValidateMessage": "请输入数据库用户"});
                    flag = false;
                } else if (value.length > 40) {
                    this.setState({"dbUserValidateMessage": "数据库用户的字数不能大于40"});
                    flag = false
                } else {
                    this.setState({"dbUserValidateMessage": ""});
                }
                break;
            case "dbPasswd":
                if (_.isEmpty(value)) {
                    this.setState({"dbPasswdValidateMessage": "请输入数据库密码"});
                    flag = false;
                } else if (value.length > 40) {
                    this.setState({"dbPasswdValidateMessage": "数据库密码的字数不能大于40"});
                    flag = false
                } else {
                    this.setState({"dbPasswdValidateMessage": ""});
                }
                break;



            default:
                break;
        } 
        return flag;

    },


    getInitialState: function () {
        var resourceId = this.props.params.resourceId;
        mode = this.props.params.mode;
        if(mode === "edit"){
            Actions.init(resourceId);
        }
        return {};
    },
    componentDidMount: function () {
        //console.log("componentDidMount");

        $('#id-date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        })
    },
    _handleNewTableMappingClick: function(){//根据resourceId批量生成tableMapping
            bootbox.confirm("需要生成ColumnMapping吗？", function (result) {
                if (result) {
                    Actions.newTableMapping(this.state.resourceId,1);//生成ColumnMapping
                }else{
                    Actions.newTableMapping(this.state.resourceId,0);//不生成ColumnMapping
                }
            });
            

        },
    render: function () {

        var nameValidateMessage = this.state.nameValidateMessage;
        var classnameForName = null;
        var nameValidateIcon = null;
        var errMsgForName = null;
        if (_.isUndefined(nameValidateMessage)) {
            classnameForName = "form-group";
        } else if (_.isEmpty(nameValidateMessage)) {
            classnameForName = "form-group has-success";
            errMsgForName = null;
            nameValidateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            classnameForName = "form-group has-error";
            errMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {nameValidateMessage} </div>;
            nameValidateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }

        // TODO 需要封装
        var typeValidateMessage = this.state.typeValidateMessage;
        var typeclassnameForName = null;
        var typeValidateIcon = null;
        var typeerrMsgForName = null;
        if (_.isUndefined(typeValidateMessage)) {
            typeclassnameForName = "form-group";
        } else if (_.isEmpty(typeValidateMessage)) {
            typeclassnameForName = "form-group has-success";
            typeerrMsgForName = null;
            typeValidateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            typeclassnameForName = "form-group has-error";
            typeerrMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {typeValidateMessage} </div>;
            typeValidateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }


        var dbLinkValidateMessage = this.state.dbLinkValidateMessage;
        var dbLinkclassnameForName = null;
        var dbLinkValidateIcon = null;
        var dbLinkerrMsgForName = null;
        if (_.isUndefined(dbLinkValidateMessage)) {
            dbLinkclassnameForName = "form-group";
        } else if (_.isEmpty(dbLinkValidateMessage)) {
            dbLinkclassnameForName = "form-group has-success";
            dbLinkerrMsgForName = null;
            dbLinkValidateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            dbLinkclassnameForName = "form-group has-error";
            dbLinkerrMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {dbLinkValidateMessage} </div>;
            dbLinkValidateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }

        var dbUserValidateMessage = this.state.dbUserValidateMessage;
        var dbUserclassnameForName = null;
        var dbUserValidateIcon = null;
        var dbUsererrMsgForName = null;
        if (_.isUndefined(dbUserValidateMessage)) {
            dbUserclassnameForName = "form-group";
        } else if (_.isEmpty(dbUserValidateMessage)) {
            dbUserclassnameForName = "form-group has-success";
            dbUsererrMsgForName = null;
            dbUserValidateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            dbUserclassnameForName = "form-group has-error";
            dbUsererrMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {dbUserValidateMessage} </div>;
            dbUserValidateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }

        var dbPasswdValidateMessage = this.state.dbPasswdValidateMessage;
        var dbPasswdclassnameForName = null;
        var dbPasswdValidateIcon = null;
        var dbPasswderrMsgForName = null;
        if (_.isUndefined(dbPasswdValidateMessage)) {
            dbPasswdclassnameForName = "form-group";
        } else if (_.isEmpty(dbPasswdValidateMessage)) {
            dbPasswdclassnameForName = "form-group has-success";
            dbPasswderrMsgForName = null;
            dbPasswdValidateIcon = <i className="ace-icon fa fa-check-circle"></i>
        } else {
            dbPasswdclassnameForName = "form-group has-error";
            dbPasswderrMsgForName = <div className="help-block col-xs-12 col-sm-reset inline"> {dbPasswdValidateMessage} </div>;
            dbPasswdValidateIcon = <i className="ace-icon fa fa-times-circle"></i>
        }




        return (
            <div className="row">
                <div className="col-xs-12">

                    <form className="form-horizontal" role="form">

                        <div className={classnameForName}>
                            <label htmlFor="name" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 资源名称12345 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="resourceName" className="width-100" valueLink={this.linkState('resourceName')} onBlur={this.validateForm.bind(this, "resourceName")} placeholder="资源名称" />
                                    {nameValidateIcon}
                                </span>

                            </div>
                            {errMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="resourceType" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 资源种类 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <select id="resourceType" className="width-100" valueLink={this.linkState('resourceType')} onBlur={this.validateForm.bind(this, "resourceType")} >
                                        <option value="none">选择资源种类</option>
                                        <option value="01">DB</option>
                                        <option value="02">GEMFIRE</option>
                                    </select>
                                    {typeValidateIcon}
                                </span>
                            </div>
                            {typeerrMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbLink" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库连接 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="dbLink" className="width-100" valueLink={this.linkState('dbLink')} onBlur={this.validateForm.bind(this, "dbLink")} placeholder="数据库连接" />
                                    {dbLinkValidateIcon}
                                </span>
                            </div>
                            {dbLinkerrMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbUser" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库用户 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="dbUser" className="width-100" valueLink={this.linkState('dbUser')}  onBlur={this.validateForm.bind(this, "dbUser")} placeholder="数据库用户" />
                                    {dbUserValidateIcon}
                                </span>
                            </div>
                            {dbUsererrMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbPasswd" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库密码 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="password" id="dbPasswd" className="width-100" valueLink={this.linkState('dbPasswd')}  onBlur={this.validateForm.bind(this, "dbPasswd")} placeholder="数据库密码" />
                                    {dbPasswdValidateIcon}
                                </span>
                            </div>
                            {dbPasswderrMsgForName}
                        </div>

                        <div className="space-4"></div>

                        <div className="clearfix form-actions">
                            <div className="col-md-offset-3 col-md-9">
                                <button className="btn btn-info" type="button" onClick={this._handleClick}>
                                    <i className="ace-icon fa fa-check bigger-110"></i>
                                    保存
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                <button className="btn" type="connect" onClick={this._handleConnectClick}>
                                    <i className="ace-icon fa fa-undo bigger-110"></i>
                                    测试连接
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                <button className="btn btn-sm btn-white btn-warning btn-round" onClick={this._handleNewTableMappingClick}>
                                    <i className="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                    生成TableMapping 
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