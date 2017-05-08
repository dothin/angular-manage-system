/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    /**
     * 个人画像---消费水平---echarts配置
     */
    angular.module('app.echarts').factory('barServer', ['barLine', 'bar',
        function (barLine, bar) {
            var _option = {
                bar1: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('元');
                    //需要修改配置在此处进行

                    return barOption;
                },
                bar2: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('%');
                    //需要修改配置在此处进行
                    barOption.xAxis.type = 'value';
                    barOption.xAxis.show = false;
                    barOption.grid.right = '10%';
                    barOption.yAxis = {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: []
                    };

                    return barOption;
                },
                bar3: function () {
                    //获取基础配置项
                    var barOption = bar.getOption('元');
                    //需要修改配置在此处进行

                    return barOption;
                }
            };
            return {
                bar1: _option.bar1(),
                bar2: _option.bar2(),
                bar3: _option.bar3()
            };
        }
    ]);
})();