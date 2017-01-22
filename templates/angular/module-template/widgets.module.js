(function() {    
    'use strict';
    
    /**
     * @ngdoc overview
     * @name app.widgets
     * @requires
     * @description
     *
     * This is the main script, which does the following:
     *
     *   - loads all the submodules
     *
     */
    angular.module('app.widgets', []);
    
    angular.module('app').requires.push('app.widgets');
    
})();