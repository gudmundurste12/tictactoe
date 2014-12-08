angular.module("tictactoeApp").controller("tictactoeController", function($scope, $http){
	$scope.updateEvents = function(events){
		$scope.events = events;
	};

	$scope.createGame = function(){
		var requestBody = {
			gameId: $scope.gameId,
			commandName: "CreateGame",
			userName: $scope.userName,
			timeStamp: "2014-12-02T11:29:29"
		};

		var requestPromise = $http.post("/api/createGame/",
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data.response);
		});
	};
});