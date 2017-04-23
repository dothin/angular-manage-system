/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/11
 * Time: 10:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 表单错误过滤器
     */
    angular.module('app.core').filter('error', error);

    error.$inject = ['ERRORS'];

    function error(ERRORS) {
        return function (name, customMessages) {
            var errors = angular.extend({}, ERRORS, customMessages);
            return errors[name] || name;
        };
    }
})();