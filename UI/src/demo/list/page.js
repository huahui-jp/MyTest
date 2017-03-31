var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../../pageRouter/actions');
var PageRouterStore = require('../../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Table = require('../../component/table-grid/table');
var Column = require('../../component/table-grid/table-column');
var Link = require('react-router').Link;
var Gritter = require('../../component/gritter');
var Constants = require('../../common/constants');
var _ = require('lodash');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;



var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var page = React.createClass({
        mixins: [
            Reflux.listenTo(Store, "onStatusChange"),
            Navigation,
            OverlayMixin,
            React.addons.LinkedStateMixin,
            Reflux.listenTo(PageRouterStore, "")
        ],

        onStatusChange: function (listData) {
            this.setState({
                rows: listData.rows,
                rowsTotoal: listData.rowsTotoal,
                deleteOk: listData.deleteOk,
                currentPage: listData.currentPage
            }, function () {
                if (listData.deleteOk) {
                    Gritter.add({
                        title: '提示',
                        text: '删除成功！',
                        //image: 'assets/avatars/avatar.png',
                        sticky: false,
                        time: '2000',
                        class_name: 'gritter-light '
                    });
                }
            });
        },

        table: null,

        getInitialState: function () {
            return Store.getInitialState();
        },

        componentWillMount: function () {
            console.log("componentWillMount");
            //Actions.init();
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
        },

        rowGetter: function (rowIndex) {
            //console.log(rowIndex);
            return this.state.rows[rowIndex];
        },

        nameCellRender: function (cellData,
                                  cellDataKey,
                                  rowData,
                                  cellIndex,
                                  rowIndex) {

            var name1 = rowData["firstName"];
            var name2 = rowData["lastName"];
            var id = rowData["id"];
            var to= "/demoDetailPage/"+id;
            return <Link to={to}>{name1 + " " + name2}</Link>;

        },

        dateCellRender: function (cellData,
                                  cellDataKey,
                                  rowData,
                                  cellIndex,
                                  rowIndex) {

            var date = rowData[cellDataKey];
            return date.toLocaleDateString();

        },

        _xuhaoCellRender: function (cellData,
                                    cellDataKey,
                                    rowData,
                                    cellIndex,
                                    rowIndex) {

            var xuhao = rowIndex + 1;
            return xuhao;
        },

        _headerDataGetter: function (dataKey, columnProps) {
            if (dataKey === "id") {
                return <span style={{color: "green"}}>_ID_</span>;
            } else if (dataKey === "firstName") {
                return <span style={{color: "green"}}>_姓名_</span>
            } else {
                return columnProps.label;
            }
        },

        _onRowClick: function (event, rowId, rowData, checked) {
            //Gritter.add
            //console.log({
            //    title: '单击信息',
            //    text: rowData.firstName + rowData.lastName + ' 你好 ' + checked,
            //    image: 'assets/avatars/avatar.png',
            //    sticky: false,
            //    time: '2000',
            //    class_name: 'gritter-info gritter-light'
            //});

        },
        _onRowDblClick: function (event, rowId, rowData, checked) {

            Gritter.add({
                title: '双击信息',
                text: rowData.firstName + rowData.lastName + ' 你好 ' + checked,
                image: 'assets/avatars/avatar.png',
                sticky: false,
                time: '4000',
                class_name: 'gritter-info '
            });

        },

        _onNavigationBtnClick: function (page, navigationInfo) {
            //Gritter.add({
            //    title: "分页事件演示",
            //    text: "前往页码：" + page + "，每页记录数：" + navigationInfo.pageSize + "，共 " + navigationInfo.pages + " 页"
            //});
            this._handleQuery(page, navigationInfo.pageSize);

        },

        _handleKeyUp: function (evt) {
            if (evt.which === 13) {
                this._handleQuery(0, Constants.PAGE_SIZE);
            }
        },

        _handleQuery: function (page, pageSize, querystring) {
            Actions.search({
                page: page,
                pageSize: pageSize || Constants.PAGE_SIZE,
                querystring: this.state.querystring
            });

        },

        _handleDeleteClick: function (param) {
            //console.log("_handleDeleteClick",param);
            var selectedString = $("#selectedRowIds")[0].innerHTML;
            //console.log("selectedRowIds in _handleDeleteClick", _.isUndefined(selectedString), selecteds);
            if (_.isUndefined(selectedString) || _.isEmpty(selectedString)) {
                Gritter.add({
                    title: '提示',
                    text: '至少选择一条记录！',
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '4000',
                    class_name: 'gritter-light '
                });
                //this.handleToggle();
                return;
            }
            var selecteds = selectedString.split(',');
            bootbox.confirm("确认删除吗？", function (result) {
                if (result) {
                    Actions.delete(selecteds);
                }
            });


        },
        _handleEditClick: function () {
            var selectedString = $("#selectedRowIds")[0].innerHTML;
            if (_.isUndefined(selectedString) || _.isEmpty(selectedString) || selectedString.indexOf(",")>-1) {
                Gritter.add({
                    title: '提示',
                    text: '请选择一条记录！',
                    //image: 'assets/avatars/avatar.png',
                    sticky: false,
                    time: '4000',
                    class_name: 'gritter-light '
                });
                //this.handleToggle();
                return;
            }
            PageRouterActions.navigateTo('#/demoDetailPage/'+selectedString);
        },

        render: function () {

            //console.log("state", this.state);

            // this.table = React.createElement(Table, {
            //     rowGetter: this.rowGetter,//获得记录数据，每页都从0开始
            //     rowsTotoal: this.state.rowsTotoal, //记录总数
            //     currentPage: this.state.currentPage, //当前页码，从0开始
            //     headerDataGetter: this._headerDataGetter, //表头格式化方法
            //     onRowClick: this._onRowClick, //记录行单击事件
            //     onRowDblClick: this._onRowDblClick, //记录行双击事件
            //     onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
            //     rowIdColumn: "id", //唯一标识每行记录的字段
            //     rowSelected: true,//选择一行是否触发checkbox
            //     id: "demo-list"
            // }, [
            //     <Column
            //         dataKey="checkbox"
            //         label=""
            //     />,
            //     <Column
            //         dataKey=""
            //         label="序号"
            //         cellRender={this._xuhaoCellRender}
            //     />,
            //     <Column
            //         dataKey="id"
            //         label="ID"
            //         hidden={false}
            //     />, <Column
            //         dataKey="firstName"
            //         label="姓名"
            //         cellRender={this.nameCellRender}
            //     />,
            //     <Column
            //         dataKey="street"
            //         label="街道"
            //         width={50}
            //     />,

            //     <Column
            //         dataKey="city"
            //         label="城市"
            //         width={100}
            //     />,
            //     <Column
            //         dataKey="_date"
            //         label="日期"
            //         cellRender={this.dateCellRender}
            //     />,
            //     <Column
            //         label="邮政编码"
            //         dataKey="zipCode"
            //     />,
            //     <Column
            //         label="邮件"
            //         dataKey="email"
            //     />]);
            
            this.table = React.createElement(
                        BootstrapTable,
                        { data: this.state.rows },
                        React.createElement(
                            TableHeaderColumn,
                            { isKey: true, dataField: 'id' },
                            'Product ID'
                        ),
                        React.createElement(
                            TableHeaderColumn,
                            { dataField: 'street' },
                            'Product Name'
                        ),
                        React.createElement(
                            TableHeaderColumn,
                            { dataField: 'city' },
                            'Product Price'
                        )
                    );


            return (
                <div className="row ">
                    <div className="col-xs-12 dataTables_wrapper  form-inline">
                        <div className="row" style={{"paddingBottom": "0px"}}>
                            <div className="col-xs-6">
                                <Link className="btn btn-sm btn-white btn-info btn-round" to="/demoDetailPage/-1">
                                    <i className="ace-icon fa fa-plus-circle blue bigger-120 "></i>
                                    新增
                                </Link>
                            &nbsp;
                                <button className="btn btn-sm btn-white btn-default btn-round" onClick={this._handleEditClick}>
                                    <i className="ace-icon fa fa-pencil align-top bigger-120 "></i>
                                    修改
                                </button>
                            &nbsp;
                                <button className="btn btn-sm btn-white btn-warning btn-round" onClick={this._handleDeleteClick.bind(this, "delete")}>
                                    <i className="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                    删除
                                </button>
                            </div>
                            <div className="col-xs-6">
                                <div id="sample-table-2_filter" className="dataTables_filter">
                                    <input type="search" valueLink={this.linkState('querystring')} onKeyUp={this._handleKeyUp} className="form-control input-sm" placeholder="查询..." aria-controls="sample-table-2"></input>
                                </div>
                            </div>
                        </div>

                    {this.table}

                    </div>
                </div>
            );
        }
    })
    ;
module.exports = page;