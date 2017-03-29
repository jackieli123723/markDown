/**
 * @author: 李立冬
 * @email : 380863274@qq.com
 * @desc  : Description
 */

var gulp    = require('gulp');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');

gulp.task('postcss', function () {
    return gulp.src('*.css')
        .pipe( postcss([autoprefixer]) )
        .pipe( gulp.dest('build/') );
});

gulp.task('default', function () {
    gulp.watch('*.css', ['postcss']);
});