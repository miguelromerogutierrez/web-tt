(function  () {
	
	'use strict';

	function BulletinService ($http, $q) {
		
		var uri = AppConfig.host + "/api/bulletins/list";

		this.getBulletins = getBulletins;
		
		function getBulletins () {
			return $http.get(uri)
					 .then(function  (resp) {
					 	return resp.data;
					 }, function  (err) {
					 	console.error('Error fetching bullets');
					 	return $q.reject(err)
					 });
		}

	}

	angular.module('alertAmberTT')
	.service('BulletinService', ['$http','$q', BulletinService]);

}());