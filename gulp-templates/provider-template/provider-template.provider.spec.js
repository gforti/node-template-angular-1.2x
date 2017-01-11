(function() {
    'use strict';
    describe('Service: ProviderTemplateProvider', function() {
        var service;

        beforeEach(module('pdr'));

        beforeEach(inject(function(_ProviderTemplateProvider_) {
            service = _ProviderTemplateProvider_;
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