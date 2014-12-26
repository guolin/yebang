'use strict';

var path = require('path'),
  del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  through = require('through'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  karma = require('karma').server,
  plugins = gulpLoadPlugins(),
  connect = require('gulp-connect'),
  _ = require('lodash');

var config = {
  js:["src/js/**/*.js", "src/js/*.js"],
  less:'src/css/less/app.less',
  tpl:["src/tpl/**/*.html", "src/tpl/*.html"],
};

// for the style
gulp.task('less', function() {
  return gulp.src(config.less)
    .pipe(plugins.less())
    .pipe(gulp.dest('src/css/'));
});

gulp.task('jshint', function() {
  return gulp.src(config.js)
    .pipe(plugins.jshint());
});

gulp.task('server', function() {
  connect.server({
    port: 8888,
    root: 'src',
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse('http://eye.kuyun.com/api');
          options.route = '/api';
          return proxy(options);
      })() ];
    }
  });
});


gulp.task('watch', function() {
  gulp.watch(config.js, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(config.tpl).on('change', plugins.livereload.changed);
  gulp.watch(config.less, ['less']).on('change', plugins.livereload.changed);

  plugins.livereload.listen();
});

var defaultTasks = [ 'jshint', 'less', 'server', 'watch'];

gulp.task('default', defaultTasks);
