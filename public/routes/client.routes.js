angular.module('gifttracker').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', { templateUrl: 'views/index.client.view.html'}).
    when('/event/create', { templateUrl: 'views/create-event.client.view.html' }).
    when('/event/join', { templateUrl: 'views/join-event.client.view.html' }).
    when('/event/:eventId', { templateUrl: 'views/view-event.client.view.html'});
}]);