angular.module('gifttracker').controller('AppController', ['$scope', '$routeParams', '$location', '$resource', 'Authentication',
function ($scope, $routeParams, $location, $resource, Authentication) {
    $scope.authentication = Authentication;

    $scope.joinEvent = function(id) {
        $scope.eventID = id;
        $location.path('/event/join');
    };

    $scope.joinEventCall = function()
    {
        var api = $resource('/api/event/join');
        var event = new api({
            eventID: this.id,
            eventPin: this.pin,
            eventUser: $scope.authentication.user._id
        });
        console.log(event);
        event.$save(function(response) {
            $location.path('/');
        });
        console.log("hero after save");
    };

    $scope.testing = function() 
    {
        console.log($routeParams);
        var infoAPI = $resource('/api/event/' + $routeParams.eventId);
        var info = infoAPI.get({}, function() {
            $scope.eventinfo = info;
        });
    }

    $scope.goToEvent = function(id)
    {
        $location.path('/event/' + id);
    }

    $scope.createEvent = function() {
        var evtAPI = $resource('/api/event');

        var event = new evtAPI({
            eventName : this.name,
            eventPin : this.pin,
            eventItems : this.display,
            eventOwner : $scope.authentication.user._id,
            eventOwnerName: $scope.authentication.user.firstName + " " + $scope.authentication.user.lastName
        });

        event.$save(function(response) {
            $location.path('/');
        }, function(error) {
            $scope.error = error.data.message;
        });
    };

    $scope.getMyEvents = function() {
        var user = $resource('/api/' + $scope.authentication.user._id + '/list');
        var queries = user.query({}, function() {
            $scope.queries = queries;
            console.log($scope.queries);
        });
    }
}]);