(function  () {
	
	'use strict';

	function MainController ($scope, BulletinService) {
		
		BulletinService.getBulletins().
		then(function  (data) {
			console.log(data);
		});
	}

	angular.module('alertAmberTT')
	.controller('MainController', ['$scope','BulletinService', MainController]);

}());