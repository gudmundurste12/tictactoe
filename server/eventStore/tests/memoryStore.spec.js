var memoryStore = require('../memoryStore');
var should = require('should');
var q = require('q');

describe('In memory database:', function(){
	it('getHistory should return an empty array when the database is empty', function(done){
		var store = memoryStore();

		/*store.getHistory('Game1', function(err, values){
			should(values).be.instanceof(Array);
			should(values.length).be.exactly(0);
			done();
		});*/
		store.getHistory('Game1').then(function(values){
			should(values).be.instanceof(Array);
			should(values.length).be.exactly(0);
			should(1).be.exactly(2);
			done();
		});
	});
/*
	it('getHistory should return array of previously stored events', function(done){
		var store = memoryStore();

		store.storeEvents('Game1', [{
			eventName: "GameCreated"
		}]).then(function(){
			store.getHistory('Game1').then(function(values){
				should(values).eql({
					eventName: "GameCreated"
				});
				should(1).be.exactly(2);
				done();
			});
		});
	});


	it('When events have been stored, new events should be appended to the previously stored events', function(done){
		var store = memoryStore();

		store.storeEvents('Game1', [{
			eventName: "GameCreated"
		}]).then(function(){
			store.storeEvents('Game1', [{
				eventName: "GameJoined"
			}]).then(function(){
				store.getHistory('Game1').then(function(values){
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
/*
var should = require("should");

describe("Memory store", function(){
	it("Should return an empty array when nothing has been entered into it", function(){
		//Arrange
		var eventStore = require("../memoryStore")();
		var expected = [];

		//Act
		var result = eventStore.getHistory("1");

		//Assert
		should(result).eql(expected);
	});

	it("Should return the same history that was entered into it", function(){
		//Arrange
		var eventStore = require("../memoryStore")();
		var expected = [
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		eventStore.storeEvents("1",
		[{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}]);
		var result = eventStore.getHistory("1");

		//Assert
		should(result).eql(expected);
	});

	it("Should return the correct history for the correct gameId", function(){
		//Arrange
		var eventStore = require("../memoryStore")();
		var expected1 = [
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];
		var expected2 = [
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "2",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		eventStore.storeEvents("1",
		[{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}]);
		var result1 = eventStore.getHistory("1");
		eventStore.storeEvents("2",
		[{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "2",
			timeStamp: "2014-12-02T11:29:29"
		}]);
		var result2 = eventStore.getHistory("2");

		//Assert
		should(result1).eql(expected1);
		should(result2).eql(expected2);
	});
});
*/