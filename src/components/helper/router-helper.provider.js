/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 9:38
 * To change this template use File | Settings | File Templates.
 */
// Help configure the state-base ui.router
(function () {
    'use strict';
    angular.module('app.helper').provider('routerHelper', routerHelperProvider);
    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    /* @ngInject */
    function routerHelperProvider($stateProvider, $urlRouterProvider, $httpProvider) {
        this.$get = RouterHelper;
        RouterHelper.$inject = ['$rootScope', '$state'];
        /* @ngInject */
        function RouterHelper($rootScope, $state) {
            $httpProvider.interceptors.push('postInterceptor');
            var hasOtherwise = false;
            ///////////////
            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    // add login check if requireLogin is true
                    /*var data = state.config.data;
                    if (data && data.requireLogin === true) {
                        state.config.resolve = angular.extend(state.config.resolve || {}, {
                            'loginResolve': resolve.login
                        });
                    }
                    state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);*/
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