var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';

var tabPage = React.createClass({
    getInitialState() {
        return {
            key: 1
        };
    },

    handleSelect(key) {
        console.log('selected ' + key);
        this.setState({key});
    },

    render() {
        return (
            <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect}>
                <TabPane eventKey={1} tab='Tab 1'>TabPane 1 content</TabPane>
                <TabPane eventKey={2} tab='Tab 2'>TabPane 2 content</TabPane>
            </TabbedArea>
        );
    }
});

module.exports = tabPage;