var Store = require('./eventSchema');
var q = require('q');

module.exports = function(){
	return {
		getHistory: function(gameId){
			var deferred = q.defer();
			Store.find({
				gameId: gameId
			}, function(err, res){
				if(err){
					deferred.reject(err);
				}
				else{
					deferred.resolve(res);
				}
			});

			return deferred.promise;
		},
		storeEvents: function(gameId, events){
			var deferred = q.defer();

			Store.find({
				gameId: gameId
			}, function(err, res){
				if(err){
					deferred.reject(err);
				}
				else if(!res.events){
					Store.create({
						gameId: gameId,
						events: events
					},
					function(err, res2){
						if(err){
							deferred.reject(err);
						}
						else{
							deferred.resolve(res2);
						}
					});
				}
				else{
					res.events = res.events.concat(events);

					res.save(function(err){
						if(err){
							deferred.reject(err);
						}
						else{
							deferred.resolve(res.events);
						}
					});
				}
			});

			return deferred.promise;
		}
	}
};