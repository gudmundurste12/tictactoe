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

	$scope.joinGame = function(){
		var requestBody = {
			gameId: $scope.gameId,
			commandName: "JoinGame",
			userName: $scope.userName,
			timeStamp: "2014-12-02T11:29:29"
		};

		var requestPromise = $http.post("/api/joinGame/",
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data.response);
		});
	};

	$scope.makeMove = function(x, y){
		var requestBody = {
			gameId: $scope.gameId,
			commandName: "MakeMove",
			userName: $scope.userName,
			timeStamp: "2014-12-02T11:29:29",
			cell: {
				x: x,
				y: y
			}
		};

		var requestPromise = $http.post("/api/makeMove/",
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data.response);
		});
	};
});