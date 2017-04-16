/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/17
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    angular.module('app.core').factory('tooltip', tooltip);

    tooltip.$inject = ['$compile'];

    function tooltip($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //定义策略，为了防止多次声明，先判断是否存在
                var strategy = strategy || {
                        top: function (ele, tip) {
                            return {
                                left: ele.offsetWidth > tip.offsetWidth ? Math.abs(tip.offsetWidth - ele.offsetWidth) / 2 : -Math.abs(tip.offsetWidth - ele.offsetWidth) / 2,
                                top: -(ele.offsetHeight + 15)
                            };
                        },
                        right: function (ele, tip) {
                            return {
                                left: ele.offsetWidth + 10,
                                top: ele.offsetHeight > tip.offsetHeight ? Math.abs(tip.offsetHeight - ele.offsetHeight) / 2 : -Math.abs(tip.offsetHeight - ele.offsetHeight) / 2
                            };
                        },
                        bottom: function (ele, tip) {
                            return {
                                left: this.top(ele, tip).left,
                                top: ele.offsetHeight + 10
                            };
                        },
                        left: function (ele, tip) {
                            return {
                                left: -(ele.offsetWidth + 15),
                                top: this.right(ele, tip).top
                            };
                        }
                    };
                var subScope = scope.$new(true);
                subScope.tooltip = {
                    content: '',
                    mode: 'top'
                };
                //获取用户配置
                angular.extend(subScope.tooltip, scope.$eval(attrs.tooltip));
                var hint = $compile('<span class="tool-tip tool-tip-' + subScope.tooltip.mode + '">{{tooltip.content}}</span>')(subScope);
                //监听，用tooltip-content属性值覆盖tooltip值
                attrs.$observe('tooltipContent', function (newTooltipContent) {
                    if (newTooltipContent) {
                        hint = $compile('<span class="tool-tip tool-tip-' + subScope.tooltip.mode + '">' + newTooltipContent + '</span>')(subScope);
                    }
                });
                //防止element有决定定位，不需要加相对定位
                //element.css({'position': 'relative'});
                element.on('mouseover', function () {
                    element.append(hint).removeAttr('title');
                    //使用策略
                    hint.css({
                        left: strategy[subScope.tooltip.mode](element[0], hint[0]).left + 'px',
                        top: strategy[subScope.tooltip.mode](element[0], hint[0]).top + 'px'
                    });
                });
                element.on('mouseleave', function () {
                    hint && hint.remove();
                });
            }
        };
    }
})();