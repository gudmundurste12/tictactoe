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


});