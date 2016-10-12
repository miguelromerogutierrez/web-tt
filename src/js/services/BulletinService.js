(function  () {
	
	'use strict';

	function BulletinService ($http, $q) {
		
		var uri = "http://192.168.0.23:8080/AlertAmberTT/api/bulletins";

		this.getBulletins = function  () {
			return $http.get(uri)
					 .then(function  (resp) {
					 	return resp.data;
					 }, function  (err) {
					 	console.error('Error fetching bullets');
					 	return $q.reject(err)
					 });
		};

	}

	angular.module('alertAmberTT')
	.service('BulletinService', ['$http','$q', BulletinService]);

}());