function IncidentReport(options) {
	that = this;
	this.category_name = options.category_name;
	this.category = options.category;
	this.context = options.context;
	this.crime_id = options.id;
	this.longitude = options.location.longitude;
	this.latitude = options.location.latitude;
	this.street_name = options.location.street.name;
	this.street_id = options.location.street.id;
	this.location_type = options.location_type;
	this.month = options.month
	this.outcome_status = options.outcome_status; 
	this.persistent_id = options.persistent_id;
}

module.exports = IncidentReport;

