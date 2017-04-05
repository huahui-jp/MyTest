/**
 * actionJobDetail.page.js 
 *
 * actionJob管理-detail
 * zhoujiang 20160321
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
    
var Table = require('../../component/table-grid/table');
var TableStore = require('../../component/table-grid/store');
var Column = require('../../component/table-grid/table-column');

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
    validations: [
        {"input":"tableMappingId","inputType":"select","name":"数据库表逻辑名","isRequire":true},
        {"input":"actionJobType","inputType":"select","name":"JOB类型","isRequire":true},
        {"input":"batchUpdateCnt","inputType":"text","name":"update阈值","isRequire":true,"maxLength":20},
        {"input":"messageChannelName","inputType":"text","name":"消息队列名","isRequire":true,"maxLength":20},
        {"input":"keyColumn","inputType":"text","name":"主键名","isRequire":true,"maxLength":20},
        {"input":"enableSaveHistory","inputType":"select","name":"是否保存履历","isRequire":true}
    ],
    mode:'', //"add","edit","view"
    /*-----------------------------------系统触发事件-----------------------------*/
        /**
     * 画面初始化
     * 画面第一次进入时触发
     */
    getInitialState: function () {
        var actionJobId = this.props.params.actionJobId;
        var tableMappingId = this.props.params.tableMappingId;

        this.mode = this.props.params.mode;
        if(this.mode === "edit"){
            Actions.init(actionJobId);
            Actions.search({
                actionJobId: this.props.params.actionJobId,
                currentPage: 0,
                querystring: ""
            });
        }
        if(this.mode === "add"){
            Actions.searchTableMapping(null);
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
                    actionJobId: params.obj.actionJobId,
                    tableMappingId: params.obj.tableMappingId,
                    actionJobType: params.obj.actionJobType,
                    batchUpdateCnt: params.obj.batchUpdateCnt,
                    messageChannelName: params.obj.messageChannelName,
                    enableSaveHistory: params.obj.enableSaveHistory,
                    keyColumn: params.obj.keyColumn
                });
            }  
            if(params.rows){
                this.setState({
                    rows: params.rows,
                    rowsTotoal: params.rowsTotoal,
                    currentPage: params.currentPage
                });

            }

            if(params.tableMappingList){
                //动态添加option到select数据库表物理名中
                var tableMappingListOptions = [];
                
                var i = 1;
                if(this.mode === "add"){
                    tableMappingListOptions[0] = React.createElement('option', 
                    {value: ""},"请选择TableMapping");

                    for(var p in params.tableMappingList){
                        tableMappingListOptions[i] = React.createElement(
                            'option', 
                            {value: params.tableMappingList[p].tableMappingId},
                            params.tableMappingList[p].tableNameView);
                        i++;
                    }
                    if(tableMappingListOptions.length > 1){
                        
                        this.setState({"tableMappingListOptions":tableMappingListOptions});
                        // console.log("set tableMappingListOptions  ---  "+this.state.tableMappingListOptions);
                    }

                }else{
                    tableMappingListOptions[0] = React.createElement(
                            'option', 
                            {value: params.tableMappingList[0].tableMappingId},
                            params.tableMappingList[0].tableNameView);
                    this.setState({"tableMappingListOptions":tableMappingListOptions});
                }

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
        // if(!this.validateForm("actionJobType") 
        //     || !this.validateForm("batchUpdateCnt")
        //     || !this.validateForm("messageChannelName")
        //     || !this.validateForm("enableSaveHistory")
        //     || !this.validateForm("keyColumn") ){
         if(!this.validateForm()){return;};

        if(this.mode == "add"){
            Actions.add({
                actionJobId: this.state.actionJobId,
                tableMappingId: this.state.tableMappingId,
                actionJobType: this.state.actionJobType,
                batchUpdateCnt: this.state.batchUpdateCnt,
                messageChannelName: this.state.messageChannelName,
                enableSaveHistory: this.state.enableSaveHistory,   
                keyColumn: this.state.keyColumn,
                deleteFlg: "0"
            });
        }else if(this.mode == "edit"){
            Actions.edit({
                actionJobId: this.state.actionJobId,
                tableMappingId: this.state.tableMappingId,
                actionJobType: this.state.actionJobType,
                batchUpdateCnt: this.state.batchUpdateCnt,
                messageChannelName: this.state.messageChannelName,
                enableSaveHistory: this.state.enableSaveHistory,   
                keyColumn: this.state.keyColumn,
                deleteFlg: "0"
            });
        }
        
    },
    // /**
    //  * checkBox事件 更新state
    //  */
    // enableSaveHistoryChange: function(){
    //     var nextChecked = !this.state.enableSaveHistory;
    //     this.state.enableSaveHistory = nextChecked;

    //     // console.log("enableSaveHistoryChange",this.state.enableSaveHistory);
    // },
    /**
     * 启动按钮
     */
    startJob: function () {
        Actions.start(this.state.actionJobId);
    },
    /**
     * 停止按钮
     */
    endJob: function () {
        Actions.end(this.state.actionJobId);
    },
    /*-----------------------------------table相关事件-----------------------------*/
    /**
     * table加载行数据
     */
    rowGetter: function (rowIndex) {
        //console.log(rowIndex);
        return this.state.rows[rowIndex];
    },
    /**
     * 双击行的事件
     */
    _onRowDblClick: function (event, rowId, rowData, checked) {
        messageUtil.addGritter({text: rowData.resourceName});
        //TODO 弹出Detail画面

    },
    /**
     * 分页按钮的事件 待封装
     */
    _onNavigationBtnClick: function (pageNo, navigationInfo) {
        Actions.search({
            currentPage: pageNo,
            querystring: this.state.querystring
        });

    },
    /*-----------------------------------画面Layout-----------------------------*/
    render: function () {
        

        console.log("get this.state.tableMappingListOptions--->"+this.state.tableMappingListOptions);

        if(this.mode === "edit"){
            this.table = React.createElement(Table, {
                rowGetter: this.rowGetter,//获得记录数据，每页都从0开始
                rowsTotoal: this.state.rowsTotoal, //记录总数
                currentPage: this.state.currentPage, //当前页码，从0开始
                // headerDataGetter: this._headerDataGetter, //表头格式化方法
                onRowClick: this._onRowClick, //记录行单击事件
                onRowDblClick: this._onRowDblClick, //记录行双击事件
                onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
                rowIdColumn: "actionJobHistoryId", //唯一标识每行记录的字段
                // rowSelected: true,//选择一行是否触发checkbox
                id: "demoList"
            }, [
                // <Column dataKey="checkbox" label="" inputType="checkbox"/>,
                <Column dataKey="id" label="ID" hidden={true} />,
                <Column label="JOB履历ID" dataKey="actionJobHistoryId" width={50} />,
                <Column label="JOBID" dataKey="actionJobId" />,
                <Column label="开始时间"  dataKey="startTimeStr" width={50}  />,
                <Column label="错误时间" dataKey="startError" width={100} />,
                <Column label="结束时间" dataKey="endTimeStr" />,
                <Column label="更新数量" dataKey="updateCnt" width={50} />,
                <Column label="错误数量" dataKey="errorCnt" />]);

        }




        return (
            <div className="row">
                <div className="col-xs-12">

                    <form className="form-horizontal" role="form">
                        <div className="form-group has-error col-xs-12"> {this.state.validateMessage} </div>
                        <div className="form-group">
                            <label htmlFor="tableMappingId" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 数据库表逻辑名 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <select id="tableMappingId" className="width-100" valueLink={this.linkState('tableMappingId')} onBlur={this.validateInput.bind(this, "tableMappingId")} >
                                        {this.state.tableMappingListOptions}
                                    </select>
                                </span>

                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="actionJobType" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> JOB类型 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <select id="actionJobType" className="width-100" valueLink={this.linkState('actionJobType')} onBlur={this.validateInput.bind(this, "actionJobType")} >
                                        <option value="">选择JOB类型</option>
                                        <option value="1">常时</option>
                                        <option value="2">定时</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="batchUpdateCnt" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> BatchUpdate阀值 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="batchUpdateCnt" className="width-100" valueLink={this.linkState('batchUpdateCnt')} onBlur={this.validateInput.bind(this, "batchUpdateCnt")} placeholder="BatchUpdate阀值" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="messageChannelName" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 消息队列名 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="messageChannelName" className="width-100" valueLink={this.linkState('messageChannelName')}  onBlur={this.validateInput.bind(this, "messageChannelName")} placeholder="消息队列名" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keyColumn" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 主键名称 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" id="keyColumn" className="width-100" valueLink={this.linkState('keyColumn')}  onBlur={this.validateInput.bind(this, "keyColumn")} placeholder="主键名称" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="enableSaveHistory" className="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right"> 是否保存履历 </label>

                            <div className="col-xs-12 col-sm-4">
                                <span className="block input-icon input-icon-right">
                                    <select id="enableSaveHistory" className="width-100" valueLink={this.linkState('enableSaveHistory')} onBlur={this.validateInput.bind(this, "enableSaveHistory")} >
                                        <option value="">是否保存履历</option>
                                        <option value="1">是</option>
                                        <option value="0">否</option>
                                    </select>
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
                                <button className="btn" type="connect" onClick={this.startJob}>
                                    <i className="ace-icon fa fa-undo bigger-110"></i>
                                    启动JOB
                                </button>

                            &nbsp; &nbsp; &nbsp;
                                <button className="btn" type="connect" onClick={this.endJob}>
                                    <i className="ace-icon fa fa-undo bigger-110"></i>
                                    停止JOB
                                </button>
                            </div>
                        </div>
                    </form>
                    {this.table}
                </div>
            </div>
        );
        //console.log("state", this.state);
    }
});
module.exports = page;

//  <!-- <input type="checkbox" id="enableSaveHistory" className="width-100" checked={this.state.enableSaveHistory}  onChange={this.enableSaveHistoryChange} />-->