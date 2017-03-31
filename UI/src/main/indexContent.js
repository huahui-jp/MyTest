var React = require('react/addons');
var Reflux = require('reflux');
var PageRouterActions = require('../pageRouter/actions');
var Actions = require('./actions');
var Store = require('./store');
var Router = require('react-router');

var Panel = require('react-bootstrap').Panel;


'use strict';

var page = React.createClass({
    render: function () {
        return (
            <span >
                <div className="row">
                    <div className="col-md-6">
                        <Panel header="欢迎进入iDeveloper V2 平台" >
                            iDeveloper提供产品和项目的技术框架基础设施，具体如下：
                            <br />
                            <br />
                            1、提供通用业务功能的服务和页面，例如组织/人员/权限等。
                            <br />
                            <br />
                            2、提供快速开发工具(CRUD页面代码生成/自定义页面/自定义查询)。
                            <br />
                            <br />
                            3、提供工作流引擎服务。
                            <br />
                            <br />
                            4、支持独立部署、集群部署。
                            <br />
                            <br />
                        </Panel>
                    </div>

                    <div className="col-md-6">
                        <Panel header="iDeveloper V2 安装步骤" bsStyle='success'>
                            1、配置本机Maven 参考
                            <a href="#">Maven 安装指南</a>
                            <br />
                            <br />
                            2、进入目录 12Z502DIDEV2/trunk
                            <br />
                            <br />
                            3、执行命令 quick-start.bat（包括了数据库启动、数据库初始化、代码编译、打包、发布命令）
                            <br />
                            <br />
                            4、在浏览器中打开 http://localhost:8080/idev-console/
                            <br />
                            <br />
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Panel header="ChangeLog" bsStyle='warning'>
                            v2.0.8 :
                            <br />
                            <br />
                            集成CAS，实现单点登录的演示。
                            <br />
                            <br />
                            新增RestfulService/RestfulClient。
                            <br />
                            <br />
                            集成独立的业务系统到iDev平台。
                            <br />
                            <br />
                            表单自定义。
                            <br />
                            <br />
                            CRUD代码自动生成。
                            <br />
                            <br />
                            人员管理字段、子表的扩展。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.7 :
                            <br />
                            <br />
                            Activiti 工作流集成和演示。
                            <br />
                            <br />
                            系统首页Potal Layout 初步实现。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.6 :
                            <br />
                            <br />
                            完成组织管理、人员管理、功能管理、权限管理、共通管理页面。
                            <br />
                            <br />
                            idev-security 代码重构，整理对外提供的API。
                            <br />
                            <br />
                            crud-sample增加子表的CRUD功能演示。
                            <br />
                            <br />
                            crud-sample增加附件上下传功能演示。
                            <br />
                            <br />
                            权限对象整理和调整。
                            <br />
                            <br />
                            报错提示功能改进。
                            <br />
                            <br />
                            登录页面UI改进。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.5
                            <br />
                            <br />
                            CrudSample增加了权限控制，页面按钮的权限控制演示和Service方法的权限控制演示。
                            <br />
                            <br />
                            Console2完善
                            <br />
                            <br />
                            修改了SystemModule系统模块的对象模型。
                            <br />
                            <br />
                            完善了Console2模块的左侧菜单树功能。
                            <br />
                            <br />
                            修改了Console2部分初始化数据。
                            <br />
                            <br />
                            依赖库版本更新
                            <br />
                            <br />
                            Spring 3.1.1.RELEASE -》 3.1.3.RELEASE
                            <br />
                            <br />
                            Hibernate 3.6.9.Final -》 4.1.8.Final
                            <br />
                            <br />
                            Shiro 1.2.0 -》 1.2.1
                            <br />
                            <br />
                            Ehcache 2.5.1 -》 2.6.0
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.4
                            <br />
                            <br />
                            JDK版本设置为JDK1.6。
                            <br />
                            <br />
                            新增modules/idev-vaadin模块，提供了Vaadin功能的支持。
                            <br />
                            <br />
                            新增modules/console2模块，设置为依赖idev-vaadin 模块，提供了Vaadin风格的控制台功能：
                            <br />
                            <br />
                            控制台页面布局和框架
                            <br />
                            <br />
                            典型页面的增删改查演示
                            <br />
                            <br />
                            演示了键盘快捷键操作
                            <br />
                            <br />
                            演示了新的分页操作方式
                            <br />
                            <br />
                            新增modules/test模块，提供了modules所有模块的TestCase。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.3
                            <br />
                            <br />
                            删除examples/mini-web-security模块。
                            <br />
                            <br />
                            删除modules/extension-frontier-security模块。
                            <br />
                            <br />
                            权限模型对象建立完成。
                            <br />
                            <br />
                            权限相关数据库表结构设计完成。
                            <br />
                            <br />
                            新增modules/security模块，提供对权限模型的定义和权限服务接口的缺省实现。若采用iDev提供的权限模型，需要依赖idev-security.
                            <br />
                            <br />
                            jar，maven配置
                            <br />
                            <br />
                            模块idev-security中增加了权限相关的服务接口的Junit TestCase。
                            <br />
                            <br />
                            新增modules/console模块，设置为依赖idev-security 模块，提供了权限接口服务调用的演示。
                            <br />
                            <br />
                            modules/console模块，提供了"功能注册页面"的功能。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.2
                            <br />
                            <br />
                            JDK版本设置为JDK1.5。
                            <br />
                            <br />
                            在Core中新增了安全模型(Entity)，服务接口(Interface)。
                            <br />
                            <br />
                            基于方天发电项目的数据库结构，实现了业务子系统、组织、角色、人员、权限等服务的接口。
                            <br />
                            <br />
                            提供了用户登录功能和页面，用户密码加密采用MD5方式。
                            <br />
                            <br />
                            ------------------------------------------------------------------------------------------
                            <br />
                            <br />
                            v2.0.1
                            <br />
                            <br />
                            代码框架建立，模块划分完成。
                            <br />
                            <br />
                            Mini-Web-Jpa Web应用完成，提供人员帐号页面的CRUD功能。
                            <br />
                            <br />
                            封装了Spring+Struts2+Ibatis的一些基础类。
                            <br />
                            <br />

                        </Panel>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = page;