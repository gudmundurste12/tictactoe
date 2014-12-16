var memoryStore = require('../memoryStore');
var should = require('should');


describe('In memory store', function() {
	beforeEach(function(){
		memoryStore.store = {};
	});

	it('Should return empty array for unknown id', function() {
		var store = memoryStore();
		store.getHistory('12345').then(function(err, loadedEvents){
			should(loadedEvents.length).be.exactly(0);
			should(loadedEvents).be.instanceof(Array);
		}, function(err){
			should.assert.fail('Load events failure!', err);
		});
	});

	it('Should return events previously stored', function(done) {
		this.timeout(5000);
		var store = memoryStore();
		store.storeEvents('1234', [{"testField":"1"}]).then(function(){
			store.getHistory('1234').then(function(loadedEvents){
				try {
					should(loadedEvents[0].testField).be.exactly('1');
				} 
				catch (e) {
					return done(e);
				}
				done();
			}, function(err){
			});
		}, function(err){
		});
	});

	it('should append stored events to events previously stored',function(done){
		this.timeout(5000);
		var store = memoryStore();
		store.storeEvents('12345', [{"testField":"3"}]).then(function(){
			setTimeout(function(){
				store.storeEvents('12345', [{"testField":"4"}]).then(function(){
					setTimeout(function(){
						store.getHistory('12345').then(function(loadedEvents){
							try {
								should(loadedEvents[0].testField).be.exactly('3');
								should(loadedEvents[1].testField).be.exactly('4');
							}
							catch (e) {
								return done(e);
							}
							done();
						});
					}, 0);
				});
			}, 0);
		});
	});
});