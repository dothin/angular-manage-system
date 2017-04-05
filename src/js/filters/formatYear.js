/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/2/8
 * Time: 15:39
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 格式化学期
     */
    myApp.filter('formatYear', [function () {
        return function (input) {
            if (input) {
                return input.toString().substring(0, 4) + '-' + input.toString().slice(-4) + '年';
            }
        };
    }]);
})();