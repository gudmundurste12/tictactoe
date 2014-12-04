//TODO: Comment the code, and soon
module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	var gameState = tictactoeState(history);

	var commandHandler = {};

	var missingValue = function(value){
		return value === undefined || value === null;
	}

	var badCommand = function(message, command, history){
		return {
			eventName: "BadCommand",
			command: command,
			history: history,
			gameId: command.gameId,
			message: message
		}
	};

	commandHandler.handleCommand = function(theCommand){
		
		var handler = {
			"CreateGame": function(theCommand){
				if(history.length === 0){
					if(!missingValue(theCommand.userName) &&
						!missingValue(theCommand.gameId)){
						var resultEvents = [
						{
							eventName: "GameCreated",
							userName: theCommand.userName,
							gameId: theCommand.gameId,
							timeStamp: theCommand.timeStamp
						}];
						return resultEvents;
					}
					else{
						var resultEvents = [
							badCommand("Some fields are missing", theCommand, history)
						];
						return resultEvents;	
					}
				}
				else{
					var resultEvents = [
						badCommand("Game has already been created", theCommand, history)
					];
					return resultEvents;
				}
			},

			"JoinGame": function(theCommand){
				if(history.length === 0){
					var resultEvents = [
						badCommand("Game has not been created", theCommand, history)
					];
					return resultEvents;
				}
				else{
					if(gameState.joinable() === true){
						if(!gameState.createdBy(theCommand.userName)){
							if(!missingValue(theCommand.gameId)
								&& !missingValue(theCommand.userName)){
								var resultEvents = [
								{
									eventName: "GameJoined",
									userName: theCommand.userName,
									gameId: theCommand.gameId,
									timeStamp: theCommand.timeStamp
								}];
								return resultEvents;
							}
							else{
								var resultEvents = [
									badCommand("Some fields are missing", theCommand, history)
								];
								return resultEvents;
							}
						}
						else{
							var resultEvents = [
								badCommand("This user created the game", theCommand, history)
							];
							return resultEvents;
						}
					}
					else{
						var resultEvents = [
							badCommand("Game is full", theCommand, history)
						];
						return resultEvents;
					}
				}
			},

			//TODO: Should this check for a legal move and game won?
			"MakeMove": function(theCommand){
				if(history.length === 0){
					var resultEvents = [
						badCommand("Game has not been created", theCommand, history)
					];
					return resultEvents;
				}
				else if(history.length === 1){
					var resultEvents = [
						badCommand("Game has not been joined", theCommand, history)
					];
					return resultEvents;
				}
				else{
					if(!missingValue(theCommand.userName)
						&& !missingValue(theCommand.gameId)
						&& !missingValue(theCommand.cell)){
						var resultEvents = [
						{
							eventName: "MoveMade",
							userName: theCommand.userName,
							gameId: theCommand.gameId,
							timeStamp: theCommand.timeStamp,
							cell: theCommand.cell
						}];
						return resultEvents;
					}
					else{
						var resultEvents = [
							badCommand("Some fields are missing", theCommand, history)
						];
						return resultEvents;
					}
				}
			}
		}

		var resultEvents = handler[theCommand.commandName](theCommand);

		return resultEvents;
	};


	return commandHandler;
}