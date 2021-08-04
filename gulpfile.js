// Initialize modules
const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();

// Sass task
function scssTask() {
    return src('app/scss/*.scss', { sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('app/css/', { sourcemaps: '.'}));
}

// Browsersync
function browserSyncServer(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browsserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browsserSyncReload);
    watch(['./scss/*.scss'],
    series(scssTask, browsserSyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, browserSyncServer, watchTask);