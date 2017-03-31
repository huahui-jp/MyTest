var React = require('react/addons');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;
var HeaderCell = require("./table-header-cell");

'use strict';


var page = React.createClass({
    mixins: [ReactComponentWithPureRenderMixin],

    render: function () {

        var headerCells = [];
        var headData = this.props.headData;
        var columns = this.props.columns;
        var navigationInfo = this.props.navigationInfo;
        var rowIds = this.props.rowIds;
        Object.getOwnPropertyNames(headData).forEach(function (key, idx, array) {
            var columnProps = columns[idx].props;
            //console.log(key + " -> " + headData[key]);
            var headerCell = <HeaderCell
                key={key}
                cellData={headData[key]}
                cellDataKey={key}
                width={columnProps.width}
                fixed={columnProps.fixed}
                hidden={columnProps.hidden}
                navigationInfo={navigationInfo}
                rowIds={rowIds}
            />;

            headerCells.push(headerCell);
        });
        //插入空的cell
        //headerCells.push(<HeaderCell key="lastCell" />);

        return (

            <tr>
                {headerCells}
            </tr>
        );
    }
});
module.exports = page;