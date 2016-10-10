'use strict';

angular.module('travigesfeApp')
	.controller('LoginCtrl', ['$scope', 'auth', 'store', function ($scope, auth, store) {

  $scope.login = function(){
    // Set popup to true to use popup
    auth.signin({popup: true}, function(profile, token){
      store.set('profile', profile);
      store.set('token', token);
    }, function(err){
      console.log(err);
    });
  };

  $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');  	
  }
}]);