angular.module('gifttracker').controller('AppController', ['$scope', '$routeParams', '$location', '$resource', 'Authentication',
function ($scope, $routeParams, $location, $resource, Authentication) {
    $scope.authentication = Authentication;

    $scope.joinEvent = function(id) {
        $scope.eventID = id;
        $location.path('/event/join');
    };

    $scope.joinEventCall = function()
    {
        console.log("heyo");
        var api = $resource('/api/event/join');
        var event = new api({
            eventID: this.id,
            eventPin: this.pin,
            eventUser: $scope.authentication.user._id
        });
        console.log(event);
        console.log("heyo before save");
        event.$save(function(response) {
            $location.path('/');
        });
        console.log("hero after save");
    };

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

    $scope.getAllEvents = function() {
        var user = $resource('/api/event');
        var queries = user.query({}, function() {
            $scope.queries = queries;
        });
    }
}]);