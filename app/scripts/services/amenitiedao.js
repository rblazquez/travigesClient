'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.amenitieDao
 * @description
 * # amenitieDao
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('amenitieDao', function ($http, $q, commonRestDao) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = 'http://localhost:8080/api/amenities';

    this.list = function(pageParam, sizeParam, sortParam) {
		return commonRestDao.list(baseUrl, pageParam, sizeParam, sortParam);
    };

    this.show = function(resourceId) {
		return commonRestDao.show(baseUrl, resourceId);
    };

    this.update = function(resourceObject) {
    	return commonRestDao.update(baseUrl, resourceObject);
    };

    this.create = function(resourceObject) {
    	return commonRestDao.update(baseUrl, resourceObject);
    };

    this.delete = function(resourceId) {
     	return commonRestDao.delete(baseUrl, resourceId);
    };
  });
