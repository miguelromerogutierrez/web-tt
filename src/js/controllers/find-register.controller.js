(function  () {
	
	'use strict';

	function FindRegisterCtrl ($scope, BulletinService, FlowService, OfficerService, $uibModal) {
		var bulletinDto = null;

		$scope.register = null;
		$scope.find = find;
		$scope.activate = activate;
		$scope.map = getMapProperties();
		$scope.missing = getMissing();
		$scope.markers = getMarkers();
		$scope.assignOfficer = assignOfficer;
		$scope.activateDevice = activateDevice;
		$scope.options = {
			bounds: getBounds()
		}

		function find () {
			if ($scope.curp.length === 18) {
				BulletinService.getBulletinByCurp($scope.curp)
				.then(function(bulletin) {
					bulletinDto = bulletin;
					$scope.register = {
						name: bulletin.name + bulletin.lastName + bulletin.secondLastName,
						age: bulletin.age,
						gender: bulletin.gender === "MALE" ? 'Hombre' : 'Mujer' ,
						birthday: bulletin.birthday,
						curp:  bulletin.curp
					}
				});
				//ROGM920718HHGMTGO5
			}
		}

		function activateDevice () {
			FlowService.activateDevice()
			.then(function(resp) {
				return OfficerService.getListOfficers({
					latitude: 19.3206553,
					longitude: -99.1526775
				});
			})
			.then(function(listOfficers) {
				
			});
		}

		function getBounds () {
		    var geolocation = {
		        lat: 19.3206553,
		        lng: -99.1526775
	     	};
			var circle = new google.maps.Circle({
				center: geolocation,
				radius: 38000
			});
			return circle.getBounds();
		}

		function activate () {
			// FlowService.activateBulletin({
			// 	bulletin: bulletinDto.bulletinCode,
			// 	officer: 
			// 	place:
			// 	dateFacts:
			// });
		}

		function getMissing () {
			return {
				id: 1,
				coords: {
					latitude: 19.3206553,
					longitude: -99.1526775
				},
				click: undefined
			}
		}

		function getMarkers () {
			return {
				list: [
					{
						id: 2,
						coords: {
							latitude: 19.3231832,
							longitude: -99.1524357
						},
						icon: 'images/map-marker(1).png',
						officer: {
							name: 'Marco'
						}
					},
					{
						id: 3,
						coords: {
							latitude: 19.3204882,
							longitude: -99.1479862
						},
						icon: 'images/map-marker(1).png',
						officer: {
							name: 'Luis'
						}
					},
					{
						id: 4,
						coords: {
							latitude: 19.3215108,
							longitude: -99.1502929
						},
						icon: 'images/map-marker(1).png',
						officer: {
							name: 'Paco'
						}
					}
				],
				control : {}
			};
		}

		function getMapProperties() {
			return {
				center: {
					latitude: 19.3206553,
					longitude: -99.1526775
				},
				control: {},
				zoom: 17,
				refresh: false
			};
		}

		function assignOfficer (googleMarker, ev, marker) {
			console.log(marker.officer.name);
			var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'views/partials/assign-officer-modal.html',
		      controller: 'AssignOfficerCtrl',
		      size: 'sm',
		      resolve: {
		        officer: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result
		    .then(function(flag) {
		    	if (flag) {

		    	}
		    });
		}
	}

	angular.module('alertAmberTT')
	.controller('FindRegisterCtrl', ['$scope','BulletinService', 'FlowService', 'OfficerService', '$uibModal', FindRegisterCtrl]);

}());