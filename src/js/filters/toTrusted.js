/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/8/5
 * Time: 14:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();
