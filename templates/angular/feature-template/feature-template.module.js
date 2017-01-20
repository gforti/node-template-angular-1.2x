(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name app.featureTemplate
     * @requires
     * @description
     *
     * This is the main script, which does the following:
     *
     *   - loads all the submodules
     *
     */

    angular.module('app.featureTemplate', []);

    angular.module('app').requires.push('app.featureTemplate');

})();