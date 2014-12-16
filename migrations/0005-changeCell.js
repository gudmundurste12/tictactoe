
var mongodb = require('mongodb');

exports.up = function(db, next){
	db.events.find({}, function(err, games){
		if(err){
			console.log("Error: ", err);
		}
		else{

			var newCollection = [];
			for(var a = 0; a < games.length; a++){

				var newEvents = [];
				for(var i = 0; i < game[a].events.length; i++){
					if(game[a].events[i].cell)
					{
						newEvents[i] = {
							eventName: game[a].events[i].eventName,
							userName: game[a].events[i].userName,
							gameId: game[a].events[i].gameId,
							cell: [game[a].events[i].cell.x, game[a].events[i].cell.y]
						};
					}
					else{
						newEvents[i] = {
							eventName: game[a].events[i].eventName,
							userName: game[a].events[i].userName,
							gameId: game[a].events[i].gameId
						};
					}
				}

				var newObject = {
					gameId: game[a].gameId,
					events: newEvents
				}

				newCollection.push(newObject);
			} //End for

			db.events.remove().exec();

			db.events = newCollection;

			db.events.save(function(err){
				if(err){
					console.log("error: ", err);
				}
				else{
					console.log("Migration finished");
					next();
				}
			});
		} //End !err
	}); //End find
};

exports.down = function(db, next){
	next();
};
