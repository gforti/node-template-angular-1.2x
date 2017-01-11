(function() {
    'use strict';
    describe('Service: FactoryTemplateFactory', function() {
        var service, config = {};

        beforeEach(module('pdr'));

        beforeEach(inject(function(_FactoryTemplateFactory_) {
            service = _FactoryTemplateFactory_;
        }));


        describe('sampleMethod', function() {
            it('should return the instance of itself', function() {
                var model = new service(config);
                var result = model.sampleMethod();
                expect(result).toEqual(model);
                expect(result === model).toBeTruthy();
            });

        });

        describe('overRideSampleMethod', function() {
            it('should throw a new error', function() {
                var model = new service(config);
                expect(model.overRideSampleMethod).toThrow();
            });

        });

        describe('getSampleProperty', function() {
            it('should return a null value', function() {
                var model = new service(config);
                expect(model.getSampleProperty()).toBeNull();
            });

        });

        describe('setSampleProperty', function() {
            it('should accept a string and not equal to null', function() {
                var model = new service(config);
                model.setSampleProperty('test');
                expect(model.getSampleProperty()).not.toBeNull();
            });

            it('should throw a new error if a string is not passed', function() {
                var model = new service(config);
                expect(function(){
                    model.setSampleProperty(true);
                }).toThrow();
            });

        });


    });
})();