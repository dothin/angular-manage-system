/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/30
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

(function () {
    'use strict';
    /**
     * 模态框指令
     */
    angular.module('app.core').directive('filter', ['filterServer', function (filterServer) {
        return {
            restrict: 'E',
            templateUrl: 'build/tpls/directiveTpls/filter.html',
            replace: true,
            transclude: true,
            scope: {
                filterConf: '=conf',
                title: '@'
            },
            bindToController: true, //将scope数据绑定到vm上
            controllerAs: 'vm',
            controller: [function () {
                var vm = this;
                filterServer.getFilter().then(function (data) {
                    vm.filter = data;
                    vm.assistYear = vm.filter.schoolYear[0];
                    vm.scoreRankTerm = vm.filter.schoolTerm[0];
                    vm.scoreErrorTerm = vm.filter.schoolTerm[0];
                });

                if (vm.filterConf) {
                    vm.filterConf.filter = vm.filterConf.filter || {};
                    vm.filterConf.tip = vm.filterConf.tip || false;
                    vm.filterConf.title = vm.title || '';
                    //是否需要根据父级选中项来判断显示隐藏过滤项（主要用于常用对比）
                    vm.filterConf.choosedOption = vm.filterConf.choosedOption || {values: 1};
                    /**
                     * 帅选条件数据更新
                     * @param action    动作
                     * @param item      当前对象
                     * @param eName     english名字（用于封装后端接受key使用）
                     * @param cName     chinese名字（用于前端显示）
                     */
                    var updateFilterCondition = function (action, item, eName, cName) {
                        vm.filterConf.filter[eName] = vm.filterConf.filter[eName] || {};
                        vm.filterConf.filter[eName].eName = eName;
                        vm.filterConf.filter[eName].cName = cName;
                        vm.filterConf.filter[eName].idArr = vm.filterConf.filter[eName].idArr || [];
                        vm.filterConf.filter[eName].objArr = vm.filterConf.filter[eName].objArr || [];
                        //助贷情况、课程排名、学业异常需要单独提出来，用学年id/学期id+当前选中对象id来标示索引
                        if (eName === 'assist') {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString()) === -1) {
                                vm.filterConf.filter[eName].idArr.push(vm.assistYear.id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {
                                    rName: item.name + '(' + vm.assistYear.name + ')',
                                    term: vm.assistYear
                                }));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString()) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(vm.assistYear.id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        } else if (eName === 'scoreRank' || eName === 'scoreError') {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString()) === -1) {
                                vm.filterConf.filter[eName].idArr.push(vm[eName + 'Term'].id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {
                                    rName: item.name + '(' + vm[eName + 'Term'].name + ')',
                                    term: vm[eName + 'Term']
                                }));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString()) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(vm[eName + 'Term'].id.toString() + item.id.toString());
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        } else {
                            if (action === 'add' && vm.filterConf.filter[eName].idArr.indexOf(item.id) === -1) {
                                vm.filterConf.filter[eName].idArr.push(item.id);
                                vm.filterConf.filter[eName].objArr.push(angular.extend(item, {rName: item.name}));
                            }
                            if (action === 'remove' && vm.filterConf.filter[eName].idArr.indexOf(item.id) !== -1) {
                                var idx = vm.filterConf.filter[eName].idArr.indexOf(item.id);
                                vm.filterConf.filter[eName].idArr.splice(idx, 1);
                                vm.filterConf.filter[eName].objArr.splice(idx, 1);
                                if (vm.filterConf.filter[eName].objArr.length === 0) {
                                    delete vm.filterConf.filter[eName];
                                }
                            }
                        }
                    };
                    /**
                     * 帅选条件数据更新
                     * @param $event    事件
                     * @param item  当前对象
                     * @param eName english名字
                     * @param cName chinese名字
                     */
                    vm.updateFilterCondition = function ($event, item, eName, cName) {
                        var _checkbox = $event.target;
                        var _action = _checkbox.checked ? 'add' : 'remove';
                        updateFilterCondition(_action, item, eName, cName);
                        //外部作用域需要操作过滤条件的时候触发回调的钩子
                        vm.filterConf.updateFilterCondition && vm.filterConf.updateFilterCondition();
                    };
                    /**
                     * 判断帅选条件是否需要选中
                     * @param name    当前名字
                     * @param id    当前id
                     * @returns {boolean}
                     */
                    vm.isFilterSelected = function (name, id) {
                        if (name === 'assist') {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(vm.assistYear.id.toString() + id.toString()) >= 0;
                        } else if (name === 'scoreRank' || name === 'scoreError') {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(vm[name + 'Term'].id.toString() + id.toString()) >= 0;
                        } else {
                            return vm.filterConf.filter[name] && vm.filterConf.filter[name].idArr.indexOf(id) >= 0;
                        }
                    };
                    /**
                     * 清空筛选条件
                     */
                    vm.clearAllFilterCondtion = function () {
                        vm.filterConf.filter = {};
                    };
                }
            }]
        };
    }]);
})();