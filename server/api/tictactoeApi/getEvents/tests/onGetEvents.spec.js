var should = require("should");
var app = require("../../../../app");
var request = require("supertest");


describe("Controller: getting all events for a game: ", function(){
	it("A call to /api/getEvents should return an array of events", function(done){
		var payload = {
			gameId: "1"
		};

		var req = request(app);

		req
		.post("/api/getEvents")
		.type("json")
		.send(payload)
		.end(function(err, res){
			console.log("Done");
			if(err){
				console.log("err: " + err);
			}
			console.log(JSON.stringify(res.body));
			should(res.body).be.instanceof(Array);
			done();
		});
	});
});