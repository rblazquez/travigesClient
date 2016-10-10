'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:AmenitieCtrl
 * @description
 * # AmenitieCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
	.controller('AmenitieCtrl', function($scope, $http, $location, $route
										, SpringDataRestAdapter, halPagination, amenitieDao
										, AlertService) {
		var search = $location.search();
		var pageParam = search.page || 0;
		var sizeParam = search.size || 6;
		var sortParam = search.sort || 'desc';

		AlertService.error('Something went wrong');

		$scope.displayDeletePopup = false;
		$scope.filteredTodos = [];
		$scope.sort = sortParam;

		SpringDataRestAdapter.process(amenitieDao.list(pageParam, sizeParam, sortParam)).then(function(processedResponse) {
			$scope.amenities = processedResponse._embeddedItems;

			var parsedProcessedResponse = angular.toJson(processedResponse, true);
			$scope.pageLink = halPagination.extractLinks(processedResponse);
			$scope.pageStatus = halPagination.extractPaginationStatus(processedResponse);
		});

		$scope.editAmenitie = function(amenitieId) {
			$location.path('/amenitie-detail/' + amenitieId);
		};

		$scope.deleteAmenitie = function(amenitieId) {
			amenitieDao.delete(amenitieId).then(
				function(data){
					$location.path('/amenitie');
					$route.reload();	
				},
				function(data) {
					alert(data);				
				}
			);
		};

		$scope.createNewAmenitie = function() {
			$location.path('/amenitie-creation');
		};

		$scope.showDeletePopup = function(options, id) {
		    if (options === true) {
		        $scope.displayDeletePopup = true;
		    } else {
		        $scope.displayDeletePopup = false;
		    }
		    $scope.amenitieToDeleteId = id;
		};			
	});