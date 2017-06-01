/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:30
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    angular.module('app.table').controller('tableCtrl', tableCtrl);
    tableCtrl.$inject = ['$state', '$rootScope', 'tools'];
    function tableCtrl($state, $rootScope, tools) {
        tools.alertSuccess('success')
    }
})();
