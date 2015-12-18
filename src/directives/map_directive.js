var crimeMarker = require('../models/crime_marker.js');
module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			incidents: '=',
			report: '&'
		},
		controller: 'CrimeController',
		link: function(scope, el, attr, controller) {
				var map, marker, mlat, mlng;
				scope.$watch('incidents', function(d, o) {
					if(!d) {
						return;
					}
					map = new google.maps.Map(el[0], {
					center: {lat: d.lat, lng: d.lng},
					zoom: 14,
					disableDefaultUI: true
					});

					for (n in d.crimes) {
						if(d.crimes[n].location) {
								new crimeMarker(d.crimes[n], map, function(incd) {
									// console.log(scope);
									// console.log(controller);
									// console.log(incd);
									console.log(incd);
									// var report = JSON.stringify(incd);
									scope.report({incd: incd});
									scope.$apply();
									// scope.$apply();
								});
							}
						}
				});

		} //end of link function
	}
};