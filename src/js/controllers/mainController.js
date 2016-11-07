(function  () {
	
	'use strict';

	function MainController ($scope, Bulletins) {
		$scope.bulletins = Bulletins;
		
	}

	angular.module('alertAmberTT')
	.controller('MainController', ['$scope','Bulletins', MainController]);

}());