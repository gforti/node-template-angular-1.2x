(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name pdr.widgets:widgetTemplate
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     <example module="pdr.widgets">
     <div data-widget-template=""></div>
     </example>
     *
     */

    angular
        .module('pdr.widgets')
        .directive('widgetTemplate', WidgetTemplate);

    WidgetTemplate.$inject = [];

    function WidgetTemplate() {
        var directive = {
            'scope': {
                'widgetTemplate' : '=?'
            },
            'link': link,
            'templateUrl': 'cache/widgets/widget-template/widget-template.cache.html'
        };
        return directive;

        function link(scope) {
            scope.widgetTemplate = scope.widgetTemplate || 'widget-template';
        }

    }

})();
