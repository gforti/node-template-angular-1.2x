/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const options = {
    'build': {
        dist: './public/',
        css: './public/css/',
        js: './public/js/'
    },
    'js': {
        src: './app-client/'
    },
    'css': {
        sass: './public/css/sass/',
        css: './public/css/',
        mainFile: './public/css/sass/style.scss'
    },
    'images': {
        path: ['./webapp/public/vendor/images/**/*.{png,gif,jpg,svg}'],
        folder: 'img/'
    },
    'templates': {
        'angular': {
            'widget': {
                'source': './templates/angular/widget-template/',
                'target': './app-client/widgets/'
            },
            'feature': {
                'source': './templates/angular/feature-template/',
                'target': './app-client/'
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


module.exports = options;