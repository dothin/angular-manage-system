/**
 * Created by liuying on 2017/6/5.
 */
(function () {
    'use strict';

    angular.module('app.form').controller('checkAllCtrl', [function () {
        var vm = this;

        vm.list = [
            {'id': 101},
            {'id': 102},
            {'id': 103},
            {'id': 104},
            {'id': 105},
            {'id': 106},
            {'id': 107}
        ];

        vm.m = [];
        vm.checked = [];
        vm.selectAll = function () {
            if(vm.select_all) {
                vm.checked = [];
                angular.forEach(vm.list, function (i) {
                    i.checked = true;
                    vm.checked.push(i.id);
                })
            }else {
                angular.forEach(vm.list, function (i) {
                    i.checked = false;
                    vm.checked = [];
                })
            }
        };
        vm.selectOne = function () {
            angular.forEach(vm.list , function (i) {
                var index = vm.checked.indexOf(i.id);
                if(i.checked && index === -1) {
                    vm.checked.push(i.id);
                } else if (!i.checked && index !== -1){
                    vm.checked.splice(index, 1);
                };
            })

            if (vm.list.length === vm.checked.length) {
                vm.select_all = true;
            } else {
                vm.select_all = false;
            }
        }
    }]);
})();