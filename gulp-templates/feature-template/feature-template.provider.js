(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name pdr.featureTemplate.FeatureTemplateProvider
     * @description Provides a collection of services for featureTemplate
     */

    angular
        .module('pdr.featureTemplate')
        .factory('FeatureTemplateProvider', FeatureTemplateProvider);

    FeatureTemplateProvider.$inject = ['FeatureTemplateConstants'];

    /* @ngInject */
    function FeatureTemplateProvider(FeatureTemplateConstants) {

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
         * @methodOf pdr.featureTemplate.FeatureTemplateProvider
         * @param {string} your param need
         * @returns {*} The instance
         */
        function sampleMethod() {
            return service;
        }

        /********************
         * Private Methods
         ********************/

    }
})();

