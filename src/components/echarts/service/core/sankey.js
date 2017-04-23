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