'use strict';

var CreateGamePage = function(){
	this.container = element(by.css('.container'));
	this.gameName = this.container.element(by.css('#gameId'));
	this.userName = this.container.element(by.css('#userName'));
	this.createGameButton = this.container.element(by.css('#createGame'));
};

module.exports = new CreateGamePage();