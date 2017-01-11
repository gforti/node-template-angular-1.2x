(function() {
    'use strict';
    describe('Controller: FeatureTemplateController', function() {
        beforeEach(module('pdr'));

        var Controller;

        beforeEach(inject(function($controller){
            Controller = $controller('FeatureTemplateController', {});
        }));

        describe('FeatureTemplateController', function() {
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
                expect(Controller.title).toEqual('feature-template');
            });
        });

    });
})();