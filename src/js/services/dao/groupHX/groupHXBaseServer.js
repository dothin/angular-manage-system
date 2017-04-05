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
     * 群体画像--基本信息服务
     */
    myApp.factory('groupHXBaseServer', ['httpServer', function (httpServer) {
        var service = {};
        //获取总人数
        service.getCount = function (data) {
            return httpServer.postHttp('/group/baseInfo/count?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取性别人数分布
        service.getBaseSex = function (data) {
            return httpServer.postHttp('/group/baseInfo/gender?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取年龄人数分布
        service.getBaseAge = function (data) {
            return httpServer.postHttp('/group/baseInfo/age?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取学院人数分布
        service.getBaseCollege = function (data) {
            return httpServer.postHttp('/group/baseInfo/college?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取专业人数分布
        service.getBaseMajor = function (data) {
            return httpServer.postHttp('/group/baseInfo/major?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取生源地人数分布
        service.getBaseOrigin = function (data) {
            return httpServer.postHttp('/group/baseInfo/comePlace?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取政治面貌人数分布
        service.getBasePolitical = function (data) {
            return httpServer.postHttp('/group/baseInfo/politicsStatus?role=' + (data.role === 0 ? 0 : 1), data);
        };
        //获取民族人数分布
        service.getBaseNation = function (data) {
            return httpServer.postHttp('/group/baseInfo/nation?role=' + (data.role === 0 ? 0 : 1), data);
        };
        return service;
    }]);
})();