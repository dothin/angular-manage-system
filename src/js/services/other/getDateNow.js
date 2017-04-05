/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/22
 * Time: 15:35
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 获取时间和时间判定
     */
    myApp.factory('getDateNow', [function () {
        /**
         * 获取画像时间设置
         * @param item  间隔月份
         * @returns {{startYearArr: Array.<T>, endYearArr: Array.<T>, startMonth: number, endMonth: number}}
         * @private
         */
        var _getDate = function (item) {
            var _date = new Date();
            var _year = 2016;
            var _thisMonth = 8 + 1;
            var _startMonth, _startYear;
            //判断开始月份和开始年份
            if (_thisMonth > item - 1) {
                _startMonth = _thisMonth - item + 1;
                _startYear = _year;
            } else {
                _startMonth = (_thisMonth + item + 1) % 12;
                _startYear = _year - 1;
            }
            var _yearArr = [];
            for (var i = 0; i < _year - 2012; i++) {
                _yearArr.push(_year - i);
            }
            return {
                yearArr: _yearArr.reverse(),
                startMonth: _startMonth,
                endMonth: _thisMonth,
                startYear: _startYear,
                endYear: _year
            };
        };
        return {
            getDate: _getDate
        };
    }]);
})();