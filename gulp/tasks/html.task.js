/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $, reload) =>  {

    /**
     * 压缩html
     */
    gulp.task('minifyHtml', ()=>{
        let options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };

        return gulp.src(config.htmlSrc)
            .pipe($.changed(config.dest + '/tpls'))
            .pipe($.htmlmin(options))
            .pipe(gulp.dest(config.dest + '/tpls'))
            .pipe($.if(config.condition === 'liveReload', $.livereload()))
            .pipe($.if(config.condition === 'browserSync', reload&&reload({stream: true})));
    });

};