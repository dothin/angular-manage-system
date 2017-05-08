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