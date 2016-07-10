'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:BookingListCtrl
 * @description
 * # BookingListCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('BookingListCtrl', function ($scope, $http, $location, $route
										, SpringDataRestAdapter, halPagination, bookingDao
										, uidGenerator) {
		var search = $location.search();
		var pageParam = search.page || 0;
		var sizeParam = search.size || 10;
		var sortParam = search.sort || 'desc';
		
		$scope.displayDeletePopup = false;
		$scope.filteredTodos = [];
		$scope.sort = sortParam;

		SpringDataRestAdapter.process(bookingDao.list(pageParam, sizeParam, sortParam)).then(function(processedResponse) {
			$scope.bookings = processedResponse._embeddedItems;

			var parsedProcessedResponse = angular.toJson(processedResponse, true);
			$scope.pageLink = halPagination.extractLinks(processedResponse);
			$scope.pageStatus = halPagination.extractPaginationStatus(processedResponse);
		});

		$scope.editBooking = function(bookingId) {
			$location.path('/booking-detail/' + bookingId);
		};

		$scope.deleteBooking = function(bookingId) {
			bookingDao.delete(bookingId).then(
				function(data){
					$location.path('/booking-list');
					$route.reload();	
				},
				function(data) {
					alert(data);				
				}
			);
		};

		$scope.createNewBooking = function() {
			var code = uidGenerator.generate();
			$location.path('/booking-creation/' + code);
		};

		$scope.showDeletePopup = function(options, id) {
		    if (options === true) {
		        $scope.displayDeletePopup = true;
		    } else {
		        $scope.displayDeletePopup = false;
		    }
		    $scope.bookingToDeleteId = id;
		};		
  });
