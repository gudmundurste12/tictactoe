'use strict';

angular.module('tictactoeApp').controller('tictactoeController', function($scope, $http){
	$scope.grid = [
		['','',''],
		['','',''],
		['','','']
	];

	$scope.events = [];

	$scope.updateEvents = function(newEvents){
		for(var i = 0; i < newEvents.length; i++){
			$scope.events.push(newEvents[i]);
		}
		

		$scope.updateGrid(newEvents);
	};

	$scope.updateGrid = function(newEvents){
		for(var i = 0; i < newEvents.length; i++){
			if(newEvents[i].eventName === 'MoveMade'){
				$scope.grid[newEvents[i].cell.y][newEvents[i].cell.x] = newEvents[i].userName;
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