(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name pdr.featureTemplate
     * @requires
     * @description
     *
     * This is the main script, which does the following:
     *
     *   - loads all the submodules
     *
     */

    angular.module('pdr.featureTemplate', []);

    angular.module('pdr').requires.push('pdr.featureTemplate');

})();