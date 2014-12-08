'use strict';

angular.module('tictactoeApp').controller('tictactoeController', function($scope, $http){
	$scope.grid = [
		['','',''],
		['','',''],
		['','','']
	];

	$scope.updateEvents = function(events){
		if(!$scope.events){
			$scope.events = [];
		}
		for(var i = 0; i < events.length; i++){
			$scope.events.push(events[i]);
		}

		$scope.updateGrid(events);
	};

	$scope.updateGrid = function(events){
		for(var i = 0; i < events.length; i++){
			if(events[i].eventName === 'MoveMade'){
				$scope.grid[events[i].cell.y][events[i].cell.x] = $scope.userName;
			}
		}
	};

	$scope.createGame = function(){
		var requestBody = {
			'gameId': $scope.gameId,
			'commandName': 'CreateGame',
			'userName': $scope.userName,
			'timeStamp': '2014-12-02T11:29:29'
		};

		var requestPromise = $http.post('/api/createGame/',
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data);
		});
	};

	$scope.joinGame = function(){
		var requestBody = {
			'gameId': $scope.gameId,
			'commandName': 'JoinGame',
			'userName': $scope.userName,
			'timeStamp': '2014-12-02T11:29:29'
		};

		var requestPromise = $http.post('/api/joinGame/',
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data);
		});
	};

	$scope.makeMove = function(x, y){
		console.log("x: " + x + ", y: " + y);
		var requestBody = {
			'gameId': $scope.gameId,
			'commandName': 'MakeMove',
			'userName': $scope.userName,
			'timeStamp': '2014-12-02T11:29:29',
			'cell': {
				x: x,
				y: y
			}
		};

		var requestPromise = $http.post('/api/makeMove/',
			requestBody
		);

		requestPromise.then(function(data){
			$scope.updateEvents(data.data);
		});
	};
});