/*
  TableMapping管理-List
  zhoujiang 20160327
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
var Constants = require('../../common/constants');
var _ = require('lodash');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

// var hasChildNum = 0;

var page = React.createClass({
        mixins: [
            Reflux.listenTo(Store, "onStatusChange"),
            Navigation,
            OverlayMixin,
            React.addons.LinkedStateMixin,
            Reflux.listenTo(PageRouterStore, "")
        ],
        getInitialState: function () {
            // Actions.init();
            Actions.searchResource();

            Actions.search({
                currentPage: 0,
                querystring: ""
            });
            return {list: []};

        },
        onStatusChange: function (listData) {


            //动态添加option到select资源名称中
            var resourceListOptions = [];
            var i = 1;
            resourceListOptions[0] = React.createElement('option', 
                {value: "none"},"请选择资源名称");
            for(var p in listData.resourceList){
               resourceListOptions[i] = React.createElement(
                    'option', 
                    {value: listData.resourceList[p].resourceId},
                    listData.resourceList[p].resourceName);
                i++;
            }
            if(resourceListOptions.length > 1){
                this.state.resourceListOptions = resourceListOptions;

            }

            if(typeof listData.rows !== "undefined"){
                this.setState({
                    rows: listData.rows,
                    rowsTotoal: listData.rowsTotoal,
                    deleteOk: listData.deleteOk,
                    currentPage: listData.currentPage,
                    hasChildNum : 0
                }, function () {
                // $('select.resourceList').empty();
                // $('select.resourceList').append('<option value="01">1111111</option>');
                if (listData.deleteOk) {
                    Gritter.add({
                        title: '提示',
                        text: '删除成功！'+ listData.msg,
                        //image: 'assets/avatars/avatar.png',
                        sticky: false,
                        time: '2000',
                        class_name: 'gritter-light '
                    });
                }else{
                    if(!_.isUndefined(listData.msg)&&!_.isEmpty(listData.msg)){
                        Gritter.add({
                        title: '提示',
                        text: '删除失败！'+ listData.msg,
                        //image: 'assets/avatars/avatar.png',
                        sticky: false,
                        time: '2000',
                        class_name: 'gritter-light '
                    });
                    }
                    
                }
            });

            }else{
                this.setState({});
            }
            

            console.log("-------------onStatusChange------resourceListOptions------", this.state.resourceListOptions);
            console.log("-------------onStatusChange------rows------", this.state.rows);
        },

        table: null,
        componentDidMount: function(){
            console.log("componentDidMount");
            // this.unsubscribe=store.listen(this.onStatusChange);
            // action.init();

        },
        componentWillMount: function () {
            console.log("componentWillMount");
            //Actions.init();
            // this.unsubscribe();
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
            // console.log("_onRowClick--->"+rowData);
            //选中的记录有有没有hasChild为true的
            if(typeof checked === "undefined"){
                checked = false;
            }
            // if(rowData.hasRunJob){
                if(!checked){//当前行如果被选中
                    this.state.hasChildNum ++;
                    this.state.selResourceId = rowData["resourceId"];
                    this.state.selTableMappingId = rowData["tableMappingId"];
                    this.state.tableName = rowData["tableName"];
                    this.state.tableNameView = rowData["tableNameView"];
                }else{
                    this.state.hasChildNum --;
                }
            // }
            
            Gritter.add({
               title: '单击信息'+!checked,
               text: rowData.resourceId + "/"+rowData.hasRunJob+"===>"+this.state.hasChildNum,
               image: 'assets/avatars/avatar.png',
               sticky: false,
               time: '2000',
               class_name: 'gritter-info gritter-light'
            });

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

        _onNavigationBtnClick: function (pageNo, navigationInfo) {
            Actions.search({
                currentPage: pageNo,
                querystring: this.state.querystring
            });

        },

        _handleDeleteClick: function (param) {  
            console.log("TableMapping _handleDeleteClick",param);
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
            // var selecteds = selectedString.split(',');
            bootbox.confirm("确认删除吗？", function (result) {
                if (result) {
                    //判断是否有子数据
                    //console.log("this.state.hasChildNum-->"+this.state.hasChildNum);
                    if(this.state.hasChildNum>0){ 
                        bootbox.confirm("有关联的JobAction,确认删除吗？", function (result) {
                            if (result) {
                                Actions.delete(selectedString);
                            }
                        });
                    }else{
                        Actions.delete(selectedString);
                    }
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
            PageRouterActions.navigateTo('#/dbColumnMappingListPage/edit&'
                +this.state.selResourceId+'&'
                +this.state.selTableMappingId+'&'
                +this.state.tableName+'&'
                +this.state.tableNameView);
        },
        selectResource: function() {
                Actions.search({
                page: this.state.currentPage,
                querystring: this.state.querystring
            });


        },
        render: function () {

            console.log("-------------render------resourceListOptions------", this.state.resourceListOptions);
            console.log("-------------render------rows------", this.state.rows);

            this.table = React.createElement(Table, {
                rowGetter: this.rowGetter,//获得记录数据，每页都从0开始
                rowsTotoal: this.state.rowsTotoal, //记录总数
                currentPage: this.state.currentPage, //当前页码，从0开始
                headerDataGetter: this._headerDataGetter, //表头格式化方法
                onRowClick: this._onRowClick, //记录行单击事件
                onRowDblClick: this._onRowDblClick, //记录行双击事件
                onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
                rowIdColumn: "tableMappingId", //唯一标识每行记录的字段
                rowSelected: true,//选择一行是否触发checkbox
                id: "demoList"
            }, [
                <Column dataKey="checkbox" label="" inputType="checkbox"/>,
                <Column dataKey="id" label="ID" hidden={true} />,
                <Column label="DBTableID" dataKey="tableMappingId" width={50} />,
                <Column label="资源ID" dataKey="resourceId" width={50} />,
                <Column label="数据库表物理名" dataKey="tableName" width={100}/>,
                <Column label="数据库表逻辑名"  dataKey="tableNameView" width={100} />,
                <Column label="deleteFlg" dataKey="deleteFlg" />,
                <Column label="hasRunJob"  dataKey="hasRunJob" width={50} />
                ]);

            return (
                <div className="row ">
                    <div className="col-xs-12 dataTables_wrapper  form-inline">
                        <div className="row" style={{"paddingBottom": "0px"}}>
                            <div className="col-xs-6">
                                <Link className="btn btn-sm btn-white btn-info btn-round" to="/dbColumnMappingListPage/add&-1&-1&-1&-1">
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
                                    <select id="resourceList" ref="resourceList" className="width-100" onChange={this.selectResource}>
                                        {this.state.resourceListOptions}
                                    </select>
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