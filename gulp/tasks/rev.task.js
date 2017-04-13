/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:43
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $, reload) =>  {

    /**
     * index.thml更换css、js文件版本
     */
    gulp.task('revHtml',
        () => gulp.src([config.dest + '/*.json', config.root + 'src/index.html'])
        .pipe($.revCollector())
        .pipe(gulp.dest(config.root))
        .pipe($.if(config.condition === 'liveReload', $.livereload()))
        .pipe($.if(config.condition === 'browserSync', reload&&reload({stream: true}))));

};