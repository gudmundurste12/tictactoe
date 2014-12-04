var _ = require("lodash");

module.exports = function(eventStore, commandHandler){
	return {
		handleCommand: function(command){
			var history = eventStore.getHistory(command.gameId);
			return commandHandler(history).handleCommand(command);
		}
	};
}