var _ = require("lodash");

module.exports = function(eventStore, commandHandler){
	return {
		handleCommand: function(command){
			console.log("Handling command");
			console.log("eventStore: " + JSON.stringify(eventStore));
			var history = eventStore.getHistory(command.gameId);
			var returnValue = commandHandler(history).handleCommand(command);
			console.log("returnValue: " + returnValue);
			eventStore.storeEvents(command.gameId, returnValue);
			return returnValue;
		}
	};
};