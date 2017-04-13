/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:29
 * To change this template use File | Settings | File Templates.
 */
'use strict';

const gulp = require('gulp');
const config = require('./config')();
const $ = require('gulp-load-plugins')({lazy: true});
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const runSequence = require('run-sequence');

// 读取任务文件
const taskList = require('fs').readdirSync('./gulp/tasks/');
taskList.forEach(function (file) {
    require('./tasks/' + file)(gulp, config, $, reload);
});

/*************************** run gulp with browserSync mode **************************/
/**
 * 建议静态文件编写使用：会启动一个3000端口的服务器
 */
gulp.task('browserSync',() => {
    config.condition = 'browserSync';
    /**
     * 静态服务器 + 监听 scss/html/js 文件
     */
    gulp.task('doBrowserSync', function () {

        //在当前目录启动服务器
        browserSync.init({
            server: {
                baseDir: config.root
            }
        });
    });
    /**
     * 纵向同步，横向异步
     */
    runSequence(
        'clean',
        [
            'imagemin',
            'sass',
            'minifyHtml',
            'uglifyJs',
            'watch'
        ],
        'revHtml',
        'doBrowserSync');
});

/*************************** run gulp with liveReload mode ***************************/
/**
 * 建议前后端接口联调时使用：需要谷歌livereload插件支持，不需要启动服务器
 */
gulp.task('liveReload',() => {
    config.condition = 'liveReload';
    /**
     * 纵向同步，横向异步
     */
    runSequence(
        'clean',
        [
            'imagemin',
            'sass',
            'minifyHtml',
            'uglifyJs',
            'watch'
        ],
        'revHtml');
});

/*************************** run gulp with build mode ********************************/
gulp.task('build',() => {
    /**
     * 纵向同步，横向异步
     */
    runSequence(
        'clean',
        [
            'imagemin',
            'sass',
            'minifyHtml',
            'uglifyJs'
        ],
        'revHtml');
});

/*************************** default browserSync *************************************/

gulp.task('default', ['build']);