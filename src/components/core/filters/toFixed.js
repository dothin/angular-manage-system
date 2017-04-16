/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/5
 * Time: 14:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 支持数字和数组
     */
    angular.module('app.core').factory('toFixed', toFixed);

    toFixed.$inject = [];

    function toFixed() {
        return function (input, num) {
            if (input == null) {
                return '-';
            }
            if (num >= 100) {
                //如果是数字，直接截取返回
                if (angular.isNumber(input)) {
                    return Math.floor(input * num) / num;
                } else if (angular.isArray(input)) {
                    //如果是数组，遍历数组
                    angular.forEach(input, function (data, key) {
                        //如果数组是纯数字数组，直接截取
                        if (angular.isNumber(data)) {
                            input[key] = Math.floor(data * num) / num;
                        } else if (angular.isObject(data)) {
                            //如果数组使json数组，截取返回对象里面的数字类型
                            angular.forEach(data, function (value, key1) {
                                if (angular.isNumber(value)) {
                                    data[key1] = Math.floor(value * num) / num;
                                }
                            });
                        }
                    });
                    return input;
                } else {
                    return input;
                }
            } else {
                //如果是数字，直接截取返回
                if (angular.isNumber(input)) {
                    return input.toFixed(num);
                } else if (angular.isArray(input)) {
                    //如果是数组，遍历数组
                    angular.forEach(input, function (data, key) {
                        //如果数组是纯数字数组，直接截取
                        if (angular.isNumber(data)) {
                            input[key] = data.toFixed(num);
                        } else if (angular.isObject(data)) {
                            //如果数组使json数组，截取返回对象里面的数字类型
                            angular.forEach(data, function (value, key1) {
                                if (angular.isNumber(value)) {
                                    data[key1] = value.toFixed(num);
                                }
                            });
                        }
                    });
                    return input;
                } else {
                    return input;
                }
            }
        };
    }
})();
