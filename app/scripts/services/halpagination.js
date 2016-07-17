'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.halPagination
 * @description
 * # halPagination
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('halPagination', function () {
		this.extractLinks = function(processedResponse) {
			var pageLink = {};
			pageLink.firstPageLink = {};
			pageLink.nextPageLink = {};
			pageLink.previousPageLink = {};
			pageLink.lastPageLink = {};

			if (processedResponse._links.first) {
				pageLink.firstPageLink = processedResponse._links.first.href;
			} else {
				pageLink.firstPageLink = null;
			}

			if (processedResponse._links.next) {
				pageLink.nextPageLink = processedResponse._links.next.href;
			} else {
				pageLink.nextPageLink = null;
			}

			if (processedResponse._links.prev) {
				pageLink.previousPageLink = processedResponse._links.prev.href;
			} else {
				pageLink.previousPageLink = null;
			}

			if (processedResponse._links.last) {
				pageLink.lastPageLink = processedResponse._links.last.href;
			} else {
				pageLink.lastPageLink = null;
			}
			return pageLink;
		};

		this.extractPaginationStatus = function(processedResponse) {
			var pageStatus = {};
			pageStatus.size = {};
			pageStatus.totalElements = {};
			pageStatus.totalPages = {};
			pageStatus.number = {};

			pageStatus.size = processedResponse.page.size;
			pageStatus.totalElements = processedResponse.page.totalElements;
			pageStatus.totalPages = processedResponse.page.totalPages;
			pageStatus.number = processedResponse.page.number;

			return pageStatus;
		};
  });
