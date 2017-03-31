var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');
var PageRouterStore = require('../pageRouter/store');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');

var Panel = require('react-bootstrap').Panel;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var ModalTrigger = require('react-bootstrap').ModalTrigger;

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var App = React.createClass({
    mixins: [
        Reflux.connect(Store, "chatState"),
        Reflux.listenTo(PageRouterStore, "")
    ],

    render: function () {
        return (
            <div className="chatApp">
                <h3>这是在线通讯工具</h3>
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>

    </Route>
);

module.exports = App;