(function  () {

	'use strict';

	angular.module('alertAmberTT',[
		'ui.router',
		'ui.bootstrap',
		'vsGoogleAutocomplete',
		'uiGmapgoogle-maps'
	]);

	angular.module('alertAmberTT')
	.config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyCggPDtR1fG9RQD65s6EURSgJQU5euzuqA'
		});
	}])
}());