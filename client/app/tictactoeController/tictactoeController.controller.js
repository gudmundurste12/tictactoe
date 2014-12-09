'use strict';

angular.module('tictactoeApp').controller('tictactoeController', function($scope, $http){
	$scope.grid = [
		['','',''],
		['','',''],
		['','','']
	];

	$scope.events = [];

	$scope.update = function(newEvents){
		$scope.updateEvents(newEvents);
		$scope.updateGrid(newEvents);
	};

	$scope.updateEvents = function(newEvents){
		for(var i = 0; i < newEvents.length; i++){
			$scope.events.push(newEvents[i]);
			if(newEvents[i].eventName === 'GameWon'){
				$scope.gameMessage = $scope.userName + ' won';
			}
			else if(newEvents[i].eventName === 'GameDraw'){
				$scope.gameMessage = 'We have a tie';
			}
		}				
	};

	$scope.updateGrid = function(newEvents){
		for(var i = 0; i < newEvents.length; i++){
			if(newEvents[i].eventName === 'MoveMade'){
				$scope.grid[newEvents[i].cell.y][newEvents[i].cell.x] = newEvents[i].token;
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
			$scope.update(data.data);
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
			$scope.update(data.data);
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
			$scope.update(data.data);
		});
	};
});