const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
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
  	ref "Image"
  }]
});

var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;