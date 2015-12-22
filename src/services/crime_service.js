var config = require('../endpoints/config.js');
var Location = require('../models/location.js');
var CrimeOutcome = require('../models/crime_outcome.js');
var Neighbourhood = require('../models/neighbourhood.js');

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
			return callback(undefined, res);
		}

		var onError = function(err) {
			return callback(err);
		}

		var url = config.police.availability;
		var datesQuery = new $resource(url, undefined, {get: config.methods.getArray})
		datesQuery.get(onLoad, onError);
	}
	//need to get date
	var formatCrime = function(crimes, date, c) {
		var that = this;

		var onLoad = function(res) {
			for(var i = 0; i < crimes.length; i++) {
				for(var x = 0; x < res.length; x++) {
					if(crimes[i].category == res[x].url) {
						crimes[i].category_name = res[x].name;
						}
					}
				}
			return c(undefined, crimes);
		}

		var onError = function() {
			return c(err);
		}

		var url = config.police.format_crime_name(date);
		var getCrimeNames = $resource(url, undefined, {get: config.methods.getArray});
		getCrimeNames.get(onLoad, onError);
	}

	var getCrime = function(d, callback) {
		var that = this;
		var onLoad = function(res) {
			formatCrime(res, d.date, function(err, crimes_upd) {
				if(!err) {
				return callback(undefined, crimes_upd);
				}
			});
		}

		var onError = function(err) {
			return callback(err);
		}
		var url;
		if(d.type == 'crime') {
	  		url = config.police.crimes_at_location(d);
	 	}
	 	else if (d.type == 'search') {
	 		url = config.police.stop_and_search(d);
	 	}
	  	var crimeCall = new $resource(url, undefined, {get: config.methods.getArray})
	  	crimeCall.get(onLoad, onError);
	}

	var getOutcome = function(id, callback) {
		var that = this;
		if(!id) {
			return;
		}

		var onLoad = function(res) {
			var outcomes = [];
			for(var i = 0; i < res.outcomes.length; i++) {
				outcomes.push(new CrimeOutcome(res.outcomes[i]));
			}
			return callback(undefined, outcomes);
		}

		var onError = function(err) {
			return callback(err);
		}

		var url = config.police.crime_outcome(id);
		var outcome = new $resource(url, undefined, {get: config.methods.get});
		outcome.get(onLoad, onError);
	}

	var getNeighbourhood = function(d, callback) {
		var that = this;
		if(!d) {
			return;
		}

		var onLoad = function(res) {
			callback(undefined, new Neighbourhood(res))
		}

		var onError = function(err) {
			console.log(err);
		}

		var url = config.police.neighbourhood(d);
		var neighbourhood = new $resource(url, undefined, {get: config.methods.get})
		neighbourhood.get(onLoad, onError);
	}

	var streetView = function(d, callback) {
		var url = config.street.view(d);
		callback(url);

	}	

	return {
		getAddress : getAddress,
		getDates : getDates,
		getCrime : getCrime,
		streetView : streetView,
		formatCrime : formatCrime,
		getOutcome : getOutcome,
		getNeighbourhood : getNeighbourhood
	};
}


module.exports = CrimeService;