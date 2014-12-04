var should = require("should");
var _ = require("lodash");

describe("BoundedContext", function(){
	it("Events should be loaded into a command handler and a command should be executed", function(){
		//Arrange
		var eventStoreCalledWithId = undefined;
		var eventStoreStub = {
			getHistory: function(id){
				eventStoreCalledWithId = id;
			}
		};

		var commandHandlerCalledWithCommand = undefined;
		var commandHandlerStub = function(history){
			return{
				handleCommand: function(command){
					commandHandlerCalledWithCommand = command;
				}
			}
		};

		var testCommand = {
			command: "TestCommand",
			gameId: "1"
		};

		var boundedContext = require("../tictactoeBoundedContext.js")(eventStoreStub, commandHandlerStub);

		//Act
		boundedContext.handleCommand(testCommand);

		//Assert
		should(eventStoreCalledWithId).be.exactly("1");
		should(commandHandlerCalledWithCommand).eql(testCommand);
	});
});