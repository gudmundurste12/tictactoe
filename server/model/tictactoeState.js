var _ = require('lodash');

module.exports = function(history){
	
	var tictactoeState = {};

	tictactoeState.history = history;

	tictactoeState.currentPlayer = null;
	tictactoeState.players = [];

	tictactoeState.grid = [
	["","",""],
	["","",""],
	["","",""]
	];

	tictactoeState.joinable = function(){
		var returnValue = true;
		_.each(history, function(currentEvent){
			if(currentEvent.eventName === "GameJoined"){
				returnValue = false;
			}
		});
		return returnValue;
	}

	tictactoeState.createdBy = function(userName){
		var returnValue = false;
		_.each(history, function(currentEvent){
			if(currentEvent.eventName === "GameCreated"
				&& currentEvent.userName === userName){
				returnValue = true;
			}
		});
		return returnValue;
	}	

	tictactoeState.getGrid = function(){
		return tictactoeState.grid;
	};

	tictactoeState.updateGrid = function(theEvent){
		if(theEvent instanceof Array){
			_.each(theEvent, function(currentEvent){
				tictactoeState.updateGrid(currentEvent);
			});
		}
		else{
			if(theEvent.eventName === "GameCreated"){
				tictactoeState.currentPlayer = theEvent.userName;
				tictactoeState.players[0] = theEvent.userName;
			}
			else if(theEvent.eventName === "GameJoined"){
				tictactoeState.currentPlayer = theEvent.userName;
				tictactoeState.players[1] = theEvent.userName;
			}
			else if(theEvent.eventName === "MoveMade"){
				if(theEvent.userName === tictactoeState.players[0]){
					tictactoeState.grid[theEvent.cell.x][theEvent.cell.y] = "x";
				}
				else{
					tictactoeState.grid[theEvent.cell.x][theEvent.cell.y] = "o";
				}
			}
		}
	}

	tictactoeState.setHistory = function(theHistory){
		_.each(theHistory, function(currentEvent){
			tictactoeState.updateGrid(currentEvent);
		})
	};

	tictactoeState.setHistory(history);

	return tictactoeState;
}