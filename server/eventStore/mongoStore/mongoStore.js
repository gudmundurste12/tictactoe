var Store = require('./eventSchema');
var q = require('q');

module.exports = function(){
	return {
		getHistory: function(gameId){
			var deferred = q.defer();
			console.log("Searching");
			Store.findOne({
				gameId: gameId
			}, function(err, res){
				console.log("Something found");
				if(err){
					console.log("And rejected");
					deferred.reject(err);
				}
				else{
					console.log("And accepted");
					console.log("res: " + JSON.stringify(res));
					if(!res){
						deferred.resolve([]);
					}
					else{
						deferred.resolve(res.events);
					}
				}
			});

			return deferred.promise;
		},
		storeEvents: function(gameId, events){
			var deferred = q.defer();
			Store.findOne({gameId:gameId}, function(err, stream) {
				if(err) {
					deferred.reject(err);
				}
				else if(!stream){
					Store.create({gameId:gameId, events: events}, function(err, thing) {
						if(err) {
							deferred.reject(err);
						}
						console.log("Created stream", thing);
						deferred.resolve(thing);
					});
				}
				else {
					stream.events = stream.events.concat(events);
					console.log("stream.events: ", stream.events);
					stream.save(function(err){
						if(err) {
							deferred.reject(err);
						}
						deferred.resolve(stream.events);
					});
				}
			});
			
			return deferred.promise;
		}
	}
};