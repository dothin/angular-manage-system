/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/28
 * Time: 16:15
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('homeCtrl', ['$state', 'CONFIG', '$rootScope', '$timeout',
        function ($state, CONFIG, $rootScope, $timeout) {
            var vm = this;
            vm.goGroupHX = function (state) {
                window.localStorage.setItem('groupNameList', angular.toJson({all: {cName: $rootScope.user.type === 0 ? '全学院' : '全校'}}));
                window.localStorage.setItem('groupCondition', angular.toJson({}));
                window.localStorage.removeItem('groupCount');
                $state.go('main.groupHX.' + state);
            };
            $timeout(function () {
                vm.config = CONFIG;
            });
        }
    ]);
})();