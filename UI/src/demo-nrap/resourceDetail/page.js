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
var messageUtil  = require('../../common/messageUtil');
var Validation  = require('react-validation'); 
var Validator  = require('validator');
var ValidationMixin = require('../../mixin/validationMixin');

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var page = React.createClass({
    mixins: [
        Reflux.listenTo(Store, "onStatusChange"),
        React.addons.LinkedStateMixin,
        Navigation,
        Reflux.listenTo(PageRouterStore, ""),
        ValidationMixin 
    ],
    /*-----------------------------------表单设置-----------------------------*/
    mode:'', //模式: "add","edit","view"
    validations: [
    {"input":"resourceName","inputType":"text","name":"资源名称","isRequire":true,"maxLength":20},
    {"input":"resourceType","inputType":"select","name":"资源类型","isRequire":true,"maxLength":20},
    {"input":"dbLink","inputType":"text","name":"DB连接","isRequire":true,"maxLength":20},
    {"input":"dbUser","inputType":"text","name":"用户名","isRequire":true,"maxLength":20},
    {"input":"dbPasswd","inputType":"text","name":"密码","isRequire":true,"maxLength":20},
    ],
    /*-----------------------------------系统触发事件-----------------------------*/
        /**
     * 画面初始化
     * 画面第一次进入时触发
     */
    getInitialState: function () {
        var resourceId = this.props.params.resourceId;
        this.mode = this.props.params.mode;
        if(this.mode === "edit"){
            Actions.init(resourceId);
        }
        return {};
    },
    /**
     * store提交trigger时触发事件
     * 在mixins中监听
     */
    onStatusChange: function (params) {
        if (params.message && params.message !== ""){
            //显示提示信息
            messageUtil.addGritter({text:params.message});
        }else{
            if(params.obj){
                this.setState({
                    resourceId: params.obj.resourceId,
                    resourceName: params.obj.resourceName,
                    resourceType: params.obj.resourceType,
                    dbLink: params.obj.dbLink,
                    dbUser: params.obj.dbUser,
                    dbPasswd: params.obj.dbPasswd
                });
            }   
        }
    },
    /**
     * 高亮显示
     */
    componentDidMount: function () {
        //console.log("componentDidMount");
        $('#id-date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        })
    },
    /*-----------------------------------自定义按钮事件-----------------------------*/
    /**
     * 保存按钮
     */
    saveHandler: function () {
        // console.log("_handleClick", this.state);
        if(!this.validateForm()){return;};

        if(this.mode == "add"){
            Actions.add({
                resourceName: this.state.resourceName,
                resourceType: this.state.resourceType,
                dbLink: this.state.dbLink,
                dbUser: this.state.dbUser,   
                dbPasswd: this.state.dbPasswd,
                resourceFlg: "1",
                deleteFlg: "0"
            });
        }else if(this.mode == "edit"){
            Actions.edit({
                resourceId: this.props.params.resourceId,
                resourceName: this.state.resourceName,
                resourceType: this.state.resourceType,
                dbLink: this.state.dbLink,
                dbUser: this.state.dbUser,
                dbPasswd: this.state.dbPasswd,
                resourceFlg: "1",
                deleteFlg: "0"
            });
        }
        
    },
    /**
     * 测试连接按钮
     */
    connectHandler: function () {
        Actions.connect({
            resourceId:this.state.resourceId,
            dbLink:this.state.dbLink,
            dbUser:this.state.dbUser,
            dbPasswd:this.state.dbPasswd
        });
    },
    /**
     * 生成TableMapping按钮
     */
    newTableMappingHandler: function(){//根据resourceId批量生成tableMapping
        bootbox.confirm("需要生成ColumnMapping吗？", function (result) {
            if (result) {
                Actions.newTableMapping(this.props.params.resourceId,1);//生成ColumnMapping
            }else{
                Actions.newTableMapping(this.props.params.resourceId,0);//不生成ColumnMapping
            }
        });
    },
    /*-----------------------------------表单相关事件-----------------------------*/
    //无
    /*-----------------------------------画面Layout-----------------------------*/
    render: function () {

        var newTable = null;
        if(this.mode==="edit"){
            newTable = <button className="btn btn-warning" onClick={this.newTableMappingHandler}>
                <i className="ace-icon fa fa-undo bigger-110"></i>
                    生成TableMapping 
            </button>;

        }
        return (
            <div className="row">
                <div className="col-xs-12">

                    <form className="form-horizontal" role="form">
                        <div className="form-group has-error col-xs-12"> {this.state.validateMessage} </div>
                        <div className="form-group">
                            <label htmlFor="name" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 资源名称 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="resourceName" className="width-100" valueLink={this.linkState('resourceName')} onBlur={this.validateInput.bind(this, "resourceName")} placeholder="资源名称" />
                                </span>

                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="resourceType" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 资源种类 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <select id="resourceType" className="width-100" valueLink={this.linkState('resourceType')} onBlur={this.validateInput.bind(this, "resourceType")} >
                                        <option value="">选择资源种类</option>
                                        <option value="01">DB</option>
                                        <option value="02">GEMFIRE</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbLink" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库连接 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="dbLink" className="width-100" valueLink={this.linkState('dbLink')} onBlur={this.validateInput.bind(this, "dbLink")} placeholder="数据库连接" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbUser" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库用户 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="dbUser" className="width-100" valueLink={this.linkState('dbUser')}  onBlur={this.validateInput.bind(this, "dbUser")} placeholder="数据库用户" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dbPasswd" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库密码 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="password" id="dbPasswd" className="width-100" valueLink={this.linkState('dbPasswd')}  onBlur={this.validateInput.bind(this, "dbPasswd")} placeholder="数据库密码" />
                                </span>
                            </div>
                        </div>

                        <div className="space-4"></div>

                        <div className="clearfix form-actions">
                            <div className="col-md-offset-3 col-md-9">
                                <button className="btn btn-info" type="button" onClick={this.saveHandler}>
                                    <i className="ace-icon fa fa-check bigger-110"></i>
                                    保存
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                <button className="btn" type="connect" onClick={this.connectHandler}>
                                    <i className="ace-icon fa fa-undo bigger-110"></i>
                                    测试连接
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                {newTable}
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