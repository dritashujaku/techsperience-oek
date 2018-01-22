var mongoose = require('mongoose');
require('mongoose-type-email');

var CompanySchema = new mongoose.Schema({
	name: String,
	address: String,
	municipality: String,
	email: mongoose.SchemaTypes.Email,
	password: String,
	website: String,
	number: Number,
	description: String
});

module.exports = mongoose.model('Company', CompanySchema);