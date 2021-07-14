const mongoose = require('mongoose');
const validator = require('validator');

const AdminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		default: 0,
	},
});

module.exports = Admin_pass = new mongoose.model('admin_pass', AdminSchema);
