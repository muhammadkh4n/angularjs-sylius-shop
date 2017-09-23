'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const gIf = require('gulp-if');
const useref = require('gulp-useref');
const sourcemaps = require('gulp-sourcemaps');
const lazypipe = require('lazypipe');
const del = require('del');

const DEST = 'build/';

gulp.task('default', function() {
  return "Hello World!";
});

gulp.task('build', ['clean'], function() {
  gulp.start('compress', 'copy-all');
});

gulp.task('compress', function() {
  return gulp.src("./index.html")
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(gIf('*.js', uglify()))
    .pipe(gIf('*.css', cssmin()))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(DEST));
});

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('copy-all', function() {
  let SRC = [
    "templates/**/*",
    "fonts/**/*",
    "img/**/*"
  ];
  return gulp.src(SRC, {base: '.'})
    .pipe(gulp.dest(DEST));
});
