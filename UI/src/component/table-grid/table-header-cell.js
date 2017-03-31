var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('./actions');
var Store = require('./store');

var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;

'use strict';

var page = React.createClass({
    mixins: [
        ReactComponentWithPureRenderMixin,
        Reflux.connect(Store, "tableState")
    ],

    getDefaultProps: function () /*object*/ {
        return {
            width: "30px"
        };
    },


    getInitialState: function () /*object*/ {
        return {checked : false};
    },

    _onHeaderCheckboxChange: function () {
        var rowIds=this.props.rowIds;
        var nextChecked = !this.state.checked;
        //var pageSize = this.props.navigationInfo.pageSize;
        this.setState({checked: nextChecked});
        Actions.headerCheckboxClick(nextChecked,rowIds);
    },

    render: function () {

        var checkbox = null;
        var key = this.props.cellDataKey;
        var centerClass = "";
        var style = {
            width: this.props.width
        };
        var fixed = this.props.fixed;

        if (fixed) {
            style.width = "90%";
        }
        if(this.props.hidden){
            style.display ="none";
        }

        this.state.checked = this.state.tableState.headerChecked;

        if (key === "checkbox") {
            checkbox = <input type="checkbox" className="ace"  checked={this.state.checked} defaultChecked={false} onChange={this._onHeaderCheckboxChange}/>
            centerClass = "center";
        }
        return (

            <th className={centerClass} key={key} style={style}>
                {checkbox}
                <span className="lbl">{this.props.cellData}</span>
            </th>
        );
    }
});
module.exports = page;