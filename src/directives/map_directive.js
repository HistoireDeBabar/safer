var crimeMarker = require('../models/crime_marker.js');
module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			incidents: '='
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
					zoom: 16,
					disableDefaultUI: true
					});

					for (n in d.crimes) {
						if(d.crimes[n].location) {
								new crimeMarker(d.crimes[n], map, controller);
							}
						}
				});

		} //end of link function
	}
};