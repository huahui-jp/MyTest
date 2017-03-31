var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('./actions');
var Store = require('./store');
var State = require('react-router').State;

'use strict';

var page = React.createClass({
    mixins: [
        State,
        Reflux.connect(Store, "data")
    ],

    render: function () {
        var query = this.props.query;
        this.state.pageName = query.pageName;
        return (
            <h4>{this.state.pageName}</h4>
        );
    }
});

module.exports = page;