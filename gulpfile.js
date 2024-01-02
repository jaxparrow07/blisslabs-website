var gulp        = require('gulp'),
    less        = require('gulp-less'),
    connect     = require('gulp-connect'),
    pug         = require('gulp-pug'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

function reload(done) {
    connect.server({
        livereload: true,
        port: 5000
    });
    done();
}

function styles() {
    return (
        gulp.src('src/less/styles.less')
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 3 versions'],
                cascade: false
            }))
            .pipe(less({ outputStyle: 'expanded' }))
            .pipe(gulp.dest('assets/css'))
            .pipe(less({ outputStyle: 'compressed' }))
            .pipe(rename('styles.min.css'))
            .pipe(gulp.dest('assets/css'))
            .pipe(connect.reload())
    );
}

function html() {
    return (
        gulp.src('*.html')
            .pipe(plumber())
            .pipe(connect.reload())
    );
}

function views() {
    return (
        gulp.src('src/pug/pages/*.pug')
            .pipe(plumber())
            .pipe(pug({
                blade: false,
                pretty: true,
                basedir: 'src/pug', // Specify the base directory for Pug includes
            }))
            .pipe(gulp.dest('./'))
            .pipe(connect.reload())
    )
}

function watchTask(done) {
    gulp.watch('*.html', html);
    gulp.watch('src/less/**/*.less', styles);
    gulp.watch('src/pug/**/*.pug', views);
    done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(styles, html, views));

exports.reload = reload;
exports.styles = styles;
exports.html = html;
exports.views = views;
exports.watch = watch;
exports.build = build;
exports.default = watch;
