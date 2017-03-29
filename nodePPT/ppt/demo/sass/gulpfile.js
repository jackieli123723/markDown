/**
 * @author: 李立冬
 * @email : 380863274@qq.com
 * @desc  : Description
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('default', function () {
  gulp.watch('*.scss', ['sass']);
});