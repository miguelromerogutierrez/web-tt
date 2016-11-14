(function() {
	'use strict';

	function OfficerService ($http, $q) {
		
		var BASE_URL = AppConfig.host + '/api/officer';

		var GET_LIST_OFFICER = BASE_URL + '/list/inactive';
		var ADD_OFFICER = BASE_URL + '/add';

		this.getListOfficers = getListOfficers;
		this.addOfficer = addOfficer;

		function getListOfficers (params) {
			return $http.get(GET_LIST_OFFICER, {
				params: params
			})
			.then(function(resp) {
				return resp.data;
			});
		}

		function addOfficer (data) {
			return $http.post(ADD_OFFICER, JSON.stringify(data))
			.then(function(resp) {
				return resp.data;
			});
		}
	}

	angular.module('alertAmberTT')
	.service('OfficerService', ['$http','$q', OfficerService]);
}());