/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:43
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $) => {

    /**
     * 清除生成的文件
     */
    gulp.task('clean',
        ()=>gulp.src([config.dest, config.root + 'index.html'])
        .pipe($.clean())
    );

};