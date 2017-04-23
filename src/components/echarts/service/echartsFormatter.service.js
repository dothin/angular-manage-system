/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/2/22
 * Time: 11:21
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('echartsFormatter', [function () {
        /**
         * 格式化柱状图和折线图
         * @param params
         * @param ticket
         * @param callback
         * @param flag  单位
         * @returns {string}
         */
        this.formatter = function (params, ticket, callback, flag) {
            //当前版本echarts存在bug，series里面的对象有多个时，params里面的对象的name属性值不一定存在
            /**
             * series : [
             {
                 name:'邮件营销',
                 type:'line',
                 stack: '总量',
                 data:[null, null, null, null, null, null, null]
             },
             {
                 name:'联盟广告',
                 type:'line',
                 stack: '总量',
                 data:[null, null, null, null, null, null, null]
             },
             {
                 name:'视频广告',
                 type:'line',
                 stack: '总量',
                 data:[150, 232, 201, 154, 190, 330, null]
             }
             ];
             此时name有问题
             */
            //var res = params[0].name;
            var res = '';
            angular.forEach(params, function (value) {
                res === '' && value.name && (res = value.name);
            });
            for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (flag ? flag : '');
            }
            return res;
        };
        /**
         * 格式化转柱状图折线图
         * @param params
         * @param ticket
         * @param callback
         * @param line  折线图单位
         * @param bar   柱状图单位
         * @returns {string}
         */
        this.formatterBarLine = function (params, ticket, callback, line, bar) {
            var res = '';
            angular.forEach(params, function (value) {
                res === '' && value.name && (res = value.name);
            });
            for (var i = 0, l = params.length; i < l; i++) {
                if (params[i].seriesType === 'line') {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (line ? line : '');
                } else {
                    res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + (bar ? bar : '');
                }
            }
            return res;
        };
    }]);
})();