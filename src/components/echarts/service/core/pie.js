/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('pie', [
        function () {
            /**
             * 饼图基本配置
             * @param flag 单位
             */
            this.getOption = function (flag) {
                return {
                    color: [],
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params, ticket, callback) {//修改formatter方式，模板法在有legend的情况下有bug
                            var res = params.seriesName;
                            res += '<br/>' + params.name + ' : ' + params.percent + flag;
                            return res;
                        }
                    },
                    legend: {
                        data: []
                    },
                    series: []

                };
            };
        }
    ]);
})();