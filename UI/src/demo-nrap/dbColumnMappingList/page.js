/*
  ColumnMappingList管理
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

var Table = require('../../component/table-grid/table');
var TableStore = require('../../component/table-grid/store');
var Column = require('../../component/table-grid/table-column');
var messageUtil  = require('../../common/messageUtil');

'use strict';

var page = React.createClass({
    mixins: [
        Reflux.listenTo(Store, "onStatusChange"),
        React.addons.LinkedStateMixin,
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
        // Reflux.connect(TableStore, "tableState")//绑定Tablestore的数据
    ],
    mode: "",
    getInitialState: function () {


        this.mode = this.props.params.mode;    
        if(this.mode === "edit"){
            Actions.searchResource();
            Actions.searchTable(this.props.params.resourceId);
            Actions.searchColumnMapping(this.props.params.tableMappingId);
        }else if(this.mode === "add"){
            Actions.searchResource();
            
        }
        // this.state.resourceId = this.props.params.resourceId;
        return {};
    },
    onStatusChange: function (resultData) {
        console.log("onStatusChange--->"+resultData);
        // var saveOk = resultData.saveOk;
        // var connectOk = resultData.connectOk;

        if (resultData.message && resultData.message !== ""){
            //显示提示信息
            messageUtil.addGritter({text:resultData.message});
        }else{
            if(this.mode === "add"){
                this.state.tableNameView ="";
            }else{
                this.state.tableNameView =this.props.params.tableNameView;
            }
            
            

            //动态添加option到select资源名称中
            var resourceListOptions = [];
            var i = 1;
            resourceListOptions[0] = React.createElement('option', 
                {value: "none"},"请选择资源名称");
            for(var p in resultData.resourceList){
                if(this.mode === "edit"){
                    if(resultData.resourceList[p].resourceId == this.props.params.resourceId){
                        resourceListOptions[0] = React.createElement(
                        'option', 
                        {value: resultData.resourceList[p].resourceId},
                        resultData.resourceList[p].resourceName);
                        this.state.resourceListOptions = resourceListOptions;
                    }
                    
                }else if(this.mode === "add"){
                    resourceListOptions[i] = React.createElement(
                    'option', 
                    {value: resultData.resourceList[p].resourceId},
                    resultData.resourceList[p].resourceName);
                    // if(i == 4){
                    //     resourceListOptions[i].selected = selected;
                    // }
                    i++;
                }
            }
                if(this.mode === "add"){
                    if(resourceListOptions.length > 1){
                    this.state.resourceListOptions = resourceListOptions;
                    // this.refs.resourceList.getDOMNode().defaultValue = "4";
                    }
                }


            //动态添加option到select数据库表物理名中
            var tableListOptions = [];
            
            if(this.mode === "edit"){
                tableListOptions[0] = React.createElement('option', {value: this.props.params.tableName},this.props.params.tableName);
                this.state.tableListOptions = tableListOptions;
            }else if(this.mode === "add"){
                i = 1;
                tableListOptions[0] = React.createElement('option', 
                {value: "none"},"请选择数据库表物理名");
            for(var p in resultData.tableList){
                tableListOptions[i] = React.createElement(
                    'option', 
                    {value: resultData.tableList[p]},
                    resultData.tableList[p]);
                i++;
            }
                if(resultData.tableList){
                    this.state.tableListOptions = tableListOptions;
                }
            }

            //动态添加option到select数据库列物理名中
            var columnListOptions = [];
            i = 1;
            columnListOptions[0] = React.createElement('option', {value: "none"},"请选择列物理名");
            for(var p in resultData.columnList){
                columnListOptions[i] = React.createElement(
                    'option', 
                    {value: resultData.columnList[p]},
                    resultData.columnList[p]);
                i++;
            }
            if(columnListOptions.length > 1){
                this.state.columnListOptions = columnListOptions;
                console.log("数据库表物理名Select加载完成!");
                // 刷新grid
                if(this.mode === "add"){
                    resultData.columnMappingList = [];
                    for(var p in resultData.columnList){
                        resultData.columnMappingList.push({"xh":resultData.columnMappingList.length,"columnListOptions":this.state.columnListOptions,"columnMappingId":0,"tableMappingId":1,"columnName":resultData.columnList[p],"columnNameView":"","columnType":"","jasonName":"","seqName":"","txtValue":"","dateFormat":""});
                    }
                }
            }


            if(resultData.columnMappingList){
                if(this.mode === "edit"){
                    // if(this.state.columnListOptions.length <= 1){
                        Actions.searchColumn(this.props.params.resourceId,this.props.params.tableName);
                    // }
                    
                }

                //TODO 生成序号
                for(var p in resultData.columnMappingList){
                    resultData.columnMappingList[p].xh = p;   
                    // deleteXHMap[p] = false;
                    //写入columnName
                    if(resultData.columnMappingList[p].columnName !== ""){
                        resultData.columnMappingList[p].columnListOptions = React.createElement(
                        'option', 
                        {value: resultData.columnMappingList[p].columnName},
                        resultData.columnMappingList[p].columnName);
                    }else{
                        resultData.columnMappingList[p].columnListOptions = this.state.columnListOptions;
                    }
                    
                }
                // deleteXHMap.length = resultData.columnMappingList.length;
                this.setState({
                    columnMappingList: resultData.columnMappingList,
                    rowsTotoal: resultData.columnMappingList.length, 
                    deleteOk: null, 
                    currentPage: 0
                });
            }else{
                this.setState({});
            }
        }
    },
    rowGetter: function (rowIndex) {
            //console.log(rowIndex);
            return this.state.columnMappingList[rowIndex];
    },
    saveHandler: function () {
        console.log("global.tableDate", global.tableDate);
        

        // console.log(this.state.tableState.myTableData);
        console.log("============doSave==============");
        //获取table数据
        var myTableDataString = $("#myTableDataString")[0].innerHTML; 
        console.log("myTableDataString-->"+myTableDataString);
        // var myTableData = JSON.parse(myTableDataString);
        var myTableData = global.golMyTableDate;
        


        if(this.mode == "add"){
            //新增时 所有的Column列表都是新增对象
            Actions.add({
                resourceId: this.state.resourceId,
                tableName: this.state.tableName,
                tableNameView: this.state.tableNameView,
                deleteFlg: "0"
            },myTableData);
        }else if(this.mode == "edit"){
            var addColumns = [];
            var updColumns = [];
            var delColumns = [];
            for(var p in myTableData){
                if(myTableData[p].columnMappingId === 0){//columnMappingId为0的是新增对象
                    addColumns.push(myTableData[p]);
                }
                else{//columnMappingId不为0的是更新对象
                    updColumns.push(myTableData[p]);
                }

            }

            Actions.upd({
                tableMappingId: this.props.params.tableMappingId,
                resourceId: this.props.params.resourceId,
                tableName: this.props.params.tableName,
                tableNameView: this.state.tableNameView,
                deleteFlg: "0"
            },addColumns,updColumns,delColumns);
        }
        
    },
    // TODO
    validateForm: function (columnName) {
        console.log("validateForm",columnName,this.state[columnName]);
        var flag = true;
        var value = this.state[columnName];
        switch (columnName) {

            default:
                break;
        } 
        return flag;

    },
    componentDidMount: function () {  
        //console.log("componentDidMount");

        $('#id-date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        })
    },
    selectResourceHandler: function() {
        //根据resourceId查询TabList
        this.state.resourceId = event.target.value;
        if(this.state.resourceId !== "none"){
            Actions.searchTable(this.state.resourceId);
        }
        
    },
    selectTableHandler: function () {
        // 根据数据库表物理名查询数据库列物理名，并刷新列表
        this.state.tableName = event.target.value;
        // this.state.tableNameView = this.state.tableName;
        // this.refs.tableNameView.value = this.state.tableNameView;
        // 
        if(this.state.tableName !== "none"){
            Actions.searchColumn(this.state.resourceId,this.state.tableName);
            // this.state.tableNameView = this.state.tableName;
        }


    },

    resourceListRender: function () {
        console.log("---------------resourceListRender---------------");
        return "";
    },
    _onRowClick: function (event, rowId, rowData, checked) {
            console.log("_onRowClick--->"+checked);
            if(typeof checked === "undefined"){
                checked = false;
            }
            // if(!checked){
            //     deleteXHMap[rowId] = true;
            // }
            // console.log("deleteXHMap[rowId]=--->"+deleteXHMap[rowId]);
            
            Gritter.add({
               title: '单击信息'+!checked,
               text: rowData.columnMappingId + "/"+rowData.columnName+"/"+rowData.columnNameView+"/"+checked,
               image: 'assets/avatars/avatar.png',
               sticky: false,
               time: '2000',
               class_name: 'gritter-info gritter-light'
            });

    },
    _addHandler: function(){
        //TODO check 必须选择数据库表物理名
        //添加1行空数据
        Actions.addRow(this.state.columnMappingList);
    },
    _handleDeleteColumnClick: function (param) {     
            var selectedString = $("#selectedRowIds")[0].innerHTML; 
            // console.log("selectedRowIds in _handleDeleteClick", _.isUndefined(selectedString), selecteds);
            // 
            // 
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

            var deleteRows = selectedString.split(',');

            var columnMappingList = [];
            columnMappingList = this.state.columnMappingList;
            var i = 0;
            
            for(var p in deleteRows){
                
                var delno = deleteRows[p]-i;
                console.log("-------------delno--------------"+delno+"----"+columnMappingList[delno].columnMappingId);
                if(columnMappingList[delno].columnMappingId > 0){
                    if(delColumns === ""){
                        delColumns = columnMappingList[delno].columnMappingId;
                    }else{
                        delColumns = delColumns + "," + columnMappingList[delno].columnMappingId;

                    }
                }
                columnMappingList.splice(delno,1);
                i++;
            }
            // this.state.columnMappingList = columnMappingList;
            // columnMappingList= [
            //     {"xh":0,"columnMappingId":1,"tableMappingId":1,"columnName":"columnName1","columnNameView":"columnNameView11","columnType":"columnType11","jasonName":"jasonName1","seqName":"seqName1","txtValue":"txtValue1","dateFormat":"dateFormat11"},
            //         {"xh":1,"columnMappingId":3,"tableMappingId":1,"columnName":"columnName2","columnNameView":"columnNameView2222","columnType":"columnType22","jasonName":"jasonName2","seqName":"seqName2","txtValue":"txtValue2","dateFormat":"dateFormat22"},
            //         {"xh":2,"columnMappingId":4,"tableMappingId":1,"columnName":"columnName3","columnNameView":"columnNameView3333","columnType":"columnType33","jasonName":"jasonName3","seqName":"seqName3","txtValue":"txtValue3","dateFormat":"dateFormat33"}
            //         ];
            console.log(JSON.stringify(columnMappingList));
            this.onStatusChange({columnMappingList:columnMappingList});

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

        
        // resourceListOptions[0] = React.createElement('option', 
        //     {value: "none"},"请选择资源名称");
        
        // //动态添加option到select中
        // for(var p in this.state.resourceList){
        //     resourceListOptions[p+1] = React.createElement(
        //         'option', 
        //         {value: this.state.resourceList[p].resourceId},
        //         this.state.resourceList[p].resourceName);
        // }

        // // TODO 需要封装
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

            this.table = React.createElement(Table, {
                rowGetter: this.rowGetter,//获得记录数据，每页都从0开始 
                rowsTotoal: this.state.rowsTotoal, //记录总数
                currentPage: this.state.currentPage, //当前页码，从0开始
                headerDataGetter: this._headerDataGetter, //表头格式化方法
                onRowClick: this._onRowClick, //记录行单击事件
                onRowDblClick: this._onRowDblClick, //记录行双击事件
                onNavigationBtnClick: this._onNavigationBtnClick, //分页事件
                rowIdColumn: "xh", //唯一标识每行记录的字段
                rowSelected: false,//选择一行是否触发checkbox
                id: "columnMappingTable"
            }, [
                <Column dataKey="checkbox" label="" inputType="checkbox" onChange={this.checkBoxClick}/>,
                <Column dataKey="xh" label="序号" />,
                <Column label="ColID" dataKey="columnMappingId" width={10} />,
                <Column label="TabID" dataKey="tableMappingId" width={10} />,
                <Column label="数据库列逻辑名" dataKey="columnNameView" inputType="text" width={10}/>,
                <Column label="数据库列物理名"  dataKey="columnListOptions" inputType="select"  width={10} />,
                <Column label="数据库列类型"  dataKey="columnType" inputType="text"  width={10} />,
                <Column label="JASON项目名" dataKey="jasonName" inputType="text"  width={10} />,
                <Column label="SEQ自定义项目" dataKey="seqName" inputType="text"  width={10}/>,
                <Column label="固定文字自定义项目"  dataKey="txtValue" inputType="text"  width={10} />,
                <Column label="日期自定义项目"  dataKey="dateFormat" inputType="text"  width={10} />
                ]); 



        return (
            <div className="row">
                <div className="col-xs-12">

                    
                        <div className="clearfix form-actions">
                                <button className="btn btn-info" type="button" onClick={this.saveHandler}>
                                    <i className="ace-icon fa fa-check"></i>
                                    保存
                                </button>
                        </div> 
                    <form  role="form">
                        <div className={classnameForName}>
                            <label htmlFor="name" className="col-xs-1 col-sm-1 col-md-1 control-label "> 资源名称 </label>

                            <div className="col-xs-2 col-sm-2">
                                <span className="block input-icon input-icon-right">
                                    <select id="resourceList" ref="resourceList" className="width-100" onChange={this.selectResourceHandler}>
                                        {this.state.resourceListOptions}
                                    </select>
                                    {nameValidateIcon}
                                </span>

                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tableName" className="col-xs-2 col-sm-1 col-md-2 control-label"> 数据库表物理名 </label>

                            <div className="col-xs-2 col-sm-2">
                                <span className="block input-icon input-icon-right">
                                    <select id="tableName" className="width-100" onBlur={this.validateForm.bind(this, "tableName")} onChange={this.selectTableHandler} >
                                        {this.state.tableListOptions}
                                    </select>
                                    {typeValidateIcon}
                                </span>
                            </div>
                            {typeerrMsgForName}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tableNameView" className="col-xs-2 col-sm-3 col-md-2 control-label"> 数据库表逻辑名 </label>

                            <div className="col-xs-2 col-sm-3">
                                <span className="block input-icon input-icon-right">
                                    <input type="text" ref="tableNameView" id="tableNameView" className="width-100" valueLink={this.linkState('tableNameView')} onBlur={this.validateForm.bind(this, "tableNameView")} placeholder="数据库表逻辑名" />
                                    {dbLinkValidateIcon}
                                </span>
                            </div>
                            {dbLinkerrMsgForName}
                        </div>

                        <div className="space-6"></div>

                    </form>
                    <div className="row">
                            <div className="col-xs-6">
                                <button className="btn btn-sm btn-white btn-info btn-round" onClick={this._addHandler} >
                                    <i className="ace-icon fa fa-plus-circle blue bigger-120 " ></i>
                                    新增
                                </button>
                            &nbsp;
                                <button className="btn btn-sm btn-white btn-warning btn-round" onClick={this._handleDeleteColumnClick} >
                                    <i className="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                    删除 
                                </button>
                            </div>
                    </div>
                        <div className="space-6"></div>
                    {this.table}
                </div>
            </div>
        );
        //console.log("state", this.state);
    }
});
module.exports = page;