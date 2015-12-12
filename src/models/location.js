function Location(options) {
	console.log(options);
	this.lng = options.geometry.location.lng;
	this.lat = options.geometry.location.lat;
	this.addresss = options.formatted_address;
	this.date;
}

module.exports = Location;