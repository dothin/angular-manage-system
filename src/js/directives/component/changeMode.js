/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/22
 * Time: 16:37
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    myApp.directive('changeMode', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<span class="change-mode">' +
            '<svg class="icon" aria-hidden="true">' +
            '<use ng-if="!mode" xlink:href="#icon-quanping"></use>' +
            '<use ng-if="mode" xlink:href="#icon-suoxiao"></use>' +
            '</svg></span>',
            replace: true,
            scope: {
                mode: '='
            },
            link: function (scope, element) {
                var _timer = null;
                element.on('click', function () {
                    $timeout.cancel(_timer);
                    scope.mode = !scope.mode;
                    scope.$apply();
                    _timer = $timeout(function () {
                        /*var event = new Event('resize');
                         window.dispatchEvent(event);*/
                        window.onresize();
                    }, 14);
                });
            }
        };
    }]);
})();