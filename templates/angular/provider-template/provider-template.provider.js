(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.featureTemplate.ProviderTemplateProvider
     * @description Provides a collection of services and methods for featureTemplate
     */

    angular
        .module('app.featureTemplate')
        .factory('ProviderTemplateProvider', ProviderTemplateProvider);

    ProviderTemplateProvider.$inject = [];

    /* @ngInject */
    function ProviderTemplateProvider() {

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

