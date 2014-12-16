var mongodb = require('mongodb');
var EventSchema = require('../eventSchema');
var _ = require('lodash');

exports.up = function(done){
	EventSchema.find({}, function(err, games){
		if(err){
			done(err);
		}
		else{

			_.each(games, function(game){
				_.each(game.events, function(event){
					if(event.cell){
						event.cell = [event.cell.x, event.cell.y];

					}
				});

				game.markModified('events');
				game.save(function(err){
					console.log('Error: ', err);
				});
			});
			
			//Finished correctly
			return done(undefined, games);
		} //End !err
	}); //End find
};

exports.down = function(db, next){
	next();
};
