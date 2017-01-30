(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.widgets.ModalTemplateModalProvider
     * @description Provides a collection of services for featureTemplate
     */

    angular
        .module('app.widgets')
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
         * @methodOf app.widgets.ModalTemplateModalProvider
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

