(function  () {
	
	'use strict';

	function AddOfficerCtrl ($scope, OfficerService) {
		$scope.officer = {
			name: '',
			plate: ''
		}
		$scope.add = add;

		function add () {
			OfficerService.addOfficer($scope.officer)
			.then(function(resp) {
				$scope.officer = {
					name: '',
					plate: ''
				};
			});
		}
	}

	angular.module('alertAmberTT')
	.controller('AddOfficerCtrl', ['$scope','OfficerService', AddOfficerCtrl]);

}());