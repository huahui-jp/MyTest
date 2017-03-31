/**
 * Created by jiangb on 15/6/6.
 */

var gritter = {

    add: function (config) {
        var _title = config.title || "信息";
        var _time = config.time || "3000";
        var _class_name = config.class_name || "gritter-info gritter-light";
        $.gritter.add({ // TODO Tomcat下面暴挫
            title: _title,
            text: config.text,
            sticky: config.sticky,
            image: config.image,
            time: _time,
            class_name: _class_name
        });
    }
};

module.exports = gritter;

