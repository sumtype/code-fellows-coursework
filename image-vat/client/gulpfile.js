'use strict';
const gulp = require('gulp');
const webpack = require('webpack-stream');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const imageOptimization = require('gulp-image-optimization');
const path = require('path');
require('babel-loader');
require('html-loader');
gulp.task('webpack:dev', () => {
  return gulp.src(path.join(__dirname, 'app', 'js', 'client.js'), { read: true })
    .pipe(webpack({
      output: {
        filename: 'bundle.min.js'
      }
    }))
    .pipe(plugins.concat('bundle.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.join(__dirname, 'build', 'js')));
});
gulp.task('html:dev', () => {
  return gulp.src(path.join(__dirname, 'app', '**', '*.html'))
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.join(__dirname, 'build')));
});
gulp.task('css:dev', () => {
  var processors = [
    require('cssnext'),
    require('postcss-font-family'),
    require('postcss-font-magician'),
    require('autoprefixer'),
    require('css-mqpacker'),
    require('csswring'),
    require('colorguard')
  ];
  return gulp.src(path.join(__dirname, 'app', 'css', '**', '*.scss'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(__dirname, 'build', 'css')));
});
gulp.task('fonts:dev', () => {
  return gulp.src(path.join(__dirname, 'app', 'css', 'fonts', '*'))
    .pipe(gulp.dest(path.join(__dirname, 'build', 'css', 'fonts')));
});
gulp.task('images:dev', function() {
  return gulp.src(path.join(__dirname, 'app', 'images', '*'))
    .pipe(imageOptimization({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(__dirname, 'build', 'images')));
});
gulp.task('webpack:test', () => {
  return gulp.src(path.join(__dirname, 'test', 'testEntry.js'), { read: true })
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.html$/,
          loader: 'html'
        }]
      },
      output: {
        filename: 'testBundle.js'
      }
    }))
    .pipe(gulp.dest(path.join(__dirname, 'test')));
});
gulp.task('build:dev', [
  'webpack:dev',
  'html:dev',
  'fonts:dev',
  'css:dev',
  'images:dev'
]);
gulp.task('build:test', [
  'webpack:test'
]);
gulp.task('build:app', [
  'build:dev',
  'build:test'
]);
gulp.task('default', ['build:app']);
