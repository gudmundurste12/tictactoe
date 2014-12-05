var should = require("should");
var app = require("../../../../app");
var request = require("supertest");


describe("Controller: creating game", function(){
	it("The result should be a JSON array", function(done){
		var req = request(app);

		req
		.post("/api/createGame")
		.type("json")
		.send({})
		.end(function(err, res){
			console.log("Done");
			if(err){
				console.log("err: " + err);
			}
			res.body.should.be.exactly("HERP");
			done();
		});
	});
});