/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./build.config'),
    gulp = require('gulp'),
    bundle = require('gulp-bundle-assets'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    gutil = require('gulp-util');


module.exports.bundleAll = bundleAll;
module.exports.bundleApp = bundleApp;
module.exports.bundleVendor = bundleVendor;

function bundleAll() {
    bundleApp();
    bundleVendor();
}


function prepareTemplates() {
    return gulp.src([config.js.cache])
        .pipe(angularTemplateCache({
            root: 'cache/',
            module: config.js.module
        }))
        .pipe(gulp.dest(config.build.js))
        .on('error', gutil.log);
}


function bundleApp() {
    prepareTemplates();
    return gulp.src(config.bundleApp)
        .pipe(bundle())
        .pipe(gulp.dest(config.build.js))
        .on('error', gutil.log);
}

function bundleVendor() {
    gutil.log('Bundle vendor start' );
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('public/js'))
        .on('error', gutil.log)
        .on('end', function() {
            gutil.log('Bundle vendor Completed' );
        });;
}