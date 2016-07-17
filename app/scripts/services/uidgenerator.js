'use strict';

/**
 * @ngdoc service
 * @name travigesfeApp.uidGenerator
 * @description
 * # uidGenerator
 * Service in the travigesfeApp.
 */
angular.module('travigesfeApp')
  .service('uidGenerator', function () {
	    // AngularJS will instantiate a singleton by calling "new" on this function
	    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var ID_LENGTH = 8;

		this.generate = function() {
			var rtn = '';
		  	for (var i = 0; i < ID_LENGTH; i++) {
		    	rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
		  	}
		  	return rtn;
		};
  });
