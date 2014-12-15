'use strict';

console.debug = console.log;
var gameDSL = require('../game.dsl');

describe('Tictactoe game play', function() {
	var game;
	var page;
	
	beforeEach(function() {
		browser.get('/');
		page = require('../createGame.po');
		game = gameDSL(page);
	});

	it('should accept game name and username and create game', function() {
		

		game.nameOfGame("Cheese!");
		game.nameOfUser("Jerry!");
		game.createGame();
		game.waitForTictactoePage();



		game.nameOfGame("Cheese!");
		game.nameOfUser("Jerry2!");
		game.joinGame();

		game.nameOfUser("Jerry!");
		game.makeMove(0);
		game.expectCellValue(0, 'x');

		game.nameOfUser("Jerry2!");
		game.makeMove(1);
		game.expectCellValue(1, 'o');

		game.nameOfUser("Jerry!");
		game.makeMove(2);
		game.expectCellValue(2, 'x');

		game.nameOfUser("Jerry2!");
		game.makeMove(3);
		game.expectCellValue(3, 'o');

		game.nameOfUser("Jerry!");
		game.makeMove(4);
		game.expectCellValue(4, 'x');
		

		game.expectGameWonMessage();

	});
});