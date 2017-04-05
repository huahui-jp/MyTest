var React = require('react/addons');
var shallowEqual = require("react/lib/shallowEqual");
var Reflux = require('reflux');
var Actions = require('./actions');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;
var _ = require('lodash');
var constants = require('../../common/constants.js');
var TableHeader = require('../../component/table-grid/table-header');
var TableFooter = require('../../component/table-grid/table-footer');
var TableRow = require('../../component/table-grid/table-row');
var Store = require('./store');

'use strict';

var golMyTableDate ;

global.golMyTableDate; //TODO

var page = React.createClass({
    mixins: [
        ReactComponentWithPureRenderMixin,
        Reflux.connect(Store, "tableState")
    ],

    getInitialState: function () /*object*/ {
        console.log("getInitialState");
        return null;
    },

    navigationInfo: null,

    getDefaultProps: function () {
        //console.log("getDefaultProps");
        return {
            pageSize: constants.PAGE_SIZE,
            rowSelected:true
        }
    },

    componentWillMount: function () {
        // console.log("componentWillMount");
        Actions.init(this.props.id,this._getNavigationInfo());

    },

    componentDidMount: function () {
        // console.log("componentDidMount");

    },

    componentDidUpdate: function () {
        // console.log("componentDidUpdate",this.props.id);

    },

    componentWillReceiveProps: function (nextProps) {
        // console.log("componentWillReceiveProps");
        Actions.cleanCheckArray();
    },

    componentWillUnmount: function () {
        // console.log("componentWillUnmount");
        Actions.cleanCheckArray();

    },

    _getHeadData: function (/*array*/ columns) /*object*/ {
        var headData = {};
        for (var i = 0; i < columns.length; ++i) {
            var columnProps = columns[i].props;
            //console.log(this.props.headerDataGetter);
            if (this.props.headerDataGetter) {
                headData[columnProps.dataKey] =
                    this.props.headerDataGetter(columnProps.dataKey, columnProps);
            } else {
                headData[columnProps.dataKey] = columnProps.label || '';
            }
        }
        return headData;
    },

    _getNavigationInfo: function () {

        var rowsTotoal = this.props.rowsTotoal;
        var currentPage = this.props.currentPage;
        var pageSize = this.props.pageSize;
        var fromRowNumber = null;
        var toRowNumber = null;
        var rowsCount = null;
        var pages = parseInt((rowsTotoal - 1) / pageSize, 10) + 1; //TODO Pagesize
        if (currentPage > pages) {
            console.error("当前页码超出总页码!设置第一页!");
            currentPage = 0;
        }
        if (rowsTotoal == 0 || pageSize == 0) {
            currentPage = 1;
            fromRowNumber = 0;
            toRowNumber = 0;
            rowsCount = 0;
        } else {
            fromRowNumber = currentPage * pageSize + 1;
            if (rowsTotoal <= pageSize) {
                toRowNumber = rowsTotoal;
            } else if ((currentPage + 1) * pageSize <= rowsTotoal) {
                toRowNumber = (currentPage + 1) * pageSize;
            } else {
                toRowNumber = currentPage * pageSize + rowsTotoal % pageSize;
            }
            currentPage = currentPage + 1;
            rowsCount = toRowNumber - fromRowNumber + 1;
        }
        var isLastPage = fromRowNumber + pageSize >= rowsTotoal;
        var isFirstPage = currentPage <= 1;

        return {
            rowsTotoal: rowsTotoal,//记录总数
            currentPage: currentPage,//当前页码，内部从1开始
            pageSize: pageSize,//每页记录数，默认20
            fromRowNumber: fromRowNumber,//开始记录序号，从1开始
            toRowNumber: toRowNumber,//结束记录序号
            rowsCount: rowsCount,//本页记录数
            pages: pages,//共几页
            isLastPage: isLastPage,
            isFirstPage: isFirstPage,
            onNavigationBtnClick: this.props.onNavigationBtnClick //翻页按钮事件
        }
    },


    render: function () {

        var children = [];
        var rowGetter = this.props.rowGetter;
        var rows = [];

        ReactChildren.forEach(this.props.children, function (child, index) {
            if (child == null) {
                return;
            }
            children.push(child);
        });

        //console.log(children);

        var headData = this._getHeadData(children);

        this.navigationInfo = this._getNavigationInfo();

        var navigationInfo = this.navigationInfo;

        //console.log("render", this.navigationInfo);

        var rowsCount = this.navigationInfo.rowsCount;

        var rowIds = [];
        var myTableData = [];//定义Table数据
        for (var i = 0; i < rowsCount; ++i) {
            var rowData = rowGetter(i);
            var rowId = rowData[this.props.rowIdColumn];
            rowIds[i]=rowId;
            myTableData.push(rowData);//生成Table数据
            rows.push(
                React.createElement(TableRow, {
                        rowIdColumn:this.props.rowIdColumn,
                        key: i,
                        index: i,
                        data: rowData,
                        columns: children,
                        navigationInfo: {navigationInfo},
                        onClick: this.props.onRowClick,
                        onDoubleClick: this.props.onRowDblClick,
                        rowSelected: this.props.rowSelected
                    }
                )
            );
        }
        // this.state.tableState.myTableData = myTableData;
        Actions.initMyTableData(myTableData);//把table数据保存到store中
        // console.log("initMyTableData----->"+myTableData);

        var selectedRowIds = null;
        if(this.state.tableState.selectedRowIds){
            selectedRowIds=_(this.state.tableState.selectedRowIds).toString();
        }
        var myTableDataString = null;
        if(global.golMyTableDate){
            myTableDataString=JSON.stringify(global.golMyTableDate);
        }
        //console.log("selectedRowIds in render",selectedRowIds);
        return (

            <span>
                <div id={this.props.id} className="row" style={{"width": "550px"},{"height": "500px"},{"overflow":"auto"}} >
                    <table  className="table table-striped table-bordered table-hover dataTable">
                        <thead>
                            <TableHeader
                                headData={headData}
                                columns={children}
                                rowIds={rowIds}
                                navigationInfo={this.navigationInfo}>
                            </TableHeader>
                        </thead>
                        {/*必须包括tbody标签，否则会在翻页的时候报错*/}
                        <tbody>
                            {rows}
                        </tbody>

                    </table>
                    <div id="selectedRowIds" style={{display:"none"}} >{selectedRowIds}</div>
                    <div id="myTableDataString" ref="myTableDataString" style={{display:"none"}} >{myTableDataString}</div>
                </div>
                <TableFooter navigationInfo={this.navigationInfo}></TableFooter>
            </span>

        );
    }
});
module.exports = page;