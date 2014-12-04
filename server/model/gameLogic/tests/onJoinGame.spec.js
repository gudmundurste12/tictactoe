var should = require('should');

var tictactoeCommandHandler = require('../tictactoeCommandHandler');

//TODO: Add game id
describe("Join game: ", function(){
	it("A game should not be joinable if the history is empty", function(){
		//Arrange
		var history = [];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [],
			gameId: "1",
			message: "Game has not been created"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

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
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		},
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst3",
			gameId: "1",
			timeStamp: "2014-12-02T11:39:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst3",
				gameId: "1",
				timeStamp: "2014-12-02T11:39:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				eventName: "GameJoined",
				userName: "Gvendurst2",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			}],
			gameId: "1",
			message: "Game is full"

		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A game should not be joinable by the user who created the game", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		};

		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:34:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			}],
			gameId: "1",
			message: "This user created the game"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A BadCommand event should be returned if userName is missing", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];
		
		var when = {
			commandName: "JoinGame",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			}],
			gameId: "1",
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});


	it("A BadCommand event should be returned if gameId is missing", function(){
		//Arrange
		var history = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];
		
		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst2",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "BadCommand",
			event: {
				commandName: "JoinGame",
				userName: "Gvendurst2",
				timeStamp: "2014-12-02T11:29:29"
			},
			history: [
			{
				eventName: "GameCreated",
				userName: "Gvendurst",
				gameId: "1",
				timeStamp: "2014-12-02T11:29:29"
			}],
			message: "Some fields are missing"
		}];

		//Act
		var result = tictactoeCommandHandler(history).handleCommand(when);

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
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		var when = {
			commandName: "JoinGame",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		};

		var then = [
		{
			eventName: "GameJoined",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:34:29"
		}];

		//Act
		var eventHandler = tictactoeCommandHandler(history);
		var result = eventHandler.handleCommand(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});