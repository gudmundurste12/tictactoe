describe("Controller: tictactoeController", function(){
	//Set up everything for the tests

	beforeEach(module("tictactoeApp"));

	var tictactoeController, scope, httpBackend, http;

	beforeEach(inject(function($injector, $controller, $rootScope, $http){
		http = $http;
		httpBackend = $injector.get("$httpBackend");
		scope = $rootScope.$new();

		tictactoeController = $controller("tictactoeController", {
			$scope: scope
		});
	}));

	afterEach(function(){
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("The list of events should be updated on CreateGame", function(){
		httpBackend.expectPOST("/api/createGame/",
		{
			gameId: "1",
			commandName: "CreateGame",
			userName: "Gvendurst",
			timeStamp: "2014-12-02T11:29:29"
		}).respond(
		{
			response: [
				{}
			]
		});

		scope.gameId = "1";
		scope.userName = "Gvendurst";

		scope.createGame();
		httpBackend.flush();

		expect(scope.events.length).toBe(1);
		expect(scope.events[0]).to.equal({});
	});
});