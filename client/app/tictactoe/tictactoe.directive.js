'use strict';

angular.module('tictactoeApp')
	.directive('tictactoe', function(){
	return {
		template: '<div></div>',
		restrict: 'EA',
		link: function(scope, element){
			element.text('This is the tictactoe directive');
		}
	};
});