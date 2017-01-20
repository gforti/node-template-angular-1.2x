/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {
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
                'rev' : false,
                'result' : {
                    'type' : {
                        'scripts' : function xJavascript(path) {
                            return '/js/' + path;
                        }
                    }
                }
            }
        },
        'application' : {
            'scripts' : [
                '!app-client/**/*.spec.js',
                'app-client/**/*.js'                
            ],
            'options' : {
                'uglify' : false,
                'rev' : false,
                'result' : {
                    'type' : {
                        'scripts' : function xJavascript(path) {
                             return '/js/' + path;
                        }
                    }
                },
                'order' : {
                    'scripts' : [
                        'app-client/*.module.js',
                        'app-client/**/*.module.js'
                    ]
                }
            }
        },
        'templates' : {
            'scripts' : 'public/js/templates.js',
            'options' : {
                'uglify' : false,
                'rev' : false,
                'result' : {
                    'type' : {
                        'scripts' : function xJavascript(path) {
                             return '/js/' + path;
                        }
                    }
                }
            }               
        }        
    }
};