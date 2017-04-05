/**
 * @Author: dothin
 * @Date:   2016-10-19 10:42:23
 * @Last Modified by:   dothin
 * @Last Modified time: 2016-10-19 10:54:52
 */

(function () {
    'use strict';
    myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngRapProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, ngRapProvider) {

            /*************************使用mock数据—­mockserver*********************/
            ngRapProvider.script = 'http://rap.xdbigdata.com/rap.plugin.js?projectId=14'; //replce your host and project id
            ngRapProvider.enable({
                mode: 3
            });
            $httpProvider.interceptors.push('rapMockInterceptor');
            /******************************************************************/

            $httpProvider.interceptors.push('postInterceptor');
            $urlRouterProvider.otherwise('/main');
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'dist/tpls/login.html',
                controller: 'loginCtrl as vm'
            }).state('404', {
                url: '/404',
                templateUrl: '404.html'
            }).state('main', {
                url: '/main',
                views: {
                    '': {
                        templateUrl: 'dist/tpls/main.html'
                    },
                    'header@main': {
                        templateUrl: 'dist/tpls/header.html',
                        controller: 'headerCtrl as vm'
                    },
                    'aside@main': {
                        templateUrl: 'dist/tpls/aside.html',
                        controller: 'asideCtrl as vm'
                    },
                    'section@main': {
                        templateUrl: 'dist/tpls/home/home.html',
                        controller: ['$state', function ($state) {
                            $state.go('main.home');
                        }]
                    }
                }
            }).state('main.home', {
                url: '/home',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/home/home.html',
                        controller: 'homeCtrl as vm'
                    }
                }
            }).state('main.echarts', {
                url: '/echarts',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/echarts/echarts.html',
                        controller: 'echartsCtrl as vm'
                    }
                }
            }).state('main.echarts.bar', {
                url: '/bar',
                templateUrl: 'dist/tpls/echarts/bar.html',
                controller: 'barCtrl as vm'
            }).state('main.echarts.line', {
                url: '/line',
                templateUrl: 'dist/tpls/echarts/line.html',
                controller: 'lineCtrl as vm'
            }).state('main.form', {
                url: '/form',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/form/form.html',
                        controller: 'formCtrl as vm'
                    }
                }
            }).state('main.form.validate', {
                url: '/validate',
                templateUrl: 'dist/tpls/form/validate.html',
                controller: 'validateCtrl as vm'
            });
        }
    ]);
})();