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