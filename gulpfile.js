const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');

const data = require('gulp-data');

const sass = require('gulp-sass');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const cssmodules = require('postcss-modules');

const terser = require('gulp-terser-js');

gulp.task('pages', function () {
    const bootstrap = require('./src/css/modules/bootstrap.css.json');

    return gulp.src('src/html/pages/**/*.pug')
        .pipe(data(function (file) {
            let filePath = file.history[0].replace(file.base, '').split('.')[0].substr(1);
            
            return {
                require: require,
                pageName: filePath,
                css: {bootstrap: bootstrap, local: require(`./src/css/${filePath}.scss.json`)}
            };
        }))
        .pipe(pug({}))
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest('docs'));
});

gulp.task('styles', function () {
    return gulp.src('src/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([cssmodules({scopeBehaviour: "global", exportGlobals: true})]))
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('docs/css'));
});

gulp.task('globalStyleExport', function () {
    return gulp.src('src/css/modules/*.css')
        .pipe(postcss([cssmodules({scopeBehaviour: "global", exportGlobals: true})]));
});

gulp.task('styles', gulp.series('styles', 'globalStyleExport'));

gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser({
            mangle: {
                toplevel: true
            }
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('docs/js'));
});

gulp.task('clean', function () {
    return del(['docs']);
});

gulp.task('default', gulp.series('styles','pages', 'scripts'));

gulp.task('watch', function () {
    gulp.watch('src/html/**/*.pug', gulp.series('pages'));
    gulp.watch('src/data/**/*.json', gulp.series('pages'));
    gulp.watch('src/css/**/*.scss', gulp.series('styles', 'pages'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
});