
var React = require('react/addons');
var Reflux = require('reflux');
var Store = require('./store');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;
var TableCell = require("./table-row-cell");
var Actions = require('./actions');

'use strict';

var page = React.createClass({
    mixins: [
        ReactComponentWithPureRenderMixin,
        Reflux.connect(Store, "tableState")
    ],

    getInitialState: function () /*object*/ {
        return {
        }
    },

    _renderToString(value) /*string*/ {

        if (value === null || value === undefined) {
            return '';
        } else {
            return String(value);
        }
    },

    _renderCell: function (/*object|array*/ rowData,
                           /*number*/ cellIndex,
                           /*object*/ columnProps,
                           /*string*/ key,
                           /*number*/ rowIndex,
                           rowIdColumn,
                           navigationInfo) /*object*/ {
        var cellRender = columnProps.cellRender || this._renderToString;
        var cellDataKey = columnProps.dataKey;
        var cellInputType = columnProps.inputType;
        var hidden = columnProps.hidden;
        var cellData;

        var cellDataGetter = columnProps.cellDataGetter;
        cellData = cellDataGetter ?
            cellDataGetter(cellDataKey, rowData) :
            rowData[cellDataKey];
        var rowId = rowData[this.props.rowIdColumn];

        return (
            React.createElement(TableCell, {
                    cellData: cellData,
                    cellDataKey: cellDataKey,
                    cellInputType: cellInputType,
                    cellRender: cellRender,
                    key: key,
                    rowData: rowData,
                    cellIndex: cellIndex,
                    rowIndex: rowIndex,
                    rowId:rowId,
                    hidden:hidden,
                    navigationInfo:navigationInfo
                }
            )
        );
    },

    _onClick: function (/*object*/ event) {
        var rowData = this.props.data;
        var checkedMap = this.state.tableState.checkedMap;
        var rowId = rowData[this.props.rowIdColumn];
        var checked = checkedMap && checkedMap[rowId];
        this.props.onClick(event, rowId, this.props.data,checked);
        if(this.props.rowSelected){
            Actions.rowCheckboxClick(!checked, rowId);
        }
    },

    _onDoubleClick: function (/*object*/ event) {
        var rowData = this.props.data;
        var checkedMap = this.state.tableState.checkedMap;
        var rowId = rowData[this.props.rowIdColumn];
        var checked = checkedMap && checkedMap[rowId];
        this.props.onDoubleClick(event, rowId, this.props.data,checked);
    },

    render: function () {
        var cells = [];
        var rowData = this.props.data;
        var columns = this.props.columns;
        var rowIndex = this.props.index;
        var navigationInfo=this.props.navigationInfo;
        var rowIdColumn = this.props.rowIdColumn;

        for (var cellIndex = 0; cellIndex < columns.length; ++cellIndex) {
            var column = columns[cellIndex];
            var columnProps = column.props;
            var key = "cell_" + cellIndex;
            var cell = this._renderCell(rowData, cellIndex, columnProps, key, rowIndex,rowIdColumn,navigationInfo);
            cells.push(cell);
        }
        //console.log("cells",cells);
        //cells.push(<TableCell key="last cell"/>);

        return (
            <tr key={rowIndex}
                onClick={this.props.onClick ? this._onClick : null}
                onDoubleClick={this.props.onDoubleClick ? this._onDoubleClick : null}>
                {cells}
            </tr>
        );
    }
});
module.exports = page;