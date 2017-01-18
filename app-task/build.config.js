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
    'js': {
        'src' : './app-client/'
    },
    'css': {
        'sass' : './sass/',
        'public' : './public/css/',
        'mainFile' : './sass/application.scss'
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