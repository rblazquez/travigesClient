'use strict';

angular.module('travigesfeApp')
	.constant('config', { 
	  baseUrl: 'http://travigesapi.eu-central-1.elasticbeanstalk.com:8080/api/',
	  //baseUrl: 'http://localhost:8080/api/',
	  enableDebug: true
	});