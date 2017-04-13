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
     * 压缩合并js
     */
    gulp.task('uglifyJs',
        () => gulp.src(config.jsSrc)
        .pipe($.changed(config.dest + '/js'))
        .pipe($.concat('all.js'))
        .pipe($.if(config.condition === 'build', $.uglify()))
        .pipe($.rev())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe($.rev.manifest(config.dest + '/rev-manifest.json', {
            base: config.dest,
            merge: true
        }))
        .pipe(gulp.dest(config.dest))
        .pipe($.if(config.condition === 'liveReload', $.livereload()))
        .pipe($.if(config.condition === 'browserSync', reload&&reload({stream: true}))));

};