var _ = require('lodash');


//TODO: Comment the code, and soon
module.exports = function(history){
	
	var tictactoeState = {};

	tictactoeState.history = history;

	tictactoeState.currentPlayer = null;
	tictactoeState.players = [];
	tictactoeState.status = {
		status: "Unresolved"
	}

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
			if(	currentEvent.eventName === "GameCreated" &&
				currentEvent.userName === userName){
				returnValue = true;
			}
		});
		return returnValue;
	}	

	tictactoeState.getToken = function(userName){
		if(userName === tictactoeState.players[0]){
			return 'x';
		}
		else if(userName === tictactoeState.players[1]){
			return 'o';
		}
		else{
			throw Error('This player is not in the game');
		}
	};

	tictactoeState.insideGrid = function(cell){
		return cell[0] < 3 && cell[0] >=  0 && cell[1] < 3 && cell[1] >=  0;
	};

	tictactoeState.getGrid = function(){
		return tictactoeState.grid;
	};

	tictactoeState.winOnLineHorizontal = function(y){
		return tictactoeState.grid[y][0] !== "" && tictactoeState.grid[y][0] === tictactoeState.grid[y][1] && tictactoeState.grid[y][0] === tictactoeState.grid[y][2];
	}

	tictactoeState.winOnLineVertical = function(x){
		return tictactoeState.grid[0][x] !== "" && tictactoeState.grid[0][x] === tictactoeState.grid[1][x] && tictactoeState.grid[0][x] === tictactoeState.grid[2][x];
	}

	tictactoeState.winOnLineDiagonalDown = function(){
		return tictactoeState.grid[0][0] !== "" && tictactoeState.grid[0][0] === tictactoeState.grid[1][1] && tictactoeState.grid[0][0] === tictactoeState.grid[2][2];
	}

	tictactoeState.winOnLineDiagonalUp = function(){
		return tictactoeState.grid[2][0] !== "" && tictactoeState.grid[2][0] === tictactoeState.grid[1][1] && tictactoeState.grid[2][0] === tictactoeState.grid[0][2];
	}

	tictactoeState.gridFull = function(){
		var returnValue = true;
		_.each(tictactoeState.grid, function(currentRow){
			_.each(currentRow, function(currentCell){
				if(currentCell === ""){
					returnValue = false;
				}
			});
		});

		return returnValue;
	}

	tictactoeState.canMakeMove = function(userName, cell){
		if(	tictactoeState.status.status === "Unresolved" &&
			tictactoeState.grid[cell[1]][cell[0]] === "" &&
			tictactoeState.insideGrid(cell) &&
			tictactoeState.currentPlayer === userName){
			return true;
		}
		else{
			return false;
		}
	}

	tictactoeState.getStatus = function(){
		return tictactoeState.status;
	};

	tictactoeState.updateStatus = function(theEvent){
		var win = false;
		win = win || tictactoeState.winOnLineVertical(theEvent.cell[0]);
		win = win || tictactoeState.winOnLineHorizontal(theEvent.cell[1]);
		win = win || tictactoeState.winOnLineDiagonalDown();
		win = win || tictactoeState.winOnLineDiagonalUp();

		if(win){
			tictactoeState.status = {
				status: "Win",
				userName: theEvent.userName
			}
		}
		else if(tictactoeState.gridFull()){
			tictactoeState.status = {
				status: "Draw"
			}
		}
		else{
			tictactoeState.status = {
				status: "Unresolved"
			}
		}
	}

	tictactoeState.updateGrid = function(theEvent){
		if(theEvent instanceof Array){
			var rc = 0;
			_.each(theEvent, function(currentEvent){
				rc = rc || tictactoeState.updateGrid(currentEvent);
			});
			return rc;
		}
		else{
			if(theEvent.eventName === "GameCreated"){
				tictactoeState.currentPlayer = theEvent.userName;
				tictactoeState.players[0] = theEvent.userName;
				return 0;
			}
			else if(theEvent.eventName === "GameJoined"){
				tictactoeState.players[1] = theEvent.userName;
				return 0;
			}
			else if(theEvent.eventName === "MoveMade"){
				if(	tictactoeState.insideGrid(theEvent.cell) &&
					tictactoeState.grid[theEvent.cell[1]][theEvent.cell[0]] === "" &&
					tictactoeState.status.status === "Unresolved"){
					if(theEvent.userName === tictactoeState.players[0]){
						tictactoeState.grid[theEvent.cell[1]][theEvent.cell[0]] = "x";
						tictactoeState.updateStatus(theEvent);
						tictactoeState.currentPlayer = tictactoeState.players[1];
					}
					else if(theEvent.userName === tictactoeState.players[1]){
						tictactoeState.grid[theEvent.cell[1]][theEvent.cell[0]] = "o";
						tictactoeState.updateStatus(theEvent);
						tictactoeState.currentPlayer = tictactoeState.players[0];
					}
					return 0;
				}
				else{
					return 1;
				}
			}
			else if(theEvent.eventName === "BadCommand"){
				return 0;
			}
			else{
				return 1;
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