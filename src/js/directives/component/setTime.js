/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/31
 * Time: 16:04
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.directive('setTime', [function () {
        return {
            restrict: 'E',
            templateUrl: 'dist/tpls/directiveTpls/setTime.html',
            replace: true,
            scope: {
                timeConf: '=conf'
            },
            controller: ['$rootScope', '$scope', 'getDateNow', function ($rootScope, $scope, getDateNow) {
                //年份数组
                $scope.yearArr = getDateNow.getDate(12).yearArr;
                //开始年份
                $scope.startYear = getDateNow.getDate(12).startYear.toString();
                //结束年份
                $scope.endYear = getDateNow.getDate(12).endYear.toString();
                //当前月份
                $scope.lastMonth = getDateNow.getDate(12).endMonth;
                //当前年份
                $scope.lastYear = getDateNow.getDate(12).endYear;
                //结束月份
                $scope.endMonth = getDateNow.getDate(12).endMonth < 10 ? ('0' + getDateNow.getDate(12).endMonth) : getDateNow.getDate(12).endMonth.toString();
                //开始月份
                $scope.startMonth = getDateNow.getDate(12).startMonth < 10 ? ('0' + getDateNow.getDate(12).startMonth) : getDateNow.getDate(12).startMonth.toString();
                //直接准备个数组，方便取值
                $scope.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                //有种情况需要监听开始年份和结束两份：当开始月份大于结束月份的时候，切换开始年份等于结束年份，这时需要将开始月份等于结束月份；结束年份同理
                $scope.$watch('startYear', function (to) {
                    to === $scope.endYear && $scope.startMonth >= $scope.endMonth && ($scope.startMonth = $scope.endMonth);
                });
                $scope.$watch('endYear', function (to) {
                    //判断开始月份
                    to === $scope.startYear && $scope.startMonth >= $scope.endMonth && ($scope.startMonth = $scope.endMonth);
                    //判断结束月份
                    to === $scope.lastYear.toString() && $scope.endMonth > $scope.lastMonth && ($scope.endMonth = $scope.lastMonth < 10 ? ('0' + $scope.lastMonth) : $scope.lastMonth.toString());
                });
                if ($scope.timeConf) {
                    //监听select Model，格式化数据准备给后端
                    //后端那傻逼要在后面加个日期'-00'，不然他后台要报错~_~
                    //可以不用监听，然后controller里面直接用startYear,startMonth……,然后格式化也行
                    //但是监听的话，可以直接返回格式化后的数据给controller，方便维护
                    $scope.$watch('startYear+startMonth+endYear+endMonth', function () {
                        $scope.timeConf.startDate = $scope.startYear + '-' + $scope.startMonth + '-01';
                        $scope.timeConf.endDate = $scope.endYear + '-' + $scope.endMonth + '-' + new Date($scope.endYear, $scope.endMonth, 0).getDate();
                        $scope.timeConf.ready = true;
                    });
                    //回调钩子
                    $scope.submit = function () {
                        if ($scope.timeConf.submitTime) {
                            $rootScope.clearPending();
                            $scope.timeConf.submitTime();
                        }
                    };
                }
            }]
        };
    }]);
})();