/**
 * Created with IntelliJ IDEA.
 * User: codingYing
 * Date: 2017/4/21
 * Time: 10:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    angular.module('app.echarts').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'main.echarts',
            config: {
                url: '/echarts',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/echarts/echarts.html',
                        controller: 'echartsCtrl as vm',
                        resolve: {
                            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('lib/echarts/dist/echarts.min.js').then(function () {
                                    return $ocLazyLoad.load('plugins/china.js')
                                });
                            }]
                        }
                    }
                }
            }
        },{
            state: 'main.echarts.bar',
            config: {
                url: '/bar',
                templateUrl: 'dist/tpls/echarts/bar/bar.html',
                controller: 'barCtrl as vm'
            }
        },{
            state: 'main.echarts.line',
            config: {
                url: '/line',
                templateUrl: 'dist/tpls/echarts/line/line.html',
                controller: 'lineCtrl as vm'
            }
        },{
            state: 'main.echarts.pie',
            config: {
                url: '/pie',
                templateUrl: 'dist/tpls/echarts/pie/pie.html',
                controller: 'pieCtrl as vm'
            }
        }];
    }
})();