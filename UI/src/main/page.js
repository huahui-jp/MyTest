var React = require('react/addons');
var Router = require('react-router');

var Header = require('./header');
var IndexContent = require('./indexContent');
var Footer = require('./footer');
var PageHeader = require('./pageHeader');
var SideBar = require('./sidebar');
var Breadcrumb = require('./breadcrumb');
var SettgingContainer = require('./settingContainer');
var TabPage = require('./tabPage');
var UserPage = require('../user/page');
var DemoFixedDataTablePage = require('../demo/list/fixed-data-table-page');
var DemoBootstrapTablePage = require('../demo/list/bootstrap-table-page');
var DemoListPage = require('../demo/list/page');
var ReactBootstrapTablePage = require('../demo/list/react-bootstrap-table-page');
var DemoListPage2 = require('../demo/list2/page');
var DemoDetailPage = require('../demo/detail/page');
var MyTodoPage = require('../workflow/myTodo/page');
var MyDonePage = require('../workflow/myDone/page');
var MyHistoryPage = require('../workflow/myHistory/page');
var BlankPage = require('../blank/page');
var State = require('react-router').State;

var ResourceListPage = require('../demo-nrap/resourceList/page');
var ResourceDetailPage = require('../demo-nrap/resourceDetail/page');

var DbTableMappingListPage = require('../demo-nrap/dbTableMappingList/page');
var DbColumnMappingListPage = require('../demo-nrap/dbColumnMappingList/page');

var { Route, DefaultRoute, RouteHandler, Link } = Router;

'use strict';
var breadcrumbsMap = {
    '/': [{name: "", url: "/"}],
    '/myTodo': [{name: "工作流管理", url: ""}, {name: "我的待办", url: "/myTodo"}],
    '/myDone': [{name: "我的已办", url: "myDone"}],
    '/myHistory': [{name: "历史任务", url: "/myHistory"}],
    '/user': [{name: "人员管理", url: "/user"}],
    '/blank': [{name: "空白页面", url: "/blank"}],
    "/demoListPage": [{name: "演示系统"}, {name: "列表页面", url: "/demoListPage"}],
    "/demoDetailPage": [{name: "演示系统"}, {name: "列表页面", url: "/demoListPage"}, {name: "详细页面", url: ""}],
    "/demoListPage2": [{name: "演示系统"}, {name: "列表页面2", url: "/demoListPage2"}],
    "/demoFixedDataTablePage": [{name: "演示系统"}, {name: "列表页面(FixedDataTable)", url: "/demoFixedDataTablePage"}],
    "/demoBootstrapTablePage": [{name: "演示系统"}, {name: "列表页面(BootstrapTable)", url: "/demoBootstrapTablePage"}],
    "/reactBootstrapTablePage": [{name: "演示系统"}, {name: "列表页面(ReactBootstrapTable)", url: "/reactBootstrapTablePage"}],
    "/resourceListPage": [{name: "国铁云服务平台"}, {name: "资源管理", url: "/resourceListPage"}],
    "/resourceDetailPage": [{name: "国铁云服务平台"}, {name: "资源管理", url: "/resourceListPage"}, {name: "资源详细页面", url: ""}],

    "/dbTableMappingListPage": [{name: "国铁云服务平台"}, {name: "dbTableMapping管理", url: "/dbTableMappingListPage"}],
    "/dbColumnMappingListPage": [{name: "国铁云服务平台"}, {name: "dbTableMapping管理", url: "/dbTableMappingListPage"}, {name: "dbColumnMapping列表画面", url: ""}]
};

var App = React.createClass({
    mixins: [
        State
    ],

    findBreadcrumb: function (path) {

        var breadcrumb = null;
        Object.getOwnPropertyNames(breadcrumbsMap).forEach(function (val, idx, array) {
            if (val === "/") {
                breadcrumb = breadcrumbsMap[val];
            } else if (path.startsWith(val)) {
                breadcrumb = breadcrumbsMap[val];
            }
        });
        return breadcrumb;

    },

    getBreadcrumbs: function () {
        var path = this.getPathname();
        var names = this.findBreadcrumb(path);

        if (!names) {
            names = [{name: path, url: path}];
        }

        return names;

    },

    render: function () {

        return (
            <span>
                <Header></Header>

                <div className="main-container" id="main-container">

                    <SideBar></SideBar>

                    <div className="main-content">
                        <div className="main-content-inner">

                            <Breadcrumb breadcrumbs={this.getBreadcrumbs()}></Breadcrumb>

                            <div className="page-content">

                                <SettgingContainer></SettgingContainer>

                                <PageHeader breadcrumbs={this.getBreadcrumbs()}></PageHeader>

                                <RouteHandler ></RouteHandler>
                            </div>
                        </div>
                    </div>

                    <Footer></Footer>

                </div>
            </span>

        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={IndexContent}/>
        <Route name="blank" path="/blank" handler={BlankPage} />
        <Route name="myTodo" path="/myTodo" handler={MyTodoPage} />
        <Route name="myDone" path="/myDone" handler={MyDonePage} />
        <Route name="myHistory" path="/myHistory" handler={MyHistoryPage} />
        <Route name="user" path="/user" handler={UserPage} />
        <Route name="tab" path="/tab" handler={TabPage} />
        <Route name="demoListPage" path="/demoListPage" handler={DemoListPage} />
        <Route name="demoListPage2" path="/demoListPage2" handler={DemoListPage2} />
        <Route name="demoFixedDataTablePage" path="/demoFixedDataTablePage" handler={DemoFixedDataTablePage} />
        <Route name="demoBootstrapTablePage" path="/demoBootstrapTablePage" handler={DemoBootstrapTablePage} />
        <Route name="reactBootstrapTablePage" path="/reactBootstrapTablePage" handler={ReactBootstrapTablePage} />

        <Route name="demoDetailPage" path="/demoDetailPage/:id" handler={DemoDetailPage} />

        <Route name="resourceListPage" path="/resourceListPage" handler={ResourceListPage} />
        <Route name="resourceDetailPage" path="/resourceDetailPage/:mode&:resourceId" handler={ResourceDetailPage} />
        <Route name="dbTableMappingListPage" path="/dbTableMappingListPage" handler={DbTableMappingListPage} />
        <Route name="dbColumnMappingListPage" path="/dbColumnMappingListPage/:mode&:resourceId&:tableMappingId&:tableName&:tableNameView" handler={DbColumnMappingListPage} />


    </Route>
);

Router.run(routes, function (Handler, state) {
    var params = state.params;
    var query = state.query;

    React.render(
        <Handler params={params} query={query} />,
        document.getElementById('container')
    );
});

