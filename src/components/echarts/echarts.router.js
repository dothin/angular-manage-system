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
                templateUrl: 'echarts/echarts.html',
                controller: 'echartsCtrl as vm'
            }
        }];
    }
})();