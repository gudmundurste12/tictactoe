var _ = require('lodash');
var q = require('q');


module.exports = function(eventStore, commandHandler){
	return {
		handleCommand : function(cmd){
			var defer = q.defer();
			eventStore.getHistory(cmd.gameId).then(function(eventStream){
				var events = commandHandler(eventStream).handleCommand(cmd);
				eventStore.storeEvents(cmd.gameId, events).then(function(){
					defer.resolve(events);
				}, function(err){
					defer.reject(err);
				});
			});
			return defer.promise;
		}
	}
}