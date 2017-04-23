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