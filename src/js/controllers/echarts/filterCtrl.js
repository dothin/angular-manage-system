/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/30
 * Time: 15:28
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('filterCtrl', ['$state', 'CONFIG', 'tools',
        function ($state, CONFIG, tools) {
            var vm = this;
            vm.condition = {};
            vm.filterConf = {
                filter: {}
            };
            /**
             * 清空
             */
            vm.clearAll = function () {
                vm.filterConf.filter = {};
            };
            /**
             * 提交
             */
            vm.submit = function () {
                if (tools.isEmptyObject(vm.filterConf.filter)) {
                    tools.alertError('请先选择条件');
                    return false;
                }
                angular.forEach(vm.filterConf.filter, function (value, key) {
                    vm.condition[key] = value.objArr;
                });
                /**
                 * 根据配置文件选择默认跳转
                 */
                var _keepGoing = true;
                angular.forEach(CONFIG.groupHX, function (data, key) {
                    //angular.forEach没有break；用_keepGoing模拟break跳出循环；
                    if (_keepGoing && data.show) {
                        window.localStorage.setItem('groupNameList', angular.toJson(vm.filterConf.filter));
                        window.localStorage.setItem('groupCondition', angular.toJson(vm.condition));
                        window.localStorage.removeItem('groupCount');
                        $state.go('main.groupHX.' + key);
                        _keepGoing = false;
                    }
                });
            };
        }
    ]);
})();