//Controllers
var CrimeController = require('./controllers/crime_controller.js');

//Services
var CrimeService = require('./services/crime_service.js');

//Angular
var angular = require('angular');

var app = angular.module('safer', [require('angular-route'), require('angular-resource')])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/crime.html',
			controller: 'CrimeController as crime'
		});
}]);

//Services
app.factory('CrimeService', ['$resource', CrimeService]);

//Controllers
app.controller('CrimeController',['$scope', 'CrimeService', CrimeController]);