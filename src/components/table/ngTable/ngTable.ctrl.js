/**
 * Created by liuying on 2017/6/1.
 */
(function () {

    'use strict';

    angular.module('app.table').controller('ngTableCtrl',['NgTableParams',
        function (NgTableParams) {
            var vm = this;

            vm.dataset = [
                {
                    "sId":1,
                    "submitTime":"2017.5.12 14:32:00",
                    "stuName":"李思思",
                    "stuNum":2014010413001,
                    "col":"经管学院"
                },{
                    "sId":2,
                    "submitTime":"2017.5.12 14:32:01",
                    "stuName":"张学雨",
                    "stuNum":2014010413002,
                    "col":"金融学院"
                },{
                    "sId":3,
                    "submitTime":"2017.5.12 14:32:02",
                    "stuName":"谢小龙",
                    "stuNum":2014010413015,
                    "col":"会计学院"
                },{
                    "sId":4,
                    "submitTime":"2017.5.12 14:32:03",
                    "stuName":"刘天宇",
                    "stuNum":2014010413016,
                    "col":"统计学院"
                },{
                    "sId":5,
                    "submitTime":"2017.5.12 14:32:04",
                    "stuName":"夏雨欣",
                    "stuNum":2014010413032,
                    "col":"法学院"
                },{
                    "sId":6,
                    "submitTime":"2017.5.12 14:32:05",
                    "stuName":"陈思雨",
                    "stuNum":2014010413016,
                    "col":"经管学院"
                },{
                    "sId":7,
                    "submitTime":"2017.5.12 14:32:06",
                    "stuName":"吴宇",
                    "stuNum":2014010413018,
                    "col":"金融学院"
                },{
                    "sId":8,
                    "submitTime":"2017.5.12 14:32:07",
                    "stuName":"刘旭",
                    "stuNum":2014010413014,
                    "col":"会计学院"
                },{
                    "sId":9,
                    "submitTime":"2017.5.12 14:32:08",
                    "stuName":"李菊宇",
                    "stuNum":2014010413013,
                    "col":"统计学院"
                },{
                    "sId":10,
                    "submitTime":"2017.5.12 14:32:09",
                    "stuName":"万晓强",
                    "stuNum":2014010413002,
                    "col":"法学院"
                },{
                    "sId":11,
                    "submitTime":"2017.5.12 14:32:10",
                    "stuName":"曾玉",
                    "stuNum":2014010413007,
                    "col":"经管学院"
                },{
                    "sId":12,
                    "submitTime":"2017.5.12 14:32:11",
                    "stuName":"罗啸天",
                    "stuNum":2014010413008,
                    "col":"金融学院"
                },{
                    "sId":13,
                    "submitTime":"2017.5.12 14:32:12",
                    "stuName":"罗晓霞",
                    "stuNum":2014010413009,
                    "col":"会计学院"
                },{
                    "sId":14,
                    "submitTime":"2017.5.12 14:32:13",
                    "stuName":"孙玉",
                    "stuNum":2014010413032,
                    "col":"统计学院"
                }
            ];

            vm.tableParams = new NgTableParams({
                count: 10
            },{
                counts: [],
                paginationMaxBlocks: 2,//最大页数
                paginationMinBlocks: 1,//最小页数
                dataset:vm.dataset
            });

            vm.showFilter = false;

            vm.showSearch = function () {
                vm.showFilter = !vm.showFilter;
            }
        }
    ]);
})();
