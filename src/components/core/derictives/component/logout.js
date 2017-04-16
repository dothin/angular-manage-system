/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/29
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 退出
     */
    angular.module('app.core').directive('logout', logout);

    logout.$inject = ['tools', '$state', 'userServer'];

    function logout(tools, $state, userServer) {
        return {
            restrict: 'E',
            template: '<a href="javascript:;" title="退出" ng-click="logout()" tool-tip="{content:\'退出\',mode:\'bottom\'}">' +
            '<svg class="icon" aria-hidden="true">' +
            '<use xlink:href="#icon-guanbi"></use>' +
            '</svg></a>',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.logout = function () {
                    userServer.logout().then(function (data) {
                        if (data.status) {
                            tools.logout();
                            //$state.go('login');
                            window.location.href = 'http://rap.xdbigdata.com/app-store/#/login';
                        }
                    });
                };
            }
        };
    }
})();
