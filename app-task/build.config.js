/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const CONFIG = {
    'build': {
        'dist' : './public/',
        'css' : './public/css/',
        'js' : './public/js/'
    },
    'bundleApp' : {
        'bundle' : {
            'application' : {
                'scripts' : [
                    '!./app-client/**/*.spec.js',
                    './app-client/**/*.js'                
                ],
                'options' : {
                    'uglify' : false,
                    'rev' : false,
                    'order' : {
                        'scripts' : [
                            './app-client/app.module.js',
                            './app-client/**/*.module.js'
                        ]
                    }
                }
            }
        }
    },
    'bundleVendor' : {
        'bundle' : {
            'vendors' : {
                'scripts' : [
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-router/build/angular-ui-router.js',
                    'node_modules/angular-sanitize/angular-sanitize.js',
                    'node_modules/angular-loader/angular-loader.js',
                    'node_modules/angular-filter/dist/angular-filter.js'               
                ],
                'options' : {
                    'uglify' : true,
                    'rev' : false
                }
            }
        }
    },
    'js': {
        'module' : 'app',
        'src' : './app-client/',
        'cache' : './app-client/**/*.cache.html'
    },
    'css': {
        'sass' : './sass/app/',
        'vendor' : './sass/vendors/',
        'public' : './public/css/',
        'mainFile' : './sass/application.scss',
        'vendorFile' : './sass/vendors/vendors.scss'
    },
    'images': {
        'path': ['./webapp/public/vendor/images/**/*.{png,gif,jpg,svg}'],
        'folder': 'img/'
    },
    'templates': {
        'angular': {
            'widget': {
                'source': './templates/angular/widget-template/',
                'target': './app-client/widgets/'
            },
            'feature': {
                'source' : './templates/angular/feature-template/',
                'target' : './app-client/',
                'nameCase' : {
                    'base' : 'feature-template',
                    'camel' : 'featureTemplate',
                    'title' : 'FeatureTemplate'  
                },
                'messages' : {
                    'prompt' : 'Name of feature (must be in "hello-world" format):',
                    'cancel' : ''
                }
            },
            'factory': {
                'source': './templates/angular/factory-template/',
                'target': './app-client/'
            },
            'service': {
                'source': './templates/angular/service-template/',
                'target': './app-client/'
            },
            'provider': {
                'source': './templates/angular/provider-template/',
                'target': './app-client/'
            },
            'modal': {
                'source': './templates/angular/modal-template/',
                'target': './app-client/widgets/modals/'
            }
        }
    }
};


module.exports = CONFIG;