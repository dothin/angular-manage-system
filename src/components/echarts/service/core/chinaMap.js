/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/12
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('chinaMap', [
        function () {
            /**
             * 地图配置
             * @returns {{tooltip: {trigger: string}, visualMap: {min: number, max: number, left: string, itemHeight: number, top: string, text: string[], calculable: boolean}, series: *[]}}
             */
            this.getOption = function () {
                return {
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        left: 'left',
                        itemHeight: document.documentElement.clientHeight > 700 ? 100 : 60,
                        top: 'bottom',
                        text: ['高', '低'],           // 文本，默认为数值文本
                        calculable: true
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'map',
                            roam: true,
                            mapType: 'china',
                            data: []
                        }
                    ]
                };
            };
        }
    ]);
})();