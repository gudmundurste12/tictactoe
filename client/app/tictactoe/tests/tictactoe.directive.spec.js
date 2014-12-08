'use strict';

describe('Directive: tictactoe', function(){
	//Set up everything for the tests

	beforeEach(module('tictactoeApp'));

	var scope;

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));
});