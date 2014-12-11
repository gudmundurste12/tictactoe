'use strict';

console.debug = console.log;
var gameDSL = require('../game.dsl');

describe('Tictactoe game play', function() {
	/*
	var page1;
	var page2;
	var game1;
	var game2;
	*/
	var game;
	var page;
	
	beforeEach(function() {
		browser.get('/');
		/*
		page1 = require('../createGame.po');
		page2 = require('../createGame.po');
		game1 = gameDSL(page1);
		game2 = gameDSL(page2);
		*/
		page = require('../createGame.po');
		game = gameDSL(page);
	});

	it('should accept game name and username and create game', function() {
		game.nameOfGame("Cheese!");
		game.nameOfUser("Jerry!");
		game.createGame();
		game.waitForTictactoePage();

		game.nameOfUser("Jerry2!");
		game.joinGame();

		game.nameOfUser("Jerry!");
		game.makeFirstMove();
		game.expectFirstCellValue();

		game.nameOfUser("Jerry2!");
		game.makeSecondMove();
		game.expectSecondCellValue();

		game.nameOfUser("Jerry!");
		game.makeThirdMove();
		game.expectThirdCellValue();

		game.nameOfUser("Jerry2!");
		game.makeFourthMove();
		game.expectFourthCellValue();

		game.nameOfUser("Jerry!");
		game.makeFifthMove();
		game.expectFifthCellValue();

		game.expectGameWonMessage();


		/*
		browser.executeScript('window.open("http://localhost:9000/", "second-window")');
		
		browser.getAllWindowHandles().then(function(handles){
			var originalHandle = handles[0];
			var secondHandle = handles[1];
			//'second-window';

			console.log("HERP: 1");

			browser.switchTo().window(originalHandle).then(function(){
				console.log("HERP: 2");
				game1.nameOfGame("Cheese!");
				game1.nameOfUser("Jerry!");
				game1.createGame();
				game1.waitForTictactoePage();
				//game1.expectGameBoardShowing();
				//game1.expectFirstCellShowing();
				console.log("HERP: 3");
				browser.switchTo().window(secondHandle).then(function(){
					console.log("HERP: 4");
					game2.nameOfGame("Cheese!");
					game2.nameOfUser("Jerry2!");
					game2.joinGame();
					game2.waitForTictactoePage();
					//game2.expectGameBoardShowing();
					//game2.expectFirstCellShowing();			
					console.log("HERP: 5");
					browser.switchTo().window(originalHandle).then(function(){
						console.log("HERP: 6");
						game1.makeFirstMove();
						//game1.expectFirstCellValue();
						console.log("HERP: 7");
						//browser.executeScript("window.close()");
					});
					
				});
				
			});

			console.log("I'm here");
		});
		*/
	});
});