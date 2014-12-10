'use strict';

var TictactoePage = function() {
	this.container = element(by.css('.container'));
	this.board = this.container.element(by.css('#tictactoeBoard'));
	this.x0y0 = this.board.element(by.css('.cell00'));
};

module.exports = new TictactoePage();