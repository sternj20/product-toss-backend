const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: {
		type: String
	},
    createdBy: {
        type: String
    },
    userName: {
        type: String
    },
    author: {
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
    collapsed: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports =  mongoose.model('Image', imageSchema);