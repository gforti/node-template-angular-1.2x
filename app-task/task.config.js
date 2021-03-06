/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const CONFIG = {
    'build': {
        'public' : './public/',
        'css' : './public/dist/',
        'js' : './public/dist/',
        'server' : './app-server/'
    },
    'bundleApp' : './app-task/bundle-app.config.js',
    'bundleAll' : './app-task/bundle-all.config.js',
    'js': {
        'module' : 'app',
        'src' : './app-client/',
        'cache' : './app-client/**/*.cache.html'
    },
    'css': {
        'sass' : './sass/app/',
        'vendor' : './sass/vendors/',
        'public' : './public/css/',
        'mainFile' : './sass/app/application.scss',
        'vendorFile' : './sass/vendors/vendors.scss'
    },
    'commands' : ['Create', 'Replace', 'Delete'],
    'images': {
        'path': ['./webapp/public/vendor/images/**/*.{png,gif,jpg,svg}'],
        'folder': 'img/'
    },
    'templates': {
        'angular': {
            'widget': {
                'redact' : true,
                'source': './templates/angular/widget-template/',
                'target': './app-client/widgets/',
                'nameCase' : {
                    'base' : 'widget-template',
                    'camel' : 'widgetTemplate',
                    'title' : 'WidgetTemplate'  
                },
                'messages' : {
                    'prompt' : 'Name of widget (must be in "hello-world" format):',
                    'cancel' : ''
                }
            },
            'feature': {
                'redact' : true,
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
                'redact' : false,
                'source': './templates/angular/factory-template/',
                'target': './app-client/',
                'nameCase' : {
                    'base' : 'factory-template',
                    'camel' : 'factoryTemplate',
                    'title' : 'FactoryTemplate'  
                },
                'messages' : {
                    'prompt' : 'Name of factory (must be in "hello-world" format):',
                    'feature' : 'Current name of feature (must be in "hello-world" format):',
                    'cancel' : ''
                }
            },
            'service': {
                'redact' : false,
                'source': './templates/angular/service-template/',
                'target': './app-client/',
                'nameCase' : {
                    'base' : 'service-template',
                    'camel' : 'serviceTemplate',
                    'title' : 'ServiceTemplate'  
                },
                'messages' : {
                    'prompt' : 'Name of service (must be in "hello-world" format):',
                    'feature' : 'Current name of feature (must be in "hello-world" format):',
                    'cancel' : ''
                }
            },
            'provider': {
                'redact' : false,
                'source': './templates/angular/provider-template/',
                'target': './app-client/',
                'nameCase' : {
                    'base' : 'provider-template',
                    'camel' : 'providerTemplate',
                    'title' : 'ProviderTemplate'  
                },
                'messages' : {
                    'prompt' : 'Name of provider (must be in "hello-world" format):',
                    'feature' : 'Current name of feature (must be in "hello-world" format):',
                    'cancel' : ''
                }
            },
            'modal': {
                'source': './templates/angular/modal-template/',
                'target': './app-client/widgets/modals/'
            }
        }
    }
};


module.exports = CONFIG;