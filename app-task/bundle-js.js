/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./build.config'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    bundle = require('gulp-bundle-assets');


module.exports.bundleAll = bundleAll;
module.exports.bundleApp = bundleApp;

function bundleAll() {
    bundleFiles(config.bundleAll, true);   
}

function bundleApp() {
    bundleFiles(config.bundleApp);  
}


function bundleFiles(fileSrc, createResults) {
    createResults = Boolean(createResults) || false;
     return gulp.src(fileSrc)
        .pipe(bundle())
        .pipe( gulpif(createResults, bundle.results(config.build.server)) )
        .pipe(gulp.dest(config.build.public));
} 

function cleanJSFolder () {
    
  return gulp.src(config.build.js, { read: false })
    .pipe(rimraf());
}