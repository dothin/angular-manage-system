/**
 * Created by xd-66 on 2016/11/25.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('relationGraph', [
        function () {
            /**
             *  关系图基本配置
             */
            this.getOption = function () {
                return {
                    tooltip: {},
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            data: [],
                            links: [],
                            categories: [],
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right'
                                }
                            },
                            force: {
                                edgeLength: ['200', '5'],
                                repulsion: 1000
                            },
                            draggable: true,
                            focusNodeAdjacency: true,
                            itemStyle: {
                                emphasis: {
                                    show: true
                                }
                            },
                            symbolSize: 25

                        }
                    ]
                };
            };
        }
    ]);
})();