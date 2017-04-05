/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/24
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    hxApp.service('echartsHanderServer', ['CONFIG', '$timeout', 'THEME', 'loading',
        function (CONFIG, $timeout, THEME, loading) {
            var _this = this;
            /**
             * 获取模块化配置文件，并且注入配置项到构造器
             * @param type  类型（如：群体对比：groupCompare）
             * @param page  页面（如：群体对比--基本信息：base）
             * @param echartsOption echarts配置项服务
             * @returns {*}
             */
            this.getConfig = function (type, page, echartsOption) {
                this.type = type;
                this.page = page;
                this.echartsOption = echartsOption;
                return CONFIG[this.type][this.page].option;
            };
            /**
             * echarts模块公共服务
             * @param module    echarts模块项
             */
            this.echartsHandler = function (module) {
                //遍历echarts模块项
                angular.forEach(module, function (value, key) {
                    if (_this.getConfig(_this.type, _this.page, _this.echartsOption)[key].show) {
                        $timeout(function () {
                            _this['echarts' + key] = echarts.init(document.getElementById(key), THEME);
                            var option = _this.echartsOption[key];
                            _this['echarts' + key].showLoading(loading);
                            value(_this['echarts' + key], option);
                        });
                    }
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