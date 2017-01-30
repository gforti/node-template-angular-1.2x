(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.featureTemplate.ServiceTemplateService
     * @description Provides a service for featureTemplate
     */

    angular
        .module('app.featureTemplate')
        .factory('ServiceTemplateService', ServiceTemplateService);

    ServiceTemplateService.$inject = [];

    /* @ngInject */
    function ServiceTemplateService() {

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
         * @methodOf app.featureTemplate.ServiceTemplateService
         * @param {string} your param need
         * @param {string=} An optional string.
         * @returns {*} The instance
         */
        function sampleMethod() {
            /* Since Interceptors are in use to handle global errors with http calls,
             when calling your services no error function is needed, just a success function */
            return service;
        }

        /********************
         * Private Methods
         ********************/

    }
})();

