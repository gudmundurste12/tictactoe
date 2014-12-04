var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("Create game:", function(){
	it("Given an empty history, handleEvent should only return the GameCreated event", function(){
		//Arrange
		var history = [];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		var result = tictactoeEventHandler(history).handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("A BadCommand event should be returned if gameId is missing", function(){
		//Arrange
		var history = [];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "CreateGame",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeEventHandler(history).handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("A BadCommand event should be returned if userName is missing", function(){
		//Arrange
		var history = [];
		
		var when = {
			commandName: "CreateGame",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "CreateGame",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			gameId: "1",
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeEventHandler(history).handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("Given a non-empty history, a BadCommand event should be returned", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "CreateGame",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			}],
			gameId: "1",
			message: "Game has already been created"
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});