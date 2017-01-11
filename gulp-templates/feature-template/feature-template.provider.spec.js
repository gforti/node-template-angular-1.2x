(function() {
    'use strict';
    describe('Service: FeatureTemplateProvider', function() {
        var service;

        beforeEach(module('pdr'));

        beforeEach(inject(function(_FeatureTemplateProvider_) {
            service = _FeatureTemplateProvider_;
        }));


        describe('sampleMethod', function() {
            it('should return the instance of itself', function() {
                var result = service.sampleMethod();
                expect(result).toEqual(service);
                expect(result === service).toBeTruthy();
            });

        });


    });
})();