angular.module('gifttracker').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', { templateUrl: 'views/index.client.view.html'}).
    when('/event/create', { templateUrl: 'views/create-event.client.view.html' }).
    when('/event/join', { templateUrl: 'views/join-event.client.view.html' }).
    when('/family/create', { templateUrl: 'views/create-family.client.view.html' }).
    when('/family/join', { templateUrl: 'views/join-family.client.view.html' });
}]);