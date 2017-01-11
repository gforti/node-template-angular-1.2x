(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name pdr.featureTemplate.FactoryTemplateFactory
     * @description Provides a base model factory for featureTemplate
     *
     * Pseudo-classical pattern
     * Learn more at: http://javascript.info/tutorial/pseudo-classical-pattern
     * Other Patterns won't work because of this service being a singleton
     *
     * @example
     *
     * The following shows you to create a new base model, overloading, how to call
     * a method within, and how to make a call the super function
     *
     * '''js
     * var config = {};
     * var model = new FactoryTemplateFactory(config);
     *
     * //Overriding (polymorphism)
     *
     * model.overRideSampleMethod = function() {
     *
     *   //Call method applied to the class
     *   this.sampleMethod.call(this);
     *
     *   //Call original method but reference new model by passing this to method call
     *   FactoryTemplateFactory.prototype.overRideSampleMethod.call(this);
     *
     *   return this;
     *
     * };
     * '''
     */

    angular
        .module('pdr.featureTemplate')
        .factory('FactoryTemplateFactory', FactoryTemplateFactory);

    FactoryTemplateFactory.$inject = [];


    function FactoryTemplateFactory() {


        /**
         * @ngdoc method
         * @name Model
         * @methodOf pdr.featureTemplate.FactoryTemplateFactory
         * @param {object=} optional config
         * @returns {void}
         */

        function Model(config) {
            this.config = config || {};
            this._properties = {
                'sampleProperty' : null
            };
        }

        Model.prototype = {
            /**
             * @ngdoc method
             * @name sampleMethod
             * @methodOf pdr.featureTemplate.FactoryTemplateFactory
             * @returns {*} The instance
             */
            'sampleMethod': function () {
                return this;
            },
            /**
             * @ngdoc method
             * @name sampleMethod
             * @methodOf pdr.featureTemplate.FactoryTemplateFactory
             * @returns {void}
             */
            'overRideSampleMethod': function () {
                throw new Error('Please over ride this method!');
            },
            /**
             * @ngdoc method
             * @name getSampleProperty
             * @methodOf pdr.featureTemplate.FactoryTemplateFactory
             * @returns {null}
             */
            'getSampleProperty': function () {
                return this._properties.sampleProperty;
            },
            /**
             * @ngdoc method
             * @name setSampleProperty
             * @methodOf pdr.featureTemplate.FactoryTemplateFactory
             * @param {string} str
             * @returns {*} The instance
             */
            'setSampleProperty': function (str) {
                /* You can throw an error if a string is not passed but you decide if the else statement is necessary */
                if ( angular.isString(str) ) {
                    this._properties.sampleProperty = str;
                } else {
                    throw new Error('Only a string is allowed for the method pdr.featureTemplate.FactoryTemplateFactory.setSampleProperty');
                }

                return this;
            }
        };

        return Model;

    }
})();