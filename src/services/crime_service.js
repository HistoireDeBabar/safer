var config = require('../endpoints/config.js');
var Location = require('../models/location.js');

function CrimeService($resource) {


	var getAddress = function(address, callback) {
		var that = this;
		var onLoad = function(res) {			
			that.location = new Location(res.results[0]);
			return callback(undefined, that.location);
		}

		var onError = function(err) {
			return callback(err);
		}

		var url = config.geocode.root + address + config.geocode.key;
		var geoCode = new $resource(url, undefined, {get: config.methods.get});
		geoCode.get(onLoad, onError);
	}

	var getDates = function(callback) {
		var that = this;
		var onLoad = function(res) {
			// console.log(res);
			return callback(undefined, res);
		}

		var onError = function(err) {
			return callback(err);
		}

		var url = config.police.availability;
		var datesQuery = new $resource(url, undefined, {get: config.methods.getArray})
		datesQuery.get(onLoad, onError);
	}

	var getCrime = function(d, callback) {
		var that = this;
		var onLoad = function(res) {
			return callback(undefined, res);
		}

		var onError = function(err) {
			// console.log(err);
			return callback(err);
		}
		var url;
		if(d.type == 'crime') {
	  		url = config.police.crimes_at_location(d);
	 	}
	 	else if (d.type == 'search') {
	 		url = config.police.stop_and_search(d);
	 	}
	  	console.log(url);
	  	var crimeCall = new $resource(url, undefined, {get: config.methods.getArray})
	  	crimeCall.get(onLoad, onError);
	}

	return {
		getAddress : getAddress,
		getDates : getDates,
		getCrime : getCrime
	};
}


module.exports = CrimeService;