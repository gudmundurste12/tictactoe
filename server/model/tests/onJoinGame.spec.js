var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("Join game: ", function(){
	it("A game should not be joinable if the history is empty", function(){
		//Arrange
		var history = [];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			message: "Game has not been created"
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A game should not be joinable if the game is full", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:34:29"
		}];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst3",
			timeStamp: "2014-12-02T11:39:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst3",
				timeStamp: "2014-12-02T11:39:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				timeStamp: "2014-12-02T11:34:29"
			}],
			message: "Game is full"

		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A game should be joinable if it has been created and not joined", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		}];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:34:29"
		};

		var then = [
		{
			eventName: "GameJoined",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:34:29"
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});