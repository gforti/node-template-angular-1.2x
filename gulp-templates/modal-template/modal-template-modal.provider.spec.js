(function() {
    'use strict';
    describe('Service: ModalTemplateModalProvider', function() {
        var service;

        beforeEach(module('app'));

        beforeEach(inject(function(_ModalTemplateModalProvider_) {
            service = _ModalTemplateModalProvider_;
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