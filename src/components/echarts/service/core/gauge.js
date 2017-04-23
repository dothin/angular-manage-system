/**
 * Created by xd-66 on 2016/11/23.
 */
(function () {
    'use strict';
    angular.module('app.echarts').service('gauge', [
        function () {
            /**
             *  仪表盘基本配置
             * @param flag  单位
             */
            this.getOption = function (flag) {
                return{
                    tooltip: {
                        confine: true,
                        formatter: function (params, ticket, callback) {//修改formatter方式，模板法在有legend的情况下有bug
                            var res = params.name;
                            res += params.seriesName + ' : ' + params.value + flag;
                            return res;
                        }
                    },
                    series: []
                };
            };
        }
    ]);
})();