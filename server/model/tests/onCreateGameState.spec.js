var should = require('should');

var tictactoeEventHandler = require('../tictactoeEventHandler');
var tictactoeState = require('../tictactoeState');

describe("tictactoeState on CreateGame", function(){
	it("Given an empty history and the GameCreated event, the grid should be empty", function(){
		//Arrange
		var history = [];
		
		var gridAfter = [
		["","",""],
		["","",""],
		["","",""]
		];

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
	});

	it("When a game has been created, the grid should be empty", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
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
	});

	it("When two players have joined the game, the grid should be empty", function(){
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

		//Act
		var gameState = tictactoeState(history);

		//Assert
		should(JSON.stringify(gameState.getGrid())).be.exactly(JSON.stringify(gridAfter));
	});
});