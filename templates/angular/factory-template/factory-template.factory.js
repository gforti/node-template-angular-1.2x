(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.featureTemplate.FactoryTemplateFactory
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
     * <pre>
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
     * </pre>
     */

    angular
        .module('app.featureTemplate')
        .factory('FactoryTemplateFactory', FactoryTemplateFactory);

    FactoryTemplateFactory.$inject = [];

    function FactoryTemplateFactory() {

        /**
         * @ngdoc method
         * @name Constructor
         * @methodOf app.featureTemplate.FactoryTemplateFactory
         * @param {Object=} [config={}] JSON configuration object
         */
        function Model(config) {
            /**
             * @ngdoc property
             * @name #config 
             * @propertyOf app.featureTemplate.FactoryTemplateFactory
             * @returns {Object} JSON 
             */
            this.config = config || {};
            /**
             * @ngdoc property
             * @name #_properties 
             * @propertyOf app.featureTemplate.FactoryTemplateFactory
             * @returns {Object} Mixed 
             * @description Gives access to all class properties.
             */
            this._properties = {
                'sampleProperty' : null
            };
        }

        Model.prototype = {
            /**
             * @ngdoc method
             * @name sampleMethod
             * @methodOf app.featureTemplate.FactoryTemplateFactory
             * @returns {This} The instance
             */
            'sampleMethod': function () {
                return this;
            },
            /**
             * @ngdoc method
             * @name overRideSampleMethod
             * @methodOf app.featureTemplate.FactoryTemplateFactory
             * @description Throws Error. Function must be implemented
             */
            'overRideSampleMethod': function () {
                throw new Error('Please over ride this method!');
            },
            /**
             * @ngdoc method
             * @name getSampleProperty
             * @methodOf app.featureTemplate.FactoryTemplateFactory
             * @returns {Null} Null Value
             */
            'getSampleProperty': function () {
                return this._properties.sampleProperty;
            },
            /**
             * @ngdoc method
             * @name setSampleProperty
             * @methodOf app.featureTemplate.FactoryTemplateFactory
             * @param {String} str Argument must be a String
             * @returns {This} The instance
             */
            'setSampleProperty': function (str) {
                /* You can throw an error if a string is not passed but you decide if the else statement is necessary */
                if ( angular.isString(str) ) {
                    this._properties.sampleProperty = str;
                } else {
                    throw new Error('Only a string is allowed for the method app.featureTemplate.FactoryTemplateFactory.setSampleProperty');
                }

                return this;
            }
        };

        return Model;

    }
})();