/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/5
 * Time: 11:02
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    angular.module('app.core').constant('ERRORS', {
        email: '格式错误',
        required: '不能为空',
        validatePassword: '密码格式错误',
        repeat: '确认秘密和新密码不一致',
        number: '只能是数字'
    });
})();