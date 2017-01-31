(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.featureTemplate.FeatureTemplateProvider
     * @requires
     * app.featureTemplate.FeatureTemplateConstants
     * @description Provides a collection of services and methods for featureTemplate
     */

    angular
        .module('app.featureTemplate')
        .factory('FeatureTemplateProvider', FeatureTemplateProvider);

    FeatureTemplateProvider.$inject = ['FeatureTemplateConstants'];

    /* @ngInject */
    function FeatureTemplateProvider(FeatureTemplateConstants) {
        
        /**
         * @ngdoc property
         * @name #service 
         * @propertyOf app.featureTemplate.FeatureTemplateProvider
         * @returns {This} FeatureTemplateProvider 
         * @description All Public methods must be linked to this variable. 
         */
        var service = {
            'sampleMethod' : sampleMethod
        };

        return service;

        ////////////////

        /********************
         * Public Methods
         ********************/

        /**
         * @ngdoc method
         * @name sampleMethod
         * @methodOf app.featureTemplate.FeatureTemplateProvider
         * @returns {This} The instance
         */
        function sampleMethod() {
            return service;
        }

        /********************
         * Private Methods
         ********************/

    }
})();

