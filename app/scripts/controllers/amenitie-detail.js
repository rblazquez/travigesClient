'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:AmenitieDetailCtrl
 * @description
 * # AmenitieDetailCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
	.controller('AmenitieDetailCtrl', function($scope, $http, $location, $routeParams
		, SpringDataRestAdapter, amenitieDao) {
		var amenitieId = $routeParams.id;

		// callback for ng-click 'updateUser':
		$scope.updateAmenitie = function() {
			amenitieDao.update($scope.amenitie).then(
				function(data){
					$location.path('/amenitie');
				},
				function(data) {
					alert(data);				
				}
			);
		};

		// callback for ng-click 'cancel':
		$scope.cancel = function() {
			$location.path('/amenitie');
		};
		
		function show(amenitieId) {
			SpringDataRestAdapter.process(amenitieDao.show(amenitieId)).then(function(processedResponse) {
				$scope.amenitie = processedResponse;
			});			
		}

		show(amenitieId);
	});