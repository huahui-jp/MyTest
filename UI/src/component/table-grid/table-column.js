var React = require('react/addons');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactChildren = React.Children;

'use strict';


var page = React.createClass({
    mixins: [ReactComponentWithPureRenderMixin],

    render: function () {

        throw new Error(
            "组件<Column/>不应该被显示"
        );
    }
});
module.exports = page;