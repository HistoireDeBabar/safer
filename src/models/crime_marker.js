function crimeMarker(options, Map, callback) {
var that = this;
this.mlat = Number(options.location.latitude);
this.mlng = Number(options.location.longitude);
this.marker = new google.maps.Marker({
			map: Map,
			animation: google.maps.Animation.DROP,
			position: {lat: this.mlat, lng: this.mlng},
			title: 'crime!'
			});
this.marker.addListener('click', function() {
	// scope.incidentReport(options);
	// controller.incidentReport(options);
	// scope.crime.incidentReport(options);
	// controller.incident = options;
	// scope.crime.incident = options;
	// scope.$apply(controller.incident);
	// scope.$apply(scope.crime.incident);
	// console.log(scope);
	// console.log(controller);
	// $scope.incidentReport(options);
	// scope.$apply()
	// console.log(controller.$scope);
	// controller.prototype.incidentReport(options);
	// that.incidentReport = options;
	callback(options);
});	
}

module.exports = crimeMarker;
	