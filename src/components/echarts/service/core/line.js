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