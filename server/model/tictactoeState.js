var _ = require('lodash');

module.exports = function(history){
	
	var tictactoeState = {};

	tictactoeState.history = history;

	tictactoeState.getGrid = function(){
		var grid = [
		["","",""],
		["","",""],
		["","",""]
		];

		//TODO: Update the grid according to the history

		return grid;
	};

	tictactoeState.joinable = function(){
		var returnValue = true;
		_.each(history, function(currentEvent){
			if(currentEvent.eventName === "GameJoined"){
				returnValue = false;
			}
		});
		return returnValue;
	}

	return tictactoeState;
}