'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cmq = require('gulp-combine-media-queries');

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

module.exports = {
    development: function () {
        return gulp.src('sass/**/*.scss')
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(cmq({
                log: true
            }))
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('css'));
    },
    production: function(){
        return gulp.src('sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cmq({
                log: true
            }))
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(csso())
            .pipe(gulp.dest('css'));
    }
};
