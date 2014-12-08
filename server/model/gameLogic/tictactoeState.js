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
			if(currentEvent.eventName === "GameCreated"
				&& currentEvent.userName === userName){
				returnValue = true;
			}
		});
		return returnValue;
	}	

	tictactoeState.insideGrid = function(cell){
		return cell.x < 3 && cell.x >=  0 && cell.y < 3 && cell.y >=  0;
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

	tictactoeState.canMakeMove = function(cell){
		if(tictactoeState.status.status === "Unresolved"
			&& tictactoeState.grid[cell.x][cell.y] === ""
			&& tictactoeState.insideGrid(cell)){
			console.log("Status.status: " + tictactoeState.status.status);
			console.log("grid[x][y]: " + tictactoeState.grid[cell.x][cell.y]);
			console.log("insideGrid: " + tictactoeState.insideGrid(cell));
			return true;
		}
		else{
			console.log("Status.status: " + tictactoeState.status.status);
			console.log("grid[x][y]: " + tictactoeState.grid[cell.x][cell.y]);
			console.log("insideGrid: " + tictactoeState.insideGrid(cell));
			return false;
		}
	}

	tictactoeState.getStatus = function(){
		return tictactoeState.status;
	};

	tictactoeState.updateStatus = function(theEvent){
		var win = false;
		win |= tictactoeState.winOnLineVertical(theEvent.cell.x);
		win |= tictactoeState.winOnLineHorizontal(theEvent.cell.y);
		win |= tictactoeState.winOnLineDiagonalDown();
		win |= tictactoeState.winOnLineDiagonalUp();

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
				rc |= tictactoeState.updateGrid(currentEvent);
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
				if(tictactoeState.insideGrid(theEvent.cell)
					&& tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] === ""
					&& tictactoeState.status.status === "Unresolved"){
					if(theEvent.userName === tictactoeState.players[0]){
						tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] = "x";
						tictactoeState.updateStatus(theEvent);
						tictactoeState.currentPlayer = tictactoeState.players[1];
					}
					else if(theEvent.userName === tictactoeState.players[1]){
						tictactoeState.grid[theEvent.cell.y][theEvent.cell.x] = "o";
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