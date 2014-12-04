var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("Make move:", function(){
	it("No move should be made if the history is empty", function(){
		//Arrange
		var history = [];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "MakeMove",
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

	it("No move should be made if the game has not been joined", function(){
		//Arrange
		var history = [{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "MakeMove",
				userName: "Gvendurst2",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [{
				eventName: "GameCreated",
				userName: "Gvendurst",
				timeStamp: "2014-12-02T11:29:29"
			}],
			message: "Game has not been joined"
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	it("Should return a MoveMade event", function(){
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
			commandName: "MakeMove",
			userName: "Gvendurst",
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
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});