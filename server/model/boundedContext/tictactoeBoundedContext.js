var _ = require("lodash");

module.exports = function(eventStore, commandHandler){
	return {
		handleCommand: function(command){
			var history = eventStore.getHistory(command.gameId);
			var returnValue = commandHandler(history).handleCommand(command);
			eventStore.storeEvents(command.gameId, returnValue);
			return returnValue;
		}
	};
};