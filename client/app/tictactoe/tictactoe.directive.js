'use strict';

angular.module('tictactoeApp')
	.directive('tictactoe', function(){
	return {
		restrict: 'EA',
		link: function(scope, element, attrs){
			element.text('This is the tictactoe directive');
		}
	};
});