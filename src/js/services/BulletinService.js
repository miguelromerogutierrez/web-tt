(function  () {
	
	'use strict';

	function BulletinService ($http, $q) {
		
		var BASE_URL = AppConfig.host + "/api/bulletins";

		var GET_BULLETINS = BASE_URL + "/list";
		var GET_BULLETIN_BY_CURP = BASE_URL + "/find";

		this.getBulletins = getBulletins;
		this.getBulletinByCurp = getBulletinByCurp;
		
		function getBulletins () {
			return $http.get(GET_BULLETINS)
					 .then(function  (resp) {
					 	return resp.data;
					 }, function  (err) {
					 	return $q.reject(err);
					 });
		}

		function getBulletinByCurp (curp) {
			return $http.get(GET_BULLETIN_BY_CURP + "?curp=" + curp)
				.then(function(resp) {
					return resp.data;
				});
		}
	}

	angular.module('alertAmberTT')
	.service('BulletinService', ['$http','$q', BulletinService]);

}());