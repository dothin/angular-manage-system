/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').factory('validatePassword', validatePassword);

    validatePassword.$inject = ['$compile'];

    function validatePassword($compile) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    //正则反向验证：密码要求长度8-20位，至少包括大写字母、小写字母、数字、特殊字符中的两项。
                    var passwordRegexp = /^([0-9]*|[A-Z]*|[a-z]*|[^0-9a-zA-Z]*)$/;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || !passwordRegexp.test(value);
                    ngModel.$setValidity('validatePassword', validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }
})();