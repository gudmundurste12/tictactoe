module.exports = function(page){
	var tictactoe;
	var assertWait = 3000;

	function nameOfGame(gameName) {
		page.gameName.sendKeys(gameName);
	}

	function nameOfUser(userName) {
		page.userName.clear();
		page.userName.sendKeys(userName);
	}

	function createGame() {
		page.createGameButton.click();
	}

	function joinGame() {
		page.joinGameButton.click();
	}
	
	function waitForTictactoePage() {
		browser.waitForAngular();
		console.log("Done waiting for angular");
		tictactoe = require('./tictactoe.po');		
	}

	function expectGameBoardShowing() {
		expect(tictactoe.board).toBeDefined();
	}

	function expectFirstCellShowing() {
		expect(tictactoe.player1Cell1).toBeDefined();
	}

	function makeFirstMove(){
		tictactoe.player1Cell1.click();
	}
	
	function expectFirstCellValue(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.player1Cell1.getText()).toBe('x');
		//}, assertWait);
	}

	function makeSecondMove(){
		tictactoe.player2Cell1.click();
	}
	
	function expectSecondCellValue(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.player2Cell1.getText()).toBe('o');
		//}, assertWait);
	}

	function makeThirdMove(){
		tictactoe.player1Cell2.click();
	}
	
	function expectThirdCellValue(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.player1Cell2.getText()).toBe('x');
		//}, assertWait);
	}

	function makeFourthMove(){
		tictactoe.player2Cell2.click();
	}
	
	function expectFourthCellValue(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.player2Cell2.getText()).toBe('o');
		//}, assertWait);
	}

	function makeFifthMove(){
		tictactoe.player1Cell3.click();
	}
	
	function expectFifthCellValue(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.player1Cell3.getText()).toBe('x');
		//}, assertWait);
	}

	function expectGameWonMessage(){
		browser.sleep(assertWait);
		//setTimeout(function(){
			expect(tictactoe.gameMessage.getText()).toBe('Jerry! won');
		//}, assertWait);
	}

	return {
		nameOfGame: nameOfGame,
		nameOfUser: nameOfUser,
		createGame: createGame,
		joinGame: joinGame,
		waitForTictactoePage: waitForTictactoePage,
		expectGameBoardShowing: expectGameBoardShowing,
		expectFirstCellShowing: expectFirstCellShowing,
		makeFirstMove: makeFirstMove,
		expectFirstCellValue: expectFirstCellValue,
		makeSecondMove: makeSecondMove,
		expectSecondCellValue: expectSecondCellValue,
		makeThirdMove: makeThirdMove,
		expectThirdCellValue: expectThirdCellValue,
		makeFourthMove: makeFourthMove,
		expectFourthCellValue: expectFourthCellValue,
		makeFifthMove: makeFifthMove,
		expectFifthCellValue: expectFifthCellValue,
		expectGameWonMessage: expectGameWonMessage
	}
};