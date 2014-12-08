var should = require("should");
var app = require("../../../../app");
var request = require("supertest");


describe("Controller: joining game", function(){
	it("A JoinGame command should return a list of events", function(done){
		var command = {
			commandName: "JoinGame",
			userName: "Gvendurst2",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29"
		};

		var req = request(app);

		req
		.post("/api/joinGame")
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