/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/5
 * Time: 14:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * http服务
     */
    myApp.factory('httpServer', ['$http', '$q', 'ROOT',
        function ($http, $q, ROOT) {
            return {
                postHttp: function (url, data) {
                    var deferred = $q.defer();
                    if (data) {
                        $http({
                            method: 'post',
                            url: ROOT + url,
                            data: data,
                            timeout: deferred.promise,
                            cancel: deferred
                        }).success(function (resp) {
                            deferred.resolve(resp);
                        }).error(function (resp) {
                            deferred.reject(resp);
                        });
                    } else {
                        $http({
                            method: 'post',
                            url: ROOT + url,
                            timeout: deferred.promise,
                            cancel: deferred,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (resp) {
                            deferred.resolve(resp);
                        }).error(function (resp) {
                            deferred.reject(resp);
                        });
                    }
                    return deferred.promise;
                },
                put: function (url, data) {
                    var deferred = $q.defer();
                    $http({
                        method: 'put',
                        url: ROOT + url,
                        data: data,
                        timeout: deferred.promise,
                        cancel: deferred
                    }).success(function (resp) {
                        deferred.resolve(resp);
                    }).error(function (resp) {
                        deferred.reject(resp);
                    });
                    return deferred.promise;
                },
                post: function (url, data) {
                    var deferred = $q.defer();
                    $http.post(ROOT + url + '/' + data, {
                        timeout: deferred.promise,
                        cancel: deferred
                    }).success(function (resp) {
                        deferred.resolve(resp);
                    }).error(function (resp) {
                        deferred.reject(resp);
                    });
                    return deferred.promise;
                },
                get: function (url, data) {
                    var deferred = $q.defer();
                    $http.get(ROOT + url + (data ? ('/' + data) : ''), {
                        timeout: deferred.promise,
                        cancel: deferred
                    }).success(function (resp) {
                        deferred.resolve(resp);
                    }).error(function (resp) {
                        deferred.reject(resp);
                    });
                    return deferred.promise;
                },
                delete: function (url, data) {
                    var deferred = $q.defer();
                    $http.delete(ROOT + url + '/' + data, {
                        timeout: deferred.promise,
                        cancel: deferred
                    }).success(function (resp) {
                        deferred.resolve(resp);
                    }).error(function (resp) {
                        deferred.reject(resp);
                    });
                    return deferred.promise;
                }
            };
        }
    ]);
})();
