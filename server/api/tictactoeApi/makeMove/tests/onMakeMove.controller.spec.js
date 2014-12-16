var should = require("should");
var app = require("../../../../app");
var request = require("supertest");


describe("Controller: Making move", function(){
	it("A JoinGame command should return a list of events", function(done){
		var command = {
			commandName: "MakeMove",
			userName: "Gvendurst1",
			gameId: "1",
			timeStamp: "2014-12-02T11:29:29",
			cell: [1,1]
		};

		var req = request(app);

		req
		.post("/api/joinGame")
		.type("json")
		.send(command)
		.end(function(err, res){
			if(err){
				console.log("err: " + err);
			}
			should(res.body).be.instanceof(Array);
			should(res.body.length).not.be.exactly(0);
			done();
		});
	});
});