var should = require("should");
var _ = require("lodash");

describe("", function(){
	//Arrange
	var eventStoreCalledWithId = undefined;
	var eventStoreStub = {
		setHistory: function(id){
			eventStoreCalledWithId = id;
		}
	};

	var commandHandlerCalledWithCommand = undefined;
	var commandHandlerStub = {
		handleCommand: function(command){
			commandHandlerCalledWithCommand = command;
		}
	};

	var textCommand = {
		command: "TestCommand",
		gameId: "1"
	};

	var boundedContext = require("../tictactoeBoundedContext.js");

	//Act
	boundedContext.handleCommand(testCommand);

	//Assert
	should(eventStoreCalledWithId).be.exactly("1");
	should(commandHandlerCalledWithCommand).eql(command);
});