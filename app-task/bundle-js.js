/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./build.config'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    bundle = require('gulp-bundle-assets'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    gutil = require('gulp-util');


module.exports.bundleAll = bundleAll;
module.exports.bundleApp = bundleApp;

function bundleAll() {
    prepareTemplates().on('end', function() {  bundleFiles(config.bundleAll, true); }); 
}

function bundleApp() {
    prepareTemplates().on('end', function() {  bundleFiles(config.bundleApp); });   
}

function prepareTemplates() {
    return gulp.src(config.js.cache)
        .pipe(angularTemplateCache({
            root: 'cache/',
            module: config.js.module
        }))
        .pipe(gulp.dest(config.build.js))
        .on('error', gutil.log);
}

function bundleFiles(fileSrc, createResults) {
    createResults = Boolean(createResults) || false;
     return gulp.src(fileSrc)
        .pipe(bundle())
        .pipe( gulpif(createResults, bundle.results(config.build.server)) )
        .pipe(gulp.dest(config.build.dist));
} 

function cleanJSFolder () {
    
  return gulp.src(config.build.js, { read: false })
    .pipe(rimraf());
}