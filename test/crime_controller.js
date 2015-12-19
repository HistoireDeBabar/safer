var expect = require('chai').expect;
var CrimeController = require('../src/controllers/crime_controller.js');

var mock = {
	address: 'SW1 1NN',
	dates: ['2012-01', '2012-02'],
	date: '2012-01',
	tpye: 'crime'
}

var mockCrimeService = {
	getAddress: function(address, callback) {
		return callback(undefined, address);
	},
	getDates: function(callback) {
		return callback(undefined, mock.dates);
	},
	getCrimes: function() {

	}
}

describe('Crime Controller', function() {
	it('it should get address', function() {
		var crimeController = new CrimeController(undefined, mockCrimeService);
		crimeController.address = 'SW1 1NN';
		crimeController.getAddress();
		expect(crimeController.address).to.eql(mock.address);
	});
	it('should get availability dates', function() {
		var crimeController = new CrimeController(undefined, mockCrimeService);
		expect(crimeController.availability).to.eql(mock.dates);
	})
});

// CrimeController.prototype.getAddress = function() {
// 	var that = this;
// 	this.CrimeService.getAddress(this.address, function(err, res) {
// 		if(err) {
// 			console.log('error', err);
// 		} else {
// 			that.search = res;
// 			console.log(res);
// 			that.getCrime();
// 		}
// 	});
// };