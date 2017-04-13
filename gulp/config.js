/**
 * Created with IntelliJ IDEA.
 * User: dothin
 * Date: 2017/4/11
 * Time: 15:08
 * To change this template use File | Settings | File Templates.
 */
'use strict';
module.exports = () => {

    let _root = './';
    let dest = _root + 'dist',
        imgSrc = _root + 'src/images/**/*.{png,jpg,gif,ico}',
        htmlSrc = _root + 'src/components/**/*.html',
        cssSrc = _root + 'src/sass/screen.scss',
        jsSrc = [
            _root + 'src/components/**/helper.module.js',
            _root + 'src/components/**/core.module.js',
            _root + 'src/components/**/!(app).module.js',
            _root + 'src/components/**/app.module.js',
            _root + 'src/components/**/*.js'
        ],
        condition = 'build';

    return {
        root:_root,
        dest:dest,
        imgSrc:imgSrc,
        htmlSrc:htmlSrc,
        cssSrc:cssSrc,
        jsSrc:jsSrc,
        condition:condition
    };

};