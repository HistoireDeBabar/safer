function CrimeController($scope, CrimeService) {
	$scope = $scope || {};
	$scope.crime = this;
	this.virgin = true;
	this.CrimeService = CrimeService;
	this.getDates();
}

CrimeController.prototype.getAddress = function() {
	var that = this;
	this.loading = true;
	this.virgin = false;
	this.CrimeService.getAddress(this.address, function(err, res) {
		if(err) {
			console.log('error', err);
		} else {
			that.search = res;
			that.getCrime();
		}
	});
};

CrimeController.prototype.getDates = function() {
	var that = this;
	this.CrimeService.getDates(function(err, res) {
		if(err) {
			console.log(err);
		} else {
			that.availability = res;
		}
	});
}

CrimeController.prototype.getCrime = function() {
	var that = this;
	this.search.date = this.date;
	this.search.type = this.searchType;
	this.CrimeService.getCrime(this.search, function(err, res) {
		if (err) {
			console.log(err);
		} else {
			that.search.crimes = res;
			that.incidents = that.search;
			that.createReport();
		}
	});
}

CrimeController.prototype.incidentReport = function(incident) {
	var that = this;
	this.CrimeService.streetView(incident.incd, function(res) {
		if(res) {
			incident.incd.street_view = res;
			that.incident = incident.incd;
		}
	});
	this.CrimeService.getOutcome(incident.incd.persistent_id, function(err, res) {
		if(err) {
			console.log(err);
		} else if(res) {
			that.incident.outcomes = res;
		}
	});
}

CrimeController.prototype.createReport = function() {
	this.report = {};
	this.report.totalIncidents = this.incidents.crimes.length;
	if(this.incidents.type == 'crime') {
		this.report.searchType = 'crimes in'
	}

	if(this.incidents.type == 'search') {
		this.report.searchType = 'stop and searches in'
	}
	this.report.date = 'during ' + this.incidents.date;
	this.report.loc = this.search.address;
	this.loading = false;
}

module.exports = CrimeController;