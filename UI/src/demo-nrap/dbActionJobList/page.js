/**
 * actionJobList.page.js
 * 
 * ActionJob管理List画面
 * 
 * @author zhoujiang
 */
var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../../pageRouter/actions');
var PageRouterStore = require('../../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Table = require('../../component/table-grid/table');
var TableStore = require('../../component/table-grid/store');
var Column = require('../../component/table-grid/table-column');
var Link = require('react-router').Link;
var Gritter = require('../../component/gritter');
var _ = require('lodash');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var constants = require('../../common/constants.js');
var messageUtil  = require('../../common/messageUtil');

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var hasChildNum = 0;

var page = React.createClass({
    mixins: [
        Reflux.listenTo(Store, "onStatusChange"),
        Navigation,
        OverlayMixin,
        React.addons.LinkedStateMixin,
        Reflux.listenTo(PageRouterStore, "")
    ],
    // hasChildNum : 0,//选中hasChild的行数
    table: null,
    /*-----------------------------------系统触发事件-----------------------------*/
    /**
     * 画面初始化
     * 画面第一次进入时触发
     */
    getInitialState: function () {
        Actions.search({
            currentPage: 0,
            querystring: ""
        });
        return {list: []};
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
            this.setState({
                rows: params.rows,
                rowsTotoal: params.rowsTotoal,
                currentPage: params.currentPage
            });
        }
    },
    /*-----------------------------------自定义按钮事件-----------------------------*/
    /**
     * 查询按钮抬起事件
     */
    _searchKeyUp: function (evt) {
        Actions.search({
            currentPage: this.state.currentPage,
            querystring: this.state.querystring
        });
    },
    /**
     * 删除按钮事件
     */
    _handleDeleteClick: function (param) {
        //console.log("_handleDeleteClick",param);
        var selectedString = $("#selectedRowIds")[0].innerHTML;
        if (_.isUndefined(selectedString) || _.isEmpty(selectedString)) {
            messageUtil.addGritter({text:"至少选择一条记录!"});
            // this.handleToggle();
            return;
        }
        bootbox.confirm("确认删除吗？", function (result) {
            if (result) {
                Actions.delete(selectedString); 
            }
        });
    },
    /**
     * 编辑按钮事件
     */
    _handleEditClick: function () {
        var selectedString = $("#selectedRowIds")[0].innerHTML;
        if (_.isUndefined(selectedString) || _.isEmpty(selectedString) || selectedString.indexOf(",")>-1) {
            messageUtil.addGritter({text: "请选择一条记录！"});
            //this.handleToggle();
            return;
        }
        PageRouterActions.navigateTo('#/dbActionJobDetailPage/edit&'+selectedString);
    },
    /**
     * 查看履历按钮事件
     */
    _handleHisListClick: function () {
        var selectedString = $("#selectedRowIds")[0].innerHTML;
        if (_.isUndefined(selectedString) || _.isEmpty(selectedString) || selectedString.indexOf(",")>-1) {
            messageUtil.addGritter({text: "请选择一条记录！"});
            //this.handleToggle();
            return;
        }
        PageRouterActions.navigateTo('#/dbActionJobHisListPage/'+selectedString);
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
    /*-----------------------------------画面layout-----------------------------*/
    /**
     * 画面Layout 
     * state变化时触发
     */
    render: function () {

        //console.log("state", this.state);

        this.table = React.createElement(Table, {
            rowGetter: this.rowGetter,//获得记录数据，每页都从0开始
            rowsTotoal: this.state.rowsTotoal, //记录总数
            currentPage: this.state.currentPage, //当前页码，从0开始
            // headerDataGetter: this._headerDataGetter, //表头格式化方法
            onRowClick: this._onRowClick, //记录行单击事件
            onRowDblClick: this._onRowDblClick, //记录行双击事件
            onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
            rowIdColumn: "actionJobId", //唯一标识每行记录的字段
            rowSelected: true,//选择一行是否触发checkbox
            id: "actionJobList"
        }, [
            <Column dataKey="checkbox" label="" inputType="checkbox"/>,
            <Column dataKey="id" label="ID" hidden={true} />,
            <Column label="JOBID" dataKey="actionJobId" hidden={true}/>,
            <Column label="tableId" dataKey="tableMappingId" hidden={true}/>,
            <Column label="任务种类"  dataKey="actionJobType" width={50} cellRender={this.typeCellRender} />,
            <Column label="数据提交阀值" dataKey="batchUpdateCnt" width={50} />,
            <Column label="数据通道名称" dataKey="messageChannelName" />,
            <Column label="保存履历" dataKey="enableSaveHistory"  cellRender={this.enSaveHisCellRender}/>,
            <Column label="主键名称" dataKey="keyColumn" width={50} cellRender={this.childCellRender}/>,
            <Column label="运行状态" dataKey="runStatus" width={50} />]);

        return (
            <div className="row ">
                <div className="col-xs-12 dataTables_wrapper  form-inline">
                    <div className="row" style={{"paddingBottom": "0px"}}>
                        <div className="col-xs-6">
                            <Link className="btn btn-sm btn-white btn-info btn-round" to="/dbActionJobDetailPage/add&-1">
                                <i className="ace-icon fa fa-plus-circle blue bigger-120 "></i>
                                新增
                            </Link>
                        &nbsp;
                            <button className="btn btn-sm btn-white btn-default btn-round" onClick={this._handleEditClick}>
                                <i className="ace-icon fa fa-pencil align-top bigger-120 "></i>
                                详细
                            </button>
                        &nbsp;
                         </div>
                        <div className="col-xs-6">
                            <div id="sample-table-2_filter" className="dataTables_filter">
                                <input type="search" valueLink={this.linkState('querystring')} onKeyUp={this._searchKeyUp} className="form-control input-sm" placeholder="查询..." aria-controls="sample-table-2"></input>
                            </div>
                        </div>
                    </div>

                {this.table}

                </div>
            </div>
        );
    },
            /**
     * 生成列内容:序号
     */
    _xuhaoCellRender: function (cellData, cellDataKey, rowData, cellIndex, rowIndex) {

        var xuhao = rowIndex + 1;
        return xuhao;
    },
    /**
     * 转换字段内容：ActionJob种类
     */
    typeCellRender: function (cellData, cellDataKey, rowData, cellIndex, rowIndex) {

        var res = rowData["actionJobType"];
        if(res === "1"){
            return "常时";
        }else if(res === "2"){
            return "定时";
        }
        return res;
    },
    /**
     * 转换字段内容：是否保存履历
     */
    enSaveHisCellRender: function (cellData, cellDataKey, rowData, cellIndex, rowIndex) {

        var res = rowData["enableSaveHistory"];
        if(res === "1"){
            return "是";
        }else if(res === "0"){
            return "否";
        }
        return res;
    },
    _handleToggle: function () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },
    renderOverlay: function () {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <Modal title="Modal heading" onRequestHide={this._handleToggle}>
                <div className="modal-body">
                    This modal is controlled by our custom trigger component.
                </div>
                <div className="modal-footer">
                    <Button onClick={this._handleToggle}>Close</Button>
                </div>
            </Modal>
        );
    }
})
;
module.exports = page;