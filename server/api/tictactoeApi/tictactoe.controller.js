var tictactoeBoundedContext = require("../../model/boundedContext/tictactoeBoundedContext");
var tictactoeCommandHandler = require("../../model/gameLogic/tictactoeCommandHandler");
var app = require("../../app");

exports.handleCommand = function(req, res){
	
	if(!app.eventStore){
		app.eventStore = require("../../eventStore/memoryStore")();
	}

	var eventStore = app.eventStore;

	var boundedContext = tictactoeBoundedContext(eventStore, tictactoeCommandHandler);
	
	var returnValue = boundedContext.handleCommand(req.body);
	
	res.json(returnValue);
};