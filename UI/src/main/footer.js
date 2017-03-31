var React = require('react/addons');
var Reflux = require('reflux');
var Store = require('./store');

'use strict';

var header = React.createClass({
        render: function () {
            return (
                <span>
                    <div className="footer">
                        <div className="footer-inner">
                            <div className="footer-content">
                                <span className="center">
                                    <a className="blue bolder" href="http://172.16.4.110/redmine">iDeveloper</a>
                                &copy; 2014-2015
                                </span>
                            </div>

                        </div>
                    </div>
                    <a href="#" id="btn-scroll-up" className="btn-scroll-up btn btn-sm btn-inverse">
                        <i className="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
                    </a>
                </span>
            );
        }
    })
    ;

module.exports = header;