module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			report: '='
		},
		templateUrl: './partials/incident.html',
		controller: 'CrimeController'
	};	
}