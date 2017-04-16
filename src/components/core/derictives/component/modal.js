/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/31
 * Time: 16:04
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 模态框指令
     */
    angular.module('app.core').factory('modal', modal);

    modal.$inject = [];

    function modal() {
        return {
            restrict: 'E',
            templateUrl: 'build/tpls/directiveTpls/modal.html',
            replace: true,
            transclude: true,
            scope: {
                modalConf: '=conf',
                title: '@'
            },
            bindToController: true, //将scope数据绑定到vm上
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                if (vm.modalConf) {
                    //是否显示footer和是否大模态框，默认是false
                    vm.modalConf.showFooter = vm.modalConf.showFooter != null ? vm.modalConf.showFooter : true;
                    vm.modalConf.big = vm.modalConf.big != null ? vm.modalConf.big : false;
                    vm.modalConf.show = vm.modalConf.show != null ? vm.modalConf.show : false;
                    //title和modalId有两种配置方式,分别是modalConf和@
                    vm.modalConf.title = vm.modalConf.title != null ? vm.modalConf.title : vm.title;
                    vm.modalConf.id = vm.modalConf.id != null ? vm.modalConf.id : vm.id;
                    vm.hide = function () {
                        vm.modalConf.show = false;
                    };
                    /**
                     * 关闭钩子
                     */
                    vm.cancel = function () {
                        vm.hide();
                        vm.modalConf.cancel && vm.modalConf.cancel();
                    };
                    /**
                     * 保存钩子
                     */
                    vm.save = function () {
                        vm.modalConf.save && vm.modalConf.save();
                    };
                }
            }]
        };
    }
})();