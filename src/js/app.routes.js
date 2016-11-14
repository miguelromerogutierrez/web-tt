(function() {
	'use strict';

	function AppRoutes ($stateProvider, $locationProvider) {
		$stateProvider
		.state('home',
		{
			url: '/',
			templateUrl: 'views/partials/dashboard.html',
			controller: 'MainController',
			resolve: {
				'Bulletins': ['BulletinService', function (BulletinService) {
					return BulletinService.getBulletins()
							.then(function(data) {
								return data.bulletins;
							});
				}]
			}
		})
		.state('findRegister',
			{
				url: '/find',
				templateUrl: 'views/partials/find-register.html',
				controller: 'FindRegisterCtrl'
			})
		.state('bulletin',
			{
				url: '/bulletin',
				templateUrl: 'views/partials/bulletin.html',
				controller: 'BulletinCtrl'
			})
		.state('listPoliceofficer',
		{
			url: '/list-officers',
			templateUrl: 'views/partials/list-officers.html',
			controller: 'ListOfficersCtrl'
		})
		.state('addPoliceofficer',
		{
			url: '/police-officer',
			templateUrl: 'views/partials/add-police-officer.html',
			controller: 'AddOfficerCtrl'
		});

		// $locationProvider.html5Mode(true);
	}

	angular.module('alertAmberTT')
	.config(AppRoutes)
	.run(function  ($state) {
		$state.go('home');
	});
}());