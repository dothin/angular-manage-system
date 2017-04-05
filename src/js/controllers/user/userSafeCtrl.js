/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('userSafeCtrl', ['$rootScope', 'userServer', 'tools',
        function ($rootScope, userServer, tools) {
            var vm = this;
            vm.user = $rootScope.user;
            vm.submit = false;
            vm.resetPass = function () {
                vm.submit = true;
                if (vm.resetPassForm.$valid) {
                    var _postData = {
                        'username': vm.user.username,
                        'oldPass': vm.user.oldPass,
                        'newPass': vm.user.newPass
                    };
                    userServer.changePassword(_postData).then(function (data) {
                        if (data.status) {
                            tools.alertSuccess('修改密码成功');
                            vm.user = {};
                            vm.submit = false;
                        }
                    });
                }
            };
        }
    ]);
})();