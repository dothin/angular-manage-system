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
    loginCtrl.$inject = ['$rootScope', '$state', 'userSerivce'];
    /* @ngInject */
    function loginCtrl($rootScope, $state, userSerivce) {
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
                $state.go('main');
                userSerivce.login(vm.user).then(function () {
                    
                });
            }
        };
    }
})();