/*global afterEach:false */

'use strict';

describe('Controller: tictactoeController', function(){
	//Set up everything for the tests

	beforeEach(module('tictactoeApp'));

	var tictactoeController, scope, httpBackend, http;

	beforeEach(inject(function($injector, $controller, $rootScope, $http){
		http = $http;
		httpBackend = $injector.get('$httpBackend');
		scope = $rootScope.$new();

		tictactoeController = $controller('tictactoeController', {
			$scope: scope
		});
	}));

	afterEach(function(){
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('The api should be called on CreateGame', function(){
		httpBackend.expectPOST('/api/createGame/',
		{
			gameId: '1',
			commandName: 'CreateGame',
			userName: 'Gvendurst',
			timeStamp: '2014-12-02T11:29:29'
		}).respond(
		[
			{value: 'TestValue'}
		]);

		scope.gameId = '1';
		scope.userName = 'Gvendurst';

		scope.createGame();
		httpBackend.flush();
	});


	it('The api should be called on JoinGame', function(){
		httpBackend.expectPOST('/api/joinGame/',
		{
			gameId: '1',
			commandName: 'JoinGame',
			userName: 'Gvendurst',
			timeStamp: '2014-12-02T11:29:29'
		}).respond(
		[
			{value: 'TestValue'}
		]);

		scope.gameId = '1';
		scope.userName = 'Gvendurst';

		scope.joinGame();
		httpBackend.flush();
	});


	it('The api should be called on MakeMove', function(){
		httpBackend.expectPOST('/api/makeMove/',
		{
			gameId: '1',
			commandName: 'MakeMove',
			userName: 'Gvendurst',
			timeStamp: '2014-12-02T11:29:29',
			cell: {
				x: 1,
				y: 1
			}
		}).respond(
		[
			{value: 'TestValue'}
		]);

		scope.gameId = '1';
		scope.userName = 'Gvendurst';

		scope.makeMove(1,1);
		httpBackend.flush();
	});

	it('The events list should be updated correctly in updateEvents when the events list is empty', function(){
		var history = [
		{
			eventName: 'GameCreated',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:29:29'
		},
		{
			eventName: 'GameJoined',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:34:29'
		},
		{
			commandName: 'MakeMove',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 1,
				y: 1
			}
		}];

		scope.events = [];
		scope.setHistory(history);

		expect(scope.events).toEqual(history);
	});


	it('The events list should be updated correctly in updateEvents when the events list is not empty', function(){
		var history = [
		{
			eventName: 'GameCreated',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:29:29'
		}];

		var added = [
		{
			eventName: 'GameJoined',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:34:29'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 1,
				y: 1
			}
		}];

		var expected = [
		{
			eventName: 'GameCreated',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:29:29'
		},
		{
			eventName: 'GameJoined',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:34:29'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 1,
				y: 1
			}
		}];

		var historyPlusAdded = [
		{
			eventName: 'GameCreated',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:29:29'
		},
		{
			eventName: 'GameJoined',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:34:29'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 1,
				y: 1
			}
		}];

		scope.events = history;
		scope.setHistory(historyPlusAdded);

		expect(scope.events).toEqual(expected);
	});


	it('The grid should be updated correctly in update()', function(){
		var history = [
		{
			eventName: 'GameCreated',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:29:29'
		},
		{
			eventName: 'GameJoined',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:34:29'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 1,
				y: 1
			},
			token: 'x'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 0,
				y: 0
			},
			token: 'o'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 2,
				y: 2
			},
			token: 'x'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst2',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 0,
				y: 2
			},
			token: 'o'
		},
		{
			eventName: 'MoveMade',
			userName: 'Gvendurst',
			gameId: '1',
			timeStamp: '2014-12-02T11:39:29',
			cell: {
				x: 2,
				y: 0
			},
			token: 'x'
		}];

		var expected = [
		['o','','x'],
		['','x',''],
		['o','','x']];

		scope.grid = [
		['','',''],
		['','',''],
		['','','']];

		expect(scope.inGame).toEqual(false);
		expect(scope.gameMessage).toEqual('');

		scope.update(history);

		expect(scope.grid).toEqual(expected);
		expect(scope.inGame).toEqual(true);
		expect(scope.gameMessage).toEqual('');
	});
});