'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:AmenitieCreationCtrl
 * @description
 * # AmenitieCreationCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
	.controller('AmenitieCreationCtrl', 
			function($scope, $http, $location, amenitieDao) {

		function create(amenitie) {
			amenitieDao.create(amenitie).then(
				function(data){
					$location.path('/amenitie');
				},
				function(data) {
					alert(data);				
				}
			)
		}

		$scope.createNewAmenitie = function() {
			create($scope.amenitie);
		};

		$scope.cancel = function() {
			$location.path('/amenitie');
		};		
	});