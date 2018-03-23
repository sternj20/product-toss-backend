const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: {
		type: String
	},
	name: {
		type: String
	},
	type: {
		type: String
	},
	votes: {
		type: Number,
		default: 0
	},
}, {
    timestamps: true
});

module.exports =  mongoose.model('Image', imageSchema);