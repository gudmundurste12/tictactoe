exports.handleCommand = function(req, res){
	console.log("In the controller");
	var returnValue = "HERP";
	res.json(returnValue);
};