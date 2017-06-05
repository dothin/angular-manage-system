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
        'ngTable',
        'angular-loading-bar',
        'ngAnimate',
        'oc.lazyLoad',
        'ngCookies',
        'angularFileUpload'
    ]);
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
 * User: codingYing
 * Date: 2017/4/21
 * Time: 10:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.form', ['app.core']);
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
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.table', ['app.core']);
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
        'app.echarts',
        'app.form',
        'app.table',
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
        if ($cookies.getObject('user')) {
            $rootScope.user = $cookies.getObject('user');
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
 * User: codingYing
 * Date: 2017/4/21
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    angular.module('app.echarts').controller('formCtrl', formCtrl);

    formCtrl.$inject = [];

    function formCtrl() {
        var vm = this;
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
    angular.module('app.form').run(appRun);
    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'main.form',
            config: {
                url: 'dist/tpls/form/form.html',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/form/form.html',
                        controller: 'formCtrl as vm'
                    }
                }
            }
        },{
            state: 'main.form.checkAll',
            config: {
                url: 'dist/tpls/form/checkAll/checkAll.html',
                controller: 'checkAllCtrl as vm'
            }
        },{
            state: 'main.form.editor',
                config: {
                url: 'dist/tpls/form/editor/editor.html',
                    controller: 'editorCtrl as vm'
            }
        }];
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
 * Date: 2016/10/20
 * Time: 11:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.login').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$state', '$cookies'];

    function loginCtrl($rootScope, $state, $cookies) {
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
                $cookies.putObject('user', {
                    name: vm.user.username
                });
                $rootScope.user = $cookies.getObject('user');
                $state.go('main');
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
        var vm = this;
        vm.user = $rootScope.user;
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
 * Date: 2016/8/29
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 退出
     */
    angular.module('app.layout').directive('logout', logout);

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
                    tools.logout();
                    $state.go('login');
                };
            }
        };
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
    angular.module('app.table').controller('tableCtrl', tableCtrl);
    tableCtrl.$inject = ['$state', '$rootScope', 'tools'];
    function tableCtrl($state, $rootScope, tools) {
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
    angular.module('app.table').run(appRun);
    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'main.table',
            config: {
                url: '/table',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/table/table.html',
                        controller: 'tableCtrl as vm'
                    }
                }
            }
        },{
            state: 'main.table.ngTable',
            config:{
                url: '/ngTable',
                templateUrl: 'dist/tpls/table/ngTable/ngTable.html',
                controller: 'ngTableCtrl as vm'
            }
        },{
            state: 'main.table.ngPagination',
            config:{
                url: '/ngPagination',
                templateUrl: 'dist/tpls/table/ngPagination/ngPagination.html',
                controller: 'ngPaginationCtrl as vm'
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
    angular.module('app.core').filter('error', error);

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
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/21
 * Time: 16:02
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').controller('barCtrl', ['echartsHanderServer', 'barServer',
        function (echartsHanderServer, barServer) {
            var vm = this;

            vm.init = function () {
                echartsHanderServer.echartsHandler(barServer, {
                    'bar1': function (ech, option) {
                        vm.initSituation = function () {

                            option.legend.data = ['人均', '总体'];
                            option.xAxis.data = ['6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                            option.series = [
                                {
                                    name: '人均',
                                    type: 'bar',
                                    barWidth: 50,
                                    data: [50, 400, 180, 400, 50, 280, 450]
                                },
                                {
                                    name: '总体',
                                    type: 'bar',
                                    barWidth: 50,
                                    data: [200, 150, 300, 250, 450, 180, 320]
                                }
                            ];

                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    },
                    'bar2': function (ech, option) {
                        vm.initSituation = function () {

                            option.legend.data = ['人均', '总体'];
                            option.yAxis.data = ['2012级', '2011级', '2010级'];
                            option.series = [{
                                name: '人均',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'insideRight'
                                    }
                                },
                                data: [60, 50, 30]
                            }, {
                                name: '总体',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        formatter: '{c}%',
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            color: '#000'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#c9c9c9'
                                    }
                                },
                                data: [40, 50, 70]
                            }];

                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    },
                    'bar3': function (ech, option) {
                        vm.initSituation = function () {

                            option.legend.data = ['利润', '支出', '收入'];
                            option.xAxis.data = ['周一','周二','周三','周四','周五','周六','周日'];
                            option.series = [
                                {
                                    name:'利润',
                                    type:'bar',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'inside'
                                        }
                                    },
                                    data:[200, 170, 240, 244, 200, 220, 210]
                                },
                                {
                                    name:'收入',
                                    type:'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true
                                        }
                                    },
                                    data:[320, 302, 341, 374, 390, 450, 420]
                                },
                                {
                                    name:'支出',
                                    type:'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'left'
                                        }
                                    },
                                    data:[-120, -132, -101, -134, -190, -230, -210]
                                }
                            ];

                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    }
                });
            };

            vm.init();
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    /**
     * 个人画像---消费水平---echarts配置
     */
    angular.module('app.echarts').factory('barServer', ['barLine', 'bar',
        function (barLine, bar) {
            var _option = {
                bar1: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('元');
                    //需要修改配置在此处进行

                    return barOption;
                },
                bar2: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('%');
                    //需要修改配置在此处进行
                    barOption.xAxis.type = 'value';
                    barOption.xAxis.show = false;
                    barOption.grid.right = '10%';
                    barOption.yAxis = {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: []
                    };

                    return barOption;
                },
                bar3: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('元');
                    //需要修改配置在此处进行

                    return barOption;
                }
            };
            return {
                bar1: _option.bar1(),
                bar2: _option.bar2(),
                bar3: _option.bar3()
            };
        }
    ]);
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

    angular.module('app.echarts').controller('lineCtrl', lineCtrl);

    lineCtrl.$inject = [];
    function lineCtrl() {
        var vm = this;
    }
})();

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/21
 * Time: 16:02
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').controller('pieCtrl', ['echartsHanderServer', 'pieServer',
        function (echartsHanderServer, pieServer) {
            var vm = this;

            vm.init = function () {
                echartsHanderServer.echartsHandler(pieServer, {
                    'pie1': function (ech, option) {
                        vm.initSituation = function () {
                            /*vm._postData = {
                             startDate: vm.timeConf.startDate,
                             endDate: vm.timeConf.endDate
                             };
                             angular.forEach(_param, function (data) {
                             angular.extend(data, vm._postData);
                             });
                             compareResultLibraryServer.getCompareLibrarySituation(_param).then(function (data) {
                             if (data.status) {
                             option.xAxis.data = _conditionList;
                             option.legend.data = ['平均每天泡馆时长', '平均每月泡馆天数'];
                             option.series = [
                             {
                             name: '平均每天泡馆时长',
                             type: 'bar',
                             barMaxWidth: 50,
                             data: $filter('toFixed')(data.data.avgHours, 2)
                             },
                             {
                             name: '平均每月泡馆天数',
                             type: 'bar',
                             barMaxWidth: 50,
                             yAxisIndex: 1,
                             data: $filter('toFixed')(data.data.avgDays, 2)
                             }
                             ];
                             ech.clear();
                             ech.setOption(option);
                             ech.hideLoading();
                             }
                             });*/
                            option.series[0].data[0].value=20;
                            option.series[0].data[1].value=80;
                            option.series[1].data[0].value=20;
                            option.series[1].data[1].value=80;
                            option.series[2].data[0].value=20;
                            option.series[2].data[1].value=80;
                            option.series[3].data[0].value=20;
                            option.series[3].data[1].value=80;
                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    },
                    'pie2': function (ech, option) {
                        vm.initSituation = function () {
                            option.series[0].data[0].value = 335;
                            option.series[0].data[1].value = 310;
                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    },
                    'pie3': function (ech, option) {
                        vm.initSituation = function () {
                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    },
                    'pie4': function (ech, option) {
                        vm.initSituation = function () {
                            ech.clear();
                            ech.setOption(option);
                            ech.hideLoading();
                        };
                        vm.initSituation();
                    }
                });
            };

            vm.init();
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    /**
     * 个人画像---消费水平---echarts配置
     */
    angular.module('app.echarts').factory('pieServer', ['pie',
        function (pie) {
            var _option = {
                pie1: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    //需要修改配置在此处进行
                    pieOption.xAxis = [
                        {
                            type: 'category',
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            axisLabel: {interval: 0},
                            data: ['正常在校学生相似度', '同班学生相似度', '同级学生相似度', '失联学生相似度']
                        }
                    ];
                    pieOption.yAxis = [
                        {
                            show: false
                        }
                    ];
                    pieOption.grid = {
                        bottom: 30
                    };
                    pieOption.series = [
                        {
                            name: '正常在校学生',
                            center: [
                                '20.0%',
                                '40%'
                            ],
                            radius: [
                                '30%',
                                '40%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '同班学生',
                            center: [
                                '40.0%',
                                '40%'
                            ],
                            radius: [
                                '30%',
                                '40%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '同级学生',
                            center: [
                                '60.0%',
                                '40%'
                            ],
                            radius: [
                                '30%',
                                '40%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '失联学生',
                            center: [
                                '80.0%',
                                '40%'
                            ],
                            radius: [
                                '30%',
                                '40%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }];
                    return pieOption;
                },
                pie2: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    //需要修改配置在此处进行
                    pieOption.series = [
                        {
                            name: '单维度占比',
                            type: 'pie',
                            radius: ['60%', '70%'],
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: '占有率',
                                    label: {
                                        normal: {
                                            formatter: '{d} %',
                                            textStyle: {
                                                fontSize: 20
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 0,
                                    name: '占位',
                                    label: {
                                        normal: {
                                            formatter: '\n完成率',
                                            textStyle: {
                                                color: '#999'
                                            }
                                        }
                                    },
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#eaecef'
                                        }, emphasis: {
                                            color: '#eaecef'
                                        }
                                    },
                                    hoverAnimation: false
                                }
                            ]
                        }];
                    return pieOption;
                },
                pie3: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    //需要修改配置在此处进行
                    var data = [{
                        value: 11,
                        name: '食堂'
                    }, {
                        value: 22,
                        name: '超市'
                    }, {
                        value: 33,
                        name: '刷卡'
                    }, {
                        value: 22,
                        name: '交通'
                    }];
                    pieOption.title = {
                        text: '统计',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    };
                    pieOption.legend = {
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: ['食堂', '超市', '刷卡', '交通'],
                        itemWidth:20,
                        itemHeight:10
                    };
                    pieOption.series = [{
                        name:'消费',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['25%', '60%'],
                        label: {
                            normal: {
                                position: 'inner',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }, {
                        name:'消费',
                        type: 'pie',
                        radius: ['60%', '90%'],
                        itemStyle: {
                            normal: {
                                color: '#f2f2f2'
                            },
                            emphasis: {
                                color: '#adadad'
                            }
                        },
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{c}%',
                                textStyle: {
                                    color: '#777777',
                                    fontSize: 12
                                }
                            }
                        },
                        data: data
                    }];
                    return pieOption;
                },
                pie4: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    //需要修改配置在此处进行
                    var data = [{
                        value: 11,
                        name: '食堂'
                    }, {
                        value: 22,
                        name: '超市'
                    }, {
                        value: 33,
                        name: '刷卡'
                    }, {
                        value: 22,
                        name: '交通'
                    }];
                    pieOption.title = {
                        text: '统计',
                        subtext: '2016年',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    };
                    pieOption.legend = {
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: ['食堂', '超市', '刷卡', '交通'],
                        itemWidth:20,
                        itemHeight:10
                    };
                    pieOption.series = [{
                        name:'消费',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['50%', '90%'],
                        label: {
                            normal: {
                                position: 'inner',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }];
                    return pieOption;
                }
            };
            return {
                pie1: _option.pie1(),
                pie2: _option.pie2(),
                pie3: _option.pie3(),
                pie4: _option.pie4()
            };
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/2/22
 * Time: 11:21
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('echartsFormatter', [function () {
        /**
         * 格式化柱状图和折线图
         * @param params
         * @param ticket
         * @param callback
         * @param flag  单位
         * @returns {string}
         */
        this.formatter = function (params, ticket, callback, flag) {
            //当前版本echarts存在bug，series里面的对象有多个时，params里面的对象的name属性值不一定存在
            /**
             * series : [
             {
                 name:'邮件营销',
                 type:'line',
                 stack: '总量',
                 data:[null, null, null, null, null, null, null]
             },
             {
                 name:'联盟广告',
                 type:'line',
                 stack: '总量',
                 data:[null, null, null, null, null, null, null]
             },
             {
                 name:'视频广告',
                 type:'line',
                 stack: '总量',
                 data:[150, 232, 201, 154, 190, 330, null]
             }
             ];
             此时name有问题
             */
            //var res = params[0].name;
            var res = '';
            angular.forEach(params, function (value) {
                res === '' && value.name && (res = value.name);
            });
            for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (flag ? flag : '');
            }
            return res;
        };
        /**
         * 格式化转柱状图折线图
         * @param params
         * @param ticket
         * @param callback
         * @param line  折线图单位
         * @param bar   柱状图单位
         * @returns {string}
         */
        this.formatterBarLine = function (params, ticket, callback, line, bar) {
            var res = '';
            angular.forEach(params, function (value) {
                res === '' && value.name && (res = value.name);
            });
            for (var i = 0, l = params.length; i < l; i++) {
                if (params[i].seriesType === 'line') {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (line ? line : '');
                } else {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (bar ? bar : '');
                }
            }
            return res;
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/24
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('echartsHanderServer', ['$timeout', 'THEME', 'loading',
        function ($timeout, THEME, loading) {
            var _this = this;
            /**
             * echarts模块公共服务
             * @param module    echarts模块项
             */
            this.echartsHandler = function (echartsOption, module) {
                //遍历echarts模块项
                angular.forEach(module, function (value, key) {
                    $timeout(function () {
                        _this['echarts' + key] = echarts.init(document.getElementById(key), THEME);
                        var option = echartsOption[key];
                        _this['echarts' + key].showLoading(loading);
                        value(_this['echarts' + key], option);
                    });
                });
                //遍历echarts浏览器缩放自适应
                window.onresize = function () {
                    angular.forEach(module, function (value, key) {
                        _this['echarts' + key] && _this['echarts' + key].resize();
                    });
                };
            };
        }
    ]);
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
    angular.module('app.echarts').constant('THEME', _theme);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/2/9
 * Time: 15:34
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    angular.module('app.echarts').constant('loading', {
        text: '',
        color: '#ff587b'
    });
})();
/**
 * Created by liuying on 2017/6/5.
 */
(function () {
    'use strict';

    angular.module('app.form').controller('editorCtrl', [function () {
        var vm = this;
    }]);
})();
/**
 * Created by liuying on 2017/6/5.
 */
(function () {
    'use strict';

    angular.module('app.form').controller('checkAllCtrl', [function () {
        var vm = this;

        vm.list = [
            {'id': 101},
            {'id': 102},
            {'id': 103},
            {'id': 104},
            {'id': 105},
            {'id': 106},
            {'id': 107}
        ];

        vm.m = [];
        vm.checked = [];
        vm.selectAll = function () {
            if(vm.select_all) {
                vm.checked = [];
                angular.forEach(vm.list, function (i) {
                    i.checked = true;
                    vm.checked.push(i.id);
                })
            }else {
                angular.forEach(vm.list, function (i) {
                    i.checked = false;
                    vm.checked = [];
                })
            }
            console.log(vm.checked);
        };
        vm.selectOne = function () {
            angular.forEach(vm.list , function (i) {
                var index = vm.checked.indexOf(i.id);
                if(i.checked && index === -1) {
                    vm.checked.push(i.id);
                } else if (!i.checked && index !== -1){
                    vm.checked.splice(index, 1);
                };
            })

            if (vm.list.length === vm.checked.length) {
                vm.select_all = true;
            } else {
                vm.select_all = false;
            }
            console.log(vm.checked);
        }
    }]);
})();
/**
 * Created by liuying on 2017/6/1.
 */
(function () {

    'use strict';

    angular.module('app.table').controller('ngPaginationCtrl',[
        function () {
            var vm = this;
        }
    ]);
})();

/**
 * Created by liuying on 2017/6/1.
 */
(function () {

    'use strict';

    angular.module('app.table').factory('ngPaginationServer', [
        function () {

        }
    ]);

})();
/**
 * Created by liuying on 2017/6/1.
 */
(function () {

    'use strict';

    angular.module('app.table').controller('ngTableCtrl',['NgTableParams',
        function (NgTableParams) {
            var vm = this;

            vm.dataset = [
                {
                    "sId":1,
                    "submitTime":"2017.5.12 14:32:00",
                    "stuName":"李思思",
                    "stuNum":2014010413001,
                    "col":"经管学院"
                },{
                    "sId":2,
                    "submitTime":"2017.5.12 14:32:01",
                    "stuName":"张学雨",
                    "stuNum":2014010413002,
                    "col":"金融学院"
                },{
                    "sId":3,
                    "submitTime":"2017.5.12 14:32:02",
                    "stuName":"谢小龙",
                    "stuNum":2014010413015,
                    "col":"会计学院"
                },{
                    "sId":4,
                    "submitTime":"2017.5.12 14:32:03",
                    "stuName":"刘天宇",
                    "stuNum":2014010413016,
                    "col":"统计学院"
                },{
                    "sId":5,
                    "submitTime":"2017.5.12 14:32:04",
                    "stuName":"夏雨欣",
                    "stuNum":2014010413032,
                    "col":"法学院"
                },{
                    "sId":6,
                    "submitTime":"2017.5.12 14:32:05",
                    "stuName":"陈思雨",
                    "stuNum":2014010413016,
                    "col":"经管学院"
                },{
                    "sId":7,
                    "submitTime":"2017.5.12 14:32:06",
                    "stuName":"吴宇",
                    "stuNum":2014010413018,
                    "col":"金融学院"
                },{
                    "sId":8,
                    "submitTime":"2017.5.12 14:32:07",
                    "stuName":"刘旭",
                    "stuNum":2014010413014,
                    "col":"会计学院"
                },{
                    "sId":9,
                    "submitTime":"2017.5.12 14:32:08",
                    "stuName":"李菊宇",
                    "stuNum":2014010413013,
                    "col":"统计学院"
                },{
                    "sId":10,
                    "submitTime":"2017.5.12 14:32:09",
                    "stuName":"万晓强",
                    "stuNum":2014010413002,
                    "col":"法学院"
                },{
                    "sId":11,
                    "submitTime":"2017.5.12 14:32:10",
                    "stuName":"曾玉",
                    "stuNum":2014010413007,
                    "col":"经管学院"
                },{
                    "sId":12,
                    "submitTime":"2017.5.12 14:32:11",
                    "stuName":"罗啸天",
                    "stuNum":2014010413008,
                    "col":"金融学院"
                },{
                    "sId":13,
                    "submitTime":"2017.5.12 14:32:12",
                    "stuName":"罗晓霞",
                    "stuNum":2014010413009,
                    "col":"会计学院"
                },{
                    "sId":14,
                    "submitTime":"2017.5.12 14:32:13",
                    "stuName":"孙玉",
                    "stuNum":2014010413032,
                    "col":"统计学院"
                }
            ];

            vm.tableParams = new NgTableParams({
                count: 10
            },{
                counts: [],
                paginationMaxBlocks: 2,//最大页数
                paginationMinBlocks: 1,//最小页数
                dataset:vm.dataset
            });

            vm.showFilter = false;

            vm.showSearch = function () {
                vm.showFilter = !vm.showFilter;
            }
        }
    ]);
})();

/**
 * Created by liuying on 2017/6/1.
 */
(function () {

    'use strict';

    angular.module('app.table').factory('ngTableServer', [
        function () {

        }
    ]);

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
                var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" class="text-wrong" ng-if="wrong && name !==\'parse\'">{{name | error:customMessages}}</li></ul>')(subScope);
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
 * Time: 17:57
 * To change this template use File | Settings | File Templates.
 */
(function() {
    'use strict';
    angular.module('app.core').service('tools', tools);
    tools.$inject = ['$timeout', '$rootScope', '$cookies'];

    function tools($timeout, $rootScope, $cookies) {
        /**
         * 退出
         */
        this.logout = function () {
            $cookies.remove('user');
            $rootScope.user = $cookies.getObject('user');
            localStorage.clear();
        };
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
 * User: gaoHuaBin
 * Date: 2016/11/23
 * Time: 13:43
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('bar', barService);

    barService.$inject = ['echartsFormatter'];

    function barService(echartsFormatter) {
        /**
         *  柱状图基本配置
         * @param flag  单位
         * @returns {{tooltip: {trigger: string, axisPointer: {type: string}, formatter: bar.tooltip.formatter}, legend: {bottom: number, data: Array}, grid: {left: number, right: number, bottom: string, top: string, containLabel: boolean}, xAxis: {type: string, data: Array}, yAxis: {type: string}, series: Array}}
         */
        this.getOption = function (flag) {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    confine: true,
                    formatter: function (params, ticket, callback) {
                        return echartsFormatter.formatter(params, ticket, callback, flag);
                    }
                },
                legend: {
                    bottom: 0,
                    data: [],
                    itemHeight: 10,
                    itemWidth: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '13%',
                    top: 8,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}' + flag
                    }
                },
                series: []
            };
        };
    };
})();
/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('barLine', barLineService);

    barLineService.$inject = ['echartsFormatter'];

    function barLineService(echartsFormatter) {
        /**
         * 柱折混合图基本配置
         * @param line
         * @param bar
         * @returns {{tooltip: {trigger: string, confine: boolean, formatter: tooltip.formatter}, legend: {data: Array, bottom: number}, grid: {left: string, right: string, bottom: number, top: number, containLabel: boolean}, xAxis: [*], yAxis: [*,*], series: Array}}
         */
        this.getOption = function (line, bar) {
            return {
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    formatter: function (params, ticket, callback) {
                        return echartsFormatter.formatterBarLine(params, ticket, callback, line, bar);
                    }
                },
                legend: {
                    data: [],
                    bottom: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: 25,
                    top: 10,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}' + line
                        }
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}' + bar
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: []

            };
        };
    }
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/12
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('chinaMap', [
        function () {
            /**
             * 地图配置
             * @returns {{tooltip: {trigger: string}, visualMap: {min: number, max: number, left: string, itemHeight: number, top: string, text: string[], calculable: boolean}, series: *[]}}
             */
            this.getOption = function () {
                return {
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        left: 'left',
                        itemHeight: document.documentElement.clientHeight > 700 ? 100 : 60,
                        top: 'bottom',
                        text: ['高', '低'],           // 文本，默认为数值文本
                        calculable: true
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'map',
                            roam: true,
                            mapType: 'china',
                            data: []
                        }
                    ]
                };
            };
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('decareMap', [
        function () {
            /**
             * 笛卡尔坐标系上的热力图的基本配置
             */
            this.getOption = function () {
                return {
                    grid: {
                        left: '22%',
                        height: '75%',
                        right: '0',
                        top: '0'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        splitArea: {
                            show: true
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: [],
                        splitArea: {
                            show: true
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 50,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center'
                    },
                    series: [{
                        name: 'Punch Card',
                        type: 'heatmap',
                        data: [],
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]

                };
            };
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/23.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('gauge', [
        function () {
            /**
             *  仪表盘基本配置
             * @param flag  单位
             */
            this.getOption = function (flag) {
                return{
                    tooltip: {
                        confine: true,
                        formatter: function (params, ticket, callback) {//修改formatter方式，模板法在有legend的情况下有bug
                            var res = params.name;
                            res += params.seriesName + ' : ' + params.value + flag;
                            return res;
                        }
                    },
                    series: []
                };
            };
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/23
 * Time: 14:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('line', ['echartsFormatter',
        function (echartsFormatter) {
            /**
             * 折线图基本配置
             * @param flag 单位
             * @returns {{tooltip: {trigger: string, formatter: line.tooltip.formatter}, legend: {data: Array, bottom: number}, grid: {left: string, right: string, bottom: string, top: number, containLabel: boolean}, xAxis: {type: string, boundaryGap: boolean, data: Array}, yAxis: {type: string, axisLabel: {formatter: string}}, series: Array}}
             */
            this.getOption = function (flag) {
                return {
                    tooltip: {
                        trigger: 'axis',
                        confine: true,
                        formatter: function (params, ticket, callback) {
                            return echartsFormatter.formatter(params, ticket, callback, flag);
                        }
                    },
                    legend: {
                        data: [],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: 25,
                        top: 10,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        /*axisLabel:{
                         interval:0
                         },*/
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}' + flag
                        }
                    },
                    series: []
                };
            };
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('pie', [
        function () {
            /**
             * 饼图基本配置
             * @param flag 单位
             */
            this.getOption = function (flag) {
                return {
                    color: [],
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params, ticket, callback) {//修改formatter方式，模板法在有legend的情况下有bug
                            var res = params.seriesName;
                            res += '<br/>' + params.name + ' : ' + params.percent + flag;
                            return res;
                        }
                    },
                    legend: {
                        data: []
                    },
                    series: []

                };
            };
        }
    ]);
})();
/**
 * Created by xd-66 on 2016/11/25.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('relationGraph', [
        function () {
            /**
             *  关系图基本配置
             */
            this.getOption = function () {
                return {
                    tooltip: {},
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            data: [],
                            links: [],
                            categories: [],
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right'
                                }
                            },
                            force: {
                                edgeLength: ['200', '5'],
                                repulsion: 1000
                            },
                            draggable: true,
                            focusNodeAdjacency: true,
                            itemStyle: {
                                emphasis: {
                                    show: true
                                }
                            },
                            symbolSize: 25

                        }
                    ]
                };
            };
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/23
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('sankey', [
        function () {
            /**
             * 散点图基本配置
             * @returns {{tooltip: {position: string, formatter: sankey.tooltip.formatter}, grid: {left: number, bottom: number, right: number, top: number, containLabel: boolean}, xAxis: {type: string, data: string[], boundaryGap: boolean, splitLine: {show: boolean, lineStyle: {color: string}}}, yAxis: {type: string, data: string[], splitLine: {show: boolean, lineStyle: {color: string}}}, series: *[]}}
             */
            this.getOption = function () {
                return {
                    tooltip: {
                        confine: true,
                        position: 'top'
                    },
                    grid: {
                        left: 2,
                        bottom: 10,
                        right: 20,
                        top: 2,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        type: 'category',
                        data: []
                    },
                    series: [{
                        name: 'Punch Card',
                        type: 'scatter',
                        symbolSize: function (val) {
                            var _size = val[2];
                            if (0 < _size && _size < 5) {
                                _size = 5;
                            }
                            if (_size > 40) {
                                _size = 40;
                            }
                            return _size;
                        },
                        data: [],
                        animationDelay: function (idx) {
                            return idx * 5;
                        }
                    }]
                };
            };
        }
    ]);
})();