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