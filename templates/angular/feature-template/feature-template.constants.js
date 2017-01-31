(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name app.featureTemplate.FeatureTemplateConstants
     * @description
     *
     * This script loads all the constants for feature-template
     *
     */

    angular
        .module('app.featureTemplate')
        .constant('FeatureTemplateConstants', {
            /**
             * @ngdoc property
             * @name #RequestEndpoints 
             * @propertyOf app.featureTemplate.FeatureTemplateConstants
             * @returns {Object} JSON 
             * @description A list of restful endpoints.
             */
            'RequestEndpoints': {
                'RestService': ''
            }
        });

})();
