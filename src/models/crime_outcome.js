function CrimeOutcome(options) {
	this.code = options.category.code;
	this.name = options.category.name;
	this.date = options.date;
	this.person_id = options.person_id;
}

module.exports = CrimeOutcome;