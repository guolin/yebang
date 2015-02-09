'use strict';

var path = require('path'),
    del = require('del'),
    gulp = require('gulp'),
    through = require('through'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    karma = require('karma').server,
    plugins = gulpLoadPlugins(),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    _ = require('lodash');

var config = {
    js: ["src/js/**/*.js", "src/js/*.js"],
    less: 'src/css/less/app.less',
    tpl: ["src/tpl/**/*.html", "src/tpl/*.html"],
    css:['src/css/app.css'],
    lab:{
        css: [
            'src/lib/bootstrap/dist/css/bootstrap.min.css',
            'src/lib/font-awesome/css/font-awesome.min.css',
            'src/lib/angular-busy/dist/angular-busy.css'
        ],
        font:[
            'src/lib/font-awesome/fonts/*',
            'src/lib/bootstrap/fonts/*'
        ],
        js:[
            'src/lib/jquery/dist/jquery.min.js',
            'src/lib/angular/angular.min.js',
            'src/lib/angular-animate/angular-animate.min.js',
            'src/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'src/lib/angular-busy/dist/angular-busy.min.js',
            'src/lib/angular-cookies/angular-cookies.min.js',
            'src/lib/angular-resource/angular-resource.min.js',
            'src/lib/angular-sanitize/angular-sanitize.min.js',
            'src/lib/angular-touch/angular-touch.min.js',
            'src/lib/angular-ui-calendar/src/calendar.js',
            'src/lib/angular-ui-router/release/angular-ui-router.js',
            'src/lib/angular-ui-utils/ui-utils.min.js',
            'src/lib/angularjs-toaster/toaster.js',
            //'src/lib/bootstrap/dist/js/bootstrap.min.js',
            'src/lib/moment/min/moment.min.js',
            'src/lib/oclazyload/dist/ocLazyLoad.min.js',
            'src/lib/screenfull/dist/screenfull.min.js'
        ]
    }
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

gulp.task('inject', function () {
    var cssLib = gulp.src(config.lab.css, {read: false});
    var css = gulp.src(config.css, {read: false});
    var jsLib = gulp.src(config.lab.js, {read: false});
    var js = gulp.src(config.js, {read: false});

    del('src/index.html', function(){
        gulp.src('src/tpl/index.html')
            .pipe(inject(series(cssLib,css,jsLib,js),{ignorePath:'src'}))
            .pipe(gulp.dest('src/'));
    });
});

gulp.task('server', function () {
    connect.server({
        host: '0.0.0.0',
        port: 8888,
        root: 'src',
        livereload: process.env.NODE_ENV != "production",
        middleware: function (connect, o) {
            return [
                (function () {
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
                })()
                //,require('connect-gzip').gzip()
            ];
        }
    });
});


gulp.task('dist-copy', function(){

    del('src/dist', function(){

        gulp.src(['src/js/**/*.js','!src/js/controllers/*.js'])
            .pipe(plugins.uglify())
            .pipe(plugins.concat('app.min.js'))
            .pipe(gulp.dest('src/dist/js/'));

        gulp.src('src/css/app.css')
            .pipe(minifyCSS())
            .pipe(gulp.dest('src/dist/css'));

        gulp.src(config.lab.css)
            .pipe(plugins.concat('lib.min.css'))
            .pipe(gulp.dest('src/dist/css'));

        gulp.src(config.lab.font)
            .pipe(gulp.dest('src/dist/fonts'));

        gulp.src(config.lab.js)
            .pipe(plugins.concat('lib.min.js'))
            .pipe(gulp.dest('src/dist/js'));

        del('src/index.html',function(){
            gulp.src('src/tpl/index.min.html')
                .pipe(plugins.concat('index.html'))
                .pipe(gulp.dest('src/'));
        })

    });

});

gulp.task('watch', function () {
    gulp.watch(config.js, ['jshint']).on('change', plugins.livereload.changed);
    gulp.watch(config.tpl).on('change', plugins.livereload.changed);
    gulp.watch(config.less, ['less']).on('change', plugins.livereload.changed);

    plugins.livereload.listen();
});

gulp.task("watch-cid", function(){
    gulp.watch("src/cid", ['less','dist-copy']).on("change", connect.reload);
});

var defaultTasks = ['jshint', 'less','inject', 'server', 'watch'];
var distTasks = ['less','dist-copy', 'server',"watch-cid"];
var buildTasks = ['jshint', 'less','dist-copy',];

gulp.task('default', defaultTasks);
gulp.task('dist', distTasks);
gulp.task('build', buildTasks);


