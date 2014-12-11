'use strict';

var TictactoePage = function() {
	this.container = element(by.css('.container'));
	this.board = this.container.element(by.css('#tictactoeBoard'));
	this.player1Cell1 = this.board.element(by.css('.cell00'));
	this.player1Cell2 = this.board.element(by.css('.cell11'));
	this.player1Cell3 = this.board.element(by.css('.cell22'));
	this.player2Cell1 = this.board.element(by.css('.cell02'));
	this.player2Cell2 = this.board.element(by.css('.cell20'));
	this.gameMessage = this.board.element(by.css('#gameMessage'));
	this.eventsHeading = this.container.element(by.css('#EventsList'));
};

module.exports = new TictactoePage();