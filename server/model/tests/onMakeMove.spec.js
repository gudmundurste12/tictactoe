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

	it("Should return a MoveMade event", function(){
		
	});
});