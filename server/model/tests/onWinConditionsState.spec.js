var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("tictactoeState on Win or Draw:", function(){
	it("The game should be uresolved if no move has been made", function(){
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
		
		var gridAfter = [
		["","",""],
		["","",""],
		["","",""]
		];

		var gameStatusAfter = {
			status: "Unresolved"
		};

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});


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
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 1
			}
		}];
		
		var gridAfter = [
		["o","x","o"],
		["o","x","x"],
		["x","o","x"]
		];

		var gameStatusAfter = {
			status: "Draw"
		};

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});

	
	it("Vertical wins should be possible and moves should not be possible after a game has been won", function(){
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
		
		var gridAfter = [
		["x","o",""],
		["x","o",""],
		["","",""]
		];

		var gameStatusAfter = {
			status: "Unresolved"
		};

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));

		var extraEvent = {
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 0,
				y: 2
			}
		};

		history.push(extraEvent);

		var gridAfter = [
		["x","o",""],
		["x","o",""],
		["x","",""]
		];

		var gameStatusAfter = {
			status: "Win",
			userName: "Gvendurst"
		};

		//Act
		gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));


		extraEvent = {
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 1,
				y: 2
			}
		};

		history.push(extraEvent);

		var gridAfter = [
		["x","o",""],
		["x","o",""],
		["x","",""]
		];

		var gameStatusAfter = {
			status: "Win",
			userName: "Gvendurst"
		};

		//Act
		gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});


	it("Horizontal wins should be possible and moves should not be possible after a game has been won", function(){
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
				x: 0,
				y: 1
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
				y: 1
			}
		}];
		
		var gridAfter = [
		["x","x",""],
		["o","o",""],
		["","",""]
		];

		var gameStatusAfter = {
			status: "Unresolved"
		};

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));

		var extraEvent = {
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 0
			}
		};

		history.push(extraEvent);

		var gridAfter = [
		["x","x","x"],
		["o","o",""],
		["","",""]
		];

		var gameStatusAfter = {
			status: "Win",
			userName: "Gvendurst"
		};

		//Act
		gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));


		extraEvent = {
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 2,
				y: 1
			}
		};

		history.push(extraEvent);

		var gridAfter = [
		["x","x","x"],
		["o","o",""],
		["","",""]
		];

		var gameStatusAfter = {
			status: "Win",
			userName: "Gvendurst"
		};

		//Act
		gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});
});