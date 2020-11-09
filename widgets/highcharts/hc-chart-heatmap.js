(function () {
    'use strict';

    angular
        .module('DemoApp')
        .directive('hcHeatMap', hcHeatMap);

    function hcHeatMap() {
        let directive = {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
        };

        return directive;
    }

})();
