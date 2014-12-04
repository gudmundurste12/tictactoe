module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	var gameState = tictactoeState(history);

	var eventHandler = {};

	var missingValue = function(value){
		return value === undefined || value === null;
	}

	var badCommand = function(message, event, history){
		return {
			eventName: "BadCommand",
			event: event,
			history: history,
			gameId: event.gameId,
			message: message
		}
	};

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
							badCommand("Some fields are missing", theEvent, history)
						];
						return resultEvents;	
					}
				}
				else{
					var resultEvents = [
						badCommand("Game has already been created", theEvent, history)
					];
					return resultEvents;
				}
			},

			"JoinGame": function(theEvent){
				if(history.length === 0){
					var resultEvents = [
						badCommand("Game has not been created", theEvent, history)
					];
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
									badCommand("Some fields are missing", theEvent, history)
								];
								return resultEvents;
							}
						}
						else{
							var resultEvents = [
								badCommand("This user created the game", theEvent, history)
							];
							return resultEvents;
						}
					}
					else{
						var resultEvents = [
							badCommand("Game is full", theEvent, history)
						];
						return resultEvents;
					}
				}
			},

			//TODO: Should this check for a legal move and game won?
			"MakeMove": function(theEvent){
				if(history.length === 0){
					var resultEvents = [
						badCommand("Game has not been created", theEvent, history)
					];
					return resultEvents;
				}
				else if(history.length === 1){
					var resultEvents = [
						badCommand("Game has not been joined", theEvent, history)
					];
					return resultEvents;
				}
				else{
					if(!missingValue(theEvent.userName)
						&& !missingValue(theEvent.gameId)
						&& !missingValue(theEvent.cell)){
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
							badCommand("Some fields are missing", theEvent, history)
						];
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