'use strict';

angular.module('tictactoeApp').controller('tictactoeController', function($scope, $http, $interval){

	$scope.grid = [
		['','',''],
		['','',''],
		['','','']
	];

	$scope.gameMessage = '';

	$scope.events = [];

	$scope.inGame = false;
	$scope.gameFinished = false;

	$scope.setHistory = function(newHistory){
		$scope.events = newHistory;
	};

	$scope.setGrid = function(){
		$scope.grid = [
			['','',''],
			['','',''],
			['','','']
		];

		for(var i = 0; i < $scope.events.length; i++){
			if($scope.events[i].eventName === 'MoveMade'){
				$scope.grid[$scope.events[i].cell.y][$scope.events[i].cell.x] = $scope.events[i].token;
			}
		}
	};

	$scope.updateGameStatus = function(){
		for(var i = 0; i < $scope.events.length; i++){
			if ($scope.events[i].eventName === 'GameCreated' ||
				$scope.events[i].eventName === 'GameJoined') {
				
				$scope.inGame = true;
			}
			else if($scope.events[i].eventName === 'GameWon'){
				$scope.gameMessage = $scope.events[i].userName + ' won';
				$scope.inGame = false;
				$scope.gameFinished = true;
			}
			else if($scope.events[i].eventName === 'GameDraw'){
				$scope.gameMessage = 'We have a tie';
				$scope.inGame = false;
				$scope.gameFinished = true;
			}
		}
	};

	$scope.update = function(newEvents){
		$scope.setHistory(newEvents);
		$scope.setGrid();
		$scope.updateGameStatus();
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

		requestPromise.then(function(){
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

		requestPromise.then(function(){
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

		requestPromise.then(function(){
		});
	};

	$interval(function(){
		console.log('interval');
		if($scope.gameId){
			var requestBody = {
				'gameId': $scope.gameId
			};

			var requestPromise = $http.post('/api/getEvents/',
				requestBody
			);

			requestPromise.then(function(data){
				$scope.update(data.data);//update(data.data);
			});
		}
	}, 1000);
});