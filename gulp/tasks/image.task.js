/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $) =>  {
    const pngquant = require('imagemin-pngquant');

    /**
     * 压缩图片
     */
    gulp.task('imagemin',
        () => gulp.src(config.imgSrc)
        .pipe($.imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片(无损压缩)
        }))
        .pipe(gulp.dest(config.dest + '/images')));

};