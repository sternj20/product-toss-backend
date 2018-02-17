//SEED DB

const mongoose = require('mongoose');
const Image = require('./models/Image.js');
require('dotenv').config();

const images = [
  {
    url: 'http://markinternational.info/data/out/619/224378344-random-picture.jpg'
  },
  {
    url: 'http://markinternational.info/data/out/619/224378592-random-picture.jpg'
  },
  {
    url: 'http://markinternational.info/data/out/619/224379098-random-picture.jpg'
  },
  {
    url: 'http://markinternational.info/data/out/619/224379091-random-picture.jpeg'
  }
];


mongoose.connect(process.env.MONGODB_URI,
  { promiseLibrary: global.Promise }
);


// Go through each image
images.map(data => {
  // Initialize a model with image data
  let newImg = new Image(data);
  // and save it into the database
  newImg.save();
})

