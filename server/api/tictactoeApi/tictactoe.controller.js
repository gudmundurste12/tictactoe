exports.handleCommand = function(req, res){
	console.log("In the controller");
	var returnValue = [{}];
	res.json(returnValue);
};