var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');
var tictactoeState = require('../tictactoeState');

describe("tictactoeCommandHandler on Win or Draw:", function(){
	it("The game should end in a draw when all the cells are full and there is no winning player", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,1],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,0],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,2],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,0],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,0],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,2],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,2],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,1],
			token: "o"
		}];
		
		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,1]
		};

		var then = [
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,1],
			token: "x"
		},
		{
			eventName: "GameDraw",
			gameId:"1",
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
			gameId:"1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,0],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,0],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,1],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,1],
			token: "o"
		}];

		var when = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,2]
		};
		
		var then = 	[
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,2],
			token: "x"
		},
		{
			eventName: "GameWon",
			gameId:"1",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29"
		}];	

		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));

		history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,0],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,0],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,1],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,1],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,2],
			token: "x"
		},
		{
			eventName: "GameWon",
			gameId:"1",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29"
		}];

		var extraCommand = {
			commandName: "MakeMove",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,2]
		};

		then = [{
			eventName: "BadCommand",
			command: extraCommand,
			history: history,
			gameId: "1",
			message: "Game is over"
		}];


		//Act
		result = tictactoeCommandHandler(history).handleCommand(extraCommand);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));

		history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:34:29"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,0],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,0],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,1],
			token: "x"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,1],
			token: "o"
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,2],
			token: "x"
		},
		{
			eventName: "GameWon",
			gameId:"1",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29"
		},
		{
			eventName: "BadCommand",
			command: extraCommand,
			history: history,
			gameId: "1",
			message: "Game is over"
		}];

		//Arrange
		extraCommand = {
			commandName: "MakeMove",
			userName: "Gvendurst",
			gameId:"1",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,2]
		};

		then = [{
			eventName: "BadCommand",
			command: extraCommand,
			history: history,
			gameId: "1",
			message: "Game is over"
		}];

		//Act
		result = tictactoeCommandHandler(history).handleCommand(extraCommand);

		//Assert
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});