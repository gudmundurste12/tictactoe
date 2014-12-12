module.exports = function(page){
	var tictactoe;
	var assertWait = 3000;
	var cells = ['.cell00', '.cell02', '.cell11', '.cell20', '.cell22'];


	function nameOfGame(gameName) {
		page.gameName.clear();
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

	function makeMove(moveNumber){
		browser.sleep(500);
		tictactoe.board.element(by.css(cells[moveNumber])).click();
	}

	function expectCellValue(moveNumber, expectedValue){
		browser.sleep(assertWait - 500);
		expect(tictactoe.board.element(by.css(cells[moveNumber])).getText()).toBe(expectedValue);
	}

	function expectGameWonMessage(){
		browser.sleep(assertWait);
		expect(tictactoe.gameMessage.getText()).toBe('Jerry! won');
	}

	return {
		nameOfGame: nameOfGame,
		nameOfUser: nameOfUser,
		createGame: createGame,
		joinGame: joinGame,
		waitForTictactoePage: waitForTictactoePage,
		expectGameBoardShowing: expectGameBoardShowing,
		expectFirstCellShowing: expectFirstCellShowing,
		makeMove: makeMove,
		expectCellValue: expectCellValue,
		expectGameWonMessage: expectGameWonMessage
	}
};