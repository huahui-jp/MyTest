/**
 * actionJobHisList.page.js
 * 
 * actionJob履历管理List画面
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
            actionJobId: this.props.params.actionJobId,
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
     * 导出按钮事件
     */
    _handleExportClick: function (param) {
        //TODO
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
     * 点击行的事件
     */
    _onRowClick: function (event, rowId, rowData, checked) {
        // console.log("_onRowClick--->"+rowData);
        //选中的记录有有没有hasChild为true的
        if(typeof checked === "undefined"){
            checked = false;
        }
        if(rowData.hasChild){
            if(!checked){//当前行如果被选中,统计hasChild的数量
                hasChildNum ++;
            }else{
                hasChildNum --;
            }
            messageUtil.addGritter({text: hasChildNum});
        }
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
            rowIdColumn: "actionJobHistoryId", //唯一标识每行记录的字段
            // rowSelected: true,//选择一行是否触发checkbox
            id: "demoList"
        }, [
            // <Column dataKey="checkbox" label="" inputType="checkbox"/>,
            <Column dataKey="id" label="ID" hidden={true} />,
            <Column label="JOB履历ID" dataKey="actionJobHistoryId" width={50} />,
            <Column label="JOBID" dataKey="actionJobId" />,
            <Column label="开始时间"  dataKey="startTime" width={50}  />,
            <Column label="错误时间" dataKey="startError" width={100} />,
            <Column label="结束时间" dataKey="endTime" />,
            <Column label="更新数量" dataKey="updateCnt" width={50} />,
            <Column label="错误数量" dataKey="errorCnt" />]);

        return (
            <div className="row ">
                <div className="col-xs-12 dataTables_wrapper  form-inline">
                    <div className="row" style={{"paddingBottom": "0px"}}>
                        <div className="col-xs-6">
                            <button className="btn btn-sm btn-white btn-warning btn-round" onClick={this._handleExportClick}>
                                <i className="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                导出
                            </button>
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