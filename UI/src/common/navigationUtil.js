/**
 * common.navigationUtil.js 
 *
 * 分页查询工具类
 * 
 * @author zhoujiang
 */
var _ = require('lodash');

var tools = {
    /**
     * 获取分页数据
     * 
     * @param  rows 数据
     * @param  rows 当前页数
     * @param  rows 每页的行数
     *
     * @return 过滤之后的数据
     */
    getNextPageRows: function (params) {
        var rows = params.rows;
        var currentPage = params.currentPage || 0;
        var pageSize = params.pageSize;

        var fromRowNumber = 0;
        var toRowNumber = 0;
        var rowsTotoal = rows.length;
        if (rows.length == 0 || pageSize == 0) {//没有数据的情况
            fromRowNumber = 0;
            toRowNumber = 0;
        } else {//有数据的情况
            fromRowNumber = currentPage * pageSize + 1;
            if (rowsTotoal <= pageSize) {
                toRowNumber = rowsTotoal;
            } else if ((currentPage + 1) * pageSize <= rowsTotoal) {
                toRowNumber = (currentPage + 1) * pageSize;
            } else {
                toRowNumber = currentPage * pageSize + rowsTotoal % pageSize;
            }

        }
        //console.log(currentPage,pageSize,fromRowNumber,toRowNumber,rowsTotoal);
        var newRows = rows.slice(fromRowNumber - 1, toRowNumber);
        return newRows;
    },
    /**
     * 根据条件对指定列进行模糊查询
     * 
     * @param  rows 数据
     * @param  querystring 查询条件
     * @param  columns 过滤字段[数组]
     * 
     * @return 查询后的数据
     */
    filterRowsByColumns: function (param) {
        var rows = param.rows;
        var querystring = param.querystring;
        var columns = param.columns;

        var newRows = Array();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (_.isEmpty(querystring)) {//查询条件为空
                newRows.push(row);
            } else {
                var flag = false;//是否符合过滤条件
                for (var j = 0; j < columns.length; j++) {//逐个字段进行过滤
                    var column = columns[j];
                    //TODO：字符串中特殊字符要处理，否则会报错。
                    var rowValue = row["" + column];
                    // console.log("filterRowsByColumns--->"+column+"---->"+rowValue);
                    if (column && rowValue.indexOf(querystring) > -1) {
                        flag = true;
                    }
                }
                if (flag) {
                    newRows.push(row);
                }
            }
        }
        return newRows;
    },
    /**
     * 过滤数据
     * 
     * @param  row 数据
     * @param  querystring 过滤条件
     * @param  currentPage 当前页数
     * @param columns 过滤字段
     * 
     */
    filterData: function(params){//TODO 抽取为共通
        // var rows = params.rows;
        var querystring = params.querystring || "";
        

        var filterRows = this.filterRowsByColumns(params);
        params.filterRows = filterRows;
        var newRows = this.getNextPageRows(params);
        return {
            rows: newRows,
            rowsTotoal: filterRows.length,
            currentPage: params.currentPage
        };
    },

};

module.exports = tools;
