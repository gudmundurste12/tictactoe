var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');
var tictactoeState = require('../tictactoeState');

describe("tictactoeState on MakeMove", function(){
	it("After the first move, the grid should contain only the one move", function(){
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
			cell: [0,0]
		}];
		
		var gridAfter = [
		["x","",""],
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
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});


	it("Legal moves should be possible", function(){
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
			cell: [0,0]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: [1,2]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: [2,1]
		}];
		
		var gridAfter = [
		["x","",""],
		["","","x"],
		["","o",""]
		];

		var gameStatusAfter = {
			status: "Unresolved"
		};
		
		//Act
		var gameState = tictactoeState(history);
		
		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});


	it("The players should not be able to pick the same cell", function(){
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
			cell: [0,0]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: [0,0]
		}];
		
		var gridAfter = [
		["x","",""],
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
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
		should(JSON.stringify(gameState.getStatus())).be.exactly(JSON.stringify(gameStatusAfter));
	});

	it("The players should not be able to pick a cell that is not on the grid", function(){
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
			cell: [-1,-1]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: [-1,0]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: [3,3]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: [-1,3]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: [3,-1]
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: [3,0]
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
});