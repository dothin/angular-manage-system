/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/8
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('asideCtrl', ['$state', 'CONFIG', '$rootScope',
        function ($state, CONFIG, $rootScope) {
            var vm = this;
            vm.state = $state;
            vm.config = CONFIG;
            /**
             * 点击群体画像，根据配置文件选择默认跳转
             */
            vm.goGroupHX = function () {
                var _keepGoing = true;
                angular.forEach(CONFIG.groupHX, function (data, key) {
                    //angular.forEach没有break；用_keepGoing模拟break跳出循环；
                    if (_keepGoing && data.show) {
                        window.localStorage.setItem('groupNameList', angular.toJson({all: {cName: $rootScope.user.type === 0 ? '全学院' : '全校'}}));
                        window.localStorage.setItem('groupCondition', angular.toJson({role: 0}));
                        window.localStorage.removeItem('groupCount');
                        $state.go('main.groupHX.' + key, {}, {reload: true});
                        _keepGoing = false;
                    }
                });
            };
        }
    ]);
})();