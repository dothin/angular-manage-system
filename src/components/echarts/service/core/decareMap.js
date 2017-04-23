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