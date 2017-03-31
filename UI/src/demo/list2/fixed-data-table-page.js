var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../../pageRouter/actions');
var PageRouterStore = require('../../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';


var page = React.createClass({
    mixins: [
        Reflux.connect(Store, "listData"),
        Navigation,
        Reflux.listenTo(PageRouterStore, "")
    ],
    renderDate: function (/*object*/ cellData) {
        return <span>{cellData.toLocaleString()}</span>;
    },
    rowGetter: function (rowIndex) {
        return this.state.listData.rows[rowIndex];
    },

    rowCount: function () {
        return this.state.listData.rows.length;
    },

    getTableWidth: function () {
        //console.log("tableWidth:" + this.state.tableWidth);
        return this.state.tableWidth ? this.state.tableWidth : 400;
    },

    getTableHeight: function () {
        //console.log("tableHeight:" + this.state.tableHeight);
        return this.state.tableHeight ? this.state.tableHeight : 400;
    },

    componentDidMount: function () {
        this._update();
        var win = window;
        if (win.addEventListener) {
            win.addEventListener('resize', this._onResize, false);
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this._onResize);
        } else {
            win.onresize = this._onResize;
        }
    },

    _onResize: function () {
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(this._update, 16);
    },

    _update: function () {
        var win = window;

        var widthOffset = win.innerWidth < 680 ? 0 : 240;
        //console.log("innerWidth=" + win.innerWidth + ",innerHeight=" + win.innerHeight);
        this.setState({
            renderPage: true,
            tableWidth: win.innerWidth - widthOffset,
            tableHeight: win.innerHeight - 200

        });
    },

    render: function () {
        var controlledScrolling = "auto";

        return (
            <div className="row">
                <div className="col-md-12">
                    <Table
                        rowHeight={40}
                        headerHeight={40}
                        width={this.getTableWidth()}
                        height={this.getTableHeight()}
                        rowGetter={this.rowGetter}
                        rowsCount={this.rowCount()}>
                        <Column
                            dataKey="id"
                            fixed={true}
                            label="序号"
                            width={50}
                        />
                        <Column
                            isResizable={true}
                            dataKey="firstName"
                            fixed={false}
                            label="姓"
                            width={50}
                        />
                        <Column
                            dataKey="lastName"
                            fixed={false}
                            label="名"
                            width={50}
                        />
                        <Column
                            dataKey="city"
                            label="城市"
                            width={100}
                        />
                        <Column
                            label="邮政编码"
                            width={200}
                            dataKey="zipCode"
                        />
                        <Column
                            label="邮件"
                            width={200}
                            dataKey="email"
                        />
                    </Table>


                </div>
            </div>
        )
    }
});
module.exports = page;