var mongoStore = require('../mongoStore');
var should = require('should');
var eventSchema = require('../eventSchema');

describe('Mongo database:', function(){
	beforeEach(function(){
		//Empty the database
		eventSchema.remove().exec();
	});

	/*
	it('getHistory should return an empty array when the database is empty', function(done){
		this.timeout(5000);

		var store = mongoStore();

		store.getHistory('Game1', function(err, values){
			should(values).be.instanceof(Array);
			should(values.length).be.exactly(0);
			done();
		});
	});

	it('getHistory should return array of previously stored events', function(done){
		this.timeout(5000);
		var store = mongoStore();

		store.storeEvents('Game1', [{
			eventName: "GameCreated"
		}]).then(function(){
			store.loadEvents('Game1').then(function(values){
				should(values).eql({
					eventName: "GameCreated"
				});
				should(1).be.exactly(2);
				done();
			});
		});
	});


	it('When events have been stored, new events should be appended to the previously stored events', function(done){
		this.timeout(5000);
		var store = mongoStore();

		store.storeEvents('Game1', [{
			eventName: "GameCreated"
		}]).then(function(){
			store.storeEvents('Game1', [{
				eventName: "GameJoined"
			}]).then(function(){
				store.loadEvents('Game1').then(function(values){
					should(JSON.stringify(values)).be.exactly({
						eventName: "GameCreated"
					},
					{
						eventName: "GameJoined"
					});
					done();
				});
			});
		});
	});
	*/
});