var crimeMarker = require('../models/crime_marker.js');
var IncidentReport = require('../models/incident_report.js');
var styles = require('../utils/map_styles.js');
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
					zoom: 16,
					disableDefaultUI: true
					});
					map.setOptions({styles: styles});
					for (n in d.crimes) {
						if(d.crimes[n].location) {
								new crimeMarker(d.crimes[n], map, function(incd) { 
									scope.report({incd: new IncidentReport(incd)});
									scope.$apply();
								});
							}
						}
				});

		} //end of link function
	}
};