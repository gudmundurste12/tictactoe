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

	eventStore.setHistory = function(gameId, history){
		eventStore.store[gameId] = history;
	};

	return eventStore;
}