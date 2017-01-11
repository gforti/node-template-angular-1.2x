(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name pdr.widgets.ModalTemplateModalProvider
     * @description Provides a collection of services for featureTemplate
     */

    angular
        .module('pdr.widgets')
        .factory('ModalTemplateModalProvider', ModalTemplateModalProvider);

    ModalTemplateModalProvider.$inject = ['ModalTemplateModalConstants'];

    /* @ngInject */
    function ModalTemplateModalProvider(ModalTemplateModalConstants) {

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
         * @methodOf pdr.widgets.ModalTemplateModalProvider
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

