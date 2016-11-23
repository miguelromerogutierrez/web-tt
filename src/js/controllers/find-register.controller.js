(function  () {
	
	'use strict';

	function FindRegisterCtrl ($scope, BulletinService, FlowService, OfficerService, $uibModal) {
		var bulletinDto = null;
		var officerAssigned = null;
		var missingPersonPlace = {};

		$scope.factDate = new Date();
		$scope.activated = false;
		$scope.register = null;
		$scope.find = find;
		$scope.activate = activate;
		$scope.device = false;
		$scope.map = getMapProperties();
		$scope.missing = {};
		$scope.officials = {};
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
			FlowService.activateDevice(bulletinDto.device)
			.then(function(place) {
				$scope.missing = getMissing(place);
				missingPersonPlace = place;
				$scope.map.center = {
					latitude: place.latitude,
					longitude: place.longitue
				};
				return OfficerService.getListOfficers({
					latitude: 19.3206553,
					longitude: -99.1526775
				});
			})
			.then(function(listOfficers) {
				$scope.officials = getMarkers(listOfficers.listOfficersDto);
				$scope.device = true;
				console.log(JSON.stringify($scope.officials));
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
			FlowService.activateBulletin({
				bulletinCode: bulletinDto.bulletinCode,
				policeId: officerAssigned.idOfficer,
				place: missingPersonPlace,
				dateFacts: $scope.factDate.getTime()
			}).then(function() {
				$scope.activated = true;
			});
		}

		function getMissing (place) {
			return {
				id: 1,
				coords: {
					latitude: place.latitude,
					longitude: place.longitue
				},
				click: undefined
			}
		}

		function getMarkers (listOfficers) {
			var markers = [];
			listOfficers.forEach(function(official,index) {
				markers.push({
					id: index + 1,
					coords: {
						latitude: official.place.latitude,
						longitude: official.place.longitue
					},
					icon: 'images/police-icon.png',
					officer: official
				});
			});
			return {
				list: markers,
				control: {}
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
		          return marker.officer;
		        }
		      }
		    });

		    modalInstance.result
		    .then(function(flag) {
		    	if (flag) {
		    		officerAssigned = marker.officer;
		    	}
		    });
		}
	}

	angular.module('alertAmberTT')
	.controller('FindRegisterCtrl', ['$scope','BulletinService', 'FlowService', 'OfficerService', '$uibModal', FindRegisterCtrl]);

}());