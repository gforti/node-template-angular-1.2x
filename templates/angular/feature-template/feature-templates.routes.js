(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name app.featureTemplate.featureTemplateRoutes
     * @requires 
     * $stateProvider
     * @description
     *
     * This script loads all the routes for feature-template
     *
     */

    angular.module('app.featureTemplate')
        .config(featureTemplateRoutes);

    featureTemplateRoutes.$inject = ['$stateProvider'];

    /**
     * @ngdoc method
     * @name featureTemplateRoutes
     * @methodOf app.featureTemplate.featureTemplateRoutes
     * @description Function that will be used to set the location of the feature.
     */
    function featureTemplateRoutes($stateProvider) {

        var featureTemplateStateConfig = {
            url: "/feature-template",
            templateUrl: "cache/feature-template/feature-template.cache.html",
            controller: "FeatureTemplateController as vm",
            requiresPracticeFacilityDataInquiryPrivilege: true
        };

        $stateProvider.state("featureTemplate", featureTemplateStateConfig);
    }
})();