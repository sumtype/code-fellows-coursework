'use strict';
const gulp = require('gulp');
const webpack = require('webpack-stream');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
gulp.task('webpack:dev', () => {
  return gulp.src(__dirname + '/app/js/client.js', { read: true })
    .pipe(webpack({
      output: {
        filename: 'bundle.min.js'
      }
    }))
    .pipe(plugins.concat('bundle.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build/js'));
});
gulp.task('html:dev', () => {
  return gulp.src(__dirname + '/app/**/*.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(__dirname + '/build'));
});
gulp.task('css:dev', () => {
  var processors = [
    require('cssnext'),
    require('postcss-font-family'),
    require('postcss-font-magician'),
    require('postcss-sprites').default,
    require('autoprefixer'),
    require('css-mqpacker'),
    require('csswring'),
    require('colorguard')
  ];
  return gulp.src(__dirname + '/app/css/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(__dirname + '/build/css'));
});
gulp.task('fonts:dev', () => {
  return gulp.src(__dirname + '/app/css/fonts/*')
    .pipe(gulp.dest(__dirname + '/build/css/fonts'));
});
gulp.task('webpack:test', () => {
  return gulp.src(__dirname + '/test/testEntry.js', { read: true })
    .pipe(webpack({
      output: {
        filename: 'testBundle.js'
      }
    }))
    .pipe(gulp.dest('test'));
});
gulp.task('build:dev', [
  'webpack:dev',
  'html:dev',
  'css:dev',
  'fonts:dev'
]);
gulp.task('default', ['build:dev']);
