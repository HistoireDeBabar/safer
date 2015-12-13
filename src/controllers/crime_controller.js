function CrimeController($scope, CrimeService) {
	$scope = $scope || {};
	$scope.crime = this;
	this.CrimeService = CrimeService;
	this.message = 'Safr!';
	this.getDates();
}


CrimeController.prototype.getAddress = function() {
	var that = this;
	this.CrimeService.getAddress(this.address, function(err, res) {
		if(err) {
			console.log('error', err);
		} else {
			that.search = res;
			console.log(res);
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

		} else {
			that.search.crimes = res;
			that.incidents = that.search;
			that.createReport();
		}
	});
}

CrimeController.prototype.incidentReport = function(incedent) {
	console.log(incedent);
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
	console.log(this.report);
	console.log(this.search);
}

module.exports = CrimeController;