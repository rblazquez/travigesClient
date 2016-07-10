'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.commonRestDao
 * @description
 * # commonRestDao
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('commonRestDao', function ($http, $q) {
    this.list = function(baseUrl, pageParam, sizeParam, sortParam) {
		return $http.get(baseUrl + '?page=' + pageParam + '&size=' + sizeParam + '&sort=' + sortParam).success(function(response) {
			angular.toJson(response, true);
		});
    };

    this.show = function(baseUrl, resourceId) {
		return $http.get(baseUrl + '/' + resourceId).success(function(response) {
			angular.toJson(response, true);
		});
    };

    this.getLink = function(link) {
		return $http.get(link).success(function(response) {
			angular.toJson(response, true);
		});
    };    

    this.showSubResource = function(baseUrl, resourceId, subResourceName) {
		return $http.get(baseUrl + '/' + resourceId + '/' + subResourceName)
			.success(function(response) {
				angular.toJson(response, true);
			});
    };

    this.update = function(baseUrl, resourceObject) {
    	var deferred = $q.defer();
		$http({
		    method : "PUT",
		    url : baseUrl + "/" + resourceObject.id,
		    data : angular.toJson(resourceObject),
		    headers : {
		        'Content-Type' : 'application/json'
		    }
		}).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject("There was an error");
		});
		return deferred.promise;
    };

    this.create = function(baseUrl, resourceObject) {
    	var deferred = $q.defer();
		$http({
		    method : "POST",
		    url : baseUrl,
		    data : angular.toJson(resourceObject),
		    headers : {
		        'Content-Type' : 'application/json'
		    }
		}).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject("There was an error");
		});
		return deferred.promise;   	
    };

    this.delete = function(baseUrl, resourceId) {
     	var deferred = $q.defer();
		$http({
		    method : "DELETE",
		    url : baseUrl + "/" + resourceId
		}).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject("There was an error");
		});
		return deferred.promise;    	
    };
  });
