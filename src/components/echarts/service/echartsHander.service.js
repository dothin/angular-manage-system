/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/24
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('echartsHanderServer', ['$timeout', 'THEME', 'loading',
        function ($timeout, THEME, loading) {
            var _this = this;
            /**
             * echarts模块公共服务
             * @param module    echarts模块项
             */
            this.echartsHandler = function (echartsOption, module) {
                //遍历echarts模块项
                angular.forEach(module, function (value, key) {
                    $timeout(function () {
                        _this['echarts' + key] = echarts.init(document.getElementById(key), THEME);
                        var option = echartsOption[key];
                        _this['echarts' + key].showLoading(loading);
                        value(_this['echarts' + key], option);
                    });
                });
                //遍历echarts浏览器缩放自适应
                window.onresize = function () {
                    angular.forEach(module, function (value, key) {
                        _this['echarts' + key] && _this['echarts' + key].resize();
                    });
                };
            };
        }
    ]);
})();