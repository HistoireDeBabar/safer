var config = {
	methods: {
		get: {
			method: 'GET'
		},
		getArray: {
			method: 'GET',
			isArray: true
		},
		put: {
			method: 'PUT'
		},
		post: {
			method: 'POST'
		}
	},
	geocode: {
		root: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
		key: '&key=AIzaSyDZYwxoWzyQbw1fDVmSexxDoyYStcM4SWs'
	},
	police: {
		crimes_at_location: function(d){
			return 'https://data.police.uk/api/crimes-street/all-crime?'+'lat='+d.lat+'&lng='+d.lng+'&date='+d.date;
		},
		stop_and_search: function(d) {
			return 'https://data.police.uk/api/stops-street?lat=' + d.lat + '&lng='+d.lng+'&date='+d.date;
		},
		most_recent: 'https://data.police.uk/api/crime-last-updated',
		availability: 'http://data.police.uk/api/crimes-street-dates'
	}
}

module.exports = config;