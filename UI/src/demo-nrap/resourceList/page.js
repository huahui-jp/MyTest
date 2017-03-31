/*
  资源管理-List
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

var hasChildNum = 0;

var page = React.createClass({
        mixins: [
            Reflux.listenTo(Store, "onStatusChange"),
            Navigation,
            OverlayMixin,
            React.addons.LinkedStateMixin,
            Reflux.listenTo(PageRouterStore, "")
        ],
        onStatusChange: function (listData) {
            console.log("---onStatusChange-----rows---------",listData.rows);
            console.log("---onStatusChange-----rowsTotoal---------",listData.rowsTotoal);
            console.log("---onStatusChange-----deleteOk---------",listData.deleteOk);
            console.log("---onStatusChange-----currentPage---------",listData.currentPage);
            console.log("---onStatusChange-----msg---------",listData.msg);

            this.setState({
                rows: listData.rows,
                rowsTotoal: listData.rowsTotoal,
                deleteOk: listData.deleteOk,
                currentPage: listData.currentPage
                // hasChildNum : 0
            }, function () {
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
        },

        table: null,

        getInitialState: function () {
            // Actions.init();
            
            Actions.search({
                page: 0,
                querystring: "",
                refresh: true //是否后台刷新数据
            });
            return {list: []};

        },
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
            console.log("_onRowClick--->"+rowData);
            //选中的记录有有没有hasChild为true的
            if(typeof checked === "undefined"){
                checked = false;
            }
            if(rowData.hasChild){
                if(!checked){//当前行如果被选中
                    hasChildNum ++;
                }else{
                    hasChildNum --;
                }
            }
            
            // Gritter.add({
            //    title: '单击信息'+!checked,
            //    text: rowData.resourceId + "/"+rowData.hasChild+"===>"+hasChildNum,
            //    image: 'assets/avatars/avatar.png',
            //    sticky: false,
            //    time: '2000',
            //    class_name: 'gritter-info gritter-light'
            // });



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
            //Gritter.add({
            //    title: "分页事件演示",
            //    text: "前往页码：" + page + "，每页记录数：" + navigationInfo.pageSize + "，共 " + navigationInfo.pages + " 页"
            //});
            Actions.search({
                page: pageNo,
                querystring: this.state.querystring,
                refresh: false //true:后台分页 false:后台分页
            });

        },
        _handleKeyUp: function (evt) {
            console.log("_handleKeyUp--->"+evt.which);
            //if (evt.which === 13) {//Enter键
                Actions.search({
                    page: 0,
                    querystring: this.state.querystring,
                    refresh:false
                });
            // }
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
            // var selecteds = selectedString.split(',');
            bootbox.confirm("确认删除吗？", function (result) {
                if (result) {
                    //判断是否有子数据
                    //console.log("this.state.hasChildNum-->"+this.state.hasChildNum);
                    if(hasChildNum>0){ 
                        bootbox.confirm("有关联的TableMapping,确认删除吗？", function (result) {
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
            PageRouterActions.navigateTo('#/resourceDetailPage/edit&'+selectedString);
        },
        typeCellRender: function (cellData,
                                  cellDataKey,
                                  rowData,
                                  cellIndex,
                                  rowIndex) {

            var res = rowData["resourceType"];
            // console.log("typeCellRender-->"+type);
            if(res === "01"){
                return "DB";
            }else if(res === "02"){
                return "GEMFIRE";
            }
            return res;
        },
        // deleteFlgCellRender: function (cellData,
        //                           cellDataKey,
        //                           rowData,
        //                           cellIndex,
        //                           rowIndex) {

        //     var res = rowData["deleteFlg"];
        //     // console.log("typeCellRender-->"+type);
        //     if(res === "1"){
        //         return "无效";
        //     }else if(res === "0"){
        //         return "有效";
        //     }
        //     return res;
        // },
        // childCellRender: function (cellData,
        //                           cellDataKey,
        //                           rowData,
        //                           cellIndex,
        //                           rowIndex) {

        //     var res = rowData["hasChild"];
        //     if(res){
        //         return "有";
        //     }else{
        //         return "无";
        //     }
        // },
        passwdCellRender: function (cellData,
                                  cellDataKey,
                                  rowData,
                                  cellIndex,
                                  rowIndex) {

            var res = rowData["dbPasswd"];
            // var res = "";
            // // if(!_.undefined(rowData){
                var len = rowData.length;
            // //     // console.log("passwdCellRender-->"+len);
                for(var i=0;i<len;i++){
                    res+="●"; 
                } 

            // // }
            
            return res;
        },
        connectCellRender: function(cellData,
                                  cellDataKey,
                                  rowData,
                                  cellIndex,
                                  rowIndex){
            //TODO 查询连接状态,如果成功/失败显示对应的图标
            if(typeof rowData["connectStatus"] === "undefined"){
                return <span className="label label-sm label-warning">connecting</span>;
            }else{

                if(rowData["connectStatus"] === "Success..."){ 
                    return <span className="label label-sm label-success">success</span>;
                }else{
                    return <span className="label label-sm label-danger">failure</span>;
                }
            }
            
            
        },
        render: function () {

            //console.log("state", this.state);

            this.table = React.createElement(Table, {
                rowGetter: this.rowGetter,//获得记录数据，每页都从0开始
                rowsTotoal: this.state.rowsTotoal, //记录总数
                currentPage: this.state.currentPage, //当前页码，从0开始
                headerDataGetter: this._headerDataGetter, //表头格式化方法
                onRowClick: this._onRowClick, //记录行单击事件
                onRowDblClick: this._onRowDblClick, //记录行双击事件
                onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
                rowIdColumn: "resourceId", //唯一标识每行记录的字段
                rowSelected: true,//选择一行是否触发checkbox
                id: "demoList"
            }, [
                <Column dataKey="checkbox" label="" inputType="checkbox"/>,
                <Column dataKey="id" label="ID" hidden={true} />,
                <Column label="资源ID" dataKey="resourceId" width={50} />,
                <Column label="资源名称" dataKey="resourceName" />,
                <Column label="资源种类"  dataKey="resourceType" width={50} cellRender={this.typeCellRender} />,
                <Column label="数据库连接" dataKey="dbLink" width={100} />,
                <Column label="用户名" dataKey="dbUser" />,
                <Column label="密码" dataKey="dbPasswd"  cellRender={this.passwdCellRender}/>,
                // <Column label="有效" dataKey="deleteFlg" cellRender={this.deleteFlgCellRender}/>,
                // <Column label="子数据" dataKey="hasChild" width={50} cellRender={this.childCellRender}/>,
                <Column label="连接" dataKey="connectStatus" cellRender={this.connectCellRender}/>]);

            return (
                <div className="row ">
                    <div className="col-xs-12 dataTables_wrapper  form-inline">
                        <div className="row" style={{"paddingBottom": "0px"}}>
                            <div className="col-xs-6">
                                <Link className="btn btn-sm btn-white btn-info btn-round" to="/resourceDetailPage/add&-1">
                                    <i className="ace-icon fa fa-plus-circle blue bigger-120 "></i>
                                    新增011
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
                                    <input type="search" valueLink={this.linkState('querystring')} onKeyUp={this._handleKeyUp} className="form-control input-sm" placeholder="查询2..." aria-controls="sample-table-2"></input>
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