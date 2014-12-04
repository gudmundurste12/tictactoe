module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	var gameState = tictactoeState(history);

	var eventHandler = {};

	var missingValue = function(value){
		return value === undefined || value === null;
	}

	eventHandler.handleEvent = function(theEvent){
		
		var handler = {
			"CreateGame": function(theEvent){
				if(history.length === 0){
					if(!missingValue(theEvent.userName) &&
						!missingValue(theEvent.gameId)){
						var resultEvents = [
						{
							eventName: "GameCreated",
							userName: theEvent.userName,
							gameId: theEvent.gameId,
							timeStamp: theEvent.timeStamp
						}];
						return resultEvents;
					}
					else{
						var resultEvents = [
						{
							eventName: "BadCommand",
							event: theEvent,
							history: history,
							gameId: theEvent.gameId,
							message: "Some fields are missing"
						}];
						return resultEvents;	
					}
				}
				else{
					var resultEvents = [
					{
						eventName: "BadCommand",
						event: theEvent,
						history: history,
						gameId: theEvent.gameId,
						message: "Game has already been created"
					}];
					return resultEvents;
				}
			},

			"JoinGame": function(theEvent){
				if(history.length === 0){
					var resultEvents = [
					{
						eventName: "BadCommand",
						event: theEvent,
						history: history,
						gameId: theEvent.gameId,
						message: "Game has not been created"
					}];
					return resultEvents;
				}
				else{
					if(gameState.joinable() === true){
						if(!gameState.createdBy(theEvent.userName)){
							if(!missingValue(theEvent.gameId)
								&& !missingValue(theEvent.userName)){
								var resultEvents = [
								{
									eventName: "GameJoined",
									userName: theEvent.userName,
									gameId: theEvent.gameId,
									timeStamp: theEvent.timeStamp
								}];
								return resultEvents;
							}
							else{
								var resultEvents = [
								{
									eventName: "BadCommand",
									event: theEvent,
									history: history,
									gameId: theEvent.gameId,
									message: "Some fields are missing"
								}];
								return resultEvents;
							}
						}
						else{
							var resultEvents = [
							{
								eventName: "BadCommand",
								event: theEvent,
								history: history,
								gameId: theEvent.gameId,
								message: "This user created the game"
							}];
							return resultEvents;
						}
					}
					else{
						var resultEvents = [
						{
							eventName: "BadCommand",
							event: theEvent,
							history: history,
							gameId: theEvent.gameId,
							message: "Game is full"
						}];
						return resultEvents;
					}
				}
			},

			//TODO: Should this check for a legal move and game won?
			"MakeMove": function(theEvent){
				if(history.length === 0){
					var resultEvents = [
					{
						eventName: "BadCommand",
						event: theEvent,
						history: history,
						gameId: theEvent.gameId,
						message: "Game has not been created"
					}];
					return resultEvents;
				}
				else if(history.length === 1){
					var resultEvents = [
					{
						eventName: "BadCommand",
						event: theEvent,
						history: history,
						gameId: theEvent.gameId,
						message: "Game has not been joined"
					}];
					return resultEvents;
				}
				else{
					if(!missingValue(theEvent.userName)
						&& !missingValue(theEvent.gameId)
						&& !missingValue(theEvent.cell.x)
						&& !missingValue(theEvent.cell.y)){
						var resultEvents = [
						{
							eventName: "MoveMade",
							userName: theEvent.userName,
							gameId: theEvent.gameId,
							timeStamp: theEvent.timeStamp,
							cell: theEvent.cell
						}];
						return resultEvents;
					}
					else{
						var resultEvents = [
						{
							eventName: "BadCommand",
							event: theEvent,
							history: history,
							gameId: theEvent.gameId,
							message: "Some values are missing"
						}];
						return resultEvents;
					}
				}
			}
		}

		var resultEvents = handler[theEvent.commandName](theEvent);

		return resultEvents;
	};


	return eventHandler;
}