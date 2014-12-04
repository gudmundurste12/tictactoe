var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
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
			cell: {
				x: 0,
				y: 0
			}
		}];
		
		var gridAfter = [
		["x","",""],
		["","",""],
		["","",""]
		];

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
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
				y: 2
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
		["x","",""],
		["","","x"],
		["","o",""]
		];

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
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
				y: 0
			}
		}];
		
		var gridAfter = [
		["x","",""],
		["","",""],
		["","",""]
		];

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst2");
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
			cell: {
				x: -1,
				y: -1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: -1,
				y: 0
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 3,
				y: 3
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: -1,
				y: 3
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 3,
				y: -1
			}
		},
		{
			eventName: "MoveMade",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:39:29",
			cell: {
				x: 3,
				y: 0
			}
		}];
		
		var gridAfter = [
		["","",""],
		["","",""],
		["","",""]
		];

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
		should(gameState.currentPlayer).be.exactly("Gvendurst");
	});
});