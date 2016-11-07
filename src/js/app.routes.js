(function() {
	'use strict';

	function AppRoutes ($stateProvider, $locationProvider) {
		$stateProvider
		.state('main',
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
		});

		// $locationProvider.html5Mode(true);
	}

	angular.module('alertAmberTT')
	.config(AppRoutes)
	.run(function  ($state) {
		$state.go('main');
	});
}());