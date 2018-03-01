const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String
  },
    name: {
    type: String,
  },
  email: {
    type: String,
  },
  images: [{
  	type: Schema.Types.ObjectId,
  	ref: "Image"
  }]
});


// Export the model
module.exports = mongoose.model("User", UserSchema);