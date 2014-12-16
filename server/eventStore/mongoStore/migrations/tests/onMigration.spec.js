'use strict';

var EventSchema = require('../../eventSchema');
var _ = require('lodash');
var should = require('should');

describe('Migration to change the data structure of the cells', function(done){
	beforeEach(function(done){
		EventSchema.remove().exec();

		EventSchema.create(
		{
			gameId: "123456",
			events: [
				{
					eventName: 'MoveMade',
					userName: 'Gvendurst',
					gameId: '123456',
					timeStamp: '2014-12-02T11:34:29',
					cell: {
						x: 0,
						y: 1
					}
				}
			]
		}, function(err, values){
			if(err){
				throw new Error(err);
			}
			else{
				done();
			}
		});
	});


	it('The migration should update the database correctly', function(done){
		var migrate = require('../changeCellDataStructure').up;

		migrate(function(err, games){
			_.each(games, function(game){
				console.log('game: ', game);
				console.log('game.events[0]: ', game.events[0]);
				should(game.events[0]).have.property('cell');
				should(game.events[0].cell).be.instanceof(Array);
				should(game.events[0].cell[0]).be.exactly(0);
				should(game.events[0].cell[1]).be.exactly(1);
			});
			done();
		});

	});
});