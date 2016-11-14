(function() {
	'use strict';

	function FlowService ($http, $q) {
		
		var BASE_URL = AppConfig.host + '/api/flow';

		var ACTIVATE_DEVICE = '/activate/device';
		var ACTIVATE_BULLETIN = BASE_URL + '/activar';
		var GET_DEVICE_POS = BASE_URL + '/device/position';

		this.activateBulletin = activateBulletin;
		this.getDevicePosition = getDevicePosition;
		this.activateDevice = activateDevice;

		function activateBulletin (data) {
			return $http.post(ACTIVATE_BULLETIN, data)
			.then(function(resp) {
				return resp.data;
			});
		}

		function getDevicePosition (params) {
			return $http.get(GET_DEVICE_POS,{
				params: params
			}).then(function(resp) {
				return resp.data;
			});
		}

		function activateDevice () {
			return $http.get(ACTIVATE_DEVICE);
		}
	}

	angular.module('alertAmberTT')
	.service('FlowService', ['$http','$q', FlowService]);
}());