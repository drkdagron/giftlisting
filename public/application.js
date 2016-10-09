var appName = "gifttracker";

var mainAppModule = angular.module(appName, ['ngResource', 'ngRoute']);

mainAppModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
        console.log("bootstrap complete");
});