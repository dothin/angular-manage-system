/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = (gulp, config, $) =>  {

    /**
     * 压缩合并js
     */
    gulp.task('watch', () => {
        config.condition === 'liveReload' && $.livereload.listen();

        /**
         * 如果需要文件变化时重新替换idnex.html引入文件的版本号
         * 可以使用如下方式
         * gulp.watch('./sass/!**!/!*.scss', function () {
         *  runSequence(
         *      'sass',
         *      'revHtml');
         * });
         */
        gulp.watch(config.root + 'src/**/*.scss', ['sass']);
        gulp.watch(config.htmlSrc, ['minifyHtml']);
        gulp.watch(config.jsSrc, ['uglifyJs']);
        gulp.watch(config.root + 'src/index.html', ['revHtml']);
    });


};