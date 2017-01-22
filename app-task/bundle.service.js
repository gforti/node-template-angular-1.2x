/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var angularModule = require('../app.config').appClient.module,
    angularTemplateCache = require('gulp-angular-templatecache'),
    lazypipe = require('lazypipe'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass');

module.exports.styleTransforms = lazypipe()
  .pipe(function() {
        return gulpif(isScssFile, sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }));
  });
  
  
module.exports.scriptTransforms = lazypipe()
  .pipe(function() {
        return gulpif(isCacheFile, angularTemplateCache({
            root: '',
            moduleSystem : 'IIFE',
            module: angularModule,
            transformUrl: function(url) {
                return url.replace(/(.*)app-client/, 'cache');
            }
        }));
    });

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isScssFile(file) {
  return stringEndsWith(file.relative, 'scss');
}

function isCacheFile(file) {
  return stringEndsWith(file.relative, 'cache.html');
}