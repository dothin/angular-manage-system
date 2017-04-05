/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/20
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('loginCtrl', ['$rootScope', '$cookies', '$state', 'tools', 'userServer',
        function ($rootScope, $cookies, $state, tools, userServer) {
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
                    userServer.login(vm.user).then(function (data) {
                        if (data.status) {
                            $cookies.putObject('user', data.data);
                            $rootScope.user = $cookies.getObject('user');
                            $state.go('main');
                        } else {
                        }
                    });
                }
            };
        }
    ]);
})();