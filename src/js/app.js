/**
 * @Author: gaohuabin
 * @Date:   2016-10-07 17:12:32
 * @Last Modified by:   gaohuabin
 * @Last Modified time: 2016-10-19 10:51:19
 */
'use strict';
var myApp = angular.module('hxApp', [
    'oc.lazyLoad',
    'angular-loading-bar',
    'ngCookies',
    'ngRap',
    'ngAnimate',
    'ui.router']);
myApp.run(['$rootScope', '$cookies', 'CONFIG', '$state', '$http',
    function ($rootScope, $cookies, CONFIG, $state, $http) {
        /*if ($cookies.getObject('user')) {
         $rootScope.user = $cookies.getObject('user');
         }*/
        window.localStorage.setItem('user',angular.toJson({name:'school'}));
        var _user = angular.fromJson(localStorage.getItem('user'));
        if (_user) {
            $rootScope.user = {
                username: _user.name,
                type: 0
            };
        } else {
            window.location.href = 'http://rap.xdbigdata.com/app-store/#/login';
        }
        /**
         * 取消请求
         */
        $rootScope.clearPending = function () {
            angular.forEach($http.pendingRequests, function (request) {
                if (request.cancel && request.timeout) {
                    request.cancel.resolve('canceled');
                }
            });
        };
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.clearPending();
            $rootScope.alert = false;
        });
        //操作成功或失败弹窗
        $rootScope.isActive;
        $rootScope.alertValue = '';
        $rootScope.alert = false;
    }
]);