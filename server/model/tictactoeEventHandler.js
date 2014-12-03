module.exports = function(history){
	var tictactoeState = require('./tictactoeState');

	console.log("Creating game state");
	var gameState = tictactoeState(history);

	return {
		history: history,

		handleEvent: function(theEvent){
			
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
							this.history = resultEvents;
							return resultEvents;
						}
					}
				}
			}

			var resultEvents = handler[theEvent.commandName](theEvent);

			gameState.history.push(resultEvents);

			return resultEvents;
		}
	};
}