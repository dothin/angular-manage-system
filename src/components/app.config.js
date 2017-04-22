/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/22
 * Time: 17:24
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app').config(appConfig);

    appConfig.$inject = ['$httpProvider'];

    function appConfig($httpProvider) {
        $httpProvider.interceptors.push('postInterceptor');
    }
})();