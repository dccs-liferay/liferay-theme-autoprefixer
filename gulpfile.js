'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const liferayThemeTasks = require('liferay-theme-tasks');
const autoprefixer = require('gulp-autoprefixer');
const debug = require('gulp-debug');
const path = require('path');

liferayThemeTasks.registerTasks({
  gulp: gulp,
  hookFn: function (gulp) {
    gulp.hook('after:build:compile-css', function (cb) {
      gutil.log(gutil.colors.magenta('-- autoprefixer hook'));
      gutil.log('Starting \'' + gutil.colors.cyan('autoprefixer') + '\'...');

      return gulp.src('build/_css/**/*.css')
        .pipe(debug({
          title: '> '
        }))
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
        .pipe(gulp.dest('build/_css'))
        .on('end', () => {
          gutil.log('Finished \'' + gutil.colors.cyan('autoprefixer') + '\'');
          cb();
        });
    });
  }
});
