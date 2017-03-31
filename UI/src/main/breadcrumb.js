var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Store = require('./store');
var State = require('react-router').State;

'use strict';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var page = React.createClass({
    mixins: [
        Reflux.connect(Store, "mainData")
    ],
    _handleKeyUp:function(){
      return null;
    },
    render: function () {
        var names = this.props.breadcrumbs;
        //console.log("breadcrumbs",names);

        return (
            <div className="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">

                <ul className="breadcrumb">
                    <li>
                        <i className="ace-icon fa fa-home home-icon"></i>
                    &nbsp;
                        <Link to="/">首页</Link>
                    &nbsp;
                    </li>
                    {names.map(function (item, i) {
                        var className = "";
                        if (i == names.length - 1) {
                            className = "active";
                        }
                        if (item.name) {
                            if (item.url) {
                                return (
                                    <li className={className} key={i}>
                                        <Link to={item.url} >{item.name}</Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className={className} key={i}>
                                        {item.name}
                                    </li>
                                );
                            }
                        }
                    }, this)}
                </ul>

                <div className="nav-search" id="nav-search">
                    <form className="form-search" >
                        <span className="input-icon">
                            <input type="text" placeholder="查询 ..." className="nav-search-input" id="nav-search-input" onkeyUp={this._handleKeyUp}/>
                            <i className="ace-icon fa fa-search nav-search-icon"></i>
                        </span>
                    </form>
                </div>

            </div>

        );
    }
});

module.exports = page;