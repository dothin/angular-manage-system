/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/21
 * Time: 16:02
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').controller('barCtrl', ['echartsHanderServer', 'barServer', 'compareResultLibraryServer', 'tools', '$filter', '$scope',
        function (echartsHanderServer, barServer, compareResultLibraryServer, tools, $filter, $scope) {
            var vm = this;
            vm.init = function () {
                echartsHanderServer.echartsHandler({
                    'situation': function (ech, option) {
                        vm.initSituation = function () {
                            vm._postData = {
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
                            });
                        };
                        vm.initSituation();
                    },
                    'proportion': function (ech, option) {
                        vm.initProportion = function () {
                            vm._postData = {
                                startDate: vm.timeConf.startDate,
                                endDate: vm.timeConf.endDate
                            };
                            angular.forEach(_param, function (data) {
                                angular.extend(data, vm._postData);
                            });
                            compareResultLibraryServer.getCompareLibraryProportion(_param).then(function (data) {
                                if (data.status) {
                                    option.xAxis.data = _conditionList;
                                    option.series = [
                                        {
                                            name: '占比',
                                            type: 'bar',
                                            barMaxWidth: 50,
                                            data: $filter('toFixed')(tools.formatArr(data.data, 100), 2)
                                        }
                                    ];
                                    ech.clear();
                                    ech.setOption(option);
                                    ech.hideLoading();
                                }
                            });
                        };
                        vm.initProportion();
                    },
                    'average': function (ech, option) {
                        vm.initAverage = function () {
                            vm._postData = {
                                startDate: vm.timeConf.startDate,
                                endDate: vm.timeConf.endDate
                            };
                            angular.forEach(_param, function (data) {
                                angular.extend(data, vm._postData);
                            });
                            compareResultLibraryServer.getCompareLibraryAverage(_param).then(function (data) {
                                if (data.status) {
                                    option.xAxis.data = data.data.date;
                                    option.legend.data = _conditionList;
                                    option.series = [];
                                    angular.forEach(option.legend.data, function (data1, key) {
                                        option.series.push({
                                            name: data1,
                                            type: 'line',
                                            showAllSymbol: true,
                                            data: $filter('toFixed')(data.data.data[key], 2)
                                        });
                                    });
                                    ech.clear();
                                    ech.setOption(option);
                                    ech.hideLoading();
                                }
                            });
                        };
                        vm.initAverage();
                    }
                });
            };
            $scope.$watch('vm.timeConf.ready', function (to) {
                to && vm.init();
            });
            vm.timeConf = {
                submitTime: function () {
                    vm.init();
                }
            };
        }
    ]);
})();