/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/8
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('headerCtrl', ['$rootScope',
        function ($rootScope) {
            var vm = this;
            vm.username = $rootScope.user.username;
        }
    ]);
})();