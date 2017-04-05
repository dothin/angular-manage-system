/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/3/23
 * Time: 15:09
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;
    var pngquant = require('imagemin-pngquant');
    var runSequence = require('run-sequence');

    var DEST = './dist',
        imgSrc = './src/images/*.{png,jpg,gif,ico}',
        htmlSrc = './src/tpls/**/*.html',
        cssSrc = './sass/screen.scss',
        jsSrc = './src/js/**/*.js',
        condition = true;

    /**
     * 清除生成的文件
     */
    gulp.task('clean', function () {
        return gulp.src(DEST)
            .pipe(plugins.clean());
    });

    /**
     * 压缩图片
     */
    gulp.task('imagemin', function () {
        return gulp.src(imgSrc)
            .pipe(plugins.imagemin({
                progressive: true,
                use: [pngquant()] //使用pngquant来压缩png图片(无损压缩)
            }))
            .pipe(gulp.dest(DEST + '/images'));
    });

    /**
     * 压缩html
     */
    gulp.task('minifyHtml', function () {

        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };

        return gulp.src(htmlSrc)
            .pipe(plugins.changed(DEST + '/tpls'))
            .pipe(plugins.htmlmin(options))
            .pipe(gulp.dest(DEST + '/tpls'))
            .pipe(reload({stream: true}))
            .pipe(plugins.livereload());
    });

    /**
     * 压缩css
     */
    gulp.task('sass', function () {

        var autoprefixer = require('autoprefixer');
        var cssnano = require('cssnano');
        var processors = [
            autoprefixer(/*{browsers: ['last 2 version']}*/),
            cssnano()
        ];

        return gulp.src(cssSrc)
            .pipe(plugins.changed(DEST + '/css'))
            .pipe(plugins.sass({outputStyle: 'compressed'})
                .on('error', plugins.sass.logError))
            .pipe(plugins.postcss(processors))
            .pipe(plugins.rev())
            .pipe(gulp.dest(DEST + '/css'))
            .pipe(plugins.rev.manifest(DEST + '/rev-manifest.json', {
                base: DEST,
                merge: true
            }))
            .pipe(gulp.dest(DEST))
            .pipe(reload({stream: true}))
            .pipe(plugins.livereload());
    });

    /**
     * 压缩合并js
     */
    gulp.task('uglifyJs', function () {
        return gulp.src(jsSrc)
            .pipe(plugins.changed(DEST + '/js'))
            .pipe(plugins.concat('all.js'))
            .pipe(plugins.if(condition, plugins.uglify()))
            .pipe(plugins.rev())
            .pipe(gulp.dest(DEST + '/js'))
            .pipe(plugins.rev.manifest(DEST + '/rev-manifest.json', {
                base: DEST,
                merge: true
            }))
            .pipe(gulp.dest(DEST))
            .pipe(reload({stream: true}))
            .pipe(plugins.livereload());
    });

    /**
     * index.thml更换css、js文件版本
     */
    gulp.task('revHtml', function () {
        return gulp.src([DEST + '/*.json', './src/index.html'])
            .pipe(plugins.revCollector())
            .pipe(gulp.dest('./'))
            .pipe(reload({stream: true}))
            .pipe(plugins.livereload());
    });

    /**
     * 监视文件变化
     */
    gulp.task('watch', function () {
        plugins.livereload.listen();
        /**
         * 如果需要文件变化时重新替换idnex.html引入文件的版本号
         * 可以使用如下方式
         * gulp.watch('./sass/!**!/!*.scss', function () {
         *  runSequence(
         *      'sass',
         *      'revHtml');
         * });
         */
        gulp.watch('./sass/**/*.scss', ['sass']);
        gulp.watch(htmlSrc, ['minifyHtml']);
        gulp.watch(jsSrc, ['uglifyJs']);
        gulp.watch('./src/index.html', ['revHtml']);
    });

    /**
     * 开发构建
     */
    gulp.task('dev', function (done) {
        condition = false;
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
            done);
    });

    /**
     * 正式构建
     */
    gulp.task('build', function (done) {
        runSequence(
            'clean',
            [
                'imagemin',
                'sass',
                'minifyHtml',
                'uglifyJs'
            ],
            'revHtml',
            done);
    });

    /**
     * 静态服务器 + 监听 scss/html/js 文件
     */
    gulp.task('serve', ['dev'], function () {

        //在当前目录启动服务器
        browserSync.init({
            server: "./"
        });
    });

    /**
     * 默认任务
     */
    gulp.task('default', ['serve']);
})();