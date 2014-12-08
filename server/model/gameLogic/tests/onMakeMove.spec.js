var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');
var tictactoeState = require('../tictactoeState');

describe("Make move:", function(){
	it("No move should be made if the history is empty", function(){
		//Arrange
		var history = [];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			command: {
				commandName: "MakeMove",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			gameId: "1",
			message: "Game has not been created"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("No move should be made if the game has not been joined", function(){
		//Arrange
		var history = [{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			command: {
				commandName: "MakeMove",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			}],
			gameId: "1",
			message: "Game has not been joined"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A BadCommand event should be returned if userName is missing", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];
		
		var when = {
			commandName: "MakeMove",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29",
			cell:{
				x: 1,
				y: 1
			}
		};
		
		var then = [
		{
			eventName: "BadCommand",
			command: {
				commandName: "MakeMove",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29",
				cell:{
					x: 1,
					y: 1
				}
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			}],
			gameId: "1",
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	
	it("A BadCommand event should be returned if gameId is missing", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];
		
		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29",
			cell:{
				x: 1,
				y: 1
			}
		};
		
		var then = [
		{
			eventName: "BadCommand",
			command: {
				commandName: "MakeMove",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29",
				cell:{
					x: 1,
					y: 1
				}
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			}],
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A BadCommand event should be returned if cell is missing", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];
		
		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			command: {
				commandName: "MakeMove",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			}],
			gameId: "1",
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	/*
	it("Illegal moves should return a BadCommand", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		};

		var then = [
		{
			eventName: "BadCommand",
			command:
			{
				commandName: "MakeMove",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:39:29",
				cell: {
					x: 1,
					y: 1
				}
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			},
			{
				commandName: "MakeMove",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:39:29",
				cell: {
					x: 1,
					y: 1
				}
			}],
			gameId: "1",
			message: "Illegal move"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
	*/


	it("Should return a MoveMade event", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		};

		var then = [
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});