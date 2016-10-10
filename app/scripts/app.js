'use strict';

var app = angular.module('travigesfeApp', ['ngResource', 'ngRoute', 'spring-data-rest'
                                , 'ui.bootstrap', 'uiGmapgoogle-maps'
                                , 'auth0', 'angular-storage', 'angular-jwt', 'uiGmapgoogle-maps'
                                , 'ui.bootstrap.alerts'])
  .config(['$routeProvider', 'authProvider', configFunction])
  .config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
      return store.get('token');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
  }])
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyCE0T0FZAKkYDJa3VBcjDT_7wGqe_Mv2Yk',
          v: '3.20',
          libraries: 'weather,geometry,visualization'
      });
  }])  
  .run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', runFunction])

  function configFunction($routeProvider, authProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/main.html'
    }).when('/about', {
      templateUrl: 'views/about.html'
    }).when('/amenitie', {
      templateUrl: 'views/amenitie/amenitie.html',
      controller: 'AmenitieCtrl',
      requiresLogin: true
    })
    .when('/amenitie-detail/:id', {
      templateUrl: 'views/amenitie/amenitie-detail.html',
      controller: 'AmenitieDetailCtrl',
      controllerAs: 'amenitieDetail',
      requiresLogin: true
    })
    .when('/amenitie-creation', {
      templateUrl: 'views/amenitie/amenitie-creation.html',
      controller: 'AmenitieCreationCtrl',
      controllerAs: 'amenitieCreation',
      requiresLogin: true
    })
    .when('/property-list', {
      templateUrl: 'views/property/property-list.html',
      controller: 'PropertyListCtrl',
      controllerAs: 'propertyList',
      requiresLogin: true
    })
    .when('/property-detail/:id', {
      templateUrl: 'views/property/property-detail.html',
      controller: 'PropertyDetailCtrl',
      controllerAs: 'propertyDetail',
      requiresLogin: true
    })
    .when('/property-creation', {
      templateUrl: 'views/property/property-creation.html',
      controller: 'PropertyCreationCtrl',
      controllerAs: 'propertyCreation',
      requiresLogin: true
    })
    .when('/booking-list', {
      templateUrl: 'views/booking/booking-list.html',
      controller: 'BookingListCtrl',
      controllerAs: 'bookingList',
      requiresLogin: true
    })
    .when('/booking-detail/:id', {
      templateUrl: 'views/booking/booking-detail.html',
      controller: 'BookingDetailCtrl',
      controllerAs: 'bookingDetail',
      requiresLogin: true
    })       
    .when('/booking-creation/:code', {
      templateUrl: 'views/booking/booking-creation.html',
      controller: 'BookingCreationCtrl',
      controllerAs: 'bookingCreation',
      requiresLogin: true
    })
    .when('/bookingcalendar', {
      templateUrl: 'views/bookingcalendar.html',
      controller: 'BookingcalendarCtrl',
      controllerAs: 'bookingcalendar',
      requiresLogin: true
    })
    .when( '/login', {
      templateUrl: 'views/login.html',      
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })    
    .when( '/logout', {
      templateUrl: 'views/login.html',      
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })  
    .otherwise({
      redirectTo: '/login'
    });  

     //Configure Auth0
    authProvider.init({
      domain: 'baifos.eu.auth0.com',
      clientID: 'EuEYlbL87D3mJtjDsGvNMlFnyQBtv7Hb',
      loginUrl: '/login'
    });   

    //Called when login is successful
    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
      // Successfully log in
      // Access to user profile and token
      console.log("LOGIN SUCCESS");
      profilePromise.then(function(profile) {
        // profile
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.url('/');
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function() {
      console.log("Failed login")
    });         
  };  

function runFunction ($rootScope, auth, store, jwtHelper, $location){  
   // Listen to a location change event
  $rootScope.$on('$locationChangeStart', function() {
    // Grab the user's token
    var token = store.get('token');
    // Check if token was actually stored
    if (token) {
      // Check if token is yet to expire
      if (!jwtHelper.isTokenExpired(token)) {
        // Check if the user is not authenticated
        if (!auth.isAuthenticated) {
          // Re-authenticate with the user's profile
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page
        console.log("Token has expired")
        //$location.path('/');
        // .. or
        // or use the refresh token to get a new idToken
        auth.refreshIdToken(token);
      }
    }
  }); 
}  
