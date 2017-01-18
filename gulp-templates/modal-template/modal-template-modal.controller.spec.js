(function() {
    'use strict';
    describe('Controller: ModalTemplateModalController', function() {
        beforeEach(module('app'));

        var Controller;

        beforeEach(inject(function($controller, _ModalTemplateModalProvider_){
            Controller = $controller('ModalTemplateModalController', {
                'ModalTemplateModalProvider' : _ModalTemplateModalProvider_,
                'DependencyInjection' : 'ModalTemplate'
            });
        }));

        describe('ModalTemplateModalController', function() {
            it('should be defined', function() {
                expect(Controller).toBeDefined();
            });

            it('should not have a property called vm', function() {
                expect(Controller.vm).toBeUndefined();
            });

        });


        describe('vm: view model', function() {
            it('should have a property called title', function() {
                expect(Controller.title).toBeDefined();
                expect(Controller.title).toEqual('ModalTemplate');
            });

            it('should have a cancel function', function() {
                expect(Controller.cancel).toBeDefined();
                expect(Controller.cancel).toEqual(jasmine.any(Function));
            });

            it('should have a submit function', function() {
                expect(Controller.submit).toBeDefined();
                expect(Controller.submit).toEqual(jasmine.any(Function));
            });
        });

    });
})();