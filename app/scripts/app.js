'use strict';

var app = angular.module('travigesfeApp', ['ngResource', 'ngRoute', 'spring-data-rest'
                                , 'ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/main.html'
    }).when('/about', {
      templateUrl: 'views/about.html'
    }).when('/amenitie', {
      templateUrl: 'views/amenitie/amenitie.html',
      controller: 'AmenitieCtrl'
    })
    .when('/amenitie-detail/:id', {
      templateUrl: 'views/amenitie/amenitie-detail.html',
      controller: 'AmenitieDetailCtrl',
      controllerAs: 'amenitieDetail'
    })
    .when('/amenitie-creation', {
      templateUrl: 'views/amenitie/amenitie-creation.html',
      controller: 'AmenitieCreationCtrl',
      controllerAs: 'amenitieCreation'
    })
    .when('/property-list', {
      templateUrl: 'views/property/property-list.html',
      controller: 'PropertyListCtrl',
      controllerAs: 'propertyList'
    })
    .when('/property-detail/:id', {
      templateUrl: 'views/property/property-detail.html',
      controller: 'PropertyDetailCtrl',
      controllerAs: 'propertyDetail'
    })
    .when('/property-creation', {
      templateUrl: 'views/property/property-creation.html',
      controller: 'PropertyCreationCtrl',
      controllerAs: 'propertyCreation'
    })
    .when('/booking-list', {
      templateUrl: 'views/booking/booking-list.html',
      controller: 'BookingListCtrl',
      controllerAs: 'bookingList'
    })
    .when('/booking-detail/:id', {
      templateUrl: 'views/booking/booking-detail.html',
      controller: 'BookingDetailCtrl',
      controllerAs: 'bookingDetail'
    })       
    .when('/booking-creation/:code', {
      templateUrl: 'views/booking/booking-creation.html',
      controller: 'BookingCreationCtrl',
      controllerAs: 'bookingCreation'
    })
    .when('/bookingcalendar', {
      templateUrl: 'views/bookingcalendar.html',
      controller: 'BookingcalendarCtrl',
      controllerAs: 'bookingcalendar'
    })
    .otherwise({
      redirectTo: '/'
    });
  }])
  .controller('ShowAvailableResourcesController', function($scope, $http, SpringDataRestAdapter) {
    var httpPromise = $http.get('http://localhost:8080/api').success(function(response) {
      $scope.response = angular.toJson(response, true);
    });
    SpringDataRestAdapter.process(httpPromise).then(function(processedResponse) {
      $scope.processedResponse = angular.toJson(processedResponse, true);
      $scope.availableResources = angular.toJson(processedResponse._resources(), true);
    });
  }, function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCE0T0FZAKkYDJa3VBcjDT_7wGqe_Mv2Yk',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });