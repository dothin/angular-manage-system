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