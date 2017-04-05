/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/5
 * Time: 10:55
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 用户服务
     */
    myApp.factory('userServer', ['httpServer',
        function (httpServer) {
            var myServices = {};
            //登录
            myServices.login = function (data) {
                return httpServer.postHttp('/user/login', data);
            };
            //退出登录
            myServices.logout = function () {
                return httpServer.postHttp('/user/logout');
            };
            //修改密码
            myServices.changePassword = function (data) {
                return httpServer.postHttp('/user/security/changePassword', data);
            };
            return myServices;
        }
    ]);
})();