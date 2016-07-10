'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:PropertyListCtrl
 * @description
 * # PropertyListCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('PropertyListCtrl', function ($scope, $http, $location, $route
										, SpringDataRestAdapter, halPagination, propertyDao) {
		var search = $location.search();
		var pageParam = search.page || 0;
		var sizeParam = search.size || 10;
		var sortParam = search.sort || 'desc';

		$scope.displayDeletePopup = false;
		$scope.filteredTodos = [];
		$scope.sort = sortParam;

		SpringDataRestAdapter.process(propertyDao.list(pageParam, sizeParam, sortParam)).then(function(processedResponse) {
			$scope.properties = processedResponse._embeddedItems;

			var parsedProcessedResponse = angular.toJson(processedResponse, true);
			$scope.pageLink = halPagination.extractLinks(processedResponse);
			$scope.pageStatus = halPagination.extractPaginationStatus(processedResponse);
		});

		$scope.editProperty = function(propertyId) {
			$location.path('/property-detail/' + propertyId);
		};

		$scope.deleteProperty = function(amenitieId) {
			propertyDao.delete(amenitieId).then(
				function(data){
					$location.path('/property-list');
					$route.reload();	
				},
				function(data) {
					alert(data);				
				}
			);
		};

		$scope.createNewProperty = function() {
			$location.path('/property-creation');
		};

		$scope.showDeletePopup = function(options, id) {
		    if (options === true) {
		        $scope.displayDeletePopup = true;
		    } else {
		        $scope.displayDeletePopup = false;
		    }
		    $scope.propertyToDeleteId = id;
		};		
  });
