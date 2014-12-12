'use strict';

var TictactoePage = function() {
	this.container = element(by.css('.container'));
	this.board = this.container.element(by.css('#tictactoeBoard'));
	this.gameMessage = this.board.element(by.css('#gameMessage'));
	this.eventsHeading = this.container.element(by.css('#EventsList'));
};

module.exports = new TictactoePage();