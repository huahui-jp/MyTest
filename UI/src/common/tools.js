/**
 * Created by jiangb on 15/6/6.
 */
var faker = require('faker');
var _ = require('lodash');

var tools = {

    getNextPageRows: function (rows, currentPage, pageSize) {
        var fromRowNumber = 0;
        var toRowNumber = 0;
        var rowsTotoal = rows.length;
        if (rows.length == 0 || pageSize == 0) {
            fromRowNumber = 0;
            toRowNumber = 0;
        } else {
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

    createFakeRowObjectData: function (/*number*/ index) {
        faker.locale = "zh_CN";
        return {
            id: index,
            avartar: faker.image.avatar(),
            city: faker.address.city(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            street: faker.address.streetName(),
            zipCode: faker.address.zipCode(),
            _date: faker.date.past(),
            bs: faker.company.bs(),
            catchPhrase: faker.company.catchPhrase(),
            companyName: faker.company.companyName(),
            words: faker.lorem.words(),
            sentence: faker.lorem.sentence()
        };
    },
    filterRowsByColumns: function (config) {
        var rows = config.rows;
        var querystring = config.querystring;
        var columns = config.columns;

        var newRows = Array();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (_.isEmpty(querystring)) {
                newRows.push(row);
            } else {
                var flag = false;
                for (var j = 0; j < columns.length; j++) {
                    var column = columns[j];
                    //TODO：字符串中特殊字符要处理，否则会报错。
                    var rowValue = row["" + column];
                    console.log("filterRowsByColumns--->"+column+"---->"+rowValue);
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
    }

};

module.exports = tools;
