module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			report: '=',
			incident: '='
		},
		templateUrl: './partials/incident.html',
		controller: 'CrimeController'
	};	
}