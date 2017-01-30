(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.featureTemplate.ProviderTemplateProvider
     * @description Provides a collection of services for featureTemplate
     */

    angular
        .module('app.featureTemplate')
        .factory('ProviderTemplateProvider', ProviderTemplateProvider);

    ProviderTemplateProvider.$inject = [];

    /* @ngInject */
    function ProviderTemplateProvider() {

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
         * @methodOf app.featureTemplate.ProviderTemplateProvider
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

