/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    /**
     * 个人画像---消费水平---echarts配置
     */
    angular.module('app.echarts').factory('barServer', ['barLine', 'pie', 'decareMap', 'gauge',
        function (barLine, pie, decareMap, gauge) {
            var _option = {
                card: function () {
                    //获取基础配置项
                    var _consumptionOption = barLine.getOption('元', '次');
                    //需要修改配置在此处进行
                    return _consumptionOption;
                },
                type: function () {
                    //获取基础配置项
                    var _consumptionOption = pie.getOption('%');
                    //需要修改配置在此处进行
                    return _consumptionOption;
                },
                meals: function () {
                    //获取基础配置项
                    var _consumptionOption = decareMap.getOption();
                    //需要修改配置在此处进行
                    return _consumptionOption;
                },
                economic: function () {
                    //获取基础配置项
                    var _consumptionOption = gauge.getOption('');
                    _consumptionOption.tooltip = {
                        show: false
                    };
                    //需要修改配置在此处进行
                    return _consumptionOption;
                }
            };
            return {
                card: _option.card(),
                type: _option.type(),
                meals: _option.meals(),
                economic: _option.economic()
            };
        }
    ]);
})();