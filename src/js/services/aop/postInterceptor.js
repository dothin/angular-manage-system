/**
 * @Author: gaohuabin
 * @Date:   2016-10-07 17:17:55
 * @Last Modified by:   gaohuabin
 * @Last Modified time: 2016-10-07 17:19:15
 */
(function () {
    'use strict';
    myApp.factory('postInterceptor', ['$rootScope', '$cookies', '$location', '$q', 'tools', '$timeout',
        function ($rootScope, $cookies, $location, $q, tools, $timeout) {
            return {
                'request': function (config) {
                    return config;
                },
                'response': function (resp) {
                    if (resp.data.status === false) {
                        if (resp.data.code === 70005) {
                            tools.alertError('登录过期，正在跳转到登录界面');
                            $timeout(function () {
                                $cookies.remove('user');
                                $rootScope.user = $cookies.getObject('user');
                                localStorage.clear();
                                window.location.href = $location.$$absUrl.split('#')[0] + '#/login';
                            }, 2000);
                        } else {
                            tools.alertError(resp.data.message);
                        }
                    }
                    return resp;
                },
                'requestError': function (rejection) {
                    console.log('requestError' + $q.reject(rejection));
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    if (rejection.status === 500) {
                        tools.alertError('服务器异常！！！');
                        /*$timeout(function () {
                            $cookies.remove('user');
                            $rootScope.user = $cookies.getObject('user');
                            localStorage.clear();
                            window.location.href = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/#/login';
                        }, 1000);*/
                    }
                    return rejection;
                }
            };
        }]);
})();