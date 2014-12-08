_ = require("lodash");

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