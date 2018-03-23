const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
	name: {
		type: String
	},
  active: {
    type: Boolean,
    default: true
  },
  expires: {
    type: Date,
    //7 Days from now at midnight
    default: new Date(+new Date() + 7*24*60*60*1000).setHours(0,0,0,0)
  },
	submissions: [{
	  	type: Schema.Types.ObjectId,
	  	ref: "Image"
  }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Contest", ContestSchema);
