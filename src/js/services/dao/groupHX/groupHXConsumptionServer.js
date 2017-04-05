/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/12/13
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 群体画像--消费水平服务
     */
    myApp.factory('groupHXConsumptionServer', ['httpServer', function (httpServer) {
        var service = {};
        /*食堂低消费学生*/
        service.getLowConsumption = function (data) {
            return httpServer.postHttp('/group/consumption/lowConsumptionNum?role=' + (data.role === 0 ? 0 : 1), data);
        };
        service.getLowConsumptionDetail = function (data) {
            return httpServer.postHttp('/group/consumption/lowConsumeDetail?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //导出学生低消费详情
        service.getStudentExport = function (data) {
            return httpServer.postHttp('/group/consumption/exportLowConsumeDetail?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //导出学院低消费名单
        service.getSchoolExport = function (data) {
            return httpServer.postHttp('/group/consumption/exportLowConsumeDetailByCollegeAndGrade?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*三餐消费*/
        service.getMeals = function (data) {
            return httpServer.postHttp('/group/consumption/threeConsumeTime?role=' + (data.role === 0 ? 0 : 1), data);
        };
        service.getMealTimes = function (data) {
            return httpServer.postHttp('/group/consumption/breakfastConsumeTime?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*消费类型*/
        service.getType = function (data) {
            return httpServer.postHttp('/group/consumption/consumeType?role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*每月刷卡*/
        //todo
        service.getCard = function (data) {
            return httpServer.postHttp('/group/consumption/everyMonthCardBrush?type=' + data.type + '&isLow=' + data.isLow + '&role=' + (data.role === 0 ? 0 : 1), data);
        };
        /*经济水平预测*/
        service.getForecast = function (data) {
            return httpServer.postHttp('/group/consumption/economicForecast?role=' + (data.role === 0 ? 0 : 1), data);
        };
        return service;
    }]);
})();