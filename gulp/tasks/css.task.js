/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:36
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $, reload) =>  {

    /**
     * 压缩css
     */
    gulp.task('sass', () => {

        let autoprefixer = require('autoprefixer');
        let cssnano = require('cssnano');
        let processors = [
            autoprefixer(/*{browsers: ['last 2 version']}*/),
            cssnano()
        ];

        return gulp.src(config.cssSrc)
            .pipe($.changed(config.dest + '/css'))
            .pipe($.sass({outputStyle: 'compressed'})
                .on('error', $.sass.logError))
            .pipe($.postcss(processors))
            .pipe($.rev())
            .pipe(gulp.dest(config.dest + '/css'))
            .pipe($.rev.manifest(config.dest + '/rev-manifest.json', {
                base: config.dest,
                merge: true
            }))
            .pipe(gulp.dest(config.dest))
            .pipe($.if(config.condition === 'liveReload', $.livereload()))
            .pipe($.if(config.condition === 'browserSync', reload&&reload({stream: true})));
    });

};