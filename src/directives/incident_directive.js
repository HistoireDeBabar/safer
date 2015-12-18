module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			report: '='
		},
		templateUrl: './partials/incident.html',
		controller: 'CrimeController'
		// link: function(scope, attr, el, controller) {
		// 	console.log(scope.report);
		// 	scope.$watchCollection(controller.incident, function(oldValue, newValue) {
		// 		console.log('new value', newValue);
		// 		console.log(scope);
		// 	}, true)
		// }
	};	
}