var should = require('should');
var _ = require('lodash');

var tictactoeEventHandler = require('../tictactoeEventHandler');

describe("Create game:", function(){
	it("Given an empty history, handleEvend should only return the GameCreated event", function(){
		//Assign
		var history = [];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		var result = tictactoeEventHandler(history).handleEvent(when);

		//Assert
		should(result.length).be.exactly(1);
		should(JSON.stringify(result)).be.exactly(JSON.stringify(then));
	});
});


describe("Create game:", function(){
	it("Given an empty history, history should only contain the GameCreated event", function(){
		//Assign
		var history = [];
		
		var when = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		};
		
		var then = [
		{
			eventName: "GameCreated",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		var eventHandler = tictactoeEventHandler(history);
		var result = eventHandler.handleEvent(when);

		//Assert
		should(eventHandler.history.length).be.exactly(1);
	});
});