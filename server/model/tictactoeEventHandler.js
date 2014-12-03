module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	var gameState = tictactoeState(history);

	var eventHandler = {};

	eventHandler.handleEvent = function(theEvent){
		
		var handler = {
			"CreateGame": function(theEvent){
				if(history.length === 0){
					if(theEvent.userName !== null){
						var resultEvents = [
						{
							eventName: "GameCreated",
							userName: theEvent.userName,
							timeStamp: theEvent.timeStamp
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
						message: "Game has not been created"
					}];
					return resultEvents;
				}
				else{
					if(gameState.joinable() === true){
						console.log("Joinable");
						if(theEvent.userName !== null){
							var resultEvents = [
							{
								eventName: "GameJoined",
								userName: theEvent.userName,
								timeStamp: theEvent.timeStamp
							}];
							return resultEvents;
						}
					}
					else{
						console.log("Not joinable");
						var resultEvents = [
						{
							eventName: "BadCommand",
							event: theEvent,
							history: history,
							message: "Game is full"
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