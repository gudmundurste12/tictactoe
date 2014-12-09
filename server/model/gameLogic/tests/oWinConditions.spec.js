var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');
var tictactoeState = require('../tictactoeState');

describe("tictactoeState on Win or Draw:", function(){
	it("The game should end in a draw when all the cells are full and there is no winning player", function(){
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
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 1
			}
		}];
		
		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 1
			}
		};

		var then = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 2
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 1
			}
		},
		{
			eventName: "GameDraw",
			timeStamp: "2014-12-02T11:39:29"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});

	
	it("Wins should return a GameWon event and moves should not be possible after a game has been won", function(){
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
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 2
			}
		};
		
		var then = 	[
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 2
			}
		},
		{
			eventName: "GameWon",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29"
		}];	

		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));

		history = then;

		var extraCommand = {
			commandName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 2
			}
		};

		var extraEvent = {
			eventName: "BadCommand",
			command: extraCommand,
			history: history,
			gameId: "1",
			message: "Game is over"
		};


		//Act
		result = tictactoeCommandHandler(then).handleCommand(extraCommand);


		then.push(extraEvent);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));

		history = then;

		//Arrange
		extraCommand = {
			commandName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 2
			}
		};

		extraEvent = {
			eventName: "BadCommand",
			command: extraCommand,
			history: history,
			gameId: "1",
			message: "Game is over"
		};

		history.push(extraEvent);


		//Act
		result = tictactoeCommandHandler(then).handleCommand(extraCommand);


		then.push(extraEvent);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});