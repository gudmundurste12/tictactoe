var _ = require('lodash');
var q = require('q');


module.exports = function(eventStore, commandHandler){
	return {
		handleCommand : function(cmd){
			var defer = q.defer();
			console.log("cmd: ", cmd);
			setTimeout(function(){
				eventStore.getHistory(cmd.gameId).then(function(eventStream){
					var events = commandHandler(eventStream).executeCommand(cmd);
					setTimeout(function(){
						eventStore.storeEvents(cmd.gameId, events).then(function(){
							defer.resolve(events);
						}, function(err){
							defer.reject(err);
						});
					}, 0);
				});
			}, 0);
			return defer.promise;
		}
	}
}