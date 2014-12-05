module.exports = function(){
	var eventStore = {};

	eventStore.getHistory = function(gameId){
		if(!gameId){
			throw new Error("Parameter required");
		}
		return [];
	};

	eventStore.setHistory = function(gameId){

	};

	return eventStore;
}