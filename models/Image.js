const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: {
		type: String
	},
	posVotes: {
		type: Number,
		default: 0
	},
	voted: {
		type: Boolean,
		default: false
	}
});

module.exports =  mongoose.model('Image', imageSchema);