(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name app.widgets:widgetTemplate
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
     <example module="app.widgets">
     <div data-widget-template=""></div>
     </example>
     *
     */

    angular
        .module('app.widgets')
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
