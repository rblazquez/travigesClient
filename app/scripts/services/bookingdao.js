'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.bookingDao
 * @description
 * # bookingDao
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('bookingDao', function ($http, $q, $filter, commonRestDao, config) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
        var baseUrl = config.baseUrl + 'bookings';

    this.list = function(pageParam, sizeParam, sortParam) {
		return commonRestDao.list(baseUrl, pageParam, sizeParam, sortParam);
    };

    this.show = function(resourceId) {
		return commonRestDao.show(baseUrl, resourceId);
    };

    this.showProperty = function(resourceId) {
        return commonRestDao.showSubResource(baseUrl, resourceId, 'property');
    };

    this.showGuest = function(resourceId) {
        return commonRestDao.showSubResource(baseUrl, resourceId, 'guest');
    };

    this.update = function(resourceObject, subResourceRefList) {
        if (subResourceRefList && subResourceRefList.length > 0) {
            resourceObject.property = subResourceRefList;
        }
    	return commonRestDao.update(baseUrl, resourceObject);
    };

    this.create = function(resourceObject, subResourceRefList) {
       if (subResourceRefList && subResourceRefList.length > 0) {
            resourceObject.property = subResourceRefList;
        }        
    	return commonRestDao.create(baseUrl, resourceObject);
    };

    this.delete = function(resourceId) {
     	return commonRestDao.delete(baseUrl, resourceId);	
    };

    this.findByStartDate = function(startDate) {
        //MM/dd/yyyy
        var utcDate = new Date(startDate + " UTC");
        var startDatePeriod = $filter('date')(utcDate, 'yyyy-MM-dd');
        var endDatePeriod = new Date();
        endDatePeriod.setDate(utcDate.getDate() + 1); 
        endDatePeriod = $filter('date')(endDatePeriod, 'yyyy-MM-dd');

        var findUrl = baseUrl + '/search/findByStartDateBetween?startDatePeriod=' + startDatePeriod;
        findUrl = findUrl + '&endDatePeriod=' + endDatePeriod;
        return commonRestDao.getLink(findUrl);     
    };

    this.findByEndDate = function(endDate) {
        //MM/dd/yyyy
        var utcDate = new Date(endDate + " UTC");
        var startDatePeriod = $filter('date')(utcDate, 'yyyy-MM-dd');
        var endDatePeriod = new Date();
        endDatePeriod.setDate(utcDate.getDate() + 1); 
        endDatePeriod = $filter('date')(endDatePeriod, 'yyyy-MM-dd');

        var findUrl = baseUrl + '/search/findByEndDateBetween?startDatePeriod=' + startDatePeriod;
        findUrl = findUrl + '&endDatePeriod=' + endDatePeriod;

        return commonRestDao.getLink(findUrl);  
    };    
  });