/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/8
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.layout').controller('asideCtrl', asideCtrl);
    asideCtrl.$inject = ['$state', '$rootScope'];
    function asideCtrl($state, $rootScope) {
        var vm = this;
        vm.state = $state;
    }
})();
