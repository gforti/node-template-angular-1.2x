/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var config = require('./build.config'),
    gulp = require('gulp'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    lazypipe = require('lazypipe'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass');
    
    
var styleTransforms = lazypipe()
  .pipe(function() {
    return gulpif(isScssFile, sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }));
  });
  
  
  var scriptTransforms = lazypipe()
  .pipe(function() {
      return angularTemplateCache({
            root: 'cache/',
            module: config.js.module
        });
    });

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isScssFile(file) {
  return stringEndsWith(file.relative, 'scss');
}



module.exports = {
    'bundle' : {
        'dist/vendors' : {
            'scripts' : [
                'node_modules/angular/angular.js',
                'node_modules/angular-ui-router/build/angular-ui-router.js',
                'node_modules/angular-sanitize/angular-sanitize.js',
                'node_modules/angular-loader/angular-loader.js',
                'node_modules/angular-filter/dist/angular-filter.js'               
            ],
            'styles' : 'sass/vendors/vendors.scss',
            'options' : {
                'uglify' : true,
                'minCss' : true,
                'rev' : false,
                'result' : {
                    'type' : 'plain'
                },
                'transforms' : {
                    'styles' : styleTransforms
                }
            }
        },
        'dist/application' : {
            'scripts' : [
                '!app-client/**/*.spec.js',
                'app-client/**/*.js'                
            ],
            'styles' : 'sass/app/application.scss',
            'options' : {
                'uglify' : false,
                'minCss' : false,
                'rev' : false,
                'result' : {
                    'type' : 'plain'
                },
                'transforms' : {
                    'styles' : styleTransforms
                },
                'order' : {
                    'scripts' : [
                        'app-client/*.module.js',
                        'app-client/**/*.module.js'
                    ]
                }
            }
        },
        'dist/templates' : {
            'scripts' : 'app-client/**/*.cache.html',
            'options' : {
                'uglify' : false,
                'rev' : false,
                'transforms' : {
                    'scripts' : scriptTransforms
                },
                'result' : {
                    'type' : 'plain'
                }
            }               
        }        
    }
};