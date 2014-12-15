'use strict';

var should = require('should');

describe('Event database', function(){
	it('Events should be stored in the database', function(){
		var Events = require('../eventSchema');

		var mockGame = {
			gameId: 'Game1',
			events: [{
				eventName: 'GameCreated'
			}]
		};


		Events.create(mockGame, function(err, game){
			if(err){
				return handleError(res, err);
			}
			else{
				should(game._id).not.be.empty;
				return done();
			}
		});
	});
});