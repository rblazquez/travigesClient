'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:PropertyDetailCtrl
 * @description
 * # PropertyDetailCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('PropertyDetailCtrl', function($scope, $http, $location, $routeParams
		, $timeout, SpringDataRestAdapter, uiGmapGoogleMapApi, propertyDao, amenitieDao) {
		var propertyId = $routeParams.id;
		$scope.selectedAmenitieIds = [];
		$scope.selectedAmenitieRefs = [];

	    uiGmapGoogleMapApi.then(function(maps) {
	  		$scope.mapEvents = {
					            click: function (map, eventName, originalEventArgs) {
							                var e = originalEventArgs[0];
							                var lat = e.latLng.lat();
							                var lon = e.latLng.lng();
							                var marker = {
							                    id: Date.now(),
							                    coords: {
							                        latitude: lat,
							                        longitude: lon
							                    }
							                };
							                $scope.map.markers.pop();
							                $scope.map.markers.push(marker);
							                $scope.property.lat = lat;
							                $scope.property.lng = lon;
							                $scope.$apply();
							            }
							};   
			$scope.map = { center: { latitude: 28.16403252, longitude: -16.77577972 }
							, zoom: 11, showMap: false, markers: [], bounds: {}};
			$scope.mapOptions = {
							streetViewControl: false
							, mapTypeControl: false
							, scaleControl: false
							, mapTypeId: google.maps.MapTypeId.ROADMAP
						};
	    });	

	    $scope.showMap = function() {
	    	if ($scope.map.showMap) {
	    		$scope.pcc.status1.open = true;
	    		$scope.pcc.status2.open = false;
	    		$scope.map.showMap = false;
	    	} else {
	    		$scope.pcc.status1.open = false;
	    		$scope.pcc.status2.open = true;
    			$scope.map.showMap = true;
	    	}
	    }		    				

		function show(propertyId) {
			SpringDataRestAdapter.process(propertyDao.show(propertyId)).then(function(processedResponse) {
				$scope.property = processedResponse;
		        var latitude = $scope.property.lat;
	            var longitude = $scope.property.lng;	
				if ((latitude) && (longitude)) {
		            var marker = {
		                id: Date.now(),
		                coords: {
		                    latitude: latitude,
		                    longitude: longitude
		                }
		            };			
					$scope.map.markers.push(marker);
					$scope.map.center = { latitude: latitude, longitude: longitude };
				}		
			});	
		}

		function showAmenities(propertyId) {
			//Retrieve full catalog
			SpringDataRestAdapter.process(amenitieDao.list(0, 100, 'desc')).then(function(processedResponse) {
				$scope.amenitieCatalog = processedResponse._embeddedItems;
			});

			//Get property amenities
			SpringDataRestAdapter.process(propertyDao.showAmenities(propertyId)).then(function(processedResponse) {
				$scope.propertyAmenitiesList = processedResponse._embeddedItems;				

				angular.forEach($scope.propertyAmenitiesList, function(value, key) {
					$scope.selectedAmenitieIds.push(value.id);
					$scope.selectedAmenitieRefs.push(value['_links']['self']['href']);
				})
			});	
		}

		show(propertyId);
		showAmenities(propertyId);				

		// callback for ng-click 'updateUser':
		$scope.updateProperty = function() {
			updatePropertyAndAmenities($scope.property, $scope.selectedAmenitieRefs);
		};

		var updatePropertyAndAmenities = function(property, amenitieRefList) {
			propertyDao.update(property, amenitieRefList).then(
				function(data){
					$location.path('/property-list');
				},
				function(data) {
					alert(data);				
				}
			);
		}

		// callback for ng-click 'updateUser':
		$scope.updateAmenitieSelection = function(action, amenitie) {
			updateSelected(action, amenitie);
		};		

		var updateSelected = function(action, amenitie) {
			var selectedAmenitieRef = amenitie['_links']['self']['href'];
			if (action === 'add' && $scope.selectedAmenitieIds.indexOf(amenitie.id) === -1) {
				$scope.selectedAmenitieIds.push(amenitie.id);
				$scope.selectedAmenitieRefs.push(selectedAmenitieRef);
				$scope.propertyAmenitiesList.push(amenitie);
			}
			if (action === 'remove' && $scope.selectedAmenitieIds.indexOf(amenitie.id) !== -1) {	
				$scope.selectedAmenitieIds.splice($scope.selectedAmenitieIds.indexOf(amenitie.id), 1);					
				$scope.selectedAmenitieRefs.splice($scope.selectedAmenitieRefs.indexOf(selectedAmenitieRef), 1);
				$scope.propertyAmenitiesList.splice(_.findKey($scope.propertyAmenitiesList, {
          			id: amenitie.id
        		}), 1);
			}
		};

		// callback for ng-click 'cancel':
		$scope.cancel = function() {
			$location.path('/property');
		};		
  });
