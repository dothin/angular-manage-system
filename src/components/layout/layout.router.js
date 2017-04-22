/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:34
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    angular.module('app.layout').run(appRun);
    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        var otherwise = '/main';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: 'main',
                config: {
                    url: '/main',
                    views: {
                        '': {
                            templateUrl: 'dist/tpls/layout/main.html'
                        },
                        'header@main': {
                            templateUrl: 'dist/tpls/layout/header.html',
                            controller: 'headerCtrl as vm'
                        },
                        'aside@main': {
                            templateUrl: 'dist/tpls/layout/aside.html',
                            controller: 'asideCtrl as vm'
                        },
                        'section@main': {
                            controller: ['$state', function ($state) {
                                $state.go('main.home');
                            }]
                        }
                    }
                }
            },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: '404.html'
                }
            }
        ];
    }
})();
