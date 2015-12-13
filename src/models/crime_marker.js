function crimeMarker(options, Map, controller) {
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
	controller.incidentReport(options)});	
}

module.exports = crimeMarker;
	