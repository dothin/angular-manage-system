/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 9:36
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.helper',['ui.router']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 17:54
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.core', [
        'app.helper',
        'angular-loading-bar',
        'ngAnimate',
        'ngCookies']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: codingYing
 * Date: 2017/4/21
 * Time: 10:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts', ['app.core']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.home', ['app.core']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.layout', ['app.core']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 17:54
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.login', ['app.core']);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 17:54
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app', [
        'app.core',
        'app.helper',
        'app.home',
        'app.layout',
        'app.login'
    ]);
})();
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
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 15:17
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app').run(appRun);
    appRun.$inject = ['$rootScope', '$cookies', '$state', '$http'];

    function appRun($rootScope, $cookies, $state, $http) {
        window.localStorage.setItem('user', angular.toJson({name: 'school'}));
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
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/22
 * Time: 16:37
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').directive('changeMode', changeMode);

    changeMode.$inject = ['$timeout'];

    function changeMode($timeout) {
        return {
            restrict: 'E',
            template: '<span class="change-mode">' +
            '<svg class="icon" aria-hidden="true">' +
            '<use ng-if="!mode" xlink:href="#icon-quanping"></use>' +
            '<use ng-if="mode" xlink:href="#icon-suoxiao"></use>' +
            '</svg></span>',
            replace: true,
            scope: {
                mode: '='
            },
            link: function (scope, element) {
                var _timer = null;
                element.on('click', function () {
                    $timeout.cancel(_timer);
                    scope.mode = !scope.mode;
                    scope.$apply();
                    _timer = $timeout(function () {
                        /*var event = new Event('resize');
                         window.dispatchEvent(event);*/
                        window.onresize();
                    }, 14);
                });
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: codingYing
 * Date: 2017/4/21
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    angular.module('app.echarts').controller('echartsCtrl', echartsCtrl);

    echartsCtrl.$inject = [];
    function echartsCtrl() {
        var vm = this;
    }
})();

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
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:30
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    angular.module('app.home').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$state', '$rootScope', 'tools'];
    function homeCtrl($state, $rootScope, tools) {
        tools.alertSuccess('success')
    }
})();

/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:34
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.home').run(appRun);
    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'main.home',
            config: {
                url: '/home',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/home/home.html',
                        controller: 'homeCtrl as vm'
                    }
                }
            }
        }];
    }
})();

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/8
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.layout').controller('asideCtrl', asideCtrl);
    asideCtrl.$inject = ['$state', '$rootScope'];

    function asideCtrl($state, $rootScope) {
        var vm = this;
        vm.state = $state;
    }
})();

/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:30
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    angular.module('app.layout').controller('headerCtrl', headerCtrl);
    headerCtrl.$inject = ['$state', '$rootScope'];

    function headerCtrl($state, $rootScope) {
    }
})();

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

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/20
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.login').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$state', 'userServer'];

    function loginCtrl($rootScope, $state, userServer) {
        //检查登录
        $rootScope.user && $state.go('main');
        var vm = this;
        vm.submit = false;
        vm.user = {};
        /**
         * 登录
         * @returns {boolean}
         */
        vm.login = function () {
            vm.submit = true;
            if (vm.loginForm.$valid) {
                $state.go('main');
                userServer.login(vm.user).then(function () {
                    
                });
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 18:00
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.login').run(appRun);
    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'login',
            config: {
                url: '/login',
                templateUrl: 'dist/tpls/login/login.html',
                controller: 'loginCtrl as vm'
            }
        }];
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/11
 * Time: 10:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 表单错误过滤器
     */
    angular.module('app.core').factory('error', error);

    error.$inject = ['ERRORS'];

    function error(ERRORS) {
        return function (name, customMessages) {
            var errors = angular.extend({}, ERRORS, customMessages);
            return errors[name] || name;
        };
    }
})();
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
     * 支持数字和数组
     */
    angular.module('app.core').factory('toFixed', toFixed);

    toFixed.$inject = [];

    function toFixed() {
        return function (input, num) {
            if (input == null) {
                return '-';
            }
            if (num >= 100) {
                //如果是数字，直接截取返回
                if (angular.isNumber(input)) {
                    return Math.floor(input * num) / num;
                } else if (angular.isArray(input)) {
                    //如果是数组，遍历数组
                    angular.forEach(input, function (data, key) {
                        //如果数组是纯数字数组，直接截取
                        if (angular.isNumber(data)) {
                            input[key] = Math.floor(data * num) / num;
                        } else if (angular.isObject(data)) {
                            //如果数组使json数组，截取返回对象里面的数字类型
                            angular.forEach(data, function (value, key1) {
                                if (angular.isNumber(value)) {
                                    data[key1] = Math.floor(value * num) / num;
                                }
                            });
                        }
                    });
                    return input;
                } else {
                    return input;
                }
            } else {
                //如果是数字，直接截取返回
                if (angular.isNumber(input)) {
                    return input.toFixed(num);
                } else if (angular.isArray(input)) {
                    //如果是数组，遍历数组
                    angular.forEach(input, function (data, key) {
                        //如果数组是纯数字数组，直接截取
                        if (angular.isNumber(data)) {
                            input[key] = data.toFixed(num);
                        } else if (angular.isObject(data)) {
                            //如果数组使json数组，截取返回对象里面的数字类型
                            angular.forEach(data, function (value, key1) {
                                if (angular.isNumber(value)) {
                                    data[key1] = value.toFixed(num);
                                }
                            });
                        }
                    });
                    return input;
                } else {
                    return input;
                }
            }
        };
    }
})();

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
     * 表单错误过滤器
     */
    angular.module('app.core').factory('toTrusted', toTrusted);

    toTrusted.$inject = ['$sce'];

    function toTrusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
})();

/**
 * @Author: gaohuabin
 * @Date:   2016-10-07 17:17:55
 * @Last Modified by:   gaohuabin
 * @Last Modified time: 2016-10-07 17:19:15
 */
(function () {
    'use strict';
    angular.module('app.core').factory('postInterceptor', postInterceptor);
    postInterceptor.$inject = ['$rootScope', '$location', '$q', 'tools', '$timeout', '$cookies'];
    function postInterceptor ($rootScope, $location, $q, tools, $timeout, $cookies) {
        return {
            'request': function (config) {
                return config;
            },
            'response': function (resp) {
                if (resp.data.status === false) {
                    if (resp.data.code === 70005) {
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
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/22
 * Time: 15:30
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * echarts主题配置
     */
    var _theme = {
        'color': [
            '#00aaff',
            '#ff587b',
            '#29d582',
            '#ffc62f',
            '#24ccf6',
            '#f7233c',
            '#7d68ff',
            '#ff7700'
        ],
        'backgroundColor': 'rgba(0,0,0,0)',
        'textStyle': {},
        'title': {
            'textStyle': {
                'color': '#333333'
            },
            'subtextStyle': {
                'color': '#aaaaaa'
            }
        },
        'line': {
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': 2
                }
            },
            'symbolSize': '5',
            'symbol': 'emptyCircle',
            'smooth': false
        },
        'radar': {
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': 2
                }
            },
            'symbolSize': '5',
            'symbol': 'emptyCircle',
            'smooth': false
        },
        'bar': {
            'itemStyle': {
                'normal': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                },
                'emphasis': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                }
            }
        },
        'pie': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'scatter': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'boxplot': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'parallel': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'sankey': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'funnel': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'gauge': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'candlestick': {
            'itemStyle': {
                'normal': {
                    'color': '#c12e34',
                    'color0': '#2b821d',
                    'borderColor': '#c12e34',
                    'borderColor0': '#2b821d',
                    'borderWidth': 1
                }
            }
        },
        'graph': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': '1',
                    'color': '#aaaaaa'
                }
            },
            'symbolSize': '25'
        },
        'map': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#dddddd',
                    'borderColor': '#eeeeee',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(230,182,0,1)',
                    'borderColor': '#dddddd',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#c12e34'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(193,46,52)'
                    }
                }
            }
        },
        'geo': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#dddddd',
                    'borderColor': '#eeeeee',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(230,182,0,1)',
                    'borderColor': '#dddddd',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#c12e34'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(193,46,52)'
                    }
                }
            }
        },
        'categoryAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'valueAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'logAxis': {
            'axisLine': {
                'show': false,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'timeAxis': {
            'axisLine': {
                'show': false,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'toolbox': {
            'iconStyle': {
                'normal': {
                    'borderColor': '#06467c'
                },
                'emphasis': {
                    'borderColor': '#4187c2'
                }
            }
        },
        'legend': {
            'textStyle': {
                'color': '#486074'
            }
        },
        'tooltip': {
            'axisPointer': {
                'lineStyle': {
                    'color': '#f8f8f8',
                    'width': 1
                },
                'crossStyle': {
                    'color': '#f8f8f8',
                    'width': 1
                }
            }
        },
        'timeline': {
            'lineStyle': {
                'color': '#005eaa',
                'width': 1
            },
            'itemStyle': {
                'normal': {
                    'color': '#005eaa',
                    'borderWidth': 1
                },
                'emphasis': {
                    'color': '#005eaa'
                }
            },
            'controlStyle': {
                'normal': {
                    'color': '#005eaa',
                    'borderColor': '#005eaa',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'color': '#005eaa',
                    'borderColor': '#005eaa',
                    'borderWidth': 0.5
                }
            },
            'checkpointStyle': {
                'color': '#005eaa',
                'borderColor': 'rgba(49,107,194,0.5)'
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#005eaa'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#005eaa'
                    }
                }
            }
        },
        'visualMap': {
            'color': [
                '#12a1e8',
                '#96d2f0'
            ]
        },
        'dataZoom': {
            'backgroundColor': 'rgba(47,69,84,0)',
            'dataBackgroundColor': 'rgba(47,69,84,0.3)',
            'fillerColor': 'rgba(167,183,204,0.4)',
            'handleColor': '#a7b7cc',
            'handleSize': '100%',
            'textStyle': {
                'color': '#333333'
            }
        },
        'markPoint': {
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#486074'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#486074'
                    }
                }
            }
        }
    };
    angular.module('app.core').constant('THEME', _theme);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/5
 * Time: 11:02
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    angular.module('app.core').constant('ERRORS', {
        email: '格式错误',
        required: '不能为空',
        validatePassword: '密码格式错误',
        repeat: '确认秘密和新密码不一致',
        number: '只能是数字'
    });
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 11:20
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    angular.module('app.core').constant('ROOT', '');
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 20:16
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').factory('httpServer', httpServer);
    httpServer.$inject = ['$http', '$q', 'ROOT'];

    function httpServer($http, $q, ROOT) {
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
})();

/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/13
 * Time: 11:41
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.core').factory('userServer', userServer);
    userServer.$inject = ['httpServer'];

    function userServer(httpServer) {
        var myServices = {};
        //登录
        myServices.login = function (data) {
            return httpServer.postHttp('/user/login', data);
        };
        //退出登录
        myServices.logout = function () {
            return httpServer.postHttp('/user/logout');
        };
        return myServices;
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/12
 * Time: 17:57
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.core').service('tools', tools);
    tools.$inject = ['$timeout', '$rootScope'];

    function tools($timeout, $rootScope) {
        /**
         * 成功提示框
         * @param data  提示信息
         */
        this.alertSuccess = function (data, time) {
            $rootScope.alert = true;
            $rootScope.isActive = true;
            $timeout(function () {
                $rootScope.alert = false;
            }, time ? time : 2000);
            $rootScope.alertValue = data;
        };
        /**
         * 失败提示框
         * @param data  提示信息
         */
        this.alertError = function (data, time) {
            $rootScope.alert = true;
            $rootScope.isActive = false;
            $timeout(function () {
                $rootScope.alert = false;
            }, time ? time : 2000);
            $rootScope.alertValue = data;
        };
        /**
         * 判断对象是否为空
         * @param e
         * @returns {boolean}
         */
        this.isEmptyObject = function (e) {
            var t;
            for (t in e) {
                return !1;
            }
            return !0;
        };
        /**
         * 改数组null为0
         * @param arr
         * @param item *多少
         * @returns {boolean}
         */
        this.formatArr = function (arr, item) {
            return arr.map(function (data) {
                return data == null || data === 'NaN' ? 0 : (item == null ? data : data * item);
            });
        };
        /**
         * 格式化字符串
         * @param str   传入字符串
         * @param num   从第几个位置开始
         * @param tips  添加标记
         * @returns {string}
         */
        this.formatStr = function (str, num, tips) {
            var newStr = '';
            var count = 0;
            if (str) {
                for (var i = 0, len = str.length; i < len; i++) {
                    if (count % num === 0 && count !== 0) {
                        newStr = newStr + tips + str.charAt(i);
                    } else {
                        newStr = newStr + str.charAt(i);
                    }
                    count++;
                }
                return newStr;
            } else {
                return str;
            }
        };
        /**
         * 返回数组中最大值
         * @param arr
         */
        this.max = function (arr) {
            //Math.max.apply(null, [])  =>-Infinity
            if (angular.isArray(arr)) {
                return arr.length > 0 ? Math.max.apply(null, arr) : 0;
            } else {
                console.log(arr + 'is not a array');
            }
        };
        /**
         * 返回数组中最小值
         * @param arr
         */
        this.min = function (arr) {
            if (angular.isArray(arr)) {
                return arr.length > 0 ? Math.min.apply(null, arr) : 0;
            } else {
                console.log(arr + 'is not a array');
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/30
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    /**
     * 模态框指令
     */
    angular.module('app.core').directive('filter', ['filterServer', function (filterServer) {
        return {
            restrict: 'E',
            templateUrl: 'build/tpls/directiveTpls/filter.html',
            replace: true,
            transclude: true,
            scope: {
                filterConf: '=conf',
                title: '@'
            },
            bindToController: true, //将scope数据绑定到vm上
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                filterServer.getFilter().then(function (data) {
                    vm.filter = data;
                    vm.assistYear = vm.filter.schoolYear[0];
                    vm.scoreRankTerm = vm.filter.schoolTerm[0];
                    vm.scoreErrorTerm = vm.filter.schoolTerm[0];
                });

                if (vm.filterConf) {
                    vm.filterConf.filter = vm.filterConf.filter || {};
                    vm.filterConf.tip = vm.filterConf.tip || false;
                    vm.filterConf.title = vm.title || '';
                    //是否需要根据父级选中项来判断显示隐藏过滤项（主要用于常用对比）
                    vm.filterConf.choosedOption = vm.filterConf.choosedOption || {values: 1};
                    /**
                     * 帅选条件数据更新
                     * @param action    动作
                     * @param item      当前对象
                     * @param eName     english名字（用于封装后端接受key使用）
                     * @param cName     chinese名字（用于前端显示）
                     */
                    var updateFilterCondition = function (action, item, eName, cName) {
                        vm.filterConf.filter[eName] = vm.filterConf.filter[eName] || {};
                        vm.filterConf.filter[eName].eName = eName;
                        vm.filterConf.filter[eName].cName = cName;
                        vm.filterConf.filter[eName].idArr = vm.filterConf.filter[eName].idArr || [];
                        vm.filterConf.filter[eName].objArr = vm.filterConf.filter[eName].objArr || [];
                        //助贷情况、课程排名、学业异常需要单独提出来，用学年id/学期id+当前选中对象id来标示索引
                        if (eName === 'assist') {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString()) === -1) {
                                vm.filterConf.filter[eName].idArr.push(vm.assistYear.id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {
                                    rName: item.name + '(' + vm.assistYear.name + ')',
                                    term: vm.assistYear
                                }));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString()) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        } else if (eName === 'scoreRank' || eName === 'scoreError') {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString()) === -1) {
                                vm.filterConf.filter[eName].idArr.push(vm[eName + 'Term'].id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {
                                    rName: item.name + '(' + vm[eName + 'Term'].name + ')',
                                    term: vm[eName + 'Term']
                                }));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString()) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        } else {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(item.id) === -1) {
                                vm.filterConf.filter[eName].idArr.push(item.id);
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {rName: item.name}));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(item.id) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(item.id);
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        }
                    };
                    /**
                     * 帅选条件数据更新
                     * @param $event    事件
                     * @param item  当前对象
                     * @param eName english名字
                     * @param cName chinese名字
                     */
                    vm.updateFilterCondition = function ($event, item, eName, cName) {
                        var _checkbox = $event.target;
                        var _action = _checkbox.checked ? 'add' : 'remove';
                        updateFilterCondition(_action, item, eName, cName);
                        //外部作用域需要操作过滤条件的时候触发回调的钩子
                        vm.filterConf.updateFilterCondition && vm.filterConf.updateFilterCondition();
                    };
                    /**
                     * 判断帅选条件是否需要选中
                     * @param name    当前名字
                     * @param id    当前id
                     * @returns {boolean}
                     */
                    vm.isFilterSelected = function (name, id) {
                        if (name === 'assist') {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(vm.assistYear.id.toString() + id.toString()) >= 0;
                        } else if (name === 'scoreRank' || name === 'scoreError') {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(vm[name + 'Term'].id.toString() + id.toString()) >= 0;
                        } else {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(id) >= 0;
                        }
                    };
                    /**
                     * 清空筛选条件
                     */
                    vm.clearAllFilterCondtion = function () {
                        vm.filterConf.filter = {};
                    };
                }
            }]
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/29
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 退出
     */
    angular.module('app.core').directive('logout', logout);

    logout.$inject = ['tools', '$state', 'userServer'];

    function logout(tools, $state, userServer) {
        return {
            restrict: 'E',
            template: '<a href="javascript:;" title="退出" ng-click="logout()" tool-tip="{content:\'退出\',mode:\'bottom\'}">' +
            '<svg class="icon" aria-hidden="true">' +
            '<use xlink:href="#icon-guanbi"></use>' +
            '</svg></a>',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.logout = function () {
                    userServer.logout().then(function (data) {
                        if (data.status) {
                            tools.logout();
                            //$state.go('login');
                            window.location.href = 'http://rap.xdbigdata.com/app-store/#/login';
                        }
                    });
                };
            }
        };
    }
})();

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/31
 * Time: 16:04
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 模态框指令
     */
    angular.module('app.core').directive('modal', modal);

    modal.$inject = [];

    function modal() {
        return {
            restrict: 'E',
            templateUrl: 'build/tpls/directiveTpls/modal.html',
            replace: true,
            transclude: true,
            scope: {
                modalConf: '=conf',
                title: '@'
            },
            bindToController: true, //将scope数据绑定到vm上
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                if (vm.modalConf) {
                    //是否显示footer和是否大模态框，默认是false
                    vm.modalConf.showFooter = vm.modalConf.showFooter != null ? vm.modalConf.showFooter : true;
                    vm.modalConf.big = vm.modalConf.big != null ? vm.modalConf.big : false;
                    vm.modalConf.show = vm.modalConf.show != null ? vm.modalConf.show : false;
                    //title和modalId有两种配置方式,分别是modalConf和@
                    vm.modalConf.title = vm.modalConf.title != null ? vm.modalConf.title : vm.title;
                    vm.modalConf.id = vm.modalConf.id != null ? vm.modalConf.id : vm.id;
                    vm.hide = function () {
                        vm.modalConf.show = false;
                    };
                    /**
                     * 关闭钩子
                     */
                    vm.cancel = function () {
                        vm.hide();
                        vm.modalConf.cancel && vm.modalConf.cancel();
                    };
                    /**
                     * 保存钩子
                     */
                    vm.save = function () {
                        vm.modalConf.save && vm.modalConf.save();
                    };
                }
            }]
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/14
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('search', [function () {
        return {
            restrict: 'E',
            template: '<div class="search-btn-group pull-right">' +
            '<input type="text" ng-model="vm.searchText" placeholder="{{vm.placeholderText}}" ng-keypress="vm.enterDown($event)"/>' +
            '<button ng-click="vm.search()"><svg class="icon" aria-hidden="true">' +
            '<use xlink:href="#icon-sousuo"></use>' +
            '</svg></button>' +
            '</div>',
            replace: true,
            scope: {
                conf: '=searchConfig',
                searchText:'=',//有些情况需要搜索内容默认显示，比如个人学生搜索页面
                placeholderText: '@'
            },
            bindToController: true,
            controller: 'searchController',
            controllerAs: 'vm'
        };
    }]).controller('searchController', ['tools',function (tools) {
        var vm = this;
        //search
        vm.search = function () {
            if(vm.searchText){
                vm.conf.search && vm.conf.search(vm.searchText);
            }else{
                tools.alertError('搜索内容不能为空');
            }
        };
        //回车跳转搜索
        vm.enterDown = function ($event) {
            $event.keyCode === 13&&vm.search();
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/31
 * Time: 16:04
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('setTime', [function () {
        return {
            restrict: 'E',
            templateUrl: 'build/tpls/directiveTpls/setTime.html',
            replace: true,
            scope: {
                timeConf: '=conf'
            },
            controller: ['$rootScope', '$scope', 'getDateNow', function ($rootScope, $scope, getDateNow) {
                //年份数组
                $scope.yearArr = getDateNow.getDate(12).yearArr;
                //开始年份
                $scope.startYear = getDateNow.getDate(12).startYear.toString();
                //结束年份
                $scope.endYear = getDateNow.getDate(12).endYear.toString();
                //当前月份
                $scope.lastMonth = getDateNow.getDate(12).endMonth;
                //当前年份
                $scope.lastYear = getDateNow.getDate(12).endYear;
                //结束月份
                $scope.endMonth = getDateNow.getDate(12).endMonth < 10 ? ('0' + getDateNow.getDate(12).endMonth) : getDateNow.getDate(12).endMonth.toString();
                //开始月份
                $scope.startMonth = getDateNow.getDate(12).startMonth < 10 ? ('0' + getDateNow.getDate(12).startMonth) : getDateNow.getDate(12).startMonth.toString();
                //直接准备个数组，方便取值
                $scope.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                //有种情况需要监听开始年份和结束两份：当开始月份大于结束月份的时候，切换开始年份等于结束年份，这时需要将开始月份等于结束月份；结束年份同理
                $scope.$watch('startYear', function (to) {
                    to === $scope.endYear && $scope.startMonth >= $scope.endMonth && ($scope.startMonth = $scope.endMonth);
                });
                $scope.$watch('endYear', function (to) {
                    //判断开始月份
                    to === $scope.startYear && $scope.startMonth >= $scope.endMonth && ($scope.startMonth = $scope.endMonth);
                    //判断结束月份
                    to === $scope.lastYear.toString() && $scope.endMonth > $scope.lastMonth && ($scope.endMonth = $scope.lastMonth < 10 ? ('0' + $scope.lastMonth) : $scope.lastMonth.toString());
                });
                if ($scope.timeConf) {
                    //监听select Model，格式化数据准备给后端
                    //后端那傻逼要在后面加个日期'-00'，不然他后台要报错~_~
                    //可以不用监听，然后controller里面直接用startYear,startMonth……,然后格式化也行
                    //但是监听的话，可以直接返回格式化后的数据给controller，方便维护
                    $scope.$watch('startYear+startMonth+endYear+endMonth', function () {
                        $scope.timeConf.startDate = $scope.startYear + '-' + $scope.startMonth + '-01';
                        $scope.timeConf.endDate = $scope.endYear + '-' + $scope.endMonth + '-' + new Date($scope.endYear, $scope.endMonth, 0).getDate();
                        $scope.timeConf.ready = true;
                    });
                    //回调钩子
                    $scope.submit = function () {
                        if ($scope.timeConf.submitTime) {
                            $rootScope.clearPending();
                            $scope.timeConf.submitTime();
                        }
                    };
                }
            }]
        };
    }]);
})();
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
     * 分页
     */
    angular.module('app.core').directive('tmPagination', [function () {
        return {
            restrict: 'EA',
            template: '<div class="page-list">' +
            '<ul class="pagination" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><a href="javascript:">&lt;</a></li>' +
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<a href="javascript:">{{ item }}</a>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><a href="javascript:">&gt;</a></li>' +
            '</ul>' +
            '<div class="page-total hide" ng-show="conf.totalItems > 0">' +
            '每页<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
            '/共<strong>{{ conf.totalItems }}</strong>条 ' +
            '跳转至<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' +
            '</div>' +
            '</div>',
            replace: true,
            scope: {
                conf: '='
            },
            link: function (scope, element, attrs) {

                var conf = scope.conf;

                //默认分页长度
                var defaultPagesLength = 9;

                //默认分页选项可调整每页显示的条数
                var defaultPerPageOptions = [10, 15, 20, 30, 50];

                //默认每页的个数
                var defaultPerPage = 15;

                //获取分页长度
                if (conf) {
                    if (conf.pagesLength) {
                        //判断一下分页长度
                        conf.pagesLength = parseInt(conf.pagesLength, 10);

                        if (!conf.pagesLength) {
                            conf.pagesLength = defaultPagesLength;
                        }

                        //分页长度必须为奇数，如果传偶数时，自动处理
                        if (conf.pagesLength % 2 === 0) {
                            conf.pagesLength += 1;
                        }

                    } else {
                        conf.pagesLength = defaultPagesLength;
                    }

                    //分页选项可调整每页显示的条数
                    if (!conf.perPageOptions) {
                        conf.perPageOptions = defaultPerPageOptions;
                    }
                }

                //pageList数组
                function getPagination(newValue, oldValue) {

                    //conf.currentPage
                    if (conf.currentPage) {
                        conf.currentPage = parseInt(scope.conf.currentPage, 10);
                    }

                    if (!conf.currentPage) {
                        conf.currentPage = 1;
                    }

                    //conf.totalItems
                    if (conf.totalItems) {
                        conf.totalItems = parseInt(conf.totalItems, 10);
                    }

                    //conf.totalItems
                    if (!conf.totalItems) {
                        conf.totalItems = 0;
                        return;
                    }

                    //conf.itemsPerPage
                    if (conf.itemsPerPage) {
                        conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                    }
                    if (!conf.itemsPerPage) {
                        conf.itemsPerPage = defaultPerPage;
                    }

                    //numberOfPages
                    conf.numberOfPages = Math.ceil(conf.totalItems / conf.itemsPerPage);

                    //如果分页总数>0，并且当前页大于分页总数
                    if (scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages) {
                        scope.conf.currentPage = scope.conf.numberOfPages;
                    }

                    //如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    var perPageOptionsLength = scope.conf.perPageOptions.length;

                    //定义状态
                    var perPageOptionsStatus;
                    for (var i = 0; i < perPageOptionsLength; i++) {
                        if (conf.perPageOptions[i] === conf.itemsPerPage) {
                            perPageOptionsStatus = true;
                        }
                    }
                    //如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    if (!perPageOptionsStatus) {
                        conf.perPageOptions.push(conf.itemsPerPage);
                    }

                    //对选项进行sort
                    conf.perPageOptions.sort(function (a, b) {
                        return a - b;
                    });
                    //码相关
                    scope.pageList = [];
                    if (conf.numberOfPages <= conf.pagesLength) {
                        //判断总页数如果小于等于分页的长度，若小于则直接显示
                        for (i = 1; i <= conf.numberOfPages; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        //总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                        //计算中心偏移量
                        var offset = (conf.pagesLength - 1) / 2;
                        if (conf.currentPage <= offset) {
                            //左边没有...
                            for (i = 1; i <= offset + 1; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.push('...');
                            scope.pageList.push(conf.numberOfPages);
                        } else if (conf.currentPage > conf.numberOfPages - offset) {
                            scope.pageList.push(1);
                            scope.pageList.push('...');
                            for (i = offset + 1; i >= 1; i--) {
                                scope.pageList.push(conf.numberOfPages - i);
                            }
                            scope.pageList.push(conf.numberOfPages);
                        } else {
                            //最后一种情况，两边都有...
                            scope.pageList.push(1);
                            scope.pageList.push('...');

                            for (i = Math.ceil(offset / 2); i >= 1; i--) {
                                scope.pageList.push(conf.currentPage - i);
                            }
                            scope.pageList.push(conf.currentPage);
                            for (i = 1; i <= offset / 2; i++) {
                                scope.pageList.push(conf.currentPage + i);
                            }

                            scope.pageList.push('...');
                            scope.pageList.push(conf.numberOfPages);
                        }
                    }

                    scope.$parent.conf = conf;
                }

                //prevPage
                scope.prevPage = function () {
                    if (conf.currentPage > 1) {
                        conf.currentPage -= 1;
                        getPagination();
                        //conf.onChange()函数
                        if (conf.onChange) {
                            conf.onChange();
                        }
                    }
                };

                //nextPage
                scope.nextPage = function () {
                    if (conf.currentPage < conf.numberOfPages) {
                        conf.currentPage += 1;
                        getPagination();
                        //conf.onChange()函数
                        if (conf.onChange) {
                            conf.onChange();
                        }
                    }
                };

                //变更当前页
                scope.changeCurrentPage = function (item) {

                    if (item === '...') {
                        return;
                    } else {
                        conf.currentPage = item;
                        getPagination();
                        //conf.onChange()函数
                        if (conf.onChange) {
                            conf.onChange();
                        }
                    }
                };

                //修改每页展示的条数
                scope.changeItemsPerPage = function () {

                    //一发展示条数变更，当前页将重置为1
                    conf.currentPage = 1;

                    getPagination();
                    //conf.onChange()函数
                    if (conf.onChange) {
                        conf.onChange();
                    }
                };

                //跳转页
                scope.jumpToPage = function () {
                    var num = scope.jumpPageNum;
                    if (num.match(/\d+/)) {
                        num = parseInt(num, 10);

                        if (num && num !== conf.currentPage) {
                            if (num > conf.numberOfPages) {
                                num = conf.numberOfPages;
                            }

                            //跳转
                            conf.currentPage = num;
                            getPagination();
                            //conf.onChange()函数
                            if (conf.onChange) {
                                conf.onChange();
                            }
                            scope.jumpPageNum = '';
                        }
                    }

                };

                scope.jumpPageKeyUp = function (e) {
                    var keycode = window.event ? e.keyCode : e.which;

                    if (keycode === 13) {
                        scope.jumpToPage();
                    }
                };

                scope.$watch('conf.totalItems', function (value, oldValue) {

                    //在无值或值相等的时候，去执行onChange事件
                    //if (!value || value === oldValue) {
                    if (value === oldValue) {

                        if (conf.onChange) {
                            conf.onChange();
                        }
                    }
                    getPagination();
                });

            }
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/11
 * Time: 10:45
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 错误提示指令
     */
    angular.module('app.core').directive('fieldError', fieldError);

    fieldError.$inject = ['$compile'];

    function fieldError($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                active: '='
            },
            link: function (scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasError = function () {
                    if(scope.active != null){
                        return ngModel.$invalid && scope.active;
                    }else{
                        return ngModel.$invalid && ngModel.$dirty;
                    }
                    //return ngModel.$invalid && ngModel.$dirty && (scope.active != null ? scope.active : true);
                };
                subScope.errors = function () {
                    return ngModel.$error;
                };
                subScope.customMessages = scope.$eval(attrs.fieldError);
                var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" class="text-error" ng-if="wrong && name !==\'parse\'">{{name | error:customMessages}}</li></ul>')(subScope);
                element.after(hint);
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('repeat', repeat);

    repeat.$inject = [];

    function repeat() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                if (ctrl) {
                    var otherInput = element.inheritedData('$formController')[attrs.repeat];

                    var repeatValidator = function (value) {
                        var validity = value === otherInput.$viewValue;
                        ctrl.$setValidity('repeat', validity);
                        return validity ? value : undefined;
                    };

                    ctrl.$parsers.push(repeatValidator);
                    ctrl.$formatters.push(repeatValidator);

                    otherInput.$parsers.push(function (value) {
                        ctrl.$setValidity('repeat', value === ctrl.$viewValue);
                        return value;
                    });
                }
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/17
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('tooltip', tooltip);

    tooltip.$inject = ['$compile'];

    function tooltip($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //定义策略，为了防止多次声明，先判断是否存在
                var strategy = strategy || {
                        top: function (ele, tip) {
                            return {
                                left: ele.offsetWidth > tip.offsetWidth ? Math.abs(tip.offsetWidth - ele.offsetWidth) / 2 : -Math.abs(tip.offsetWidth - ele.offsetWidth) / 2,
                                top: -(ele.offsetHeight + 15)
                            };
                        },
                        right: function (ele, tip) {
                            return {
                                left: ele.offsetWidth + 10,
                                top: ele.offsetHeight > tip.offsetHeight ? Math.abs(tip.offsetHeight - ele.offsetHeight) / 2 : -Math.abs(tip.offsetHeight - ele.offsetHeight) / 2
                            };
                        },
                        bottom: function (ele, tip) {
                            return {
                                left: this.top(ele, tip).left,
                                top: ele.offsetHeight + 10
                            };
                        },
                        left: function (ele, tip) {
                            return {
                                left: -(ele.offsetWidth + 15),
                                top: this.right(ele, tip).top
                            };
                        }
                    };
                var subScope = scope.$new(true);
                subScope.tooltip = {
                    content: '',
                    mode: 'top'
                };
                //获取用户配置
                angular.extend(subScope.tooltip, scope.$eval(attrs.tooltip));
                var hint = $compile('<span class="tool-tip tool-tip-' + subScope.tooltip.mode + '">{{tooltip.content}}</span>')(subScope);
                //监听，用tooltip-content属性值覆盖tooltip值
                attrs.$observe('tooltipContent', function (newTooltipContent) {
                    if (newTooltipContent) {
                        hint = $compile('<span class="tool-tip tool-tip-' + subScope.tooltip.mode + '">' + newTooltipContent + '</span>')(subScope);
                    }
                });
                //防止element有决定定位，不需要加相对定位
                //element.css({'position': 'relative'});
                element.on('mouseover', function () {
                    element.append(hint).removeAttr('title');
                    //使用策略
                    hint.css({
                        left: strategy[subScope.tooltip.mode](element[0], hint[0]).left + 'px',
                        top: strategy[subScope.tooltip.mode](element[0], hint[0]).top + 'px'
                    });
                });
                element.on('mouseleave', function () {
                    hint && hint.remove();
                });
            }
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').directive('validatePassword', validatePassword);

    validatePassword.$inject = ['$compile'];

    function validatePassword($compile) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    //正则反向验证：密码要求长度8-20位，至少包括大写字母、小写字母、数字、特殊字符中的两项。
                    var passwordRegexp = /^([0-9]*|[A-Z]*|[a-z]*|[^0-9a-zA-Z]*)$/;
                }
                var customValidator = function (value) {
                    var validity = ngModel.$isEmpty(value) || !passwordRegexp.test(value);
                    ngModel.$setValidity('validatePassword', validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    }
})();