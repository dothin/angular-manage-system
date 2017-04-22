/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 9:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 定义provider，等待各个模块的run方法调用来配置路由
     */
    angular.module('app.helper').provider('routerHelper', routerHelperProvider);
    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;
        RouterHelper.$inject = ['$rootScope', '$state'];

        function RouterHelper($rootScope, $state) {
            var hasOtherwise = false;
            ///////////////
            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };
            return service;
        }
    }
})();