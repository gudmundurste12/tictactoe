var express = require("express");

var controller = require("../tictactoe.controller");

module.exports = function(app){
	var router = express.Router();

	router.post("/", controller.handleCommand);

	return {
		router: router
	}
}