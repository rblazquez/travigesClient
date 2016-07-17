'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:PropertyCreationCtrl
 * @description
 * # PropertyCreationCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('BookingCreationCtrl', function($scope, $http, $location, $routeParams, bookingDao
  							, propertyDao, SpringDataRestAdapter) {
  		$scope.booking = {};
  		$scope.booking.code = $routeParams.code;
  		$scope.booking.status = "REQUESTED";
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

		var createBookingOnProperty = function(booking, propertyRefList) {
			bookingDao.create(booking, propertyRefList).then(
				function(data){
					$location.path('/booking-list');
				},
				function(data) {
					alert(data);				
				}
			);
		};  		

	    $scope.propertySelection = function(property) {
	        $scope.booking.cleaningFee = $scope.pcc.selectedProperty.cleaningFee;
	        $scope.booking.deposit = $scope.pcc.selectedProperty.deposit;
	        $scope.booking.pricePerNight = $scope.pcc.selectedProperty.pricePerNight;
	    };  		

		SpringDataRestAdapter.process(propertyDao.list(0, 100, "ASC")).then(function(processedResponse) {
			$scope.properties = processedResponse._embeddedItems;
		});

		$scope.createNewBooking = function() {
			createBookingOnProperty($scope.booking, $scope.pcc.selectedProperty._links.self.href);
		};

		$scope.cancel = function() {
			$location.path('/booking-list');
		};	
	});	