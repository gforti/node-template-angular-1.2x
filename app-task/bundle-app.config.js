/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {
    'bundle' : {
        'application' : {
            'scripts' : [
                '!app-client/**/*.spec.js',
                'app-client/**/*.js'                
            ],
            'options' : {
                'uglify' : false,
                'rev' : false,                
                'order' : {
                    'scripts' : [
                        'app-client/*.module.js',
                        'app-client/**/*.module.js'
                    ]
                }
            }
        }
    }
};