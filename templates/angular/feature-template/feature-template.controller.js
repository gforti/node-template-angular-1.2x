(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.featureTemplate.FeatureTemplateController
     * @requires
     * @description
     *
     * A description of the controller, service or filter
     */

    angular
        .module('app.featureTemplate')
        .controller('FeatureTemplateController', FeatureTemplateController);

    FeatureTemplateController.$inject = ['FeatureTemplateProvider'];

    /* @ngInject */
    function FeatureTemplateController(FeatureTemplateProvider) {
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
         * @returns {void} Runs the functions needed when the controller is active
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