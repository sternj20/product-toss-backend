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
  }],
  votedImages: [{
    type: Schema.Types.ObjectId,
    ref: "Image" 
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
    timestamps: true
});


// Export the model
module.exports = mongoose.model("User", UserSchema);