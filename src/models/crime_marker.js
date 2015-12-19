function crimeMarker(options, Map, callback) {
var that = this;
this.mlat = Number(options.location.latitude);
this.mlng = Number(options.location.longitude);
this.mapIcon = {
	url: '../../imgs/icons/'+ options.category +'.svg',
	size: new google.maps.Size(20, 20),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(0, 0),
	scaledSize: new google.maps.Size(20, 20)
}
this.marker = new google.maps.Marker({
			map: Map,
			animation: google.maps.Animation.DROP,
			position: {lat: this.mlat, lng: this.mlng},
			icon: that.mapIcon
			});
this.marker.addListener('click', function() {
	callback(options);
});	
}

module.exports = crimeMarker;
	