'use strict';

/**
 * @ngdoc function
 * @name travigesfeApp.controller:PropertyCreationCtrl
 * @description
 * # PropertyCreationCtrl
 * Controller of the travigesfeApp
 */
angular.module('travigesfeApp')
  .controller('PropertyCreationCtrl', function($scope, $http, $location, amenitieDao
  	, $timeout, SpringDataRestAdapter, uiGmapGoogleMapApi, propertyDao) {
  		$scope.property = {};
  		$scope.stepIndex = 0;
  		$scope.lastStep = 4;
  		$scope.selectedAmenitieIds = [];
		$scope.selectedAmenitieRefs = []; 
		$scope.propertyAmenitiesList = [];

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

		SpringDataRestAdapter.process(amenitieDao.list(0, 100, 'desc')).then(function(processedResponse) {
			$scope.amenitieCatalog = processedResponse._embeddedItems;
		});

		$scope.nextCreationStep = function(stepIndex) {
			if ($scope.stepIndex < 4) {
				$scope.stepIndex = $scope.stepIndex + 1;
			}
		};

		$scope.createNewProperty = function() {
			$scope.pcc.property.lat = $scope.property.lat;
			$scope.pcc.property.lng = $scope.property.lng;
			createPropertyAndAmenities($scope.pcc.property, $scope.selectedAmenitieRefs);
		};

		$scope.cancel = function() {
			$location.path('/property-list');
		};

		var createPropertyAndAmenities = function(property, amenitieRefList) {
			propertyDao.create(property, amenitieRefList).then(
				function(data){
					$location.path('/property-list');
				},
				function(data) {
					alert(data);				
				}
			)
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
	});
