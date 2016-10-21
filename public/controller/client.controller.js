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
            console.log(response);
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
        
    };

    $scope.selectUser = function(id)
    {
        $scope.filterUser = id;
    }
    $scope.removeFilter = function()
    {
        $scope.filterUser = null;
        if (angular.isDefined($scope.user.id))
            delete $scope.user.id;
    }

    $scope.backToEvents = function()
    {
        $location.path('/');
    }

    $scope.getEvent = function() 
    {
        var infoAPI = $resource('/api/event/' + $routeParams.eventId);
        var info = infoAPI.get({}, function(response) {

            var array = [];
            for (var i = 0; i < response.eventItems.length; i++)
            {
                if (array.indexOf(response.eventItems[i].owner.id) == -1)
                {
                    array.push(response.eventItems[i].owner.id);
                    array.push(i);
                }
            }
            var unique = [];
            for (var j = 1; j < array.length; j+= 2)
            {
                unique.push(response.eventItems[array[j]].owner);
            }
            $scope.eventUsers = unique;
            $scope.eventinfo = info;
            console.log(array);
        });
    }

    $scope.addItem = function() 
    {
        var itemAPI = $resource('/api/event/' + $routeParams.eventId + '/item');
        var itemIn = new itemAPI ({
            owner: $scope.authentication.user._id,
            itemName: this.itemName,
            gotten: false
        });
        itemIn.$save(function(response) {
            $scope.getEvent();
            $scope.itemName = "";
        }, function(err) {
            $scope.error = error.data.message;
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