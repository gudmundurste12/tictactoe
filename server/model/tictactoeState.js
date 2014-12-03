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

	tictactoeState.insideGrid = function(cell){
		return cell.x < 3 && cell.x >=  0 && cell.y < 3 && cell.y >=  0;
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
				tictactoeState.players[1] = theEvent.userName;
			}
			else if(theEvent.eventName === "MoveMade"){
				if(tictactoeState.insideGrid(theEvent.cell)
					&& tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] === ""){
					if(theEvent.userName === tictactoeState.players[0]){
						tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] = "x";
						tictactoeState.currentPlayer = tictactoeState.players[1];
					}
					else if(theEvent.userName === tictactoeState.players[1]){
						tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] = "o";
						tictactoeState.currentPlayer = tictactoeState.players[0];
					}
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