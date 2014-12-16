var q = require('q');

module.exports = function(){
	var store = {};
	return {
		getHistory: function(id){
			var deferred = q.defer();
			deferred.resolve(store[id] || []);
			return deferred.promise;
		},
		storeEvents: function(id, events){
			var deferred = q.defer();
			store[id] = (store[id] || []).concat(events);
			deferred.resolve(store[id]);
			return deferred.promise;
		}
	}
}
/*
module.exports = function(){
	var eventStore = {};

	eventStore.store = {};

	eventStore.getHistory = function(gameId){
		if(!gameId){
			throw new Error("Parameter required");
		}
		
		if(!eventStore.store[gameId]){
			return [];
		}
		else{
			return eventStore.store[gameId];
		}
	};

	eventStore.storeEvents = function(id, events){
		eventStore.store[id] = (eventStore.store[id] || []).concat(events);
	};
	
	return eventStore;
}
*/