var React = require('react/addons');
var Actions = require('./actions');
var Reflux = require('reflux');
var Store = require('./store');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;
'use strict';

var page = React.createClass({
    mixins: [
        ReactComponentWithPureRenderMixin,
        // React.addons.LinkedStateMixin,
        Reflux.connect(Store, "tableState")
    ],

    getInitialState: function () /*object*/ {
        return {
            checked:false
        };
    },

    _onCheckboxChange: function () {
        //console.log("_onCheckboxChange",this.state.checked);
        var nextChecked = !this.state.checked;
        this.state.checked = nextChecked;
        //console.log("rowId",this.props.rowId);
        Actions.rowCheckboxClick(nextChecked, this.props.rowId);
    },

    _onTextChange: function (e) {
        // console.log(this.parent.parent.refs.myTableDataString.value);
        // console.log("_onTextChange---->"+this.props.rowId+"/"+this.props.cellDataKey+"/"+e.target.value);
        this.state.text = e.target.value;//获取输入的数据并更新到input对象
        Actions.updMyTableData(this.props.rowId,this.props.cellDataKey,e.target.value);//调用Action来更新store中的数据
    },

    _onSelectChange: function (e) {
        // console.log("_onSelectChange---->"+this.props.rowId+"/"+this.props.cellDataKey+"/"+e.target.value);
        
        var index = e.target.options.selectedIndex;
        this.state.text = e.target.options[index].innerText;//获取输入的数据并更新到input对象
        Actions.updMyTableData(this.props.rowId,this.props.cellDataKey,this.state.text);//调用Action来更新store中的数据
    },

    render: function () {

        var rowcell = null;
        var checkbox = null;
        var key = this.props.cellDataKey;
        var rowIdColumn= this.props.rowIdColumn;
        var centerClass = "";
        var checked = false;
        var checkedMap = this.state.tableState.checkedMap;
        var cellInputType = this.props.cellInputType;
        var rowId = this.props.rowId;

        this.state.checked = checkedMap && checkedMap[rowId];

        var style = {
            width: this.props.width,
            height: this.props.height
        };
        if(this.props.hidden){
            style.display ="none";
        }
        var content = null;

        if (this.props.cellRender) {
            // console.log("-----------cellRender---    ------------>>>>"
            // +this.props.cellData+"/"+this.props.cellDataKey+"/"+this.props.rowData+"/"+this.props.cellIndex+"/"+this.props.rowIndex);
            content = this.props.cellRender(
                this.props.cellData,
                this.props.cellDataKey,
                this.props.rowData,
                this.props.cellIndex,
                this.props.rowIndex
            );
        }
        // if(key === "checkbox"){
        //     this.state.rowId = this.props.cellData;
        //     rowcell = <input type="checkbox" className="ace" checked={this.state.checked} onChange={this._onCheckboxChange}/>
        //     centerClass = "center";
        // }
        if(typeof cellInputType == "undefined"){
            rowcell = <span className="lbl">{content}</span>;
        }
        if(cellInputType === "checkbox"){
            this.state.rowId = this.props.cellData;
            rowcell = <input type="checkbox" className="ace" checked={this.state.checked} onChange={this._onCheckboxChange}/>
            centerClass = "center";
        }
        if(cellInputType === "text"){
            this.state.rowId = this.props.cellData;
            this.state.text = this.props.cellData;
            // console.log("text    this.linkState('rowId')=="+this.linkState('rowId'));
            rowcell = <input type="text" id={key} defaultValue={this.state.text} onChange={this._onTextChange}/>
        }
        if(cellInputType === "select"){
            rowcell = <select id={key}  width={50}  onChange={this._onSelectChange}>
                {this.props.rowData}
            </select>

        }

        return (

            <td className={centerClass} key={key} style={style}>
                {rowcell}<span className="lbl"/>
            </td>
        );
    }
});
module.exports = page;