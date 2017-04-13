/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 11:41
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.core').factory('userSerivce', userSerivce);
    userSerivce.$inject = ['httpServer'];

    function userSerivce(httpServer) {
        var myServices = {};
        //登录
        myServices.login = function (data) {
            return httpServer.postHttp('/user/login', data);
        };
        //退出登录
        myServices.logout = function () {
            return httpServer.postHttp('/user/logout');
        };
        return myServices;
    }
})();