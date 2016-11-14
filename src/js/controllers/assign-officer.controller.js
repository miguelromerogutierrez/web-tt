(function() {
	'use strict';

	function AssignOfficerCtrl ($scope, $uibModalInstance, officer) {
		$scope.officer = officer;
		$scope.confirm = confirm

		function confirm (flag) {
			$uibModalInstance.close(flag);
		}
	}

	angular.module('alertAmberTT')
	.controller('AssignOfficerCtrl', ['$scope', '$uibModalInstance', AssignOfficerCtrl]);
}());