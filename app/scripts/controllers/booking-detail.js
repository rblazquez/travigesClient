'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:BookingDetailCtrl
 * @description
 * # BookingDetailCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('BookingDetailCtrl', function($scope, $http, $location, $routeParams
		, SpringDataRestAdapter, bookingDao, commonRestDao, propertyDao) {
		var bookingId = $routeParams.id;
		$scope.booking = {};
		$scope.selectedProperty = {};

		//Manage Calendars
		$scope.dateOptions = {
		    formatYear: 'yyyy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		};

		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.open2 = function() {
    		$scope.popup2.opened = true;
  		};

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};
  		//End Manage Calendars 		

		function show(bookingId) {
			SpringDataRestAdapter.process(bookingDao.show(bookingId))
			.then(function(processedResponse) {
				$scope.booking = processedResponse;	

				SpringDataRestAdapter.process(commonRestDao.getLink($scope.booking._links.property.href))
				.then(function(processedResponse) {
					$scope.property = processedResponse;	
					$scope.selectedProperty = $scope.property;
				});	

				$scope.booking.startDate = Date.parse($scope.booking.startDate)	
				$scope.booking.endDate = Date.parse($scope.booking.endDate)	
			});			
		}

		$scope.showPropertyDetails = function(propertyId) {
			$location.path('/property-detail/' + propertyId);
		}

		show(bookingId);		

		SpringDataRestAdapter.process(propertyDao.list(0, 100, "ASC")).then(function(processedResponse) {
			$scope.properties = processedResponse._embeddedItems;
		});

		// callback for ng-click 'updateUser':
		$scope.updateBooking = function() {
			updateBookingOverProperty($scope.booking, $scope.selectedProperty._links.self.href);
		};

		var updateBookingOverProperty = function(booking, property) {
			bookingDao.update(booking, property).then(
				function(data){
					$location.path('/booking-list');
				},
				function(data) {
					alert(data);				
				}
			);
		};		

		// callback for ng-click 'cancel':
		$scope.cancel = function() {
			$location.path('/booking-list');
		};		
  });
