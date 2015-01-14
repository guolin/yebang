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
    minifyCSS = require('gulp-minify-css'),
    _ = require('lodash');

var config = {
    js: ["src/js/**/*.js", "src/js/*.js"],
    less: 'src/css/less/app.less',
    tpl: ["src/tpl/**/*.html", "src/tpl/*.html"]
};

// for the style
gulp.task('less', function () {
    return gulp.src(config.less)
        .pipe(plugins.less())
        .pipe(gulp.dest('src/css/'));
});

gulp.task('jshint', function () {
    return gulp.src(config.js)
        .pipe(plugins.jshint());
});

gulp.task('server', function () {
    connect.server({
        host: '0.0.0.0',
        port: 8888,
        root: 'src',
        livereload: true,
        middleware: function (connect, o) {
            return [(function () {
                var url = require('url');
                var proxy = require('proxy-middleware');
                var options = url.parse('http://eye.kuyun.com/api');
                options.route = '/api';
                return proxy(options);
            })(),
                (function () {
                    var url = require('url');
                    var proxy = require('proxy-middleware');
                    var options = url.parse('http://eye.lab.kuyun.com/api');
                    options.route = '/labapi';
                    return proxy(options);
                })()];
        }
    });
});


gulp.task('dist-copy', function() {
    del('dist',function(){
        gulp.src('src/fonts/**/*.{ttf,woff,eof,svg}')
            .pipe(gulp.dest('dist/fonts'));
        gulp.src('src/img/*')
            .pipe(gulp.dest('dist/img'));
        gulp.src('src/css/*')
            .pipe(gulp.dest('dist/css'));
        gulp.src('src/fapi/*')
            .pipe(gulp.dest('dist/fapi'));
        gulp.src(['src/tpl/*', 'src/tpl/**/*'])
            .pipe(gulp.dest('dist/tpl'));
        gulp.src(['src/vendor/**/*','src/vendor/**/**/*'])
            .pipe(gulp.dest('dist/vendor'));
        gulp.src('src/js/controllers/*.js')
            .pipe(gulp.dest('dist/js/controllers'));

    });
});

gulp.task('dist-min', function(){
    gulp.src(['src/js/**/*.js','!src/js/controllers/*.js'])
        .pipe(plugins.uglify())
        .pipe(plugins.concat('one.min.js'))
        .pipe(gulp.dest('dist/js/'));

    gulp.src('src/css/app.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('dist/css'));

    gulp.src('src/index.min.html')
        .pipe(plugins.concat('index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-server', function () {
    connect.server({
        host: '0.0.0.0',
        port: 8899,
        root: 'dist',
        livereload: false,
        middleware: function (connect, o) {
            return [(function () {
                var url = require('url');
                var proxy = require('proxy-middleware');
                var options = url.parse('http://eye.kuyun.com/api');
                options.route = '/api';
                return proxy(options);
            })(),
                (function () {
                    var url = require('url');
                    var proxy = require('proxy-middleware');
                    var options = url.parse('http://eye.lab.kuyun.com/api');
                    options.route = '/labapi';
                    return proxy(options);
                })()];
        }
    });
});


gulp.task('watch', function () {
    gulp.watch(config.js, ['jshint']).on('change', plugins.livereload.changed);
    gulp.watch(config.tpl).on('change', plugins.livereload.changed);
    gulp.watch(config.less, ['less']).on('change', plugins.livereload.changed);

    plugins.livereload.listen();
});

var defaultTasks = ['jshint', 'less', 'server', 'watch'];
var distTasks = ['dist-copy', 'dist-min', 'dist-server'];

gulp.task('default', defaultTasks);
gulp.task('dist', distTasks);
