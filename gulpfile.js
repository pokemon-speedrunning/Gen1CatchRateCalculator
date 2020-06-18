const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');

const data = require('gulp-data');
const fs = require('fs');

const sass = require('gulp-sass');
const csso = require('gulp-csso');

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('pages', function () {
    return gulp.src('src/html/pages/**/*.pug')
    .pipe(data(function (file) { return { require: require }; }))
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

gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('docs/js'));
});

gulp.task('clean',  function () {
    return del(['docs']);
});

gulp.task('default', gulp.parallel('pages', 'scripts', 'styles'));

gulp.task('watch', function () {
    gulp.watch('src/html/**/*.pug', gulp.series('pages'));
    gulp.watch('src/data/**/*.json', gulp.series('pages'));
    gulp.watch('src/css/**/*.scss', gulp.series('styles'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
});