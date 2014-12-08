var tictactoeBoundedContext = require("../../model/boundedContext/tictactoeBoundedContext");
var tictactoeCommandHandler = require("../../model/gameLogic/tictactoeCommandHandler");
var app = require("../../app");

exports.handleCommand = function(req, res){
	//TODO: Test if this really does any work.

	if(!app.eventStore){
		app.eventStore = require("../../eventStore/memoryStore")();
	}

	var eventStore = app.eventStore;
	console.log("app.eventStore: " + JSON.stringify(eventStore));
	var boundedContext = tictactoeBoundedContext(eventStore, tictactoeCommandHandler);
	var returnValue = boundedContext.handleCommand(req.body);
	
	res.json(returnValue);
};