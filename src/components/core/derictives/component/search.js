/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/14
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('search', [function () {
        return {
            restrict: 'E',
            template: '<div class="search-btn-group pull-right">' +
            '<input type="text" ng-model="vm.searchText" placeholder="{{vm.placeholderText}}" ng-keypress="vm.enterDown($event)"/>' +
            '<button ng-click="vm.search()"><svg class="icon" aria-hidden="true">' +
            '<use xlink:href="#icon-sousuo"></use>' +
            '</svg></button>' +
            '</div>',
            replace: true,
            scope: {
                conf: '=searchConfig',
                searchText:'=',//有些情况需要搜索内容默认显示，比如个人学生搜索页面
                placeholderText: '@'
            },
            bindToController: true,
            controller: 'searchController',
            controllerAs: 'vm'
        };
    }]).controller('searchController', ['tools',function (tools) {
        var vm = this;
        //search
        vm.search = function () {
            if(vm.searchText){
                vm.conf.search && vm.conf.search(vm.searchText);
            }else{
                tools.alertError('搜索内容不能为空');
            }
        };
        //回车跳转搜索
        vm.enterDown = function ($event) {
            $event.keyCode === 13&&vm.search();
        };
    }]);
})();