(function() {
    'use strict';
    describe('Directive: widgetTemplate', function() {

        /* http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
           http://www.sitepoint.com/angular-testing-tips-testing-directives/ */

        var compile, scope, directiveElem;

        beforeEach(function(){
            module('app');

            inject(function($compile, $rootScope){
                compile = $compile;
                scope = $rootScope.$new();
                scope.widgetTemplate = 'Test Scope';

                directiveElem = getCompiledElement();
            });

        });

        function getCompiledElement(){
            var element = angular.element(
                    '<div data-widget-template="widgetTemplate">' +
                    '</div>'
            );
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

        describe('compiledElement', function() {

            it('should applied template', function () {
                expect(directiveElem.html()).not.toEqual('');
            });

            it('should have an <h3> tag', function() {
                var h3Element = directiveElem.find('h3');
                expect(h3Element).toBeDefined();
                expect(h3Element.text()).toEqual('Widget Template');
            });

        });

        describe('Scope', function() {

            it('should accept an optional value for widgetTemplate', function() {
                expect(directiveElem.isolateScope().widgetTemplate).toEqual('Test Scope');
            });

        });

    });
})();