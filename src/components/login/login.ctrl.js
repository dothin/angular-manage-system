/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/20
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.login').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$state', '$cookies'];

    function loginCtrl($rootScope, $state, $cookies) {
        //检查登录
        $rootScope.user && $state.go('main');
        var vm = this;
        vm.submit = false;
        vm.user = {};
        /**
         * 登录
         * @returns {boolean}
         */
        vm.login = function () {
            vm.submit = true;
            if (vm.loginForm.$valid) {
                $cookies.putObject('user', {
                    name: vm.user.username
                });
                $rootScope.user = $cookies.getObject('user');
                $state.go('main');
            }
        };
    }
})();