module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	console.log("Creating game state");
	var gameState = tictactoeState(history);

	var eventHandler = {};

	eventHandler.handleEvent = function(theEvent){
		
		var handler = {
			"CreateGame": function(theEvent){
				if(history.length === 0){
					if(theEvent.userName !== null){
						resultEvents = [
						{
							eventName: "GameCreated",
							userName: theEvent.userName,
							timeStamp: theEvent.timeStamp
						}];
						return resultEvents;
					}
				}
				else{
					resultEvents = [
					{
						eventName: "BadCommand",
						event: theEvent,
						history: history
					}];
					return resultEvents;
				}
			}
		}

		var resultEvents = handler[theEvent.commandName](theEvent);

		return resultEvents;
	};


	return eventHandler;
}