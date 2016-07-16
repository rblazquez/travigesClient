'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.propertyDao
 * @description
 * # propertyDao
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('propertyDao', function ($http, $q, commonRestDao) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = 'http://travigesapi.eu-central-1.elasticbeanstalk.com:8080/api/properties';

    this.list = function(pageParam, sizeParam, sortParam) {
		return commonRestDao.list(baseUrl, pageParam, sizeParam, sortParam);
    };

    this.show = function(resourceId) {
		return commonRestDao.show(baseUrl, resourceId);
    };

    this.showAmenities = function(resourceId) {
        return commonRestDao.showSubResource(baseUrl, resourceId, 'amenities');
    };

    this.update = function(resourceObject, subResourceRefList) {
        if (subResourceRefList && subResourceRefList.length > 0) {
            resourceObject['amenities'] = subResourceRefList;
        }
    	return commonRestDao.update(baseUrl, resourceObject);
    };

    this.create = function(resourceObject, subResourceRefList) {
       if (subResourceRefList && subResourceRefList.length > 0) {
            resourceObject['amenities'] = subResourceRefList;
        }        
    	return commonRestDao.create(baseUrl, resourceObject);
    };

    this.delete = function(resourceId) {
     	return commonRestDao.delete(baseUrl, resourceId);	
    };
  });
