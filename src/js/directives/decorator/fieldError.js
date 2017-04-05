/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/10/11
 * Time: 10:45
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 错误提示指令
     */
    myApp.directive('fieldError', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                active: '='
            },
            link: function (scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasError = function () {
                    if(scope.active != null){
                        return ngModel.$invalid && scope.active;
                    }else{
                        return ngModel.$invalid && ngModel.$dirty;
                    }
                    //return ngModel.$invalid && ngModel.$dirty && (scope.active != null ? scope.active : true);
                };
                subScope.errors = function () {
                    return ngModel.$error;
                };
                subScope.customMessages = scope.$eval(attrs.fieldError);
                var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" class="text-error" ng-if="wrong && name !==\'parse\'">{{name | error:customMessages}}</li></ul>')(subScope);
                element.after(hint);
            }
        };
    }]);
})();