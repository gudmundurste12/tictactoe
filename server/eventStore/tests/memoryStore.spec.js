var should = require("should");

describe("Memory store", function(){
	it("Should return an empty array when nothing has been entered into it", function(){
		//Arrange
		var eventStore = require("../memoryStore");
		var expected = [];

		//Act
		var result = eventStore().getHistory("1");

		//Assert
		should(result).eql(expected);
	});

	it("Should return the same history that was entered into it", function(){
		//Arrange
		var eventStore = require("../memoryStore");
		var expected = [
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		}];

		//Act
		eventStore().setHistory("1",
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		});
		var result = eventStore().getHistory("1");

		//Assert
		should(result).eql(expected);
	});

	it("Should return the correct history for the correct gameId", function(){
		//Arrange
		var eventStore = require("../memoryStore");
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
		eventStore().setHistory("1",
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		});
		var result1 = eventStore().getHistory("1");
		eventStore().setHistory("2",
		{
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "2",
			timeStamp: "2014-12-02T11:29:29"
		});
		var result2 = eventStore().getHistory("2");

		//Assert
		should(result1).eql(expected1);
		should(result2).eql(expected2);
	});
});