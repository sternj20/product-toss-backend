const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
	name: {
		type: String
	},
  active: {
    type: Boolean
  },
	submissions: [{
	  	type: Schema.Types.ObjectId,
	  	ref: "Image"
  }]
})

module.exports = mongoose.model("Contest", ContestSchema);