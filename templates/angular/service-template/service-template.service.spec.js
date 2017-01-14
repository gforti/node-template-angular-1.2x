(function() {
    'use strict';
    describe('Service: ServiceTemplateService', function() {
        var service;

        beforeEach(module('pdr'));

        beforeEach(inject(function(_ServiceTemplateService_) {
            service = _ServiceTemplateService_;
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