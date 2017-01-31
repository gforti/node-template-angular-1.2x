(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.featureTemplate.FeatureTemplateController
     * @requires 
     * app.featureTemplate.FeatureTemplateProvider
     * @description
     *
     * A description of the controller
     */

    angular
        .module('app.featureTemplate')
        .controller('FeatureTemplateController', FeatureTemplateController);

    FeatureTemplateController.$inject = ['FeatureTemplateProvider'];

    /* @ngInject */
    function FeatureTemplateController(FeatureTemplateProvider) {
        /**
        * @ngdoc property
        * @name #vm 
        * @propertyOf app.featureTemplate.FeatureTemplateController
        * @returns {This} FeatureTemplateController 
        * @description A named variable representing the ViewModel. 
        */
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'feature-template';

        activate();

        ////////////////

        /**
         * @ngdoc method
         * @name activate
         * @methodOf app.featureTemplate.FeatureTemplateController
         * @description Runs the functions needed when the controller is active
         */
        function activate() {

        }

        /********************
         * Public Methods
         ********************/



        /********************
         * Private Methods
         ********************/

    }
})();