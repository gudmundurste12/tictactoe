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

		console.log("Grid: " + grid);

		//TODO: Update the grid according to the history

		return grid;
	};

	return tictactoeState;
}