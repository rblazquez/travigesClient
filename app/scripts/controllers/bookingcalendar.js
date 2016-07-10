'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:BookingcalendarCtrl
 * @description
 * # BookingcalendarCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('BookingcalendarCtrl', function ($scope, $location, $route, bookingDao, SpringDataRestAdapter) {  
		$scope.selectedDate = new Date();

		//Manage Calendars
		$scope.dateOptions = {
			//customClass: getDayClass,
		    formatYear: 'yyyy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		};

		$scope.editBooking = function(bookingId) {
			$location.path('/booking-detail/' + bookingId);
		};

		$scope.selectedDateChanged = function() {
	        SpringDataRestAdapter.process(bookingDao.findByStartDate($scope.selectedDate))
	                .then(function(processedResponse) {
	                    $scope.startsOnSelectedDate = processedResponse._embeddedItems;    
	                });

	        SpringDataRestAdapter.process(bookingDao.findByEndDate($scope.selectedDate))
	                .then(function(processedResponse) {
	                    $scope.endsOnSelectedDate = processedResponse._embeddedItems;    
	                });
		}

		$scope.selectedDateChanged();
  });
