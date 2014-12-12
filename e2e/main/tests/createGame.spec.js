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



/*
browser.getAllWindowHandles().then(function(handles){

			var originalHandle = handles[0];
			var secondHandle = 'second-handle';
			browser.executeScript('window.open("http://localhost:9000/", "' + secondHandle + '");');

			console.log("Testing: 1");
			browser.switchTo().window(secondHandle).then(function(){
				console.log("Testing: 2");
				game.nameOfGame("Cheese!");
				console.log("Testing: 3");
				game.nameOfUser("Jerry2!");
				console.log("Testing: 4");
				game.joinGame();

				console.log("Testing: 5");
				browser.switchTo().window(originalHandle).then(function(){
					browser.driver.wait(function () {
						console.log("Waiting: 1");
						return browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function (el) {
							console.log("Waiting: 2");
							return el === true;
						});
					}).then(function () {

						console.log("Testing: 6");
						//game.nameOfUser("Jerry!");
						game.makeMove(0);
						console.log("Testing: 7");
						game.expectCellValue(0, 'x');
						console.log("Testing: 8");

						browser.switchTo().window(secondHandle).then(function(){
							browser.driver.wait(function () {
								console.log("Waiting: 3");
								return browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function (el) {
									console.log("Waiting: 4");
									return el === true;
								});
							}).then(function () {
								console.log("Testing: 9");
								//game.nameOfUser("Jerry2!");
								game.makeMove(1);
								console.log("Testing: 10");
								game.expectCellValue(1, 'o');

								console.log("Testing: 11");
								browser.switchTo().window(originalHandle).then(function(){
									browser.driver.wait(function () {
										console.log("Waiting: 5");
										return browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function (el) {
											console.log("Waiting: 6");
											return el === true;
										});
									}).then(function () {
										console.log("Testing: 12");
										//game.nameOfUser("Jerry!");
										game.makeMove(2);
										console.log("Testing: 13");
										game.expectCellValue(2, 'x');

										console.log("Testing: 14");
										browser.switchTo().window(secondHandle).then(function(){
											browser.driver.wait(function () {
												console.log("Waiting: 7");
												return browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function (el) {
													console.log("Waiting: 8");
													return el === true;
												});
											}).then(function () {
												console.log("Testing: 15");
												//game.nameOfUser("Jerry2!");
												game.makeMove(3);
												console.log("Testing: 16");
												game.expectCellValue(3, 'o');
												console.log("Testing: 17");
												browser.switchTo().window(originalHandle).then(function(){
													browser.driver.wait(function () {
														console.log("Waiting: 9");
														return browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function (el) {
															console.log("Waiting: 10");
															return el === true;
														});
													}).then(function () {
														console.log("Testing: 18");
														//game.nameOfUser("Jerry!");
														game.makeMove(4);
														console.log("Testing: 19");
														game.expectCellValue(4, 'x');
														
														console.log("Testing: 20");
														game.expectGameWonMessage();
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
*/