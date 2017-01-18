/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./build.config'),
    gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');


module.exports.compile = compileSassFiles;

function compileSassFiles() {  
    compileSass(config.css.vendor);
    compileSass(config.css.sass);    
}


function compileSass(dir) {
    gulp.src(path.join(dir, '**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(config.css.public))
        .on('error', gutil.log)
        .on('end', function() {
            gutil.log('Compling Sass',dir,'Completed');
        });
}