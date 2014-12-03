var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("Join game: ", function(){
	it("A game should not be joinable unless it has been created", function(){
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
			history: []
		}];


		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});