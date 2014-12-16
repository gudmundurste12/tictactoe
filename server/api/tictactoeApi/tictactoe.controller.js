var tictactoeBoundedContext = require("../../model/boundedContext/tictactoeBoundedContext");
var tictactoeCommandHandler = require("../../model/gameLogic/tictactoeCommandHandler");
var app = require("../../app");
var eventStoreLocation = "../../eventStore/memoryStore";

exports.handleCommand = function(req, res){
	//TODO: Test if this really does any work.

	if(!app.eventStore){
		app.eventStore = require(eventStoreLocation)();
	}

	var eventStore = app.eventStore;
	
	var boundedContext = tictactoeBoundedContext(eventStore, tictactoeCommandHandler);
	var returnValue = boundedContext.handleCommand(req.body);
	
	returnValue.then(function(value){
		res.json(value);
	});
};

exports.getEvents = function(req, res){
	if(!app.eventStore){
		app.eventStore = require(eventStoreLocation)();
	}

	var eventStore = app.eventStore;

	var returnValue = eventStore.getHistory(req.body.gameId);
	
	returnValue.then(function(value){
		res.json(value);
	});
};