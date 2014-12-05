var should = require("should");
var app = require("../../../../app");
var request = require("supertest");


describe("Controller: creating game", function(){
	it("A CreateGame command should give a GameCreated event", function(done){
		var command = {
			commandName: "CreateGame",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var event = {
			eventName: "GameCreated",
			userName: "Gvendurst",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var req = request(app);

		req
		.post("/api/createGame")
		.type("json")
		.send(command)
		.end(function(err, res){
			console.log("Done");
			if(err){
				console.log("err: " + err);
			}
			should(res.body).be.instanceof(Array);
			should(res.body.length).not.be.exactly(0);
			done();
		});
	});
});