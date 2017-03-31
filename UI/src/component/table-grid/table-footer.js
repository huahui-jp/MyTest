var React = require('react/addons');
var Actions = require('./actions');

var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;
var Gritter = require('../gritter');

'use strict';

var page = React.createClass({
    mixins: [ReactComponentWithPureRenderMixin],

    navigationInfo: null,

    _onFirstBtnClick: function (e) {
        if (this.navigationInfo.isFirstPage) {
            Gritter.add({
                title: "提示",
                text: "已经是第一页了"
            });
            return;
        }
        Actions.cleanCheckArray();
        this.props.navigationInfo.onNavigationBtnClick(0, this.navigationInfo);
    },

    _onLastBtnClick: function () {
        if (this.navigationInfo.isLastPage) {
            Gritter.add({
                title: "提示",
                text: "已经是最后一页了"
            });
            return;
        }
        Actions.cleanCheckArray();
        this.props.navigationInfo.onNavigationBtnClick(this.navigationInfo.pages - 1, this.navigationInfo);
    },

    _onPreviouBtnClick: function () {
        var page = this.navigationInfo.currentPage - 2;
        if (page >= 0) {
            Actions.cleanCheckArray();
            this.props.navigationInfo.onNavigationBtnClick(page, this.navigationInfo);
        }
    },

    _onNextBtnClick: function () {
        var page = this.navigationInfo.currentPage;
        if (page < this.navigationInfo.pages) {
            Actions.cleanCheckArray();
            this.props.navigationInfo.onNavigationBtnClick(page, this.navigationInfo);
        }
    },

    _onPageBtnClick: function (e) {
        var page = e.target.innerHTML - 1;
        if (page !== this.navigationInfo.currentPage - 1) {
            Actions.cleanCheckArray();
            this.props.navigationInfo.onNavigationBtnClick(page, this.navigationInfo);
        }
    },

    render: function () {
        this.navigationInfo = this.props.navigationInfo;
        var rowsTotoal = this.props.navigationInfo.rowsTotoal;
        var currentPage = this.props.navigationInfo.currentPage;
        var pageSize = this.props.navigationInfo.pageSize;
        var fromRowNumber = this.props.navigationInfo.fromRowNumber;
        var toRowNumber = this.props.navigationInfo.toRowNumber;
        var rowsCount = this.props.navigationInfo.rowsCount;
        var pages = this.props.navigationInfo.pages;
        var isLastPage = this.props.navigationInfo.isLastPage;
        var isFirstPage = this.props.navigationInfo.isFirstPage;

        //console.log(isLastPage, isFirstPage, pages);

        var previouPageClass = isFirstPage ? "paginate_button previous disabled" : "paginate_button previous ";
        var nextPageClass = isLastPage ? "paginate_button next disabled" : "paginate_button next ";

        var page1btn = null;
        var page2btn = null;
        var page3btn = null;

        if (pages === 1) {
            page1btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="0">
                <a onClick={this._onPageBtnClick} >{currentPage}</a>
            </li>;

        } else if (pages === 2 && !isFirstPage) {
            page1btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="0">
                <a onClick={this._onPageBtnClick}>{currentPage - 1}</a>
            </li>;
            page2btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage}</a>
            </li>;
        } else if (pages === 2 && isFirstPage) {
            page1btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage}</a>
            </li>;
            page2btn = <li className="paginate_button" aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage + 1}</a>
            </li>;
        } else if (pages >= 3 && !isLastPage && !isFirstPage) {
            page1btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="0">
                <a onClick={this._onPageBtnClick}>{currentPage - 1}</a>
            </li>;
            page2btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage}</a>
            </li>;
            page3btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="2">
                <a onClick={this._onPageBtnClick}>{currentPage + 1}</a>
            </li>;
        } else if (pages >= 3 && !isLastPage && isFirstPage) {
            page1btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="0">
                <a onClick={this._onPageBtnClick}>{currentPage }</a>
            </li>;
            page2btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage + 1}</a>
            </li>;
            page3btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="2">
                <a onClick={this._onPageBtnClick}>{currentPage + 2}</a>
            </li>;
        } else if (pages >= 3 && isLastPage) {
            page1btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="0">
                <a onClick={this._onPageBtnClick}>{currentPage - 2}</a>
            </li>;
            page2btn = <li className="paginate_button " aria-controls="sample-table-2" tabIndex="1">
                <a onClick={this._onPageBtnClick}>{currentPage - 1}</a>
            </li>;
            page3btn = <li className="paginate_button active" aria-controls="sample-table-2" tabIndex="2">
                <a onClick={this._onPageBtnClick}>{currentPage}</a>
            </li>;
        }
        return (

            <div className="row">
                <div className="col-xs-3">
                    <div className="dataTables_info" id="sample-table-2_info" role="status" aria-live="polite">显示 {fromRowNumber} 到 {toRowNumber} ，共 {rowsTotoal} 条记录</div>
                </div>

                <div className="col-xs-9">
                    <div className="dataTables_paginate paging_simple_numbers" id="sample-table-2_paginate">
                        <ul className="pagination">
                            <li className="paginate_button previous" aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_previous">
                                <a onClick={this._onFirstBtnClick}>首页</a>
                            </li>
                            <li className={previouPageClass} aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_previous">
                                <a onClick={this._onPreviouBtnClick}>上一页</a>
                            </li>
                            {page1btn}
                            {page2btn}
                            {page3btn}
                            <li className={nextPageClass} aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_next">
                                <a onClick={this._onNextBtnClick} >下一页</a>
                            </li>
                            <li className="paginate_button next" aria-controls="sample-table-2" tabIndex="0" id="sample-table-2_next">
                                <a onClick={this._onLastBtnClick}>最后页</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
});
module.exports = page;