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
/**
 * @Author: dothin
 * @Date:   2016-10-19 10:42:23
 * @Last Modified by:   dothin
 * @Last Modified time: 2016-10-19 10:54:52
 */

(function () {
    'use strict';
    myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngRapProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, ngRapProvider) {

            /*************************使用mock数据—­mockserver*********************/
            ngRapProvider.script = 'http://rap.xdbigdata.com/rap.plugin.js?projectId=14'; //replce your host and project id
            ngRapProvider.enable({
                mode: 3
            });
            $httpProvider.interceptors.push('rapMockInterceptor');
            /******************************************************************/

            $httpProvider.interceptors.push('postInterceptor');
            $urlRouterProvider.otherwise('/main');
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'dist/tpls/login.html',
                controller: 'loginCtrl as vm'
            }).state('404', {
                url: '/404',
                templateUrl: '404.html'
            }).state('main', {
                url: '/main',
                views: {
                    '': {
                        templateUrl: 'dist/tpls/main.html'
                    },
                    'header@main': {
                        templateUrl: 'dist/tpls/header.html',
                        controller: 'headerCtrl as vm'
                    },
                    'aside@main': {
                        templateUrl: 'dist/tpls/aside.html',
                        controller: 'asideCtrl as vm'
                    },
                    'section@main': {
                        templateUrl: 'dist/tpls/home/home.html',
                        controller: ['$state', function ($state) {
                            $state.go('main.home');
                        }]
                    }
                }
            }).state('main.home', {
                url: '/home',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/home/home.html',
                        controller: 'homeCtrl as vm'
                    }
                }
            }).state('main.echarts', {
                url: '/echarts',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/echarts/echarts.html',
                        controller: 'echartsCtrl as vm'
                    }
                }
            }).state('main.echarts.bar', {
                url: '/bar',
                templateUrl: 'dist/tpls/echarts/bar.html',
                controller: 'barCtrl as vm'
            }).state('main.echarts.line', {
                url: '/line',
                templateUrl: 'dist/tpls/echarts/line.html',
                controller: 'lineCtrl as vm'
            }).state('main.form', {
                url: '/form',
                views: {
                    'section@main': {
                        templateUrl: 'dist/tpls/form/form.html',
                        controller: 'formCtrl as vm'
                    }
                }
            }).state('main.form.validate', {
                url: '/validate',
                templateUrl: 'dist/tpls/form/validate.html',
                controller: 'validateCtrl as vm'
            });
        }
    ]);
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
    myApp.controller('asideCtrl', ['$state', 'CONFIG', '$rootScope',
        function ($state, CONFIG, $rootScope) {
            var vm = this;
            vm.state = $state;
            vm.config = CONFIG;
            /**
             * 点击群体画像，根据配置文件选择默认跳转
             */
            vm.goGroupHX = function () {
                var _keepGoing = true;
                angular.forEach(CONFIG.groupHX, function (data, key) {
                    //angular.forEach没有break；用_keepGoing模拟break跳出循环；
                    if (_keepGoing && data.show) {
                        window.localStorage.setItem('groupNameList', angular.toJson({all: {cName: $rootScope.user.type === 0 ? '全学院' : '全校'}}));
                        window.localStorage.setItem('groupCondition', angular.toJson({role: 0}));
                        window.localStorage.removeItem('groupCount');
                        $state.go('main.groupHX.' + key, {}, {reload: true});
                        _keepGoing = false;
                    }
                });
            };
        }
    ]);
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
    myApp.controller('headerCtrl', ['$rootScope',
        function ($rootScope) {
            var vm = this;
            vm.username = $rootScope.user.username;
        }
    ]);
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
    myApp.controller('loginCtrl', ['$rootScope', '$cookies', '$state', 'tools', 'userServer',
        function ($rootScope, $cookies, $state, tools, userServer) {
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
                    userServer.login(vm.user).then(function (data) {
                        if (data.status) {
                            $cookies.putObject('user', data.data);
                            $rootScope.user = $cookies.getObject('user');
                            $state.go('main');
                        } else {
                        }
                    });
                }
            };
        }
    ]);
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
    myApp.filter('error', ['ERRORS', function (ERRORS) {
        return function (name, customMessages) {
            var errors = angular.extend({}, ERRORS, customMessages);
            return errors[name] || name;
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/2/8
 * Time: 15:39
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 格式化学期
     */
    myApp.filter('formatYear', [function () {
        return function (input) {
            if (input) {
                return input.toString().substring(0, 4) + '-' + input.toString().slice(-4) + '年';
            }
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
    //支持数字和数组
    myApp.filter('toFixed', [function () {
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
    myApp.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();

/**
 * Created with IntelliJ IDEA.
 * User: Luo Qidi
 * Date: 2016/11/22
 * Time: 17:06
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('barCtrl', ['echartsHanderServer', 'groupHXBaseEcharts', 'groupHXBaseServer', 'tools', '$filter', '$rootScope',
        function (echartsHanderServer, groupHXBaseEcharts, groupHXBaseServer, tools, $filter, $rootScope) {
            var vm = this;
            vm.userType = $rootScope.user.type;
            var _param = angular.fromJson(window.localStorage.getItem('groupCondition')) || {};
            vm.config = echartsHanderServer.getConfig('groupHX', 'base', groupHXBaseEcharts);
            echartsHanderServer.echartsHandler({
                'sex': function (ech, option) {
                    vm.initSex = function () {
                        groupHXBaseServer.getBaseSex(_param).then(function (data) {
                            if (data.status) {
                                option.legend.data = ['男', '女', '未知'];
                                option.series = [
                                    {
                                        name: '性别',
                                        type: 'pie',
                                        radius: '55%',
                                        center: ['50%', '60%'],
                                        data: $filter('toFixed')(data.data, 2),
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ];
                                ech.clear();
                                ech.setOption(option);
                                ech.hideLoading();
                            }
                        });
                    };
                    vm.initSex();
                },
                'age': function (ech, option) {
                    vm.initAge = function () {
                        groupHXBaseServer.getBaseAge(_param).then(function (data) {
                            if (data.status) {
                                vm.minAndAvg = data.data.minAndAvg;
                                option.xAxis.data = [];
                                option.series = [{
                                    name: '人数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    data: []
                                }];
                                angular.forEach(data.data.ages, function (data1) {
                                    option.xAxis.data.push(data1.name);
                                    option.series[0].data.push(data1.num);
                                });
                                ech.clear();
                                ech.setOption(option);
                                ech.hideLoading();
                            }
                        });
                    };
                    vm.initAge();
                },
                'major': function (ech, option) {
                    vm.initMajor = function () {
                        var _action = vm.userType === 1 ? 'getBaseCollege' : 'getBaseMajor';
                        groupHXBaseServer[_action](_param).then(function (data) {
                            if (data.status) {
                                option.legend.data = ['男', '女', '未知'];
                                option.series = [
                                    {
                                        name: '男',
                                        type: 'bar',
                                        stack: '人数',
                                        barMaxWidth: 50,
                                        /*label: {
                                         normal: {
                                         show: true,
                                         position: 'insideRight'
                                         }
                                         },*/
                                        data: []
                                    },
                                    {
                                        name: '女',
                                        type: 'bar',
                                        stack: '人数',
                                        barMaxWidth: 50,
                                        data: []
                                    },
                                    {
                                        name: '未知',
                                        type: 'bar',
                                        stack: '人数',
                                        barMaxWidth: 50,
                                        data: []
                                    }];
                                vm.items = [];
                                for (var i = 0; i < data.data.length / 3; i++) {
                                    vm.items.push(i + 1);
                                }
                                vm.item = 1;
                                vm.changeItem = function (item) {
                                    vm.item = item;
                                    vm.initItem();
                                };
                                vm.initItem = function () {
                                    vm.dataList = data.data.slice((vm.item - 1) * 3, 3 * vm.item);
                                    option.series[0].data = [];
                                    option.series[1].data = [];
                                    option.series[2].data = [];
                                    option.yAxis.data = [];
                                    angular.forEach(vm.dataList, function (data1) {
                                        option.yAxis.data.push(data1[vm.userType === 1 ? 'college' : 'major']);
                                        /*option.series[0].data.push(data1.man === 0 ? null : data1.man);
                                         option.series[1].data.push(data1.woman === 0 ? null : data1.woman);
                                         option.series[2].data.push(data1.unknown === 0 ? null : data1.unknown);*/
                                        option.series[0].data.push(data1.man);
                                        option.series[1].data.push(data1.woman);
                                        option.series[2].data.push(data1.unknown);
                                    });
                                    ech.clear();
                                    ech.setOption(option);
                                    ech.hideLoading();
                                };
                                vm.initItem();
                            }
                        });
                    };
                    vm.initMajor();
                },
                'origin': function (ech, option) {
                    vm.initOrigin = function () {
                        groupHXBaseServer.getBaseOrigin(_param).then(function (data) {
                            if (data.status) {

                                option.series[0].data = data.data.map(function (value) {
                                    return {name: value.name, value: value.num};
                                });
                                option.visualMap.max = 100;
                                if (data.data.length > 0) {
                                    option.visualMap.max = tools.max(data.data.map(function (value) {
                                        return value.num;
                                    }));
                                }
                                ech.clear();
                                ech.setOption(option);
                                ech.hideLoading();
                            }
                        });
                    };
                    vm.initOrigin();
                },
                'political': function (ech, option) {
                    vm.initPolitical = function () {
                        groupHXBaseServer.getBasePolitical(_param).then(function (data) {
                            if (data.status) {
                                option.series = [
                                    {
                                        name: '政治面貌',
                                        type: 'pie',
                                        radius: ['40%', '55%'],
                                        data: data.data
                                    }
                                ];
                                ech.clear();
                                ech.setOption(option);
                                ech.hideLoading();
                            }
                        });
                    };
                    vm.initPolitical();
                },
                'nation': function (ech, option) {
                    vm.initNation = function () {
                        groupHXBaseServer.getBaseNation(_param).then(function (data) {
                            if (data.status) {
                                vm.count = data.data.count;
                                vm.percent = data.data.percent;
                                vm.hanNum = data.data.hanNum;
                                vm.nullNum = data.data.nullNum;
                                option.xAxis.data = [];
                                option.series = [
                                    {
                                        name: '民族人数',
                                        barMaxWidth: 50,
                                        type: 'bar',
                                        data: []
                                    }
                                ];
                                angular.forEach(data.data.nation, function (data1) {
                                    option.xAxis.data.push(data1.name);
                                    option.series[0].data.push(data1.num);
                                });
                                ech.clear();
                                ech.setOption(option);
                                ech.hideLoading();
                            }
                        });
                    };
                    vm.initNation();
                }
            });
        }
    ]);
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
    myApp.controller('echartsCtrl', ['CONFIG',
        function (CONFIG) {
            var vm = this;
            vm.config = CONFIG.groupHX;
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/30
 * Time: 15:28
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('filterCtrl', ['$state', 'CONFIG', 'tools',
        function ($state, CONFIG, tools) {
            var vm = this;
            vm.condition = {};
            vm.filterConf = {
                filter: {}
            };
            /**
             * 清空
             */
            vm.clearAll = function () {
                vm.filterConf.filter = {};
            };
            /**
             * 提交
             */
            vm.submit = function () {
                if (tools.isEmptyObject(vm.filterConf.filter)) {
                    tools.alertError('请先选择条件');
                    return false;
                }
                angular.forEach(vm.filterConf.filter, function (value, key) {
                    vm.condition[key] = value.objArr;
                });
                /**
                 * 根据配置文件选择默认跳转
                 */
                var _keepGoing = true;
                angular.forEach(CONFIG.groupHX, function (data, key) {
                    //angular.forEach没有break；用_keepGoing模拟break跳出循环；
                    if (_keepGoing && data.show) {
                        window.localStorage.setItem('groupNameList', angular.toJson(vm.filterConf.filter));
                        window.localStorage.setItem('groupCondition', angular.toJson(vm.condition));
                        window.localStorage.removeItem('groupCount');
                        $state.go('main.groupHX.' + key);
                        _keepGoing = false;
                    }
                });
            };
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/28
 * Time: 16:15
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('homeCtrl', ['$state', 'CONFIG', '$rootScope', '$timeout',
        function ($state, CONFIG, $rootScope, $timeout) {
            var vm = this;
            vm.goGroupHX = function (state) {
                window.localStorage.setItem('groupNameList', angular.toJson({all: {cName: $rootScope.user.type === 0 ? '全学院' : '全校'}}));
                window.localStorage.setItem('groupCondition', angular.toJson({}));
                window.localStorage.removeItem('groupCount');
                $state.go('main.groupHX.' + state);
            };
            $timeout(function () {
                vm.config = CONFIG;
            });
        }
    ]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.controller('userSafeCtrl', ['$rootScope', 'userServer', 'tools',
        function ($rootScope, userServer, tools) {
            var vm = this;
            vm.user = $rootScope.user;
            vm.submit = false;
            vm.resetPass = function () {
                vm.submit = true;
                if (vm.resetPassForm.$valid) {
                    var _postData = {
                        'username': vm.user.username,
                        'oldPass': vm.user.oldPass,
                        'newPass': vm.user.newPass
                    };
                    userServer.changePassword(_postData).then(function (data) {
                        if (data.status) {
                            tools.alertSuccess('修改密码成功');
                            vm.user = {};
                            vm.submit = false;
                        }
                    });
                }
            };
        }
    ]);
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
    myApp.directive('changeMode', ['$timeout', function ($timeout) {
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
    myApp.directive('logout', ['tools', '$state', 'userServer',
        function (tools, $state, userServer) {
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
    myApp.directive('modal', [function () {
        return {
            restrict: 'E',
            templateUrl: 'dist/tpls/directiveTpls/modal.html',
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
                     * 关闭模态框
                     */
                    vm.cancel = function () {
                        vm.hide();
                        vm.modalConf.cancel && vm.modalConf.cancel();
                    };
                    /**
                     * 保存模态框
                     */
                    vm.save = function () {
                        vm.modalConf.save && vm.modalConf.save();
                    };
                }
            }]
        };
    }]);
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
    myApp.directive('search', [function () {
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
    myApp.directive('setTime', [function () {
        return {
            restrict: 'E',
            templateUrl: 'dist/tpls/directiveTpls/setTime.html',
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
    myApp.directive('tmPagination', [function () {
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
    myApp.directive('fieldError', ['$compile', function ($compile) {
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
    }]);
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
    myApp.directive('repeat', [function () {
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
    }]);
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
    myApp.directive('tooltip', ['$compile', function ($compile) {
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
    }]);
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
    myApp.directive('validatePassword', [function () {
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
    }]);
})();
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
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/21
 * Time: 9:40
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 模块化配置
     */
    var _config = {
        home: {
            show: true
        },
        groupHX: {
            show: true, //群体画像功能关闭后，受影响的其他模块有：关注群体里面查看群体画像，个人画像里面查看圈子画像，首页入口
            base: {
                show: true,
                option: {
                    sex: {
                        show: true,
                        class: 'col-3-1'
                    },
                    age: {
                        show: true,
                        class: 'col-3-1'
                    },
                    major: {
                        show: true,
                        class: 'col-3-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-3-1'
                    },
                    political: {
                        show: true,
                        class: 'col-3-1'
                    },
                    nation: {
                        show: true,
                        class: 'col-3-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    abnormal: {
                        show: true,
                        class: 'col-3-1'
                    },
                    dormInOut: {
                        show: true,
                        class: 'col-3-1'
                    },
                    lifeRegular: {
                        show: true,
                        class: 'col-3-1'
                    },
                    stopDorm: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    lowConsume: {
                        show: true,
                        class: 'col-3-1'
                    },
                    eatConsume: {
                        show: false,
                        class: 'col-3-1'
                    },
                    consumeType: {
                        show: true,
                        class: 'col-3-2'
                    },
                    cardMonth: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friendship: {
                        show: true,
                        class: 'col-1-1'
                    },
                    active: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situationNum: {
                        show: true,
                        class: 'col-1-1'
                    },
                    bookType: {
                        show: true,
                        class: 'col-2-1'
                    },
                    bookRank: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    fail: {
                        show: true,
                        class: 'col-4-1'
                    },
                    rankChange: {
                        show: true,
                        class: 'col-4-1'
                    },
                    courseAvg: {
                        show: true,
                        class: 'col-2-1'
                    },
                    courseScore: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    practice: {
                        show: false,
                        class: 'col-1-1 col-h100s'
                    }
                }
            }
        },
        groupCompare: {
            show: true,
            compareCondition: {
                normalCompare: {
                    show: true
                },
                twoCompare: {
                    show: true
                },
                focusCompare: {
                    show: true
                }
            },
            base: {
                show: true,
                option: {
                    base: {
                        show: true,
                        class: 'col-1-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    outIn: {
                        show: true,
                        class: 'col-2-1'
                    },
                    law: {
                        show: true,
                        class: 'col-2-1'
                    },
                    stay: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    month: {
                        show: true,
                        class: 'col-3-1'
                    },
                    diningRoom: {
                        show: true,
                        class: 'col-3-1'
                    },
                    breakfast: {
                        show: true,
                        class: 'col-3-1'
                    },
                    card: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friend: {
                        show: true,
                        class: 'col-1-1'
                    },
                    activity: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situation: {
                        show: true,
                        class: 'col-2-1'
                    },
                    proportion: {
                        show: true,
                        class: 'col-2-1'
                    },
                    average: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    fail: {
                        show: true,
                        class: 'col-1-1'
                    },
                    score: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    base: {
                        show: false,
                        class: 'col-1-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            }
        },
        focusGroup: {
            show: true, //关注功能关闭后，受影响的其他模块有：添加关注，群体对比里面两两对比和关注群体对比隐藏，个人画像搜索界面去关注列表的入口，首页入口
            groupManage: {
                show: true
            },
            groupList: {
                show: true
            }
        },
        studentHX: {
            show: true, //个人画像功能关闭后，受影响的其他模块有：各个名单个人画像入口，首页入口
            base: {
                show: true,
                option: {
                    base: {
                        show: true,
                        class: 'col-2-1'
                    },
                    contact1: {
                        show: true,
                        class: 'col-2-1'
                    },
                    grade: {
                        show: true,
                        class: 'col-2-1'
                    },
                    contact2: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    abnormal: {
                        show: true,
                        class: 'col-3-1'
                    },
                    track: {
                        show: true,
                        class: 'col-3-1'
                    },
                    rule: {
                        show: true,
                        class: 'col-3-1'
                    },
                    time: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    lowConsumption: {
                        show: true,
                        class: 'col-3-1'
                    },
                    meals: {
                        show: false,
                        class: 'col-3-1'
                    },
                    type: {
                        show: true,
                        class: 'col-3-2'
                    },
                    card: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friendship: {
                        show: true,
                        class: 'col-2-1 col-h100s'
                    },
                    social: {
                        show: true,
                        class: 'col-2-1 col-h100s'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situation: {
                        show: true,
                        class: 'col-1-1'
                    },
                    category: {
                        show: true,
                        class: 'col-2-1'
                    },
                    last: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    average: {
                        show: true,
                        class: 'col-4-3'
                    },
                    list: {
                        show: true,
                        class: 'col-4-1'
                    },
                    score: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    practice: {
                        show: false,
                        class: 'col-1-1 col-h100s'
                    }
                }
            }
        },
        warning: {
            show: true,
            lostDetail: {
                show: true
            },
            poorDetail: {
                show: true
            },
            studyDetail: {
                show: true
            }
        },
        analysis: {
            show: true
        },
        dataExport: {
            show: true
        },
        userSafe: {
            show: true
        },
        userSet: {
            show: false
        }
    };
    myApp.constant('CONFIG', _config);
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
    myApp.constant('THEME', _theme);
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
    myApp.constant('ERRORS', {
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
 * Date: 2017/2/9
 * Time: 15:34
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    myApp.constant('loading', {
        text: '',
        color: '#ff587b'
    });
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/5
 * Time: 11:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 常量
     */
    myApp.constant('ROOT', '');
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

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/24
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    hxApp.service('echartsHanderServer', ['CONFIG', '$timeout', 'THEME', 'loading',
        function (CONFIG, $timeout, THEME, loading) {
            var _this = this;
            /**
             * 获取模块化配置文件，并且注入配置项到构造器
             * @param type  类型（如：群体对比：groupCompare）
             * @param page  页面（如：群体对比--基本信息：base）
             * @param echartsOption echarts配置项服务
             * @returns {*}
             */
            this.getConfig = function (type, page, echartsOption) {
                this.type = type;
                this.page = page;
                this.echartsOption = echartsOption;
                return CONFIG[this.type][this.page].option;
            };
            /**
             * echarts模块公共服务
             * @param module    echarts模块项
             */
            this.echartsHandler = function (module) {
                //遍历echarts模块项
                angular.forEach(module, function (value, key) {
                    if (_this.getConfig(_this.type, _this.page, _this.echartsOption)[key].show) {
                        $timeout(function () {
                            _this['echarts' + key] = echarts.init(document.getElementById(key), THEME);
                            var option = _this.echartsOption[key];
                            _this['echarts' + key].showLoading(loading);
                            value(_this['echarts' + key], option);
                        });
                    }
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
 * User: dothin
 * Date: 2017/2/22
 * Time: 11:21
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.service('echartsFormatter', [function () {
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
 * Date: 2016/8/22
 * Time: 15:35
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 获取时间和时间判定
     */
    myApp.factory('getDateNow', [function () {
        /**
         * 获取画像时间设置
         * @param item  间隔月份
         * @returns {{startYearArr: Array.<T>, endYearArr: Array.<T>, startMonth: number, endMonth: number}}
         * @private
         */
        var _getDate = function (item) {
            var _date = new Date();
            var _year = 2016;
            var _thisMonth = 8 + 1;
            var _startMonth, _startYear;
            //判断开始月份和开始年份
            if (_thisMonth > item - 1) {
                _startMonth = _thisMonth - item + 1;
                _startYear = _year;
            } else {
                _startMonth = (_thisMonth + item + 1) % 12;
                _startYear = _year - 1;
            }
            var _yearArr = [];
            for (var i = 0; i < _year - 2012; i++) {
                _yearArr.push(_year - i);
            }
            return {
                yearArr: _yearArr.reverse(),
                startMonth: _startMonth,
                endMonth: _thisMonth,
                startYear: _startYear,
                endYear: _year
            };
        };
        return {
            getDate: _getDate
        };
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/5
 * Time: 14:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 工具
     */
    myApp.service('tools', ['$timeout', '$cookies', '$rootScope', function ($timeout, $cookies, $rootScope) {
        //退出
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
    }]);
})();

/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/13
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 群体画像--基本信息服务
     */
    myApp.factory('groupHXBaseServer', ['httpServer', function (httpServer) {
        var service = {};
        //获取总人数
        service.getCount = function (data) {
            return httpServer.postHttp('/group/baseInfo/count?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取性别人数分布
        service.getBaseSex = function (data) {
            return httpServer.postHttp('/group/baseInfo/gender?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取年龄人数分布
        service.getBaseAge = function (data) {
            return httpServer.postHttp('/group/baseInfo/age?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取学院人数分布
        service.getBaseCollege = function (data) {
            return httpServer.postHttp('/group/baseInfo/college?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取专业人数分布
        service.getBaseMajor = function (data) {
            return httpServer.postHttp('/group/baseInfo/major?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取生源地人数分布
        service.getBaseOrigin = function (data) {
            return httpServer.postHttp('/group/baseInfo/comePlace?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取政治面貌人数分布
        service.getBasePolitical = function (data) {
            return httpServer.postHttp('/group/baseInfo/politicsStatus?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取民族人数分布
        service.getBaseNation = function (data) {
            return httpServer.postHttp('/group/baseInfo/nation?role=' + (data.role === 0 ? 0 : 1), data);
        };
        return service;
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/13
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 群体画像--消费水平服务
     */
    myApp.factory('groupHXConsumptionServer', ['httpServer', function (httpServer) {
        var service = {};
        /*食堂低消费学生*/
        service.getLowConsumption = function (data) {
            return httpServer.postHttp('/group/consumption/lowConsumptionNum?role=' + (data.role === 0 ? 0 : 1), data);
        };
        service.getLowConsumptionDetail = function (data) {
            return httpServer.postHttp('/group/consumption/lowConsumeDetail?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //导出学生低消费详情
        service.getStudentExport = function (data) {
            return httpServer.postHttp('/group/consumption/exportLowConsumeDetail?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //导出学院低消费名单
        service.getSchoolExport = function (data) {
            return httpServer.postHttp('/group/consumption/exportLowConsumeDetailByCollegeAndGrade?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*三餐消费*/
        service.getMeals = function (data) {
            return httpServer.postHttp('/group/consumption/threeConsumeTime?role=' + (data.role === 0 ? 0 : 1), data);
        };
        service.getMealTimes = function (data) {
            return httpServer.postHttp('/group/consumption/breakfastConsumeTime?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*消费类型*/
        service.getType = function (data) {
            return httpServer.postHttp('/group/consumption/consumeType?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*每月刷卡*/
        //todo
        service.getCard = function (data) {
            return httpServer.postHttp('/group/consumption/everyMonthCardBrush?type=' + data.type + '&isLow=' + data.isLow + '&role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*经济水平预测*/
        service.getForecast = function (data) {
            return httpServer.postHttp('/group/consumption/economicForecast?role=' + (data.role === 0 ? 0 : 1), data);
        };
        return service;
    }]);
})();
/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/5
 * Time: 10:55
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 用户服务
     */
    myApp.factory('userServer', ['httpServer',
        function (httpServer) {
            var myServices = {};
            //登录
            myServices.login = function (data) {
                return httpServer.postHttp('/user/login', data);
            };
            //退出登录
            myServices.logout = function () {
                return httpServer.postHttp('/user/logout');
            };
            //修改密码
            myServices.changePassword = function (data) {
                return httpServer.postHttp('/user/security/changePassword', data);
            };
            return myServices;
        }
    ]);
})();