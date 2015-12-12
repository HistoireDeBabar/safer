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
			that.crimeResults = res;
			console.log(res);
		}
	});
}

module.exports = CrimeController;