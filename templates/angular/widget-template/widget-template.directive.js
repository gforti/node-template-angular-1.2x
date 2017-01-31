(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name app.widgets.widgetTemplate
     * @restrict EA
     * @element
     * @description Widget to be used in a feature
     * @param {String=} [widgetTemplate='widget-template'] Default scope value
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
