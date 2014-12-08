var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');
var tictactoeState = require('../tictactoeState');

//TODO: An existing game should not be able to be created again
describe("Create game:", function(){
	it("Given an empty history, handleCommand should only return the GameCreated event", function(){
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
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("Given a history with only a BadCommand event, handleCommand should add a GameCreated event", function(){
		//Arrange
		var history = [{
			commandName: "BadCommand",
			command: {
				commandName: "CreateGame",
				gameId: "1"
			},
			history: [],
			gameId: "1",
			message: "Some fields is missing"
		}];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			commandName: "BadCommand",
			command: {
				commandName: "CreateGame",
				gameId: "1"
			},
			history: [],
			gameId: "1",
			message: "Some fields is missing"
		},
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

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
			command: {
				commandName: "CreateGame",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

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
			command: {
				commandName: "CreateGame",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			gameId: "1",
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

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
			command: {
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
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});