class CustomHighchartsWidgetCtrl {
    constructor($rootScope, $timeout, $scope) {
        this.$rootScope = $rootScope
        this.$timeout = $timeout
        this.$scope = $scope
    }

    $onInit() {
        this.columnHeaders = [["Version","Executive General and Administration","Inventory Management","Manufacturing","Quality Assurance","Sales and Marketing","Research and Development"]];
        this.rowsData = [["Actual",-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],["Budget",-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],["Last Year",-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
    }
}

CustomHighchartsWidgetCtrl.$inject = ['$rootScope', '$timeout', '$scope']

angular.module('DemoApp').component('customHighchartsWidget', {
    templateUrl: 'widgets/highcharts/highcharts-widget.html',
    controller: CustomHighchartsWidgetCtrl,
    bindings: {
    }
})